import fr from './fr.json';
import de from './de.json';
import en from './en.json';

export const languages = {
  fr: 'Francais',
  de: 'Deutsch',
  en: 'English',
} as const;

export const defaultLang = 'fr' as const;

export type Lang = keyof typeof languages;

const translations = { fr, de, en } as const;

export function t(lang: Lang) {
  return translations[lang];
}

export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split('/');
  if (segment === 'de' || segment === 'en') return segment;
  return defaultLang;
}

/** Route map for language switching. FR pages live at root, DE/EN under their prefix. */
const routeMap: Record<string, Record<Lang, string>> = {
  '/': { fr: '/', de: '/de/', en: '/en/' },
  '/services/': { fr: '/services/', de: '/de/leistungen/', en: '/en/services/' },
  '/services/gouvernance-ia/': { fr: '/services/gouvernance-ia/', de: '/de/leistungen/ki-governance/', en: '/en/services/ai-governance/' },
  '/services/performance-equipes/': { fr: '/services/performance-equipes/', de: '/de/leistungen/team-performance/', en: '/en/services/team-performance/' },
  '/services/coaching-executif/': { fr: '/services/coaching-executif/', de: '/de/leistungen/executive-coaching/', en: '/en/services/executive-coaching/' },
  '/a-propos/': { fr: '/a-propos/', de: '/de/ueber-mich/', en: '/en/about/' },
  '/contact/': { fr: '/contact/', de: '/de/kontakt/', en: '/en/contact/' },
  '/mentions-legales/': { fr: '/mentions-legales/', de: '/de/impressum/', en: '/en/legal/' },
};

/** Get the equivalent URL for a different language. */
export function getLocalePath(currentPath: string, targetLang: Lang): string {
  // Look up in route map by matching any language variant
  for (const [, paths] of Object.entries(routeMap)) {
    for (const [, path] of Object.entries(paths)) {
      if (path === currentPath || path === currentPath + '/') {
        return paths[targetLang];
      }
    }
  }

  // Fallback: swap or add locale prefix
  const withoutLocale = currentPath.replace(/^\/(de|en)/, '');
  if (targetLang === 'fr') return withoutLocale || '/';
  return `/${targetLang}${withoutLocale}`;
}
