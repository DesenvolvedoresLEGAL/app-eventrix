-- Migration: 
-- Descrição: 
-- Tabela: 
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
CREATE TYPE tenant_document_type AS ENUM (
    'contrato_social', 'certidao_negativa', 'cartao_cnpj',
    'procuracao', 'alvara_funcionamento', 'certificado_digital',
    'comprovante_endereco', 'inscricao_municipal', 'outros'
);
COMMIT;

-- ROLLBACK;
-- DROP TYPE IF EXISTS tenant_document_type CASCADE;
-- COMMIT;