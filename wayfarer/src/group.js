import './styles.css';
import { esc } from './lib/escape.js';
import { ARCHETYPES, TYPE_ORDER } from './data.js';
import { createGroup, groupExists, listMembers, normaliseCode, getName, setName } from './lib/groups.js';
import { rankDestinations, topPicks } from './lib/group.js';

const root = document.getElementById('group-root');
const code = normaliseCode(new URLSearchParams(window.location.search).get('code'));
let timer = null;

const pct = (v) => `${Math.round(v * 100)}%`;
const leadingType = (scores) => TYPE_ORDER.reduce((b, t) => ((scores[t] || 0) > (scores[b] || 0) ? t : b), TYPE_ORDER[0]);

/* ---------- landing: create or join ---------- */
function landing(error) {
  root.innerHTML = `
    <div class="group-card">
      <p class="eyebrow">Group trip</p>
      <h1 class="display auth-title">Find a place that suits everyone</h1>
      <p class="lede">Everyone takes the quiz on their own phone. We pick the destinations that work for the whole group, not just the loudest voice.</p>
      <p class="auth-msg is-error" role="alert">${error ? esc(error) : ''}</p>
      <div class="group-split">
        <form id="create-form" class="group-box">
          <h2 class="display">Start a group</h2>
          <label class="field">Your name <input name="name" maxlength="40" autocomplete="given-name" required value="${esc(getName())}"></label>
          <button class="btn btn-primary" type="submit">Create group</button>
        </form>
        <form id="join-form" class="group-box">
          <h2 class="display">Join a group</h2>
          <label class="field">Group code <input name="code" maxlength="6" autocapitalize="characters" autocomplete="off" required placeholder="ABC123"></label>
          <button class="btn btn-ghost" type="submit">Join</button>
        </form>
      </div>
    </div>`;

  document.getElementById('create-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = e.currentTarget.name.value.trim();
    if (!name) return;
    setName(name);
    const btn = e.currentTarget.querySelector('button');
    btn.disabled = true;
    const { code: newCode, error: err } = await createGroup();
    if (err) return landing(err.message);
    window.location.href = `/group.html?code=${newCode}`;
  });
  document.getElementById('join-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const c = normaliseCode(e.currentTarget.code.value);
    if (!c) return landing('Group codes are 6 letters and numbers.');
    if (!(await groupExists(c))) return landing('We could not find that group.');
    window.location.href = `/group.html?code=${c}`;
  });
}

/* ---------- group view ---------- */
function memberRows(members) {
  if (!members.length) return '<li class="member empty">Nobody has taken the quiz yet.</li>';
  return members.map((m) => {
    const t = ARCHETYPES[leadingType(m.scores)];
    return `<li class="member" style="--accent:${esc(t.color)}"><span class="lineup-dot" aria-hidden="true"></span><strong>${esc(m.name)}</strong><span class="member-type">${esc(t.name)}</span></li>`;
  }).join('');
}

function pickCards(members) {
  if (!members.length) return '';
  const picks = topPicks(rankDestinations(members), 3);
  const note = members.length < 2 ? '<p class="card-traits">Invite a friend to see a real compromise.</p>' : '';
  return `
    <section class="section group-picks">
      <p class="eyebrow">Best fit for ${members.length} ${members.length === 1 ? 'traveller' : 'travellers'}</p>
      <h2 class="display h-section">Where you should go</h2>
      ${note}
      <div class="grid grid--dest">${picks.map((r, i) => `
        <article class="card">
          <div class="poster poster--dest" style="--accent:${esc(ARCHETYPES[r.type].color)}">
            <span class="pill">${i === 0 ? 'Top pick' : `Pick ${i + 1}`}</span>
            <div class="poster-title">${esc(r.place.name)}</div>
          </div>
          <div class="card-body card-body--dest">
            <p class="card-country">${esc(r.place.country)} · ${pct(r.score)} group match</p>
            <p class="card-tag">${esc(r.place.blurb)}</p>
            <dl class="facts">
              <div class="fact"><dt>Festival</dt><dd>${esc(r.place.festival)}</dd></div>
              <div class="fact"><dt>When</dt><dd>${esc(r.place.when)}</dd></div>
            </dl>
            <ul class="fit-list" aria-label="How well each person fits">${r.perMember.map((p) => `
              <li><span>${esc(p.name)}</span><span class="fit-bar" aria-hidden="true"><i style="width:${pct(p.value)}"></i></span><span>${pct(p.value)}</span></li>`).join('')}
            </ul>
          </div>
        </article>`).join('')}
      </div>
    </section>`;
}

async function groupView() {
  const { members, error } = await listMembers(code);
  const link = `${window.location.origin}/group.html?code=${code}`;
  const name = getName();
  const mine = name && members.some((m) => m.name.toLowerCase() === name.toLowerCase());
  const keepFocus = document.activeElement?.id;

  root.innerHTML = `
    <div class="group-card">
      <p class="eyebrow">Group code</p>
      <h1 class="display group-code">${esc(code)}</h1>
      <div class="auth-actions">
        <button class="btn btn-ghost btn-sm" id="copy-link" type="button">Copy invite link</button>
      </div>
      <p class="auth-msg is-error" role="alert">${error ? esc(error.message) : ''}</p>
      <h2 class="display">Who is in</h2>
      <ul class="members">${memberRows(members)}</ul>
      <form id="name-form" class="group-join">
        <label class="field">Your name <input name="name" maxlength="40" required value="${esc(name)}"></label>
        <button class="btn btn-primary" type="submit">${mine ? 'Retake the quiz' : 'Take the quiz'}</button>
      </form>
      <p class="card-traits">The page updates as friends finish.</p>
    </div>
    ${pickCards(members)}`;

  document.getElementById('copy-link').addEventListener('click', async (e) => {
    try { await navigator.clipboard.writeText(link); e.currentTarget.textContent = 'Copied'; }
    catch { window.prompt('Copy this link', link); }
  });
  document.getElementById('name-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const n = e.currentTarget.name.value.trim();
    if (!n) return;
    setName(n);
    window.location.href = `/quiz.html?group=${code}`;
  });
  if (keepFocus === 'copy-link') document.getElementById('copy-link')?.focus();
}

/* ---------- start ---------- */
if (!code) {
  landing(new URLSearchParams(window.location.search).get('code') ? 'That group code does not look right.' : '');
} else {
  groupExists(code).then((ok) => {
    if (!ok) return landing('We could not find that group.');
    groupView();
    // Refresh while the page is open, but not while someone is typing their name.
    timer = setInterval(() => {
      if (document.hidden || document.activeElement?.tagName === 'INPUT') return;
      groupView();
    }, 10000);
  });
}
window.addEventListener('pagehide', () => clearInterval(timer));
