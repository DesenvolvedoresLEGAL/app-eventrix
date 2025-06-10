-- Seed data for Eventrix database

-- Insert default roles
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
