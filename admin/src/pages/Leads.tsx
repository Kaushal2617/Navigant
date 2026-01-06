import { useEffect, useState } from 'react';
import {
    Box, Typography, IconButton, Snackbar, Alert, Chip,
    Button, TextField, Stack
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded';
import client from '../api/client';
import type { LeadResponse, Page } from '../api/types';
import AppSelect from '../components/AppSelect';
import AppModal from '../components/AppModal';
import AppTable, { StatusChip, TableActions, type TableColumn } from '../components/AppTable';

export default function Leads() {
    const theme = useTheme();
    const [leads, setLeads] = useState<LeadResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedLead, setSelectedLead] = useState<LeadResponse | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditingRemarks, setIsEditingRemarks] = useState(false);
    const [remarksVal, setRemarksVal] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalElements, setTotalElements] = useState(0);

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const res = await client.get<Page<LeadResponse>>('/admin/leads', {
                params: { page: page, size: rowsPerPage }
            });
            setLeads(res.data.content);
            setTotalElements(res.data.totalElements);
        } catch (error) {
            console.error("Failed to fetch leads", error);
            setSnackbar({ open: true, message: 'Failed to fetch leads', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, [page, rowsPerPage]);

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            await client.patch(`/admin/leads/${id}/status`, null, {
                params: { status: newStatus }
            });
            setLeads(prev => prev.map(lead =>
                lead.id === id ? { ...lead, status: newStatus } : lead
            ));
            if (selectedLead && selectedLead.id === id) {
                setSelectedLead({ ...selectedLead, status: newStatus });
            }
            setSnackbar({ open: true, message: 'Lead status updated', severity: 'success' });
        } catch (error: any) {
            console.error("Failed to update status", error);
            const msg = error.response?.data?.detail || 'Failed to update status';
            setSnackbar({ open: true, message: msg, severity: 'error' });
        }
    };

    const handleView = (lead: LeadResponse) => {
        setSelectedLead(lead);
        setRemarksVal(lead.adminComments || '');
        setIsEditingRemarks(false);
        setIsModalOpen(true);
    };

    const handleSaveRemarks = async () => {
        if (!selectedLead) return;
        try {
            await client.patch(`/admin/leads/${selectedLead.id}/comments`, { comments: remarksVal });
            const updatedLead = { ...selectedLead, adminComments: remarksVal };
            setSelectedLead(updatedLead);
            setLeads(prev => prev.map(l => l.id === selectedLead.id ? updatedLead : l));
            setIsEditingRemarks(false);
            setSnackbar({ open: true, message: 'Remarks saved', severity: 'success' });
        } catch (error: any) {
            console.error("Failed to update comments", error);
            const msg = error.response?.data?.detail || 'Failed to update comments';
            setSnackbar({ open: true, message: msg, severity: 'error' });
        }
    };

    const handleExport = async () => {
        try {
            const response = await client.get('/admin/leads/export', { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'leads.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Failed to export leads", error);
            setSnackbar({ open: true, message: 'Failed to export leads', severity: 'error' });
        }
    };

    // Table columns definition
    const columns: TableColumn<LeadResponse>[] = [
        {
            id: 'fullName',
            label: 'Name',
            minWidth: 180,
            render: (row) => (
                <Box>
                    <Typography variant="body2" fontWeight={600}>{row.fullName}</Typography>
                    <Typography variant="caption" color="text.secondary">{row.email}</Typography>
                </Box>
            ),
        },
        {
            id: 'serviceType',
            label: 'Service',
            minWidth: 120,
            render: (row) => (
                <Typography variant="body2" color="text.secondary">
                    {row.serviceType}
                </Typography>
            ),
        },
        {
            id: 'numberOfSeats',
            label: 'Seats',
            minWidth: 80,
            render: (row) => (
                <Chip
                    label={row.numberOfSeats}
                    size="small"
                    sx={{
                        backgroundColor: alpha('#64748B', 0.1),
                        fontWeight: 600,
                    }}
                />
            ),
        },
        {
            id: 'createdAt',
            label: 'Date',
            minWidth: 100,
            render: (row) => (
                <Typography variant="body2" color="text.secondary">
                    {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '-'}
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
                        { label: 'Contacted', value: 'CONTACTED' },
                        { label: 'In Progress', value: 'IN_PROGRESS' },
                        { label: 'Qualified', value: 'QUALIFIED' },
                        { label: 'Converted', value: 'CONVERTED' },
                        { label: 'Lost', value: 'LOST' }
                    ]}
                />
            ),
        },
        {
            id: 'actions',
            label: 'Actions',
            align: 'center',
            minWidth: 80,
            render: (row) => (
                <TableActions onView={() => handleView(row)} />
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
                        Leads
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Track and manage your sales leads
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
                data={leads}
                keyExtractor={(row) => row.id}
                loading={loading}
                emptyIcon={<ContactsRoundedIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />}
                emptyTitle="No leads yet"
                emptySubtitle="Leads from your contact form will appear here"
                pagination={{
                    page,
                    rowsPerPage,
                    totalCount: totalElements,
                    onPageChange: setPage,
                    onRowsPerPageChange: (newRowsPerPage) => {
                        setRowsPerPage(newRowsPerPage);
                        setPage(0);
                    },
                }}
            />

            {/* Lead Details Modal */}
            {selectedLead && (
                <AppModal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Lead Details"
                    maxWidth="sm"
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {/* Status Badge */}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <StatusChip label={selectedLead.status || 'NEW'} />
                        </Box>

                        {/* Contact Information */}
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
                                Contact Information
                            </Typography>
                            <Box sx={{
                                p: 2.5,
                                borderRadius: 3,
                                backgroundColor: '#F8FAFC',
                                border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                            }}>
                                <Box sx={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 1.5, alignItems: 'center' }}>
                                    <Typography variant="body2" color="text.secondary" fontWeight={500}>Name</Typography>
                                    <Typography variant="body1" fontWeight={600}>{selectedLead.fullName}</Typography>
                                    <Typography variant="body2" color="text.secondary" fontWeight={500}>Email</Typography>
                                    <Typography variant="body1" sx={{ wordBreak: 'break-all' }}>{selectedLead.email}</Typography>
                                    <Typography variant="body2" color="text.secondary" fontWeight={500}>Phone</Typography>
                                    <Typography variant="body1">{selectedLead.phone}</Typography>
                                </Box>
                            </Box>
                        </Box>

                        {/* Requirement Details */}
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
                                Requirement Details
                            </Typography>
                            <Box sx={{
                                p: 2.5,
                                borderRadius: 3,
                                backgroundColor: '#F8FAFC',
                                border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                            }}>
                                <Box sx={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 1.5, alignItems: 'center' }}>
                                    <Typography variant="body2" color="text.secondary" fontWeight={500}>Service</Typography>
                                    <Typography variant="body1" fontWeight={600}>{selectedLead.serviceType}</Typography>
                                    <Typography variant="body2" color="text.secondary" fontWeight={500}>Seats</Typography>
                                    <Typography variant="body1">{selectedLead.numberOfSeats}</Typography>
                                </Box>
                            </Box>
                        </Box>

                        {/* Customer Remarks */}
                        {selectedLead.remarks && (
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
                                    Customer Remarks
                                </Typography>
                                <Box sx={{
                                    p: 2.5,
                                    borderRadius: 3,
                                    backgroundColor: alpha('#F59E0B', 0.08),
                                    border: `1px solid ${alpha('#F59E0B', 0.2)}`,
                                }}>
                                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                                        {selectedLead.remarks}
                                    </Typography>
                                </Box>
                            </Box>
                        )}

                        {/* Admin Notes */}
                        <Box>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1.5}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 700,
                                        color: '#059669',
                                        letterSpacing: '0.05em',
                                        textTransform: 'uppercase',
                                        fontSize: '0.7rem',
                                    }}
                                >
                                    Admin Internal Notes
                                </Typography>
                                {!isEditingRemarks && (
                                    <IconButton
                                        size="small"
                                        onClick={() => setIsEditingRemarks(true)}
                                        sx={{ color: '#059669' }}
                                    >
                                        <EditRoundedIcon fontSize="small" />
                                    </IconButton>
                                )}
                            </Stack>
                            <Box sx={{
                                p: 2.5,
                                borderRadius: 3,
                                backgroundColor: alpha('#10B981', 0.08),
                                border: `1px solid ${alpha('#10B981', 0.2)}`,
                            }}>
                                {isEditingRemarks ? (
                                    <Stack spacing={2}>
                                        <TextField
                                            multiline
                                            rows={3}
                                            fullWidth
                                            value={remarksVal}
                                            onChange={(e) => setRemarksVal(e.target.value)}
                                            placeholder="Add internal notes..."
                                            size="small"
                                            sx={{ backgroundColor: 'white', borderRadius: 2 }}
                                        />
                                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                                            <Button
                                                size="small"
                                                startIcon={<CloseRoundedIcon />}
                                                onClick={() => setIsEditingRemarks(false)}
                                                color="inherit"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                size="small"
                                                variant="contained"
                                                startIcon={<CheckRoundedIcon />}
                                                onClick={handleSaveRemarks}
                                                sx={{
                                                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                                                }}
                                            >
                                                Save
                                            </Button>
                                        </Stack>
                                    </Stack>
                                ) : (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontStyle: selectedLead.adminComments ? 'normal' : 'italic',
                                            color: selectedLead.adminComments ? 'text.primary' : 'text.secondary'
                                        }}
                                    >
                                        {selectedLead.adminComments || 'No internal comments yet'}
                                    </Typography>
                                )}
                            </Box>
                        </Box>

                        {/* Metadata Footer */}
                        <Box sx={{
                            pt: 2,
                            borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: 1,
                        }}>
                            <Typography variant="caption" color="text.secondary">
                                Created: {selectedLead.createdAt ? new Date(selectedLead.createdAt).toLocaleString() : '-'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Reviewed by: {selectedLead.reviewedByName || selectedLead.reviewedBy || 'N/A'}
                            </Typography>
                        </Box>
                    </Box>
                </AppModal>
            )}

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
