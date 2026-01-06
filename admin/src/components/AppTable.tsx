import React from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Card, Typography, TablePagination, Fade, Skeleton
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

// Column definition type
export interface TableColumn<T> {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'left' | 'center' | 'right';
    render?: (row: T, index: number) => React.ReactNode;
}

// Table props
interface AppTableProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    keyExtractor: (row: T) => string;

    // Optional features
    loading?: boolean;
    emptyIcon?: React.ReactNode;
    emptyTitle?: string;
    emptySubtitle?: string;
    emptyAction?: React.ReactNode;

    // Pagination (optional)
    pagination?: {
        page: number;
        rowsPerPage: number;
        totalCount: number;
        onPageChange: (page: number) => void;
        onRowsPerPageChange: (rowsPerPage: number) => void;
        rowsPerPageOptions?: number[];
    };

    // Row click handler (optional)
    onRowClick?: (row: T) => void;

    // Custom row styles (optional)
    getRowStyle?: (row: T) => object;
}

export default function AppTable<T>({
    columns,
    data,
    keyExtractor,
    loading = false,
    emptyIcon,
    emptyTitle = 'No data available',
    emptySubtitle,
    emptyAction,
    pagination,
    onRowClick,
    getRowStyle,
}: AppTableProps<T>) {
    const theme = useTheme();

    // Loading skeleton rows
    if (loading) {
        return (
            <Card sx={{
                borderRadius: 3,
                boxShadow: 'none',
                border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                overflow: 'hidden',
            }}>
                <TableContainer component={Paper} elevation={0}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{
                                background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
                            }}>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align || 'left'}
                                        sx={{
                                            color: 'white',
                                            fontWeight: 600,
                                            py: 2,
                                            minWidth: column.minWidth,
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <TableRow key={i}>
                                    {columns.map((column) => (
                                        <TableCell key={column.id}>
                                            <Skeleton
                                                variant="text"
                                                width={column.minWidth || 100}
                                                height={24}
                                            />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        );
    }

    return (
        <Card sx={{
            borderRadius: 3,
            boxShadow: 'none',
            border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
            overflow: 'hidden',
        }}>
            <TableContainer component={Paper} elevation={0}>
                <Table>
                    {/* Table Header */}
                    <TableHead>
                        <TableRow sx={{
                            background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
                        }}>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align || 'left'}
                                    sx={{
                                        color: 'white',
                                        fontWeight: 600,
                                        py: 2,
                                        minWidth: column.minWidth,
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    {/* Table Body */}
                    <TableBody>
                        {data.length === 0 ? (
                            // Empty State
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    sx={{ py: 8, textAlign: 'center' }}
                                >
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 2,
                                    }}>
                                        {emptyIcon && (
                                            <Box
                                                sx={{
                                                    width: 80,
                                                    height: 80,
                                                    borderRadius: '50%',
                                                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                {emptyIcon}
                                            </Box>
                                        )}
                                        <Typography variant="h6" color="text.secondary">
                                            {emptyTitle}
                                        </Typography>
                                        {emptySubtitle && (
                                            <Typography variant="body2" color="text.secondary">
                                                {emptySubtitle}
                                            </Typography>
                                        )}
                                        {emptyAction}
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : (
                            // Data Rows with staggered animation
                            data.map((row, index) => (
                                <Fade
                                    in
                                    key={keyExtractor(row)}
                                    style={{ transitionDelay: `${index * 30}ms` }}
                                >
                                    <TableRow
                                        hover
                                        onClick={onRowClick ? () => onRowClick(row) : undefined}
                                        sx={{
                                            cursor: onRowClick ? 'pointer' : 'default',
                                            transition: 'background-color 0.15s ease',
                                            '&:hover': {
                                                backgroundColor: alpha(theme.palette.primary.main, 0.02),
                                            },
                                            '&:last-child td': { borderBottom: 0 },
                                            ...(getRowStyle ? getRowStyle(row) : {}),
                                        }}
                                    >
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align || 'left'}
                                            >
                                                {column.render
                                                    ? column.render(row, index)
                                                    : (row as any)[column.id]
                                                }
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </Fade>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            {pagination && data.length > 0 && (
                <TablePagination
                    rowsPerPageOptions={pagination.rowsPerPageOptions || [5, 10, 25]}
                    component="div"
                    count={pagination.totalCount}
                    rowsPerPage={pagination.rowsPerPage}
                    page={pagination.page}
                    onPageChange={(_, newPage) => pagination.onPageChange(newPage)}
                    onRowsPerPageChange={(e) => {
                        pagination.onRowsPerPageChange(parseInt(e.target.value, 10));
                    }}
                    sx={{
                        borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                    }}
                />
            )}
        </Card>
    );
}

// ============================================
// Common Status Chip Component
// ============================================

import { Chip } from '@mui/material';

interface StatusChipProps {
    label: string;
    colorMap?: Record<string, { bg: string; color: string }>;
}

// Default status colors
const defaultStatusColors: Record<string, { bg: string; color: string }> = {
    // General statuses
    'NEW': { bg: 'rgba(59, 130, 246, 0.1)', color: '#2563EB' },
    'ACTIVE': { bg: 'rgba(16, 185, 129, 0.1)', color: '#059669' },
    'INACTIVE': { bg: 'rgba(100, 116, 139, 0.1)', color: '#475569' },

    // Job statuses
    'PUBLISHED': { bg: 'rgba(16, 185, 129, 0.1)', color: '#059669' },
    'DRAFT': { bg: 'rgba(245, 158, 11, 0.1)', color: '#D97706' },
    'ARCHIVED': { bg: 'rgba(100, 116, 139, 0.1)', color: '#475569' },

    // Job types
    'FULL_TIME': { bg: 'rgba(59, 130, 246, 0.1)', color: '#2563EB' },
    'PART_TIME': { bg: 'rgba(139, 92, 246, 0.1)', color: '#7C3AED' },
    'CONTRACT': { bg: 'rgba(236, 72, 153, 0.1)', color: '#DB2777' },
    'INTERNSHIP': { bg: 'rgba(20, 184, 166, 0.1)', color: '#0D9488' },

    // Lead statuses
    'CONTACTED': { bg: 'rgba(139, 92, 246, 0.1)', color: '#7C3AED' },
    'IN_PROGRESS': { bg: 'rgba(245, 158, 11, 0.1)', color: '#D97706' },
    'QUALIFIED': { bg: 'rgba(6, 182, 212, 0.1)', color: '#0891B2' },
    'CONVERTED': { bg: 'rgba(16, 185, 129, 0.1)', color: '#059669' },
    'LOST': { bg: 'rgba(239, 68, 68, 0.1)', color: '#DC2626' },

    // Application statuses
    'PENDING': { bg: 'rgba(245, 158, 11, 0.1)', color: '#D97706' },
    'REVIEWED': { bg: 'rgba(59, 130, 246, 0.1)', color: '#2563EB' },
    'SHORTLISTED': { bg: 'rgba(139, 92, 246, 0.1)', color: '#7C3AED' },
    'INTERVIEW': { bg: 'rgba(6, 182, 212, 0.1)', color: '#0891B2' },
    'OFFERED': { bg: 'rgba(16, 185, 129, 0.1)', color: '#059669' },
    'HIRED': { bg: 'rgba(5, 150, 105, 0.1)', color: '#047857' },
    'REJECTED': { bg: 'rgba(239, 68, 68, 0.1)', color: '#DC2626' },

    // Review statuses  
    'APPROVED': { bg: 'rgba(16, 185, 129, 0.1)', color: '#059669' },
};

export function StatusChip({ label, colorMap }: StatusChipProps) {
    const normalizedLabel = label.toUpperCase().replace(/ /g, '_');
    const colors = colorMap || defaultStatusColors;
    const style = colors[normalizedLabel] || { bg: 'rgba(100, 116, 139, 0.1)', color: '#475569' };

    return (
        <Chip
            label={label.replace(/_/g, ' ')}
            size="small"
            sx={{
                backgroundColor: style.bg,
                color: style.color,
                fontWeight: 600,
                fontSize: '0.75rem',
            }}
        />
    );
}

// ============================================
// Table Action Buttons
// ============================================

import { IconButton, Stack, Tooltip } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';

interface TableActionsProps {
    onView?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

export function TableActions({ onView, onEdit, onDelete }: TableActionsProps) {
    const theme = useTheme();

    return (
        <Stack direction="row" spacing={0.5} justifyContent="center">
            {onView && (
                <Tooltip title="View" arrow>
                    <IconButton
                        onClick={(e) => { e.stopPropagation(); onView(); }}
                        size="small"
                        sx={{
                            color: theme.palette.info.main,
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.info.main, 0.1),
                            },
                        }}
                    >
                        <VisibilityRoundedIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            )}
            {onEdit && (
                <Tooltip title="Edit" arrow>
                    <IconButton
                        onClick={(e) => { e.stopPropagation(); onEdit(); }}
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
                </Tooltip>
            )}
            {onDelete && (
                <Tooltip title="Delete" arrow>
                    <IconButton
                        onClick={(e) => { e.stopPropagation(); onDelete(); }}
                        size="small"
                        sx={{
                            color: theme.palette.error.main,
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.error.main, 0.1),
                            },
                        }}
                    >
                        <DeleteRoundedIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            )}
        </Stack>
    );
}
