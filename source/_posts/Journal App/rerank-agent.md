---
title: 'Optimizing Semantic Search: A Two-Stage Reranker'
date: 2025-06-30 19:00:00
tags:
- RAG
- LLM
- Architecture
- Search
- AI
---

Previously in Synapse, we have a core feature: an agentic semantic search system (Still confused what **actually** makes RAG, a RAG and what's the difference between it and semantic search? They both seem to intersect. But like Andrew Ng mentioned in one of the interviews, how to define if an agent is truly autonomous? How? maybe the definition does not matter, as long as the agent works itself.) that allows users to ask natural language questions about their activities. The initial version was a standard, three-step pipeline: a **Planner** agent to generate keywords, a **Retrieval** step using those keywords against the database, and a **Synthesizer** agent to generate a summary.

This worked, but it suffered from the classic limitation of keyword search—it lacked true semantic understanding. A query for "time spent on backend improvements" might miss an entry described as "refactored the authentication service."

<!-- more -->

### The Tempting Anti-Pattern: Full Database Scan with an LLM

The first idea that came up was straightforward: why not use the LLM's intelligence for retrieval itself? The proposal was to iterate through our entire database in small batches, sending each batch to an LLM with the prompt, "Are any of these entries relevant to the user's query?"

It's easy to be captivated by the power of a new tool. However, after having some conversion with LLMs, this approach, while seems clever, is a production anti-pattern for several critical reasons:

1.  **Scalability:** The number of LLM calls scales linearly with database size (`O(n)`). A user with a year's worth of entries would face an unusable system, with search times stretching into minutes.
2.  **Latency:** The process is inherently sequential. The cumulative network and inference latency would create a terrible user experience.
3.  **Cost:** Whether using a local model (compute cycles) or a cloud API (dollars), this is an incredibly expensive way to search.

The core mistake here is using a slow, high-precision tool (the LLM) for a fast, high-recall task (finding candidates).

### The new Approach: A Two-Stage Reranker

A more robust and scalable architecture is a **two-stage retrieval pipeline** that incorporates a **reranker**. This pattern leverages the strengths of both the database and the LLM.

The new pipeline looks like this:

1.  **Planner Agent (Unchanged):** Generate keywords from the user's query.
2.  **Broad Retrieval (High Recall):** Use the keywords to query the database. Instead of fetching just 20 results, we now fetch a much larger set of candidates, say `take: 200`. This step is optimized for speed and recall—we'd rather have a few irrelevant results than miss a relevant one. This is what databases excel at.
3.  **Reranker Agent (High Precision):** This is the new, crucial step. We send the user's query and the 200 candidate activities to a new LLM agent. Its *only* job is to analyze this pre-filtered list and return a sorted list of the most relevant activity IDs. This is where a better semantic analysis happens, but on a small, manageable dataset.
4.  **Synthesizer Agent (Unchanged):** The top 20 re-ranked results are passed to the final agent to generate the summary.

This architecture is better because it aligns the tool with the task. The database handles the massive-scale filtering, and the LLM performs its nuanced understanding on a small, relevant subset of data.

### Refining the Implementation: Batching the Reranker

In the final implementation, the reranker was taken a step further. Instead of sending *a defined max number* of candidates (say, 200) to the LLM in one massive prompt—which risks hitting context limits or the "lost in the middle" problem—the `rerankActivities` function now processes the candidates in batches.

It loops through the 200 candidates, sending 10 at a time to the reranker agent. It then aggregates the relevant IDs from all batches. This makes the reranking process more reliable and robust, ensuring consistent performance even if the number of initial candidates grows.

Now the new search system is more reliable and less prone to context issues, e.g, model timeout. It can handle larger datasets without overwhelming the LLM, while still providing high-quality, semantically relevant results.