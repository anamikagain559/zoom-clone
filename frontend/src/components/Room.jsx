import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';

const Room = ({ roomId, userName, onLeave }) => {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [peers, setPeers] = useState({}); // Tracking call objects to close them later
  const [remoteStreams, setRemoteStreams] = useState([]); // { stream, userId, userName }
  const [myStream, setMyStream] = useState(null);
  
  const socketRef = useRef();
  const myPeerRef = useRef();
  const myVideoRef = useRef();
  const videoGridRef = useRef();

  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);

  useEffect(() => {
    // 1. Initialize Socket.io
    socketRef.current = io('http://localhost:3001');

    // 2. Initialize PeerJS
    myPeerRef.current = new Peer(undefined, {
      path: '/peerjs',
      host: '/',
      port: '3001'
    });

    // 3. Get User Media
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      setMyStream(stream);
      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }

      // Handle Answer Call
      myPeerRef.current.on('call', call => {
        call.answer(stream);
        call.on('stream', userVideoStream => {
          addRemoteStream(userVideoStream, call.peer, 'Guest'); // Default name for incoming basic calls
        });
      });

      // Handle Socket Signaling
      socketRef.current.on('user-connected', (userId, remoteUserName) => {
        console.log('User connected:', userId, remoteUserName);
        connectToNewUser(userId, stream, remoteUserName);
      });
    });

    socketRef.current.on('user-disconnected', userId => {
      console.log('User disconnected:', userId);
      if (peers[userId]) peers[userId].close();
      setRemoteStreams(prev => prev.filter(s => s.userId !== userId));
    });

    myPeerRef.current.on('open', id => {
      socketRef.current.emit('join-room', roomId, id, userName);
    });

    return () => {
      socketRef.current.disconnect();
      myPeerRef.current.destroy();
      if (myStream) {
        myStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const connectToNewUser = (userId, stream, remoteUserName) => {
    const call = myPeerRef.current.call(userId, stream);
    call.on('stream', userVideoStream => {
      addRemoteStream(userVideoStream, userId, remoteUserName);
    });
    call.on('close', () => {
      setRemoteStreams(prev => prev.filter(s => s.userId !== userId));
    });

    setPeers(prev => ({ ...prev, [userId]: call }));
  };

  const addRemoteStream = (stream, userId, remoteUserName) => {
    setRemoteStreams(prev => {
      if (prev.find(s => s.userId === userId)) return prev;
      return [...prev, { stream, userId, userName: remoteUserName }];
    });
  };

  // UI Control Handlers
  const toggleMic = () => {
    if (myStream) {
      myStream.getAudioTracks()[0].enabled = !micOn;
      setMicOn(!micOn);
    }
  };

  const toggleVideo = () => {
    if (myStream) {
      myStream.getVideoTracks()[0].enabled = !videoOn;
      setVideoOn(!videoOn);
    }
  };

  // Video Element Component
  const VideoElement = ({ stream, isLocal, name, active }) => {
    const videoRef = useRef();
    useEffect(() => {
      if (videoRef.current) videoRef.current.srcObject = stream;
    }, [stream]);

    return (
      <div className={`relative rounded-lg overflow-hidden bg-surface_container_low border border-white/5 shadow-2xl transition-pro ${active ? 'active-speaker-glow' : ''}`}>
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted={isLocal}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${!isLocal ? 'opacity-100' : 'opacity-100 scale-x-[-1]'}`} 
        />
        <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg glass-obsidian border border-white/5 shadow-2xl backdrop-blur-xl transition-pro hover:bg-white/10">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${active ? 'bg-primary shadow-[0_0_8px_rgba(186,158,255,1)]' : 'bg-white/20'}`}></span>
            <span className="text-xs font-black text-white tracking-tight uppercase opacity-90">{name} {isLocal && '(You)'}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-surface overflow-hidden font-sans select-none">
      {/* Cockpit Canopy */}
      <header className="h-14 px-6 flex items-center justify-between z-50 bg-gradient-to-b from-black/40 to-transparent">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 px-3 py-1 rounded-lg border border-primary/20">
            <span className="text-[10px] font-black text-primary uppercase tracking-widest_lg">Secure Channel</span>
          </div>
          <div className="h-4 w-px bg-white/10 mx-2"></div>
          <h1 className="text-sm font-black text-white tracking-widest_lg uppercase opacity-90">{roomId} <span className="opacity-40">• Ops Underway</span></h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-surface_container_low px-3 py-1.5 rounded-lg border border-white/5">
            <span className="material-symbols-outlined text-green-500 text-xs animate-pulse">signal_cellular_alt</span>
            <span className="text-[9px] font-black text-on_surface_variant uppercase tracking-widest">Active Peers: {remoteStreams.length + 1}</span>
          </div>
          <button 
            onClick={onLeave}
            className="bg-error/10 hover:bg-error transition-all duration-300 text-error hover:text-black px-6 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest_lg border border-error/30"
          >
            Abort Mission
          </button>
        </div>
      </header>

      {/* Primary Grid Container */}
      <main className="flex-1 relative flex overflow-hidden p-3 gap-3">
        <div 
          className={`flex-1 grid gap-3 h-full overflow-hidden ${
            (remoteStreams.length + 1) === 1 ? 'grid-cols-1' : 
            (remoteStreams.length + 1) === 2 ? 'grid-cols-2' : 
            (remoteStreams.length + 1) <= 4 ? 'grid-cols-2 grid-rows-2' : 'grid-cols-3'
          }`}
        >
          {/* Local Stream */}
          {myStream && <VideoElement stream={myStream} isLocal={true} name={userName} active={true} />}
          
          {/* Remote Streams */}
          {remoteStreams.map(rs => (
            <VideoElement key={rs.userId} stream={rs.stream} name={rs.userName} active={false} />
          ))}
        </div>

        {/* Tactical Panels */}
        {(showChat || showParticipants) && (
          <aside className="w-80 surface-low rounded-lg transition-pro flex flex-col shadow-[0_0_48px_rgba(0,0,0,0.5)] border border-white/5 animate-in slide-in-from-right duration-300">
            <div className="p-6 flex items-center justify-between border-b border-white/5 bg-surface_container_high/20">
              <h2 className="text-xs font-black text-primary uppercase tracking-widest_lg">Tactical Panel</h2>
              <button 
                onClick={() => { setShowChat(false); setShowParticipants(false); }}
                className="text-on_surface_variant hover:text-white transition-pro"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto scrollbar-hide">
              {showParticipants ? (
                <>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[10px] font-black uppercase">{userName.charAt(0)}</div>
                    <span className="text-xs font-bold text-white uppercase tracking-tight">{userName} (You)</span>
                  </div>
                  {remoteStreams.map(rs => (
                    <div key={rs.userId} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/40 text-[10px] font-black uppercase">{rs.userName?.charAt(0) || 'G'}</div>
                      <span className="text-xs font-bold text-white/70 uppercase tracking-tight">{rs.userName || 'Guest'}</span>
                    </div>
                  ))}
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center gap-2 opacity-30 italic text-xs">
                   <span className="material-symbols-outlined text-4xl mb-2">lock</span>
                   <span>End-to-End Encryption Active</span>
                </div>
              )}
            </div>
          </aside>
        )}
      </main>

      {/* Control Launcher */}
      <footer className="h-24 flex items-center justify-center pointer-events-none z-[100] absolute bottom-0 left-0 right-0">
        <div className="glass-control-bar flex items-center gap-3 px-6 py-4 rounded-xl border border-white/5 shadow-[0_32px_64px_rgba(0,0,0,0.8)] pointer-events-auto transition-pro transform hover:scale-[1.02]">
          
          <button 
            onClick={toggleMic}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-pro ${micOn ? 'bg-surface_container_highest text-white hover:bg-[#333]' : 'bg-primary text-black shadow-[0_0_20px_rgba(186,158,255,0.4)]'}`}
          >
            <span className="material-symbols-outlined">{micOn ? 'mic' : 'mic_off'}</span>
          </button>

          <button 
            onClick={toggleVideo}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-pro ${videoOn ? 'bg-surface_container_highest text-white hover:bg-[#333]' : 'bg-primary text-black shadow-[0_0_20px_rgba(186,158,255,0.4)]'}`}
          >
            <span className="material-symbols-outlined">{videoOn ? 'videocam' : 'videocam_off'}</span>
          </button>

          <div className="h-8 w-px bg-white/10 mx-1"></div>

          <button 
            onClick={() => { setShowParticipants(!showParticipants); setShowChat(false); }}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-pro ${showParticipants ? 'text-primary' : 'text-on_surface_variant hover:text-white hover:bg-white/5'}`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: showParticipants ? "'FILL' 1" : "" }}>group</span>
          </button>

          <button 
            onClick={() => { setShowChat(!showChat); setShowParticipants(false); }}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-pro ${showChat ? 'text-primary' : 'text-on_surface_variant hover:text-white hover:bg-white/5'}`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: showChat ? "'FILL' 1" : "" }}>forum</span>
          </button>

          <button className="w-12 h-12 rounded-lg flex items-center justify-center transition-pro text-on_surface_variant hover:text-white hover:bg-white/5">
            <span className="material-symbols-outlined">present_to_all</span>
          </button>

          <div className="h-8 w-px bg-white/10 mx-1"></div>

          <button 
            onClick={onLeave}
            className="w-12 h-12 rounded-lg flex items-center justify-center transition-pro text-error hover:bg-error/10"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>call_end</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Room;

