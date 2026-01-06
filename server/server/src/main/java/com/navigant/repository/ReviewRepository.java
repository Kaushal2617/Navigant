package com.navigant.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.navigant.model.Review;

@Repository
public interface ReviewRepository extends MongoRepository<Review, String> {

	Optional<Review> findByToken(String Token);
	List<Review> findByStatus(String status);;
	List<Review> findByStatusOrderBySubmittedAtDesc(String status);
	
}
