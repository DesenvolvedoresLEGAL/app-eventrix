
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lipyxehuejkhsuyzasqb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpcHl4ZWh1ZWpraHN1eXphc3FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1ODIzMjgsImV4cCI6MjA2NTE1ODMyOH0.tjN__ZDkWRhYb3BKl0CxEIDQh3QrOcbpAnPFoiBUymc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})
