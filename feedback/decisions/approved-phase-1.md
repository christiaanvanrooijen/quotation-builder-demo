# Approved Phase 1

Status: approved for implementation planning. Application code has not been changed by this decision record.

Approved on: 2026-07-08.

Source IDs such as FB-PDF, FB-SHOT-ROUTE, BRAND-GUIDE, BRAND-TONE and FB-ANNA-0707 are defined in `feedback/triage/feedback-summary.md` under "Source Register".

## Scope Clarification

The existing product remains `digital-quote-builder`.

- "Sales Conversation Builder" is a UX and content framing inside the existing Digital Quote Builder, not a new product or separate app.
- "Digital Brochure" is a future lightweight mode or section inside the existing Digital Quote Builder, not a new product or separate app.
- All Phase 1 work stays inside the current `digital-quote-builder` repo.
- Do not rename the repository.
- Do not create a new app.
- Do not create a new product folder.
- Do not split the project.

## Approved Decisions

1. Position the existing Digital Quote Builder experience with Sales Conversation Builder framing.
   The quote is the endpoint, not the starting point.

2. Add a country selector now.
   For Phase 1 it is metadata and future-proofing only, not live Odoo pricing logic.

3. Keep local pricing visible, but clearly label all pricing and ROI outputs as indicative.
   Odoo remains the future source of truth for final pricing, templates and quote generation.

4. Prioritise Digital Brochure mode/section and commercial summary output before public lead generation.

5. Use compact cards with expanders as the default UX for step 2.

## Phase 1 Goal

Improve the current Digital Quote Builder into a stronger guided sales conversation experience. The flow should help sales lead from customer context and pain points to business value, ROI direction, an indicative solution and finally quote-ready input for human review.

Evidence:
- The repo frames Concept B as an internal sales enablement tool with mandatory human review. Source: `docs/concept_b_sales_quote_companion.md:1-22`.
- Reviewers see value if outputs are correct and realistic, but they raised trust, copy and visibility concerns. Source: `feedback/inbox/feedback_from_emails.md:28`, `feedback/inbox/feedback_from_emails.md:36-42`.
- Anna and Tim's feedback reframes the product around sales story, pain points, KPIs, ROI, indicative solution and only then quote. Source: FB-ANNA-0707.
- Brand guidance asks for reliable, short, customer-outcome-led copy and caution around unsupported performance claims. Source: BRAND-TONE; BRAND-GUIDE.

## Approved Phase 1 Scope

### 1. Sales conversation framing

Approved work:
- Reframe the existing Digital Quote Builder experience and key copy around the sales conversation.
- Make pain points and business outcomes lead the flow.
- Treat quote generation as the endpoint after conversation context, KPI fit, ROI and commercial summary.
- Keep hardware and bill-of-materials language secondary or internal-only until business value is clear.

Evidence:
- Tim framed the issue as a commercial story problem, not a quote problem. Source: FB-ANNA-0707.
- Anna's proposed flow is website or digital brochure, sales funnel, pain points, KPIs, ROI, indicative solution, then quote. Source: FB-ANNA-0707.
- Related backlog: completed sales-conversation framing, completed commercial summary.

### 2. Trust and scope clarity

Approved work:
- Clarify every number as per store, total, monthly total, CAPEX total or TCO horizon.
- Label pricing, ROI and package outputs as indicative.
- Keep local pricing visible for Phase 1.
- Do not add live Odoo pricing logic in Phase 1.
- Keep Odoo positioned as the future source of truth for final pricing, templates and quote generation.

Evidence:
- Bart asked to define totals, store or all stores, and whether pricing should be totals rather than per-store. Source: FB-PDF pages 1 and 4.
- The July 5 reviewer said value depends on correct and realistic prospect-shared numbers. Source: `feedback/inbox/feedback_from_emails.md:28`.
- Anna wants final pricing to come from Odoo and avoid parallel price sources. Source: FB-ANNA-0707.
- Pricing is currently local and indicative. Source: `pricing-config.js:1-9`.
- Related backlog: DQB-002, DQB-016, DQB-018.

