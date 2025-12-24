import React, { useState, useEffect } from 'react';
import { teamMembersData, teamMembersSectionConfig, type TeamMember } from './teamMembersData';
import { getActiveTeamMembers, type TeamMember as ApiTeamMember } from '../../services/teamApi';
import DotGrid from './DotGrid';

interface TeamMembersSectionProps {
  teamMembers?: TeamMember[];
  title?: string;
  subtitle?: string;
  initialCount?: number;
  teamPageLink?: string;
  useApi?: boolean; // Flag to enable/disable API calls
}

const TeamMembersSection: React.FC<TeamMembersSectionProps> = ({
  teamMembers: propTeamMembers,
  title = teamMembersSectionConfig.title,
  subtitle = teamMembersSectionConfig.subtitle,
  initialCount = 3,
  teamPageLink = '/team',
  useApi = false, // Default to false (use mock data) until backend API is ready
}) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(propTeamMembers || teamMembersData);
  const [loading, setLoading] = useState(useApi);

  // Fetch team members from API if useApi is true
  useEffect(() => {
    if (useApi && !propTeamMembers) {
      const fetchTeamMembers = async () => {
        setLoading(true);
        try {
          const response = await getActiveTeamMembers();
          if (response.success && response.data) {
            // Map API response to component format
            const mappedMembers: TeamMember[] = response.data.map((member: ApiTeamMember) => ({
              id: member.id,
              name: member.name,
              designation: member.designation,
              image: member.image,
              bio: member.bio,
              email: member.email,
              linkedin: member.linkedin,
              alt: member.alt,
            }));
            setTeamMembers(mappedMembers);
          } else {
            // Fallback to local data if API fails
            console.warn('Failed to fetch team members from API, using fallback data');
            setTeamMembers(teamMembersData);
          }
        } catch (error) {
          console.error('Error fetching team members:', error);
          // Fallback to local data on error
          setTeamMembers(teamMembersData);
        } finally {
          setLoading(false);
        }
      };

      fetchTeamMembers();
    } else if (propTeamMembers) {
      setTeamMembers(propTeamMembers);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [useApi, propTeamMembers]);

  const displayedMembers = teamMembers.slice(0, initialCount);
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden">
      {/* DotGrid Background */}
      <div className="absolute inset-0 pointer-events-none">
        <DotGrid
          dotSize={12}
          gap={40}
          baseColor="#E5E7EB"
          activeColor="#CA1411"
          proximity={120}
          speedTrigger={80}
          shockRadius={200}
          shockStrength={4}
          maxSpeed={4000}
          resistance={800}
          returnDuration={1.2}
          className="opacity-40"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 leading-[1.1] sm:leading-tight px-4 sm:px-0">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
              {subtitle}
            </p>
          )}
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 lg:gap-10">
          {displayedMembers.map((member, index) => (
            <div
              key={member.id}
              className="group perspective-1000"
              style={{
                animationDelay: `${index * 0.1}s`,
                perspective: '1000px',
              }}
            >
              {/* Flip Card Container */}
              <div className="relative w-full h-[400px] sm:h-[450px] flip-card-container">
                {/* Front Side - Image with Designation */}
                <div className="absolute inset-0 w-full h-full flip-card-front rounded-3xl overflow-hidden">
                  <div
                    className="relative h-full rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-lg"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    }}
                  >
                    {/* Image */}
                    <div className="relative h-[280px] sm:h-[320px] md:h-[350px] overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.alt || `${member.name} - ${member.designation}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/400x400/E5E7EB/6B7280?text=${encodeURIComponent(member.name)}`;
                        }}
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    </div>

                    {/* Designation */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 bg-gradient-to-t from-white via-white to-transparent">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-xs sm:text-sm text-[#CA1411] font-semibold">{member.designation}</p>
                    </div>
                  </div>
                </div>

                {/* Back Side - Bio Information */}
                <div className="absolute inset-0 w-full h-full flip-card-back rounded-3xl overflow-hidden">
                  <div
                    className="relative h-full rounded-3xl overflow-hidden p-5 sm:p-6 md:p-8 flex flex-col justify-between"
                    style={{
                      background: 'linear-gradient(135deg, rgba(202, 20, 17, 0.95), rgba(180, 15, 12, 0.95))',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    }}
                  >
                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{member.name}</h3>
                      <p className="text-white/90 font-semibold mb-4 sm:mb-5 md:mb-6 text-base sm:text-lg">{member.designation}</p>
                      {member.bio && (
                        <p className="text-white/80 text-sm sm:text-base leading-relaxed">{member.bio}</p>
                      )}
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-4 pt-6 border-t border-white/20">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                          aria-label={`Email ${member.name}`}
                        >
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                          aria-label={`${member.name}'s LinkedIn`}
                        >
                          <svg
                            className="w-5 h-5 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button - Redirects to Team Page */}
        {teamMembers.length > initialCount && (
          <div className="text-center mt-12 md:mt-16">
            <a
              href={teamPageLink}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#CA1411] hover:bg-[#B0120F] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 relative z-10"
              style={{ color: '#ffffff' }}
            >
              <span className="text-white" style={{ color: '#ffffff' }}>Show More</span>
              <svg
                className="w-5 h-5 text-white transform transition-transform duration-300 hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                style={{ color: '#ffffff' }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamMembersSection;

