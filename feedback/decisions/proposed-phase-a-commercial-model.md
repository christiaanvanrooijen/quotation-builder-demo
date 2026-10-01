# Proposed Phase A Commercial Model Completion

Status: proposed. Application code has not been changed by this record.

Created: 2026-08-18.

## Scope

Phase A covers the commercial-model completion for:

- `CAPEX + OPEX`
- `Full OPEX`
- `Both quotations`

For both segments:

- Retail Chain
- Retail Property, still stored internally as `Shopping Centre`

This record inspects the current implementation only. It does not introduce new commercial rules.

## Sources

- Product principle: Odoo is the commercial source of truth and final pricing requires human review. Source: `PRODUCT_PRINCIPLES.md`.
- Roadmap: Odoo integration and live pricing remain next/future work after v0.2. Source: `ROADMAP.md`.
- Approved Phase 1: country is metadata; local pricing remains indicative; Odoo is the future source of truth; automated final quote sending is out of Phase 1. Source: `feedback/decisions/approved-phase-1.md`.
- Approved Phase 2: quote model choice belongs at the end; available choices are `CAPEX + OPEX`, `Full OPEX`, and `Both quotations`; Full OPEX uses five years; Full OPEX is monthly hardware lease selected by total sensor-volume tier plus subscription; installation remains one-off; Full OPEX rates come from `pricing-config.js`; do not send Full OPEX while required records are missing. Source: `feedback/decisions/approved-phase-2-commercial-options.md`.
- Current pricing configuration. Source: `pricing-config.js`.
- Current browser application implementation. Source: `index.html`.

## Current Implementation Summary

### Shared Configuration

Implemented:

- Default contract terms are stored as three years for `retailChain` and `retailProperty`. Source: `pricing-config.js:16-24`.
- Subscription package pricing is configured per segment, technology and package. Source: `pricing-config.js:32-43`.
- Full OPEX hardware lease rates are configured per segment, Basic/Premium sensor type, sensor-volume tier and package. Source: `pricing-config.js:45-79`.
- Full OPEX has `termYears: 5`, `tierBasis: "total_sensors"`, `rateComposition: "hardware_only"` and `quoteGenerationEnabled: false`. Source: `pricing-config.js:47-55`.
- Odoo price-list tiers exist for Retail Chain and Retail Property for CAPEX and subscription price lists. Source: `pricing-config.js:354-369`.

Partially implemented:

- The app stores `state.commercialModel`, defaulting to `capex_opex`. Source: `index.html:1594-1601`.
- The final summary displays the three model choices. Source: `index.html:4210-4231`.
- Full OPEX readiness is checked from configured rate availability and `quoteGenerationEnabled`. Source: `index.html:4186-4200`.

Missing:

- No commercial-model object is included in the quote payload.
- No Full OPEX scenario object is calculated for quote generation.
- No separate payload structure exists for `both`.
- No country/entity-aware UK template or price-list catalogue is present in the inspected config, beyond UK sales team metadata. Source: `pricing-config.js:371-376`.

## CAPEX + OPEX

### Retail Chain

Already implemented:

- CAPEX is calculated from active solution components:
  - entrance hardware;
  - entrance setup;
  - optional capture-rate hardware and setup;
  - optional in-store journey hardware.
  Source: `index.html:2993-3023`.
- Subscription/monthly service is calculated from package subscription price per sensor, with OPEX volume discount. Source: `index.html:2998-3020`.
- Contract/TCO horizon uses `state.values.tcoYears`, defaulting to three years. Source: `index.html:1630-1632`, `index.html:2995`, `index.html:3077-3085`.
- TCO is calculated per component as CAPEX plus monthly fee times 12 times selected years. Source: `index.html:3018-3020`.
- Monthly service total, CAPEX total, TCO total and total hardware units are calculated. Source: `index.html:3027-3034`.
- Retail Chain Odoo template selection supports footfall, capture, tracking/Re-ID and capture+tracking scenarios. Source: `pricing-config.js:241-288`, `pricing-config.js:328-352`, `index.html:2953-2972`.

