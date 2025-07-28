---
title: "Seeing is Believing: A Tale of Two Demos (and the Power of Caching)"
date: 2025-06-10
tags:
- Python
- FastAPI
- AI
categories:
- SEC Analysis
---

In this post, I want to *show* you the demo for the project after making the caching work. Below are two demos of the exact same analysis request. The only difference is that one is a cold start, and the other benefits from the now-functional cache.

<!-- more -->

### Demo 1: The Cold Start (Without Cache)

This first demo shows what happens when the application analyzes a ticker for the very first time.

**What's happening behind the scenes:**
1.  The user requests an analysis for a new ticker.
2.  The data layer connects to the SEC EDGAR database through HTTP requests.
3.  It downloads multiple large filing documents (10-Ks and 10-Qs). This network operation is the source of the delay.
4.  Once the data is downloaded, the AI analysis proceeds.
5.  The filing data and LLM response data (in this case, OpenAI response) are saved to a local cache for future use.

<iframe width="100%" height="400" src="https://www.youtube.com/embed/yFU5igLJ2dk" 
    title="SEC Filing Analysis Demo" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
</iframe>
<p class="text-center text-muted mt-2"><em>Analysis without a pre-existing cache. The analysis roughly takes <strong>40 seconds</strong> to complete.</em></p>

### Demo 2: The Warm Start (With Cache)

Now, let's run the *exact same analysis request* a second time.

**What's happening now:**
1.  The user requests the same analysis again.
2.  The data layer first checks the local cache directory we configured in the `lifespan` function.
3.  **Cache Hit!** It finds the required filing documents then LLM response on the local disk.
4.  The data is loaded directly from the disk, completely bypassing the slow internet download.
5.  The AI analysis proceeds within <strong>10 seconds</strong>.

<iframe width="100%" height="400" src="https://www.youtube.com/embed/GT1UkYdeBbA" 
    title="SEC Filing Analysis Demo" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
</iframe>
<p class="text-center text-muted mt-2"><em>The exact same analysis, but this time the data is served from the local cache.</em></p>

The difference is quite exciting. The analysis is now nearly *'instantaneous'*.

**PS:** Never thought this would be the first Youtube video I'd ever made and posted online, but here we are as embedding an iframe in Hexo for blogs seems quite straightforward. I hope you enjoyed the demo and found it insightful. :)
