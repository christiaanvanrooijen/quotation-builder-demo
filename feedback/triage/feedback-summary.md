# Feedback Summary

Status: initial triage processed from existing inbox assets on 2026-07-08. Delta triage added on 2026-07-08 for the new Anna/workflow feedback file. No application code was changed.

## Source Register

| Source ID | Locator | Notes |
| --- | --- | --- |
| APP-README | `README.md:1-49` | Current version notes and validation history. |
| APP-STREAMLIT | `app.py:1-24` | Streamlit wrapper that loads `index.html` and injects pricing config. |
| APP-HTML | `index.html:831-924`, `index.html:951-1010`, `index.html:1020-1198`, `index.html:2020-2178`, `index.html:2280-2834` | Main static app, state, screens, retail/shopping goals, ROI logic, payload and render flow. |
| APP-PRICING | `pricing-config.js:1-80` | Pricing source of truth and package definitions. |
| CONCEPT-A | `docs/concept_a_public_solution_finder.md:1-22` | Public lead generation concept. |
| CONCEPT-B | `docs/concept_b_sales_quote_companion.md:1-22` | Internal sales quote companion concept. |
| FB-EMAILS | `feedback/inbox/feedback_from_emails.md:1-71` | Email feedback from Michel, July 5 reviewer and Bart. |
| FB-ANNA-0707 | `feedback/inbox/feedback-anna-07072026.md:1-449` | New delta feedback added after the first triage. Dutch synthesis of Anna, Tim, Kristof and workflow-session input. |
| FB-PDF | `feedback/inbox/first_feedback.pdf`, pages 1-5 | Annotated PDF from Bart Schmitz, extracted and visually reviewed. |
| FB-SHOT-HERO | `feedback/inbox/Screenshot 2026-07-02 at 09.26.46.png` | First-screen hero/title spacing. |
| FB-SHOT-LEAKS | `feedback/inbox/Screenshot 2026-07-02 at 09.28.01.png` | Performance leak selection grid. |
| FB-SHOT-FIT | `feedback/inbox/Screenshot 2026-07-02 at 09.29.19.png` | PFM fit heading/copy. |
| FB-SHOT-STORY | `feedback/inbox/Screenshot 2026-07-02 at 09.29.41.png` | Suggested sales story copy. |
| FB-SHOT-IMPACT | `feedback/inbox/Screenshot 2026-07-02 at 09.30.11.png` | Impact model heading/copy. |
| FB-SHOT-PADDING | `feedback/inbox/Screenshot 2026-07-02 at 09.30.42.png` | Impact assumptions padding/layout. |
| FB-SHOT-ROUTE | `feedback/inbox/Screenshot 2026-07-02 at 09.31.10.png` | Route/package card interaction. |
| BRAND-GUIDE | `/Users/christiaanvanrooijen/Library/CloudStorage/OneDrive-PFM-Intelligence/AI/Codex/03-shared/brand/brand-guidelines.md` | Brand foundations, claims caution and source register. |
| BRAND-TONE | `/Users/christiaanvanrooijen/Library/CloudStorage/OneDrive-PFM-Intelligence/AI/Codex/03-shared/brand/tone-of-voice.md` | Customer-as-hero, short copy, British English, reliability. |
| BRAND-VISUAL | `/Users/christiaanvanrooijen/Library/CloudStorage/OneDrive-PFM-Intelligence/AI/Codex/03-shared/brand/visual-style.md` | Visual and UI implications. |
| BRAND-TOKENS | `/Users/christiaanvanrooijen/Library/CloudStorage/OneDrive-PFM-Intelligence/AI/Codex/03-shared/brand/design-tokens.json` | Approved colours, typography, icon library and open UI token gaps. |
| BRAND-LOGO | `/Users/christiaanvanrooijen/Library/CloudStorage/OneDrive-PFM-Intelligence/AI/Codex/03-shared/brand/logo-usage.md` | Logo and tagline usage. |

