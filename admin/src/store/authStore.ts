import { create } from 'zustand';
import client from '../api/client';
import type { LoginRequest, LoginResponse, AdminResponse } from '../api/types';

interface AuthState {
    user: AdminResponse | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginRequest) => Promise<void>;
    logout: () => void;
    checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,

    login: async (credentials: LoginRequest) => {
        set({ isLoading: true });
        try {
            const response = await client.post<LoginResponse>('/auth/login', credentials);
            const { token, id, email, role, name } = response.data; // Ensure name is destructured if available

            localStorage.setItem('token', token);
            // Persist user details
            const userObj = { id, email, role, name: name || email.split('@')[0] }; // Fallback name if missing
            localStorage.setItem('user', JSON.stringify(userObj));

            client.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            set({
                user: userObj,
                token,
                isAuthenticated: true,
                isLoading: false
            });
        } catch (error) {
            set({ isLoading: false });
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete client.defaults.headers.common['Authorization'];
        set({ user: null, token: null, isAuthenticated: false });
    },

    checkAuth: () => {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        if (token) {
            client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let user = null;
            try {
                if (userStr) user = JSON.parse(userStr);
            } catch (e) {
                console.error("Failed to parse user from storage", e);
            }
            set({ isAuthenticated: true, token, user });
        } else {
            set({ isAuthenticated: false, token: null, user: null });
        }
    }
}));
