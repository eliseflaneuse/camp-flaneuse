/**
 * Camp Flaneuse — i18n
 *
 * English is the default language (routes at `/`), Portuguese lives
 * under `/pt/`. All translatable UI strings live here so components
 * never hard-code visible text. Page copy lives in the pages
 * themselves; post/letter copy lives in the content collections.
 */

export type Lang = 'en' | 'pt';

export const languages: Record<Lang, string> = {
  en: 'English',
  pt: 'Português',
};

/**
 * Route map: every named page in both languages.
 * The language switcher uses this to find "the same room, other door".
 */
export const routes = {
  home: { en: '/', pt: '/pt/' },
  about: { en: '/about/', pt: '/pt/sobre/' },
  fieldNotes: { en: '/field-notes/', pt: '/pt/notas-de-campo/' },
  atlas: { en: '/atlas/', pt: '/pt/atlas/' },
  stories: { en: '/stories/', pt: '/pt/historias/' },
  /* The Correspondence Desk lives inside the Society — letters are
     rooms within it, at /soft-footsteps-society/no-001 etc. */
  softFootsteps: {
    en: '/soft-footsteps-society/',
    pt: '/pt/sociedade-dos-passos-suaves/',
  },
  studio: { en: '/studio/', pt: '/pt/estudio/' },
  contact: { en: '/contact/', pt: '/pt/contato/' },
} as const;

export type RouteKey = keyof typeof routes;

/** UI strings used by shared components. */
export const ui = {
  en: {
    siteName: 'Camp Flaneuse',
    tagline: 'A moving camp for field notes, letters, soft rebellion, and wonder.',
    skipToContent: 'Skip to content',
    nav: {
      fieldNotes: 'Field Notes',
      atlas: 'Atlas',
      stories: 'Stories',
      studio: 'Studio',
      about: 'About',
      contact: 'Contact',
      softFootsteps: 'Soft Footsteps Society',
      home: 'Camp',
    },
    readNote: 'Read the note',
    readLetter: 'Read the letter',
    readStory: 'Read the story',
    backToStories: 'Back to the campfire',
    enclosed: 'Enclosed with this correspondence',
    filedUnder: 'Filed under',
    location: 'Location',
    date: 'Date',
    tags: 'Tags',
    previousNote: 'Previous note',
    nextNote: 'Next note',
    backToFieldNotes: 'Back to the field notes',
    backToCorrespondence: 'Back to the correspondence desk',
    onlyInLanguage: 'This note currently exists only in English.',
    languageSwitch: 'Language',
    footerNote: 'Written from the road, wherever the road currently is.',
    allRightsReserved: 'Camp Flaneuse. Some rights reserved, most things shared.',
    drawingPlaceholder: 'Drawing to be added here.',
    photoPlaceholder: 'Photograph to be added here.',
    newsletter: {
      heading: 'Receive letters from the Society',
      body: 'Stories, drawings, field notes, maps, misplaced creatures, and reports sent from Camp Flaneuse.',
      emailLabel: 'Your email address',
      placeholder: 'you@example.com',
      button: 'Join the correspondence',
      confirmation:
        'You will be asked to confirm your address. Letters arrive only when there is something worth carrying. Unsubscribe at any time.',
      done: 'Almost there. A confirmation letter is on its way to your inbox — open it and click the link inside, and the correspondence begins.',
    },
  },
  pt: {
    siteName: 'Camp Flaneuse',
    tagline: 'Um acampamento em movimento para notas de campo, cartas, rebeldia mansa e espanto.',
    skipToContent: 'Pular para o conteúdo',
    nav: {
      fieldNotes: 'Notas de Campo',
      atlas: 'Atlas',
      stories: 'Histórias',
      studio: 'Estúdio',
      about: 'Sobre',
      contact: 'Contato',
      softFootsteps: 'Sociedade dos Passos Suaves',
      home: 'Acampamento',
    },
    readNote: 'Ler a nota',
    readLetter: 'Ler a carta',
    readStory: 'Ler a história',
    backToStories: 'Voltar à fogueira',
    enclosed: 'Junto com esta correspondência',
    filedUnder: 'Arquivado em',
    location: 'Local',
    date: 'Data',
    tags: 'Etiquetas',
    previousNote: 'Nota anterior',
    nextNote: 'Próxima nota',
    backToFieldNotes: 'Voltar às notas de campo',
    backToCorrespondence: 'Voltar à mesa de correspondência',
    onlyInLanguage: 'Por enquanto, esta nota existe apenas em inglês.',
    languageSwitch: 'Idioma',
    footerNote: 'Escrito da estrada, onde quer que a estrada esteja agora.',
    allRightsReserved: 'Camp Flaneuse. Alguns direitos reservados, quase tudo compartilhado.',
    drawingPlaceholder: 'Um desenho vai morar aqui.',
    photoPlaceholder: 'Uma fotografia vai morar aqui.',
    newsletter: {
      heading: 'Receba cartas da Sociedade',
      body: 'Histórias, desenhos, notas de campo, mapas, criaturas extraviadas e relatos enviados do Acampamento Flaneuse.',
      emailLabel: 'Seu endereço de e-mail',
      placeholder: 'voce@exemplo.com',
      button: 'Entrar para a correspondência',
      confirmation:
        'Você receberá um e-mail para confirmar seu endereço. As cartas chegam apenas quando há algo que valha a pena carregar. Cancele quando quiser.',
      done: 'Quase lá. Uma carta de confirmação está a caminho da sua caixa de entrada — abra e clique no link dentro dela, e a correspondência começa.',
    },
  },
} as const;

export type FieldNoteCategory =
  | 'road'
  | 'creature'
  | 'studio'
  | 'camp'
  | 'weather'
  | 'reading'
  | 'art';

/** Human-readable category labels, per language. */
export const categoryLabels: Record<Lang, Record<FieldNoteCategory, string>> = {
  en: {
    road: 'Road Notes',
    creature: 'Creature Notes',
    studio: 'Studio Notes',
    camp: 'Camp Notes',
    weather: 'Weather Notes',
    reading: 'Reading Notes',
    art: 'Art Notes',
  },
  pt: {
    road: 'Notas de Estrada',
    creature: 'Notas de Criaturas',
    studio: 'Notas de Estúdio',
    camp: 'Notas de Acampamento',
    weather: 'Notas de Tempo',
    reading: 'Notas de Leitura',
    art: 'Notas de Arte',
  },
};

export type StoryType = 'myth' | 'ghost-story' | 'fable' | 'fragment' | 'road-folklore';

/** Human-readable story-type labels, per language. */
export const storyTypeLabels: Record<Lang, Record<StoryType, string>> = {
  en: {
    myth: 'Myth',
    'ghost-story': 'Ghost story',
    fable: 'Fable',
    fragment: 'Fragment',
    'road-folklore': 'Road folklore',
  },
  pt: {
    myth: 'Mito',
    'ghost-story': 'História de fantasma',
    fable: 'Fábula',
    fragment: 'Fragmento',
    'road-folklore': 'Folclore da estrada',
  },
};

/** "8 July 2026" / "8 de julho de 2026" */
export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'pt' ? 'pt-BR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/** Base path for a field note / letter / story detail page, per language. */
export const detailPaths = {
  fieldNotes: { en: '/field-notes/', pt: '/pt/notas-de-campo/' },
  stories: { en: '/stories/', pt: '/pt/historias/' },
  correspondence: {
    en: '/soft-footsteps-society/',
    pt: '/pt/sociedade-dos-passos-suaves/',
  },
} as const;
