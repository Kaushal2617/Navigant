package com.navigant.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

/**
 * Utility class for JWT token operations.
 * Handles token generation, validation, and extraction of claims.
 * 
 * Uses JJWT 0.12.x modern API (non-deprecated methods).
 */
@Component
public class JwtUtils {

	// JWT secret key
	@Value("${app.jwt.secret}")
	private String jwtSecret;

	// Token expiration time in milliseconds
	@Value("${app.jwt.expiration}")
	private long jwtExpirationMs;

	// Key used for signing JWT tokens
	private SecretKey key;

	/**
	 * Initialize the signing key after bean construction.
	 * Using HMAC-SHA256 algorithm for signing.
	 */
	@PostConstruct
	public void init() {
		// Convert secret string to bytes and create signing key
		this.key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
	}

	/**
	 * Generates a signed JWT token for an authenticated user.
	 * <p>
	 * The token includes:
	 * - Subject: User's email
	 * - Claim 'role': User's authority role
	 * - Issued At: Current timestamp
	 * - Expiration: Current timestamp + configured duration
	 * - Signature: HMAC-SHA256 signature using the secret key
	 * </p>
	 * 
	 * @param email User's email (used as subject/username)
	 * @param role  User's role (stored in claims)
	 * @return A compact, URL-safe JWT string
	 */
	public String generateToken(String email, String role) {

		Date now = new Date();
		Date expiryDate = new Date(now.getTime() + jwtExpirationMs);

		return Jwts.builder()
				.subject(email) // Set email as subject (modern API)
				.claim("role", role) // Add role as custom claim
				.issuedAt(now) // Set issue time (modern API)
				.expiration(expiryDate) // Set expiration time (modern API)
				.signWith(key) // Sign with our secret key
				.compact(); // Build the token
	}

	/**
	 * Extract email (subject) from JWT token.
	 * 
	 * @param token JWT token
	 * @return Email from token
	 */
	public String getEmailFromToken(String token) {
		Claims claims = parseToken(token);
		return claims.getSubject();
	}

	/**
	 * Extract role from JWT token.
	 * 
	 * @param token JWT token
	 * @return Role from token
	 */
	public String getRoleFromToken(String token) {
		Claims claims = parseToken(token);
		return claims.get("role", String.class);
	}

	/**
	 * Validate JWT token.
	 * Checks if token is properly signed and not expired.
	 * 
	 * @param token JWT token to validate
	 * @return true if valid, false otherwise
	 */
	public boolean validateToken(String token) {
		try {
			parseToken(token);
			return true;
		} catch (Exception e) {
			// Token is invalid (expired, malformed, wrong signature, etc.)
			return false;
		}
	}

	/**
	 * Parse JWT token and extract claims.
	 * 
	 * @param token JWT token
	 * @return Claims from token
	 */
	private Claims parseToken(String token) {
		return Jwts.parser()
				.verifyWith(key) // Set verification key (modern API)
				.build()
				.parseSignedClaims(token) // Parse and verify token (modern API)
				.getPayload(); // Get claims (modern API)
	}
}
