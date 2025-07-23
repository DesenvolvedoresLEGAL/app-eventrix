-- Migration: 20250723172649_create_function_table_organizer_types.sql
-- Descrição: Cria a tabela de tipos de organizadores
-- Tabela: organizer_types
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
-- Organizer Types (Tipos de Organizadores)
CREATE TABLE organizer_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT organizer_types_code_check CHECK (code ~ '^[a-z_]+$'),
    CONSTRAINT organizer_types_sort_order_check CHECK (sort_order >= 0)
);
COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP TABLE IF EXISTS organizer_types;
-- COMMIT;