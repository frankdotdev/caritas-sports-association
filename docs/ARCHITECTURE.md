# CARITAS SPORTS ASSOCIATION (CSA) — PLATFORM ARCHITECTURE SPECIFICATION

## 1. Executive Summary & Objective

The Caritas Sports Association platform is a multi-sport, progressive web application (PWA) designed to serve as the unified digital headquarters of collegiate athletics at Caritas University. While the Caritas Football Association (CFA) and its 2026 Caritas Football League act as the initial flagship tournament, the system is designed around a fully extensible, configuration-driven sports engine that powers football, basketball, volleyball, badminton, table tennis, athletics, and future sporting disciplines without requiring application rebuilds.

---

## 2. Design System Tokens & Aesthetic Principles

In accordance with the visual references:
- **Background:** `#11130F` (deep charcoal/dark olive)
- **Surface:** `#1D2019`
- **Elevated Surface:** `#292D24`
- **Primary Accent:** `#B8FF16` (electric lime highlights for live events and key actions)
- **Primary Text:** `#F5F6F0`
- **Secondary Text:** `#92978B`
- **Typography:** DM Sans (body) & Space Grotesk (editorial headings and display scores)
- **Icons:** Lucide icons throughout (no emojis, no gradients)
- **Mobile-First Experience:** Compact sticky header, bottom navigation bar, touch-friendly touch targets, and dismissible PWA install banner with iOS guidance.

---

## 3. Modular Monolith & Backend Portability Architecture

To ensure the platform can start on PostgreSQL/Supabase and seamlessly migrate to a standalone NestJS backend or self-hosted VPS, the architecture follows Domain-Driven Design (DDD) principles:

```
┌──────────────────────────────────────────────────────────┐
│                   NEXT.JS APP ROUTER                     │
│    (Public Pages, Match Centre, Transfer Desk, Admin)    │
└────────────────────────────┬─────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────┐
│                 APPLICATION SERVICES                     │
│  (SportsService, FixtureService, TransferWorkflowService)│
└────────────────────────────┬─────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────┐
│                 REPOSITORY INTERFACES                    │
│    (ISportRepository, ITeamRepository, IFixtureRepo, ...)│
└──────────────┬────────────────────────────┬──────────────┘
               │                            │
               ▼                            ▼
┌──────────────────────────────┐ ┌─────────────────────────┐
│     SUPABASE / PG ADAPTER    │ │   FUTURE NESTJS CLIENT  │
│ (Standard PostgreSQL Queries)│ │   (REST / WebSocket API)│
└──────────────┬───────────────┘ └──────────┬──────────────┘
               │                            │
               ▼                            ▼
┌──────────────────────────────────────────────────────────┐
│                NORMALIZED POSTGRESQL DB                  │
│       (Supabase, Neon, AWS RDS, Self-Hosted VPS)         │
└──────────────────────────────────────────────────────────┘
```

### Critical Rules Enforced:
1. **No direct Supabase queries scattered inside React components**: All UI components consume domain types and store hooks (`useSportsApp`), which communicate through well-defined service interfaces.
2. **Standard, Portable SQL**: The PostgreSQL migration (`database/migrations/0001_initial_schema.sql`) and seeds (`database/seeds/0001_seed_caritas_sports.sql`) use idempotent PostgreSQL standard syntax (`CREATE TABLE IF NOT EXISTS`, `ON CONFLICT DO NOTHING`) compatible with any PostgreSQL host.
3. **Domain Logic Isolation**: Transfer validation rules, scoring logic, and standing calculations reside in pure TypeScript modules independent of the database vendor.

---

## 4. Extensible Sports Engine

Rather than hardcoding football tables and match logic:
- Every sport is registered with a `participantType` (`team`, `individual`, `both`).
- Each sport configures its dedicated scoring model (`goals`, `points_quarters`, `sets_volleyball`, `sets_badminton`, `sets_table_tennis`, `time_distance`).
- Enabled feature flags determine whether the UI renders standings, knockout brackets, athlete rankings, squad rosters, or transfer windows.
- New sports can be registered from the `/admin` console with custom positions and scoring models, immediately integrating with fixtures and athlete profiles.

---

## 5. Flagship Caritas Football Association (CFA) Implementation

- **8 Official Clubs:**
  1. Trinity FC (Coach DC, Short: TRI, Blue)
  2. IEA FC (Coach Jk, Short: IEA, Orange)
  3. BEN FC (Coach 9zeros, Short: BEN, Green)
  4. Elite FC (Coach Chukwu, Short: ELT, Yellow)
  5. Jane FC (Coach Ak, Short: JAN, Red)
  6. CKC FC (Coach Chief001, Short: CKC, White)
  7. Remy FC (Coach +234 904 598 8152, Short: RMY, Slate)
  8. ARK FC (Coach CONFIDO, Short: ARK, Purple)

- **28 Official Fixtures:**
  Imported with original pairings and dates from November 1 to November 28, 2026 across 4 competition weeks. Past matches are recorded as completed without fabricated scores, and today's matches support live simulation.

- **Transfer Centre:**
  - Official Communiqué signed by CFA President Lukeeze Jesse and Asst President Dike Somtochukwu.
  - Over 100 verified incoming and outgoing player transfers imported across all 8 clubs.
  - Interactive transfer submission modal and administrative approval workflow.

- **Live Match Centre & TikTok LIVE:**
  - Route `/matches/[id]`
  - Provider-based streaming engine supporting TikTok LIVE (`@caritas_football`), YouTube Live, Facebook Live, and external RTMP streams.
  - Responsive fallback preview with direct "Watch in TikTok" button.
  - Real-time match event logging (Goals, Yellow/Red Cards, Substitutions) and live press commentary feed.

---

## 6. Centralized Athlete Identity & Privacy Compliance

- **Single Identity Across Multiple Sports:** A student (e.g. Modric playing Football and Table Tennis, or Haaland playing Football and Basketball) maintains a single identity record with multiple `AthleteSportProfile` entries.
- **Privacy Protection:** In compliance with student data protection standards, **birth year and full dates of birth are never exposed publicly**. Only Day and Month (e.g., "15 August") are rendered.
- **Search & Filter:** Search by name, nickname, department, study level (100L - 400L), wing, or position.

---

## 7. Role-Based Access Control (RBAC)

The system supports permission-driven management:
- **Super Admin:** Master platform configuration, audit logs, and data resets.
- **Association President (Lukeeze Jesse):** Executive declarations, official communiqués, and transfer approvals.
- **Sports Director (Dr. Anyanwu):** Multi-sport oversight and facility scheduling.
- **Sport Manager:** Assigned sport operations and bracket management.
- **Team Coach / Manager (e.g. Coach DC):** Team squad submissions and transfer requests.
- **Match Official / Referee:** Live score updates, card logging, and match reports.
- **Media Manager:** Announcement publishing and flyer/photo gallery curation.

---

## 8. Progressive Web App (PWA) & Offline Strategy

- **Manifest:** `/manifest.webmanifest` configured with standalone mode, portrait orientation, theme color `#11130F`, and vector SVG masking icons.
- **Service Worker:** `/sw.js` precaches the core application shell, with network-first fallback navigation for offline reliability.
- **Install Experience:** First-time dismissible banner with local storage remembrance, plus tailored modal instructions for iOS Safari users.
