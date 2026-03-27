# Substack Blog Federation

## Overview

The blog page federates content from The Camel Hall Substack publication. Articles are fetched via RSS at build time and displayed as cards on `valeris.fr/blog/`. Clicking an article opens it on Substack in a new tab.

| Component | Value |
|-----------|-------|
| Substack publication | The Camel Hall |
| RSS feed URL | `https://thecamelhall.substack.com/feed` |
| Fetch method | Build-time only (no runtime cost) |
| Display mode | Card grid with image, title, excerpt, date |
| Click action | Opens full article on Substack (new tab) |
| Update frequency | Each `npm run deploy` fetches latest articles |

## Architecture

```
npm run build
  |
  v
Astro fetches RSS feed from thecamelhall.substack.com/feed
  |
  v
src/lib/substack.ts parses XML -> SubstackPost[]
  |
  v
src/lib/podcasts.ts categorises each article -> podcast slug
  |
  v
src/components/BlogGrid.astro renders cards + filter buttons
  |
  v
Static HTML in dist/blog/index.html (no JS needed for display)
  |
  v
Client-side JS enables podcast filter buttons (progressive enhancement)
```

## The 5 Podcast Series

Each article belongs to one of 5 podcast series from The Camel Hall:

| Podcast | Slug | Topic |
|---------|------|-------|
| **The AIM** | `the-aim` | AI, technology, augmented intelligence |
| **Drive & Thrive** | `drive-and-thrive` | Ethical leadership, business strategy |
| **The Switch** | `the-switch` | Mindset, self-awareness, personal growth |
| **Sustain.ics** | `sustainics` | Sustainable living, nutrition, environment |
| **Kind Mind** | `kind-mind` | Kindness framework, inclusiveness, mindfulness |

Podcast descriptions are available in 3 languages (FR/DE/EN) in `src/lib/podcasts.ts`.

## Article Categorisation

Substack RSS does not include category or section metadata. Articles are categorised using two methods:

### 1. Manual Mapping (primary)

In `src/lib/podcasts.ts`, the `manualMapping` object maps article slugs to podcast slugs:

```typescript
const manualMapping: Record<string, string> = {
  'the-9-ai-conversations-people-avoid': 'the-aim',
  'introduction-to-ikigai-find-your': 'the-switch',
  'food-as-medicine-and-for-social-change': 'sustainics',
  // ... all known articles
};
```

### 2. Keyword Detection (fallback)

For new articles not yet in the manual mapping, `detectPodcast()` scans the title for keywords:

```typescript
const keywordMap = [
  [['ai', 'artificial intelligence', 'tech', 'consulting'], 'the-aim'],
  [['leadership', 'strategy', 'management', 'career'], 'drive-and-thrive'],
  [['mindset', 'ikigai', 'self-awareness', 'shadow'], 'the-switch'],
  [['sustainable', 'food', 'garden', 'vegan'], 'sustainics'],
  [['kind', 'mind', 'kindness', 'mindfulness'], 'kind-mind'],
];
```

Default: if no keywords match, the article is assigned to `the-aim`.

## Adding a New Article

When you publish a new article on Substack:

1. Run `npm run deploy` - the RSS feed is fetched automatically
2. Check the blog page - the article should appear
3. Verify the podcast category is correct
4. If wrong: add the article slug to `manualMapping` in `src/lib/podcasts.ts`

```typescript
// src/lib/podcasts.ts - add a line like:
'your-new-article-slug': 'drive-and-thrive',
```

5. Rebuild and deploy

## RSS Parsing Details

### Feed URL

`https://thecamelhall.substack.com/feed` - standard RSS 2.0 feed, returns all published articles.

### Data Extracted Per Article

| Field | RSS Element | Processing |
|-------|-------------|------------|
| Title | `<title>` | HTML entities decoded, Unicode preserved |
| Link | `<link>` | Direct URL to Substack article |
| Slug | Last segment of link URL | Used for podcast mapping |
| Date | `<pubDate>` | Parsed to JS Date, formatted per locale |
| Description | `<description>` | HTML stripped, entities decoded, truncated to 200 chars |
| Image | First `<img>` in `<content:encoded>` | Extracted via regex |
| Podcast | Detected from slug/title | Via manual mapping or keywords |

### HTML Entity Handling

The RSS feed contains various HTML entities that need decoding:

- Numeric entities (`&#127897;`, `&#65039;`) - emojis stripped from excerpts
- Named entities (`&rsquo;`, `&mdash;`, `&hellip;`) - converted to text
- Remaining unknown entities - removed

## Client-Side Filtering

The podcast filter is implemented with vanilla JavaScript (no framework):

1. All articles are rendered in the HTML (no lazy loading)
2. Filter buttons toggle `display: none` on non-matching cards
3. The active button gets `is-active` CSS class (rose background)
4. Subtitle text updates to show the selected podcast's description
5. "Tous/Alle/All" button shows all articles

The filtering works without JavaScript for the initial view (all articles shown). JavaScript adds the interactive filtering as progressive enhancement.

## Substack Section URLs (Reference)

These are the Substack section pages (not RSS feeds - sections don't have individual RSS):

| Podcast | Substack URL |
|---------|-------------|
| The AIM | `thecamelhall.substack.com/s/the-aim` |
| Drive & Thrive | `thecamelhall.substack.com/s/drive-and-thrive` |
| The Switch | `thecamelhall.substack.com/s/the-switch` |
| Sustain.ics | `thecamelhall.substack.com/s/sustainics` |
| Kind Mind | `thecamelhall.substack.com/s/kind-mind` |

## Limitations

- **Single RSS feed**: Substack provides one RSS feed per publication, not per section. No way to fetch articles from a single podcast series.
- **No category metadata**: RSS items have no `<category>` tags. Categorisation is inferred.
- **English only**: All Substack content is in English. The same articles appear on FR/DE/EN blog pages.
- **Build-time only**: New articles only appear after a rebuild + deploy.
- **Feed size**: Substack returns the 20 most recent articles. Older articles are not available via RSS.
