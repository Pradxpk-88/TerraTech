import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    const checkUserLoggedIn = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                // If we had a /me endpoint working, we'd call it here
                // For now, we'll just assume validity or decoded token if we had jwt-decode
                // But let's try to hit the backend 'me' endpoint
                const { data } = await api.get('/auth/me');
                setUser(data.data);
            } catch (error) {
                console.error("Auth check failed", error);
                localStorage.removeItem('token');
                setUser(null);
            }
        }
        setLoading(false);
    };

    const login = async (phone_number, otp) => {
        const { data } = await api.post('/auth/verify-otp', { phone_number, otp });
        localStorage.setItem('token', data.token);
        setUser(data.user);
        return data;
    };

    const sendOtp = async (phone_number) => {
        const { data } = await api.post('/auth/send-otp', { phone_number });
        return data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        logout,
        sendOtp
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
