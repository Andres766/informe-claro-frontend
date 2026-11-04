# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Patients in Colombia, of every age, who have just received a clinical laboratory report (PDF) and do
not understand its abbreviations, units and reference ranges. Many open it on a phone, some are older
adults or have little digital experience. Their job: understand what each value means in plain
Spanish, see which values fall outside the laboratory's range, and arrive at the follow-up
appointment with good questions for their doctor.

Secondary audience (confirmed context, not the design driver): the course professor evaluating the
project as a final academic deliverable.

## Product Purpose

InformeClaro translates a lab report into plain language. The patient uploads the PDF; the system
extracts each value, explains it against the reference range printed in the report, flags values
outside that range, and suggests questions for the next consultation. Success means the patient
understands their report and walks into the appointment prepared, calmer, and without having been
told what they "have".

## Positioning

The product explains without interpreting. It never diagnoses, never suggests causes, never
recommends treatment, medication or doses, and avoids alarm. The clinical decision stays 100% with
the doctor. Whether a value is in or out of range is decided deterministically by code comparing
numbers, not by the language model, so every flag is verifiable.

## Operating Context

- Flow: create account / sign in → upload PDF (drag and drop or file picker) → results (summary,
  each value with its range and explanation, suggested questions that can be copied) → personal
  history of past reports (open or delete).
- Every result screen carries the reminder that this is informative, not a diagnosis, and to consult
  the treating doctor.
- The PDF is processed in memory and never stored; personal data (name, ID number, email) is masked
  before the text reaches the language model.
- Backend: FastAPI on Render (free tier, can take ~50 s to wake up). Frontend: React + Vite on Vercel,
  installable as a basic PWA.

## Capabilities and Constraints

- Spanish (Colombia) only. Decimal values may use comma or point.
- Value states: `normal` (within range), `alto` (above), `bajo` (below), `sin_rango` (no range printed).
- Interpretation engine: Claude when an API key is configured; otherwise a rule-based "demo" engine.
  The UI shows which engine produced the result.
- Authentication with email and password (JWT); each user only sees their own history.
- No password recovery yet. No OCR: scanned PDFs without selectable text are rejected with an error.
- Free-tier backend cold start means first requests can be slow; loading states must hold up.

## Brand Commitments

- Name: **InformeClaro** (must be kept).
- Logo: the current mark in `public/favicon.svg` — a document with a folded corner and a pulse line
  (must be kept).
- Voice: warm, calm, plain Spanish, addressing the patient as "tú"; neutral wording for out-of-range
  values ("es un buen tema para conversar con tu médico"); never alarming words such as "grave",
  "peligroso" or "urgente".

## Evidence on Hand

- Sample reports with fictitious data: `informe_ejemplo.pdf` and `informe_ejemplo_2.pdf` in the
  backend repository (`samples/`).
- No real users, testimonials, partner laboratories, clinical endorsements or usage numbers exist;
  none may be invented.

## Product Principles

1. Explain, never diagnose: the doctor decides; the interface must never imply a verdict.
2. Calm over alarm: out-of-range values are a topic for the appointment, not an emergency.
3. Readable by anyone: legibility, plain words and obvious actions beat density and novelty.
4. Every flag is verifiable: show the value, the unit and the printed range next to any judgment.
5. Privacy is visible: tell the patient what is and is not kept.

## Accessibility & Inclusion

Older adults and low-literacy users are part of the core audience: large, high-contrast text,
generous touch targets, no meaning carried by color alone (states always have text labels), full
keyboard use, and layouts that work on small phones first.
