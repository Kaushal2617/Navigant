import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

const client = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});


client.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && token !== 'undefined' && token !== 'null') {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

client.interceptors.response.use(
    (response) => response,
    (error) => {

        // Handling 401 for auth failures (Session Expired / Invalid Token)
        if (error.response?.status === 401) {
            // Clear any stored user data
            localStorage.removeItem('user');

            // Avoid redirect loop
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login'
            }
        }

        // 403 Forbidden means "Authenticated but not authorized". 
        // We SHOULD NOT logout the user, just let the specific component handle the error.
        if (error.response?.status === 403) {
            console.warn("Access Forbidden: User does not have permission.");
        }
        return Promise.reject(error);
    }
);

export default client;
