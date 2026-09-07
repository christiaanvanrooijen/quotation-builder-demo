# Feedback Backlog

Status: active triage backlog after the 2026-07-22 approval pass. IDs are sequential across active work only. Source IDs are defined in `feedback/triage/feedback-summary.md`.

## Priority Legend

- P0: needed before a credible guided sales demo.
- P1: important for Phase 1 if scope allows.
- P2: useful later or dependent on a policy or commercial decision.

## Active Backlog

| ID | Previous ID | Priority | Work item | Evidence | Notes |
| --- | --- | --- | --- | --- | --- |
| DQB-001 | DQB-002 | P0 | Add explicit scope labels for all commercial and traffic inputs/outputs. | FB-PDF pages 1 and 4; APP-HTML `index.html:2020-2178`, `index.html:2459-2474`, `index.html:2700-2715`. | Distinguish per store, all stores, monthly total, CAPEX total and TCO horizon. |
| DQB-002 | DQB-003 | P0 | Rewrite pain and route copy into shorter, outcome-led, less gimmicky language. | FB-EMAILS `feedback/inbox/feedback_from_emails.md:12`, `:36-38`, `:65-67`; BRAND-TONE. | Include a Janine review step if an owner is confirmed. |
| DQB-003 | DQB-004 | P0 | Remove language mixing and verify EN/NL/DE/FR consistency across generated content. | FB-EMAILS `feedback/inbox/feedback_from_emails.md:65-67`; FB-PDF pages 3 and 5. | The rendered English Impact label `Bedrijfsaannames` remains to be corrected. |
| DQB-004 | DQB-005 | P0 | Add data ownership/use questions: whether data is captured, who uses it and which departments decide. | FB-EMAILS `feedback/inbox/feedback_from_emails.md:17-18`. | Improves sales qualification and stakeholder routing. |
| DQB-005 | DQB-007 | P1 | Add shopping-centre maturity guidance and parking context. | FB-EMAILS `feedback/inbox/feedback_from_emails.md:7-8`. | Improve credibility without inventing a fake ROI. |
| DQB-006 | DQB-008 | P1 | Strengthen shopping-centre pain/value proposition and validate it with a customer or stakeholder. | FB-EMAILS `feedback/inbox/feedback_from_emails.md:67`; CONCEPT-B. | Keep customer-visible claims evidence-backed. |
| DQB-007 | DQB-009 | P1 | Clarify or rename "Route" wording. | FB-PDF page 4; BRAND-TONE. | Potential labels include "Solution direction" or "Recommended solution". |
| DQB-008 | DQB-012 | P1 | Ask whether teams act on results and use objectives or forecasts. | FB-EMAILS `feedback/inbox/feedback_from_emails.md:13`. | Fits the existing data-activation goal. |
| DQB-009 | DQB-013 | P1 | Define prospect-visibility rules for internal sales story, route and ROI pages. | FB-EMAILS `feedback/inbox/feedback_from_emails.md:28`, `:40-42`; CONCEPT-B. | Needed before showing outputs externally. |
| DQB-010 | DQB-014 | P2 | Explore an AI research step that pulls external context into the tool. | FB-EMAILS `feedback/inbox/feedback_from_emails.md:16`; AGENTS data-safety rules. | Requires privacy, source-attribution and internet-use policy. |
| DQB-011 | DQB-015 | P2 | Define a lighter public website lead-generation version. | FB-EMAILS `feedback/inbox/feedback_from_emails.md:56`; CONCEPT-A. | Follow the internal flow once copy and claim rules are stable. |
| DQB-012 | DQB-016 | P2 | Review numerical assumptions and approval workflow for prospect-shared outputs. | FB-EMAILS `feedback/inbox/feedback_from_emails.md:28`; `pricing-config.js:1-9`. | Needs commercial owner sign-off. |
| DQB-013 | DQB-018 | P1 | Define Odoo as the authoritative quote, pricing and template source while keeping AI input-only. | FB-ANNA-0707; CONCEPT-B. | Architecture direction; partly overlaps numerical and visibility work. |
| DQB-014 | DQB-019 | P1 | Prioritise Digital Brochure mode/section and commercial follow-up assets inside the existing app. | FB-ANNA-0707; CONCEPT-A. | Public lead generation remains later. |
| DQB-015 | DQB-020 | P2 | Define a CRM/lead-nurturing loop using the digital brochure, ROI calculator and follow-up email. | FB-ANNA-0707; CONCEPT-A; CONCEPT-B. | Requires CRM workflow and data/privacy rules. |
| DQB-016 | DQB-023 | P2 | Evaluate Event as a future customer type inside the existing product. | FB-ANNA-1507. | Discovery/spec only; no new flow without approval. |
| DQB-017 | DQB-026 | P1 | Define final-page print/email export and CRM-consent workflow. | FB-ANNA-1507. | Human review remains mandatory; requires privacy/workflow approval. |
| DQB-018 | DQB-027 | P2 | Define a minimal Odoo webhook payload contract with stable English IDs. | FB-2107-ODOO-INTEGRATION `feedback/inbox/2026-07-21.md:5-6`. | Do not transmit data until schema, recipient, authentication and privacy review are approved. |
| DQB-019 | DQB-028 | P2 | Map country to Odoo company, currency, pricelist, template and operating unit. | FB-2107-ODOO-INTEGRATION `feedback/inbox/2026-07-21.md:9`. | Needs authoritative Netherlands/UK mappings and scope approval. |
| DQB-020 | DQB-029 | P1 | Define scenario-to-package-to-sensor-to-Odoo-product mapping. | FB-2107-ODOO-INTEGRATION `feedback/inbox/2026-07-21.md:11-23`. | Needs approved package boundaries, formulas and product catalogue. |

## Completed Work Removed From Active Backlog

- Hero title wrapping and neutral company/customer-type fallback.
- Compact Step 2 selection with expandable detail and the neighbouring-card expansion fix.
- Contact name, email and mandatory role capture; all-field navigation gating remains in force.
- Retail operating-model context, approved segment taxonomy, and optional entrance and multiple-floor context.
- Interactive package selection and recalculation.
- Sales Conversation Builder framing and the commercial summary.
- Country metadata capture and the approved 1366 x 768 desktop layout pass.
- Covered KPIs on Page 3.
- Impact-panel spacing and custom segment/current-measurement inputs.
- Approved supplied icon set.
- Retail diagnosis pain-first wording.
- Conversation Snapshot information architecture.
- Page 4 ROI layout, duplicate-assumption cleanup, neutral result emphasis, and model help text.

## Confirmed Decisions

- The current Phase 1 demo target is 1366 x 768; full phone support is not required now.
- Every field, including contact role, is mandatory before a user can progress.
- ROI results use brand-neutral styling; green/red status styling is not approved.
- Human review remains mandatory. Automated quote sending is out of scope for Phase 1.

Detailed feedback evidence, duplicate analysis, and historical decisions remain in `feedback/triage/feedback-summary.md` and `feedback/decisions/approved-phase-1.md`.
