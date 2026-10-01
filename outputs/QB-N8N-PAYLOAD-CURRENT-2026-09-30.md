# Current Builder → n8n Payload

Generated from the current `index.html` `payload()` function and `pricing-config.js` on 2026-09-30. The companion JSON file contains six complete, locally generated request-body examples:

[`QB-N8N-PAYLOAD-CURRENT-2026-09-30.json`](QB-N8N-PAYLOAD-CURRENT-2026-09-30.json)

No request was sent to n8n or Odoo. Customer and contact details in the examples are synthetic. Odoo IDs reflect the mappings currently loaded in this checkout.

## HTTP body

The Builder sends the payload object itself as the JSON request body (`JSON.stringify(quotePayload)`); it does not wrap it in a `payload`, `data` or `body` property. The request is made only when the salesperson submits. This document and fixture generation did not submit anything.

## Example coverage

| JSON scenario | Segment / entity | Commercial model | Technology / extra scope |
|---|---|---|---|
| `retail_chain_capex_opex_xovis` | Retail Chain / NL | `capex_opex` | Premium Xovis |
| `retail_chain_full_opex_milesight` | Retail Chain / UK | `full_opex` | Basic / Milesight |
| `retail_chain_both_isarsoft_lidar_addon` | Retail Chain / NL | `both` | Isarsoft + in-store LiDAR |
| `retail_property_capex_opex` | Retail Property / NL | `capex_opex` | Zone flow + Re-ID + parking |
| `retail_property_full_opex` | Retail Property / UK | `full_opex` | Zone flow + Re-ID + parking |
| `retail_property_both_isarsoft` | Retail Property / DE | `both` | Zone flow + Re-ID + parking |

Each value under `scenarios` is a complete Builder payload body, not an abbreviated example. The JSON file is the source to compare node inputs against.

## Top-level contract

Every generated body contains these top-level keys:

```text
meta, customer, solution, odoo_template, sensor_lines, isarsoft, instore,
server, odoo_line_quantity_rules, quote_execution_plan,
commercial_mapping_complete, input_validation, mapping_validation,
financials, discounts, add_ons, notes, source, customer_country_id,
odoo_entity_key, odoo_company_id, operating_unit_id, commercial_model,
odoo_routing, company_name, contact_name, contact_email, num_stores,
template_id, pricelist_id, capex_pricelist_id, opex_pricelist_id,
subscription_pricelist_id, subscription_template_id,
instore_addon_pricelist_id, instore_addon_template_id, sales_team_id,
odoo_price_lists, subscription_quote, full_opex_quote, user_id,
submitted_at, created_at, language, amount_of_sensors, total_hardware_units,
stores_in_scope, customer_visible, lead, scenario, results, pfm_internal
```

Some nested values are deliberately `null` or empty when that scenario does not use them. Retail Chain and Retail Property use the same root contract; `customer`, `context`, sensor scope and financial interpretation vary by segment.

## Routing and IDs

- `odoo_routing` is resolved from the selected salesperson: `user_id`, `entity_key`, legal `company_id`, `operating_unit_id` and `sales_team_id`.
- `odoo_entity_key`, `odoo_company_id`, `operating_unit_id`, `user_id` and `sales_team_id` are also present as top-level/metadata aliases for compatibility.
- `customer_country_id` / `meta.customer_country_id` is customer-country metadata; it does not override salesperson entity routing.
- `odoo_company_id` is the legal Odoo company (`res.company`). It is not a customer/partner company ID. The current payload has no `partner_company_id` field.
- `template_id`, `pricelist_id`, `subscription_template_id` and related aliases are the primary quote mapping. Structured detail is also available in `odoo_template`, `odoo_price_lists`, `subscription_quote`, `full_opex_quote` and `quote_execution_plan`.
- For legacy compatibility, fields named `*_test_id` in `odoo_template` contain the currently resolved active-environment template ID. Read `meta.odoo_mapping_environment` and the explicit `*_production_id` fields to understand which mapping is active.

## Commercial alternatives

`commercial_model` is one of `capex_opex`, `full_opex` or `both`.

