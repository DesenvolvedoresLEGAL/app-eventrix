
-- Create ENUMs for the EVENTRIX database
CREATE TYPE font_style_enum AS ENUM ('arial', 'roboto', 'montserrat', 'open_sans', 'lato', 'nunito');
CREATE TYPE event_status_enum AS ENUM ('upcoming', 'in_progress', 'completed');
CREATE TYPE event_category_enum AS ENUM ('fair', 'congress', 'symposium', 'festival', 'other');

-- Create the main events table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL, -- FK to future tenants table
    name TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    start_time TIME,
    end_time TIME,
    official_website TEXT,
    full_address TEXT,
    city TEXT,
    state TEXT,
    country TEXT,
    venue_name TEXT,
    total_area NUMERIC CHECK (total_area > 0),
    estimated_capacity INTEGER CHECK (estimated_capacity > 0),
    has_accessibility BOOLEAN DEFAULT FALSE,
    logo_url TEXT,
    banner_url TEXT,
    primary_color VARCHAR(7) CHECK (primary_color ~ '^#[0-9A-Fa-f]{6}$'),
    secondary_color VARCHAR(7) CHECK (secondary_color ~ '^#[0-9A-Fa-f]{6}$'),
    font_style font_style_enum,
    location TEXT,
    status event_status_enum DEFAULT 'upcoming',
    exhibitors_count INTEGER DEFAULT 0 CHECK (exhibitors_count >= 0),
    short_description TEXT,
    category event_category_enum,
    is_public_registration BOOLEAN DEFAULT TRUE,
    has_online_broadcast BOOLEAN DEFAULT FALSE,
    broadcast_platform TEXT,
    notes TEXT,
    accepted_privacy_policy BOOLEAN DEFAULT FALSE,
    accepted_lgpd BOOLEAN NOT NULL DEFAULT FALSE,
    accepted_eventrix_terms BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraint to ensure end_date is not before start_date
    CONSTRAINT valid_date_range CHECK (end_date IS NULL OR start_date IS NULL OR end_date >= start_date),
    
    -- Constraint to ensure broadcast_platform is provided when has_online_broadcast is true
    CONSTRAINT broadcast_platform_required CHECK (
        (has_online_broadcast = FALSE) OR 
        (has_online_broadcast = TRUE AND broadcast_platform IS NOT NULL AND broadcast_platform != '')
    )
);

-- Create event_organizers table
CREATE TABLE event_organizers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    main_email TEXT NOT NULL,
    phone_whatsapp TEXT,
    company TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create event_team table
CREATE TABLE event_team (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_events_updated_at 
    BEFORE UPDATE ON events 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_event_organizers_updated_at 
    BEFORE UPDATE ON event_organizers 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_event_team_updated_at 
    BEFORE UPDATE ON event_team 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_events_tenant_id ON events(tenant_id);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_events_start_date ON events(start_date);
CREATE INDEX idx_events_end_date ON events(end_date);
CREATE INDEX idx_events_city_state ON events(city, state);
CREATE INDEX idx_event_organizers_event_id ON event_organizers(event_id);
CREATE INDEX idx_event_organizers_email ON event_organizers(main_email);
CREATE INDEX idx_event_team_event_id ON event_team(event_id);
CREATE INDEX idx_event_team_email ON event_team(email);

-- Create composite index for date range queries
CREATE INDEX idx_events_date_range ON events(start_date, end_date);
