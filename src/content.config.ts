import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Field Notes — the journal.
 * Files live in src/content/field-notes/<lang>/<slug>.md
 */
const fieldNotes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/field-notes' }),
  schema: ({ image }) =>
    z.object({
    title: z.string(),
    date: z.coerce.date(),
    location: z.string().optional(),
    category: z.enum(['road', 'creature', 'studio', 'camp', 'weather', 'reading', 'art']),
    excerpt: z.string(),
    tags: z.array(z.string()).optional(),
    language: z.enum(['en', 'pt']),
    /** Connects translations of the same note across languages. */
    translationKey: z.string().optional(),
    /** Small photo shown as a stamp on the note's card. Relative path, e.g. "./verteuil-aire-ember.jpg" */
    coverImage: image().optional(),
    coverAlt: z.string().optional(),
    draft: z.boolean().default(false),
    /** 1–5 lanterns. Optional; mostly for road/place notes. */
    rating: z.number().min(1).max(5).optional(),
    /**
     * Road Atlas metadata — real geography, optional.
     * A note with atlas.lat/lng appears on /atlas as a pin and a card.
     * exactPin defaults to false: pin the town, not the sleeping spot.
     */
    atlas: z
      .object({
        lat: z.number(),
        lng: z.number(),
        placeType: z.enum([
          'motorhome-stop',
          'campsite',
          'nature',
          'museum',
          'town',
          'walk',
          'food',
          'bookshop',
          'viewpoint',
          'other',
        ]),
        country: z.string().optional(),
        region: z.string().optional(),
        town: z.string().optional(),
        /** Year-month, e.g. "2026-07". */
        visited: z.string().optional(),
        overnight: z.boolean().optional(),
        free: z.boolean().optional(),
        favorite: z.boolean().optional(),
        wouldReturn: z.boolean().optional(),
        catFriendly: z.boolean().optional(),
        publicParking: z.boolean().optional(),
        exactPin: z.boolean().default(false),
        tips: z.array(z.string()).optional(),
      })
      .optional(),
  }),
});

/**
 * Campfire Stories — myths, ghost stories, fables, fragments,
 * and road folklore. Some stories did not happen exactly, but
 * they may still be true.
 * Files live in src/content/stories/<lang>/<slug>.md
 */
const stories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/stories' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.coerce.date(),
    excerpt: z.string(),
    storyType: z.enum(['myth', 'ghost-story', 'fable', 'fragment', 'road-folklore']),
    language: z.enum(['en', 'pt']),
    translationKey: z.string().optional(),
    /** Stories can arrive in parts: series groups them, part orders them. */
    series: z.string().optional(),
    part: z.number().int().positive().optional(),
    tags: z.array(z.string()).optional(),
    drawingPlaceholder: z.boolean().default(false),
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
    /**
     * A letter can carry a story (or anything else) as an enclosure —
     * the Society sends the letter, the fire keeps the story.
     */
    enclosure: z
      .object({
        title: z.string(),
        subtitle: z.string().optional(),
        url: z.string(),
      })
      .optional(),
  }),
});

export const collections = {
  'field-notes': fieldNotes,
  stories: stories,
  correspondence: correspondence,
};
