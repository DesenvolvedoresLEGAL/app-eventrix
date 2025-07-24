-- Migration: 20250723205118_seed_tenant_statuses
-- Descrição: Seed de status de inquilinos
-- Tabela: tenant_statuses
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
INSERT INTO tenant_statuses (code, name, description, color_hex, sort_order) VALUES
('trial', 'Trial Ativo', 'Período de avaliação gratuita', '#3B82F6', 1),
('aguardando_validacao', 'Aguardando Validação', 'Aguardando validação de documentos', '#F59E0B', 2),
('ativo', 'Ativo', 'Tenant ativo e funcional', '#10B981', 3),
('suspenso', 'Suspenso', 'Temporariamente suspenso', '#EF4444', 4),
('bloqueado', 'Bloqueado', 'Bloqueado por violação de termos', '#DC2626', 5),
('cancelado', 'Cancelado', 'Assinatura cancelada pelo cliente', '#6B7280', 6),
('inadimplente', 'Inadimplente', 'Pagamento em atraso', '#F97316', 7);
COMMIT;

--ROLLBACK;
-- DELETE FROM tenant_statuses WHERE code IN ('trial', 'aguardando_validacao', 'ativo', 'suspenso', 'bloqueado', 'cancelado', 'inadimplente');
-- COMMIT;