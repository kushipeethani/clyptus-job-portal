import React, { useState } from 'react';
import { CheckSquare, Clock, CheckCircle2, AlertCircle, PlusCircle } from 'lucide-react';

interface RecruiterTask {
  id: string;
  title: string;
  category: 'SCREENING' | 'INTERVIEW_FEEDBACK' | 'CANDIDATE_OFFER' | 'FOLLOW_UP';
  dueDate: string;
  status: 'DUE' | 'OVERDUE' | 'COMPLETED';
  relatedJob: string;
  relatedCandidate: string;
}

const INITIAL_TASKS: RecruiterTask[] = [
  {
    id: 'tsk_1',
    title: 'Submit Technical Interview Feedback',
    category: 'INTERVIEW_FEEDBACK',
    dueDate: '2026-09-28',
    status: 'OVERDUE',
    relatedJob: 'Senior Python Engineer',
    relatedCandidate: 'Alex Rivers',
  },
  {
    id: 'tsk_2',
    title: 'Screen Resume & Portfolio',
    category: 'SCREENING',
    dueDate: '2026-09-29',
    status: 'DUE',
    relatedJob: 'Full Stack React Specialist',
    relatedCandidate: 'Sophia Lin',
  }
];

export const RecruiterTasks: React.FC = () => {
  const [tasks, setTasks] = useState<RecruiterTask[]>(INITIAL_TASKS);

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: t.status === 'COMPLETED' ? 'DUE' : 'COMPLETED' } : t))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Recruiter Task Checklist</h2>
        <p className="text-xs text-slate-500">Track screening tasks, interview feedback, and candidate communication follow-ups</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Active Recruitment Tasks ({tasks.length})</h3>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {tasks.map((task) => (
            <div key={task.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.status === 'COMPLETED'}
                  onChange={() => toggleComplete(task.id)}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
                />
                <div>
                  <div className={`font-bold ${task.status === 'COMPLETED' ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                    {task.title}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Candidate: {task.relatedCandidate} • Job: {task.relatedJob}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  task.status === 'OVERDUE' ? 'bg-red-100 text-red-800' :
                  task.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {task.status} • {task.dueDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
