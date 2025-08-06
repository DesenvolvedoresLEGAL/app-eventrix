-- Migration: 20250806150359_create_trigger_trg_set_owner.sql
-- Table: tenants
-- Description: Cria trigger para executar função set_owner_on_tenant() após uma inserção em tenants
-- Author: Gustavo Mota
-- Date: 2025-08-06

BEGIN;
CREATE TRIGGER trg_set_owner
AFTER INSERT ON public.tenants
FOR EACH ROW
EXECUTE FUNCTION set_owner_on_tenant();
COMMIT;

-- ROLLBACK
-- DROP TRIGGER trg_set_owner CASCADE;
-- COMMIT;