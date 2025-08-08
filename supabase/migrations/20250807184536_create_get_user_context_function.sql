-- Migration: 20250807184536_create_get_user_context_function.sql
-- Descrição: Cria a função auxiliar get_user_context para obter dados de perfil e role do usuário.
-- Tabela: N/A (Function)
-- Autor: Gustavo Mota
-- Data: 07/08/2025

BEGIN;

-- 1. Define o tipo de retorno para a função, garantindo uma estrutura clara.
CREATE TYPE public.user_context_type AS (
    profile_id UUID,
    profile_tenant_id UUID,
    profile_user_role_id UUID,
    profile_user_role_code TEXT
);

-- 2. Cria a função que busca os dados do perfil e da role associada.
CREATE OR REPLACE FUNCTION public.get_user_context(p_user_id UUID)
RETURNS public.user_context_type
LANGUAGE plpgsql
STABLE -- A função é marcada como STABLE pois não modifica o banco de dados e retorna o mesmo resultado para os mesmos argumentos dentro de um único scan.
SECURITY DEFINER -- Permite que a função seja executada com os privilégios do usuário que a definiu, garantindo o acesso controlado às tabelas.
AS $$
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
$$;

COMMIT;

--ROLLBACK;
-- BEGIN;
-- -- A ordem do DROP é importante: primeiro a função, depois o tipo.
-- DROP FUNCTION IF EXISTS public.get_user_context(UUID);
-- DROP TYPE IF EXISTS public.user_context_type;
-- COMMIT;
