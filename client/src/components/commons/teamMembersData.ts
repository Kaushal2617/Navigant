/**
 * Team Members Data
 * 
 * This file contains all team member information displayed on the website.
 * This data can be easily updated through an admin panel in the future.
 */

import type { TeamMember } from './TeamMembersSection';

// Team members data - can be updated through admin panel
export const teamMembersData: TeamMember[] = [
  {
    id: 'member-1',
    name: 'John Smith',
    designation: 'Chief Executive Officer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80',
    bio: 'With over 20 years of experience in business process outsourcing, John leads Navigant with a vision to transform how businesses operate globally.',
    email: 'john.smith@navigant.in',
    linkedin: 'https://linkedin.com/in/johnsmith',
    alt: 'John Smith - CEO',
  },
  {
    id: 'member-2',
    name: 'Sarah Johnson',
    designation: 'Chief Technology Officer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80',
    bio: 'Sarah brings innovative technology solutions to Navigant, driving digital transformation and automation across all service offerings.',
    email: 'sarah.johnson@navigant.in',
    linkedin: 'https://linkedin.com/in/sarahjohnson',
    alt: 'Sarah Johnson - CTO',
  },
  {
    id: 'member-3',
    name: 'Michael Chen',
    designation: 'Chief Operations Officer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80',
    bio: 'Michael ensures operational excellence across all Navigant delivery centers, maintaining the highest standards of quality and efficiency.',
    email: 'michael.chen@navigant.in',
    linkedin: 'https://linkedin.com/in/michaelchen',
    alt: 'Michael Chen - COO',
  },
  {
    id: 'member-4',
    name: 'Emily Davis',
    designation: 'Head of Client Relations',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&q=80',
    bio: 'Emily builds and maintains strong relationships with clients, ensuring their success and satisfaction with Navigant\'s services.',
    email: 'emily.davis@navigant.in',
    linkedin: 'https://linkedin.com/in/emilydavis',
    alt: 'Emily Davis - Head of Client Relations',
  },
  {
    id: 'member-5',
    name: 'David Wilson',
    designation: 'Director of BPO Services',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=80',
    bio: 'David oversees all BPO service delivery, ensuring clients receive exceptional support and value from Navigant\'s comprehensive solutions.',
    email: 'david.wilson@navigant.in',
    linkedin: 'https://linkedin.com/in/davidwilson',
    alt: 'David Wilson - Director of BPO Services',
  },
  {
    id: 'member-6',
    name: 'Lisa Anderson',
    designation: 'Head of Digital Solutions',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&q=80',
    bio: 'Lisa drives Navigant\'s digital transformation initiatives, helping clients leverage AI and automation to achieve operational excellence.',
    email: 'lisa.anderson@navigant.in',
    linkedin: 'https://linkedin.com/in/lisaanderson',
    alt: 'Lisa Anderson - Head of Digital Solutions',
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

