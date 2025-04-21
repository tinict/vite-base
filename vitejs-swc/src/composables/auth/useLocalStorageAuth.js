import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/store/auth/authSlice';

export const useLocalStorageAuth = (authState) => {
    const dispatch = useDispatch();

    const saveAuthToLocalStorage = useCallback((state) => {
        try {
            localStorage.setItem('app_state', JSON.stringify({ auth: state }));
        } catch (error) {
            console.error('Failed to save auth state to localStorage:', error);
        }
    }, []);

    const loadAuthFromLocalStorage = useCallback(() => {
        try {
            const storedState = localStorage.getItem('app_state');
            if (storedState) {
                const { auth } = JSON.parse(storedState);
                if (auth && auth.token && auth.isAuthenticated) {
                    dispatch(loginSuccess({
                        token: auth.token,
                        refreshToken: auth.refreshToken,
                        tokenExpiry: auth.tokenExpiry,
                        isAuthenticated: auth.isAuthenticated,
                    }));
                }
            }
        } catch (error) {
            console.error('Failed to load auth state from localStorage:', error);
        }
    }, [dispatch]);

    useEffect(() => {
        if (authState.isAuthenticated) {
            saveAuthToLocalStorage({
                isAuthenticated: authState.isAuthenticated,
                token: authState.token,
                tokenExpiry: authState.tokenExpiry,
                refreshToken: authState.refreshToken,
            });
        }
    }, [authState, saveAuthToLocalStorage]);

    return {
        loadAuthFromLocalStorage
    };
};
