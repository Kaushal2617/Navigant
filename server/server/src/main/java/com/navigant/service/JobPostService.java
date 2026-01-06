package com.navigant.service;

import java.util.List;
import java.util.Optional;

import com.navigant.dto.JobPostDTO;
import org.springframework.lang.NonNull;

/**
 * Service Interface for Job Post Management.
 * <p>
 * Handles creation, updates, and retrieval of job listings.
 * Enforces logic like "soft delete" and filtering active jobs.
 * </p>
 */
public interface JobPostService {

	/**
	 * Creates a new job post.
	 * 
	 * @param dto details.
	 * @return created job.
	 */
	JobPostDTO createJobPost(JobPostDTO dto);

	/**
	 * Updates existing job post.
	 * 
	 * @param id  Job ID.
	 * @param dto details to update.
	 * @return updated job.
	 */
	JobPostDTO updateJobPost(@NonNull String id, JobPostDTO dto);

	/**
	 * Soft deletes a job post (marks as inactive/expired).
	 * 
	 * @param id Job ID.
	 */
	void deleteJobPost(@NonNull String id);

	/**
	 * Retrieves job post by ID.
	 * 
	 * @param id Job ID.
	 * @return Optional containing job if found.
	 */
	Optional<JobPostDTO> getJobPostById(@NonNull String id);

	/**
	 * Retrieves ALL job posts (active, draft, expired).
	 * <p>
	 * Intended for Admin Dashboard.
	 * </p>
	 * 
	 * @return List of all jobs.
	 */
	List<JobPostDTO> getAllJobPost();

	/**
	 * Retrieves only ACTIVE job posts.
	 * <p>
	 * Intended for Public Career Page.
	 * </p>
	 * 
	 * @return List of active jobs.
	 */
	List<JobPostDTO> getActiveJobPosts();

}
