import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import {
    Box, CssBaseline, Drawer, AppBar, Toolbar, List, Typography,
    ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, useMediaQuery, Tooltip, Badge
} from '@mui/material';
import client from '../api/client';
import { useTheme, alpha } from '@mui/material/styles';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import SupervisorAccountRoundedIcon from '@mui/icons-material/SupervisorAccountRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';

const drawerWidth = 280;
const collapsedDrawerWidth = 80;

export default function AdminLayout() {
    const { isAuthenticated, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchUnreadCount = async () => {
        try {
            const res = await client.get<number>('/admin/notifications/unread-count');
            setUnreadCount(res.data);
        } catch (error) {
            console.error("Failed to fetch unread count", error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchUnreadCount();
            const interval = setInterval(fetchUnreadCount, 30000);
            return () => clearInterval(interval);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (location.pathname !== '/notifications') {
            fetchUnreadCount();
        } else {
            setUnreadCount(0);
        }
    }, [location.pathname]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) return null;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleCollapseToggle = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardRoundedIcon />, path: '/dashboard' },
        { text: 'Jobs', icon: <WorkRoundedIcon />, path: '/jobs' },
        { text: 'Applications', icon: <DescriptionRoundedIcon />, path: '/applications' },
        { text: 'Leads', icon: <ContactsRoundedIcon />, path: '/leads' },
        { text: 'Reviews', icon: <RateReviewRoundedIcon />, path: '/reviews' },
        { text: 'Case Studies', icon: <ArticleRoundedIcon />, path: '/case-studies' },
        { text: 'Admins', icon: <SupervisorAccountRoundedIcon />, path: '/admins' },
        { text: 'Activity Logs', icon: <HistoryRoundedIcon />, path: '/logs' },
        { text: 'Settings', icon: <SettingsRoundedIcon />, path: '/settings' },
    ];

    const currentDrawerWidth = isCollapsed ? collapsedDrawerWidth : drawerWidth;

    const drawer = (
        <Box sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
        }}>
            {/* Logo Section */}
            <Toolbar sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: isCollapsed ? 'center' : 'space-between',
                px: isCollapsed ? 1 : 3,
                minHeight: '72px !important',
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
            }}>
                {!isCollapsed && (
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        animation: 'fadeIn 0.3s ease',
                        '@keyframes fadeIn': {
                            from: { opacity: 0 },
                            to: { opacity: 1 },
                        },
                    }}>
                        <Box
                            component="img"
                            src="/logo.png"
                            alt="Navigant"
                            sx={{ height: 32, width: 'auto' }}
                        />
                        <Box sx={{
                            px: 1,
                            py: 0.25,
                            borderRadius: 1,
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            color: theme.palette.primary.main,
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            letterSpacing: '0.05em',
                        }}>
                            ADMIN
                        </Box>
                    </Box>
                )}
                {isCollapsed && (
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 800,
                            color: theme.palette.primary.main,
                        }}
                    >
                        N
                    </Typography>
                )}
                {!isMobile && (
                    <IconButton
                        onClick={handleCollapseToggle}
                        size="small"
                        sx={{
                            backgroundColor: alpha(theme.palette.primary.main, 0.08),
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.15),
                            },
                        }}
                    >
                        {isCollapsed ? <ChevronRightIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}
                    </IconButton>
                )}
            </Toolbar>

            {/* Navigation Items */}
            <Box sx={{ overflow: 'auto', flexGrow: 1, px: 2, py: 2 }}>
                <List sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {menuItems.map((item, index) => {
                        const isSelected = location.pathname.startsWith(item.path);
                        return (
                            <ListItem
                                key={item.text}
                                disablePadding
                                sx={{
                                    display: 'block',
                                    animation: 'slideInLeft 0.3s ease-out',
                                    animationDelay: `${index * 30}ms`,
                                    animationFillMode: 'both',
                                    '@keyframes slideInLeft': {
                                        from: { opacity: 0, transform: 'translateX(-10px)' },
                                        to: { opacity: 1, transform: 'translateX(0)' },
                                    },
                                }}
                            >
                                <Tooltip title={isCollapsed ? item.text : ""} placement="right" arrow>
                                    <ListItemButton
                                        selected={isSelected}
                                        onClick={() => {
                                            navigate(item.path);
                                            if (isMobile) setMobileOpen(false);
                                        }}
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: isCollapsed ? 'center' : 'initial',
                                            px: 2,
                                            borderRadius: 2,
                                            position: 'relative',
                                            overflow: 'hidden',
                                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                            // Active indicator bar
                                            '&::before': {
                                                content: '""',
                                                position: 'absolute',
                                                left: 0,
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                width: 4,
                                                height: isSelected ? '60%' : 0,
                                                backgroundColor: theme.palette.primary.main,
                                                borderRadius: '0 4px 4px 0',
                                                transition: 'height 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                            },
                                            '&.Mui-selected': {
                                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                                '&:hover': {
                                                    backgroundColor: alpha(theme.palette.primary.main, 0.15),
                                                },
                                            },
                                            '&:hover': {
                                                backgroundColor: alpha(theme.palette.primary.main, 0.06),
                                                '&::before': {
                                                    height: '40%',
                                                },
                                            },
                                        }}
                                    >
                                        <ListItemIcon sx={{
                                            minWidth: 0,
                                            mr: isCollapsed ? 0 : 2,
                                            justifyContent: 'center',
                                            color: isSelected ? theme.palette.primary.main : theme.palette.text.secondary,
                                            transition: 'all 0.2s ease',
                                            transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                                        }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        {!isCollapsed && (
                                            <ListItemText
                                                primary={item.text}
                                                primaryTypographyProps={{
                                                    fontWeight: isSelected ? 600 : 500,
                                                    fontSize: '0.9rem',
                                                    color: isSelected ? theme.palette.primary.main : theme.palette.text.primary,
                                                }}
                                            />
                                        )}
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                        );
                    })}
                </List>
            </Box>

            {/* Logout Button */}
            <Box sx={{
                p: 2,
                borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                backgroundColor: alpha(theme.palette.background.default, 0.5),
            }}>
                <Tooltip title={isCollapsed ? "Logout" : ""} placement="right" arrow>
                    <ListItemButton
                        onClick={handleLogout}
                        sx={{
                            minHeight: 48,
                            justifyContent: isCollapsed ? 'center' : 'initial',
                            px: 2,
                            borderRadius: 2,
                            color: theme.palette.error.main,
                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.error.main, 0.08),
                                transform: 'translateX(4px)',
                            }
                        }}
                    >
                        <ListItemIcon sx={{
                            minWidth: 0,
                            mr: isCollapsed ? 0 : 2,
                            justifyContent: 'center',
                            color: theme.palette.error.main
                        }}>
                            <LogoutRoundedIcon />
                        </ListItemIcon>
                        {!isCollapsed && (
                            <ListItemText
                                primary="Logout"
                                primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem' }}
                            />
                        )}
                    </ListItemButton>
                </Tooltip>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
            <CssBaseline />

            {/* App Bar */}
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    width: { sm: `calc(100% - ${currentDrawerWidth}px)` },
                    ml: { sm: `${currentDrawerWidth}px` },
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                        duration: '300ms',
                    }),
                }}
            >
                <Toolbar sx={{ minHeight: '72px !important' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{
                            mr: 2,
                            display: { sm: 'none' },
                            color: theme.palette.text.primary,
                        }}
                    >
                        <MenuRoundedIcon />
                    </IconButton>

                    <Box sx={{ flexGrow: 1 }} />

                    {/* Action Icons */}
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Notifications" arrow>
                            <IconButton
                                size="large"
                                onClick={() => navigate('/notifications')}
                                sx={{
                                    color: location.pathname === '/notifications'
                                        ? theme.palette.primary.main
                                        : theme.palette.text.secondary,
                                    backgroundColor: location.pathname === '/notifications'
                                        ? alpha(theme.palette.primary.main, 0.1)
                                        : 'transparent',
                                    '&:hover': {
                                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                    },
                                }}
                            >
                                <Badge
                                    badgeContent={unreadCount}
                                    color="error"
                                    sx={{
                                        '& .MuiBadge-badge': {
                                            animation: unreadCount > 0 ? 'pulse 2s infinite' : 'none',
                                            '@keyframes pulse': {
                                                '0%, 100%': { transform: 'scale(1)' },
                                                '50%': { transform: 'scale(1.1)' },
                                            },
                                        },
                                    }}
                                >
                                    <NotificationsActiveIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Profile" arrow>
                            <IconButton
                                onClick={() => navigate('/profile')}
                                size="large"
                                sx={{
                                    color: location.pathname === '/profile'
                                        ? theme.palette.primary.main
                                        : theme.palette.text.secondary,
                                    backgroundColor: location.pathname === '/profile'
                                        ? alpha(theme.palette.primary.main, 0.1)
                                        : 'transparent',
                                    '&:hover': {
                                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                    },
                                }}
                            >
                                <AccountCircleRoundedIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Navigation Drawer */}
            <Box
                component="nav"
                sx={{
                    width: { sm: currentDrawerWidth },
                    flexShrink: { sm: 0 },
                    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
            >
                {/* Mobile Drawer */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            border: 'none',
                        },
                    }}
                >
                    {drawer}
                </Drawer>

                {/* Desktop Drawer */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: currentDrawerWidth,
                            border: 'none',
                            boxShadow: '4px 0 24px rgba(0, 0, 0, 0.04)',
                            transition: theme.transitions.create('width', {
                                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                                duration: '300ms',
                            }),
                            overflowX: 'hidden'
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: { xs: 2, sm: 3 },
                    width: { sm: `calc(100% - ${currentDrawerWidth}px)` },
                    minHeight: '100vh',
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                        duration: '300ms',
                    }),
                }}
            >
                <Toolbar sx={{ minHeight: '72px !important' }} />
                <Box
                    sx={{
                        maxWidth: '1400px',
                        mx: 'auto',
                        animation: 'fadeInUp 0.4s ease-out',
                        '@keyframes fadeInUp': {
                            from: { opacity: 0, transform: 'translateY(20px)' },
                            to: { opacity: 1, transform: 'translateY(0)' },
                        },
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}
