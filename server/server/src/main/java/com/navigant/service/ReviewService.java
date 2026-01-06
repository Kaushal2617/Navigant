package com.navigant.service;

import java.util.List;

import com.navigant.dto.PublicReviewResponse;
import com.navigant.dto.ReviewCreateRequest;
import com.navigant.dto.ReviewResponse;
import com.navigant.dto.ReviewStatusUpdateRequest;
import com.navigant.dto.ReviewSubmitRequest;

/**
 * Service Interface for Review Management.
 * <p>
 * Handles the logic for generating tokens, verifying submissions,
 * and managing the approval workflow for client testimonials.
 * </p>
 */
public interface ReviewService {

	/**
	 * Generates a new review invitation link for a client.
	 * 
	 * @param request Client info.
	 * @param baseUrl Base URL for link construction.
	 * @return Review details including the unique token.
	 */
	ReviewResponse createReviewLink(ReviewCreateRequest request, String baseUrl);

	/**
	 * Retrieves all reviews for admin management.
	 * 
	 * @return List of all reviews.
	 */
	List<ReviewResponse> getAllReviews();

	/**
	 * Retrieves a single review by ID.
	 * 
	 * @param id Review ID.
	 * @return Review details.
	 */
	ReviewResponse getReviewById(String id);

	/**
	 * Updates the status of a review (Approve/Reject).
	 * 
	 * @param id      Review ID.
	 * @param request New status.
	 * @param adminId ID of the admin performing the action.
	 * @return Updated review.
	 */
	ReviewResponse updateStatus(String id, ReviewStatusUpdateRequest request, String adminId);

	/**
	 * Deletes a review.
	 * 
	 * @param id Review ID.
	 */
	void deleteReview(String id);

	/**
	 * Retrieves review metadata by token (for public submission form).
	 * 
	 * @param token Unique token.
	 * @return Review details.
	 */
	ReviewResponse getReviewByToken(String token);

	/**
	 * Processes a client's review submission.
	 * 
	 * @param token   Unique token.
	 * @param request Feedback content.
	 * @return Updated review.
	 */
	ReviewResponse submitReview(String token, ReviewSubmitRequest request);

	/**
	 * Retrieves public-facing approved reviews.
	 * 
	 * @return List of approved reviews.
	 */
	List<PublicReviewResponse> getApprovedReviews();
}
