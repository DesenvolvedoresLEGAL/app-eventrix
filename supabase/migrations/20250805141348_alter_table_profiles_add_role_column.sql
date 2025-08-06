-- Migration: 20250805141348_alter_table_profiles_add_role_column.sql
-- Table: profiles
-- Description: Adiciona a coluna de cargo na tabela de profiles fazendo referenca a id em user_roles
-- Author: Gustavo Mota
-- Date: 2025-08-05

BEGIN;
ALTER TABLE public.profiles ADD COLUMN role uuid REFERENCES user_roles(id) NOT NULL DEFAULT 'ff710068-86e7-40a9-b5d0-12f76cf6a4b3';
COMMIT;

-- ROLLBACK
-- ALTER TABLE public.profiles
--   DROP COLUMN role;
-- COMMIT;