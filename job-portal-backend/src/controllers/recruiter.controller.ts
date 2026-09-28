import { Request, Response } from 'express';
import { db } from '../store/database.mock';
import { RecruiterUser } from '../types/backend.types';

export const getRecruiters = (req: Request, res: Response) => {
  res.json({
    success: true,
    data: db.recruiters.map(r => ({
      ...r,
      remainingBalance: r.allocatedCredits - r.totalCreditsUsed
    })),
    total: db.recruiters.length
  });
};

export const createRecruiter = (req: Request, res: Response) => {
  const { name, email, initialCredits } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Name and email are required fields.'
    });
  }

  const existing = db.recruiters.find(r => r.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(409).json({
      success: false,
      message: 'A recruiter account with this email already exists.'
    });
  }

  const creditsToAllocate = Number(initialCredits) || 100;

  if (db.creditAccount.balance < creditsToAllocate) {
    return res.status(400).json({
      success: false,
      message: `Insufficient Organization Pool balance (${db.creditAccount.balance} available) to allocate ${creditsToAllocate} credits.`
    });
  }

  const newRecruiter: RecruiterUser = {
    id: `rec_${Date.now()}`,
    organizationId: 'org_abc_tech',
    name,
    email,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4F46E5&color=fff`,
    status: 'ACTIVE',
    activeJobsCount: 0,
    profileViewsCount: 0,
    resumeDownloadsCount: 0,
    totalCreditsUsed: 0,
    allocatedCredits: creditsToAllocate,
    createdAt: new Date().toISOString().split('T')[0]
  };

  db.recruiters.push(newRecruiter);

  // Update credit account balance: Org available balance DECREASES
  db.creditAccount.totalAllocated += creditsToAllocate;
  db.creditAccount.balance -= creditsToAllocate;

  // Record audit transaction
  db.transactions.unshift({
    id: `tx_${Date.now()}`,
    organizationId: 'org_abc_tech',
    recruiterId: newRecruiter.id,
    recruiterName: newRecruiter.name,
    action: 'CREDIT_ALLOCATION',
    credits: creditsToAllocate,
    balanceBefore: db.creditAccount.balance + creditsToAllocate,
    balanceAfter: db.creditAccount.balance,
    referenceType: 'SYSTEM',
    timestamp: new Date().toISOString()
  });

  res.status(201).json({
    success: true,
    message: 'Recruiter account created successfully with allocated credits.',
    data: {
      ...newRecruiter,
      remainingBalance: newRecruiter.allocatedCredits - newRecruiter.totalCreditsUsed
    },
    generatedCredentials: {
      email: newRecruiter.email,
      temporaryPassword: `ClyptusRecruiter#${Math.floor(1000 + Math.random() * 9000)}`
    }
  });
};

export const updateRecruiterStatus = (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const recruiter = db.recruiters.find(r => r.id === id);
  if (!recruiter) {
    return res.status(404).json({ success: false, message: 'Recruiter not found.' });
  }

  if (status && ['ACTIVE', 'SUSPENDED'].includes(status)) {
    recruiter.status = status;
  }

  res.json({
    success: true,
    message: 'Recruiter status updated.',
    data: {
      ...recruiter,
      remainingBalance: recruiter.allocatedCredits - recruiter.totalCreditsUsed
    }
  });
};

export const deleteRecruiter = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = db.recruiters.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Recruiter not found.' });
  }

  const removed = db.recruiters.splice(index, 1)[0];
  res.json({ success: true, message: 'Recruiter account removed.', data: removed });
};
