---
title: "Anatomy of an AI Financial Analyst: From Raw Filing to Interactive Dashboard"
date: 2025-06-07 11:00:00
tags:
  - Python
  - FastAPI
  - LLM
  - Pydantic
  - Architecture
  - AI
categories:
  - SEC Analysis
---

In the last post, I briefly outlined the project for an AI-powered tool to analyze SEC filings. In this blog, I'm diving deep into the architecture and core components that form the engine of this financial analyst.

We'll dissect the journey of a single user request, from a ticker symbol entered into a form all the way to a rich, interactive dashboard filled with AI-generated insights.

<!-- more -->

### The Architectural Blueprint

A robust application needs a clean separation of concerns. I've structured the project with AI assistants into three main layers, each with a distinct responsibility:

1.  **The Data Layer**: Responsible for fetching, caching, and serving the raw financial documents.
2.  **The Analysis (AI) Layer**: The "brain" of the operation, where LLMs interpret the raw text and extract structured information.
3.  **The Presentation Layer**: A `FastAPI` web server that orchestrates the process and displays the results in a user-friendly UI.

Let's break down each one.

### 1. The Foundation: The Data Layer

Before any analysis can happen, we need data. The U.S. Securities and Exchange Commission (SEC) provides this through its EDGAR database.

The `CompanyDataManager` class is the gateway to this data. It uses the `edgartools` library to:

- Identify a company by its ticker symbol (e.g., `TSLA`).
- Fetch a list of its recent filings (10-Ks for annual reports, 10-Qs for quarterly).
- Extract the raw text content of specific sections, like "Business" or "Risk Factors."

A crucial consideration here is performance and cost. Hitting the SEC's servers for the same large document repeatedly is inefficient. To solve this, I've implemented a caching layer using `hishel`, which automatically saves downloaded filings to disk.

```python
# src/data/company_data.py
class CompanyDataManager:
    def __init__(self, email: str):
        # Configure caching for all EDGAR requests
        httpx.Client = EdgarCache.CachedClient
        set_identity(email)
        # ...

    def load_company(self, ticker: str):
        self.company = Company(ticker)
        # Fetches a list of 10-K and 10-Q filings
        self.load_multiple_filings([FilingType.FORM_10K, FilingType.FORM_10Q])
        # ...

    def get_item_text(self, item_name: str) -> Optional[str]:
        # ... returns the raw text of a filing section ...
```

### 2. The Brain: The AI Analysis Core

This is where the LLM magic happens. I've designed a pattern using a `BaseAnalyzer` class that can be extended for different types of analysis.

The key to getting reliable, structured data from an LLM is a combination of two things: a **clear prompt** and a **strict output schema**.

1.  **The Prompts**: Each analyzer (`BusinessAnalyzer`, `RiskFactorAnalyzer`, etc.) has a highly specific system prompt that tells the LLM its role and what to look for.
2.  **The Schema with Pydantic**: I define the exact JSON structure I want using Pydantic models. This schema is then injected directly into the system prompt. This tells the LLM _exactly_ how to format its response.

For example, to analyze risk factors, I have a `RiskFactor` Pydantic model:

```python
# src/models/risk_factor_model.py
class RiskSeverity(str, Enum):
    LOW = "Low"
    MODERATE = "Moderate"
    HIGH = "High"
    CRITICAL = "Critical"

class RiskFactor(BaseModel):
    category: RiskCategory
    title: str
    description: str
    severity: RiskSeverity
    likelihood: RiskLikelihood
    # ... and other fields
```

The `RiskFactorAnalyzer` uses this model to generate its prompt and validate the LLM's output. If the response doesn't match the schema, Pydantic raises an error, ensuring data integrity. This makes the system far more robust than just parsing free-form text.

### 3. The Face: The API and Frontend

With structured data in hand, the final step is to present it to the user. I chose `FastAPI` for its speed and simplicity.

A single, powerful endpoint `/analyze/{ticker}` orchestrates the entire process:

- It initializes the `CompanyDataManager`.
- It runs the requested analyzers (`Business`, `MD&A`, `Risks`) in parallel using `asyncio.gather()` for maximum speed.
- It aggregates the results.
- It passes the final, structured templates for rendering.

The frontend really showed the power of **Claude Sonnet 3.7**. The design is intentionally simple: server-side rendered HTML with Bootstrap and a touch of JavaScript for interactivity (like the financial charts). This keeps the focus on the data.

React is in consideration in the future learning work but for now the frontend only serves the demo purpose.

### The Scaffolding: Guiding the AI

To make this partnership even more effective, I established a set of ground rules. One of the first files I created was `.github/copilot-instructions.md`. This file tells my AI assistant about the project's standards, preferred libraries, and architectural patterns.

For example, I specified:

- **Adhere to Project Standards**: Follow the coding style and patterns already in the project.
- **Use Existing Code**: Leverage existing functions and classes where appropriate.
- **Error Handling**: Include basic, sensible error handling.
- **Testing**: Generate tests using `pytest`.

This context file acts like a "project constitution" for my AI partner, ensuring its suggestions are consistent and high-quality.

### What's Next?

We've gone from concept to a working end-to-end application. The human-AI collaboration has proven to be a massive productivity boost. But is the _output_ of our application any good? And what's the damage to my OpenAI bill?

In the next post, we'll answer those questions by building a robust evaluation and cost-tracking framework.
