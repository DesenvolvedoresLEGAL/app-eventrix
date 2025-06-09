-- Row level security policies for Eventrix

-- Enable RLS on key tables
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE lectures ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;

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
CREATE POLICY "staff_manage_lectures" ON lectures
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM staff
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = lectures.event_id
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM staff
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = lectures.event_id
    )
  );

-- Policy: visitors can view only their record
CREATE POLICY "visitor_select_self" ON visitors
  FOR SELECT USING (
    visitors.user_id = auth.uid()
  );
