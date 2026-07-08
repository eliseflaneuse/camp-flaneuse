/**
 * Camp Flaneuse — content helpers
 *
 * Small utilities on top of Astro content collections so pages
 * stay simple. Entries live under `src/content/<collection>/<lang>/…`,
 * so an entry id looks like `en/the-camp-begins` — the slug used
 * in URLs is the id without the language folder.
 */

import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from './i18n';

export type FieldNote = CollectionEntry<'field-notes'>;
export type Letter = CollectionEntry<'correspondence'>;

/** `en/the-camp-begins` → `the-camp-begins` */
export function slugFromId(id: string): string {
  return id.split('/').slice(1).join('/');
}

/** All published field notes for a language, newest first. */
export async function getFieldNotes(lang: Lang): Promise<FieldNote[]> {
  const notes = await getCollection(
    'field-notes',
    ({ data }) => data.language === lang && !data.draft,
  );
  return notes.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** All published letters for a language, newest first. */
export async function getLetters(lang: Lang): Promise<Letter[]> {
  const letters = await getCollection(
    'correspondence',
    ({ data }) => data.language === lang && !data.draft,
  );
  return letters.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/**
 * Find the translation of an entry in the other language, if one
 * exists. Entries are connected by their shared `translationKey`.
 * Returns undefined when a post has not been translated — the site
 * must keep working either way.
 */
export async function findFieldNoteTranslation(
  note: FieldNote,
  targetLang: Lang,
): Promise<FieldNote | undefined> {
  if (!note.data.translationKey) return undefined;
  const candidates = await getCollection(
    'field-notes',
    ({ data }) =>
      data.language === targetLang &&
      data.translationKey === note.data.translationKey &&
      !data.draft,
  );
  return candidates[0];
}

export async function findLetterTranslation(
  letter: Letter,
  targetLang: Lang,
): Promise<Letter | undefined> {
  if (!letter.data.translationKey) return undefined;
  const candidates = await getCollection(
    'correspondence',
    ({ data }) =>
      data.language === targetLang &&
      data.translationKey === letter.data.translationKey &&
      !data.draft,
  );
  return candidates[0];
}
