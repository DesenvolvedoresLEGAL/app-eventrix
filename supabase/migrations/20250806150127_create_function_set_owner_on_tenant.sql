-- Migration: 20250806150127_create_function_set_owner_on_tenant.sql
-- Table: profiles
-- Description: Cria função para atualizar cargo de usuário owner
-- Author: Gustavo Mota
-- Date: 2025-08-06

BEGIN;
CREATE OR REPLACE FUNCTION set_owner_on_tenant()
RETURNS trigger AS $$
BEGIN
  UPDATE public.profiles
  SET role = '4d2dfd28-07da-419b-9f36-6eb10eafacdb'
  WHERE id = NEW.created_by;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
COMMIT;

-- ROLLBACK
-- DROP FUNCTION set_owner_on_tenant;
-- COMMIT;