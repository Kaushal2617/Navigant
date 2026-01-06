import { useEffect, useState } from 'react';
import {
    Box, Typography, Switch, IconButton, TextField,
    Stack, Snackbar, Alert
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import client from '../api/client';
import type { SettingDTO } from '../api/types';
import AppTable, { type TableColumn } from '../components/AppTable';

export default function Settings() {
    const theme = useTheme();
    const [settings, setSettings] = useState<SettingDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

    const fetchSettings = async () => {
        setLoading(true);
        try {
            const res = await client.get<SettingDTO[]>('/settings');
            setSettings(res.data);
        } catch (error) {
            console.error("Failed to fetch settings", error);
            setSnackbar({ open: true, message: 'Failed to fetch settings', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const handleToggle = async (setting: SettingDTO) => {
        const updated = { ...setting, enabled: !setting.enabled };
        setSettings(prev => prev.map(s => s.id === setting.id ? updated : s));

        try {
            await client.put(`/settings/${setting.id}`, updated);
            setSnackbar({ open: true, message: 'Setting updated successfully', severity: 'success' });
        } catch (error: any) {
            console.error("Failed to update setting", error);
            setSettings(prev => prev.map(s => s.id === setting.id ? setting : s));
            const msg = error.response?.data?.detail || 'Failed to update setting';
            setSnackbar({ open: true, message: msg, severity: 'error' });
        }
    };

    const handleSave = async (setting: SettingDTO) => {
        try {
            const updated = { ...setting, value: editValue };
            await client.put(`/settings/${setting.id}`, updated);
            setSettings(prev => prev.map(s => s.id === setting.id ? updated : s));
            setEditingId(null);
            setSnackbar({ open: true, message: 'Value saved successfully', severity: 'success' });
        } catch (error: any) {
            console.error("Failed to update setting value", error);
            const msg = error.response?.data?.detail || 'Failed to update setting value';
            setSnackbar({ open: true, message: msg, severity: 'error' });
        }
    };

    const startEditing = (setting: SettingDTO) => {
        setEditingId(setting.id);
        setEditValue(setting.value);
    };

    // Table columns
    const columns: TableColumn<SettingDTO>[] = [
        {
            id: 'description',
            label: 'Setting',
            minWidth: 250,
            render: (row) => (
                <Box>
                    <Typography variant="body2" fontWeight={600}>{row.description}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                        {row.id}
                    </Typography>
                </Box>
            ),
        },
        {
            id: 'value',
            label: 'Value',
            minWidth: 200,
            render: (row) => (
                editingId === row.id ? (
                    <TextField
                        size="small"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                            },
                        }}
                    />
                ) : (
                    <Typography
                        variant="body2"
                        sx={{
                            fontFamily: 'monospace',
                            backgroundColor: alpha('#64748B', 0.08),
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1.5,
                            display: 'inline-block',
                        }}
                    >
                        {row.value}
                    </Typography>
                )
            ),
        },
        {
            id: 'enabled',
            label: 'Enabled',
            minWidth: 100,
            align: 'center',
            render: (row) => (
                <Switch
                    checked={row.enabled}
                    onChange={() => handleToggle(row)}
                    color="primary"
                    sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                            color: theme.palette.primary.main,
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: theme.palette.primary.main,
                        },
                    }}
                />
            ),
        },
        {
            id: 'actions',
            label: 'Actions',
            align: 'center',
            minWidth: 100,
            render: (row) => (
                editingId === row.id ? (
                    <Stack direction="row" spacing={0.5} justifyContent="center">
                        <IconButton
                            onClick={() => handleSave(row)}
                            size="small"
                            sx={{
                                color: theme.palette.success.main,
                                '&:hover': {
                                    backgroundColor: alpha(theme.palette.success.main, 0.1),
                                },
                            }}
                        >
                            <CheckRoundedIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            onClick={() => setEditingId(null)}
                            size="small"
                            sx={{
                                color: theme.palette.error.main,
                                '&:hover': {
                                    backgroundColor: alpha(theme.palette.error.main, 0.1),
                                },
                            }}
                        >
                            <CloseRoundedIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                ) : (
                    <IconButton
                        onClick={() => startEditing(row)}
                        size="small"
                        sx={{
                            color: theme.palette.primary.main,
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            },
                        }}
                    >
                        <EditRoundedIcon fontSize="small" />
                    </IconButton>
                )
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
                    Settings
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    Configure application settings and features
                </Typography>
            </Box>

            {/* Table */}
            <AppTable
                columns={columns}
                data={settings}
                keyExtractor={(row) => row.id}
                loading={loading}
                emptyIcon={<SettingsRoundedIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />}
                emptyTitle="No settings configured"
                emptySubtitle="Settings will appear here once configured"
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
