import './styles.css';
import { ARCHETYPES } from './data.js';
import { esc } from './lib/escape.js';
import { activitiesFor } from './lib/activities.js';

// results.html?type=night | ritual | wander | sun
const requested = new URLSearchParams(window.location.search).get('type');
const key = Object.prototype.hasOwnProperty.call(ARCHETYPES, requested) ? requested : 'ritual';
const d = ARCHETYPES[key];

document.title = `${d.name} | Wayfarer`;

const places = d.places.map((p) => `
  <article class="card">
    <div class="poster poster--dest" style="--accent:${esc(d.color)}">
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
        <div class="fact"><dt>Festival</dt><dd>${esc(p.festival)}</dd></div>
        <div class="fact"><dt>When</dt><dd>${esc(p.when)}</dd></div>
        <div class="fact"><dt>Sound</dt><dd>${esc(p.sound)}</dd></div>
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
      <p class="eyebrow" style="color:${esc(d.color)}">Your result</p>
      <h1 class="display h-hero" style="margin-top:18px">You are ${esc(d.name)}.</h1>
      <p class="lede">${esc(d.tag)}</p>
      <p class="result-blurb">${esc(d.blurb)}</p>
      <p class="result-traits">${esc(d.traits)}</p>
    </div>

    <div class="ticket-wrap">
      <div class="ticket" style="--ticket:${esc(d.color)};--tilt:2.5deg">
        <div class="ticket-main">
          <div class="ticket-row t-label"><span>Wayfarer</span><span>Boarding pass</span></div>
          <div>
            <div class="t-label dim">Traveller type</div>
            <div class="t-name">${esc(d.name)}</div>
          </div>
          <div class="t-meta">
            <dl><dt>Top pick</dt><dd>${esc(d.places[0].name)}</dd></dl>
            <dl><dt>Soundtrack</dt><dd>${esc(d.sound)}</dd></dl>
          </div>
          <div class="barcode"></div>
        </div>
        <div class="ticket-stub">
          <div class="t-label">Admit one</div>
          <div>
            <div class="stub-num">3</div>
            <div class="stub-cap">Destinations</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="wrap section">
    <p class="eyebrow">Your destinations</p>
    <h2 class="display h-section">Three places that sound like you</h2>
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

// Placeholders for the Supabase step. Nothing is saved or shared yet.
document.getElementById('save-btn').addEventListener('click', () => {
  console.log('Save results: not wired up yet', { type: key });
});
document.getElementById('share-btn').addEventListener('click', () => {
  console.log('Share: not wired up yet', window.location.href);
});

// UNESCO activities from Supabase that match this traveller type.
const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
const safeUrl = (u) => (/^https?:\/\//.test(u || '') ? u : '');
const countryName = (c) => { try { return regionNames.of(String(c).toUpperCase()); } catch { return c; } };
const short = (t, n = 170) => { const s = String(t ?? ''); return s.length > n ? `${s.slice(0, n).trimEnd()}…` : s; };

activitiesFor(key).then((acts) => {
  if (!acts.length) return;
  const cards = acts.map((a) => {
    const img = safeUrl(a.image);
    const link = safeUrl(a.url);
    return `
    <article class="card">
      ${img ? `<img class="act-img" src="${esc(img)}" alt="" loading="lazy">` : ''}
      <div class="card-body">
        <p class="card-country">${esc((a.countries || []).map(countryName).join(', '))}</p>
        <h3 class="act-title">${esc(a.title)}</h3>
        <p class="card-tag">${esc(short(a.description))}</p>
        ${link ? `<a class="act-link" href="${esc(link)}" target="_blank" rel="noopener noreferrer">Learn more</a>` : ''}
        ${a.image_copyright ? `<small class="act-credit">${esc(a.image_copyright)}</small>` : ''}
      </div>
    </article>`;
  }).join('');
  document.getElementById('results-root').insertAdjacentHTML('beforeend', `
    <section class="wrap section">
      <p class="eyebrow" style="color:${esc(d.color)}">Cultural activities</p>
      <h2 class="display h-section">Experiences for ${esc(d.name)}</h2>
      <div class="grid grid--dest">${cards}</div>
    </section>`);
});
