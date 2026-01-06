package com.navigant.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.navigant.model.Admin;

/**
 * Spring Data MongoDB repository for Admin entities.
 * 
 * Responsibilities:
 * - Basic CRUD (inherited)
 * - Custom queries (email uniqueness, lookup)
 * - Indexing hints (via method naming or annotations)
 * 
 * Note: Returns domain objects (Admin), not DTOs — service layer handles mapping.
 */
public interface AdminRepository extends MongoRepository<Admin, String>{

	/**
     * Checks if an admin with the given email already exists.
     * Used for uniqueness validation during creation/update.
     * 
     * ⚠️ Ensure a unique index exists on 'email' in MongoDB for correctness at scale.
     */
	
	boolean existsByEmail(String email);
	
	 /**
     * Finds an admin by email (case-insensitive).
     * Used for login, update-by-email, etc.
     */
	
	@Query("{'email' : {$regex: ?0, $options: 'i'}}")
	Optional<Admin> findByEmail(String email);
}
