/**
 * Testimonials Data
 * 
 * This file contains all client testimonials with ratings displayed on the website.
 */

export interface TestimonialWithRating {
  id: string;
  name: string;
  content: string;
  avatar?: string;
  rating: number; // Rating from 1 to 5
}

// Testimonials data with ratings
export const testimonialsData: TestimonialWithRating[] = [
  {
    id: 'testimonial-1',
    name: 'Frank Goodman',
    content: 'Navigant Technologies runs our customer service, technical support and field support services including installation of GPS devices and provides us with an excellent service. Their team is professional, responsive, and always goes above and beyond.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80',
  },
  {
    id: 'testimonial-2',
    name: 'Deepak Sharma',
    content: 'Navigant Technologies converts our Web leads into sales. Also manages our back office support. Navigant has a track record for meeting the targets accurately and never missed the targets. We are very happy with their Call Center / BPO services. Excellent Job done Navigant Team!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80',
  },
  {
    id: 'testimonial-3',
    name: 'Sarah Johnson',
    content: 'Working with Navigant has been a game-changer for our business. Their BPO services have significantly improved our operational efficiency. The team is knowledgeable, dedicated, and always delivers on time.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80',
  },
  {
    id: 'testimonial-4',
    name: 'Michael Chen',
    content: 'Navigant Technologies has been our trusted partner for over 3 years. Their customer service excellence and technical expertise have helped us scale our operations seamlessly. Highly recommended!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=80',
  },
  {
    id: 'testimonial-5',
    name: 'Emily Davis',
    content: 'The quality of service from Navigant is outstanding. They understand our business needs and provide customized solutions that drive results. Their team is proactive and always ready to help.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&q=80',
  },
  {
    id: 'testimonial-6',
    name: 'Robert Williams',
    content: 'Navigant Technologies has transformed our customer support operations. Their innovative approach and commitment to excellence have made them an invaluable partner. We couldn\'t be happier with the results.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&q=80',
  },
  {
    id: 'testimonial-7',
    name: 'Lisa Anderson',
    content: 'Outstanding service and support from Navigant. Their team is professional, efficient, and always delivers beyond expectations. They have become an integral part of our success story.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&q=80',
  },
  {
    id: 'testimonial-8',
    name: 'David Martinez',
    content: 'Navigant Technologies provides exceptional BPO services. Their technical expertise and customer-centric approach have helped us achieve our business goals. A reliable and trustworthy partner.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&q=80',
  },
];

// Section configuration
export const testimonialsSectionConfig = {
  title: 'What Our Clients Say',
  subtitle: 'Don\'t just take our word for it. Here\'s what our clients have to say about working with Navigant Technologies.',
};