Partially implemented:

- The final summary displays commercial direction as package plus monthly service. Source: `index.html:4234-4271`.
- Step 4 displays total CAPEX, monthly service and TCO over the selected horizon. Source: `index.html:3744-3765`.
- The payload includes CAPEX and subscription template/pricelist IDs for the selected package where catalogue records exist. Source: `index.html:3172-3184`, `index.html:3237-3262`, `index.html:3297-3334`.

Missing:

- The selected `commercialModel` is not included in the payload.
- The payload labels `financials.tco_3_years`, but the value comes from the selected `state.values.tcoYears`, not necessarily three years. Source: `index.html:3281-3285`.
- Installation is included in component setup totals, but there is no explicit top-level installation line/scenario object for quote routing.
- The current quote webhook always sends a single `payload()`. Source: `index.html:4410-4422`.

Calculated values:

- Entrance sensor quantity: `ceil(stores * 1.10)`.
- CAPEX discount by store count.
- Monthly subscription rate per sensor by package and store-count OPEX discount.
- Component CAPEX, setup, monthly fee and TCO.
- Total CAPEX, monthly service total, TCO total and total hardware units.

Only displayed:

- Human-facing choice label `CAPEX + OPEX`.
- Summary text saying hardware and installation are one-off and subscription is monthly.
- Commercial summary direction line.

Included in payload:

- `solution.configuration_id`
- `solution.solution_package`
- `sensor_lines`
- `financials.total_hardware_capex`
- `financials.total_setup_capex`
- `financials.total_capex`
- `financials.base_monthly_rate_per_sensor`
- `financials.opex_discount_pct`
- `financials.total_monthly_opex`
- `financials.tco_3_years`
- CAPEX template and price-list IDs
- subscription template and price-list IDs
- `subscription_quote`

### Retail Property

Already implemented:

- Retail Property has CAPEX component configuration for entrance sensors, zone sensors, tenant capture, ANPR and additional service modules. Source: `pricing-config.js:559-647`.
- Retail Property package minimums are mapped from selected leaks to Essential/Professional/Enterprise. Source: `pricing-config.js:670-685`, `index.html:2849-2863`.
- The Retail Property Impact Model displays entrance count, CAPEX discount, setup and hardware CAPEX for partly covered centres. Source: `index.html:4026-4040`.
- Retail Property Odoo price-list tiers exist for CAPEX and subscription price lists. Source: `pricing-config.js:362-367`.

Partially implemented:

- Retail Property package selection is enforced by leak minimums and cannot be manually lowered below the selected-leak minimum. Source: `index.html:2849-2867`, `index.html:4390-4398`.
- Retail Property final summary displays selected needs, route, entrances and data modules, but not a full commercial CAPEX/OPEX calculation. Source: `index.html:4234-4289`.
- Retail Property configurations exist for footfall, zone, Re-ID and zone+Re-ID. Source: `pricing-config.js:290-323`.

Missing:

- `solutionComponents()` is hardcoded to `retailChain`, so shared totals and payload financials are not built from Retail Property component logic. Source: `index.html:2993-3023`.
- `getConfigurationId("retailProperty")` always returns `RP_FOOTFALL`; Retail Property zone and Re-ID configurations are not selected. Source: `index.html:2953-2961`.
- `odooTemplateCatalog` contains Retail Chain records only; Retail Property template records are not present. Source: `pricing-config.js:328-352`.
- Retail Property subscription/package records are not present in `odooTemplateCatalog`.
- Retail Property additional service modules are configured, but not assembled into quote lines by the shared payload.
- Retail Property CAPEX/OPEX contract totals are not generated as a dedicated scenario.

Calculated values:

- Package minimum from selected Retail Property leaks.
- For the partly covered entrance card only: indoor/outdoor entrance split, CAPEX discount, setup, hardware CAPEX.
- Shared totals still calculate, but they use Retail Chain component assumptions, so they should not be treated as a correct Retail Property quote calculation.

