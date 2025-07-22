-- =====================================================================
-- EVENTRIX™ - Migration 002: Reference/Lookup Tables
-- =====================================================================
-- Description: Create all auxiliary tables for Brazilian business context
-- Created: 2025-07-22
-- =====================================================================

-- Organizer Types (Tipos de Organizadores)
CREATE TABLE organizer_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT organizer_types_code_check CHECK (code ~ '^[a-z_]+$'),
    CONSTRAINT organizer_types_sort_order_check CHECK (sort_order >= 0)
);

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

-- Tenant Statuses (Status dos Tenants)
CREATE TABLE tenant_statuses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- Business Segments (Segmentos de Negócio)
CREATE TABLE business_segments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon_name VARCHAR(50),
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT business_segments_code_check CHECK (code ~ '^[a-z_]+$'),
    CONSTRAINT business_segments_sort_order_check CHECK (sort_order >= 0)
);

-- Brazilian States (Estados Brasileiros)
CREATE TABLE brazilian_states (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(2) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    region VARCHAR(20) NOT NULL,
    capital VARCHAR(100) NOT NULL,
    timezone VARCHAR(50) NOT NULL DEFAULT 'America/Sao_Paulo',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT brazilian_states_code_check CHECK (code ~ '^[A-Z]{2}$'),
    CONSTRAINT brazilian_states_region_check CHECK (
        region IN ('Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul')
    )
);

-- Create triggers for updated_at
CREATE TRIGGER trigger_organizer_types_updated_at
    BEFORE UPDATE ON organizer_types
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_subscription_plans_updated_at
    BEFORE UPDATE ON subscription_plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_tenant_statuses_updated_at
    BEFORE UPDATE ON tenant_statuses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_business_segments_updated_at
    BEFORE UPDATE ON business_segments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_brazilian_states_updated_at
    BEFORE UPDATE ON brazilian_states
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_organizer_types_code ON organizer_types(code);
CREATE INDEX idx_organizer_types_active ON organizer_types(is_active, sort_order);

CREATE INDEX idx_subscription_plans_code ON subscription_plans(code);
CREATE INDEX idx_subscription_plans_active ON subscription_plans(is_active, sort_order);
CREATE INDEX idx_subscription_plans_popular ON subscription_plans(is_popular) WHERE is_popular = true;

CREATE INDEX idx_tenant_statuses_code ON tenant_statuses(code);
CREATE INDEX idx_tenant_statuses_active ON tenant_statuses(is_active, sort_order);

CREATE INDEX idx_business_segments_code ON business_segments(code);
CREATE INDEX idx_business_segments_active ON business_segments(is_active, sort_order);

CREATE INDEX idx_brazilian_states_code ON brazilian_states(code);
CREATE INDEX idx_brazilian_states_region ON brazilian_states(region);

-- Add comments for documentation
COMMENT ON TABLE organizer_types IS 'Tipos de organizadores de eventos no Brasil';
COMMENT ON TABLE subscription_plans IS 'Planos de assinatura do EVENTRIX™';
COMMENT ON TABLE tenant_statuses IS 'Status possíveis para tenants';
COMMENT ON TABLE business_segments IS 'Segmentos de negócio brasileiros';
COMMENT ON TABLE brazilian_states IS 'Estados e territórios brasileiros';

COMMENT ON COLUMN subscription_plans.max_events_max IS '-1 indica ilimitado';
COMMENT ON COLUMN subscription_plans.max_visitors_max IS '-1 indica ilimitado';
COMMENT ON COLUMN subscription_plans.features IS 'Funcionalidades incluídas no plano (JSON)';
COMMENT ON COLUMN subscription_plans.is_enterprise IS 'Plano enterprise com preço sob consulta';