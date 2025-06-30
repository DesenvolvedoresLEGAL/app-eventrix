-- 1. Enum para tipo de plano
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'plan_type_enum') THEN
    CREATE TYPE plan_type_enum AS ENUM ('anual', 'mensal');
  END IF;
END$$;

-- 2. Tabela de planos
CREATE TABLE IF NOT EXISTS plans (
  uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price NUMERIC(10,2),
  price_per_month NUMERIC(10,2),
  type plan_type_enum NOT NULL DEFAULT 'anual',
  is_custom BOOLEAN NOT NULL DEFAULT FALSE,
  features JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Exemplo de insert dos planos da imagem (anuais e mensais)
INSERT INTO plans (
  name, price, price_per_month, type, is_custom, features
) VALUES
  -- Planos ANUAIS
  ('Start', 19900.00, 1658.33, 'anual', FALSE, '{"events_max":5,"admins_max":1,"visitors_max":5000,"exhibitors_max":200,"support":"E-mail básico"}'),
  ('Scale', 39900.00, 3325.00, 'anual', FALSE, '{"events_max":10,"admins_max":3,"visitors_max":25000,"exhibitors_max":500,"support":"E-mail + chat prior."}'),
  ('Boom', 79900.00, 6658.33, 'anual', FALSE, '{"events_max":15,"admins_max":10,"visitors_max":50000,"exhibitors_max":2000,"support":"24/7 com SLA"}'),
  ('Enterprise', NULL, NULL, 'anual', TRUE, '{"events_max":null,"admins_max":null,"visitors_max":null,"exhibitors_max":"custom","support":"Dedicado + SLA VIP"}'),

  -- Planos MENSAIS
  ('Start', 1990.00, NULL, 'mensal', FALSE, '{
    "events_max": 5,
    "admins_max": 1,
    "visitors_max": 5000,
    "exhibitors_max": 200,
    "support": "E-mail básico",
    "features": [
      "Dashboard completo",
      "Gestão de visitantes",
      "Check-in básico",
      "Relatórios essenciais"
    ]
  }'),
  ('Scale', 3990.00, NULL, 'mensal', FALSE, '{
    "events_max": 10,
    "admins_max": 3,
    "visitors_max": 25000,
    "exhibitors_max": 500,
    "support": "E-mail + chat prior.",
    "features": [
      "Tudo do Start +",
      "Analytics avançados",
      "Integrações básicas",
      "Suporte prioritário"
    ]
  }'),
  ('Boom', 7990.00, NULL, 'mensal', FALSE, '{
    "events_max": 15,
    "admins_max": 10,
    "visitors_max": 50000,
    "exhibitors_max": 2000,
    "support": "24/7 com SLA",
    "features": [
      "Tudo do Scale +",
      "IA avançada",
      "White label básico",
      "APIs completas"
    ]
  }'),
  ('Enterprise', NULL, NULL, 'mensal', TRUE, '{
    "events_max": null,
    "admins_max": null,
    "visitors_max": null,
    "exhibitors_max": "custom",
    "support": "Dedicado + SLA VIP",
    "features": [
      "Tudo customizado",
      "Gerente dedicado",
      "Onboarding completo",
      "SLA premium"
    ]
  }');

-- 4. Trigger para atualização automática do updated_at
CREATE TRIGGER update_plans_updated_at
BEFORE UPDATE ON plans
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
