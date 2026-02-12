/**
 * API Utility Functions
 * 
 * Centralized API service for making HTTP requests.
 * This can be easily configured to connect to your backend API.
 */

// API Base URL - Update this with your actual API endpoint
// In Vite, use import.meta.env instead of process.env
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Generic API request function with timeout and credentials
export const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  // Add 30-second timeout using AbortController
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      credentials: 'include', // CRITICAL: Include cookies for cross-origin requests
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    clearTimeout(timeoutId);
    console.error(`API Error (${endpoint}):`, error);

    // Better error messages
    let errorMessage = 'Unknown error occurred';
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        errorMessage = 'Request timeout - please check your connection';
      } else {
        errorMessage = error.message;
      }
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
};

// GET request
export const apiGet = <T>(endpoint: string): Promise<ApiResponse<T>> => {
  return apiRequest<T>(endpoint, {
    method: 'GET',
  });
};

// POST request
export const apiPost = <T>(
  endpoint: string,
  body: any
): Promise<ApiResponse<T>> => {
  return apiRequest<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

// PUT request
export const apiPut = <T>(
  endpoint: string,
  body: any
): Promise<ApiResponse<T>> => {
  return apiRequest<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
};

// DELETE request
export const apiDelete = <T>(endpoint: string): Promise<ApiResponse<T>> => {
  return apiRequest<T>(endpoint, {
    method: 'DELETE',
  });
};

// POST request with FormData (for file uploads)
export const apiPostFormData = async <T>(
  endpoint: string,
  formData: FormData
): Promise<ApiResponse<T>> => {
  // Add 60-second timeout for file uploads (longer than regular requests)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000);

  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
      credentials: 'include', // Include cookies for authenticated uploads
      // Don't set Content-Type header, let browser set it with boundary
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    clearTimeout(timeoutId);
    console.error(`API Error (${endpoint}):`, error);

    let errorMessage = 'Unknown error occurred';
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        errorMessage = 'Upload timeout - file may be too large or connection is slow';
      } else {
        errorMessage = error.message;
      }
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
};

