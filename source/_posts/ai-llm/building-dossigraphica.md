---
title: "Building Dossigraphica: An Autonomous Geo-Intelligence Dashboard"
date: 2026-05-12
categories: [AI Development, Dossigraphica]
tags: [react, typescript, threejs, python, fastapi, llm, agents, geoint]
---

Spent the last few weeks diving deep into building Dossigraphica—a high-fidelity Geographic Intelligence (GEOINT) visualization platform. 

This one was a massive step up in complexity. While some projects are quick dopamine sprints, Dossigraphica turned into an intense, multi-layered architectural challenge, blending heavy frontend 3D rendering with a complex, autonomous backend research pipeline.

### Basic Information
First, let’s look at some interesting stats from the project:
- **Core Focus:** Visualizing global footprint, supply chain dependencies, and geopolitical risk profiles.
- **Frontend Stack:** React 19, TypeScript, Vite, Tailwind CSS 4, Zustand 5, `react-globe.gl`, Three.js.
- **Backend Stack:** Python with FastAPI (SSE Streaming), LiteLLM (for local llama.cpp, Gemini, Featherless).
- **Research Pipeline:** Async generators, Pydantic, Brave Search API, Jina Reader API.

### From Concept to Reality: The "Parchment and Ink" Aesthetic
One of the most satisfying parts of this project was nailing the visual identity. I didn't want this to look like just another generic dashboard. I wanted it to feel like a modern intelligence brief mixed with classic cartography.

We landed on a "Parchment and Ink" style. The centerpiece is the interactive 3D globe built with `react-globe.gl` and Three.js, which maps out office hubs, supply chain arcs, and risk hotspots. Combining this with the integrated global strategy hub—featuring the Value Chain Matrix and Macro Risk Convergence panels—made the UI feel incredibly immersive.

### The Autonomous Research Agent: Structuring the Unstructured
The real beast of Dossigraphica is the Python Sidecar—an autonomous, local-first research agent pipeline. Instead of just querying an LLM, the pipeline executes a deterministic workflow:
1. **Planning:** Generating targeted search queries.
2. **Searching:** Using the Brave Discovery API to scour the web.
3. **Extraction & Sieve:** Using Jina Reader API for markdown extraction, followed by a Map-Reduce summarization.
4. **Entity Assembly:** Detecting data gaps and synthesizing geographic information.
5. **Drafting:** Parallel generation of structured JSON intelligence and rich Markdown dossiers.

Getting an LLM to reliably extract and structure geographic and supply chain data without hallucinating or losing context was a massive challenge.

### Challenges: Tracing, Assembly, and Rate Limits
Building an orchestration engine that runs multiple async tasks in parallel is never easy. 

I hit several walls during development:
- **Tracing Model Inputs and Outputs:** Debugging an agentic pipeline where the LLM is constantly communicating and restructuring data is hard. The current setup for logs and inference tracing helped immensely to peek under the hood and understand exactly where the agent was hallucinating or failing.
- **Entity Assembly and Enrichment Search:** This is the absolute beast step of the pipeline. Synthesizing disparate data points, identifying gaps, and enriching the geographic context takes the most time and tuning to perfect the answers.
- **API Bottlenecks and Quotas:** While the Gemini API handles the heavy lifting, the Jina Reader API turned out to be the current bottleneck for pipeline execution speed. Without an API key, the free tier limits you to 20 requests per minute, meaning bulk URL processing has to be carefully throttled.

### Tech Stack Reality Check: The Hybrid LLM Setup
Building the intelligence layer required moving past simple API calls and designing a resilient, hybrid orchestration system:
- **Model-Agnostic Architecture (High-Level):** The pipeline is structured to decouple the research logic from the underlying model provider. By implementing a unified routing layer, the system can dynamically switch between heavy-duty cloud models (Gemini) for complex entity synthesis, and local fallback instances for lighter tasks if needed (My 3070 did run a couple of research with Google new Gemma4 model, it was decent but not mind blowing and time consuming).
- **Unified Interface via LiteLLM (Technical Deep-Dive):** To achieve this flexibility without duplicating prompt engineering, the backend relies on `LiteLLM`. This acts as a proxy, mapping standardized OpenAI-compatible payloads to Gemini endpoints under the hood. This allows seamless integration with a local `llama.cpp` or Featherless server just by swapping an environment variable as you like (Funny how I started with this whole project using local LLM but now I am here using Gemini for everything lol).

### Final Thoughts
Dossigraphica sits right at the intersection of complex data orchestration and high-end data visualization. 

It’s proof that you can take unstructured web data, run it through an autonomous agentic pipeline, and render it into a highly structured, beautiful 3D intelligence dashboard (dashboard is just the side project but nice to again have this full-stack experience). It was an intense learning journey driven by curiosity and the desire to build something on my own to automate a task I find interesting (Geopolitical risk analysis of publicly traded companies). 

For now, I'm just enjoying watching the globe spin as the research agent seamlessly streams its findings into the UI.
