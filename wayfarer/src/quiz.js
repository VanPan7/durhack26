import './styles.css';
import { QUESTIONS, TYPE_ORDER } from './data.js';
import { esc } from './lib/escape.js';

const root = document.getElementById('quiz-root');
const LETTERS = ['A', 'B', 'C', 'D'];
const answers = [];

function winningType() {
  const counts = Object.fromEntries(TYPE_ORDER.map((k) => [k, 0]));
  answers.forEach((a) => { counts[a] += 1; });
  let best = TYPE_ORDER[0];
  TYPE_ORDER.forEach((k) => { if (counts[k] > counts[best]) best = k; });
  return best;
}

function pick(tag) {
  answers.push(tag);
  if (answers.length >= QUESTIONS.length) {
    window.location.href = `/results.html?type=${winningType()}`;
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
    <button type="button" class="opt" data-pick="${esc(tag)}">
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

  root.querySelectorAll('[data-pick]').forEach((btn) => {
    btn.addEventListener('click', () => pick(btn.dataset.pick));
  });
  const back = document.getElementById('back');
  if (back) back.addEventListener('click', goBack);

  // Move focus to the new question for keyboard and screen reader users.
  if (idx > 0) document.getElementById('question').focus({ preventScroll: true });
  window.scrollTo(0, 0);
}

render();
