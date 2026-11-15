import { supabase } from './supabase.js';
import { ARCHETYPE_CONCEPTS } from '../data.js';

// Returns UNESCO activities whose primary_concepts overlap the type's concepts,
// best matches first. Returns [] if Supabase is not configured or the query fails.
export async function activitiesFor(type, limit = 6) {
  const wanted = ARCHETYPE_CONCEPTS[type];
  if (!supabase || !wanted) return [];

  const { data, error } = await supabase
    .from('unesco_activities')
    .select('id,title,description,countries,url,image,image_copyright,primary_concepts')
    .overlaps('primary_concepts', wanted)
    .limit(200);
  if (error) {
    console.error('Could not load activities', error);
    return [];
  }

  // Rank by number of matching concepts; a little jitter varies ties between visits.
  const score = (a) => (a.primary_concepts || []).filter((c) => wanted.includes(c)).length;
  return data
    .map((a) => ({ a, s: score(a) + Math.random() * 0.5 }))
    .sort((x, y) => y.s - x.s)
    .slice(0, limit)
    .map((x) => x.a);
}
