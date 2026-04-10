// Substack RSS Feed Parser
// Fetches and parses the RSS feed from The Camel Hall (Substack)
// Called at build time only - no runtime cost

import { detectPodcast } from './podcasts';

const SUBSTACK_FEED_URL = 'https://thecamelhall.substack.com/feed';

export interface SubstackPost {
  title: string;
  link: string;
  slug: string;
  pubDate: Date;
  description: string;
  content: string;
  imageUrl: string | null;
  podcastSlug: string;
}

function extractFirstImage(html: string): string | null {
  const match = html.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1] : null;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    // Decode numeric HTML entities (decimal &#127897; and hex &#x1F3A4;)
    .replace(/&#(\d+);/g, (_, code) => {
      const num = parseInt(code, 10);
      // Skip emoji and special Unicode chars that display poorly in excerpts
      if (num > 127) return '';
      return String.fromCharCode(num);
    })
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => {
      const num = parseInt(code, 16);
      if (num > 127) return '';
      return String.fromCharCode(num);
    })
    // Decode named HTML entities
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&ndash;/g, '-')
    .replace(/&mdash;/g, '-')
    .replace(/&hellip;/g, '...')
    .replace(/&nbsp;/g, ' ')
    .replace(/&[a-zA-Z]+;/g, '') // Remove any remaining named entities
    .replace(/\s+/g, ' ')
    .trim();
}

