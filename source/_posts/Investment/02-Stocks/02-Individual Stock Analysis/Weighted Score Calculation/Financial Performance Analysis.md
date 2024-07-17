---
title: Investment-02-Stocks-04-Weighted Score Calculation-01-Financial Performance Analysis
date: 2024-07-12 10:30:04
tags: [Investment, Stocks, Individual Stock Analysis]
---

## **🔎 Intro**

Following last one in the series, to avoid having a way too long blog, I will break down the calculation of the weighted score for each section in this separated post. Let's start with "Financial Performance Analysis".

<!-- more -->

## **🔢 Data Extracted from the Report**

**Income Statement:**
- Revenue: $211.92 billion
- Cost of Revenue: $65.86 billion
- Gross Profit: $146.05 billion
- Operating Income: $88.52 billion
- Net Income: $72.36 billion

**Profititability:**
Gross Profit Margin: 70%
Operating Margin: 41%
Net Profit Margin: 36.43%

**Cash Flow:**
- Operating Cash Flow: $87.58 billion
- Investing Cash Flow: -$22.68 billion
- Financing Cash Flow: -$43.94 billion
- Net Cash Flow: $20.77 billion
- Free Cash Flow: $59.48 billion

**Financial Position:**
- Total Debt: $79.9 billion as of March 31, 2024.
- Debt-to-Equity Ratio: 0.32.
- Current Ratio: 1.24.
- Quick Ratio: 1.05.
- Interest Coverage Ratio: 39.76.
- Credit Rating: Microsoft holds a AAA credit rating from S&P, reflecting its robust financial health and low risk of default.

**Balance Sheet:**
- Cash & Cash Equivalents: 80.02B
- Total Debt: 79.91B
- Net Cash: 110.00M
- Net Cash Per Share: $0.01
- Equity (Book Value): 253.15B
- Book Value Per Share:	34.06
- Working Capital: 28.66B

**Financial Efficiency:**
- Return on Equity (ROE): 37.50%
- Return on Assets (ROA): 19.00%
- Return on Invested Capital (ROIC): 26.00%
- Asset Turnover: 0.52
- Inventory Turnover: 34.07
- Interest Coverage Ratio: 39.76

**Dividends Yields:**
- Dividend Per Share: $3.00
- Dividend Yield: 0.65%
- Dividend Growth (YoY): 10.29%
- Years of Dividend Growth: 19
- Payout Ratio: 25.97%
- Buyback Yield: -0.11%
- Shareholder Yield: 0.55%
- Earnings Yield: 2.52%
- FCF Yield: 2.07%

**Shareholder Returns::**
Total Return: $8.4 billion in Q3 FY24.
Dividends: Microsoft has a consistent track record of paying and increasing dividends, with a current yield of approximately 1%, and a payout ratio around 30%-35%, suggesting room for further increases.
Share Repurchases: Continuation of buyback programs to enhance shareholder value by reducing the number of outstanding shares, thus increasing earnings per share (EPS).

## **🧮 Calculation for Financial Performance Analysis**

## Income Statement (Weight: 20%)

**Metrics and Weights:**
- Revenue (Weight: 5%)
- Cost of Revenue (Weight: 2.5%)
- Gross Profit (Weight: 5%)
- Operating Income (Weight: 5%)
- Net Income (Weight: 2.5%)

**Normalized Scores:**
- Revenue: Revenue/Benchmark Revenue
- Cost of Revenue: 1−(Cost of Revenue/Benchmark Cost of Revenue)
- Gross Profit: Gross Profit/Benchmark Gross Profit
- Operating Income: Operating Income/Benchmark Operating Income
- Net Income: Net Income/Benchmark Net Income

**Assume benchmark values for normalization:**
- Benchmark Revenue: $200 billion
- Benchmark Cost of Revenue: $70 billion
- Benchmark Gross Profit: $130 billion
- Benchmark Operating Income: $80 billion
- Benchmark Net Income: $60 billion

**Calculations:**
- Revenue Score: 211.92/200=1.06
- Cost of Revenue Score: 1-(65.86/70)=0.06
- Gross Profit Score: 146.05/130=1.12
- Operating Income Score: 88.52/80=1.11
- Net Income Score: 72.36/60=1.21

**Weighted Scores:**
- Revenue: 1.06*5%=0.053
- Cost of Revenue: 0.06*2.5%=0.0015
- Gross Profit: 1.12*5%=0.056
- Operating Income: 1.11*5%=0.0555
- Net Income: 1.21*2.5%=0.03025

**Total Income Statement Score:**
- Total Score = 0.053 + 0.0015 + 0.056 + 0.0555 + 0.03025 = 0.19625

## Profitability (Weight: 15%)

**Metrics and Weights:**
- Gross Margin (Weight: 5%)
- Operating Margin (Weight: 5%)
- Net Margin (Weight: 5%)

**Normalized Scores:**
- Gross Profit Margin: 70%
- Operating Margin: 41%
- Net Margin: 36.4%

**Assume benchmarke values for normalization:**
- Benchmark Gross Margin: 65%
- Benchmark Operating Margin: 35%
- Benchmark Net Margin: 30%

