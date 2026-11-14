// Referral / campaign parameter preservation for auth links.
//
// The marketing site links out to the CRM-owned auth routes (`/login`,
// `/signup`, which Vercel rewrites to the CRM). When a visitor arrives with a
// referral or UTM campaign query string, we forward those parameters to the
// auth URL so the CRM can attribute the signup. Non-auth links are returned
// unchanged, and URLs with no relevant params keep their original form so no
// existing link is broken.

const PRESERVED_PARAMS = [
  "ref",
  "referral",
  "referral_code",
  "referralcode",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
];

function isAuthPath(href) {
  return (
    typeof href === "string" &&
    (href.startsWith("/login") || href.startsWith("/signup"))
  );
}

// The relevant referral/UTM params from the current URL, as a `?a=b` string
// (or "" when none are present). Safe to call during SSR / tests.
export function preservedQuery() {
  if (typeof window === "undefined" || !window.location?.search) return "";

  const current = new URLSearchParams(window.location.search);
  const forwarded = new URLSearchParams();

  for (const [key, value] of current.entries()) {
    if (value && PRESERVED_PARAMS.includes(key.toLowerCase())) {
      forwarded.append(key, value);
    }
  }

  const query = forwarded.toString();
  return query ? `?${query}` : "";
}

// Appends preserved referral/UTM params to an auth route. Any other href
// (hash links, mailto:, external URLs, /privacy, etc.) is returned untouched,
// as is an auth href that already carries its own query string.
export function authHref(href) {
  if (!isAuthPath(href) || href.includes("?")) return href;
  return `${href}${preservedQuery()}`;
}
