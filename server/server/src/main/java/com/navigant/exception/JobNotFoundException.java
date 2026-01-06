package com.navigant.exception;

/**
 * Exception thrown when a job post is not found.
 */
public class JobNotFoundException extends RuntimeException{

	public JobNotFoundException(String message) {
		super(message);
	}
	
}
