-- Migration: 
-- Descrição: Cria função para atualizar a coluna updated_at na tabela tenants.
-- Tabela: tenants
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
-- Create function to update plan usage cache when plan changes
CREATE OR REPLACE FUNCTION update_tenant_plan_cache()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.plan_id != OLD.plan_id THEN
        UPDATE tenants 
        SET 
            max_events_allowed = (
                SELECT CASE 
                    WHEN sp.max_events_max = -1 THEN 999999
                    ELSE sp.max_events_max 
                END
                FROM subscription_plans sp 
                WHERE sp.id = NEW.plan_id
            ),
            max_admins_allowed = (
                SELECT sp.max_admins
                FROM subscription_plans sp 
                WHERE sp.id = NEW.plan_id
            ),
            max_visitors_allowed = (
                SELECT CASE 
                    WHEN sp.max_visitors_max = -1 THEN 999999
                    ELSE sp.max_visitors_max 
                END
                FROM subscription_plans sp 
                WHERE sp.id = NEW.plan_id
            ),
            max_exhibitors_allowed = (
                SELECT sp.max_exhibitors
                FROM subscription_plans sp 
                WHERE sp.id = NEW.plan_id
            ),
            features_enabled = (
                SELECT sp.features
                FROM subscription_plans sp 
                WHERE sp.id = NEW.plan_id
            )
        WHERE id = NEW.id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP FUNCTION IF EXISTS update_tenant_plan_cache();
-- COMMIT;