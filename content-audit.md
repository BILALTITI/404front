# Content Audit — 4o4 Solutions Website

Generated 2026-07-19. Raw extraction of all user-facing content. Wording preserved exactly as shipped.

**Site shape:** single-page marketing site (Next.js App Router) served at `/en` and `/ar` (root `/` redirects via middleware). All section copy lives in `messages/en.json` / `messages/ar.json` (next-intl). Word counts below are for the English locale.

---

## Global metadata — all routes
**File:** src/app/layout.tsx, src/app/[locale]/layout.tsx, messages/en.json (`metadata`), src/components/JsonLd.tsx
**Purpose:** SEO/social metadata and Organization/WebSite structured data
**Word count:** 162 (metadata 132 + JSON-LD 30)

### Content
- Meta title (default): 4o4 — Software that ships, not promises | Web & mobile (Amman)
- Meta title template: %s | 4o4 Solutions
- Meta description: 4o4 is a software team in Amman building web apps, mobile apps, and workflow automation for serious founders in Jordan and the region. Clean code, clear timelines, no surprises.
- Meta keywords: software development, startups, custom web applications, mobile app development, MVP, web apps, Jordan software company, Amman developers, MENA tech, workflow automation, n8n, UI UX, cloud deployment, ASP.NET, React, React Native
- OG title: 4o4 — Your idea deserves software that actually works
- OG description: We build web apps, mobile apps, and automation for serious founders in Jordan and the region. Clear timelines, code that lasts, no black boxes.
- Twitter title: 4o4 — Software that ships, from Amman to the region
- Twitter description: Web apps, mobile apps, and automation — delivered on time and built to last.
- JSON-LD Organization description: Software development team in Amman, Jordan — building web apps, mobile apps, and workflow automation for serious founders in Jordan and the MENA region. Clean code, clear timelines, confident delivery.
- Root-layout fallback (pre-locale) OG title: 4o4 Solutions
- Root-layout fallback OG description: Professional software solutions
- Root-layout fallback OG image: /og-image.png (⚠ file does not exist — see Gaps)

---

## Navigation — /en (fixed header, all sections)
**File:** src/components/Navigation.tsx, src/components/LanguageSwitcher.tsx, messages/en.json (`nav`, `common`)
**Purpose:** primary navigation, brand, language switcher, header CTA
**Word count:** 15 (nav 12 + common 3)

### Content
- Brand: 4o4 (styled "4" / "o" / "4", hardcoded) + Solutions (`nav.brandSuffix`)
- Nav links: Work · About · Services · Process · Client Stories
- CTA button: Book a Call
- Language switcher labels: EN · عربي (hardcoded); accessible label: Language
- Accessible nav label: Primary navigation

---

## Hero — /en#hero
**File:** src/components/Hero.tsx, messages/en.json (`hero`)
**Purpose:** above-the-fold value proposition and primary conversion CTAs
**Word count:** 84 (i18n) + ~43 decorative (GhostCodeBackground, hardcoded)

### Content
- Overline: Ship · Complete · Deliver — from Amman this wron not amman we want genranl to be professbal
- H1 (line 1): Your idea, in software,
- H1 (line 2): not promises.
- Body: **4o4** — have an idea or project that deserves more than spreadsheets and workarounds? We build it with you: *web app, mobile app, or workflow automation* — production-ready, with clear timelines and no surprises. Serving serious founders in Jordan and the region.
- CTA button (primary): See what we've built
- CTA button (secondary): Explore our services
- CTA button (contact): Book a call — 30 minutes is enough
- Corner label (desktop only): 4o4 · Software that ships
- Background image alt: Warm gradient background behind the 4o4 hero section
- Decorative animated code lines (hardcoded English in src/components/GhostCodeBackground.tsx, shown on BOTH locales): initializing 4O4 systems... / building digital experiences... / deploying intelligent interfaces... / optimizing performance layer... / creative engine online / systems active / rendering future-ready solutions... / compiling innovation framework... / 4o4.solutions :: ready / establishing secure connections... / loading adaptive components... / synchronizing design protocols... / creative.engine = true; / await deploy('excellence'); / interface.render() → success

---

## Projects — /en#work
**File:** src/components/Projects.tsx, src/data/projects.ts, messages/en.json (`projects`)
**Purpose:** portfolio grid of shipped projects with detail modal
**Word count:** 444

### Content
- Eyebrow: Projects launched — not demos
- H2: Web & mobile apps / live in the market today
- Body: Over 20+ projects delivered to real founders in Jordan and the region — marketplaces, internal tools, mobile apps, and automation. All running in production today. Open a card for scope and outcome; live links open in a new tab. *(count interpolated from `common.countShipped` = "20+")*
- CTA buttons: View more · Show less · Start your project
- Modal labels: Key Result · Visit live site · How did we build this? · Close

