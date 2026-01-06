export interface AdminResponse {
    id: string;
    email: string;
    role: string;
    name: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    id: string;
    email: string;
    role: string;
    name: string;
}

export interface JobPostDTO {
    id?: string;
    title: string;
    description: string;
    location: string;
    jobType: string;
    requirements?: string;
    responsibilities?: string;
    salaryRange?: string;
    applicationLink?: string;
    status: string;
    createdBy?: string;
    expiresAt?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface JobApplicationResponse {
    id: string;
    jobPostId: string;
    applicantName: string;
    applicantEmail: string;
    applicantPhone: string;
    coverLetter?: string;
    resumeUrl?: string; // Assuming file path/url
    status: string;
    appliedAt: string;
}

export interface ApplicationStatusUpdateRequest {
    status: string;
}

export interface LeadResponse {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    serviceType: string;
    numberOfSeats: number;
    remarks?: string;
    adminComments?: string;
    status: string;
    reviewedBy?: string;
    reviewedByName?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface SettingDTO {
    id: string;
    value: string;
    enabled: boolean;
    description: string;
}

export interface ReviewResponse {
    id: string;
    token: string;
    clientName: string;
    clientEmail: string;
    clientCompany?: string;
    rating?: number;
    title?: string;
    content?: string;
    status: string;
    reviewedBy?: string;
    reviewedByName?: string;
    adminNotes?: string;
    createdAt?: string;
    submittedAt?: string;
    updatedAt?: string;
    reviewLink?: string;
}

export interface ReviewCreateRequest {
    clientName: string;
    clientEmail: string;
    clientCompany?: string;
}

export interface ReviewStatusUpdateRequest {
    status: string;
    adminNotes?: string;
}

export interface Notification {
    id: string;
    recipient: string;
    subject: string;
    message: string;
    type: string;
    status: string;
    createdAt: string;
}

export interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number; // current page index (0-based)
    first: boolean;
    last: boolean;
    empty: boolean;
}
