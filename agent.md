# TaxiRadar24 – AI Development Instructions

This document defines the development rules, architecture principles and coding standards for the TaxiRadar24 project.

Any AI agent working in this repository must follow these rules strictly.

---

# PROJECT OVERVIEW

TaxiRadar24 is a professional platform for taxi drivers and taxi license students in Palma de Mallorca.

The project contains two main areas:

1. TaxiRadar24 Academy
2. TaxiRadar24 Tools for Drivers

The platform provides:

* Taxi exam preparation
* Street knowledge training (Callejero Palma)
* Interactive exams and progress tracking
* Flight arrival radar
* Professional tools for taxi drivers

---

# TECHNOLOGY STACK

Frontend

* React
* React Router v6
* Styled Components
* Webpack
* JavaScript (NO TypeScript)

Backend / Services

* Firebase Authentication
* Firebase Firestore
* Cloudflare Workers API
* Cloudflare D1 database
* Stripe subscriptions

Infrastructure

* Cloudflare
* Hostinger (static hosting)
* GitHub repository

---

# IMPORTANT DEVELOPMENT RULES

AI must ALWAYS follow these rules.

1. NEVER break existing navigation logic.
2. NEVER remove imports that are part of the architecture.
3. NEVER change route structures unless explicitly requested.
4. ALWAYS respect the existing component hierarchy.
5. ALWAYS maintain compatibility with Firebase authentication.
6. ALWAYS respect Stripe subscription logic.
7. NEVER introduce TypeScript.

If modifying a file:

* preserve the current logic
* extend instead of replacing
* avoid unnecessary refactors

---

# RESPONSE FORMAT (VERY IMPORTANT)

When returning code:

AI MUST return **complete files ready to copy-paste**.

Do NOT return partial snippets unless explicitly requested.

Always include:

* full file content
* imports
* exports
* components
* styles
* hooks

Avoid explanations unless the user asks for them.

---

# STYLING SYSTEM

The project uses:

Styled Components

All UI components must use styled-components.

DO NOT use:

* inline styles
* CSS modules
* Tailwind

Design tokens come from:

theme.js

Example:

color: ${({ theme }) => theme.pro.text}

Always respect the theme system.

---

# PROJECT STRUCTURE

Typical structure:

src/

components/
hooks/
services/
navigator/
pages/
styles/

Examples:

src/components
src/hooks
src/services
src/navigator
src/pages

---

# NAVIGATION SYSTEM

Navigation is centralized using:

SmartNavigation utility

File example:

utils/SmartNavigation.js

Rules:

Never bypass SmartNavigation when navigating between major sections.

Routes must stay consistent with:

/academia
/academia/demo
/academia/pro
/tools
/perfil

---

# AUTHENTICATION SYSTEM

Authentication is handled by Firebase.

Providers:

* Email/password
* Google login
* Phone verification (SMS)

User identity must support:

emailVerified
phoneVerified

Firestore stores additional user data.

Never break authentication flow.

---

# SUBSCRIPTION SYSTEM

The Academy PRO version uses Stripe subscriptions.

Stripe logic:

Frontend
createCheckoutSession()

Backend
Cloudflare Worker

Database
Cloudflare D1 table

academy_subscriptions

Fields include:

uid
plan
status
expires_at

The system checks subscription status before allowing access to PRO routes.

---

# ACCESS CONTROL

Route protection must respect:

RequirePlan logic.

Example:

if plan = ACADEMIA_PRO
and subscription status = active

Allow access to:

/academia/pro

Otherwise redirect to:

/academia/upgrade

---

# DATA SOURCES

The platform integrates external APIs including:

OpenSky API (flight data)

Data is processed and filtered before displaying in the UI.

Never expose API secrets.

---

# PERFORMANCE RULES

Avoid:

large bundle sizes
duplicated components
unnecessary re-renders

Prefer:

lazy loading
modular components
clean imports

---

# CODE STYLE

Follow these guidelines:

* clear naming
* functional components
* React hooks
* minimal complexity
* readable structure

Prefer simple and maintainable code.

---

# UI / UX PRINCIPLES

TaxiRadar24 aims to provide a professional SaaS-level experience.

Design inspiration:

Binance
Notion
Stripe
modern SaaS dashboards

UI must be:

clean
professional
consistent

---

# IMPORTANT WARNING

AI must NOT:

rewrite the architecture
remove Stripe integration
remove Firebase logic
replace styled-components
break navigation structure

If unsure, ask before modifying architecture.

---

# FINAL PRINCIPLE

TaxiRadar24 prioritizes:

stability
scalability
professional quality

All code must respect these goals.
