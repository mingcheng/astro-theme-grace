import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const siteUrl = new URL(process.env.SITE_URL || 'https://mingcheng.github.io/astro-theme-grace/');

export default defineConfig({
  site: siteUrl.origin,
  base: siteUrl.pathname,
  integrations: [sitemap()],
  prefetch: true,
});
