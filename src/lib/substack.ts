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

export async function fetchSubstackPosts(): Promise<SubstackPost[]> {
  try {
    const response = await fetch(SUBSTACK_FEED_URL);
    if (!response.ok) {
      console.warn(`Substack feed returned ${response.status}`);
      return [];
    }

    const xml = await response.text();

    // Split into items
    const items = xml.split('<item>').slice(1);

    return items.map((item) => {
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
    }).sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
  } catch (error) {
    console.warn('Failed to fetch Substack feed:', error);
    return [];
  }
}
