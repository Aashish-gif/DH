const TOKEN_KEY = 'leaddesk_token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isTokenValid(token = getToken()) {
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (!payload.exp) return false;
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function isAuthenticated() {
  const token = getToken();
  if (!isTokenValid(token)) {
    if (token) clearToken();
    return false;
  }
  return true;
}
