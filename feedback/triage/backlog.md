# Feedback Backlog

Status: proposed triage backlog. Priorities are inferred from feedback severity, user trust risk and implementation sequencing. No item is approved until Phase 1 is approved.

Source IDs used below are defined in `feedback/triage/feedback-summary.md` under "Source Register".

## Priority Legend

- P0: needed before a credible guided sales demo.
- P1: important for Phase 1 if scope allows.
- P2: useful later or dependent on a policy/commercial decision.

## Backlog

| ID | Priority | Work item | Evidence | Notes |
| --- | --- | --- | --- | --- |
| DQB-001 | P0 | Fix hero title wrapping and company placeholder behaviour. | FB-EMAILS `feedback/inbox/feedback_from_emails.md:32-34`; FB-SHOT-HERO; FB-PDF page 1; APP-HTML `index.html:847-850`, `index.html:2761-2766`. | Direct fix. Use a neutral fallback such as "your retail chain" or "your centre" until a name is entered. |
| DQB-002 | P0 | Add explicit scope labels for all commercial and traffic inputs/outputs. | FB-PDF pages 1 and 4; APP-HTML `index.html:2020-2178`, `index.html:2459-2474`, `index.html:2700-2715`. | Labels should distinguish per store, all stores, monthly total, CAPEX total and TCO horizon. |
| DQB-003 | P0 | Rewrite pain and route copy into shorter, outcome-led, less gimmicky language. | FB-EMAILS `feedback/inbox/feedback_from_emails.md:12`, `feedback/inbox/feedback_from_emails.md:36-38`, `feedback/inbox/feedback_from_emails.md:65-67`; FB-SHOT-FIT; FB-SHOT-STORY; FB-SHOT-IMPACT; BRAND-TONE. | Include a Janine review step if the user confirms Janine as copy reviewer. |
| DQB-004 | P0 | Remove language mixing and verify EN/NL/DE/FR consistency across generated content. | FB-EMAILS `feedback/inbox/feedback_from_emails.md:65-67`; FB-PDF pages 3 and 5; APP-README `README.md:5-27`; APP-HTML `index.html:1341-1370`, `index.html:2823-2829`. | Build on v40 i18n work but validate the actual rendered flow, not only data objects. |
| DQB-005 | P0 | Simplify performance-leak selection into a compact checklist or sequential yes/no flow with optional detail. | FB-EMAILS `feedback/inbox/feedback_from_emails.md:12`, `feedback/inbox/feedback_from_emails.md:44-46`; FB-SHOT-LEAKS; APP-HTML `index.html:2384-2408`. | Decision needed: checklist with expanders is faster; yes/no flow is more guided. |
| DQB-006 | P0 | Add prospect/contact capture: contact name, email and role/persona. | FB-EMAILS `feedback/inbox/feedback_from_emails.md:17-19`; CONCEPT-A `docs/concept_a_public_solution_finder.md:9-22`; CONCEPT-B `docs/concept_b_sales_quote_companion.md:9-22`; APP-HTML `index.html:864-891`. | Treat as minimum lead and quote context, not direct automated outreach. |
| DQB-007 | P0 | Add data ownership/use questions: whether data is captured, who uses it and which departments decide. | FB-EMAILS `feedback/inbox/feedback_from_emails.md:17-18`; APP-HTML `index.html:2112-2178`. | Helps route the payload to stakeholders and improves sales qualification. |
| DQB-008 | P1 | Add retail operating model context: sales only, service only or both. | FB-EMAILS `feedback/inbox/feedback_from_emails.md:9`; APP-HTML `index.html:2299-2310`. | Useful for conversion and staffing interpretation. |
| DQB-009 | P1 | Add shopping-centre maturity guidance to match retail and include parking context. | FB-EMAILS `feedback/inbox/feedback_from_emails.md:7-8`; APP-HTML `index.html:2311-2322`, `index.html:1145-1198`. | Should improve shopping-centre credibility without inventing a fake ROI. |
| DQB-010 | P1 | Strengthen shopping-centre pain/value proposition and validate with Wendy or a key shopping-centre client. | FB-EMAILS `feedback/inbox/feedback_from_emails.md:67`; APP-HTML `index.html:2625-2687`; CONCEPT-B `docs/concept_b_sales_quote_companion.md:20-22`. | Content review dependency. Keep customer-visible claims evidence-backed. |
| DQB-011 | P1 | Clarify "Route" wording, possibly rename to "Solution direction" or "Recommended solution". | FB-PDF page 4; APP-HTML `index.html:1003-1009`, `index.html:2695-2716`; BRAND-TONE. | Needs approval because "route" is embedded in the current journey language. |
| DQB-012 | P1 | Make package cards interactive for quick recalculation or clearly explain why they are not selectable. | FB-EMAILS `feedback/inbox/feedback_from_emails.md:52-54`; FB-SHOT-ROUTE; APP-HTML `index.html:2695-2716`, `index.html:2807-2810`. | Current retail cards display alternatives but do not use `selectPackage` on click. |
| DQB-013 | P1 | Fix padding and responsive spacing in the impact assumptions panel. | FB-EMAILS `feedback/inbox/feedback_from_emails.md:48-50`; FB-SHOT-PADDING; APP-HTML `index.html:2507-2546`. | Direct visual polish item. |
| DQB-014 | P1 | Allow custom segment/current-measurement input when dropdown options do not fit. | FB-PDF page 2; APP-HTML `index.html:2301-2308`. | Could be "Other, specify" rather than replacing all selects. |
| DQB-015 | P1 | Add question about whether teams act on results and use objectives/forecasts. | FB-EMAILS `feedback/inbox/feedback_from_emails.md:13`; APP-HTML `index.html:1131-1140`. | Fits existing data activation goal. |
| DQB-016 | P1 | Define prospect visibility rules for internal sales story, route and ROI pages. | FB-EMAILS `feedback/inbox/feedback_from_emails.md:40-42`; FB-EMAILS `feedback/inbox/feedback_from_emails.md:28`; CONCEPT-B `docs/concept_b_sales_quote_companion.md:20-22`; BRAND-GUIDE. | Needed before showing outputs externally. |
| DQB-017 | P2 | Explore an AI research step that pulls external context into the tool. | FB-EMAILS `feedback/inbox/feedback_from_emails.md:16`; BRAND-GUIDE claims caution; AGENTS data safety rules. | Requires privacy, source attribution and internet-use policy before implementation. |
| DQB-018 | P2 | Define a lighter public website lead-generation version. | FB-EMAILS `feedback/inbox/feedback_from_emails.md:56`; CONCEPT-A `docs/concept_a_public_solution_finder.md:1-22`. | Should follow once internal flow, copy and claim rules are stable. |
| DQB-019 | P2 | Review numerical assumptions and approval workflow for prospect-shared outputs. | FB-EMAILS `feedback/inbox/feedback_from_emails.md:28`; APP-PRICING `pricing-config.js:1-9`; BRAND-GUIDE claims caution. | May need commercial owner sign-off outside code. |
| DQB-020 | P2 | Replace or approve emoji-style icons with approved digital iconography. | APP-HTML `index.html:1003-1009`, `index.html:1020-1198`; BRAND-TOKENS iconography; BRAND-VISUAL iconography. | Current emojis may be acceptable for prototype, but production should use approved icon rules. |
| DQB-021 | P0 | Reframe Phase 1 around Sales Conversation Builder UX/content framing inside the existing Digital Quote Builder, with quote as the endpoint. | FB-ANNA-0707 `feedback/inbox/feedback-anna-07072026.md:14-74`, `feedback/inbox/feedback-anna-07072026.md:258-307`; CONCEPT-B `docs/concept_b_sales_quote_companion.md:1-22`. | Approved clarification: this is not a new product, app, repo, folder or project split. It is framing inside `digital-quote-builder`. |
| DQB-022 | P0 | Add a business-value commercial summary before any technical quote handoff. | FB-ANNA-0707 `feedback/inbox/feedback-anna-07072026.md:173-191`, `feedback/inbox/feedback-anna-07072026.md:198-240`; APP-HTML `index.html:2112-2178`. | New item. Keep hardware/BOM language secondary or internal-only until business outcomes are clear. |
| DQB-023 | P1 | Define Odoo as the authoritative quote/pricing/template source and keep AI input-only. | FB-ANNA-0707 `feedback/inbox/feedback-anna-07072026.md:132-153`, `feedback/inbox/feedback-anna-07072026.md:364-387`; CONCEPT-B `docs/concept_b_sales_quote_companion.md:9-22`. | Partly duplicates DQB-019 and DQB-016, but adds architecture direction. |
| DQB-024 | P1 | Add country metadata and plan country-specific pricing logic. | FB-ANNA-0707 `feedback/inbox/feedback-anna-07072026.md:388-405`; APP-PRICING `pricing-config.js:1-16`. | New item. Phase 1 decision: capture country now even if Odoo pricing integration comes later. |
| DQB-025 | P1 | Prioritise Digital Brochure mode/section and commercial follow-up assets inside the existing Digital Quote Builder ahead of the public lead generator. | FB-ANNA-0707 `feedback/inbox/feedback-anna-07072026.md:122-131`, `feedback/inbox/feedback-anna-07072026.md:242-254`, `feedback/inbox/feedback-anna-07072026.md:336-362`; CONCEPT-A `docs/concept_a_public_solution_finder.md:1-22`. | Adjusts DQB-018 priority: public lead generation remains later; Digital Brochure is not a separate product. |
| DQB-026 | P2 | Define CRM/lead-nurturing loop using digital brochure, ROI calculator and follow-up email. | FB-ANNA-0707 `feedback/inbox/feedback-anna-07072026.md:423-449`; CONCEPT-A `docs/concept_a_public_solution_finder.md:9-22`; CONCEPT-B `docs/concept_b_sales_quote_companion.md:9-22`. | New later-stage item. Needs CRM workflow and data/privacy rules. |

