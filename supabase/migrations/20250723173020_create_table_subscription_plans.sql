-- Migration: 20250723173020_create_table_subscription_plans.sql
-- Descrição: Cria a tabela de planos de assinatura
-- Tabela: subscription_plans
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
-- Subscription Plans (Planos de Assinatura)
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price_monthly DECIMAL(10,2),
    price_yearly DECIMAL(10,2),
    
    -- Event Limits
    max_events_min INTEGER NOT NULL DEFAULT 1,
    max_events_max INTEGER NOT NULL DEFAULT -1, -- -1 = unlimited
    max_admins INTEGER NOT NULL DEFAULT 1,
    max_visitors_min INTEGER NOT NULL DEFAULT 100,
    max_visitors_max INTEGER NOT NULL DEFAULT -1, -- -1 = unlimited
    max_exhibitors INTEGER NOT NULL DEFAULT 10,
    
    -- Support Level
    support_type VARCHAR(50) NOT NULL DEFAULT 'email',
    
    -- Features
    features JSONB NOT NULL DEFAULT '{}',
    is_popular BOOLEAN NOT NULL DEFAULT false,
    is_enterprise BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT subscription_plans_code_check CHECK (code ~ '^[a-z_]+$'),
    CONSTRAINT subscription_plans_prices_check CHECK (
        (price_monthly IS NULL AND price_yearly IS NULL AND is_enterprise = true) OR
        (price_monthly > 0 AND price_yearly > 0)
    ),
    CONSTRAINT subscription_plans_limits_check CHECK (
        max_events_min > 0 AND 
        (max_events_max = -1 OR max_events_max >= max_events_min) AND
        max_admins > 0 AND
        max_visitors_min > 0 AND
        (max_visitors_max = -1 OR max_visitors_max >= max_visitors_min) AND
        max_exhibitors > 0
    ),
    CONSTRAINT subscription_plans_support_check CHECK (
        support_type IN ('email', 'email_chat', '24_7_sla', 'dedicated')
    ),
    CONSTRAINT subscription_plans_sort_order_check CHECK (sort_order >= 0)
);
COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP TABLE IF EXISTS subscription_plans;
-- COMMIT;