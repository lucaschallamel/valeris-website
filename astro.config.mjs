// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://valeris.ch',

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'de', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },

  output: 'static',
});
