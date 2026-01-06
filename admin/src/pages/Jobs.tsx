import { useEffect, useState } from 'react';
import {
    Box, Typography, Button, TextField, Stack, Snackbar, Alert
} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { alpha, useTheme } from '@mui/material/styles';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import client from '../api/client';
import type { JobPostDTO } from '../api/types';
import AppSelect from '../components/AppSelect';
import AppModal from '../components/AppModal';
import AppTable, { StatusChip, TableActions, type TableColumn } from '../components/AppTable';

export default function Jobs() {
    const theme = useTheme();
    const [jobs, setJobs] = useState<JobPostDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [currentJob, setCurrentJob] = useState<Partial<JobPostDTO>>({});
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const res = await client.get<JobPostDTO[]>('/jobs/admin');
            setJobs(res.data);
        } catch (error) {
            console.error("Failed to fetch jobs", error);
            setSnackbar({ open: true, message: 'Failed to fetch jobs', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleOpen = (job?: JobPostDTO) => {
        if (job) {
            setIsEdit(true);
            const formattedJob = { ...job };
            if (job.expiresAt) {
                formattedJob.expiresAt = job.expiresAt.slice(0, 16);
            }
            setCurrentJob(formattedJob);
        } else {
            setIsEdit(false);
            setCurrentJob({ status: 'DRAFT', jobType: 'FULL_TIME' });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentJob({});
    };

    const handleSubmit = async () => {
        try {
            const payload = { ...currentJob };
            if (payload.expiresAt && !payload.expiresAt.endsWith('Z')) {
                payload.expiresAt = new Date(payload.expiresAt).toISOString();
            }

            if (isEdit && payload.id) {
                await client.put(`/jobs/${payload.id}`, payload);
                setSnackbar({ open: true, message: 'Job updated successfully', severity: 'success' });
            } else {
                await client.post('/jobs', payload);
                setSnackbar({ open: true, message: 'Job created successfully', severity: 'success' });
            }
            fetchJobs();
            handleClose();
        } catch (error: any) {
            console.error("Failed to save job", error);
            const msg = error.response?.data?.detail || 'Failed to save job';
            setSnackbar({ open: true, message: msg, severity: 'error' });
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure?")) {
            try {
                await client.delete(`/jobs/${id}`);
                fetchJobs();
                setSnackbar({ open: true, message: 'Job deleted successfully', severity: 'success' });
            } catch (error: any) {
                console.error("Failed to delete job", error);
                const msg = error.response?.data?.detail || 'Failed to delete job';
                setSnackbar({ open: true, message: msg, severity: 'error' });
            }
        }
    };

    // Table columns definition
    const columns: TableColumn<JobPostDTO>[] = [
        {
            id: 'title',
            label: 'Title',
            minWidth: 200,
            render: (row) => (
                <Typography variant="body2" fontWeight={600}>
                    {row.title}
                </Typography>
            ),
        },
        {
            id: 'location',
            label: 'Location',
            minWidth: 120,
            render: (row) => (
                <Typography variant="body2" color="text.secondary">
                    {row.location}
                </Typography>
            ),
        },
        {
            id: 'jobType',
            label: 'Type',
            minWidth: 100,
            render: (row) => <StatusChip label={row.jobType || 'N/A'} />,
        },
        {
            id: 'status',
            label: 'Status',
            minWidth: 100,
            render: (row) => <StatusChip label={row.status || 'DRAFT'} />,
        },
        {
            id: 'actions',
            label: 'Actions',
            align: 'center',
            minWidth: 100,
            render: (row) => (
                <TableActions
                    onEdit={() => handleOpen(row)}
                    onDelete={() => handleDelete(row.id!)}
                />
            ),
        },
    ];

    return (
        <Box>
            {/* Header */}
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 3 }}
            >
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
                        Jobs
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Manage your job postings
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddRoundedIcon />}
                    onClick={() => handleOpen()}
                    sx={{
                        background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                        boxShadow: '0 4px 14px rgba(220, 38, 38, 0.3)',
                        px: 3,
                        '&:hover': {
                            boxShadow: '0 6px 20px rgba(220, 38, 38, 0.4)',
                        },
                    }}
                >
                    Add Job
                </Button>
            </Stack>

            {/* Table */}
            <AppTable
                columns={columns}
                data={jobs}
                keyExtractor={(row) => row.id!}
                loading={loading}
                emptyIcon={<WorkRoundedIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />}
                emptyTitle="No jobs yet"
                emptySubtitle="Create your first job posting"
                emptyAction={
                    <Button variant="outlined" startIcon={<AddRoundedIcon />} onClick={() => handleOpen()}>
                        Create your first job
                    </Button>
                }
            />

            {/* Job Modal */}
            <AppModal
                open={open}
                onClose={handleClose}
                title={isEdit ? 'Edit Job' : 'Create Job'}
                maxWidth="md"
                onSubmit={handleSubmit}
                submitLabel="Save"
            >
                <Stack spacing={3} sx={{ mt: 1 }}>
                    {/* Basic Information */}
                    <Box>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                                color: theme.palette.primary.main,
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                fontSize: '0.75rem',
                            }}
                        >
                            Basic Information
                        </Typography>
                        <Box sx={{
                            p: 2.5,
                            borderRadius: 3,
                            backgroundColor: alpha(theme.palette.background.default, 0.8),
                            border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                        }}>
                            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                                <TextField
                                    label="Job Title"
                                    fullWidth
                                    required
                                    value={currentJob.title || ''}
                                    onChange={(e) => setCurrentJob({ ...currentJob, title: e.target.value })}
                                />
                                <TextField
                                    label="Location"
                                    fullWidth
                                    required
                                    value={currentJob.location || ''}
                                    onChange={(e) => setCurrentJob({ ...currentJob, location: e.target.value })}
                                />
                            </Stack>
                            <Box sx={{ mt: 2 }}>
                                <AppSelect
                                    label="Employment Type"
                                    fullWidth
                                    value={currentJob.jobType || 'FULL_TIME'}
                                    onChange={(val) => setCurrentJob({ ...currentJob, jobType: val })}
                                    options={[
                                        { label: 'Full Time', value: 'FULL_TIME' },
                                        { label: 'Part Time', value: 'PART_TIME' },
                                        { label: 'Contract', value: 'CONTRACT' },
                                        { label: 'Internship', value: 'INTERNSHIP' }
                                    ]}
                                />
                            </Box>
                        </Box>
                    </Box>

                    {/* Job Details */}
                    <Box>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                                color: theme.palette.primary.main,
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                fontSize: '0.75rem',
                            }}
                        >
                            Job Details
                        </Typography>
                        <Box sx={{
                            p: 2.5,
                            borderRadius: 3,
                            backgroundColor: alpha(theme.palette.background.default, 0.8),
                            border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                        }}>
                            <Stack spacing={2}>
                                <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                                    Description
                                </Typography>
                                <ReactQuill
                                    theme="snow"
                                    value={currentJob.description || ''}
                                    onChange={(value: string) => setCurrentJob({ ...currentJob, description: value })}
                                    style={{ height: '200px', marginBottom: '50px' }}
                                />
                                <TextField
                                    label="Requirements (One per line)"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={currentJob.requirements || ''}
                                    onChange={(e) => setCurrentJob({ ...currentJob, requirements: e.target.value })}
                                    helperText="List key requirements for the role"
                                />
                                <TextField
                                    label="Responsibilities"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={currentJob.responsibilities || ''}
                                    onChange={(e) => setCurrentJob({ ...currentJob, responsibilities: e.target.value })}
                                />
                            </Stack>
                        </Box>
                    </Box>

                    {/* Additional Info */}
                    <Box>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                                color: theme.palette.primary.main,
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                fontSize: '0.75rem',
                            }}
                        >
                            Additional Info & Status
                        </Typography>
                        <Box sx={{
                            p: 2.5,
                            borderRadius: 3,
                            backgroundColor: alpha(theme.palette.background.default, 0.8),
                            border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                        }}>
                            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mb={2}>
                                <TextField
                                    label="Salary Range"
                                    fullWidth
                                    value={currentJob.salaryRange || ''}
                                    placeholder="e.g. $80k - $120k"
                                    onChange={(e) => setCurrentJob({ ...currentJob, salaryRange: e.target.value })}
                                />
                                <TextField
                                    label="Application Link (External)"
                                    fullWidth
                                    value={currentJob.applicationLink || ''}
                                    onChange={(e) => setCurrentJob({ ...currentJob, applicationLink: e.target.value })}
                                />
                            </Stack>
                            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                                <TextField
                                    label="Expires At"
                                    type="datetime-local"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    value={currentJob.expiresAt || ''}
                                    onChange={(e) => setCurrentJob({ ...currentJob, expiresAt: e.target.value })}
                                />
                                <AppSelect
                                    label="Publishing Status"
                                    fullWidth
                                    value={currentJob.status || 'DRAFT'}
                                    onChange={(val) => setCurrentJob({ ...currentJob, status: val })}
                                    options={[
                                        { label: 'Draft', value: 'DRAFT' },
                                        { label: 'Published', value: 'PUBLISHED' },
                                        { label: 'Archived', value: 'ARCHIVED' }
                                    ]}
                                />
                            </Stack>
                        </Box>
                    </Box>
                </Stack>
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
