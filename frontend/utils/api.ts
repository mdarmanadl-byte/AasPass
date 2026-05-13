// src/utils/api.ts

// Fallback gracefully to localhost if the env variable isn't loaded yet
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const API_ENDPOINTS = {
  // Products Endpoints
 createProduct: `${BASE_URL}/api/products`,
  deleteProduct: (id: string) => `${BASE_URL}/api/products/${id}`, // ADD THIS LINE
  getShopDetails: (city: string, slug: string) => `${BASE_URL}/api/shops/${city}/${slug}`,
  onboardVendor: `${BASE_URL}/api/vendors/onboard`,
};

/**
 * Custom Fetch Wrapper to simplify error handling, headers, and payloads across your app
 */
export async function apiFetch(url: string, options: RequestInit = {}) {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `HTTP error! Status: ${response.status}`);
  }

  return data;
}
