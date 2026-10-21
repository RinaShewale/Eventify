import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authApi } from '../services/authApi';
import { clearAuthError, completeGoogleLogin, restoreSession, signOut } from '../redux/authSlice';

export default function useAuth() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return {
    ...auth,
    clearError: useCallback(() => dispatch(clearAuthError()), [dispatch]),
    completeGoogleLogin: useCallback(
      (token) => dispatch(completeGoogleLogin(token)),
      [dispatch],
    ),
    restoreSession: useCallback(() => dispatch(restoreSession()), [dispatch]),
    signOut: useCallback(() => dispatch(signOut()), [dispatch]),
    startGoogleLogin: useCallback(
      () => window.location.assign(authApi.getGoogleLoginUrl()),
      [],
    ),
  };
}
