-- Migration: 
-- Descrição: 
-- Tabela: 
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
CREATE TYPE tenant_document_status AS ENUM (
    'pending', 'verified', 'rejected', 'expired'
);
COMMIT;

-- ROLLBACK;
-- DROP TYPE IF EXISTS tenant_document_status CASCADE;
-- COMMIT;