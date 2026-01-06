package com.navigant.security;

import java.io.IOException;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * JWT Authentication Filter.
 * <p>
 * This filter intercepts every HTTP request to check for a valid JSON Web Token
 * (JWT).
 * It supports two sources for the token:
 * 1. <b>HttpOnly Cookie</b> ('jwt'): Primary method for web browser clients
 * (secure, prevents XSS).
 * 2. <b>Authorization Header</b> ('Bearer ...'): Fallback method for API
 * clients or mobile apps.
 * </p>
 * <p>
 * If a valid token is found, the user is authenticated in the Spring Security
 * context for the duration of the request.
 * </p>
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final JwtUtils jwtUtils;
	private final CustomUserDetailsService userDetailsService;

	public JwtAuthenticationFilter(JwtUtils jwtUtils, CustomUserDetailsService userDetailsService) {
		this.jwtUtils = jwtUtils;
		this.userDetailsService = userDetailsService;

	}

	/**
	 * Main filter logic executed for each request.
	 */
	@Override
	protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
			@NonNull FilterChain filterChain)
			throws ServletException, IOException {
		try {

			// Extract JWT token from request header
			String jwt = getJwtFromRequest(request);

			// If token exists and is valid
			if (jwt != null && jwtUtils.validateToken(jwt)) {

				// Extract email from token
				String email = jwtUtils.getEmailFromToken(jwt);

				// Load user details from database
				UserDetails userDetails = userDetailsService.loadUserByUsername(email);

				// Create authentication object
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());

				// Set additional details (IP address, session ID, etc.)
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

				// Set authentication in Spring Security context
				// This makes the user "logged in" for this request
				SecurityContextHolder.getContext().setAuthentication(authentication);
			}

		} catch (Exception e) {
			// Log the exception but don't fail the request
			// Security will handle unauthorized access
			logger.error("Cannot set user authentication", e);
		}

		// Continue with the filter chain
		// If authentication not set, request will be unauthorized
		filterChain.doFilter(request, response);

	}

	/**
	 * Extract JWT token from Authorization header.
	 * Expected format: "Bearer <token>"
	 * 
	 * @param request HTTP request
	 * @return JWT token or null if not found
	 */
	private String getJwtFromRequest(HttpServletRequest request) {

		// First try cookie (preferred for browser clients)
		if (request.getCookies() != null) {
			for (Cookie cookie : request.getCookies()) {
				if ("jwt".equals(cookie.getName())) {
					return cookie.getValue();
				}
			}
		}

		// Fallback to header (for API clients/mobile apps)
		String bearerToken = request.getHeader("Authorization");

		// Check if Authorization header exists and starts with "Bearer "
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {

			// Extract token (remove "Bearer " prefix)
			return bearerToken.substring(7);
		}

		return null;
	}

}
