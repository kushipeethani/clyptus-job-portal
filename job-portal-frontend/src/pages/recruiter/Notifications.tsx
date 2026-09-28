import React, { useState } from 'react';
import { 
  Bell, 
  CheckCircle2, 
  Clock, 
  UserPlus, 
  Calendar, 
  Gift, 
  ShieldAlert, 
  Settings,
  Coins,
  Filter
} from 'lucide-react';

export const RecruiterNotifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'preferences'>('all');

  const notifications = [
    {
      id: 'n1',
      title: 'New Application Received',
      description: 'Dr. Aris Thorne submitted an application for Principal AI Researcher.',
      time: '10 mins ago',
      type: 'application',
      unread: true,
      icon: UserPlus,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      id: 'n2',
      title: 'Interview Scheduled',
      description: 'Technical System Design round scheduled with Sophia Lin for Thursday, 3:00 PM.',
      time: '1 hour ago',
      type: 'interview',
      unread: true,
      icon: Calendar,
      color: 'bg-amber-50 text-amber-600'
    },
    {
      id: 'n3',
      title: 'Offer Accepted!',
      description: 'Elena Rostova accepted the offer for Lead Product Designer.',
      time: '3 hours ago',
      type: 'offer',
      unread: false,
      icon: Gift,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      id: 'n4',
      title: 'Credit Top-Up Notification',
      description: 'Organization Super Admin allocated 250 candidate search credits to your balance.',
      time: '1 day ago',
      type: 'credit',
      unread: false,
      icon: Coins,
      color: 'bg-indigo-50 text-indigo-600'
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 text-indigo-700 rounded-xl">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900">Recruitment Notifications</h1>
            <p className="text-xs text-slate-500">
              Applications, interview invites, candidate feedback, offer responses, and system alerts
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'all' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Notifications
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'preferences' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Preferences</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      {activeTab !== 'preferences' ? (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs divide-y divide-slate-100">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                className={`p-4 flex items-start gap-4 transition-colors ${
                  n.unread ? 'bg-indigo-50/30' : 'hover:bg-slate-50'
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${n.color}`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <span>{n.title}</span>
                      {n.unread && (
                        <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                      )}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-semibold">{n.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 font-medium">{n.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            Personal Notification Preferences
          </h3>

          <div className="space-y-4">
            {[
              { title: 'New Job Applications', desc: 'Notify immediately when candidates apply to your assigned jobs.' },
              { title: 'Interview Scheduling & Feedback', desc: 'Alerts for scheduled interviews and interviewer feedback submissions.' },
              { title: 'Offer Letter Updates', desc: 'Receive notifications when candidates accept, reject, or comment on offer letters.' },
              { title: 'Token Balance Alerts', desc: 'Notify when candidate search token balance drops below 20 credits.' }
            ].map((pref, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{pref.title}</h4>
                  <p className="text-[11px] text-slate-500">{pref.desc}</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
                />
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all">
              Save Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