Only displayed:

- Retail Property evidence model.
- Entrance configuration card for partly covered centres.
- Package comparison and commercial-model choice in the final summary.

Included in payload:

- `customer.segment` is set to `retailProperty`.
- Retail Property context fields are included.
- Retail Property price-list lookup is attempted using `entranceComponent.units`, but that entrance component comes from the hardcoded Retail Chain component builder. Source: `index.html:3169-3177`.
- Template lookup is attempted for `RP_FOOTFALL`, but no Retail Property catalogue record exists, so IDs are expected to be null.

## Full OPEX

### Retail Chain

Already implemented:

- Full OPEX hardware lease rates are present for Retail Chain. Source: `pricing-config.js:59-68`.
- Full OPEX readiness checks segment, sensor count, sensor type, package, matching tier, monthly hardware rate, rate composition and `quoteGenerationEnabled`. Source: `index.html:4186-4200`.
- Full OPEX UI text correctly states that hardware lease and subscription are monthly for five years and installation remains one-off. Source: `index.html:4213-4216`.

Partially implemented:

- Retail Chain Full OPEX sensor count uses `commercialTotals().totalHardwareUnits`, which includes active entrance, capture and in-store units. Source: `index.html:4190-4192`.
- The function resolves the matching monthly hardware lease rate. Source: `index.html:4193-4197`.

Missing:

- Full OPEX is disabled because `quoteGenerationEnabled` is false. Source: `pricing-config.js:53`, `index.html:4199`.
- The resolved Full OPEX hardware lease rate is not displayed as a monetary scenario total.
- Hardware lease monthly total is not calculated as a quote scenario.
- Subscription is not added to Full OPEX monthly hardware lease in a Full OPEX scenario.
- Five-year contract total is not calculated for Full OPEX.
- Installation remains in normal component setup values, but no Full OPEX installation one-off line is generated.
- No Full OPEX template/pricelist mapping is included in the payload.
- The quote webhook cannot send a Full OPEX quote scenario.

Calculated values:

- Segment.
- Sensor count.
- Sensor type.
- Package.
- Matching Full OPEX tier.
- Monthly hardware lease rate per sensor.
- `ready` boolean.

Only displayed:

- Full OPEX option card.
- Disabled validation note when rates exist but routing is not enabled.

Included in payload:

- Nothing specific to Full OPEX.

### Retail Property

Already implemented:

- Full OPEX hardware lease rates are present for Retail Property. Source: `pricing-config.js:69-78`.
- Full OPEX readiness checks Retail Property rates when `state.customerType === "Shopping Centre"`. Source: `index.html:4186-4192`.

Partially implemented:

- The readiness function resolves a monthly hardware lease rate for Retail Property using package and a Basic/Premium sensor type. Source: `index.html:4193-4197`.

Missing:

- Retail Property Full OPEX is disabled because `quoteGenerationEnabled` is false.
- Retail Property Full OPEX sensor tiering uses `Number(state.values.entrances || 0)`, not total sensors across entrances, zones, tenant capture, ANPR/Re-ID or additional measurement points. Source: `index.html:4190-4192`.
- Final Basic/Premium 3D selection rule for Retail Property and Enterprise configurations remains an approved open commercial input. Source: `feedback/decisions/approved-phase-2-commercial-options.md`.
- Hardware lease monthly total is not calculated as a quote scenario.
- Subscription is not added to Full OPEX monthly hardware lease in a Full OPEX scenario.
- Five-year contract total is not calculated for Full OPEX.
- Installation is not generated as a Full OPEX one-off line.
- No Retail Property Full OPEX template/pricelist mapping is included in payload.

Calculated values:

- Segment.
- Entrance count as current sensor count proxy.
- Sensor type.
- Package.
- Matching Full OPEX tier.
- Monthly hardware lease rate per sensor.
- `ready` boolean.

Only displayed:

- Full OPEX option card.
- Disabled validation note when rates exist but routing is not enabled.

