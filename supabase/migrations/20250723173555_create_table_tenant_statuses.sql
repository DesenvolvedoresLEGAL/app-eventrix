-- Migration: 20250723173555_create_table_tenant_statuses.sql
-- Descrição: Cria a tabela de status dos tenants
-- Tabela: tenant_statuses
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
-- Tenant Statuses (Status dos Tenants)
CREATE TABLE tenant_statuses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    color_hex VARCHAR(7) NOT NULL DEFAULT '#6B7280',
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT tenant_statuses_code_check CHECK (code ~ '^[a-z_]+$'),
    CONSTRAINT tenant_statuses_color_check CHECK (validate_hex_color(color_hex)),
    CONSTRAINT tenant_statuses_sort_order_check CHECK (sort_order >= 0)
);

COMMENT ON TABLE tenant_statuses IS 'Status possíveis para tenants';

COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP TABLE IF EXISTS tenant_statuses CASCADE;
-- COMMIT;