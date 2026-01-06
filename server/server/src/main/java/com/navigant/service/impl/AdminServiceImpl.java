package com.navigant.service.impl;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.navigant.dto.AdminCreateRequest;
import com.navigant.dto.AdminResponse;
import com.navigant.dto.AdminUpdateRequest;
import com.navigant.exception.AdminNotFoundException;
import com.navigant.model.Admin;
import com.navigant.model.Role;
import com.navigant.repository.AdminRepository;
import com.navigant.service.AdminService;

/**
 * Default implementation of AdminService.
 * 
 * Dependencies injected via constructor — fully testable and immutable
 * post-construction.
 */
@Service
public class AdminServiceImpl implements AdminService {

	private final AdminRepository adminRepository;
	private final PasswordEncoder passwordEncoder;

	public AdminServiceImpl(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
		this.adminRepository = adminRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public AdminResponse createAdmin(AdminCreateRequest request) {

		// 1. Validate email uniqueness
		if (adminRepository.existsByEmail(request.getEmail())) {
			throw new IllegalArgumentException("Admin with email already exists: " + request.getEmail());
		}

		// 2. Hash password
		String hashedPassword = passwordEncoder.encode(request.getPassword());

		// 3. Create domain entity(immutable)
		Role roleToAssign = (request.getRole() != null) ? Role.fromString(request.getRole()) : Role.ADMIN;

		Admin admin = Admin.createNew(
				request.getName(),
				request.getEmail(),
				hashedPassword,
				roleToAssign);

		// 4. Persist
		Admin saved = adminRepository.save(admin);

		// 5. Map to response
		return toResponse(saved);
	}

	@Override
	public AdminResponse getAdminById(String id) {
		return adminRepository.findById(id)
				.map(this::toResponse)
				.orElseThrow(() -> new AdminNotFoundException("Admin not found with ID: " + id));
	}

	@Override
	public List<AdminResponse> getAllAdmins() {
		return adminRepository.findAll().stream()
				.map(this::toResponse)
				.collect(Collectors.toList());
	}

	@Override
	public AdminResponse updateAdmin(String id, AdminUpdateRequest request) {

		Admin existing = adminRepository.findById(id)
				.orElseThrow(() -> new AdminNotFoundException("Admin not found with ID: " + id));

		// Build updated admin using immutable updates
		Admin updated = existing;

		// Update name if provided
		if (request.getName() != null) {
			updated = updated.withName(request.getName());
		}

		// Update email if provided(with uniqueness check)
		if (request.getEmail() != null && !request.getEmail().equals(existing.getEmail())) {
			if (adminRepository.existsByEmail(request.getEmail())) {
				throw new IllegalArgumentException("Email already exists: " + request.getEmail());
			}

			// Note: No withEmail() in Admin — to prevent accidental exposure;
			// Instead, reconstruct (safe since we control this class)
			updated = new Admin(
					updated.getId(),
					updated.getName(),
					request.getEmail(),
					updated.getPasswordHash(),
					updated.getRole(),
					updated.isEnabled(),
					updated.getCreatedAt(),
					Instant.now());
		}

		// Updated password if provided
		if (request.getPassword() != null) {
			String newHash = passwordEncoder.encode(request.getPassword());

			updated = new Admin(
					updated.getId(),
					updated.getName(),
					updated.getEmail(),
					newHash,
					updated.getRole(),
					updated.isEnabled(),
					updated.getCreatedAt(),
					Instant.now());
		}

		// Update role if provided
		if (request.getRole() != null) {
			Role newRole = Role.fromString(request.getRole());
			updated = updated.withRole(newRole);
		}

		// Update enable if provided
		if (request.getEnabled() != null) {
			updated = updated.withEnabled(request.getEnabled());
		}

		// Persist
		Admin saved = adminRepository.save(updated);
		return toResponse(saved);
	}

	@Override
	public void deleteAdmin(String id) {
		if (!adminRepository.existsById(id)) {
			throw new AdminNotFoundException("Admin not found with ID: " + id);
		}
		adminRepository.deleteById(id);
	}

	// --- Private helpers ---
	private AdminResponse toResponse(Admin admin) {
		return new AdminResponse(
				admin.getId(),
				admin.getName(),
				admin.getEmail(),
				admin.getRole().getValue(),
				admin.isEnabled(),
				admin.getCreatedAt(),
				admin.getUpdatedAt());
	}

}
