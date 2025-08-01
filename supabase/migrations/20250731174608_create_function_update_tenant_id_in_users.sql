-- Migration: 20250731174608_create_function_update_tenant_id_in_users.sql
-- Table: profiles
-- Description: 
-- Author: Gustavo Mota
-- Date: 31/07/2025

BEGIN;
CREATE OR REPLACE FUNCTION public.put_tenant_id_in_user_by_created_by()
RETURNS trigger AS $$
BEGIN
    UPDATE public.profiles
    SET tenant_id = NEW.id
    WHERE id = NEW.created_by;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
COMMIT;

-- ROLLBACK;
-- DROP FUNCTION IF EXISTS public.put_tenant_id_in_user_by_created_by;
-- COMMIT;
