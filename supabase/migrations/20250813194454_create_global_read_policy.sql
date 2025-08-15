-- Migration: 20250813194454_create_global_read_policy.sql
-- Description: Cria uma política de RLS global que permite o acesso de leitura (SELECT) para todos os utilizadores em todas as tabelas do esquema público.
-- Author: Gustavo Mota
-- Date: 2025-08-13

BEGIN;

DO $$
DECLARE
    table_record RECORD;
BEGIN
    -- Itera sobre todas as tabelas no esquema 'public'
    FOR table_record IN
        SELECT tablename
        FROM pg_catalog.pg_tables
        WHERE schemaname = 'public'
    LOOP
        -- Cria a política de leitura para cada tabela.
        -- 'AS PERMISSIVE' é o comportamento padrão, mas está incluído para clareza.
        -- 'TO public' concede a permissão a todos os roles, incluindo anónimos.
        -- 'USING (true)' garante que a política se aplique a todas as linhas.
        EXECUTE format(
            'CREATE POLICY "Enable read access for all users" ON public.%I AS PERMISSIVE FOR SELECT TO public USING (true);',
            table_record.tablename
        );
    END LOOP;
END;
$$;

COMMIT;

-- ROLLBACK
-- Descrição: Remove a política de leitura global de todas as tabelas para reverter a migração.

-- BEGIN;
--
-- DO $$
-- DECLARE
--     table_record RECORD;
-- BEGIN
--     FOR table_record IN
--         SELECT tablename
--         FROM pg_catalog.pg_tables
--         WHERE schemaname = 'public'
--     LOOP
--         -- Remove a política se ela existir na tabela
--         EXECUTE format(
--             'DROP POLICY IF EXISTS "Enable read access for all users" ON public.%I;',
--             table_record.tablename
--         );
--     END LOOP;
-- END;
-- $$;
--
-- COMMIT;
