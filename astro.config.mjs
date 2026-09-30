import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

const siteUrl = new URL(process.env.SITE_URL || 'https://mingcheng.github.io/astro-theme-grace/');

export default defineConfig({
  site: siteUrl.origin,
  base: siteUrl.pathname,
  integrations: [sitemap()],
  prefetch: true,
  markdown: {
    // 支持 $...$ 行内公式与 $$...$$ 块级公式，渲染为 KaTeX。
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  },
});
