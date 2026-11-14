import './styles.css';
import { esc } from './lib/escape.js';
import { signUpNewUser, signInUser, signOutUser, getUser } from './lib/auth.js';

const root = document.getElementById('auth-root');
let mode = 'signin'; // 'signin' | 'signup'
let message = null;  // { text, error }

function formView() {
  const up = mode === 'signup';
  root.innerHTML = `
    <div class="auth-card">
      <p class="eyebrow">${up ? 'Create account' : 'Welcome back'}</p>
      <h1 class="display auth-title">${up ? 'Sign up' : 'Sign in'}</h1>
      <form id="auth-form" novalidate>
        <label class="field">Email
          <input type="email" name="email" autocomplete="email" required>
        </label>
        <label class="field">Password
          <input type="password" name="password" autocomplete="${up ? 'new-password' : 'current-password'}" minlength="6" required>
        </label>
        <p class="auth-msg ${message?.error ? 'is-error' : ''}" role="status" aria-live="polite">${message ? esc(message.text) : ''}</p>
        <button type="submit" class="btn btn-primary" id="auth-submit">${up ? 'Create account' : 'Sign in'}</button>
      </form>
      <p class="auth-switch">
        ${up ? 'Already have an account?' : 'New here?'}
        <button type="button" class="link-btn" id="auth-toggle">${up ? 'Sign in' : 'Sign up'}</button>
      </p>
    </div>`;

  document.getElementById('auth-toggle').addEventListener('click', () => {
    mode = up ? 'signin' : 'signup';
    message = null;
    formView();
  });

  document.getElementById('auth-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value.trim();
    const password = form.password.value;
    if (!email || password.length < 6) {
      message = { text: 'Enter an email and a password of at least 6 characters.', error: true };
      return formView();
    }
    const btn = document.getElementById('auth-submit');
    btn.disabled = true;
    btn.textContent = 'Please wait…';

    if (up) {
      const { data, error } = await signUpNewUser(email, password);
      if (error) message = { text: error.message, error: true };
      else if (data.session) return accountView(data.user);
      else message = { text: 'Check your email for a confirmation link, then sign in.', error: false };
      mode = error ? 'signup' : 'signin';
    } else {
      const { data, error } = await signInUser(email, password);
      if (!error) return accountView(data.user);
      message = { text: error.message, error: true };
    }
    formView();
  });
}

function accountView(user) {
  root.innerHTML = `
    <div class="auth-card">
      <p class="eyebrow">Signed in</p>
      <h1 class="display auth-title">Hello, traveller</h1>
      <p class="lede">${esc(user.email)}</p>
      <div class="auth-actions">
        <a href="/quiz.html" class="btn btn-primary">Take the quiz</a>
        <button type="button" class="btn btn-ghost" id="signout">Sign out</button>
      </div>
    </div>`;
  document.getElementById('signout').addEventListener('click', async () => {
    await signOutUser();
    message = null;
    mode = 'signin';
    formView();
  });
}

getUser().then((user) => (user ? accountView(user) : formView()));
