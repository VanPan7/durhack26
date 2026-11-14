import './styles.css';
import { ARCHETYPES } from './data.js';
import { esc } from './lib/escape.js';

const STORAGE_KEY = 'wayfarer:result';
const RANKS = ['Top match', 'Also fits', 'Wildcard'];
const has = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

// Result saved by quiz.js after the AI call.
function loadAIResult() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const r = JSON.parse(raw);
    if (!has(ARCHETYPES, r?.archetype) || !Array.isArray(r.places) || !r.places.length) return null;
    return r;
  } catch {
    return null;
  }
}

// Built from the local content in data.js (also used by results.html?type=...).
function staticView(key) {
  const d = ARCHETYPES[key];
  return { name: d.name, color: d.color, tag: d.tag, blurb: d.blurb, traits: d.traits, sound: d.sound, places: d.places, aiNote: false };
}

// Built from the Supabase function response.
function aiView(result) {
  const d = ARCHETYPES[result.archetype];
  const places = result.places.slice(0, 3).map((p, i) => ({
    rank: RANKS[i] || 'Also fits',
    name: p.name,
    country: p.country,
    blurb: p.blurb,
    festival: p.festival,
    when: Array.isArray(p.best_months) ? p.best_months.join(', ') : (p.best_months ?? p.when),
    sound: p.sound
  }));
  return { name: d.name, color: d.color, tag: d.tag, blurb: result.summary || d.blurb, traits: d.traits, sound: d.sound, places, aiNote: true };
}

// A ?type= in the address always wins, so direct links and the fallback keep working.
const requested = new URLSearchParams(window.location.search).get('type');
let view;
if (has(ARCHETYPES, requested)) {
  view = staticView(requested);
} else {
  const ai = loadAIResult();
  view = ai ? aiView(ai) : staticView('ritual');
}

document.title = `${view.name} | Wayfarer`;

const fact = (label, value) =>
  value ? `<div class="fact"><dt>${label}</dt><dd>${esc(value)}</dd></div>` : '';

const places = view.places.map((p) => `
  <article class="card">
    <div class="poster poster--dest" style="--accent:${esc(view.color)}">
      <svg viewBox="0 0 400 230" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g fill="none" stroke="#0A1626" stroke-opacity="0.2" stroke-width="2"><circle cx="330" cy="50" r="50"/><circle cx="330" cy="50" r="100"/><circle cx="330" cy="50" r="150"/><circle cx="330" cy="50" r="200"/></g>
      </svg>
      <span class="pill">${esc(p.rank)}</span>
      <div class="poster-title">${esc(p.name)}</div>
    </div>
    <div class="card-body card-body--dest">
      <p class="card-country">${esc(p.country)}</p>
      <p class="card-tag">${esc(p.blurb)}</p>
      <dl class="facts">
        ${fact('Festival', p.festival)}
        ${fact('When', p.when)}
        ${fact('Sound', p.sound)}
      </dl>
    </div>
  </article>
`).join('');

document.getElementById('results-root').innerHTML = `
  <section class="wrap hero hero--result">
    <svg class="rings" viewBox="0 0 600 600" aria-hidden="true">
      <g fill="none" stroke="#25405E" stroke-width="2"><circle cx="300" cy="300" r="110"/><circle cx="300" cy="300" r="170"/><circle cx="300" cy="300" r="230"/><circle cx="300" cy="300" r="296"/></g>
    </svg>
    <div class="result-copy">
      <p class="eyebrow" style="color:${esc(view.color)}">Your result</p>
      <h1 class="display h-hero" style="margin-top:18px">You are ${esc(view.name)}.</h1>
      <p class="lede">${esc(view.tag)}</p>
      <p class="result-blurb">${esc(view.blurb)}</p>
      <p class="result-traits">${esc(view.traits)}</p>
      ${view.aiNote ? '<p class="mono-note">Matched from your answers with AI.</p>' : ''}
    </div>

    <div class="ticket-wrap">
      <div class="ticket" style="--ticket:${esc(view.color)};--tilt:2.5deg">
        <div class="ticket-main">
          <div class="ticket-row t-label"><span>Wayfarer</span><span>Boarding pass</span></div>
          <div>
            <div class="t-label dim">Traveller type</div>
            <div class="t-name">${esc(view.name)}</div>
          </div>
          <div class="t-meta">
            <dl><dt>Top pick</dt><dd>${esc(view.places[0].name)}</dd></dl>
            <dl><dt>Soundtrack</dt><dd>${esc(view.sound)}</dd></dl>
          </div>
          <div class="barcode"></div>
        </div>
        <div class="ticket-stub">
          <div class="t-label">Admit one</div>
          <div>
            <div class="stub-num">${view.places.length}</div>
            <div class="stub-cap">Destinations</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="wrap section">
    <p class="eyebrow">Your destinations</p>
    <h2 class="display h-section">${view.places.length === 3 ? 'Three places' : 'Places'} that sound like you</h2>
    <div class="grid grid--dest">${places}</div>
  </section>

  <section class="wrap panel-wrap">
    <div class="panel panel--sm">
      <svg class="rings" viewBox="0 0 400 400" aria-hidden="true">
        <g fill="none" stroke="#25405E" stroke-width="2"><circle cx="200" cy="200" r="60"/><circle cx="200" cy="200" r="110"/><circle cx="200" cy="200" r="160"/><circle cx="200" cy="200" r="198"/></g>
      </svg>
      <div class="panel-copy">
        <h2 class="display">Keep this ticket</h2>
        <p>Save your result or send it to whoever is coming with you.</p>
      </div>
      <div class="panel-actions">
        <button type="button" class="btn btn-primary" id="save-btn">Save my results</button>
        <button type="button" class="btn btn-ghost" id="share-btn">Share with a friend</button>
      </div>
    </div>
  </section>
`;

// Placeholders for a later step. Nothing is saved or shared yet.
document.getElementById('save-btn').addEventListener('click', () => {
  console.log('Save results: not wired up yet', view.name);
});
document.getElementById('share-btn').addEventListener('click', () => {
  console.log('Share: not wired up yet', window.location.href);
});
