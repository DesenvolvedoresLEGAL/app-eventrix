-- Migration: 20250723205104_seed_subscription_plans
-- Descrição: Seed de planos de assinatura
-- Tabela: subscription_plans
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
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

COMMIT;

--ROLLBACK;
-- DELETE FROM subscription_plans WHERE code IN ('start', 'scale', 'boom', 'enterprise');
-- COMMIT;