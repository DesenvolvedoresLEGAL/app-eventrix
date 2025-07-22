-- =====================================================================
-- EVENTRIX™ - Migration 005: Row Level Security (RLS) Policies
-- =====================================================================
-- Description: Implement tenant isolation via PostgreSQL RLS
-- Created: 2025-07-22
-- =====================================================================

-- Enable Row Level Security on all tenant-related tables
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_usage_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_plan_history ENABLE ROW LEVEL SECURITY;

-- Helper function to get current tenant_id from JWT token
CREATE OR REPLACE FUNCTION get_current_tenant_id()
RETURNS UUID AS $$
BEGIN
    RETURN (current_setting('request.jwt.claims', true)::json->>'tenant_id')::UUID;
EXCEPTION
    WHEN OTHERS THEN
        RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user is super admin
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (current_setting('request.jwt.claims', true)::json->>'role') = 'super_admin';
EXCEPTION
    WHEN OTHERS THEN
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to get current user role
CREATE OR REPLACE FUNCTION get_current_user_role()
RETURNS TEXT AS $$
BEGIN
    RETURN current_setting('request.jwt.claims', true)::json->>'role';
EXCEPTION
    WHEN OTHERS THEN
        RETURN 'anonymous';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================================
-- TENANTS TABLE POLICIES
-- =====================================================================

-- Policy for tenants to view their own data
CREATE POLICY "tenants_select_own_data" ON tenants
    FOR SELECT
    USING (
        id = get_current_tenant_id() OR 
        is_super_admin()
    );

-- Policy for tenants to update their own data
CREATE POLICY "tenants_update_own_data" ON tenants
    FOR UPDATE
    USING (
        id = get_current_tenant_id() AND
        get_current_user_role() IN ('admin', 'owner')
    );

-- Policy for super admins to manage all tenants
CREATE POLICY "tenants_super_admin_all_access" ON tenants
    FOR ALL
    USING (is_super_admin());

-- Policy for tenant creation (only super admins or during registration)
CREATE POLICY "tenants_insert_registration" ON tenants
    FOR INSERT
    WITH CHECK (
        is_super_admin() OR
        get_current_user_role() = 'registration'
    );

-- =====================================================================
-- TENANT USAGE STATS POLICIES
-- =====================================================================

CREATE POLICY "tenant_usage_stats_tenant_access" ON tenant_usage_stats
    FOR ALL
    USING (
        tenant_id = get_current_tenant_id() OR
        is_super_admin()
    );

-- =====================================================================
-- TENANT SETTINGS POLICIES
-- =====================================================================

CREATE POLICY "tenant_settings_tenant_access" ON tenant_settings
    FOR SELECT
    USING (
        tenant_id = get_current_tenant_id() OR
        is_super_admin()
    );

CREATE POLICY "tenant_settings_admin_modify" ON tenant_settings
    FOR ALL
    USING (
        (tenant_id = get_current_tenant_id() AND 
         get_current_user_role() IN ('admin', 'owner')) OR
        is_super_admin()
    );

-- =====================================================================
-- TENANT DOCUMENTS POLICIES
-- =====================================================================

CREATE POLICY "tenant_documents_tenant_access" ON tenant_documents
    FOR SELECT
    USING (
        tenant_id = get_current_tenant_id() OR
        is_super_admin()
    );

CREATE POLICY "tenant_documents_admin_modify" ON tenant_documents
    FOR ALL
    USING (
        (tenant_id = get_current_tenant_id() AND 
         get_current_user_role() IN ('admin', 'owner')) OR
        is_super_admin()
    );

-- =====================================================================
-- TENANT INTEGRATIONS POLICIES
-- =====================================================================

CREATE POLICY "tenant_integrations_tenant_access" ON tenant_integrations
    FOR SELECT
    USING (
        tenant_id = get_current_tenant_id() OR
        is_super_admin()
    );

CREATE POLICY "tenant_integrations_admin_modify" ON tenant_integrations
    FOR ALL
    USING (
        (tenant_id = get_current_tenant_id() AND 
         get_current_user_role() IN ('admin', 'owner')) OR
        is_super_admin()
    );

-- =====================================================================
-- TENANT AUDIT LOG POLICIES
-- =====================================================================

-- Read-only access to audit logs for tenant admins
CREATE POLICY "tenant_audit_log_tenant_read" ON tenant_audit_log
    FOR SELECT
    USING (
        tenant_id = get_current_tenant_id() OR
        is_super_admin()
    );

-- Only system and super admins can insert audit logs
CREATE POLICY "tenant_audit_log_system_insert" ON tenant_audit_log
    FOR INSERT
    WITH CHECK (
        is_super_admin() OR
        get_current_user_role() = 'system'
    );

-- =====================================================================
-- TENANT PLAN HISTORY POLICIES
-- =====================================================================

CREATE POLICY "tenant_plan_history_tenant_read" ON tenant_plan_history
    FOR SELECT
    USING (
        tenant_id = get_current_tenant_id() OR
        is_super_admin()
    );

CREATE POLICY "tenant_plan_history_admin_insert" ON tenant_plan_history
    FOR INSERT
    WITH CHECK (
        (tenant_id = get_current_tenant_id() AND 
         get_current_user_role() IN ('admin', 'owner')) OR
        is_super_admin()
    );

