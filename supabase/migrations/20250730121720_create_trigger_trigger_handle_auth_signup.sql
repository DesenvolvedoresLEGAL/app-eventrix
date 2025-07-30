-- Migration: 20250730121720_create_trigger_trigger_handle_auth_signup.sql
-- Table: profiles
-- Description: Criar trigger em auth.users para executar a função que insere os dados de usuários em profiles.
-- Author: Gustavo Mota
-- Date: 30/07/2025

BEGIN;
DROP TRIGGER IF EXISTS trigger_handle_auth_signup ON auth.users;
CREATE TRIGGER trigger_handle_auth_signup
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_auth_signup();
COMMIT;

-- ROLLBACK;
-- DROP TRIGGER IF EXISTS trigger_handle_auth_signup ON auth.users;
-- COMMIT;