### 3. First-screen intake upgrade

Approved work:
- Fix company-name fallback and long-name hero wrapping.
- Add minimum contact fields: contact name, email and role/persona.
- Add data-owner/user context: who uses the data, who decides, and whether data is already captured.
- Add a country selector as metadata for future Odoo/country pricing logic.
- Add retail context for sales, service or both.
- Add shopping-centre maturity and parking context.
- Allow an "Other, specify" route for segment or measurement values that do not fit predefined dropdowns.

Evidence:
- Hero spacing and long-name fit issue. Source: `feedback/inbox/feedback_from_emails.md:32-34`; FB-SHOT-HERO; FB-PDF page 1.
- Contact/persona and stakeholder capture request. Source: `feedback/inbox/feedback_from_emails.md:17-19`.
- Country-specific pricing and metadata need. Source: FB-ANNA-0707.
- Retail sales/service context request. Source: `feedback/inbox/feedback_from_emails.md:9`.
- Shopping-centre maturity and parking request. Source: `feedback/inbox/feedback_from_emails.md:7-8`.
- Input-field flexibility request. Source: FB-PDF page 2.
- Related backlog: completed contact capture, DQB-005, DQB-006, DQB-007, DQB-011, completed country metadata.

### 4. Copy and localisation reliability pass

Approved work:
- Replace negative "we cannot / we do not" framing with outcome-led wording.
- Shorten step 2 content and put deeper explanations behind expanders.
- Review the "Suggested sales story", impact model and route/solution copy for a more grounded sales tone.
- Verify rendered EN/NL/DE/FR copy for mixed-language issues.

Evidence:
- Michel requested constructive wording and shorter checklist-style content. Source: `feedback/inbox/feedback_from_emails.md:12`.
- Reviewer said some text sounds gimmicky and should be reviewed with Janine. Source: `feedback/inbox/feedback_from_emails.md:36-38`.
- Bart flagged language and localisation as the biggest area for improvement. Source: `feedback/inbox/feedback_from_emails.md:65-67`; FB-PDF pages 3 and 5.
- Anna/Tim feedback reinforces business-value language over technical quote language. Source: FB-ANNA-0707.
- Related backlog: DQB-003, DQB-004.

### 5. Performance-leak selection simplification

Approved work:
- Replace the full-card grid with compact cards and expanders as the default step 2 UX.
- Use icons, short titles and expandable detail to reduce scrolling.
- Add questions about acting on results, objectives and forecasts.
- Keep selected goals visible in the live summary.

Evidence:
- Reviewer said the current page is scattered and suggested one-by-one yes/no selection. Source: `feedback/inbox/feedback_from_emails.md:44-46`; FB-SHOT-LEAKS.
- Michel requested checklist-style content and optional explanations. Source: `feedback/inbox/feedback_from_emails.md:12`.
- Anna repeated the need for less text, less scrolling, smaller blocks, title/icon first and expansion later. Source: FB-ANNA-0707.
- Related backlog: completed compact-card work, DQB-012.

### 6. Shopping-centre MVP clarity

Approved work:
- Improve the shopping-centre path so its value proposition is clear from first screen through value model.
- Include maturity, parking and stakeholder context.
- Keep shopping-centre ROI conservative: show modules and feasibility/value direction, not unsupported financial claims.
- Prepare content for review by Wendy or a key shopping-centre client if the user confirms the reviewer.

Evidence:
- Bart said retail is compelling but shopping centres are vague and need Wendy or client input. Source: `feedback/inbox/feedback_from_emails.md:67`.
- Michel requested shopping-centre maturity and parking. Source: `feedback/inbox/feedback_from_emails.md:7-8`.
- Brand guidance cautions against unsupported performance claims. Source: BRAND-GUIDE.
- Related backlog: DQB-007, DQB-008.

### 7. Digital brochure and commercial summary

