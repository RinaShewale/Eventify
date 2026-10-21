import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi';

const TOKEN_KEY = 'eventify_token';

export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;

    try {
      const response = await authApi.getMe(token);
      return { token, user: response.user };
    } catch (error) {
      if (error.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
      }
      return rejectWithValue(error.message);
    }
  },
);

export const completeGoogleLogin = createAsyncThunk(
  'auth/completeGoogleLogin',
  async (token, { rejectWithValue }) => {
    try {
      if (!token) throw new Error('Google sign-in did not return an access token.');
      const response = await authApi.getMe(token);
      localStorage.setItem(TOKEN_KEY, token);
      return { token, user: response.user };
    } catch (error) {
      localStorage.removeItem(TOKEN_KEY);
      return rejectWithValue(error.message);
    }
  },
);

export const signOut = createAsyncThunk('auth/signOut', async (_, { rejectWithValue }) => {
  const token = localStorage.getItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_KEY);
  if (!token) return;

  try {
    await authApi.logout(token);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    status: 'checking',
    error: null,
  },
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(restoreSession.pending, (state) => {
        state.status = 'checking';
        state.error = null;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.user = action.payload?.user ?? null;
        state.token = action.payload?.token ?? null;
        state.status = state.user ? 'authenticated' : 'unauthenticated';
      })
      .addCase(restoreSession.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.status = 'unauthenticated';
        state.error = action.payload || action.error.message;
      })
      .addCase(completeGoogleLogin.pending, (state) => {
        state.status = 'checking';
        state.error = null;
      })
      .addCase(completeGoogleLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = 'authenticated';
      })
      .addCase(completeGoogleLogin.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.status = 'unauthenticated';
        state.error = action.payload || action.error.message;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.status = 'unauthenticated';
        state.error = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.status = 'unauthenticated';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
