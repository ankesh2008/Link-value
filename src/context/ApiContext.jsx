import React, { createContext, useContext } from 'react';

const ApiContext = createContext(null);

async function apiRequest(path, options = {}) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || window.location.origin;
  const headers = new Headers(options.headers);
  headers.set('Accept', 'application/json');

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  let response;
  try {
    response = await fetch(new URL(path, baseUrl), { ...options, headers });
  } catch (error) {
    throw new Error('Could not reach the API. Check your connection and API configuration.');
  }

  const responseText = await response.text();
  let payload = null;
  if (responseText) {
    try {
      payload = JSON.parse(responseText);
    } catch {
      if (response.headers.get('content-type')?.includes('text/html')) {
        throw new Error('The API returned a web page instead of JSON. Check VITE_API_BASE_URL and the auth routes.');
      }
      payload = { message: responseText };
    }
  }

  if (!response.ok) {
    throw new Error(payload?.message || `Request failed (${response.status}).`);
  }

  return payload;
}

export function ApiProvider({ children }) {
  return (
    <ApiContext.Provider value={{ request: apiRequest }}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used inside ApiProvider.');
  }
  return context;
}
