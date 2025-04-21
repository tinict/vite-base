import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HeroUIProvider } from '@heroui/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import store from '@/store/store';
import {
  AuthProvider
} from '@/context/auth-provider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <HeroUIProvider>
            <App />
          </HeroUIProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);