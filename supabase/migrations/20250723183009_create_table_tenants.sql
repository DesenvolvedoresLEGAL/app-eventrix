-- Migration: 20250723183009_create_table_tenants.sql
-- Descrição: Cria tabela de tenants, para armazenar os dados das empresas organizadoras de eventos.
-- Tabela: tenants
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
-- Main Tenants Table (Brazilian Companies Only)
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(50) NOT NULL UNIQUE,
    
    -- Brazilian Organization Data
    cnpj VARCHAR(18) NOT NULL UNIQUE,
    razao_social VARCHAR(200) NOT NULL,
    nome_fantasia VARCHAR(100),
    inscricao_estadual VARCHAR(20),
    cnae_principal VARCHAR(10),
    
    -- Classification
    organizer_type_id UUID NOT NULL REFERENCES organizer_types(id),
    primary_segment_id UUID NOT NULL REFERENCES business_segments(id),
    
    -- Domain Validation
    email_domain VARCHAR(100),
    domain_validated BOOLEAN NOT NULL DEFAULT false,
    domain_validated_at TIMESTAMP WITH TIME ZONE,
    
    -- Status and Subscription
    status_id UUID NOT NULL REFERENCES tenant_statuses(id),
    plan_id UUID NOT NULL REFERENCES subscription_plans(id),
    plan_expires_at TIMESTAMP WITH TIME ZONE,
    trial_ends_at TIMESTAMP WITH TIME ZONE,
    
    -- Brand Configuration
    primary_color VARCHAR(7) NOT NULL DEFAULT '#4D2BFB',
    secondary_color VARCHAR(7) NOT NULL DEFAULT '#03F9FF',
    logo_url TEXT,
    favicon_url TEXT,
    font_family VARCHAR(100) NOT NULL DEFAULT 'Neue Haas Unica',
    
    -- Brazilian Contact Information
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(20),
    whatsapp_number VARCHAR(20),
    website_url TEXT,
    
    -- Brazilian Address Format
    endereco_logradouro VARCHAR(200) NOT NULL,
    endereco_numero VARCHAR(10),
    endereco_complemento VARCHAR(100),
    endereco_bairro VARCHAR(100) NOT NULL,
    endereco_cidade VARCHAR(100) NOT NULL,
    state_id UUID NOT NULL REFERENCES brazilian_states(id),
    cep VARCHAR(9) NOT NULL,
    
    -- Brazilian Operational Settings
    timezone VARCHAR(50) NOT NULL DEFAULT 'America/Sao_Paulo',
    locale VARCHAR(5) NOT NULL DEFAULT 'pt-BR',
    
    -- Plan Usage (cached from subscription_plans)
    current_events_count INTEGER NOT NULL DEFAULT 0,
    current_admins_count INTEGER NOT NULL DEFAULT 0,
    max_events_allowed INTEGER NOT NULL DEFAULT 1,
    max_admins_allowed INTEGER NOT NULL DEFAULT 1,
    max_visitors_allowed INTEGER NOT NULL DEFAULT 100,
    max_exhibitors_allowed INTEGER NOT NULL DEFAULT 10,
    
    -- Onboarding Progress
    onboarding_completed BOOLEAN NOT NULL DEFAULT false,
    onboarding_current_step VARCHAR(50) NOT NULL DEFAULT 'dados_empresa',
    setup_wizard_completed BOOLEAN NOT NULL DEFAULT false,
    first_event_created BOOLEAN NOT NULL DEFAULT false,
    
    -- Feature Flags (based on plan)
    features_enabled JSONB NOT NULL DEFAULT '{}',
    integrations_config JSONB NOT NULL DEFAULT '{}',
    
    -- Brazilian Compliance (LGPD)
    lgpd_acceptance_date TIMESTAMP WITH TIME ZONE,
    data_retention_months INTEGER NOT NULL DEFAULT 24,
    
    -- Brazilian Billing Information
    billing_email VARCHAR(255),
    billing_cnpj VARCHAR(18),
    billing_endereco JSONB,
    payment_method VARCHAR(50) NOT NULL DEFAULT 'pix',
    payment_provider_id VARCHAR(100),
    
    -- Brazilian Tax Information
    regime_tributario VARCHAR(50),
    optante_simples_nacional BOOLEAN NOT NULL DEFAULT false,
    
    -- Usage Analytics
    last_login_at TIMESTAMP WITH TIME ZONE,
    total_events_created INTEGER NOT NULL DEFAULT 0,
    total_revenue_brl DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    
    -- Audit Trail
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID,
    
    -- Soft Delete
    deleted_at TIMESTAMP WITH TIME ZONE,
    deleted_by UUID,
    deletion_reason TEXT,
    
    -- Constraints
    CONSTRAINT tenants_slug_format_check CHECK (slug ~ '^[a-z0-9-]+$'),
    CONSTRAINT tenants_cnpj_format_check CHECK (cnpj ~ '^\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}$'),
    CONSTRAINT tenants_cnpj_valid_check CHECK (validate_cnpj(cnpj)),
    CONSTRAINT tenants_cep_format_check CHECK (validate_cep(cep)),
    CONSTRAINT tenants_colors_check CHECK (
        validate_hex_color(primary_color) AND 
        validate_hex_color(secondary_color)
    ),
    CONSTRAINT tenants_email_format_check CHECK (contact_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT tenants_billing_email_format_check CHECK (
        billing_email IS NULL OR 
        billing_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    ),
    CONSTRAINT tenants_billing_cnpj_format_check CHECK (
        billing_cnpj IS NULL OR 
        (billing_cnpj ~ '^\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}$' AND validate_cnpj(billing_cnpj))
    ),
    CONSTRAINT tenants_usage_counts_check CHECK (
        current_events_count >= 0 AND
        current_admins_count >= 0 AND
        max_events_allowed > 0 AND
        max_admins_allowed > 0 AND
        max_visitors_allowed > 0 AND
        max_exhibitors_allowed > 0 AND
        total_events_created >= 0 AND
        total_revenue_brl >= 0
    ),
    CONSTRAINT tenants_onboarding_step_check CHECK (
        onboarding_current_step IN (
            'dados_empresa', 'validacao_cnpj', 'endereco', 'contato', 
            'plano', 'pagamento', 'configuracao', 'finalizado'
        )
    ),
    CONSTRAINT tenants_payment_method_check CHECK (
        payment_method IN ('pix', 'boleto', 'cartao', 'transferencia')
    ),
    CONSTRAINT tenants_regime_tributario_check CHECK (
        regime_tributario IS NULL OR
        regime_tributario IN (
            'Simples Nacional', 'Lucro Presumido', 'Lucro Real', 
            'Microempreendedor Individual', 'Imune', 'Isento'
        )
    ),
    CONSTRAINT tenants_locale_check CHECK (locale IN ('pt-BR', 'en-US')),
    CONSTRAINT tenants_data_retention_check CHECK (data_retention_months BETWEEN 12 AND 120)
);
COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP TABLE IF EXISTS tenants CASCADE;
-- COMMIT;