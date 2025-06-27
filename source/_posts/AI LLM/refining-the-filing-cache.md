---
title: "Debugging the Engine: Fixing a Broken Filing Cache"
date: 2025-06-08 11:00:00
tags:
- Python
- FastAPI
- Optimization
- Caching
- Architecture
- AI
- Copilot
categories:
- SEC Analysis
---

After running a few analyses, I noticed from the logs that with the existing edgar caching strategy, it still made HTTP requests and my terminal logs showed that the app was re-downloading the same SEC filings over and over.

The caching layer, which was supposed to prevent this, was clearly not working. This post is a chronicle of a classic developer experience: realizing a core feature isn't working as intended and diving in to fix it.

<!-- more -->

### The Problem: A Cache That Wasn't Caching

The initial implementation of my `CompanyDataManager` and `EdgarCache` were designed to be simple. The idea was that it would use a cached HTTP client from `hishel` to avoid repeatedly hitting the SEC's EDGAR database. However, I made a critical architectural mistake.

The `edgar` library needs its HTTP client caching `edgar.httpclient_cache` to be initialized properly to fetch resources like `company_tickers.json`.

```python
edgar.httpclient_cache.install_cached_client(
    cache_directory=cache_directory,
    controller_args={
        "force_cache": True,    # Cache all responses
        "allow_stale": True,    # Serve stale cache if revalidation fails (good for offline/rate limits)
        "cacheable_methods": ["GET", "POST"] # Methods to cache
    }
)
```

By moving the lifespan function from `src/api/routers/dashboard_router.py` to `src/api/main.py` and applying it to the main FastAPI application, I ensured that `install_cached_client` is called once when the application starts.
This means that the HTTP client is configured with caching enabled right from the start, allowing it to cache responses effectively.

Also, the `lifespan` is a special async context manager that FastAPI executes on startup. Any code before the `yield` runs once when the server boots up. This is the perfect place to set up global resources like our HTTP client and its cache.

I refactored `src/api/main.py` to include this:

```python
from contextlib import asynccontextmanager
from fastapi import FastAPI
from edgar.httpclient_cache import install_cached_client
from pathlib import Path

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan event handler for the FastAPI application.
    Initializes the Edgar HTTP client with caching ONCE on startup.
    """
    print("Application startup: Initializing EDGAR client cache...")
    cache_dir = Path(".cache/edgar")
    cache_dir.mkdir(parents=True, exist_ok=True)
    
    # This now runs only once!
    install_cached_client(cache_dir)
    
    yield
    
    # Code here would run on shutdown (e.g., for cleanup)
    print("Application shutdown.")

app = FastAPI(lifespan=lifespan)
```

### The Result: A Night and Day Difference

**Cache Directory:** By default, src.data.edgar_cache.setup_python_edgar_caching will use the PYTHON_EDGAR_CACHE_DIR constant defined in edgar_cache.py (which is Path("python_edgar_hishel_cache")). This directory will be created if it doesn't exist.

**Caching Behavior:** The function configures edgartools to use hishel with force_cache=True and allow_stale=True. This means:

`force_cache=True`: All responses from edgartools will be cached.
`allow_stale=True`: If the cache has a response but an update fails (e.g., network issue), the stale cached response will be served. This is good for offline use or if you hit rate limits.

The impact was immediate.
-   **First Request for a Ticker:** Takes around 20s with cached OpenAI response as it downloads and caches the filings.
-   **Subsequent Requests for the Same Ticker:** Nearly halved to 10s per analysis. The data is pulled directly from the local disk cache.

This not only dramatically improves the user experience but also makes the application a better citizen by reducing the load on the SEC's servers and slashing my data transfer.


### What's Next?

With a fast and reliable data pipeline, we can finally start to trust our development process. The broken cache was a major obstacle, and fixing it was a necessary step before we could move on to the most important part: evaluation the model's output as I've noticed there are some discrepency in 10-K filings and the model's output.