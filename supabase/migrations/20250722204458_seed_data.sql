-- =====================================================================
-- EVENTRIX™ - Migration 006: Initial Seed Data
-- =====================================================================
-- Description: Insert initial data for Brazilian business context
-- Created: 2025-07-22
-- =====================================================================

-- =====================================================================
-- ORGANIZER TYPES (Tipos de Organizadores)
-- =====================================================================
INSERT INTO organizer_types (code, name, description, sort_order) VALUES
('tradicional', 'Organizador Tradicional', 'Empresas especializadas em organização de eventos corporativos', 1),
('centro_convencoes', 'Centro de Convenções', 'Centros de convenções e espaços para eventos', 2),
('associacao', 'Associação/Entidade', 'Associações profissionais, sindicatos e entidades de classe', 3),
('agencia_eventos', 'Agência de Eventos', 'Agências especializadas em marketing e eventos', 4),
('corporativo', 'Empresa Corporativa', 'Departamentos internos de empresas que organizam seus próprios eventos', 5),
('governo', 'Órgão Público', 'Prefeituras, secretarias e órgãos governamentais', 6),
('startup', 'Startup/Tech', 'Startups e empresas de tecnologia', 7),
('educacional', 'Instituição Educacional', 'Universidades, escolas e instituições de ensino', 8),
('ong', 'ONG/Terceiro Setor', 'ONGs e organizações do terceiro setor', 9);

-- =====================================================================
-- BUSINESS SEGMENTS (Segmentos de Negócio)
-- =====================================================================
INSERT INTO business_segments (code, name, description, icon_name, sort_order) VALUES
('tecnologia', 'Tecnologia & Inovação', 'Eventos de TI, startups, transformação digital', 'laptop', 1),
('saude', 'Saúde & Medicina', 'Congressos médicos, farmacêutico, equipamentos hospitalares', 'heart-pulse', 2),
('beleza', 'Beleza & Estética', 'Cosméticos, estética, cabelo, moda', 'sparkles', 3),
('automotivo', 'Automotivo', 'Automóveis, peças, concessionárias', 'car', 4),
('alimentacao', 'Alimentação & Bebidas', 'Food service, hortifruti, bebidas, gastronomia', 'utensils', 5),
('construcao', 'Construção & Arquitetura', 'Construção civil, decoração, móveis', 'building', 6),
('educacao', 'Educação & Treinamento', 'Educacional, cursos, capacitação profissional', 'graduation-cap', 7),
('moda', 'Moda & Têxtil', 'Confecção, calçados, acessórios, design', 'shirt', 8),
('energia', 'Energia & Sustentabilidade', 'Energia renovável, meio ambiente, sustentabilidade', 'zap', 9),
('agronegocio', 'Agronegócio', 'Agropecuária, maquinário agrícola, insumos', 'wheat', 10),
('industrial', 'Industrial & Manufatura', 'Indústria, maquinário, metalurgia', 'factory', 11),
('financeiro', 'Financeiro & Seguros', 'Bancos, fintechs, seguradoras, investimentos', 'banknote', 12),
('varejo', 'Varejo & E-commerce', 'Loja, franquias, marketplace', 'shopping-bag', 13),
('turismo', 'Turismo & Hospitalidade', 'Hotéis, agências de viagem, entretenimento', 'map-pin', 14),
('juridico', 'Jurídico & Compliance', 'Escritórios de advocacia, compliance, auditoria', 'scale', 15),
('marketing', 'Marketing & Publicidade', 'Agências, marketing digital, comunicação', 'megaphone', 16),
('logistica', 'Logística & Transporte', 'Transporte, armazenagem, distribuição', 'truck', 17),
('esportes', 'Esportes & Fitness', 'Esportes, academias, suplementos', 'dumbbell', 18),
('cultura', 'Cultura & Entretenimento', 'Arte, música, teatro, cinema', 'palette', 19),
('outros', 'Outros Segmentos', 'Demais segmentos não especificados', 'more-horizontal', 99);

