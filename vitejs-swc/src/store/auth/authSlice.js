import { createSlice } from '@reduxjs/toolkit';
import { userLogin } from '@/api/auth';

const isTokenExpired = (expiry) => {
    if (!expiry) return true;
    return Date.now() > expiry;
};

const initialState = {
    username: '',
    token: '',
    refreshToken: undefined,
    tokenExpiry: undefined,
    isAuthenticated: false,
    loading: false,
    error: null,
    errorCode: undefined,
    otpToken: undefined,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authStart(state) {
            state.loading = true;
            state.error = null;
            state.errorCode = undefined;
        },
        loginSuccess(state, action) {
            const {
                username,
                token,
                refreshToken,
                tokenExpiry
            } = action.payload;
            
            state.username = username;
            state.token = token;
            state.refreshToken = refreshToken;
            state.tokenExpiry = tokenExpiry;
            state.isAuthenticated = true;
            state.error = null;
            state.errorCode = undefined;
            state.otpToken = undefined;
            state.loading = false;
        },
        authError(state, action) {
            state.loading = false;
            state.error = action.payload.message;
            state.errorCode = action.payload.code;
        },
        logoutSuccess(state) {
            Object.assign(state, initialState);
        },
        otpRequired(state, action) {
            state.loading = false;
            state.otpToken = action.payload.otpToken;
            state.username = action.payload.username || state.username;
            state.isAuthenticated = false;
        },
        clearAuthError(state) {
            state.error = null;
            state.errorCode = undefined;
        },
        tokenRefreshed(state, action) {
            const { token, tokenExpiry, refreshToken } = action.payload;
            state.token = token;
            state.tokenExpiry = tokenExpiry;
            state.refreshToken = refreshToken || state.refreshToken;
            state.isAuthenticated = !isTokenExpired(tokenExpiry);
            state.otpToken = undefined;
        },
    },
});

export const {
    authStart,
    loginSuccess,
    authError,
    logoutSuccess,
    otpRequired,
    clearAuthError,
    tokenRefreshed,
} = authSlice.actions;

export const loginUser = (credentials) => async (dispatch) => {
    try {
        dispatch(authStart());
        const response = await userLogin(credentials);

        if (response?.data?.requiresOtp) {
            dispatch(
                otpRequired({
                    otpToken: response.data.otpToken,
                    username: response.data.username || credentials.username,
                })
            );
            return response;
        }

        console.log(response);


        if (response?.data?.token) {
            localStorage.setItem('token', response.data.token);
            dispatch(
                loginSuccess({
                    token: response.data.token,
                    username: response.data.username || credentials.username,
                    refreshToken: response.data.refreshToken,
                    tokenExpiry: response.data.tokenExpiry,
                })
            );
        } else {
            dispatch(
                authError({
                    message: 'No token received',
                    code: 'NO_TOKEN',
                })
            );
        }

        return response;
    } catch (error) {
        dispatch(
            authError({
                message: error.message || 'Login failed',
                code: error.code || 'UNKNOWN_ERROR',
            })
        );
        throw error;
    }
};

export default authSlice.reducer;