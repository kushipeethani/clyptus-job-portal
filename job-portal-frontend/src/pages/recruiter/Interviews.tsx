import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Calendar, PlusCircle, Video, CheckCircle2, Clock, X, Edit3 } from 'lucide-react';
import { Interview, InterviewStatus } from '../../types/clyptus.types';
import { INITIAL_INTERVIEWS, logAction } from '../../store/clyptus.store';

interface ContextType {
  showToast: (msg: string) => void;
}

const STATUSES: InterviewStatus[] = ['SCHEDULED', 'CONFIRMED', 'RESCHEDULED', 'COMPLETED', 'CANCELLED'];

export const RecruiterInterviews: React.FC = () => {
  const { showToast } = useOutletContext<ContextType>();
  const activeRecruiter = (() => {
    const saved = localStorage.getItem('clyptus_active_recruiter');
    return saved ? JSON.parse(saved) : { id: 'rec_1', name: 'Elena Rostova' };
  })();

  const [interviews, setInterviews] = useState<Interview[]>(() => {
    const saved = localStorage.getItem('clyptus_interviews');
    return saved ? JSON.parse(saved) : INITIAL_INTERVIEWS;
  });

  const saveInterviews = (updated: Interview[]) => {
    setInterviews(updated);
    localStorage.setItem('clyptus_interviews', JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('clyptus_store_updated', { detail: { type: 'INTERVIEWS' } }));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formCandidate, setFormCandidate] = useState('Alex Rivers');
  const [formJob, setFormJob] = useState('Senior Python & FastAPI Engineer');
  const [formType, setFormType] = useState<'TECHNICAL_ROUND_1' | 'SYSTEM_DESIGN' | 'HR_CULTURE_FIT' | 'FINAL_ROUND'>('TECHNICAL_ROUND_1');
  const [formDate, setFormDate] = useState('2026-09-30');
  const [formTime, setFormTime] = useState('02:30 PM IST');
  const [formLink, setFormLink] = useState('https://meet.clyptus.io/int-701-alex');
  const [formNotes, setFormNotes] = useState('Technical discussion focusing on FastAPI & PostgreSQL scalability.');

  const handleStatusChange = (id: string, newStatus: InterviewStatus) => {
    const updated = interviews.map((i) => (i.id === id ? { ...i, status: newStatus } : i));
    saveInterviews(updated);
    showToast(`Updated interview status to ${newStatus}`);
  };

  const handleScheduleInterview = (e: React.FormEvent) => {
    e.preventDefault();
    const newInt: Interview = {
      id: `int_${Date.now()}`,
      organizationId: 'org_abc_tech',
      jobId: 'job_201',
      jobTitle: formJob,
      candidateId: `cand_${Date.now()}`,
      candidateName: formCandidate,
      recruiterId: activeRecruiter.id,
      recruiterName: activeRecruiter.name,
      interviewType: formType,
      date: formDate,
      time: formTime,
      meetingLink: formLink,
      notes: formNotes,
      status: 'SCHEDULED',
    };

    const updated = [newInt, ...interviews];
    saveInterviews(updated);

    logAction(
      activeRecruiter.name,
      'RECRUITER',
      'INTERVIEW_SCHEDULED',
      'InterviewSlot',
      newInt.id,
      'INTERVIEW',
      `Scheduled ${formType.replace('_', ' ')} interview for ${formCandidate} on ${formDate} at ${formTime}.`
    );

    setIsModalOpen(false);
    showToast(`Scheduled ${formType.replace('_', ' ')} for ${formCandidate}!`);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Interview Scheduling & Management</h2>
          <p className="text-xs text-slate-500">Schedule candidate interviews, assign video links, and manage interview lifecycle statuses</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-brand-blue-600 hover:bg-brand-blue-700 text-white text-xs font-bold rounded-2xl shadow-sm flex items-center gap-1.5 w-fit"
        >
          <Calendar className="w-4 h-4" /> Schedule New Interview
        </button>
      </div>

      {/* Interviews Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Scheduled Interviews ({interviews.length})</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="p-4 pl-6">Candidate & Job</th>
                <th className="p-4">Round / Type</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Meeting Link</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right pr-6">Change Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {interviews.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 pl-6">
                    <div className="font-bold text-slate-900 text-xs">{item.candidateName}</div>
                    <div className="text-[10px] text-slate-400">{item.jobTitle}</div>
                  </td>

                  <td className="p-4 font-bold text-slate-800">{item.interviewType.replace('_', ' ')}</td>

                  <td className="p-4 font-semibold text-slate-800">
                    <div>{item.date}</div>
                    <div className="text-[10px] text-slate-400">{item.time}</div>
                  </td>

                  <td className="p-4">
                    <a href={item.meetingLink} target="_blank" rel="noreferrer" className="text-brand-blue-600 font-bold flex items-center gap-1 hover:underline">
                      <Video className="w-3.5 h-3.5" /> Join Link
                    </a>
                  </td>

                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      item.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-800' :
                      item.status === 'SCHEDULED' ? 'bg-purple-100 text-purple-800' :
                      item.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
                      item.status === 'RESCHEDULED' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>

                  <td className="p-4 text-right pr-6">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value as InterviewStatus)}
                      className="bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold text-slate-700 focus:outline-none"
                    >
                      {STATUSES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Interview Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">Schedule Candidate Interview</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleScheduleInterview} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Candidate Name</label>
                <input
                  type="text"
                  required
                  value={formCandidate}
                  onChange={(e) => setFormCandidate(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Job</label>
                <input
                  type="text"
                  required
                  value={formJob}
                  onChange={(e) => setFormJob(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Interview Date</label>
                  <input
                    type="date"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Time</label>
                  <input
                    type="text"
                    required
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Video Meeting Link</label>
                <input
                  type="url"
                  required
                  value={formLink}
                  onChange={(e) => setFormLink(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-brand-blue-600 hover:bg-brand-blue-700 rounded-xl shadow-sm"
                >
                  Schedule Interview
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
