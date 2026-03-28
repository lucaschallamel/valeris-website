// Podcast Series Definitions
// Each podcast from The Camel Hall has a slug, display name, description, and colour

export interface Podcast {
  slug: string;
  name: string;
  descriptions: { fr: string; de: string; en: string; it: string };
  substackUrl: string;
}

export const podcasts: Podcast[] = [
  {
    slug: 'the-aim',
    name: 'The AIM',
    descriptions: {
      en: 'The Augmented Intelligence Monitor guides you through the existential questions raised by AI. Exploring the profound implications artificial intelligence will have on our lives, businesses, and society.',
      fr: 'The Augmented Intelligence Monitor vous guide à travers les questions existentielles soulevées par l\'IA. Explorant les implications profondes de l\'intelligence artificielle sur nos vies, nos entreprises et notre société.',
      de: 'The Augmented Intelligence Monitor führt Sie durch die existenziellen Fragen der KI. Eine Erkundung der tiefgreifenden Auswirkungen künstlicher Intelligenz auf unser Leben, unsere Unternehmen und unsere Gesellschaft.',
      it: 'The Augmented Intelligence Monitor vi guida attraverso le questioni esistenziali sollevate dall\'IA. Esplorando le profonde implicazioni dell\'intelligenza artificiale sulla nostra vita, le nostre imprese e la nostra società.',
    },
    substackUrl: 'https://thecamelhall.substack.com/s/the-aim',
  },
  {
    slug: 'drive-and-thrive',
    name: 'Drive & Thrive',
    descriptions: {
      en: 'A transformative podcast exploring ethical leadership and high-performance strategies, blending personal wisdom with professional insights for business success.',
      fr: 'Un podcast transformateur explorant le leadership éthique et les stratégies de haute performance, mêlant sagesse personnelle et perspectives professionnelles pour réussir en affaires.',
      de: 'Ein transformativer Podcast über ethische Führung und Hochleistungsstrategien, der persönliche Weisheit mit professionellen Erkenntnissen für geschäftlichen Erfolg verbindet.',
      it: 'Un podcast trasformativo che esplora la leadership etica e le strategie ad alte prestazioni, combinando saggezza personale e intuizioni professionali per il successo aziendale.',
    },
    substackUrl: 'https://thecamelhall.substack.com/s/drive-and-thrive',
  },
  {
    slug: 'the-switch',
    name: 'The Switch',
    descriptions: {
      en: 'Your ultimate guide to understanding, improving, and leveraging the incredible potential of your mindset. Equipping you with knowledge and tools to achieve breakthrough personal and professional growth.',
      fr: 'Votre guide pour comprendre, améliorer et exploiter l\'incroyable potentiel de votre état d\'esprit. Des connaissances et des outils pour une croissance personnelle et professionnelle décisive.',
      de: 'Ihr ultimativer Leitfaden zum Verständnis, zur Verbesserung und zur Nutzung des unglaublichen Potenzials Ihres Mindsets. Wissen und Werkzeuge für bahnbrechendes persönliches und berufliches Wachstum.',
      it: 'La vostra guida definitiva per comprendere, migliorare e sfruttare l\'incredibile potenziale della vostra mentalità. Conoscenze e strumenti per una crescita personale e professionale decisiva.',
    },
    substackUrl: 'https://thecamelhall.substack.com/s/the-switch',
  },
  {
    slug: 'sustainics',
    name: 'Sustain.ics',
    descriptions: {
      en: 'Exploring sustainable living through nutrition, construction, gardening, and our interactions with flora and fauna. How these interconnect with personal life, mindset, and leadership.',
      fr: 'Explorer la vie durable à travers la nutrition, la construction, le jardinage et nos interactions avec la faune et la flore. Comment ces éléments s\'interconnectent avec notre vie personnelle, notre état d\'esprit et notre leadership.',
      de: 'Nachhaltiges Leben erkunden durch Ernährung, Bauen, Gärtnern und unsere Interaktionen mit Flora und Fauna. Wie diese mit dem persönlichen Leben, der Denkweise und der Führung zusammenhängen.',
      it: 'Esplorare la vita sostenibile attraverso l\'alimentazione, la costruzione, il giardinaggio e le nostre interazioni con la flora e la fauna. Come questi elementi si interconnettono con la vita personale, la mentalità e la leadership.',
    },
    substackUrl: 'https://thecamelhall.substack.com/s/sustainics',
  },
  {
    slug: 'kind-mind',
    name: 'Kind Mind',
    descriptions: {
      en: 'Exploring a framework for personal growth and societal progress built on Kinship, Inclusiveness, Nurturance, Discipline, Mindfulness, Integrity, Naturalism, and Discernment.',
      fr: 'Explorer un cadre de croissance personnelle et de progrès social fondé sur la parenté, l\'inclusivité, la bienveillance, la discipline, la pleine conscience, l\'intégrité, le naturalisme et le discernement.',
      de: 'Ein Rahmenwerk für persönliches Wachstum und gesellschaftlichen Fortschritt, aufgebaut auf Verwandtschaft, Inklusion, Fürsorglichkeit, Disziplin, Achtsamkeit, Integrität, Naturalismus und Urteilsvermögen.',
      it: 'Esplorare un quadro di crescita personale e progresso sociale fondato su parentela, inclusività, premura, disciplina, consapevolezza, integrità, naturalismo e discernimento.',
    },
    substackUrl: 'https://thecamelhall.substack.com/s/kind-mind',
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
