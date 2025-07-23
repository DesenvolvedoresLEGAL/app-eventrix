-- Migration: 20250723203317_create_policys_rls_on_business_segments.sql
-- Descrição: Criação de políticas RLS para a tabela business_segments
-- Tabela: business_segments
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
CREATE POLICY "business_segments_read_all" ON business_segments
    FOR SELECT
    USING (auth.uid() IS NOT NULL);
COMMIT;

--ROLLBACK;
-- DROP POLICY "business_segments_read_all" ON business_segments;
-- COMMIT;