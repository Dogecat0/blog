---
title: "Building Dossigraphica: An Autonomous Geo-Intelligence Dashboard"
date: 2026-05-12
categories: [AI Development, Dossigraphica]
tags: [react, typescript, threejs, python, fastapi, llm, agents, geoint]
---

If you've ever used Gemini's deep research feature, you know the pattern: type a query, wait for the report, read through it, then manually extract the structured bits into JSON or markdown. I was doing this for corporate geopolitical analysis — office locations, supply chain dependencies, revenue geography, risk signals. Each analysis session meant copy-pasting, reformatting, and cross-referencing by hand. Tedious.

So I've been building something that does it for me.

<!-- more -->

Dossigraphica is an autonomous, local-first research pipeline that takes a company name, runs a full intelligence workflow across the open web, and produces structured geographic intelligence — rendered onto a 3D globe dashboard. This was one of those side projects where the scope kept expanding because the problem turned out to be deeper than I expected.

### What the Pipeline Actually Does

The backend is a Python FastAPI server with Server-Sent Events streaming. It orchestrates an **8-stage deterministic workflow**, each stage feeding into the next with no LLM-driven routing — every decision about *what to do next* is hardcoded. The LLM only decides *what the data means*.

Here's the full chain:

**1. Planning (programmatic, no LLM).** The planner maps `GeoIntelligenceSchema` fields (offices, supply chain, revenue geography, risks, customers) into search queries. Each field gets two queries: a clean structural query for permanent data, and a temporal-anchored query for earnings data. No LLM involved — it's just template expansion. This keeps the search strategy deterministic and reproducible.

**2. Parallel search.** TinyFIsh API (or Brave Search as an alternative) runs all queries concurrently. Results get URL-deduplicated. Cached aggressively on disk so re-runs are instant.

**3. Source triage (LLM-powered spam filter).** Every search result gets evaluated by the LLM against a binary authoritative/spam schema. SEC filings, Bloomberg, Reuters, WSJ, official earnings transcripts — pass. SEO spam, PR wire aggregators, content mills — rejected. This single step was the difference between getting clean extraction data and getting garbage.

**4. Content extraction.** Surviving URLs get fetched via again TinyFish API (with Jina Extract API as fallback). The free tier caps at ~30 RPM. There's also a blocked domain list persisted to disk — There have been a couple of hundred blocked urls for legally restricted domains, and the pipeline remembers them across runs.

**5. Map-Reduce fact sieve.** Each fetched page gets token-chunked using litellm's tokenizer, then each chunk is LLM-extracted into categorized facts via `SynthesizerSchema`. The extractor writes `reason` (why this fact matters) and `content` (the fact itself) into strict categories: `CORPORATE`, `OFFICES`, `REVENUE`, `SUPPLY_CHAIN`, `CUSTOMERS`, `RISKS`. This is where unstructured web text becomes structured intelligence.

The key insight here was running extraction and chunking concurrently — the extractor feeds a queue, the preprocessor consumes it, and both run in parallel via an async multiplexer. No waiting for one phase to finish before the next starts.

**6. Entity assembly and gap detection.** This is the most intricate step. The pipeline pre-assembles Pydantic models (offices, supply chain, risks, customers) using what it has so far, then *programmatically inspects them for missing geographic data*. No address on that office? No coordinates on that supplier? Missing HQ city for that customer? Each gap generates a targeted enrichment search query.

If gaps are found, the pipeline loops back through search → extract → sieve with those specific queries. If nothing's missing, it skips the enrichment loop entirely and moves straight to drafting.

**7. Parallel drafting.** Concurrent LLM calls produce the final output: 7 structured JSON schemas (basic info, anchor filing, offices, revenue geography, supply chain, geopolitical risks, customer concentration) and 6 markdown narrative sections. All running in parallel, all progress-tracked as discrete units.

**8. Progress tracking throughout.** A `TaskTracker` treats every LLM call and every I/O operation as a countable unit. It computes per-phase ETAs from historical completion rates, handles state recovery from log replay (so interrupted runs resume with accurate progress), and streams everything via SSE. Watching it tick through 8 phases with live ETA is genuinely satisfying.

### The Globe Is the Dessert (But It's a Good Dessert)

The frontend uses React 19 with react-globe.gl and Three.js. The visual identity is "parchment and ink" — antique warm parchment globe material, charcoal ink landmasses, gold cartographic graticule lines. Supply chain arcs pulse slowly along dashed paths between nodes. Regional risks render as shield markers with rust-to-gold color scales.

Every node on the globe is clickable. Clicking an office flies the camera to it, pauses auto-rotation, and opens a GPS-style intelligence panel. Hovering highlights connected nodes and dims everything else. Stacked nodes (overlapping coordinates) fan out automatically.

But honestly, it's all window dressing for the pipeline. The globe is what people *see*. The pipeline is what *works*.

### How the LLM Setup Evolved

I started this project convinced I'd run everything locally on my RTX 3070. Gemma 4 E2B at first, then E4B when it dropped. The local models handled the simple extraction fine — categorizing facts, evaluating source authority, basic summarization.

But the complex tasks were a different story. Entity assembly requires synthesizing disparate data points and identifying *absence* — "this supplier entry has no city, go find it." Parallel drafting needs consistent output across 13 concurrent schemas. The local models struggled with instruction adherence at that scale. A single pipeline run could take over 2 hours.

The architecture had the right abstraction from day one — LiteLLM as a unified routing layer. Every LLM call goes through the same `LLMClient` class, which maps OpenAI-compatible payloads to whatever provider is active. Switching from local llama.cpp to Gemini was a single environment variable.

I'm now on new `deepseek-v4-flash` with 256 parallel requests, 1M context window and 390K output size. Pipeline runs faster but the system is still provider-agnostic — I can point it at DeepSeek, Gemini, or back to a local instance just by changing `.env`. The prompt engineering stays the same; only the backend changes.

### The Hardest Parts

**Entity assembly and the enrichment loop.** Getting an LLM to recognize that it's missing data — rather than just making something up — is fundamentally hard. The current approach (assemble → inspect → search → re-extract) works but took the most iteration. The enrichment queries have to be specific enough to find the gap data without being so narrow they return nothing.

**Async orchestration with progress tracking.** Running 10+ concurrent LLM calls with rate limits, cache lookups, and a UI that expects real-time progress updates was harder than I expected. The multiplexer pattern that merges task generators with LLM pulse queues was the third rewrite. The first two had deadlock bugs I couldn't reproduce reliably.

**Tracing what the LLM is doing.** An agentic pipeline where every data transformation goes through an LLM is a black box. If the output is wrong, you can't just read the code — you have to read what the model was *thinking*. An inference logging system was built that saves every input prompt, output JSON, and reasoning field to disk, indexed sequentially so I can replay a full pipeline run post-mortem. That logging alone is why this project shipped.

### Final Thoughts

Dossigraphica started as personal frustration with a manual workflow. It turned into a deep dive into async Python orchestration, provider-agnostic LLM routing, map-reduce extraction design, and just enough Three.js (thanks to AI) to make a globe look good.

It's still a side project, but it's kind you like. I type a company name, watch the globe spin, and the pipeline does the rest.
