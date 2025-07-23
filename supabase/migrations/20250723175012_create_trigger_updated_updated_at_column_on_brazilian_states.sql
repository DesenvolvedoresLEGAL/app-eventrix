-- Migration: 20250723175012_create_trigger_updated_updated_at_column_on_brazilian_states.sql
-- Descrição: Cria trigger para atualizar a coluna updated_at na tabela brazilian_states.
-- Tabela: brazilian_states
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
CREATE TRIGGER trigger_brazilian_states_updated_at
    BEFORE UPDATE ON brazilian_states
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP TRIGGER IF EXISTS trigger_brazilian_states_updated_at ON brazilian_states;
-- COMMIT;