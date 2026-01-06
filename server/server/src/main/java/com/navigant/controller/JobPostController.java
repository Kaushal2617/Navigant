package com.navigant.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.navigant.dto.JobPostDTO;
import com.navigant.service.JobPostService;

import jakarta.validation.Valid;

/**
 * Controller for managing Job Postings.
 * <p>
 * This API serves both the content management system (for Admins)
 * and the public careers page (for Candidates).
 * </p>
 */
@RestController
@RequestMapping("/api/v1/jobs")
public class JobPostController {

	private final JobPostService jobPostService;

	public JobPostController(JobPostService jobPostService) {
		this.jobPostService = jobPostService;
	}

	/**
	 * ADMIN: Creates a new job posting.
	 * 
	 * @param dto Job details (title, description, status).
	 * @return Created job post.
	 */
	@PostMapping
	public ResponseEntity<JobPostDTO> createJob(@Valid @RequestBody JobPostDTO dto) {
		JobPostDTO created = jobPostService.createJobPost(dto);
		return ResponseEntity.status(HttpStatus.CREATED).body(created);
	}

	/**
	 * ADMIN: Updates an existing job posting.
	 * 
	 * @param id  Job ID.
	 * @param dto Updated job details.
	 * @return Updated job post.
	 */
	@PutMapping("/{id}")
	public ResponseEntity<JobPostDTO> updateJobPost(@PathVariable @NonNull String id,
			@Valid @RequestBody JobPostDTO dto) {
		JobPostDTO updated = jobPostService.updateJobPost(id, dto);
		return ResponseEntity.ok(updated);
	}

	/**
	 * ADMIN: Soft-deletes a job posting (sets status to EXPIRED/DELETED).
	 * 
	 * @param id Job ID.
	 * @return 204 No Content.
	 */
	@DeleteMapping("/{id}")
	public ResponseEntity<JobPostDTO> deleteJobPost(@PathVariable @NonNull String id) {
		jobPostService.deleteJobPost(id);
		return ResponseEntity.noContent().build();
	}

	/**
	 * ADMIN: Retrieves all job posts, including inactive ones.
	 * <p>
	 * Used for the admin dashboard list view.
	 * </p>
	 * 
	 * @return List of all job posts.
	 */
	@GetMapping("/admin")
	public ResponseEntity<List<JobPostDTO>> getAllJobs() {
		List<JobPostDTO> jobs = jobPostService.getAllJobPost();
		return ResponseEntity.ok(jobs);
	}

	/**
	 * PUBLIC: Retrieves only active (published) job posts.
	 * <p>
	 * Used for the public-facing careers page.
	 * Filter out drafts and expired jobs.
	 * </p>
	 * 
	 * @return List of active jobs.
	 */
	@GetMapping
	public ResponseEntity<List<JobPostDTO>> getActiveJobs() {
		List<JobPostDTO> activeJobs = jobPostService.getActiveJobPosts();
		return ResponseEntity.ok(activeJobs);
	}

	/**
	 * PUBLIC: Retrieves details of a specific job by ID.
	 * 
	 * @param id Job ID.
	 * @return Job details or 404 if not found.
	 */
	@GetMapping("/{id}")
	public ResponseEntity<JobPostDTO> getJobById(@PathVariable @NonNull String id) {
		Optional<JobPostDTO> jobOpt = jobPostService.getJobPostById(id);
		return jobOpt.map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

}
