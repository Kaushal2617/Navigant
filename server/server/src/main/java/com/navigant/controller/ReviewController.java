package com.navigant.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.navigant.dto.PublicReviewResponse;
import com.navigant.dto.ReviewCreateRequest;
import com.navigant.dto.ReviewResponse;
import com.navigant.dto.ReviewStatusUpdateRequest;
import com.navigant.dto.ReviewSubmitRequest;
import com.navigant.security.AdminUserDetails;
import com.navigant.service.ReviewService;

import jakarta.validation.Valid;

/**
 * Controller for Client Reviews (Testimonials).
 * <p>
 * Implements a secure workflow for gathering and displaying client feedback:
 * 1. Admin generates a unique, tokenized link for a client.
 * 2. Client submits a review via the public link (Token Validation).
 * 3. Review enters PENDING state.
 * 4. Admin approves review -> moves to APPROVED state.
 * 5. Public API fetches only APPROVED reviews for display.
 * </p>
 */
@RestController
@RequestMapping("/api/v1")
public class ReviewController {

	private final ReviewService reviewService;

	public ReviewController(ReviewService reviewService) {
		this.reviewService = reviewService;
	}

	/**
	 * ADMIN: Generates a unique, one-time link for a client to submit a review.
	 * 
	 * @param request Details of the client (Name, Project) to pre-fill.
	 * @param baseUrl The frontend base URL (from header) to construct the full
	 *                link.
	 * @param admin   Authenticated admin user.
	 * @return The created review token/link.
	 */
	@PostMapping("/admin/reviews")
	@ResponseStatus(HttpStatus.CREATED)
	public ReviewResponse createReviewLink(@Valid @RequestBody ReviewCreateRequest request,
			@RequestHeader(value = "X-Base-Url", defaultValue = "http://localhost:3000") String baseUrl,
			@AuthenticationPrincipal AdminUserDetails admin) {
		return reviewService.createReviewLink(request, baseUrl);
	}

	/**
	 * ADMIN: Retrieves all reviews (Pending, Approved, Rejected).
	 * 
	 * @param admin Authenticated admin user.
	 * @return List of all reviews.
	 */
	@GetMapping("/admin/reviews")
	public List<ReviewResponse> getAllReviews(@AuthenticationPrincipal AdminUserDetails admin) {
		return reviewService.getAllReviews();
	}

	/**
	 * ADMIN: Retrieves a single review by ID.
	 * 
	 * @param id    Review ID.
	 * @param admin Authenticated admin user.
	 * @return Review details.
	 */
	@GetMapping("/admin/reviews/{id}")
	public ReviewResponse getReviewByID(@PathVariable String id, @AuthenticationPrincipal AdminUserDetails admin) {
		return reviewService.getReviewById(id);
	}

	/**
	 * ADMIN: Updates the status of a review (e.g., Approve a pending review).
	 * 
	 * @param id      Review ID.
	 * @param request New status.
	 * @param admin   Authenticated admin user.
	 * @return Updated review.
	 */
	@PatchMapping("/admin/reviews/{id}/status")
	public ReviewResponse updateStatus(@PathVariable String id, @Valid @RequestBody ReviewStatusUpdateRequest request,
			@AuthenticationPrincipal AdminUserDetails admin) {
		return reviewService.updateStatus(id, request, admin.getAdmin().getId());
	}

	/**
	 * ADMIN: Deletes a review permanently.
	 * 
	 * @param id    Review ID.
	 * @param admin Authenticated admin user.
	 */
	@DeleteMapping("admin/reviews/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteReview(@PathVariable String id, @AuthenticationPrincipal AdminUserDetails admin) {
		reviewService.deleteReview(id);
	}

	/**
	 * PUBLIC (Token): Retrieves review details for the submission form.
	 * <p>
	 * Used when a client clicks the unique link. Validates the token.
	 * </p>
	 * 
	 * @param token The unique review token.
	 * @return Review details (to prefill the form).
	 */
	@GetMapping("/reviews/{token}")
	public ReviewResponse getReviewByToken(@PathVariable String token) {
		return reviewService.getReviewByToken(token);
	}

	/**
	 * PUBLIC (Token): Submits the client's feedback.
	 * 
	 * @param token   The unique review token.
	 * @param request The feedback content (rating, comment).
	 * @return Updated review.
	 */
	@PostMapping("/reviews/{token}")
	@ResponseStatus(HttpStatus.CREATED)
	public ReviewResponse submitReview(@PathVariable String token, @Valid @RequestBody ReviewSubmitRequest request) {
		return reviewService.submitReview(token, request);
	}

	/**
	 * PUBLIC: Retrieves all APPROVED reviews.
	 * <p>
	 * Used for displaying testimonials on the public website.
	 * </p>
	 * 
	 * @return List of approved reviews.
	 */
	@GetMapping("/reviews")
	public List<PublicReviewResponse> getApprovedReviews() {
		return reviewService.getApprovedReviews();
	}

}
