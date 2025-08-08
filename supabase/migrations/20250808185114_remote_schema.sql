drop trigger if exists "trigger_tenants_plan_cache_update" on "public"."tenants";

revoke delete on table "public"."brazilian_states" from "anon";

revoke insert on table "public"."brazilian_states" from "anon";

revoke references on table "public"."brazilian_states" from "anon";

revoke select on table "public"."brazilian_states" from "anon";

revoke trigger on table "public"."brazilian_states" from "anon";

revoke truncate on table "public"."brazilian_states" from "anon";

revoke update on table "public"."brazilian_states" from "anon";

revoke delete on table "public"."brazilian_states" from "authenticated";

revoke insert on table "public"."brazilian_states" from "authenticated";

revoke references on table "public"."brazilian_states" from "authenticated";

revoke select on table "public"."brazilian_states" from "authenticated";

revoke trigger on table "public"."brazilian_states" from "authenticated";

revoke truncate on table "public"."brazilian_states" from "authenticated";

revoke update on table "public"."brazilian_states" from "authenticated";

revoke delete on table "public"."brazilian_states" from "service_role";

revoke insert on table "public"."brazilian_states" from "service_role";

revoke references on table "public"."brazilian_states" from "service_role";

revoke select on table "public"."brazilian_states" from "service_role";

revoke trigger on table "public"."brazilian_states" from "service_role";

revoke truncate on table "public"."brazilian_states" from "service_role";

revoke update on table "public"."brazilian_states" from "service_role";

revoke delete on table "public"."business_segments" from "anon";

revoke insert on table "public"."business_segments" from "anon";

revoke references on table "public"."business_segments" from "anon";

revoke select on table "public"."business_segments" from "anon";

revoke trigger on table "public"."business_segments" from "anon";

revoke truncate on table "public"."business_segments" from "anon";

revoke update on table "public"."business_segments" from "anon";

revoke delete on table "public"."business_segments" from "authenticated";

revoke insert on table "public"."business_segments" from "authenticated";

revoke references on table "public"."business_segments" from "authenticated";

revoke select on table "public"."business_segments" from "authenticated";

revoke trigger on table "public"."business_segments" from "authenticated";

revoke truncate on table "public"."business_segments" from "authenticated";

revoke update on table "public"."business_segments" from "authenticated";

revoke delete on table "public"."business_segments" from "service_role";

revoke insert on table "public"."business_segments" from "service_role";

revoke references on table "public"."business_segments" from "service_role";

revoke select on table "public"."business_segments" from "service_role";

revoke trigger on table "public"."business_segments" from "service_role";

revoke truncate on table "public"."business_segments" from "service_role";

revoke update on table "public"."business_segments" from "service_role";

revoke delete on table "public"."invites" from "anon";

revoke insert on table "public"."invites" from "anon";

revoke references on table "public"."invites" from "anon";

revoke select on table "public"."invites" from "anon";

revoke trigger on table "public"."invites" from "anon";

revoke truncate on table "public"."invites" from "anon";

revoke update on table "public"."invites" from "anon";

revoke delete on table "public"."invites" from "authenticated";

revoke insert on table "public"."invites" from "authenticated";

revoke references on table "public"."invites" from "authenticated";

revoke select on table "public"."invites" from "authenticated";

revoke trigger on table "public"."invites" from "authenticated";

revoke truncate on table "public"."invites" from "authenticated";

revoke update on table "public"."invites" from "authenticated";

revoke delete on table "public"."invites" from "service_role";

revoke insert on table "public"."invites" from "service_role";

revoke references on table "public"."invites" from "service_role";

revoke select on table "public"."invites" from "service_role";

revoke trigger on table "public"."invites" from "service_role";

revoke truncate on table "public"."invites" from "service_role";

revoke update on table "public"."invites" from "service_role";

revoke delete on table "public"."organizer_types" from "anon";

revoke insert on table "public"."organizer_types" from "anon";

revoke references on table "public"."organizer_types" from "anon";

revoke select on table "public"."organizer_types" from "anon";

revoke trigger on table "public"."organizer_types" from "anon";

revoke truncate on table "public"."organizer_types" from "anon";

revoke update on table "public"."organizer_types" from "anon";

revoke delete on table "public"."organizer_types" from "authenticated";

revoke insert on table "public"."organizer_types" from "authenticated";

revoke references on table "public"."organizer_types" from "authenticated";

revoke select on table "public"."organizer_types" from "authenticated";

revoke trigger on table "public"."organizer_types" from "authenticated";

revoke truncate on table "public"."organizer_types" from "authenticated";

