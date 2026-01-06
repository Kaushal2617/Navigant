package com.navigant.repository;

import java.util.Date;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.navigant.model.JobPost;

@Repository
public interface JobPostRepository extends MongoRepository<JobPost, String> {

	// Find all public published and non-expired job
	@Query("{'status':'PUBLISHED', 'expiresAt':{$gte: ?0}}")
	List<JobPost> findActiveJobs(Date now);

	// Find jobs by status
	List<JobPost> findByStatus(String status);

	// Find all published jobs
	List<JobPost> findByStatusAndExpiresAtAfter(String status, LocalDateTime now);

}
