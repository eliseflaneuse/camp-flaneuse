import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Field Notes — the journal.
 * Files live in src/content/field-notes/<lang>/<slug>.md
 */
const fieldNotes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/field-notes' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    location: z.string().optional(),
    category: z.enum(['road', 'creature', 'studio', 'camp', 'weather', 'reading', 'art']),
    excerpt: z.string(),
    tags: z.array(z.string()).optional(),
    language: z.enum(['en', 'pt']),
    /** Connects translations of the same note across languages. */
    translationKey: z.string().optional(),
    coverImage: z.string().optional(),
    coverAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

/**
 * Correspondence — letters from the road.
 * Files live in src/content/correspondence/<lang>/<slug>.md
 */
const correspondence = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/correspondence' }),
  schema: z.object({
    number: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.coerce.date(),
    location: z.string().optional(),
    excerpt: z.string(),
    language: z.enum(['en', 'pt']),
    translationKey: z.string().optional(),
    drawingPlaceholder: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  'field-notes': fieldNotes,
  correspondence: correspondence,
};
