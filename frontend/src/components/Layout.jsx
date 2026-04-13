import React from 'react';

const Layout = ({ children, onAction, activeView }) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-surface text-on-surface font-sans antialiased">
      {/* TopAppBar */}
      <header className="w-full h-14 bg-surface flex justify-between items-center px-6 z-30 font-['Inter'] antialiased tracking-tight shadow-[0_1px_0_rgba(255,255,255,0.05)]">
        <div className="flex items-center gap-8">
          <span className="text-xl font-black text-white tracking-tighter uppercase cursor-pointer" onClick={() => onAction('home')}>Kinetic Command</span>
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex gap-4">
              <button 
                onClick={() => onAction('home')} 
                className={`transition-pro px-3 py-1 rounded-lg text-sm font-medium ${activeView === 'dashboard' ? 'text-primary bg-primary/5' : 'text-on_surface_variant hover:bg-surface_container_high'}`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => onAction('schedule')} 
                className={`transition-pro px-3 py-1 rounded-lg text-sm font-medium ${activeView === 'schedule' ? 'text-primary bg-primary/5' : 'text-on_surface_variant hover:bg-surface_container_high'}`}
              >
                Schedule
              </button>
              <button className="text-on_surface_variant hover:bg-surface_container_high transition-pro px-3 py-1 rounded-lg text-sm font-medium">Recordings</button>
            </nav>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group p-2 rounded-lg hover:bg-surface_container_high cursor-pointer transition-pro">
            <span className="material-symbols-outlined text-on_surface_variant group-hover:text-white">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-surface animate-pulse"></span>
          </div>
          <span className="material-symbols-outlined text-on_surface_variant cursor-pointer hover:text-white transition-pro p-2 rounded-lg hover:bg-surface_container_high">help</span>
          <span className="material-symbols-outlined text-on_surface_variant cursor-pointer hover:text-white transition-pro p-2 rounded-lg hover:bg-surface_container_high">settings</span>
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/5 ml-2 hover:border-primary/30 transition-pro cursor-pointer">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFjr2BXx3ZAiXSZiOIw_h-YawKkuGVyLvFYqMI1OVjzFAefhnywFpwlroKUEJNTpoQDF6v07-gBlnOfURbWpq7cb2Ejzlm2ijZi6xLRRFgh1h9bQxPJaFSPG-E-_PAyI9o4XzM3JCTP2qADs-5NKMKoWv91FBJ5eIDBL787GDOon_w90x5OFE_GIzfMdtfzOspv0VlXMcs7VfpHPERRyMcV8AC5dOg4H49E8UlXdpQpWKcgE2B0JZZqtj5qAluQWq88_IyQUPxJg"
            />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* SideNavBar */}
        <aside className="h-full w-64 bg-surface_container_low flex flex-col py-4 hidden md:flex">
          <div className="px-6 mb-8 group cursor-pointer" onClick={() => onAction('home')}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary_container rounded-lg flex items-center justify-center transition-pro group-hover:scale-105 shadow-[0_4px_12px_rgba(186,158,255,0.15)]">
                <span className="material-symbols-outlined text-on_primary_container">widgets</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-primary tracking-tight">Workspace</h2>
                <p className="text-[10px] text-on_surface_variant uppercase tracking-widest font-black opacity-80">Pro Account</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 space-y-1">
            <button 
              onClick={() => onAction('home')} 
              className={`w-full flex items-center gap-4 px-6 py-3 transition-pro group relative ${activeView === 'dashboard' ? 'text-primary bg-gradient-to-r from-primary/10 to-transparent border-r-2 border-primary' : 'text-on_surface_variant hover:text-white hover:bg-surface_container_high'}`}
            >
              <span className="material-symbols-outlined transition-pro" style={{ fontVariationSettings: activeView === 'dashboard' ? "'FILL' 1" : "" }}>home</span>
              <span className="text-sm font-medium">Home</span>
            </button>
            <button 
              onClick={() => onAction('schedule')} 
              className={`w-full flex items-center gap-4 px-6 py-3 transition-pro group relative ${activeView === 'schedule' ? 'text-primary bg-gradient-to-r from-primary/10 to-transparent border-r-2 border-primary' : 'text-on_surface_variant hover:text-white hover:bg-surface_container_high'}`}
            >
              <span className="material-symbols-outlined transition-pro" style={{ fontVariationSettings: activeView === 'schedule' ? "'FILL' 1" : "" }}>videocam</span>
              <span className="text-sm font-medium">Meetings</span>
            </button>
            <button className="w-full flex items-center gap-4 px-6 py-3 text-on_surface_variant hover:text-white hover:bg-surface_container_high transition-pro">
              <span className="material-symbols-outlined">chat</span>
              <span className="text-sm font-medium">Team Chat</span>
            </button>
            <button className="w-full flex items-center gap-4 px-6 py-3 text-on_surface_variant hover:text-white hover:bg-surface_container_high transition-pro">
              <span className="material-symbols-outlined">edit_note</span>
              <span className="text-sm font-medium">Whiteboards</span>
            </button>
            <button className="w-full flex items-center gap-4 px-6 py-3 text-on_surface_variant hover:text-white hover:bg-surface_container_high transition-pro">
              <span className="material-symbols-outlined">person</span>
              <span className="text-sm font-medium">Contacts</span>
            </button>
          </nav>
          <div className="px-6 mt-auto">
            <div className="p-4 bg-surface_container_high rounded-xl">
              <p className="text-xs text-on_surface_variant mb-2 font-bold tracking-widest uppercase opacity-60">Cloud Storage</p>
              <div className="h-1.5 w-full bg-surface_container_low rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[75%] rounded-full shadow-[0_0_8px_rgba(186,158,255,0.4)]"></div>
              </div>
              <p className="text-[10px] text-white mt-2 font-bold text-right tracking-tight">15.4 GB / 20 GB</p>
            </div>
          </div>
        </aside>

        {/* Main Content Canvas */}
        <main className="flex-1 overflow-y-auto scrollbar-hide relative bg-surface">
          {children}
        </main>
      </div>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-center items-center h-20 bg-surface_container_highest/60 backdrop-blur-2xl border-t border-white/5 rounded-t-2xl">
        <div className="flex items-center justify-around w-full max-w-sm px-4">
          <button onClick={() => onAction('home')} className={`flex flex-col items-center gap-1 transition-pro ${activeView === 'dashboard' ? 'text-primary' : 'text-on_surface_variant'}`}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: activeView === 'dashboard' ? "'FILL' 1" : "" }}>home</span>
            <span className="text-[9px] uppercase tracking-widest font-black">Home</span>
          </button>
          <button onClick={() => onAction('schedule')} className={`flex flex-col items-center gap-1 transition-pro ${activeView === 'schedule' ? 'text-primary' : 'text-on_surface_variant'}`}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: activeView === 'schedule' ? "'FILL' 1" : "" }}>videocam</span>
            <span className="text-[9px] uppercase tracking-widest font-black">Meetings</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-on_surface_variant hover:text-white transition-pro">
            <span className="material-symbols-outlined">forum</span>
            <span className="text-[9px] uppercase tracking-widest font-black">Chat</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-on_surface_variant hover:text-white transition-pro">
            <span className="material-symbols-outlined">person</span>
            <span className="text-[9px] uppercase tracking-widest font-black">User</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
