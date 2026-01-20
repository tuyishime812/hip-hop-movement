import { createClient } from '@supabase/supabase-js';

let supabaseInstance: any = null;

export const getSupabaseClient = () => {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Only initialize if environment variables are available
    if (supabaseUrl && supabaseKey) {
      supabaseInstance = createClient(supabaseUrl, supabaseKey);
    } else {
      // Return a mock client or handle gracefully
      console.warn('Supabase environment variables not available');
      return null;
    }
  }

  return supabaseInstance;
};