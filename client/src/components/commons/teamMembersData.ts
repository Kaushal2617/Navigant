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
    image: '/team/ankur1.jpg',
    bio: 'As Founder and CEO of Navigant, Ankur leads the company’s vision, global strategy, and growth. A proven leader in building and mentoring high-performing teams, he continues to expand Navigant’s solutions and drive its position in the global outsourcing industry.',
    email: 'ankur@navigant.in',
    linkedin: 'https://www.linkedin.com/in/ankur-bhatia-navigant/',
    alt: 'Ankur Bhatia - CEO',
  },
  {
    id: 'member-2',
    name: 'Aditi Bhatia',
    designation: 'HR Director',
    image: '/team/aditi2.jpeg',
    bio: 'As HR Director, Aditi leads end-to-end recruitment at Navigant and strengthens the alignment between performance management and employee development. She drives strategic HR initiatives to build a skilled internal talent pool and support Navigant’s growth in the global outsourcing industry.',
    email: 'aditi@navigant.in',
    linkedin: 'https://www.linkedin.com/in/aditi-bhatia-91b538219/',
    alt: 'Aditi Bhatia - HR Director',
  },
  {
    id: 'member-3',
    name: 'Sonal Arora',
    designation: 'Sr. Marketing Manager',
    image: '/team/sonal.jpg',
    bio: 'With over 11 years+ of experience, Sonal leads the Marketing team at Navigant Technologies. Holding an MSc in Dietitian & Food Service Management, she excels in strategy development and problem-solving. Driven by continuous learning, she consistently exceeds client KPIs while delivering key marketing objectives.',
    email: 'sonal.arora@navigant.in',
    linkedin: 'https://www.linkedin.com/in/sonal-arora-0b951725/',
    alt: 'Sonal Arora - Marketing Manager',
  },
  {
    id: 'member-4',
    name: 'Anuradha Rajput',
    designation: 'Asst. General Manager',
    image: '/team/anuradha.jpg',
    bio: 'With over 12 years+ of experience, Anuradha Rajput, Assistant General Manager at Navigant, oversees business operations, goal setting, and workforce productivity. A B.Tech in Biotechnology, she brings strong analytical and strategic leadership to operations planning, performance improvement, and execution across Navigant Technologies.',
    email: 'anuradha.rajput@navigant.in',
    linkedin: 'https://www.linkedin.com/in/anuradha-rajput-b7b78322a/',
    alt: 'Anuradha Rajput - AGM',
  },
  {
    id: 'member-5',
    name: 'Aditya Lal',
    designation: 'IT Manager',
    image: '/team/aditya.jpg',
    bio: 'Aditya, IT Manager at Navigant Technologies, leads IT services and strategic planning across infrastructure, enterprise reporting, telecommunications, and information security. With 18+ years of experience, he drives the organization’s technology direction through business planning, network security, and online operations.',
    email: 'aditya@navigant.in',
    linkedin: 'https://linkedin.com/in/davidwilson',
    alt: 'Aditya Lal- IT Manager',
  },
  {
    id: 'member-6',
    name: 'Gopal Prasad Sharma',
    designation: 'Finance Manager',
    image: '/team/gopal.jpg',
    bio: 'Gopal, Finance Manager at Navigant, drives growth, savings, and profitability through strong financial leadership and accurate financial management. With 10+ years of experience, he is a semi-qualified Chartered Accountant (CA Final), DipIFRS certified, and pursuing ACCA (UK) DipIFRS and LLB, supporting Navigant’s growth with effective financial systems.',
    email: 'gopal.sharma@navigant.in',
    linkedin: 'https://www.linkedin.com/in/gopal-sharma-b6b49766/',
    alt: 'Gopal Prasad Sharma - Finance Manager',
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

