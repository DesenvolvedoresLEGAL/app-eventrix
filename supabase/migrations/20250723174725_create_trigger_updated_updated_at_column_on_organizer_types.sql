-- Migration: 20250723174725_create_trigger_updated_updated_at_column_on_organizer_types.sql
-- Descrição: Cria trigger para atualizar a coluna updated_at na tabela organizer_types.
-- Tabela: organizer_types
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
CREATE TRIGGER trigger_organizer_types_updated_at
    BEFORE UPDATE ON organizer_types
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP TRIGGER IF EXISTS trigger_organizer_types_updated_at ON organizer_types;
-- COMMIT;