**Project cards (title / subtitle / category / description / result / image alt):**

1. **Cashtics** — Freelance marketplace — Web application
   - A task marketplace connecting flexible workers with businesses posting short jobs — professional profiles, escrow-style payment flows, and an operator dashboard to review everything in one step.
   - Result: Growing user base with steady month-over-month task volume since launch
   - Alt: Cashtics freelance marketplace web app interface preview in 4o4 portfolio
   - Tags: Laravel, Vue.js, AWS · Year: 2025 · Link: https://cashtics.com/
2. **Sooquk** — Regional e-commerce — Marketplace platform
   - A Jordan-focused storefront for fashion and lifestyle sellers — organized catalog, stable checkout, practical vendor tools, and fast mobile performance tuned for where most of your customers shop.
   - Result: Active vendors and stable checkout running in production since launch
   - Alt: Sooquk e-commerce marketplace screenshot for Jordan retailers by 4o4
   - Tags: ASP.NET Core, Next.js, React Native · Year: 2025 · Link: https://sooquk.com/
3. **Okal for Heroes** — Kids barber booking — Booking system
   - Appointment booking and shop operations for a kids' barber brand — automated reminders, digital coupons, organized ticketing, and a parent-friendly mobile experience with no calls or back-and-forth.
   - Result: Strong early adoption from families in launch neighborhoods within weeks
   - Alt: Okal for Heroes booking experience designed by 4o4
   - Tags: ASP.NET MVC, UX design, Hosting · Year: 2026 · Link: https://okalforheroes.com/
4. **Breshta** — Loyalty & rewards — Engagement gamification
   - A loyalty system that brings customers back in a way that feels genuine — daily deals, birthday surprises, and light gamification that keeps them engaged. No brittle scripts, no offers that feel fake.
   - Result: Over 3,500 active users returning through loyalty loops
   - Alt: Breshta loyalty app screen from 4o4 client work
   - Tags: ASP.NET Core, React Native, Azure · Year: 2026 · No live link
5. **LastOneWin** — Live competition game — Real-time app
   - A real-time 'last finger on screen' competition — rooms, sessions, and resilient sync that handles traffic spikes during campaign windows without lag or crashes that ruin the experience.
   - Result: Over 3,000 live concurrent players at peak without a single failure
   - Alt: LastOneWin real-time mobile game promotional artwork in 4o4 portfolio
   - Tags: ASP.NET Core, React Native, Azure · Year: 2026 · No live link
6. **ILern** — Learning platform — EdTech
   - A full learning platform — structured courses, easy enrollment, instructor tools, and digital certificates. Clear roles for admins, teachers, and students, with data that's auditable at any time.
   - Result: Over 800 students learning on a single reliable consolidated stack
   - Alt: ILern LMS dashboard and course view built by 4o4
   - Tags: ASP.NET MVC, SQL Server, LMS · Year: 2025 · No live link
7. **Clinical desktop suite** — Full clinic management — Desktop application
   - Patient records, appointment scheduling, and a complete billing cycle for clinic teams — desktop-first interfaces, keyboard-optimized, where accuracy matters more than visual flair.
   - Result: Daily operations for over 1,000 patients on a single reliable database
   - Alt: Healthcare management desktop UI sample from 4o4 delivery work
   - Tags: .NET Framework, SQL Server, Healthcare · Year: 2025 · No live link

---

## About — /en#about
**File:** src/components/About.tsx, messages/en.json (`about`)
**Purpose:** positioning, team values, trust stats
**Word count:** 195 (i18n) + ~10 decorative (hardcoded terminal snippet)