## Delta Duplicate Map

| New feedback point | Duplicate or new? | Backlog impact |
| --- | --- | --- |
| Tool is valuable for shorter sales cycle, onboarding, consistency and less Odoo work. Source: FB-ANNA-0707 `feedback/inbox/feedback-anna-07072026.md:1-12`. | Duplicate support. | Confirms existing Phase 1 direction; no new backlog item. |
| Quote is not the start; sales story, pains, KPIs and ROI come first. Source: FB-ANNA-0707 `feedback/inbox/feedback-anna-07072026.md:14-104`. | Duplicate plus stronger framing. | Added DQB-021; strengthens DQB-003 and DQB-005. Clarification: framing only, inside existing `digital-quote-builder`. |
| Less scrolling, smaller cards, icons, short titles and expandable detail. Source: FB-ANNA-0707 `feedback/inbox/feedback-anna-07072026.md:105-121`, `feedback/inbox/feedback-anna-07072026.md:320-334`. | Direct duplicate. | Strengthens DQB-005; suggests checklist plus expanders as default. |
| AI collects context; Odoo makes quote; human review before sending. Source: FB-ANNA-0707 `feedback/inbox/feedback-anna-07072026.md:132-171`. | Duplicate plus architecture detail. | Added DQB-023; strengthens DQB-016 and DQB-019. |
| Hardware-to-business-value commercial summary. Source: FB-ANNA-0707 `feedback/inbox/feedback-anna-07072026.md:173-191`. | New emphasis. | Added DQB-022. |
| Digital brochure and quotation builder ahead of website lead generator. Source: FB-ANNA-0707 `feedback/inbox/feedback-anna-07072026.md:122-131`, `feedback/inbox/feedback-anna-07072026.md:242-254`. | Partly duplicate of DQB-018 but changes priority. | Added DQB-025; DQB-018 remains later-stage. Clarification: Digital Brochure is a mode/section inside the existing app. |
| Prices should come from Odoo, with country-specific logic. Source: FB-ANNA-0707 `feedback/inbox/feedback-anna-07072026.md:364-405`. | New architecture/detail. | Added DQB-023 and DQB-024. |
| Lead nurturing through digital environment and follow-up. Source: FB-ANNA-0707 `feedback/inbox/feedback-anna-07072026.md:423-449`. | New later-stage scope. | Added DQB-026. |
| Repeated sentence and repeated themes inside the new file. Source: FB-ANNA-0707 `feedback/inbox/feedback-anna-07072026.md:252-254`, `feedback/inbox/feedback-anna-07072026.md:39-121`, `feedback/inbox/feedback-anna-07072026.md:256-449`. | Internal duplicate. | Marked only; no separate backlog item. |

