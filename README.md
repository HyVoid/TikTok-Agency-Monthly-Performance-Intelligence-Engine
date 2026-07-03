# TikTok Agency Monthly Performance Intelligence Operating System

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)
![Tool](https://img.shields.io/badge/Type-Performance%20Decision%20Support-orange.svg)

**Standardize TikTok agency reporting, benchmarking, strategic analysis, and client recommendations in a reusable browser-based and Excel-based decision framework — with no installation, no signup, and no maintenance overhead.**

> ### **No signup. No installation. Free.**
>
> 🌐 **Open in Browser** → HTML Interactive Version *(coming with GitHub Pages deployment)*
>
> 📥 **Download Excel** → Excel Workbook Version *(GitHub Release / Gumroad Distribution)*
>
> Available in both browser and Excel formats.

---

# Screenshots

### Browser Version

<!-- screenshot: browser version -->

*Interactive client performance intelligence dashboard showing Paid vs Organic attribution, benchmark positioning, trend analysis, and strategic recommendations.*

### Excel Version

<!-- screenshot: excel version -->

*Operational workbook showing raw data ingestion, KPI calculation engine, insight generation, and executive reporting workflow.*

---

## What It Helps You Track

* Which TikTok content formats consistently generate audience growth versus temporary engagement spikes.
* Whether paid media spend creates incremental business value or merely substitutes for organic performance.
* Which campaigns outperform market benchmarks by country and industry.
* Whether account growth is driven by content quality, advertising investment, or mixed attribution effects.
* Which strategic actions should be scaled, stopped, maintained, or tested next month.
* How to convert fragmented channel metrics into standardized client reporting narratives.

---

## Quick Start Workflow

### 1. Configure analysis parameters once

Open the **Setup** sheet and define the operational context:

* Client name
* Country market
* Industry category
* Reporting month
* Target engagement rate
* Target CTR
* Target CPA

These parameters become the benchmark framework for all subsequent analysis.

---

### 2. Import existing TikTok data

Export reports directly from:

* TikTok Analytics
* TikTok Ads Manager
* Agency reporting systems
* Existing spreadsheets
* CSV exports

Paste the data into:

* `Raw_Organic_Data`
* `Raw_Paid_Data`

No manual calculations or restructuring are required.

---

### 3. Review automatically generated analysis

Navigate to:

* KPI calculations
* Paid vs Organic attribution
* Benchmark comparisons
* Trend analysis
* Performance insights
* Strategic recommendations
* Executive dashboard outputs

All calculations update automatically.

---

### 4. Refresh monthly

Replace the imported monthly datasets.

The analytical framework, benchmarks, attribution logic, recommendation engine, and reporting outputs remain unchanged.

No rebuilding.
No reconfiguration.
No maintenance overhead.

**Set a few key parameters. Drop in existing data. Get the analysis. Refresh when needed.**

---

# Why I Built This

Most TikTok agency reporting failures are not reporting failures.

They are analytical failures.

In practice, agencies often deliver monthly reports containing:

* impressions,
* views,
* CTR,
* engagement rates,
* spend,
* ROAS,

without answering the actual business question:

> **What caused performance changes, and what should happen next?**

This creates a common operational failure:

A client sees a month-over-month decline in engagement and assumes content quality deteriorated.

However, after separating paid and organic attribution, the actual picture may be:

| Metric             | Initial Interpretation | Actual Finding           |
| ------------------ | ---------------------- | ------------------------ |
| Organic Engagement | Declining              | Stable                   |
| Paid Spend         | Ignored                | Increased 240%           |
| Organic Reach      | Weak                   | Flat                     |
| Paid Reach         | Hidden Driver          | Dominant                 |
| Audience Growth    | Content Problem        | Media Allocation Problem |

The recommendation changes completely.

Instead of:

> "Create better content."

The correct recommendation becomes:

> "Reduce low-efficiency paid acquisition and reallocate spend toward high-performing creator formats."

I built this system as a form of **productized reasoning**.

Not a reporting template.

A reusable analytical framework that converts fragmented TikTok metrics into standardized business decisions, strategic narratives, and scalable client delivery.

---

## Common TikTok Agency Problems This Solves

| Problem                                           | Without This Tool                              | With This Tool                                      |
| ------------------------------------------------- | ---------------------------------------------- | --------------------------------------------------- |
| Paid media hides organic weakness                 | Growth appears healthy until ad spend declines | Paid and organic contribution become visible        |
| Reporting focuses on metrics instead of decisions | Clients receive dashboards but no strategy     | Reports generate actionable recommendations         |
| Market performance lacks context                  | "Good" or "bad" performance becomes subjective | Benchmarks provide objective evaluation             |
| Content success cannot be replicated              | Viral posts are treated as luck                | Top-performing content patterns become identifiable |
| Monthly reporting consumes senior strategist time | Insights depend on agency experience           | Analysis becomes standardized and repeatable        |
| Client narratives vary by account manager         | Reporting quality becomes inconsistent         | Narrative frameworks become operationalized         |

---

## Who This Is For

This framework is designed for:

* TikTok marketing agencies managing multiple clients.
* Performance marketers running paid and organic programs simultaneously.
* Social media consultants delivering strategic monthly reports.
* Agency founders seeking standardized client reporting systems.
* Marketing teams operating across multiple countries and benchmarks.

This framework is not designed for:

* Social media scheduling.
* Creative production workflows.
* Enterprise BI replacement.
* Real-time advertising optimization platforms.

No spreadsheet expertise is required.

Open the browser version or Excel version and begin analysis immediately.

---

## About

I build lightweight decision-support tools for situations where there are too many moving parts to hold in your head reliably.

The central question behind every tool is:

> **What information needs to exist in one place to make the next decision confidently?**

The TikTok Agency Monthly Performance Intelligence Operating System is one example of that approach: transforming fragmented operational data into repeatable analytical reasoning.

---

## Technical Details

<details>
<summary>For technical reviewers, Excel practitioners, and collaborators</summary>

---

### Workbook Architecture

```text
Setup
   ↓

Raw_Organic_Data
Raw_Paid_Data
   ↓

Calculation_Engine
   ↓

Attribution_Engine
Trend_Engine
   ↓

Insight_Engine
Recommendation_Engine
   ↓

Executive_Dashboard
Slides_Output
```

| Layer         | Sheet                 | Purpose                       |
| ------------- | --------------------- | ----------------------------- |
| Configuration | Setup                 | Define analysis context       |
| Input         | Raw_Organic_Data      | Organic performance ingestion |
| Input         | Raw_Paid_Data         | Paid performance ingestion    |
| Calculation   | Calculation_Engine    | KPI standardization           |
| Attribution   | Attribution_Engine    | Growth source decomposition   |
| Analysis      | Trend_Engine          | Time-series evaluation        |
| Intelligence  | Insight_Engine        | Performance interpretation    |
| Decision      | Recommendation_Engine | Strategy generation           |
| Output        | Executive_Dashboard   | Client reporting              |
| Output        | Slides_Output         | Presentation mapping          |

---

### Three Traps That Catch Even Experienced Agency Strategists

#### Trap 1 — Mistaking Paid Growth for Content Growth

A decision was made:

> "Content strategy is working."

The decision relied on:

> Aggregate follower growth.

| Metric       | Organic | Paid  |
| ------------ | ------- | ----- |
| Followers    | 2,100   | 8,700 |
| Contribution | 19%     | 81%   |

The flaw:

The account was primarily purchasing growth.

Correct approach:

Separate attribution sources.

Correct decision:

> Reduce inefficient acquisition spend and optimize content retention.

<details>
<summary>Formula logic</summary>

```excel
Organic Contribution
=B2/D2

Paid Contribution
=C2/D2
```

</details>

---

#### Trap 2 — Evaluating Engagement Without Market Context

A decision was made:

> "Engagement performance declined."

The decision relied on:

> Absolute ER comparison.

| Market  | Benchmark ER | Actual ER |
| ------- | ------------ | --------- |
| Germany | 5.2%         | 6.1%      |

The flaw:

Performance remained above market average.

Correct approach:

Benchmark-adjusted evaluation.

Correct decision:

> Maintain current content strategy.

<details>
<summary>Formula logic</summary>

```excel
=IF(
Actual>Benchmark,
"Above Benchmark",
"Below Benchmark"
)
```

</details>

---

#### Trap 3 — Scaling Revenue Without Evaluating Efficiency

A decision was made:

> "Campaign budget should increase."

The decision relied on:

> Revenue growth alone.

| Month | Revenue | ROAS |
| ----- | ------- | ---- |
| April | €24,000 | 4.2  |
| May   | €31,000 | 2.3  |

The flaw:

Revenue increased while efficiency collapsed.

Correct approach:

Evaluate marginal returns.

Correct decision:

> Pause scaling and re-optimize acquisition strategy.

<details>
<summary>Formula logic</summary>

```excel
ROAS=
Revenue
/
Spend
```

</details>

---

### Example Scenario

A European beauty brand operates TikTok campaigns across Germany and France.

Monthly inputs:

| Metric           | Germany   |
| ---------------- | --------- |
| Paid Spend       | €22,000   |
| Revenue          | €68,000   |
| Organic Views    | 1,850,000 |
| Followers Gained | 7,400     |
| Average ER       | 6.1%      |

Intermediate analysis:

| KPI                  | Value |
| -------------------- | ----- |
| ROAS                 | 3.09  |
| Benchmark ER         | 5.2%  |
| Organic Contribution | 63%   |
| Paid Contribution    | 37%   |
| MoM Growth           | +18%  |

Interpretation:

* Organic performance exceeded benchmark.
* Paid acquisition remained profitable.
* Growth primarily originated from creator-led content.
* Broad awareness campaigns underperformed.

Generated recommendation:

```text
KEEP:
UGC Product Reviews

STOP:
Broad Awareness

TEST:
Creator Partnerships

SCALE:
Spark Ads
```

Decision implications:

* Shift 20% of awareness spend into creator content.
* Expand Spark Ads budget.
* Reduce inefficient reach campaigns.
* Maintain current organic publishing cadence.

---

### Formula Reference

<details>
<summary>Organic KPI formulas</summary>

```excel
ER=
(Likes+Comments+Shares)
/
Views

Watch_Time_Per_View=
Watch_Time
/
Views
```

</details>

<details>
<summary>Paid KPI formulas</summary>

```excel
CTR=
Clicks
/
Impressions

CPM=
(Spend/Impressions)*1000

CPA=
Spend/Conversions

ROAS=
Revenue/Spend
```

</details>

<details>
<summary>Trend formulas</summary>

```excel
MoM=
(Current-Previous)
/
Previous

Moving Average=
AVERAGE(
OFFSET(CurrentCell,-2,0,3,1)
)
```

</details>

<details>
<summary>Recommendation formulas</summary>

```excel
=IFS(
ROAS>3,"SCALE",
ER>Benchmark,"KEEP",
CPA>BenchmarkCPA,"STOP",
TRUE,"TEST"
)
```

</details>

---

### Validation Rules

| Field       | Rule                            | Error Behavior     |
| ----------- | ------------------------------- | ------------------ |
| Country     | Must exist in benchmark library | Validation error   |
| Industry    | Must exist in benchmark library | Validation error   |
| Spend       | ≥0                              | Reject input       |
| Revenue     | ≥0                              | Reject input       |
| Impressions | >0                              | Return blank       |
| Views       | >0                              | Return blank       |
| Conversions | >0                              | Return blank       |
| Dates       | Valid month format              | Validation warning |
| Benchmarks  | Must exist                      | Return NA          |
| ROAS        | Spend cannot equal zero         | Return blank       |

</details>

---

## Other Tools in This Series

* **DTC Inventory Planning Operating System** — inventory, reorder point, and purchasing decisions.
* **Marketing Budget Allocation Simulator** — channel investment optimization.
* **Construction Estimating Intelligence System** — bid pricing and cost estimation.
* **Paid Media Performance Intelligence Engine** — multi-channel advertising analysis.
* **Project Cost Allocation Control Center** — labor and operational profitability analysis.

More tools available through GitHub repositories and downloadable workbook releases.

---

## License

This project is licensed under the **Apache License 2.0**.

See the LICENSE file for details.
