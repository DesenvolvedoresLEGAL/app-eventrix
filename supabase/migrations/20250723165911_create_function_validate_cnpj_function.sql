-- Migration: 20250723165911_create_function_validate_cnpj_function.sql
-- Descrição: Cria a função para validar o formato e os dígitos de verificação do CNPJ
-- Autor: Gustavo Mota
-- Data: 23/07/2025

-- Function to validate Brazilian CNPJ format and check digits
BEGIN;
CREATE OR REPLACE FUNCTION validate_cnpj(cnpj_input TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    cnpj_clean TEXT;
    dig1 INTEGER;
    dig2 INTEGER;
    peso INTEGER;
    soma INTEGER;
    i INTEGER;
BEGIN
    -- Remove formatting characters
    cnpj_clean := regexp_replace(cnpj_input, '[^0-9]', '', 'g');
    
    -- Check if it has exactly 14 digits
    IF length(cnpj_clean) != 14 THEN
        RETURN FALSE;
    END IF;
    
    -- Check for repeated digits (invalid CNPJs like 11111111111111)
    IF cnpj_clean = repeat(substring(cnpj_clean, 1, 1), 14) THEN
        RETURN FALSE;
    END IF;
    
    -- Calculate first check digit
    soma := 0;
    peso := 5;
    FOR i IN 1..12 LOOP
        soma := soma + (substring(cnpj_clean, i, 1)::INTEGER * peso);
        peso := peso - 1;
        IF peso < 2 THEN
            peso := 9;
        END IF;
    END LOOP;
    
    dig1 := 11 - (soma % 11);
    IF dig1 >= 10 THEN
        dig1 := 0;
    END IF;
    
    -- Calculate second check digit
    soma := 0;
    peso := 6;
    FOR i IN 1..13 LOOP
        soma := soma + (substring(cnpj_clean, i, 1)::INTEGER * peso);
        peso := peso - 1;
        IF peso < 2 THEN
            peso := 9;
        END IF;
    END LOOP;
    
    dig2 := 11 - (soma % 11);
    IF dig2 >= 10 THEN
        dig2 := 0;
    END IF;
    
    -- Verify check digits
    RETURN (substring(cnpj_clean, 13, 1)::INTEGER = dig1) AND 
           (substring(cnpj_clean, 14, 1)::INTEGER = dig2);
END;
$$ LANGUAGE plpgsql;
COMMIT;

-- Rollback: Remove a função validate_cnpj criada na migration 20250723165911_create_validate_cnpj_function.sql
-- BEGIN;
-- DROP FUNCTION IF EXISTS validate_cnpj(TEXT);
-- COMMIT;
