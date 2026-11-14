import { ARCHETYPES, TYPE_ORDER } from '../data.js';

// How well a destination of one type suits someone who leans toward another.
// 1 on the diagonal, a small share elsewhere so compromises are possible.
const CROSS_AFFINITY = 0.25;
const affinity = (placeType, memberType) => (placeType === memberType ? 1 : CROSS_AFFINITY);

// Turn a quiz tally into shares that sum to 1.
export function shares(scores) {
  const total = TYPE_ORDER.reduce((n, t) => n + (Number(scores?.[t]) || 0), 0) || 1;
  return Object.fromEntries(TYPE_ORDER.map((t) => [t, (Number(scores?.[t]) || 0) / total]));
}

// How happy one member would be at a destination, from 0 to 1.
export function satisfaction(memberScores, placeType) {
  const s = shares(memberScores);
  return TYPE_ORDER.reduce((sum, t) => sum + s[t] * affinity(placeType, t), 0);
}

// Rank every destination for the whole group.
// Fairness: 60% how the least-happy person fares (nobody gets left out) plus
// 40% the average (so a place that delights most still beats a bland middle).
export function rankDestinations(members) {
  if (!members.length) return [];
  const results = [];
  TYPE_ORDER.forEach((type) => {
    ARCHETYPES[type].places.forEach((place) => {
      const perMember = members.map((m) => ({ name: m.name, value: satisfaction(m.scores, type) }));
      const values = perMember.map((p) => p.value);
      const min = Math.min(...values);
      const mean = values.reduce((a, b) => a + b, 0) / values.length;
      results.push({ place, type, perMember, min, mean, score: 0.6 * min + 0.4 * mean });
    });
  });
  // Higher is better; ties go to the place with the higher "also fits" rank order.
  return results.sort((a, b) => b.score - a.score);
}

// Keep the best diverse picks: at most two destinations per traveller type.
export function topPicks(ranked, n = 3) {
  const used = {};
  const out = [];
  for (const r of ranked) {
    if ((used[r.type] || 0) >= 2) continue;
    used[r.type] = (used[r.type] || 0) + 1;
    out.push(r);
    if (out.length === n) break;
  }
  return out;
}
