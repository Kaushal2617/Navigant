package com.navigant.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.navigant.model.Lead;

@Repository
public interface LeadRepository extends MongoRepository<Lead, String>{

	// Custom queries can be added here if needed
    // List<Lead> findByStatus(String status);
}
