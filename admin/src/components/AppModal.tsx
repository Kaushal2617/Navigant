import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, useMediaQuery, Slide, Fade, Box } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import type { SlideProps } from '@mui/material/Slide';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CropSquareRoundedIcon from '@mui/icons-material/CropSquareRounded';
import FilterNoneRoundedIcon from '@mui/icons-material/FilterNoneRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

// Slide up transition for the modal
const SlideTransition = React.forwardRef(function Transition(
    props: SlideProps,
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface AppModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    onSubmit?: () => void;
    submitLabel?: string;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    actions?: React.ReactNode;
}

export default function AppModal({
    open,
    onClose,
    title,
    children,
    onSubmit,
    submitLabel = "Save",
    maxWidth = "sm",
    actions
}: AppModalProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Window states
    const [isMaximized, setIsMaximized] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    // Reset states when closed
    useEffect(() => {
        if (!open) {
            // Small delay to prevent flickering during exit animation
            const timer = setTimeout(() => {
                setIsMaximized(false);
                setIsMinimized(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [open]);

    const handleMaximize = () => {
        setIsMaximized(!isMaximized);
        setIsMinimized(false);
    };

    const handleMinimize = () => {
        setIsMinimized(!isMinimized);
        // If minimizing, we turn off maximization to allow restoring to normal size
        if (!isMinimized && isMaximized) setIsMaximized(false);
    };

    const isFullScreen = isMobile || isMaximized;

    return (
        <Dialog
            open={open}
            onClose={(_event, reason) => {
                // Prevent closing by clicking backdrop if we want a "window" feel,
                // but standard modal behavior usually allows it.
                // Keeping standard behavior for now.
                if (reason !== 'backdropClick') {
                    onClose();
                }
                // Optional: Allow backdrop click to close
                onClose();
            }}
            maxWidth={isMaximized ? false : maxWidth}
            fullWidth
            fullScreen={isFullScreen}
            TransitionComponent={SlideTransition}
            transitionDuration={{ enter: 300, exit: 200 }}
            hideBackdrop={isMinimized} // Hide backdrop when minimized to allow interaction with background
            sx={{
                '& .MuiDialog-container': {
                    // When minimized, align to bottom-right
                    alignItems: isMinimized ? 'flex-end' : 'center',
                    justifyContent: isMinimized ? 'flex-end' : 'center',
                    pointerEvents: isMinimized ? 'none' : 'auto', // Pass clicks through container when minimized
                }
            }}
            PaperProps={{
                sx: {
                    borderRadius: isFullScreen ? 0 : 4,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    pointerEvents: 'auto', // Re-enable clicks on the modal itself

                    // Resizable support (simplified via CSS)
                    resize: (!isFullScreen && !isMinimized) ? 'both' : 'none',
                    minWidth: 400,
                    minHeight: isMinimized ? 'auto' : 200,

                    // Minimized state styles
                    ...(isMinimized && {
                        m: 3, // Margin from edges
                        width: 300,
                        position: 'fixed',
                        bottom: 24,
                        right: 24,
                        borderRadius: 3,
                        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                    })
                }
            }}
            slotProps={{
                backdrop: {
                    sx: {
                        backdropFilter: 'blur(8px)',
                        backgroundColor: 'rgba(15, 23, 42, 0.6)',
                        transition: 'all 0.3s ease',
                    }
                }
            }}
        >
            {/* Header with Gradient */}
            <DialogTitle sx={{
                m: 0,
                p: 0,
                position: 'relative',
                background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                color: 'white',
                cursor: 'default', // Ideally draggable here
                overflow: 'hidden',
            }}>
                {/* Decorative circles - Simplified */}
                <Box sx={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />

                {/* Title content & Controls */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 1.5,
                    pl: 2.5,
                    position: 'relative',
                    zIndex: 1,
                }}>
                    <Box component="span" sx={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.01em', userSelect: 'none' }}>
                        {title}
                    </Box>

                    {/* Window Controls */}
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                        {/* Minimize Button */}
                        <IconButton
                            onClick={handleMinimize}
                            size="small"
                            sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
                        >
                            <RemoveRoundedIcon fontSize="small" />
                        </IconButton>

                        {/* Maximize/Restore Button (Hidden on mobile) */}
                        {!isMobile && (
                            <IconButton
                                onClick={handleMaximize}
                                size="small"
                                sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
                            >
                                {isMaximized ? <FilterNoneRoundedIcon fontSize="small" sx={{ fontSize: 16 }} /> : <CropSquareRoundedIcon fontSize="small" />}
                            </IconButton>
                        )}

                        {/* Close Button */}
                        <IconButton
                            onClick={onClose}
                            size="small"
                            sx={{
                                color: 'rgba(255,255,255,0.9)',
                                '&:hover': { backgroundColor: '#EF4444', color: 'white' }
                            }}
                        >
                            <CloseRoundedIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
            </DialogTitle>

            {/* Content (Hidden if minimized) */}
            <Box sx={{
                display: isMinimized ? 'none' : 'flex',
                flexDirection: 'column',
                height: isMaximized ? '100%' : '100%', // Use 100% to fill the Dialog/Paper
                maxHeight: isMaximized ? 'none' : 'calc(100vh - 64px)', // Constraint for non-maximized
                overflow: 'hidden', // Contain scrolling to DialogContent
                opacity: isMinimized ? 0 : 1,
                transition: 'opacity 0.2s ease',
            }}>
                <DialogContent
                    dividers
                    sx={{
                        p: 3,
                        borderTop: 'none',
                        backgroundColor: '#FAFAFA',
                        flex: 1, // Fill available space
                        overflowY: 'auto', // Enable scrolling
                        '&.MuiDialogContent-dividers': {
                            borderTop: 'none',
                            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                        },
                    }}
                >
                    <Fade in={!isMinimized} timeout={400}>
                        <Box>
                            {children}
                        </Box>
                    </Fade>
                </DialogContent>

                {/* Actions */}
                <DialogActions sx={{ p: 2.5, backgroundColor: '#FFFFFF', gap: 1, flexShrink: 0 }}>
                    {actions ? actions : (
                        <>
                            <Button
                                onClick={onClose}
                                variant="outlined"
                                sx={{
                                    borderRadius: 2.5, textTransform: 'none', fontWeight: 600, px: 3,
                                    borderColor: alpha(theme.palette.divider, 0.5), color: theme.palette.text.secondary,
                                    '&:hover': { borderColor: theme.palette.text.secondary, backgroundColor: alpha(theme.palette.text.secondary, 0.04) },
                                }}
                            >
                                Cancel
                            </Button>
                            {onSubmit && (
                                <Button
                                    onClick={onSubmit}
                                    variant="contained"
                                    sx={{
                                        borderRadius: 2.5, textTransform: 'none', fontWeight: 600, px: 3,
                                        background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                                        boxShadow: '0 4px 14px rgba(220, 38, 38, 0.3)',
                                        '&:hover': { boxShadow: '0 6px 20px rgba(220, 38, 38, 0.4)', transform: 'translateY(-1px)' },
                                        '&:active': { transform: 'translateY(0) scale(0.98)' },
                                    }}
                                >
                                    {submitLabel}
                                </Button>
                            )}
                        </>
                    )}
                </DialogActions>
            </Box>
        </Dialog>
    );
}
