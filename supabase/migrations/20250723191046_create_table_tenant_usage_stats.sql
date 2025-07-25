-- Migration: 20250723191046_create_table_tenant_usage_stats.sql
-- Descrição: Cria tabela para estatísticas de uso do inquilino.
-- Tabela: tenant_usage_stats
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
CREATE TABLE tenant_usage_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    
    -- Event Metrics
    events_created INTEGER NOT NULL DEFAULT 0,
    active_events INTEGER NOT NULL DEFAULT 0,
    total_exhibitors INTEGER NOT NULL DEFAULT 0,
    total_visitors INTEGER NOT NULL DEFAULT 0,
    total_admins INTEGER NOT NULL DEFAULT 0,
    
    -- Engagement Metrics
    login_count INTEGER NOT NULL DEFAULT 0,
    api_requests INTEGER NOT NULL DEFAULT 0,
    storage_used_mb INTEGER NOT NULL DEFAULT 0,
    whatsapp_messages_sent INTEGER NOT NULL DEFAULT 0,
    emails_sent INTEGER NOT NULL DEFAULT 0,
    
    -- Brazilian Financial Metrics
    revenue_generated_brl DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    pix_transactions INTEGER NOT NULL DEFAULT 0,
    boleto_transactions INTEGER NOT NULL DEFAULT 0,
    credit_card_transactions INTEGER NOT NULL DEFAULT 0,
    
    -- Feature Usage
    features_used JSONB NOT NULL DEFAULT '{}',
    ai_requests_count INTEGER NOT NULL DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT tenant_usage_stats_period_check CHECK (period_end >= period_start),
    CONSTRAINT tenant_usage_stats_metrics_check CHECK (
        events_created >= 0 AND active_events >= 0 AND
        total_exhibitors >= 0 AND total_visitors >= 0 AND total_admins >= 0 AND
        login_count >= 0 AND api_requests >= 0 AND storage_used_mb >= 0 AND
        whatsapp_messages_sent >= 0 AND emails_sent >= 0 AND
        revenue_generated_brl >= 0 AND pix_transactions >= 0 AND
        boleto_transactions >= 0 AND credit_card_transactions >= 0 AND
        ai_requests_count >= 0
    ),
    CONSTRAINT tenant_usage_stats_unique_period UNIQUE (tenant_id, period_start, period_end)
);


CREATE INDEX idx_tenant_usage_stats_tenant ON tenant_usage_stats(tenant_id);
CREATE INDEX idx_tenant_usage_stats_period ON tenant_usage_stats(period_start, period_end);
CREATE INDEX idx_tenant_usage_stats_tenant_period ON tenant_usage_stats(tenant_id, period_start, period_end);

COMMENT ON TABLE tenant_usage_stats IS 'Estatísticas de uso dos tenants por período';
COMMENT ON TABLE tenant_usage_stats IS 'Estatísticas de uso dos tenants por período';

COMMIT;

-- ROLLBACK;
-- DROP TABLE IF EXISTS tenant_usage_stats CASCADE;
-- COMMIT;