Included in payload:

- Nothing specific to Full OPEX.

## Both Quotations

Already implemented:

- `Both quotations` appears as a UI option on the final summary. Source: `index.html:4213-4216`.
- It is gated by the same Full OPEX readiness check. Source: `index.html:4211-4230`.

Partially implemented:

- The same configuration can hold `state.commercialModel = "both"` if Full OPEX is ready. Source: `index.html:4203-4208`.

Missing:

- `Both quotations` does not produce two separate commercial scenarios.
- `Both quotations` does not create two payload variants.
- `Both quotations` does not select two sets of templates/price lists.
- The quote webhook still sends exactly one `payload()`. Source: `index.html:4410-4422`.
- Because `commercialModel` is not included in the payload, downstream systems cannot distinguish `CAPEX + OPEX`, `Full OPEX` or `Both quotations`.

Conclusion:

- `Both quotations` is currently UI-only. It does not produce two genuinely separate commercial scenarios.

## Sensor Volume Tiering

### Retail Chain

Current behaviour:

- CAPEX/OPEX volume discount uses store count for Retail Chain. Source: `pricing-config.js:756-776`, `index.html:2998-2999`.
- Full OPEX tier lookup uses `commercialTotals().totalHardwareUnits`, which is closer to total sensor volume than store count. Source: `index.html:4190-4192`.
- Odoo price-list selection for the main quote uses entrance sensor units only. Source: `index.html:3176`.
- Odoo add-on price-list selection for in-store uses in-store component units separately. Source: `index.html:3177-3179`.

Assessment:

- Full OPEX tiering is closer to the approved total-sensors rule for Retail Chain, but payload price-list tiering still uses component-specific counts rather than one explicit commercial scenario sensor basis.

### Retail Property

Current behaviour:

- Retail Property CAPEX/OPEX volume discounts are configured to use sensors. Source: `pricing-config.js:778-799`.
- Full OPEX tier lookup uses only `state.values.entrances`. Source: `index.html:4190-4192`.
- The partly covered entrance card also calculates from entrances only. Source: `index.html:4029-4039`.
- The shared payload totals use hardcoded Retail Chain components. Source: `index.html:2993-3023`.

Assessment:

- Retail Property sensor tiering does not currently use total sensors correctly for Full OPEX.
- It should not be enabled until the app has an explicit Retail Property sensor-count basis for each selected module/configuration.

## Odoo Entity Routing

Stakeholder clarification on 2026-08-18:

- The selected salesperson must be leading for Odoo user, Odoo sales team and the underlying Odoo entity/company.
- The selected country is the customer's country and must not be treated as the authoritative Odoo entity selector.
- Example rationale: a UK Odoo user such as David cannot create quotations in the Odoo NL entity, so routing must follow the salesperson's Odoo organisation context.

Current behaviour:

- The builder currently maps salesperson only to `user_id`. Source: `index.html:1571-1586`, `index.html:2842`, `index.html:3335-3336`.
- The builder currently maps `sales_team_id` from `state.values.country`. Source: `index.html:2986-2987`, `index.html:3180`, `index.html:3305`.
- The builder stores the customer country in `meta.country_id`. Source: `index.html:3208-3210`.
- The current Odoo sales-team config is keyed by country (`NL`, `DE`, `FR`, `UK`). Source: `pricing-config.js:371-376`.
- Template and price-list records are not currently keyed by salesperson, sales entity or Odoo company. Source: `pricing-config.js:328-369`.

Assessment:

- The current payload can route NL correctly when the customer country and salesperson entity happen to match.
- The current payload is not safe for UK/DE testing because a customer country selection could set the wrong `sales_team_id` for the selected salesperson.
- Phase A must separate `customer_country` from `odoo_entity`.

Required Phase A direction:

- Add a salesperson routing catalogue that maps each salesperson to:
  - Odoo `user_id`;
  - Odoo `sales_team_id`;
  - Odoo entity/company key, for example `NL`, `UK` or `DE`;
  - available template and price-list set, if those differ by entity.
