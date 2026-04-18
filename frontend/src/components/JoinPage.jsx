import React, { useState, useRef, useEffect } from 'react';

/* ─────────────────────────────────────────────
   Pill Toggle Component
───────────────────────────────────────────── */
const PillToggle = ({ checked, onChange, icon, iconOff, label }) => (
  <div
    className="flex items-center justify-between cursor-pointer group"
    onClick={() => onChange(!checked)}
  >
    <div className="flex items-center gap-3">
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
          checked
            ? 'bg-primary/20 text-primary'
            : 'bg-surface_container_highest/40 text-on_surface_variant'
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">
          {checked ? icon : iconOff}
        </span>
      </div>
      <span
        className={`text-sm font-semibold transition-colors duration-200 ${
          checked ? 'text-primary' : 'text-on_surface_variant group-hover:text-white'
        }`}
      >
        {label}
      </span>
    </div>

    {/* Pill switch */}
    <div
      className={`relative w-11 h-6 rounded-full transition-all duration-300 ${
        checked ? 'bg-primary' : 'bg-surface_container_highest'
      }`}
    >
      <div
        className={`absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-md transition-all duration-300 ${
          checked ? 'left-[23px]' : 'left-[3px]'
        }`}
      />
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Camera Preview Tile
───────────────────────────────────────────── */
const CameraPreview = ({ noVideo }) => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [camError, setCamError] = useState(false);

  useEffect(() => {
    if (!noVideo) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((s) => {
          setStream(s);
          if (videoRef.current) videoRef.current.srcObject = s;
        })
        .catch(() => setCamError(true));
    } else {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
        setStream(null);
      }
      if (videoRef.current) videoRef.current.srcObject = null;
    }
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noVideo]);

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/5 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
      {/* Live feed */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          noVideo || camError ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Off-state overlay */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-500 ${
          noVideo || camError ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Purple ambient orb behind avatar */}
        <div className="absolute w-40 h-40 rounded-full bg-primary/10 blur-[60px]" />
        <div className="relative w-20 h-20 rounded-full bg-surface_container_highest/60 backdrop-blur-sm border border-white/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-4xl text-on_surface_variant">
            {camError ? 'no_photography' : 'videocam_off'}
          </span>
        </div>
        <p className="relative text-xs font-semibold text-on_surface_variant uppercase tracking-widest_lg">
          {camError ? 'Camera Unavailable' : 'Camera Paused'}
        </p>
      </div>

      {/* Status badge */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 border border-white/10">
        <div className={`w-1.5 h-1.5 rounded-full ${noVideo || camError ? 'bg-red-400' : 'bg-emerald-400 animate-pulse'}`} />
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">
          {noVideo || camError ? 'Off' : 'Live'}
        </span>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main JoinPage
───────────────────────────────────────────── */
const JoinPage = ({ onJoin, onAction }) => {
  const [roomId, setRoomId] = useState('');
  const [name, setName] = useState('');
  const [noAudio, setNoAudio] = useState(false);
  const [noVideo, setNoVideo] = useState(false);
  const [focused, setFocused] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !roomId.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      onJoin(roomId, name);
    }, 600);
  };

  return (
    <div className="relative flex h-full bg-surface overflow-hidden">

      {/* ── Ambient Background ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[45%] h-[60%] bg-primary/6 rounded-full blur-[130px] animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-[-15%] right-[-5%] w-[50%] h-[60%] bg-primary_dim/5 rounded-full blur-[160px] animate-pulse" style={{ animationDuration: '9s', animationDelay: '2s' }} />
        {/* Fine grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(186,158,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(186,158,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* ═══════════════════════════════════
          LEFT PANEL – Preview + Branding
      ═══════════════════════════════════ */}
      <div className="hidden lg:flex flex-col flex-1 items-center justify-center p-12 z-10 gap-8">

        {/* Brand */}
        <div className="self-start">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                bolt
              </span>
            </div>
            <span className="text-white font-black tracking-tight_md text-xl uppercase">Kinetic</span>
          </div>
          <p className="text-on_surface_variant text-xs tracking-widest_lg uppercase font-bold ml-[42px]">Command Center</p>
        </div>

        {/* Camera Tile */}
        <div className="w-full max-w-[420px]">
          <CameraPreview noVideo={noVideo} />
        </div>

        {/* Quick status chips */}
        <div className="w-full max-w-[420px] grid grid-cols-3 gap-3">
          {[
            { icon: 'shield_lock', label: 'AES-256', color: 'text-emerald-400' },
            { icon: 'signal_cellular_alt', label: 'HD Ready', color: 'text-primary' },
            { icon: 'multiple_stop', label: 'P2P Relay', color: 'text-sky-400' },
          ].map(({ icon, label, color }) => (
            <div key={label} className="flex flex-col items-center gap-1.5 bg-surface_container_highest/20 border border-white/5 rounded-xl p-3">
              <span className={`material-symbols-outlined text-xl ${color}`} style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
              <span className="text-[10px] font-bold text-on_surface_variant uppercase tracking-widest">{label}</span>
            </div>
          ))}
        </div>

        {/* Decorative corner label */}
        <p className="self-start text-[10px] font-bold tracking-widest text-on_surface_variant/40 uppercase ml-1">
          Secure · Private · Encrypted
        </p>
      </div>

      {/* ═══════════════════════════════════
          RIGHT PANEL – Form
      ═══════════════════════════════════ */}
      <div className="flex flex-1 items-center justify-center p-6 lg:p-10 z-10">
        <div className="w-full max-w-[420px]">

          {/* Card */}
          <div
            className="rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
            style={{
              background: 'rgba(19,19,19,0.85)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {/* ── Header ── */}
            <div className="px-7 pt-7 pb-5">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h1 className="text-2xl font-black tracking-tight_md text-white uppercase mb-1">
                    Join Space
                  </h1>
                  <p className="text-[11px] font-bold text-on_surface_variant tracking-widest_lg uppercase">
                    Authorize Your Connection
                  </p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <span
                    className="material-symbols-outlined text-primary text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    meeting_room
                  </span>
                </div>
              </div>

              {/* Thin divider */}
              <div className="mt-5 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            </div>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} className="px-7 pb-5 space-y-4">

              {/* Meeting ID */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest_lg text-on_surface_variant/60 mb-2">
                  Meeting ID / Access Key
                </label>
                <div
                  className={`relative flex items-center rounded-xl overflow-hidden transition-all duration-200 ${
                    focused === 'room'
                      ? 'shadow-[0_0_0_1.5px_rgba(186,158,255,0.35)]'
                      : 'shadow-[0_0_0_1px_rgba(255,255,255,0.07)]'
                  }`}
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  <div className="pl-4 pr-2 flex-shrink-0">
                    <span
                      className={`material-symbols-outlined text-[20px] transition-colors duration-200 ${
                        focused === 'room' ? 'text-primary' : 'text-on_surface_variant/50'
                      }`}
                    >
                      key
                    </span>
                  </div>
                  <input
                    id="join-room-id"
                    type="text"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    onFocus={() => setFocused('room')}
                    onBlur={() => setFocused(null)}
                    placeholder="e.g. 123-456-789"
                    required
                    className="flex-1 bg-transparent text-white py-3.5 px-2 pr-4 text-sm font-medium placeholder:text-on_surface_variant/30 outline-none border-none focus:ring-0"
                  />
                </div>
              </div>

              {/* Display Name */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest_lg text-on_surface_variant/60 mb-2">
                  Display Identity
                </label>
                <div
                  className={`relative flex items-center rounded-xl overflow-hidden transition-all duration-200 ${
                    focused === 'name'
                      ? 'shadow-[0_0_0_1.5px_rgba(186,158,255,0.35)]'
                      : 'shadow-[0_0_0_1px_rgba(255,255,255,0.07)]'
                  }`}
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  <div className="pl-4 pr-2 flex-shrink-0">
                    <span
                      className={`material-symbols-outlined text-[20px] transition-colors duration-200 ${
                        focused === 'name' ? 'text-primary' : 'text-on_surface_variant/50'
                      }`}
                    >
                      person
                    </span>
                  </div>
                  <input
                    id="join-display-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    placeholder="Commander Alex"
                    required
                    className="flex-1 bg-transparent text-white py-3.5 px-2 pr-4 text-sm font-medium placeholder:text-on_surface_variant/30 outline-none border-none focus:ring-0"
                  />
                </div>
              </div>

              {/* ── Toggles ── */}
              <div
                className="rounded-xl p-4 space-y-4"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <PillToggle
                  checked={noAudio}
                  onChange={setNoAudio}
                  icon="mic_off"
                  iconOff="mic"
                  label="Mute on entry"
                />
                <div className="h-px bg-white/5" />
                <PillToggle
                  checked={noVideo}
                  onChange={setNoVideo}
                  icon="videocam_off"
                  iconOff="videocam"
                  label="Video off on entry"
                />
              </div>

              {/* ── CTA ── */}
              <button
                id="join-submit-btn"
                type="submit"
                disabled={isLoading}
                className="relative w-full overflow-hidden rounded-xl py-4 font-black text-xs uppercase tracking-widest_lg text-black flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-80 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #cdb4ff 0%, #ba9eff 40%, #9b71ff 100%)',
                  boxShadow: '0 8px 32px rgba(186,158,255,0.30), 0 2px 8px rgba(0,0,0,0.4)',
                }}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Connecting…
                  </>
                ) : (
                  <>
                    Initiate Connection
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </>
                )}

                {/* Sheen sweep */}
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.18) 50%, transparent 80%)',
                  }}
                />
              </button>
            </form>

            {/* ── Footer ── */}
            <div
              className="px-7 py-4 flex items-center justify-between"
              style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(0,0,0,0.2)',
              }}
            >
              <button
                type="button"
                id="join-abort-btn"
                onClick={() => onAction('home')}
                className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-on_surface_variant hover:text-white transition-colors duration-200"
              >
                <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                Return
              </button>

              <div className="flex items-center gap-1.5 text-[10px] font-bold text-on_surface_variant/50">
                <span className="material-symbols-outlined text-[13px] text-emerald-400" style={{ fontVariationSettings: "'FILL' 1" }}>
                  lock
                </span>
                AES-256 Encrypted
              </div>
            </div>
          </div>

          {/* Legal micro-text */}
          <p className="text-center mt-5 text-[9px] font-bold tracking-widest text-on_surface_variant/30 uppercase px-4 leading-relaxed">
            By connecting, you agree to the{' '}
            <span className="text-primary/60 hover:text-primary cursor-pointer transition-colors">Protocol Terms</span>{' '}
            &amp; Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JoinPage;
