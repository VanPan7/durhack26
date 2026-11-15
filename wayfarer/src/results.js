import './styles.css';
import { ARCHETYPES, TYPE_ORDER } from './data.js';
import { esc } from './lib/escape.js';
import { countriesFor, activitiesIn } from './lib/activities.js';
import { pickPhoto, photoLayer, photoCredit, guardPhotos } from './lib/poster.js';

// results.html?type=night | performing | culture | food | walking | crafts | nature | history
const requested = new URLSearchParams(window.location.search).get('type');
const key = TYPE_ORDER.includes(requested) ? requested : TYPE_ORDER[0];
const d = ARCHETYPES[key];

document.title = `${d.name} | Wayfarer`;

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
            <dl><dt>Top pick</dt><dd id="top-pick">…</dd></dl>
            <dl><dt>Loves</dt><dd>${esc(d.category)}</dd></dl>
          </div>
          <div class="barcode"></div>
        </div>
        <div class="ticket-stub">
          <div class="t-label">Admit one</div>
          <div>
            <div class="stub-num" id="stub-num">–</div>
            <div class="stub-cap">Countries</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="wrap section">
    <p class="eyebrow">Your destinations</p>
    <h2 class="display h-section">Countries that sound like you</h2>
    <div id="dest-root"><p class="lede" role="status">Finding your countries…</p></div>
  </section>
`;

// unused html
//   <section class="wrap panel-wrap">
  //   <div class="panel panel--sm">
  //     <svg class="rings" viewBox="0 0 400 400" aria-hidden="true">
  //       <g fill="none" stroke="#25405E" stroke-width="2"><circle cx="200" cy="200" r="60"/><circle cx="200" cy="200" r="110"/><circle cx="200" cy="200" r="160"/><circle cx="200" cy="200" r="198"/></g>
  //     </svg>
  //     <div class="panel-copy">
  //       <h2 class="display">Keep this ticket</h2>
  //       <p>Save your result or send it to whoever is coming with you.</p>
  //     </div>
  //     <div class="panel-actions">
  //       <button type="button" class="btn btn-primary" id="save-btn">Save my results</button>
  //       <button type="button" class="btn btn-ghost" id="share-btn">Share with a friend</button>
  //     </div>
  //   </div>
  // </section>


// Placeholders for the Supabase step. Nothing is saved or shared yet.
// document.getElementById('save-btn').addEventListener('click', () => {
//   console.log('Save results: not wired up yet', { type: key });
// });
// document.getElementById('share-btn').addEventListener('click', () => {
//   console.log('Share: not wired up yet', window.location.href);
// });


const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
const safeUrl = (u) => (/^https?:\/\//.test(u || '') ? u : '');
const countryName = (c) => { try { return regionNames.of(String(c).toUpperCase()); } catch { return c; } };
const short = (t, n = 150) => { const s = String(t ?? ''); return s.length > n ? `${s.slice(0, n).trimEnd()}…` : s; };
const RANKS = ['Top match', 'Also fits', 'Wildcard'];

// Countries and activities come from unesco_activities, matched through the
// concepts that concept_categories lists for this type.
(async () => {
  const dest = document.getElementById('dest-root');
  const countries = await countriesFor(key, 3);
  if (!countries.length) {
    dest.innerHTML = '<p class="lede">We could not load destinations right now. Check that Supabase is connected and try again.</p>';
    document.getElementById('top-pick').textContent = '–';
    return;
  }
  document.getElementById('top-pick').textContent = countryName(countries[0].code);
  document.getElementById('stub-num').textContent = String(countries.length);
  const acts = await activitiesIn(countries.map((c) => c.code), { [key]: 1 }, 6);

  dest.innerHTML = `<div class="grid grid--dest">${countries.map((c, i) => {
    const photo = pickPhoto(acts[c.code]);
    return `
    <article class="card">
      <div class="poster poster--dest${photo ? ' poster--photo' : ''}" style="--accent:${esc(d.color)}">
        ${photoLayer(photo)}
        <svg viewBox="0 0 400 230" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <g fill="none" stroke="#0A1626" stroke-opacity="0.2" stroke-width="2"><circle cx="330" cy="50" r="50"/><circle cx="330" cy="50" r="100"/><circle cx="330" cy="50" r="150"/><circle cx="330" cy="50" r="200"/></g>
        </svg>
        <span class="pill">${esc(RANKS[i] || 'Also fits')}</span>
        <div class="poster-title">${esc(countryName(c.code))}</div>
      </div>
      <div class="card-body card-body--dest">
        <p class="card-country">${Math.round(c.score * 100)}% match for ${esc(d.category.toLowerCase())}</p>
        ${photoCredit(photo)}
        <ul class="act-list">${(acts[c.code] || []).slice(0, 3).map((a) => {
          const link = safeUrl(a.url);
          const title = link ? `<a class="act-link" href="${esc(link)}" target="_blank" rel="noopener noreferrer">${esc(a.title)}</a>` : esc(a.title);
          return `<li><strong>${title}</strong><span>${esc(short(a.description))}</span></li>`;
        }).join('')}</ul>
      </div>
    </article>`;
  }).join('')}</div>`;
  guardPhotos(dest);
})();
