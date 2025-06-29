---
title: "Building an Agentic RAG Pipeline for Journal Analysis"
date: 2025-06-29 22:00:00
tags:
  - LLM
  - Agentic RAG
---

Today, I implemented one of the new features proposed on roadmap in my personal journal analysis app: a semantic search and synthesis engine. Instead of a traditional keyword search, I opted for an "Agentic RAG" (Retrieval-Augmented Generation) pipeline. This approach leverages a local LLM (`gemma3n:latest`) not just for generating text, but for orchestrating the entire search process. This post outlines the design thinking behind this implementation and its future potential.

<!-- more -->

### The Problem: Bridging Human Intent and Database Queries

A user usually asks, *"What was my progress on the API refactor?"* A database, however, requires precise, literal terms. A direct search for "API" and "refactor" would miss relevant entries logged as "updated endpoints" or "fixed backend routes."

The core challenge was to translate the user's high-level *intent* into a low-level, effective database query without the overhead of maintaining a dedicated vector database.

### The Solution: A Two-Agent Pipeline

The current solution was to split the task between two specialized "agents," each powered by a targeted LLM prompt.

**1. The Query Planner Agent:**
This is the first and most critical step. Its sole responsibility is to act as a "semantic bridge."

-   **Input:** The user's raw, natural language query.
-   **Task:** Transform the query into a structured JSON array of effective search keywords.
-   **Prompt Engineering:** The prompt instructs the LLM to identify core concepts, generate synonyms and related technical terms (e.g., "API" -> `["endpoint", "route", "backend"]`), and discard conversational stop words.
-   **Output:** A clean array of keywords, like `["api", "refactor", "endpoint", "route"]`.

This agent turns a fuzzy query into a high-signal set of search terms, dramatically improving retrieval recall.

**2. The Synthesizer Agent:**
Once the Planner provides the keywords, we perform a full-text search against the `description` and `notes` fields in our PostgreSQL database using Prisma. The top 20 most recent results are then passed to the second agent.

-   **Input:** The original user query and the context of the top 20 retrieved journal activities.
-   **Task:** Generate a concise, markdown-formatted summary that directly answers the user's query.
-   **Prompt Engineering:** The prompt instructs the model to base its answer *only* on the provided context, preventing hallucination, and to structure the output for clear presentation.
-   **Output:** A human-readable summary, ready for the UI.

This entire pipeline is exposed via a single `POST` endpoint at `/api/journal/search`, which is consumed by a new Next.js page with a simple React frontend.

### Design Trade-offs and Future Optimizations

This architecture represents a deliberate set of trade-offs:

-   **Simplicity over Precision:** We avoided the complexity of `pgvector` and embedding backfills by using the LLM's reasoning for the initial search. This is simpler to implement but may be less precise than a true vector similarity search.
-   **Speed over Comprehensiveness:** By limiting the retrieval step to the top 20 activities (`take: 20`), we ensure a fast response and keep the LLM context manageable. However, this means the summary is based on a subset of all possible relevant data.

This leads to a clear path for future optimization:

**Map-Reduce Summarization for Full-Database Analysis:**
To overcome the `take: 20` limitation, the next step for optimization is to implement a batch-processing pattern.

1.  **Full Retrieval:** Fetch *all* matching activities from the database.
2.  **Map:** Break the results into manageable batches (e.g., of 20). Send each batch to the LLM to generate an intermediate summary.
3.  **Reduce:** Combine all the intermediate summaries and send them to the LLM (a new agent) one final time to produce a single, cohesive, and highly accurate final answer.

This "Map-Reduce" approach would trade latency for a far more comprehensive analysis, making the tool even more powerful. It's an exciting next step for the project.
---