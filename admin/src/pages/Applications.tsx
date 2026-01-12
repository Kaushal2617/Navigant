import { useEffect, useState } from 'react';
import {
    Box, Typography, Snackbar, Alert, Stack, Button, IconButton, Tooltip
} from '@mui/material';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useTheme, alpha } from '@mui/material/styles';
import AppSelect from '../components/AppSelect';
import AppModal from '../components/AppModal';
import AppTable, { StatusChip, type TableColumn } from '../components/AppTable';
import client from '../api/client';
import type { JobApplicationResponse } from '../api/types';

export default function Applications() {
    const theme = useTheme();
    const [applications, setApplications] = useState<JobApplicationResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState<JobApplicationResponse | null>(null);

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const res = await client.get<JobApplicationResponse[]>('/admin/applications');
            setApplications(res.data);
        } catch (error) {
            console.error("Failed to fetch applications", error);
            setSnackbar({ open: true, message: 'Failed to fetch applications', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            await client.patch(`/admin/applications/${id}/status`, { status: newStatus });
            setApplications(apps => apps.map(app =>
                app.id === id ? { ...app, status: newStatus } : app
            ));
            setSnackbar({ open: true, message: 'Application status updated', severity: 'success' });
        } catch (error: any) {
            console.error("Failed to update status", error);
            const msg = error.response?.data?.detail || 'Failed to update status';
            setSnackbar({ open: true, message: msg, severity: 'error' });
        }
    };

    const handleExport = async () => {
        try {
            const response = await client.get('/admin/applications/export', {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'applications.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Failed to export applications", error);
            setSnackbar({ open: true, message: 'Failed to export applications', severity: 'error' });
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this application? This action cannot be undone.')) {
            return;
        }
        try {
            await client.delete(`/admin/applications/${id}`);
            setApplications(apps => apps.filter(app => app.id !== id));
            setSnackbar({ open: true, message: 'Application deleted successfully', severity: 'success' });
            if (selectedApplication?.id === id) {
                setViewModalOpen(false);
                setSelectedApplication(null);
            }
        } catch (error: any) {
            console.error("Failed to delete application", error);
            const msg = error.response?.data?.detail || 'Failed to delete application';
            setSnackbar({ open: true, message: msg, severity: 'error' });
        }
    };

    const handleView = (application: JobApplicationResponse) => {
        setSelectedApplication(application);
        setViewModalOpen(true);
    };

    const handleDownloadResume = () => {
        if (selectedApplication?.resumeUrl) {
            window.open(selectedApplication.resumeUrl, '_blank');
        }
    };

    // Table columns definition
    const columns: TableColumn<JobApplicationResponse>[] = [
        {
            id: 'applicantName',
            label: 'Applicant',
            minWidth: 160,
            render: (row) => (
                <Box>
                    <Typography variant="body2" fontWeight={600}>{row.applicantName}</Typography>
                    <Typography variant="caption" color="text.secondary">{row.applicantEmail}</Typography>
                </Box>
            ),
        },
        {
            id: 'applicantPhone',
            label: 'Phone',
            minWidth: 120,
            render: (row) => (
                <Typography variant="body2">{row.applicantPhone || '-'}</Typography>
            ),
        },
        {
            id: 'jobTitle',
            label: 'Job Post',
            minWidth: 180,
            render: (row) => (
                <Box>
                    <Typography variant="body2" fontWeight={600}>{row.jobTitle || 'Unknown Job'}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                        ID: {row.jobPostId}
                    </Typography>
                </Box>
            ),
        },
        {
            id: 'appliedAt',
            label: 'Applied Date',
            minWidth: 100,
            render: (row) => (
                <Typography variant="body2" color="text.secondary">
                    {new Date(row.appliedAt).toLocaleDateString()}
                </Typography>
            ),
        },
        {
            id: 'status',
            label: 'Status',
            minWidth: 140,
            render: (row) => (
                <AppSelect
                    value={row.status || 'NEW'}
                    onChange={(val) => handleStatusChange(row.id, val)}
                    options={[
                        { label: 'New', value: 'NEW' },
                        { label: 'Reviewed', value: 'REVIEWED' },
                        { label: 'Shortlisted', value: 'SHORTLISTED' },
                        { label: 'Interview', value: 'INTERVIEW' },
                        { label: 'Offered', value: 'OFFERED' },
                        { label: 'Hired', value: 'HIRED' },
                        { label: 'Rejected', value: 'REJECTED' }
                    ]}
                />
            ),
        },
        {
            id: 'actions',
            label: 'Actions',
            align: 'center',
            minWidth: 120,
            render: (row) => (
                <Stack direction="row" justifyContent="center" spacing={1}>
                    <Tooltip title="View Details" arrow>
                        <IconButton
                            size="small"
                            onClick={() => handleView(row)}
                            sx={{
                                color: theme.palette.primary.main,
                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.2) }
                            }}
                        >
                            <VisibilityRoundedIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title={row.resumeUrl ? "Download Resume" : "No Resume"} arrow>
                        <span>
                            <IconButton
                                size="small"
                                onClick={() => row.resumeUrl && window.open(row.resumeUrl, '_blank')}
                                disabled={!row.resumeUrl}
                                sx={{
                                    color: theme.palette.secondary.main,
                                    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                                    '&:hover': { backgroundColor: alpha(theme.palette.secondary.main, 0.2) },
                                    '&.Mui-disabled': { backgroundColor: 'transparent' }
                                }}
                            >
                                <CloudDownloadRoundedIcon fontSize="small" />
                            </IconButton>
                        </span>
                    </Tooltip>

                    <Tooltip title="Delete Application" arrow>
                        <IconButton
                            size="small"
                            onClick={() => handleDelete(row.id)}
                            sx={{
                                color: theme.palette.error.main,
                                backgroundColor: alpha(theme.palette.error.main, 0.1),
                                '&:hover': { backgroundColor: alpha(theme.palette.error.main, 0.2) }
                            }}
                        >
                            <DeleteRoundedIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Stack>
            ),
        },
    ];

    return (
        <Box>
            {/* Header */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Box>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Applications
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Review and manage job applications
                    </Typography>
                </Box>
                <Button
                    variant="outlined"
                    startIcon={<DescriptionRoundedIcon />}
                    onClick={handleExport}
                    sx={{
                        borderWidth: '1.5px',
                        '&:hover': { borderWidth: '1.5px' },
                    }}
                >
                    Export CSV
                </Button>
            </Stack>

            {/* Table */}
            <AppTable
                columns={columns}
                data={applications}
                keyExtractor={(row) => row.id}
                loading={loading}
                emptyIcon={<DescriptionRoundedIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />}
                emptyTitle="No applications yet"
                emptySubtitle="Applications will appear here when candidates apply for jobs"
            />

            {/* View Details Modal */}
            <AppModal
                open={viewModalOpen}
                onClose={() => setViewModalOpen(false)}
                title="Application Details"
                maxWidth="sm"
                onSubmit={() => setViewModalOpen(false)} // Just close on primary action for now, or use secondary action
                submitLabel="Close"
            >
                {selectedApplication && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {/* Status Badge */}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <StatusChip label={selectedApplication.status || 'NEW'} />
                        </Box>

                        {/* Applicant Information */}
                        <Box>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 700,
                                    mb: 1.5,
                                    color: theme.palette.primary.main,
                                    letterSpacing: '0.05em',
                                    textTransform: 'uppercase',
                                    fontSize: '0.7rem',
                                }}
                            >
                                Applicant Information
                            </Typography>
                            <Box sx={{
                                p: 2.5,
                                borderRadius: 3,
                                backgroundColor: '#F8FAFC',
                                border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                            }}>
                                <Box sx={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 1.5, alignItems: 'center' }}>
                                    <Typography variant="body2" color="text.secondary" fontWeight={500}>Name</Typography>
                                    <Typography variant="body1" fontWeight={600}>{selectedApplication.applicantName}</Typography>
                                    <Typography variant="body2" color="text.secondary" fontWeight={500}>Email</Typography>
                                    <Typography variant="body1" sx={{ wordBreak: 'break-all' }}>{selectedApplication.applicantEmail}</Typography>
                                    <Typography variant="body2" color="text.secondary" fontWeight={500}>Phone</Typography>
                                    <Typography variant="body1">{selectedApplication.applicantPhone}</Typography>
                                </Box>
                            </Box>
                        </Box>

                        {/* Job Details */}
                        <Box>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 700,
                                    mb: 1.5,
                                    color: theme.palette.primary.main,
                                    letterSpacing: '0.05em',
                                    textTransform: 'uppercase',
                                    fontSize: '0.7rem',
                                }}
                            >
                                Application Details
                            </Typography>
                            <Box sx={{
                                p: 2.5,
                                borderRadius: 3,
                                backgroundColor: '#F8FAFC',
                                border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                            }}>
                                <Box sx={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 1.5, alignItems: 'center' }}>
                                    <Typography variant="body2" color="text.secondary" fontWeight={500}>Job Post</Typography>
                                    <Box>
                                        <Typography variant="body1" fontWeight={600}>{selectedApplication.jobTitle || 'Unknown Job'}</Typography>
                                        <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                                            ID: {selectedApplication.jobPostId}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" fontWeight={500}>Applied On</Typography>
                                    <Typography variant="body1">{new Date(selectedApplication.appliedAt).toLocaleString()}</Typography>
                                </Box>
                            </Box>
                        </Box>

                        {/* Cover Letter */}
                        {selectedApplication.coverLetter && (
                            <Box>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 1.5,
                                        color: '#D97706',
                                        letterSpacing: '0.05em',
                                        textTransform: 'uppercase',
                                        fontSize: '0.7rem',
                                    }}
                                >
                                    Cover Letter
                                </Typography>
                                <Box sx={{
                                    p: 2.5,
                                    borderRadius: 3,
                                    backgroundColor: alpha('#F59E0B', 0.08),
                                    border: `1px solid ${alpha('#F59E0B', 0.2)}`,
                                }}>
                                    <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>
                                        {selectedApplication.coverLetter}
                                    </Typography>
                                </Box>
                            </Box>
                        )}

                        {/* Resume Download */}
                        {selectedApplication.resumeUrl && (
                            <Box sx={{ pt: 1 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={handleDownloadResume}
                                    startIcon={<DescriptionRoundedIcon />}
                                    sx={{
                                        py: 1.5,
                                        borderRadius: 2,
                                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
                                    }}
                                >
                                    Download Resume
                                </Button>
                            </Box>
                        )}
                    </Box>
                )}
            </AppModal>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{
                        width: '100%',
                        borderRadius: 3,
                        boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                    }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
