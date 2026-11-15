import { supabase } from './supabase.js';
import { ARCHETYPES, TYPE_ORDER } from '../data.js';

const TABLE = 'concept_categories'; // one column per category, one concept per cell
let cache = null;

// { night: ['Alcoholic beverages', 'Carnival', ...], performing: [...], ... }
// Concepts come from the table column named by ARCHETYPES[type].category.
export function loadTypeConcepts() {
  if (cache) return cache;
  cache = (async () => {
    if (!supabase) return {};
    const { data, error } = await supabase.from(TABLE).select('*');
    if (error) { console.error('Could not load concept categories', error); cache = null; return {}; }
    const out = {};
    TYPE_ORDER.forEach((t) => {
      const col = ARCHETYPES[t].category;
      out[t] = [...new Set(data.map((row) => String(row[col] ?? '').trim()).filter(Boolean))];
    });
    return out;
  })();
  return cache;
}
