-- Migration: 20250723191711_create_table_tenant_settings.sql
-- Descrição: Criação da tabela de configurações personalizadas do tenant.
-- Tabela: tenant_settings
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
-- Tenant Custom Settings
CREATE TABLE tenant_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL,
    key VARCHAR(100) NOT NULL,
    value JSONB NOT NULL,
    is_sensitive BOOLEAN NOT NULL DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID,
    
    -- Constraints
    CONSTRAINT tenant_settings_category_check CHECK (
        category IN (
            'branding', 'notifications', 'integrations', 'security',
            'billing', 'compliance', 'features', 'ui_preferences'
        )
    ),
    CONSTRAINT tenant_settings_key_format_check CHECK (key ~ '^[a-z_][a-z0-9_]*$'),
    CONSTRAINT tenant_settings_unique_key UNIQUE (tenant_id, category, key)
);

CREATE INDEX idx_tenant_settings_tenant ON tenant_settings(tenant_id);
CREATE INDEX idx_tenant_settings_category ON tenant_settings(tenant_id, category);
CREATE INDEX idx_tenant_settings_sensitive ON tenant_settings(tenant_id) WHERE is_sensitive = true;

COMMENT ON TABLE tenant_settings IS 'Configurações customizáveis por tenant';

COMMENT ON COLUMN tenant_settings.is_sensitive IS 'Indica se o valor deve ser criptografado';

COMMIT;

-- ROLLBACK;
-- DROP TABLE IF EXISTS tenant_settings CASCADE;
-- COMMIT;