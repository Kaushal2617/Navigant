import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import {
    Box, Button, TextField, Typography, Paper, IconButton, InputAdornment,
    CircularProgress, Alert, Fade
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login({ email, password });
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                // Animated gradient background
                background: 'linear-gradient(-45deg, #1E293B, #334155, #DC2626, #991B1B)',
                backgroundSize: '400% 400%',
                animation: 'gradientShift 15s ease infinite',
                '@keyframes gradientShift': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
            }}
        >
            {/* Floating decorative elements */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    filter: 'blur(40px)',
                    animation: 'float 6s ease-in-out infinite',
                    '@keyframes float': {
                        '0%, 100%': { transform: 'translateY(0)' },
                        '50%': { transform: 'translateY(-20px)' },
                    },
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '15%',
                    right: '15%',
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    background: 'rgba(220, 38, 38, 0.15)',
                    filter: 'blur(60px)',
                    animation: 'float 8s ease-in-out infinite reverse',
                }}
            />

            {/* Login Card with Glassmorphism */}
            <Fade in timeout={600}>
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 4, sm: 5 },
                        width: '100%',
                        maxWidth: 420,
                        mx: 2,
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
                        animation: 'slideInUp 0.5s ease-out',
                        '@keyframes slideInUp': {
                            from: { opacity: 0, transform: 'translateY(30px)' },
                            to: { opacity: 1, transform: 'translateY(0)' },
                        },
                    }}
                >
                    {/* Logo / Branding */}
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 800,
                                mb: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 0.5,
                            }}
                        >
                            <Box
                                component="img"
                                src="/logo.png"
                                alt="Navigant"
                                sx={{ height: 48, width: 'auto' }}
                            />
                        </Typography>
                        <Box
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 1,
                                px: 2,
                                py: 0.5,
                                borderRadius: 2,
                                backgroundColor: 'rgba(30, 41, 59, 0.08)',
                            }}
                        >
                            <Box
                                sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    backgroundColor: '#DC2626',
                                    animation: 'pulse 2s infinite',
                                    '@keyframes pulse': {
                                        '0%, 100%': { opacity: 1 },
                                        '50%': { opacity: 0.5 },
                                    },
                                }}
                            />
                            <Typography
                                variant="caption"
                                sx={{
                                    fontWeight: 600,
                                    color: '#64748B',
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Admin Portal
                            </Typography>
                        </Box>
                    </Box>

                    {/* Error Alert */}
                    {error && (
                        <Fade in>
                            <Alert
                                severity="error"
                                sx={{
                                    mb: 3,
                                    borderRadius: 2,
                                    animation: 'shake 0.5s ease',
                                    '@keyframes shake': {
                                        '0%, 100%': { transform: 'translateX(0)' },
                                        '25%': { transform: 'translateX(-5px)' },
                                        '75%': { transform: 'translateX(5px)' },
                                    },
                                }}
                            >
                                {error}
                            </Alert>
                        </Fade>
                    )}

                    {/* Login Form */}
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoFocus
                            autoComplete="email"
                            sx={{
                                mb: 2.5,
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'rgba(248, 250, 252, 0.8)',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: 'rgba(248, 250, 252, 1)',
                                    },
                                    '&.Mui-focused': {
                                        backgroundColor: '#fff',
                                        boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.1)',
                                    },
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                            sx={{
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'rgba(248, 250, 252, 0.8)',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: 'rgba(248, 250, 252, 1)',
                                    },
                                    '&.Mui-focused': {
                                        backgroundColor: '#fff',
                                        boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.1)',
                                    },
                                },
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            sx={{
                                                color: '#64748B',
                                                '&:hover': {
                                                    color: '#DC2626',
                                                },
                                            }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 600,
                                borderRadius: 2.5,
                                background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                                boxShadow: '0 4px 14px rgba(220, 38, 38, 0.4)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                                    boxShadow: '0 6px 20px rgba(220, 38, 38, 0.5)',
                                    transform: 'translateY(-2px)',
                                },
                                '&:active': {
                                    transform: 'translateY(0) scale(0.98)',
                                },
                                '&.Mui-disabled': {
                                    background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                                    opacity: 0.7,
                                },
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={24} sx={{ color: 'white' }} />
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </Box>

                    {/* Footer */}
                    <Typography
                        variant="caption"
                        sx={{
                            display: 'block',
                            textAlign: 'center',
                            mt: 4,
                            color: '#94A3B8',
                        }}
                    >
                        Secure admin access only
                    </Typography>
                </Paper>
            </Fade>
        </Box>
    );
}
