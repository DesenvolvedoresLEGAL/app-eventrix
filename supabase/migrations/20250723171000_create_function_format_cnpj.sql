-- Migration: 20250723171000_create_format_cnpj.sql
-- Descrição: Cria a função para formatar CNPJ com a máscara correta
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
-- Function to format CNPJ with proper mask
CREATE OR REPLACE FUNCTION format_cnpj(cnpj_input TEXT)
RETURNS TEXT AS $$
DECLARE
    cnpj_clean TEXT;
BEGIN
    cnpj_clean := regexp_replace(cnpj_input, '[^0-9]', '', 'g');
    
    IF length(cnpj_clean) = 14 THEN
        RETURN substring(cnpj_clean, 1, 2) || '.' ||
               substring(cnpj_clean, 3, 3) || '.' ||
               substring(cnpj_clean, 6, 3) || '/' ||
               substring(cnpj_clean, 9, 4) || '-' ||
               substring(cnpj_clean, 13, 2);
    END IF;
    
    RETURN cnpj_input;
END;
$$ LANGUAGE plpgsql;
COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP FUNCTION IF EXISTS format_cnpj(cnpj_input TEXT);
--COMMIT;