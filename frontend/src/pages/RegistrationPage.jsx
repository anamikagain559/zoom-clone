import React, { useState } from 'react';
import loginBg from '../assets/login-bg.png';

import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setIsLoading(true);
    
    try {
      const resp = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      
      const data = await resp.json();
      
      if (resp.ok) {
        login(data.user, data.token);
        navigate('/');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      alert('INITIALIZATION ERROR: Uplink Failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden bg-surface">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-110"
        style={{ 
          backgroundImage: `url(${loginBg})`,
          filter: 'brightness(0.4) saturate(0.8) blur(5px)' 
        }}
      />
      
      {/* Dynamic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-surface/60" />

      {/* Registration Container */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="glass-obsidian p-8 md:p-10 card-rounded border border-white/10 shadow-2xl animate-in slide-in-from-bottom-5 duration-700">
          
          {/* Logo & Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-3 border border-primary/30 group transition-pro">
              <span className="material-symbols-outlined text-primary text-3xl group-hover:rotate-12 transition-pro">person_add</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tighter mb-1 uppercase">Deploy Profile</h1>
            <p className="text-on_surface_variant text-[11px] font-bold opacity-60 uppercase tracking-[0.2em]">Create Workspace Identity</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-on_surface_variant uppercase tracking-widest pl-1">Full Name</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on_surface_variant group-focus-within:text-primary transition-pro text-sm">badge</span>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Commander Shepard"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-pro"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-on_surface_variant uppercase tracking-widest pl-1">Sync Email</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on_surface_variant group-focus-within:text-primary transition-pro text-sm">alternate_email</span>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@n7.galactic"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-pro"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-on_surface_variant uppercase tracking-widest pl-1">Access Key</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-pro"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-on_surface_variant uppercase tracking-widest pl-1">Verify Key</label>
                <input 
                  type="password" 
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-pro"
                />
              </div>
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/80 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/20 transition-pro flex items-center justify-center gap-2 group overflow-hidden relative"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="relative z-10 uppercase tracking-widest text-xs">Authorize Deployment</span>
                    <span className="material-symbols-outlined text-sm group-hover:translate-y-[-2px] transition-pro relative z-10">publish</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Switch to Login */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-[11px] text-white/40 font-medium">
              Already have credentials? <span onClick={() => navigate('/login')} className="text-primary cursor-pointer hover:underline font-bold transition-pro">Return to Base</span>
            </p>
          </div>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="absolute top-10 right-10 flex items-center gap-3 opacity-30">
        <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">Profile Protocol Active</span>
        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></div>
      </div>
    </div>
  );
};

export default RegistrationPage;
