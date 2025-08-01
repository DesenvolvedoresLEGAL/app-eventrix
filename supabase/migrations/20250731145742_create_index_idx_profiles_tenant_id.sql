-- Migration: 20250731145742_create_index_idx_profiles_tenant_id.sql
-- Table: profiles
-- Description: Criar uma chave estrangeira em profiles para a tabela de tenants.
-- Author: Gustavo Mota
-- Date: 31/07/2025

BEGIN;
CREATE INDEX idx_nome_da_tabela_tenant_id ON public.profiles (tenant_id);
COMMIT;

-- ROLLBACK;
-- DROP INDEX IF EXISTS public.idx_profiles_tenant_id;
-- COMMIT;
