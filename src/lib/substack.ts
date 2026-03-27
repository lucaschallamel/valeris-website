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
// Add entries here for articles that have fallen off the feed.
const manualPosts: SubstackPost[] = [
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
