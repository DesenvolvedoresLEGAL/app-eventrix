-- Migration: 20250723193537_create_table_tenant_audit_log.sql
-- Descrição: Cria tabela para log de auditoria de tenants.
-- Tabela: tenant_audit_log
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
-- Comprehensive Audit Log
CREATE TABLE tenant_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

CREATE INDEX idx_tenant_audit_log_tenant ON tenant_audit_log(tenant_id);
CREATE INDEX idx_tenant_audit_log_user ON tenant_audit_log(user_id);
CREATE INDEX idx_tenant_audit_log_action ON tenant_audit_log(action);
CREATE INDEX idx_tenant_audit_log_table ON tenant_audit_log(table_name);
CREATE INDEX idx_tenant_audit_log_record ON tenant_audit_log(table_name, record_id);
CREATE INDEX idx_tenant_audit_log_created ON tenant_audit_log(created_at);
CREATE INDEX idx_tenant_audit_log_tenant_created ON tenant_audit_log(tenant_id, created_at);

COMMENT ON TABLE tenant_audit_log IS 'Log de auditoria completo para compliance LGPD';

COMMENT ON COLUMN tenant_audit_log.lgpd_purpose IS 'Finalidade do processamento para compliance LGPD';

COMMIT;

--ROLLBACK;
-- DROP TABLE IF EXISTS tenant_audit_log CASCADE;
-- COMMIT;