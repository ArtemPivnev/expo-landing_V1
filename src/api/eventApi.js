import { mockFetchEventData, mockSubmitRegistration } from './mockEventApi.js';

function joinUrl(base, path) {
  if (!base) return path;
  if (base.endsWith('/') && path.startsWith('/')) return base.slice(0, -1) + path;
  if (!base.endsWith('/') && !path.startsWith('/')) return base + '/' + path;
  return base + path;
}

export async function fetchEventData(config) {
  if (!config?.apiBaseUrl) {
    return mockFetchEventData(config);
  }

  const url = joinUrl(config.apiBaseUrl, config.endpoints.event(config.eventId));

  const res = await fetch(url, { method: 'GET' });
  if (!res.ok) throw new Error(`Event request failed: ${res.status}`);
  return res.json();
}

export async function submitRegistration({ apiBaseUrl, endpoints, eventId, payload }) {
  if (!apiBaseUrl) {
    return mockSubmitRegistration(payload);
  }

  const url = joinUrl(apiBaseUrl, endpoints.registration());
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, eventId }),
  });

  if (!res.ok) throw new Error(`Registration request failed: ${res.status}`);
  return res.json();
}

