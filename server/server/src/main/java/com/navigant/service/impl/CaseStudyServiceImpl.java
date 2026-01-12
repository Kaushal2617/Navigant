package com.navigant.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.navigant.CaseStudyNotFoundException;
import com.navigant.dto.CaseStudyRequest;
import com.navigant.dto.CaseStudyResponse;
import com.navigant.dto.CaseStudyUpdateRequest;
import com.navigant.model.CaseStudy;
import com.navigant.repository.CaseStudyRepository;
import com.navigant.service.CaseStudyService;

@Service
public class CaseStudyServiceImpl implements CaseStudyService {

	private final CaseStudyRepository repository;

	public CaseStudyServiceImpl(CaseStudyRepository repository) {
		this.repository = repository;
	}

	@Override
	public CaseStudyResponse create(CaseStudyRequest request) {
		java.time.Instant publishDate = request.publishDate() != null && !request.publishDate().isEmpty()
				? java.time.Instant.parse(request.publishDate())
				: null;

		CaseStudy caseStudy = CaseStudy.createNew(
				request.title(),
				request.description(),
				request.fullContent(),
				request.image(),
				request.category(),
				request.alt(),
				request.order(),
				publishDate);
		return CaseStudyResponse.fromEntity(repository.save(caseStudy));
	}

	@Override
	public List<CaseStudyResponse> getAll() {

		return repository.findAllByOrderByOrderAsc().stream()
				.map(CaseStudyResponse::fromEntity)
				.toList();
	}

	@Override
	public CaseStudyResponse getById(String id) {

		return repository.findById(id)
				.map(CaseStudyResponse::fromEntity)
				.orElseThrow(() -> new CaseStudyNotFoundException(id));
	}

	@Override
	public CaseStudyResponse update(String id, CaseStudyUpdateRequest request) {
		CaseStudy existing = repository.findById(id)
				.orElseThrow(() -> new CaseStudyNotFoundException(id));

		java.time.Instant publishDate = request.publishDate() != null && !request.publishDate().isEmpty()
				? java.time.Instant.parse(request.publishDate())
				: existing.getPublishDate();

		CaseStudy updated = existing.withUpdate(
				request.title(),
				request.description(),
				request.fullContent(),
				request.image(),
				request.category(),
				request.alt(),
				request.status(),
				request.order(),
				publishDate);
		return CaseStudyResponse.fromEntity(repository.save(updated));
	}

	@Override
	public void delete(String id) {
		if (!repository.existsById(id)) {
			throw new CaseStudyNotFoundException(id);
		}
		repository.deleteById(id);
	}

	@Override
	public List<CaseStudyResponse> getPublished() {

		return repository.findByStatusOrderByOrderAsc("PUBLISHED").stream()
				.map(CaseStudyResponse::fromEntity)
				.toList();
	}

}
