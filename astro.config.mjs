// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://valeris.fr',

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'de', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  output: 'static',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap(), mdx()],
});