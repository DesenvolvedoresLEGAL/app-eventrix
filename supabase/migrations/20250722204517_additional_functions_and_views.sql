-- =====================================================================
-- EVENTRIX™ - Migration 007: Additional Functions and Views
-- =====================================================================
-- Description: Create helper functions, views, and additional utilities
-- Created: 2025-07-22
-- =====================================================================

-- =====================================================================
-- TENANT MANAGEMENT FUNCTIONS
-- =====================================================================

-- Function to create a new tenant with all required setup
CREATE OR REPLACE FUNCTION create_new_tenant(
    p_slug VARCHAR(50),
    p_cnpj VARCHAR(18),
    p_razao_social VARCHAR(200),
    p_nome_fantasia VARCHAR(100),
    p_contact_email VARCHAR(255),
    p_organizer_type_code VARCHAR(50),
    p_segment_code VARCHAR(50),
    p_state_code VARCHAR(2),
    p_plan_code VARCHAR(50) DEFAULT 'start'
)
RETURNS UUID AS $$
DECLARE
    v_tenant_id UUID;
    v_organizer_type_id UUID;
    v_segment_id UUID;
    v_state_id UUID;
    v_plan_id UUID;
    v_status_id UUID;
BEGIN
    -- Validate CNPJ
    IF NOT validate_cnpj(p_cnpj) THEN
        RAISE EXCEPTION 'CNPJ inválido: %', p_cnpj;
    END IF;
    
    -- Get reference IDs
    SELECT id INTO v_organizer_type_id FROM organizer_types WHERE code = p_organizer_type_code AND is_active = true;
    SELECT id INTO v_segment_id FROM business_segments WHERE code = p_segment_code AND is_active = true;
    SELECT id INTO v_state_id FROM brazilian_states WHERE code = p_state_code AND is_active = true;
    SELECT id INTO v_plan_id FROM subscription_plans WHERE code = p_plan_code AND is_active = true;
    SELECT id INTO v_status_id FROM tenant_statuses WHERE code = 'trial' AND is_active = true;
    
    -- Validate all references exist
    IF v_organizer_type_id IS NULL THEN
        RAISE EXCEPTION 'Tipo de organizador não encontrado: %', p_organizer_type_code;
    END IF;
    IF v_segment_id IS NULL THEN
        RAISE EXCEPTION 'Segmento de negócio não encontrado: %', p_segment_code;
    END IF;
    IF v_state_id IS NULL THEN
        RAISE EXCEPTION 'Estado não encontrado: %', p_state_code;
    END IF;
    IF v_plan_id IS NULL THEN
        RAISE EXCEPTION 'Plano de assinatura não encontrado: %', p_plan_code;
    END IF;
    
    -- Create the tenant
    INSERT INTO tenants (
        slug, cnpj, razao_social, nome_fantasia, contact_email,
        organizer_type_id, primary_segment_id, state_id, plan_id, status_id,
        endereco_logradouro, endereco_bairro, endereco_cidade, cep,
        trial_ends_at
    ) VALUES (
        p_slug, format_cnpj(p_cnpj), p_razao_social, p_nome_fantasia, p_contact_email,
        v_organizer_type_id, v_segment_id, v_state_id, v_plan_id, v_status_id,
        'A definir', 'A definir', 'A definir', '00000-000',
        CURRENT_TIMESTAMP + INTERVAL '14 days'
    ) RETURNING id INTO v_tenant_id;
    
    -- Create default settings
    PERFORM create_default_tenant_settings(v_tenant_id);
    
    -- Return the new tenant ID
    RETURN v_tenant_id;
END;
$$ LANGUAGE plpgsql;

