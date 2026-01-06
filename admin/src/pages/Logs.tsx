import { useEffect, useState } from 'react';
import { Box, Typography, Chip, Snackbar, Alert } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import client from '../api/client';
import AppTable, { type TableColumn } from '../components/AppTable';

interface Log {
    id: string;
    adminId: string;
    action: string;
    entityType: string;
    entityId: string;
    details: string;
    ipAddress: string;
    createdAt: string;
}

interface PageData<T> {
    content: T[];
    totalElements: number;
}

export default function Logs() {
    const theme = useTheme();
    const [logs, setLogs] = useState<Log[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [totalElements, setTotalElements] = useState(0);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' as 'error' });

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const res = await client.get<PageData<Log>>('/admin/logs', {
                params: { page, size: rowsPerPage, sort: 'createdAt,desc' }
            });
            setLogs(res.data.content);
            setTotalElements(res.data.totalElements);
        } catch (error) {
            console.error("Failed to fetch logs", error);
            setSnackbar({ open: true, message: 'Failed to fetch logs', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, [page, rowsPerPage]);

    // Action color mapping
    const getActionColor = (action: string) => {
        switch (action) {
            case 'CREATE': return { bg: alpha('#10B981', 0.1), color: '#059669' };
            case 'UPDATE': return { bg: alpha('#3B82F6', 0.1), color: '#2563EB' };
            case 'DELETE': return { bg: alpha('#EF4444', 0.1), color: '#DC2626' };
            case 'LOGIN': return { bg: alpha('#8B5CF6', 0.1), color: '#7C3AED' };
            default: return { bg: alpha('#64748B', 0.1), color: '#475569' };
        }
    };

    // Table columns
    const columns: TableColumn<Log>[] = [
        {
            id: 'createdAt',
            label: 'Time',
            minWidth: 160,
            render: (row) => (
                <Typography variant="body2" sx={{ whiteSpace: 'nowrap', fontSize: '0.85rem' }}>
                    {new Date(row.createdAt).toLocaleString()}
                </Typography>
            ),
        },
        {
            id: 'adminId',
            label: 'Admin',
            minWidth: 100,
            render: (row) => (
                <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }} color="text.secondary">
                    {row.adminId.slice(0, 8)}...
                </Typography>
            ),
        },
        {
            id: 'action',
            label: 'Action',
            minWidth: 100,
            render: (row) => {
                const style = getActionColor(row.action);
                return (
                    <Chip
                        label={row.action}
                        size="small"
                        sx={{
                            backgroundColor: style.bg,
                            color: style.color,
                            fontWeight: 600,
                            fontSize: '0.7rem',
                        }}
                    />
                );
            },
        },
        {
            id: 'entityType',
            label: 'Entity',
            minWidth: 140,
            render: (row) => (
                <Box>
                    <Typography variant="body2" fontWeight={600}>{row.entityType}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                        {row.entityId.substring(0, 8)}...
                    </Typography>
                </Box>
            ),
        },
        {
            id: 'details',
            label: 'Details',
            minWidth: 200,
            render: (row) => (
                <Typography variant="body2" color="text.secondary" sx={{
                    fontSize: '0.85rem',
                    maxWidth: 200,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}>
                    {row.details || '-'}
                </Typography>
            ),
        },
        {
            id: 'ipAddress',
            label: 'IP Address',
            minWidth: 100,
            render: (row) => (
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', fontFamily: 'monospace' }}>
                    {row.ipAddress}
                </Typography>
            ),
        },
    ];

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 3 }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Activity Logs
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    Track all admin actions and system events
                </Typography>
            </Box>

            {/* Table */}
            <AppTable
                columns={columns}
                data={logs}
                keyExtractor={(row) => row.id}
                loading={loading}
                emptyIcon={<HistoryRoundedIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />}
                emptyTitle="No activity logs"
                emptySubtitle="Admin actions will be recorded here"
                pagination={{
                    page,
                    rowsPerPage,
                    totalCount: totalElements,
                    onPageChange: setPage,
                    onRowsPerPageChange: (newRowsPerPage) => {
                        setRowsPerPage(newRowsPerPage);
                        setPage(0);
                    },
                    rowsPerPageOptions: [20, 50, 100],
                }}
            />

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
}
