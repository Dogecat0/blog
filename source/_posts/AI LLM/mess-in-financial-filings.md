---
title: 'Mess in SEC Financial Filings: A new Challenge of Data Extraction'
date: 2025-06-19 23:15:27
tags:
  - Python
  - Data Extraction
  - Financial Filings
categories:
  - Project Update
  - AI Projects
---

In the world of financial data extraction, the challenge of parsing and interpreting complex documents is ever-present. As I continue to refine my financial analysis tool, I've encountered a new set of challenges that highlight the messy nature of financial filings. This post delves into these issues and how they impact the accuracy and reliability of data extraction.

<!-- more -->

### The Messy Reality of Financial Filings

Today I faced a particularly messy issue while extracting 10-K financials from a company's filings. (Yes, 10-Qs don't have such issue) There is a form called XBRL, which is an XML-based format used for financial reporting. While it is designed to be machine-readable, the reality is that these filings can be incredibly complex and inconsistent.

There is a specific case where you want to extract the labels from the Index of the XBRL document. These labels are supposed to be standardized like `concept`, `label`, `level`, `abstract`, `dimension`, and `date` which in this case is in `yy-mm-dd` format.

Ideal format:
```
Index(['concept', 'label', '2025-03-31', 'level', 'abstract',
       'dimension'],
      dtype='object')
```

But in practice, the labels can be messy. For example, I encountered a case where the label for the date was formatted as `2025-03-31` but also had an additional label `2024-12-31` that was not in the expected format. And there were also labels like `2025-03-31 (Q1)` which were not in the expected format either.

Real format copied from my logs:
```
Columns in statement:['concept', 'label', '2022-12-31', '2021-12-31', '2020-12-31', 'level', 'abstract', 'dimension']
Columns in statement: ['concept', 'label', '2022-06-30', 'level', 'abstract', 'dimension']
Columns in statement: ['concept', 'label', '2022-06-30 (Q2)', '2022-06-30', 'level', 'abstract', 'dimension']
Columns in statement: ['concept', 'label', '2022-12-31', '2021-12-31', 'level', 'abstract', 'dimension']
```


### Temporary Solution and Manual Intervention

The solution to this problem is not straightforward. It requires a combination of heuristics and manual intervention to clean up the data. The steps I took at this moment:

```python
           print("Columns in statement:", statement.columns.tolist())

            # The columns are expected to be in the order:
            # 'concept', 'label', <date_columns...>, 'level', 'abstract', 'dimension'
            # We want to keep the first date column, which represents the most recent period.

            # Find the index of the 'level' column. If not found, this will raise a KeyError,
            # which is caught below.
            level_index = statement.columns.get_loc("level")

            # The date columns are between 'label' (index 1) and 'level'.
            # So they start at index 2.
            date_columns = statement.columns[2:level_index]

            if not date_columns.empty:
                # The first date column is the most recent period, which is what we want.
                latest_date_col = date_columns[0]
                columns_to_keep = [
                    "concept",
                    "label",
                    latest_date_col,
                    "level",
                    "abstract",
                    "dimension",
                ]
```

At this point, I had to manually inspect the columns and decide which ones to keep. This is not ideal, but it is a reality of working with messy financial data and the more true fact is this situation may not be the last time I encounter such inconsistencies.

The best way to handle this is probably to select the biggest date column and then check if the other date columns are in the expected format. If they are not, we can either drop them or keep them for further analysis. And there is also one exception where the date column is in the format `2025-03-31 (Q1)`. In this case, we have to extract the date part from here instead of the similar column `2025-03-31` as the data in this column is not the expected ones.

### Final Thoughts

After roughly 2 hours of debugging and manual intervention, I was able to extract the right financials from the filings. Again, why 10-Qs don't have such issue but only 10-Ks? I don't know. But this seems become a norm for me to encounter while dealing with financial data.