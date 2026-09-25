// candidateService.ts - Candidate profile/jobs service
import type { Job } from '../types/job';
import { INITIAL_JOBS } from '../data/mockData';

export interface CandidateProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  skills: string[];
  resumeUrl?: string;
  appliedJobs: string[];
  savedJobs: string[];
}

export const candidateService = {
  getProfile: async (userId: string): Promise<CandidateProfile> => {
    await new Promise(r => setTimeout(r, 500));
    return {
      id: userId,
      name: 'Candidate User',
      email: 'candidate@clyptus.com',
      skills: ['React', 'TypeScript', 'Node.js'],
      appliedJobs: [],
      savedJobs: [],
    };
  },

  getRecommendedJobs: async (): Promise<Job[]> => {
    await new Promise(r => setTimeout(r, 600));
    return INITIAL_JOBS.slice(0, 4);
  },

  applyToJob: async (jobId: string): Promise<void> => {
    await new Promise(r => setTimeout(r, 700));
    console.log('Applied to job:', jobId);
  },

  saveJob: async (jobId: string): Promise<void> => {
    await new Promise(r => setTimeout(r, 300));
    console.log('Saved job:', jobId);
  },
};
