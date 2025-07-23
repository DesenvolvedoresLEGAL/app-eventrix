-- Migration: 20250723171659_create_encrypt_sensitive_data.sql
-- Descrição: Cria a função para criptografar dados sensíveis
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
-- Function to encrypt sensitive data
CREATE OR REPLACE FUNCTION encrypt_sensitive_data(data_input TEXT, key_input TEXT DEFAULT 'eventrix_default_key')
RETURNS TEXT AS $$
BEGIN
    IF data_input IS NULL OR data_input = '' THEN
        RETURN data_input;
    END IF;
    
    RETURN encode(
        encrypt(data_input::bytea, key_input::bytea, 'aes'),
        'base64'
    );
END;
$$ LANGUAGE plpgsql;
COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP FUNCTION IF EXISTS encrypt_sensitive_data(data_input TEXT, key_input TEXT DEFAULT 'eventrix_default_key');
--COMMIT;