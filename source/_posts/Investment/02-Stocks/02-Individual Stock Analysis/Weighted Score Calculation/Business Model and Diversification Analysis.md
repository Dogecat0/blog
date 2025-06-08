---
title: Investment-02-Stocks-04-Weighted Score Calculation-02-Business Model and Diversification Analysis
date: 2024-07-12 12:12:10
tags: [Investment, Stocks, Individual Stock Analysis]
---

### **🔎 Intro**

This post is a part of the series on _Weighted Score Calculation_ for individual stock analysis. We will continue the calculation of th weighted scores for Business Model and Diversification Analysis.

<!--more-->

### **🔢 Content Extracted from the Report**

Refer to the corresponding section in the [report](https://dogecat0.github.io/2024/07/01/Investment/02-Stocks/02-Individual%20Stock%20Analysis/Analysis%20Report.html) for the related content used for the calculation.

### **🧮 Calculation for Business Model and Diversification**

### Core Business Segments (Weight: 40%)

**Metrics and Weights:**
Productivity and Business Processess (Weight: 10%)

- Office 365: Growth rate and user base (Weight: 4%)
- LinkedIn: Revenue growth and engagement (Weight: 3%)
- Dynamics 365: Marke share and growth (Weight: 3%)

Intelligent Cloud (Weight: 20%)

- Azure: Growth rate and market share (Weight: 12%)
- Windows Server and SQL Server: Revenue stability and growth (Weight: 4%)
- Enterprise Services: Complementary revenue (Weight: 4%)

Personal Computing (Weight: 10%)

- Windows: Revenue from OEM licensing and enterprise (Weight: 3%)
- Surface Devices: Revenue growth and market share (Weight: 2%)
- Gaming (Xbox): Revenue from consoles, games, subscriptions (Weight: 4%)
- Search (Bing): Ad revenue (Weight: 1%)

**Normalized Scores:**
Productivity and Business Processess:

- Office 365 (growth rate of 20% and benchmark of 18%): 20/18 = 1.11
- LinkedIn (strong performance with 15% revenue growth and benchmark of 12%): 15/12 = 1.25
- Dynamics 365 (competing well with 12% market share growth and benchmark of 10%): 12/10 = 1.2

Intelligent Cloud:

- Azure (leading with 40% growth and benchmark of 35%): 40/35 = 1.14
- Windows Server and SQL Server (stable revenue with 5% growth): 5/5 = 1
- Enterprise Services (complementary revenue with 5% growth): 5/5 = 1

Personal Computing:

- Windows (revenue from OEM licensing and enterprise with 5% growth and benchmark of 4%): 5/4 = 1.25
- Surface Devices (strong growth with 10% revenue growth and benchmark of 8%): 10/8 = 1.25
- Gaming (Xbox) (revenue from consoles, games, subscriptions with 15% growth and benchmark of 12%): 15/12 = 1.25
- Search (Bing) (ad revenue with 2% growth): 2/2 = 1

**Weighted Scores:**

- Productivity and Business Processess: 1.11*0.04 + 1.25*0.03 + 1.2\*0.03 = 0.0444 + 0.0375 + 0.036 = 0.1179
- Intelligent Cloud: 1.14*0.12 + 1*0.04 + 1\*0.04 = 0.1368 + 0.04 + 0.04 = 0.2168
- Personal Computing: 1.25*0.03 + 1.25*0.02 + 1.25*0.04 + 1*0.01 = 0.0375 + 0.025 + 0.05 + 0.01 = 0.1225
- Total Core Business Segments Score: 0.1179 + 0.2168 + 0.1225 = 0.4572

### Diversification and Risk Mitigation (Weight: 25%)

**Metrics and Weights:**

- Revenue Streams (Weight: 10%)
- Global Reach (Weight: 10%)
- Customer Base (Weight: 5%)

**Normalized Scores:**

- Revenue Streams (diversified revenue streams with 60% from cloud services, hardware, advertise): 0.65 \* 0.1 = 0.065
- Global Reach (presence in over 190 countries): (1.27 + 00.86)\*0.1 = 0.213
- Customer Base (large enterprise and consumer base): (0.94 + 1.25)\*0.05 = 0.1095

**Weighted Scores:**

- Divesification and Risk Mitigation: 0.065 + 0.213 + 0.1095 = 0.3875

### Strategic Acquisitions (Weight: 20%)

**Metrics and Weights:**

- LinkedIn Acquisition (Weight: 5%)
- GitHub Acquisition (Weight: 5%)
- Nuance Acquisition (Weight: 5%)
- Activision Blizzard Acquisition (Weight: 5%)

**Normalized Scores:**

- LinkedIn Acquisition (successful integration and growth): (1.5*0.5 + 1.2*0.5)\*0.05 = 0.0675
- GitHub Acquisition (leading platform for developers): 0.0675
- Nuance Acquisition (expanding healthcare AI solutions): 0.0675
- Activision Blizzard Acquisition (leading gaming company): 0.0675

**Weighted Scores:**

- Strategic Acquisitions: 0.0675\*4 = 0.27

### Innovation and R&D (Weight: 15%)

**Metrics and Weights:**

- R&D Investment (Weight: 10%)
- Product Innovation (Weight: 5%)

**Normalized Scores:**

- R&D Investment (significant investment in R&D with $25 annually): 25/22 = 1.14
- Product Innovation (innovative products and services): (1.5 + 1.2) = 2.7

**Weighted Scores:**

- Innovation and R&D: 1.14*0.1 + 2.7*0.05 = 0.249

### Total Business Model and Diversification Score:

- Total Business Model and Diversification Score: 0.4572*0.4 + 0.1958*0.25 + 0.27*0.2 + 0.164*0.15 = 0.31043

### **⚠️ About the Calculatin of "Diversification and Risk Mitigation", "Strategic Acquisitions", and "Innovation and R&D"**

Those three sections are harder to assess and score, as they require a deeper understanding of the company's strategic decisions, market positioning, and future growth prospects. Below is a simple walkthrough of a quantifiable way to evaluate these aspects which hopefully enables a more objective and comprehensive, data-driven investment analysis.

### **⚠️ Diversification and Risk Mitigation (Weight: 25%):**

### Revenue Streams (Weight: 10%):

**Metrics and Weights:**

- Revenue Streams (Weight: 10%)
- Global Reach (Weight: 10%)
- Customer Base (Weight: 5%)

**Quantification:**

- Diversity of Revenue Streams: Measure the proportion of revenue coming from different segments (e.g., cloud services, hardware, advertising) and compare it to industry benchmarks.
- Revenue Stability: Analyze the standard deviation of revenue growth across segments.

**Calculation**

- Calculate the revenue percentage from each segment.
- Use a diversification index such as the Herfindahl-Hirschman Index (HHI) for revenue concentration:
  $$
  \text{HHI} = \sum_{i=1}^{n} s_i^2
  $$
  where $s_i$ is the revenue share of segment $i$.
  Normalized score: $HHI_{normalized} = \frac{HHI-1/n}{HHI_{max}-1/n}$

**Example**

| Segment  | Revenue Share (%) |
| -------- | ----------------- |
| Software | 40                |
| Cloud    | 35                |
| Hardware | 15                |
| Ads      | 10                |

Calculate the HHI:

- HHI = 0.4^2 + 0.35^2 + 0.15^2 + 0.1^2 = 0.16 + 0.1225 + 0.0225 + 0.01 = 0.315
- HHI_normalized = (0.315-0.25)/(0.4-0.25) = 0.65

**Weighted Score**
0.65\*0.1 = 0.065

### Global Reach (Weight: 10%)

**Quantification:**

- Number of Countries Operated In: Use a simple count of countries.
- Revenue Distribution by Region: Calculate the percentage of revenue from each region (Americas, EMEA, APAC, etc.).
- Economic and Political Stability of Regions: Use indices like the Global Risk Index or similar metrics.

**Calculation**

- Normalize each component.
- Average the normalized scores for a composite score

**Example**

- Assume operatios in 190 countries with benchmark 150: Normalized score = 190/150 = 1.27
- Assume revenue distribution of 50% Americas, 30% EMEA, 20% APAC: Normalized score = 0.5*1 + 0.3*0.8 + 0.2\*0.6 = 0.5 + 0.24 + 0.12 = 0.86

**Weighted Score**
(1.27 + 0.86)\*0.1 = 0.213

### Customer Base (Weight: 5%)

**Quantification:**

- Customer Segments: Measure diversity across consumer, enterprise, government.
- Customer Count and Growth: Number of customers and annua growth rate.

**Calculation**

- Normalize customer segment distribution.
- calculate customer growth normalized score to benchmark.

**Example**

- Assume 60% consumer, 30% enterprise, 10% government with benchmark 50% consumer, 40% enterprise, 10% government: Normalized score = 0.6*1 + 0.3*0.8 + 0.1\*1 = 0.6 + 0.24 + 0.1 = 0.94
- Assume customer growth rate of 10% with benchmark 8%: Normalized score = 10/8 = 1.25

**Weighted Score**
(0.94 + 1.25)\*0.05 = 0.1095

**Total Score for Diversity and Risk Mitigation:**
0.065 + 0.213 + 0.1095 = 0.3875

### **⚠️ Strategic Acquisitions (Weight: 20%):**

### Metrics and Weights:

- LinkedIn Acquisition (Weight: 5%)
- GitHub Acquisition (Weight: 5%)
- Nuance Acquisition (Weight: 5%)
- Activision Blizzard Acquisition (Weight: 5%)

### Quantification:

Quantitative Measures:

- Revenue Contribution: Revenue from acquired company as a percentage of total revenue.
- Synergies Realized: Cost savings or revenue enhancements from the acquisition.
- Integration Success: Employee retention, customer satisfaction, and operational efficiency post-acquisition.

### Qualitative Measures:

- Strategic Fit: Alignment with the company's core business and long-term goals.
- Market Impact: Competitive advantage, market share growth, and new market penetration.

### Calculation:

**Linkedin**

- Normalized score: 15/10 = 1.5 (Revenue Contribution: 15% of total revenue, benchmark 10%)
- Integration and strategic fit score from analysts: 1.2
- Weighted score: (1.5*0.5 + 1.2*0.5)\*0.05 = 0.0675

Repeat the process for each acquisition and sum the weighted scores. Here we assume the impact of each is the same as 0.0675

**Total Score for Strategic Acquisitions:**
0.0675\*4 = 0.27

### **⚠️ Innovation and R&D (Weight: 15%):**

### Metrics and Weights:

- R&D Investment (Weight: 10%)
- Product Innovation (Weight: 5%)

### Investment in R&D (Weight: 10%):

**Quantification:**

- R&D Expenditure: Measure annual R&D spending relative to revenue.
- R&D Intensity: R&D spending as a percentage of total revenue.

**Calculation:**

- Microsoft spends $25 billion annually on R&D with benchmark $22 billion.
- Normalized score: 25/22 = 1.14
- Weighted score: 1.14\*0.1 = 0.114

### Product Innovation (Weight: 5%):

**Quantification:**

- Frequency of New products: Count the number of new products or updates.
- Success of Innovations: Measure the impact of new products on revenue.

**Calculation:**

- Assume Microsoft launches significant updates 3 times a year.
- Normalized score: 3/2 = 1.5
- Assume success rate is high with a score of 1.2
- Weighted score: (1.5 + 1.2)\*0.05 = 0.135

**Total Score for Innovation and R&D:**
0.114 + 0.135 = 0.249