Note: raw feedback has been standardised under `feedback/inbox`. Earlier triage passes found these raw files under `docs/inbox`; the source register now uses the canonical `feedback/inbox` paths.

Scope clarification: the existing product remains `digital-quote-builder`. "Sales Conversation Builder" is a UX/content framing inside the existing Digital Quote Builder, and "Digital Brochure" is a future lightweight mode or section inside the existing Digital Quote Builder. Do not rename the repository, create a new app, create a new product folder or split the project.

## App Structure

- The app is currently a single-page static HTML experience wrapped by Streamlit. `app.py` sets a wide Streamlit page, reads `index.html`, injects `pricing-config.js`, and renders the HTML in a Streamlit component iframe. Source: APP-STREAMLIT.
- `index.html` contains both the UI markup and the main application logic. It defines a sticky journey nav, language buttons, six screen containers and a script that consumes `window.PFM_PRICING`. Source: APP-HTML at `index.html:831-924`.
- The flow has six steps: Context, Performance leaks, Insight fit, Impact model, Route, and Summary. Source: APP-HTML at `index.html:1003-1009`.
- State is stored in a single client-side `state` object with selected customer type, language, selected goals, selected package, opportunity type and commercial assumptions. Source: APP-HTML at `index.html:951-991`.
- Retail and shopping-centre problem catalogues live in `index.html`. Retail goals include baseline, conversion, street/store, groups, visitor profile, benchmarking, staffing, entrance bounce, in-store, expansion and data activation. Shopping-centre goals include centre baseline, entrance value, zone flow, tenant capture and further asset topics. Source: APP-HTML at `index.html:1020-1198`.
- The ROI and commercial totals are calculated client-side from active components, business assumptions, uplift assumptions and the pricing config. Source: APP-HTML at `index.html:2020-2110`.
- The output payload is client-side JSON intended for downstream n8n/Odoo enrichment, including customer-visible context, selected goals, ROI rows, quote components, Odoo IDs and sales metadata. Source: APP-HTML at `index.html:2112-2178`; CONCEPT-A; CONCEPT-B.
- Pricing is separated into `pricing-config.js`, which documents itself as the source of truth for indicative pricing and includes retail component prices, package definitions and shopping-centre module pricing. Source: APP-PRICING.
- `inline.js`, `script.js`, `extracted.js`, patch scripts and i18n helper scripts appear to be prior/generated or extraction artefacts around the same HTML logic. This is inferred from the repo inventory and from README version notes that list `index.html`, `inline.js` and `README.md` as the v40 changed files. Source: APP-README.

## Run And Build

- Install runtime dependencies with `pip install -r requirements.txt`. The only declared dependency is Streamlit. Source: `requirements.txt:1`; APP-STREAMLIT.
- Run the app with `streamlit run app.py`. This is the primary local path because `app.py` injects `pricing-config.js` into the HTML before rendering. Source: APP-STREAMLIT.
- For static-browser inspection, serve or open `index.html` from the repo root so it can load `pricing-config.js`. This is inferred from the `<script src="pricing-config.js"></script>` tag and the Streamlit comment explaining sibling JS handling. Source: APP-HTML at `index.html:919`; APP-STREAMLIT at `app.py:16-22`.
- No build pipeline was found in the repo inventory. There is no `package.json` in the inspected file list, and the README validation history only mentions syntax checks, not a build. Source: APP-README at `README.md:41-49`.
- Current validation commands from the README are `node --check` for JavaScript and `python3 -m py_compile app.py` for the Streamlit wrapper. Source: APP-README at `README.md:41-47`.

## Git State

- Git is active, but the detected Git root is `/Users/christiaanvanrooijen`, not this product folder.
- The project folder is currently untracked from that Git root (`?? ./` when status is scoped to this folder), and the Git repository reports no commits yet on `main`.
- Because the whole product folder is untracked, Git cannot distinguish committed baseline files from uncommitted changes inside this project. Treat the current local files as the working baseline until a project-level Git baseline is created.

## Feedback Themes

### 1. Copy, tone and localisation need a reliability pass

