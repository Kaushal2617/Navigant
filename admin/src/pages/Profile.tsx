import { useState } from 'react';
import {
    Box, Typography, Card, CardContent, TextField, Button,
    Avatar, Divider, Alert, Snackbar, Stack, Paper, Grow, Fade
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useAuthStore } from '../store/authStore';
import client from '../api/client';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LockResetRoundedIcon from '@mui/icons-material/LockResetRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import { useTheme } from '@mui/material/styles';

export default function Profile() {
    const { user } = useAuthStore();
    const theme = useTheme();

    // Password Change State
    const [passwords, setPasswords] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: 'success' as 'success' | 'error' | '' });

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });

        if (passwords.newPassword.length < 8) {
            setMessage({ text: 'Password must be at least 8 characters long', type: 'error' });
            return;
        }

        if (passwords.newPassword !== passwords.confirmPassword) {
            setMessage({ text: 'Passwords do not match', type: 'error' });
            return;
        }

        if (!user?.id) return;

        setLoading(true);
        try {
            await client.patch(`/admins/${user.id}`, {
                password: passwords.newPassword
            });
            setMessage({ text: 'Password updated successfully!', type: 'success' });
            setPasswords({ newPassword: '', confirmPassword: '' });
        } catch (error: any) {
            console.error("Failed to update password", error);
            const msg = error.response?.data?.detail || 'Failed to update password';
            setMessage({ text: msg, type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grow in={true} timeout={600}>
            <Box maxWidth="lg" mx="auto">
                {/* Hero Header */}
                <Paper
                    elevation={3}
                    sx={{
                        borderRadius: 4,
                        overflow: 'hidden',
                        mb: 4,
                        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                        color: 'white',
                        position: 'relative',
                        boxShadow: '0 12px 24px -10px rgba(211, 47, 47, 0.4)'
                    }}
                >
                    <Box sx={{ p: { xs: 3, md: 5 }, display: 'flex', alignItems: 'center', gap: 3, position: 'relative', zIndex: 2 }}>
                        <Avatar
                            sx={{
                                width: 100,
                                height: 100,
                                bgcolor: 'white',
                                color: 'primary.main',
                                fontSize: 40,
                                border: '4px solid rgba(255,255,255,0.3)',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                            }}
                        >
                            {user?.name?.charAt(0).toUpperCase() || <AccountCircleRoundedIcon sx={{ fontSize: 60 }} />}
                        </Avatar>
                        <Box>
                            <Stack direction="row" alignItems="center" gap={1.5} mb={0.5}>
                                <Typography variant="h3" fontWeight={800} letterSpacing="-0.5px">
                                    {user?.name || 'Admin User'}
                                </Typography>
                                <VerifiedRoundedIcon sx={{ color: 'white', opacity: 0.9, fontSize: 28 }} />
                            </Stack>

                            <Stack direction="row" alignItems="center" gap={2} mt={1}>
                                <Box
                                    sx={{
                                        bgcolor: 'rgba(255,255,255,0.2)',
                                        px: 1.5,
                                        py: 0.5,
                                        borderRadius: 2,
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        backdropFilter: 'blur(4px)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5
                                    }}
                                >
                                    <BadgeRoundedIcon fontSize="small" sx={{ fontSize: 16 }} />
                                    {user?.role || 'ADMIN'}
                                </Box>
                                <Stack direction="row" alignItems="center" gap={0.5} sx={{ opacity: 0.9 }}>
                                    <EmailRoundedIcon sx={{ fontSize: 18 }} />
                                    <Typography variant="body1" fontWeight={500}>{user?.email || 'email@example.com'}</Typography>
                                </Stack>
                            </Stack>
                        </Box>
                    </Box>

                    {/* Decorative Pattern - Abstract Shapes */}
                    <Box
                        sx={{
                            position: 'absolute',
                            right: '-10%',
                            top: '-50%',
                            width: '600px',
                            height: '600px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                            zIndex: 1
                        }}
                    />
                </Paper>

                <Grid container spacing={4}>
                    {/* Left Column: Account Details */}
                    <Grid size={{ xs: 12, md: 4 }} sx={{ width: { xs: '100%', md: '33.333%' }, flexShrink: 0 }}>
                        <Fade in={true} timeout={800}>
                            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-2px)' } }}>
                                <CardContent sx={{ p: 4 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                        <Box sx={{ p: 1, borderRadius: 2, bgcolor: theme.palette.primary.main + '15', color: theme.palette.primary.main }}>
                                            <BadgeRoundedIcon />
                                        </Box>
                                        <Typography variant="h6" fontWeight={700}>Account Details</Typography>
                                    </Box>

                                    <Stack spacing={3}>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" fontWeight={600} gutterBottom>
                                                FULL NAME
                                            </Typography>
                                            <Typography variant="body1" fontWeight={500}>
                                                {user?.name || '-'}
                                            </Typography>
                                        </Box>
                                        <Divider />
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" fontWeight={600} gutterBottom>
                                                EMAIL ADDRESS
                                            </Typography>
                                            <Typography variant="body1" fontWeight={500}>
                                                {user?.email || '-'}
                                            </Typography>
                                        </Box>
                                        <Divider />
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" fontWeight={600} gutterBottom>
                                                USER ID
                                            </Typography>
                                            <Box sx={{
                                                bgcolor: '#f5f5f5',
                                                p: 1.5,
                                                borderRadius: 2,
                                                fontFamily: 'monospace',
                                                fontSize: '0.85rem',
                                                color: 'text.secondary',
                                                wordBreak: 'break-all'
                                            }}>
                                                {user?.id || 'N/A'}
                                            </Box>
                                        </Box>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Fade>
                    </Grid>

                    {/* Right Column: Security */}
                    <Grid size={{ xs: 12, md: 8 }} sx={{ flex: { xs: '0 0 100%', md: 1 }, maxWidth: { xs: '100%', md: 'calc(100% - 33.333%)' } }}>
                        <Fade in={true} timeout={1000}>
                            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-2px)' } }}>
                                <CardContent sx={{ p: 4 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
                                        <Box sx={{ p: 1, borderRadius: 2, bgcolor: theme.palette.error.main + '15', color: theme.palette.error.main }}>
                                            <SecurityRoundedIcon />
                                        </Box>
                                        <Box>
                                            <Typography variant="h6" fontWeight={700}>Security Settings</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Update your password securely.
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <form onSubmit={handlePasswordChange}>
                                        <Grid container spacing={3}>
                                            <Grid size={{ xs: 12, md: 6 }}>
                                                <Typography variant="subtitle2" fontWeight={600} mb={1}>New Password</Typography>
                                                <TextField
                                                    type="password"
                                                    fullWidth
                                                    placeholder="Enter new password"
                                                    value={passwords.newPassword}
                                                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                                    required
                                                    helperText="Minimum 8 characters"
                                                    InputProps={{
                                                        startAdornment: <LockResetRoundedIcon color="action" sx={{ mr: 1, opacity: 0.7 }} />
                                                    }}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, md: 6 }}>
                                                <Typography variant="subtitle2" fontWeight={600} mb={1}>Confirm Password</Typography>
                                                <TextField
                                                    type="password"
                                                    fullWidth
                                                    placeholder="Confirm new password"
                                                    value={passwords.confirmPassword}
                                                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                                    required
                                                    InputProps={{
                                                        startAdornment: <LockResetRoundedIcon color="action" sx={{ mr: 1, opacity: 0.7 }} />
                                                    }}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, md: 6 }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        size="large"
                                                        disabled={loading}
                                                        sx={{
                                                            px: 4,
                                                            py: 1.2,
                                                            borderRadius: 2,
                                                            fontWeight: 'bold',
                                                            boxShadow: '0 4px 12px rgba(211, 47, 47, 0.25)'
                                                        }}
                                                    >
                                                        {loading ? 'Updating...' : 'Update Password'}
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </CardContent>
                            </Card>
                        </Fade>
                    </Grid>
                </Grid>

                {/* Notification Snackbar */}
                <Snackbar
                    open={!!message.type}
                    autoHideDuration={6000}
                    onClose={() => setMessage({ ...message, type: '' })}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert
                        onClose={() => setMessage({ ...message, type: '' })}
                        severity={message.type as 'success' | 'error'}
                        sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}
                    >
                        {message.text}
                    </Alert>
                </Snackbar>
            </Box>
        </Grow>
    );
}
