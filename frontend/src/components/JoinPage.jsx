import React, { useState } from 'react';

const JoinPage = ({ onJoin, onAction }) => {
  const [roomId, setRoomId] = useState('');
  const [name, setName] = useState('');
  const [noAudio, setNoAudio] = useState(false);
  const [noVideo, setNoVideo] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && roomId.trim()) {
      onJoin(roomId, name);
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface">
      <main className="flex-grow relative flex items-center justify-center p-6">
        {/* Cockpit Background Luminance */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[20%] right-[10%] w-[50%] h-[50%] bg-primary_dim/5 rounded-full blur-[150px]"></div>
        </div>

        {/* Join Space Modal (Bento-style recessed) */}
        <div className="w-full max-w-[480px] z-10 transition-pro animate-fade-in">
          <div className="surface-low rounded-lg overflow-hidden shadow-[0_24px_48px_rgba(0,0,0,0.5)]">
            {/* Header Section */}
            <div className="p-8 pb-4">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-black tracking-tight_md text-white mb-2 uppercase">Join Space</h1>
                  <p className="label-sm opacity-60">Authorize Connection</p>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg shadow-[inset_0_0_8px_rgba(186,158,255,0.1)]">
                  <span className="material-symbols-outlined text-primary text-3xl">meeting_room</span>
                </div>
              </div>
            </div>

            {/* Input Section */}
            <form className="px-8 pb-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-5">
                {/* Meeting ID Field */}
                <div className="group">
                  <label className="block label-xs font-black uppercase tracking-widest_lg text-on_surface_variant mb-2.5 ml-1 opacity-40">Meeting ID / Access Key</label>
                  <div className="relative flex items-center bg-surface_container_highest/30 rounded-lg group-hover:bg-surface_container_highest/50 transition-pro overflow-hidden border border-white/5 focus-within:border-primary/20 ghost-border-focus">
                    <span className="material-symbols-outlined ml-4 text-on_surface_variant">key</span>
                    <input 
                      className="w-full bg-transparent border-none text-white py-4 px-4 focus:ring-0 placeholder:text-on_surface_variant/30 font-medium outline-none" 
                      placeholder="e.g. 123-456-789" 
                      type="text"
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* User Name Field */}
                <div className="group">
                  <label className="block label-xs font-black uppercase tracking-widest_lg text-on_surface_variant mb-2.5 ml-1 opacity-40">Display Identity</label>
                  <div className="relative flex items-center bg-surface_container_highest/30 rounded-lg group-hover:bg-surface_container_highest/50 transition-pro overflow-hidden border border-white/5 focus-within:border-primary/20 ghost-border-focus">
                    <span className="material-symbols-outlined ml-4 text-on_surface_variant">person</span>
                    <input 
                      className="w-full bg-transparent border-none text-white py-4 px-4 focus:ring-0 placeholder:text-on_surface_variant/30 font-medium outline-none" 
                      placeholder="Commander Alex" 
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Toggles (Surface High) */}
              <div className="bg-surface_container_high/40 rounded-lg p-5 space-y-4 border border-white/5">
                <div className="flex items-center justify-between group cursor-pointer" onClick={() => setNoAudio(!noAudio)}>
                  <div className="flex items-center gap-3">
                    <span className={`material-symbols-outlined transition-pro text-xl ${noAudio ? 'text-primary' : 'text-on_surface_variant'}`}>{noAudio ? 'mic_off' : 'mic'}</span>
                    <span className="text-sm font-bold text-white opacity-80 group-hover:opacity-100 transition-pro">Mute on entry</span>
                  </div>
                  <input 
                    type="checkbox"
                    checked={noAudio}
                    onChange={(e) => setNoAudio(e.target.checked)}
                    className="w-5 h-5 rounded bg-surface_container_highest border-none text-primary focus:ring-0 cursor-pointer accent-primary"
                  />
                </div>
                <div className="flex items-center justify-between group cursor-pointer" onClick={() => setNoVideo(!noVideo)}>
                  <div className="flex items-center gap-3">
                    <span className={`material-symbols-outlined transition-pro text-xl ${noVideo ? 'text-primary' : 'text-on_surface_variant'}`}>{noVideo ? 'videocam_off' : 'videocam'}</span>
                    <span className="text-sm font-bold text-white opacity-80 group-hover:opacity-100 transition-pro">Video off on entry</span>
                  </div>
                  <input 
                    type="checkbox"
                    checked={noVideo}
                    onChange={(e) => setNoVideo(e.target.checked)}
                    className="w-5 h-5 rounded bg-surface_container_highest border-none text-primary focus:ring-0 cursor-pointer accent-primary"
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button 
                  className="w-full command-gradient text-black font-black py-4 rounded-lg flex items-center justify-center gap-3 shadow-[0_8px_32px_rgba(186,158,255,0.25)] hover:scale-[1.02] active:scale-95 transition-all duration-300 uppercase tracking-widest_lg text-xs" 
                  type="submit"
                >
                  Initiate Connection
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </form>

            {/* Footer Recessed Links */}
            <div className="bg-surface_container_highest/30 py-4 px-8 flex justify-between items-center">
              <button 
                className="text-[10px] font-black uppercase tracking-widest text-on_surface_variant hover:text-white transition-pro" 
                onClick={() => onAction('home')}
                type="button"
              >
                Abort & Return
              </button>
              <div className="flex gap-4">
                <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline" type="button">Browser Auth</button>
              </div>
            </div>
          </div>

          {/* Legal Meta */}
          <p className="text-center mt-12 text-[10px] font-bold tracking-widest text-on_surface_variant uppercase opacity-40 px-12 leading-loose">
            AES-256 Encryption Standard Enabled. By connecting, you acknowledge the <span className="text-white underline cursor-pointer">Protocol Terms</span>.
          </p>
        </div>
      </main>
    </div>
  );
};

export default JoinPage;
