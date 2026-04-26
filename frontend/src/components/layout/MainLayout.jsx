import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { useAuth } from '../../context/AuthContext';

const MainLayout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const activeView = location.pathname === '/' ? 'dashboard' : 
                      location.pathname === '/join' ? 'join' : 
                      location.pathname === '/schedule' ? 'schedule' : '';

    const handleAction = (action) => {
        if (action === 'home') navigate('/');
        else if (action === 'join') navigate('/join');
        else if (action === 'schedule') navigate('/schedule');
        else if (action === 'new') {
            const newRoomId = Math.random().toString(36).substring(2, 9);
            navigate(`/room/${newRoomId}`);
        }
    };

    return (
        <Layout 
            user={user} 
            onLogout={logout} 
            activeView={activeView} 
            onAction={handleAction}
        >
            <Outlet />
        </Layout>
    );
};

export default MainLayout;
