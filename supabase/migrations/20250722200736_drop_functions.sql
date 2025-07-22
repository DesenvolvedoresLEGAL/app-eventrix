DROP POLICY IF EXISTS "Enable all access for admin users" on event_organizers;
DROP POLICY IF EXISTS "Enable all access for admin users" on event_team;
DROP POLICY IF EXISTS "Enable all access for admin users" on profiles;
DROP POLICY IF EXISTS "Enable all access for admin users" on events;

DROP POLICY IF EXISTS "Enable create access for all authenticated users" on event_organizers;
DROP POLICY IF EXISTS "Enable create access for all authenticated users" on event_team;
DROP POLICY IF EXISTS "Enable create access for all authenticated users" on profiles;
DROP POLICY IF EXISTS "Enable create access for all authenticated users" on events;

DROP POLICY IF EXISTS "Enable read access for all authenticated users" on event_organizers;
DROP POLICY IF EXISTS "Enable read access for all authenticated users" on event_team;
DROP POLICY IF EXISTS "Enable read access for all authenticated users" on profiles;
DROP POLICY IF EXISTS "Enable read access for all authenticated users" on events;

DROP FUNCTION IF EXISTS is_admin CASCADE;
DROP FUNCTION IF EXISTS is_organizer CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;