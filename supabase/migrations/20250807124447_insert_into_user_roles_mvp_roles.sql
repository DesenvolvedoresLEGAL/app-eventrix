-- Migration: 20250807124447_insert_into_user_roles_mvp_roles.sql
-- Table: user_roles
-- Description: Insere demais valores na tabela auxiliar de cargos de usuário
-- Author: Gustavo Mota
-- Date: 2025-08-08

BEGIN;

INSERT INTO user_roles (
  id,
  code,
  description
) VALUES
  ('240907a4-669a-4c42-800b-32dbbb2e040d', 'developer',      'Gerencia chaves de API, webhooks e customizações técnicas'),
  ('1ed06be7-c476-438f-9f02-b67dca8e20c9', 'event_manager',  'Cria, edita e publica eventos; define cronograma, palestrantes e locais'),
  ('77d681a1-cd77-42ee-9dcb-512365de8ee5', 'finance',        'Acessa relatórios financeiros, gera faturas e controla pagamentos e reembolsos'),
  ('f1f19031-0041-482c-a25f-c44b833bf960', 'content_editor', 'Gerencia conteúdos de marketing do evento'),
  ('aaa81b4c-7757-4a50-bb73-f799c365c57c', 'support',        'Atende dúvidas de participantes e expositores, registra chamados e incidentes'),
  ('17356054-b5bb-4184-903d-2b049bdc8c69', 'coordinator',    'Coordena logística: cuida de fornecedores, credenciamento e suporte in loco'),
  ('7b2118cf-d775-4b2c-8031-c4906d10d6f2', 'viewer',         'Acesso somente leitura a dashboards e relatórios')
ON CONFLICT (code) DO NOTHING;

COMMIT;

-- ROLLBACK;
-- DELETE FROM user_roles
--  WHERE code IN (
--    'developer',
--    'event_manager',
--    'finance',
--    'content_editor',
--    'support',
--    'coordinator',
--    'viewer'
-- );
-- COMMIT;