function extractBetweenTags(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`);
  const match = xml.match(regex);
  return match ? match[1].trim() : '';
}

function cleanTitle(title: string): string {
  return title
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(parseInt(code, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&[a-zA-Z]+;/g, '')
    .trim();
}

function extractSlug(url: string): string {
  return url.split('/').pop() || '';
}

// Articles older than the RSS feed limit (Substack serves only the 20 most recent).
// Add entries here for every article published, BEFORE it falls off the feed.
// See docs-valeris/operations/substack-integration.md for the maintenance routine.
const manualPosts: SubstackPost[] = [
  // --- Currently in RSS feed (backfilled 2026-04-10 to prevent rollover loss) ---
  {
    title: 'AI Love and the LLM Harness',
    link: 'https://thecamelhall.substack.com/p/ai-love-and-the-llm-harness',
    slug: 'ai-love-and-the-llm-harness',
    pubDate: new Date('2026-04-10T14:58:27Z'),
    description: 'How context engineers discipline the models they love.',
    content: '',
    imageUrl: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F383deb13-053f-4768-b0db-d8086266b6aa_1280x720.png',
    podcastSlug: 'the-aim',
  },
  {
    title: 'The 9 AI Conversations People Avoid',
    link: 'https://thecamelhall.substack.com/p/the-9-ai-conversations-people-avoid',
    slug: 'the-9-ai-conversations-people-avoid',
    pubDate: new Date('2026-03-06T13:06:16Z'),
    description: 'A field guide to the blockers between your AI proof of concept and production.',
    content: '',
    imageUrl: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd521fe85-d80d-425d-bdec-980bcd81963c_1280x720.jpeg',
    podcastSlug: 'the-aim',
  },
  {
    title: 'Your Consulting Firm Claims to Be AI-Augmented. That Is Exactly the Problem.',
    link: 'https://thecamelhall.substack.com/p/your-consulting-firm-claims-to-be',
    slug: 'your-consulting-firm-claims-to-be',
    pubDate: new Date('2026-02-21T10:37:20Z'),
    description: 'Drive & Thrive - Episode 009 - Why the badge of AI augmentation has become a warning sign for buyers, and what to look for instead.',
    content: '',
    imageUrl: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F08c7136c-6ff9-4134-ba79-c89f81a4a5fa_1280x720.png',
    podcastSlug: 'drive-and-thrive',
  },
  {
    title: 'The BYOA Manifesto: Why Knowledge Workers Must Own Their AI Agents',
    link: 'https://thecamelhall.substack.com/p/the-byoa-manifesto-why-knowledge',
    slug: 'the-byoa-manifesto-why-knowledge',
    pubDate: new Date('2026-02-14T10:25:20Z'),
    description: 'The AIM - Episode 010 - Bring Your Own Agent. A manifesto for knowledge workers who want to own the intelligence working on their behalf.',
    content: '',
    imageUrl: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb85653f8-833b-4710-afa4-fff76751f587_1280x720.jpeg',
    podcastSlug: 'the-aim',
  },
  {
    title: 'The End of Technical Debt (as we know it!)',
    link: 'https://thecamelhall.substack.com/p/the-end-of-technical-debt-as-we-know',
    slug: 'the-end-of-technical-debt-as-we-know',
    pubDate: new Date('2026-02-09T20:27:03Z'),
    description: 'Drive & Thrive - Episode 008 - How AI-assisted development is rewriting the economics of legacy code and what that means for engineering leaders.',
    content: '',
    imageUrl: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F730757cc-c421-46af-9e52-c7ee16ea008e_1280x720.heic',
    podcastSlug: 'drive-and-thrive',
  },
  {
    title: 'Introduction To Ikigai: Find Your Happiness Switch',
    link: 'https://thecamelhall.substack.com/p/introduction-to-ikigai-find-your',
    slug: 'introduction-to-ikigai-find-your',
    pubDate: new Date('2024-09-17T05:46:07Z'),
    description: 'The Switch - Episode 008 - Unlock true success and happiness in the modern world. Discover your Ikigai and flip the happiness switch daily.',
    content: '',
    imageUrl: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa57d9ccc-e5f0-468c-b5ed-a4ae23761808_1280x720.jpeg',
    podcastSlug: 'the-switch',
  },
  {
    title: 'Food as Medicine and for Social Change: Intentional Eating',
    link: 'https://thecamelhall.substack.com/p/food-as-medicine-and-for-social-change',
    slug: 'food-as-medicine-and-for-social-change',
    pubDate: new Date('2024-08-30T15:38:35Z'),
    description: 'Sustain.ics - Episode 003 - Revolutionise your plate, transform the planet. The power of intentional eating, from personal health to global sustainability.',
    content: '',
    imageUrl: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F95f25883-9537-4d80-a552-2fae429ef07d_1280x720.jpeg',
    podcastSlug: 'sustainics',
  },
  {
    title: 'Master Context Switching: The VIP Approach to Leadership Excellence',
    link: 'https://thecamelhall.substack.com/p/master-context-switching-the-vip',
    slug: 'master-context-switching-the-vip',
    pubDate: new Date('2024-08-25T18:33:14Z'),
    description: 'Drive & Thrive - Episode 006 - Ditch multitasking, embrace context switching. The VIP framework for dynamic leadership and better decision-making under load.',
    content: '',
    imageUrl: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3898526e-e917-40a9-bc58-3a8b90c0e737_1280x720.jpeg',
    podcastSlug: 'drive-and-thrive',
  },
  {
    title: 'AI-Powered Content Analysis: The Tech Intelligence Revolution',
    link: 'https://thecamelhall.substack.com/p/ai-powered-content-analysis-means',
    slug: 'ai-powered-content-analysis-means',
    pubDate: new Date('2024-08-21T04:00:42Z'),
    description: 'The AIM - Episode 008 (The Crunch) - Using frontier AI to analyse AI trends, fighting information overload with more AI. A monthly deep dive.',
    content: '',
    imageUrl: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F41dfd040-b2d1-411b-bdad-15cfd732814c_1280x720.jpeg',
    podcastSlug: 'the-aim',
  },
  {
    title: 'Meet Ollama: Your Key To Truly Open, Accessible and Private AI',
    link: 'https://thecamelhall.substack.com/p/meet-ollama-your-key-to-truly-open',
    slug: 'meet-ollama-your-key-to-truly-open',
    pubDate: new Date('2024-08-14T17:49:17Z'),
    description: 'The AIM - Episode 007 - Run powerful language models locally, privately, and for free. Experience AI without compromising privacy or breaking the bank.',
    content: '',
    imageUrl: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff1e89965-7474-4b21-a4ed-c162d245f7a5_1280x720.jpeg',
    podcastSlug: 'the-aim',
  },
  {
    title: 'Me, Myself, And My Shadow: The Art Of Self-Integration',
    link: 'https://thecamelhall.substack.com/p/me-myself-and-my-shadow-the-art-of',
    slug: 'me-myself-and-my-shadow-the-art-of',
    pubDate: new Date('2024-08-09T04:42:10Z'),
    description: 'The Switch - Episode 007 - Becoming your own best friend is the key to personal growth. Embrace your shadow, practice self-love, and transform.',
    content: '',
    imageUrl: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc3f29bb8-5c2f-4756-a98e-6c835c06fa7f_1280x720.jpeg',
    podcastSlug: 'the-switch',
  },
  {
    title: "Thinking about STRATEGY? It's Always Easier With A Bit Of SOAP!",
    link: 'https://thecamelhall.substack.com/p/thinking-about-strategy-its-always',
    slug: 'thinking-about-strategy-its-always',
    pubDate: new Date('2024-08-03T16:12:49Z'),
    description: 'Drive & Thrive - Episode 005 - Master strategic thinking with SOAP, a powerful framework for crafting and communicating business strategy.',
    content: '',
    imageUrl: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4396dd60-bc06-4086-8cbb-4e48d476df9d_1280x720.jpeg',
    podcastSlug: 'drive-and-thrive',
  },
  {
    title: '8 Good Reasons To Visit Your Local Market (Weekly)',
    link: 'https://thecamelhall.substack.com/p/8-good-reasons-to-visit-your-local',
    slug: '8-good-reasons-to-visit-your-local',
    pubDate: new Date('2024-08-02T15:49:30Z'),
    description: 'Sustain.ics - Episode 002 - Fresh produce, vibrant community, eco-friendly shopping. Why the local market beats the supermarket every time.',
    content: '',
    imageUrl: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3fa021c9-1b27-4ca4-84b0-583f85682585_1280x720.jpeg',
    podcastSlug: 'sustainics',
  },
  {
    title: 'The 90-Day Leadership Challenge: Cracking the Code for New Job Success',
    link: 'https://thecamelhall.substack.com/p/the-90-day-leadership-challenge-cracking',
    slug: 'the-90-day-leadership-challenge-cracking',
    pubDate: new Date('2024-07-26T10:49:05Z'),
    description: 'Drive & Thrive - Episode 004 - Master your first 90 days in a new role. Key strategies for immediate impact and long-term success.',
    content: '',
    imageUrl: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff36a6c11-4d58-48b4-bb3b-8ef1ca9b82bb_1280x720.jpeg',
    podcastSlug: 'drive-and-thrive',
  },
  {
    title: 'Know Thyself: The Path To Self-Awareness Made In Switzerland',
    link: 'https://thecamelhall.substack.com/p/know-thyself-the-path-to-self-awareness',
    slug: 'know-thyself-the-path-to-self-awareness',
    pubDate: new Date('2024-07-23T07:00:18Z'),
    description: 'The Switch - Episode 006 - The science of self-discovery from Jung to modern tests. You are more than a type, keep exploring and keep growing.',
    content: '',
    imageUrl: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdab25521-8ece-4ffd-bfb6-4a2957b4463d_1280x720.jpeg',
    podcastSlug: 'the-switch',
  },
  {
    title: 'A Grand Unification Theory of Self: Bridging Ancient Wisdoms and Modern Science',
    link: 'https://thecamelhall.substack.com/p/a-grand-unification-theory-of-self',
    slug: 'a-grand-unification-theory-of-self',
    pubDate: new Date('2024-07-21T15:00:23Z'),
    description: 'The Switch - Episode 005 - The philosophy behind The Switch. How personal growth connects mind, body, and ancient wisdom traditions.',
    content: '',
    imageUrl: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1230133e-d5ad-4cdb-9d3e-5cd32a6b67a2_1280x720.jpeg',
    podcastSlug: 'the-switch',
  },
  {
    title: 'AI Revolution: From French Startups Genius to Tech Giants Environmental Cost',
    link: 'https://thecamelhall.substack.com/p/ai-revolution-from-french-startups',
    slug: 'ai-revolution-from-french-startups',
    pubDate: new Date('2024-07-15T05:16:01Z'),
    description: 'The AIM - Episode 006 (The Crunch) - French startup Moshi revolutionises conversational AI. Grok raises environmental concerns. A crunch roundup.',
    content: '',
    imageUrl: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F16f90035-9e1c-43ed-a0ad-0ee0dc30b038_1280x720.jpeg',
    podcastSlug: 'the-aim',
  },
  {
    title: 'Welcome to the Camel Hall',
    link: 'https://thecamelhall.substack.com/p/welcome-to-the-camel-hall',
    slug: 'welcome-to-the-camel-hall',
    pubDate: new Date('2024-07-14T13:47:47Z'),
    description: 'Introducing 5 new podcasts for 2024. Seizing the day with aspirations turned into action. A welcome from The Camel Hall.',
    content: '',
    imageUrl: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F00bb370d-2d8e-43c7-975e-2646e790d036_1280x720.png',
    podcastSlug: 'the-aim',
  },
  {
    title: 'The Kind Mind Manifesto: Transforming Our World One Thought at a Time',
    link: 'https://thecamelhall.substack.com/p/the-kind-mind-manifesto-transforming',
    slug: 'the-kind-mind-manifesto-transforming',
    pubDate: new Date('2024-07-13T15:54:07Z'),
    description: 'Kind Mind - Episode 001 - A framework for personal growth and societal progress. Combining kindness with intellectual development.',
    content: '',
    imageUrl: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8c12eb19-c15c-487b-9416-78b057bca48a_1280x720.png',
    podcastSlug: 'kind-mind',
  },
  {
    title: 'From Hype To Reality: How to Run a Successful Generative AI Proof of Concept',
    link: 'https://thecamelhall.substack.com/p/from-hype-to-reality-how-to-run-a',
    slug: 'from-hype-to-reality-how-to-run-a',
    pubDate: new Date('2024-07-12T04:59:58Z'),
    description: 'The AIM - Episode 005 - Navigating the generative AI hype. Strategic insights for running effective proofs of concept and proofs of value.',
    content: '',
    imageUrl: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8b05fbc7-9ca6-4453-8142-246b7acf0bc7_1280x720.jpeg',
    podcastSlug: 'the-aim',
  },
  // --- Drive & Thrive (ep.001-002) ---
  {
    title: 'The 4 Pillars of High-Performing Teams',
    link: 'https://thecamelhall.substack.com/p/the-4-pillars-of-high-performing',
    slug: 'the-4-pillars-of-high-performing',
    pubDate: new Date('2024-06-15T12:00:00Z'),
    description: 'Drive & Thrive - Episode 001 - What separates good teams from great ones? Explore the four foundational pillars that drive sustained high performance.',
    content: '',
    imageUrl: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdf0cd7e8-4d77-4a7d-b935-ac45f069587c_1280x720.jpeg',
    podcastSlug: 'drive-and-thrive',
  },
  {
    title: 'The Secret of Peak Performance: Why You Need to Take Your MEDS!',
    link: 'https://thecamelhall.substack.com/p/the-secret-of-peak-performance-why',
    slug: 'the-secret-of-peak-performance-why',
    pubDate: new Date('2024-06-21T12:00:00Z'),
    description: 'Drive & Thrive - Episode 002 - Meditation, Exercise, Diet, Sleep. The four non-negotiable habits behind every high-performing leader.',
    content: '',
    imageUrl: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F227daa06-e8b1-4d7c-8d64-03ed8c8688eb_1280x720.png',
    podcastSlug: 'drive-and-thrive',
  },
  // --- The Switch (ep.001-004) ---
  {
    title: '6 Effective Steps For Flicking The Switch',
    link: 'https://thecamelhall.substack.com/p/6-effective-steps-for-flicking-the',
    slug: '6-effective-steps-for-flicking-the',
    pubDate: new Date('2024-06-30T12:00:00Z'),
    description: 'The Switch - Episode 001 - A practical framework for activating lasting personal change through six proven steps.',
    content: '',
    imageUrl: 'https://img.youtube.com/vi/DqSWK_f9kYA/maxresdefault.jpg',
    podcastSlug: 'the-switch',
  },
  {
    title: 'Invest in Prime Real Estate: Buy Yourself a Mental Palace!',
    link: 'https://thecamelhall.substack.com/p/invest-in-prime-real-estate-buy-yourself',
    slug: 'invest-in-prime-real-estate-buy-yourself',
    pubDate: new Date('2024-06-30T14:00:00Z'),
    description: 'The Switch - Episode 002 - Harness the ancient memory palace technique to organise your mind and supercharge your cognitive performance.',
    content: '',
    imageUrl: 'https://img.youtube.com/vi/3HyEIm_2w2E/maxresdefault.jpg',
    podcastSlug: 'the-switch',
  },
  {
    title: 'The Inspiration Switch - How To Turn Your Mojo On Demand',
    link: 'https://thecamelhall.substack.com/p/the-inspiration-switch-how-to-turn',
    slug: 'the-inspiration-switch-how-to-turn',
    pubDate: new Date('2024-07-01T12:00:00Z'),
    description: 'The Switch - Episode 003 - Discover the triggers and habits that let you activate creative flow whenever you need it.',
    content: '',
    imageUrl: 'https://img.youtube.com/vi/ZLHeSYzQgaQ/maxresdefault.jpg',
    podcastSlug: 'the-switch',
  },
  {
    title: 'Breaking Free: A Personal Journey Through 7 Types of Addictions',
    link: 'https://thecamelhall.substack.com/p/breaking-free-a-personal-journey',
    slug: 'breaking-free-a-personal-journey',
    pubDate: new Date('2024-07-03T12:00:00Z'),
    description: 'The Switch - Episode 004 - An honest exploration of the seven addiction types and the path to liberation from each.',
    content: '',
    imageUrl: 'https://img.youtube.com/vi/BZ-Wc9-iA68/maxresdefault.jpg',
    podcastSlug: 'the-switch',
  },
  // --- The AIM (ep.001-004) ---
  {
    title: 'What The A in "A.I." Should Stand For',
    link: 'https://thecamelhall.substack.com/p/what-the-a-in-ai-should-stand-for-57c',
    slug: 'what-the-a-in-ai-should-stand-for-57c',
    pubDate: new Date('2024-07-04T10:00:00Z'),
    description: 'The AIM - Episode 001 - Rethinking what artificial intelligence means and what it should aspire to become.',
    content: '',
    imageUrl: 'https://img.youtube.com/vi/WyNZzV_Cq3o/maxresdefault.jpg',
    podcastSlug: 'the-aim',
  },
  {
    title: 'AI Advancements, Ethical Dilemmas, and the Future of Creativity',
    link: 'https://thecamelhall.substack.com/p/ai-advancements-ethical-dilemmas-0e5',
    slug: 'ai-advancements-ethical-dilemmas-0e5',
    pubDate: new Date('2024-07-04T12:00:00Z'),
    description: 'The AIM - Episode 002 (Weekly Crunch) - Navigating the ethical landscape of rapid AI progress and its impact on human creativity.',
    content: '',
    imageUrl: 'https://img.youtube.com/vi/Tkn9pEPFWZM/maxresdefault.jpg',
    podcastSlug: 'the-aim',
  },
  {
    title: 'AI for Good: The Battle for Accessible and Truly Open AI',
    link: 'https://thecamelhall.substack.com/p/ai-for-good-the-battle-for-accessible-50a',
    slug: 'ai-for-good-the-battle-for-accessible-50a',
    pubDate: new Date('2024-07-04T14:00:00Z'),
    description: 'The AIM - Episode 003 - Why open-source AI matters and the forces shaping the battle for accessible artificial intelligence.',
    content: '',
    imageUrl: 'https://img.youtube.com/vi/2Y8kYy53eyI/maxresdefault.jpg',
    podcastSlug: 'the-aim',
  },
  {
    title: 'AI Revolution: From Magnets to Movies - The Latest Breakthroughs Explained',
    link: 'https://thecamelhall.substack.com/p/ai-revolution-from-magnets-to-movies-4cc',
    slug: 'ai-revolution-from-magnets-to-movies-4cc',
    pubDate: new Date('2024-07-04T16:00:00Z'),
    description: 'The AIM - Episode 004 (The Crunch) - A tour of the most impactful recent AI breakthroughs across science, media, and industry.',
    content: '',
    imageUrl: 'https://img.youtube.com/vi/18Z6jxSMOmA/maxresdefault.jpg',
    podcastSlug: 'the-aim',
  },
  // --- Sustain.ics (ep.001) ---
  {
    title: 'The Forgotten Art of Mending: Rekindle your Repair Mindset',
    link: 'https://thecamelhall.substack.com/p/the-forgotten-art-of-mending-rekindle',
    slug: 'the-forgotten-art-of-mending-rekindle',
    pubDate: new Date('2024-07-08T12:00:00Z'),
    description: 'Sustain.ics - Episode 001 - How restoring broken items represents a revolutionary shift toward sustainable living and mindful consumption.',
    content: '',
    imageUrl: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F10d87670-c94b-4abc-8453-7b0887ba50ef_1280x720.jpeg',
    podcastSlug: 'sustainics',
  },
];

export async function fetchSubstackPosts(): Promise<SubstackPost[]> {
  try {
    const response = await fetch(SUBSTACK_FEED_URL);
    if (!response.ok) {
      console.warn(`Substack feed returned ${response.status}`);
      return [...manualPosts];
    }

    const xml = await response.text();

    // Split into items
    const items = xml.split('<item>').slice(1);

    const rssPosts = items.map((item) => {
      const title = cleanTitle(extractBetweenTags(item, 'title'));
      const link = extractBetweenTags(item, 'link');
      const slug = extractSlug(link);
      const pubDateStr = extractBetweenTags(item, 'pubDate');
      const description = extractBetweenTags(item, 'description');
      const content = extractBetweenTags(item, 'content:encoded');
      const imageUrl = extractFirstImage(content);
      const podcastSlug = detectPodcast(slug, title);

      return {
        title,
        link,
        slug,
        pubDate: new Date(pubDateStr),
        description: stripHtml(description).slice(0, 200),
        content,
        imageUrl,
        podcastSlug,
      };
    });

    // Merge RSS posts with manual posts, avoiding duplicates
    const rssSlugs = new Set(rssPosts.map((p) => p.slug));
    const merged = [...rssPosts, ...manualPosts.filter((p) => !rssSlugs.has(p.slug))];

    return merged.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
  } catch (error) {
    console.warn('Failed to fetch Substack feed:', error);
    return [...manualPosts];
  }
}