Direct evidence:
- Michel asked to replace "we cannot" framing with more constructive "gain or improve" language and to keep page 2 shorter, checklist-like and expandable. Source: FB-EMAILS at `feedback/inbox/feedback_from_emails.md:12`.
- The July 5 reviewer said some copy sounds too gimmicky and recommended checking with Janine. Source: FB-EMAILS at `feedback/inbox/feedback_from_emails.md:36-38`; FB-SHOT-FIT; FB-SHOT-STORY; FB-SHOT-IMPACT.
- Bart called language and wording the biggest improvement area and noted mixed or inconsistent translations. Source: FB-EMAILS at `feedback/inbox/feedback_from_emails.md:65-67`; FB-PDF pages 3 and 5.
- The current app includes multiple customer-facing headings that start with "We do not..." or "We cannot..." in both retail and shopping-centre goals. Source: APP-HTML at `index.html:1021-1141` and `index.html:1145-1198`.

Inference:
- Phase 1 should prioritise copy clarity and localisation consistency before adding new commercial functionality. This follows reviewer evidence plus the brand rule to write short, outcome-led, reliable copy in British English. Source: BRAND-TONE; BRAND-GUIDE.

### 2. First-screen context is useful but incomplete

Direct evidence:
- Michel liked the retail maturity advice and asked to add comparable maturity guidance for shopping centres, parking, and a retail question about sales, service or both. Source: FB-EMAILS at `feedback/inbox/feedback_from_emails.md:6-9`.
- Bart asked whether `[COMPANY]` should remain bracketed until a name is entered and asked to define whether numbers are totals, per store or all stores. Source: FB-PDF page 1.
- Bart asked whether non-selectable options should become input fields. Source: FB-PDF page 2.
- The current first screen captures customer type, company, PFM consultant and context fields, but it does not capture contact/persona details. Source: APP-HTML at `index.html:864-891` and `index.html:2299-2329`.

Inference:
- Phase 1 should tighten the context form by clarifying placeholders and scope labels, adding minimum contact/persona fields and improving the retail/shopping-centre intake questions. Source: FB-EMAILS at `feedback/inbox/feedback_from_emails.md:17-19`; CONCEPT-A; CONCEPT-B.

### 3. The performance-leak selection page feels too dense

Direct evidence:
- The July 5 reviewer said the page is scattered, has too many tiles and may work better as a one-by-one yes/no flow. Source: FB-EMAILS at `feedback/inbox/feedback_from_emails.md:44-46`; FB-SHOT-LEAKS.
- Michel asked for shorter checklist-style content with optional explainers behind an icon. Source: FB-EMAILS at `feedback/inbox/feedback_from_emails.md:12`.
- The current step renders every goal as a full card in a grid. Source: APP-HTML at `index.html:2384-2408`.

Inference:
- Phase 1 should reduce cognitive load on step 2, either with a compact checklist plus expanders or a sequential yes/no mode. Source: FB-EMAILS and APP-HTML references above.

### 4. Commercial outputs need scope clarity and confidence safeguards

Direct evidence:
- The July 5 reviewer said the tool is valuable if the output is correct and realistic in terms of numbers shared with prospects. Source: FB-EMAILS at `feedback/inbox/feedback_from_emails.md:28`.
- Bart asked whether pricing should show totals rather than per-store values and questioned "route" versus "solutions". Source: FB-PDF page 4.
- The current app calculates totals, monthly service, TCO, payback and ROI, then includes ROI rows in the payload. Source: APP-HTML at `index.html:2020-2178`.
- Pricing values are documented as indicative and separated into the pricing config. Source: APP-PRICING at `pricing-config.js:1-9`.

Inference:
- Phase 1 should not change pricing values without commercial approval. It should clarify labels, scope, total/per-store meaning and prospect visibility. Source: FB-EMAILS at `feedback/inbox/feedback_from_emails.md:28`; BRAND-GUIDE claims caution.

### 5. Shopping-centre value is the largest proposition gap

