import { create } from 'zustand';
import api from '../api';

const useAuthStore = create((set) => ({
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
    loading: false,
    error: null,

    login: async (email, password) => {
        try {
            set({ loading: true, error: null });
            const { data } = await api.post('/users/login', { email, password });
            set({ userInfo: data, loading: false });
            localStorage.setItem('userInfo', JSON.stringify(data));
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Login failed',
                loading: false,
            });
        }
    },

    register: async (name, email, password) => {
        try {
            set({ loading: true, error: null });
            const { data } = await api.post('/users', { name, email, password });
            set({ userInfo: data, loading: false });
            localStorage.setItem('userInfo', JSON.stringify(data));
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Registration failed',
                loading: false,
            });
        }
    },

    logout: () => {
        localStorage.removeItem('userInfo');
        set({ userInfo: null });
    },
}));

export default useAuthStore;
