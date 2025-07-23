-- Migration: 20250723174442_create_table_brazilian_states.sql
-- Descrição: Cria a tabela brazilian_states para armazenar informações sobre os estados brasileiros.
-- Tabela: brazilian_states
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
-- Brazilian States (Estados Brasileiros)
CREATE TABLE brazilian_states (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(2) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    region VARCHAR(20) NOT NULL,
    capital VARCHAR(100) NOT NULL,
    timezone VARCHAR(50) NOT NULL DEFAULT 'America/Sao_Paulo',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT brazilian_states_code_check CHECK (code ~ '^[A-Z]{2}$'),
    CONSTRAINT brazilian_states_region_check CHECK (
        region IN ('Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul')
    )
);
COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP TABLE IF EXISTS brazilian_states CASCADE;
-- COMMIT;