-- =====================================================================
-- REFERENCE TABLES POLICIES (Read-only for all authenticated users)
-- =====================================================================

-- These tables are reference data, readable by all authenticated users
CREATE POLICY "organizer_types_read_all" ON organizer_types
    FOR SELECT
    USING (auth.uid() IS NOT NULL);

CREATE POLICY "subscription_plans_read_all" ON subscription_plans
    FOR SELECT
    USING (auth.uid() IS NOT NULL);

CREATE POLICY "tenant_statuses_read_all" ON tenant_statuses
    FOR SELECT
    USING (auth.uid() IS NOT NULL);

CREATE POLICY "business_segments_read_all" ON business_segments
    FOR SELECT
    USING (auth.uid() IS NOT NULL);

CREATE POLICY "brazilian_states_read_all" ON brazilian_states
    FOR SELECT
    USING (auth.uid() IS NOT NULL);

-- Enable RLS on reference tables
ALTER TABLE organizer_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_statuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_segments ENABLE ROW LEVEL SECURITY;
ALTER TABLE brazilian_states ENABLE ROW LEVEL SECURITY;

-- =====================================================================
-- AUDIT LOG TRIGGER FUNCTIONS
-- =====================================================================

-- Function to automatically log tenant changes
CREATE OR REPLACE FUNCTION log_tenant_changes()
RETURNS TRIGGER AS $$
DECLARE
    tenant_uuid UUID;
    user_uuid UUID;
BEGIN
    -- Get tenant_id from the record
    IF TG_OP = 'DELETE' THEN
        tenant_uuid := OLD.tenant_id;
    ELSE
        tenant_uuid := NEW.tenant_id;
    END IF;
    
    -- Get current user
    user_uuid := (current_setting('request.jwt.claims', true)::json->>'sub')::UUID;
    
    -- Insert audit log entry
    INSERT INTO tenant_audit_log (
        tenant_id,
        user_id,
        action,
        table_name,
        record_id,
        old_values,
        new_values,
        ip_address,
        user_agent,
        session_id
    ) VALUES (
        tenant_uuid,
        user_uuid,
        TG_OP,
        TG_TABLE_NAME,
        CASE 
            WHEN TG_OP = 'DELETE' THEN OLD.id
            ELSE NEW.id
        END,
        CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN row_to_json(OLD) END,
        CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW) END,
        inet(current_setting('request.headers', true)::json->>'x-forwarded-for'),
        current_setting('request.headers', true)::json->>'user-agent',
        current_setting('request.headers', true)::json->>'x-session-id'
    );
    
    RETURN CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NEW END;
EXCEPTION
    WHEN OTHERS THEN
        -- Don't fail the main operation if audit logging fails
        RETURN CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NEW END;
END;
$$ LANGUAGE plpgsql;

-- Create audit triggers for main tables
CREATE TRIGGER trigger_audit_tenants
    AFTER INSERT OR UPDATE OR DELETE ON tenants
    FOR EACH ROW EXECUTE FUNCTION log_tenant_changes();

CREATE TRIGGER trigger_audit_tenant_settings
    AFTER INSERT OR UPDATE OR DELETE ON tenant_settings
    FOR EACH ROW EXECUTE FUNCTION log_tenant_changes();

CREATE TRIGGER trigger_audit_tenant_documents
    AFTER INSERT OR UPDATE OR DELETE ON tenant_documents
    FOR EACH ROW EXECUTE FUNCTION log_tenant_changes();

CREATE TRIGGER trigger_audit_tenant_integrations
    AFTER INSERT OR UPDATE OR DELETE ON tenant_integrations
    FOR EACH ROW EXECUTE FUNCTION log_tenant_changes();

-- =====================================================================
-- SECURITY HELPER VIEWS
-- =====================================================================

-- View for tenant administrators to see their tenant info
CREATE VIEW tenant_admin_view AS
SELECT 
    t.*,
    os.name as organizer_type_name,
    bs.name as business_segment_name,
    ts.name as status_name,
    sp.name as plan_name,
    st.name as state_name
FROM tenants t
JOIN organizer_types os ON t.organizer_type_id = os.id
JOIN business_segments bs ON t.primary_segment_id = bs.id
JOIN tenant_statuses ts ON t.status_id = ts.id
JOIN subscription_plans sp ON t.plan_id = sp.id
JOIN brazilian_states st ON t.state_id = st.id
WHERE t.id = get_current_tenant_id()
AND t.deleted_at IS NULL;

-- Grant permissions on the view
GRANT SELECT ON tenant_admin_view TO authenticated;

-- Add comments
COMMENT ON POLICY "tenants_select_own_data" ON tenants IS 'Permite que tenants vejam apenas seus próprios dados';
COMMENT ON POLICY "tenants_super_admin_all_access" ON tenants IS 'Super administradores têm acesso total';
COMMENT ON FUNCTION get_current_tenant_id() IS 'Extrai tenant_id do JWT token';
COMMENT ON FUNCTION is_super_admin() IS 'Verifica se o usuário atual é super administrador';
COMMENT ON FUNCTION log_tenant_changes() IS 'Registra mudanças para auditoria e compliance LGPD';