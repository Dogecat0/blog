---
title: "Architecting Aperilex: Initial Development Setups and Planning"
date: 2025-07-08
tags:
- AI
- Claude Code
- Development
- Python
- Clean Architecture
- Context7
- LLM
categories:
- Aperilex
- AI Development
---

As in the night 2 coding with Claude Code, I focused on establishing and refining the initial project setup for Aperilex while, of course, learning with the good practices provided by Claude (Opus4 and Sonnet4).

<!-- more -->

Claude Code just helped me lay the foundation for **Aperilex**, as mentioned in the last post, a complete rewrite of a legacy SEC Filing Analysis Engine. This post breaks down the playbook.

## The Commit at a Glance: More Than Just Code

The initial set of changes established a robust, clean architecture foundation for Aperilex. Here's the summary:

- **Project Scaffolding**: Established a complete, modern Python environment using Poetry, with all dependencies locked (`poetry.lock`). This includes FastAPI, SQLAlchemy 2.0 for async operations, and Pydantic v2 for data validation.
- **Database & Migrations**: Set up a fully functional, async-native Alembic environment (`alembic.ini`, `env.py`) and created the initial migration for a `users` table as test.
- **Core Application Structure**: Implemented the initial FastAPI app (`src/presentation/api/app.py`), a Pydantic-based settings module (`src/shared/config/settings.py`), and the SQLAlchemy base models (`src/infrastructure/database/`).
- **Documentation & Planning**: Created comprehensive project context and planning documents (`CLAUDE.md`, `docs/phases/PHASES.md`, `docs/phases/PHASE_2_DETAILED_PLAN.md`).

### 1. The `CLAUDE.md` Manifesto: The Project's Living Brain

The most critical file in this commit isn't a `.py` file—it's `CLAUDE.md`. I've watched a couple videos on how to effectively use this document, here is probably the best one from the creator himself [one](https://www.youtube.com/watch?v=6eBSHbLKuN0&t=1143s).

In my case, it contains:
- **Project Overview**: High-level goals for Aperilex.
- **Domain Knowledge**: A synthesized reference of our key dependency, `edgartools`.
- **Development Commands**: Standardized commands for setup, testing, and quality checks.
- **Architectural Principles**: A clear outline of our Clean Architecture layers.
- **Code Quality Standards**: Explicit rules for typing, formatting, and linting.
- **Current Project Phase**: Keeps the AI focused on the immediate tasks.

Claude Code read this file as context for every session itself, ensuring that it was always up-to-date with the project's goals and requirements. After completing the tasks, Claude would also update the document with any new insights or changes necessary.

### 2. Context7 & MCP: Integrating Specialized Knowledge

Aperilex's core domain revolves around parsing SEC filings, a task heavily reliant on the `dgunning/edgartools` library. A generic LLM knows nothing about this specific tool. So here comes the MCP.

Using **Claude Code's Model-Created Prompts (MCP)** in conjunction with [**Context7**](https://github.com/upstash/context7), we integrated the `edgartools` library directly into our model's knowledge base. Here's how:

1.  **Ingest**: We pointed Context7 to the `edgartools` library documentation.
2.  **Synthesize**: We tasked Claude with a high-level goal: "Analyze this library and produce a developer's guide for building a new analysis engine on top of it, focusing on its key classes, data access patterns, and integration points."
3.  **Produce**: The model generated the detailed "EdgarTools Reference" section you see in `CLAUDE.md`.

This extracts the most relevant patterns like (`Company` -> `Filing` -> `Data Object`) and identifies enhancement opportunities (caching, async processing) from the perspective of our project's goals. This process "teaches" the model about our core dependency, making it an expert on demand.

### 3. The Opus/Sonnet Strategy: Matching the Model to the Mission

Claude Code provide the `/model` command for you to swtich models. Of course powerful model like Opus4 has much higher token consumption (5x more):

-   **Claude Opus 4 for Architecture & Planning**: For high-level, complex and strategic tasks, Opus is unparalleled. Its reasoning capabilities are essential for architectural design. I used it to generate the project's entire phased rollout plan, as seen in [**`docs/phases/PHASES.md`**](https://github.com/Dogecat0/Aperilex/blob/main/docs/phases/PHASES.md). More impressively, it created the [**`PHASE_2_DETAILED_PLAN.md`**](https://github.com/Dogecat0/Aperilex/blob/main/docs/phases/PHASE_2_DETAILED_PLAN.md), a document so granular it breaks down a full week of domain modeling into daily tasks, complete with class structures, method signatures, and testing strategies. This is architectural co-piloting.

-   **Claude Sonnet 4 for Implementation**: With the architectural blueprint set by Opus, we will switch to Sonnet for the hands-on coding. It's faster and more cost-effective, making it perfect for translating the detailed plan into actual code. The initial `src` files—the Pydantic settings, the async SQLAlchemy base, and the first User model—are the direct output of this Sonnet-driven implementation phase, all while adhering to the standards defined in `CLAUDE.md`.

### Final Thoughts

With the assistance of Claude Code, we have achieved in two nights:

-   **Rapid Scaffolding**: Building a production-grade foundation.
-   **Knowledge Synthesis**: Integrating specialized libraries and domain knowledge directly into the development context.
-   **Strategic Planning**: Architecting complex systems and generating detailed, executable implementation plans.
-   **Enforcing Standards**: Maintaining code quality and architectural integrity from the very first line of code.

By orchestrating these tools with a clear strategy—using `CLAUDE.md` as our context anchor, Context7 for domain knowledge, and the Opus/Sonnet duo for planning and execution—we're building better, more robust, and more maintainable systems. At least for the current me (which I think of course Opus 4 and Sonnet 4 are better coders than architects than me), this has been a tremendously good learning journey so far with Claude Code. I very much look forward to the next phases when the actual implementation happens, even though I am aware there will of course be bugs and mistakes, frustrations, but all will be part of the learning journey stepping into this new era of software engineering.