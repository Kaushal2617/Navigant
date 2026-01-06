package com.navigant.service;

import java.util.List;

import com.navigant.dto.AdminCreateRequest;
import com.navigant.dto.AdminResponse;
import com.navigant.dto.AdminUpdateRequest;

/**
 * Service Interface for Admin User Management.
 * <p>
 * Defines operations for creating and managing internal administrative users.
 * This service should handle password hashing and role assignment.
 * </p>
 */
public interface AdminService {

     /**
      * Creates a new administrative user.
      * <p>
      * Implementation MUST hash the password before storage.
      * </p>
      * 
      * @param request DTO containing raw password and user details.
      * @return Created admin with sensitive data (password) omitted.
      * @throws IllegalArgumentException if email already exists.
      */
     AdminResponse createAdmin(AdminCreateRequest request);

     /**
      * Retrieves an admin by their unique ID.
      * 
      * @param id Admin ID.
      * @return Admin profile.
      * @throws com.navigant.exception.ResourceNotFoundException if not found.
      */
     AdminResponse getAdminById(String id);

     /**
      * Retrieves all registered admin accounts.
      * 
      * @return List of admins.
      */
     List<AdminResponse> getAllAdmins();

     /**
      * Updates specific fields of an admin profile.
      * 
      * @param id      Target Admin ID.
      * @param request DTO with fields to update (null fields are ignored).
      * @return Updated admin profile.
      */
     AdminResponse updateAdmin(String id, AdminUpdateRequest request);

     /**
      * Permanently deletes or soft-deletes an admin account.
      * 
      * @param id Target Admin ID.
      */
     void deleteAdmin(String id);
}
