-- Migration: 20250731145716_alter_constraint_on_profiles_tenant_id_fk.sql
-- Table: profiles
-- Description: Criar uma chave estrangeira em profiles para a tabela de tenants.
-- Author: Gustavo Mota
-- Date: 31/07/2025

BEGIN;
ALTER TABLE public.profiles
ADD CONSTRAINT fk_profiles_tenant
  FOREIGN KEY (tenant_id)
  REFERENCES public.tenants (id)
  ON UPDATE CASCADE
  ON DELETE RESTRICT;
COMMIT;

-- ROLLBACK;
-- ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS fk_profiles_tenant;
-- COMMIT;
