import { useEffect, useState } from 'react';
import {
    Box, Typography, Snackbar, Alert, Stack, Button, Link
} from '@mui/material';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import { useTheme, alpha } from '@mui/material/styles';
import AppSelect from '../components/AppSelect';
import AppTable, { StatusChip, type TableColumn } from '../components/AppTable';
import client from '../api/client';
import type { JobApplicationResponse } from '../api/types';

export default function Applications() {
    const theme = useTheme();
    const [applications, setApplications] = useState<JobApplicationResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

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
            id: 'jobPostId',
            label: 'Job ID',
            minWidth: 120,
            render: (row) => (
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                    {row.jobPostId?.slice(0, 8)}...
                </Typography>
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
            id: 'resumeUrl',
            label: 'Resume',
            align: 'center',
            minWidth: 80,
            render: (row) => (
                row.resumeUrl ? (
                    <Link
                        href={row.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            textDecoration: 'none',
                            fontWeight: 600,
                            color: theme.palette.primary.main,
                            '&:hover': { textDecoration: 'underline' },
                        }}
                    >
                        View
                    </Link>
                ) : (
                    <Typography variant="body2" color="text.disabled">
                        No Resume
                    </Typography>
                )
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
