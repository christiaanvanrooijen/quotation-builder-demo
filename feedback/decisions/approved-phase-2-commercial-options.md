# Approved Phase 2 Commercial Options

Status: partially approved for implementation. Commercial price inputs marked as open must not be inferred.

Approved on: 2026-08-13.

## Sources

- `FB-1308-COMMERCIAL-OPTIONS`: stakeholder feedback supplied in the Codex task on 2026-08-13. Covers Full OPEX, dual quotations, package comparison, existing-customer scenarios and missing icons.
- `FB-1308-PACKAGE-MATRIX`: local screenshot `Scherm­afbeelding 2026-08-11 om 10.28.04.png`, supplied in the same task. Extracted package-service matrix; the raw screenshot remains outside the repository.
- `FB-1308-RETAIL-PROPERTY-IMPACT`: local reference HTML `pfm_retail_property_impact_web.html` and matching PNG supplied on 2026-08-13. Extracted interaction and copy direction for the Retail Property Impact Model; raw source files remain outside the repository.
- `STAKEHOLDER-1308-PACKAGE-OPEX`: stakeholder clarification in the Codex task on 2026-08-13.
- `STAKEHOLDER-1308-OPEX-RATES`: stakeholder-supplied Full OPEX tables in the Codex task on 2026-08-13, covering Retail Chain and Retail Property by Basic/Premium 3D, sensor-volume tier and package.

## Approved Decisions

1. `Essential`, `Professional` and `Enterprise` are the leading package names for Retail Chain and Retail Property.
2. The quotation choice belongs at the end of the flow, not in the initial context questions.
3. The available commercial-model choices are `CAPEX + OPEX`, `Full OPEX` and `Both quotations`.
4. Full OPEX uses a standard five-year term.
5. Full OPEX consists of a fixed monthly sensor price selected by total sensor-volume tier plus the applicable subscription. Installation remains a one-off line.
6. Full OPEX prices must come from `pricing-config.js`; they must not be derived by dividing hardware CAPEX over 60 months.
7. The same configuration may generate both commercial variants without restarting the builder.
8. The package comparison may initially use the supplied matrix. `PFM App Pulse` and customer-specific service requirements are optional add-ons.
9. Retail Property uses an evidence-strength Impact Model, not the Retail Chain financial ROI model. It must show what the selected data layers can prove, what remains directional and which customer data is still required.
10. The internal customer-type key `Shopping Centre` remains unchanged until backend and Odoo mappings are deliberately migrated.

## Open Commercial Inputs

- Final sensor-selection rule for Basic/Premium 3D in Retail Property and Enterprise configurations.
- Existing-customer line-generation rules for subscription-only, hardware replacement and service upgrades.
- Final contract/legal wording and footnotes for the package comparison.

## Implementation Guardrails

- Do not invent Full OPEX prices or lease surcharges.
- Do not send or auto-submit a Full OPEX quotation while required price records are missing.
- Keep all displayed pricing indicative until human review and Odoo confirmation.
- Do not apply Retail Chain ROI formulas to Retail Property.
- Keep raw screenshots and external prototype files outside the repository.

## Supplied Full OPEX Rate Structure

- The supplied tables use tiers `1-9`, `10-29`, `30-99` and `100+` total sensors.
- Rates vary by Retail Chain/Retail Property, Basic/Premium 3D and Essential/Professional/Enterprise.
- The supplied values are the monthly hardware lease component; the applicable package subscription is added separately.
- The duplicated first `Enterprise` table header is interpreted as `Essential`, following approved package naming.
- Values are stored exactly as supplied, including tiers whose rate is higher than the preceding tier.
- Quote calculation remains disabled until rate composition and routing are approved.
