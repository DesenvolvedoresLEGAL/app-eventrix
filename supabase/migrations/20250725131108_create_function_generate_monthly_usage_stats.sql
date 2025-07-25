-- Migration: 20250725131108_create_function_generate_monthly_usage_stats.sql
-- Descrição: Cria a função para gerar estatísticas mensais de uso dos tenants
-- Tabela: tenant_usage_stats
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
CREATE OR REPLACE FUNCTION generate_monthly_usage_stats(target_month DATE DEFAULT CURRENT_DATE)
RETURNS INTEGER AS $$
DECLARE
    tenant_record RECORD;
    stats_count INTEGER := 0;
    v_period_start DATE;
    v_period_end DATE;
BEGIN
    v_period_start := date_trunc('month', target_month)::DATE;
    v_period_end := (date_trunc('month', target_month) + INTERVAL '1 month - 1 day')::DATE;

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
            tenant_record.id, v_period_start, v_period_end,
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
-- DROP FUNCTION IF EXISTS generate_monthly_usage_stats(target_month DATE DEFAULT CURRENT_DATE);
-- COMMIT;