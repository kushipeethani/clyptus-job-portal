import { 
  AdminUser, 
  RecruiterUser, 
  OrganizationCreditAccount, 
  CreditTransaction, 
  Job, 
  Candidate, 
  Application, 
  Interview, 
  Offer,
  Invitation,
  AuditLog
} from '../types/clyptus.types';

export const INITIAL_CREDIT_ACCOUNT: OrganizationCreditAccount = {
  organizationId: 'org_abc_tech',
  organizationName: 'ABC Recruitment Pvt Ltd',
  balance: 1000,
  totalAllocated: 2500,
  totalConsumed: 1500,
};

export const INITIAL_ADMINS: AdminUser[] = [
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

export const INITIAL_RECRUITERS: RecruiterUser[] = [
  {
    id: 'rec_1',
    organizationId: 'org_abc_tech',
    name: 'Elena Rostova (Recruiter A)',
    email: 'elena.r@abctech.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    status: 'ACTIVE',
    activeJobsCount: 4,
    profileViewsCount: 25,
    resumeDownloadsCount: 10,
    totalCreditsUsed: 35,
    createdAt: '2026-09-05',
  },
  {
    id: 'rec_2',
    organizationId: 'org_abc_tech',
    name: 'David Chen (Recruiter B)',
    email: 'david.c@abctech.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    status: 'ACTIVE',
    activeJobsCount: 3,
    profileViewsCount: 15,
    resumeDownloadsCount: 7,
    totalCreditsUsed: 22,
    createdAt: '2026-09-08',
  }
];

export const INITIAL_TRANSACTIONS: CreditTransaction[] = [
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

export const INITIAL_JOBS: Job[] = [
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
    responsibilities: [
      'Develop high-performance REST endpoints using FastAPI',
      'Optimize PostgreSQL queries and database schemas',
      'Integrate with Redis caching layers and BullMQ worker queues'
    ],
    requirements: [
      '3+ years experience with Python 3.10+',
      'Hands-on experience with FastAPI or Django REST framework',
      'Strong knowledge of relational databases and SQL'
    ],
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
    openings: 3,
    deadline: '2026-10-15',
    createdAt: '2026-09-20',
    applicationsCount: 34,
    shortlistedCount: 6,
  },
  {
    id: 'job_202',
    organizationId: 'org_abc_tech',
    recruiterId: 'rec_2',
    recruiterName: 'David Chen',
    title: 'Full Stack React & Node.js Specialist',
    department: 'Web Engineering',
    location: 'Bengaluru / Remote',
    experience: '3–5 Years',
    salary: '₹12–18 LPA',
    workMode: 'REMOTE',
    jobType: 'FULL_TIME',
    status: 'PUBLISHED',
    description: 'Looking for a React developer proficient in TypeScript, Vite, Tailwind CSS, and state management.',
    responsibilities: [
      'Build responsive multi-tenant SaaS portals in React and Vite',
      'Implement state management with Zustand and TanStack Query'
    ],
    requirements: [
      'Proven track record building modern TypeScript React applications',
      'Experience with Tailwind CSS and UI design systems'
    ],
    skills: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js'],
    openings: 2,
    deadline: '2026-10-20',
    createdAt: '2026-09-22',
    applicationsCount: 22,
    shortlistedCount: 4,
  }
];

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'cand_101',
    name: 'Alex Rivers',
    email: 'alex.rivers@devmail.com',
    phone: '+91 98765 43210',
    location: 'Hyderabad',
    title: 'Python Developer',
    experienceYears: 3,
    skills: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Docker'],
    education: 'B.Tech in Computer Science, NIT Warangal',
    expectedSalary: '₹7.5 LPA',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80',
    resumeUrl: 'https://clyptus-resumes-s3.bucket/alex_rivers_resume.pdf',
    profileUnlockedByRecruiters: ['rec_1'],
    resumeDownloadedByRecruiters: ['rec_1'],
  },
  {
    id: 'cand_102',
    name: 'Sophia Lin',
    email: 'sophia.lin@devmail.com',
    phone: '+91 98123 55441',
    location: 'Bengaluru',
    title: 'Full Stack Engineer',
    experienceYears: 4,
    skills: ['React', 'TypeScript', 'Node.js', 'FastAPI', 'Tailwind CSS'],
    education: 'B.E. Computer Science, RVCE Bengaluru',
    expectedSalary: '₹15 LPA',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
    resumeUrl: 'https://clyptus-resumes-s3.bucket/sophia_lin_resume.pdf',
    profileUnlockedByRecruiters: [],
    resumeDownloadedByRecruiters: [],
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app_501',
    organizationId: 'org_abc_tech',
    jobId: 'job_201',
    jobTitle: 'Senior Python & FastAPI Engineer',
    candidateId: 'cand_101',
    candidateName: 'Alex Rivers',
    candidateEmail: 'alex.rivers@devmail.com',
    appliedDate: '2026-09-25',
    status: 'INTERVIEW_SCHEDULED',
    matchScore: 94,
    coverLetter: 'Passionate about FastAPI and scalable backend microservices.',
  },
  {
    id: 'app_502',
    organizationId: 'org_abc_tech',
    jobId: 'job_202',
    jobTitle: 'Full Stack React & Node.js Specialist',
    candidateId: 'cand_102',
    candidateName: 'Sophia Lin',
    candidateEmail: 'sophia.lin@devmail.com',
    appliedDate: '2026-09-26',
    status: 'SHORTLISTED',
    matchScore: 91,
    coverLetter: 'Strong frontend background in React, TypeScript and state management.',
  }
];

export const INITIAL_INTERVIEWS: Interview[] = [
  {
    id: 'int_701',
    organizationId: 'org_abc_tech',
    jobId: 'job_201',
    jobTitle: 'Senior Python & FastAPI Engineer',
    candidateId: 'cand_101',
    candidateName: 'Alex Rivers',
    recruiterId: 'rec_1',
    recruiterName: 'Elena Rostova',
    interviewType: 'TECHNICAL_ROUND_1',
    date: '2026-09-30',
    time: '02:30 PM IST',
    meetingLink: 'https://meet.clyptus.io/int-701-alex',
    notes: 'Technical assessment focusing on FastAPI performance and async database queries.',
    status: 'SCHEDULED',
  }
];

export const INITIAL_OFFERS: Offer[] = [
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

export const INITIAL_INVITATIONS: Invitation[] = [
  {
    id: 'inv_301',
    organizationId: 'org_abc_tech',
    email: 'karan.singh@abctech.com',
    role: 'RECRUITER',
    invitedBy: 'Sarah Jenkins (Super Admin)',
    status: 'PENDING',
    sentAt: '2026-09-27 04:15 PM',
    expiresAt: '2026-10-04',
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'audit_901',
    organizationId: 'org_abc_tech',
    userId: 'adm_1',
    userName: 'Marcus Vance',
    role: 'ORGANIZATION_ADMIN',
    action: 'RECRUITER_CREATION',
    resource: 'RecruiterAccount',
    resourceId: 'rec_2',
    timestamp: '2026-09-08 09:30 AM',
    ip: '192.168.1.45',
  },
  {
    id: 'audit_902',
    organizationId: 'org_abc_tech',
    userId: 'rec_1',
    userName: 'Elena Rostova',
    role: 'RECRUITER',
    action: 'CANDIDATE_PROFILE_VIEW',
    resource: 'CandidateProfile',
    resourceId: 'cand_101',
    timestamp: '2026-09-28 11:20 AM',
    ip: '192.168.1.88',
  }
];
