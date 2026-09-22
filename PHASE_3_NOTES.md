# Phase 3 — Sign Up + Book Demo frontend

## Completed

- Added a responsive multi-step Sign Up flow.
- Added company details, business needs, team size and lead-volume steps.
- Added Basic / Pro / Advanced plan recommendation logic based on selected needs.
- Pricing plan buttons now open Sign Up with the clicked plan preselected.
- Added a responsive multi-step Book a Demo flow.
- Added preferred date/time selection and demo-focus notes.
- Navbar, hero, pricing, CTA and footer links now open the correct frontend flows.
- Added field validation and success/summary states.
- Temporary Phase 3 form values are stored only in `sessionStorage` for frontend testing.
- No backend request, database write, payment, calendar booking or email is performed yet.

## Files changed

- `src/App.jsx`
- `src/components/CTA.jsx`
- `src/components/Pricing.jsx`
- `src/data/site.js`

## New file

- `src/components/ConversionFlows.jsx`

## Phase 4

Connect these frontend flows to backend APIs, database storage, account provisioning and confirmation emails/calendar logic.
