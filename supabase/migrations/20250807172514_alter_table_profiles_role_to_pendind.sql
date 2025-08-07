-- Migration: 20250805141348_alter_table_profiles_add_role_column.sql
-- Table: profiles
-- Description: Altera valor default da coluna role em profiles
-- Author: Gustavo Mota
-- Date: 2025-08-08

BEGIN;
ALTER TABLE profiles ALTER COLUMN role SET DEFAULT 'e93078e6-d238-43af-a62b-777b267fb427';
COMMIT;

-- ROLLBACK
-- ALTER TABLE public.profiles
--   DROP COLUMN role;
-- COMMIT;