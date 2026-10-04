import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const bio = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/bio' }),
  schema: z.object({
    title: z.string().min(1, 'عنوان الزامی است'),
    subtitle: z.string().optional(),
    order: z.number().int().optional(),
  }),
});

const memories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/memories' }),
  schema: z.object({
    title: z.string().min(1, 'عنوان خاطره الزامی است'),
    date: z.string().optional(),
    dateShamsi: z.string().optional(),
    location: z.string().optional(),
    media: z
      .object({
        type: z.enum(['image', 'video']),
        src: z.string(),
        alt: z.string().optional(),
        caption: z.string().optional(),
      })
      .optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().int().default(0),
  }),
});

const timeline = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/timeline' }),
  schema: z.object({
    title: z.string().min(1, 'عنوان رویداد الزامی است'),
    year: z.string().min(1, 'سال الزامی است'),
    yearGregorian: z.string().optional(),
    dateShamsi: z.string().optional(),
    category: z
      .enum(['birth', 'childhood', 'education', 'work', 'marriage', 'family', 'milestone', 'death', 'other'])
      .default('other'),
    icon: z.string().optional(),
    order: z.number().int().default(0),
  }),
});

export const collections = {
  bio,
  memories,
  timeline,
};