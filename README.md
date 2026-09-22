# Bispun — CRM Marketing Website

Marketing website for **Bispun CRM**, built with **Vite + React + Tailwind CSS**. Phase 4 adds a Node/Express API, PostgreSQL/Prisma storage and SMTP email notifications for Sign Up and Book Demo requests.

## Phase 4 architecture

- Frontend: Vite + React + Tailwind
- API: Node + Express
- Database: PostgreSQL + Prisma
- Email: Nodemailer through your SMTP provider
- Frontend forms: `src/components/ConversionFlows.jsx`
- API client: `src/lib/api.js`
- API server: `server/index.js`

## Important database rule

Create a **separate PostgreSQL database for the marketing website** and put its URL in `WEBSITE_DATABASE_URL`.

Do **not** point this standalone Prisma schema at the current CRM production database. If you later want both systems in one database, merge these models into the CRM's complete Prisma schema first.

## Local setup

Copy the example environment file:

```bash
cp .env.example .env
```

Fill in your PostgreSQL and SMTP values, then run:

```bash
npm install
npm run db:push
```

Run the backend in terminal 1:

```bash
npm run server
```

Run the website in terminal 2:

```bash
npm run dev
```

The Vite development server proxies `/api` to `http://localhost:4001`.

## API routes

- `GET /api/health` — API/database health check
- `POST /api/signup` — stores an onboarding/signup request and triggers emails
- `POST /api/demo` — stores a preferred demo request and triggers emails

## Production environment variables

Backend:

- `WEBSITE_DATABASE_URL`
- `PORT`
- `NODE_ENV=production`
- `CORS_ORIGIN=https://your-website-domain.com`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `EMAIL_FROM_NAME`
- `EMAIL_FROM_ADDRESS`
- `ADMIN_NOTIFICATION_EMAIL`

Frontend:

- `VITE_API_BASE_URL=https://your-api-domain.com`

Never commit the real `.env` file. `.gitignore` already excludes it.

## Production deployment pattern

A simple setup is:

- Deploy the Vite frontend to Vercel.
- Deploy the Express API to Render (or another Node host).
- Use a separate hosted PostgreSQL database.
- Set the backend `CORS_ORIGIN` to the real website URL.
- Set Vercel `VITE_API_BASE_URL` to the deployed API URL and rebuild the frontend.

For the Node backend, use `npm install` as the install/build step and `npm start` as the start command. Run `npm run db:push` once after the database is created.

## What Phase 4 does not do

Submitting Sign Up does **not** take payment or create a CRM tenant yet. Booking a demo does **not** reserve a live calendar slot yet. The requests are stored and emailed so your team can follow up accurately. Payment, automatic tenant provisioning and live calendar booking can be integrated after those production flows are finalized.
