/**
 * Case Studies API Functions
 * 
 * Connects to Spring Boot backend for case studies.
 * PUBLIC: Published case studies
 */

import { apiGet, type ApiResponse } from './api';

/**
 * Case Study Response DTO
 * Matches server: com.navigant.dto.CaseStudyResponse
 */
export interface CaseStudy {
    id: string;
    title: string;
    description: string;
    fullContent?: string;
    image?: string;
    category: string;
    alt?: string;
    status: string;          // DRAFT, PUBLISHED, ARCHIVED
    order?: number;
    publishDate?: string;
    createdAt: string;
    updatedAt: string;
}

// ===== PUBLIC ENDPOINTS =====

/**
 * Get all published case studies (public)
 * GET /api/v1/case-studies
 */
export const getPublishedCaseStudies = async (): Promise<ApiResponse<CaseStudy[]>> => {
    return apiGet<CaseStudy[]>('/case-studies');
};

/**
 * Get a single published case study by ID (public)
 * GET /api/v1/case-studies/{id}
 */
export const getCaseStudyById = async (id: string): Promise<ApiResponse<CaseStudy>> => {
    return apiGet<CaseStudy>(`/case-studies/${id}`);
};