-- =====================================================================
-- SUBSCRIPTION PLANS (Planos de Assinatura)
-- =====================================================================
INSERT INTO subscription_plans (
    code, name, description, 
    price_monthly, price_yearly,
    max_events_min, max_events_max, max_admins, max_visitors_min, max_visitors_max, max_exhibitors,
    support_type, features, is_popular, sort_order
) VALUES
(
    'start', 'EVENTRIX™ Start', 
    'Ideal para começar com seus primeiros eventos. Funcionalidades essenciais para pequenas empresas.',
    297.00, 2970.00,
    1, 3, 2, 100, 500, 20,
    'email',
    '{
        "basic_dashboard": true,
        "event_creation": true,
        "exhibitor_management": true,
        "basic_credentialing": true,
        "email_marketing": true,
        "basic_reports": true,
        "whatsapp_integration": true,
        "pix_payments": true,
        "basic_support": true
    }'::jsonb,
    false, 1
),
(
    'scale', 'EVENTRIX™ Scale', 
    'Para empresas em crescimento. Mais eventos, recursos avançados e integrações.',
    597.00, 5970.00,
    1, 10, 5, 500, 2000, 50,
    'email_chat',
    '{
        "advanced_dashboard": true,
        "unlimited_events": false,
        "advanced_exhibitor_tools": true,
        "facepass_credentialing": true,
        "advanced_marketing": true,
        "custom_reports": true,
        "integrations": true,
        "legalgpt": true,
        "linkai_matchmaking": true,
        "priority_support": true,
        "custom_branding": true
    }'::jsonb,
    true, 2
),
(
    'boom', 'EVENTRIX™ Boom', 
    'Para grandes organizadores. Eventos ilimitados e todos os recursos premium.',
    1197.00, 11970.00,
    1, -1, 15, 2000, -1, 200,
    '24_7_sla',
    '{
        "premium_dashboard": true,
        "unlimited_events": true,
        "premium_exhibitor_suite": true,
        "advanced_facepass": true,
        "premium_marketing_suite": true,
        "advanced_analytics": true,
        "all_integrations": true,
        "legalgpt_premium": true,
        "linkai_premium": true,
        "dedicated_support": true,
        "white_label": true,
        "api_access": true,
        "custom_integrations": true
    }'::jsonb,
    false, 3
),
(
    'enterprise', 'EVENTRIX™ Enterprise', 
    'Solução corporativa personalizada com recursos exclusivos e suporte dedicado.',
    null, null,
    1, -1, 999999, 1, -1, 999999,
    'dedicated',
    '{
        "enterprise_dashboard": true,
        "unlimited_everything": true,
        "enterprise_security": true,
        "custom_development": true,
        "dedicated_infrastructure": true,
        "premium_integrations": true,
        "ai_customization": true,
        "dedicated_account_manager": true,
        "sla_guarantee": true,
        "custom_contracts": true,
        "priority_development": true
    }'::jsonb,
    false, 4
);

-- =====================================================================
-- TENANT STATUSES (Status dos Tenants)
-- =====================================================================
INSERT INTO tenant_statuses (code, name, description, color_hex, sort_order) VALUES
('trial', 'Trial Ativo', 'Período de avaliação gratuita', '#3B82F6', 1),
('aguardando_validacao', 'Aguardando Validação', 'Aguardando validação de documentos', '#F59E0B', 2),
('ativo', 'Ativo', 'Tenant ativo e funcional', '#10B981', 3),
('suspenso', 'Suspenso', 'Temporariamente suspenso', '#EF4444', 4),
('bloqueado', 'Bloqueado', 'Bloqueado por violação de termos', '#DC2626', 5),
('cancelado', 'Cancelado', 'Assinatura cancelada pelo cliente', '#6B7280', 6),
('inadimplente', 'Inadimplente', 'Pagamento em atraso', '#F97316', 7);