Approved work:
- Prioritise a Digital Brochure mode/section and commercial summary path inside the existing Digital Quote Builder ahead of public lead generation.
- Add or prepare a business-value commercial summary before technical quote handoff.
- Keep public lead generation out of Phase 1 unless separately approved later.

Evidence:
- The latest feedback confirms Quotation Builder and Digital Brochure are higher priority than website lead generation. Source: FB-ANNA-0707.
- Anna wants one interactive digital environment and sees the Digital Brochure as follow-up material. Source: FB-ANNA-0707.
- Related backlog: DQB-015, completed commercial summary, DQB-019, DQB-020.

### 8. Route/package interaction and naming

Approved work:
- Revisit "Route" wording in light of the Sales Conversation Builder framing.
- Prefer a clearer solution-oriented label unless implementation review shows that "Route" should remain for internal consistency.
- Make package cards selectable for quick recalculation, or clearly explain why alternatives are informational only.
- Keep totals visible and update live summaries when assumptions or selected packages change.

Evidence:
- Bart asked why "route" rather than "solutions" and questioned pricing totals. Source: FB-PDF page 4.
- Reviewer asked whether the other two package tiles could be selected for quick recalculation. Source: `feedback/inbox/feedback_from_emails.md:52-54`; FB-SHOT-ROUTE.
- Related backlog: DQB-009, completed package interaction.

### 9. Required context fields

Approved decision:
- Contact role remains mandatory before a user can progress. All fields continue to be required for the current Phase 1 flow.

Evidence:
- Stakeholder decision, 2026-07-22, resolving the conflicting optional-role request in `FB-2107-ODOO-INTEGRATION`.
- Related backlog: completed navigation gating.

## Explicitly Out Of Scope For Phase 1

- Repository rename, product split, new product folder, or separate app creation.
- Public lead-generation website variant. It remains later than the Digital Brochure/commercial summary path. Source: `feedback/inbox/feedback_from_emails.md:56`; FB-ANNA-0707; CONCEPT-A; CONCEPT-B.
- AI internet research step. It needs privacy, source attribution and claim-safety decisions first. Source: `feedback/inbox/feedback_from_emails.md:16`; AGENTS data-safety rules; BRAND-GUIDE claims caution.
- Live Odoo pricing integration. Country is captured now as metadata, but Odoo pricing logic is future work. Source: FB-ANNA-0707.
- Pricing value changes. Local values remain visible as indicative until final Odoo pricing governance is implemented. Source: `pricing-config.js:1-9`.
- Automated final quote sending. Human review remains mandatory. Source: CONCEPT-A; CONCEPT-B; FB-ANNA-0707.

## Implementation Deliverables After Approval

- Updated app UI/copy in the existing static app files, expected mainly `index.html` and possibly `inline.js` if the current build convention still requires parity.
- Updated README validation notes and any necessary feedback decision notes.
- Rendered local verification for the six-step flow in EN and NL.
- Targeted checks for hero wrapping, compact step 2 cards/expanders, indicative pricing labels, country metadata, impact padding and package recalculation.

## Acceptance Criteria

- The existing Digital Quote Builder experience uses Sales Conversation Builder framing, with quote as the endpoint.
- No repository rename, new app, new product folder, or project split is introduced.
- Country is captured as metadata without implying live country-specific Odoo pricing.
- Local prices remain visible but are clearly labelled indicative.
- Odoo is referenced as the future source of truth for final pricing, templates and quote generation.
- Step 2 uses compact cards with expandable detail instead of showing all explanation-heavy content at once.
- Long company names no longer collide or create awkward hero wrapping.
- Customer-facing copy avoids negative "we cannot" framing and reads as short, reliable, outcome-led British English.
- Commercial outputs clearly state scope and do not imply unapproved guarantees.
- Contact, role/persona and data-owner/user context are captured in the payload.
- Shopping-centre path has visible maturity/parking context and a clearer non-fake-ROI value model.
- Package alternatives either recalculate on selection or are visibly marked as informational.
