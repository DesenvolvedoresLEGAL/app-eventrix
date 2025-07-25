-- Migration: 20250725125404_create_function_suspend_tenant.sql
-- Descrição: Criação da função para suspender inquilinos
-- Tabela: tenants
-- Autor: Gustavo Mota
-- Data: 25/07/2025

BEGIN;
CREATE OR REPLACE FUNCTION suspend_tenant(
    p_tenant_id UUID,
    p_reason TEXT,
    p_suspended_by UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    v_suspended_status_id UUID;
BEGIN
    -- Get suspended status ID
    SELECT id INTO v_suspended_status_id 
    FROM tenant_statuses 
    WHERE code = 'suspenso' AND is_active = true;
    
    -- Update tenant status
    UPDATE tenants 
    SET status_id = v_suspended_status_id,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_tenant_id;
    
    -- Log the suspension
    INSERT INTO tenant_audit_log (
        tenant_id, user_id, action, table_name, record_id,
        new_values, lgpd_purpose
    ) VALUES (
        p_tenant_id, p_suspended_by, 'SUSPEND', 'tenants', p_tenant_id,
        json_build_object('reason', p_reason, 'suspended_at', CURRENT_TIMESTAMP)::jsonb,
        'Suspensão por violação de termos ou inadimplência'
    );
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;
COMMIT;

--ROLLBACK;
-- DROP FUNCTION suspend_tenant(
--     p_tenant_id UUID,
--     p_reason TEXT,
--     p_suspended_by UUID DEFAULT NULL
-- );
-- COMMIT;
