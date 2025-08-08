-- Migration: 20250808161523_replace_function_put_tenant_id_in_user_by_created_by.sql
-- Table: profiles
-- Description: 
-- Author: Gustavo Mota
-- Date: 08/08/2025

BEGIN;
CREATE OR REPLACE FUNCTION public.update_tenant_id_in_users()
RETURNS TRIGGER AS $$
BEGIN
  -- SÓ EXECUTA A LÓGICA SE O tenant_id REALMENTE MUDOU
  -- OLD se refere ao valor da linha ANTES da atualização
  -- NEW se refere ao valor da linha DEPOIS da atualização
  IF NEW.tenant_id IS DISTINCT FROM OLD.tenant_id THEN
    UPDATE
      public.profiles
    SET
      tenant_id = NEW.tenant_id
    WHERE
      id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
COMMIT;

-- ROLLBACK;
-- DROP FUNCTION IF EXISTS public.put_tenant_id_in_user_by_created_by;
-- COMMIT;
