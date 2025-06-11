
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
    CASE 
      WHEN NEW.raw_user_meta_data IS NOT NULL AND jsonb_typeof(NEW.raw_user_meta_data) = 'object' THEN
        COALESCE(
          NEW.raw_user_meta_data ->> 'name',
          NEW.raw_user_meta_data ->> 'full_name',
          CASE 
            WHEN NEW.raw_user_meta_data ->> 'firstName' IS NOT NULL AND NEW.raw_user_meta_data ->> 'lastName' IS NOT NULL 
            THEN NEW.raw_user_meta_data ->> 'firstName' || ' ' || NEW.raw_user_meta_data ->> 'lastName'
            ELSE NULL
          END,
          split_part(NEW.email, '@', 1)
        )
      ELSE 
        split_part(NEW.email, '@', 1)
    END,
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$;
