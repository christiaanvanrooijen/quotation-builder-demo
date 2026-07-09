# Concept notes for the AI Taskforce

## Core design choice

Do not ask customers or sales to choose technical metrics.

Ask them what they want to improve:

- Turn more visitors into buyers
- Match staff to real demand
- Spot which locations deserve attention
- Know if people pass by or actually come in
- Prove the value of the location strategy

Behind the scenes, those goals map to internal KPI and subscription logic.

## Example

Customer-facing:

```text
Turn more visitors into buyers
```

Internal mapping:

```json
{
  "hidden_kpis": [
    "footfall",
    "transactions",
    "conversion_rate",
    "sales_per_visitor"
  ],
  "hidden_subscriptions": [
    "sub_footfall_core",
    "sub_sales_conversion",
    "sub_performance_dashboard"
  ]
}
```

## Why this is better

- Customers think in pain points, not in subscriptions.
- Sales can guide without exposing product complexity.
- n8n and Odoo still get clean structured data.
- The same front-end can create different output depending on country, segment or package.
