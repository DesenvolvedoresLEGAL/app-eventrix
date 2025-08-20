-- Migration: 20250820164355_create_function_get_user_role.sql
-- Table: n/a
-- Description: Procedure para retornar o cargo do usuário autenticado
-- Author: Gustavo Macedo
-- Date: 2025-08-20

BEGIN;
CREATE OR REPLACE FUNCTION get_current_user_role()
RETURNS TEXT AS $$
DECLARE
    user_role TEXT;
BEGIN
    -- Busca o cargo do usuário com base no ID do usuário autenticado
    SELECT ur.code
    INTO user_role
    FROM profiles p
    JOIN user_roles ur ON p.role = ur.id
    WHERE p.id = auth.uid();

    -- Retorna o cargo ou NULL se não encontrado
    RETURN user_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
COMMIT;

-- ROLLBACK
-- DROP INDEX IF EXISTS public.idx_invitations_email;
-- DROP INDEX IF EXISTS public.idx_invitations_tenant_status;
-- COMMIT;
