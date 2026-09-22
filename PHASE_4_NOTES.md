# Phase 4 — Backend + database + emails

## Completed

- Connected the Phase 3 Sign Up flow to `POST /api/signup`.
- Connected the Book Demo flow to `POST /api/demo`.
- Added PostgreSQL persistence with Prisma.
- Added separate website tables for onboarding/signup requests and demo requests.
- Added server-side Zod validation.
- Added API rate limiting, CORS and security headers.
- Added generic SMTP email support with Nodemailer.
- Sends a confirmation email to the visitor when SMTP is configured.
- Sends a sales/internal notification email when `ADMIN_NOTIFICATION_EMAIL` is configured.
- Added loading, submission-error and success states to the frontend.
- Success screens now show a request reference.
- Demo wording clearly treats the selected date/time as a preference until the team confirms it.
- Sign Up wording does not claim payment or CRM workspace activation has happened.

## Database safety

Use a **separate website PostgreSQL database** with `WEBSITE_DATABASE_URL`.
Do not point this Phase 4 Prisma schema at the existing CRM production database unless the schema is intentionally merged into the CRM Prisma schema first.

## New files

- `.env.example`
- `.gitignore`
- `prisma/schema.prisma`
- `server/db.js`
- `server/email.js`
- `server/index.js`
- `server/validation.js`
- `src/lib/api.js`

## Modified files

- `package.json`
- `vite.config.js`
- `src/components/ConversionFlows.jsx`

## Local setup

1. Copy `.env.example` to `.env` and add real values.
2. Run `npm install`.
3. Run `npm run db:push` once against the separate website database.
4. Terminal 1: `npm run server`
5. Terminal 2: `npm run dev`
6. Test Sign Up and Book Demo.

## Not included in Phase 4

- Payment gateway / subscription charge
- Automatic CRM tenant/workspace provisioning
- Login credentials generation
- Real calendar availability / automatic meeting creation

Those should only be activated after the production billing/onboarding flow is finalized.
