-- Migration: 20250723175939_create_index_on_organizer_types.sql
-- Descrição: Cria indices na tabela organizer_types.
-- Tabela: organizer_types
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
CREATE INDEX idx_organizer_types_code ON organizer_types(code);
CREATE INDEX idx_organizer_types_active ON organizer_types(is_active, sort_order);
COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP INDEX IF EXISTS idx_organizer_types_code;
-- DROP INDEX IF EXISTS idx_organizer_types_active;
-- COMMIT;