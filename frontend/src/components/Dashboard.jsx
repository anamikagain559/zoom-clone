import React, { useState, useEffect } from 'react';

const Dashboard = ({ onAction }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col h-full bg-surface">
      <main className="flex-1 overflow-y-auto scrollbar-hide p-8 relative">
        {/* Cockpit Background Ambient (Subtle luminance) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-[5%] left-[10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-primary_dim/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-6xl mx-auto z-10 relative transition-pro animate-fade-in">
          <header className="mb-10 flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-black tracking-tight_md text-white border-none uppercase">Mission Control</h1>
              <p className="label-sm mt-1 opacity-60">Kinetic Command • Alpha Operational</p>
            </div>
            <div className="hidden md:flex gap-6 items-center">
              <div className="flex flex-col items-end">
                <span className="label-sm text-primary opacity-80">Link Status</span>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Encrypted • AES-256</span>
              </div>
              <div className="w-12 h-12 rounded-lg bg-surface_container_low flex items-center justify-center border border-white/5">
                <span className="material-symbols-outlined text-green-500 text-sm animate-pulse">radar</span>
              </div>
            </div>
          </header>

          {/* Asymmetric Bento Cockpit Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full auto-rows-max">
            
            {/* Primary Launch Module (Dominant) */}
            <div className="md:col-span-8 group relative overflow-hidden surface-low rounded-lg p-10 flex flex-col justify-between transition-pro hover:bg-[#1a1a1a] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-[160px] text-white">bolt</span>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">rocket_launch</span>
                  </div>
                  <span className="label-sm font-black text-primary opacity-60 uppercase">Primary Activation</span>
                </div>
                <h2 className="text-5xl font-black text-white tracking-tight_md uppercase mb-2">Instant Session</h2>
                <p className="text-on_surface_variant max-w-sm text-sm font-medium opacity-70">Initialize a high-performance mission environment with one-click authorization.</p>
              </div>
              <div className="mt-12 relative z-10">
                <button 
                  onClick={() => onAction('new')}
                  className="command-gradient px-12 py-5 rounded-lg text-black font-black uppercase text-sm tracking-widest_lg shadow-[0_16px_40px_rgba(186,158,255,0.3)] hover:scale-[1.03] active:scale-95 transition-all duration-300"
                >
                  Initiate Now
                </button>
              </div>
            </div>

            {/* Status Terminal (Instrument Readout) */}
            <div className="md:col-span-4 surface-low rounded-lg p-8 flex flex-col items-center justify-center text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] border border-white/5">
              <div className="w-full flex justify-between items-center mb-8 px-2">
                <span className="label-sm text-[9px] opacity-40">Tactical Clock</span>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-surface_container_highest"></div>
                </div>
              </div>
              <div className="text-6xl font-black tracking-tight_md text-white mb-2">
                {formatTime(time)}
              </div>
              <div className="text-xs font-black text-primary uppercase tracking-widest_lg mb-8 opacity-80">
                {formatDate(time)}
              </div>
              <div className="w-full space-y-3 pt-6 border-t border-white/5">
                <div className="flex justify-between items-center px-2">
                  <span className="text-[10px] font-black text-on_surface_variant opacity-40 uppercase">Latency</span>
                  <span className="text-[10px] font-black text-white">24 MS</span>
                </div>
                <div className="flex justify-between items-center px-2">
                  <span className="text-[10px] font-black text-on_surface_variant opacity-40 uppercase">Bandwidth</span>
                  <span className="text-[10px] font-black text-white">124 MBPS</span>
                </div>
                <div className="flex justify-between items-center px-2">
                  <span className="text-[10px] font-black text-on_surface_variant opacity-40 uppercase">Encryption</span>
                  <span className="text-[10px] font-black text-green-500">ACTIVE</span>
                </div>
              </div>
            </div>

            {/* Join Space (Recessed Action) */}
            <div className="md:col-span-4 group cursor-pointer surface-high rounded-lg p-8 transition-pro hover:bg-[#2c2c2c] border border-white/5 flex flex-col gap-6" onClick={() => onAction('join')}>
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-pro">
                  <span className="material-symbols-outlined text-primary text-2xl">sensors</span>
                </div>
                <span className="material-symbols-outlined text-on_surface_variant opacity-20 group-hover:translate-x-1 transition-pro">arrow_forward</span>
              </div>
              <div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight_md mb-1">Join Space</h3>
                <p className="label-sm text-[10px] opacity-60">Authorize ID Connection</p>
              </div>
            </div>

            {/* Schedule Ops */}
            <div className="md:col-span-4 group cursor-pointer surface-high rounded-lg p-8 transition-pro hover:bg-[#2c2c2c] border border-white/5 flex flex-col gap-6" onClick={() => onAction('schedule')}>
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-primary_dim/5 rounded-lg flex items-center justify-center group-hover:bg-primary_dim/20 transition-pro">
                  <span className="material-symbols-outlined text-primary_dim text-2xl">calendar_add_on</span>
                </div>
                <span className="material-symbols-outlined text-on_surface_variant opacity-20 group-hover:translate-x-1 transition-pro">arrow_forward</span>
              </div>
              <div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight_md mb-1">Schedule Ops</h3>
                <p className="label-sm text-[10px] opacity-60">Mission Architecture</p>
              </div>
            </div>

            {/* Network Presence (Dummy Feed) */}
            <div className="md:col-span-4 surface-low rounded-lg p-8 border border-white/5 flex flex-col shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
              <h3 className="text-[10px] font-black text-on_surface_variant uppercase tracking-widest_lg mb-6 opacity-40">System Presence</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-surface-low bg-surface_container_high overflow-hidden">
                        <img 
                          className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 transition-pro" 
                          src={`https://lh3.googleusercontent.com/aida-public/AB6AXuCFjr2BXx3ZAiXSZiOIw_h-YawKkuGVyLvFYqMI1OVjzFAefhnywFpwlroKUEJNTpoQDF6v07-gBlnOfURbWpq7cb2Ejzlm2ijZi6xLRRFgh1h9bQxPJaFSPG-E-_PAyI9o4XzM3JCTP2qADs-5NKMKoWv91FBJ5eIDBL787GDOon_w90x5OFE_GIzfMdtfzOspv0VlXMcs7VfpHPERRyMcV8AC5dOg4H49E8UlXdpQpWKcgE2B0JZZqtj5qAluQWq88_IyQUPxJg`} 
                        />
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-surface-low bg-surface_container_highest flex items-center justify-center text-[10px] font-black text-white">
                      +12
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest_lg">Nodes Active</span>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <p className="text-[10px] italic text-on_surface_variant opacity-40">Scanning sector for active collaboration signals...</p>
                </div>
              </div>
            </div>

          </div>

          <footer className="mt-16 text-center">
            <p className="text-[9px] text-on_surface_variant/20 tracking-[0.6em] uppercase font-black">Kinetic Command • Encryption Protocol Verified • Mission Control Center</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
