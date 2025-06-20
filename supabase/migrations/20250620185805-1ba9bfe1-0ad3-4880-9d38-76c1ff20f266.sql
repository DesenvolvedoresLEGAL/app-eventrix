
-- Adicionar coluna deleted_at na tabela events
ALTER TABLE public.events 
ADD COLUMN deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL;

-- Criar índice na coluna deleted_at para otimizar queries
CREATE INDEX idx_events_deleted_at ON public.events(deleted_at);

-- Criar índice composto para filtrar eventos por tenant e não deletados
CREATE INDEX idx_events_tenant_not_deleted ON public.events(tenant_id, deleted_at) 
WHERE deleted_at IS NULL;
