// recruiterService.ts - Recruiter job posting service

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  description: string;
  status: 'active' | 'closed' | 'draft';
  applicantsCount: number;
  postedDate: string;
}

export interface RecruiterProfile {
  id: string;
  name: string;
  email: string;
  companyName: string;
  designation?: string;
  postedJobs: JobPosting[];
}

export const recruiterService = {
  getProfile: async (userId: string): Promise<RecruiterProfile> => {
    await new Promise(r => setTimeout(r, 500));
    return {
      id: userId,
      name: 'Recruiter User',
      email: 'recruiter@clyptus.com',
      companyName: 'Clyptus Technologies',
      designation: 'HR Manager',
      postedJobs: [
        {
          id: 'p1',
          title: 'Senior React Engineer',
          company: 'Clyptus Technologies',
          location: 'Bengaluru (Hybrid)',
          jobType: 'Full Time',
          description: 'Looking for senior React engineers...',
          status: 'active',
          applicantsCount: 43,
          postedDate: '2 days ago',
        },
        {
          id: 'p2',
          title: 'ML Engineer',
          company: 'Clyptus Technologies',
          location: 'Remote',
          jobType: 'Full Time',
          description: 'ML engineer for LLM pipelines...',
          status: 'active',
          applicantsCount: 21,
          postedDate: '5 days ago',
        },
      ],
    };
  },

  postJob: async (data: Partial<JobPosting>): Promise<JobPosting> => {
    await new Promise(r => setTimeout(r, 1000));
    return {
      id: 'p-' + Date.now(),
      title: data.title || 'New Job',
      company: data.company || 'Company',
      location: data.location || 'Remote',
      jobType: data.jobType || 'Full Time',
      description: data.description || '',
      status: 'active',
      applicantsCount: 0,
      postedDate: 'Just now',
    };
  },

  closeJob: async (jobId: string): Promise<void> => {
    await new Promise(r => setTimeout(r, 400));
    console.log('Closed job:', jobId);
  },
};

