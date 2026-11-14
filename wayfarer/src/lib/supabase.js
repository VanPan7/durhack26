import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Null until you add your keys to .env, so the site still runs without them.
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

// Example (not used yet): load destinations from a table called "destinations".
// import { supabase } from './lib/supabase.js';
// const { data, error } = await supabase.from('destinations').select('*');