**Calculations:**
- Gross Margin Score: 70/65=1.08
- Operating Margin Score: 41/35=1.17
- Net Margin Score: 36.4/30=1.21

**Weighted Scores:**
- Gross Margin: 1.08*5%=0.054
- Operating Margin: 1.17*5%=0.0585
- Net Margin: 1.21*5%=0.0605

**Total Profitability Score:**
- Total Score = 0.054 + 0.0585 + 0.0605 = 0.173

## Cash Flow (Weight: 20%)

**Metrics and Weights:**
- Operating Cash Flow (Weight: 5%)
- Investing Cash Flow (Weight: 2.5%)
- Financing Cash Flow (Weight: 2.5%)
- Net Cash Flow (Weight: 5%)
- Free Cash Flow (Weight: 5%)

**Normalized Scores:**
- Operating Cash Flow: 87.58/75 = 1.17
- Investing Cash Flow: -22.68/-25 = 0.91
- Financing Cash Flow: -43.94/-50 = 0.88
- Net Cash Flow: 20.77/15 = 1.38
- Free Cash Flow: 59.48/50 = 1.19

**Weighted Scores:**
- Operating Cash Flow: 1.17*5% = 0.0585
- Investing Cash Flow: 0.91*2.5% = 0.02275
- Financing Cash Flow: 0.88*2.5% = 0.022
- Net Cash Flow: 1.38*5% = 0.069
- Free Cash Flow: 1.19*5% = 0.0595

**Total Cash Flow Score:**
- Total Score = 0.0585 + 0.02275 + 0.022 + 0.069 + 0.0595 = 0.23175

## Financial Position (Weight: 15%)

**Metrics and Weights:**
- Total Debt (Weight: 3%)
- Debt-to-Equity Ratio (Weight: 3%)
- Current Ratio (Weight: 3%)
- Quick Ratio (Weight: 3%)
- Interest Coverage Ratio (Weight: 3%)

**Normalized Scores:**
- Total Debt: 79.9/90 = 0.89
- Debt-to-Equity Ratio: 0.32/0.5 = 0.64
- Current Ratio: 1.24/1.5 = 0.83
- Quick Ratio: 1.05/1.2 = 0.88
- Interest Coverage Ratio: 39.76/30 = 1.33

**Weighted Scores:**
- Total Debt: 0.89*3% = 0.0267
- Debt-to-Equity Ratio: 0.64*3% = 0.0192
- Current Ratio: 0.83*3% = 0.0249
- Quick Ratio: 0.88*3% = 0.0264
- Interest Coverage Ratio: 1.33*3% = 0.0399

**Total Financial Position Score:**
- Total Score = 0.0267 + 0.0192 + 0.0249 + 0.0264 + 0.0399 = 0.1371

## Balance Sheet (Weight: 10%)

**Metrics and Weights:**
- Cash & Cash Equivalents (Weight: 2%)
- Total Debt (Weight: 2%)
- Net Cash (Weight: 1%)
- Net Cash Per Share (Weight: 1%)
- Equity (Book Value) (Weight: 2%)
- Book Value Per Share (Weight: 1%)
- Working Capital (Weight: 1%)

**Normalized Scores:**
- Cash & Cash Equivalents: 80.02/70 = 1.14
- Total Debt: 79.91/90 = 0.89
- Net Cash: 0.11/0.2 = 0.55
- Net Cash Per Share: 0.01/0.02 = 0.5
- Equity (Book Value): 253.15/200 = 1.27
- Book Value Per Share: 34.06/30 = 1.14
- Working Capital: 28.66/25 = 1.15

**Weighted Scores:**
- Cash & Cash Equivalents: 1.14*2% = 0.0228
- Total Debt: 0.89*2% = 0.0178
- Net Cash: 0.55*1% = 0.0055
- Net Cash Per Share: 0.5*1% = 0.005
- Equity (Book Value): 1.27*2% = 0.0254
- Book Value Per Share: 1.14*1% = 0.0114
- Working Capital: 1.15*1% = 0.0115

**Total Balance Sheet Score:**
- Total Score = 0.0228 + 0.0178 + 0.0055 + 0.005 + 0.0254 + 0.0114 + 0.0115 = 0.0994

## Financial Efficiency (Weight: 10%)

**Metrics and Weights:**
- Return on Equity (Weight: 3%)
- Return on Assets (Weight: 2%)
- Return on Invested Capital (Weight: 2%)
- Asset Turnover (Weight: 1%)
- Inventory Turnover (Weight: 1%)
- Interest Coverage Ratio (Weight: 1%)

**Normalized Scores:**
- Return on Equity: 37.5/30 = 1.25
- Return on Assets: 19/15 = 1.27
- Return on Invested Capital: 26/20 = 1.3
- Asset Turnover: 0.52/0.6 = 0.87
- Inventory Turnover: 34.07/30 = 1.14
- Interest Coverage Ratio: 39.76/30 = 1.33

