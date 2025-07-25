-- Migration: 20250724210123_create_function_calculate_tenant_usage
-- Descrição: Criação da função para calcular o uso do inquilino
-- Tabela: tenant_usage_stats
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
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
COMMIT;

--ROLLBACK;
-- DROP FUNCTION IF EXISTS calculate_tenant_usage(p_tenant_id UUID);
-- COMMIT;