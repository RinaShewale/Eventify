import { apiRequest, getApiUrl } from './api';

export const authApi = {
  getGoogleLoginUrl: () => getApiUrl('/auth/google'),
  getMe: (token) => apiRequest('/auth/me', { token }),
  logout: (token) => apiRequest('/auth/logout', { method: 'POST', token }),
};
