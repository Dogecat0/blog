---
title: "From .txt to Web App: Building a Journaling System with Gemini's Help"
date: 2025-06-27 22:30:00
tags: 
  - Engineering
  - LLM
  - Gemini
  - Next.js
  - Journaling
  - LLM
  - Voice Input
category:
  - Journal App
---

For a while now, I've maintained a daily journal in a simple text file. It's a straightforward system: I write the date, then list my activities under `WORK:` and `LIFE:` headers. This approach is simple and low-friction, but as the file grew, its limitations became obvious. Searching for specific activities was a `grep`-and-pray operation, and any form of analysis was purely manual. The data had no structure.

<!-- more -->

To solve this, I decided to build a simple web application. The goal was to provide a clean interface for entering and viewing journal entries, storing the data in a structured way, and paving the road for future analysis. I used Gemini as a development assistant throughout the process, particularly for the most tedious part: data migration.

### The Technical Stack

Gemini helped me to keep the stack simple and modern, centered around TypeScript (which I never used to create app before):
*   **Framework:** Next.js (App Router)
*   **Styling:** Tailwind CSS
*   **ORM/Database:** Prisma with SQLite
*   **Data Processing:** A Node.js script utilizing a local LLM (Google's Gemma model, served via Ollama).

The choice of SQLite via Prisma is intentional. It's file-based, requires zero setup, and is more than sufficient for a personal project like this.

### The First Hurdle: Migrating Unstructured Text

One of the biggest challenge was migrating my historical journal entries from a single `.txt` file into the structured database defined by Prisma schema.

Manually parsing each entry, extracting descriptions, estimating durations, and formatting notes would have been a significant time sink and incredibly error-prone. This is where I decided to leverage a small, local-friendly LLM to help me with this simple task.

### Using an LLM for Structured Data Extraction
I asked Gemini to write a script, import-journal.mjs, to automate the migration. The core idea is to feed each day's raw text to an LLM and have it return a structured JSON object that I can directly insert into my database.
The key to making this reliable is prompt engineering combined with JSON Schema enforcement. Instead of just asking the model to "extract the data," I provided a strict schema for the output.
First, I defined the expected output structure using Zod, which can then be converted to a JSON Schema.

```javascript
// Zod schema for the LLM's output
const JournalDataSchema = z.object({
  workActivities: z.array(ActivitySchema),
  lifeActivities: z.array(ActivitySchema)
}).required();
```

Then, I used the openai library (pointed at my local Ollama endpoint) and its response_format feature to force the model's output to conform to this schema. This ensures data reliability.

```javascript
const completion = await openai.chat.completions.create({
    model: 'gemma3n:latest', // My local model
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.1,
    response_format: {
        type: "json_schema",
        json_schema: {
            name: 'journal_data',
            schema: z.toJSONSchema(JournalDataSchema),
            strict: true,
        },
    },
});
```
### Use of Ollama

Ollama is a powerful tool that allows me to run LLMs locally. It's a quite straightforward set up, and especially for simple tasks like this where I just need to process text data with no necessity to pay for API calls.

### The Journal Application
With the data sorted, building the app itself was straightforward.
1. API Endpoint (/api/journal): A single route handles GET and POST requests. The POST logic uses prisma.journalEntry.upsert which elegantly handles both creating a new entry and overwriting an existing one if the user is editing. This is controlled by a force flag from the client.
2. New/Edit Entry Form (/journal/new): A form that dynamically adds or removes activity blocks for both "Work" and "Life" categories. When a date is selected, it first checks if an entry for that date already exists. If so, it populates the form with existing data, switching to an "edit" mode.
3. View Entries (/journal/view): A two-pane layout. On the left, a timeline of all journal entries. Clicking an entry displays its full, formatted details on the right. This makes browsing history much more efficient than scrolling through a text file.

### Next Steps: Quantifying Life with ML
Now that I have clean, structured way to input data, the real work can begin. The current application is a solid foundation, but the end goal is to use this data for more advanced analysis **(yes, life analysis, sounds mad but who does not want a tangible way to measure their life if possible? Afterall life is like playing games at most times)** and to improve the user experience. Here's the (**fantasized**) roadmap:

1. **LLM-Powered Semantic Search and Progress Synthesis:** A standard keyword search is limited. I plan to implement a feature where a user can ask a natural language question like, "Show me my progress on the API refactor." This would trigger a Retrieval-Augmented Generation (RAG) pipeline. First, the query would be converted to a vector embedding to perform a semantic search across all journal entries, finding relevant activities even if they don't use the exact keywords. Then, the retrieved entries would be fed to an LLM to generate a concise summary of the progress, blockers, and time spent on that top

2. **Correlation Analysis and Reporting:** 
With a growing dataset, I can build dashboards to find correlations. For example, does more time spent on "meetings" impact time allocated to "deep work" or "exercise"? A model could also generate automated weekly reports summarizing time allocation and highlighting trends.

3. **Voice-to-Data Pipeline for Hands-Free Entry:** Typing is a point of friction. The next major UX improvement will be voice input. The plan is to integrate a speech-to-text model (like a self-hosted Whisper or a cloud API). The pipeline would be simple and modular:
User records their journal entry via microphone.
The audio is transcribed to raw text.
This raw text is fed into the exact same LLM data extraction endpoint I've already built.
This reuses the core backend logic, making it an efficient way to add a powerful new input method.

As I am writing this blog and building the app, I'm constantly feeling the leverage that LLM can provide to solve a personal problem to individuals like you and me. The massive productivity boost let me focus on what truly matters: reflecting on my experiences and learning from them. :)