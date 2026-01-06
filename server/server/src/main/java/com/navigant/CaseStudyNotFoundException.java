package com.navigant;

public class CaseStudyNotFoundException extends RuntimeException{

	public CaseStudyNotFoundException(String id) {
		super("CaseStudy not found with id: "+id);
	}
}
