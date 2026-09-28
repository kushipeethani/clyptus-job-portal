export type OrgRole = 'ORGANIZATION_SUPER_ADMIN' | 'ORGANIZATION_ADMIN' | 'RECRUITER';

export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'PENDING';

export interface AdminUser {
  id: string;
  organizationId: string;
  name: string;
  email: string;
  avatar: string;
  status: UserStatus;
  permissions: string[];
  createdAt: string;
}

export interface RecruiterUser {
  id: string;
  organizationId: string;
  name: string;
  email: string;
  avatar: string;
  status: UserStatus;
  activeJobsCount: number;
  profileViewsCount: number;
  resumeDownloadsCount: number;
  totalCreditsUsed: number;
  allocatedCredits: number;
  createdAt: string;
}

export interface OrganizationCreditAccount {
  organizationId: string;
  organizationName: string;
  balance: number;
  totalAllocated: number;
  totalConsumed: number;
}

export type CreditAction = 'CREDIT_ALLOCATION' | 'PROFILE_VIEW' | 'RESUME_DOWNLOAD' | 'AI_RESUME_MATCH' | 'TOP_UP';

export interface CreditTransaction {
  id: string;
  organizationId: string;
  recruiterId: string;
  recruiterName: string;
  action: CreditAction;
  credits: number;
  balanceBefore: number;
  balanceAfter: number;
  referenceType?: 'CANDIDATE' | 'RESUME' | 'SYSTEM';
  referenceId?: string;
  timestamp: string;
}

export interface Job {
  id: string;
  organizationId: string;
  recruiterId: string;
  recruiterName: string;
  title: string;
  department: string;
  location: string;
  experience: string;
  salary: string;
  workMode: 'REMOTE' | 'HYBRID' | 'ON_SITE';
  jobType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT';
  status: 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'PAUSED' | 'CLOSED';
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  openings: number;
  deadline: string;
  createdAt: string;
  applicationsCount: number;
  shortlistedCount: number;
}

export interface Application {
  id: string;
  organizationId: string;
  jobId: string;
  jobTitle: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  appliedDate: string;
  status: 'NEW' | 'SCREENING' | 'SHORTLISTED' | 'INTERVIEW' | 'OFFER' | 'HIRED' | 'REJECTED';
  matchScore: number;
  coverLetter?: string;
}

export interface Offer {
  id: string;
  organizationId: string;
  jobId: string;
  jobTitle: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  role: string;
  annualCTC: string;
  joiningDate: string;
  status: 'DRAFT' | 'PENDING_APPROVAL' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED' | 'WITHDRAWN';
  createdBy: string;
  createdAt: string;
}
