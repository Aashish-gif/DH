const API_BASE = import.meta.env.VITE_API_URL || '';

export async function login(email, password) {
  const response = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      data.message ||
      data.errors?.[0]?.message ||
      `Login failed (${response.status})`;
    throw new Error(message);
  }

  return data;
}
