import { createClient } from '@supabase/supabase-js';


// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient("https://lipyxehuejkhsuyzasqb.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpcHl4ZWh1ZWpraHN1eXphc3FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1ODIzMjgsImV4cCI6MjA2NTE1ODMyOH0.tjN__ZDkWRhYb3BKl0CxEIDQh3QrOcbpAnPFoiBUymc", {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});