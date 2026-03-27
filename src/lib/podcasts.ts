// Podcast Series Definitions
// Each podcast from The Camel Hall has a slug, display name, description, and colour

export interface Podcast {
  slug: string;
  name: string;
  descriptions: { fr: string; de: string; en: string };
  substackUrl: string;
}

export const podcasts: Podcast[] = [
  {
    slug: 'the-aim',
    name: 'The AIM',
    descriptions: {
      en: 'The Augmented Intelligence Monitor guides you through the existential questions raised by AI. Exploring the profound implications artificial intelligence will have on our lives, businesses, and society.',
      fr: 'The Augmented Intelligence Monitor vous guide a travers les questions existentielles soulevees par l\'IA. Explorant les implications profondes de l\'intelligence artificielle sur nos vies, nos entreprises et notre societe.',
      de: 'The Augmented Intelligence Monitor fuehrt Sie durch die existenziellen Fragen der KI. Eine Erkundung der tiefgreifenden Auswirkungen kuenstlicher Intelligenz auf unser Leben, unsere Unternehmen und unsere Gesellschaft.',
    },
    substackUrl: 'https://thecamelhall.substack.com/s/the-aim',
  },
  {
    slug: 'drive-and-thrive',
    name: 'Drive & Thrive',
    descriptions: {
      en: 'A transformative podcast exploring ethical leadership and high-performance strategies, blending personal wisdom with professional insights for business success.',
      fr: 'Un podcast transformateur explorant le leadership ethique et les strategies de haute performance, melant sagesse personnelle et perspectives professionnelles pour reussir en affaires.',
      de: 'Ein transformativer Podcast ueber ethische Fuehrung und Hochleistungsstrategien, der persoenliche Weisheit mit professionellen Erkenntnissen fuer geschaeftlichen Erfolg verbindet.',
    },
    substackUrl: 'https://thecamelhall.substack.com/s/drive-and-thrive',
  },
  {
    slug: 'the-switch',
    name: 'The Switch',
    descriptions: {
      en: 'Your ultimate guide to understanding, improving, and leveraging the incredible potential of your mindset. Equipping you with knowledge and tools to achieve breakthrough personal and professional growth.',
      fr: 'Votre guide pour comprendre, ameliorer et exploiter l\'incroyable potentiel de votre etat d\'esprit. Des connaissances et des outils pour une croissance personnelle et professionnelle decisive.',
      de: 'Ihr ultimativer Leitfaden zum Verstaendnis, zur Verbesserung und zur Nutzung des unglaublichen Potenzials Ihres Mindsets. Wissen und Werkzeuge fuer bahnbrechendes persoenliches und berufliches Wachstum.',
    },
    substackUrl: 'https://thecamelhall.substack.com/s/the-switch',
  },
  {
    slug: 'sustainics',
    name: 'Sustain.ics',
    descriptions: {
      en: 'Exploring sustainable living through nutrition, construction, gardening, and our interactions with flora and fauna. How these interconnect with personal life, mindset, and leadership.',
      fr: 'Explorer la vie durable a travers la nutrition, la construction, le jardinage et nos interactions avec la faune et la flore. Comment ces elements s\'interconnectent avec notre vie personnelle, notre etat d\'esprit et notre leadership.',
      de: 'Nachhaltiges Leben erkunden durch Ernaehrung, Bauen, Gaertnern und unsere Interaktionen mit Flora und Fauna. Wie diese mit dem persoenlichen Leben, der Denkweise und der Fuehrung zusammenhaengen.',
    },
    substackUrl: 'https://thecamelhall.substack.com/s/sustainics',
  },
  {
    slug: 'kind-mind',
    name: 'Kind Mind',
    descriptions: {
      en: 'Exploring a framework for personal growth and societal progress built on Kinship, Inclusiveness, Nurturance, Discipline, Mindfulness, Integrity, Naturalism, and Discernment.',
      fr: 'Explorer un cadre de croissance personnelle et de progres social fonde sur la parente, l\'inclusivite, la bienveillance, la discipline, la pleine conscience, l\'integrite, le naturalisme et le discernement.',
      de: 'Ein Rahmenwerk fuer persoenliches Wachstum und gesellschaftlichen Fortschritt, aufgebaut auf Verwandtschaft, Inklusion, Fuersorglichkeit, Disziplin, Achtsamkeit, Integritaet, Naturalismus und Urteilsvermoegen.',
    },
    substackUrl: 'https://thecamelhall.substack.com/s/sustainics',
  },
];

