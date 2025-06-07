---
title: "Measuring What Matters: Building an Evaluation and Cost-Tracking Framework for my AI Financial Analyst"
date: 2025-06-07 21:30:00
tags:
  - Python
  - LLM
  - MLOps
  - Evaluation
  - Cost Management
  - AI
categories:
  - AI Projects
---

In this post, we will dive a bit into model evaluation. Building with Large Language Models (LLMs) presents two major challenges:

1.  **How do you know if the output is any good?**
2.  **How do you prevent API costs from spiraling out of control?**

Today, I tackled both of these head-on by building a robust evaluation and cost-tracking framework. It's an (again) interesting but necessary step for moving from a fun prototype to a reliable tool.

<!-- more -->

### The Goal: Confidence in Quality and Cost

I wanted a system that could answer these questions automatically:

- When I change a prompt, does the analysis quality get better or worse?
- Which part of the analysis is the most expensive?
- Can I quantify the trade-off between cost and quality for different LLM models?

To do this, My AI assistants have helped me build three key components: a golden data generator, a model evaluator, and a centralized cost registry.

### Step 1: Establishing the "Golden Truth"

You can't evaluate quality without a benchmark. I created a script, `create_golden_data.py`, to generate a "golden set" of ideal analysis outputs for a few representative tickers (like AMZN, MSFT, MA).

```python
# scripts/create_golden_data.py

async def create_golden_file(ticker: str, email: str):
    """Run comprehensive analysis and save results as a golden file."""
    logger.info("Creating golden file for ticker: %s", ticker)

    # ... setup ...
    response = await comprehensive_analysis(
        ticker=ticker,
        include_financials_history=True,
        # ... other flags ...
    )

    # Save the complete, ideal JSON output
    output_path = os.path.join(GOLDEN_DIR, f"{ticker}.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(response.model_dump(), f, indent=2)
    # ...
```

This script runs the full analysis pipeline and saves the structured JSON output. This becomes the "correct" answer that future runs will be compared against.

### Step 2: Tracking Every Penny with `CostTracker` and `CostRegistry`

LLM costs are measured in fractions of a cent per thousand tokens, which can add up deceptively fast. I needed a way to track this meticulously.

First, I created `CostTracker`, a simple class to record each API request's model, token counts, and purpose.

```python
# src/utils/cost_tracker.py
@dataclass
class LLMRequest:
    model: str
    prompt_tokens: int
    completion_tokens: int
    request_type: str

@dataclass
class CostTracker:
    requests: List[LLMRequest] = field(default_factory=list)

    def add_request(self, request: LLMRequest) -> None:
        self.requests.append(request)

    def get_total_cost(self) -> float:
        # ... calculates cost based on model pricing ...
```

But with multiple analyzers (for Business, MD&A, Risks) running concurrently, passing a `CostTracker` instance around would be messy. The solution? A singleton `CostRegistry`.

```python
# src/utils/cost_registry.py
class CostRegistry:
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        # Singleton pattern implementation
        ...

    def register_tracker(self, component_name: str, tracker: CostTracker):
        self.trackers[component_name] = tracker

    def get_total_cost(self) -> float:
        # ... aggregates costs from all registered trackers ...
```

Now, each `BaseAnalyzer` and `BaseFormatter` automatically registers its own `CostTracker` with the central registry upon initialization. This is clean, decoupled, and works seamlessly with concurrent execution.

```python
# src/utils/base_analyzer.py
class BaseAnalyzer(Generic[T]):
    def __init__(self, ...):
        self.cost_tracker = CostTracker()
        # Register this analyzer's cost tracker with the registry
        component_name = self.__class__.__name__.lower().replace("analyzer", "")
        CostRegistry().register_tracker(component_name, self.cost_tracker)
```

### Step 3: The Evaluation Harness

With the golden set and cost tracking in place, the final piece was the evaluation script, `model_evaluation.py`. This script:

1.  Takes a list of tickers to test.
2.  Runs the full, current analysis pipeline for each one.
3.  Loads the corresponding "golden" file.
4.  **Compares the results**, calculating metrics like `parse_success_rate` (did the section get extracted at all?) and `field_fill_rate` (how many optional fields were successfully populated?).
5.  **Pulls cost data** from the `CostRegistry`.
6.  Saves a detailed JSON report with metrics and cost breakdowns.

```python
# scripts/model_evaluation.py

async def evaluate_ticker(ticker: str, email: str):
    # Reset the cost registry for a clean run
    cost_registry = CostRegistry()
    cost_registry.reset()

    # Run the analysis
    actual = await comprehensive_analysis(...)

    # Load the benchmark
    golden = load_golden(ticker)

    # Compare and calculate metrics
    parse_rate, fill_rate = compare_results(golden, actual.model_dump())

    # Get costs from the central registry
    total_cost = cost_registry.get_total_cost()

    return {
        "ticker": ticker,
        "parse_success_rate": parse_rate,
        "field_fill_rate": fill_rate,
        "cost": {"total_cost_usd": total_cost, ...}
    }
```

### The Result: Data-Driven Development

Now, after I make a change—whether it's tweaking a prompt, swapping a model, or refactoring code—I can run a single command:

`python scripts/model_evaluation.py --tickers AAPL MSFT --email "my@email.com"`

And get a report like this:

```json
{
  "run_time": "2025-06-07T20:57:18.945306",
  "elapsed_seconds": 326.41,
  "tickers": ["MA", "ARWR", "VST", "MSFT", "AMZN", "UBER"],
  "results": [
    {
      "ticker": "MA",
      "parse_success_rate": 0.8333333333333334,
      "field_fill_rate": 1.0,
      "latency_s": 280.47,
      "errors": {},
      "cost": {
        "total_cost_usd": 0.0813,
        "breakdown": {
          "base": {
            "total_cost": 0.0258,
            "total_tokens": 41638,
            "cost_by_type": {
              "BaseAnalyzer": 0.0258
            },
            "tokens_by_type": {
              "BaseAnalyzer": 41638
            },
            "request_count": 1
          },
          "incomestatement": {
            "total_cost": 0.0135,
            "total_tokens": 20608,
            "cost_by_type": {
              "IncomeStatementFormatter": 0.0135
            },
            "tokens_by_type": {
              "IncomeStatementFormatter": 20608
            },
            "request_count": 13
          },
          "balancesheet": {
            "total_cost": 0.0196,
            "total_tokens": 30754,
            "cost_by_type": {
              "BalanceSheetFormatter": 0.0196
            },
            "tokens_by_type": {
              "BalanceSheetFormatter": 30754
            },
            "request_count": 13
          },
          "cashflowstatement": {
            "total_cost": 0.0198,
            "total_tokens": 30983,
            "cost_by_type": {
              "CashFlowStatementFormatter": 0.0198
            },
            "tokens_by_type": {
              "CashFlowStatementFormatter": 30983
            },
            "request_count": 13
          },
          "equitystatement": {
            "total_cost": 0.0026,
            "total_tokens": 3910,
            "cost_by_type": {
              "EquityStatementFormatter": 0.0026
            },
            "tokens_by_type": {
              "EquityStatementFormatter": 3910
            },
            "request_count": 7
          }
        },
        "metrics": {
          "parse_success_per_dollar": 10.2501,
          "field_fill_per_dollar": 12.3001
        }
      }
    }
  ]
}
```

This framework gives a better view of the project's performance and cost dynamics. I can see immediately if a change breaks something or has a significant impact on cost. It's been a good learning experience building this LLM-based application, and I'm excited to see how it helps guide the project forward.
