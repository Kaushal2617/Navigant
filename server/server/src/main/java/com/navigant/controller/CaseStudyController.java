package com.navigant.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.navigant.dto.CaseStudyRequest;
import com.navigant.dto.CaseStudyResponse;
import com.navigant.dto.CaseStudyUpdateRequest;
import com.navigant.security.AdminUserDetails;
import com.navigant.service.CaseStudyService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/v1")
public class CaseStudyController {

	private final CaseStudyService service;

	public CaseStudyController(CaseStudyService service) {
		this.service = service;
	}

	// ===== ADMIN ENDPOINTS =====
	@PostMapping("/admin/case-studies")
	@ResponseStatus(HttpStatus.CREATED)
	public CaseStudyResponse create(@Valid @RequestBody CaseStudyRequest request,
			@AuthenticationPrincipal AdminUserDetails admin) {
		return service.create(request);

	}

	@GetMapping("/admin/case-studies")
	public List<CaseStudyResponse> getAll(@AuthenticationPrincipal AdminUserDetails admin) {
		return service.getAll();
	}

	@GetMapping("/admin/case-studies/{id}")
	public CaseStudyResponse getById(@PathVariable String id, @AuthenticationPrincipal AdminUserDetails admin) {
		return service.getById(id);
	}

	@PutMapping("admin/case-studies/{id}")
	public CaseStudyResponse update(@PathVariable String id,
			@Valid @RequestBody CaseStudyUpdateRequest request,
			@AuthenticationPrincipal AdminUserDetails admin) {

		return service.update(id, request);
	}

	@DeleteMapping("/admin/case-studies/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable String id, @AuthenticationPrincipal AdminUserDetails admin) {
		service.delete(id);
	}

	// ===== PUBLIC ENDPOINTS =====
	@GetMapping("/case-studies")
	public List<CaseStudyResponse> getPublished() {
		return service.getPublished();
	}

	@GetMapping("/case-studies/{id}")
	public CaseStudyResponse getPublishedById(@PathVariable String id) {
		return service.getById(id);
	}
}
