import React from 'react';
import { BarChart3, TrendingUp, Users, Coins } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const funnelData = [
  { stage: 'Applications', count: 56 },
  { stage: 'Screening', count: 28 },
  { stage: 'Shortlisted', count: 12 },
  { stage: 'Interview', count: 6 },
  { stage: 'Offer', count: 2 },
  { stage: 'Hired', count: 4 },
];

export const RecruiterAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Recruiter Performance & Funnel Analytics</h2>
        <p className="text-xs text-slate-500">Track candidate conversion ratios, screening performance, and token efficiency</p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">Recruitment Funnel Conversion Ratios</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={funnelData}>
              <XAxis dataKey="stage" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
