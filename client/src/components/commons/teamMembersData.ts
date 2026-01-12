/**
 * Team Members Data
 * 
 * This file contains all team member information displayed on the website.
 * This data can be easily updated through an admin panel in the future.
 */

// Team Member interface
export interface TeamMember {
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

// Team members data - can be updated through admin panel
export const teamMembersData: TeamMember[] = [
  {
    id: 'member-1',
    name: 'Ankur Bhatia',
    designation: 'Chief Executive Officer',
    image: '/team-assets/ankur1.jpg',
    bio: 'As Founder and CEO of Navigant, Ankur leads the company’s vision, global strategy, and growth. A proven leader in building and mentoring high-performing teams, he continues to expand Navigant’s solutions and drive its position in the global outsourcing industry.',
    email: 'ankur@navigant.in',
    linkedin: 'https://www.linkedin.com/in/ankur-bhatia-navigant/',
    alt: 'Ankur Bhatia - CEO',
  },
  {
    id: 'member-2',
    name: 'Aditi Bhatia',
    designation: 'HR Director',
    image: '/team-assets/aditi2.jpeg',
    bio: 'As HR Director, Aditi leads end-to-end recruitment at Navigant and strengthens the alignment between performance management and employee development. She drives strategic HR initiatives to build a skilled internal talent pool and support Navigant’s growth in the global outsourcing industry.',
    email: 'aditi@navigant.in',
    linkedin: 'https://www.linkedin.com/in/aditi-bhatia-91b538219/',
    alt: 'Aditi Bhatia - HR Director',
  },
  {
    id: 'member-3',
    name: 'Anuradha Rajput',
    designation: 'General Manager',
    image: '/team-assets/anuradha.png',
    bio: 'With over 15+ years of experience, Anuradha Rajput, Assistant General Manager at Navigant, oversees business operations, goal setting, and workforce productivity. A B.Tech in Biotechnology, she brings strong analytical and strategic leadership to operations planning, performance improvement, and execution across Navigant Technologies.',
    email: 'anuradha.rajput@navigant.in',
    linkedin: 'https://www.linkedin.com/in/anuradha-rajput-b7b78322a/',
    alt: 'Anuradha Rajput - AGM',
  },
  {
    id: 'member-4',
    name: 'Sonal Arora',
    designation: 'Business Development',
    image: '/team-assets/sonal.png',
    bio: 'With over 15+ years of experience, Sonal leads the Marketing team at Navigant Technologies. Holding an MSc in Dietitian & Food Service Management, she excels in strategy development and problem-solving. Driven by continuous learning, she consistently exceeds client KPIs while delivering key marketing objectives.',
    email: 'sonal.arora@navigant.in',
    linkedin: 'https://www.linkedin.com/in/sonal-arora-400586219/',
    alt: 'Sonal Arora - Marketing Manager',
  },
  {
    id: 'member-5',
    name: 'Aditya Lal',
    designation: 'IT Manager',
    image: '/team-assets/aditya.jpeg',
    bio: 'Aditya, IT Manager at Navigant Technologies, leads IT services and strategic planning across infrastructure, enterprise reporting, telecommunications, and information security. With 18+ years of experience, he drives the organization’s technology direction through business planning, network security, and online operations.',
    email: 'aditya@navigant.in',
    linkedin: 'https://linkedin.com/in/davidwilson',
    alt: 'Aditya Lal- IT Manager',
  },
  {
    id: 'member-6',
    name: 'Gopal Prasad Sharma',
    designation: 'Finance Manager',
    image: '/team-assets/gopal.jpg',
    bio: 'Gopal, Finance Manager at Navigant, drives growth, savings, and profitability through strong financial leadership and accurate financial management. With 10+ years of experience, he is a semi-qualified Chartered Accountant (CA Final), DipIFRS certified, and pursuing ACCA (UK) DipIFRS and LLB, supporting Navigant’s growth with effective financial systems.',
    email: 'gopal.sharma@navigant.in',
    linkedin: 'https://www.linkedin.com/in/gopal-sharma-b6b49766/',
    alt: 'Gopal Prasad Sharma - Finance Manager',
  },
  {
    id: 'member-7',
    name: 'Bhavna Khatri',
    designation: 'HR Manager',
    image: '/team-assets/bhavna.jpeg',
    bio: 'With over 5+ years of experience at Navigant, Bhavna leads end-to-end recruitment, onboarding, and offboarding while effectively managing employee escalations and performance processes. She excels in strategic planning, event management, compliance, and office operations, building a strong internal talent pool to support Navigant’s growth in the global outsourcing industry.',
    email: 'bhawna.khatri@navigant.in',
    linkedin: 'https://www.linkedin.com/in/bhavna-khatri-now/',
    alt: 'Bhavna Khatri- HR Manager',
  },
  {
    id: 'member-8',
    name: 'Gulzar Khan',
    designation: 'Operations Manager',
    image: '/team-assets/gulzar2.jpeg',
    bio: 'Gulzar has 8+ years of experience in sales and customer support. Beginning as a Team Lead at Navigant, he built strong leadership and sales operations expertise. As Process Manager, he leads teams to achieve sales targets through process improvement and performance management.',
    email: 'Gulzar.khan@navigant.in',
    linkedin: 'https://www.linkedin.com/in/gulzar-khan-4518b2233/',
    alt: 'Gulzar khan- Operations Manager',
  },
  {
    id: 'member-9',
    name: 'Shivam Fouzdar',
    designation: 'Operations Manager',
    image: '/team-assets/shivam2.jpeg',
    bio: 'Shivam Fouzdar is an Operations Manager with 7+ years of experience, overseeing UK and US operations at Navigant. He leads high-performing teams, enhances sales and customer service excellence, improves CSAT and key operational metrics, and drives marketplace growth through process optimization and strong execution.',
    email: 'shivam.fouzdar@navigant.in',
    alt: 'Shivam Fouzdar- Operations Manager',
  },
  {
    id: 'member-10',
    name: 'Kaushal Kumar',
    designation: 'Software Developer',
    image: '/team-assets/kaushal.png',
    bio: 'Kaushal is a Software Developer at Navigant with expertise in full-stack and e-commerce development using MERN technologies. He contributes to scalable architectures, performance optimization, and user-centric features with a strong focus on quality and execution.',
    email: 'kaushal.kumar@navigantinc.com',
    linkedin: 'https://www.linkedin.com/feed/update/urn:li:activity:7272233659317796864/',
    alt: 'Kaushal Kumar- Software Developer',
  },
  {
    id: 'member-11',
    name: 'Asheesh Rathore',
    designation: 'Software Developer',
    image: '/team-assets/asheesh.png',
    bio: 'Asheesh is a Software Developer with expertise in Java backend systems. At Navigant, he designs, develops, tests, and deploys reliable backend solutions, supporting scalable architectures and consistent application performance.',
    email: 'asheesh.rathore@navigantinc.com',
    linkedin: 'https://www.linkedin.com/in/asheesh-rathore/',
    alt: 'Asheesh Rathore- Software Developer',
  },
];

// Section configuration
export const teamMembersSectionConfig = {
  title: 'Our Team Members!',
  subtitle: 'Our hardworking team is lead by innovative executives, uniquely suited to their positions, and dedicated to the success of the company. Meet them now!',
};

// Helper functions
export const getTeamMembers = (): TeamMember[] => {
  return teamMembersData;
};

export const getTeamMemberById = (id: string): TeamMember | undefined => {
  return teamMembersData.find(member => member.id === id);
};

