const defaultApiBaseUrl = import.meta.env.DEV ? 'https://eventify-cq56.onrender.com/api' : '/api';
const apiBaseUrl = (import.meta.env.VITE_API_URL || defaultApiBaseUrl).replace(/\/$/, '');

export function getApiUrl(path = '') {
  return `${apiBaseUrl}${path}`;
}

export async function apiRequest(path, options = {}) {
  const { token, body, headers, ...requestOptions } = options;
  const response = await fetch(getApiUrl(path), {
    ...requestOptions,
    headers: {
      ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });

  const responseText = await response.text();
  let result = {};
  if (responseText) {
    try {
      result = JSON.parse(responseText);
    } catch {
      throw new Error('The server returned an invalid response.');
    }
  }

  if (!response.ok || result.success === false) {
    const error = new Error(result.message || `Request failed (${response.status}).`);
    error.status = response.status;
    throw error;
  }

  return result;
}
