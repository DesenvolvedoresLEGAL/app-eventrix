-- Migration: 20250815093221_populate_permissions_in_user_roles.sql
-- Description: Populates the permissions column in the user_roles table with the permissions from the frontend.
-- Author: Jules
-- Date: 2025-08-15

BEGIN;

-- Owner: All permissions
UPDATE public.user_roles
SET permissions = (
  SELECT jsonb_agg(p.key)
  FROM (
    SELECT 'dashboard.view' as key UNION ALL
    SELECT 'events.view' UNION ALL
    SELECT 'events.create' UNION ALL
    SELECT 'events.edit' UNION ALL
    SELECT 'events.delete' UNION ALL
    SELECT 'exhibitors.view' UNION ALL
    SELECT 'exhibitors.manage' UNION ALL
    SELECT 'suppliers.view' UNION ALL
    SELECT 'suppliers.manage' UNION ALL
    SELECT 'staff.view' UNION ALL
    SELECT 'staff.manage' UNION ALL
    SELECT 'visitors.view' UNION ALL
    SELECT 'visitors.manage' UNION ALL
    SELECT 'permissions.view' UNION ALL
    SELECT 'permissions.manage' UNION ALL
    SELECT 'activities.view' UNION ALL
    SELECT 'activities.manage' UNION ALL
    SELECT 'lectures.view' UNION ALL
    SELECT 'lectures.manage' UNION ALL
    SELECT 'venues.view' UNION ALL
    SELECT 'venues.manage' UNION ALL
    SELECT 'tracks.view' UNION ALL
    SELECT 'tracks.manage' UNION ALL
    SELECT 'checklist.view' UNION ALL
    SELECT 'checklist.manage' UNION ALL
    SELECT 'team-tasks.view' UNION ALL
    SELECT 'team-tasks.manage' UNION ALL
    SELECT 'supplier-tasks.view' UNION ALL
    SELECT 'supplier-tasks.manage' UNION ALL
    SELECT 'checkin.view' UNION ALL
    SELECT 'checkin.manage' UNION ALL
    SELECT 'registration.view' UNION ALL
    SELECT 'registration.manage' UNION ALL
    SELECT 'access-history.view' UNION ALL
    SELECT 'marketing.ads.view' UNION ALL
    SELECT 'marketing.ads.manage' UNION ALL
    SELECT 'marketing.content.view' UNION ALL
    SELECT 'marketing.content.manage' UNION ALL
    SELECT 'marketing.email.view' UNION ALL
    SELECT 'marketing.email.manage' UNION ALL
    SELECT 'marketing.pages.view' UNION ALL
    SELECT 'marketing.pages.manage' UNION ALL
    SELECT 'communication.humangpt.view' UNION ALL
    SELECT 'communication.notifications.view' UNION ALL
    SELECT 'communication.notifications.manage' UNION ALL
    SELECT 'analytics.view' UNION ALL
    SELECT 'analytics.engagement.view' UNION ALL
    SELECT 'reports.view' UNION ALL
    SELECT 'api-management.view' UNION ALL
    SELECT 'api-management.manage' UNION ALL
    SELECT 'integrations.view' UNION ALL
    SELECT 'integrations.manage' UNION ALL
    SELECT 'ai-validator.view' UNION ALL
    SELECT 'heatmap.view' UNION ALL
    SELECT 'dynamic-pricing.view' UNION ALL
    SELECT 'legal-ai.view' UNION ALL
    SELECT 'settings.organizer.view' UNION ALL
    SELECT 'settings.organizer.manage' UNION ALL
    SELECT 'settings.branding.view' UNION ALL
    SELECT 'settings.branding.manage' UNION ALL
    SELECT 'settings.privacy.view' UNION ALL
    SELECT 'settings.privacy.manage' UNION ALL
    SELECT 'settings.permissions.view' UNION ALL
    SELECT 'settings.permissions.manage' UNION ALL
    SELECT 'help.chat.view' UNION ALL
    SELECT 'help.faq.view' UNION ALL
    SELECT 'help.tutorial.view'
  ) AS p
)
WHERE code = 'owner';

-- Developer
UPDATE public.user_roles
SET permissions = '["api-management.view", "api-management.manage", "integrations.view", "integrations.manage", "ai-validator.view", "dynamic-pricing.view", "heatmap.view", "legal-ai.view", "analytics.view", "analytics.engagement.view", "reports.view", "access-history.view", "settings.permissions.view", "settings.permissions.manage", "settings.organizer.view", "settings.organizer.manage", "settings.branding.view", "settings.branding.manage", "settings.privacy.view", "settings.privacy.manage"]'::jsonb
WHERE code = 'developer';

-- Event Manager
UPDATE public.user_roles
SET permissions = '["dashboard.view", "events.view", "events.create", "events.edit", "events.delete", "exhibitors.view", "exhibitors.manage", "suppliers.view", "suppliers.manage", "staff.view", "staff.manage", "visitors.view", "visitors.manage", "activities.view", "activities.manage", "lectures.view", "lectures.manage", "venues.view", "venues.manage", "tracks.view", "tracks.manage", "checklist.view", "checklist.manage", "team-tasks.view", "team-tasks.manage", "checkin.view", "checkin.manage", "registration.view", "registration.manage"]'::jsonb
WHERE code = 'event_manager';

-- Finance
UPDATE public.user_roles
SET permissions = '["analytics.view", "analytics.engagement.view", "reports.view", "dynamic-pricing.view"]'::jsonb
WHERE code = 'finance';

-- Coordinator
UPDATE public.user_roles
SET permissions = '["dashboard.view", "events.view", "exhibitors.view", "staff.view", "visitors.view", "activities.view", "lectures.view", "venues.view", "tracks.view", "checklist.view", "checklist.manage", "team-tasks.view", "team-tasks.manage", "checkin.view", "checkin.manage", "registration.view", "registration.manage"]'::jsonb
WHERE code = 'coordinator';

-- Content Editor
UPDATE public.user_roles
SET permissions = '["marketing.content.view", "marketing.content.manage", "marketing.pages.view", "marketing.pages.manage", "marketing.email.view", "marketing.email.manage"]'::jsonb
WHERE code = 'content_editor';

-- Support
UPDATE public.user_roles
SET permissions = '["help.chat.view", "help.faq.view", "help.tutorial.view"]'::jsonb
WHERE code = 'support';

-- Viewer
UPDATE public.user_roles
SET permissions = '["dashboard.view", "events.view", "exhibitors.view", "suppliers.view", "staff.view", "visitors.view", "activities.view", "lectures.view", "venues.view", "tracks.view", "checklist.view", "team-tasks.view", "checkin.view", "registration.view", "analytics.view", "analytics.engagement.view", "reports.view", "help.chat.view", "help.faq.view", "help.tutorial.view"]'::jsonb
WHERE code = 'viewer';

-- Admin
UPDATE public.user_roles
SET permissions = '["dashboard.view", "events.view", "permissions.view", "permissions.manage", "staff.view", "staff.manage", "access-history.view", "settings.organizer.view", "settings.organizer.manage", "settings.permissions.view", "settings.permissions.manage"]'::jsonb
WHERE code = 'admin';

-- Member
UPDATE public.user_roles
SET permissions = '["dashboard.view", "events.view", "help.chat.view", "help.faq.view", "help.tutorial.view"]'::jsonb
WHERE code = 'member';

COMMIT;

-- ROLLBACK
-- BEGIN;
-- UPDATE public.user_roles
-- SET permissions = '{}'::jsonb;
-- COMMIT;
