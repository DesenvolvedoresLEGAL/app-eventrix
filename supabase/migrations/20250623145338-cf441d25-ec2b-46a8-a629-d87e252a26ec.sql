
-- Adicionar campos ausentes à tabela event_team (exceto status)
ALTER TABLE event_team ADD COLUMN department TEXT;
ALTER TABLE event_team ADD COLUMN phone TEXT;
ALTER TABLE event_team ADD COLUMN permissions TEXT[] DEFAULT '{}';

-- Criar enum para status
CREATE TYPE staff_status_enum AS ENUM ('Ativo', 'Inativo', 'Suspenso');

-- Adicionar coluna status diretamente com o tipo enum
ALTER TABLE event_team ADD COLUMN status staff_status_enum DEFAULT 'Ativo';

-- Adicionar índices para performance
CREATE INDEX idx_event_team_status ON event_team(status);
CREATE INDEX idx_event_team_department ON event_team(department);

-- Adicionar comentários para documentação
COMMENT ON COLUMN event_team.department IS 'Departamento do membro da equipe';
COMMENT ON COLUMN event_team.phone IS 'Telefone de contato do membro da equipe';
COMMENT ON COLUMN event_team.status IS 'Status atual do membro da equipe';
COMMENT ON COLUMN event_team.permissions IS 'Array de permissões do membro da equipe';
