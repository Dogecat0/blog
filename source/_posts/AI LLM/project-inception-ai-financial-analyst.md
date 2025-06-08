---
title: "LLM Learning Journey: Building an LLM-powered Financial Analyst with an AI Coding Partner"
date: 2025-06-07 10:00:00
tags:
  - Python
  - FastAPI
  - LLM
  - OpenAI
  - FinTech
  - AI
categories:
  - AI Projects
---

It's been a while, but I'm happy to be back to blogging (helped by my AI assistants) with a new project and a new series! This is a dual experiment:

1.  Can we build an AI-powered tool to automate the analysis of complex financial documents for the purpose of learning the latest AI LLM techniques?
2.  How far can a developer push a project by truly _partnering_ with AI coding assistants?

I'll be sharing the journey right here.

### The Problem: Information Overload in Finance

Before the project I had not much experience with financial documents especially company filings, only a basic understanding of their importance and relevance. After spending some time digging into them, I realized the challenge: You're faced with mountains of dense, jargon-filled documents like 10-Ks and 10-Qs. Buried within these SEC filings is a goldmine of information about a company's performance, strategy, and risks. But extracting and understanding it is a tedious, manual process and never even mention that not all SEC filings themselves are not standardized.

There are many websites have information about companies like Yahoo Finance, Google Finance, and others. But to build a platform with LLMs that can truly understand and analyze these documents, it's essential to work directly with the raw data. This is where the SEC's EDGAR database comes in, providing access to all public filings.

<!-- more -->

### The Vision: An AI Analyst, Built by a Human-AI Team

The goal is to create a web application where a user can input a stock ticker and receive a comprehensive, AI-driven analysis. This isn't just about pulling numbers; it's about understanding the narrative and context behind them.

The application will break down the analysis into four key areas:

1.  **Financial History**: Interactive charts and trends from historical financial statements.
2.  **Business Analysis**: A deep dive into the company's operations, products, competitive advantages, and strategic initiatives.
3.  **MD&A (Management's Discussion & Analysis)**: Key takeaways and performance indicators directly from management's perspective.
4.  **Risk Factors**: A prioritized overview of the risks the company faces, complete with a severity and likelihood matrix.

### The Tech Stack

I've chosen a Python stack to bring this to life:

- **AI Coding Assistants**: My partners in crime. I'm using **GitHub Copilot** integrated with various powerful models like **Google's Gemini 2.5 Pro** and **Anthropic's Claude 3.7 Sonnet** to accelerate **every** part of the development process.
- **Backend**: `FastAPI` for a high-performance, asynchronous API.
- **Data Sourcing**: The excellent `edgartools` library to fetch filings directly from the SEC EDGAR database.
- **The "AI Brain"**: `OpenAI`'s API (specifically models like GPT-4o-mini) to read and interpret the raw text from the filings.
- **Data Modeling**: `Pydantic` to enforce strict, structured JSON outputs from the LLM, ensuring data quality and reliability.
- **Frontend**: Simple, server-side rendered HTML with Bootstrap so far to create a clean, functional dashboard. This will be updated ideally with React as currently UI is for the purpose of demo.

### How It Works: A High-Level Flow

1.  **User Input**: The user provides a stock ticker (e.g., `AAPL`) and an email (required for SEC API access) on the web interface.
2.  **Data Fetching**: The `CompanyDataManager` class uses `edgartools` to find the company and download its latest 10-K and 10-Q filings.
3.  **Section Extraction**: The application identifies and extracts the raw text from key sections like "Business," "Risk Factors," and "MD&A".
4.  **AI Analysis**: Each section's text is passed to a specialized "Analyzer" class (e.g., `BusinessAnalyzer`, `RiskFactorAnalyzer`). These analyzers use tailored prompts to instruct the LLM to extract specific information and structure it according to predefined Pydantic models. This is where the magic happens!
5.  **Data Structuring**: The LLM's JSON output is validated by the Pydantic models, ensuring the data is clean and consistent.
6.  **Display**: The structured data is then passed to the Jinja2 templates, which render the final interactive dashboard for the user.

Here's a look at the project's core structure:

```
src/
├── api/          # FastAPI, routers, and templates
├── analysis/     # The LLM-powered analyzer classes
├── data/         # EDGAR data fetching and management
├── financial/    # Financial statement extraction and formatting
├── models/       # Pydantic models for structured data
└── utils/        # Common utilities, including the base analyzer
```

### What's Next?

This is just the beginning. The foundation is laid, but building a reliable AI system requires more than just calling an API. Next post will dive a bit more into the architecture and the core components of the application, including how the AI assistants are integrated into the development process.
