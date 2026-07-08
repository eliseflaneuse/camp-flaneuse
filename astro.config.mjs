// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Live at Cloudflare Workers — swap for a custom domain when there is one.
  site: 'https://camp-flaneuse.eliseflaneuse.workers.dev',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
