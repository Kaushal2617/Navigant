package com.navigant.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.navigant.dto.LeadCreateRequest;
import com.navigant.dto.LeadResponse;
import com.navigant.security.AdminUserDetails;
import com.navigant.service.LeadService;

import jakarta.validation.Valid;

/**
 * Controller for managing Leads (CRM Contacts).
 * <p>
 * Handles the lifecycle of potential client "leads" from initial public
 * submission
 * to admin management (viewing, status updates).
 * </p>
 */
@RestController
@RequestMapping("/api/v1")
public class LeadController {

	private final LeadService leadService;

	public LeadController(LeadService leadService) {
		this.leadService = leadService;
	}

	/**
	 * PUBLIC: Submits a new lead/contact request.
	 * <p>
	 * This endpoint is open to the public (e.g., from a "Contact Us" form on the
	 * website).
	 * It creates a new lead record with status "NEW" and notifies admins.
	 * </p>
	 * 
	 * @param request DTO containing contact details (name, email, phone, etc.).
	 * @return The created {@link LeadResponse} including generated ID.
	 */
	@PostMapping("/leads")
	@ResponseStatus(HttpStatus.CREATED)
	public LeadResponse createLead(@Valid @RequestBody LeadCreateRequest request) {
		return leadService.createLead(request);
	}

	/**
	 * ADMIN: Retrieves a paginated list of all leads.
	 * <p>
	 * Used for the main CRM dashboard/table view.
	 * </p>
	 * 
	 * @param pageable Pagination info (page, size, sort).
	 * @param admin    Authenticated admin user.
	 * @return Page of leads.
	 */
	@GetMapping("/admin/leads")
	public Page<LeadResponse> getAllLeads(Pageable pageable, @AuthenticationPrincipal AdminUserDetails admin) {
		return leadService.getAllLeads(pageable);
	}

	/**
	 * ADMIN: Exports all leads as CSV.
	 * 
	 * @param httpResponse Servlet response to write CSV to.
	 */
	@GetMapping("/admin/leads/export")
	public void exportLeads(jakarta.servlet.http.HttpServletResponse httpResponse) throws java.io.IOException {
		httpResponse.setContentType("text/csv");
		httpResponse.setHeader("Content-Disposition", "attachment; filename=\"leads.csv\"");
		leadService.exportLeadsToCsv(httpResponse.getWriter());
	}

	/**
	 * ADMIN: Retrieves details of a single lead by ID.
	 * 
	 * @param id    The Lead ID.
	 * @param admin Authenticated admin user.
	 * @return Full lead details.
	 */
	@GetMapping("/admin/leads/{id}")
	public LeadResponse getLeadById(@PathVariable String id, @AuthenticationPrincipal AdminUserDetails admin) {
		return leadService.getLeadById(id);
	}

	/**
	 * ADMIN: Updates the status of a lead.
	 * <p>
	 * Common transitions: NEW -> CONTACTED -> INTERESTED -> CONVERTED / CLOSED.
	 * </p>
	 * 
	 * @param id     The Lead ID.
	 * @param status New status string.
	 * @param admin  Authenticated admin user (recorded as the modifier).
	 * @return Updated lead.
	 */
	@PatchMapping("/admin/leads/{id}/status")
	public LeadResponse updateStatus(@PathVariable String id, @RequestParam String status,
			@AuthenticationPrincipal AdminUserDetails admin) {
		return leadService.updateStatus(id, status, admin.getAdmin().getId());
	}

	/**
	 * ADMIN: Updates internal comments/notes for a lead.
	 * 
	 * @param id      The Lead ID.
	 * @param admin   Authenticated admin user.
	 * @param payload JSON map containing "comments" key.
	 * @return Updated lead.
	 */
	@PatchMapping("/admin/leads/{id}/comments")
	public LeadResponse updateAdminComments(@PathVariable String id, @AuthenticationPrincipal AdminUserDetails admin,
			@RequestBody java.util.Map<String, String> payload) {
		return leadService.updateAdminComments(id, payload.get("comments"));
	}
}
