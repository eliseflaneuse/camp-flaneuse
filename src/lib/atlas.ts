/**
 * Camp Flaneuse — Road Atlas helpers
 *
 * The Atlas is real geography (unlike the hand-drawn camp map,
 * which is imaginary navigation). Any non-draft field note with
 * atlas.lat/lng becomes a pin and a place card on /atlas.
 *
 * Places are language-agnostic: the Atlas shows every place once,
 * preferring the current language's version of the note when a
 * translation exists, and falling back to the other language
 * (with a small hint on the card) when it doesn't.
 */

import { getCollection } from 'astro:content';
import type { Lang } from './i18n';
import { slugFromId, type FieldNote } from './content';
import { detailPaths } from './i18n';

export type PlaceType =
  | 'motorhome-stop'
  | 'campsite'
  | 'nature'
  | 'museum'
  | 'town'
  | 'walk'
  | 'food'
  | 'bookshop'
  | 'viewpoint'
  | 'other';

export const placeTypeLabels: Record<Lang, Record<PlaceType, string>> = {
  en: {
    'motorhome-stop': 'Motorhome stop',
    campsite: 'Campsite',
    nature: 'Nature',
    museum: 'Museum',
    town: 'Town',
    walk: 'Walk',
    food: 'Food',
    bookshop: 'Bookshop',
    viewpoint: 'Viewpoint',
    other: 'Other',
  },
  pt: {
    'motorhome-stop': 'Parada de motorhome',
    campsite: 'Camping',
    nature: 'Natureza',
    museum: 'Museu',
    town: 'Vilarejo',
    walk: 'Caminhada',
    food: 'Comida',
    bookshop: 'Livraria',
    viewpoint: 'Mirante',
    other: 'Outro',
  },
};

interface AtlasStrings {
  free: string;
  overnight: string;
  favorite: string;
  wouldReturn: string;
  catFriendly: string;
  publicParking: string;
  approximate: string;
  goodFor: string;
  visited: string;
  inOtherLanguage: string;
  lantern: string;
  lanterns: string;
}

export const badgeLabels: Record<Lang, AtlasStrings> = {
  en: {
    free: 'Free',
    overnight: 'Overnight OK',
    favorite: '♥ Favorite',
    wouldReturn: 'Would return',
    catFriendly: 'Cat-approved',
    publicParking: 'Public parking',
    approximate: '≈ approximate area',
    goodFor: 'Tips',
    visited: 'Visited',
    inOtherLanguage: 'note in Portuguese',
    lantern: 'lantern',
    lanterns: 'lanterns',
  },
  pt: {
    free: 'Grátis',
    overnight: 'Pernoite OK',
    favorite: '♥ Lugar do coração',
    wouldReturn: 'Voltaria',
    catFriendly: 'Aprovado pelos gatos',
    publicParking: 'Estacionamento público',
    approximate: '≈ área aproximada',
    goodFor: 'Dicas',
    visited: 'Visitado em',
    inOtherLanguage: 'nota em inglês',
    lantern: 'lanterna',
    lanterns: 'lanternas',
  },
};

/** "★★★★★ · 5 lanterns" — for atlas cards and map popups. */
export function ratingLine(rating: number, lang: Lang): string {
  const s = badgeLabels[lang];
  const word = rating === 1 ? s.lantern : s.lanterns;
  return `${'★'.repeat(rating)} · ${rating} ${word}`;
}

/** "2026-07" → "July 2026" / "julho de 2026" */
export function formatVisited(visited: string, lang: Lang): string {
  const date = new Date(`${visited}-01T12:00:00`);
  if (Number.isNaN(date.valueOf())) return visited;
  return new Intl.DateTimeFormat(lang === 'pt' ? 'pt-BR' : 'en-GB', {
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/** URL of a note's page, in the note's own language. */
export function noteUrl(note: FieldNote): string {
  return `${detailPaths.fieldNotes[note.data.language]}${slugFromId(note.id)}/`;
}

/**
 * All atlas places for a language page: one entry per place,
 * preferring the requested language's note when both exist.
 */
export async function getAtlasNotes(lang: Lang): Promise<FieldNote[]> {
  const all = await getCollection(
    'field-notes',
    ({ data }) => !data.draft && data.atlas !== undefined,
  );

  const byPlace = new Map<string, FieldNote>();
  for (const note of all) {
    // Notes translated from one another share a translationKey;
    // untranslated notes stand alone under their own id.
    const key = note.data.translationKey ?? note.id;
    const existing = byPlace.get(key);
    if (!existing || note.data.language === lang) {
      if (!existing || existing.data.language !== lang) {
        byPlace.set(key, note);
      }
    }
  }

  return [...byPlace.values()].sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
}
