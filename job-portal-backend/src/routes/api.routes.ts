import { Router } from 'express';
import { 
  getAdmins, 
  createAdmin, 
  updateAdminPermissions, 
  deleteAdmin 
} from '../controllers/admin.controller';

import { 
  getRecruiters, 
  createRecruiter, 
  updateRecruiterStatus, 
  deleteRecruiter 
} from '../controllers/recruiter.controller';

import { 
  getCreditAccount, 
  getCreditTransactions, 
  allocateCreditsToUser, 
  consumeCredits 
} from '../controllers/credit.controller';

import { 
  getJobs, 
  createJob, 
  updateJob,
  getApplications, 
  updateApplicationStage, 
  getOffers, 
  createOffer 
} from '../controllers/job.controller';

const router = Router();

// Health Check
router.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    version: '1.0.0',
    service: 'Clyptus Multi-Tenant Job Portal API Backend',
    timestamp: new Date().toISOString()
  });
});

// Admin Management Routes (Add/Create Admins, List, Permissions)
router.get('/admins', getAdmins);
router.post('/admins', createAdmin);
router.patch('/admins/:id/permissions', updateAdminPermissions);
router.delete('/admins/:id', deleteAdmin);

// Recruiter Management Routes (Add/Create Recruiters with Credentials, List, Status)
router.get('/recruiters', getRecruiters);
router.post('/recruiters', createRecruiter);
router.patch('/recruiters/:id/status', updateRecruiterStatus);
router.delete('/recruiters/:id', deleteRecruiter);

// Credit Accounting & Quota Allocation Routes (Allocated Credits, Used Credits, Top-Ups)
router.get('/credits/account', getCreditAccount);
router.get('/credits/transactions', getCreditTransactions);
router.post('/credits/allocate', allocateCreditsToUser);
router.post('/credits/consume', consumeCredits);

// Jobs, Applications & ATS Pipeline Routes
router.get('/jobs', getJobs);
router.post('/jobs', createJob);
router.put('/jobs/:id', updateJob);
router.get('/applications', getApplications);
router.patch('/applications/:id/stage', updateApplicationStage);

// Offer Routes
router.get('/offers', getOffers);
router.post('/offers', createOffer);

export default router;
