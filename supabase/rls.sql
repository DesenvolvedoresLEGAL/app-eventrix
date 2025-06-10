-- Row level security policies for Eventrix

-- Enable RLS on key tables
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

-- Policy: staff can access venue data of their event
CREATE POLICY "staff_select_venues" ON venues
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM staff
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = venues.event_id
    )
  );

CREATE POLICY "organizer_manage_venues" ON venues
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM staff
      JOIN roles ON roles.id = staff.role_id
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = venues.event_id
        AND roles.name = 'organizer'
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM staff
      JOIN roles ON roles.id = staff.role_id
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = venues.event_id
        AND roles.name = 'organizer'
    )
  );

-- Policy: staff can access tracks of their event
CREATE POLICY "staff_select_tracks" ON tracks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM staff
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = tracks.event_id
    )
  );

CREATE POLICY "organizer_manage_tracks" ON tracks
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM staff
      JOIN roles ON roles.id = staff.role_id
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = tracks.event_id
        AND roles.name = 'organizer'
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM staff
      JOIN roles ON roles.id = staff.role_id
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = tracks.event_id
        AND roles.name = 'organizer'
    )
  );

-- Policy: staff can access activities of their event
CREATE POLICY "staff_select_activities" ON activities
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM staff
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = activities.event_id
    )
  );

CREATE POLICY "organizer_manage_activities" ON activities
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM staff
      JOIN roles ON roles.id = staff.role_id
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = activities.event_id
        AND roles.name = 'organizer'
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM staff
      JOIN roles ON roles.id = staff.role_id
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = activities.event_id
        AND roles.name = 'organizer'
    )
  );

-- Policy: staff can access exhibitors of their event
CREATE POLICY "staff_select_exhibitors" ON exhibitors
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM staff
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = exhibitors.event_id
    )
  );

CREATE POLICY "organizer_manage_exhibitors" ON exhibitors
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM staff
      JOIN roles ON roles.id = staff.role_id
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = exhibitors.event_id
        AND roles.name = 'organizer'
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM staff
      JOIN roles ON roles.id = staff.role_id
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = exhibitors.event_id
        AND roles.name = 'organizer'
    )
  );

-- Policy: staff can access suppliers of their event
CREATE POLICY "staff_select_suppliers" ON suppliers
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM staff
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = suppliers.event_id
    )
  );

CREATE POLICY "organizer_manage_suppliers" ON suppliers
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM staff
      JOIN roles ON roles.id = staff.role_id
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = suppliers.event_id
        AND roles.name = 'organizer'
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM staff
      JOIN roles ON roles.id = staff.role_id
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = suppliers.event_id
        AND roles.name = 'organizer'
    )
  );

-- Policy: staff can access checklists of their event
CREATE POLICY "staff_select_checklists" ON checklists
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM staff
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = checklists.event_id
    )
  );

CREATE POLICY "organizer_manage_checklists" ON checklists
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM staff
      JOIN roles ON roles.id = staff.role_id
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = checklists.event_id
        AND roles.name = 'organizer'
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM staff
      JOIN roles ON roles.id = staff.role_id
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = checklists.event_id
        AND roles.name = 'organizer'
    )
  );

-- Policy: staff can access tasks of their event via checklist
CREATE POLICY "staff_select_tasks" ON tasks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM staff
      JOIN checklists ON checklists.id = tasks.checklist_id
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = checklists.event_id
    )
  );

CREATE POLICY "organizer_manage_tasks" ON tasks
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM staff
      JOIN roles ON roles.id = staff.role_id
      JOIN checklists ON checklists.id = tasks.checklist_id
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = checklists.event_id
        AND roles.name = 'organizer'
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM staff
      JOIN roles ON roles.id = staff.role_id
      JOIN checklists ON checklists.id = tasks.checklist_id
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = checklists.event_id
        AND roles.name = 'organizer'
    )
  );

-- Policy: staff can access landing pages of their event
CREATE POLICY "staff_select_landing_pages" ON landing_pages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM staff
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = landing_pages.event_id
    )
  );

CREATE POLICY "organizer_manage_landing_pages" ON landing_pages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM staff
      JOIN roles ON roles.id = staff.role_id
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = landing_pages.event_id
        AND roles.name = 'organizer'
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM staff
      JOIN roles ON roles.id = staff.role_id
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = landing_pages.event_id
        AND roles.name = 'organizer'
    )
  );

-- Policy: staff can access email campaigns of their event
CREATE POLICY "staff_select_email_campaigns" ON email_campaigns
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM staff
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = email_campaigns.event_id
    )
  );

CREATE POLICY "organizer_manage_email_campaigns" ON email_campaigns
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM staff
      JOIN roles ON roles.id = staff.role_id
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = email_campaigns.event_id
        AND roles.name = 'organizer'
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM staff
      JOIN roles ON roles.id = staff.role_id
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = email_campaigns.event_id
        AND roles.name = 'organizer'
    )
  );

-- Policy: staff can access dynamic pricing rules of their event
CREATE POLICY "staff_select_dynamic_pricing" ON dynamic_pricing_rules
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM staff
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = dynamic_pricing_rules.event_id
    )
  );

CREATE POLICY "organizer_manage_dynamic_pricing" ON dynamic_pricing_rules
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM staff
      JOIN roles ON roles.id = staff.role_id
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = dynamic_pricing_rules.event_id
        AND roles.name = 'organizer'
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM staff
      JOIN roles ON roles.id = staff.role_id
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = dynamic_pricing_rules.event_id
        AND roles.name = 'organizer'
    )
  );

-- Policy: staff can access AI interactions of their event
CREATE POLICY "staff_select_ai_interactions" ON ai_interactions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM staff
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = ai_interactions.event_id
    )
  );

CREATE POLICY "organizer_manage_ai_interactions" ON ai_interactions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM staff
      JOIN roles ON roles.id = staff.role_id
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = ai_interactions.event_id
        AND roles.name = 'organizer'
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM staff
      JOIN roles ON roles.id = staff.role_id
      WHERE staff.user_id = auth.uid()
        AND staff.event_id = ai_interactions.event_id
        AND roles.name = 'organizer'
    )
  );
