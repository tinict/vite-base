import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const STORAGE_KEY = 'app_state';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (!serializedState) return undefined;
    const parsedState = JSON.parse(serializedState);
    if (!parsedState || typeof parsedState !== 'object') return undefined;
    return parsedState;
  } catch (error) {
    console.error('Lấy dữ liệu từ localStorage thất bại:', error);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const stateToSave = {
      auth: {
        username: state.auth.username,
        token: state.auth.token,
        refreshToken: state.auth.refreshToken,
        tokenExpiry: state.auth.tokenExpiry,
        isAuthenticated: state.auth.isAuthenticated,
      },
    };
    const serializedState = JSON.stringify(stateToSave);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    console.error('Lưu dữ liệu vào localStorage thất bại:', error);
  }
};

const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const preloadedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production',
});

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

export default store;