revoke update on table "public"."organizer_types" from "authenticated";

revoke delete on table "public"."organizer_types" from "service_role";

revoke insert on table "public"."organizer_types" from "service_role";

revoke references on table "public"."organizer_types" from "service_role";

revoke select on table "public"."organizer_types" from "service_role";

revoke trigger on table "public"."organizer_types" from "service_role";

revoke truncate on table "public"."organizer_types" from "service_role";

revoke update on table "public"."organizer_types" from "service_role";

revoke delete on table "public"."profiles" from "anon";

revoke insert on table "public"."profiles" from "anon";

revoke references on table "public"."profiles" from "anon";

revoke select on table "public"."profiles" from "anon";

revoke trigger on table "public"."profiles" from "anon";

revoke truncate on table "public"."profiles" from "anon";

revoke update on table "public"."profiles" from "anon";

revoke delete on table "public"."profiles" from "authenticated";

revoke insert on table "public"."profiles" from "authenticated";

revoke references on table "public"."profiles" from "authenticated";

revoke select on table "public"."profiles" from "authenticated";

revoke trigger on table "public"."profiles" from "authenticated";

revoke truncate on table "public"."profiles" from "authenticated";

revoke update on table "public"."profiles" from "authenticated";

revoke delete on table "public"."profiles" from "service_role";

revoke insert on table "public"."profiles" from "service_role";

revoke references on table "public"."profiles" from "service_role";

revoke select on table "public"."profiles" from "service_role";

revoke trigger on table "public"."profiles" from "service_role";

revoke truncate on table "public"."profiles" from "service_role";

revoke update on table "public"."profiles" from "service_role";

revoke delete on table "public"."subscription_plans" from "anon";

revoke insert on table "public"."subscription_plans" from "anon";

revoke references on table "public"."subscription_plans" from "anon";

revoke select on table "public"."subscription_plans" from "anon";

revoke trigger on table "public"."subscription_plans" from "anon";

revoke truncate on table "public"."subscription_plans" from "anon";

revoke update on table "public"."subscription_plans" from "anon";

revoke delete on table "public"."subscription_plans" from "authenticated";

revoke insert on table "public"."subscription_plans" from "authenticated";

revoke references on table "public"."subscription_plans" from "authenticated";

revoke select on table "public"."subscription_plans" from "authenticated";

revoke trigger on table "public"."subscription_plans" from "authenticated";

revoke truncate on table "public"."subscription_plans" from "authenticated";

revoke update on table "public"."subscription_plans" from "authenticated";

revoke delete on table "public"."subscription_plans" from "service_role";

revoke insert on table "public"."subscription_plans" from "service_role";

revoke references on table "public"."subscription_plans" from "service_role";

revoke select on table "public"."subscription_plans" from "service_role";

revoke trigger on table "public"."subscription_plans" from "service_role";

revoke truncate on table "public"."subscription_plans" from "service_role";

revoke update on table "public"."subscription_plans" from "service_role";

revoke delete on table "public"."tenant_audit_log" from "anon";

revoke insert on table "public"."tenant_audit_log" from "anon";

revoke references on table "public"."tenant_audit_log" from "anon";

revoke select on table "public"."tenant_audit_log" from "anon";

revoke trigger on table "public"."tenant_audit_log" from "anon";

revoke truncate on table "public"."tenant_audit_log" from "anon";

revoke update on table "public"."tenant_audit_log" from "anon";

revoke delete on table "public"."tenant_audit_log" from "authenticated";

revoke insert on table "public"."tenant_audit_log" from "authenticated";

revoke references on table "public"."tenant_audit_log" from "authenticated";

revoke select on table "public"."tenant_audit_log" from "authenticated";

revoke trigger on table "public"."tenant_audit_log" from "authenticated";

revoke truncate on table "public"."tenant_audit_log" from "authenticated";

revoke update on table "public"."tenant_audit_log" from "authenticated";

revoke delete on table "public"."tenant_audit_log" from "service_role";

revoke insert on table "public"."tenant_audit_log" from "service_role";

revoke references on table "public"."tenant_audit_log" from "service_role";

revoke select on table "public"."tenant_audit_log" from "service_role";

revoke trigger on table "public"."tenant_audit_log" from "service_role";

revoke truncate on table "public"."tenant_audit_log" from "service_role";

revoke update on table "public"."tenant_audit_log" from "service_role";

revoke delete on table "public"."tenant_documents" from "anon";

revoke insert on table "public"."tenant_documents" from "anon";

revoke references on table "public"."tenant_documents" from "anon";

revoke select on table "public"."tenant_documents" from "anon";

