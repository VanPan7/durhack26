import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

const page = (file) => fileURLToPath(new URL(file, import.meta.url));

// Three plain HTML pages, each with its own script.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: page('./index.html'),
        quiz: page('./quiz.html'),
        results: page('./results.html')
      }
    }
  }
});
