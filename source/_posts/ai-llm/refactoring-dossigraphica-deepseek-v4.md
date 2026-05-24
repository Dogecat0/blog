---
title: "Completeness Audits of Dossigraphica: DeepSeek V4 Flash on AMD and Amazon"
date: 2026-05-24
categories: [AI Development, Dossigraphica]
tags: [python, llm, deepseek, gemini, evaluation, geoint]
---

Finished a refactor of the Dossigraphica research pipeline, switched the model from Gemini 3 Flash Lite to DeepSeek V4 Flash. Run first two tests on AMD and Amazon. The results are a fascinating window into where the pipeline stands today. To be honest, it's not like the fix was intended to get the results that we are measuring now but after the first review of the tests, the completeness and robustness of data compared to previous version is impressive. This also led me to think a bit about measuring the output quality in an agentic extraction system.

<!-- more -->

### The Completeness Framework

Before diving into numbers, here's how the evaluation works. Every dossier JSON output is scored across six content dimensions using a two-layer system:

1. **Schema compliance** — Are all defined fields populated? (binary: yes/no per field)
2. **Quality-weighted depth** — How rich is the data? (0-100% per dimension, accounting for precision, coverage, and internal consistency)

The weighted overall score combines these into a single number that penalizes shallow data while rewarding structural completeness. The framework also tags every gap as either a **pipeline failure** (fixable in code) or a **public-data constraint** (no model can fix it). I think we can say this public data constraint can be trusted because the current context window per request for DeepSeek V4 Flash is 1M and the output limit is roughly 390k tokens, this is quite massive.

---

### AMD: 75.8% Weighted Completeness

AMD was the first full test. As a semiconductor company, it has a concentrated customer base, a geographically distributed office network, and a supply chain that depends heavily on TSMC in Taiwan. Here's how it scored:

| Dimension | Score |
|---|---|
| Schema Field Coverage | **85.7%** — 12/14 top-level blocks; `taxDisclosures` and `subsidiaries` missing |
| Office Geography | **70.8%** — 112 offices across 31 countries |
| Revenue Geography | **60.0%** — 7 segments, all with revenue but **0/7 with YoY growth** |
| Supply Chain | **75.0%** — 9 nodes, 3 of 7 roles used |
| Customer Concentration | **44.4%** — 27 customers, only Sony at 18% has disclosed revenue |
| Geopolitical Risks | **80.0%** — 11 risks, 6 of 10 categories covered |

**Key insights:**

Two blocks are absent (`taxDisclosures`, `subsidiaries`) in `GeoIntelligenceSchema` — a pattern shared with AMZN, suggesting a pipeline scope gap, not a per-run quality issue. Within the blocks we do produce, structural key-presence is 100%.

The **YoY revenue growth gap** (0/7 segments) is a textbook public-data constraint. AMD doesn't disclose quarterly geographic revenue breakdowns in their earnings releases—the entire revenue section uses FY2024 percentages as a proxy for Q1 2026. The pipeline correctly documents this, but it still drags the Revenue Geography score down.

The **customer concentration score (44.4%)** looks bad on paper, but context matters. Only Sony at 18% is SEC-disclosed. Microsoft, Meta, AWS, Google, Tencent, Oracle—all strategic partners, all undisclosed because no single customer exceeds 10% of AMD's revenue except Sony. That should be a public-data constraint.

The **supply chain** captured TSMC, UMC, SPIL, and KYEC in Taiwan (44% concentration across foundry and assembly roles) but missed four role types: `raw_material`, `logistics`, `key_supplier`, `cloud_infrastructure`. For a fabless semiconductor company that depends on silicon wafer suppliers, EDA tools, and packaging partners, this is a real gap. The enrichment search needs better coverage for this.

---

### Amazon: 72.4% Weighted Completeness

Amazon was the harder test. As a sprawling e-commerce and cloud computing company, its data profile looks completely different from AMD's—and the pipeline struggled in different ways.

