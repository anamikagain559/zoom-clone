import React, { useState } from 'react';
import JoinPage from './components/JoinPage';
import Dashboard from './components/Dashboard';
import SchedulePage from './components/SchedulePage';
import Layout from './components/Layout';
import Room from './components/Room';

function App() {
  const [view, setView] = useState('dashboard'); // 'dashboard', 'join', 'schedule', 'room'
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');

  const handleJoin = (id, name) => {
    setRoomId(id);
    setUserName(name);
    setView('room');
  };

  const handleDashboardAction = (action) => {
    if (action === 'join') {
      setView('join');
    } else if (action === 'schedule') {
      setView('schedule');
    } else if (action === 'home') {
      setView('dashboard');
    } else if (action === 'new') {
      const newRoomId = Math.random().toString(36).substring(2, 9);
      setRoomId(newRoomId);
      setUserName('Commander'); // Placeholder or prompt for name later
      setView('room');
    }
  };

  const handleLeave = () => {
    setView('dashboard');
    setRoomId('');
    setUserName('');
  };

  return (
    <>
      {view === 'room' ? (
        <Room 
          roomId={roomId} 
          userName={userName} 
          onLeave={handleLeave} 
        />
      ) : (
        <Layout onAction={handleDashboardAction} activeView={view}>
          {view === 'dashboard' && (
            <Dashboard onAction={handleDashboardAction} />
          )}
          
          {view === 'join' && (
            <JoinPage onJoin={handleJoin} onAction={handleDashboardAction} />
          )}
          
          {view === 'schedule' && (
            <SchedulePage onAction={handleDashboardAction} />
          )}
        </Layout>
      )}
    </>
  );
}

export default App;
