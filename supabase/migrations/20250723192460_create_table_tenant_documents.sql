-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
CREATE TABLE tenant_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    document_type tenant_document_type NOT NULL,
    document_name VARCHAR(200) NOT NULL,
    file_url TEXT NOT NULL,
    file_size_bytes INTEGER NOT NULL CHECK (file_size_bytes > 0),
    mime_type VARCHAR(100) NOT NULL CHECK (
        mime_type IN (
            'application/pdf', 'image/jpeg', 'image/png', 'image/webp',
            'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        )
    ),
    verification_status tenant_document_status NOT NULL DEFAULT 'pending',
    verified_at TIMESTAMP WITH TIME ZONE,
    verified_by UUID,
    expires_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tenant_documents_tenant ON tenant_documents(tenant_id);
CREATE INDEX idx_tenant_documents_type ON tenant_documents(tenant_id, document_type);
CREATE INDEX idx_tenant_documents_status ON tenant_documents(verification_status);
CREATE INDEX idx_tenant_documents_expires ON tenant_documents(expires_at) WHERE expires_at IS NOT NULL;

COMMENT ON TABLE tenant_documents IS 'Documentos legais e comprobatórios brasileiros';

COMMENT ON COLUMN tenant_documents.verification_status IS 'Status da verificação do documento';

COMMIT;

-- ROLLBACK;
-- DROP TABLE IF EXISTS tenant_documents CASCADE;
-- COMMIT;