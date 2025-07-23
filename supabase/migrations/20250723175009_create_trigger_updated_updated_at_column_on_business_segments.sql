-- Migration: 20250723175009_create_trigger_updated_updated_at_column_on_business_segments.sql
-- Descrição: Cria trigger para atualizar a coluna updated_at na tabela business_segments.
-- Tabela: business_segments
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
CREATE TRIGGER trigger_business_segments_updated_at
    BEFORE UPDATE ON business_segments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP TRIGGER IF EXISTS trigger_business_segments_updated_at ON business_segments;
-- COMMIT;