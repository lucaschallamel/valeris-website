---
entry_date: 2026-04-10
author: Lucas Challamel
focus_area: Blog RSS rollover safety, manualPosts backfill, operations documentation hardening
status: complete
session_duration: ~1 hour
tags: [blog, substack, rss, manual-posts, documentation, operations, rollover, safety-net]
---

## Why (High-Level Context)

Published a new article on The Camel Hall (`ai-love-and-the-llm-harness`) and wanted it on `valeris.fr/blog`. Initially suspected the blog had migrated to manual curation since the RSS feed is limited to 20 items. Investigation revealed the system is actually a **hybrid**: live RSS at build time, merged with a `manualPosts` array in `src/lib/substack.ts` as a safety net for articles that age off the feed.

While verifying that the new post would land correctly, a **much more serious issue** came to light: the `manualPosts` array only contained 12 legacy "first-episode" entries from June-July 2024. **Every article published since then lived only in RSS**, with nothing protecting them from silent disappearance the moment a newer article pushed them past position 20 in the feed. Publishing `ai-love-and-the-llm-harness` itself was about to drop `from-hype-to-reality-how-to-run-a` off the live site.

**Session Objectives**:

- Verify the new Substack post reaches the blog in all 4 languages
- Understand the current blog data flow (RSS vs manual, where's the source of truth)
- Close the rollover gap for every article currently in the archive
- Rewrite operations documentation to make the maintenance routine proactive rather than reactive
- Preserve the knowledge so this trap cannot be re-opened unknowingly

---

## How (The Journey)

### 1. Architecture investigation

Read `src/lib/substack.ts` and `src/lib/podcasts.ts` to map the actual data flow. Confirmed the hybrid pattern:

```
npm run build
  |
  v
fetchSubstackPosts() in src/lib/substack.ts
  |
  v  (live RSS, 20 most recent posts)
Substack feed parsed into SubstackPost[]
  |
  v  (merge with manualPosts[], dedup by slug, RSS wins on conflict)
Merged array sorted by pubDate descending
  |
  v  (categorisation via detectPodcast())
BlogGrid.astro renders 4 language pages identically
  |
  v
dist/blog/index.html, dist/de/blog/index.html, dist/en/blog/index.html, dist/it/blog/index.html
```

Key realisation: `manualMapping` (in `podcasts.ts`) and `manualPosts` (in `substack.ts`) are **two different arrays with different jobs**, and conflating them is dangerous.

| Array | File | Purpose |
|-------|------|---------|
| `manualPosts` | `src/lib/substack.ts` | Safety net. Full post data. Survives RSS rollover. |
| `manualMapping` | `src/lib/podcasts.ts` | Categoriser only. Slug -> podcast slug. Does NOT bring articles back. |

Adding a slug to `manualMapping` alone is **not enough** to preserve an article through rollover. Only `manualPosts` does that.

### 2. Gap analysis against the live feed

Fetched the current RSS feed with `curl -sSL https://thecamelhall.substack.com/feed -o /tmp/camelhall.xml` and extracted the 20 slugs currently served. Diffed against the 11 slugs in `manualPosts`.

**Result**: zero overlap. The existing `manualPosts` entries were early June/July 2024 first-episode seeds; the current feed holds articles from 2024-07-12 through 2026-04-10. Every article published between those dates was a single publish event away from silent deletion.

### 3. Backfill

Wrote a short Node script to parse the RSS XML and emit cleaned-up entries for each missing article. Manual post-processing:

- Stripped `Listen now |` Substack audio-player preambles from descriptions
- Replaced mid-sentence truncations at 200 chars with clean, complete 150-200 char summaries
- Removed one emoji prefix from a title (`✤ Introduction To Ikigai...` -> `Introduction To Ikigai...`)
- Normalised image URLs to a consistent `substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/...` form
- Cross-referenced each slug against `manualMapping` to pick the correct `podcastSlug`

Added 20 new entries to `manualPosts` (including `ai-love-and-the-llm-harness` itself) at the top of the array, under a `Currently in RSS feed (backfilled 2026-04-10 to prevent rollover loss)` comment header. The legacy 11 entries remain unchanged below.

Also added `ai-love-and-the-llm-harness -> the-aim` to `manualMapping` for belt-and-braces categorisation (keyword detection would route it correctly, but explicit beats implicit).

### 4. Operations documentation rewrite

Extended `docs-valeris/operations/substack-integration.md` with a new `Blog Maintenance` section that:

- **Leads with the constraint**: states upfront that RSS is a sliding window and `manualPosts` is the only permanent archive. The framing matters because it changes how a reader thinks about the workflow.
- **Draws the distinction explicitly**: side-by-side comparison table of `manualPosts` vs `manualMapping` so the two cannot be confused.
- **Reframes the routine from reactive to proactive**: the old doc said "add an article to `manualPosts` when it rolls off". The new doc says "add it at publication time, before rollover can touch it". Relying on "notice it's gone" as the safety mechanism is how the gap stayed open for a year.
- **Provides a pre-deploy audit snippet**: three shell commands (curl + grep + comm) that list any slug currently in RSS but missing from `manualPosts`. Any printed slug is an at-risk article.
- **Documents the build-time safety net**: describes the graceful degradation behaviour in `fetchSubstackPosts()` (if the feed fails at build time, `manualPosts` alone is returned, the build does not fail).

### 5. Build, verify, deploy

Build: 44 pages, 1.98 seconds, clean. Per-page article count verified in dist:

```
blog -> 31 article links, new post present: 1
de/blog -> 31 article links, new post present: 1
en/blog -> 31 article links, new post present: 1
it/blog -> 31 article links, new post present: 1
```

Deploy: `npm run deploy` uploaded 4 files (only the 4 blog pages changed), full deploy under 3 seconds.

Live verification: `curl` against all four language blog URLs confirmed `ai-love-and-the-llm-harness` is present and all 31 archive articles render correctly.

---

## Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Preservation mechanism | Backfill `manualPosts` with all 20 current RSS articles | Only way to close the rollover gap; `manualMapping` alone does not preserve articles |
| Workflow reframe | Proactive (add at publish time) vs reactive (add when rolled off) | Reactive workflow relied on human vigilance that failed for roughly a year |
| Documentation location | Extend `substack-integration.md` in-place, not a new file | Avoids doc fragmentation; the rollover story belongs with the Substack story |
| Categoriser entry for new post | Explicit `manualMapping['ai-love-and-the-llm-harness'] = 'the-aim'` | Keyword detection would work, but explicit beats implicit, and matches the convention for other posts |
| Description cleanup | Rewrite each description from the raw RSS excerpt | RSS excerpts are truncated mid-sentence and start with `Listen now \|`, which reads badly on cards |
| Automation | Deferred (pre-deploy audit documented, not wired into `npm run predeploy` yet) | Manual audit snippet is sufficient for now; wiring it in is optional hardening for a later session |

---

## Final State

**Blog archive**:
- 31 articles rendered on all 4 language blog pages (20 currently in RSS + 11 legacy episodes in `manualPosts` only)
- Every article in the archive is protected by at least one of: live RSS, `manualPosts`, or both
- `ai-love-and-the-llm-harness` live on valeris.fr/blog, /de/blog, /en/blog, /it/blog

**Code changes**:
- `src/lib/substack.ts`: `manualPosts` grew from 11 to 31 entries, grouped under a clear comment header
- `src/lib/podcasts.ts`: one new `manualMapping` entry for the new post

**Documentation changes**:
- `docs-valeris/operations/substack-integration.md`: new `Blog Maintenance` section with the `manualPosts`/`manualMapping` comparison, proactive routine, pre-deploy audit snippet, and build-time safety net notes
- `docs-valeris/architecture/ADR/ADR-003-foxi-components-substack-resend-turnstile.md`: `Update 2026-04-10` section added noting the rollover risk and the dual-array pattern
- `docs-valeris/memory-bank/activeContext.md` and `progress.md`: updated with this session
- Root and docs READMEs: dev-journal entry count bumped

---

## Lessons Learned

- **A "safety net" that is never tested is not a safety net.** The `manualPosts` array existed since day one but nobody checked whether it actually covered the current feed. For over a year, the site was one publication away from silent article loss.
- **Two arrays with similar names and overlapping purposes are a trap.** `manualPosts` and `manualMapping` were easy to conflate because both contained slugs for "manually curated" content. Making the distinction explicit in docs (with a comparison table) is the cheapest long-term fix.
- **Reactive safety processes rely on human vigilance, which fails silently.** The old doc told the reader to "add an article when it rolls off", which only works if someone notices the rollover. Shifting to "add at publication time" removes the vigilance requirement entirely.
- **Verify against reality before writing docs.** I initially drafted the maintenance section in a reactive framing before running the gap analysis. Running the diff immediately reframed the whole problem.
- **The fastest fix for silent data loss is a wider safety net, not more process.** Automation (pre-deploy audit in CI) is a nice-to-have. Backfilling `manualPosts` so the gap is zero is the actual fix.

---

**Session Summary**: New Substack article brought onto valeris.fr/blog in all 4 languages. Discovered and closed a latent rollover gap affecting every article in the archive. Rewrote operations documentation from reactive to proactive framing. Added `Blog Maintenance` section with pre-deploy audit snippet.

**Estimated Impact**: High. The blog section is now resilient to RSS rollover for every article currently in the archive, and the maintenance routine is documented so future publications can be added without ever re-opening the gap.
