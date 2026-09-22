const baseUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

async function request(path, payload) {
  const response = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    const error = new Error(data.message || "We couldn't submit your request. Please try again.");
    error.status = response.status;
    error.fields = data.fields || {};
    throw error;
  }

  return data;
}

export function submitSignupRequest(payload) {
  return request("/api/signup", payload);
}

export function submitDemoRequest(payload) {
  return request("/api/demo", payload);
}
