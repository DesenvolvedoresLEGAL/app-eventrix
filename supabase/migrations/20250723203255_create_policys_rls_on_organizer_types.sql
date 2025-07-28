-- Migration: 20250723203255_create_policys_rls_on_organizer_types.sql
-- Descrição: Criação de políticas RLS para a tabela organizer_types
-- Tabela: organizer_types
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
CREATE POLICY "organizer_types_read_all" ON organizer_types
    FOR SELECT
    USING (auth.uid() IS NOT NULL);
-- COMMIT;

--ROLLBACK;
DROP POLICY "organizer_types_read_all" ON organizer_types;
COMMIT;