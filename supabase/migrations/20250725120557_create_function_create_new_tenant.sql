-- Migration: 20250725120557_create_function_create_new_tenant.sql
-- Descrição: Criação da função para criar um novo inquilino
-- Tabela: tenants
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
CREATE OR REPLACE FUNCTION create_new_tenant(
    p_slug VARCHAR(50),
    p_cnpj VARCHAR(18),
    p_razao_social VARCHAR(200),
    p_nome_fantasia VARCHAR(100),
    p_contact_email VARCHAR(255),
    p_organizer_type_code VARCHAR(50),
    p_segment_code VARCHAR(50),
    p_state_code VARCHAR(2),
    p_plan_code VARCHAR(50) DEFAULT 'start'
)
RETURNS UUID AS $$
DECLARE
    v_tenant_id UUID;
    v_organizer_type_id UUID;
    v_segment_id UUID;
    v_state_id UUID;
    v_plan_id UUID;
    v_status_id UUID;
BEGIN
    -- Validate CNPJ
    IF NOT validate_cnpj(p_cnpj) THEN
        RAISE EXCEPTION 'CNPJ inválido: %', p_cnpj;
    END IF;
    
    -- Get reference IDs
    SELECT id INTO v_organizer_type_id FROM organizer_types WHERE code = p_organizer_type_code AND is_active = true;
    SELECT id INTO v_segment_id FROM business_segments WHERE code = p_segment_code AND is_active = true;
    SELECT id INTO v_state_id FROM brazilian_states WHERE code = p_state_code AND is_active = true;
    SELECT id INTO v_plan_id FROM subscription_plans WHERE code = p_plan_code AND is_active = true;
    SELECT id INTO v_status_id FROM tenant_statuses WHERE code = 'trial' AND is_active = true;
    
    -- Validate all references exist
    IF v_organizer_type_id IS NULL THEN
        RAISE EXCEPTION 'Tipo de organizador não encontrado: %', p_organizer_type_code;
    END IF;
    IF v_segment_id IS NULL THEN
        RAISE EXCEPTION 'Segmento de negócio não encontrado: %', p_segment_code;
    END IF;
    IF v_state_id IS NULL THEN
        RAISE EXCEPTION 'Estado não encontrado: %', p_state_code;
    END IF;
    IF v_plan_id IS NULL THEN
        RAISE EXCEPTION 'Plano de assinatura não encontrado: %', p_plan_code;
    END IF;
    
    -- Create the tenant
    INSERT INTO tenants (
        slug, cnpj, razao_social, nome_fantasia, contact_email,
        organizer_type_id, primary_segment_id, state_id, plan_id, status_id,
        endereco_logradouro, endereco_bairro, endereco_cidade, cep,
        trial_ends_at
    ) VALUES (
        p_slug, format_cnpj(p_cnpj), p_razao_social, p_nome_fantasia, p_contact_email,
        v_organizer_type_id, v_segment_id, v_state_id, v_plan_id, v_status_id,
        'A definir', 'A definir', 'A definir', '00000-000',
        CURRENT_TIMESTAMP + INTERVAL '14 days'
    ) RETURNING id INTO v_tenant_id;
    
    -- Create default settings
    PERFORM create_default_tenant_settings(v_tenant_id);
    
    -- Return the new tenant ID
    RETURN v_tenant_id;
END;
$$ LANGUAGE plpgsql;
COMMIT;

--ROLLBACK;
-- COMMIT;