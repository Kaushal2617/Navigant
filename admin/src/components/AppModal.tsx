import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, useMediaQuery, Slide, Fade, Box } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import type { SlideProps } from '@mui/material/Slide';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

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
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={maxWidth}
            fullWidth
            fullScreen={fullScreen}
            TransitionComponent={SlideTransition}
            transitionDuration={{ enter: 300, exit: 200 }}
            PaperProps={{
                sx: {
                    borderRadius: fullScreen ? 0 : 4,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    overflow: 'hidden',
                    animation: 'scaleIn 0.3s ease-out',
                    '@keyframes scaleIn': {
                        from: { opacity: 0, transform: 'scale(0.95)' },
                        to: { opacity: 1, transform: 'scale(1)' },
                    },
                }
            }}
            slotProps={{
                backdrop: {
                    sx: {
                        backdropFilter: 'blur(8px)',
                        backgroundColor: 'rgba(15, 23, 42, 0.6)',
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
                overflow: 'hidden',
            }}>
                {/* Decorative circles */}
                <Box sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                }} />
                <Box sx={{
                    position: 'absolute',
                    bottom: -30,
                    left: '30%',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.05)',
                }} />

                {/* Title content */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2.5,
                    position: 'relative',
                    zIndex: 1,
                }}>
                    <Box
                        component="span"
                        sx={{
                            fontWeight: 700,
                            fontSize: '1.25rem',
                            letterSpacing: '-0.01em',
                        }}
                    >
                        {title}
                    </Box>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            color: 'rgba(255,255,255,0.9)',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                transform: 'rotate(90deg)',
                            }
                        }}
                    >
                        <CloseRoundedIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            {/* Content */}
            <DialogContent
                dividers
                sx={{
                    p: 3,
                    borderTop: 'none',
                    backgroundColor: '#FAFAFA',
                    '&.MuiDialogContent-dividers': {
                        borderTop: 'none',
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                    },
                }}
            >
                <Fade in={open} timeout={400}>
                    <Box>
                        {children}
                    </Box>
                </Fade>
            </DialogContent>

            {/* Actions */}
            <DialogActions sx={{
                p: 2.5,
                backgroundColor: '#FFFFFF',
                gap: 1,
            }}>
                {actions ? actions : (
                    <>
                        <Button
                            onClick={onClose}
                            variant="outlined"
                            sx={{
                                borderRadius: 2.5,
                                textTransform: 'none',
                                fontWeight: 600,
                                px: 3,
                                borderColor: alpha(theme.palette.divider, 0.5),
                                color: theme.palette.text.secondary,
                                '&:hover': {
                                    borderColor: theme.palette.text.secondary,
                                    backgroundColor: alpha(theme.palette.text.secondary, 0.04),
                                },
                            }}
                        >
                            Cancel
                        </Button>
                        {onSubmit && (
                            <Button
                                onClick={onSubmit}
                                variant="contained"
                                sx={{
                                    borderRadius: 2.5,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    px: 3,
                                    background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                                    boxShadow: '0 4px 14px rgba(220, 38, 38, 0.3)',
                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '&:hover': {
                                        boxShadow: '0 6px 20px rgba(220, 38, 38, 0.4)',
                                        transform: 'translateY(-1px)',
                                    },
                                    '&:active': {
                                        transform: 'translateY(0) scale(0.98)',
                                    },
                                }}
                            >
                                {submitLabel}
                            </Button>
                        )}
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
}
