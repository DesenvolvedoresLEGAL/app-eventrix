-- Migration: 20250729124500_update_handle_auth_signup.sql
-- Table: profiles
-- Description: Ajusta função handle_auth_signup para preencher todos os campos de profiles
-- Author: Gustavo Mota
-- Date: 29/07/2025

BEGIN;
CREATE OR REPLACE FUNCTION public.handle_auth_signup()
RETURNS trigger AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;
COMMIT;

-- ROLLBACK;
-- DROP FUNCTION IF EXISTS public.handle_auth_signup();
