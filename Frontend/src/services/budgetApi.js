import { apiRequest } from './api';

export const budgetApi = {
  get: (token, eventId) => apiRequest(`/budgets/${encodeURIComponent(eventId)}`, { token }),
  create: (token, budget) => apiRequest('/budgets', { method: 'POST', token, body: budget }),
  update: (token, id, budget) => apiRequest(`/budgets/${encodeURIComponent(id)}`, {
    method: 'PUT',
    token,
    body: budget,
  }),
  remove: (token, id) => apiRequest(`/budgets/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    token,
  }),
};