| Dimension | Score |
|---|---|
| Schema Field Coverage | **85.7%** — 12 of 14 top-level blocks populated; `taxDisclosures` and `subsidiaries` missing |
| Office Geography | **70.0%** — 12 offices, but only 3 Louisiana data centers vs AWS's 114 AZs across 36 regions |
| Revenue Geography | **70.0%** — 8 segments, core 3 sum perfectly to $181.5B, but 5 supplementary country entries have no revenue values |
| Supply Chain | **87.5%** — 51 nodes, 6 of 7 roles used, but **0/51 have source citations** |
| Customer Concentration | **30.0%** — 106 customers, **zero have any revenue data** |
| Geopolitical Risks | **86.7%** — 15 risks, strong breadth, but `regulatory_compliance` is overloaded with 6 distinct risks under one label |

**Key insights:**

The **supply chain source citation gap** is the most embarrassing finding. 51 nodes extracted, zero have source URLs. The pipeline clearly captured the entities but dropped attribution somewhere in the extraction step.

The **customer concentration score (30.0%)** is the lowest across both companies. Not a single customer of 106 has any revenue sizing. Amazon's AWS business is genuinely diversified across millions of customers—no single entity exceeds 10% per SEC rules—but the pipeline doesn't surface contract sizes, segment-level disclosures, or even qualitative estimates. This is partly a public-data constraint and partly a prompt design gap (the LLM doesn't attempt to infer ranges from disclosed information).

The **AWS infrastructure under-representation** is a domain-specific search gap. 3 Louisiana data centers are captured versus AWS's 114 Availability Zones across 36 regions. The pipeline found what was in the search results but didn't do a dedicated AWS infrastructure sweep. But in practice, data center itself is a big topic, this might be an individual feature we can add.

---

### Cross-Company Analysis: Pipeline Failures vs. Data Constraints

Running both audits together reveals a clear pattern. Here's every gap categorized by whether the pipeline can fix it:

| Gap | AMD | AMZN | Type |
|---|---|---|---|
| Source citations missing | ✅ All present | ❌ 0/51 | **Pipeline fixable** — schema validation |
| Schema blocks missing | ✅ All present | ❌ 2/14 | **Pipeline fixable** — prompt coverage |
| Customer revenue depth | ❌ 25/27 undisclosed | ❌ 106/106 undisclosed | Public-data limited (most of it) |
| YoY revenue growth | ❌ All segments | ❌ 5/8 entries | Public-data limited |
| Missing supply chain roles | ❌ 4 of 7 | ✅ 1 of 7 | Partially fixable — better search templates |

---

### Validating Output Quality from Completeness Metrics

**Consistency across diverse companies is the real signal.** A pipeline that scores 75% on AMD and 72% on Amazon—two wildly different company profiles (semiconductor vs. e-commerce/cloud)—is more trustworthy than one that scores 90% on one type and 50% on another. The spread between scores suggests the pipeline's capabilities generalize reasonably well, with the variance driven by genuine data-availability differences.

**Per-dimension scores are more actionable than the overall number.** The overall score is good for headlines, but the per-dimension breakdown drives decisions. Customer Concentration at 44.4% (AMD) vs 30.0% (Amazon) looks alarming until you realize both are public-data constraints at different levels. Supply Chain at 75.0% (AMD) vs 87.5% (Amazon) suggests the pipeline handles Amazon's service-oriented supply chain better than AMD's complex semiconductor one—but the zero-source-citation problem on Amazon's side means that 87.5% is actually less reliable than the 75.0%.

**A practical validation workflow** for any new dossier output:

1. **Schema validation** — Did all fields populate? If no, find the missing blocks first.
2. **Source citation audit** — Every entity should have a `sources` array. Empty sources means the extraction step dropped attribution.
4. **Cross-reference with public filings** — For SEC-disclosed metrics (total revenue, segment counts, material customers), the pipeline output should match. Discrepancies here indicate hallucination. (We have a lot mature filingd APIs like `edgartool` used in Aperilex could be utilized again here for future integration)
5. **Gap classification** — Tag each missing piece as "pipeline fixable" or "public-data limited." This prevents wasting effort on impossible improvements.
6. **Historical comparison** — Compare against previous runs for the same company. A score that jumps or drops more than 5 points without a pipeline change signals instability.

---

### Final Thoughts

The 75.8% and 72.4% completeness scores tell me the pipeline works—it produces structurally sound dossiers with clearly documented limitations.

The exercises after the refactor show that the pipeline is a good foundation, with big improvements in both schema coverage and the leaf-level extraction quality compared to the previous version. Will find a time dive a bit deeper of this refactor and share more details.


