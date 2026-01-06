package com.navigant.exception;

/**
 * Exception thrown when a job application is not found.
 */
public class JobApplicationNotFoundException extends RuntimeException{

	public JobApplicationNotFoundException(String message) {
		super(message);
	}
}
