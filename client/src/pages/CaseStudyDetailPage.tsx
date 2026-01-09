import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import DotGrid from '../components/commons/DotGrid';
import { caseStudiesData, type CaseStudy } from '../components/commons/caseStudiesData';

const CaseStudyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [caseStudy, setCaseStudy] = React.useState<CaseStudy | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Find the case study by ID
    const found = caseStudiesData.find(cs => cs.id === id);
    if (found) {
      setCaseStudy(found);
    }
  }, [id]);

  if (!caseStudy) {
    return (
      <AppLayout>
        <section className="relative pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-20 bg-gradient-to-br from-white via-gray-50/50 to-white overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="text-center py-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Case Study Not Found</h1>
              <p className="text-gray-600 mb-8">The case study you're looking for doesn't exist.</p>
              <Link
                to="/explore/case-studies"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#CA1411] hover:bg-[#B0120F] text-white font-semibold rounded-lg transition-all duration-300"
              >
                <span>Back to Case Studies</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-28 lg:pt-32 pb-8 md:pb-10 bg-gradient-to-br from-white via-gray-50/50 to-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
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
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-[#CA1411] transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Case Studies</span>
            </button>
          </div>

          {/* Hero Image */}
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden mb-8 shadow-xl">
            <img
              src={caseStudy.image}
              alt={caseStudy.alt || caseStudy.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://via.placeholder.com/1200x600/E5E7EB/6B7280?text=${encodeURIComponent(caseStudy.title)}`;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            
            {/* Category Badge */}
            {caseStudy.category && (
              <div className="absolute top-6 left-6">
                <span
                  className="px-4 py-2 rounded-full text-sm font-semibold text-white backdrop-blur-md"
                  style={{
                    background: 'linear-gradient(135deg, rgba(202, 20, 17, 0.9), rgba(202, 20, 17, 0.7))',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  {caseStudy.category}
                </span>
              </div>
            )}

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {caseStudy.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-6 md:py-8 lg:py-10 bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
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
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          {/* Short Description */}
          <div className="mb-8">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              {caseStudy.description}
            </p>
          </div>

          {/* Full Content */}
          {caseStudy.fullContent ? (
            <div className="prose prose-lg max-w-none">
              {caseStudy.fullContent.split('\n').map((paragraph, pIdx) => {
                if (paragraph.trim() === '') return null;
                
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={pIdx} className="text-xl md:text-2xl font-bold text-gray-900 mt-8 mb-4">
                      {paragraph.substring(4)}
                    </h3>
                  );
                }
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={pIdx} className="text-2xl md:text-3xl font-bold text-gray-900 mt-10 mb-6">
                      {paragraph.substring(3)}
                    </h2>
                  );
                }
                if (paragraph.startsWith('- ')) {
                  return (
                    <li key={pIdx} className="text-gray-700 ml-6 list-disc mb-2">
                      {paragraph.substring(2)}
                    </li>
                  );
                }
                return (
                  <p key={pIdx} className="text-gray-700 leading-relaxed mb-6 text-base md:text-lg">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          ) : (
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6 text-base md:text-lg">
                {caseStudy.description}
              </p>
            </div>
          )}

          {/* Back Button */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              to="/explore/case-studies"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#CA1411] hover:bg-[#B0120F] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              style={{ color: '#ffffff' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" style={{ color: '#ffffff' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span style={{ color: '#ffffff' }}>Back to All Case Studies</span>
            </Link>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default CaseStudyDetailPage;

