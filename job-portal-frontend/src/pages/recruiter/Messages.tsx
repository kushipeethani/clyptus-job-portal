import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Paperclip, 
  Search, 
  UserCheck, 
  Clock, 
  ShieldCheck, 
  CheckCheck,
  FileText,
  Lock
} from 'lucide-react';

export const RecruiterMessages: React.FC = () => {
  const [activeCandidateId, setActiveCandidateId] = useState('c1');
  const [messageInput, setMessageInput] = useState('');

  const candidatesList = [
    {
      id: 'c1',
      name: 'Dr. Aris Thorne',
      role: 'Principal AI Researcher',
      lastMessage: 'I have attached the updated research portfolio.',
      time: '10:42 AM',
      unread: 1,
      online: true
    },
    {
      id: 'c2',
      name: 'Sophia Lin',
      role: 'Staff React Systems Architect',
      lastMessage: 'Looking forward to the technical system design round on Thursday.',
      time: 'Yesterday',
      unread: 0,
      online: false
    },
    {
      id: 'c3',
      name: 'Marcus Vance',
      role: 'Senior DevOps & Cloud Engineer',
      lastMessage: 'Can you clarify the remote work policy for this role?',
      time: 'Sep 25',
      unread: 0,
      online: true
    }
  ];

  const messages = [
    {
      sender: 'recruiter',
      text: 'Hello Dr. Thorne, thank you for completing the initial screening assessment. The team was impressed with your background in LLM fine-tuning.',
      time: '10:15 AM'
    },
    {
      sender: 'candidate',
      text: 'Thank you! I enjoyed discussing the model quantization challenges during the screening call.',
      time: '10:30 AM'
    },
    {
      sender: 'candidate',
      text: 'I have attached the updated research portfolio for your reference.',
      time: '10:42 AM'
    }
  ];

  const handleSend = () => {
    if (!messageInput.trim()) return;
    setMessageInput('');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto h-[calc(100vh-100px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-200 shadow-xs shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 text-indigo-700 rounded-xl">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-black text-slate-900">Recruiter-Candidate Messaging</h1>
            <p className="text-xs text-slate-500">
              End-to-End Encrypted & Privacy Boundaries Enforced • Authorized Organization Scope
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-200">
          <ShieldCheck className="w-4 h-4" />
          <span>Audit Logged Messaging</span>
        </div>
      </div>

      {/* Main Messaging Interface */}
      <div className="bg-white border border-slate-200 rounded-2xl flex-1 flex overflow-hidden shadow-xs">
        {/* Candidate List Sidebar */}
        <div className="w-80 border-r border-slate-200 flex flex-col bg-slate-50/50">
          <div className="p-3 border-b border-slate-200">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search candidates..."
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
            {candidatesList.map((c) => (
              <div
                key={c.id}
                onClick={() => setActiveCandidateId(c.id)}
                className={`p-3.5 flex items-start gap-3 cursor-pointer transition-all ${
                  activeCandidateId === c.id ? 'bg-indigo-50/80 border-l-4 border-indigo-600' : 'hover:bg-slate-100/60'
                }`}
              >
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-full bg-slate-800 text-white font-black flex items-center justify-center text-xs">
                    {c.name.charAt(0)}
                  </div>
                  {c.online && (
                    <span className="w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full absolute bottom-0 right-0"></span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{c.name}</h4>
                    <span className="text-[10px] text-slate-400 font-semibold">{c.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium truncate">{c.role}</p>
                  <p className="text-[11px] text-slate-600 mt-1 truncate">{c.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversation View */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Active Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-black flex items-center justify-center text-sm">
                D
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Dr. Aris Thorne</h3>
                <p className="text-[11px] text-slate-500">Applied for: Principal AI Researcher</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all">
                View Candidate Profile
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/30">
            <div className="flex justify-center">
              <span className="text-[10px] text-slate-400 bg-slate-100 px-3 py-1 rounded-full font-semibold">
                Conversation started for Application #APP-9021
              </span>
            </div>

            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'recruiter' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-md p-3.5 rounded-2xl text-xs font-medium shadow-xs space-y-1 ${
                    m.sender === 'recruiter'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                  }`}
                >
                  <p>{m.text}</p>
                </div>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400 font-semibold px-1">
                  <span>{m.time}</span>
                  {m.sender === 'recruiter' && <CheckCheck className="w-3 h-3 text-indigo-500" />}
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 border-t border-slate-200 bg-white">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-indigo-500">
              <button className="p-2 text-slate-400 hover:text-slate-600 rounded-xl transition-all">
                <Paperclip className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message to candidate..."
                className="flex-1 bg-transparent text-xs font-medium text-slate-800 focus:outline-none px-2"
              />

              <button
                onClick={handleSend}
                className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
