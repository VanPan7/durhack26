import './styles.css';
import { QUESTIONS } from './data.js';
import { esc } from './lib/escape.js';
import { tally, winningType, topCategories } from './lib/score.js';
import { addMember, normaliseCode, getName } from './lib/groups.js';

const root = document.getElementById('quiz-root');
const LETTERS = ['A', 'B', 'C', 'D'];
const answers = [];

// quiz.html?group=ABC123 saves the result to that group instead of showing a solo result.
const groupCode = normaliseCode(new URLSearchParams(window.location.search).get('group'));

function pick(tag, cat) {
  answers.push([tag, cat]);
  if (answers.length >= QUESTIONS.length) {
    if (groupCode) return finishForGroup();
    const result = tally(answers);
    const params = new URLSearchParams({ type: winningType(result) });
    topCategories(result).forEach((c) => params.append('cat', c.name));
    window.location.href = `/results.html?${params}`;
    return;
  }
  render();
}

async function finishForGroup() {
  root.innerHTML = '<p class="lede" role="status">Saving your answers…</p>';
  const name = getName() || 'Traveller';
  const { error } = await addMember(groupCode, name, tally(answers).types);
  if (error) {
    root.innerHTML = `<div class="auth-card"><p class="auth-msg is-error" role="alert">${esc(error.message)}</p>
      <a class="btn btn-primary" href="/group.html?code=${groupCode}">Back to the group</a></div>`;
    return;
  }
  window.location.href = `/group.html?code=${groupCode}`;
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

  const options = q.options.map(([tag, label, cat], i) => `
    <button type="button" class="opt" data-pick="${esc(tag)}" data-cat="${esc(cat)}">
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
    btn.addEventListener('click', () => pick(btn.dataset.pick, btn.dataset.cat));
  });
  const back = document.getElementById('back');
  if (back) back.addEventListener('click', goBack);

  // Move focus to the new question for keyboard and screen reader users.
  if (idx > 0) document.getElementById('question').focus({ preventScroll: true });
  window.scrollTo(0, 0);
}

render();
