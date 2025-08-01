-- Migration: 20250731175646_create_trigger_to_update_tenant_id_in_users.sql
-- Table: tenants
-- Description: Após criar um tenant, atribui seu id ao usuário que o criou
-- Author: Gustavo Mota
-- Date: 2025-07-31

BEGIN;
-- 2. Remove trigger antigo, se existir
DROP TRIGGER IF EXISTS trigger_put_tenant_id_in_user_by_created_by
  ON public.tenants;

-- 3. Cria trigger para rodar após INSERT em tenants
CREATE TRIGGER trigger_put_tenant_id_in_user_by_created_by
AFTER INSERT ON public.tenants
FOR EACH ROW
EXECUTE FUNCTION public.put_tenant_id_in_user_by_created_by();
COMMIT;

-- ROLLBACK
-- DROP TRIGGER IF EXISTS _put_tenant_id_in_user_by_created_by ON public.tenants;
-- COMMIT;
