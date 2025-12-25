import { createClient } from '@supabase/supabase-js';

// Retrieve environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    // If running during build time or without keys, we might want to warn or error
    // For now, we'll log a warning. The db.ts should handle the fallback or error.
    console.warn("Supabase credentials missing in environment variables.");
}

// Create a single supabase client for interacting with your database
// Provide placeholder values if missing to prevent build-time errors
export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseKey || 'placeholder-key'
);
