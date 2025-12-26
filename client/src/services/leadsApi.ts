/**
 * Leads API Functions
 * 
 * Connects to Spring Boot backend for lead/contact form submissions.
 * These are PUBLIC endpoints - no authentication required.
 */

import { apiPost, type ApiResponse } from './api';

/**
 * Lead Create Request DTO
 * Matches server: com.navigant.dto.LeadCreateRequest
 */
export interface LeadCreateRequest {
    fullName: string;      // Required - @NotBlank
    email: string;         // Required - @Email
    phone: string;         // Required - @NotBlank
    serviceType: string;   // Required - @NotBlank
    numberOfSeats: number; // Required - @NotNull
    remarks?: string;      // Optional
}

/**
 * Lead Response DTO
 * Matches server: com.navigant.dto.LeadResponse
 */
export interface LeadResponse {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    serviceType: string;
    numberOfSeats: number;
    remarks?: string;
    adminComments?: string;
    status: string;
    reviewedBy?: string;
    createdAt: string; // ISO DateTime
    updatedAt: string;
}

/**
 * PUBLIC: Submit a new contact/lead
 * Endpoint: POST /api/v1/leads
 * 
 * @param lead - Lead data matching LeadCreateRequest
 * @returns ApiResponse with created LeadResponse
 */
export const submitLead = async (
    lead: LeadCreateRequest
): Promise<ApiResponse<LeadResponse>> => {
    return apiPost<LeadResponse>('/leads', lead);
};
