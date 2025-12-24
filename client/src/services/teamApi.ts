/**
 * Team API Functions
 * 
 * Functions to interact with the team members API.
 * These functions will be used by the Team page and admin panel.
 */

import { apiGet, apiPost, apiPut, apiDelete, type ApiResponse } from './api';

// Team Member interface matching TeamMembersSection
export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  image: string;
  bio?: string;
  email?: string;
  linkedin?: string;
  alt?: string;
  order?: number; // For sorting/ordering team members
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Get all team members
export const getTeamMembers = async (): Promise<ApiResponse<TeamMember[]>> => {
  return apiGet<TeamMember[]>('/team/members');
};

// Get active team members only
export const getActiveTeamMembers = async (): Promise<ApiResponse<TeamMember[]>> => {
  return apiGet<TeamMember[]>('/team/members?active=true');
};

// Get team member by ID
export const getTeamMemberById = async (id: string): Promise<ApiResponse<TeamMember>> => {
  return apiGet<TeamMember>(`/team/members/${id}`);
};

// Create a new team member (Admin only)
export const createTeamMember = async (
  member: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ApiResponse<TeamMember>> => {
  return apiPost<TeamMember>('/team/members', member);
};

// Update a team member (Admin only)
export const updateTeamMember = async (
  id: string,
  member: Partial<TeamMember>
): Promise<ApiResponse<TeamMember>> => {
  return apiPut<TeamMember>(`/team/members/${id}`, member);
};

// Delete a team member (Admin only)
export const deleteTeamMember = async (id: string): Promise<ApiResponse<void>> => {
  return apiDelete<void>(`/team/members/${id}`);
};

// Reorder team members (Admin only)
export const reorderTeamMembers = async (
  memberIds: string[]
): Promise<ApiResponse<TeamMember[]>> => {
  return apiPut<TeamMember[]>('/team/members/reorder', { memberIds });
};

