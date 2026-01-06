package com.navigant.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.navigant.model.JobApplication;

/**
 * Repository for JobApplication entities.
 */
@Repository
public interface JobApplicationRepository extends  MongoRepository<JobApplication, String>{

	/**
     * Find all applications for a specific job.
     */
	List<JobApplication> findByJobPostId(String jobPostId);
	
	/**
     * Find applications by status.
     */
	List<JobApplication> findByStatus(String status);

    /**
     * Find applications by applicant email.
     */
	List<JobApplication> findByApplicantEmail(String email);
	
	 /**
     * Check if applicant already applied to this job.
     */
	boolean existsByJobPostIdAndApplicantEmail(String jobPostId, String email);
}
