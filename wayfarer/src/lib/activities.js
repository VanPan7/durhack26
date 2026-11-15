import { supabase } from './supabase.js';
import { loadCategoryConcepts } from './concepts.js';

// categories: [{ name, weight }] strongest first.
// Returns UNESCO activities whose primary_concepts fall in those categories,
// best matches first. [] if Supabase is not configured or a query fails.
export async function activitiesFor(categories, limit = 6) {
  if (!supabase || !categories.length) return [];
  const byCategory = await loadCategoryConcepts();
  const wanted = [...new Set(categories.flatMap((c) => byCategory[c.name] || []))];
  if (!wanted.length) return [];

  const { data, error } = await supabase
    .from('unesco_activities')
    .select('id,title,description,countries,url,image,image_copyright,primary_concepts')
    .overlaps('primary_concepts', wanted)
    .limit(300);
  if (error) {
    console.error('Could not load activities', error);
    return [];
  }

  // Score: each category the activity belongs to counts its weight, plus a small
  // bonus per matching concept. Jitter varies ties between visits.
  const score = (a) => {
    const have = new Set(a.primary_concepts || []);
    let s = 0;
    categories.forEach(({ name, weight }) => {
      const hits = (byCategory[name] || []).filter((c) => have.has(c)).length;
      if (hits) s += weight + hits * 0.1;
    });
    return s;
  };
  return data
    .map((a) => ({ a, s: score(a) + Math.random() * 0.3 }))
    .sort((x, y) => y.s - x.s)
    .slice(0, limit)
    .map((x) => x.a);
}
