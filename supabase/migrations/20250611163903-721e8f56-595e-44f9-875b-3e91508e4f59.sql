
-- Migration 0002: Add logging triggers and indexes for new tables
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

-- Indexes on foreign keys for new tables
CREATE INDEX idx_document_validations_user_id ON document_validations(user_id);
CREATE INDEX idx_heatmap_data_visitor_id ON heatmap_data(visitor_id);
CREATE INDEX idx_legal_documents_user_id ON legal_documents(user_id);

-- Seed data for roles and initial setup
INSERT INTO roles (id, name, description, color)
VALUES
    (gen_random_uuid(), 'organizer', 'Event organizer', '#007bff'),
    (gen_random_uuid(), 'staff', 'Event staff member', '#28a745'),
    (gen_random_uuid(), 'visitor', 'Event visitor', '#6c757d');

-- Insert example modules
INSERT INTO modules (name) VALUES
    ('events'),
    ('marketing'),
    ('integrations');
    
-- Example subscription plans
INSERT INTO plans (id, name, billing_cycle, price, features, popular)
VALUES
  (gen_random_uuid(), 'Starter', 'monthly', 0, ARRAY['basic features'], false),
  (gen_random_uuid(), 'Pro', 'monthly', 49.99, ARRAY['all features'], true);

-- Sample integrations
INSERT INTO integrations (id, name, description, category)
VALUES
  (gen_random_uuid(), 'Zapier', 'Automation platform', 'automation'),
  (gen_random_uuid(), 'Stripe', 'Payments integration', 'payments');

-- Insert permissions with module mapping
INSERT INTO permissions (id, name, description, module_id)
SELECT gen_random_uuid(), perm, initcap(perm) || ' permission', m.id
FROM (VALUES
    ('create_event', 'events'),
    ('edit_event', 'events'),
    ('view_marketing', 'marketing'),
    ('manage_api', 'integrations')
) AS p(perm, module)
JOIN modules m ON m.name = p.module;

-- Link organizer role to all permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'organizer';

-- Basic status codes
INSERT INTO status_codes (context, code, label) VALUES
  ('generic', 'active', 'Active'),
  ('generic', 'inactive', 'Inactive');

-- Enable RLS on all tables
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE lectures ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE exhibitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE landing_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE dynamic_pricing_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_validations ENABLE ROW LEVEL SECURITY;
ALTER TABLE heatmap_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_documents ENABLE ROW LEVEL SECURITY;

-- Create profiles table for user data
CREATE TABLE public.profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email text,
    name text,
    avatar_url text,
    phone text,
    company text,
    position text,
    bio text,
    preferences jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Trigger to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data ->> 'name', NEW.raw_user_meta_data ->> 'full_name', split_part(NEW.email, '@', 1))
    );
    RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Basic RLS policies for key tables
CREATE POLICY "staff_select_event" ON events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM staff
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = events.id
    )
  );

CREATE POLICY "organizer_manage_lectures" ON lectures
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM staff
      JOIN roles ON roles.id = staff.role_id
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = lectures.event_id
        AND roles.name = 'organizer'
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM staff
      JOIN roles ON roles.id = staff.role_id
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = lectures.event_id
        AND roles.name = 'organizer'
    )
  );

CREATE POLICY "visitor_select_self" ON visitors
  FOR SELECT USING (
    visitors.user_id = auth.uid()
  );

-- Add triggers for profiles
CREATE TRIGGER trg_profiles_updated 
    BEFORE UPDATE ON public.profiles 
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_profiles_log 
    AFTER INSERT OR UPDATE OR DELETE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION log_entity_change();