-- =====================================================================
-- BRAZILIAN STATES (Estados Brasileiros)
-- =====================================================================
INSERT INTO brazilian_states (code, name, region, capital, timezone) VALUES
-- Região Norte
('AC', 'Acre', 'Norte', 'Rio Branco', 'America/Rio_Branco'),
('AP', 'Amapá', 'Norte', 'Macapá', 'America/Belem'),
('AM', 'Amazonas', 'Norte', 'Manaus', 'America/Manaus'),
('PA', 'Pará', 'Norte', 'Belém', 'America/Belem'),
('RO', 'Rondônia', 'Norte', 'Porto Velho', 'America/Porto_Velho'),
('RR', 'Roraima', 'Norte', 'Boa Vista', 'America/Boa_Vista'),
('TO', 'Tocantins', 'Norte', 'Palmas', 'America/Araguaina'),

-- Região Nordeste
('AL', 'Alagoas', 'Nordeste', 'Maceió', 'America/Maceio'),
('BA', 'Bahia', 'Nordeste', 'Salvador', 'America/Bahia'),
('CE', 'Ceará', 'Nordeste', 'Fortaleza', 'America/Fortaleza'),
('MA', 'Maranhão', 'Nordeste', 'São Luís', 'America/Fortaleza'),
('PB', 'Paraíba', 'Nordeste', 'João Pessoa', 'America/Fortaleza'),
('PE', 'Pernambuco', 'Nordeste', 'Recife', 'America/Recife'),
('PI', 'Piauí', 'Nordeste', 'Teresina', 'America/Fortaleza'),
('RN', 'Rio Grande do Norte', 'Nordeste', 'Natal', 'America/Fortaleza'),
('SE', 'Sergipe', 'Nordeste', 'Aracaju', 'America/Maceio'),

-- Região Centro-Oeste
('GO', 'Goiás', 'Centro-Oeste', 'Goiânia', 'America/Sao_Paulo'),
('MT', 'Mato Grosso', 'Centro-Oeste', 'Cuiabá', 'America/Cuiaba'),
('MS', 'Mato Grosso do Sul', 'Centro-Oeste', 'Campo Grande', 'America/Campo_Grande'),
('DF', 'Distrito Federal', 'Centro-Oeste', 'Brasília', 'America/Sao_Paulo'),

-- Região Sudeste
('ES', 'Espírito Santo', 'Sudeste', 'Vitória', 'America/Sao_Paulo'),
('MG', 'Minas Gerais', 'Sudeste', 'Belo Horizonte', 'America/Sao_Paulo'),
('RJ', 'Rio de Janeiro', 'Sudeste', 'Rio de Janeiro', 'America/Sao_Paulo'),
('SP', 'São Paulo', 'Sudeste', 'São Paulo', 'America/Sao_Paulo'),

-- Região Sul
('PR', 'Paraná', 'Sul', 'Curitiba', 'America/Sao_Paulo'),
('RS', 'Rio Grande do Sul', 'Sul', 'Porto Alegre', 'America/Sao_Paulo'),
('SC', 'Santa Catarina', 'Sul', 'Florianópolis', 'America/Sao_Paulo');

-- =====================================================================
-- INITIAL SYSTEM SETTINGS
-- =====================================================================

