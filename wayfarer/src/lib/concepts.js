import { supabase } from './supabase.js';
import { CATEGORIES } from '../data.js';

const TABLE = 'concept_categories'; // columns are category names, cells are concepts
let cache = null;

// Returns { 'Night life': ['Carnival', ...], ... } for the categories we use.
export function loadCategoryConcepts() {
  if (cache) return cache;
  cache = (async () => {
    if (!supabase) return {};
    const { data, error } = await supabase.from(TABLE).select('*');
    if (error) { console.error('Could not load concept categories', error); cache = null; return {}; }
    const out = {};
    CATEGORIES.forEach((c) => {
      out[c] = [...new Set(data.map((row) => String(row[c] ?? '').trim()).filter(Boolean))];
    });
    return out;
  })();
  return cache;
}
