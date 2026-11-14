# CRM Auth Redesign Spec — Login & Signup (Guided Experience)

**Status:** Specification only. **Target repo:** `woways/bispun` (the CRM). **Not** implemented here.
**Owner of these pages:** the CRM app served at `https://consulbuzz.vercel.app` (`/login`, `/signup`).
**This document is produced by the marketing-website task (`woways/Bispun-website`) as a handoff.**

> Hard constraints (from the brief):
> - Do **not** invent a new backend workflow. Preserve existing registration APIs, validation, OTP verification, referral handling, plan selection, account creation, pricing/GST, and the Razorpay payment flow **exactly**.
> - Do **not** change authentication, tenant isolation, roles, permissions, or session management.
> - Do **not** change pricing, payment processing, or plan eligibility.
> - This is a **UX/presentation** redesign of two existing pages, not a logic change.
> - Marketing website and CRM are separate projects — implement this in the CRM repo only.

---

## 1. Current state (verified from the live pages)

### 1.1 `/login`
Fields and elements observed:
- "Welcome back!" / "Sign in to your Bispun workspace"
- **Work Email**
- **Password**
- **Remember me** (checkbox)
- **Forgot password?** (link)
- **Sign in** (submit)
- "Secure workspace access" / "Need help? Contact support"
- **No "create an account" link is present.** ← must be added (see §3.1).

### 1.2 `/signup`
A single long page that already contains the complete onboarding + payment flow:

- **Company Details:** Company Name*, Brand / Portal Name, Business Type*, Owner Name*, Company Email* (+ **Get OTP**), Phone* (+ **Get OTP**), City
- **Choose Your Plan:** Basic (₹27,000/yr), Pro (₹54,000/yr, discounted display), Advanced (₹81,000/yr) — each **+ 18% GST**
- **Your Admin Login:** Admin Name*, Admin Email* (+ **Get OTP**), Password*
- **Referral Code (optional)**
- **Price summary:** Plan price, GST (18%), Total payable
- **Pay ₹… (Razorpay)** — "Verify company email, phone number and admin email before payment." / "Secured by Razorpay · UPI, cards, net-banking"

The user feedback: this single-page presentation is overwhelming for first-time users. Redesign it into a **guided, multi-step** experience **without changing any field, validation rule, OTP step, plan logic, or the payment call.**

---

## 2. Design goals (both pages)

Modern, professional, trustworthy, premium, fast, simple. Consistent Bispun branding. Mobile-first and accessible (WCAG 2.1 AA): labelled inputs, logical focus order, keyboard operability, visible focus, understandable inline errors, adequate color contrast and target sizes. No distracting animation — only subtle, fast transitions.

---

## 3. Login redesign (`/login`)

### 3.1 Required additions
- Add a **clearly visible new-customer link**: **"New to Bispun? Create an account"** → `/signup` (preserve any incoming referral/UTM query string on this link — see §5).
- Keep **Forgot password?** exactly as-is (same route/behavior).
- Keep **Remember me** behavior and session handling unchanged.

