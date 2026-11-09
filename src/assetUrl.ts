// Prefixes public asset paths with the site's base path (for example /olive-young-beauty-lab/ on GitHub Pages).
// Locally and in tests the base is "/", so paths stay exactly as written.
const base: string = (import.meta as unknown as {env?: {BASE_URL?: string}}).env?.BASE_URL ?? '/';
export const asset = (path: string): string => base.replace(/\/$/, '') + (path.startsWith('/') ? path : '/' + path);
