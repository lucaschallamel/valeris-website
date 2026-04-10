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

## Blog Maintenance

### The critical constraint: RSS is a sliding window

Substack serves only the **20 most recent posts** in its RSS feed. Every time you publish a new article on `thecamelhall.substack.com`, the oldest item in the current feed silently disappears from Substack's response. Without intervention, that article also disappears from `valeris.fr/blog` on the next build.

**The only permanent archive of blog posts is the `manualPosts` array in `src/lib/substack.ts`.** RSS is a convenience layer that keeps recent articles fresh. It is **not** the source of truth.

There are two arrays involved, and they are **not interchangeable**:

| Array | File | Purpose |
|-------|------|---------|
| `manualPosts` | `src/lib/substack.ts` | **Safety net**. Full post data (title, link, date, description, image, podcast). Merged with RSS at build time. An article here survives RSS rollover. |
| `manualMapping` | `src/lib/podcasts.ts` | **Categoriser only**. Slug -> podcast slug. Tells `detectPodcast()` which series an article belongs to. Does NOT bring an article back if RSS drops it. |

Adding a slug to `manualMapping` alone is not enough to preserve an article. Only `manualPosts` does that.

### Routine: after publishing a new Substack article

Follow this sequence **every time** you publish a new article. The goal is to add the post to `manualPosts` before it ever rolls off, so rollover becomes a non-event.

1. **Add the article to `manualPosts`** in `src/lib/substack.ts`. Use the entry template under "How to add an article" below. This is the step that future-proofs the post.
2. **Add the slug to `manualMapping`** in `src/lib/podcasts.ts` to lock in the podcast category (belt and braces: even if keyword detection changes later, the mapping wins).
3. **Deploy the site**:
   ```bash
   npm run deploy
   ```
   Astro fetches the RSS feed at build time, merges it with `manualPosts` (deduplication by slug, RSS wins when both present so descriptions stay fresh), and regenerates the 4 blog pages (FR/DE/EN/IT). Build takes roughly 2 seconds, full deploy under 10 seconds.
4. **Verify on the live site**: open `https://valeris.fr/blog/` and confirm the new card appears at the top of the grid.
5. **Check the podcast category**: the filter pills should show the article under the correct podcast (The AIM, Drive & Thrive, The Switch, Sustain.ics, or Kind Mind). If it lands in the wrong series, the `manualMapping` entry from step 2 should be corrected.

### Pre-deploy audit

Before any deploy, run this quick diff to confirm no article is about to vanish. This catches the case where publishing has pushed an older post off the 20-item RSS window without a corresponding `manualPosts` entry.

```bash
# Fetch the live feed
curl -sSL https://thecamelhall.substack.com/feed -o /tmp/feed.xml

# List slugs currently in the feed
grep -oE 'https://thecamelhall.substack.com/p/[a-z0-9-]+' /tmp/feed.xml \
  | sed 's|.*/p/||' | sort -u > /tmp/feed-slugs.txt

# List slugs currently in manualPosts
grep -oE "slug: '[a-z0-9-]+'" src/lib/substack.ts \
  | sed "s/slug: '//; s/'//" | sort -u > /tmp/manual-slugs.txt

# Slugs that exist in RSS but NOT in manualPosts (at risk on next rollover)
comm -23 /tmp/feed-slugs.txt /tmp/manual-slugs.txt
```

Any slug printed by the final `comm` command is an article that will disappear the moment Substack pushes it off the feed. Add each one to `manualPosts` before deploying.

### Fixing categorisation

Articles are routed through `detectPodcast()` in `src/lib/podcasts.ts` using two strategies:

1. **`manualMapping`** (slug -> podcast slug). Checked first, always wins.
2. **`keywordMap`** (title keywords -> podcast slug). Fallback when no manual mapping exists.
3. **Default**: `the-aim` if nothing matches.

To override the category for a specific article, add a line to `manualMapping`:

```typescript
// src/lib/podcasts.ts
const manualMapping: Record<string, string> = {
  // ...
  'your-new-article-slug': 'drive-and-thrive',
};
```

Then redeploy. The slug is the last segment of the Substack URL (e.g. `ai-love-and-the-llm-harness` from `https://thecamelhall.substack.com/p/ai-love-and-the-llm-harness`).

### How to add an article to `manualPosts`

1. Open `src/lib/substack.ts` and locate the `manualPosts: SubstackPost[]` array (around line 80). Entries are grouped by podcast series with comment headers.
2. Add an entry matching the `SubstackPost` shape in the appropriate section:

   ```typescript
   {
     title: 'Your Article Title',
     link: 'https://thecamelhall.substack.com/p/your-article-slug',
     slug: 'your-article-slug',
     pubDate: new Date('2026-04-10T12:00:00Z'),
     description: 'Short excerpt, 150-200 chars, no emojis, plain text only.',
     content: '',
     imageUrl: 'https://substackcdn.com/image/fetch/...',
     podcastSlug: 'the-aim',
   },
   ```

3. **Getting the image URL**: open the Substack article, right-click the hero image, copy image address. It will be a `substackcdn.com/image/fetch/...` URL (or `img.youtube.com/vi/...` for YouTube thumbnails on video posts).
4. **Getting a clean description**: take the first 150-200 chars of the article subtitle or opening paragraph. Strip emojis, em dashes, and en dashes. Use commas and full stops.
5. **Picking `podcastSlug`**: one of `the-aim`, `drive-and-thrive`, `the-switch`, `sustainics`, `kind-mind`. Must match the value used in `manualMapping`.

### Build-time safety net

`fetchSubstackPosts()` in `src/lib/substack.ts` is defensive: if the Substack feed is unreachable or returns a non-200 response at build time, the function falls back to returning **only** the `manualPosts` array. The build does not fail. This means:

- A temporary Substack outage does not block deployments.
- The blog degrades gracefully to the manually curated list until the feed recovers.
- Investigate any `console.warn` output from the build log mentioning `Substack feed returned` or `Failed to fetch Substack feed`.

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
