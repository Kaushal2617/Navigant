# API Documentation for Admin Panel

This document describes the API functions available for managing Careers, Team Members, and Testimonials from the admin panel.

## Base Configuration

The API base URL is configured in `client/src/services/api.ts`:
- Default: `/api`
- Can be overridden with environment variable: `REACT_APP_API_BASE_URL`

## API Functions

### Careers API (`careersApi.ts`)

#### Get All Jobs
```typescript
getJobs(): Promise<ApiResponse<Job[]>>
```
- **Endpoint**: `GET /api/careers/jobs`
- **Returns**: All jobs (active and inactive)

#### Get Active Jobs Only
```typescript
getActiveJobs(): Promise<ApiResponse<Job[]>>
```
- **Endpoint**: `GET /api/careers/jobs?active=true`
- **Returns**: Only active jobs

#### Get Job by ID
```typescript
getJobById(id: string): Promise<ApiResponse<Job>>
```
- **Endpoint**: `GET /api/careers/jobs/:id`
- **Returns**: Single job details

#### Create Job (Admin Only)
```typescript
createJob(job: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Job>>
```
- **Endpoint**: `POST /api/careers/jobs`
- **Body**: Job object (without id, createdAt, updatedAt)
- **Returns**: Created job with generated ID

#### Update Job (Admin Only)
```typescript
updateJob(id: string, job: Partial<Job>): Promise<ApiResponse<Job>>
```
- **Endpoint**: `PUT /api/careers/jobs/:id`
- **Body**: Partial job object with fields to update
- **Returns**: Updated job

#### Delete Job (Admin Only)
```typescript
deleteJob(id: string): Promise<ApiResponse<void>>
```
- **Endpoint**: `DELETE /api/careers/jobs/:id`
- **Returns**: Success confirmation

#### Submit Job Application
```typescript
submitJobApplication(application: JobApplication): Promise<ApiResponse<JobApplication>>
```
- **Endpoint**: `POST /api/careers/applications` (FormData)
- **Body**: FormData with application fields and resume file
- **Returns**: Submitted application

#### Get All Applications (Admin Only)
```typescript
getJobApplications(): Promise<ApiResponse<JobApplication[]>>
```
- **Endpoint**: `GET /api/careers/applications`
- **Returns**: All job applications

#### Update Application Status (Admin Only)
```typescript
updateApplicationStatus(id: string, status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected'): Promise<ApiResponse<JobApplication>>
```
- **Endpoint**: `PUT /api/careers/applications/:id/status`
- **Body**: `{ status: string }`
- **Returns**: Updated application

### Team API (`teamApi.ts`)

#### Get All Team Members
```typescript
getTeamMembers(): Promise<ApiResponse<TeamMember[]>>
```
- **Endpoint**: `GET /api/team/members`
- **Returns**: All team members (active and inactive)

#### Get Active Team Members Only
```typescript
getActiveTeamMembers(): Promise<ApiResponse<TeamMember[]>>
```
- **Endpoint**: `GET /api/team/members?active=true`
- **Returns**: Only active team members

#### Get Team Member by ID
```typescript
getTeamMemberById(id: string): Promise<ApiResponse<TeamMember>>
```
- **Endpoint**: `GET /api/team/members/:id`
- **Returns**: Single team member details

#### Create Team Member (Admin Only)
```typescript
createTeamMember(member: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<TeamMember>>
```
- **Endpoint**: `POST /api/team/members`
- **Body**: Team member object (without id, createdAt, updatedAt)
- **Returns**: Created team member with generated ID

#### Update Team Member (Admin Only)
```typescript
updateTeamMember(id: string, member: Partial<TeamMember>): Promise<ApiResponse<TeamMember>>
```
- **Endpoint**: `PUT /api/team/members/:id`
- **Body**: Partial team member object with fields to update
- **Returns**: Updated team member

#### Delete Team Member (Admin Only)
```typescript
deleteTeamMember(id: string): Promise<ApiResponse<void>>
```
- **Endpoint**: `DELETE /api/team/members/:id`
- **Returns**: Success confirmation

#### Reorder Team Members (Admin Only)
```typescript
reorderTeamMembers(memberIds: string[]): Promise<ApiResponse<TeamMember[]>>
```
- **Endpoint**: `PUT /api/team/members/reorder`
- **Body**: `{ memberIds: string[] }` - Array of member IDs in desired order
- **Returns**: Reordered team members

### Testimonials API (`testimonialsApi.ts`)

