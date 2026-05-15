# ResumeReady Australia

## Overview

ResumeReady Australia is a web-based resume builder and job search resource platform targeting Australian job seekers. The application allows users to create professional resumes and cover letters using 200+ templates, access employment resources, and purchase document credits through a Stripe-integrated payment system.

The platform follows a credit-based model where users purchase packs (single, 5-pack, or 10-pack) to download resumes and cover letters with time-limited editing access.

## User Preferences

Preferred communication style: Simple, everyday language.

## Portability Notice

This application has been made fully portable and can be hosted on any platform (not just Replit). To host externally (e.g., on resumeready.com.au), set the following environment variables:

### Required Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `SESSION_SECRET` | Secret key for session encryption |
| `STRIPE_SECRET_KEY` | Stripe API secret key |
| `STRIPE_PUBLISHABLE_KEY` | Stripe API publishable key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `RESEND_API_KEY` | Resend API key for sending emails |
| `RESEND_FROM_EMAIL` | Email address to send from (e.g., noreply@resumeready.com.au) |
| `BASE_URL` | Full URL of your site (e.g., https://resumeready.com.au) |

### Optional Environment Variables

| Variable | Description |
|----------|-------------|
| `NODE_ENV` | Set to "production" for production builds |
| `PORT` | Server port (default: 5000) |

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state, React Context for session management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **Build Tool**: Vite with path aliases (@/ for client/src, @shared/ for shared code)

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful endpoints under /api prefix
- **Authentication**: Email/password with bcrypt password hashing and PostgreSQL session storage
- **Session Management**: Express-session with connect-pg-simple for PostgreSQL storage

### Data Storage
- **Database**: PostgreSQL (any provider - Neon, Supabase, Railway, etc.)
- **ORM**: Drizzle ORM with Zod validation schemas
- **Schema Location**: shared/schema.ts (shared between client and server)
- **Tables**: users, sessions, purchases, documents

### Key Design Patterns
- **Monorepo Structure**: Client code in /client, server in /server, shared types in /shared
- **Dual Authentication**: Anonymous session-based users + optional email/password registration
- **Credit System**: Purchases grant resume/cover-letter credits with expiration dates
- **Document Storage**: Resume and cover letter content stored as JSON in PostgreSQL

### Resume Builder Features
- **Form Tabs**: Personal, Experience, Education, Skills, Certifications, Languages, Referees
- **Personal Info**: Name, email, phone, location, LinkedIn, portfolio URL, professional summary
- **Education**: Supports multiple education entries (array-based) with add/remove functionality
- **Certifications**: Optional array of certification name, issuer, and year
- **Languages**: Optional array of language and proficiency level
- **Referees**: Optional array with name, title, company, phone, and email
- **Templates**: 13 resume layouts, 6 cover letter layouts, 18 color themes each

### Payment Flow
- Anonymous users create sessions (stored in localStorage)
- Optional: Users can register with email/password to sync across devices
- Users select pricing tier and complete Stripe Checkout
- Webhook verifies payment and creates purchase record with credits
- Users consume credits when downloading documents

## External Dependencies

### Stripe Integration
- **Package**: Standard Stripe SDK (stripe)
- **Configuration**: Uses STRIPE_SECRET_KEY and STRIPE_PUBLISHABLE_KEY environment variables
- **Products**: Created in Stripe Dashboard (Single Resume uses prod_TbKJJeGdrFthyV)
- **Webhook**: Standard webhook at /api/stripe/webhook with STRIPE_WEBHOOK_SECRET

### Email (Resend)
- **Package**: resend
- **Configuration**: Uses RESEND_API_KEY environment variable
- **From Address**: Set via RESEND_FROM_EMAIL (default: noreply@resumeready.com.au)

### Database
- **Provider**: Any PostgreSQL provider
- **Connection**: DATABASE_URL environment variable
- **Migrations**: Drizzle Kit with "db:push" command

### UI Dependencies
- Radix UI primitives (dialog, dropdown, tabs, accordion, etc.)
- Lucide React icons
- date-fns for date formatting
- class-variance-authority for component variants
- embla-carousel-react for carousels
- bcryptjs for password hashing

### Development Tools
- esbuild for production server bundling
- TypeScript with strict mode enabled
