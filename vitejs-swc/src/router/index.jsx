import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import LoginPage from '@/pages/LoginPage';
import HomePage from '@/pages/HomePage';

// const MainLayout = Loadable(lazy(() => import('layout/MainLayout')));

// const DashboardDefault = Loadable(
//     lazy(() => import('views/dashboard/Default'))
// );

// const LoginPage = Loadable(
//     lazy(() => import('views/pages/authentication/authentication3/Login3'))
// );

// const NotFoundPage = Loadable(lazy(() => import('components/NotFound')));

// const UnauthorizedPage = Loadable(
//     lazy(() => import('components/Unauthorized'))
// );

const Index = () => {
    return (
        <Routes>
            <Route path="sign-in" element={<LoginPage />} />
            {/* <Route path="sign-up" element={<SignUpPage />} /> */}
            <Route path="/" element={<HomePage />}>
                {/* <Route path="" element={<DashboardDefault />} /> */}
                {/* <Route path="unauthorized" element={<UnauthorizedPage />} /> */}

                {/* <Route path="customers">
                    <Route path="" element={<CustomerListPage />} />
                    <Route path="create" element={<CustomerCreatePage />} />
                </Route> */}
            </Route>
        </Routes>
    );
};

export default Index;
