-- Migration: 20250723201412_create_function_get_current_user_role.sql
-- Descrição: Cria a função para obter o papel do usuário atual
-- Tabela: N/A
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
-- Helper function to get current user role
CREATE OR REPLACE FUNCTION get_current_user_role()
RETURNS TEXT AS $$
BEGIN
    RETURN current_setting('request.jwt.claims', true)::json->>'role';
EXCEPTION
    WHEN OTHERS THEN
        RETURN 'anonymous';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
COMMIT;

--ROLLBACK;
-- DROP FUNCTION IF EXISTS get_current_user_role() CASCADE;
-- COMMIT;