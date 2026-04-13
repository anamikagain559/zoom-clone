import React, { useState, useEffect, useRef } from 'react';

const Room = ({ roomId, userName, onLeave }) => {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [participants, setParticipants] = useState([
    { id: '1', name: userName, isLocal: true, active: true },
    { id: '2', name: 'Dr. Aris Thorne', active: false },
    { id: '3', name: 'Elena Vost', active: false },
    { id: '4', name: 'Marcus Chen', active: false },
  ]);

  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-surface overflow-hidden font-sans select-none">
      {/* Cockpit Canopy (Top Bar - High performance feel) */}
      <header className="h-14 px-6 flex items-center justify-between z-50 bg-gradient-to-b from-black/40 to-transparent">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 px-3 py-1 rounded-lg border border-primary/20">
            <span className="text-[10px] font-black text-primary uppercase tracking-widest_lg">Secure Channel</span>
          </div>
          <div className="h-4 w-px bg-white/10 mx-2"></div>
          <h1 className="text-sm font-black text-white tracking-widest_lg uppercase opacity-90">{roomId} <span className="opacity-40">• Mission Active</span></h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-surface_container_low px-3 py-1.5 rounded-lg border border-white/5 shadow-inner">
            <span className="material-symbols-outlined text-green-500 text-xs animate-pulse">signal_cellular_alt</span>
            <span className="text-[9px] font-black text-on_surface_variant uppercase tracking-widest">Latency: 24ms</span>
          </div>
          <button 
            onClick={onLeave}
            className="bg-error/10 hover:bg-error transition-all duration-300 text-error hover:text-black px-6 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest_lg border border-error/30 hover:border-error"
          >
            End Ops
          </button>
        </div>
      </header>

      {/* Primary Video Grid (No Dividers, Pure White Space) */}
      <main className="flex-1 relative flex overflow-hidden p-3 gap-3">
        <div className="flex-1 grid grid-cols-2 gap-3 h-full overflow-hidden">
          {participants.map((p) => (
            <div 
              key={p.id} 
              className={`relative rounded-lg overflow-hidden bg-surface_container_low transition-pro duration-700 ${p.active ? 'active-speaker-glow' : ''}`}
            >
              {/* Dummy Video Feed */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                <span className="material-symbols-outlined text-9xl">person</span>
              </div>
              
              {/* Participant Info Overlay (Glassmorphism) */}
              <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg glass-obsidian border border-white/5 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${p.active ? 'bg-primary shadow-[0_0_8px_rgba(186,158,255,1)]' : 'bg-white/20'}`}></span>
                  <span className="text-xs font-black text-white tracking-tight uppercase opacity-90">{p.name} {p.isLocal && '(You)'}</span>
                </div>
              </div>

              {/* Individual Controls Overlay */}
              <div className="absolute top-3 right-3 flex items-center gap-2 scale-75 md:scale-100">
                <div className="p-2 rounded-lg glass-obsidian border border-white/5 text-white/40">
                  <span className="material-symbols-outlined text-sm">mic_off</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tactical Panels (Sidebar Integration) */}
        {(showChat || showParticipants) && (
          <aside className="w-80 surface-low rounded-lg transition-pro animate-fade-in flex flex-col shadow-[0_0_48px_rgba(0,0,0,0.5)]">
            <div className="p-6 flex items-center justify-between border-b border-white/5 bg-surface_container_high/20">
              <h2 className="text-xs font-black text-primary uppercase tracking-widest_lg">Tactical Panel</h2>
              <button 
                onClick={() => { setShowChat(false); setShowParticipants(false); }}
                className="text-on_surface_variant hover:text-white transition-pro"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex-1 p-6 flex items-center justify-center text-on_surface_variant opacity-30 italic text-xs">
              {showChat ? 'Secure communication line encrypted...' : 'Scanning for participants...'}
            </div>
          </aside>
        )}
      </main>

      {/* Floating Control Launcher (Glassmorphism + Tonal pop) */}
      <footer className="h-24 flex items-center justify-center pointer-events-none z-[100] absolute bottom-0 left-0 right-0">
        <div className="glass-control-bar flex items-center gap-3 px-6 py-4 rounded-xl border border-white/5 shadow-[0_32px_64px_rgba(0,0,0,0.8)] pointer-events-auto transition-pro transform hover:scale-[1.02]">
          
          {/* Mute Toggle */}
          <button 
            onClick={() => setMicOn(!micOn)}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-pro ${micOn ? 'bg-surface_container_highest text-white hover:bg-[#333]' : 'bg-primary text-black shadow-[0_0_20px_rgba(186,158,255,0.4)] hover:brightness-110'}`}
          >
            <span className="material-symbols-outlined transition-pro">{micOn ? 'mic' : 'mic_off'}</span>
          </button>

          {/* Video Toggle */}
          <button 
            onClick={() => setVideoOn(!videoOn)}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-pro ${videoOn ? 'bg-surface_container_highest text-white hover:bg-[#333]' : 'bg-primary text-black shadow-[0_0_20px_rgba(186,158,255,0.4)] hover:brightness-110'}`}
          >
            <span className="material-symbols-outlined transition-pro">{videoOn ? 'videocam' : 'videocam_off'}</span>
          </button>

          <div className="h-8 w-px bg-white/10 mx-1"></div>

          {/* Participant Toggle */}
          <button 
            onClick={() => { setShowParticipants(!showParticipants); setShowChat(false); }}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-pro ${showParticipants ? 'text-primary' : 'text-on_surface_variant hover:text-white hover:bg-white/5'}`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: showParticipants ? "'FILL' 1" : "" }}>group</span>
          </button>

          {/* Chat Toggle */}
          <button 
            onClick={() => { setShowChat(!showChat); setShowParticipants(false); }}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-pro ${showChat ? 'text-primary' : 'text-on_surface_variant hover:text-white hover:bg-white/5'}`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: showChat ? "'FILL' 1" : "" }}>forum</span>
          </button>

          {/* Share Screen */}
          <button className="w-12 h-12 rounded-lg flex items-center justify-center transition-pro text-on_surface_variant hover:text-white hover:bg-white/5">
            <span className="material-symbols-outlined">present_to_all</span>
          </button>

          <div className="h-8 w-px bg-white/10 mx-1"></div>

          {/* End Operation */}
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