## Open Questions

| Question | Source |
| --- | --- |
| Should Phase 1 use the compact checklist or the sequential yes/no selection model for performance leaks? | FB-EMAILS `feedback/inbox/feedback_from_emails.md:44-46`; APP-HTML `index.html:2384-2408`. |
| Should "Route" be renamed, and if yes, should the preferred term be "Solution", "Solution direction" or "Recommended solution"? | FB-PDF page 4; APP-HTML `index.html:1003-1009`. |
| Which pages are intended to be prospect-visible during a sales meeting? | FB-EMAILS `feedback/inbox/feedback_from_emails.md:40-42`; CONCEPT-B `docs/concept_b_sales_quote_companion.md:20-22`. |
| Who should approve final customer-facing copy: Janine, Wendy, sales leadership or another owner? | FB-EMAILS `feedback/inbox/feedback_from_emails.md:36-38`, `feedback/inbox/feedback_from_emails.md:67`. |
| Which numeric claims and ROI assumptions are approved for prospect-facing use? | FB-EMAILS `feedback/inbox/feedback_from_emails.md:28`; BRAND-GUIDE claims caution; APP-PRICING `pricing-config.js:1-9`. |
| Resolved: Phase 1 should use Sales Conversation Builder framing inside the existing Digital Quote Builder, with quote as the final step. Do not rename the repo, create a new app, create a new product folder or split the project. | FB-ANNA-0707 `feedback/inbox/feedback-anna-07072026.md:14-74`, `feedback/inbox/feedback-anna-07072026.md:258-307`; `feedback/decisions/approved-phase-1.md`. |
| Should Phase 1 add a country selector now, even before live Odoo pricing integration? | FB-ANNA-0707 `feedback/inbox/feedback-anna-07072026.md:388-405`; APP-PRICING `pricing-config.js:1-16`. |
| Should local pricing remain visible as indicative in Phase 1, or should price display be reduced until Odoo pricing is authoritative? | FB-ANNA-0707 `feedback/inbox/feedback-anna-07072026.md:364-405`; APP-PRICING `pricing-config.js:1-16`. |
| Resolved: Digital Brochure/commercial summary is prioritised before public lead generation, as a future mode/section inside the existing Digital Quote Builder. | FB-ANNA-0707 `feedback/inbox/feedback-anna-07072026.md:122-131`, `feedback/inbox/feedback-anna-07072026.md:242-254`, `feedback/inbox/feedback-anna-07072026.md:336-362`; `feedback/decisions/approved-phase-1.md`. |
# Delta Backlog Addendum - 2026-07-08

## New Item

### DQB-027 - Fix false-open neighbouring card in Step 2 expanders

- Status: new; Phase 1 impacted.
- Priority: P1 before Phase 1 review.
- Type: UX defect / implementation feedback.
- Source: `FB-0807-STEP2-EXPANDER-TEXT`; screenshot `FB-0807-STEP2-EXPANDER-SHOT`.
- Duplicate: `feedback/inbox/feedback 08-07-2026` is a byte-for-byte duplicate of `feedback/inbox/feedback 08-07-2026.md`; do not create a separate backlog item for it.
- Related existing backlog: DQB-005 and DQB-015.
- Evidence: the user says the compact Step 2 Performance Leaks expanders are better, but expanding one item makes the neighbouring item visually expand as well while showing no content. The screenshot confirms the adjacent card stretches to the expanded row height.
- Requested outcome: only the clicked/hovered card should appear expanded.
- Implementation note: resolve through layout behaviour only. Do not change pricing formulas, ROI formulas, Odoo/API payload logic, country metadata, app/repo naming, or product structure.
- Decision needed: keep the two-column card grid and make only the active card visually grow, or switch Step 2 to a one-column accordion/list for clearer expansion behaviour.
