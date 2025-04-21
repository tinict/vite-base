import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    logoutSuccess as logoutAction
} from '@/store/auth/authSlice';

import {
    useLocalStorageAuth,
    useAuthRouting,
} from '@/composables/auth';
import {
    AuthContext
} from './auth-context';

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        isAuthenticated,
        token,
        tokenExpiry,
        refreshToken: storedRefreshToken
    } = useSelector(
        (state) => state.auth
    );

    const {
        loadAuthFromLocalStorage
    } = useLocalStorageAuth({
        isAuthenticated,
        token,
        tokenExpiry,
        refreshToken: storedRefreshToken,
    });

    const [isReady, setIsReady] = useState(false);

    const logout = useCallback(async () => {
        try {
            dispatch(logoutAction());
            localStorage.removeItem('app_state');
            navigate('/sign-in', { replace: true });
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }, [dispatch, navigate]);

    const refreshToken = useCallback(async () => {
        return false;
    }, []);

    useEffect(() => {
        loadAuthFromLocalStorage();
        setIsReady(true);
    }, [loadAuthFromLocalStorage]);

    useAuthRouting(isAuthenticated, token, tokenExpiry, isReady);

    if (!isReady) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
            </div>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                token,
                logout,
                refreshToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
