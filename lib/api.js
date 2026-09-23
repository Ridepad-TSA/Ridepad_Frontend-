import axios from 'axios';
import { getSession } from 'next-auth/react';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 20_000,
  headers: { Accept: 'application/json' },
});

// getSession() hits /api/auth/session, so cache the token briefly to avoid a round trip per request.
const TOKEN_TTL_MS = 60_000;
let tokenCache = { value: null, expiresAt: 0, pending: null };

async function getAccessToken() {
  if (typeof window === 'undefined') return null;
  if (Date.now() < tokenCache.expiresAt) return tokenCache.value;
  if (!tokenCache.pending) {
    tokenCache.pending = getSession()
      .then((session) => {
        tokenCache = {
          value: session?.accessToken ?? null,
          expiresAt: Date.now() + TOKEN_TTL_MS,
          pending: null,
        };
        return tokenCache.value;
      })
      .catch(() => {
        tokenCache.pending = null;
        return null;
      });
  }
  return tokenCache.pending;
}

/** Drops the cached token. Call after sign in or sign out. */
export function clearAuthTokenCache() {
  tokenCache = { value: null, expiresAt: 0, pending: null };
}

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normaliseError(error)),
);

/**
 * Converts any request failure into { message, status, fieldErrors }.
 * fieldErrors maps field name to its first message, ready for react-hook-form setError.
 */
export function normaliseError(error) {
  if (error && error.__normalised) return error;

  const result = { message: 'Something went wrong. Please try again.', status: 0, fieldErrors: {} };

  if (axios.isCancel(error)) {
    result.message = 'Request cancelled.';
  } else if (error?.code === 'ECONNABORTED') {
    result.message = 'The request timed out. Check your connection and try again.';
  } else if (error?.response) {
    const { status, data } = error.response;
    result.status = status;
    result.fieldErrors = extractFieldErrors(data);
    result.message = extractMessage(data) || defaultMessageFor(status);
  } else if (error?.request) {
    result.message = 'Could not reach Ridepad. Check your connection and try again.';
  } else if (error?.message) {
    result.message = error.message;
  }

  Object.defineProperty(result, '__normalised', { value: true });
  return result;
}

function extractMessage(data) {
  if (!data) return '';
  if (typeof data === 'string') return data.length < 200 ? data : '';
  if (typeof data.message === 'string') return data.message;
  if (Array.isArray(data.message)) return data.message.join(', ');
  if (typeof data.error === 'string') return data.error;
  if (typeof data.error?.message === 'string') return data.error.message;
  return '';
}

// Accepts { errors: { field: msg | [msg] } } or { errors: [{ field|path|param, message|msg }] }.
function extractFieldErrors(data) {
  const errors = data?.errors ?? data?.fieldErrors ?? data?.error?.details;
  const out = {};
  if (!errors) return out;

  if (Array.isArray(errors)) {
    for (const item of errors) {
      const field =
        item?.field ??
        item?.param ??
        (Array.isArray(item?.path) ? item.path.join('.') : item?.path);
      const message = item?.message ?? item?.msg;
      if (field && message && !out[field]) out[field] = String(message);
    }
  } else if (typeof errors === 'object') {
    for (const [field, value] of Object.entries(errors)) {
      const message = Array.isArray(value) ? value[0] : value;
      if (message) out[field] = String(message);
    }
  }
  return out;
}

function defaultMessageFor(status) {
  if (status === 401) return 'Please sign in to continue.';
  if (status === 403) return 'You do not have access to this.';
  if (status === 404) return 'We could not find what you were looking for.';
  if (status === 409) return 'This conflicts with an existing record.';
  if (status === 422 || status === 400) return 'Please check the highlighted fields.';
  if (status === 429) return 'Too many requests. Please wait a moment.';
  if (status >= 500) return 'Ridepad is having trouble right now. Please try again shortly.';
  return 'Something went wrong. Please try again.';
}

export default api;
