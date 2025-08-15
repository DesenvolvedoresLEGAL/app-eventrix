-- Migration: 20250813192703_create_global_insert_policy.sql
-- Description: Cria uma política de RLS global que permite a inserção (INSERT) por qualquer utilizador autenticado em todas as tabelas do esquema público.
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
        -- Remove a política antiga, se existir, para evitar conflitos.
        EXECUTE format(
            'DROP POLICY IF EXISTS "Allow authenticated users to insert" ON public.%I;',
            table_record.tablename
        );

        -- Cria a nova política de inserção para cada tabela.
        -- O nome da política foi atualizado conforme solicitado.
        -- A cláusula 'TO authenticated' garante que apenas utilizadores autenticados podem inserir.
        EXECUTE format(
            'CREATE POLICY "Enable insert for authenticated users only" ON public.%I FOR INSERT TO authenticated WITH CHECK (true);',
            table_record.tablename
        );
    END LOOP;
END;
$$;

COMMIT;

-- ROLLBACK
-- Descrição: Remove a política de inserção global de todas as tabelas para reverter a migração.

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
--             'DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.%I;',
--             table_record.tablename
--         );
--     END LOOP;
-- END;
-- $$;
--
-- COMMIT;
