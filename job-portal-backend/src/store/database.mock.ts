import { 
  AdminUser, 
  RecruiterUser, 
  OrganizationCreditAccount, 
  CreditTransaction, 
  Job, 
  Application, 
  Offer 
} from '../types/backend.types';

class MockDatabase {
  public creditAccount: OrganizationCreditAccount = {
    organizationId: 'org_abc_tech',
    organizationName: 'ABC Recruitment Pvt Ltd',
    balance: 1000,
    totalAllocated: 2500,
    totalConsumed: 1500,
  };

  public admins: AdminUser[] = [
    {
      id: 'adm_1',
      organizationId: 'org_abc_tech',
      name: 'Marcus Vance',
      email: 'marcus.v@abctech.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      status: 'ACTIVE',
      permissions: ['RECRUITER_MANAGEMENT', 'JOB_MANAGEMENT', 'CANDIDATE_MANAGEMENT', 'APPLICATION_MANAGEMENT', 'REPORTS'],
      createdAt: '2026-09-01',
    },
    {
      id: 'adm_2',
      organizationId: 'org_abc_tech',
      name: 'Priya Sharma',
      email: 'priya.s@abctech.com',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
      status: 'ACTIVE',
      permissions: ['RECRUITER_MANAGEMENT', 'REPORTS', 'USER_MANAGEMENT'],
      createdAt: '2026-09-10',
    }
  ];

  public recruiters: RecruiterUser[] = [
    {
      id: 'rec_1',
      organizationId: 'org_abc_tech',
      name: 'Elena Rostova',
      email: 'elena.r@abctech.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      status: 'ACTIVE',
      activeJobsCount: 4,
      profileViewsCount: 25,
      resumeDownloadsCount: 10,
      totalCreditsUsed: 35,
      allocatedCredits: 500,
      createdAt: '2026-09-05',
    },
    {
      id: 'rec_2',
      organizationId: 'org_abc_tech',
      name: 'David Chen',
      email: 'david.c@abctech.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      status: 'ACTIVE',
      activeJobsCount: 3,
      profileViewsCount: 15,
      resumeDownloadsCount: 7,
      totalCreditsUsed: 22,
      allocatedCredits: 300,
      createdAt: '2026-09-08',
    }
  ];

  public transactions: CreditTransaction[] = [
    {
      id: 'tx_1001',
      organizationId: 'org_abc_tech',
      recruiterId: 'sys',
      recruiterName: 'Clyptus Platform Owner',
      action: 'CREDIT_ALLOCATION',
      credits: 2500,
      balanceBefore: 0,
      balanceAfter: 2500,
      timestamp: '2026-09-01 10:00 AM',
    },
    {
      id: 'tx_1002',
      organizationId: 'org_abc_tech',
      recruiterId: 'rec_1',
      recruiterName: 'Elena Rostova',
      action: 'PROFILE_VIEW',
      credits: -1,
      balanceBefore: 1002,
      balanceAfter: 1001,
      referenceType: 'CANDIDATE',
      referenceId: 'cand_101',
      timestamp: '2026-09-28 11:20 AM',
    },
    {
      id: 'tx_1003',
      organizationId: 'org_abc_tech',
      recruiterId: 'rec_1',
      recruiterName: 'Elena Rostova',
      action: 'RESUME_DOWNLOAD',
      credits: -1,
      balanceBefore: 1001,
      balanceAfter: 1000,
      referenceType: 'RESUME',
      referenceId: 'cand_101',
      timestamp: '2026-09-28 11:25 AM',
    }
  ];

  public jobs: Job[] = [
    {
      id: 'job_201',
      organizationId: 'org_abc_tech',
      recruiterId: 'rec_1',
      recruiterName: 'Elena Rostova',
      title: 'Senior Python & FastAPI Engineer',
      department: 'Engineering',
      location: 'Hyderabad',
      experience: '1–3 Years',
      salary: '₹5–8 LPA',
      workMode: 'HYBRID',
      jobType: 'FULL_TIME',
      status: 'PUBLISHED',
      description: 'We are hiring a Senior Python Engineer to build scalable REST microservices with FastAPI and PostgreSQL.',
      responsibilities: ['Develop high-performance REST endpoints', 'Optimize PostgreSQL queries'],
      requirements: ['3+ years Python experience', 'FastAPI expertise'],
      skills: ['Python', 'FastAPI', 'PostgreSQL', 'Redis'],
      openings: 3,
      deadline: '2026-10-15',
      createdAt: '2026-09-20',
      applicationsCount: 34,
      shortlistedCount: 6,
    }
  ];

  public applications: Application[] = [
    {
      id: 'app_501',
      organizationId: 'org_abc_tech',
      jobId: 'job_201',
      jobTitle: 'Senior Python & FastAPI Engineer',
      candidateId: 'cand_101',
      candidateName: 'Alex Rivers',
      candidateEmail: 'alex.rivers@devmail.com',
      appliedDate: '2026-09-25',
      status: 'INTERVIEW',
      matchScore: 94,
    }
  ];

  public offers: Offer[] = [
    {
      id: 'off_801',
      organizationId: 'org_abc_tech',
      jobId: 'job_201',
      jobTitle: 'Senior Python & FastAPI Engineer',
      candidateId: 'cand_101',
      candidateName: 'Alex Rivers',
      candidateEmail: 'alex.rivers@devmail.com',
      role: 'Senior Python Engineer',
      annualCTC: '₹8,00,000 INR',
      joiningDate: '2026-11-01',
      status: 'SENT',
      createdBy: 'Elena Rostova',
      createdAt: '2026-09-27',
    }
  ];
}

export const db = new MockDatabase();
