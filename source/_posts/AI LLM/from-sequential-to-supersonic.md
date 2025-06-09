---
title: "From Sequential to Supersonic: A Developer's Journey into Parallel LLM Queries"
date: 2025-06-09 12:00:00
tags:
  - Python
  - LLM
  - Concurrency
  - Performance
  - asyncio
  - FastAPI
categories:
  - AI Projects
---

When I first started building this application, my focus was on a simple goal: use a Large Language Model (LLM) to read dense SEC filings and extract structured, easy-to-digest insights. The initial prototype was magical. I could feed it the "Business" section of a 10-K filing, and it would return a beautiful JSON object with competitive advantages, key products, and more.

But then, I started to find out each analysis takes time especially when I wanted to analyze multiple sections like Business, Management's Discussion and Analysis (MD&A), Risk Factors, and Financials. Each of these sections required a separate LLM API call, and I was making those calls one after another in a synchronous loop.

That's when I hit the wall, together with the previous 'cache' implementation that wasn't caching anything. The user experience was not ideal, and I knew I had to do something about it. So in this post I will show how to transform a sequential script to a multi-layered concurrent application that feels responsive and powerful to reduce the wait time from **a couple of min** to just seconds.

<!-- more -->

### The Agony of the Synchronous Loop

My initial, naive implementation looked something like this in spirit:

```python
# The "Before" picture - a painful, sequential process
def get_comprehensive_analysis(ticker):
    # Each of these is a blocking LLM API call
    business_analysis = analyze_business_section(text) # Wait...
    mda_analysis = analyze_mda_section(text) # Wait some more...
    risk_analysis = analyze_risk_section(text) # Still waiting...
    financials = analyze_financials(data) # And wait again...

    return {
        "business": business_analysis,
        "mda": mda_analysis,
        "risks": risk_analysis,
        "financials": financials,
    }
```

A full analysis could take up to **three and half minute**. This wasn't just a bad user experience; it was an inefficient use of resources. I knew there had to be a better way. This realization kickstarted my journey into the world of Python concurrency.

### Level 1: High-Level Concurrency with `asyncio`

The first and most obvious optimization was to recognize that the analyses for Business, MD&A, and Risks were completely independent of each other. There was no reason to wait for one to finish before starting the next. This is a classic use case for asynchronous programming.

Since my application uses FastAPI, `asyncio` was the natural choice. By converting my analysis functions to `async def` and using `asyncio.gather`, I could fire off all the top-level requests at once.

My `dashboard_router.py` now orchestrates this nicely:

```python
# src/api/routers/dashboard_router.py (simplified)

import asyncio
from src.analysis.business import BusinessAnalyzer
from src.analysis.mda import MDAAnalyzer
from src.analysis.risk_factor import RiskFactorAnalyzer

async def comprehensive_analysis(ticker: str, ...):
    # ... (load company data)

    tasks = []
    task_names = []

    # Create analyzers
    business_analyzer = BusinessAnalyzer(use_concurrent=True)
    mda_analyzer = MDAAnalyzer(use_concurrent=True)
    risk_analyzer = RiskFactorAnalyzer(use_concurrent=True)

    # Schedule all top-level analyses to run concurrently
    if include_business:
        tasks.append(extract_section_analysis_async(company_manager, "Business", business_analyzer))
        task_names.append("business")

    if include_mda:
        tasks.append(extract_section_analysis_async(company_manager, "Management's Discussion and Analysis (MD&A)", mda_analyzer))
        task_names.append("mda")

    if include_risk_factors:
        tasks.append(extract_section_analysis_async(company_manager, "Risk Factors", risk_analyzer))
        task_names.append("risk_factors")

    # Run all tasks in parallel and wait for them all to complete
    results = await asyncio.gather(*tasks)

    # ... (process results)
```

**The result?** The total wait time was no longer the *sum* of all analysis times, but rather the time of the *single longest* analysis. Now without cache, a full analysis could take up to just **40 seconds**. A huge win!

### Level 2: Deeper Parallelism with `ThreadPoolExecutor`

As I celebrated my newfound speed, a new question emerged: could I go even deeper? A single analysis, like the "Business" section, is itself a request for multiple, independent pieces of information:
- Operational Overview
- Key Products
- Competitive Advantages
- Strategic Initiatives
- Business Segments
- And more...

