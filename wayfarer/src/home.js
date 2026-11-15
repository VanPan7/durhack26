import './styles.css';
import { TYPES } from './data.js';
import { esc } from './lib/escape.js';

const typesGrid = document.getElementById('types-grid');
typesGrid.innerHTML = TYPES.map((t) => `
  <article class="card">
    <div class="poster poster--type" style="--accent:${esc(t.color)}">
      <svg viewBox="0 0 300 190" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g fill="none" stroke="#0A1626" stroke-opacity="0.2" stroke-width="2"><circle cx="250" cy="40" r="40"/><circle cx="250" cy="40" r="80"/><circle cx="250" cy="40" r="120"/><circle cx="250" cy="40" r="160"/></g>
      </svg>
      <div class="poster-title">${esc(t.name)}</div>
    </div>
    <div class="card-body">
      <p class="card-tag">${esc(t.tag)}</p>
      <p class="card-traits">${esc(t.traits)}</p>
    </div>
  </article>
`).join('');

/*const lineupList = document.getElementById('lineup-list');
lineupList.innerHTML = LINEUP.map((row) => `
  <li class="lineup-row" style="--accent:${esc(row.color)}">
    <span class="lineup-dot" aria-hidden="true"></span>
    <span class="lineup-place">${esc(row.place)}</span>
    <span class="lineup-fest">${esc(row.festival)}</span>
    <span class="lineup-when">${esc(row.when)}</span>
  </li>
`).join('');*/
