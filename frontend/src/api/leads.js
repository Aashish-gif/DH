import { clearToken, getToken } from '../utils/auth';

const API_BASE = import.meta.env.VITE_API_URL || '';

async function request(path, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401) {
      clearToken();
    }
    const message =
      data.message ||
      data.errors?.[0]?.message ||
      `Request failed (${response.status})`;
    const error = new Error(message);
    error.status = response.status;
    error.errors = data.errors || [];
    throw error;
  }

  return data;
}

export function createLead(payload) {
  return request('/api/leads', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function fetchLeads(search = '') {
  const query = search.trim()
    ? `?search=${encodeURIComponent(search.trim())}`
    : '';
  return request(`/api/leads${query}`);
}

export function updateLeadStatus(id, status) {
  return request(`/api/leads/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export const BUDGET_RANGES = [
  'Under $1,000',
  '$1,000 - $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000+',
];

export const STATUS_OPTIONS = ['New', 'Contacted', 'Closed'];
