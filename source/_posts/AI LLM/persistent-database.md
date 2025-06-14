---
title: 'Refactoring for Resilience: Introducing a Database Caching Layer'
date: 2025-06-14 23:15:27
tags:
  - Python
  - FastAPI
  - SQLAlchemy
  - Caching
  - Refactoring
  - Software Engineering
categories:
  - Project Update
---

For our financial analysis tool, the latest series of updates focuses on an architectural enhancement: the integration of a persistent database layer for caching, performance tracking, and data retention. This post details the changes, the rationale behind them, and how they set the stage for future development.

<!-- more -->

### The Problem: The Cost of Being Stateless

Previously, our application performed a complete, on-demand analysis for every API request. While this ensured the data was always fresh, it had significant drawbacks:

1.  **High Latency:** Every request, even for the same company ticker, would trigger a series of intensive data processing and expensive Large Language Model (LLM) calls.
2.  **Redundant Costs:** Analyzing the same filings repeatedly incurred unnecessary API costs.
3.  **No Historical Context:** It was impossible to look back at a previous analysis or compare results over time without re-running the entire process.
4.  **Poential Machine Learning Model (ML) Drift:** As the underlying data changed, the application had no way to track how analyses evolved over time.

The solution was clear: we needed a caching layer. Instead of a simple key-value store, I opted for a more structured solution using a SQLite database with SQLAlchemy.

### The Solution: A New Database-Driven Architecture

This update introduces a complete database backend to store the results of comprehensive analyses. This is a foundational change that refactors the application's core logic.

#### Key Components of the New Architecture:

*   **Database Models (`src/models/database_models.py`):** I've introduced two SQLAlchemy models: `Company` and `Analysis`. The `Analysis` table is the star of the show, storing not just the JSON blob of a completed analysis, but also the specific parameters used to generate it (`include_business`, `max_10k_history`, etc.), performance metrics like `cost_usd` and `processing_time`, and a timestamp.

*   **Repository Pattern (`src/repositories/analysis_repository.py`):** To maintain a clean separation of concerns, all direct database interactions are now handled by a new `AnalysisRepository`. This data access layer abstracts the database logic away from the API endpoints. The router is no longer responsible for how data is stored or retrieved; it simply asks the repository.

*   **Intelligent Caching Logic (`src/api/routers/dashboard_router.py`):** The main `comprehensive_analysis` endpoint has been significantly enhanced. Before initiating a new analysis, it now queries the `AnalysisRepository` for an existing result that matches the exact request parameters (ticker, sections to include, history length) and is within a specified age limit (e.g., 24 hours). If a valid entry is found, it's returned instantly, saving both time and money.

*   **Database Initialization (`src/db/init_db.py`):** The application now automatically initializes the SQLite database and creates the necessary tables on startup, ensuring a smooth first-run experience.

### Beyond Caching: New Endpoints and Robust Testing

This architectural shift also enabled new features and demanded a higher standard of testing.

*   **Analysis History:** I've added a new endpoint, `GET /analyses/{ticker}`, which allows users to retrieve a history of all previously run analyses for a given company. Another endpoint, `DELETE /analyses/{ticker}`, provides a way to clear the cache for a specific ticker.

*   **Comprehensive Testing (`tests/test_analysis_repository.py`):** A change this significant requires rigorous testing. I've built a full test suite for the `AnalysisRepository` using `pytest`. These tests cover everything from basic save-and-retrieve operations to more complex scenarios like ensuring parameter-matching works correctly, stale data is properly filtered by `max_age_hours`, and database relationships are sound.

### Retiring Old Code

With the introduction of this more sophisticated database layer, the old, file-based `OpenAICacheManager` has been deprecated. The new repository caches the entire, final analysis object, which is a much more efficient and powerful approach than caching individual, intermediate LLM calls.

### Final Thoughts

This change lays the groundwork for numerous future enhancements, such as tracking analysis changes over time, building more complex data visualizations, and providing deeper historical insights even for building machine learning models. 