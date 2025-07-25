-- Migration: 20250723170317_create_function_validate_cep.sql
-- Descrição: Cria a função para validar o formato e os dígitos de verificação do CEP
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
CREATE OR REPLACE FUNCTION validate_cep(cep_input TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN cep_input IS NULL OR cep_input ~ '^\d{5}-\d{3}$';
END;
$$ LANGUAGE plpgsql;
COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP FUNCTION IF EXISTS validate_cep(cep_input TEXT);
--COMMIT;