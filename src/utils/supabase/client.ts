import { createClient } from '@supabase/supabase-js';
import { Database } from './types'; // Adjust the import path as necessary

// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default supabase;