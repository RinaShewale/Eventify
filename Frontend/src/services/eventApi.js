import { apiRequest } from './api';

export const eventApi = {
  list: (token) => apiRequest('/events', { token }),
  get: (token, id) => apiRequest(`/events/${encodeURIComponent(id)}`, { token }),
  getChecklist: (token, id) => apiRequest(`/events/${encodeURIComponent(id)}/checklist`, { token }),
  updateChecklist: (token, id, checklist) => apiRequest(`/events/${encodeURIComponent(id)}/checklist`, {
    method: 'PUT',
    token,
    body: { checklist },
  }),
  create: (token, event) => apiRequest('/events', { method: 'POST', token, body: event }),
  update: (token, id, event) => apiRequest(`/events/${encodeURIComponent(id)}`, {
    method: 'PUT',
    token,
    body: event,
  }),
  remove: (token, id) => apiRequest(`/events/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    token,
  }),
};
