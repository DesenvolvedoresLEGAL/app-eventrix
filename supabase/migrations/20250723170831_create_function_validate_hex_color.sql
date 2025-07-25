-- Migration: 20250723170317_create_function_validate_hex_color.sql
-- Descrição: Cria a função para validação de cores hexadecimais
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
-- Function to validate hex color format
CREATE OR REPLACE FUNCTION validate_hex_color(color_input TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN color_input ~ '^#[0-9A-Fa-f]{6}$';
END;
$$ LANGUAGE plpgsql;
COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP FUNCTION IF EXISTS validate_hex_color(color_input TEXT);
--COMMIT;