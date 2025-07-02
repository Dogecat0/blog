---
title: "Building AI-Powered Weekly Reports in Synapse"
date: 2025-07-02 22:00:00
tags:
- Next.js
- LLM
- AI
- Zod
categories:
- Journal App
---

Raw data is valuable, but insights are transformative. Synapse has been good enough at capturing daily activities, but the next logical step has always been to synthesize that data into high-level understanding. Today's task is to implement the new feature on the roadmap: **AI-Powered Weekly Reports**.

This feature moves beyond simple data retrieval and uses LLM to analyze a week's worth of activities, generating a concise, structured summary of your time allocation, key accomplishments, and emerging trends.

<!-- more -->

### High-Level Architecture

The design is straightforward, focusing on reliability and efficiency. Storing the structured output from the LLM is a core principle, serving as a cache to prevent expensive re-computation and creating a historical dataset for future analysis.

The data flow is as follows:
1.  **User Request**: A `POST` request is sent from the frontend to `/api/reports` with a specific date.
2.  **API Endpoint**: The Next.js route handler checks if a report for that week already exists in the database. If so, it returns the cached version.
3.  **Data Retrieval**: If no report exists, the API fetches all relevant `Activity` entries for the calculated week from the PostgreSQL database via Prisma.
4.  **Report Agent**: The activities are passed to our new `reportAgent`, which bundles the data into a carefully engineered prompt.
5.  **LLM Analysis**: The agent sends the prompt to our local LLM, requesting a structured JSON response.
6.  **Validation & Storage**: The agent validates the LLM's JSON output against a Zod schema. On success, the structured content is saved to the new `Report` table in the database.
7.  **Response**: The newly created report is returned to the user.

### Key Technical Components

#### 1. Database Schema: Storing the Insights

We introduced a new `Report` model in our `prisma/schema.prisma`. Storing the output as `Json` is crucial for flexibility.

```prisma
// prisma/schema.prisma

model Report {
  id        String   @id @default(cuid())
  type      ReportType // WEEKLY or MONTHLY
  status    ReportStatus // PENDING, COMPLETED, FAILED
  startDate DateTime
  endDate   DateTime
  content   Json?      // The structured JSON from the LLM
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([type, startDate])
}
```

#### 2. The Report Agent: Enforcing Structure with Zod

Again, the import imperative is to ensure that the data we receive from the LLM adheres to a specific structure. The reportAgent uses Zod to define a strict schema for the expected output.

```JavaScript
// src/lib/reportAgent.ts

export const WeeklyReportSchema = z.object({
  title: z.string(),
  summary: z.string(),
  timeAnalysis: z.object({
    totalMinutes: z.number(),
    workMinutes: z.number(),
    lifeMinutes: z.number(),
    workLifeRatio: z.string(),
  }),
  keyActivities: z.array(z.object(/* ... */)),
  tagAnalysis: z.array(z.object(/* ... */)),
  insightsAndTrends: z.string()
});
```
The LLM is explicitly instructed to generate a JSON object conforming to this schema, which we then parse and validate before use.

#### 3. Final Thoughts
Once the backend is done, then the frontend features a new /reports page with a two-column layout. Also a dedicated <ReportViewer /> component receives the content JSON object and renders it into a human-readable format, including data visualizations for time analysis and tables for tag breakdowns.

Working with Gemini has made this process easy and straight forward from feature definition to architectural design and final implementation. I think the future work I will involve in (whatever kind, web, or mobile which I have never touched before), function or feature wise will be super straightforward. More interesting work to be carried and experimented would be model evaluation and fine-tuning to compare different models' performances.🚀🚀🚀