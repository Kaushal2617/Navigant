import { useEffect, useState } from 'react';
import {
    Box, Typography, Button, TextField, Snackbar, Alert, Stack,
    MenuItem, Select, FormControl, IconButton
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import client from '../api/client';
import type { CaseStudyResponse, CaseStudyRequest } from '../api/types';
import AppTable, { StatusChip, TableActions, type TableColumn } from '../components/AppTable';
import AppModal from '../components/AppModal';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CaseStudies() {
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'clean']
        ],
        clipboard: {
            matchVisual: false,
        }
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet',
        'link'
    ];
    const theme = useTheme();
    const [caseStudies, setCaseStudies] = useState<CaseStudyResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<CaseStudyResponse | null>(null);
    const [formData, setFormData] = useState<CaseStudyRequest>({
        title: '', description: '', fullContent: '', image: '', category: '', alt: '', order: 0
    });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await client.get<CaseStudyResponse[]>('/admin/case-studies');
            setCaseStudies(res.data);
        } catch (error) {
            console.error('Failed to fetch case studies', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async () => {
        try {
            if (editingItem) {
                await client.put(`/admin/case-studies/${editingItem.id}`, {
                    ...formData, status: editingItem.status
                });
                setSnackbar({ open: true, message: 'Case study updated', severity: 'success' });
            } else {
                await client.post('/admin/case-studies', formData);
                setSnackbar({ open: true, message: 'Case study created', severity: 'success' });
            }
            setModalOpen(false);
            resetForm();
            fetchData();
        } catch (error) {
            console.error('Failed to save case study', error);
            setSnackbar({ open: true, message: 'Operation failed', severity: 'error' });
        }
    };

    const handleStatusChange = async (id: string, status: string) => {
        const item = caseStudies.find(c => c.id === id);
        if (!item) return;
        try {
            await client.put(`/admin/case-studies/${id}`, { ...item, status });
            fetchData();
        } catch (error) {
            console.error('Failed to update status', error);
            setSnackbar({ open: true, message: 'Status update failed', severity: 'error' });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this case study?')) return;
        try {
            await client.delete(`/admin/case-studies/${id}`);
            setSnackbar({ open: true, message: 'Deleted', severity: 'success' });
            fetchData();
        } catch (error) {
            console.error('Failed to delete case study', error);
            setSnackbar({ open: true, message: 'Delete failed', severity: 'error' });
        }
    };

    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const uploadData = new FormData();
        uploadData.append('file', file);

        try {
            // Using generic admin upload endpoint
            const res = await client.post<{ url: string }>('/admin/upload/image', uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setFormData(prev => ({ ...prev, image: res.data.url }));
            setSnackbar({ open: true, message: 'Image uploaded successfully', severity: 'success' });
        } catch (error) {
            console.error('Upload failed', error);
            setSnackbar({ open: true, message: 'Image upload failed', severity: 'error' });
        } finally {
            setUploading(false);
        }
    };

    const resetForm = () => {
        setFormData({ title: '', description: '', fullContent: '', image: '', category: '', alt: '', order: 0, publishDate: '' });
        setEditingItem(null);
    };

    const openEdit = (item: CaseStudyResponse) => {
        setEditingItem(item);
        setFormData({
            title: item.title, description: item.description, fullContent: item.fullContent || '',
            image: item.image || '', category: item.category, alt: item.alt || '', order: item.order || 0,
            publishDate: item.publishDate || ''
        });
        setModalOpen(true);
    };

    const columns: TableColumn<CaseStudyResponse>[] = [
        {
            id: 'title', label: 'Title', minWidth: 200, render: (row) => (
                <Box>
                    <Typography variant="body2" fontWeight={600}>{row.title}</Typography>
                    <Typography variant="caption" color="text.secondary">{row.category}</Typography>
                </Box>
            )
        },
        {
            id: 'status', label: 'Status', minWidth: 120, render: (row) => (
                <FormControl size="small" fullWidth>
                    <Select
                        value={row.status}
                        onChange={(e) => handleStatusChange(row.id, e.target.value)}
                        sx={{
                            borderRadius: 2,
                            fontSize: '0.875rem',
                            '& .MuiSelect-select': { py: 0.5, px: 1.5 }
                        }}
                    >
                        <MenuItem value="DRAFT">
                            <StatusChip label="Draft" />
                        </MenuItem>
                        <MenuItem value="PUBLISHED">
                            <StatusChip label="Published" />
                        </MenuItem>
                        <MenuItem value="ARCHIVED">
                            <StatusChip label="Archived" />
                        </MenuItem>
                    </Select>
                </FormControl>
            )
        },
        {
            id: 'order', label: 'Order', minWidth: 80, render: (row) => (
                <Typography variant="body2">{row.order || '-'}</Typography>
            )
        },
        {
            id: 'publishDate', label: 'Published', minWidth: 100, render: (row) => (
                <Typography variant="body2" color="text.secondary">
                    {row.publishDate ? new Date(row.publishDate).toLocaleDateString() : '-'}
                </Typography>
            )
        },
        {
            id: 'actions', label: 'Actions', align: 'center', minWidth: 100, render: (row) => (
                <TableActions onEdit={() => openEdit(row)} onDelete={() => handleDelete(row.id)} />
            )
        },
    ];

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Box>
                    <Typography variant="h4" sx={{
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                    }}>
                        Case Studies
                    </Typography>
                    <Typography variant="body2" color="text.secondary">Manage case studies and customer stories</Typography>
                </Box>
                <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => { resetForm(); setModalOpen(true); }}
                    sx={{ background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)', borderRadius: 3 }}>
                    Add Case Study
                </Button>
            </Stack>

            <AppTable columns={columns} data={caseStudies} keyExtractor={(row) => row.id} loading={loading}
                emptyIcon={<ArticleRoundedIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />}
                emptyTitle="No case studies" emptySubtitle="Create your first case study" />

            <AppModal open={modalOpen} onClose={() => setModalOpen(false)}
                title={editingItem ? 'Edit Case Study' : 'New Case Study'}
                onSubmit={handleSubmit} submitLabel={editingItem ? 'Update' : 'Create'}>
                <Stack spacing={2.5}>
                    <TextField label="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} fullWidth required />
                    <TextField label="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} fullWidth required />

                    <Box>
                        <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary', ml: 1 }}>Description *</Typography>
                        <ReactQuill
                            theme="snow"
                            value={formData.description}
                            onChange={(content: string) => setFormData({ ...formData, description: content })}
                            modules={modules}
                            formats={formats}
                            style={{ height: '100px', marginBottom: '50px' }}
                        />
                    </Box>

                    <Box>
                        <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary', ml: 1 }}>Full Content</Typography>
                        <ReactQuill
                            theme="snow"
                            value={formData.fullContent || ''}
                            onChange={(content: string) => setFormData({ ...formData, fullContent: content })}
                            modules={modules}
                            formats={formats}
                            style={{ height: '200px', marginBottom: '50px' }}
                        />
                    </Box>
                    {/* Image Upload */}
                    <Box>
                        <Typography variant="subtitle2" gutterBottom>Case Study Image</Typography>
                        <Stack direction="row" spacing={2} alignItems="center">
                            {formData.image && (
                                <Box component="img" src={formData.image} alt="Preview"
                                    sx={{ width: 100, height: 60, objectFit: 'cover', borderRadius: 2, border: `1px solid ${theme.palette.divider}` }} />
                            )}
                            <Button variant="outlined" component="label" disabled={uploading}
                                sx={{ borderRadius: 2, textTransform: 'none' }}>
                                {uploading ? 'Uploading...' : 'Upload Image'}
                                <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                            </Button>
                            {formData.image && (
                                <IconButton size="small" color="error" onClick={() => setFormData({ ...formData, image: '' })}>
                                    <CloseRoundedIcon fontSize="small" />
                                </IconButton>
                            )}
                        </Stack>
                        <Typography variant="caption" color="text.secondary">
                            Supported: JPG, PNG, WEBP. Max size: 5MB.
                        </Typography>
                    </Box>

                    {/* Additional Fields */}
                    <Stack direction="row" spacing={2}>
                        <TextField
                            label="Publish Date"
                            type="datetime-local"
                            value={formData.publishDate ? new Date(formData.publishDate).toISOString().slice(0, 16) : ''}
                            onChange={(e) => {
                                const val = e.target.value;
                                setFormData({ ...formData, publishDate: val ? new Date(val).toISOString() : '' });
                            }}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField label="Display Order" type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })} fullWidth />
                    </Stack>
                    <TextField label="Image Alt Text" value={formData.alt} onChange={(e) => setFormData({ ...formData, alt: e.target.value })} fullWidth />
                </Stack>
            </AppModal>

            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity={snackbar.severity} sx={{ borderRadius: 3 }}>{snackbar.message}</Alert>
            </Snackbar>
        </Box>
    );
}
