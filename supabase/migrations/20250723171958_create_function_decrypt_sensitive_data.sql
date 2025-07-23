-- Migration: 20250723171958_create_function_decrypt_sensitive_data.sql
-- Descrição: Cria a função para descriptografar dados sensíveis
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
-- Function to decrypt sensitive data
CREATE OR REPLACE FUNCTION decrypt_sensitive_data(encrypted_input TEXT, key_input TEXT DEFAULT 'eventrix_default_key')
RETURNS TEXT AS $$
BEGIN
    IF encrypted_input IS NULL OR encrypted_input = '' THEN
        RETURN encrypted_input;
    END IF;
    
    RETURN decrypt(
        decode(encrypted_input, 'base64'),
        key_input::bytea,
        'aes'
    )::TEXT;
EXCEPTION
    WHEN OTHERS THEN
        RETURN NULL; -- Return NULL if decryption fails
END;
$$ LANGUAGE plpgsql;
COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP FUNCTION IF EXISTS decrypt_sensitive_data(encrypted_input TEXT, key_input TEXT DEFAULT 'eventrix_default_key')
--COMMIT;