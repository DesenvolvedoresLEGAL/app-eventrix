-- Migration: 20250723180626_create_index_on_business_segments.sql
-- Descrição: Cria indices na tabela business_segments.
-- Tabela: business_segments
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
CREATE INDEX idx_business_segments_code ON business_segments(code);
CREATE INDEX idx_business_segments_active ON business_segments(is_active, sort_order);
COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP INDEX IF EXISTS idx_business_segments_code;
-- DROP INDEX IF EXISTS idx_business_segments_active;
-- COMMIT;