revoke trigger on table "public"."tenant_documents" from "anon";

revoke truncate on table "public"."tenant_documents" from "anon";

revoke update on table "public"."tenant_documents" from "anon";

revoke delete on table "public"."tenant_documents" from "authenticated";

revoke insert on table "public"."tenant_documents" from "authenticated";

revoke references on table "public"."tenant_documents" from "authenticated";

revoke select on table "public"."tenant_documents" from "authenticated";

revoke trigger on table "public"."tenant_documents" from "authenticated";

revoke truncate on table "public"."tenant_documents" from "authenticated";

revoke update on table "public"."tenant_documents" from "authenticated";

revoke delete on table "public"."tenant_documents" from "service_role";

revoke insert on table "public"."tenant_documents" from "service_role";

revoke references on table "public"."tenant_documents" from "service_role";

revoke select on table "public"."tenant_documents" from "service_role";

revoke trigger on table "public"."tenant_documents" from "service_role";

revoke truncate on table "public"."tenant_documents" from "service_role";

revoke update on table "public"."tenant_documents" from "service_role";

revoke delete on table "public"."tenant_plan_history" from "anon";

revoke insert on table "public"."tenant_plan_history" from "anon";

revoke references on table "public"."tenant_plan_history" from "anon";

revoke select on table "public"."tenant_plan_history" from "anon";

revoke trigger on table "public"."tenant_plan_history" from "anon";

revoke truncate on table "public"."tenant_plan_history" from "anon";

revoke update on table "public"."tenant_plan_history" from "anon";

revoke delete on table "public"."tenant_plan_history" from "authenticated";

revoke insert on table "public"."tenant_plan_history" from "authenticated";

revoke references on table "public"."tenant_plan_history" from "authenticated";

revoke select on table "public"."tenant_plan_history" from "authenticated";

revoke trigger on table "public"."tenant_plan_history" from "authenticated";

revoke truncate on table "public"."tenant_plan_history" from "authenticated";

revoke update on table "public"."tenant_plan_history" from "authenticated";

revoke delete on table "public"."tenant_plan_history" from "service_role";

revoke insert on table "public"."tenant_plan_history" from "service_role";

revoke references on table "public"."tenant_plan_history" from "service_role";

revoke select on table "public"."tenant_plan_history" from "service_role";

revoke trigger on table "public"."tenant_plan_history" from "service_role";

revoke truncate on table "public"."tenant_plan_history" from "service_role";

revoke update on table "public"."tenant_plan_history" from "service_role";

revoke delete on table "public"."tenant_settings" from "anon";

revoke insert on table "public"."tenant_settings" from "anon";

revoke references on table "public"."tenant_settings" from "anon";

revoke select on table "public"."tenant_settings" from "anon";

revoke trigger on table "public"."tenant_settings" from "anon";

revoke truncate on table "public"."tenant_settings" from "anon";

revoke update on table "public"."tenant_settings" from "anon";

revoke delete on table "public"."tenant_settings" from "authenticated";

revoke insert on table "public"."tenant_settings" from "authenticated";

revoke references on table "public"."tenant_settings" from "authenticated";

revoke select on table "public"."tenant_settings" from "authenticated";

revoke trigger on table "public"."tenant_settings" from "authenticated";

revoke truncate on table "public"."tenant_settings" from "authenticated";

revoke update on table "public"."tenant_settings" from "authenticated";

revoke delete on table "public"."tenant_settings" from "service_role";

revoke insert on table "public"."tenant_settings" from "service_role";

revoke references on table "public"."tenant_settings" from "service_role";

revoke select on table "public"."tenant_settings" from "service_role";

revoke trigger on table "public"."tenant_settings" from "service_role";

revoke truncate on table "public"."tenant_settings" from "service_role";

revoke update on table "public"."tenant_settings" from "service_role";

revoke delete on table "public"."tenant_statuses" from "anon";

revoke insert on table "public"."tenant_statuses" from "anon";

revoke references on table "public"."tenant_statuses" from "anon";

revoke select on table "public"."tenant_statuses" from "anon";

revoke trigger on table "public"."tenant_statuses" from "anon";

revoke truncate on table "public"."tenant_statuses" from "anon";

revoke update on table "public"."tenant_statuses" from "anon";

revoke delete on table "public"."tenant_statuses" from "authenticated";

revoke insert on table "public"."tenant_statuses" from "authenticated";

revoke references on table "public"."tenant_statuses" from "authenticated";

revoke select on table "public"."tenant_statuses" from "authenticated";

revoke trigger on table "public"."tenant_statuses" from "authenticated";

