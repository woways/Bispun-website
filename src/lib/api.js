const crmApiUrl = String(
  import.meta.env.VITE_CRM_API_URL ||
    (import.meta.env.DEV ? "http://localhost:4000" : "")
)
  .trim()
  .replace(/\/+$/, "");

async function crmRequest(path, payload, options = {}) {
  if (!crmApiUrl) {
    throw new Error(
      "CRM API is not configured. Add VITE_CRM_API_URL to the website environment variables."
    );
  }

  const response = await fetch(`${crmApiUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    keepalive: Boolean(options.keepalive),
  });

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    const error = new Error(
      data.message || "We couldn't save your details. Please try again."
    );
    error.status = response.status;
    error.fields = data.fields || {};
    throw error;
  }

  return data;
}

export function saveWebsiteLead(payload, options = {}) {
  return crmRequest("/api/public/website-leads", payload, options);
}