package com.navigant.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.navigant.dto.LeadCreateRequest;
import com.navigant.dto.LeadResponse;

/**
 * Service Interface for Lead Management.
 * <p>
 * Defines business logic for validation, creation, retrieval, and updates of
 * leads.
 * </p>
 */
public interface LeadService {

	/**
	 * Creates a new lead from a public submission.
	 * 
	 * @param request DTO containing lead details.
	 * @return Created lead.
	 */
	LeadResponse createLead(LeadCreateRequest request);

	/**
	 * Retrieves a paginated list of all leads.
	 * 
	 * @param pageable Pagination configuration.
	 * @return Page of leads.
	 */
	Page<LeadResponse> getAllLeads(Pageable pageable);

	/**
	 * Exports all leads to the provided writer in CSV format.
	 * 
	 * @param writer Writer to output CSV data.
	 */
	void exportLeadsToCsv(java.io.Writer writer);

	/**
	 * Retrieves a single lead by ID.
	 * 
	 * @param id Lead ID.
	 * @return Lead details.
	 * @throws com.navigant.exception.ResourceNotFoundException if not found.
	 */
	LeadResponse getLeadById(String id);

	/**
	 * Updates the status of a lead.
	 * 
	 * @param id      Lead ID.
	 * @param status  New status value.
	 * @param adminId ID of the admin performing the update.
	 * @return Updated lead.
	 */
	LeadResponse updateStatus(String id, String status, String adminId);

	/**
	 * Updates admin comments for a lead.
	 * 
	 * @param id       Lead ID.
	 * @param comments New text content for comments.
	 * @return Updated lead.
	 */
	LeadResponse updateAdminComments(String id, String comments);

}
