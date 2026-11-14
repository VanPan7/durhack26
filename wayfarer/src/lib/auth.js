import { supabase } from './supabase.js';

const NOT_CONFIGURED = { message: 'Sign-in is not configured. Add your Supabase keys to .env.' };

export async function signUpNewUser(email, password) {
  if (!supabase) return { data: null, error: NOT_CONFIGURED };
  return supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${window.location.origin}/auth.html` }
  });
}

export async function signInUser(email, password) {
  if (!supabase) return { data: null, error: NOT_CONFIGURED };
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOutUser() {
  if (!supabase) return { error: null };
  return supabase.auth.signOut();
}

export async function getUser() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session?.user ?? null;
}

export function onAuthChange(callback) {
  if (!supabase) return;
  supabase.auth.onAuthStateChange((_event, session) => callback(session?.user ?? null));
}
