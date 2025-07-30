

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."tenant_document_status" AS ENUM (
    'pending',
    'verified',
    'rejected',
    'expired'
);


ALTER TYPE "public"."tenant_document_status" OWNER TO "postgres";


CREATE TYPE "public"."tenant_document_type" AS ENUM (
    'contrato_social',
    'certidao_negativa',
    'cartao_cnpj',
    'procuracao',
    'alvara_funcionamento',
    'certificado_digital',
    'comprovante_endereco',
    'inscricao_municipal',
    'outros'
);


ALTER TYPE "public"."tenant_document_type" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."calculate_tenant_usage"("p_tenant_id" "uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    v_result JSONB;
    v_current_month_start DATE;
    v_current_month_end DATE;
BEGIN
    v_current_month_start := date_trunc('month', CURRENT_DATE)::DATE;
    v_current_month_end := (date_trunc('month', CURRENT_DATE) + INTERVAL '1 month - 1 day')::DATE;
    
    SELECT jsonb_build_object(
        'tenant_id', p_tenant_id,
        'period_start', v_current_month_start,
        'period_end', v_current_month_end,
        'events_created', COALESCE(events_created, 0),
        'active_events', COALESCE(active_events, 0),
        'total_exhibitors', COALESCE(total_exhibitors, 0),
        'total_visitors', COALESCE(total_visitors, 0),
        'login_count', COALESCE(login_count, 0),
        'storage_used_mb', COALESCE(storage_used_mb, 0),
        'revenue_generated_brl', COALESCE(revenue_generated_brl, 0)
    ) INTO v_result
    FROM tenant_usage_stats
    WHERE tenant_id = p_tenant_id 
    AND period_start = v_current_month_start
    AND period_end = v_current_month_end;
    
    -- Return empty stats if no record exists
    IF v_result IS NULL THEN
        v_result := jsonb_build_object(
            'tenant_id', p_tenant_id,
            'period_start', v_current_month_start,
            'period_end', v_current_month_end,
            'events_created', 0,
            'active_events', 0,
            'total_exhibitors', 0,
            'total_visitors', 0,
            'login_count', 0,
            'storage_used_mb', 0,
            'revenue_generated_brl', 0
        );
    END IF;
    
    RETURN v_result;
END;
$$;


ALTER FUNCTION "public"."calculate_tenant_usage"("p_tenant_id" "uuid") OWNER TO "postgres";


COMMENT ON FUNCTION "public"."calculate_tenant_usage"("p_tenant_id" "uuid") IS 'Calcula estatísticas de uso do tenant no mês atual';



CREATE OR REPLACE FUNCTION "public"."change_tenant_plan"("p_tenant_id" "uuid", "p_new_plan_code" character varying, "p_reason" character varying, "p_changed_by" "uuid" DEFAULT NULL::"uuid") RETURNS boolean
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    v_current_plan_id UUID;
    v_new_plan_id UUID;
    v_price_difference DECIMAL(10,2);
    v_current_price DECIMAL(10,2);
    v_new_price DECIMAL(10,2);
BEGIN
    -- Get current plan
    SELECT plan_id INTO v_current_plan_id FROM tenants WHERE id = p_tenant_id;
    
    -- Get new plan
    SELECT id, price_monthly INTO v_new_plan_id, v_new_price 
    FROM subscription_plans 
    WHERE code = p_new_plan_code AND is_active = true;
    
    IF v_new_plan_id IS NULL THEN
        RAISE EXCEPTION 'Plano não encontrado: %', p_new_plan_code;
    END IF;
    
    -- Get current plan price
    SELECT price_monthly INTO v_current_price 
    FROM subscription_plans 
    WHERE id = v_current_plan_id;
    
    -- Calculate price difference
    v_price_difference := COALESCE(v_new_price, 0) - COALESCE(v_current_price, 0);
    
    -- Update tenant plan
    UPDATE tenants 
    SET plan_id = v_new_plan_id,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_tenant_id;
    
    -- Record plan change history
    INSERT INTO tenant_plan_history (
        tenant_id, from_plan_id, to_plan_id, change_reason,
        price_difference_brl, effective_date, changed_by
    ) VALUES (
        p_tenant_id, v_current_plan_id, v_new_plan_id, p_reason,
        v_price_difference, CURRENT_TIMESTAMP, p_changed_by
    );
    
    RETURN TRUE;
END;
$$;


ALTER FUNCTION "public"."change_tenant_plan"("p_tenant_id" "uuid", "p_new_plan_code" character varying, "p_reason" character varying, "p_changed_by" "uuid") OWNER TO "postgres";


COMMENT ON FUNCTION "public"."change_tenant_plan"("p_tenant_id" "uuid", "p_new_plan_code" character varying, "p_reason" character varying, "p_changed_by" "uuid") IS 'Altera o plano de um tenant e registra no histórico';



CREATE OR REPLACE FUNCTION "public"."cleanup_old_audit_logs"("retention_months" integer DEFAULT 24) RETURNS integer
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    deleted_count INTEGER;
    cutoff_date TIMESTAMP WITH TIME ZONE;
BEGIN
    cutoff_date := CURRENT_TIMESTAMP - (retention_months || ' months')::INTERVAL;
    
    DELETE FROM tenant_audit_log 
    WHERE created_at < cutoff_date;
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    RETURN deleted_count;
END;
$$;


ALTER FUNCTION "public"."cleanup_old_audit_logs"("retention_months" integer) OWNER TO "postgres";


COMMENT ON FUNCTION "public"."cleanup_old_audit_logs"("retention_months" integer) IS 'Remove logs de auditoria antigos para compliance LGPD';



CREATE OR REPLACE FUNCTION "public"."create_default_tenant_settings"("tenant_uuid" "uuid") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
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
$$;


ALTER FUNCTION "public"."create_default_tenant_settings"("tenant_uuid" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."create_new_tenant"("p_slug" character varying, "p_cnpj" character varying, "p_razao_social" character varying, "p_nome_fantasia" character varying, "p_contact_email" character varying, "p_organizer_type_code" character varying, "p_segment_code" character varying, "p_state_code" character varying, "p_plan_code" character varying DEFAULT 'start'::character varying) RETURNS "uuid"
    LANGUAGE "plpgsql"
    AS $$
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
$$;


ALTER FUNCTION "public"."create_new_tenant"("p_slug" character varying, "p_cnpj" character varying, "p_razao_social" character varying, "p_nome_fantasia" character varying, "p_contact_email" character varying, "p_organizer_type_code" character varying, "p_segment_code" character varying, "p_state_code" character varying, "p_plan_code" character varying) OWNER TO "postgres";


COMMENT ON FUNCTION "public"."create_new_tenant"("p_slug" character varying, "p_cnpj" character varying, "p_razao_social" character varying, "p_nome_fantasia" character varying, "p_contact_email" character varying, "p_organizer_type_code" character varying, "p_segment_code" character varying, "p_state_code" character varying, "p_plan_code" character varying) IS 'Cria um novo tenant com todas as configurações necessárias';



CREATE OR REPLACE FUNCTION "public"."decrypt_sensitive_data"("encrypted_input" "text", "key_input" "text" DEFAULT 'eventrix_default_key'::"text") RETURNS "text"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    IF encrypted_input IS NULL OR encrypted_input = '' THEN
        RETURN encrypted_input;
    END IF;
    
    RETURN decrypt(
        decode(encrypted_input, 'base64'),
        key_input::bytea,
        'aes'
    )::TEXT;
EXCEPTION
    WHEN OTHERS THEN
        RETURN NULL; -- Return NULL if decryption fails
END;
$$;


ALTER FUNCTION "public"."decrypt_sensitive_data"("encrypted_input" "text", "key_input" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."encrypt_sensitive_data"("data_input" "text", "key_input" "text" DEFAULT 'eventrix_default_key'::"text") RETURNS "text"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    IF data_input IS NULL OR data_input = '' THEN
        RETURN data_input;
    END IF;
    
    RETURN encode(
        encrypt(data_input::bytea, key_input::bytea, 'aes'),
        'base64'
    );
END;
$$;


ALTER FUNCTION "public"."encrypt_sensitive_data"("data_input" "text", "key_input" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."format_cnpj"("cnpj_input" "text") RETURNS "text"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    cnpj_clean TEXT;
BEGIN
    cnpj_clean := regexp_replace(cnpj_input, '[^0-9]', '', 'g');
    
    IF length(cnpj_clean) = 14 THEN
        RETURN substring(cnpj_clean, 1, 2) || '.' ||
               substring(cnpj_clean, 3, 3) || '.' ||
               substring(cnpj_clean, 6, 3) || '/' ||
               substring(cnpj_clean, 9, 4) || '-' ||
               substring(cnpj_clean, 13, 2);
    END IF;
    
    RETURN cnpj_input;
END;
$$;


ALTER FUNCTION "public"."format_cnpj"("cnpj_input" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."generate_monthly_usage_stats"("target_month" "date" DEFAULT CURRENT_DATE) RETURNS integer
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    tenant_record RECORD;
    stats_count INTEGER := 0;
    v_period_start DATE;
    v_period_end DATE;
BEGIN
    v_period_start := date_trunc('month', target_month)::DATE;
    v_period_end := (date_trunc('month', target_month) + INTERVAL '1 month - 1 day')::DATE;

    -- Generate stats for each active tenant
    FOR tenant_record IN 
        SELECT id FROM tenants WHERE deleted_at IS NULL
    LOOP
        INSERT INTO tenant_usage_stats (
            tenant_id, period_start, period_end,
            events_created, active_events, total_exhibitors, total_visitors, total_admins,
            login_count, api_requests, storage_used_mb, whatsapp_messages_sent, emails_sent,
            revenue_generated_brl, pix_transactions, boleto_transactions, credit_card_transactions,
            features_used, ai_requests_count
        ) VALUES (
            tenant_record.id, v_period_start, v_period_end,
            0, 0, 0, 0, 1, -- Default minimal values
            0, 0, 0, 0, 0,
            0, 0, 0, 0,
            '{}'::jsonb, 0
        )
        ON CONFLICT (tenant_id, period_start, period_end) DO NOTHING;

        stats_count := stats_count + 1;
    END LOOP;
    
    RETURN stats_count;
END;
$$;


ALTER FUNCTION "public"."generate_monthly_usage_stats"("target_month" "date") OWNER TO "postgres";


COMMENT ON FUNCTION "public"."generate_monthly_usage_stats"("target_month" "date") IS 'Gera estatísticas mensais de uso para todos os tenants';



CREATE OR REPLACE FUNCTION "public"."get_current_tenant_id"() RETURNS "uuid"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
    RETURN (current_setting('request.jwt.claims', true)::json->>'tenant_id')::UUID;
EXCEPTION
    WHEN OTHERS THEN
        RETURN NULL;
END;
$$;


ALTER FUNCTION "public"."get_current_tenant_id"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_current_user_role"() RETURNS "text"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
    RETURN current_setting('request.jwt.claims', true)::json->>'role';
EXCEPTION
    WHEN OTHERS THEN
        RETURN 'anonymous';
END;
$$;


ALTER FUNCTION "public"."get_current_user_role"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_auth_signup"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    v_first_name    TEXT := COALESCE(NEW.user_metadata->>'first_name', '');
    v_last_name     TEXT := COALESCE(NEW.user_metadata->>'last_name', '');
    v_full_name     TEXT := COALESCE(NEW.user_metadata->>'full_name', '');
    v_whatsapp      TEXT := NULLIF(NEW.user_metadata->>'whatsapp_number', '');
BEGIN
    INSERT INTO public.profiles (
        id,
        first_name,
        last_name,
        full_name,
        email,
        whatsapp_number,
        is_active
    ) VALUES (
        auth.uid(),
        v_first_name,
        v_last_name,
        v_full_name,
        auth.email(),
        v_whatsapp,
        TRUE
    );
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."handle_auth_signup"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_super_admin"() RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
    RETURN (current_setting('request.jwt.claims', true)::json->>'role') = 'super_admin';
EXCEPTION
    WHEN OTHERS THEN
        RETURN FALSE;
END;
$$;


ALTER FUNCTION "public"."is_super_admin"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."log_tenant_changes"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    tenant_uuid UUID;
    user_uuid UUID;
BEGIN
    -- Get tenant_id from the record
    IF TG_OP = 'DELETE' THEN
        tenant_uuid := OLD.tenant_id;
    ELSE
        tenant_uuid := NEW.tenant_id;
    END IF;
    
    -- Get current user
    user_uuid := (current_setting('request.jwt.claims', true)::json->>'sub')::UUID;
    
    -- Insert audit log entry
    INSERT INTO tenant_audit_log (
        tenant_id,
        user_id,
        action,
        table_name,
        record_id,
        old_values,
        new_values,
        ip_address,
        user_agent,
        session_id
    ) VALUES (
        tenant_uuid,
        user_uuid,
        TG_OP,
        TG_TABLE_NAME,
        CASE 
            WHEN TG_OP = 'DELETE' THEN OLD.id
            ELSE NEW.id
        END,
        CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN row_to_json(OLD) END,
        CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW) END,
        inet(current_setting('request.headers', true)::json->>'x-forwarded-for'),
        current_setting('request.headers', true)::json->>'user-agent',
        current_setting('request.headers', true)::json->>'x-session-id'
    );
    
    RETURN CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NEW END;
EXCEPTION
    WHEN OTHERS THEN
        -- Don't fail the main operation if audit logging fails
        RETURN CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NEW END;
END;
$$;


ALTER FUNCTION "public"."log_tenant_changes"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."suspend_tenant"("p_tenant_id" "uuid", "p_reason" "text", "p_suspended_by" "uuid" DEFAULT NULL::"uuid") RETURNS boolean
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    v_suspended_status_id UUID;
BEGIN
    -- Get suspended status ID
    SELECT id INTO v_suspended_status_id 
    FROM tenant_statuses 
    WHERE code = 'suspenso' AND is_active = true;
    
    -- Update tenant status
    UPDATE tenants 
    SET status_id = v_suspended_status_id,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_tenant_id;
    
    -- Log the suspension
    INSERT INTO tenant_audit_log (
        tenant_id, user_id, action, table_name, record_id,
        new_values, lgpd_purpose
    ) VALUES (
        p_tenant_id, p_suspended_by, 'SUSPEND', 'tenants', p_tenant_id,
        json_build_object('reason', p_reason, 'suspended_at', CURRENT_TIMESTAMP)::jsonb,
        'Suspensão por violação de termos ou inadimplência'
    );
    
    RETURN TRUE;
END;
$$;


ALTER FUNCTION "public"."suspend_tenant"("p_tenant_id" "uuid", "p_reason" "text", "p_suspended_by" "uuid") OWNER TO "postgres";


COMMENT ON FUNCTION "public"."suspend_tenant"("p_tenant_id" "uuid", "p_reason" "text", "p_suspended_by" "uuid") IS 'Suspende um tenant e registra o motivo';



CREATE OR REPLACE FUNCTION "public"."update_tenant_plan_cache"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    IF NEW.plan_id != OLD.plan_id THEN
        UPDATE tenants 
        SET 
            max_events_allowed = (
                SELECT CASE 
                    WHEN sp.max_events_max = -1 THEN 999999
                    ELSE sp.max_events_max 
                END
                FROM subscription_plans sp 
                WHERE sp.id = NEW.plan_id
            ),
            max_admins_allowed = (
                SELECT sp.max_admins
                FROM subscription_plans sp 
                WHERE sp.id = NEW.plan_id
            ),
            max_visitors_allowed = (
                SELECT CASE 
                    WHEN sp.max_visitors_max = -1 THEN 999999
                    ELSE sp.max_visitors_max 
                END
                FROM subscription_plans sp 
                WHERE sp.id = NEW.plan_id
            ),
            max_exhibitors_allowed = (
                SELECT sp.max_exhibitors
                FROM subscription_plans sp 
                WHERE sp.id = NEW.plan_id
            ),
            features_enabled = (
                SELECT sp.features
                FROM subscription_plans sp 
                WHERE sp.id = NEW.plan_id
            )
        WHERE id = NEW.id;
    END IF;
    
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_tenant_plan_cache"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_updated_at_column"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."validate_cep"("cep_input" "text") RETURNS boolean
    LANGUAGE "plpgsql"
    AS $_$
BEGIN
    RETURN cep_input IS NULL OR cep_input ~ '^\d{5}-\d{3}$';
END;
$_$;


ALTER FUNCTION "public"."validate_cep"("cep_input" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."validate_cnpj"("cnpj_input" "text") RETURNS boolean
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    cnpj_clean TEXT;
    dig1 INTEGER;
    dig2 INTEGER;
    peso INTEGER;
    soma INTEGER;
    i INTEGER;
BEGIN
    -- Remove formatting characters
    cnpj_clean := regexp_replace(cnpj_input, '[^0-9]', '', 'g');
    
    -- Check if it has exactly 14 digits
    IF length(cnpj_clean) != 14 THEN
        RETURN FALSE;
    END IF;
    
    -- Check for repeated digits (invalid CNPJs like 11111111111111)
    IF cnpj_clean = repeat(substring(cnpj_clean, 1, 1), 14) THEN
        RETURN FALSE;
    END IF;
    
    -- Calculate first check digit
    soma := 0;
    peso := 5;
    FOR i IN 1..12 LOOP
        soma := soma + (substring(cnpj_clean, i, 1)::INTEGER * peso);
        peso := peso - 1;
        IF peso < 2 THEN
            peso := 9;
        END IF;
    END LOOP;
    
    dig1 := 11 - (soma % 11);
    IF dig1 >= 10 THEN
        dig1 := 0;
    END IF;
    
    -- Calculate second check digit
    soma := 0;
    peso := 6;
    FOR i IN 1..13 LOOP
        soma := soma + (substring(cnpj_clean, i, 1)::INTEGER * peso);
        peso := peso - 1;
        IF peso < 2 THEN
            peso := 9;
        END IF;
    END LOOP;
    
    dig2 := 11 - (soma % 11);
    IF dig2 >= 10 THEN
        dig2 := 0;
    END IF;
    
    -- Verify check digits
    RETURN (substring(cnpj_clean, 13, 1)::INTEGER = dig1) AND 
           (substring(cnpj_clean, 14, 1)::INTEGER = dig2);
END;
$$;


ALTER FUNCTION "public"."validate_cnpj"("cnpj_input" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."validate_hex_color"("color_input" "text") RETURNS boolean
    LANGUAGE "plpgsql"
    AS $_$
BEGIN
    RETURN color_input ~ '^#[0-9A-Fa-f]{6}$';
END;
$_$;


ALTER FUNCTION "public"."validate_hex_color"("color_input" "text") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."brazilian_states" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "code" character varying(2) NOT NULL,
    "name" character varying(100) NOT NULL,
    "region" character varying(20) NOT NULL,
    "capital" character varying(100) NOT NULL,
    "timezone" character varying(50) DEFAULT 'America/Sao_Paulo'::character varying NOT NULL,
    "is_active" boolean DEFAULT true NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "brazilian_states_code_check" CHECK ((("code")::"text" ~ '^[A-Z]{2}$'::"text")),
    CONSTRAINT "brazilian_states_region_check" CHECK ((("region")::"text" = ANY ((ARRAY['Norte'::character varying, 'Nordeste'::character varying, 'Centro-Oeste'::character varying, 'Sudeste'::character varying, 'Sul'::character varying])::"text"[])))
);


ALTER TABLE "public"."brazilian_states" OWNER TO "postgres";


COMMENT ON TABLE "public"."brazilian_states" IS 'Estados e territórios brasileiros';



CREATE TABLE IF NOT EXISTS "public"."business_segments" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "code" character varying(50) NOT NULL,
    "name" character varying(100) NOT NULL,
    "description" "text",
    "icon_name" character varying(50),
    "is_active" boolean DEFAULT true NOT NULL,
    "sort_order" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "business_segments_code_check" CHECK ((("code")::"text" ~ '^[a-z_]+$'::"text")),
    CONSTRAINT "business_segments_sort_order_check" CHECK (("sort_order" >= 0))
);


ALTER TABLE "public"."business_segments" OWNER TO "postgres";


COMMENT ON TABLE "public"."business_segments" IS 'Segmentos de negócio brasileiros';



CREATE TABLE IF NOT EXISTS "public"."organizer_types" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "code" character varying(50) NOT NULL,
    "name" character varying(100) NOT NULL,
    "description" "text",
    "is_active" boolean DEFAULT true NOT NULL,
    "sort_order" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "organizer_types_code_check" CHECK ((("code")::"text" ~ '^[a-z_]+$'::"text")),
    CONSTRAINT "organizer_types_sort_order_check" CHECK (("sort_order" >= 0))
);


ALTER TABLE "public"."organizer_types" OWNER TO "postgres";


COMMENT ON TABLE "public"."organizer_types" IS 'Tipos de organizadores de eventos no Brasil';



CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "first_name" character varying(100) NOT NULL,
    "last_name" character varying(100) NOT NULL,
    "full_name" character varying(200) DEFAULT ''::character varying NOT NULL,
    "email" character varying(255) NOT NULL,
    "whatsapp_number" character varying(20),
    "is_active" boolean DEFAULT true NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


COMMENT ON TABLE "public"."profiles" IS 'Tabela de usuários vinculados ao módulo de autenticação';



CREATE TABLE IF NOT EXISTS "public"."subscription_plans" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "code" character varying(50) NOT NULL,
    "name" character varying(100) NOT NULL,
    "description" "text",
    "price_monthly" numeric(10,2),
    "price_yearly" numeric(10,2),
    "max_events_min" integer DEFAULT 1 NOT NULL,
    "max_events_max" integer DEFAULT '-1'::integer NOT NULL,
    "max_admins" integer DEFAULT 1 NOT NULL,
    "max_visitors_min" integer DEFAULT 100 NOT NULL,
    "max_visitors_max" integer DEFAULT '-1'::integer NOT NULL,
    "max_exhibitors" integer DEFAULT 10 NOT NULL,
    "support_type" character varying(50) DEFAULT 'email'::character varying NOT NULL,
    "features" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "is_popular" boolean DEFAULT false NOT NULL,
    "is_enterprise" boolean DEFAULT false NOT NULL,
    "is_active" boolean DEFAULT true NOT NULL,
    "sort_order" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "subscription_plans_code_check" CHECK ((("code")::"text" ~ '^[a-z_]+$'::"text")),
    CONSTRAINT "subscription_plans_limits_check" CHECK ((("max_events_min" > 0) AND (("max_events_max" = '-1'::integer) OR ("max_events_max" >= "max_events_min")) AND ("max_admins" > 0) AND ("max_visitors_min" > 0) AND (("max_visitors_max" = '-1'::integer) OR ("max_visitors_max" >= "max_visitors_min")) AND ("max_exhibitors" > 0))),
    CONSTRAINT "subscription_plans_prices_check" CHECK (((("price_monthly" IS NULL) AND ("price_yearly" IS NULL) AND ("is_enterprise" = true)) OR (("price_monthly" > (0)::numeric) AND ("price_yearly" > (0)::numeric)))),
    CONSTRAINT "subscription_plans_sort_order_check" CHECK (("sort_order" >= 0)),
    CONSTRAINT "subscription_plans_support_check" CHECK ((("support_type")::"text" = ANY ((ARRAY['email'::character varying, 'email_chat'::character varying, '24_7_sla'::character varying, 'dedicated'::character varying])::"text"[])))
);


ALTER TABLE "public"."subscription_plans" OWNER TO "postgres";


COMMENT ON TABLE "public"."subscription_plans" IS 'Planos de assinatura do EVENTRIX™';



COMMENT ON COLUMN "public"."subscription_plans"."max_events_max" IS '-1 indica ilimitado, valores grandes (999999) indicam limites muito altos';



COMMENT ON COLUMN "public"."subscription_plans"."max_admins" IS 'Número máximo de administradores, valores grandes (999999) representam limites muito altos';



COMMENT ON COLUMN "public"."subscription_plans"."max_visitors_max" IS '-1 indica ilimitado, valores grandes (999999) indicam limites muito altos';



COMMENT ON COLUMN "public"."subscription_plans"."max_exhibitors" IS 'Número máximo de expositores por evento, valores grandes (999999) representam limites muito altos';



COMMENT ON COLUMN "public"."subscription_plans"."features" IS 'Funcionalidades incluídas no plano (JSON)';



COMMENT ON COLUMN "public"."subscription_plans"."is_enterprise" IS 'Plano enterprise com preço sob consulta';



CREATE TABLE IF NOT EXISTS "public"."tenant_audit_log" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "tenant_id" "uuid" NOT NULL,
    "user_id" "uuid",
    "action" character varying(50) NOT NULL,
    "table_name" character varying(100) NOT NULL,
    "record_id" "uuid",
    "old_values" "jsonb",
    "new_values" "jsonb",
    "ip_address" "inet",
    "user_agent" "text",
    "session_id" character varying(100),
    "lgpd_purpose" "text",
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."tenant_audit_log" OWNER TO "postgres";


COMMENT ON TABLE "public"."tenant_audit_log" IS 'Log de auditoria completo para compliance LGPD';



COMMENT ON COLUMN "public"."tenant_audit_log"."lgpd_purpose" IS 'Finalidade do processamento para compliance LGPD';



CREATE TABLE IF NOT EXISTS "public"."tenant_documents" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "tenant_id" "uuid" NOT NULL,
    "document_type" "public"."tenant_document_type" NOT NULL,
    "document_name" character varying(200) NOT NULL,
    "file_url" "text" NOT NULL,
    "file_size_bytes" integer NOT NULL,
    "mime_type" character varying(100) NOT NULL,
    "verification_status" "public"."tenant_document_status" DEFAULT 'pending'::"public"."tenant_document_status" NOT NULL,
    "verified_at" timestamp with time zone,
    "verified_by" "uuid",
    "expires_at" timestamp with time zone,
    "rejection_reason" "text",
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "tenant_documents_file_size_bytes_check" CHECK (("file_size_bytes" > 0)),
    CONSTRAINT "tenant_documents_mime_type_check" CHECK ((("mime_type")::"text" = ANY ((ARRAY['application/pdf'::character varying, 'image/jpeg'::character varying, 'image/png'::character varying, 'image/webp'::character varying, 'application/msword'::character varying, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'::character varying])::"text"[])))
);


ALTER TABLE "public"."tenant_documents" OWNER TO "postgres";


COMMENT ON TABLE "public"."tenant_documents" IS 'Documentos legais e comprobatórios brasileiros';



COMMENT ON COLUMN "public"."tenant_documents"."verification_status" IS 'Status da verificação do documento';



CREATE TABLE IF NOT EXISTS "public"."tenant_plan_history" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "tenant_id" "uuid" NOT NULL,
    "from_plan_id" "uuid",
    "to_plan_id" "uuid" NOT NULL,
    "change_reason" character varying(100) NOT NULL,
    "price_difference_brl" numeric(10,2),
    "effective_date" timestamp with time zone NOT NULL,
    "changed_by" "uuid",
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "tenant_plan_history_different_plans" CHECK ((("from_plan_id" IS NULL) OR ("from_plan_id" <> "to_plan_id"))),
    CONSTRAINT "tenant_plan_history_reason_check" CHECK ((("change_reason")::"text" = ANY ((ARRAY['upgrade'::character varying, 'downgrade'::character varying, 'trial_conversion'::character varying, 'renewal'::character varying, 'cancellation'::character varying, 'reactivation'::character varying, 'administrative'::character varying])::"text"[])))
);


ALTER TABLE "public"."tenant_plan_history" OWNER TO "postgres";


COMMENT ON TABLE "public"."tenant_plan_history" IS 'Histórico de mudanças de planos';



CREATE TABLE IF NOT EXISTS "public"."tenant_settings" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "tenant_id" "uuid" NOT NULL,
    "category" character varying(50) NOT NULL,
    "key" character varying(100) NOT NULL,
    "value" "jsonb" NOT NULL,
    "is_sensitive" boolean DEFAULT false NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_by" "uuid",
    CONSTRAINT "tenant_settings_category_check" CHECK ((("category")::"text" = ANY ((ARRAY['branding'::character varying, 'notifications'::character varying, 'integrations'::character varying, 'security'::character varying, 'billing'::character varying, 'compliance'::character varying, 'features'::character varying, 'ui_preferences'::character varying])::"text"[]))),
    CONSTRAINT "tenant_settings_key_format_check" CHECK ((("key")::"text" ~ '^[a-z_][a-z0-9_]*$'::"text"))
);


ALTER TABLE "public"."tenant_settings" OWNER TO "postgres";


COMMENT ON TABLE "public"."tenant_settings" IS 'Configurações customizáveis por tenant';



COMMENT ON COLUMN "public"."tenant_settings"."is_sensitive" IS 'Indica se o valor deve ser criptografado';



CREATE TABLE IF NOT EXISTS "public"."tenant_statuses" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "code" character varying(50) NOT NULL,
    "name" character varying(100) NOT NULL,
    "description" "text",
    "color_hex" character varying(7) DEFAULT '#6B7280'::character varying NOT NULL,
    "is_active" boolean DEFAULT true NOT NULL,
    "sort_order" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "tenant_statuses_code_check" CHECK ((("code")::"text" ~ '^[a-z_]+$'::"text")),
    CONSTRAINT "tenant_statuses_color_check" CHECK ("public"."validate_hex_color"(("color_hex")::"text")),
    CONSTRAINT "tenant_statuses_sort_order_check" CHECK (("sort_order" >= 0))
);


ALTER TABLE "public"."tenant_statuses" OWNER TO "postgres";


COMMENT ON TABLE "public"."tenant_statuses" IS 'Status possíveis para tenants';



CREATE TABLE IF NOT EXISTS "public"."tenant_usage_stats" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "tenant_id" "uuid" NOT NULL,
    "period_start" "date" NOT NULL,
    "period_end" "date" NOT NULL,
    "events_created" integer DEFAULT 0 NOT NULL,
    "active_events" integer DEFAULT 0 NOT NULL,
    "total_exhibitors" integer DEFAULT 0 NOT NULL,
    "total_visitors" integer DEFAULT 0 NOT NULL,
    "total_admins" integer DEFAULT 0 NOT NULL,
    "login_count" integer DEFAULT 0 NOT NULL,
    "api_requests" integer DEFAULT 0 NOT NULL,
    "storage_used_mb" integer DEFAULT 0 NOT NULL,
    "whatsapp_messages_sent" integer DEFAULT 0 NOT NULL,
    "emails_sent" integer DEFAULT 0 NOT NULL,
    "revenue_generated_brl" numeric(15,2) DEFAULT 0.00 NOT NULL,
    "pix_transactions" integer DEFAULT 0 NOT NULL,
    "boleto_transactions" integer DEFAULT 0 NOT NULL,
    "credit_card_transactions" integer DEFAULT 0 NOT NULL,
    "features_used" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "ai_requests_count" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "tenant_usage_stats_metrics_check" CHECK ((("events_created" >= 0) AND ("active_events" >= 0) AND ("total_exhibitors" >= 0) AND ("total_visitors" >= 0) AND ("total_admins" >= 0) AND ("login_count" >= 0) AND ("api_requests" >= 0) AND ("storage_used_mb" >= 0) AND ("whatsapp_messages_sent" >= 0) AND ("emails_sent" >= 0) AND ("revenue_generated_brl" >= (0)::numeric) AND ("pix_transactions" >= 0) AND ("boleto_transactions" >= 0) AND ("credit_card_transactions" >= 0) AND ("ai_requests_count" >= 0))),
    CONSTRAINT "tenant_usage_stats_period_check" CHECK (("period_end" >= "period_start"))
);


ALTER TABLE "public"."tenant_usage_stats" OWNER TO "postgres";


COMMENT ON TABLE "public"."tenant_usage_stats" IS 'Estatísticas de uso dos tenants por período';



CREATE TABLE IF NOT EXISTS "public"."tenants" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "slug" character varying(50) NOT NULL,
    "cnpj" character varying(18) NOT NULL,
    "razao_social" character varying(200) NOT NULL,
    "nome_fantasia" character varying(100),
    "inscricao_estadual" character varying(20),
    "cnae_principal" character varying(10),
    "organizer_type_id" "uuid" NOT NULL,
    "primary_segment_id" "uuid" NOT NULL,
    "email_domain" character varying(100),
    "domain_validated" boolean DEFAULT false NOT NULL,
    "domain_validated_at" timestamp with time zone,
    "status_id" "uuid" NOT NULL,
    "plan_id" "uuid" NOT NULL,
    "plan_expires_at" timestamp with time zone,
    "trial_ends_at" timestamp with time zone,
    "primary_color" character varying(7) DEFAULT '#4D2BFB'::character varying NOT NULL,
    "secondary_color" character varying(7) DEFAULT '#03F9FF'::character varying NOT NULL,
    "logo_url" "text",
    "favicon_url" "text",
    "font_family" character varying(100) DEFAULT 'Neue Haas Unica'::character varying NOT NULL,
    "contact_email" character varying(255) NOT NULL,
    "contact_phone" character varying(20),
    "whatsapp_number" character varying(20),
    "website_url" "text",
    "endereco_logradouro" character varying(200) NOT NULL,
    "endereco_numero" character varying(10),
    "endereco_complemento" character varying(100),
    "endereco_bairro" character varying(100) NOT NULL,
    "endereco_cidade" character varying(100) NOT NULL,
    "state_id" "uuid" NOT NULL,
    "cep" character varying(9) NOT NULL,
    "timezone" character varying(50) DEFAULT 'America/Sao_Paulo'::character varying NOT NULL,
    "locale" character varying(5) DEFAULT 'pt-BR'::character varying NOT NULL,
    "current_events_count" integer DEFAULT 0 NOT NULL,
    "current_admins_count" integer DEFAULT 0 NOT NULL,
    "max_events_allowed" integer DEFAULT 1 NOT NULL,
    "max_admins_allowed" integer DEFAULT 1 NOT NULL,
    "max_visitors_allowed" integer DEFAULT 100 NOT NULL,
    "max_exhibitors_allowed" integer DEFAULT 10 NOT NULL,
    "onboarding_completed" boolean DEFAULT false NOT NULL,
    "onboarding_current_step" character varying(50) DEFAULT 'dados_empresa'::character varying NOT NULL,
    "setup_wizard_completed" boolean DEFAULT false NOT NULL,
    "first_event_created" boolean DEFAULT false NOT NULL,
    "features_enabled" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "integrations_config" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "lgpd_acceptance_date" timestamp with time zone,
    "data_retention_months" integer DEFAULT 24 NOT NULL,
    "billing_email" character varying(255),
    "billing_cnpj" character varying(18),
    "billing_endereco" "jsonb",
    "payment_method" character varying(50) DEFAULT 'pix'::character varying NOT NULL,
    "payment_provider_id" character varying(100),
    "regime_tributario" character varying(50),
    "optante_simples_nacional" boolean DEFAULT false NOT NULL,
    "last_login_at" timestamp with time zone,
    "total_events_created" integer DEFAULT 0 NOT NULL,
    "total_revenue_brl" numeric(15,2) DEFAULT 0.00 NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "created_by" "uuid",
    "deleted_at" timestamp with time zone,
    "deleted_by" "uuid",
    "deletion_reason" "text",
    CONSTRAINT "tenants_billing_cnpj_format_check" CHECK ((("billing_cnpj" IS NULL) OR ((("billing_cnpj")::"text" ~ '^\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}$'::"text") AND "public"."validate_cnpj"(("billing_cnpj")::"text")))),
    CONSTRAINT "tenants_billing_email_format_check" CHECK ((("billing_email" IS NULL) OR (("billing_email")::"text" ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'::"text"))),
    CONSTRAINT "tenants_cep_format_check" CHECK ("public"."validate_cep"(("cep")::"text")),
    CONSTRAINT "tenants_cnpj_format_check" CHECK ((("cnpj")::"text" ~ '^\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}$'::"text")),
    CONSTRAINT "tenants_cnpj_valid_check" CHECK ("public"."validate_cnpj"(("cnpj")::"text")),
    CONSTRAINT "tenants_colors_check" CHECK (("public"."validate_hex_color"(("primary_color")::"text") AND "public"."validate_hex_color"(("secondary_color")::"text"))),
    CONSTRAINT "tenants_data_retention_check" CHECK ((("data_retention_months" >= 12) AND ("data_retention_months" <= 120))),
    CONSTRAINT "tenants_email_format_check" CHECK ((("contact_email")::"text" ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'::"text")),
    CONSTRAINT "tenants_locale_check" CHECK ((("locale")::"text" = ANY ((ARRAY['pt-BR'::character varying, 'en-US'::character varying])::"text"[]))),
    CONSTRAINT "tenants_onboarding_step_check" CHECK ((("onboarding_current_step")::"text" = ANY ((ARRAY['dados_empresa'::character varying, 'validacao_cnpj'::character varying, 'endereco'::character varying, 'contato'::character varying, 'plano'::character varying, 'pagamento'::character varying, 'configuracao'::character varying, 'finalizado'::character varying])::"text"[]))),
    CONSTRAINT "tenants_payment_method_check" CHECK ((("payment_method")::"text" = ANY ((ARRAY['pix'::character varying, 'boleto'::character varying, 'cartao'::character varying, 'transferencia'::character varying])::"text"[]))),
    CONSTRAINT "tenants_regime_tributario_check" CHECK ((("regime_tributario" IS NULL) OR (("regime_tributario")::"text" = ANY ((ARRAY['Simples Nacional'::character varying, 'Lucro Presumido'::character varying, 'Lucro Real'::character varying, 'Microempreendedor Individual'::character varying, 'Imune'::character varying, 'Isento'::character varying])::"text"[])))),
    CONSTRAINT "tenants_slug_format_check" CHECK ((("slug")::"text" ~ '^[a-z0-9-]+$'::"text")),
    CONSTRAINT "tenants_usage_counts_check" CHECK ((("current_events_count" >= 0) AND ("current_admins_count" >= 0) AND ("max_events_allowed" > 0) AND ("max_admins_allowed" > 0) AND ("max_visitors_allowed" > 0) AND ("max_exhibitors_allowed" > 0) AND ("total_events_created" >= 0) AND ("total_revenue_brl" >= (0)::numeric)))
);


ALTER TABLE "public"."tenants" OWNER TO "postgres";


COMMENT ON TABLE "public"."tenants" IS 'Tabela principal dos tenants (empresas brasileiras) do EVENTRIX™';



COMMENT ON COLUMN "public"."tenants"."cnpj" IS 'CNPJ formatado XX.XXX.XXX/XXXX-XX com validação de dígitos verificadores';



COMMENT ON COLUMN "public"."tenants"."razao_social" IS 'Razão social da empresa conforme CNPJ';



COMMENT ON COLUMN "public"."tenants"."nome_fantasia" IS 'Nome fantasia ou marca da empresa';



COMMENT ON COLUMN "public"."tenants"."email_domain" IS 'Domínio corporativo para validação automática de usuários';



COMMENT ON COLUMN "public"."tenants"."primary_color" IS 'Cor primária da marca em formato hexadecimal';



COMMENT ON COLUMN "public"."tenants"."endereco_logradouro" IS 'Logradouro (rua, avenida, praça, etc.)';



COMMENT ON COLUMN "public"."tenants"."cep" IS 'CEP no formato XXXXX-XXX';



COMMENT ON COLUMN "public"."tenants"."features_enabled" IS 'Funcionalidades habilitadas baseadas no plano (JSON)';



COMMENT ON COLUMN "public"."tenants"."lgpd_acceptance_date" IS 'Data de aceite dos termos da LGPD';



COMMENT ON COLUMN "public"."tenants"."regime_tributario" IS 'Regime tributário da empresa (Simples Nacional, etc.)';



COMMENT ON COLUMN "public"."tenants"."total_revenue_brl" IS 'Receita total gerada pela empresa na plataforma (em BRL)';



COMMENT ON COLUMN "public"."tenants"."deleted_at" IS 'Data de exclusão lógica (soft delete)';



ALTER TABLE ONLY "public"."brazilian_states"
    ADD CONSTRAINT "brazilian_states_code_key" UNIQUE ("code");



ALTER TABLE ONLY "public"."brazilian_states"
    ADD CONSTRAINT "brazilian_states_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."business_segments"
    ADD CONSTRAINT "business_segments_code_key" UNIQUE ("code");



ALTER TABLE ONLY "public"."business_segments"
    ADD CONSTRAINT "business_segments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."organizer_types"
    ADD CONSTRAINT "organizer_types_code_key" UNIQUE ("code");



ALTER TABLE ONLY "public"."organizer_types"
    ADD CONSTRAINT "organizer_types_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."subscription_plans"
    ADD CONSTRAINT "subscription_plans_code_key" UNIQUE ("code");



ALTER TABLE ONLY "public"."subscription_plans"
    ADD CONSTRAINT "subscription_plans_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tenant_audit_log"
    ADD CONSTRAINT "tenant_audit_log_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tenant_documents"
    ADD CONSTRAINT "tenant_documents_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tenant_plan_history"
    ADD CONSTRAINT "tenant_plan_history_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tenant_settings"
    ADD CONSTRAINT "tenant_settings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tenant_settings"
    ADD CONSTRAINT "tenant_settings_unique_key" UNIQUE ("tenant_id", "category", "key");



ALTER TABLE ONLY "public"."tenant_statuses"
    ADD CONSTRAINT "tenant_statuses_code_key" UNIQUE ("code");



ALTER TABLE ONLY "public"."tenant_statuses"
    ADD CONSTRAINT "tenant_statuses_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tenant_usage_stats"
    ADD CONSTRAINT "tenant_usage_stats_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tenant_usage_stats"
    ADD CONSTRAINT "tenant_usage_stats_unique_period" UNIQUE ("tenant_id", "period_start", "period_end");



ALTER TABLE ONLY "public"."tenants"
    ADD CONSTRAINT "tenants_cnpj_key" UNIQUE ("cnpj");



ALTER TABLE ONLY "public"."tenants"
    ADD CONSTRAINT "tenants_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tenants"
    ADD CONSTRAINT "tenants_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



CREATE INDEX "idx_brazilian_states_code" ON "public"."brazilian_states" USING "btree" ("code");



CREATE INDEX "idx_brazilian_states_region" ON "public"."brazilian_states" USING "btree" ("region");



CREATE INDEX "idx_business_segments_active" ON "public"."business_segments" USING "btree" ("is_active", "sort_order");



CREATE INDEX "idx_business_segments_code" ON "public"."business_segments" USING "btree" ("code");



CREATE INDEX "idx_organizer_types_active" ON "public"."organizer_types" USING "btree" ("is_active", "sort_order");



CREATE INDEX "idx_organizer_types_code" ON "public"."organizer_types" USING "btree" ("code");



CREATE INDEX "idx_subscription_plans_active" ON "public"."subscription_plans" USING "btree" ("is_active", "sort_order");



CREATE INDEX "idx_subscription_plans_code" ON "public"."subscription_plans" USING "btree" ("code");



CREATE INDEX "idx_subscription_plans_popular" ON "public"."subscription_plans" USING "btree" ("is_popular") WHERE ("is_popular" = true);



CREATE INDEX "idx_tenant_audit_log_action" ON "public"."tenant_audit_log" USING "btree" ("action");



CREATE INDEX "idx_tenant_audit_log_created" ON "public"."tenant_audit_log" USING "btree" ("created_at");



CREATE INDEX "idx_tenant_audit_log_record" ON "public"."tenant_audit_log" USING "btree" ("table_name", "record_id");



CREATE INDEX "idx_tenant_audit_log_table" ON "public"."tenant_audit_log" USING "btree" ("table_name");



CREATE INDEX "idx_tenant_audit_log_tenant" ON "public"."tenant_audit_log" USING "btree" ("tenant_id");



CREATE INDEX "idx_tenant_audit_log_tenant_created" ON "public"."tenant_audit_log" USING "btree" ("tenant_id", "created_at");



CREATE INDEX "idx_tenant_audit_log_user" ON "public"."tenant_audit_log" USING "btree" ("user_id");



CREATE INDEX "idx_tenant_documents_expires" ON "public"."tenant_documents" USING "btree" ("expires_at") WHERE ("expires_at" IS NOT NULL);



CREATE INDEX "idx_tenant_documents_status" ON "public"."tenant_documents" USING "btree" ("verification_status");



CREATE INDEX "idx_tenant_documents_tenant" ON "public"."tenant_documents" USING "btree" ("tenant_id");



CREATE INDEX "idx_tenant_documents_type" ON "public"."tenant_documents" USING "btree" ("tenant_id", "document_type");



CREATE INDEX "idx_tenant_plan_history_effective" ON "public"."tenant_plan_history" USING "btree" ("effective_date");



CREATE INDEX "idx_tenant_plan_history_from_plan" ON "public"."tenant_plan_history" USING "btree" ("from_plan_id");



CREATE INDEX "idx_tenant_plan_history_tenant" ON "public"."tenant_plan_history" USING "btree" ("tenant_id");



CREATE INDEX "idx_tenant_plan_history_to_plan" ON "public"."tenant_plan_history" USING "btree" ("to_plan_id");



CREATE INDEX "idx_tenant_settings_category" ON "public"."tenant_settings" USING "btree" ("tenant_id", "category");



CREATE INDEX "idx_tenant_settings_sensitive" ON "public"."tenant_settings" USING "btree" ("tenant_id") WHERE ("is_sensitive" = true);



CREATE INDEX "idx_tenant_settings_tenant" ON "public"."tenant_settings" USING "btree" ("tenant_id");



CREATE INDEX "idx_tenant_statuses_active" ON "public"."tenant_statuses" USING "btree" ("is_active", "sort_order");



CREATE INDEX "idx_tenant_statuses_code" ON "public"."tenant_statuses" USING "btree" ("code");



CREATE INDEX "idx_tenant_usage_stats_period" ON "public"."tenant_usage_stats" USING "btree" ("period_start", "period_end");



CREATE INDEX "idx_tenant_usage_stats_tenant" ON "public"."tenant_usage_stats" USING "btree" ("tenant_id");



CREATE INDEX "idx_tenant_usage_stats_tenant_period" ON "public"."tenant_usage_stats" USING "btree" ("tenant_id", "period_start", "period_end");



CREATE INDEX "idx_tenants_active" ON "public"."tenants" USING "btree" ("id") WHERE ("deleted_at" IS NULL);



CREATE INDEX "idx_tenants_cnpj" ON "public"."tenants" USING "btree" ("cnpj");



CREATE INDEX "idx_tenants_contact_email" ON "public"."tenants" USING "btree" ("contact_email");



CREATE INDEX "idx_tenants_created_at" ON "public"."tenants" USING "btree" ("created_at");



CREATE INDEX "idx_tenants_created_status" ON "public"."tenants" USING "btree" ("created_at", "status_id") WHERE ("deleted_at" IS NULL);



CREATE INDEX "idx_tenants_domain" ON "public"."tenants" USING "btree" ("email_domain") WHERE ("email_domain" IS NOT NULL);



CREATE INDEX "idx_tenants_last_login" ON "public"."tenants" USING "btree" ("last_login_at");



CREATE INDEX "idx_tenants_onboarding" ON "public"."tenants" USING "btree" ("onboarding_completed", "onboarding_current_step");



CREATE INDEX "idx_tenants_organizer_type" ON "public"."tenants" USING "btree" ("organizer_type_id");



CREATE INDEX "idx_tenants_plan" ON "public"."tenants" USING "btree" ("plan_id");



CREATE INDEX "idx_tenants_plan_expires" ON "public"."tenants" USING "btree" ("plan_expires_at") WHERE ("plan_expires_at" IS NOT NULL);



CREATE INDEX "idx_tenants_search_nome_fantasia" ON "public"."tenants" USING "gin" ("to_tsvector"('"portuguese"'::"regconfig", (COALESCE("nome_fantasia", ''::character varying))::"text"));



CREATE INDEX "idx_tenants_search_razao_social" ON "public"."tenants" USING "gin" ("to_tsvector"('"portuguese"'::"regconfig", ("razao_social")::"text"));



CREATE INDEX "idx_tenants_segment" ON "public"."tenants" USING "btree" ("primary_segment_id");



CREATE INDEX "idx_tenants_slug" ON "public"."tenants" USING "btree" ("slug");



CREATE INDEX "idx_tenants_state" ON "public"."tenants" USING "btree" ("state_id");



CREATE INDEX "idx_tenants_state_segment" ON "public"."tenants" USING "btree" ("state_id", "primary_segment_id");



CREATE INDEX "idx_tenants_status" ON "public"."tenants" USING "btree" ("status_id");



CREATE INDEX "idx_tenants_status_plan" ON "public"."tenants" USING "btree" ("status_id", "plan_id");



CREATE INDEX "idx_tenants_trial" ON "public"."tenants" USING "btree" ("trial_ends_at") WHERE ("trial_ends_at" IS NOT NULL);



CREATE OR REPLACE TRIGGER "trigger_audit_tenant_documents" AFTER INSERT OR DELETE OR UPDATE ON "public"."tenant_documents" FOR EACH ROW EXECUTE FUNCTION "public"."log_tenant_changes"();



CREATE OR REPLACE TRIGGER "trigger_audit_tenant_settings" AFTER INSERT OR DELETE OR UPDATE ON "public"."tenant_settings" FOR EACH ROW EXECUTE FUNCTION "public"."log_tenant_changes"();



CREATE OR REPLACE TRIGGER "trigger_audit_tenants" AFTER INSERT OR DELETE OR UPDATE ON "public"."tenants" FOR EACH ROW EXECUTE FUNCTION "public"."log_tenant_changes"();



CREATE OR REPLACE TRIGGER "trigger_brazilian_states_updated_at" BEFORE UPDATE ON "public"."brazilian_states" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "trigger_business_segments_updated_at" BEFORE UPDATE ON "public"."business_segments" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "trigger_organizer_types_updated_at" BEFORE UPDATE ON "public"."organizer_types" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "trigger_profiles_updated_at" BEFORE UPDATE ON "public"."profiles" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "trigger_subscription_plans_updated_at" BEFORE UPDATE ON "public"."subscription_plans" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "trigger_tenant_documents_updated_at" BEFORE UPDATE ON "public"."tenant_documents" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "trigger_tenant_settings_updated_at" BEFORE UPDATE ON "public"."tenant_settings" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "trigger_tenant_statuses_updated_at" BEFORE UPDATE ON "public"."tenant_statuses" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "trigger_tenants_plan_cache_update" AFTER UPDATE OF "plan_id" ON "public"."tenants" FOR EACH ROW EXECUTE FUNCTION "public"."update_tenant_plan_cache"();



CREATE OR REPLACE TRIGGER "trigger_tenants_updated_at" BEFORE UPDATE ON "public"."tenants" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



ALTER TABLE ONLY "public"."tenant_audit_log"
    ADD CONSTRAINT "tenant_audit_log_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."tenant_documents"
    ADD CONSTRAINT "tenant_documents_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."tenant_plan_history"
    ADD CONSTRAINT "tenant_plan_history_from_plan_id_fkey" FOREIGN KEY ("from_plan_id") REFERENCES "public"."subscription_plans"("id");



ALTER TABLE ONLY "public"."tenant_plan_history"
    ADD CONSTRAINT "tenant_plan_history_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."tenant_plan_history"
    ADD CONSTRAINT "tenant_plan_history_to_plan_id_fkey" FOREIGN KEY ("to_plan_id") REFERENCES "public"."subscription_plans"("id");



ALTER TABLE ONLY "public"."tenant_settings"
    ADD CONSTRAINT "tenant_settings_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."tenant_usage_stats"
    ADD CONSTRAINT "tenant_usage_stats_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."tenants"
    ADD CONSTRAINT "tenants_organizer_type_id_fkey" FOREIGN KEY ("organizer_type_id") REFERENCES "public"."organizer_types"("id");



ALTER TABLE ONLY "public"."tenants"
    ADD CONSTRAINT "tenants_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "public"."subscription_plans"("id");



ALTER TABLE ONLY "public"."tenants"
    ADD CONSTRAINT "tenants_primary_segment_id_fkey" FOREIGN KEY ("primary_segment_id") REFERENCES "public"."business_segments"("id");



ALTER TABLE ONLY "public"."tenants"
    ADD CONSTRAINT "tenants_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "public"."brazilian_states"("id");



ALTER TABLE ONLY "public"."tenants"
    ADD CONSTRAINT "tenants_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "public"."tenant_statuses"("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "users_auth_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";





GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";































































































































































GRANT ALL ON FUNCTION "public"."calculate_tenant_usage"("p_tenant_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."calculate_tenant_usage"("p_tenant_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."calculate_tenant_usage"("p_tenant_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."change_tenant_plan"("p_tenant_id" "uuid", "p_new_plan_code" character varying, "p_reason" character varying, "p_changed_by" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."change_tenant_plan"("p_tenant_id" "uuid", "p_new_plan_code" character varying, "p_reason" character varying, "p_changed_by" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."change_tenant_plan"("p_tenant_id" "uuid", "p_new_plan_code" character varying, "p_reason" character varying, "p_changed_by" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."cleanup_old_audit_logs"("retention_months" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."cleanup_old_audit_logs"("retention_months" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."cleanup_old_audit_logs"("retention_months" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."create_default_tenant_settings"("tenant_uuid" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."create_default_tenant_settings"("tenant_uuid" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."create_default_tenant_settings"("tenant_uuid" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."create_new_tenant"("p_slug" character varying, "p_cnpj" character varying, "p_razao_social" character varying, "p_nome_fantasia" character varying, "p_contact_email" character varying, "p_organizer_type_code" character varying, "p_segment_code" character varying, "p_state_code" character varying, "p_plan_code" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."create_new_tenant"("p_slug" character varying, "p_cnpj" character varying, "p_razao_social" character varying, "p_nome_fantasia" character varying, "p_contact_email" character varying, "p_organizer_type_code" character varying, "p_segment_code" character varying, "p_state_code" character varying, "p_plan_code" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."create_new_tenant"("p_slug" character varying, "p_cnpj" character varying, "p_razao_social" character varying, "p_nome_fantasia" character varying, "p_contact_email" character varying, "p_organizer_type_code" character varying, "p_segment_code" character varying, "p_state_code" character varying, "p_plan_code" character varying) TO "service_role";



GRANT ALL ON FUNCTION "public"."decrypt_sensitive_data"("encrypted_input" "text", "key_input" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."decrypt_sensitive_data"("encrypted_input" "text", "key_input" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."decrypt_sensitive_data"("encrypted_input" "text", "key_input" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."encrypt_sensitive_data"("data_input" "text", "key_input" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."encrypt_sensitive_data"("data_input" "text", "key_input" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."encrypt_sensitive_data"("data_input" "text", "key_input" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."format_cnpj"("cnpj_input" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."format_cnpj"("cnpj_input" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."format_cnpj"("cnpj_input" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."generate_monthly_usage_stats"("target_month" "date") TO "anon";
GRANT ALL ON FUNCTION "public"."generate_monthly_usage_stats"("target_month" "date") TO "authenticated";
GRANT ALL ON FUNCTION "public"."generate_monthly_usage_stats"("target_month" "date") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_current_tenant_id"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_current_tenant_id"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_current_tenant_id"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_current_user_role"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_current_user_role"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_current_user_role"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_auth_signup"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_auth_signup"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_auth_signup"() TO "service_role";



GRANT ALL ON FUNCTION "public"."is_super_admin"() TO "anon";
GRANT ALL ON FUNCTION "public"."is_super_admin"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_super_admin"() TO "service_role";



GRANT ALL ON FUNCTION "public"."log_tenant_changes"() TO "anon";
GRANT ALL ON FUNCTION "public"."log_tenant_changes"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."log_tenant_changes"() TO "service_role";



GRANT ALL ON FUNCTION "public"."suspend_tenant"("p_tenant_id" "uuid", "p_reason" "text", "p_suspended_by" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."suspend_tenant"("p_tenant_id" "uuid", "p_reason" "text", "p_suspended_by" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."suspend_tenant"("p_tenant_id" "uuid", "p_reason" "text", "p_suspended_by" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."update_tenant_plan_cache"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_tenant_plan_cache"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_tenant_plan_cache"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "service_role";



GRANT ALL ON FUNCTION "public"."validate_cep"("cep_input" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."validate_cep"("cep_input" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."validate_cep"("cep_input" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."validate_cnpj"("cnpj_input" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."validate_cnpj"("cnpj_input" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."validate_cnpj"("cnpj_input" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."validate_hex_color"("color_input" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."validate_hex_color"("color_input" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."validate_hex_color"("color_input" "text") TO "service_role";


















GRANT ALL ON TABLE "public"."brazilian_states" TO "anon";
GRANT ALL ON TABLE "public"."brazilian_states" TO "authenticated";
GRANT ALL ON TABLE "public"."brazilian_states" TO "service_role";



GRANT ALL ON TABLE "public"."business_segments" TO "anon";
GRANT ALL ON TABLE "public"."business_segments" TO "authenticated";
GRANT ALL ON TABLE "public"."business_segments" TO "service_role";



GRANT ALL ON TABLE "public"."organizer_types" TO "anon";
GRANT ALL ON TABLE "public"."organizer_types" TO "authenticated";
GRANT ALL ON TABLE "public"."organizer_types" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."subscription_plans" TO "anon";
GRANT ALL ON TABLE "public"."subscription_plans" TO "authenticated";
GRANT ALL ON TABLE "public"."subscription_plans" TO "service_role";



GRANT ALL ON TABLE "public"."tenant_audit_log" TO "anon";
GRANT ALL ON TABLE "public"."tenant_audit_log" TO "authenticated";
GRANT ALL ON TABLE "public"."tenant_audit_log" TO "service_role";



GRANT ALL ON TABLE "public"."tenant_documents" TO "anon";
GRANT ALL ON TABLE "public"."tenant_documents" TO "authenticated";
GRANT ALL ON TABLE "public"."tenant_documents" TO "service_role";



GRANT ALL ON TABLE "public"."tenant_plan_history" TO "anon";
GRANT ALL ON TABLE "public"."tenant_plan_history" TO "authenticated";
GRANT ALL ON TABLE "public"."tenant_plan_history" TO "service_role";



GRANT ALL ON TABLE "public"."tenant_settings" TO "anon";
GRANT ALL ON TABLE "public"."tenant_settings" TO "authenticated";
GRANT ALL ON TABLE "public"."tenant_settings" TO "service_role";



GRANT ALL ON TABLE "public"."tenant_statuses" TO "anon";
GRANT ALL ON TABLE "public"."tenant_statuses" TO "authenticated";
GRANT ALL ON TABLE "public"."tenant_statuses" TO "service_role";



GRANT ALL ON TABLE "public"."tenant_usage_stats" TO "anon";
GRANT ALL ON TABLE "public"."tenant_usage_stats" TO "authenticated";
GRANT ALL ON TABLE "public"."tenant_usage_stats" TO "service_role";



GRANT ALL ON TABLE "public"."tenants" TO "anon";
GRANT ALL ON TABLE "public"."tenants" TO "authenticated";
GRANT ALL ON TABLE "public"."tenants" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
