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
  AuditLog,
  ShortlistedCandidate,
  UserStatus
} from '../types/clyptus.types';

// Clear legacy dummy data from localStorage once on load
if (typeof window !== 'undefined') {
  try {
    const currentVer = localStorage.getItem('clyptus_clean_v5');
    if (!currentVer) {
      localStorage.removeItem('clyptus_recruiters');
      localStorage.removeItem('clyptus_jobs');
      localStorage.removeItem('clyptus_interviews');
      localStorage.removeItem('clyptus_applications');
      localStorage.removeItem('clyptus_shortlisted_candidates');
      localStorage.removeItem('clyptus_offers');
      localStorage.removeItem('clyptus_audit_logs');
      localStorage.removeItem('clyptus_credit_transactions');
      localStorage.setItem('clyptus_clean_v5', 'true');
    }
  } catch (e) {}
}

export const INITIAL_CREDIT_ACCOUNT: OrganizationCreditAccount = {
  organizationId: 'org_abc_tech',
  organizationName: 'ABC Recruitment Pvt Ltd',
  balance: 1000,
  totalAllocated: 0,
  totalConsumed: 0,
};

export const INITIAL_ADMINS: AdminUser[] = [];

export const INITIAL_RECRUITERS: RecruiterUser[] = [
  {
    id: 'rec_kushi',
    organizationId: 'org_abc_tech',
    name: 'Kushi',
    email: 'kushi.peethani222@gmail.com',
    password: 'Clyptus@2026',
    phone: '+91 98765 43210',
    recruiterRole: 'Tech Recruiter',
    avatar: 'https://ui-avatars.com/api/?name=Kushi&background=F97316&color=fff',
    status: 'ACTIVE',
    activeJobsCount: 0,
    profileViewsCount: 0,
    resumeDownloadsCount: 0,
    totalCreditsUsed: 0,
    allocatedCredits: 50,
    remainingBalance: 50,
    createdAt: '2026-09-29',
  }
];

export const updateRecruiterDetails = (
  recruiterId: string,
  updates: { name?: string; email?: string; phone?: string; recruiterRole?: string; status?: UserStatus },
  actorName: string = 'Admin'
): RecruiterUser[] => {
  const recruiters = getStoreRecruiters();
  const updated = recruiters.map((rec) => {
    if (rec.id === recruiterId) {
      const newRec = { ...rec, ...updates };
      logAction(
        actorName,
        'ORGANIZATION_ADMIN',
        updates.status && updates.status !== rec.status ? `RECRUITER_STATUS_${updates.status}` : 'RECRUITER_UPDATED',
        'RecruiterUser',
        rec.id,
        'USER',
        `Updated recruiter ${rec.name} (${rec.id}). Status: ${newRec.status}, Role: ${newRec.recruiterRole || 'Tech Recruiter'}, Phone: ${newRec.phone || 'N/A'}.`
      );
      return newRec;
    }
    return rec;
  });

  saveStoreRecruiters(updated);
  return updated;
};

export const INITIAL_TRANSACTIONS: CreditTransaction[] = [];

export const INITIAL_JOBS: Job[] = [];

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'cand_101',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    location: 'Hyderabad',
    title: 'Senior Python & FastAPI Engineer',
    experienceYears: 4,
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Redis'],
    education: 'B.Tech in Computer Science, NIT Warangal',
    expectedSalary: '₹12 LPA',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80',
    resumeUrl: 'https://clyptus-resumes-s3.bucket/aarav_sharma_resume.pdf',
    profileUnlockedByRecruiters: [],
    resumeDownloadedByRecruiters: [],
  },
  {
    id: 'cand_102',
    name: 'Ananya Patel',
    email: 'ananya.patel@example.com',
    phone: '+91 98123 55441',
    location: 'Bengaluru',
    title: 'Full Stack React & Node.js Specialist',
    experienceYears: 3,
    skills: ['React', 'TypeScript', 'Vite', 'Node.js', 'Tailwind CSS'],
    education: 'B.E. Computer Science, RVCE Bengaluru',
    expectedSalary: '₹10 LPA',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
    resumeUrl: 'https://clyptus-resumes-s3.bucket/ananya_patel_resume.pdf',
    profileUnlockedByRecruiters: [],
    resumeDownloadedByRecruiters: [],
  },
  {
    id: 'cand_103',
    name: 'Vikramaditya Rao',
    email: 'vikram.rao@example.com',
    phone: '+91 97788 66554',
    location: 'Mumbai',
    title: 'Backend Python & Cloud Engineer',
    experienceYears: 5,
    skills: ['Python', 'Django', 'FastAPI', 'AWS', 'PostgreSQL', 'Redis'],
    education: 'M.Tech Software Engineering, IIT Bombay',
    expectedSalary: '₹18 LPA',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    resumeUrl: 'https://clyptus-resumes-s3.bucket/vikram_rao_resume.pdf',
    profileUnlockedByRecruiters: [],
    resumeDownloadedByRecruiters: [],
  }
];

