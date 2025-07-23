-- Migration: 20250723180902_create_index_on_brazilian_states.sql
-- Descrição: Cria indices na tabela brazilian_states.
-- Tabela: brazilian_states
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
CREATE INDEX idx_brazilian_states_code ON brazilian_states(code);
CREATE INDEX idx_brazilian_states_region ON brazilian_states(region);
COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP INDEX IF EXISTS idx_brazilian_states_code;
-- DROP INDEX IF EXISTS idx_brazilian_states_region;
-- COMMIT;