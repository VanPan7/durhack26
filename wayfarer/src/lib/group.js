import { TYPE_ORDER } from '../data.js';

// Turn a quiz tally into shares that sum to 1.
export function shares(scores) {
  const total = TYPE_ORDER.reduce((n, t) => n + (Number(scores?.[t]) || 0), 0) || 1;
  return Object.fromEntries(TYPE_ORDER.map((t) => [t, (Number(scores?.[t]) || 0) / total]));
}

// How happy one member would be in a country, from 0 to 1: their interests (shares)
// weighted by how strongly the country offers each interest (affinity from the database).
export function satisfaction(memberScores, code, affinity) {
  const s = shares(memberScores);
  return TYPE_ORDER.reduce((sum, t) => sum + s[t] * (affinity[t]?.[code] || 0), 0);
}

// Rank every country for the whole group.
// Fairness: 60% how the least-happy person fares (nobody gets left out) plus
// 40% the average (so a place that delights most still beats a bland middle).
export function rankCountries(members, affinity, n = 3) {
  if (!members.length) return [];
  const codes = new Set();
  TYPE_ORDER.forEach((t) => Object.keys(affinity[t] || {}).forEach((c) => codes.add(c)));
  const total = members.reduce((acc, m) => {
    const s = shares(m.scores);
    TYPE_ORDER.forEach((t) => { acc[t] += s[t] / members.length; });
    return acc;
  }, Object.fromEntries(TYPE_ORDER.map((t) => [t, 0])));

  const results = [...codes].map((code) => {
    const perMember = members.map((m) => ({ name: m.name, value: satisfaction(m.scores, code, affinity) }));
    const values = perMember.map((p) => p.value);
    const min = Math.min(...values);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    // The interest this country serves the group best, for colour and labelling.
    const type = TYPE_ORDER.reduce((b, t) => (total[t] * (affinity[t]?.[code] || 0) > total[b] * (affinity[b]?.[code] || 0) ? t : b), TYPE_ORDER[0]);
    return { code, type, perMember, min, mean, score: 0.6 * min + 0.4 * mean };
  });
  return results.sort((a, b) => b.score - a.score).slice(0, n);
}

// The group's blended interests, for choosing activities.
export function groupWeights(members) {
  const out = Object.fromEntries(TYPE_ORDER.map((t) => [t, 0]));
  members.forEach((m) => {
    const s = shares(m.scores);
    TYPE_ORDER.forEach((t) => { out[t] += s[t] / members.length; });
  });
  return out;
}
