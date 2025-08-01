-- Migration: 20250731145141_alter_table_profiles_add_tenant_id.sql
-- Table: profiles
-- Description: Criar uma chave estrangeira em profiles para a tabela de tenants.
-- Author: Gustavo Mota
-- Date: 31/07/2025

BEGIN;
ALTER TABLE public.profiles ADD COLUMN tenant_id UUID NULL;
COMMIT;

-- ROLLBACK;
-- ALTER TABLE public.profiles DROP COLUMN IF EXISTS tenant_id;
-- COMMIT;