-- Function to upgrade/downgrade tenant plan
CREATE OR REPLACE FUNCTION change_tenant_plan(
    p_tenant_id UUID,
    p_new_plan_code VARCHAR(50),
    p_reason VARCHAR(100),
    p_changed_by UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    v_current_plan_id UUID;
    v_new_plan_id UUID;
    v_price_difference DECIMAL(10,2);
    v_current_price DECIMAL(10,2);
    v_new_price DECIMAL(10,2);
BEGIN
    -- Get current plan
    SELECT plan_id INTO v_current_plan_id FROM tenants WHERE id = p_tenant_id;
    
    -- Get new plan
    SELECT id, price_monthly INTO v_new_plan_id, v_new_price 
    FROM subscription_plans 
    WHERE code = p_new_plan_code AND is_active = true;
    
    IF v_new_plan_id IS NULL THEN
        RAISE EXCEPTION 'Plano não encontrado: %', p_new_plan_code;
    END IF;
    
    -- Get current plan price
    SELECT price_monthly INTO v_current_price 
    FROM subscription_plans 
    WHERE id = v_current_plan_id;
    
    -- Calculate price difference
    v_price_difference := COALESCE(v_new_price, 0) - COALESCE(v_current_price, 0);
    
    -- Update tenant plan
    UPDATE tenants 
    SET plan_id = v_new_plan_id,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_tenant_id;
    
    -- Record plan change history
    INSERT INTO tenant_plan_history (
        tenant_id, from_plan_id, to_plan_id, change_reason,
        price_difference_brl, effective_date, changed_by
    ) VALUES (
        p_tenant_id, v_current_plan_id, v_new_plan_id, p_reason,
        v_price_difference, CURRENT_TIMESTAMP, p_changed_by
    );
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Function to suspend tenant
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

-- =====================================================================
-- ANALYTICS AND REPORTING FUNCTIONS
-- =====================================================================

-- Function to calculate tenant usage for current month
CREATE OR REPLACE FUNCTION calculate_tenant_usage(p_tenant_id UUID)
RETURNS JSONB AS $$
DECLARE
    v_result JSONB;
    v_current_month_start DATE;
    v_current_month_end DATE;
BEGIN
    v_current_month_start := date_trunc('month', CURRENT_DATE)::DATE;
    v_current_month_end := (date_trunc('month', CURRENT_DATE) + INTERVAL '1 month - 1 day')::DATE;
    
    SELECT jsonb_build_object(
        'tenant_id', p_tenant_id,
        'period_start', v_current_month_start,
        'period_end', v_current_month_end,
        'events_created', COALESCE(events_created, 0),
        'active_events', COALESCE(active_events, 0),
        'total_exhibitors', COALESCE(total_exhibitors, 0),
        'total_visitors', COALESCE(total_visitors, 0),
        'login_count', COALESCE(login_count, 0),
        'storage_used_mb', COALESCE(storage_used_mb, 0),
        'revenue_generated_brl', COALESCE(revenue_generated_brl, 0)
    ) INTO v_result
    FROM tenant_usage_stats
    WHERE tenant_id = p_tenant_id 
    AND period_start = v_current_month_start
    AND period_end = v_current_month_end;
    
    -- Return empty stats if no record exists
    IF v_result IS NULL THEN
        v_result := jsonb_build_object(
            'tenant_id', p_tenant_id,
            'period_start', v_current_month_start,
            'period_end', v_current_month_end,
            'events_created', 0,
            'active_events', 0,
            'total_exhibitors', 0,
            'total_visitors', 0,
            'login_count', 0,
            'storage_used_mb', 0,
            'revenue_generated_brl', 0
        );
    END IF;
    
    RETURN v_result;
END;
$$ LANGUAGE plpgsql;

-- =====================================================================
-- USEFUL VIEWS FOR REPORTING
-- =====================================================================

-- Comprehensive tenant overview
CREATE VIEW tenant_overview AS
SELECT 
    t.id,
    t.slug,
    t.cnpj,
    t.razao_social,
    t.nome_fantasia,
    t.contact_email,
    t.created_at,
    t.last_login_at,
    
    -- References
    ot.name as organizer_type,
    bs.name as business_segment,
    ts.name as status,
    ts.color_hex as status_color,
    sp.name as plan_name,
    sp.price_monthly,
    st.name as state_name,
    st.region,
    
    -- Metrics
    t.current_events_count,
    t.current_admins_count,
    t.total_events_created,
    t.total_revenue_brl,
    
    -- Plan limits
    t.max_events_allowed,
    t.max_admins_allowed,
    t.max_visitors_allowed,
    t.max_exhibitors_allowed,
    
    -- Usage percentages
    CASE 
        WHEN t.max_events_allowed = -1 OR t.max_events_allowed >= 999999 THEN 0
        ELSE ROUND((t.current_events_count::DECIMAL / t.max_events_allowed) * 100, 2)
    END as events_usage_percentage,
    
    CASE 
        WHEN t.max_admins_allowed = -1 OR t.max_admins_allowed >= 999999 THEN 0
        ELSE ROUND((t.current_admins_count::DECIMAL / t.max_admins_allowed) * 100, 2)
    END as admins_usage_percentage,
    
    -- Onboarding
    t.onboarding_completed,
    t.onboarding_current_step,
    t.first_event_created,
    
    -- Trial info
    t.trial_ends_at,
    CASE 
        WHEN t.trial_ends_at IS NULL THEN false
        WHEN t.trial_ends_at > CURRENT_TIMESTAMP THEN true
        ELSE false
    END as is_in_trial,
    
    CASE 
        WHEN t.trial_ends_at IS NULL THEN 0
        WHEN t.trial_ends_at > CURRENT_TIMESTAMP THEN 
            EXTRACT(days FROM t.trial_ends_at - CURRENT_TIMESTAMP)::INTEGER
        ELSE 0
    END as trial_days_remaining

FROM tenants t
JOIN organizer_types ot ON t.organizer_type_id = ot.id
JOIN business_segments bs ON t.primary_segment_id = bs.id
JOIN tenant_statuses ts ON t.status_id = ts.id
JOIN subscription_plans sp ON t.plan_id = sp.id
JOIN brazilian_states st ON t.state_id = st.id
WHERE t.deleted_at IS NULL;

-- Active tenants summary
CREATE VIEW active_tenants_summary AS
SELECT 
    COUNT(*) as total_active_tenants,
    COUNT(*) FILTER (WHERE is_in_trial = true) as tenants_in_trial,
    COUNT(*) FILTER (WHERE status = 'Ativo') as paid_tenants,
    COUNT(*) FILTER (WHERE first_event_created = true) as tenants_with_events,
    COUNT(*) FILTER (WHERE onboarding_completed = true) as completed_onboarding,
    
    -- By plan
    COUNT(*) FILTER (WHERE plan_name LIKE '%Start%') as start_plan_count,
    COUNT(*) FILTER (WHERE plan_name LIKE '%Scale%') as scale_plan_count,
    COUNT(*) FILTER (WHERE plan_name LIKE '%Boom%') as boom_plan_count,
    COUNT(*) FILTER (WHERE plan_name LIKE '%Enterprise%') as enterprise_plan_count,
    
    -- By region
    COUNT(*) FILTER (WHERE region = 'Sudeste') as sudeste_count,
    COUNT(*) FILTER (WHERE region = 'Sul') as sul_count,
    COUNT(*) FILTER (WHERE region = 'Nordeste') as nordeste_count,
    COUNT(*) FILTER (WHERE region = 'Norte') as norte_count,
    COUNT(*) FILTER (WHERE region = 'Centro-Oeste') as centro_oeste_count,
    
    -- Revenue
    SUM(total_revenue_brl) as total_platform_revenue,
    AVG(total_revenue_brl) as avg_revenue_per_tenant
    
FROM tenant_overview;

-- Tenant activity report
CREATE VIEW tenant_activity_report AS
SELECT 
    t.id,
    t.slug,
    t.razao_social,
    t.status,
    t.plan_name,
    
    -- Recent activity
    t.last_login_at,
    EXTRACT(days FROM CURRENT_TIMESTAMP - t.last_login_at)::INTEGER as days_since_last_login,
    
    -- Usage statistics (current month)
    COALESCE(us.login_count, 0) as monthly_logins,
    COALESCE(us.api_requests, 0) as monthly_api_requests,
    COALESCE(us.events_created, 0) as monthly_events_created,
    COALESCE(us.whatsapp_messages_sent, 0) as monthly_whatsapp_sent,
    COALESCE(us.emails_sent, 0) as monthly_emails_sent,
    
    -- Health indicators
    CASE 
        WHEN t.last_login_at IS NULL THEN 'never_logged_in'
        WHEN EXTRACT(days FROM CURRENT_TIMESTAMP - t.last_login_at) <= 7 THEN 'active'
        WHEN EXTRACT(days FROM CURRENT_TIMESTAMP - t.last_login_at) <= 30 THEN 'moderate'
        ELSE 'inactive'
    END as activity_level

FROM tenant_overview t
LEFT JOIN tenant_usage_stats us ON (
    t.id = us.tenant_id AND
    us.period_start = date_trunc('month', CURRENT_DATE)::DATE
);

-- =====================================================================
-- CLEANUP AND MAINTENANCE FUNCTIONS
-- =====================================================================

-- Function to cleanup old audit logs (LGPD compliance)
CREATE OR REPLACE FUNCTION cleanup_old_audit_logs(retention_months INTEGER DEFAULT 24)
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
    cutoff_date TIMESTAMP WITH TIME ZONE;
BEGIN
    cutoff_date := CURRENT_TIMESTAMP - (retention_months || ' months')::INTERVAL;
    
    DELETE FROM tenant_audit_log 
    WHERE created_at < cutoff_date;
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Function to generate monthly usage stats
CREATE OR REPLACE FUNCTION generate_monthly_usage_stats(target_month DATE DEFAULT CURRENT_DATE)
RETURNS INTEGER AS $$
DECLARE
    tenant_record RECORD;
    stats_count INTEGER := 0;
    period_start DATE;
    period_end DATE;
BEGIN
    period_start := date_trunc('month', target_month)::DATE;
    period_end := (date_trunc('month', target_month) + INTERVAL '1 month - 1 day')::DATE;
    
    -- Generate stats for each active tenant
    FOR tenant_record IN 
        SELECT id FROM tenants WHERE deleted_at IS NULL
    LOOP
        INSERT INTO tenant_usage_stats (
            tenant_id, period_start, period_end,
            events_created, active_events, total_exhibitors, total_visitors, total_admins,
            login_count, api_requests, storage_used_mb, whatsapp_messages_sent, emails_sent,
            revenue_generated_brl, pix_transactions, boleto_transactions, credit_card_transactions,
            features_used, ai_requests_count
        ) VALUES (
            tenant_record.id, period_start, period_end,
            0, 0, 0, 0, 1, -- Default minimal values
            0, 0, 0, 0, 0,
            0, 0, 0, 0,
            '{}'::jsonb, 0
        )
        ON CONFLICT (tenant_id, period_start, period_end) DO NOTHING;
        
        stats_count := stats_count + 1;
    END LOOP;
    
    RETURN stats_count;
END;
$$ LANGUAGE plpgsql;

-- =====================================================================
-- GRANT PERMISSIONS
-- =====================================================================

-- Grant access to views for authenticated users
GRANT SELECT ON tenant_overview TO authenticated;
GRANT SELECT ON active_tenants_summary TO authenticated;
GRANT SELECT ON tenant_activity_report TO authenticated;

-- =====================================================================
-- FINAL COMMENTS AND DOCUMENTATION
-- =====================================================================

COMMENT ON FUNCTION create_new_tenant IS 'Cria um novo tenant com todas as configurações necessárias';
COMMENT ON FUNCTION change_tenant_plan IS 'Altera o plano de um tenant e registra no histórico';
COMMENT ON FUNCTION suspend_tenant IS 'Suspende um tenant e registra o motivo';
COMMENT ON FUNCTION calculate_tenant_usage IS 'Calcula estatísticas de uso do tenant no mês atual';
COMMENT ON FUNCTION cleanup_old_audit_logs IS 'Remove logs de auditoria antigos para compliance LGPD';
COMMENT ON FUNCTION generate_monthly_usage_stats IS 'Gera estatísticas mensais de uso para todos os tenants';

COMMENT ON VIEW tenant_overview IS 'Visão completa dos tenants com métricas e informações agregadas';
COMMENT ON VIEW active_tenants_summary IS 'Resumo estatístico dos tenants ativos';
COMMENT ON VIEW tenant_activity_report IS 'Relatório de atividade dos tenants para análise de engajamento';

-- Log successful completion
DO $$
BEGIN
    RAISE NOTICE 'Migration 007 completed successfully!';
    RAISE NOTICE 'Database schema is ready for EVENTRIX™ multi-tenant operations';
    RAISE NOTICE 'All tables, functions, views, and RLS policies have been created';
END;
$$;