- `capex_opex`: `quote_execution_plan.quotes` has two entries: investment CAPEX and recurring package subscription.
- `full_opex`: two entries: the CAPEX-for-OPEX installation/investment quote and the five-year recurring Full OPEX quote.
- `both`: four entries, two for each alternative. The entries are distinct in `quote_key`, `commercial_model`, `quote_role`, `component_key`, template and price list.
- `full_opex_quote` is present for all three selections. `requested` indicates whether Full OPEX was selected; do not treat its presence alone as a request to create that quote.
- Full OPEX price data is exposed as `term_years`, `sensor_count`, `tier`, monthly hardware rate/total, monthly subscription/total, one-off installation, CAPEX-for-OPEX template/pricelist, recurring package template and Full OPEX pricelist.

## Quantity rules

n8n should match `odoo_line_quantity_rules[].product_id` against the actual `product.product` ID on the quotation-template line. `odoo_product_template_id` / article identifiers are metadata and must not be substituted for `product_id`.

Actions:

- `set_quantity`: use the supplied `quantity`.
- `remove`: omit/remove that quotation line; its quantity is `0`.
- No matching rule: the current n8n flow may retain Odoo's default template-line quantity. This makes explicit removal rules important for alternatives embedded in shared templates.

Current rule families:

- Retail Property setup lines use production product IDs per entity. Retail Chain receives explicit `remove` rules. Retail Property receives Web Reporting quantity `1` and Sensor Setup quantity equal to the combined entrance + zone + Re-ID camera count; ANPR is excluded from this sensor setup count.
- Retail Chain in-store LiDAR/Xovis processing-unit rules are emitted when required and mapped.
- When Isarsoft is active, all nine server alternatives for the selected entity receive a rule: the selected profile(s) use `set_quantity` with location-aggregated quantity and all others use `remove`.
- `isarsoft.mode` is `none`, `base` or `addon`. Existing-camera-network reuse is indicated by `isarsoft.existing_network_reused`; server sizing evidence is in `isarsoft.server` and `isarsoft.location_resolution`.

For production Isarsoft server rules, `odoo_line_quantity_rules[].product_id` uses the verified `product.product` ID. `odoo_article_id` remains the separate Odoo article ID and is not used for quantity-rule matching. The production server `product_id` values in the regenerated JSON fixture are:

| Profile | NL | UK | DE |
|---|---:|---:|---:|
| `orin_nano_8gb` | 18671 | 18673 | 18672 |
| `orin_nx_16gb` | 18674 | 18675 | 18676 |
| `agx_orin_64gb` | 18677 | 18678 | 18679 |
| `agx_thor_128gb` | 18680 | 18784 | 18682 |
| `rtx_2000_ada` | 18683 | 18684 | 18685 |
| `rtx_4000_ada` | 18686 | 18687 | 18688 |
| `dual_rtx_4000_ada` | 18689 | 18690 | 18691 |
| `dual_rtx_5000_ada` | 18692 | 18693 | 18694 |
| `dual_rtx_6000_ada` | 18695 | 18696 | 18697 |

Production Retail Property setup `product_id` values currently in this checkout:

| Entity | Setup Web Reporting | Setup Sensor |
|---|---:|---:|
| NL | 15554 | 18241 |
| UK | 15555 | 15553 |
| DE | 18386 | 18449 |

These production IDs are not emitted when `meta.odoo_mapping_environment` is `test` because no separate test IDs for these products are configured.

## Generation gate

Before creating any Odoo quotation, inspect all of:

1. `commercial_mapping_complete === true`
2. `mapping_validation.valid === true`
3. `quote_execution_plan.mapping_complete === true`
4. Each requested `quote_execution_plan.quotes[]` entry has `enabled === true` and `mapping_complete === true`
5. `input_validation.valid === true`

Use each quote-plan entry's `template_id`, `pricelist_id`, `odoo_company_id`, `operating_unit_id`, `user_id`, `sales_team_id` and `quantity_rule_scope` to route/process that quote. Do not generate a quote for an entry marked incomplete.

The current generated Retail Property Re-ID examples report `isarsoft_addon_template_mapping` as missing. Their payloads are useful for mapping inspection, but the quote plan is intentionally incomplete and should be blocked until that Odoo template mapping is resolved. `financials`, `results` and UI/customer-visible totals are indicative Builder calculations, not authoritative Odoo totals.
