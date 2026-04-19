import React, { useState } from 'react';
import loginBg from '../assets/login-bg.png';

const LoginPage = ({ onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate a professional login delay
    setTimeout(() => {
      onLogin({ email, name: email.split('@')[0] || 'Commander' });
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden bg-surface">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
        style={{ 
          backgroundImage: `url(${loginBg})`,
          filter: 'brightness(0.4) saturate(0.8)' 
        }}
      />
      
      {/* Dynamic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-surface/40" />

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="glass-obsidian p-10 card-rounded border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-700">
          
          {/* Logo & Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-4 border border-primary/30 group transition-pro hover:bg-primary/30">
              <span className="material-symbols-outlined text-primary text-4xl group-hover:scale-110 transition-pro">rocket_launch</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter mb-1">WORKSPACE</h1>
            <p className="text-on_surface_variant text-sm font-medium opacity-60">KINETIC COMMAND CENTER</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-on_surface_variant uppercase tracking-widest pl-1">Email Terminal</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on_surface_variant group-focus-within:text-primary transition-pro">alternate_email</span>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-pro"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-on_surface_variant uppercase tracking-widest pl-1">Access Key</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on_surface_variant group-focus-within:text-primary transition-pro">lock</span>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-pro"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-bold text-on_surface_variant">
              <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-pro">
                <input type="checkbox" className="accent-primary rounded h-3.5 w-3.5" />
                <span>Remember Session</span>
              </label>
              <a href="#" className="hover:text-primary transition-pro">Forgot Key?</a>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/80 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-pro flex items-center justify-center gap-2 group overflow-hidden relative"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span className="relative z-10 uppercase tracking-widest text-xs">Initialize Session</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-pro relative z-10">arrow_forward</span>
                </>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
          </form>

          {/* Footer UI */}
          <div className="mt-10 pt-6 border-t border-white/5 flex flex-col items-center gap-4">
            <p className="text-[11px] text-white/40 font-medium">New to Workspace? <span onClick={onSwitchToRegister} className="text-primary cursor-pointer hover:underline font-bold transition-pro">Deploy Component</span></p>
            
            <div className="flex items-center gap-4 w-full">
              <div className="h-px bg-white/5 flex-1"></div>
              <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Secure Transit</span>
              <div className="h-px bg-white/5 flex-1"></div>
            </div>
            
            <div className="flex gap-4">
              <button className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-pro">
                <img src="https://www.google.com/favicon.ico" className="w-4 h-4 opacity-70" alt="google" />
              </button>
              <button className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-pro">
                <img src="https://github.com/favicon.ico" className="w-4 h-4 invert opacity-70" alt="github" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle UI Accents */}
      <div className="absolute top-10 left-10 flex flex-col gap-1 opacity-20 hidden lg:flex">
         <div className="h-px w-20 bg-primary"></div>
         <div className="h-px w-10 bg-primary"></div>
         <span className="text-[10px] font-black text-primary tracking-widest">GS-92 COMMAND</span>
      </div>
      
      <div className="absolute bottom-10 right-10 flex flex-col items-end gap-1 opacity-20 hidden lg:flex">
         <span className="text-[10px] font-black text-primary tracking-widest">SYSTEM STATUS: OPTIMAL</span>
         <div className="flex gap-1">
            <div className="w-1 h-1 bg-primary animate-pulse"></div>
            <div className="w-1 h-1 bg-primary animate-pulse delay-75"></div>
            <div className="w-1 h-1 bg-primary animate-pulse delay-150"></div>
         </div>
      </div>
    </div>
  );
};

export default LoginPage;
