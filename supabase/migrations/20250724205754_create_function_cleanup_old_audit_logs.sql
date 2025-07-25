-- Migration: 20250724205754_create_function_cleanup_old_audit_logs
-- Descrição: Criação da função para limpeza de logs de auditoria antigos
-- Tabela: tenant_audit_log
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
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
COMMIT;

--ROLLBACK;
-- DROP FUNCTION IF EXISTS cleanup_old_audit_logs(INTEGER);
-- COMMIT;