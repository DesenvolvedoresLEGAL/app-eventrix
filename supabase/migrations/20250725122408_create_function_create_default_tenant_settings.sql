-- Migration: 20250725122408_create_function_create_default_tenant_settings.sql
-- Descrição: Criação da função para definir as configurações padrão do inquilino
-- Tabela: tenant_settings
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;

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
COMMIT;

--ROLLBACK;
-- COMMIT;