revoke truncate on table "public"."tenant_statuses" from "authenticated";

revoke update on table "public"."tenant_statuses" from "authenticated";

revoke delete on table "public"."tenant_statuses" from "service_role";

revoke insert on table "public"."tenant_statuses" from "service_role";

revoke references on table "public"."tenant_statuses" from "service_role";

revoke select on table "public"."tenant_statuses" from "service_role";

revoke trigger on table "public"."tenant_statuses" from "service_role";

revoke truncate on table "public"."tenant_statuses" from "service_role";

revoke update on table "public"."tenant_statuses" from "service_role";

revoke delete on table "public"."tenant_usage_stats" from "anon";

revoke insert on table "public"."tenant_usage_stats" from "anon";

revoke references on table "public"."tenant_usage_stats" from "anon";

revoke select on table "public"."tenant_usage_stats" from "anon";

revoke trigger on table "public"."tenant_usage_stats" from "anon";

revoke truncate on table "public"."tenant_usage_stats" from "anon";

revoke update on table "public"."tenant_usage_stats" from "anon";

revoke delete on table "public"."tenant_usage_stats" from "authenticated";

revoke insert on table "public"."tenant_usage_stats" from "authenticated";

revoke references on table "public"."tenant_usage_stats" from "authenticated";

revoke select on table "public"."tenant_usage_stats" from "authenticated";

revoke trigger on table "public"."tenant_usage_stats" from "authenticated";

revoke truncate on table "public"."tenant_usage_stats" from "authenticated";

revoke update on table "public"."tenant_usage_stats" from "authenticated";

revoke delete on table "public"."tenant_usage_stats" from "service_role";

revoke insert on table "public"."tenant_usage_stats" from "service_role";

revoke references on table "public"."tenant_usage_stats" from "service_role";

revoke select on table "public"."tenant_usage_stats" from "service_role";

revoke trigger on table "public"."tenant_usage_stats" from "service_role";

revoke truncate on table "public"."tenant_usage_stats" from "service_role";

revoke update on table "public"."tenant_usage_stats" from "service_role";

revoke delete on table "public"."tenants" from "anon";

revoke insert on table "public"."tenants" from "anon";

revoke references on table "public"."tenants" from "anon";

revoke select on table "public"."tenants" from "anon";

revoke trigger on table "public"."tenants" from "anon";

revoke truncate on table "public"."tenants" from "anon";

revoke update on table "public"."tenants" from "anon";

revoke delete on table "public"."tenants" from "authenticated";

revoke insert on table "public"."tenants" from "authenticated";

revoke references on table "public"."tenants" from "authenticated";

revoke select on table "public"."tenants" from "authenticated";

revoke trigger on table "public"."tenants" from "authenticated";

revoke truncate on table "public"."tenants" from "authenticated";

revoke update on table "public"."tenants" from "authenticated";

revoke delete on table "public"."tenants" from "service_role";

revoke insert on table "public"."tenants" from "service_role";

revoke references on table "public"."tenants" from "service_role";

revoke select on table "public"."tenants" from "service_role";

revoke trigger on table "public"."tenants" from "service_role";

revoke truncate on table "public"."tenants" from "service_role";

revoke update on table "public"."tenants" from "service_role";

revoke delete on table "public"."user_roles" from "anon";

revoke insert on table "public"."user_roles" from "anon";

revoke references on table "public"."user_roles" from "anon";

revoke select on table "public"."user_roles" from "anon";

revoke trigger on table "public"."user_roles" from "anon";

revoke truncate on table "public"."user_roles" from "anon";

revoke update on table "public"."user_roles" from "anon";

revoke delete on table "public"."user_roles" from "authenticated";

revoke insert on table "public"."user_roles" from "authenticated";

revoke references on table "public"."user_roles" from "authenticated";

revoke select on table "public"."user_roles" from "authenticated";

revoke trigger on table "public"."user_roles" from "authenticated";

revoke truncate on table "public"."user_roles" from "authenticated";

revoke update on table "public"."user_roles" from "authenticated";

revoke delete on table "public"."user_roles" from "service_role";

revoke insert on table "public"."user_roles" from "service_role";

revoke references on table "public"."user_roles" from "service_role";

revoke select on table "public"."user_roles" from "service_role";

revoke trigger on table "public"."user_roles" from "service_role";

revoke truncate on table "public"."user_roles" from "service_role";

