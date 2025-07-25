-- Migration: 20250725113659_create_function_change_tenant_plan.sql
-- Descrição: Criação da função para alterar o plano do inquilino
-- Tabela: tenants, tenant_plan_history
-- Autor: Gustavo Mota
-- Data: 25/07/2025

BEGIN;
CREATE OR REPLACE FUNCTION change_tenant_plan(
    p_tenant_id UUID,
    p_new_plan_code VARCHAR(50),
    p_reason VARCHAR(100),
    p_changed_by UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    v_current_plan_id UUID;
    v_new_plan_id UUID;
    v_price_difference DECIMAL(10,2);
    v_current_price DECIMAL(10,2);
    v_new_price DECIMAL(10,2);
BEGIN
    -- Get current plan
    SELECT plan_id INTO v_current_plan_id FROM tenants WHERE id = p_tenant_id;
    
    -- Get new plan
    SELECT id, price_monthly INTO v_new_plan_id, v_new_price 
    FROM subscription_plans 
    WHERE code = p_new_plan_code AND is_active = true;
    
    IF v_new_plan_id IS NULL THEN
        RAISE EXCEPTION 'Plano não encontrado: %', p_new_plan_code;
    END IF;
    
    -- Get current plan price
    SELECT price_monthly INTO v_current_price 
    FROM subscription_plans 
    WHERE id = v_current_plan_id;
    
    -- Calculate price difference
    v_price_difference := COALESCE(v_new_price, 0) - COALESCE(v_current_price, 0);
    
    -- Update tenant plan
    UPDATE tenants 
    SET plan_id = v_new_plan_id,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_tenant_id;
    
    -- Record plan change history
    INSERT INTO tenant_plan_history (
        tenant_id, from_plan_id, to_plan_id, change_reason,
        price_difference_brl, effective_date, changed_by
    ) VALUES (
        p_tenant_id, v_current_plan_id, v_new_plan_id, p_reason,
        v_price_difference, CURRENT_TIMESTAMP, p_changed_by
    );
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;
COMMIT;

--ROLLBACK;
-- DROP FUNCTION IF EXISTS change_tenant_plan(p_tenant_id UUID, p_new_plan_code VARCHAR(50), p_reason VARCHAR(100), p_changed_by UUID DEFAULT NULL);
-- COMMIT;