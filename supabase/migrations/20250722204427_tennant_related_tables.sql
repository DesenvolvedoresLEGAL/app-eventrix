-- =====================================================================
-- EVENTRIX™ - Migration 004: Tenant Related Tables
-- =====================================================================
-- Description: Create tables for tenant analytics, settings, documents, etc.
-- Created: 2025-07-22
-- =====================================================================

-- Brazilian Usage Analytics
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

-- Brazilian Legal Documents
CREATE TABLE tenant_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL,
    document_name VARCHAR(200) NOT NULL,
    file_url TEXT NOT NULL,
    file_size_bytes INTEGER NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    verification_status VARCHAR(50) NOT NULL DEFAULT 'pending',
    verified_at TIMESTAMP WITH TIME ZONE,
    verified_by UUID,
    expires_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT tenant_documents_type_check CHECK (
        document_type IN (
            'contrato_social', 'certidao_negativa', 'cartao_cnpj',
            'procuracao', 'alvara_funcionamento', 'certificado_digital',
            'comprovante_endereco', 'inscricao_municipal', 'outros'
        )
    ),
    CONSTRAINT tenant_documents_status_check CHECK (
        verification_status IN ('pending', 'verified', 'rejected', 'expired')
    ),
    CONSTRAINT tenant_documents_size_check CHECK (file_size_bytes > 0),
    CONSTRAINT tenant_documents_mime_check CHECK (
        mime_type IN (
            'application/pdf', 'image/jpeg', 'image/png', 'image/webp',
            'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        )
    )
);

-- Brazilian Integrations
CREATE TABLE tenant_integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    integration_type VARCHAR(50) NOT NULL,
    integration_name VARCHAR(100) NOT NULL,
    api_credentials_encrypted TEXT,
    config JSONB NOT NULL DEFAULT '{}',
    is_active BOOLEAN NOT NULL DEFAULT true,
    last_sync_at TIMESTAMP WITH TIME ZONE,
    sync_status VARCHAR(50) NOT NULL DEFAULT 'never_synced',
    error_message TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT tenant_integrations_type_check CHECK (
        integration_type IN (
            'receita_federal', 'sefaz', 'correios', 'whatsapp',
            'google_calendar', 'outlook', 'hubspot', 'pipedrive',
            'rdstation', 'mailchimp', 'sendgrid', 'pix_provider',
            'pagseguro', 'mercado_pago', 'asaas'
        )
    ),
    CONSTRAINT tenant_integrations_status_check CHECK (
        sync_status IN ('never_synced', 'syncing', 'success', 'error', 'disabled')
    ),
    CONSTRAINT tenant_integrations_unique_type UNIQUE (tenant_id, integration_type)
);

-- Comprehensive Audit Log
CREATE TABLE tenant_audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID,
    action VARCHAR(50) NOT NULL,
    table_name VARCHAR(100) NOT NULL,
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    
    -- Request Context
    ip_address INET,
    user_agent TEXT,
    session_id VARCHAR(100),
    
    -- Brazilian Compliance
    lgpd_purpose TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT tenant_audit_log_action_check CHECK (
        action IN (
            'CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT',
            'VIEW', 'EXPORT', 'IMPORT', 'SYNC', 'APPROVE', 'REJECT'
        )
    )
);

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

-- Create triggers for updated_at
CREATE TRIGGER trigger_tenant_settings_updated_at
    BEFORE UPDATE ON tenant_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_tenant_documents_updated_at
    BEFORE UPDATE ON tenant_documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_tenant_integrations_updated_at
    BEFORE UPDATE ON tenant_integrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for performance
-- Tenant Usage Stats indexes
CREATE INDEX idx_tenant_usage_stats_tenant ON tenant_usage_stats(tenant_id);
CREATE INDEX idx_tenant_usage_stats_period ON tenant_usage_stats(period_start, period_end);
CREATE INDEX idx_tenant_usage_stats_tenant_period ON tenant_usage_stats(tenant_id, period_start, period_end);

-- Tenant Settings indexes
CREATE INDEX idx_tenant_settings_tenant ON tenant_settings(tenant_id);
CREATE INDEX idx_tenant_settings_category ON tenant_settings(tenant_id, category);
CREATE INDEX idx_tenant_settings_sensitive ON tenant_settings(tenant_id) WHERE is_sensitive = true;

-- Tenant Documents indexes
CREATE INDEX idx_tenant_documents_tenant ON tenant_documents(tenant_id);
CREATE INDEX idx_tenant_documents_type ON tenant_documents(tenant_id, document_type);
CREATE INDEX idx_tenant_documents_status ON tenant_documents(verification_status);
CREATE INDEX idx_tenant_documents_expires ON tenant_documents(expires_at) WHERE expires_at IS NOT NULL;

-- Tenant Integrations indexes
CREATE INDEX idx_tenant_integrations_tenant ON tenant_integrations(tenant_id);
CREATE INDEX idx_tenant_integrations_type ON tenant_integrations(integration_type);
CREATE INDEX idx_tenant_integrations_active ON tenant_integrations(tenant_id, is_active);
CREATE INDEX idx_tenant_integrations_sync_status ON tenant_integrations(sync_status);

-- Tenant Audit Log indexes
CREATE INDEX idx_tenant_audit_log_tenant ON tenant_audit_log(tenant_id);
CREATE INDEX idx_tenant_audit_log_user ON tenant_audit_log(user_id);
CREATE INDEX idx_tenant_audit_log_action ON tenant_audit_log(action);
CREATE INDEX idx_tenant_audit_log_table ON tenant_audit_log(table_name);
CREATE INDEX idx_tenant_audit_log_record ON tenant_audit_log(table_name, record_id);
CREATE INDEX idx_tenant_audit_log_created ON tenant_audit_log(created_at);
CREATE INDEX idx_tenant_audit_log_tenant_created ON tenant_audit_log(tenant_id, created_at);

-- Tenant Plan History indexes
CREATE INDEX idx_tenant_plan_history_tenant ON tenant_plan_history(tenant_id);
CREATE INDEX idx_tenant_plan_history_from_plan ON tenant_plan_history(from_plan_id);
CREATE INDEX idx_tenant_plan_history_to_plan ON tenant_plan_history(to_plan_id);
CREATE INDEX idx_tenant_plan_history_effective ON tenant_plan_history(effective_date);

-- Add table and column comments
COMMENT ON TABLE tenant_usage_stats IS 'Estatísticas de uso dos tenants por período';
COMMENT ON TABLE tenant_settings IS 'Configurações customizáveis por tenant';
COMMENT ON TABLE tenant_documents IS 'Documentos legais e comprobatórios brasileiros';
COMMENT ON TABLE tenant_integrations IS 'Integrações com sistemas externos';
COMMENT ON TABLE tenant_audit_log IS 'Log de auditoria completo para compliance LGPD';
COMMENT ON TABLE tenant_plan_history IS 'Histórico de mudanças de planos';

COMMENT ON COLUMN tenant_usage_stats.revenue_generated_brl IS 'Receita gerada no período em Reais (BRL)';
COMMENT ON COLUMN tenant_settings.is_sensitive IS 'Indica se o valor deve ser criptografado';
COMMENT ON COLUMN tenant_documents.verification_status IS 'Status da verificação do documento';
COMMENT ON COLUMN tenant_integrations.api_credentials_encrypted IS 'Credenciais criptografadas para APIs externas';
COMMENT ON COLUMN tenant_audit_log.lgpd_purpose IS 'Finalidade do processamento para compliance LGPD';