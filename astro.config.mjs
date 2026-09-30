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
  vite: {
    // Deno 只能解析 deno.json 中声明的裸模块名，而预渲染产物会直接 import Astro 的间接依赖（devalue、cookie 等），
    // 因此把它们打包进预渲染产物；sharp 含原生模块，保持外部引用。
    environments: {
      prerender: { resolve: { noExternal: true, external: ['sharp'] } },
    },
  },
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
