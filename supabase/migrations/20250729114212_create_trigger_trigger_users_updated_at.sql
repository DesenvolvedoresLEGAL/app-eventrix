-- Migration: 20250729114212_create_trigger_trigger_profiles_updated_at.sql
-- Table: profiles
-- Decription: Cria trigger na tabela profiles para atualizar campo de carimbo de atualização.
-- Author: Gustavo Mota
-- Date: 29/07/2025

BEGIN;
CREATE OR REPLACE TRIGGER trigger_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();   
COMMIT;

-- ROLLBACK;
-- DROP TRIGGER IF EXISTS trigger_profiles_updated_at;
-- COMMIT;