Direct evidence:
- Michel asked to add shopping-centre maturity guidance and parking. Source: FB-EMAILS at `feedback/inbox/feedback_from_emails.md:7-8`.
- Bart said the retail use case is compelling but shopping centres remain vague, and suggested Wendy or a key shopping-centre client review. Source: FB-EMAILS at `feedback/inbox/feedback_from_emails.md:67`.
- The current app already has shopping-centre goals and a shopping-centre value model, but it separates value modules from fake ROI and still uses route framing. Source: APP-HTML at `index.html:1145-1198` and `index.html:2625-2687`.

Inference:
- Phase 1 should make the shopping-centre path credible enough for internal guided use, while deeper commercial pricing/business-case work can remain later. Source: FB-EMAILS and APP-HTML references above.

### 6. Lead capture and future public lead generation are desirable but should follow the internal flow

Direct evidence:
- Michel asked for who is being spoken to, minimum name/email, role/persona and data-user questions. Source: FB-EMAILS at `feedback/inbox/feedback_from_emails.md:17-19`.
- Michel asked for an AI research step that pulls internet context into the tool. Source: FB-EMAILS at `feedback/inbox/feedback_from_emails.md:16`.
- The July 5 reviewer saw a lighter website version as a lead-generation opportunity. Source: FB-EMAILS at `feedback/inbox/feedback_from_emails.md:56`.
- The repo already distinguishes a public solution finder concept from an internal sales quote companion concept. Source: CONCEPT-A; CONCEPT-B.

Inference:
- Phase 1 should add minimum contact/persona capture inside the current internal flow. AI research and a public lead-gen variant should be parked until source, privacy, claim and workflow rules are approved. Source: FB-EMAILS; BRAND-GUIDE; CONCEPT-A; CONCEPT-B.

### 7. Visual polish issues are concrete and small enough for Phase 1

Direct evidence:
- The first hero title has problematic wrapping and spacing for a longer company name. Source: FB-EMAILS at `feedback/inbox/feedback_from_emails.md:32-34`; FB-SHOT-HERO; FB-PDF page 1.
- The impact assumptions panel needs padding adjustment. Source: FB-EMAILS at `feedback/inbox/feedback_from_emails.md:48-50`; FB-SHOT-PADDING.
- The package cards invite comparison, and the reviewer asked whether selecting the other two cards could recalculate quickly. Source: FB-EMAILS at `feedback/inbox/feedback_from_emails.md:52-54`; FB-SHOT-ROUTE.

Inference:
- Phase 1 should include targeted layout fixes where they directly affect trust and comprehension. Source: FB-EMAILS and screenshots above; BRAND-VISUAL readability rule.

## Delta Triage - 2026-07-08

New source processed:
- `FB-ANNA-0707`: `feedback/inbox/feedback-anna-07072026.md:1-449`.

No new PDFs or screenshots were found in the delta source set. Previously processed screenshots and `first_feedback.pdf` were not reprocessed.

### Delta Theme 1. The tool is valuable, but the UX/content frame should be sales conversation first

Direct evidence:
- The tool is broadly seen as valuable because it can shorten the sales cycle, help onboarding, increase country consistency and remove manual Odoo work. Source: FB-ANNA-0707 at `feedback/inbox/feedback-anna-07072026.md:1-12`.
- Tim framed the issue as a commercial story problem, not a quote problem; customers care about business problems, value and why PFM before hardware details. Source: FB-ANNA-0707 at `feedback/inbox/feedback-anna-07072026.md:14-38`.
- Anna independently framed the flow as website or digital brochure, sales funnel, pain points, KPIs, ROI, indicative solution, then quote. Source: FB-ANNA-0707 at `feedback/inbox/feedback-anna-07072026.md:39-74`.
- Anna sees the tool as a commercial assistant during Teams meetings, physical sales conversations, fairs and weblead support. Source: FB-ANNA-0707 at `feedback/inbox/feedback-anna-07072026.md:258-271`.

Duplicate status:
- Duplicates and strengthens the existing Phase 1 direction around guided sales use, pain-first flow and human review. Related backlog: DQB-003, DQB-005, DQB-016.