My initial prompt was a massive, one-body instruction asking the LLM to extract everything at once. While it worked, it was brittle. The LLM would sometimes miss a section or get the format slightly wrong.

This led to my second "aha!" moment: what if I broke that one giant API call into several smaller, parallel calls?

This is where `concurrent.futures.ThreadPoolExecutor` came in. While `asyncio` is perfect for managing `async/await` coroutines, the `ThreadPoolExecutor` lets you run any function in a separate thread. This was perfect for my analyzer classes.

Here's how I implemented it in my `BusinessAnalyzer`:

```python
# src/analysis/business.py (simplified)

import concurrent.futures

class BusinessAnalyzer(BaseAnalyzer[BusinessAnalysisSection]):
    def __init__(self, ..., use_concurrent: bool = True):
        super().__init__(...)
        self.use_concurrent = use_concurrent
        if self.use_concurrent:
            # Each component gets its own specialized analyzer and prompt
            self._init_component_analyzers()

    def extract_concurrent(self, text: str) -> BusinessAnalysisSection:
        self.logger.info("Starting concurrent business analysis extraction")
        component_results = {}
        tasks = {
            "operational_overview": self._extract_component,
            "key_products": self._extract_component,
            "competitive_advantages": self._extract_component,
            # ... and so on for all sub-sections
        }

        # Use a thread pool to run all sub-extractions in parallel
        with concurrent.futures.ThreadPoolExecutor(max_workers=8) as executor:
            future_to_component = {
                executor.submit(task, component, text): component
                for component, task in tasks.items()
            }

            for future in concurrent.futures.as_completed(future_to_component):
                component_name = future_to_component[future]
                try:
                    result = future.result()
                    component_results[component_name] = result
                except Exception as e:
                    self.logger.error("Error extracting %s: %s", component_name, str(e))
                    # Crucially, I added a fallback to the single-prompt method
                    return self.extract(text) # Fallback to standard extraction

        return BusinessAnalysisSection(**component_results)
```

This two-tiered approach was a game-changer:
1.  **`asyncio.gather`** orchestrates the high-level analysis tasks (Business, MD&A, etc.).
2.  Within each of those tasks, a **`ThreadPoolExecutor`** runs multiple, smaller, more focused LLM queries in parallel.

This not only made the application even faster but also brought some unexpected benefits:
- **Increased Reliability:** Smaller, focused prompts are less likely to confuse the LLM.
- **Improved Resilience:** If the "Key Products" extraction fails, the other business components might still succeed. My code even includes a fallback to the "big prompt" method if the concurrent approach fails, making the system more robust.
- **Better Maintainability:** It's far easier to debug and refine a small prompt for "Key Products" than it is to tweak one monolithic prompt.
- **Enhanced LLM Response Quality:** Smaller, focused prompts often yield more accurate, deeper insights, as the LLM can concentrate on a specific aspect of the business without being overwhelmed by too much context.

### A Practical Lesson: Wrapping Lists for LLM Sanity

A quick but important lesson I learned was about JSON schema design for LLM outputs. I initially asked the model to return a root-level JSON array for things like a list of products (e.g., `[{"name": ...}, {"name": ...}]`). This was surprisingly flaky.

The fix was simple but powerful: I wrapped the list in an object.

Instead of `List[KeyProduct]`, my Pydantic model became:
```python
# src/models/business_model.py
class KeyProductList(BaseModel):
    """Wrapper model for a list of key products."""
    items: List[KeyProduct]
```
Now, I ask the LLM for `{"items": [...]}`. This simple change made the output parsing significantly more reliable.

### Conclusion: Concurrency is a Superpower for LLM Apps

My journey from a slow, sequential script to a multi-layered concurrent application was incredibly rewarding. It transformed the user experience and taught me a valuable lesson: for I/O-bound applications like those interacting with LLMs, concurrency isn't a "nice-to-have"—it's a core architectural requirement for building something fast, reliable, and scalable.

By combining the strengths of `asyncio` for top-level task management and `ThreadPoolExecutor` for deeper, parallel sub-tasks, I was able to build a system that feels responsive and powerful, turning long waits into a few moments of processing. If you're building with LLMs, I can't recommend enough that you dive into Python's concurrency toolset.