**Weighted Scores:**
- Return on Equity: 1.25*3% = 0.0375
- Return on Assets: 1.27*2% = 0.0254
- Return on Invested Capital: 1.3*2% = 0.026
- Asset Turnover: 0.87*1% = 0.0087
- Inventory Turnover: 1.14*1% = 0.0114
- Interest Coverage Ratio: 1.33*1% = 0.0133

**Total Financial Efficiency Score:**
- Total Score = 0.0375 + 0.0254 + 0.026 + 0.0087 + 0.0114 + 0.0133 = 0.1223

## Dividends Yields (Weight: 5%)

**Metrics and Weights:**
- Dividend Per Share (Weight: 1%)
- Dividend Yield (Weight: 1%)
- Dividend Growth (YoY) (Weight: 1%)
- Years of Dividend Growth (Weight: 1%)
- Payout Ratio (Weight: 0.5%)
- Buyback Yield (Weight: 0.5%)
- Shareholder Yield (Weight: 0.5%)
- Earnings Yield (Weight: 0.5%)
- FCF Yield (Weight: 0.5%)

**Normalized Scores:**
- Dividend Per Share: 3/2.5 = 1.2
- Dividend Yield: 0.65/0.7 = 0.93
- Dividend Growth (YoY): 10.29/10 = 1.03
- Years of Dividend Growth: 19/15 = 1.27
- Payout Ratio: 25.97/30 = 0.87
- Buyback Yield: -0.11/0.5 = -0.22
- Shareholder Yield: 0.55/0.5 = 1.1
- Earnings Yield: 2.52/2.5 = 1.01
- FCF Yield: 2.07/2 = 1.04

**Weighted Scores:**
- Dividend Per Share: 1.2*1% = 0.012
- Dividend Yield: 0.93*1% = 0.0093
- Dividend Growth (YoY): 1.03*1% = 0.0103
- Years of Dividend Growth: 1.27*1% = 0.0127
- Payout Ratio: 0.87*0.5% = 0.00435
- Buyback Yield: -0.22*0.5% = -0.0011
- Shareholder Yield: 1.1*0.5% = 0.0055
- Earnings Yield: 1.01*0.5% = 0.00505
- FCF Yield: 1.04*0.5% = 0.0052

**Total Dividends Yields Score:**
- Total Score = 0.012 + 0.0093 + 0.0103 + 0.0127 + 0.00435 - 0.0011 + 0.0055 + 0.00505 + 0.0052 = 0.0633

## Shareholder Returns (Weight: 5%)

**Metrics and Weights:**
- Total Return (Weight: 2%)
- Dividends (Weight: 2%)
- Share Repurchases (Weight: 1%)

**Normalized Scores:**
- Total Return: 8.4/7.5 = 1.12
- Dividends: Assume normalized based onthe same yield and payout ratio data
- Share Repurchases: Assume normalized based on a benchmark buyback

**Weighted Scores:**
- Total Return: 1.12*2% = 0.0224
- Dividends (use same normalized score for dividends, 1.2): 1.2*2% = 0.024
- Share Repurchases (assume normalized score of 1): 1*0.01% = 0.01

**Total Shareholder Returns Score:**
- Total Score = 0.0224 + 0.024 + 0.01 = 0.0564

## **📊 Final Weighted Score for Valuation**

- Total Score = 0.19625*20% + 0.173*15% + 0.23175*20% + 0.1371*15% + 0.0994*10% + 0.1223*10% + 0.0633*5% + 0.0564*5% = 0.160275

## **⚠️Benchmarking:**

The benchmark values used in the calculations are hypothetical and should be adjusted based on industry standards, historical performance, and peer comparisons. It is essential to consider the context and relevance of the metrics when determining the benchmark values for normalization.

## Methods for Obtaning Benchmark Values

**Industry Averages:**
- Use financial databases like Bloomberg, S&P Capital IQ, or Reuters to obtain industry averages for each metric. These databases aggregate financial data from a wide range of companies in the same industry.

**Peer Comparison**:
- Identify a set of peer companies within the same industry and similar market capitalization. calculate the average values of these metrics for tese peer companies.
- Tools: use platforms like Morningstar, Yahoo Finance, or GuruFocus to find peer groups and their financial data.

**Historical Performance:**
- Use the company's historical data to establish benchmarks. This method is useful for metrics where historical performance is a good indicator of expected performance.
- Tools: Company annual reports, financial statement archives, and SEC filings (EDGAR database)

**Analyst Estimates:**
- Analyst reports from investment banks or financial services firms often contain benchmark data and industry norms. These reports can provide a professional perspective on what constitutes good performance in a given industry.
- Tools: Reports from Goldman Sachs, J.P. Morgan, Morgan Stanley, etc.

**Economic and Industry Reports:**
- Reports from industry groups, trade associations, and economic research firms can provide benchmark data. These sources often conduct surveys and research to eastablish industry standards.

**Custom Benchmark Creation:**
- Create custom benchmarks by using a weighted average of the metrics from the top-perfoming companies in the industry.
- Tools: Excel or specialized financial analysis software like FactSet or Capital IQ.