Phase 1 impact:
- The current Phase 1 goal is impacted at the UX/content framing level. It should explicitly say the quote is the endpoint, not the starting point, and the first outcome is a stronger sales conversation inside the existing Digital Quote Builder.

### Delta Theme 2. Pain points and business value should lead before technical quote content

Direct evidence:
- Feedback says not to start with store count, sensor count or budget, but with customer pains such as conversion, staffing, visitor quality, dwell time, marketing, leasing and benchmarks. Source: FB-ANNA-0707 at `feedback/inbox/feedback-anna-07072026.md:75-104`.
- Tim's "doctor model" is complaints, diagnosis, solution. Source: FB-ANNA-0707 at `feedback/inbox/feedback-anna-07072026.md:101-104`.
- The quote should move from sensor, bracket and injector language toward conversion improvement, staffing optimisation, revenue growth, benchmarking and ROI, with a commercial summary before the technical quote. Source: FB-ANNA-0707 at `feedback/inbox/feedback-anna-07072026.md:173-191`.

Duplicate status:
- Duplicates DQB-003 and DQB-005, but adds a stronger hardware-to-business-value requirement.

Phase 1 impact:
- Phase 1 should prioritise a commercial summary layer before any technical quote handoff. Technical component language should be hidden, secondary or internal-only until the business value is clear.

### Delta Theme 3. UX simplification is a repeated concrete requirement

Direct evidence:
- Anna said everything is currently open and suggested small cards, icons, short titles and click-to-expand content to reduce scrolling. Source: FB-ANNA-0707 at `feedback/inbox/feedback-anna-07072026.md:105-121`.
- Anna repeated that the UX needs less text, less scrolling, smaller blocks, title/icon first and expansion later. Source: FB-ANNA-0707 at `feedback/inbox/feedback-anna-07072026.md:320-334`.

Duplicate status:
- Direct duplicate of DQB-005 and supporting evidence for DQB-013.

Phase 1 impact:
- This makes the compact checklist with expanders the lower-risk default for Phase 1 unless the user explicitly prefers the sequential yes/no flow.

### Delta Theme 4. Odoo should remain the pricing/template authority, with human-in-the-loop control

Direct evidence:
- Kristof's architecture note says AI should collect the right input, start the webhook and fill the Odoo template; AI decides nothing and Odoo makes the quote. Source: FB-ANNA-0707 at `feedback/inbox/feedback-anna-07072026.md:132-153`.
- Human review remains necessary before sending, especially for discounts, exceptions and project-specific choices. Source: FB-ANNA-0707 at `feedback/inbox/feedback-anna-07072026.md:154-171`.
- Anna wants all prices to come from Odoo and avoid parallel Excel sheets or old/new price lists. Source: FB-ANNA-0707 at `feedback/inbox/feedback-anna-07072026.md:364-387`.
- Anna flagged country-specific pricing logic: German project costs, installation rates and country-specific price models; salesperson chooses country and the tool gets the right pricing structure. Source: FB-ANNA-0707 at `feedback/inbox/feedback-anna-07072026.md:388-405`.

Duplicate status:
- Duplicates the existing human-review and pricing-safeguard direction in DQB-016 and DQB-019, but adds a new integration requirement for Odoo pricing and country-specific logic.

Phase 1 impact:
- Phase 1 pricing should remain carefully labelled as indicative if it still uses local config. A new decision is needed on whether to add country as metadata now and whether to suppress or qualify prices until Odoo pricing is authoritative.

### Delta Theme 5. Digital brochure and commercial follow-up assets are higher priority than the public lead generator

