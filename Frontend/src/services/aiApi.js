import { apiRequest } from './api';

export const aiApi = {
  generatePlan: (token, request) => apiRequest('/ai/generate', {
    method: 'POST',
    token,
    body: request,
  }),
};
