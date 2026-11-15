# Wayfarer

A travel destination recommender with a six-question personality quiz. Plain HTML, CSS and JavaScript, built with Vite. The quiz picks one of four traveller types and shows three matching destinations.

## Run it locally

You need Node.js 18 or newer. Ensure Python's Vite package is installed.

```bash
npm install
cp .env.example .env     # then fill in your Supabase values (optional for now)
npm run dev
```

Open the address Vite prints, usually http://localhost:5173.

Other commands:

```bash
npm run build     # production build into dist/
npm run preview   # serve the built site locally
```

## Pages

- `index.html` is the landing page.
- `auth.html` is sign up and sign in (Supabase email and password).
- `group.html` is the group trip: create or join with a 6-character code, everyone takes the quiz, and the best-fit destinations are shown. Run `supabase/schema.sql` first.
- `quiz.html` is the six-question quiz. It sends you to `results.html?type=<type>`.
- `results.html` shows the traveller type and three destinations. Try `results.html?type=night`, `ritual`, `wander` or `sun`.

## Folder layout

```
index.html, quiz.html, results.html   the three pages
src/styles.css                        shared design tokens and styles
src/data.js                           quiz questions, types, destinations
src/home.js, quiz.js, results.js      one script per page
src/lib/supabase.js                   Supabase client (null until .env is set)
src/lib/escape.js                     escapes text before it goes into HTML
vite.config.js                        lists the three pages for the build
```

## Connecting Supabase

1. In your Supabase project, open Project Settings, then API. Copy the Project URL and the anon public key into `.env` as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
2. Use the anon key only. Never put the `service_role` key in front-end code.
3. Turn on Row Level Security for every table the site reads or writes, and add policies for what visitors may do.
4. Import the client where you need it:

```js
import { supabase } from './lib/supabase.js';
const { data, error } = await supabase.from('destinations').select('*');
```

Good first steps: replace the arrays in `src/data.js` with queries, and save quiz results from the `save-btn` handler in `src/results.js`. Wrap any database text in `esc()` before putting it into an HTML string.

To run Supabase on your own machine instead, install the Supabase CLI and Docker, then run `supabase init` and `supabase start`. The local API is at http://localhost:54321.

## Notes

- Destinations, festivals and dates are example content. Check them before launch.
- There are no photos yet. Destination cards use colour blocks and ring graphics.
