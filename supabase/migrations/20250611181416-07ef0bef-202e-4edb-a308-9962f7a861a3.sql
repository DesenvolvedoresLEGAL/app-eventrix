
-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own access logs" ON public.access_logs;
DROP POLICY IF EXISTS "System can insert access logs" ON public.access_logs;

-- Enable RLS on tables (will not fail if already enabled)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create policies for access_logs table
CREATE POLICY "Users can view own access logs" ON public.access_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert access logs" ON public.access_logs
  FOR INSERT WITH CHECK (true);

-- Update the existing handle_new_user function to be more robust
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data ->> 'name',
      NEW.raw_user_meta_data ->> 'full_name',
      NEW.raw_user_meta_data ->> 'firstName' || ' ' || NEW.raw_user_meta_data ->> 'lastName',
      split_part(NEW.email, '@', 1)
    ),
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$;

-- Ensure the trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to log authentication events
CREATE OR REPLACE FUNCTION public.log_auth_event(
  p_user_id UUID,
  p_action TEXT,
  p_ip TEXT DEFAULT NULL,
  p_device TEXT DEFAULT NULL,
  p_event_id UUID DEFAULT NULL
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.access_logs (user_id, action, ip, device, event_id, timestamp)
  VALUES (p_user_id, p_action, p_ip, p_device, p_event_id, NOW());
END;
$$;

-- Create function to get user role in context of an event
CREATE OR REPLACE FUNCTION public.get_user_role_for_event(
  p_user_id UUID,
  p_event_id UUID DEFAULT NULL
) RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_role TEXT;
BEGIN
  -- Check if user is staff for the event
  SELECT r.name INTO user_role
  FROM public.staff s
  JOIN public.staff_roles sr ON s.id = sr.staff_id
  JOIN public.roles r ON sr.role_id = r.id
  WHERE s.user_id = p_user_id 
    AND (p_event_id IS NULL OR s.event_id = p_event_id)
  LIMIT 1;
  
  -- If not staff, check if user is a visitor
  IF user_role IS NULL THEN
    SELECT 'visitor' INTO user_role
    FROM public.visitors v
    WHERE v.user_id = p_user_id
      AND (p_event_id IS NULL OR v.event_id = p_event_id)
    LIMIT 1;
  END IF;
  
  -- Default role
  RETURN COALESCE(user_role, 'user');
END;
$$;
