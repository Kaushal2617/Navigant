import React, { useEffect } from 'react';
import type { CaseStudy } from './caseStudiesData';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: CaseStudy | null;
}

// Add keyframe animations
const modalStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;

const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ isOpen, onClose, caseStudy }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !caseStudy) return null;

  return (
    <>
      <style>{modalStyles}</style>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
        style={{ animation: 'fadeIn 0.3s ease-out' }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
        onClick={onClose}
      >
        <div
          className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden pointer-events-auto"
          style={{ animation: 'modalSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Image */}
          <div className="relative">
            <div className="relative h-48 md:h-64 overflow-hidden">
              <img
                src={caseStudy.image}
                alt={caseStudy.alt || caseStudy.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://via.placeholder.com/800x400/E5E7EB/6B7280?text=${encodeURIComponent(caseStudy.title)}`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {caseStudy.category && (
                    <span className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-[#CA1411]/90 backdrop-blur-sm mb-3">
                      {caseStudy.category}
                    </span>
                  )}
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                    {caseStudy.title}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:rotate-90 flex-shrink-0"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-300px)]">
            <div className="prose prose-lg max-w-none">
              {caseStudy.fullContent ? (
                <div className="text-gray-700 leading-relaxed space-y-4">
                  {caseStudy.fullContent.split('\n\n').map((paragraph, index) => {
                    const trimmedParagraph = paragraph.trim();
                    if (!trimmedParagraph) return null;
                    
                    // Check if paragraph is a heading (single line, all caps or title case, no punctuation)
                    const lines = trimmedParagraph.split('\n');
                    const isHeading = lines.length === 1 && 
                      (trimmedParagraph === trimmedParagraph.toUpperCase() || 
                       /^[A-Z][a-zA-Z\s]+$/.test(trimmedParagraph)) &&
                      !trimmedParagraph.includes('.') && 
                      !trimmedParagraph.includes(':') &&
                      trimmedParagraph.length < 50;
                    
                    if (isHeading) {
                      return (
                        <h3 key={index} className="text-xl md:text-2xl font-bold text-gray-900 mt-8 mb-4 first:mt-0">
                          {trimmedParagraph}
                        </h3>
                      );
                    }
                    
                    // Check if it's a bullet point list
                    if (trimmedParagraph.startsWith('•') || trimmedParagraph.startsWith('-')) {
                      const items = trimmedParagraph.split(/\n(?=[•-])/).filter(item => item.trim());
                      return (
                        <ul key={index} className="list-disc list-inside space-y-2 mb-4 ml-4">
                          {items.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-base md:text-lg leading-relaxed">
                              {item.replace(/^[•-]\s*/, '')}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    
                    return (
                      <p key={index} className="text-base md:text-lg leading-relaxed mb-4">
                        {trimmedParagraph.split('\n').map((line, lineIndex, array) => (
                          <React.Fragment key={lineIndex}>
                            {line.trim()}
                            {lineIndex < array.length - 1 && line.trim() && <br />}
                          </React.Fragment>
                        ))}
                      </p>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">{caseStudy.description}</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#CA1411] text-white font-semibold rounded-lg hover:bg-[#B0120F] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseStudyModal;

