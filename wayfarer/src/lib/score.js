import { TYPE_ORDER, TYPE_CATEGORIES } from '../data.js';

// answers: array of [type, category] pairs, one per question.
export function tally(answers) {
  const types = Object.fromEntries(TYPE_ORDER.map((t) => [t, 0]));
  const cats = {};
  answers.forEach(([type, cat]) => {
    types[type] += 1;
    cats[cat] = (cats[cat] || 0) + 1;
  });
  return { types, cats };
}

// Most votes wins. A tie is settled by how many category votes fall under each
// tied type, then by TYPE_ORDER.
export function winningType({ types, cats }) {
  const catScore = (t) => TYPE_CATEGORIES[t].reduce((n, c) => n + (cats[c] || 0), 0);
  return [...TYPE_ORDER].sort((a, b) => (types[b] - types[a]) || (catScore(b) - catScore(a)))[0];
}

// The user's strongest interest categories, most votes first (at most n).
export function topCategories({ cats }, n = 3) {
  return Object.entries(cats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([name, weight]) => ({ name, weight }));
}
