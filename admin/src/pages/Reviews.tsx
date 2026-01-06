import { useEffect, useState } from 'react';
import {
    Box, Typography, Button, Stack, TextField, IconButton,
    Snackbar, Alert, InputAdornment, Rating, Chip
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import client from '../api/client';
import type { ReviewResponse, ReviewCreateRequest, ReviewStatusUpdateRequest } from '../api/types';
import AppModal from '../components/AppModal';
import AppTable, { StatusChip, TableActions, type TableColumn } from '../components/AppTable';

const Reviews = () => {
    const theme = useTheme();
    const [reviews, setReviews] = useState<ReviewResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

    // Create Dialog
    const [createOpen, setCreateOpen] = useState(false);
    const [createForm, setCreateForm] = useState<ReviewCreateRequest>({
        clientName: '',
        clientEmail: '',
        clientCompany: ''
    });
    const [createdLink, setCreatedLink] = useState<string | null>(null);

    // View Dialog
    const [viewOpen, setViewOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState<ReviewResponse | null>(null);

    // Status Dialog
    const [statusOpen, setStatusOpen] = useState(false);
    const [statusForm, setStatusForm] = useState<ReviewStatusUpdateRequest>({
        status: '',
        adminNotes: ''
    });

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const res = await client.get<ReviewResponse[]>('/admin/reviews');
            setReviews(res.data);
        } catch {
            setSnackbar({ open: true, message: 'Failed to load reviews', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        try {
            const baseUrl = window.location.origin;
            const res = await client.post<ReviewResponse>('/admin/reviews', createForm, {
                headers: { 'X-Base-Url': baseUrl }
            });
            setCreatedLink(res.data.reviewLink || null);
            setSnackbar({ open: true, message: 'Review link created!', severity: 'success' });
            fetchReviews();
        } catch {
            setSnackbar({ open: true, message: 'Failed to create review link', severity: 'error' });
        }
    };

    const handleStatusUpdate = async (status: string) => {
        if (!selectedReview) return;
        try {
            await client.patch(`/admin/reviews/${selectedReview.id}/status`, {
                status,
                adminNotes: statusForm.adminNotes
            });
            setSnackbar({ open: true, message: `Review ${status.toLowerCase()}!`, severity: 'success' });
            setStatusOpen(false);
            setSelectedReview(null);
            fetchReviews();
        } catch {
            setSnackbar({ open: true, message: 'Failed to update status', severity: 'error' });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this review?')) return;
        try {
            await client.delete(`/admin/reviews/${id}`);
            setSnackbar({ open: true, message: 'Review deleted', severity: 'success' });
            fetchReviews();
        } catch {
            setSnackbar({ open: true, message: 'Failed to delete review', severity: 'error' });
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setSnackbar({ open: true, message: 'Link copied to clipboard!', severity: 'success' });
    };

    // Table columns
    const columns: TableColumn<ReviewResponse>[] = [
        {
            id: 'clientName',
            label: 'Client',
            minWidth: 180,
            render: (row) => (
                <Box>
                    <Typography variant="body2" fontWeight={600}>{row.clientName}</Typography>
                    <Typography variant="caption" color="text.secondary">{row.clientEmail}</Typography>
                </Box>
            ),
        },
        {
            id: 'clientCompany',
            label: 'Company',
            minWidth: 120,
            render: (row) => (
                <Typography variant="body2" color="text.secondary">
                    {row.clientCompany || '-'}
                </Typography>
            ),
        },
        {
            id: 'rating',
            label: 'Rating',
            minWidth: 120,
            render: (row) => (
                row.rating ? <Rating value={row.rating} readOnly size="small" /> : (
                    <Typography variant="body2" color="text.disabled">-</Typography>
                )
            ),
        },
        {
            id: 'status',
            label: 'Status',
            minWidth: 100,
            render: (row) => <StatusChip label={row.status} />,
        },
        {
            id: 'submittedAt',
            label: 'Submitted',
            minWidth: 100,
            render: (row) => (
                row.submittedAt ? (
                    <Typography variant="body2" color="text.secondary">
                        {new Date(row.submittedAt).toLocaleDateString()}
                    </Typography>
                ) : (
                    <Chip label="Not Submitted" size="small" variant="outlined" />
                )
            ),
        },
        {
            id: 'actions',
            label: 'Actions',
            align: 'center',
            minWidth: 150,
            render: (row) => (
                <Stack direction="row" spacing={0.5} justifyContent="center">
                    <TableActions
                        onView={() => { setSelectedReview(row); setViewOpen(true); }}
                        onDelete={() => handleDelete(row.id)}
                    />
                    {row.submittedAt && row.status === 'PENDING' && (
                        <>
                            <IconButton
                                size="small"
                                onClick={() => { setSelectedReview(row); setStatusForm({ status: 'APPROVED', adminNotes: '' }); setStatusOpen(true); }}
                                sx={{ color: theme.palette.success.main, '&:hover': { backgroundColor: alpha(theme.palette.success.main, 0.1) } }}
                            >
                                <CheckCircleRoundedIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                                size="small"
                                onClick={() => { setSelectedReview(row); setStatusForm({ status: 'REJECTED', adminNotes: '' }); setStatusOpen(true); }}
                                sx={{ color: theme.palette.error.main, '&:hover': { backgroundColor: alpha(theme.palette.error.main, 0.1) } }}
                            >
                                <CancelRoundedIcon fontSize="small" />
                            </IconButton>
                        </>
                    )}
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
                        Client Reviews
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Manage customer feedback and testimonials
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddRoundedIcon />}
                    onClick={() => setCreateOpen(true)}
                    sx={{
                        background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                        boxShadow: '0 4px 14px rgba(220, 38, 38, 0.3)',
                        px: 3,
                        '&:hover': { boxShadow: '0 6px 20px rgba(220, 38, 38, 0.4)' },
                    }}
                >
                    Generate Link
                </Button>
            </Stack>

            {/* Table */}
            <AppTable
                columns={columns}
                data={reviews}
                keyExtractor={(row) => row.id}
                loading={loading}
                emptyIcon={<RateReviewRoundedIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />}
                emptyTitle="No reviews yet"
                emptySubtitle="Generate a review link to collect customer feedback"
                emptyAction={
                    <Button variant="outlined" startIcon={<AddRoundedIcon />} onClick={() => setCreateOpen(true)}>
                        Generate Review Link
                    </Button>
                }
            />

            {/* Create Review Link Dialog */}
            <AppModal
                open={createOpen}
                onClose={() => { setCreateOpen(false); setCreatedLink(null); }}
                title="Generate Review Link"
                maxWidth="sm"
                onSubmit={!createdLink ? handleCreate : undefined}
                submitLabel="Generate Link"
                actions={createdLink ? (
                    <Button onClick={() => { setCreateOpen(false); setCreatedLink(null); setCreateForm({ clientName: '', clientEmail: '', clientCompany: '' }); }}>
                        Close
                    </Button>
                ) : undefined}
            >
                {createdLink ? (
                    <Box>
                        <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>Review link generated successfully!</Alert>
                        <TextField
                            fullWidth
                            label="Review Link"
                            value={createdLink}
                            InputProps={{
                                readOnly: true,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => copyToClipboard(createdLink)}>
                                            <ContentCopyRoundedIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Typography variant="caption" color="text.secondary" mt={1}>
                            Share this link with the client to collect their review.
                        </Typography>
                    </Box>
                ) : (
                    <Box sx={{ mt: 1 }}>
                        <Box sx={{
                            p: 2.5,
                            borderRadius: 3,
                            backgroundColor: alpha(theme.palette.background.default, 0.8),
                            border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                        }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: theme.palette.primary.main, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                                New Request Details
                            </Typography>
                            <Stack spacing={2}>
                                <TextField
                                    label="Client Name"
                                    value={createForm.clientName}
                                    onChange={(e) => setCreateForm({ ...createForm, clientName: e.target.value })}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    label="Client Email"
                                    type="email"
                                    value={createForm.clientEmail}
                                    onChange={(e) => setCreateForm({ ...createForm, clientEmail: e.target.value })}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    label="Company (Optional)"
                                    value={createForm.clientCompany}
                                    onChange={(e) => setCreateForm({ ...createForm, clientCompany: e.target.value })}
                                    fullWidth
                                />
                            </Stack>
                        </Box>
                    </Box>
                )}
            </AppModal>

            {/* View Review Dialog */}
            <AppModal
                open={viewOpen}
                onClose={() => setViewOpen(false)}
                title="Review Details"
                maxWidth="sm"
                actions={<Button onClick={() => setViewOpen(false)}>Close</Button>}
            >
                {selectedReview && (
                    <Stack spacing={2.5} mt={1}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <StatusChip label={selectedReview.status} />
                        </Box>

                        {/* Client Info */}
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: theme.palette.primary.main, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.7rem' }}>
                                Client Information
                            </Typography>
                            <Box sx={{ p: 2.5, borderRadius: 3, backgroundColor: '#F8FAFC', border: `1px solid ${alpha(theme.palette.divider, 0.5)}` }}>
                                <Box sx={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 1.5, alignItems: 'center' }}>
                                    <Typography variant="body2" color="text.secondary" fontWeight={500}>Name</Typography>
                                    <Typography variant="body1" fontWeight={600}>{selectedReview.clientName}</Typography>
                                    <Typography variant="body2" color="text.secondary" fontWeight={500}>Email</Typography>
                                    <Typography variant="body1" sx={{ wordBreak: 'break-all' }}>{selectedReview.clientEmail}</Typography>
                                    {selectedReview.clientCompany && (
                                        <>
                                            <Typography variant="body2" color="text.secondary" fontWeight={500}>Company</Typography>
                                            <Typography variant="body1">{selectedReview.clientCompany}</Typography>
                                        </>
                                    )}
                                </Box>
                            </Box>
                        </Box>

                        {/* Review Content */}
                        {(selectedReview.rating || selectedReview.title || selectedReview.content) && (
                            <Box>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#D97706', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.7rem' }}>
                                        Review Content
                                    </Typography>
                                    {selectedReview.rating && <Rating value={selectedReview.rating} readOnly size="small" />}
                                </Stack>
                                <Box sx={{ p: 2.5, borderRadius: 3, backgroundColor: alpha('#F59E0B', 0.08), border: `1px solid ${alpha('#F59E0B', 0.2)}` }}>
                                    {selectedReview.title && (
                                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>{selectedReview.title}</Typography>
                                    )}
                                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', color: selectedReview.content ? 'text.primary' : 'text.secondary', fontStyle: selectedReview.content ? 'normal' : 'italic' }}>
                                        {selectedReview.content || 'No written content provided.'}
                                    </Typography>
                                </Box>
                            </Box>
                        )}

                        {/* Admin Notes */}
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: '#059669', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.7rem' }}>
                                Admin Internal Notes
                            </Typography>
                            <Box sx={{ p: 2.5, borderRadius: 3, backgroundColor: alpha('#10B981', 0.08), border: `1px solid ${alpha('#10B981', 0.2)}` }}>
                                <Typography variant="body2" sx={{ fontStyle: selectedReview.adminNotes ? 'normal' : 'italic', color: selectedReview.adminNotes ? 'text.primary' : 'text.secondary' }}>
                                    {selectedReview.adminNotes || 'No internal notes added.'}
                                </Typography>
                            </Box>
                        </Box>
                    </Stack>
                )}
            </AppModal>

            {/* Status Update Dialog */}
            <AppModal
                open={statusOpen}
                onClose={() => setStatusOpen(false)}
                title={statusForm.status === 'APPROVED' ? 'Approve Review' : 'Reject Review'}
                maxWidth="sm"
                actions={
                    <>
                        <Button onClick={() => setStatusOpen(false)}>Cancel</Button>
                        <Button
                            variant="contained"
                            onClick={() => handleStatusUpdate(statusForm.status)}
                            sx={{
                                background: statusForm.status === 'APPROVED'
                                    ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                                    : 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                            }}
                        >
                            {statusForm.status === 'APPROVED' ? 'Approve' : 'Reject'}
                        </Button>
                    </>
                }
            >
                <TextField
                    label="Admin Notes (Optional)"
                    multiline
                    rows={3}
                    value={statusForm.adminNotes}
                    onChange={(e) => setStatusForm({ ...statusForm, adminNotes: e.target.value })}
                    fullWidth
                    sx={{ mt: 1 }}
                />
            </AppModal>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%', borderRadius: 3, boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Reviews;
