/**
 * Testimonials API Functions
 * 
 * Functions to interact with the testimonials API.
 * These functions will be used by the Testimonials section and admin panel.
 */

import { apiGet, apiPost, apiPut, apiDelete, type ApiResponse } from './api';

// Testimonial interface matching TestimonialsCarouselSection
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  avatar?: string;
  rating: number; // Rating from 1 to 5
  order?: number; // For sorting/ordering testimonials
  isActive?: boolean;
  isFeatured?: boolean; // For featured testimonials
  createdAt?: string;
  updatedAt?: string;
}

// Get all testimonials
export const getTestimonials = async (): Promise<ApiResponse<Testimonial[]>> => {
  return apiGet<Testimonial[]>('/testimonials');
};

// Get active testimonials only
export const getActiveTestimonials = async (): Promise<ApiResponse<Testimonial[]>> => {
  return apiGet<Testimonial[]>('/testimonials?active=true');
};

// Get featured testimonials
export const getFeaturedTestimonials = async (): Promise<ApiResponse<Testimonial[]>> => {
  return apiGet<Testimonial[]>('/testimonials?featured=true');
};

// Get testimonial by ID
export const getTestimonialById = async (id: string): Promise<ApiResponse<Testimonial>> => {
  return apiGet<Testimonial>(`/testimonials/${id}`);
};

// Create a new testimonial (Admin only)
export const createTestimonial = async (
  testimonial: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ApiResponse<Testimonial>> => {
  return apiPost<Testimonial>('/testimonials', testimonial);
};

// Update a testimonial (Admin only)
export const updateTestimonial = async (
  id: string,
  testimonial: Partial<Testimonial>
): Promise<ApiResponse<Testimonial>> => {
  return apiPut<Testimonial>(`/testimonials/${id}`, testimonial);
};

// Delete a testimonial (Admin only)
export const deleteTestimonial = async (id: string): Promise<ApiResponse<void>> => {
  return apiDelete<void>(`/testimonials/${id}`);
};

// Reorder testimonials (Admin only)
export const reorderTestimonials = async (
  testimonialIds: string[]
): Promise<ApiResponse<Testimonial[]>> => {
  return apiPut<Testimonial[]>('/testimonials/reorder', { testimonialIds });
};

