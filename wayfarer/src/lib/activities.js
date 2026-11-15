import { supabase } from './supabase.js';
import { TYPE_ORDER } from '../data.js';
import { loadTypeConcepts } from './concepts.js';

const PAGE = 1000;
let liteCache = null;

// Every activity, with just the columns needed for scoring (paged past the 1000-row limit).
function loadLiteActivities() {
  if (liteCache) return liteCache;
  liteCache = (async () => {
    if (!supabase) return [];
    const rows = [];
    for (let from = 0; ; from += PAGE) {
      const { data, error } = await supabase
        .from('unesco_activities')
        .select('id,countries,primary_concepts')
        .range(from, from + PAGE - 1);
      if (error) { console.error('Could not load activities', error); liteCache = null; return []; }
      rows.push(...data);
      if (data.length < PAGE) break;
    }
    return rows;
  })();
  return liteCache;
}

// Per type, per country: how many activities in that country use one of the type's concepts,
// scaled so the type's best country is 1.  Shape: { night: { JP: 1, BR: 0.6, ... }, ... }
let affinityCache = null;
export function loadAffinity() {
  if (affinityCache) return affinityCache;
  affinityCache = (async () => {
    const [rows, concepts] = await Promise.all([loadLiteActivities(), loadTypeConcepts()]);
    const out = {};
    TYPE_ORDER.forEach((t) => {
      const wanted = new Set(concepts[t] || []);
      const counts = {};
      rows.forEach((a) => {
        if (!(a.primary_concepts || []).some((c) => wanted.has(c))) return;
        (a.countries || []).forEach((cc) => { counts[cc] = (counts[cc] || 0) + 1; });
      });
      const max = Math.max(0, ...Object.values(counts));
      out[t] = Object.fromEntries(Object.entries(counts).map(([cc, n]) => [cc, n / max]));
    });
    return out;
  })();
  return affinityCache;
}

// Best countries for one type: [{ code, score }] strongest first.
export async function countriesFor(type, n = 3) {
  const affinity = await loadAffinity();
  return Object.entries(affinity[type] || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([code, score]) => ({ code, score }));
}

// Full activity records for the given countries, best matches for the weighted types first.
// weights: { night: 0.5, food: 0.5 }. At most perCountry activities per country.
export async function activitiesIn(countryCodes, weights, perCountry = 3) {
  if (!supabase || !countryCodes.length) return {};
  const concepts = await loadTypeConcepts();
  const { data, error } = await supabase
    .from('unesco_activities')
    .select('id,title,description,countries,url,image,image_copyright,primary_concepts')
    .overlaps('countries', countryCodes)
    .limit(1000);
  if (error) { console.error('Could not load activities', error); return {}; }

  const score = (a) => {
    const have = new Set(a.primary_concepts || []);
    return TYPE_ORDER.reduce((sum, t) => {
      const hits = (concepts[t] || []).filter((c) => have.has(c)).length;
      return sum + (weights[t] || 0) * hits;
    }, 0) + Math.random() * 0.2; // jitter varies ties between visits
  };
  const out = {};
  countryCodes.forEach((cc) => {
    out[cc] = data
      .filter((a) => (a.countries || []).includes(cc))
      .map((a) => ({ a, s: score(a) }))
      .filter((x) => x.s >= 0.2)
      .sort((x, y) => y.s - x.s)
      .slice(0, perCountry)
      .map((x) => x.a);
  });
  return out;
}
