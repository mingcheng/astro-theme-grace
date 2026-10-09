import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { codeFrameTransformer } from './src/lib/code-block.ts';

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
    // 代码高亮：Shiki 构建时渲染，配色取自 tokens.css 中的 --astro-code-* 变量；
    // 转换器补上语言 / 文件名标题栏与复制按钮。
    shikiConfig: {
      theme: 'css-variables',
      transformers: [codeFrameTransformer],
    },
  },
});
