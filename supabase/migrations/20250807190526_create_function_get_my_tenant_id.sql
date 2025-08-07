-- Migration: 20250807161000_create_get_my_tenant_id_function.sql
-- Descrição: Cria a função auxiliar para obter o tenant_id do usuário autenticado.
-- Tabela: N/A (Function)
-- Autor: Gustavo Mota
-- Data: 07/08/2025

BEGIN;

CREATE OR REPLACE FUNCTION public.get_my_tenant_id()
RETURNS UUID
LANGUAGE sql
STABLE
AS $$
  SELECT tenant_id
  FROM public.profiles
  WHERE id = auth.uid();
$$;

COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP FUNCTION IF EXISTS public.get_my_tenant_id();
-- COMMIT;
