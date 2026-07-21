/**
 * Camp Flaneuse — public contact addresses and the newsletter endpoint.
 *
 * These are Zoho aliases that land in one mailbox but carry different
 * public roles. Centralized here so no page hardcodes an address.
 *
 * Deliberately NOT included here (and never to be published):
 *   - elai@campflaneuse.com          (account/admin/private)
 *   - correspondence@letters.campflaneuse.com  (Buttondown sending
 *     infrastructure only — not a mailbox, never a mailto)
 */
import type { Lang } from './i18n';

export interface ContactAddress {
  email: string;
  /** In-world identity of whoever reads this desk. */
  displayName: string;
  /** Pre-filled mailto subject, per language. */
  subject: Record<Lang, string>;
}

export const contactAddresses = {
  general: {
    email: 'hello@campflaneuse.com',
    displayName: 'Camp Flaneuse',
    subject: {
      en: 'A note for Camp Flaneuse',
      pt: 'Um recado para o Acampamento Flaneuse',
    },
  },
  correspondence: {
    email: 'correspondence@campflaneuse.com',
    displayName: 'Correspondence Desk — Soft Footsteps Society',
    subject: {
      en: 'Correspondence for the Soft Footsteps Society',
      pt: 'Correspondência para a Sociedade dos Passos Suaves',
    },
  },
  professor: {
    email: 'professor@campflaneuse.com',
    displayName: 'Professor Emberroot',
    subject: {
      en: 'For Professor Emberroot',
      pt: 'Para o Professor Emberroot',
    },
  },
  studio: {
    email: 'studio@campflaneuse.com',
    displayName: 'Flaneuse Studio',
    subject: {
      en: 'Flaneuse Studio enquiry',
      pt: 'Contato para o Flaneuse Studio',
    },
  },
} as const satisfies Record<string, ContactAddress>;

export type ContactKey = keyof typeof contactAddresses;

/** A safe mailto: link with a URL-encoded, language-aware subject. */
export function mailtoLink(key: ContactKey, lang: Lang): string {
  const { email, subject } = contactAddresses[key];
  return `mailto:${email}?subject=${encodeURIComponent(subject[lang])}`;
}

/**
 * Buttondown — "Correspondence from the Soft Footsteps Society".
 * The embedded form needs no API key. The public page is a fallback
 * archive; campflaneuse.com stays the canonical home for letters.
 */
export const newsletter = {
  action: 'https://buttondown.com/api/emails/embed-subscribe/campflaneuse',
  publicPage: 'https://buttondown.com/campflaneuse',
} as const;
