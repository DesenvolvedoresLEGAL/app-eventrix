
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lipyxehuejkhsuyzasqb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpcHl4ZWh1ZWpraHN1eXphc3FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1ODIzMjgsImV4cCI6MjA2NTE1ODMyOH0.tjN__ZDkWRhYb3BKl0CxEIDQh3QrOcbpAnPFoiBUymc";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
  }
});
