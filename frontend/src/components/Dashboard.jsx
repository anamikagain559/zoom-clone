import React, { useState, useEffect } from 'react';

const Dashboard = ({ onAction }) => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const meetings = [
    {
      id: 1,
      title: "Product Strategy Q4",
      time: "10:00 AM - 11:30 AM",
      date: { month: "OCT", day: "24" },
      status: "HAPPENING NOW",
      attendees: 12,
      isHappening: true
    },
    {
      id: 2,
      title: "Design System Sync",
      time: "01:00 PM - 02:00 PM",
      date: { month: "OCT", day: "24" },
      idNumber: "829-112-990",
      attendees: 2,
      isHappening: false
    },
    {
      id: 3,
      title: "Weekly Engineering All-Hands",
      time: "09:00 AM - 10:00 AM",
      date: { month: "OCT", day: "25" },
      room: "Alpha-9",
      attendees: 45,
      isHappening: false
    }
  ];

  const contacts = [
    { name: "Alex Rivera", status: "IN A MEETING", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150", online: true },
    { name: "Sarah Jenkins", status: "ONLINE", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150", online: true },
    { name: "Marcus Thorne", status: "AWAY", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150", online: false },
    { name: "Luna Kim", status: "OFFLINE", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150", online: false }
  ];

  return (
    <div className="flex h-full p-8 gap-8">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-10">
        
        {/* Header Cards Grid */}
        <div className="grid grid-cols-4 gap-6">
          <div 
            onClick={() => onAction('new')}
            className="accent-purple card-rounded p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:scale-[1.02] transition-pro shadow-lg"
          >
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">videocam</span>
            </div>
            <span className="font-bold text-center">New Meeting</span>
          </div>

          <div 
            onClick={() => onAction('join')}
            className="bg-[#121212] card-rounded p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-[#181818] transition-pro border border-white/5"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-3xl">add_box</span>
            </div>
            <span className="font-bold text-white text-center">Join</span>
          </div>

          <div 
            onClick={() => onAction('schedule')}
            className="bg-[#121212] card-rounded p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-[#181818] transition-pro border border-white/5"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-3xl">calendar_today</span>
            </div>
            <span className="font-bold text-white text-center">Schedule</span>
          </div>

          <div 
            className="bg-[#121212] card-rounded p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-[#181818] transition-pro border border-white/5"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-3xl">present_to_all</span>
            </div>
            <span className="font-bold text-white text-center">Share Screen</span>
          </div>
        </div>

        {/* Upcoming Meetings Section */}
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Upcoming Meetings</h2>
            <button className="text-primary text-sm font-semibold hover:underline">View Calendar</button>
          </div>

          <div className="space-y-4">
            {meetings.map(meeting => (
              <div key={meeting.id} className="bg-[#121212] card-rounded p-5 flex items-center gap-6 border border-white/5 hover:border-white/10 transition-pro">
                {/* Date Block */}
                <div className="flex flex-col items-center justify-center bg-[#181818] rounded-xl px-4 py-2 min-w-[80px]">
                  <span className="text-[10px] font-bold text-on_surface_variant uppercase">{meeting.date.month}</span>
                  <span className="text-2xl font-black text-white">{meeting.date.day}</span>
                </div>

                {/* Info Block */}
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    {meeting.status && (
                      <span className="text-[10px] font-black text-[#00FF94] bg-[#00FF94]/10 px-2 py-0.5 rounded uppercase tracking-wider">
                        {meeting.status}
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-white">{meeting.title}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-on_surface_variant font-medium">
                    <span>{meeting.time}</span>
                    {meeting.idNumber && <span>• ID: {meeting.idNumber}</span>}
                    {meeting.room && <span>• Room: {meeting.room}</span>}
                  </div>
                </div>

                {/* Attendees */}
                <div className="flex items-center -space-x-2 mr-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#121212] bg-[#1a1a1a] overflow-hidden">
                      <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&q=80&w=50`} alt="attendee" />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-[#121212] bg-[#1a1a1a] flex items-center justify-center text-[10px] font-bold text-white">
                    +{meeting.attendees}
                  </div>
                </div>

                {/* Action Button */}
                <button className={`px-6 py-2 rounded-xl font-bold text-sm transition-pro ${meeting.isHappening ? 'accent-purple' : 'bg-[#181818] text-white hover:bg-[#202020]'}`}>
                  {meeting.isHappening ? 'Start' : 'Join'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Active Contacts */}
      <div className="w-80 bg-[#121212] card-rounded flex flex-col border border-white/5">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">Active Contacts</h2>
          <span className="material-symbols-outlined text-on_surface_variant text-xl cursor-pointer">person_add</span>
        </div>

        {/* Contact Search */}
        <div className="p-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on_surface_variant text-lg">filter_list</span>
            <input 
              type="text" 
              placeholder="Filter by name..." 
              className="w-full bg-[#181818] border-none rounded-xl py-2 pl-10 pr-4 text-xs text-on_surface_variant focus:ring-0 outline-none"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4 scrollbar-hide">
          {contacts.map((contact, idx) => (
            <div key={idx} className="flex items-center gap-4 group cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-pro">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-pro">
                  <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
                </div>
                {contact.online && (
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#00FF94] border-2 border-[#121212] rounded-full"></span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">{contact.name}</span>
                <span className="text-[10px] font-bold text-on_surface_variant uppercase tracking-tighter">
                  {contact.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Bottom Bar (Meeting Controls Mockup) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#121212]/80 backdrop-blur-xl card-rounded border border-white/5 py-3 px-6 shadow-2xl flex items-center gap-6 z-50">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-1 cursor-pointer group">
            <span className="material-symbols-outlined text-white transition-pro group-hover:scale-110">mic</span>
            <span className="text-[9px] font-bold text-on_surface_variant group-hover:text-white uppercase">Mute</span>
          </div>
          <div className="flex flex-col items-center gap-1 cursor-pointer group">
            <span className="material-symbols-outlined text-white transition-pro group-hover:scale-110">videocam</span>
            <span className="text-[9px] font-bold text-on_surface_variant group-hover:text-white uppercase">Video</span>
          </div>
          <div className="flex flex-col items-center gap-1 cursor-pointer group">
            <span className="material-symbols-outlined text-white transition-pro group-hover:scale-110">ios_share</span>
            <span className="text-[9px] font-bold text-on_surface_variant group-hover:text-white uppercase">Share</span>
          </div>
          <div className="flex flex-col items-center gap-1 cursor-pointer group">
            <span className="material-symbols-outlined text-white transition-pro group-hover:scale-110">group</span>
            <span className="text-[9px] font-bold text-on_surface_variant group-hover:text-white uppercase">Users</span>
          </div>
          <div className="flex flex-col items-center gap-1 cursor-pointer group">
            <span className="material-symbols-outlined text-white transition-pro group-hover:scale-110">chat_bubble</span>
            <span className="text-[9px] font-bold text-on_surface_variant group-hover:text-white uppercase">Chat</span>
          </div>
          <div className="flex flex-col items-center gap-1 cursor-pointer group">
            <span className="material-symbols-outlined text-white transition-pro group-hover:scale-110">add_reaction</span>
            <span className="text-[9px] font-bold text-on_surface_variant group-hover:text-white uppercase">React</span>
          </div>
          <div className="flex flex-col items-center gap-1 cursor-pointer group">
            <span className="material-symbols-outlined text-white transition-pro group-hover:scale-110">more_horiz</span>
            <span className="text-[9px] font-bold text-on_surface_variant group-hover:text-white uppercase">More</span>
          </div>
        </div>
        <button className="bg-[#FF3B30] hover:bg-[#FF453A] text-white flex items-center gap-2 py-2 px-5 rounded-xl transition-pro font-bold text-sm shadow-lg shadow-red-500/20">
          <span className="material-symbols-outlined text-sm">call_end</span>
          End
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