export const INITIAL_APPLICATIONS: Application[] = [];

export const INITIAL_INTERVIEWS: Interview[] = [];

export const INITIAL_OFFERS: Offer[] = [];

export const INITIAL_INVITATIONS: Invitation[] = [];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [];

// Helper functions for Reactive Store Sync across Portals

export const getStoreRecruiters = (): RecruiterUser[] => {
  try {
    const data = localStorage.getItem('clyptus_recruiters');
    if (data) return JSON.parse(data);
  } catch (err) {}
  return INITIAL_RECRUITERS;
};

export const saveStoreRecruiters = (recruiters: RecruiterUser[]): void => {
  try {
    localStorage.setItem('clyptus_recruiters', JSON.stringify(recruiters));
    window.dispatchEvent(new CustomEvent('clyptus_store_updated', { detail: { type: 'RECRUITERS' } }));
  } catch (err) {}
};

export const getStoreAuditLogs = (): AuditLog[] => {
  try {
    const data = localStorage.getItem('clyptus_audit_logs');
    if (data) return JSON.parse(data);
  } catch (err) {}
  return INITIAL_AUDIT_LOGS;
};

export const getStoreCreditTransactions = (): CreditTransaction[] => {
  try {
    const data = localStorage.getItem('clyptus_credit_transactions');
    if (data) return JSON.parse(data);
  } catch (err) {}
  return INITIAL_TRANSACTIONS;
};

export const saveStoreCreditTransactions = (transactions: CreditTransaction[]): void => {
  try {
    localStorage.setItem('clyptus_credit_transactions', JSON.stringify(transactions));
    window.dispatchEvent(new CustomEvent('clyptus_store_updated', { detail: { type: 'CREDIT_TRANSACTIONS' } }));
  } catch (err) {}
};

export const getStoreApplications = (): Application[] => {
  try {
    const data = localStorage.getItem('clyptus_applications');
    if (data) return JSON.parse(data);
  } catch (err) {}
  return INITIAL_APPLICATIONS;
};

export const getStoreInterviews = (): Interview[] => {
  try {
    const data = localStorage.getItem('clyptus_interviews');
    if (data) return JSON.parse(data);
  } catch (err) {}
  return INITIAL_INTERVIEWS;
};

export const getStoreOffers = (): Offer[] => {
  try {
    const data = localStorage.getItem('clyptus_offers');
    if (data) return JSON.parse(data);
  } catch (err) {}
  return INITIAL_OFFERS;
};

export const getStoreJobs = (): Job[] => {
  try {
    const data = localStorage.getItem('clyptus_jobs');
    if (data) return JSON.parse(data);
  } catch (err) {}
  return INITIAL_JOBS;
};

export const INITIAL_SHORTLISTED_CANDIDATES: ShortlistedCandidate[] = [];

export const getStoreShortlistedCandidates = (): ShortlistedCandidate[] => {
  try {
    const data = localStorage.getItem('clyptus_shortlisted_candidates');
    if (data) return JSON.parse(data);
  } catch (err) {}
  return INITIAL_SHORTLISTED_CANDIDATES;
};

export const toggleShortlistCandidate = (
  recruiterId: string,
  recruiterName: string,
  candidate: { id: string; name: string; email: string; title: string; location?: string; experience?: string; skills?: string[] }
): { isShortlisted: boolean; updated: ShortlistedCandidate[] } => {
  const current = getStoreShortlistedCandidates();
  const existingIndex = current.findIndex(
    (item) => item.candidateId === candidate.id && (item.recruiterId === recruiterId || item.recruiterId === 'rec_1')
  );

  let updated: ShortlistedCandidate[];
  let isShortlisted = false;

  if (existingIndex > -1) {
    updated = current.filter((_, idx) => idx !== existingIndex);
    isShortlisted = false;
  } else {
    const newItem: ShortlistedCandidate = {
      id: `short_${Date.now()}`,
      candidateId: candidate.id,
      candidateName: candidate.name,
      candidateEmail: candidate.email,
      title: candidate.title,
      recruiterId: recruiterId,
      recruiterName: recruiterName,
      shortlistedAt: new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }),
      location: candidate.location || 'Remote',
      experience: candidate.experience || '3+ Years',
      skills: candidate.skills || []
    };
    updated = [newItem, ...current];
    isShortlisted = true;
  }

  try {
    localStorage.setItem('clyptus_shortlisted_candidates', JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('clyptus_store_updated', { detail: { type: 'SHORTLISTED' } }));
  } catch (err) {}

  return { isShortlisted, updated };
};

