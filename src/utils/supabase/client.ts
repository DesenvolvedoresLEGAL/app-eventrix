import { createClient } from '@supabase/supabase-js';
import { Database } from './types'; // Adjust the import path as necessary

// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(
    'http://127.0.0.1:54321',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
);

export default supabase;