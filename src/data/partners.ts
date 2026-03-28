// Partner data for the Partners page
// Logos are in src/assets/logos/partners/ - Astro Image converts to WebP automatically

export interface Partner {
  slug: string;
  name: string;
  category: 'business' | 'technology' | 'tools' | 'certifications' | 'standards';
  url: string;
  logoPath: string;
  descriptions: { fr: string; de: string; en: string; it: string };
}

export const categories = {
  all: { fr: 'Tous', de: 'Alle', en: 'All', it: 'Tutti' },
  business: { fr: 'Business', de: 'Business', en: 'Business', it: 'Business' },
  technology: { fr: 'Technologie', de: 'Technologie', en: 'Technology', it: 'Tecnologia' },
  tools: { fr: 'Outils', de: 'Werkzeuge', en: 'Tools', it: 'Strumenti' },
  certifications: { fr: 'Certifications', de: 'Zertifizierungen', en: 'Certifications', it: 'Certificazioni' },
  standards: { fr: 'Standards', de: 'Standards', en: 'Standards', it: 'Standard' },
} as const;

export const partners: Partner[] = [
  // === Business ===
  {
    slug: 'talan',
    name: 'Talan SA',
    category: 'business',
    url: 'https://www.talan.com/global/en/talan-switzerland',
    logoPath: 'talan',
    descriptions: {
      fr: 'Groupe international de conseil et de technologie. 7 000+ collaborateurs, 20 pays. Partenaire historique pour la gouvernance IT, la transformation digitale et le conseil en intelligence artificielle.',
      de: 'Internationale Beratungs- und Technologiegruppe. 7 000+ Mitarbeitende, 20 Länder. Strategischer Partner für IT-Governance, digitale Transformation und KI-Beratung.',
      en: 'International consulting and technology group. 7,000+ employees, 20 countries. Strategic partner for IT governance, digital transformation and AI advisory.',
      it: 'Gruppo internazionale di consulenza e tecnologia. 7 000+ collaboratori, 20 paesi. Partner strategico per la governance IT, la trasformazione digitale e la consulenza in intelligenza artificiale.',
    },
  },
  {
    slug: 'regdata',
    name: 'RegData',
    category: 'business',
    url: 'https://www.regdata.ch',
    logoPath: 'regdata',
    descriptions: {
      fr: 'Spécialiste suisse de la protection des données et de la conformité réglementaire. Expertise en anonymisation, données synthétiques et gouvernance des données pour les secteurs régulés.',
      de: 'Schweizer Spezialist für Datenschutz und regulatorische Compliance. Expertise in Anonymisierung, synthetischen Daten und Daten-Governance für regulierte Branchen.',
      en: 'Swiss specialist in data protection and regulatory compliance. Expertise in anonymisation, synthetic data and data governance for regulated industries.',
      it: 'Specialista svizzero nella protezione dei dati e nella conformità regolamentare. Competenza in anonimizzazione, dati sintetici e governance dei dati per settori regolamentati.',
    },
  },
  // === Technology ===
  {
    slug: 'cloudflare',
    name: 'Cloudflare',
    category: 'technology',
    url: 'https://www.cloudflare.com',
    logoPath: 'cloudflare',
    descriptions: {
      fr: 'Infrastructure cloud mondiale. CDN, sécurité, hébergement de sites statiques (Pages), fonctions serverless (Workers), base de données (D1). Héberge valeris.fr.',
      de: 'Weltweite Cloud-Infrastruktur. CDN, Sicherheit, statisches Hosting (Pages), serverlose Funktionen (Workers), Datenbank (D1). Hostet valeris.fr.',
      en: 'Global cloud infrastructure. CDN, security, static site hosting (Pages), serverless functions (Workers), database (D1). Hosts valeris.fr.',
      it: 'Infrastruttura cloud globale. CDN, sicurezza, hosting di siti statici (Pages), funzioni serverless (Workers), database (D1). Ospita valeris.fr.',
    },
  },
  {
    slug: 'resend',
    name: 'Resend',
    category: 'technology',
    url: 'https://resend.com',
    logoPath: 'resend',
    descriptions: {
      fr: 'Plateforme d\'envoi d\'emails transactionnels pour développeurs. API moderne, délivrabilité optimisée, respect de la vie privée.',
      de: 'Transaktionale E-Mail-Plattform für Entwickler. Moderne API, optimierte Zustellbarkeit, Datenschutz.',
      en: 'Transactional email platform for developers. Modern API, optimised deliverability, privacy-respecting.',
      it: 'Piattaforma di email transazionali per sviluppatori. API moderna, deliverabilità ottimizzata, rispetto della privacy.',
    },
  },
  {
    slug: 'infomaniak',
    name: 'Infomaniak',
    category: 'technology',
    url: 'https://www.infomaniak.com',
    logoPath: 'infomaniak',
    descriptions: {
      fr: 'Hébergeur suisse indépendant. Domaines, messagerie (KSuite), cloud souverain. Registraire du domaine valeris.fr et fournisseur de messagerie professionnelle.',
      de: 'Unabhängiger Schweizer Hosting-Anbieter. Domains, E-Mail (KSuite), souveräne Cloud. Registrar der Domain valeris.fr und Anbieter der professionellen E-Mail.',
      en: 'Independent Swiss hosting provider. Domains, email (KSuite), sovereign cloud. Registrar for valeris.fr domain and professional email provider.',
      it: 'Provider di hosting svizzero indipendente. Domini, email (KSuite), cloud sovrano. Registrar del dominio valeris.fr e fornitore di email professionale.',
    },
  },
  {
    slug: 'azure',
    name: 'Microsoft Azure',
    category: 'technology',
    url: 'https://azure.microsoft.com',
    logoPath: 'azure',
    descriptions: {
      fr: 'Plateforme cloud enterprise. Azure AI Foundry, Entra ID, Microsoft Purview, Defender. Écosystème privilégié pour les déploiements IA en entreprise et la gouvernance des données.',
      de: 'Enterprise-Cloud-Plattform. Azure AI Foundry, Entra ID, Microsoft Purview, Defender. Bevorzugtes Ökosystem für KI-Deployments in Unternehmen und Daten-Governance.',
      en: 'Enterprise cloud platform. Azure AI Foundry, Entra ID, Microsoft Purview, Defender. Preferred ecosystem for enterprise AI deployments and data governance.',
      it: 'Piattaforma cloud enterprise. Azure AI Foundry, Entra ID, Microsoft Purview, Defender. Ecosistema privilegiato per i deployment IA aziendali e la governance dei dati.',
    },
  },
  {
    slug: 'apple',
    name: 'Apple',
    category: 'technology',
    url: 'https://www.apple.com',
    logoPath: 'apple',
    descriptions: {
      fr: 'Écosystème matériel et logiciel. Plateforme de développement et de productivité principale. Apple Silicon pour l\'inférence IA locale et le développement haute performance.',
      de: 'Hardware- und Software-Ökosystem. Primäre Entwicklungs- und Produktivitätsplattform. Apple Silicon für lokale KI-Inferenz und Hochleistungsentwicklung.',
      en: 'Hardware and software ecosystem. Primary development and productivity platform. Apple Silicon for local AI inference and high-performance development.',
      it: 'Ecosistema hardware e software. Piattaforma principale di sviluppo e produttività. Apple Silicon per l\'inferenza IA locale e lo sviluppo ad alte prestazioni.',
    },
  },
  {
    slug: 'astro',
    name: 'Astro',
    category: 'technology',
    url: 'https://astro.build',
    logoPath: 'astro',
    descriptions: {
      fr: 'Framework web moderne pour sites statiques haute performance. Zéro JavaScript par défaut, rendu côté serveur, optimisation automatique des images. Technologie qui propulse valeris.fr.',
      de: 'Modernes Web-Framework für leistungsstarke statische Websites. Standardmässig kein JavaScript, serverseitiges Rendering, automatische Bildoptimierung. Die Technologie hinter valeris.fr.',
      en: 'Modern web framework for high-performance static sites. Zero JavaScript by default, server-side rendering, automatic image optimisation. The technology powering valeris.fr.',
      it: 'Framework web moderno per siti statici ad alte prestazioni. Zero JavaScript di default, rendering lato server, ottimizzazione automatica delle immagini. La tecnologia che alimenta valeris.fr.',
    },
  },
  // === Tools ===
  {
    slug: 'opencode',
    name: 'OpenCode',
    category: 'tools',
    url: 'https://opencode.ai',
    logoPath: 'opencode',
    descriptions: {
      fr: 'CLI open source pour le développement assisté par IA. Interface unifiée pour orchestrer des agents IA spécialisés. Outil central de la méthodologie Coach-Craft.',
      de: 'Open-Source-CLI für KI-gestütztes Development. Einheitliche Schnittstelle zur Orchestrierung spezialisierter KI-Agenten. Zentrales Tool der Coach-Craft-Methodik.',
      en: 'Open source CLI for AI-assisted development. Unified interface for orchestrating specialised AI agents. Central tool in the Coach-Craft methodology.',
      it: 'CLI open source per lo sviluppo assistito dall\'IA. Interfaccia unificata per orchestrare agenti IA specializzati. Strumento centrale della metodologia Coach-Craft.',
    },
  },
  {
    slug: 'anthropic',
    name: 'Anthropic Claude',
    category: 'tools',
    url: 'https://www.anthropic.com',
    logoPath: 'anthropic',
    descriptions: {
      fr: 'Modèle de langage avancé (Claude). Raisonnement, analyse de code, génération de contenu, architecture de solutions. Modèle principal utilisé dans les engagements de coaching et de développement.',
      de: 'Fortschrittliches Sprachmodell (Claude). Reasoning, Code-Analyse, Content-Generierung, Lösungsarchitektur. Hauptmodell in Coaching- und Entwicklungsengagements.',
      en: 'Advanced language model (Claude). Reasoning, code analysis, content generation, solution architecture. Primary model used in coaching and development engagements.',
      it: 'Modello linguistico avanzato (Claude). Ragionamento, analisi del codice, generazione di contenuti, architettura delle soluzioni. Modello principale utilizzato negli ingaggi di coaching e sviluppo.',
    },
  },
  {
    slug: 'nvidia',
    name: 'NVIDIA',
    category: 'tools',
    url: 'https://www.nvidia.com',
    logoPath: 'nvidia',
    descriptions: {
      fr: 'Infrastructure GPU pour l\'IA. Accélération de l\'inférence et de l\'entraînement des modèles. Solutions on-premise (DGX) pour les déploiements souverains.',
      de: 'GPU-Infrastruktur für KI. Beschleunigung von Inferenz und Modelltraining. On-Premise-Lösungen (DGX) für souveräne Deployments.',
      en: 'GPU infrastructure for AI. Inference and model training acceleration. On-premise solutions (DGX) for sovereign deployments.',
      it: 'Infrastruttura GPU per l\'IA. Accelerazione dell\'inferenza e dell\'addestramento dei modelli. Soluzioni on-premise (DGX) per i deployment sovrani.',
    },
  },
  {
    slug: 'ollama',
    name: 'Ollama',
    category: 'tools',
    url: 'https://ollama.ai',
    logoPath: 'ollama',
    descriptions: {
      fr: 'Exécution locale de modèles de langage open source. Déploiement privé, sans dépendance cloud, latence minimale. Essentiel pour les architectures IA souveraines.',
      de: 'Lokale Ausführung von Open-Source-Sprachmodellen. Privater Betrieb, ohne Cloud-Abhängigkeit, minimale Latenz. Unverzichtbar für souveräne KI-Architekturen.',
      en: 'Local execution of open source language models. Private deployment, no cloud dependency, minimal latency. Essential for sovereign AI architectures.',
      it: 'Esecuzione locale di modelli linguistici open source. Deployment privato, senza dipendenza dal cloud, latenza minima. Essenziale per le architetture IA sovrane.',
    },
  },
  {
    slug: 'obsidian',
    name: 'Obsidian',
    category: 'tools',
    url: 'https://obsidian.md',
    logoPath: 'obsidian',
    descriptions: {
      fr: 'Système de gestion des connaissances en local. Base de connaissance personnelle, prise de notes structurée, intégration avec les workflows agentiques. Outil de productivité central.',
      de: 'Lokales Wissensmanagementsystem. Persönliche Wissensdatenbank, strukturierte Notizen, Integration mit agentischen Workflows. Zentrales Produktivitätswerkzeug.',
      en: 'Local knowledge management system. Personal knowledge base, structured note-taking, integration with agentic workflows. Core productivity tool.',
      it: 'Sistema di gestione della conoscenza in locale. Base di conoscenza personale, presa di appunti strutturata, integrazione con i workflow agentivi. Strumento di produttività centrale.',
    },
  },
  // === Certifications ===
  {
    slug: 'gaicc',
    name: 'GAICC',
    category: 'certifications',
    url: 'https://gaicc.org',
    logoPath: 'gaicc',
    descriptions: {
      fr: 'Global AI Competency Center. Organisation internationale de certification et de formation en intelligence artificielle. Standards de compétences IA reconnus mondialement.',
      de: 'Global AI Competency Center. Internationale Zertifizierungs- und Ausbildungsorganisation für künstliche Intelligenz. Weltweit anerkannte KI-Kompetenzstandards.',
      en: 'Global AI Competency Center. International AI certification and training organisation. Globally recognised AI competency standards.',
      it: 'Global AI Competency Center. Organizzazione internazionale di certificazione e formazione in intelligenza artificiale. Standard di competenza IA riconosciuti a livello mondiale.',
    },
  },
  {
    slug: 'iapp-aigp',
    name: 'IAPP AIGP',
    category: 'certifications',
    url: 'https://iapp.org/certify/aigp',
    logoPath: 'iapp',
    descriptions: {
      fr: 'International Association of Privacy Professionals. Certification AIGP (AI Governance Professional). Standard de référence pour la gouvernance responsable de l\'intelligence artificielle.',
      de: 'International Association of Privacy Professionals. AIGP-Zertifizierung (AI Governance Professional). Referenzstandard für verantwortungsvolle KI-Governance.',
      en: 'International Association of Privacy Professionals. AIGP certification (AI Governance Professional). Reference standard for responsible AI governance.',
      it: 'International Association of Privacy Professionals. Certificazione AIGP (AI Governance Professional). Standard di riferimento per la governance responsabile dell\'intelligenza artificiale.',
    },
  },
  // === Standards ===
  {
    slug: 'togaf',
    name: 'TOGAF - The Open Group',
    category: 'standards',
    url: 'https://www.opengroup.org/togaf',
    logoPath: 'togaf',
    descriptions: {
      fr: 'The Open Group Architecture Framework. Standard mondial pour l\'architecture d\'entreprise. Cadre méthodologique pour la conception, la planification et la gouvernance des architectures IT.',
      de: 'The Open Group Architecture Framework. Weltweiter Standard für Enterprise-Architektur. Methodisches Rahmenwerk für Design, Planung und Governance von IT-Architekturen.',
      en: 'The Open Group Architecture Framework. Global standard for enterprise architecture. Methodological framework for IT architecture design, planning and governance.',
      it: 'The Open Group Architecture Framework. Standard mondiale per l\'architettura enterprise. Quadro metodologico per la progettazione, la pianificazione e la governance delle architetture IT.',
    },
  },
  {
    slug: 'iso-42001',
    name: 'ISO 42001',
    category: 'standards',
    url: 'https://www.iso.org/standard/42001',
    logoPath: 'iso',
    descriptions: {
      fr: 'Norme internationale pour les systèmes de management de l\'intelligence artificielle (AIMS). Cadre de référence pour la gouvernance responsable de l\'IA, la gestion des risques et la conformité.',
      de: 'Internationaler Standard für KI-Managementsysteme (AIMS). Referenzrahmen für verantwortungsvolle KI-Governance, Risikomanagement und Compliance.',
      en: 'International standard for AI management systems (AIMS). Reference framework for responsible AI governance, risk management and compliance.',
      it: 'Standard internazionale per i sistemi di gestione dell\'intelligenza artificiale (AIMS). Quadro di riferimento per la governance responsabile dell\'IA, la gestione dei rischi e la conformità.',
    },
  },
  {
    slug: 'icf',
    name: 'ICF',
    category: 'certifications',
    url: 'https://coachingfederation.org',
    logoPath: 'icf',
    descriptions: {
      fr: 'International Coaching Federation. Organisation mondiale de référence pour le coaching professionnel. Standards éthiques, accréditation et développement continu des compétences de coaching.',
      de: 'International Coaching Federation. Weltweit führende Organisation für professionelles Coaching. Ethische Standards, Akkreditierung und kontinuierliche Entwicklung von Coaching-Kompetenzen.',
      en: 'International Coaching Federation. World\'s leading professional coaching organisation. Ethical standards, accreditation and continuous coaching competency development.',
      it: 'International Coaching Federation. Organizzazione mondiale di riferimento per il coaching professionale. Standard etici, accreditamento e sviluppo continuo delle competenze di coaching.',
    },
  },
];
