import { useEffect, useState } from 'react';
import {
    Box, Typography, Button, Stack, TextField, InputAdornment, IconButton,
    Snackbar, Alert
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SupervisorAccountRoundedIcon from '@mui/icons-material/SupervisorAccountRounded';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import client from '../api/client';
import type { AdminResponse } from '../api/types';
import AppModal from '../components/AppModal';
import AppTable, { TableActions, type TableColumn } from '../components/AppTable';

export default function Admins() {
    const theme = useTheme();
    const [admins, setAdmins] = useState<AdminResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [newAdmin, setNewAdmin] = useState({ email: '', password: '', name: '', role: 'ADMIN' });
    const [showPassword, setShowPassword] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

    const fetchAdmins = async () => {
        setLoading(true);
        try {
            const res = await client.get<AdminResponse[]>('/admins');
            setAdmins(res.data);
        } catch (error) {
            console.error("Failed to fetch admins", error);
            setSnackbar({ open: true, message: 'Failed to fetch admins', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    const handleSubmit = async () => {
        try {
            const res = await client.post<AdminResponse>('/admins', newAdmin);
            setAdmins([...admins, res.data]);
            setOpen(false);
            setNewAdmin({ email: '', password: '', name: '', role: 'ADMIN' });
            setSnackbar({ open: true, message: 'Admin created successfully', severity: 'success' });
        } catch (error: any) {
            console.error("Failed to create admin", error);
            const msg = error.response?.data?.detail || 'Failed to create admin';
            setSnackbar({ open: true, message: msg, severity: 'error' });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to remove this admin?")) return;
        try {
            await client.delete(`/admins/${id}`);
            fetchAdmins();
            setSnackbar({ open: true, message: 'Admin removed successfully', severity: 'success' });
        } catch (error: any) {
            console.error("Failed to delete admin", error);
            const msg = error.response?.data?.detail || 'Failed to delete admin';
            setSnackbar({ open: true, message: msg, severity: 'error' });
        }
    };

    // Table columns
    const columns: TableColumn<AdminResponse>[] = [
        {
            id: 'name',
            label: 'Name',
            minWidth: 180,
            render: (row) => (
                <Box>
                    <Typography variant="body2" fontWeight={600}>{row.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{row.email}</Typography>
                </Box>
            ),
        },
        {
            id: 'id',
            label: 'ID',
            minWidth: 120,
            render: (row) => (
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                    {row.id}
                </Typography>
            ),
        },
        {
            id: 'role',
            label: 'Role',
            minWidth: 100,
            render: (row) => {
                const isSuperAdmin = row.role === 'SUPER_ADMIN';
                return (
                    <Box sx={{
                        display: 'inline-flex',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        backgroundColor: isSuperAdmin ? alpha('#DC2626', 0.1) : alpha('#8B5CF6', 0.1),
                        color: isSuperAdmin ? '#DC2626' : '#7C3AED',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                    }}>
                        {row.role?.replace('_', ' ') || 'ADMIN'}
                    </Box>
                );
            },
        },
        {
            id: 'actions',
            label: 'Actions',
            align: 'center',
            minWidth: 80,
            render: (row) => (
                <TableActions onDelete={() => handleDelete(row.id)} />
            ),
        },
    ];

    return (
        <Box>
            {/* Header */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
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
                        Admins
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Manage administrator accounts
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddRoundedIcon />}
                    onClick={() => setOpen(true)}
                    sx={{
                        background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                        boxShadow: '0 4px 14px rgba(220, 38, 38, 0.3)',
                        px: 3,
                        '&:hover': { boxShadow: '0 6px 20px rgba(220, 38, 38, 0.4)' },
                    }}
                >
                    Add Admin
                </Button>
            </Stack>

            {/* Table */}
            <AppTable
                columns={columns}
                data={admins}
                keyExtractor={(row) => row.id}
                loading={loading}
                emptyIcon={<SupervisorAccountRoundedIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />}
                emptyTitle="No admins found"
                emptySubtitle="Add your first administrator"
                emptyAction={
                    <Button variant="outlined" startIcon={<AddRoundedIcon />} onClick={() => setOpen(true)}>
                        Add Admin
                    </Button>
                }
            />

            {/* Create Admin Modal */}
            <AppModal
                open={open}
                onClose={() => setOpen(false)}
                title="Create Admin"
                maxWidth="sm"
                onSubmit={handleSubmit}
                submitLabel="Create"
            >
                <Box sx={{ mt: 1 }}>
                    <Box sx={{
                        p: 2.5,
                        borderRadius: 3,
                        backgroundColor: alpha(theme.palette.background.default, 0.8),
                        border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                    }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: theme.palette.primary.main, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                            New Admin Profile
                        </Typography>
                        <Stack spacing={2}>
                            <TextField
                                label="Full Name"
                                fullWidth
                                required
                                value={newAdmin.name}
                                onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                            />
                            <TextField
                                label="Email Address"
                                type="email"
                                fullWidth
                                required
                                value={newAdmin.email}
                                onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                            />
                            <TextField
                                label="Set Password"
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                                required
                                value={newAdmin.password}
                                onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Stack>
                    </Box>
                </Box>
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
}
