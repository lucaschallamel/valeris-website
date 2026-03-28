# Lib

Build-time utilities for data fetching and processing.

## Files

| File | Purpose |
|------|---------|
| `substack.ts` | Fetches RSS from `thecamelhall.substack.com/feed`, parses articles, cleans HTML entities |
| `podcasts.ts` | 5 podcast series definitions, manual article-to-podcast mapping, keyword fallback detection |

## How It Works

At build time, `fetchSubstackPosts()` fetches the RSS feed, parses 20+ articles, and `detectPodcast()` categorises each article into one of 5 podcasts (The AIM, Drive & Thrive, The Switch, Sustain.ics, Kind Mind).

New articles are categorised automatically by keywords. If incorrect, add the article slug to `manualMapping` in `podcasts.ts`.
