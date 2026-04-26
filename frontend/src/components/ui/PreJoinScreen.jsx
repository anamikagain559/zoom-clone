import React, { useState } from 'react';
import { FaVideo } from 'react-icons/fa';

const PreJoinScreen = ({ onJoin }) => {
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');

  const handleJoin = (e) => {
    e.preventDefault();
    if (roomId.trim() && userName.trim()) {
      onJoin(roomId, userName);
    }
  };

  const generateRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 9);
    setRoomId(newRoomId);
  };

  return (
    <div className="prejoin-container animate-fade-in">
      <div className="prejoin-card glass">
        <div className="prejoin-logo">
          <FaVideo style={{ color: '#3b82f6' }} />
          <span>ZoomClone</span>
        </div>
        
        <form onSubmit={handleJoin}>
          <div className="input-group">
            <label>Your Name</label>
            <input 
              type="text" 
              placeholder="e.g. John Doe"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <label>Room ID</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="Enter Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                required
              />
              <button type="button" className="btn-primary" onClick={generateRoom} style={{ padding: '0 16px', whiteSpace: 'nowrap' }}>
                New
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary join-btn">
            Join Meeting
          </button>
        </form>
      </div>
    </div>
  );
};

export default PreJoinScreen;