- Keep customer country as customer metadata and currency/setup context.
- Make the payload explicit with both values:
  - `customer_country_id`;
  - `odoo_entity_id` or `odoo_entity_key`;
  - `sales_team_id`;
  - `user_id`.

Current n8n flow compatibility findings:

- Inspected local n8n export: `/Users/christiaanvanrooijen/Downloads/1-QB-entry (1).json`.
- The n8n flow starts by extracting fields from `Webhook: Generate Offer`. It expects the current builder payload shape and reads:
  - `body.lead.company_name`;
  - `body.lead.contact_name`;
  - `body.lead.contact_email`;
  - `body.amount_of_sensors`;
  - `body.lead.template_id`;
  - `body.pricelist_id ?? body.lead.pricelist_id`;
  - `body.sales_team_id ?? body.lead.sales_team_id`;
  - `body.lead.operating_unit_id`;
  - `body.lead.user_id`.
- The flow creates the investment quotation from the extracted `template_id`, `pricelist_id`, `operating_unit_id` and `user_id`.
- The flow creates the CRM opportunity with `user_id`, `x_studio_operating_unit_id` and `team_id` from extracted `sales_team_id`.
- The flow creates the package subscription quotation from `body.subscription_quote.template_id` or `body.subscription_template_id`, and from `body.subscription_quote.pricelist_id` or `body.subscription_pricelist_id` or `body.opex_pricelist_id`.
- The flow uses one Odoo credential named `Odoo KvR` for all Odoo nodes. No entity-specific credential switch is present in the exported flow.
- The flow does not currently read `odoo_entity_key`, `customer_country_id`, `meta.country_id` or any explicit company/entity field for quotation creation.
- The flow expects at least an investment quotation and a package subscription quotation. Source: `Code: Build Webhook Response` in the n8n export.

Backward-compatible implementation requirement:

- Do not remove or rename the current top-level fields consumed by n8n:
  - `template_id`;
  - `pricelist_id`;
  - `capex_pricelist_id`;
  - `opex_pricelist_id`;
  - `subscription_pricelist_id`;
  - `subscription_template_id`;
  - `sales_team_id`;
  - `operating_unit_id`;
  - `user_id`;
  - `amount_of_sensors`;
  - `subscription_quote`;
  - `lead.template_id`;
  - `lead.pricelist_id`;
  - `lead.sales_team_id`;
  - `lead.operating_unit_id`;
  - `lead.user_id`.
- Add new routing fields only as additive metadata at first, for example `odoo_entity_key`, `customer_country_id` and `routing_source`.
- Change the values behind existing `sales_team_id`, `lead.sales_team_id` and `user_id` so they come from salesperson-led routing.
- Keep `country`/customer-country information separately so n8n does not mistake customer country for Odoo entity.
- For UK/DE testing, the builder must send entity-specific numeric `template_id` and `pricelist_id` values because the current n8n flow does not remap templates or price lists by entity.
- If quotations must explicitly set Odoo `team_id` on `sale.order`, the n8n flow will need a separate update because the current `Odoo: Create Quotation`, `Odoo: Create Package Quotation` and `Odoo: Create In-Store Subscripton Quotation` nodes do not set `team_id`; they set `user_id`, `operating_unit_id`, `template_id` and `pricelist_id`.

Stakeholder-supplied salesperson entity mapping:

| Salesperson | Odoo user id | Odoo entity key | Current sales team id assumption |
| --- | ---: | --- | ---: |
| Christiaan van Rooijen | 231 | NL | 1 |
| Anna Reilander | 394 | DE | 13 |
| Arnoud Aschman | 343 | NL | 1 |
| Bart Schmitz | 9 | NL | 1 |
| David Sturdy | 4 | UK | 3 |
| Krystof Gogela | 387 | NL | 1 |
| Mark Gosnell | 335 | UK | 3 |
| Mark King | 263 | UK | 3 |
| Oliver Germer | 404 | DE | 13 |
| Phill Cox | 122 | UK | 3 |
| Prince Competence | 382 | NL | 1 |
| Raymond Sestig | 328 | NL | 1 |

