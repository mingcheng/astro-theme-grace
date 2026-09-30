import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const notes = defineCollection({
  // 文件名即 URL：src/content/notes/designing-for-calm.md → /notes/designing-for-calm
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string().min(10),
    category: z.enum(['思考', '设计', '生活']),
    publishedAt: z.coerce.date(),
    readingMinutes: z.number().int().positive(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { notes };
