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
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function extractBetweenTags(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`);
  const match = xml.match(regex);
  return match ? match[1].trim() : '';
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
      const title = extractBetweenTags(item, 'title');
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
