import { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Chip, Stack } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import client from '../api/client';
import type { Notification } from '../api/types';
import AppTable, { StatusChip, type TableColumn } from '../components/AppTable';

interface PageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

export default function Notifications() {
    const theme = useTheme();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const res = await client.get<PageResponse<Notification>>('/admin/notifications?size=20&sort=createdAt,desc');
            setNotifications(res.data.content);
        } catch (error) {
            console.error("Failed to fetch notifications", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
        // Mark all as read when page opens
        client.patch('/admin/notifications/mark-read').catch(err => console.error("Failed to mark read", err));
    }, []);

    // Type color mapping
    const getTypeColor = (type: string) => {
        switch (type) {
            case 'EMAIL': return { bg: alpha('#3B82F6', 0.1), color: '#2563EB' };
            case 'SMS': return { bg: alpha('#10B981', 0.1), color: '#059669' };
            case 'PUSH': return { bg: alpha('#8B5CF6', 0.1), color: '#7C3AED' };
            case 'SYSTEM': return { bg: alpha('#F59E0B', 0.1), color: '#D97706' };
            default: return { bg: alpha('#64748B', 0.1), color: '#475569' };
        }
    };

    // Table columns
    const columns: TableColumn<Notification>[] = [
        {
            id: 'recipient',
            label: 'Recipient',
            minWidth: 200,
            render: (row) => (
                <Typography variant="body2" fontWeight={600}>
                    {row.recipient}
                </Typography>
            ),
        },
        {
            id: 'subject',
            label: 'Subject',
            minWidth: 250,
            render: (row) => (
                <Typography variant="body2" color="text.secondary" sx={{
                    maxWidth: 250,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}>
                    {row.subject}
                </Typography>
            ),
        },
        {
            id: 'type',
            label: 'Type',
            minWidth: 100,
            render: (row) => {
                const style = getTypeColor(row.type);
                return (
                    <Chip
                        label={row.type}
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
            id: 'status',
            label: 'Status',
            minWidth: 100,
            render: (row) => <StatusChip label={row.status} />,
        },
        {
            id: 'createdAt',
            label: 'Date',
            minWidth: 150,
            render: (row) => (
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                    {new Date(row.createdAt).toLocaleString()}
                </Typography>
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
                        System Notifications
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        View all system notifications and alerts
                    </Typography>
                </Box>
                <IconButton
                    onClick={fetchNotifications}
                    disabled={loading}
                    sx={{
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.2),
                        },
                    }}
                >
                    <RefreshRoundedIcon />
                </IconButton>
            </Stack>

            {/* Table */}
            <AppTable
                columns={columns}
                data={notifications}
                keyExtractor={(row) => row.id}
                loading={loading}
                emptyIcon={<NotificationsRoundedIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />}
                emptyTitle="No notifications"
                emptySubtitle="System notifications will appear here"
            />
        </Box>
    );
}
