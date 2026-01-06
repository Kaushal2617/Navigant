package com.navigant.service.impl;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.navigant.dto.JobPostDTO;
import com.navigant.exception.JobNotFoundException;
import com.navigant.model.JobPost;
import com.navigant.repository.JobPostRepository;
import com.navigant.service.JobPostService;

/**
 * Implementation of JobPostService using immutable JobPost entity.
 */
@Service
public class JobPostServiceImpl implements JobPostService {

	private final JobPostRepository jobPostRepository;

	public JobPostServiceImpl(JobPostRepository jobPostRepository) {
		this.jobPostRepository = jobPostRepository;
	}

	// Helper: convert JobPost → JobPostDTO
	private JobPostDTO toDTO(JobPost jobPost) {
		return jobPost != null ? new JobPostDTO(jobPost) : null;
	}

	@Override
	public JobPostDTO createJobPost(JobPostDTO dto) {
		// Use factory method for creation
		JobPost jobPost = JobPost.createNew(
				dto.getTitle(),
				dto.getDescription(),
				dto.getLocation(),
				dto.getJobType(),
				dto.getRequirements(),
				dto.getResponsibilities(),
				dto.getSalaryRange(),
				dto.getApplicationLink(),
				dto.getCreatedBy(),
				dto.getExpiresAt());

		JobPost saved = jobPostRepository.save(jobPost);
		return toDTO(saved);
	}

	@Override
	public JobPostDTO updateJobPost(@NonNull String id, JobPostDTO dto) {
		JobPost existing = jobPostRepository.findById(id)
				.orElseThrow(() -> new JobNotFoundException("Job Post not found with id: " + id));

		// Use immutable copy-with method for updates
		JobPost updated = existing.withUpdatedContent(
				dto.getTitle(),
				dto.getDescription(),
				dto.getLocation(),
				dto.getJobType(),
				dto.getRequirements(),
				dto.getResponsibilities(),
				dto.getSalaryRange(),
				dto.getApplicationLink(),
				dto.getStatus(),
				dto.getExpiresAt());

		JobPost saved = jobPostRepository.save(updated);
		return toDTO(saved);
	}

	@Override
	public void deleteJobPost(@NonNull String id) {
		// Soft delete: mark as EXPIRED
		JobPost existing = jobPostRepository.findById(id)
				.orElseThrow(() -> new JobNotFoundException("Job post not found for deletion: " + id));

		// Use immutable copy-with for status change
		JobPost expired = existing.withStatus("EXPIRED");
		jobPostRepository.save(expired);
	}

	@Override
	public Optional<JobPostDTO> getJobPostById(@NonNull String id) {
		return jobPostRepository.findById(id)
				.map(this::toDTO);
	}

	@Override
	public List<JobPostDTO> getAllJobPost() {
		return jobPostRepository.findAll().stream()
				.filter(job -> !"EXPIRED".equalsIgnoreCase(job.getStatus()))
				.map(this::toDTO)
				.collect(Collectors.toList());
	}

	@Override
	public List<JobPostDTO> getActiveJobPosts() {
		Date now = Date.from(Instant.now());
		return jobPostRepository.findActiveJobs(now).stream()
				.map(this::toDTO)
				.collect(Collectors.toList());
	}

}
