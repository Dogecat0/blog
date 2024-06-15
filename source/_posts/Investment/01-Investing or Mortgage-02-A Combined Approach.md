---
title: Investment-01-Investing or Mortgage-02-A Combined Approach
date: 2024-05-21 16:02:35
tags: [Investment, Mortgage]
---

## **🔎 Intro**

In the last post, I quickly compared the outcomes of investing in the stock market or paying off the mortgage early over a 2-year and 5-year period. In this post, I'll explore the option of investing in stocks and paying off the mortage simultaneously, and see how the numbers stack up for 2-year period.

<!-- more -->

## **Assumptions**

- Monthly Cash Available: £2,000
- Monthly Mortgage Payment: £2,000
- Mortgage Interest Rate: 5.8%
- Investment Return Rate: 7% - 10% per year (In this case we will use midpoint 8.5% for illustration)
- Investment Period: 2 years and 5 years
- Remaining Mortgage Amount (Principal): £111,000
- Maximum Early Repayment without Penalty per year: £11,000

We'll use two scenarios this time to do our analysis:

## **Scenario 1: Invest in stocks with £2,000 monthly and withdraw £11,000 towards the mortgage at the end of year.**

### **Investment Growth:**

- Year 1:

```
Year-end Investment Value = £24,000 * 1.085 - £11,000 = £15,040
```

- Year 2:

```
Year-end Investment Value = £15,040 * (1 + 0.085/12)**12 + £2,000 * ((1 + 0.085/12)**12 - 1)/(0.085/12) - £11,000 &approx £30,139
```

### **Mortgage Reduction:**

```
Monthly interest rate: 5.8%/12 = 0.0048333

Year 1:

Month 1: 
Principal = £111,000
Interest = £111,000 * 0.0048333 = £536.99
Payment = £2,000
Principal Reduction = £2,000 − £536.99 = £1,463.01
New Principal = £111,000 − £1,463.01 = £109,536.99
​```
```
Continue this calculation for 24 months to get the peirod-end principal.

```python
# Function to calculate the amortization schedule and interest savings
def calculate_amortization_schedule(principal, rate, monthly_payment, extra_annual=0, extra_monthly=0):
    monthly_rate = rate / 12 / 100
    schedule = []
    total_interest_paid = 0

    for month in range(1, 25):  # 2 years = 24 months
        interest = principal * monthly_rate
        principal_reduction = monthly_payment - interest
        total_payment = monthly_payment

        if extra_monthly > 0:
            total_payment += extra_monthly
            principal_reduction += extra_monthly

        principal -= principal_reduction
        total_interest_paid += interest
        schedule.append((month, total_payment, interest, principal_reduction, principal))

        if month % 12 == 0 and extra_annual > 0:
            principal -= extra_annual

    return pd.DataFrame(schedule, columns=['Month', 'Total Payment', 'Interest', 'Principal Reduction', 'Remaining Principal']), total_interest_paid

# Scenario 1: $2,000 monthly, $11,000 annual extra payment
principal_1 = 111000
monthly_payment_1 = 2000
extra_annual_1 = 11000
schedule_1, total_interest_1 = calculate_amortization_schedule(principal_1, 5.8, monthly_payment_1, extra_annual_1)

# Scenario 2: $2,000 monthly, $900 monthly extra payment
principal_2 = 111000
monthly_payment_2 = 2000
extra_monthly_2 = 900
schedule_2, total_interest_2 = calculate_amortization_schedule(principal_2, 5.8, monthly_payment_2, extra_monthly=extra_monthly_2)

import ace_tools as tools; tools.display_dataframe_to_user("Scenario 1 Amortization Schedule", schedule_1)
import ace_tools as tools; tools.display_dataframe_to_user("Scenario 2 Amortization Schedule", schedule_2)

total_interest_1, total_interest_2
```

Total interest paid over 2 years: $10,197.47


## **Scenario 2: Invest in stocks with £1,100 monthly and use £900 towards the mortgage at each month.**

### **Investment Growth:**

- Year 2:

```
Year-end Investment Value = £1,100 * ((1 + 0.085/12)**24 - 1)/(0.085/12) &approx £27,480

```
​
### **Mortgage Reduction:**

```
Month 1:
Principal = £111,000
Interest = £111,000×0.0048333 = £536.99
Payment = £2,000 + £900 − £536.99 = £2,363.01
New Principal = £111,000 − £2,363.01 = £108,636.99
​```
```

Continue this calculation for 24 months to get the peirod-end principal using the same calculation as above.

Total interest paid over 2 years: $9,608.45

## **Conclusion**

### **Scenario 1: **
- Total interest paid over 2 years: £10,197.47
- Investment value after 2 years: £30,139

### **Scenario 2:**
- Scenario 2: Total interest paid over 2 years: £9,608.45
- Investment value after 2 years: £27,480

In this case, the second scenario is better as it results in lower interest paid and a higher investment value after 2 years with the difference of £589.02. However, the Investment value is still lower than the Scenario 1 due to the lower monthly investment amount with the difference of £2,659.

So in summary, scenario 1 is gaining more in total at £2,659 - £589.02 = £2069.98 in 2-year period. 

## **Intersting Insights**

Again this whole analysis was generated using GPT4o. Although the accuracy and the numbers are not 100% accurate, the insights are very interesting and the short of amount of time it took to generate this analysis is very impressive. This could be further developed to provide more accurate and detailed analysis for sure but more importantly, it can be used as a tool to generate ideas and insights for personal finance.


 

