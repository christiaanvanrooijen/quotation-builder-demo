# PFM Digital Quote Builder

## Overview

The PFM Digital Quote Builder is an internal sales enablement application.

Its purpose is to guide a commercial conversation with a potential customer and end that conversation with an indicative proposal.

The application is not intended to replace commercial judgement.
It supports the salesperson throughout the sales process.

---

# Vision

The quote is the outcome.

The conversation comes first.

The application should help salespeople:

- ask better questions
- uncover customer pain points
- quantify business value
- recommend the right solution
- generate an indicative proposal

---

# Current Status

Current product milestone:
v0.2

Latest implementation:
Phase 1 – Sales feedback improvements

Build note: v41 is the demo/build note; v0.2 is the roadmap/product milestone.

Status:
🟢 Active development

---

# Core Principles

- Business value before pricing
- Conversation before configuration
- ROI before hardware
- Human review before proposal
- Odoo is the commercial source of truth
- AI supports the salesperson

---

# Technology

Frontend
- HTML
- JavaScript
- CSS

Host
- Streamlit

Configuration
- pricing-config.js

Main entry point

app.py

---

# Project Structure

```
app.py
index.html
pricing-config.js

feedback/
    inbox/
    triage/
    decisions/

docs/

ROADMAP.md
PRODUCT_PRINCIPLES.md
AGENTS.md
README.md
```

---

# Development Workflow

1. New feedback arrives
2. Store in `/feedback/inbox`
3. Codex analyses feedback
4. Feedback becomes backlog
5. Product decisions are approved
6. Implementation starts on feature branch
7. Local testing
8. Commit
9. GitHub
10. Release

---

# Feedback Workflow

Raw feedback

```
feedback/inbox
```

Processed feedback

```
feedback/triage
```

Approved decisions

```
feedback/decisions
```

---

# Roadmap

See:

ROADMAP.md

---

# Product Principles

See:

PRODUCT_PRINCIPLES.md

---

# AI Collaboration

Before implementing changes, AI assistants should read:

1. PRODUCT_PRINCIPLES.md
2. ROADMAP.md
3. feedback/decisions/
4. README.md

Raw feedback should never overrule approved product decisions.

---

# Running locally

Create virtual environment

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install

```bash
pip install -r requirements.txt
```

Run

```bash
python -m streamlit run app.py
```

---

# Branch Strategy

main

Production-ready version.

feature/*

Feature development.

release/*

Release preparation.

---

# Version History

| Version | Description |
|----------|-------------|
| v0.1 | Initial baseline |
| v0.2 | Sales feedback improvements |
