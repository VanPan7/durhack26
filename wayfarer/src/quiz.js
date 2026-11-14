import './styles.css';
import { QUESTIONS, TYPE_ORDER, ARCHETYPES } from './data.js';
import { esc } from './lib/escape.js';
import { supabase } from './lib/supabase.js';

const root = document.getElementById('quiz-root');
const LETTERS = ['A', 'B', 'C', 'D'];
const STORAGE_KEY = 'wayfarer:result';
const TIMEOUT_MS = 25000;

// Each entry: { tag, question, answer }
const answers = [];

// Clear any result from an earlier run.
try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* storage unavailable */ }

// Local tally. Used only if the AI call fails.
function winningType() {
  const counts = Object.fromEntries(TYPE_ORDER.map((k) => [k, 0]));
  answers.forEach((a) => { counts[a.tag] += 1; });
  let best = TYPE_ORDER[0];
  TYPE_ORDER.forEach((k) => { if (counts[k] > counts[best]) best = k; });
  return best;
}

function isValidResult(data) {
  return Boolean(
    data &&
    Object.prototype.hasOwnProperty.call(ARCHETYPES, data.archetype) &&
    typeof data.summary === 'string' &&
    Array.isArray(data.places) &&
    data.places.length > 0 &&
    data.places.every((p) => p && typeof p.name === 'string')
  );
}

async function askAI() {
  if (!supabase) return null; // No .env keys yet.
  const payload = answers.map(({ question, answer }) => ({ question, answer }));
  try {
    const call = supabase.functions.invoke('recommend', { body: { answers: payload } });
    const timeout = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('timeout')), TIMEOUT_MS);
    });
    const { data, error } = await Promise.race([call, timeout]);
    if (error || !isValidResult(data)) return null;
    return data;
  } catch (err) {
    console.warn('AI recommendation failed, using the local result instead.', err);
    return null;
  }
}

function saveResult(result) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result));
    return true;
  } catch {
    return false;
  }
}

function showLoading() {
  root.innerHTML = `
    <div class="loading" role="status" aria-live="polite">
      <svg class="loading-rings" viewBox="0 0 600 600" aria-hidden="true">
        <g fill="none" stroke="#25405E" stroke-width="2"><circle cx="300" cy="300" r="110"/><circle cx="300" cy="300" r="170"/><circle cx="300" cy="300" r="230"/><circle cx="300" cy="300" r="296"/></g>
      </svg>
      <p class="eyebrow">Matching your answers</p>
      <h1 class="display question">Printing your ticket</h1>
      <p class="lede">This takes a few seconds.</p>
    </div>
  `;
  window.scrollTo(0, 0);
}

async function finish() {
  showLoading();
  const fallbackType = winningType();
  const result = await askAI();
  if (result && saveResult(result)) {
    window.location.href = '/results.html';
  } else {
    window.location.href = `/results.html?type=${fallbackType}`;
  }
}

function pick(tag, label) {
  const q = QUESTIONS[answers.length];
  answers.push({ tag, question: q.q, answer: label });
  if (answers.length >= QUESTIONS.length) {
    finish();
    return;
  }
  render();
}

function goBack() {
  answers.pop();
  render();
}

function render() {
  const idx = answers.length;
  const q = QUESTIONS[idx];

  const segments = QUESTIONS.map((_, i) => {
    const cls = i < idx ? 'seg done' : i === idx ? 'seg now' : 'seg';
    return `<div class="${cls}"></div>`;
  }).join('');

  const options = q.options.map(([tag, label], i) => `
    <button type="button" class="opt" data-tag="${esc(tag)}" data-label="${esc(label)}">
      <span class="opt-badge">${LETTERS[i]}</span>
      <span class="opt-label">${esc(label)}</span>
    </button>
  `).join('');

  root.innerHTML = `
    <div class="quiz-main">
      <div class="quiz-head">
        <p class="eyebrow">Question ${idx + 1} of ${QUESTIONS.length}</p>
        <div class="progress" aria-hidden="true">${segments}</div>
      </div>
      <h1 class="display question" id="question" tabindex="-1">${esc(q.q)}</h1>
      <div class="options">${options}</div>
      <div class="back-row">
        ${idx > 0 ? '<button type="button" class="back-btn" id="back">Back to previous question</button>' : ''}
      </div>
    </div>
    <div class="q-numeral" aria-hidden="true">0${idx + 1}</div>
  `;

  root.querySelectorAll('.opt').forEach((btn) => {
    btn.addEventListener('click', () => pick(btn.dataset.tag, btn.dataset.label));
  });
  const back = document.getElementById('back');
  if (back) back.addEventListener('click', goBack);

  // Move focus to the new question for keyboard and screen reader users.
  if (idx > 0) document.getElementById('question').focus({ preventScroll: true });
  window.scrollTo(0, 0);
}

render();
