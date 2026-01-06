import { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Stack, MenuItem, Select, FormControl, InputLabel, Skeleton } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import client from '../api/client';
import type { JobPostDTO, JobApplicationResponse, LeadResponse, Page } from '../api/types';

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
    const [stats, setStats] = useState({
        totalJobs: 0,
        activeJobs: 0,
        totalApplications: 0,
        totalLeads: 0,
    });
    const [leadsData, setLeadsData] = useState<{ status: string; count: number }[]>([]);
    const [rawLeads, setRawLeads] = useState<LeadResponse[]>([]);
    const [loading, setLoading] = useState(true);

    // Filter States
    const [selectedYear, setSelectedYear] = useState<string>('all');
    const [selectedMonth, setSelectedMonth] = useState<string>('all');
    const [selectedDay, setSelectedDay] = useState<string>('all');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const jobsRes = await client.get<JobPostDTO[]>('/jobs/admin');
                const totalJobs = jobsRes.data.length;
                const activeJobs = jobsRes.data.filter(j => j.status === 'PUBLISHED').length;

                const appsRes = await client.get<JobApplicationResponse[]>('/admin/applications');
                const totalApplications = appsRes.data.length;

                const leadsRes = await client.get<Page<LeadResponse>>('/admin/leads', {
                    params: { page: 0, size: 1000 }
                });
                const totalLeads = leadsRes.data.totalElements;
                setRawLeads(leadsRes.data.content);

                setStats({ totalJobs, activeJobs, totalApplications, totalLeads });
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    // Filter Logic
    useEffect(() => {
        if (loading) return;

        const filtered = rawLeads.filter(lead => {
            if (!lead.createdAt) return false;
            const date = new Date(lead.createdAt);
            const yearMatch = selectedYear === 'all' || date.getFullYear().toString() === selectedYear;
            const monthMatch = selectedMonth === 'all' || (date.getMonth() + 1).toString() === selectedMonth;
            const dayMatch = selectedDay === 'all' || date.getDate().toString() === selectedDay;
            return yearMatch && monthMatch && dayMatch;
        });

        const statusCounts = filtered.reduce((acc: any, lead) => {
            const status = lead.status || 'NEW';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});

        const chartData = Object.keys(statusCounts).map(status => ({
            status: status.replace('_', ' '),
            count: statusCounts[status]
        }));
        setLeadsData(chartData);

    }, [rawLeads, selectedYear, selectedMonth, selectedDay, loading]);

    // Chart colors for different statuses
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

    if (loading) {
        return (
            <Box>
                <Skeleton variant="text" width={200} height={50} sx={{ mb: 4 }} />
                <Grid container spacing={3}>
                    {[1, 2, 3, 4].map((i) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                            <Skeleton variant="rounded" height={140} sx={{ borderRadius: 4 }} />
                        </Grid>
                    ))}
                    <Grid size={{ xs: 12 }}>
                        <Skeleton variant="rounded" height={400} sx={{ borderRadius: 4, mt: 2 }} />
                    </Grid>
                </Grid>
            </Box>
        );
    }

    return (
        <Box>
            <Typography
                variant="h4"
                sx={{
                    mb: 4,
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                Dashboard
            </Typography>

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
                                // Decorative circle
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: -50,
                                    right: -50,
                                    width: 150,
                                    height: 150,
                                    borderRadius: '50%',
                                    background: alpha(card.color, 0.08),
                                },
                            }}
                        >
                            <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="start">
                                    <Box>
                                        <Typography
                                            variant="overline"
                                            sx={{
                                                color: alpha(card.color, 0.8),
                                                fontWeight: 700,
                                                letterSpacing: '0.1em',
                                                fontSize: '0.7rem',
                                            }}
                                        >
                                            {card.title}
                                        </Typography>
                                        <Typography
                                            variant="h3"
                                            sx={{
                                                fontWeight: 800,
                                                color: card.color,
                                                mt: 1,
                                                lineHeight: 1,
                                            }}
                                        >
                                            <AnimatedCounter value={card.value} />
                                        </Typography>
                                    </Box>
                                    <Box sx={{
                                        p: 1.5,
                                        borderRadius: 3,
                                        background: card.gradient,
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: `0 4px 12px ${alpha(card.color, 0.4)}`,
                                    }}>
                                        {card.icon}
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}

                {/* Leads Chart */}
                <Grid size={{ xs: 12 }}>
                    <Card
                        sx={{
                            borderRadius: 4,
                            mt: 2,
                            boxShadow: 'none',
                            border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                            animation: 'fadeInUp 0.5s ease-out',
                            animationDelay: '400ms',
                            animationFillMode: 'both',
                        }}
                    >
                        <CardContent sx={{ p: 3 }}>
                            <Stack
                                direction={{ xs: 'column', md: 'row' }}
                                justifyContent="space-between"
                                alignItems={{ xs: 'start', md: 'center' }}
                                mb={3}
                                spacing={2}
                            >
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                                        Leads by Status
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 0.5 }}>
                                        Track your lead conversion pipeline
                                    </Typography>
                                </Box>

                                {/* Filters */}
                                <Stack direction="row" spacing={2}>
                                    <FormControl size="small" sx={{ minWidth: 100 }}>
                                        <InputLabel>Year</InputLabel>
                                        <Select
                                            value={selectedYear}
                                            label="Year"
                                            onChange={(e) => {
                                                setSelectedYear(e.target.value);
                                                setSelectedMonth('all');
                                                setSelectedDay('all');
                                            }}
                                            sx={{ borderRadius: 2 }}
                                        >
                                            <MenuItem value="all">All Years</MenuItem>
                                            {[2023, 2024, 2025, 2026].map(year => (
                                                <MenuItem key={year} value={year.toString()}>{year}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl size="small" sx={{ minWidth: 100 }}>
                                        <InputLabel>Month</InputLabel>
                                        <Select
                                            value={selectedMonth}
                                            label="Month"
                                            onChange={(e) => {
                                                setSelectedMonth(e.target.value);
                                                setSelectedDay('all');
                                            }}
                                            disabled={selectedYear === 'all'}
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

                                    <FormControl size="small" sx={{ minWidth: 100 }}>
                                        <InputLabel>Day</InputLabel>
                                        <Select
                                            value={selectedDay}
                                            label="Day"
                                            onChange={(e) => setSelectedDay(e.target.value)}
                                            disabled={selectedYear === 'all' || selectedMonth === 'all'}
                                            sx={{ borderRadius: 2 }}
                                        >
                                            <MenuItem value="all">All</MenuItem>
                                            {selectedYear !== 'all' && selectedMonth !== 'all' && Array.from({ length: new Date(parseInt(selectedYear), parseInt(selectedMonth), 0).getDate() }, (_, i) => (
                                                <MenuItem key={i + 1} value={(i + 1).toString()}>{i + 1}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </Stack>

                            <Box sx={{ height: 350, width: '100%' }}>
                                {leadsData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={leadsData}
                                            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                                        >
                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                vertical={false}
                                                stroke={alpha(theme.palette.divider, 0.5)}
                                            />
                                            <XAxis
                                                dataKey="status"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: theme.palette.text.secondary, fontSize: 12, fontWeight: 500 }}
                                                dy={10}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                                                allowDecimals={false}
                                            />
                                            <Tooltip
                                                cursor={{ fill: alpha(theme.palette.primary.main, 0.05), radius: 8 }}
                                                contentStyle={{
                                                    borderRadius: 12,
                                                    border: 'none',
                                                    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                                                    padding: '12px 16px',
                                                    backgroundColor: '#fff',
                                                }}
                                                labelStyle={{ fontWeight: 600, marginBottom: 4 }}
                                            />
                                            <Bar
                                                dataKey="count"
                                                radius={[8, 8, 0, 0]}
                                                maxBarSize={60}
                                            >
                                                {leadsData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={getBarColor(entry.status)} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <Box
                                        sx={{
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            gap: 2,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                borderRadius: '50%',
                                                backgroundColor: alpha(theme.palette.text.secondary, 0.1),
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <ContactsRoundedIcon sx={{ fontSize: 40, color: theme.palette.text.secondary }} />
                                        </Box>
                                        <Typography variant="body1" color="text.secondary">
                                            No leads data for the selected period
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
