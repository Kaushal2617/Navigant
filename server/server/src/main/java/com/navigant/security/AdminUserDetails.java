package com.navigant.security;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.navigant.model.Admin;

/**
 * Implements Spring Security's UserDetails interface. Wraps our Admin entity to
 * work with Spring Security.
 */
public class AdminUserDetails implements UserDetails {

	private final Admin admin;

	public AdminUserDetails(Admin admin) {
		this.admin = admin;
	}

	/**
	 * Return authorities (roles) for this user. We prefix with "ROLE_" as Spring
	 * Security expects this format.
	 */
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {

		return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + admin.getRole()));
	}

	/**
	 * Return the password for authentication.
	 */
	@Override
	public String getPassword() {

		return admin.getPasswordHash();
	}

	/**
	 * Return the username (we use email as username).
	 */
	@Override
	public String getUsername() {

		return admin.getEmail();
	}

	/**
	 * Account status checks. You can implement these based on your business logic.
	 * For now, we'll return true for all.
	 */
	@Override
	public boolean isAccountNonExpired() {

		return true;
	}

	@Override
	public boolean isAccountNonLocked() {

		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {

		return true;
	}

	@Override
	public boolean isEnabled() {

		return true;
	}

	/**
	 * Getter to access the underlying Admin entity if needed.
	 */
	public Admin getAdmin() {
		return admin;
	}
}
