# Certificates Section - Admin Panel Integration Guide

## Overview
The Certificates section displays company certifications and awards. All certificate data is stored in `certificatesData.ts` and can be easily updated through an admin panel.

## File Structure
- **`certificatesData.ts`** - Contains all certificate data and configuration
- **`CertificatesSection.tsx`** - React component that displays certificates
- **`CERTIFICATES_README.md`** - This documentation file

## Certificate Data Structure

Each certificate object should have the following properties:

```typescript
interface Certificate {
  id: string;              // Unique identifier (required)
  name: string;           // Certificate name (required)
  image: string;          // Image URL or path (required)
  alt?: string;           // Alt text for image (optional)
  issuer?: string;        // Issuing organization (optional)
  year?: string;          // Year of certification (optional)
  description?: string;   // Additional description (optional)
}
```

## Example Certificate Object

```typescript
{
  id: 'iso-9001-2015',
  name: 'ISO 9001:2015',
  image: '/assets/certificates/iso-9001.jpg',
  alt: 'ISO 9001:2015 Quality Management System Certification',
  issuer: 'Quality Management System',
  year: '2023',
  description: 'Certified for Quality Management Systems',
}
```

## Updating Certificates

### Method 1: Direct File Edit (Current)
1. Open `client/src/components/commons/certificatesData.ts`
2. Modify the `certificatesData` array
3. Add, remove, or update certificate objects
4. Save the file

### Method 2: Admin Panel Integration (Future)
To integrate with an admin panel, you can:

1. **Create an API endpoint** that returns certificate data
2. **Update the component** to fetch data from the API:
   ```typescript
   // In CertificatesSection.tsx
   const [certificates, setCertificates] = useState(certificatesData);
   
   useEffect(() => {
     fetch('/api/certificates')
       .then(res => res.json())
       .then(data => setCertificates(data));
   }, []);
   ```

3. **Admin Panel Form Fields**:
   - Certificate Name (text input)
   - Certificate Image (file upload)
   - Issuer (text input)
   - Year (date picker or text input)
   - Description (textarea)
   - Alt Text (text input)

## Section Configuration

The section appearance can be customized via `certificatesSectionConfig`:

```typescript
export const certificatesSectionConfig = {
  title: 'Our Certifications',           // Section title
  subtitle: 'Recognized for Excellence',  // Section subtitle
  showYear: true,                        // Show year on certificates
  showDescription: false,                // Show description on certificates
};
```

## Image Requirements

- **Recommended Size**: 400x300px or 3:2 aspect ratio
- **Format**: JPG, PNG, or WebP
- **File Size**: Optimize images to reduce load time
- **Storage**: Can be stored in:
  - `/public/certificates/` folder (for static files)
  - CDN/Cloud Storage (for dynamic uploads)
  - External URLs

## Helper Functions

The data file includes helper functions for admin panel integration:

```typescript
// Get all certificates
getCertificates(): Certificate[]

// Get certificate by ID
getCertificateById(id: string): Certificate | undefined
```

## Usage in Components

```tsx
import CertificatesSection from './components/commons/CertificatesSection';
import { certificatesData } from './components/commons/certificatesData';

// Use default data
<CertificatesSection />

// Use custom data
<CertificatesSection 
  certificates={customCertificates}
  title="Custom Title"
  subtitle="Custom Subtitle"
  showYear={true}
  showDescription={true}
/>
```

## Admin Panel Integration Checklist

- [ ] Create API endpoint for CRUD operations
- [ ] Implement file upload for certificate images
- [ ] Add form validation
- [ ] Create admin UI for managing certificates
- [ ] Add image optimization/resizing
- [ ] Implement caching for better performance
- [ ] Add preview functionality
- [ ] Implement drag-and-drop reordering

## Notes

- Certificate images should be optimized for web
- Use descriptive alt text for accessibility
- Keep certificate IDs unique
- Consider adding expiration dates for time-sensitive certifications
- Add sorting/ordering functionality if needed

