package com.navigant.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.navigant.model.Admin;
import com.navigant.repository.AdminRepository;

/**
 * Custom UserDetailsService implementation.
 * Spring Security uses this to load user data during authentication.
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {
	
	private final AdminRepository adminRepository;

	public CustomUserDetailsService(AdminRepository adminRepository) {
		this.adminRepository = adminRepository;
	}
	/**
    * Load user by username (email in our case).
    * Called by Spring Security during authentication.
    * 
    * @param email User's email
    * @return UserDetails object
    * @throws UsernameNotFoundException if user not found
    */

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		// Find admin by email from database
		Admin admin = adminRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("Admin not found with email "+email));
		// Wrap Admin entity in UserDetails implementation
		return new AdminUserDetails(admin);
	}
	

}
