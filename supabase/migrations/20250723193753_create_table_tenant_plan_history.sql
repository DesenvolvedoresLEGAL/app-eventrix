-- Migration: 20250723193753_create_table_tenant_plan_history.sql
-- Descrição: Cria tabela para histórico de mudanças de planos dos tenants.
-- Tabela: tenant_plan_history
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
-- Plan Change History
CREATE TABLE tenant_plan_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    from_plan_id UUID REFERENCES subscription_plans(id),
    to_plan_id UUID NOT NULL REFERENCES subscription_plans(id),
    change_reason VARCHAR(100) NOT NULL,
    price_difference_brl DECIMAL(10,2),
    effective_date TIMESTAMP WITH TIME ZONE NOT NULL,
    changed_by UUID,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT tenant_plan_history_reason_check CHECK (
        change_reason IN (
            'upgrade', 'downgrade', 'trial_conversion', 'renewal',
            'cancellation', 'reactivation', 'administrative'
        )
    ),
    CONSTRAINT tenant_plan_history_different_plans CHECK (
        from_plan_id IS NULL OR from_plan_id != to_plan_id
    )
);

CREATE INDEX idx_tenant_plan_history_tenant ON tenant_plan_history(tenant_id);
CREATE INDEX idx_tenant_plan_history_from_plan ON tenant_plan_history(from_plan_id);
CREATE INDEX idx_tenant_plan_history_to_plan ON tenant_plan_history(to_plan_id);
CREATE INDEX idx_tenant_plan_history_effective ON tenant_plan_history(effective_date);

COMMENT ON TABLE tenant_plan_history IS 'Histórico de mudanças de planos';

COMMIT;

--ROLLBACK;
-- COMMIT;