// Manual mapping: article slug -> podcast slug
// For articles that can't be auto-detected by keywords
const manualMapping: Record<string, string> = {
  'the-9-ai-conversations-people-avoid': 'the-aim',
  'your-consulting-firm-claims-to-be': 'drive-and-thrive',
  'the-byoa-manifesto-why-knowledge': 'the-aim',
  'the-end-of-technical-debt-as-we-know': 'drive-and-thrive',
  'ai-powered-content-analysis-means': 'the-aim',
  'meet-ollama-your-key-to-truly-open': 'the-aim',
  'ai-revolution-from-french-startups': 'the-aim',
  'from-hype-to-reality-how-to-run-a': 'the-aim',
  'introduction-to-ikigai-find-your': 'the-switch',
  'me-myself-and-my-shadow-the-art-of': 'the-switch',
  'know-thyself-the-path-to-self-awareness': 'the-switch',
  'a-grand-unification-theory-of-self': 'the-switch',
  'master-context-switching-the-vip': 'drive-and-thrive',
  'thinking-about-strategy-its-always': 'drive-and-thrive',
  'the-90-day-leadership-challenge-cracking': 'drive-and-thrive',
  'meet-the-stubborn-company-employer': 'drive-and-thrive',
  'food-as-medicine-and-for-social-change': 'sustainics',
  '8-good-reasons-to-visit-your-local': 'sustainics',
  'the-kind-mind-manifesto-transforming': 'kind-mind',
  'welcome-to-the-camel-hall': 'the-aim', // general intro, default to AIM
  // Manual posts (older than RSS feed limit)
  'the-4-pillars-of-high-performing': 'drive-and-thrive',
  'the-secret-of-peak-performance-why': 'drive-and-thrive',
  '6-effective-steps-for-flicking-the': 'the-switch',
  'invest-in-prime-real-estate-buy-yourself': 'the-switch',
  'the-inspiration-switch-how-to-turn': 'the-switch',
  'breaking-free-a-personal-journey': 'the-switch',
  'what-the-a-in-ai-should-stand-for-57c': 'the-aim',
  'ai-advancements-ethical-dilemmas-0e5': 'the-aim',
  'ai-for-good-the-battle-for-accessible-50a': 'the-aim',
  'ai-revolution-from-magnets-to-movies-4cc': 'the-aim',
  'the-forgotten-art-of-mending-rekindle': 'sustainics',
};

// Keyword-based fallback detection for new articles
const keywordMap: [string[], string][] = [
  [['ai', 'artificial intelligence', 'machine learning', 'llm', 'gpt', 'tech', 'consulting', 'digital'], 'the-aim'],
  [['leadership', 'strategy', 'management', 'business', 'career', 'team', 'performance'], 'drive-and-thrive'],
  [['mindset', 'ikigai', 'self-awareness', 'shadow', 'consciousness', 'psychology'], 'the-switch'],
  [['sustainable', 'food', 'garden', 'environment', 'vegan', 'nutrition', 'market'], 'sustainics'],
  [['kind', 'mind', 'kindness', 'inclusiveness', 'mindfulness', 'compassion'], 'kind-mind'],
];

export function detectPodcast(articleSlug: string, title: string): string {
  // Check manual mapping first
  if (manualMapping[articleSlug]) {
    return manualMapping[articleSlug];
  }

  // Keyword-based detection
  const lowerTitle = title.toLowerCase();
  for (const [keywords, podcastSlug] of keywordMap) {
    if (keywords.some((kw) => lowerTitle.includes(kw))) {
      return podcastSlug;
    }
  }

  // Default
  return 'the-aim';
}

export function getPodcast(slug: string): Podcast | undefined {
  return podcasts.find((p) => p.slug === slug);
}
