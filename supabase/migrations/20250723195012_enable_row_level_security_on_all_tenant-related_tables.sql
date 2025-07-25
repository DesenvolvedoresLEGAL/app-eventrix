-- Migration: 20250723195012_enable_row_level_security_on_all_tenant-related_tables.sql
-- Descrição: Habilita a segurança em nível de linha em todas as tabelas relacionadas a inquilinos.
-- Tabela: tenants, tenant_usage_stats, tenant_settings, tenant_logs, tenant_documents, tenant_audit_log, tenant_plan_history
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_usage_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_statuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_plan_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizer_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brazilian_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_segments ENABLE ROW LEVEL SECURITY;
COMMIT;

--ROLLBACK;
-- ALTER TABLE tenants DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE tenant_usage_stats DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE tenant_settings DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE tenant_documents DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE tenant_audit_log DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE tenant_plan_history DISABLE ROW LEVEL SECURITY;
-- COMMIT;