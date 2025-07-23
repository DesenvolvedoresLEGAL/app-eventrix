-- Migration: 20250723193537_create_table_tenant_audit_log.sql
-- Descrição: Cria tabela para log de auditoria de tenants.
-- Tabela: tenant_audit_log
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
-- Comprehensive Audit Log
CREATE TABLE tenant_audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID,
    action VARCHAR(50) NOT NULL,
    table_name VARCHAR(100) NOT NULL,
    record_id UUID,
    old_values JSONB, -- Old values before the change
    new_values JSONB, -- New values after the change
    
    -- Request Context
    ip_address INET,
    user_agent TEXT,
    session_id VARCHAR(100),
    
    -- Brazilian Compliance
    lgpd_purpose TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT tenant_audit_log_action_check CHECK (
        action IN (
            'CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT',
            'VIEW', 'EXPORT', 'IMPORT', 'SYNC', 'APPROVE', 'REJECT'
        )
    )
);
COMMIT;

--ROLLBACK;
-- DROP TABLE IF EXISTS tenant_audit_log CASCADE;
-- COMMIT;