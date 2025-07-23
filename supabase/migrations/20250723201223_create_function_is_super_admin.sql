-- Migration: 20250723201223_create_function_is_super_admin.sql
-- Descrição: Cria a função para verificar se o usuário é um super admin
-- Tabela: N/A
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
-- Helper function to check if user is super admin
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (current_setting('request.jwt.claims', true)::json->>'role') = 'super_admin';
EXCEPTION
    WHEN OTHERS THEN
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
COMMIT;

--ROLLBACK;
-- DROP FUNCTION IF EXISTS is_super_admin() CASCADE;
-- COMMIT;