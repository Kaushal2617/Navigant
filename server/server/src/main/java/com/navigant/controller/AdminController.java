package com.navigant.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.navigant.dto.AdminCreateRequest;
import com.navigant.dto.AdminResponse;
import com.navigant.dto.AdminUpdateRequest;
import com.navigant.security.AdminUserDetails;
import com.navigant.service.AdminService;

import jakarta.validation.Valid;

/**
 * Controller for managing Admin Accounts.
 * <p>
 * This controller handles the lifecycle of administrative users.
 * Security is strict here:
 * 1. <b>SUPER_ADMIN</b>: Can create, update, and delete any admin (except
 * themselves).
 * 2. <b>ADMIN</b>: Can only view other admins and update their own profile.
 * </p>
 */
@RestController
@RequestMapping("/api/v1/admins")
public class AdminController {

	private final AdminService adminService;

	public AdminController(AdminService adminService) {
		this.adminService = adminService;
	}

	/**
	 * Creates a new admin account.
	 * <p>
	 * Restricted to SUPER_ADMIN role only.
	 * </p>
	 * 
	 * @param request DTO containing new admin details (email, password, role).
	 * @return The created admin profile.
	 */
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	@PreAuthorize("hasRole('SUPER_ADMIN')")
	public AdminResponse createAdmin(@Valid @RequestBody AdminCreateRequest request) {
		return adminService.createAdmin(request);
	}

	/**
	 * Retrieves details of a specific admin.
	 * <p>
	 * Accessible by any authenticated admin.
	 * </p>
	 * 
	 * @param id The Admin ID.
	 * @return Admin profile details.
	 */
	@GetMapping("/{id}")
	public AdminResponse getAdmin(@PathVariable String id) {
		return adminService.getAdminById(id);
	}

	/**
	 * Retrieves a list of all admin accounts.
	 * <p>
	 * Accessible by any authenticated admin.
	 * </p>
	 * 
	 * @return List of all admins.
	 */
	@GetMapping
	public List<AdminResponse> getAllAdmins() {
		return adminService.getAllAdmins();
	}

	/**
	 * Updates an existing admin's profile.
	 * <p>
	 * Security Rule:
	 * - SUPER_ADMIN can update any account.
	 * - Consistent Rules allow regular ADMINs to update ONLY their own account.
	 * </p>
	 * 
	 * @param id      The ID of the admin to update.
	 * @param request Partial update fields.
	 * @return The updated admin profile.
	 */
	@PatchMapping("/{id}")
	@PreAuthorize("hasRole('SUPER_ADMIN') or #id == authentication.principal.admin.id")
	public AdminResponse updateAdmin(
			@PathVariable String id,
			@Valid @RequestBody AdminUpdateRequest request) {
		return adminService.updateAdmin(id, request);
	}

	/**
	 * Deletes an admin account.
	 * <p>
	 * Restricted to SUPER_ADMIN role only.
	 * Includes a safeguard to prevent a SUPER_ADMIN from deleting their own active
	 * session account.
	 * </p>
	 * 
	 * @param id           The ID of the admin to delete.
	 * @param currentAdmin The possibly authenticated user (used for self-deletion
	 *                     check).
	 */
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasRole('SUPER_ADMIN')")
	public void deleteAdmin(
			@PathVariable String id,
			@AuthenticationPrincipal AdminUserDetails currentAdmin) {

		// Prevent self-deletion
		if (id.equals(currentAdmin.getAdmin().getId())) {
			throw new IllegalArgumentException("Cannot delete your own account");
		}

		adminService.deleteAdmin(id);
	}
}
