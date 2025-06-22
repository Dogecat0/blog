---
title: "The Illusion of Quarterly Data: Correctly Calculating Financials from SEC Filings"
date: 2025-06-22 21:30:00
tags:
  - Python
  - Finance
  - Data Engineering
  - SEC
  - 10-K
  - 10-Q
  - FastAPI
categories:
  - Technical Deep Dive
---

When building financial analysis tools, one of the most common and dangerous assumptions is that the financial data you receive—whether from an API or directly from SEC filings—represents discrete, isolated time periods. A "Q2" report, for instance, should contain data only for the second quarter. Right?

Unfortunately, this is often not the case. Raw SEC filings, specifically the quarterly `10-Q` and annual `10-K` reports, follow reporting rules that can be misleading if taken at face value. In this post, I'll walk through the challenges of parsing these documents and present a robust Python solution to derive true, discrete quarterly financial figures.

<!-- more -->

### The Core Problem: Cumulative vs. Discrete Data

The primary challenge lies in how different financial statements are reported throughout a fiscal year.

1.  **Income Statement**: This is generally straightforward. A `10-Q` income statement covers the specific three-month period. However, the `10-K` income statement covers the **entire twelve-month fiscal year**, not just the fourth quarter. To get true Q4 data, you must manually calculate it:
    `Q4 = Annual (10-K) - Q1 - Q2 - Q3`

2.  **Cash Flow Statement & Statement of Changes in Equity**: These are the tricky ones. They are almost always reported on a **cumulative, year-to-date basis**.
    *   The **Q1** report shows data for the first three months.
    *   The **Q2** report shows data for the **first six months** (`Q1 + actual Q2`).
    *   The **Q3** report shows data for the **first nine months** (`Q2_cumulative + actual Q3`).
    *   The **`10-K`** shows data for the full twelve months.

To get the actual data for each quarter, you must perform sequential subtraction:
*   `Actual Q2 = Q2_cumulative - Q1_cumulative`
*   `Actual Q3 = Q3_cumulative - Q2_cumulative`
*   `Actual Q4 = Annual (10-K) - Q3_cumulative`

### The First Trap: Assuming a Calendar Year

My initial approach was to group all filings by their calendar year (`2023`, `2024`, etc.) and perform the calculations within each group. This failed immediately.

**Why it's wrong:** Many companies (like Microsoft, Adobe, and Nike) have fiscal years that don't align with the calendar year. A company's fiscal year might run from July to June. Grouping by calendar year would split a single fiscal year's filings into two different groups, making all subsequent calculations incorrect.

### The Golden Principle: Sequential Grouping by `10-K`

The correct approach is to ignore calendar dates for grouping and instead use the filings' own reporting sequence. A fiscal year of reports follows a reliable pattern:

> **Three `10-Q` filings are followed by one `10-K` filing.**

This `10-K` serves as the delimiter for a complete fiscal period. By processing a chronologically sorted list of filings, we can group them into fiscal years by collecting all `10-Q`s until we encounter a `10-K`, which concludes that group.

### The Python Implementation

I implemented the logic with the help of Gemini in our FastAPI backend. The goal is to create a function, `_calculate_quarterly_figures`, that takes a list of formatted financial statement objects and returns a new list with the data adjusted.

First, a simple helper to subtract metrics from one statement dictionary using another.

Then, the main function that implements the sequential grouping and then applies our calculation rules.

The actual implementation is `straightforward` with the power of Gemini, but the logic is crucial.

### Key Takeaways
1. **Understand Reporting Rules**: Always be aware of how financial statements are reported. Don't assume that a `10-Q` or `10-K` contains only the data which is well defined and formatted. Always check the reporting period and cumulative nature (or other kind) of the data.
2. **Group by Fiscal Year, Not Calendar Year**: Use the `10-K` as the delimiter for fiscal years. This ensures that you correctly group all filings related to a single fiscal year.

