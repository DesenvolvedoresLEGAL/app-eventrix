-- Migration: 20250723173812_create_table_business_segments.sql
-- Descrição: Cria a tabela `business_segments` para armazenar os segmentos de negócio.
-- Tabela: business_segments
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
-- Business Segments (Segmentos de Negócio)
CREATE TABLE business_segments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon_name VARCHAR(50),
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT business_segments_code_check CHECK (code ~ '^[a-z_]+$'),
    CONSTRAINT business_segments_sort_order_check CHECK (sort_order >= 0)
);

COMMENT ON TABLE business_segments IS 'Segmentos de negócio brasileiros';

COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP TABLE IF EXISTS business_segments CASCADE;
-- COMMIT;