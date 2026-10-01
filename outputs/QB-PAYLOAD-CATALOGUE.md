# Builder Payload Catalogue

Source: current `payload()` function in `index.html`, generated with synthetic customer data and Odoo test IDs.

Machine-readable full payloads: `QB-PAYLOAD-CATALOGUE.json`.

## Included scenarios

| Group | Scenario keys |
|---|---|
| NL Retail Chain standard | `nl_rc_essential_premium`, `nl_rc_professional_premium`, `nl_rc_professional_basic` |
| NL Retail Chain Isarsoft | `nl_rc_professional_isarsoft`, `nl_rc_professional_isarsoft_existing_cameras` |
| NL Retail Chain CAPEX add-ons | `nl_rc_capture_premium`, `nl_rc_capture_basic`, `nl_rc_enterprise_lidar`, `nl_rc_enterprise_xovis_10_plus` |
| NL Retail Chain commercial model | `nl_rc_full_opex_professional_xovis`, `nl_rc_full_opex_professional_milesight`, `nl_rc_both_quotations_professional` |
| UK Retail Chain | `uk_rc_professional_premium`, `uk_rc_professional_isarsoft` |
| NL Retail Property | `nl_rp_essential`, `nl_rp_zone_flow`, `nl_rp_reid_addon`, `nl_rp_full_opex_essential`, `nl_rp_full_opex_reid` |
| UK Retail Property | `uk_rp_full_opex_essential` |
| DE fail-closed | `de_rc_isarsoft_incomplete` |

## Reading the file

Every scenario contains the full Builder body, including customer/context data, solution lines, `odoo_template`, `odoo_price_lists`, `subscription_quote`, `full_opex_quote`, `odoo_line_quantity_rules`, validation, financials and the compatibility aliases used by the current webhook contract.

`commercial_mapping_complete: false` is intentional only for the DE fixture, where the workbook does not yet provide the required Odoo IDs.

The catalogue covers every fixed branch currently encoded by the Builder. Quantity-dependent values are represented by examples; additional numeric inputs keep the same payload shape while changing sensor totals, price-list tiers, server profiles, line quantities and financials.
