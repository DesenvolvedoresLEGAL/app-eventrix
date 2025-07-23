-- Migration: 20250723203325_create_policys_rls_on_brazilian_states.sql
-- Descrição: Criação de políticas RLS para a tabela brazilian_states
-- Tabela: brazilian_states
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
CREATE POLICY "brazilian_states_read_all" ON brazilian_states
    FOR SELECT
    USING (auth.uid() IS NOT NULL);
COMMIT;

--ROLLBACK;
-- DROP POLICY "brazilian_states_read_all" ON brazilian_states;
-- COMMIT;