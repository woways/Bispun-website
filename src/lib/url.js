// Referral / campaign parameter preservation for auth links.
//
// The marketing site links out to the CRM-owned auth pages (login / signup).
// When a visitor arrives with a referral or UTM campaign query string, we
// forward those parameters to the auth URL so the CRM can attribute the signup.
// Works for both absolute (https://bispun.com/login) and relative (/login)
// hrefs. Non-auth links are returned unchanged, and URLs with no relevant
// params keep their original form so no existing link is broken.

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

function fallbackOrigin() {
  return typeof window !== "undefined" && window.location?.origin
    ? window.location.origin
    : "http://localhost";
}

// The pathname of an href, resolving relative URLs against the current origin.
function hrefPath(href) {
  if (typeof href !== "string") return null;
  try {
    return new URL(href, fallbackOrigin()).pathname;
  } catch {
    return null;
  }
}

function isAuthHref(href) {
  const path = hrefPath(href);
  return (
    !!path &&
    (path === "/login" ||
      path === "/signup" ||
      path.startsWith("/login/") ||
      path.startsWith("/signup/"))
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

// Appends preserved referral/UTM params to an auth URL (login/signup), absolute
// or relative. Any other href (hash links, mailto:, external URLs, /privacy,
// etc.) is returned untouched. Uses the correct `?`/`&` separator.
export function authHref(href) {
  const query = preservedQuery();
  if (!query || !isAuthHref(href)) return href;
  return href.includes("?") ? `${href}&${query.slice(1)}` : `${href}${query}`;
}
