-- Migration: 20250725125855_alter_constraint_tenant_audit_log_action_check_adding_SUSPEND.sql
-- Descrição: Alteração da restrição de verificação de ação no log de auditoria do inquilino para adicionar SUSPEND
-- Tabela: tenant_audit_log
-- Autor: Gustavo Mota
-- Data: 25/07/2025

BEGIN;
-- Remover a constraint existente
ALTER TABLE public.tenant_audit_log
DROP CONSTRAINT tenant_audit_log_action_check;

-- Adicionar nova constraint com o valor 'SUSPEND' incluído
ALTER TABLE public.tenant_audit_log
ADD CONSTRAINT tenant_audit_log_action_check
CHECK (
  (action)::text = ANY (
    ARRAY[
      'CREATE',
      'UPDATE',
      'DELETE',
      'LOGIN',
      'LOGOUT',
      'VIEW',
      'EXPORT',
      'IMPORT',
      'SYNC',
      'APPROVE',
      'REJECT',
      'SUSPEND'
    ]::text[]
  )
);
COMMIT;

--ROLLBACK;
-- Remover a constraint alterada
ALTER TABLE public.tenant_audit_log
DROP CONSTRAINT tenant_audit_log_action_check;

-- Recriar a constraint original (sem 'SUSPEND')
-- ALTER TABLE public.tenant_audit_log
-- ADD CONSTRAINT tenant_audit_log_action_check
-- CHECK (
--   (action)::text = ANY (
--     ARRAY[
--       'CREATE',
--       'UPDATE',
--       'DELETE',
--       'LOGIN',
--       'LOGOUT',
--       'VIEW',
--       'EXPORT',
--       'IMPORT',
--       'SYNC',
--       'APPROVE',
--       'REJECT'
--     ]::text[]
--   )
-- );
-- COMMIT;