Note: Samar Moussa is no longer active and should be removed from active salesperson routing in implementation. Current sales team id assumptions use the existing config: NL = 1, DE = 13, UK = 3. Source: `pricing-config.js:371-376`.

## Implementation Gaps To Resolve In Phase A

1. Add a canonical commercial scenario model to the payload.
   It should include at least model id, term years, sensor tier basis, sensor count used, currency, one-off installation/setup total, one-off hardware CAPEX where applicable, monthly hardware lease where applicable, monthly subscription, total monthly, contract total and Odoo routing references.

2. Separate CAPEX + OPEX and Full OPEX calculations.
   CAPEX + OPEX should preserve one-off hardware plus one-off installation/setup plus monthly subscription over the applicable term.
   Full OPEX should use configured monthly hardware lease plus monthly subscription over five years, with installation/setup remaining one-off.

3. Make `Both quotations` generate two genuinely separate scenarios from the same configuration.

4. Fix the misleading payload field `tco_3_years` or add a correctly named field that reflects the actual term.

5. Add Retail Property commercial component assembly before enabling Retail Property quote generation.

6. Define and implement total sensor-count basis per Retail Property module before enabling Retail Property Full OPEX.

7. Add Odoo template catalogue records for Retail Property and for any entity-specific UK/DE records before sending quotes to Odoo.

8. Decide whether Full OPEX has distinct Odoo templates/pricelists or uses the same subscription template plus separate hardware-lease lines.

9. Replace country-led `sales_team_id` routing with salesperson-led Odoo entity routing.

## Exact Decisions Needed Before Implementation

1. For `CAPEX + OPEX`, should the default contract term remain three years for both Retail Chain and Retail Property, unless manually changed in the advanced assumptions?

2. For `Full OPEX`, should the term be locked to five years and override `state.values.tcoYears`, or should the UI show five years while leaving the normal TCO horizon editable for comparison only?

3. For `Both quotations`, should the output payload contain one request with two `commercial_scenarios`, or two separate quote requests/documents sent to Odoo?

4. For Full OPEX, confirm the contract total formula:
   `installation/setup one-off + ((monthly hardware lease + monthly subscription) * 60)`.

5. For CAPEX + OPEX, confirm the contract total formula:
   `(hardware CAPEX + installation/setup one-off) + (monthly subscription * 12 * contract years)`.

6. For Retail Chain Full OPEX tiering, confirm whether total sensor volume means all active hardware units together: entrance sensors + capture sensors + in-store/Re-ID sensors.

7. For Retail Property Full OPEX tiering, confirm which selected modules count as sensors for the total volume tier: entrances, zone sensors, tenant-capture sensors, ANPR cameras, Re-ID cameras and any other module-specific hardware.

8. For Retail Property, confirm the Basic/Premium 3D selection rule for Full OPEX, especially when the selected package is Enterprise.

9. For Full OPEX Odoo routing, should hardware lease be represented by new Full OPEX product templates/pricelists, or as quote lines generated from the configured monthly lease rate?

10. For UK/DE testing, provide or confirm the salesperson-to-Odoo-entity routing table:
    - salesperson name;
    - Odoo `user_id`;
    - Odoo entity/company key;
    - Odoo `sales_team_id`.

11. For UK/DE testing, provide or confirm the entity-specific Odoo template IDs and price-list IDs for Retail Chain and Retail Property, including CAPEX + OPEX, Full OPEX and Re-ID configurations.

12. For Retail Property Re-ID, confirm which template mapping should be used for:
    - footfall + Re-ID;
    - footfall + zone + Re-ID;
    - any tenant-capture + Re-ID combination, if that should be a distinct template.

13. Confirm whether Full OPEX and Both quotations may remain disabled in the UI until Odoo routing is complete, or whether they should become selectable for local preview while still blocked from webhook submission.