Direct evidence:
- The emerging product structure is Lead Generator, Digital Brochure and Digital Quotation Builder, with Lead Generator lower priority than the other two. Source: FB-ANNA-0707 at `feedback/inbox/feedback-anna-07072026.md:122-131`.
- The newest feedback confirms Quotation Builder and Digital Brochure are currently highest priority; website lead generator can follow. Source: FB-ANNA-0707 at `feedback/inbox/feedback-anna-07072026.md:242-254`.
- Anna wants one interactive digital environment instead of many static PowerPoints, PDFs and brochures. Source: FB-ANNA-0707 at `feedback/inbox/feedback-anna-07072026.md:336-350`.
- Anna also sees the Digital Brochure as follow-up material after first or second email. Source: FB-ANNA-0707 at `feedback/inbox/feedback-anna-07072026.md:352-362`.
- Lead nurturing should keep prospects warm through the digital brochure, ROI calculator and interactive parts, making the tool part of CRM. Source: FB-ANNA-0707 at `feedback/inbox/feedback-anna-07072026.md:423-449`.

Duplicate status:
- Partly duplicates DQB-018, but changes priority: Digital Brochure mode/section and quote-support assets should rank ahead of a lightweight public lead generator.

Phase 1 impact:
- The public lead-generator item remains out of Phase 1. A Digital Brochure mode/section or commercial-summary output may need to move earlier than originally framed, inside the existing Digital Quote Builder.

### Delta Theme 6. There is internal duplication inside the new feedback file

Direct evidence:
- The sentence confirming Quotation Builder and Digital Brochure as highest priority and lead generator later appears twice. Source: FB-ANNA-0707 at `feedback/inbox/feedback-anna-07072026.md:252-254`.
- The same ideas repeat in two passes: sales conversation support, simpler UX, digital-first brochure, Odoo pricing and iterative feedback. Source: FB-ANNA-0707 at `feedback/inbox/feedback-anna-07072026.md:39-121` and `feedback/inbox/feedback-anna-07072026.md:256-449`.

Duplicate status:
- Marked as duplicate evidence, not a separate requirement.
# Delta Triage Addendum - 2026-07-08 Step 2 Expander Feedback

Status: processed as new/changed feedback since the last triage. This dated addendum was appended because the OneDrive-backed markdown file timed out during full-file reads on 2026-07-08.

## New Sources

- `FB-0807-STEP2-EXPANDER-TEXT`: `feedback/inbox/feedback 08-07-2026.md`. New markdown feedback added 2026-07-08 12:26:55. Direct evidence: Step 2 compact expanders are better, but when one Performance Leaks item is expanded the neighbouring item in the same row also appears to open/stretch while showing no content. The user asks whether only the item expanded with the mouse can expand.
- `FB-0807-STEP2-EXPANDER-TEXT-DUP`: `feedback/inbox/feedback 08-07-2026`. Duplicate of `FB-0807-STEP2-EXPANDER-TEXT`; SHA-256 matches exactly: `1ad6b743f2b3be01c1378b3063bd9b335e107037912c20e8ebeb7af68156edf4`.
- `FB-0807-STEP2-EXPANDER-SHOT`: `feedback/inbox/Scherm­afbeelding 2026-07-08 om 12.19.02.png`. Screenshot evidence shows the selected right-hand compact card expanded while the left-hand card in the same grid row stretches to the same height, creating a false visual impression that it has also expanded.

## New Finding

- Step 2 compact cards are directionally approved, but the current two-column grid expansion behaviour creates a confusing false-open state for the neighbouring card. This is direct feedback on the current Phase 1 implementation and should be treated as a Phase 1 UX defect, not a new product direction.

## Duplicate Handling

- `feedback/inbox/feedback 08-07-2026` is a duplicate raw feedback file of `feedback/inbox/feedback 08-07-2026.md`; keep one backlog item only and cite both paths where traceability matters.

## Phase 1 Impact

- Impacted: yes. This affects the approved Phase 1 requirement "Use compact cards with expanders as the default UX for step 2." Source: `feedback/decisions/approved-phase-1.md`.
- No impact on pricing formulas, ROI formulas, Odoo/API payload logic, country metadata, or product/repo naming.
- Suggested implementation decision before coding: either keep the two-column compact-card layout but make only the clicked card visually expand, or switch Step 2 to a single-column accordion/list where expansion cannot affect a neighbouring card.
