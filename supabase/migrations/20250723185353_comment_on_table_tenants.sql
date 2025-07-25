-- Migration: 20250723185353_comment_on_table_tenants.sql
-- Descrição: Cria comentários na tabela de tenants.
-- Tabela: tenants
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
-- Add comprehensive table and column comments
COMMENT ON TABLE tenants IS 'Tabela principal dos tenants (empresas brasileiras) do EVENTRIX™';

COMMENT ON COLUMN tenants.cnpj IS 'CNPJ formatado XX.XXX.XXX/XXXX-XX com validação de dígitos verificadores';
COMMENT ON COLUMN tenants.razao_social IS 'Razão social da empresa conforme CNPJ';
COMMENT ON COLUMN tenants.nome_fantasia IS 'Nome fantasia ou marca da empresa';
COMMENT ON COLUMN tenants.email_domain IS 'Domínio corporativo para validação automática de usuários';
COMMENT ON COLUMN tenants.primary_color IS 'Cor primária da marca em formato hexadecimal';
COMMENT ON COLUMN tenants.endereco_logradouro IS 'Logradouro (rua, avenida, praça, etc.)';
COMMENT ON COLUMN tenants.cep IS 'CEP no formato XXXXX-XXX';
COMMENT ON COLUMN tenants.features_enabled IS 'Funcionalidades habilitadas baseadas no plano (JSON)';
COMMENT ON COLUMN tenants.lgpd_acceptance_date IS 'Data de aceite dos termos da LGPD';
COMMENT ON COLUMN tenants.regime_tributario IS 'Regime tributário da empresa (Simples Nacional, etc.)';
COMMENT ON COLUMN tenants.total_revenue_brl IS 'Receita total gerada pela empresa na plataforma (em BRL)';
COMMENT ON COLUMN tenants.deleted_at IS 'Data de exclusão lógica (soft delete)';
COMMIT;

--ROLLBACK;
-- COMMENT ON TABLE tenants IS NULL;
-- COMMENT ON COLUMN tenants.cnpj IS NULL;
-- COMMENT ON COLUMN tenants.razao_social IS NULL;
-- COMMENT ON COLUMN tenants.nome_fantasia IS NULL;
-- COMMENT ON COLUMN tenants.email_domain IS NULL;
-- COMMENT ON COLUMN tenants.primary_color IS NULL;
-- COMMENT ON COLUMN tenants.endereco_logradouro IS NULL;
-- COMMENT ON COLUMN tenants.cep IS NULL;
-- COMMENT ON COLUMN tenants.features_enabled IS NULL;
-- COMMENT ON COLUMN tenants.lgpd_acceptance_date IS NULL;
-- COMMENT ON COLUMN tenants.regime_tributario IS NULL;
-- COMMENT ON COLUMN tenants.total_revenue_brl IS NULL;
-- COMMENT ON COLUMN tenants.deleted_at IS NULL;
-- COMMIT;