import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const notes = defineCollection({
  // URL 取 frontmatter 的 slug，缺省时取文件名：designing-for-calm.md → /notes/designing-for-calm
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string().min(10).optional().describe('文章摘要，用于列表、导语与页面描述'),
    category: z.enum(['思考', '设计', '生活', '未分类']),
    publishedAt: z.coerce.date(),
    featured: z.boolean().default(false).describe('是否为精选文章'),
    draft: z.boolean().default(false).describe('草稿仅在开发环境中显示'),
  }),
});

export const collections = { notes };
