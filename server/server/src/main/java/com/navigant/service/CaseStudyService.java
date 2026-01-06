package com.navigant.service;

import java.util.List;

import com.navigant.dto.CaseStudyRequest;
import com.navigant.dto.CaseStudyResponse;
import com.navigant.dto.CaseStudyUpdateRequest;

public interface CaseStudyService {

	CaseStudyResponse create(CaseStudyRequest request);
	List<CaseStudyResponse> getAll();
	CaseStudyResponse getById(String id);
	CaseStudyResponse update(String id, CaseStudyUpdateRequest request);
	void delete(String id);
	List<CaseStudyResponse> getPublished();
}
