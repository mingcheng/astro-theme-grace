import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE_URL || 'https://mingcheng.github.io/astro-theme-grace',
  integrations: [sitemap()],
  prefetch: true,
});
