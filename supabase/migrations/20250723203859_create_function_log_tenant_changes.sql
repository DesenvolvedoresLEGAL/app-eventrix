-- Migration: 20250723203859_create_function_log_tenant_changes.sql
-- Descrição: Criação da função de log de alterações de inquilinos
-- Tabela: tenant_audit_log
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
-- Function to automatically log tenant changes
CREATE OR REPLACE FUNCTION log_tenant_changes()
RETURNS TRIGGER AS $$
DECLARE
    tenant_uuid UUID;
    user_uuid UUID;
BEGIN
    -- Get tenant_id from the record
    IF TG_OP = 'DELETE' THEN
        tenant_uuid := OLD.tenant_id;
    ELSE
        tenant_uuid := NEW.tenant_id;
    END IF;
    
    -- Get current user
    user_uuid := (current_setting('request.jwt.claims', true)::json->>'sub')::UUID;
    
    -- Insert audit log entry
    INSERT INTO tenant_audit_log (
        tenant_id,
        user_id,
        action,
        table_name,
        record_id,
        old_values,
        new_values,
        ip_address,
        user_agent,
        session_id
    ) VALUES (
        tenant_uuid,
        user_uuid,
        TG_OP,
        TG_TABLE_NAME,
        CASE 
            WHEN TG_OP = 'DELETE' THEN OLD.id
            ELSE NEW.id
        END,
        CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN row_to_json(OLD) END,
        CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW) END,
        inet(current_setting('request.headers', true)::json->>'x-forwarded-for'),
        current_setting('request.headers', true)::json->>'user-agent',
        current_setting('request.headers', true)::json->>'x-session-id'
    );
    
    RETURN CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NEW END;
EXCEPTION
    WHEN OTHERS THEN
        -- Don't fail the main operation if audit logging fails
        RETURN CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NEW END;
END;
$$ LANGUAGE plpgsql;
COMMIT;

--ROLLBACK;
-- DROP FUNCTION IF EXISTS log_tenant_changes;
-- COMMIT;