### Content
- Background word (decorative): ABOUT
- Eyebrow: About 4o4
- H2: The team you wish / you'd built with / from day one / from Amman.
- Body (p1): A lot of teams have been burned before: a developer who promised then disappeared, or a big agency that took your budget and handed you a junior who rediscovers your project every week. We're not that. Since 2025, every project we build ships to production — clean code, timelines you can actually plan around, and communication that never goes dark.
- Body (p2): A small team means you talk to whoever is actually building, not a manager translating your words. Designer and engineer side by side — faster decisions, cleaner code. Browse [our shipped projects] or [tell us what you're building].
- Values:
  - 01 Clarity — Written scope before the first line of code — no 'we'll see' or fuzzy boundaries
  - 02 Craft — Code you can live with two years from now, not code that merely works
  - 03 Partnership — You're part of every decision, not discovering them on delivery day
  - 04 Momentum — We ship early because the market teaches you more than any meeting
- Stats: 20+ Projects shipped to production · 2025 Founded · Small Team — talk to who builds · MENA Primary region
- CTA button: Plan your project with 4o4
- Decorative terminal snippet (hardcoded, both locales): const fourOfour = { focus: "shipping", projects: "20+", since: 2025 } — plus floating badge: 4o4

---

## Services — /en#services
**File:** src/components/Services.tsx, messages/en.json (`services`)
**Purpose:** service offering cards and consultation CTA
**Word count:** 390

### Content
- Eyebrow: What we build with you
- H2: Web, mobile / & automation
- Body: From idea to launch — we build what you actually need, with no scope bloat and no invoice surprises. Every service comes with a clear timeline you can plan around.

**Service cards (title / subtitle / description / features):**

1. **Web development** — Custom web applications
   - Got a product living inside a spreadsheet or manual processes? We turn it into a web app that works, scales, and ships on time. From marketing sites to multi-tenant SaaS — APIs, permissions, and frontends that grow with you.
   - Features: SPA & SSR apps · E-commerce · REST / GraphQL APIs · CMS integration
2. **Mobile apps** — iOS, Android & cross-platform
   - Your users are on mobile — so your product needs to be there. We build native or cross-platform apps ready for the stores, with backend integration and authentication from day one.
   - Features: React Native · App Store releases · Push & offline · Secure APIs
3. **UI / UX design** — Interfaces that match how users think
   - You see the product before it's built — wireframes and UI your team reviews early. Fewer surprises at implementation, faster feedback loops. Design and engineering aligned from prototype to production.
   - Features: User flows · Wireframes · Design systems · Handoff to dev
4. **Brand & identity** — User trust starts before the first deploy
   - For startups, brand is what makes users trust you before they even try. We build a visual voice, core assets, and in-product patterns that stay consistent with every growth step.
   - Features: Visual direction · Logo & UI kit · Tone & messaging · Launch assets
5. **Cloud & DevOps** — Infrastructure that fits your stage now and grows with you
   - Deploy to AWS or Azure with environments, CI/CD, and monitoring right-sized for your current scale — no enterprise-sized clusters on day one, with real room to grow when traffic proves it.
   - Features: Hosting setup · CI/CD · Observability · Security basics
6. **Workflow automation (n8n)** — How many hours a day do you lose moving data manually?
   - We stop that waste — replacing manual handoffs between your CRM, sheets, and email with reliable n8n flows that are documented, testable, and fully owned by your team after delivery.
   - Features: n8n flows · Third-party APIs · Retries & alerts · Data sync

- Banner CTA title: Your project is too big to evaluate alone
- Banner CTA body: In 30 minutes we'll define scope, risks, and the first sensible milestone together. No commitment — and if we're not the right team, we'll tell you straight.
- CTA button: Book a call — 30 minutes

---

## Testimonials — /en#testimonials
**File:** src/components/Testimonials.tsx, messages/en.json (`testimonials`)
**Purpose:** social proof carousel with metrics
**Word count:** 374

### Content
- Eyebrow: Results — in the words of those who lived them
- H2: These people didn't pay / for promises
- Body: Founders, managers, and users who paid for real results — and the results speak for themselves.

**Quotes (quote / author, role, company / metric):**

1. "I posted my first task on Cashtics and had three offers within two hours. The platform is fast, easy to use, and the payment process felt secure. I've now completed over 40 tasks through it. Never expected this kind of traction so early." — Khaled Al-Rawi, Freelancer, Cashtics User — 40+ Tasks completed
2. "I opened my shop on Sooquk expecting maybe 20–30 visitors a month. Within the first few weeks I was getting hundreds of views. The site loads fast even on mobile, which makes a huge difference for my customers." — Rima Mansour, Vendor, Fashion Accessories — 3× Traffic increase
3. "Booking used to mean phone calls, back-and-forth, and sometimes showing up to a full shop. Now parents just pick a slot and get a reminder before the appointment. The coupon system was a nice touch — our regulars really appreciate it." — Khalil Okal, Owner, Okal for Heroes — 100+ Kids booked
4. "I open Breshta every morning just to spin the wheel. It sounds simple, but the birthday gift I got last month was a genuinely nice surprise. The deals feel real — not just filler. I've recommended it to at least 10 friends." — Sara Wahdan, Loyalty member, Breshta — 3,500+ Active users
5. "I was in a room with over 2,000 players and it didn't lag once. The tension of being one of the last five was actually thrilling. I've played a lot of live games — nothing handles concurrent players this smoothly." — Faris Nader, Player, LastOneWin — 3,000 Live concurrent players
6. "I finished my certification in six weeks completely online. The course material was well-organized, the instructor portal made it easy to track my progress, and I never ran into a bug or a broken link. That's rare for a platform this new." — Layla Hassan, Student, ILern — 800+ Students on the platform
7. "Before this system our team was juggling paper files and spreadsheets. Now every patient record is one search away, billing is automatic, and appointment conflicts are basically gone. Onboarding took less than a week." — Dr. Hani Zureikat, Clinic Director, Medical Care System — 1,000+ Patients managed daily

---

## Process — /en#process
**File:** src/components/Process.tsx, messages/en.json (`process`)
**Purpose:** delivery methodology timeline
**Word count:** 197

### Content
- Eyebrow: No black boxes — this is our process
- H2: From idea / to / production.
- Body: Four clear phases — every week you know where we are and what's next. Because missing communication is where most software problems actually start.
- Metrics: 4–12 Weeks to a complete MVP · Weekly Progress demos during development

**Steps (title / duration / description / deliverables):**

1. **Discovery** — 3–10 days
   - We align on goals, users, constraints, and success metrics before any code. We don't start until everyone is on the same page — because changing things on paper is far cheaper than changing them in code.
   - Deliverables: Problem brief · Scope & milestones · Risk notes
2. **Design** — 1–3 weeks
   - You see the product before it's built — wireframes and UI your team reviews early. Ideas change in Figma, not in production.
   - Deliverables: Flows & wireframes · UI screens · Clickable prototype
3. **Development** — 3–10 weeks
   - Iterative builds with tangible progress every week — APIs, frontends or apps, and automated checks. No 'everything is ready on delivery day'.
   - Deliverables: Sprint demos · Staging environment · Technical docs
4. **Launch** — 3–14 days
   - We launch with you, stabilize with you, and hand over ownership with full confidence — until your team runs the system without needing us for every small thing.
   - Deliverables: Release checklist · Production deploy · Handover session

---

## Contact — /en#contact
**File:** src/components/Contact.tsx, messages/en.json (`contact`)
**Purpose:** dual-tab lead form (message / call booking) with contact info
**Word count:** 261

### Content
- Eyebrow: Your idea deserves more than 'we'll be in touch'
- H2: Start your project / with a team that finishes
- Body: Share what's on your mind — an idea, a project, or a problem. We reply within 24 hours with clear next steps, not empty sales pitches. And if we're not the right team, we'll say so straight. Use the form for details or book a slot if you'd rather talk directly.
- Info rows: Email us directly → contact@4o4solutions.com (hardcoded) · Response time → 24 hours — even if the answer is no. · Call availability → Sun – Thu, 9 AM – 6 PM (AST)
- Tabs: Send project details · Book a call directly
- Form labels: Name · Email address · Phone number · What's this about? · What's the call about? · Project details or idea · Preferred date · Preferred time (AST)
- Placeholders: Full name · name@company.com · +962 79 123 4567 · Describe the idea or project — the goal, the audience, and your expected timeline...
- Select options: Select a topic · Starting a new project from scratch · Developing or rescuing an existing project · Continuing an existing project with us · Consultation — not sure where to start · Partnership or collaboration · Something else · Pick a time · 9:00 AM … 5:00 PM (hourly)
- CTA buttons: Send details · Book a call slot
- Success states: Message received! · Call booked!
- Loading states: Sending... · Booking...
- Error messages: Something went wrong — please try again or email us directly. · Submission failed — check your connection and try again.
- Footnotes: We'll reply within 24 hours with clear next steps. · Available Sun – Thu, 9 AM – 6 PM. We confirm within a few hours.

---

## Footer — /en (all pages)
**File:** src/components/Footer.tsx, messages/en.json (`footer`)
**Purpose:** brand recap, section links, legal line
**Word count:** 36

### Content
- Brand: 4o4 Solutions (hardcoded 4/o/4 + `common.brandSuffix`)
- Body: From Amman — for the founder who wants software that works, not promises. Web apps, mobile apps, and workflow automation.
- Location: Amman, Jordan
- Column heading: Explore
- Links: Work · About · Services · Process · Client Stories · Contact
- Legal: {year} 4o4 Solutions. All rights reserved.

---

## 404 — /* (unmatched routes)
**File:** src/app/not-found.tsx
**Purpose:** not-found fallback page
**Word count:** 21

### Content
- Eyebrow: 404
- H1: Page not found
- Body: The page you are looking for does not exist or has been moved.
- CTA button: Go to home (English)

---
---

# Findings

## 1. Languages & translation coverage

| Locale | File | Coverage |
|---|---|---|
| English (en) | messages/en.json | Complete — 100% of keys |
| Arabic (ar) | messages/ar.json | Complete — identical key structure, all namespaces translated (metadata, nav, hero, projects ×7, about, services ×6, testimonials ×7, process ×4, contact, footer, common) |

Arabic headline (H1): فكرتك برمجيات، / لا وعود. · Arabic meta title: 4o4 — برمجيات تُطلَق، لا تُوعَد | ويب وجوال (عمّان)

**Not translated (English-only, ships on the Arabic locale too):**
- 404 page (`src/app/not-found.tsx`) — entirely hardcoded English, links only to `/en`.
- Decorative animated code lines in `src/components/GhostCodeBackground.tsx` (15 English strings visible behind the Arabic hero).
- Decorative terminal snippet in `src/components/About.tsx` (`const fourOfour = …`) — arguably intentional (code aesthetic), rendered `dir="ltr"`.
- Root-layout fallback metadata ("Professional software solutions") — English only; normally overridden per locale.
- JSON-LD `knowsAbout` values in `src/components/JsonLd.tsx` (English in both locales; acceptable for schema.org but noting it).

## 2. Placeholder text still shipping

- No lorem ipsum, "Coming soon", "Your Company Name", or TODO strings found anywhere in `src/` or `messages/`.
- Form input placeholders (`Full name`, `name@company.com`, `+962 79 123 4567`) are intentional UI placeholders, not leftovers.
- Nearest concern: root-layout fallback OG description "Professional software solutions" is generic boilerplate that can surface on non-locale routes (e.g. the 404 page).

## 3. Duplicated / near-duplicated copy

- **Exact sentence duplicated:** "You see the product before it's built — wireframes and UI your team reviews early." appears verbatim in Services → UI/UX design description AND Process → Design step description (both locales).
- **"Book a call" family:** nav CTA "Book a Call" / hero "Book a call — 30 minutes is enough" / services button "Book a call — 30 minutes" / contact tab "Book a call directly" — intentional CTA repetition, but three different 30-minute phrasings.
- **Meta description vs JSON-LD org description:** near-identical ("software team in Amman building web apps, mobile apps, and workflow automation for serious founders…" vs "Software development team in Amman, Jordan — building web apps, mobile apps and workflow automation for serious founders…").
- **"serious founders in Jordan and the region"** appears 4×: meta description, OG description, hero body, JSON-LD.
- **"web apps, mobile apps, and (workflow) automation"** appears 5×: meta description, OG description, Twitter description, footer blurb, JSON-LD.
- **Metrics repeated between Projects results and Testimonials metrics:** 3,500+ active users (Breshta), 3,000 concurrent players (LastOneWin), 800+ students (ILern), 1,000+ patients (Clinical) each appear in both sections.
- **Footer links duplicate nav links** (expected pattern); `nav.brandSuffix` = `common.brandSuffix` = "Solutions" (two keys, same value).

## 4. Structural / SEO gaps

- **Missing OG image file:** `src/app/layout.tsx` references `/og-image.png`, but `public/` contains no such file (available: `404image.jpeg` + svg icons). The per-locale metadata defines **no OG image at all**, yet sets `twitter.card = "summary_large_image"` — social shares currently have no image.
- **404 page:** hardcoded English, no per-page metadata (no title/description of its own), links only to `/en` even for Arabic visitors.
- **siteUrl fallback:** metadata, canonical/hreflang, and JSON-LD all fall back to `http://localhost:3000` if `NEXT_PUBLIC_SITE_URL` is unset at build time — worth verifying in the deploy environment.
- **H1s:** exactly one H1 per locale page (hero) — correct. All other sections use H2/H3 — correct hierarchy. 404 page has a proper H1.
- **Alt text:** no empty `alt` found. Hero background and all 7 project images (card + modal) pull localized alt from i18n; decorative layers are `aria-hidden`.
- **Meta descriptions:** present for both locales on `/[locale]`; missing only on the 404 route.

## 5. Total word count per page/section (English)

| Section | Words |
|---|---|
| Global metadata + JSON-LD | 162 |
| Navigation (+ common) | 15 |
| Hero | 84 |
| Projects | 444 |
| About | 195 |
| Services | 390 |
| Testimonials | 374 |
| Process | 197 |
| Contact | 261 |
| Footer | 36 |
| **Home page total (i18n)** | **2,158** |
| 404 page (hardcoded) | 21 |
| Decorative hardcoded text (GhostCodeBackground + About snippet) | ~53 |
| **Grand total (English)** | **~2,232** |