export const addAuditLog = (log: Omit<AuditLog, 'id' | 'organizationId' | 'timestamp' | 'ip' | 'userId'> & { id?: string; userId?: string; timestamp?: string; ip?: string }): AuditLog => {
  const currentLogs = getStoreAuditLogs();
  const newLog: AuditLog = {
    id: log.id || `audit_${Date.now()}`,
    organizationId: 'org_abc_tech',
    userId: log.userId || 'usr_sys',
    userName: log.userName,
    role: log.role,
    action: log.action,
    resource: log.resource,
    resourceId: log.resourceId,
    dimension: log.dimension || 'ACTION',
    details: log.details || '',
    timestamp: log.timestamp || new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }),
    ip: log.ip || '192.168.1.100',
  };

  const updatedLogs = [newLog, ...currentLogs];
  try {
    localStorage.setItem('clyptus_audit_logs', JSON.stringify(updatedLogs));
    window.dispatchEvent(new CustomEvent('clyptus_store_updated', { detail: { type: 'AUDIT_LOGS' } }));
  } catch (err) {}

  return newLog;
};

export const logAction = (
  userName: string,
  role: 'SUPER_ADMIN' | 'ORGANIZATION_ADMIN' | 'RECRUITER' | string,
  action: string,
  resource: string,
  resourceId: string,
  dimension: AuditLog['dimension'],
  details: string
): AuditLog => {
  return addAuditLog({
    userName,
    role,
    action,
    resource,
    resourceId,
    dimension,
    details,
  });
};

export const getStoreCreditAccount = (): OrganizationCreditAccount => {
  try {
    const data = localStorage.getItem('clyptus_credit_account');
    if (data) return JSON.parse(data);
  } catch (err) {}
  return INITIAL_CREDIT_ACCOUNT;
};

export const saveStoreCreditAccount = (account: OrganizationCreditAccount): void => {
  try {
    localStorage.setItem('clyptus_credit_account', JSON.stringify(account));
    window.dispatchEvent(new CustomEvent('clyptus_store_updated', { detail: { type: 'CREDIT_ACCOUNT' } }));
  } catch (err) {}
};

export const allocateCreditsToRecruiter = (recruiterId: string, additionalCredits: number, allocatorName: string = 'Super Admin'): RecruiterUser[] => {
  const recruiters = getStoreRecruiters();
  const updated = recruiters.map((rec) => {
    if (rec.id === recruiterId || rec.email === recruiterId) {
      const currentAllocated = rec.allocatedCredits || 50;
      const currentBalance = rec.remainingBalance !== undefined ? rec.remainingBalance : (currentAllocated - (rec.totalCreditsUsed || 0));
      const newAllocated = currentAllocated + additionalCredits;
      const newBalance = currentBalance + additionalCredits;
      
      logAction(
        allocatorName,
        'SUPER_ADMIN',
        'TOKEN_ALLOCATION',
        'CreditWallet',
        rec.id,
        'TOKEN',
        `Allocated +${additionalCredits} credits to recruiter ${rec.name} (${rec.email}). New balance: ${newBalance} credits.`
      );

      return {
        ...rec,
        allocatedCredits: newAllocated,
        remainingBalance: newBalance,
      };
    }
    return rec;
  });

  saveStoreRecruiters(updated);

  const currentAcc = getStoreCreditAccount();
  const updatedAcc: OrganizationCreditAccount = {
    ...currentAcc,
    balance: currentAcc.balance - additionalCredits,
    totalAllocated: currentAcc.totalAllocated + additionalCredits,
  };
  saveStoreCreditAccount(updatedAcc);

  // Add transaction record
  const currentTransactions = getStoreCreditTransactions();
  const txId = `tx_${Date.now()}`;
  const newTx: CreditTransaction = {
    id: txId,
    organizationId: 'org_abc_tech',
    recruiterId: recruiterId,
    recruiterName: updated.find(r => r.id === recruiterId)?.name || recruiterId,
    action: 'CREDIT_ALLOCATION',
    credits: additionalCredits,
    balanceBefore: currentAcc.balance,
    balanceAfter: currentAcc.balance - additionalCredits,
    timestamp: new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }),
  };
  saveStoreCreditTransactions([newTx, ...currentTransactions]);

  return updated;
};

