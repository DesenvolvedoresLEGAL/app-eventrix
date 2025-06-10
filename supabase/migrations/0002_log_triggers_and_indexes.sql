-- Add log triggers and indexes for new tables

-- 1. Triggers de logging para as novas tabelas
CREATE TRIGGER trg_plans_log
  AFTER INSERT OR UPDATE OR DELETE ON plans
  FOR EACH ROW EXECUTE FUNCTION log_entity_change();

CREATE TRIGGER trg_integrations_log
  AFTER INSERT OR UPDATE OR DELETE ON integrations
  FOR EACH ROW EXECUTE FUNCTION log_entity_change();

CREATE TRIGGER trg_notifications_log
  AFTER INSERT OR UPDATE OR DELETE ON notifications
  FOR EACH ROW EXECUTE FUNCTION log_entity_change();

CREATE TRIGGER trg_document_validations_log
  AFTER INSERT OR UPDATE OR DELETE ON document_validations
  FOR EACH ROW EXECUTE FUNCTION log_entity_change();

CREATE TRIGGER trg_heatmap_data_log
  AFTER INSERT OR UPDATE OR DELETE ON heatmap_data
  FOR EACH ROW EXECUTE FUNCTION log_entity_change();

CREATE TRIGGER trg_legal_documents_log
  AFTER INSERT OR UPDATE OR DELETE ON legal_documents
  FOR EACH ROW EXECUTE FUNCTION log_entity_change();

-- 2. Índices nas FKs das novas tabelas
CREATE INDEX idx_document_validations_user_id ON document_validations(user_id);
CREATE INDEX idx_heatmap_data_visitor_id ON heatmap_data(visitor_id);
CREATE INDEX idx_legal_documents_user_id ON legal_documents(user_id);