#### Get All Testimonials
```typescript
getTestimonials(): Promise<ApiResponse<Testimonial[]>>
```
- **Endpoint**: `GET /api/testimonials`
- **Returns**: All testimonials (active and inactive)

#### Get Active Testimonials Only
```typescript
getActiveTestimonials(): Promise<ApiResponse<Testimonial[]>>
```
- **Endpoint**: `GET /api/testimonials?active=true`
- **Returns**: Only active testimonials

#### Get Featured Testimonials
```typescript
getFeaturedTestimonials(): Promise<ApiResponse<Testimonial[]>>
```
- **Endpoint**: `GET /api/testimonials?featured=true`
- **Returns**: Featured testimonials

#### Get Testimonial by ID
```typescript
getTestimonialById(id: string): Promise<ApiResponse<Testimonial>>
```
- **Endpoint**: `GET /api/testimonials/:id`
- **Returns**: Single testimonial details

#### Create Testimonial (Admin Only)
```typescript
createTestimonial(testimonial: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Testimonial>>
```
- **Endpoint**: `POST /api/testimonials`
- **Body**: Testimonial object (without id, createdAt, updatedAt)
- **Returns**: Created testimonial with generated ID

#### Update Testimonial (Admin Only)
```typescript
updateTestimonial(id: string, testimonial: Partial<Testimonial>): Promise<ApiResponse<Testimonial>>
```
- **Endpoint**: `PUT /api/testimonials/:id`
- **Body**: Partial testimonial object with fields to update
- **Returns**: Updated testimonial

#### Delete Testimonial (Admin Only)
```typescript
deleteTestimonial(id: string): Promise<ApiResponse<void>>
```
- **Endpoint**: `DELETE /api/testimonials/:id`
- **Returns**: Success confirmation

#### Reorder Testimonials (Admin Only)
```typescript
reorderTestimonials(testimonialIds: string[]): Promise<ApiResponse<Testimonial[]>>
```
- **Endpoint**: `PUT /api/testimonials/reorder`
- **Body**: `{ testimonialIds: string[] }` - Array of testimonial IDs in desired order
- **Returns**: Reordered testimonials

## Data Types

### Job
```typescript
interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
```

### JobApplication
```typescript
interface JobApplication {
  id?: string;
  fullName: string;
  email: string;
  mobileNo: string;
  position: string;
  experience: string;
  currentCompany?: string;
  resume: File | string;
  coverLetter?: string;
  status?: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
  appliedAt?: string;
}
```

### TeamMember
```typescript
interface TeamMember {
  id: string;
  name: string;
  designation: string;
  image: string;
  bio?: string;
  email?: string;
  linkedin?: string;
  alt?: string;
  order?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
```

### Testimonial
```typescript
interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  avatar?: string;
  rating: number; // 1-5
  order?: number;
  isActive?: boolean;
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
```

## Response Format

All API functions return a `Promise<ApiResponse<T>>` where:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
```

## Usage in Components

### Careers Page
The `CareersPage` component automatically fetches jobs from the API on mount. If the API fails, it falls back to local data.

### Team Members Section
The `TeamMembersSection` component can fetch team members from the API. Set `useApi={true}` prop to enable API calls (default).

### Testimonials Section
The `TestimonialsCarouselSection` component can fetch testimonials from the API. Set `useApi={true}` prop to enable API calls (default).

## Admin Panel Integration

When creating the admin panel, you can use these functions directly:

```typescript
import { createJob, updateJob, deleteJob } from '../services/careersApi';
import { createTeamMember, updateTeamMember, deleteTeamMember } from '../services/teamApi';
import { createTestimonial, updateTestimonial, deleteTestimonial } from '../services/testimonialsApi';

// Example: Create a new job
const newJob = await createJob({
  title: 'Software Engineer',
  department: 'Engineering',
  location: 'Remote',
  type: 'Full-time',
  experience: '3-5 years',
  description: '...',
  requirements: ['...'],
  responsibilities: ['...'],
  isActive: true,
});
```

## Error Handling

All API functions handle errors gracefully:
- If the API request fails, the function returns `{ success: false, error: string }`
- Components fall back to local data if API calls fail
- Errors are logged to the console for debugging

## Environment Variables

Set the following environment variable to configure the API base URL:

**For Vite projects** (this project uses Vite):
```env
VITE_API_BASE_URL=https://api.yourdomain.com
```

**Note**: Vite uses `import.meta.env` instead of `process.env`. Environment variables must be prefixed with `VITE_` to be exposed to the client.

If not set, defaults to `/api` (relative path).

