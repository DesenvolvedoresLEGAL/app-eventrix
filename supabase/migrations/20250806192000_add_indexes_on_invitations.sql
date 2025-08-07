-- Migration: 20250806192000_add_indexes_on_invitations.sql
-- Table: invitations
-- Description: Adiciona índices para consultas frequentes na tabela invitations.
-- Author: OpenAI ChatGPT
-- Date: 2025-08-06

BEGIN;
  CREATE INDEX idx_invitations_tenant_status ON public.invitations(tenant_id, status);
  CREATE INDEX idx_invitations_email ON public.invitations(email);
COMMIT;

-- ROLLBACK
-- DROP INDEX IF EXISTS public.idx_invitations_email;
-- DROP INDEX IF EXISTS public.idx_invitations_tenant_status;
-- COMMIT;