export const consumeCreditsFromRecruiter = (
  recruiterId: string, 
  actionType: 'PROFILE_VIEW' | 'RESUME_DOWNLOAD', 
  referenceId: string
): { success: boolean; message?: string; recruiter?: RecruiterUser } => {
  const recruiters = getStoreRecruiters();
  let recIndex = recruiters.findIndex(r => r.id === recruiterId || r.email.toLowerCase() === recruiterId.toLowerCase());
  
  if (recIndex === -1 && recruiters.length > 0) {
    recIndex = 0;
  }

  if (recIndex === -1) {
    return { success: false, message: 'No active recruiter account found.' };
  }

  const rec = recruiters[recIndex];
  const currentAllocated = rec.allocatedCredits || 50;
  const currentUsed = rec.totalCreditsUsed || 0;
  const currentBalance = rec.remainingBalance !== undefined ? rec.remainingBalance : (currentAllocated - currentUsed);

  if (currentBalance < 1) {
    return { 
      success: false, 
      message: 'Insufficient recruiter credits! Contact Organization Super Admin or Admin to top up credits.' 
    };
  }

  const newBalance = currentBalance - 1;
  const newTotalUsed = currentUsed + 1;
  const newProfileViews = actionType === 'PROFILE_VIEW' ? (rec.profileViewsCount || 0) + 1 : (rec.profileViewsCount || 0);
  const newResumeDownloads = actionType === 'RESUME_DOWNLOAD' ? (rec.resumeDownloadsCount || 0) + 1 : (rec.resumeDownloadsCount || 0);

  const updatedRecruiter: RecruiterUser = {
    ...rec,
    remainingBalance: newBalance,
    totalCreditsUsed: newTotalUsed,
    profileViewsCount: newProfileViews,
    resumeDownloadsCount: newResumeDownloads,
  };

  recruiters[recIndex] = updatedRecruiter;
  saveStoreRecruiters(recruiters);

  // Update Org Credit Account consumed stats
  const orgAccount = getStoreCreditAccount();
  const updatedOrgAccount: OrganizationCreditAccount = {
    ...orgAccount,
    totalConsumed: (orgAccount.totalConsumed || 0) + 1,
  };
  saveStoreCreditAccount(updatedOrgAccount);

  // Log transaction
  const transactions = getStoreCreditTransactions();
  const newTx: CreditTransaction = {
    id: `tx_${Date.now()}`,
    organizationId: 'org_abc_tech',
    recruiterId: rec.id,
    recruiterName: rec.name,
    action: actionType,
    credits: -1,
    balanceBefore: currentBalance,
    balanceAfter: newBalance,
    referenceType: actionType === 'RESUME_DOWNLOAD' ? 'RESUME' : 'CANDIDATE',
    referenceId: referenceId,
    timestamp: new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }),
  };
  saveStoreCreditTransactions([newTx, ...transactions]);

  // Log Audit Event
  logAction(
    rec.name,
    'RECRUITER',
    actionType,
    actionType === 'RESUME_DOWNLOAD' ? 'ResumeFile' : 'CandidateProfile',
    referenceId,
    'TOKEN',
    `${actionType === 'RESUME_DOWNLOAD' ? 'Downloaded candidate resume' : 'Viewed candidate profile'} (${referenceId}). Consumed 1 credit. Remaining quota: ${newBalance} credits.`
  );

  return { success: true, recruiter: updatedRecruiter };
};

export const saveStoreJobs = (jobs: Job[]) => {
  localStorage.setItem('clyptus_jobs', JSON.stringify(jobs));
  window.dispatchEvent(new CustomEvent('clyptus_store_updated'));
};

export const createJobInStore = (
  jobData: Omit<Job, 'id' | 'createdAt' | 'applicationsCount' | 'shortlistedCount'>,
  actorName: string = 'Recruiter'
): Job[] => {
  const jobs = getStoreJobs();
  const newJob: Job = {
    ...jobData,
    id: `job_${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0],
    applicationsCount: 0,
    shortlistedCount: 0,
  };

  const updated = [newJob, ...jobs];
  saveStoreJobs(updated);

  logAction(
    actorName,
    'USER',
    'JOB_CREATED',
    'JobPosting',
    newJob.id,
    'JOB',
    `Created new job posting "${newJob.title}" assigned to recruiter ${newJob.recruiterName} (${newJob.recruiterId}).`
  );

  return updated;
};

export const updateJobInStore = (
  jobId: string,
  updates: Partial<Job>,
  actorName: string = 'User'
): Job[] => {
  const jobs = getStoreJobs();
  const updated = jobs.map((j) => {
    if (j.id === jobId) {
      const updatedJob = { ...j, ...updates };
      
      let actionType = 'JOB_UPDATED';
      if (updates.status && updates.status !== j.status) {
        actionType = `JOB_STATUS_${updates.status}`;
      } else if (updates.recruiterId && updates.recruiterId !== j.recruiterId) {
        actionType = 'JOB_REASSIGNED';
      }

      logAction(
        actorName,
        'USER',
        actionType,
        'JobPosting',
        jobId,
        'JOB',
        `Updated job "${updatedJob.title}" (${jobId}). Status: ${updatedJob.status}, Assigned Recruiter: ${updatedJob.recruiterName}.`
      );

      return updatedJob;
    }
    return j;
  });

  saveStoreJobs(updated);
  return updated;
};
