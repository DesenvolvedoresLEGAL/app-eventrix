-- Migration: 20250813125943_enable_rls_for_all_tables.sql
-- Description: Habilita a segurança em nível de linha (RLS) em todas as tabelas do esquema público.
-- Author: Gustavo Mota
-- Date: 2025-08-13

BEGIN;

-- Habilita RLS para cada tabela
ALTER TABLE public.brazilian_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_segments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizer_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_plan_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_statuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_usage_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

COMMIT;

-- ROLLBACK
-- Descrição: Desabilita o RLS em todas as tabelas para reverter a migração.

-- BEGIN;

-- ALTER TABLE public.brazilian_states DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.business_segments DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.invites DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.organizer_types DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.subscription_plans DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.tenant_audit_log DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.tenant_documents DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.tenant_plan_history DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.tenant_settings DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.tenant_statuses DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.tenant_usage_stats DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.tenants DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.user_roles DISABLE ROW LEVEL SECURITY;

-- COMMIT;
