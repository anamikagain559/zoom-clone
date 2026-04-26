import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Dashboard from '../pages/Dashboard';
import JoinPage from '../pages/JoinPage';
import SchedulePage from '../pages/SchedulePage';
import Room from '../pages/Room';
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import PrivateRoute from './PrivateRoute';

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <PrivateRoute>
                <MainLayout />
            </PrivateRoute>
        ),
        children: [
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: 'join',
                element: <JoinPage />
            },
            {
                path: 'schedule',
                element: <SchedulePage />
            }
        ]
    },
    {
        path: '/room/:roomId',
        element: (
            <PrivateRoute>
                <Room />
            </PrivateRoute>
        )
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegistrationPage />
    }
]);
