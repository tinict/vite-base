import { useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PROTECTED_ROUTES = [
    '/medical-records',
    '/customer-survey',
    '/medical-facilities',
    '/patient-appointments',
    '/re-examination',
    '/medical-results',
    '/receipts',
    '/medical-tickets',
    '/medicine-calendar',
    '/examination-slip',
    '/security',
    '/security/change-password',
];

const AUTH_ROUTES = [
    '/sign-in',
    '/scanner-vneid',
    '/accounts',
    '/verification-otp',
    '/forgot-password',
    '/verify-citizen-identity',
    '/remembered-login',
    '/switch-accounts',
];

const PUBLIC_ROUTES = [
    '/',
    '/register',
    '/confirm-verification',
];

export const useAuthRouting = (
    isAuthenticated,
    token,
    tokenExpiry,
    isReady
) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isTokenValid = useCallback((token, expiry) => {
        if (!token || token.trim() === '') return false;
        if (expiry && Date.now() > expiry) {
            console.warn('Token has expired');
            return false;
        }
        return true;
    }, []);

    useEffect(() => {
        if (!isReady) return;

        const hasValidToken = isTokenValid(token, tokenExpiry);
        const currentPath = location.pathname.replace(/\/+$/, '');

        const isAuthRoute = AUTH_ROUTES.some((route) => route === currentPath);
        const isPublicRoute = PUBLIC_ROUTES.some((route) => route === currentPath);
        const isProtectedRoute = PROTECTED_ROUTES.some(
            (route) => currentPath.startsWith(route)
        );

        if (isAuthenticated && hasValidToken) {
            if (isAuthRoute && currentPath !== '/') {
                navigate('/', { replace: true });
            }
        } else {
            if (isProtectedRoute) {
                navigate('/sign-in', { replace: true });
            } else if (!isAuthRoute && !isPublicRoute) {
                navigate('/', { replace: true });
            }
        }
    }, [
        isReady,
        isAuthenticated,
        token,
        tokenExpiry,
        location.pathname,
        isTokenValid,
        navigate
    ]);
};
