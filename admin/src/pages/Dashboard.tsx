import { useEffect, useState, useMemo } from 'react';
import { Box, Grid, Card, CardContent, Typography, Stack, Skeleton, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import client from '../api/client';
import type { DashboardStatsResponse } from '../api/types';

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 1000 }: { value: number; duration?: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (value === 0) {
            setCount(0);
            return;
        }

        let startTime: number;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * value));
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    }, [value, duration]);

    return <>{count}</>;
};

export default function Dashboard() {
    const theme = useTheme();
    const [stats, setStats] = useState<DashboardStatsResponse | null>(null);
    const [loading, setLoading] = useState(true);

    // Filter State
    const [selectedYear, setSelectedYear] = useState<string>('all');
    const [selectedMonth, setSelectedMonth] = useState<string>('all');
    const [selectedDay, setSelectedDay] = useState<string>('all');

    // Chart Swap State
    const [primaryChart, setPrimaryChart] = useState<'applications' | 'leads'>('applications');

    // Reset child filters when parent filter changes
    const handleYearChange = (year: string) => {
        setSelectedYear(year);
        setSelectedMonth('all');
        setSelectedDay('all');
    };

    const handleMonthChange = (month: string) => {
        setSelectedMonth(month);
        setSelectedDay('all');
    };

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const params: any = {};
                if (selectedYear !== 'all') params.year = selectedYear;
                if (selectedMonth !== 'all') params.month = selectedMonth;
                if (selectedDay !== 'all') params.day = selectedDay;

                const res = await client.get<DashboardStatsResponse>('/admin/dashboard/stats', { params });
                setStats(res.data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [selectedYear, selectedMonth, selectedDay]);

    // Derived Data
    const daysInMonth = useMemo(() => {
        if (selectedYear === 'all' || selectedMonth === 'all') return [];
        const days = new Date(parseInt(selectedYear), parseInt(selectedMonth), 0).getDate();
        return Array.from({ length: days }, (_, i) => i + 1);
    }, [selectedYear, selectedMonth]);

    const formattedTrendData = useMemo(() => {
        if (!stats?.applicationsOverTime) return [];

        return stats.applicationsOverTime.map((d: { date: string; count: number }) => {
            let label = d.date;

            // Backend returns different keys based on granularity:
            // Year view: "YYYY-MM" -> Label "Jan"
            // Month view: "YYYY-MM-DD" -> Label "Jan 01"
            // Day view: "HH:00" -> Key is literally HH:00. Backend sends "09:00". Date parsing might fail if just time.

            if (d.date.includes(':')) {
                // Hourly View (key is "HH:00")
                label = d.date; // Use as is, "09:00"
            } else if (d.date.length === 7) {
                // Monthly View (key is "YYYY-MM")
                // Append -01 to make it parseable
                label = new Date(d.date + '-01').toLocaleDateString('default', { month: 'short' });
            } else {
                // Daily View (key is "YYYY-MM-DD")
                label = new Date(d.date).toLocaleDateString('default', { month: 'short', day: 'numeric' });
            }

            return { ...d, label }; // Use 'label' for XAxis
        });
    }, [stats]);


    // Prepare Charts Data
    const leadsData = stats ? Object.keys(stats.leadsByStatus).map(status => ({
        status: status.replace('_', ' '),
        count: stats.leadsByStatus[status]
    })) : [];

    // Chart colors
    const getBarColor = (status: string) => {
        const colors: { [key: string]: string } = {
            'NEW': '#3B82F6',
            'CONTACTED': '#8B5CF6',
            'IN PROGRESS': '#F59E0B',
            'QUALIFIED': '#10B981',
            'CONVERTED': '#059669',
            'LOST': '#EF4444',
        };
        return colors[status.toUpperCase()] || theme.palette.primary.main;
    };

    if (loading || !stats) {
        return (
            <Box>
                <Skeleton variant="text" width={200} height={50} sx={{ mb: 4 }} />
                <Grid container spacing={3}>
                    {[1, 2, 3, 4].map((i) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                            <Skeleton variant="rounded" height={140} sx={{ borderRadius: 4 }} />
                        </Grid>
                    ))}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Skeleton variant="rounded" height={400} sx={{ borderRadius: 4, mt: 2 }} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Skeleton variant="rounded" height={400} sx={{ borderRadius: 4, mt: 2 }} />
                    </Grid>
                </Grid>
            </Box>
        );
    }

    const statCards = [
        {
            title: 'Total Jobs',
            value: stats.totalJobs,
            icon: <WorkRoundedIcon sx={{ fontSize: 28 }} />,
            color: '#3B82F6',
            gradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
            lightGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(29, 78, 216, 0.05) 100%)',
        },
        {
            title: 'Active Jobs',
            value: stats.activeJobs,
            icon: <TrendingUpRoundedIcon sx={{ fontSize: 28 }} />,
            color: '#10B981',
            gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            lightGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)',
        },
        {
            title: 'Applications',
            value: stats.totalApplications,
            icon: <DescriptionRoundedIcon sx={{ fontSize: 28 }} />,
            color: '#F59E0B',
            gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            lightGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.05) 100%)',
        },
        {
            title: 'Total Leads',
            value: stats.totalLeads,
            icon: <ContactsRoundedIcon sx={{ fontSize: 28 }} />,
            color: '#8B5CF6',
            gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
            lightGradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.05) 100%)',
        },
    ];

    const isAppsPrimary = primaryChart === 'applications';

    return (
        <Box>
            <Stack direction={{ xs: 'column', lg: 'row' }} justifyContent="space-between" alignItems="center" mb={4} spacing={2}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mr: 'auto'
                    }}
                >
                    Analytics Dashboard
                </Typography>

                <Stack direction="row" spacing={2} sx={{ width: { xs: '100%', lg: 'auto' } }}>
                    <FormControl size="small" sx={{ minWidth: 100 }}>
                        <InputLabel>Year</InputLabel>
                        <Select
                            value={selectedYear}
                            label="Year"
                            onChange={(e) => handleYearChange(e.target.value)}
                            sx={{ borderRadius: 2 }}
                        >
                            <MenuItem value="all">All Time</MenuItem>
                            <MenuItem value="2026">2026</MenuItem>
                            <MenuItem value="2025">2025</MenuItem>
                            <MenuItem value="2024">2024</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 100 }} disabled={selectedYear === 'all'}>
                        <InputLabel>Month</InputLabel>
                        <Select
                            value={selectedMonth}
                            label="Month"
                            onChange={(e) => handleMonthChange(e.target.value)}
                            sx={{ borderRadius: 2 }}
                        >
                            <MenuItem value="all">All</MenuItem>
                            {Array.from({ length: 12 }, (_, i) => (
                                <MenuItem key={i + 1} value={(i + 1).toString()}>
                                    {new Date(0, i).toLocaleString('default', { month: 'short' })}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 80 }} disabled={selectedMonth === 'all'}>
                        <InputLabel>Day</InputLabel>
                        <Select
                            value={selectedDay}
                            label="Day"
                            onChange={(e) => setSelectedDay(e.target.value)}
                            sx={{ borderRadius: 2 }}
                        >
                            <MenuItem value="all">All</MenuItem>
                            {daysInMonth.map(day => (
                                <MenuItem key={day} value={day.toString()}>{day}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            </Stack>

            <Grid container spacing={3}>
                {statCards.map((card, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                        <Card
                            sx={{
                                borderRadius: 4,
                                height: '100%',
                                background: card.lightGradient,
                                border: `1px solid ${alpha(card.color, 0.15)}`,
                                boxShadow: 'none',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                animation: 'fadeInUp 0.5s ease-out',
                                animationDelay: `${index * 100}ms`,
                                animationFillMode: 'both',
                                '@keyframes fadeInUp': {
                                    from: { opacity: 0, transform: 'translateY(20px)' },
                                    to: { opacity: 1, transform: 'translateY(0)' },
                                },
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: `0 20px 40px ${alpha(card.color, 0.2)}`,
                                    border: `1px solid ${alpha(card.color, 0.3)}`,
                                },
                            }}
                        >
                            <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="start">
                                    <Box>
                                        <Typography variant="overline" sx={{ color: alpha(card.color, 0.8), fontWeight: 700, letterSpacing: '0.1em' }}>
                                            {card.title}
                                        </Typography>
                                        <Typography variant="h3" sx={{ fontWeight: 800, color: card.color, mt: 1, lineHeight: 1 }}>
                                            <AnimatedCounter value={card.value} />
                                        </Typography>
                                    </Box>
                                    <Box sx={{
                                        p: 1.5, borderRadius: 3, background: card.gradient, color: 'white',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        boxShadow: `0 4px 12px ${alpha(card.color, 0.4)}`,
                                    }}>
                                        {card.icon}
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}

                {/* Applications Trend Chart (Line) */}
                <Grid
                    size={{ xs: 12, md: isAppsPrimary ? 8 : 4 }}
                    order={{ xs: 1, md: isAppsPrimary ? 1 : 2 }}
                >
                    <Card
                        onClick={() => !isAppsPrimary && setPrimaryChart('applications')}
                        sx={{
                            borderRadius: 4,
                            height: 400,
                            boxShadow: 'none',
                            border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                            cursor: isAppsPrimary ? 'default' : 'pointer',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                boxShadow: isAppsPrimary ? 'none' : `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
                                transform: isAppsPrimary ? 'none' : 'scale(1.01)'
                            }
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                                Applications Trend <Typography component="span" variant="body2" color="text.secondary">
                                    {selectedYear !== 'all' ? `(${selectedYear}${selectedMonth !== 'all' ? `/${selectedMonth}` : ''})` : '(Last 7 Days)'}
                                </Typography>
                            </Typography>
                            <ResponsiveContainer width="100%" height={320}>
                                <LineChart data={formattedTrendData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={alpha(theme.palette.divider, 0.5)} />
                                    <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} allowDecimals={false} />
                                    <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
                                    <Line type="monotone" dataKey="count" stroke={theme.palette.primary.main} strokeWidth={3} dot={{ r: 4, fill: theme.palette.primary.main }} activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Leads Status Chart (Bar) */}
                <Grid
                    size={{ xs: 12, md: isAppsPrimary ? 4 : 8 }}
                    order={{ xs: 2, md: isAppsPrimary ? 2 : 1 }}
                >
                    <Card
                        onClick={() => isAppsPrimary && setPrimaryChart('leads')}
                        sx={{
                            borderRadius: 4,
                            height: 400,
                            boxShadow: 'none',
                            border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                            cursor: !isAppsPrimary ? 'default' : 'pointer',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                boxShadow: !isAppsPrimary ? 'none' : `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
                                transform: !isAppsPrimary ? 'none' : 'scale(1.01)'
                            }
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Leads Pipeline</Typography>
                            <ResponsiveContainer width="100%" height={320}>
                                <BarChart data={leadsData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={alpha(theme.palette.divider, 0.5)} />
                                    <XAxis dataKey="status" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} interval={0} angle={-45} textAnchor="end" height={60} />
                                    <YAxis axisLine={false} tickLine={false} allowDecimals={false} />
                                    <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
                                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                        {leadsData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={getBarColor(entry.status)} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
