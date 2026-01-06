package com.navigant.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.navigant.model.CaseStudy;

@Repository
public interface CaseStudyRepository extends MongoRepository<CaseStudy, String> {

	List<CaseStudy> findByStatusOrderByOrderAsc(String status);
	List<CaseStudy> findByCategory(String category);
	List<CaseStudy> findAllByOrderByOrderAsc();
}