-- Create a function to insert default tenant settings for new tenants
CREATE OR REPLACE FUNCTION create_default_tenant_settings(tenant_uuid UUID)
RETURNS VOID AS $$
BEGIN
    INSERT INTO tenant_settings (tenant_id, category, key, value) VALUES
    -- Branding defaults
    (tenant_uuid, 'branding', 'show_powered_by', 'true'::jsonb),
    (tenant_uuid, 'branding', 'custom_css', 'null'::jsonb),
    (tenant_uuid, 'branding', 'header_height', '80'::jsonb),
    
    -- Notification settings
    (tenant_uuid, 'notifications', 'email_notifications', 'true'::jsonb),
    (tenant_uuid, 'notifications', 'whatsapp_notifications', 'true'::jsonb),
    (tenant_uuid, 'notifications', 'push_notifications', 'true'::jsonb),
    (tenant_uuid, 'notifications', 'sms_notifications', 'false'::jsonb),
    
    -- Security settings
    (tenant_uuid, 'security', 'password_policy', '{"min_length": 8, "require_special": true, "require_numbers": true}'::jsonb),
    (tenant_uuid, 'security', 'session_timeout_minutes', '120'::jsonb),
    (tenant_uuid, 'security', 'max_login_attempts', '5'::jsonb),
    
    -- Compliance settings (LGPD)
    (tenant_uuid, 'compliance', 'data_retention_days', '730'::jsonb), -- 2 anos
    (tenant_uuid, 'compliance', 'cookie_consent', 'true'::jsonb),
    (tenant_uuid, 'compliance', 'privacy_policy_url', 'null'::jsonb),
    
    -- Feature toggles
    (tenant_uuid, 'features', 'face_recognition', 'false'::jsonb),
    (tenant_uuid, 'features', 'qr_checkin', 'true'::jsonb),
    (tenant_uuid, 'features', 'exhibitor_matchmaking', 'false'::jsonb),
    (tenant_uuid, 'features', 'live_streaming', 'false'::jsonb),
    
    -- UI preferences
    (tenant_uuid, 'ui_preferences', 'default_language', '"pt-BR"'::jsonb),
    (tenant_uuid, 'ui_preferences', 'date_format', '"DD/MM/YYYY"'::jsonb),
    (tenant_uuid, 'ui_preferences', 'currency_format', '"BRL"'::jsonb),
    (tenant_uuid, 'ui_preferences', 'timezone', '"America/Sao_Paulo"'::jsonb);
END;
$$ LANGUAGE plpgsql;

-- =====================================================================
-- DATA VALIDATION AND CONSISTENCY CHECKS
-- =====================================================================

-- Verify all reference data was inserted correctly
DO $$
DECLARE
    organizer_count INTEGER;
    segment_count INTEGER;
    plan_count INTEGER;
    status_count INTEGER;
    state_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO organizer_count FROM organizer_types WHERE is_active = true;
    SELECT COUNT(*) INTO segment_count FROM business_segments WHERE is_active = true;
    SELECT COUNT(*) INTO plan_count FROM subscription_plans WHERE is_active = true;
    SELECT COUNT(*) INTO status_count FROM tenant_statuses WHERE is_active = true;
    SELECT COUNT(*) INTO state_count FROM brazilian_states WHERE is_active = true;
    
    RAISE NOTICE 'Seed data inserted successfully:';
    RAISE NOTICE '- Organizer Types: %', organizer_count;
    RAISE NOTICE '- Business Segments: %', segment_count;
    RAISE NOTICE '- Subscription Plans: %', plan_count;
    RAISE NOTICE '- Tenant Statuses: %', status_count;
    RAISE NOTICE '- Brazilian States: %', state_count;
    
    -- Validate that we have all 26 states + DF
    IF state_count != 27 THEN
        RAISE EXCEPTION 'Expected 27 Brazilian states, got %', state_count;
    END IF;
END;
$$;

-- Add helpful comments
COMMENT ON FUNCTION create_default_tenant_settings(UUID) IS 'Cria configurações padrão para novos tenants';

-- Create indexes on commonly queried seed data
CREATE INDEX idx_organizer_types_active_sorted ON organizer_types(sort_order) WHERE is_active = true;
CREATE INDEX idx_business_segments_active_sorted ON business_segments(sort_order) WHERE is_active = true;
CREATE INDEX idx_subscription_plans_active_sorted ON subscription_plans(sort_order) WHERE is_active = true;
CREATE INDEX idx_tenant_statuses_active_sorted ON tenant_statuses(sort_order) WHERE is_active = true;