import {defineConfig} from 'vite';

// BASE_PATH is set by the GitHub Pages workflow (for example /olive-young-beauty-lab/).
// Local development and tests use "/".
export default defineConfig({base: process.env.BASE_PATH ?? '/'});
