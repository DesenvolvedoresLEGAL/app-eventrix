-- Migration: 20250723184516_create_index_on_tenants.sql
-- Descrição: Cria índices na tabela tenants.
-- Tabela: tenants
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
-- Create comprehensive indexes for performance
CREATE INDEX idx_tenants_slug ON tenants(slug);
CREATE INDEX idx_tenants_cnpj ON tenants(cnpj);
CREATE INDEX idx_tenants_status ON tenants(status_id);
CREATE INDEX idx_tenants_plan ON tenants(plan_id);
CREATE INDEX idx_tenants_domain ON tenants(email_domain) WHERE email_domain IS NOT NULL;
CREATE INDEX idx_tenants_state ON tenants(state_id);
CREATE INDEX idx_tenants_segment ON tenants(primary_segment_id);
CREATE INDEX idx_tenants_organizer_type ON tenants(organizer_type_id);
CREATE INDEX idx_tenants_contact_email ON tenants(contact_email);
CREATE INDEX idx_tenants_active ON tenants(id) WHERE deleted_at IS NULL;
CREATE INDEX idx_tenants_trial ON tenants(trial_ends_at) WHERE trial_ends_at IS NOT NULL;
CREATE INDEX idx_tenants_plan_expires ON tenants(plan_expires_at) WHERE plan_expires_at IS NOT NULL;
CREATE INDEX idx_tenants_created_at ON tenants(created_at);
CREATE INDEX idx_tenants_last_login ON tenants(last_login_at);
CREATE INDEX idx_tenants_onboarding ON tenants(onboarding_completed, onboarding_current_step);

-- Full-text search indexes for Brazilian context
CREATE INDEX idx_tenants_search_razao_social ON tenants USING gin(to_tsvector('portuguese', razao_social)); -- O gin faz o índice de texto completo, no lugar de buscar o que está escrito, ele busca por termos indexados.
CREATE INDEX idx_tenants_search_nome_fantasia ON tenants USING gin(to_tsvector('portuguese', coalesce(nome_fantasia, '')));

-- Composite indexes for common queries
CREATE INDEX idx_tenants_status_plan ON tenants(status_id, plan_id);
CREATE INDEX idx_tenants_state_segment ON tenants(state_id, primary_segment_id);
CREATE INDEX idx_tenants_created_status ON tenants(created_at, status_id) WHERE deleted_at IS NULL;

COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP INDEX IF EXISTS idx_tenants_slug;
-- DROP INDEX IF EXISTS idx_tenants_cnpj;
-- DROP INDEX IF EXISTS idx_tenants_status;
-- DROP INDEX IF EXISTS idx_tenants_plan;
-- DROP INDEX IF EXISTS idx_tenants_domain;
-- DROP INDEX IF EXISTS idx_tenants_state;
-- DROP INDEX IF EXISTS idx_tenants_segment;
-- DROP INDEX IF EXISTS idx_tenants_organizer_type;
-- DROP INDEX IF EXISTS idx_tenants_contact_email;
-- DROP INDEX IF EXISTS idx_tenants_active;
-- DROP INDEX IF EXISTS idx_tenants_trial;
-- DROP INDEX IF EXISTS idx_tenants_plan_expires;
-- DROP INDEX IF EXISTS idx_tenants_created_at;
-- DROP INDEX IF EXISTS idx_tenants_last_login;
-- DROP INDEX IF EXISTS idx_tenants_onboarding;
-- DROP INDEX IF EXISTS idx_tenants_search_razao_social;
-- DROP INDEX IF EXISTS idx_tenants_search_nome_fantasia;
-- COMMIT;