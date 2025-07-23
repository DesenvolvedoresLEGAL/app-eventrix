-- Migration: 20250723132000_create_users_table.sql
-- Descrição: Cria a função para atualizar a coluna updated_at
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMIT;

-- Rollback
-- BEGIN;
-- DROP FUNCTION IF EXISTS update_updated_at_column();
-- COMMIT;