
-- Remove the trigger that's causing the entity_logs error on profiles table
DROP TRIGGER IF EXISTS trg_profiles_log ON public.profiles;
