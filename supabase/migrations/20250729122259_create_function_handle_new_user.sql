-- Migration: 20250729124500_update_handle_auth_signup.sql
-- Table: profiles
-- Description: Ajusta função handle_auth_signup para preencher todos os campos de profiles
-- Author: Gustavo Mota
-- Date: 29/07/2025

BEGIN;

-- 1) Substitui função para inserir todos os campos
CREATE OR REPLACE FUNCTION public.handle_auth_signup()
RETURNS trigger AS $$
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
$$ LANGUAGE plpgsql;

-- 2) (Re)Cria trigger para chamar a função após criação de usuário
CREATE TRIGGER trigger_handle_auth_signup
  BEFORE INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_auth_signup();

COMMIT;

-- ROLLBACK;
-- DROP TRIGGER IF EXISTS trigger_handle_auth_signup ON auth.users;
-- DROP FUNCTION IF EXISTS public.handle_auth_signup();
-- COMMIT;
