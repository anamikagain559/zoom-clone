import React, { useState } from 'react';

const SchedulePage = ({ onAction }) => {
  const [topic, setTopic] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('30 min');
  const [passcode, setPasscode] = useState(true);
  const [waitingRoom, setWaitingRoom] = useState(false);
  const [calendar, setCalendar] = useState('Google Calendar');

  const durations = ['15 min', '30 min', '45 min', '1 hour', 'Custom'];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ topic, date, time, duration, passcode, waitingRoom, calendar });
    alert(`Mission Scheduled: ${topic}`);
    onAction('home');
  };

  return (
    <div className="flex flex-col h-full bg-surface">
      <main className="flex-1 overflow-y-auto scrollbar-hide p-8 relative">
        <div className="max-w-4xl mx-auto pb-24 transition-pro animate-fade-in">
          <header className="mb-12">
            <h1 className="text-4xl font-black tracking-tight_md text-white mb-2 uppercase">Schedule Mission</h1>
            <p className="label-sm opacity-60">Architect your collaborative environment</p>
          </header>

          {/* Bento-style Grid (No borders, only tonal shifts) */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Column: Topic & Core Details */}
            <div className="md:col-span-8 space-y-8">
              {/* Topic Input */}
              <div className="surface-low p-8 rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                <label className="block label-sm mb-4 opacity-40">Mission Designation (Topic)</label>
                <div className="group border border-white/5 bg-surface_container_highest/20 rounded-lg ghost-border-focus transition-pro">
                  <input 
                    className="w-full bg-transparent border-none text-white placeholder-on_surface_variant/20 py-5 px-6 focus:ring-0 text-xl font-black outline-none uppercase tracking-tight_md" 
                    placeholder="e.g., Tactical Sprint" 
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Timing (Tonal Stacking) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="surface-low p-8 rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                  <label className="block label-sm mb-4 opacity-40">Activation Date</label>
                  <div className="group border border-white/5 bg-surface_container_highest/20 rounded-lg ghost-border-focus transition-pro p-1 px-4">
                    <input 
                      className="w-full bg-transparent border-none text-white py-4 focus:ring-0 font-bold outline-none flex-row-reverse uppercase tracking-widest text-xs" 
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="surface-low p-8 rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                  <label className="block label-sm mb-4 opacity-40">Initiation Time</label>
                  <div className="group border border-white/5 bg-surface_container_highest/20 rounded-lg ghost-border-focus transition-pro p-1 px-4">
                    <input 
                      className="w-full bg-transparent border-none text-white py-4 focus:ring-0 font-bold outline-none flex-row-reverse uppercase tracking-widest text-xs" 
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Duration Pills (Pill radius contrasts with 8px base) */}
              <div className="surface-low p-8 rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                <label className="block label-sm mb-6 opacity-40">Duration Window</label>
                <div className="flex flex-wrap gap-4">
                  {durations.map(d => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDuration(d)}
                      className={`px-8 py-2.5 rounded-full border text-[11px] font-black uppercase tracking-widest_lg transition-pro duration-300 ${
                        duration === d 
                        ? 'border-primary text-primary bg-primary/5 shadow-[0_0_16px_rgba(186,158,255,0.15)] scale-105' 
                        : 'border-white/5 text-on_surface_variant hover:text-white hover:bg-surface_container_high'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Security & Sync */}
            <div className="md:col-span-4 space-y-8">
              {/* Security Shield */}
              <div className="surface-low p-8 rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <span className="material-symbols-outlined text-primary text-6xl">verified_user</span>
                </div>
                <h3 className="text-white font-black mb-8 flex items-center gap-2 uppercase text-xs tracking-widest_lg">
                  Protocol Security
                </h3>
                <div className="space-y-8">
                  <div className="flex items-center justify-between group cursor-pointer" onClick={() => setPasscode(!passcode)}>
                    <div>
                      <p className="text-xs font-black text-white uppercase tracking-widest">Passcode</p>
                      <p className="text-[10px] text-on_surface_variant mt-1">Authorized Entry Only</p>
                    </div>
                    <input 
                      type="checkbox"
                      checked={passcode}
                      onChange={(e) => setPasscode(e.target.checked)}
                      className="w-5 h-5 rounded-sm bg-surface_container_highest border-none text-primary focus:ring-0 cursor-pointer accent-primary"
                    />
                  </div>
                  {passcode && (
                    <div className="bg-surface_container_highest/30 p-4 rounded-lg border border-white/5 animate-fade-in group hover:bg-surface_container_highest/50 transition-pro">
                      <input 
                        className="bg-transparent border-none text-primary font-mono text-base tracking-[0.4em] w-full text-center outline-none uppercase font-black" 
                        type="text" 
                        defaultValue="KNTC-PROTO"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between group cursor-pointer pt-2" onClick={() => setWaitingRoom(!waitingRoom)}>
                    <div>
                      <p className="text-xs font-black text-white uppercase tracking-widest">Waiting Room</p>
                      <p className="text-[10px] text-on_surface_variant mt-1">Manual Host Authorization</p>
                    </div>
                    <input 
                      type="checkbox"
                      checked={waitingRoom}
                      onChange={(e) => setWaitingRoom(e.target.checked)}
                      className="w-5 h-5 rounded-sm bg-surface_container_highest border-none text-primary focus:ring-0 cursor-pointer accent-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Sync Link (Tonal selection) */}
              <div className="surface-low p-8 rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                <h3 className="text-white font-black mb-6 flex items-center gap-2 uppercase text-xs tracking-widest_lg">
                  Integrations
                </h3>
                <div className="space-y-4">
                  {['Google Calendar', 'Outlook / iCal'].map(c => (
                    <label 
                      key={c}
                      className={`flex items-center justify-between p-4 bg-surface_container_high/40 rounded-lg cursor-pointer transition-pro group border ${
                        calendar === c ? 'border-primary/30' : 'border-transparent hover:bg-surface_container_high'
                      }`}
                    >
                      <span className={`text-[10px] font-black uppercase tracking-widest ${calendar === c ? 'text-primary' : 'text-on_surface_variant group-hover:text-white'}`}>{c}</span>
                      <input 
                        type="radio" 
                        name="calendar"
                        checked={calendar === c}
                        onChange={() => setCalendar(c)}
                        className="w-4 h-4 text-primary bg-surface border-none focus:ring-0 accent-primary"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Bar (Tonal High Stacking) */}
            <div className="md:col-span-12 flex flex-col md:flex-row justify-between items-center surface-high p-8 rounded-lg mt-4 gap-8 shadow-[0_16px_48px_rgba(0,0,0,0.3)]">
              <div className="flex items-center gap-3 text-on_surface_variant bg-surface_container_low px-5 py-3 rounded-lg border border-white/5">
                <span className="material-symbols-outlined text-sm">public</span>
                <span className="text-[10px] font-black uppercase tracking-widest_lg opacity-60">Global Timezone: UTC -08:00</span>
              </div>
              <div className="flex items-center gap-6 w-full md:w-auto">
                <button 
                  type="button"
                  onClick={() => onAction('home')}
                  className="flex-1 md:flex-none uppercase text-xs font-black tracking-widest_lg text-white hover:text-primary_dim transition-pro px-6 py-4"
                >
                  Cancel Ops
                </button>
                <button 
                  type="submit"
                  className="flex-1 md:flex-none command-gradient px-12 py-4 rounded-lg text-black font-black text-xs uppercase tracking-widest_lg shadow-[0_12px_32px_rgba(186,158,255,0.25)] hover:scale-[1.03] active:scale-95 transition-all duration-300"
                >
                  Confirm Mission
                </button>
              </div>
            </div>
          </form>

          <footer className="mt-16 text-center">
            <p className="text-[9px] text-on_surface_variant/30 tracking-[0.5em] uppercase font-black">Kinetic Command • Encryption Standard AES-256</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default SchedulePage;
