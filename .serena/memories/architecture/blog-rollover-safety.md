# Blog Rollover Safety (2026-04-10)

## The constraint

Substack's public RSS feed at `https://thecamelhall.substack.com/feed` serves only the **20 most recent posts**. When a 21st article is published, the oldest silently drops out of the feed. Without a safety net, that article also disappears from `valeris.fr/blog` on the next build.

## The architecture: two arrays with different jobs

**CRITICAL**: `manualPosts` and `manualMapping` are NOT interchangeable. Confusing them has already caused a silent year-long gap once.

| Array | File | Purpose |
|-------|------|---------|
| `manualPosts` | `src/lib/substack.ts` | Safety net. Full `SubstackPost` shape. Merged with live RSS at build time, dedup by slug, RSS wins on conflict. An article listed here survives RSS rollover permanently. |
| `manualMapping` | `src/lib/podcasts.ts` | Categoriser only. Slug -> podcast slug. Used by `detectPodcast()`. Does NOT bring an article back if RSS drops it. |

Adding a slug to `manualMapping` alone is **not enough** to preserve an article. Only `manualPosts` does that.

## The merge logic

`fetchSubstackPosts()` in `src/lib/substack.ts`:
1. Fetches RSS, parses 20 items
2. Builds a `Set` of RSS slugs
3. Appends `manualPosts` entries whose slug is NOT in the set
4. Sorts by `pubDate` descending
5. Returns merged array

Fallback: if the fetch fails or returns non-200, the function returns `[...manualPosts]` alone. The build does not fail; the blog gracefully degrades to the curated archive.

## The maintenance routine (proactive)

Every new Substack publication must be added to `manualPosts` **at publication time**, not "when you notice it rolled off". The reactive workflow failed silently for roughly a year (2024-07 through 2026-04) because nobody checked whether `manualPosts` still covered the feed.

Sequence:
1. Add full entry to `manualPosts` in `src/lib/substack.ts`
2. Add slug to `manualMapping` in `src/lib/podcasts.ts` (belt and braces)
3. `npm run deploy`
4. Verify on all 4 language blog pages

## Current state (as of 2026-04-10)

- **31 articles** rendered on every language blog page
- **20 in live RSS** + **11 legacy in `manualPosts` only**
- Zero gap: every article currently in the archive has at least one safety-net entry in `manualPosts`

## Pre-deploy audit

Documented in `docs-valeris/operations/substack-integration.md`. Uses `curl + grep + comm` to diff live RSS slugs against `manualPosts` slugs. Any slug printed is an at-risk article that needs a `manualPosts` entry before the next deploy.

## Relevant files

- `src/lib/substack.ts` - RSS fetcher, `manualPosts` array, merge logic
- `src/lib/podcasts.ts` - `manualMapping`, `keywordMap`, `detectPodcast()`
- `src/components/BlogGrid.astro` - renders the merged list across all 4 languages
- `docs-valeris/operations/substack-integration.md` - maintenance routine and audit snippet
- `docs-valeris/architecture/ADR/ADR-003-foxi-components-substack-resend-turnstile.md` - ADR with Update 2026-04-10 section
- `docs-valeris/dev-journal/2026-04-10-blog-rss-rollover-hardening.md` - session narrative and lessons
