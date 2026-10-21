import { apiRequest } from './api';

export const vendorApi = {
  list: (token, eventId) => apiRequest(`/vendors/event/${encodeURIComponent(eventId)}`, { token }),
  get: (token, id) => apiRequest(`/vendors/${encodeURIComponent(id)}`, { token }),
  create: (token, vendor) => apiRequest('/vendors', { method: 'POST', token, body: vendor }),
  update: (token, id, vendor) => apiRequest(`/vendors/${encodeURIComponent(id)}`, {
    method: 'PUT',
    token,
    body: vendor,
  }),
  remove: (token, id) => apiRequest(`/vendors/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    token,
  }),
};
