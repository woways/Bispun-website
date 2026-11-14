# Pending Dependency — Replace "My Store" Product Screenshots

**Status:** BLOCKED on updated CRM assets. No image changes made in this task.

## Why this is pending
"My Store" is being removed from customer-facing promotion. On the marketing site it does **not** appear in any copy/text — the only "store" references are the legitimate **Lead Store** module. However, **"My Store" is visible in the left-sidebar navigation of all three product screenshots** currently used on the site.

As of this task, **My Store has not yet been hidden in the CRM** (that is a separate `woways/bispun` task). Per instruction, we must use **genuine, verified** screenshots — no fabricated or manually altered images — so the swap waits until the updated CRM UI is implemented and verified, then real screenshots are captured from the correct environment.

## Affected files (exact)
| Screenshot | Path | Used by | Shows "My Store"? |
|---|---|---|---|
| Dashboard | `public/product-real/dashboard.png` | `src/components/Hero.jsx` ("Live CRM" preview, with animated metric overlays) | **Yes** (sidebar) |
| Analytics | `public/product-real/analytics.png` | `src/components/Showcase.jsx` via `src/data/site.js` → `showcase.items[1]` | **Yes** (sidebar) |
| Revenue | `public/product-real/revenue.png` | `src/components/Showcase.jsx` via `src/data/site.js` → `showcase.items[0]` | **Yes** (sidebar) |

> Note: the sidebar in these screenshots also shows **"My Referrals"** — that module is **not** being removed; only **My Store** must be gone from the replacement captures.

## What is needed to unblock
1. CRM UI with **My Store hidden** from the sidebar (and other nav entry points), verified in the target environment.
2. Freshly captured screenshots of **Dashboard**, **Analytics (Insights → Analytics)**, and **Revenue (Finance → Revenue)** from that CRM.

## Capture requirements (to keep the site pixel-faithful)
- **Same viewport/scale** as the current images so existing responsive cropping and the Hero's absolute-positioned metric overlays still line up. Current dimensions: match the existing `public/product-real/*.png` width/height (verify before replacing).
- The Hero dashboard overlay (`Hero.jsx`) positions animated numbers over the KPI cards using percentage coordinates (`.metric-total-leads`, `.metric-potential-revenue`, etc.). **The new dashboard screenshot must keep the same 8 KPI cards in the same grid positions**, or those overlay coordinates must be re-tuned.
- Keep PNG quality; optimize file size without visible artifacts.
- Neutral/empty-state data is fine (current screenshots use empty states).

## Replacement steps (when assets arrive)
1. Confirm new image dimensions match (or update `Hero.jsx` overlay coordinates if the dashboard layout shifted).
2. Replace the three files in `public/product-real/` (same filenames) so no code references change.
3. Verify in the browser: Hero overlay alignment, Showcase crop on desktop/tablet/mobile, and that **no "My Store"** appears in any screenshot.
4. Prioritize views that highlight Dashboard, Lead Management, Admissions, Analytics (already covered by Dashboard/Analytics/Revenue).

## Acceptance
- No "My Store" visible anywhere on the marketing site (copy or imagery).
- Lead Store, My Referrals, and all other modules/sections unaffected.
- Image quality, responsive cropping, and load performance preserved.
