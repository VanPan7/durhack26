import { supabase } from './supabase.js';

const NOT_CONFIGURED = { message: 'Groups need Supabase. Add your keys to .env.' };
export const CODE_RE = /^[A-Z0-9]{6}$/;
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no look-alikes (0/O, 1/I/L)

function makeCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join('');
}

export function normaliseCode(value) {
  const code = String(value ?? '').trim().toUpperCase();
  return CODE_RE.test(code) ? code : null;
}

export async function createGroup() {
  if (!supabase) return { code: null, error: NOT_CONFIGURED };
  for (let i = 0; i < 3; i += 1) {
    const code = makeCode();
    const { error } = await supabase.from('groups').insert({ code });
    if (!error) return { code, error: null };
    if (error.code !== '23505') return { code: null, error }; // retry only on a code clash
  }
  return { code: null, error: { message: 'Could not create a group. Try again.' } };
}

export async function groupExists(code) {
  if (!supabase) return false;
  const { data } = await supabase.from('groups').select('code').eq('code', code).maybeSingle();
  return Boolean(data);
}

export async function addMember(code, name, scores) {
  if (!supabase) return { error: NOT_CONFIGURED };
  return supabase.from('group_members').insert({ group_code: code, name, scores });
}

// Latest answer per name (case-insensitive), oldest first.
export async function listMembers(code) {
  if (!supabase) return { members: [], error: NOT_CONFIGURED };
  const { data, error } = await supabase
    .from('group_members')
    .select('id,name,scores,created_at')
    .eq('group_code', code)
    .order('created_at', { ascending: true });
  if (error) return { members: [], error };
  const latest = new Map();
  data.forEach((m) => latest.set(m.name.toLowerCase(), m));
  return { members: [...latest.values()], error: null };
}

// Remembered display name for this browser.
export const getName = () => { try { return localStorage.getItem('wayfarer.name') || ''; } catch { return ''; } };
export const setName = (n) => { try { localStorage.setItem('wayfarer.name', n); } catch { /* private mode */ } };
