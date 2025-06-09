-- Row level security policies for Eventrix

-- Enable RLS on key tables
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE lectures ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkins ENABLE ROW LEVEL SECURITY;

-- Policy: staff can view events they belong to
CREATE POLICY "staff_select_event" ON events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM staff
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = events.id
    )
  );

-- Policy: staff can manage data for their event
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

-- Policy: visitors can view only their record
CREATE POLICY "visitor_select_self" ON visitors
  FOR SELECT USING (
    visitors.user_id = auth.uid()
  );

-- Policy: organizer can view all checkins, visitors only their own
CREATE POLICY "read_checkins" ON checkins
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM staff
      JOIN roles ON roles.id = staff.role_id
      WHERE staff.user_id = auth.uid()
        AND roles.name = 'organizer'
    )
    OR EXISTS (
      SELECT 1 FROM visitors
      WHERE visitors.user_id = auth.uid()
        AND visitors.id = checkins.visitor_id
    )
  );