### 3.2 Layout
- Centered single card on a branded split/!hero background (reuse the dark brand panel style used elsewhere, e.g. the marketing demo modal's left rail: logo, short reassurance copy, trust line "Secure workspace access").
- Order: Work Email → Password (with a **show/hide password** toggle) → row with **Remember me** (left) and **Forgot password?** (right) → **Sign in** (full-width primary) → divider → **"New to Bispun? Create an account"**.
- Inline validation with understandable errors; never expose credentials in logs or URLs.
- Preserve existing error states and the existing authentication request unchanged.

### 3.3 Accessibility
- Each input has a programmatically associated `<label>`.
- Password toggle is a real `<button type="button">` with an accessible name that reflects state ("Show password" / "Hide password") and `aria-pressed`.
- Submit disabled state communicated non-visually; error summary announced (`aria-live="polite"`).
- Visible focus ring on all controls.

---

## 4. Signup redesign (`/signup`) — guided multi-step

Same fields, same order of data capture, same validation, same OTP gating, same plan logic, **same final Razorpay call**. Only the *presentation* becomes stepped.

### 4.1 Proposed step grouping (4 steps)
Because the real flow has company + admin + plan + payment, a 4-step flow is the honest mapping (the brief's 1/2/3 "Details / Organization / Secure account" is a suggestion; adapt to the real backend contract):

- **Step 1 — Your Organization:** Company Name*, Brand / Portal Name, Business Type*, Owner Name*, City
- **Step 2 — Verify Contacts:** Company Email* (+ Get OTP → verify), Phone* (+ Get OTP → verify). Show per-field "verified" state. Block advancing until required verifications pass (mirror current rule: company email + phone must be verified before payment).
- **Step 3 — Admin Login:** Admin Name*, Admin Email* (+ Get OTP → verify), Password* (with show/hide; add Confirm password **only if** the current backend already expects it — do not add a new field otherwise), Referral Code (optional).
- **Step 4 — Choose Plan & Pay:** plan selection (Basic/Pro/Advanced), live price summary (plan price, GST 18%, total payable), **Pay via Razorpay**. Keep the existing pre-payment verification guard.

> If moving a field between steps would change what the backend receives at submit time, **keep the field but submit the same payload at the same final step** — the stepper is a UI wrapper over the existing single submit/payment call.

### 4.2 Required UX behaviors
- **1/2/3/4 progress indicator** with step labels and current/done states.
- **Back / Continue** navigation; **preserve all entered data when navigating backward** (and forward again).
- Inline, per-field validation; a clear error summary per step.
- **Password visibility** toggle; never place password/tokens/OTP in the URL or logs.
- **Prevent duplicate submissions:** disable Pay/Continue while a request is in flight; guard against double-charge (idempotent submit, button lock, and reuse of any existing order/idempotency key).
- Handle **slow networks and API errors** gracefully (retry affordance, preserved state, no silent failure).
- Keep the **referral code** field, and **pre-fill it from the incoming referral query param** if present (see §5) while leaving it editable.
- Keep plan selection reflecting live pricing/offer exactly as today.

### 4.3 Accessibility
- Each step is a labelled region; moving to a step moves focus to its heading (`tabindex="-1"` + focus) and announces the step.
- OTP inputs have clear labels and describe the sent destination; "Get OTP" / "Verify" are real buttons with state feedback via `aria-live`.
- Progress indicator exposes current step to assistive tech (e.g. `aria-current="step"`).
- All interactive targets meet AA size/spacing; visible focus throughout; full keyboard operability.

---

## 5. Referral / campaign parameter preservation (cross-repo contract)

The **marketing site** now forwards referral/UTM params to `/login` and `/signup` (implemented in `woways/Bispun-website` via `src/lib/url.js`). Forwarded keys:
`ref, referral, referral_code, referralcode, utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, fbclid`.

**CRM-side requirement:** read the referral param from the signup URL query string and **pre-fill the "Referral Code" field** (editable), preserving it through all steps and submitting it with the existing payload. Do not break existing bare URLs (no param → current behavior unchanged). Decide the canonical referral key with the marketing side (recommend `ref`) and keep both in sync.

---

## 6. Explicitly out of scope (do not touch)
- Authentication logic, tenant isolation, roles, permissions, sessions.
- Pricing, GST calculation, plan eligibility, Razorpay integration/keys.
- OTP generation/verification backend.
- Account-creation/database logic.
- Coupon codes (a separate task will define these later — **do not implement now**).
- The marketing website repo.

---

## 7. Acceptance criteria
- Existing users log in with current credentials and reach the correct portal (unchanged behavior).
- Forgot Password flow unchanged and reachable.
- Login page shows a visible "New to Bispun? Create an account" link to `/signup`.
- Signup is a guided multi-step flow with a 1/2/3/4 indicator, Back/Continue, and preserved data on navigation.
- All existing signup fields, validations, OTP verifications, plan selection, pricing/GST, referral handling, and the Razorpay payment succeed exactly as before.
- Referral code pre-fills from the URL and is submitted.
- No duplicate account/payment submissions under double-click or slow network.
- No passwords/tokens/OTP in logs or URLs.
- Responsive on desktop/tablet/mobile; WCAG 2.1 AA for the redesigned pages.
- Production safety: inspect latest remote main, implement/test in dev, confirm deployment branch, and report local vs GitHub vs production status separately. No push/merge/deploy without approval.
