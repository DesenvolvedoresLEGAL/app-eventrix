-- Migration: 20250729114023_comment_on_table_profiles.sql
-- Table: profiles
-- Decription: Cria comentários na tabela profiles.
-- Author: Gustavo Mota
-- Date: 29/07/2025

BEGIN;
COMMENT ON TABLE public.profiles IS 'Tabela de usuários vinculados ao módulo de autenticação';
COMMIT;

-- ROLLBACK;
-- COMMENT ON TABLE public.profiles IS NULL;
-- COMMIT;