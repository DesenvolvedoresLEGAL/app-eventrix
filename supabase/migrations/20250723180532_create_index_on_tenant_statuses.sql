-- Migration: 20250723180532_create_index_on_tenant_statuses.sql
-- Descrição: Cria indices na tabela tenant_statuses.
-- Tabela: tenant_statuses
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
CREATE INDEX idx_tenant_statuses_code ON tenant_statuses(code);
CREATE INDEX idx_tenant_statuses_active ON tenant_statuses(is_active, sort_order);
COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP INDEX IF EXISTS idx_tenant_statuses_code;
-- DROP INDEX IF EXISTS idx_tenant_statuses_active;
-- COMMIT;