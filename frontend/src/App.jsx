import React, { useState } from 'react';
import JoinPage from './components/JoinPage';
import Dashboard from './components/Dashboard';
import SchedulePage from './components/SchedulePage';
import Layout from './components/Layout';
import Room from './components/Room';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';


function App() {
  const [view, setView] = useState('dashboard'); // 'dashboard', 'join', 'schedule', 'room'
  const [authView, setAuthView] = useState('login'); // 'login', 'register'
  const [roomId, setRoomId] = useState('');
  const [user, setUser] = useState(null); // { email, name }
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setUserName(parsedUser.name);
      } catch (e) {
        console.error("Failed to parse user session");
      }
    }
    setIsLoading(false);
  }, []);


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

  const handleLogin = (userData) => {
    setUser(userData);
    setUserName(userData.name);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setUserName('');
    setView('dashboard');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };


  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-surface flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return authView === 'login' ? (
      <LoginPage 
        onLogin={handleLogin} 
        onSwitchToRegister={() => setAuthView('register')} 
      />
    ) : (
      <RegistrationPage 
        onRegister={handleLogin} 
        onSwitchToLogin={() => setAuthView('login')} 
      />
    );
  }

  return (
    <>
      {view === 'room' ? (
        <Room 
          roomId={roomId} 
          userName={userName} 
          onLeave={handleLeave} 
        />
      ) : (
        <Layout onAction={handleDashboardAction} activeView={view} user={user} onLogout={handleLogout}>
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
