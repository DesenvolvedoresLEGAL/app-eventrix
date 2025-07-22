-- =====================================================================
-- EVENTRIX™ - Migration 001: Extensions and Helper Functions
-- =====================================================================
-- Description: Setup necessary PostgreSQL extensions and utility functions
-- Created: 2025-07-22
-- =====================================================================

-- Function to update updated_at column automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to validate Brazilian CNPJ format and check digits
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

-- Function to validate Brazilian CEP format
CREATE OR REPLACE FUNCTION validate_cep(cep_input TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN cep_input IS NULL OR cep_input ~ '^\d{5}-\d{3}$';
END;
$$ LANGUAGE plpgsql;

-- Function to validate hex color format
CREATE OR REPLACE FUNCTION validate_hex_color(color_input TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN color_input ~ '^#[0-9A-Fa-f]{6}$';
END;
$$ LANGUAGE plpgsql;

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