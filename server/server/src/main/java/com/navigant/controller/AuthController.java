package com.navigant.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.navigant.dto.LoginRequest;
import com.navigant.dto.LoginResponse;
import com.navigant.security.AdminUserDetails;
import com.navigant.security.JwtUtils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

/**
 * Controller for handling Authentication and Authorization operations.
 * <p>
 * This controller manages the lifecycle of user sessions using JSON Web Tokens
 * (JWT).
 * Instead of returning tokens in the body (which is vulnerable to XSS in local
 * storage),
 * it sets them in secure, HttpOnly cookies.
 * </p>
 */
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

	@Value("${app.env}")
	private String appEnv;

	private final AuthenticationManager authenticationManager;
	private final JwtUtils jwtUtils;

	public AuthController(AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
		this.authenticationManager = authenticationManager;
		this.jwtUtils = jwtUtils;
	}

	/**
	 * Authenticates a user and establishes a session via HttpOnly cookie.
	 * <p>
	 * This endpoint:
	 * 1. Validates the provided credentials using Spring Security's
	 * AuthenticationManager.
	 * 2. Generates a signed JWT token containing the user's email and role.
	 * 3. Sets the JWT in a secure, HttpOnly cookie to prevent XSS attacks.
	 * 4. Returns user details (ID, email, scope) in the response body for frontend
	 * state.
	 * </p>
	 * 
	 * @param loginRequest The DTO containing email and password.
	 * @param httpResponse The raw Servlet response used to set the cookie.
	 * @return ResponseEntity containing {@link LoginResponse} with user details.
	 */
	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest,
			HttpServletResponse httpResponse) {

		// Authenticate user with Spring Security
		// This will call CustomUserDetailsService.loadUserByUsername()
		// and check password using PasswordEncoder
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						loginRequest.getEmail(),
						loginRequest.getPassword()));

		// Set authentication in security context (user is now logged in)
		SecurityContextHolder.getContext().setAuthentication(authentication);

		// Get authenticated user details
		AdminUserDetails userDetails = (AdminUserDetails) authentication.getPrincipal();

		// Generate JWT token
		String jwt = jwtUtils.generateToken(
				userDetails.getUsername(),
				userDetails.getAdmin().getRole().getValue());

		// Set JWT as httpOnly cookie
		Cookie cookie = new Cookie("jwt", jwt);
		cookie.setHttpOnly(true); // JS can't access - prevents XSS
		cookie.setSecure(!"development".equals(appEnv)); // HTTPS only (set to false for localhost dev)
		cookie.setPath("/"); // Available for all paths
		cookie.setMaxAge(86400); // 1 day in seconds
		cookie.setAttribute("SameSite", "Strict"); // CSRF protection
		httpResponse.addCookie(cookie);

		// Create and return response with token and user info
		LoginResponse response = new LoginResponse(
				userDetails.getAdmin().getId(),
				userDetails.getAdmin().getEmail(),
				userDetails.getAdmin().getRole().getValue(),
				userDetails.getAdmin().getName(),
				jwt); // Pass generated token

		return ResponseEntity.ok(response);

	}

	/**
	 * Logs the user out by clearing the security cookie.
	 * <p>
	 * This endpoint sends a "Set-Cookie" header that overwrites the existing "jwt"
	 * cookie
	 * with an empty value and an immediate expiration time (0), effectively
	 * removing it
	 * from the client's browser.
	 * </p>
	 * 
	 * @param httpResponse The raw Servlet response used to clear the cookie.
	 * @return ResponseEntity with 200 OK status.
	 */
	@PostMapping("/logout")
	public ResponseEntity<Void> logout(HttpServletResponse httpResponse) {
		Cookie cookie = new Cookie("jwt", "");
		cookie.setHttpOnly(true);
		cookie.setPath("/");
		cookie.setMaxAge(0); // Delete cookie immediately
		httpResponse.addCookie(cookie);

		return ResponseEntity.ok().build();
	}

}
