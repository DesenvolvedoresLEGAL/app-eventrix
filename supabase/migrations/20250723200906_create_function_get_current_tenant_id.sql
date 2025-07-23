-- Migration: 20250723200906_create_function_get_current_tenant_id.sql
-- Descrição: Cria a função para obter o ID do inquilino atual a partir do token JWT
-- Tabela: N/A
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
-- Helper function to get current tenant_id from JWT token
CREATE OR REPLACE FUNCTION get_current_tenant_id()
RETURNS UUID AS $$
BEGIN
    RETURN (current_setting('request.jwt.claims', true)::json->>'tenant_id')::UUID;
EXCEPTION
    WHEN OTHERS THEN
        RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
COMMIT;

--ROLLBACK;
-- DROP FUNCTION IF EXISTS get_current_tenant_id() CASCADE;
-- COMMIT;