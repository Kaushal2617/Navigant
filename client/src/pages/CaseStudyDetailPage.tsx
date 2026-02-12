import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import DotGrid from '../components/commons/DotGrid';
import { getCaseStudyById, type CaseStudy } from '../services/caseStudiesApi';

const CaseStudyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [caseStudy, setCaseStudy] = React.useState<CaseStudy | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!id) {
      setError('No case study ID provided');
      setLoading(false);
      return;
    }

    // Fetch the case study from API
    const fetchCaseStudy = async () => {
      try {
        const response = await getCaseStudyById(id);
        setCaseStudy(response.data || null);
      } catch (err) {
        console.error('Failed to fetch case study:', err);
        setError('Failed to load case study');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudy();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <AppLayout>
        <section className="relative pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-20 bg-gradient-to-br from-white via-gray-50/50 to-white overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-solid border-[#CA1411] border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading case study...</p>
            </div>
          </div>
        </section>
      </AppLayout>
    );
  }

  // Error or not found state
  if (!caseStudy || error) {
    return (
      <AppLayout>
        <section className="relative pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-20 bg-gradient-to-br from-white via-gray-50/50 to-white overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="text-center py-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Case Study Not Found</h1>
              <p className="text-gray-600 mb-8">{error || "The case study you're looking for doesn't exist."}</p>
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
            <div
              className="text-lg md:text-xl text-gray-700 leading-relaxed prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: caseStudy.description }}
            />
          </div>

          {/* Full Content */}
          {/* Full Content */}
          {caseStudy.fullContent && (
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-6 prose-h3:text-xl prose-h3:md:text-2xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-li:text-gray-700 prose-ul:ml-6 prose-ul:list-disc prose-strong:text-gray-900 prose-strong:font-bold"
              dangerouslySetInnerHTML={{ __html: caseStudy.fullContent }}
            />
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

