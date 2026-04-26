import React from 'react';

const Layout = ({ children, onAction, activeView, user, onLogout }) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-surface text-on-surface font-sans antialiased">
      {/* Top Bar */}
      <header className="w-full h-16 bg-surface flex justify-between items-center px-8 z-30 border-b border-white/5">
        <div className="flex items-center gap-8 flex-1">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => onAction('home')}>
            <span className="material-symbols-outlined text-primary text-3xl">rocket_launch</span>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-white tracking-tight">Workspace</span>
              <span className="text-[10px] text-on_surface_variant uppercase tracking-widest font-black opacity-60">Pro Account</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on_surface_variant">search</span>
          <input 
            type="text" 
            placeholder="Search workspace..." 
            className="w-full bg-[#1a1a1a] border-none rounded-xl py-2.5 pl-12 pr-4 text-sm focus:ring-1 focus:ring-primary/30 transition-pro outline-none"
          />
        </div>

        {/* Utility Icons */}
        <div className="flex items-center justify-end gap-3 flex-1">
          <button className="p-2 rounded-lg hover:bg-[#1a1a1a] text-on_surface_variant hover:text-white transition-pro">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <button className="p-2 rounded-lg hover:bg-[#1a1a1a] text-on_surface_variant hover:text-white transition-pro">
            <span className="material-symbols-outlined">help</span>
          </button>
          <button className="p-2 rounded-lg hover:bg-[#1a1a1a] text-on_surface_variant hover:text-white transition-pro group relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-surface"></span>
          </button>
          <button onClick={onLogout} className="p-2 rounded-lg hover:bg-error/10 text-on_surface_variant hover:text-error transition-pro group relative" title="Logout">
            <span className="material-symbols-outlined">logout</span>
          </button>
          <div className="hidden lg:flex flex-col items-end mr-1">
            <span className="text-xs font-bold text-white">{user?.name}</span>
            <span className="text-[9px] text-primary font-black uppercase tracking-widest">Authorized</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center cursor-pointer ml-1 group hover:bg-primary/20 transition-pro">
            {user?.avatar ? (
              <img src={user.avatar} alt="profile" className="w-full h-full object-cover rounded-xl" />
            ) : (
              <span className="text-sm font-black text-primary group-hover:scale-110 transition-pro">
                {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="h-full w-64 flex flex-col py-6 px-4 hidden md:flex border-r border-white/5">
          <nav className="flex-1 space-y-2">
            <button 
              onClick={() => onAction('home')} 
              className={`w-full flex items-center gap-4 px-4 py-3 sidebar-rounded transition-pro ${activeView === 'dashboard' ? 'text-white bg-[#1a1a1a]' : 'text-on_surface_variant hover:text-white hover:bg-[#1a1a1a]/50'}`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: activeView === 'dashboard' ? "'FILL' 1" : "" }}>home</span>
              <span className="text-sm font-semibold">Home</span>
            </button>
            <button 
              onClick={() => onAction('schedule')} 
              className={`w-full flex items-center gap-4 px-4 py-3 sidebar-rounded transition-pro ${activeView === 'schedule' ? 'text-white bg-[#1a1a1a]' : 'text-on_surface_variant hover:text-white hover:bg-[#1a1a1a]/50'}`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: activeView === 'schedule' ? "'FILL' 1" : "" }}>videocam</span>
              <span className="text-sm font-semibold">Meetings</span>
            </button>
            <button className="w-full flex items-center gap-4 px-4 py-3 sidebar-rounded text-on_surface_variant hover:text-white hover:bg-[#1a1a1a]/50 transition-pro">
              <span className="material-symbols-outlined">forum</span>
              <span className="text-sm font-semibold">Team Chat</span>
            </button>
            <button className="w-full flex items-center gap-4 px-4 py-3 sidebar-rounded text-on_surface_variant hover:text-white hover:bg-[#1a1a1a]/50 transition-pro">
              <span className="material-symbols-outlined">edit_note</span>
              <span className="text-sm font-semibold">Whiteboards</span>
            </button>
            <button className="w-full flex items-center gap-4 px-4 py-3 sidebar-rounded text-on_surface_variant hover:text-white hover:bg-[#1a1a1a]/50 transition-pro">
              <span className="material-symbols-outlined">person</span>
              <span className="text-sm font-semibold">Contacts</span>
            </button>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-y-auto scrollbar-hide bg-[#0a0a0a]">
          {children}
        </main>
      </div>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center h-16 bg-[#121212] border-t border-white/5">
        <button onClick={() => onAction('home')} className={`flex flex-col items-center p-2 ${activeView === 'dashboard' ? 'text-primary' : 'text-on_surface_variant'}`}>
          <span className="material-symbols-outlined">home</span>
        </button>
        <button onClick={() => onAction('schedule')} className={`flex flex-col items-center p-2 ${activeView === 'schedule' ? 'text-primary' : 'text-on_surface_variant'}`}>
          <span className="material-symbols-outlined">videocam</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;
