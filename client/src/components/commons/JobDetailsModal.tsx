import React, { useEffect, useRef } from 'react';
import type { Job } from '../../services/careersApi';

interface JobDetailsModalProps {
    open: boolean;
    onClose: () => void;
    job: Job | null;
    onApply: (job: Job) => void;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ open, onClose, job, onApply }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (open) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [open, onClose]);

    // Prevent background scroll when open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [open]);


    if (!open || !job) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                ref={modalRef}
                className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            >
                {/* Header */}
                <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-6 sm:p-8 text-white shrink-0">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                        aria-label="Close modal"
                    >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="pr-10">
                        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-red-200 bg-red-500/20 border border-red-500/30 rounded-full">
                            {job.type}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                            {job.title}
                        </h2>

                        <div className="flex flex-wrap gap-x-6 gap-y-3 text-slate-300 text-sm">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                {job.department}
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {job.location}
                            </div>
                            {job.salaryRange && (
                                <div className="flex items-center gap-2 text-green-400 font-medium">
                                    <span className="text-lg">💰</span>
                                    {job.salaryRange}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Scrollable Body */}
                <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
                    <div className="space-y-8">
                        {/* Description */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Role Overview</h3>
                            <div
                                className="prose prose-sm max-w-none text-gray-600 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1"
                                dangerouslySetInnerHTML={{ __html: job.description }}
                            />
                        </div>

                        {/* Requirements */}
                        {job.requirements && (
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Requirements</h3>
                                <div
                                    className="prose prose-sm max-w-none text-gray-700 [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1"
                                    dangerouslySetInnerHTML={{ __html: job.requirements }}
                                />
                            </div>
                        )}

                        {/* Responsibilities */}
                        {job.responsibilities && (
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Key Responsibilities</h3>
                                <div
                                    className="prose prose-sm max-w-none text-gray-600 [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_li]:marker:text-green-500"
                                    dangerouslySetInnerHTML={{ __html: job.responsibilities }}
                                />
                            </div>
                        )}
                        {/* Old Grid logic removed in favor of rich text content */}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
                    <div className="flex gap-4 text-xs text-gray-500 font-medium">
                        {job.createdAt && (
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Posted: {new Date(job.createdAt).toLocaleDateString()}
                            </span>
                        )}
                        {job.experience && job.experience !== 'Not specified' && (
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {job.experience} Exp
                            </span>
                        )}
                    </div>

                    <div className="flex gap-3 w-full sm:w-auto">
                        <button
                            onClick={onClose}
                            className="flex-1 sm:flex-none px-6 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            Close
                        </button>
                        <button
                            onClick={() => onApply(job)}
                            className="flex-1 sm:flex-none px-6 py-2.5 bg-[#CA1411] hover:bg-[#B0120F] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                        >
                            Apply Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetailsModal;