revoke update on table "public"."user_roles" from "service_role";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.calculate_tenant_usage(p_tenant_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.change_tenant_plan(p_tenant_id uuid, p_new_plan_code character varying, p_reason character varying, p_changed_by uuid DEFAULT NULL::uuid)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.cleanup_old_audit_logs(retention_months integer DEFAULT 24)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.create_default_tenant_settings(tenant_uuid uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.create_new_tenant(p_slug character varying, p_cnpj character varying, p_razao_social character varying, p_nome_fantasia character varying, p_contact_email character varying, p_organizer_type_code character varying, p_segment_code character varying, p_state_code character varying, p_plan_code character varying DEFAULT 'start'::character varying)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.decrypt_sensitive_data(encrypted_input text, key_input text DEFAULT 'eventrix_default_key'::text)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.encrypt_sensitive_data(data_input text, key_input text DEFAULT 'eventrix_default_key'::text)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
BEGIN
    IF data_input IS NULL OR data_input = '' THEN
        RETURN data_input;
    END IF;
    
    RETURN encode(
        encrypt(data_input::bytea, key_input::bytea, 'aes'),
        'base64'
    );
END;
$function$
;

CREATE OR REPLACE FUNCTION public.format_cnpj(cnpj_input text)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.generate_monthly_usage_stats(target_month date DEFAULT CURRENT_DATE)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.get_current_tenant_id()
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    RETURN (current_setting('request.jwt.claims', true)::json->>'tenant_id')::UUID;
EXCEPTION
    WHEN OTHERS THEN
        RETURN NULL;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_current_user_role()
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    RETURN current_setting('request.jwt.claims', true)::json->>'role';
EXCEPTION
    WHEN OTHERS THEN
        RETURN 'anonymous';
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_my_tenant_id()
 RETURNS uuid
 LANGUAGE sql
 STABLE
AS $function$
  SELECT tenant_id
  FROM public.profiles
  WHERE id = auth.uid();
$function$
;

CREATE OR REPLACE FUNCTION public.get_user_context(p_user_id uuid)
 RETURNS user_context_type
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
AS $function$
DECLARE
    v_context public.user_context_type;
BEGIN
    -- Busca os dados do perfil e da role, fazendo um LEFT JOIN para garantir que um perfil sem role ainda retorne.
    SELECT
        p.id,
        p.tenant_id,
        p.role,
        ur.code
    INTO
        v_context.profile_id,
        v_context.profile_tenant_id,
        v_context.profile_user_role_id,
        v_context.profile_user_role_code
    FROM
        public.profiles p
    LEFT JOIN
        public.user_roles ur ON p.role = ur.id
    WHERE
        p.id = auth.uid();

    RETURN v_context;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_auth_signup()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    INSERT INTO public.profiles (
        id, email, first_name, last_name, full_name, whatsapp_number, is_active
    ) VALUES (
        NEW.id,
        COALESCE(NEW.email, ''),
        COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'whatsapp_number', ''),
        TRUE
    );
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.is_super_admin()
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    RETURN (current_setting('request.jwt.claims', true)::json->>'role') = 'super_admin';
EXCEPTION
    WHEN OTHERS THEN
        RETURN FALSE;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.log_tenant_changes()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.put_tenant_id_in_user_by_created_by()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    UPDATE public.profiles
    SET tenant_id = NEW.id
    WHERE id = NEW.created_by;

    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.set_owner_on_tenant()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE public.profiles
  SET role = '4d2dfd28-07da-419b-9f36-6eb10eafacdb'
  WHERE id = NEW.created_by;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.suspend_tenant(p_tenant_id uuid, p_reason text, p_suspended_by uuid DEFAULT NULL::uuid)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.update_tenant_id_in_users()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  -- SÓ EXECUTA A LÓGICA SE O tenant_id REALMENTE MUDOU
  -- OLD se refere ao valor da linha ANTES da atualização
  -- NEW se refere ao valor da linha DEPOIS da atualização
  IF NEW.tenant_id IS DISTINCT FROM OLD.tenant_id THEN
    UPDATE
      public.profiles
    SET
      tenant_id = NEW.tenant_id
    WHERE
      id = NEW.id;
  END IF;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_tenant_plan_cache()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.validate_cep(cep_input text)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN cep_input IS NULL OR cep_input ~ '^\d{5}-\d{3}$';
END;
$function$
;

CREATE OR REPLACE FUNCTION public.validate_cnpj(cnpj_input text)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.validate_hex_color(color_input text)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN color_input ~ '^#[0-9A-Fa-f]{6}$';
END;
$function$
;

CREATE TRIGGER trigger_tenants_plan_cache_update AFTER UPDATE OF plan_id ON public.tenants FOR EACH ROW EXECUTE FUNCTION update_tenant_plan_cache();


