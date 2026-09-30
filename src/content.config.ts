import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const notes = defineCollection({
  // 文件名即 URL：src/content/notes/designing-for-calm.md → /notes/designing-for-calm
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string().min(10).default('').describe('文章摘要'),
    category: z.enum(['思考', '设计', '生活', '未分类']),
    publishedAt: z.coerce.date(),
    featured: z.boolean().default(false).describe('是否为精选文章'),
  }),
});

export const collections = { notes };
