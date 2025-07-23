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
    
    -- Feature Usage
    features_used JSONB NOT NULL DEFAULT '{}',
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Constraints
    CONSTRAINT tenant_usage_stats_period_check CHECK (period_end >= period_start),
    CONSTRAINT tenant_usage_stats_metrics_check CHECK (
        events_created >= 0 AND active_events >= 0 AND
        total_exhibitors >= 0 AND total_visitors >= 0 AND total_admins >= 0 AND
        login_count >= 0
    ),
    CONSTRAINT tenant_usage_stats_unique_period UNIQUE (tenant_id, period_start, period_end)
);
COMMIT;

-- ROLLBACK;
-- DROP TABLE IF EXISTS tenant_usage_stats CASCADE;
-- COMMIT;