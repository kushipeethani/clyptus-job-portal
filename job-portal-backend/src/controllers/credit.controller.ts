import { Request, Response } from 'express';
import { db } from '../store/database.mock';
import { CreditTransaction } from '../types/backend.types';

export const getCreditAccount = (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      account: db.creditAccount,
      recruiterBreakdown: db.recruiters.map(r => ({
        id: r.id,
        name: r.name,
        email: r.email,
        allocatedCredits: r.allocatedCredits,
        totalCreditsUsed: r.totalCreditsUsed,
        profileViewsCount: r.profileViewsCount,
        resumeDownloadsCount: r.resumeDownloadsCount,
        remainingBalance: r.allocatedCredits - r.totalCreditsUsed
      }))
    }
  });
};

export const getCreditTransactions = (req: Request, res: Response) => {
  res.json({
    success: true,
    data: db.transactions,
    total: db.transactions.length
  });
};

export const allocateCreditsToUser = (req: Request, res: Response) => {
  const { targetRecruiterId, credits } = req.body;

  if (!targetRecruiterId || !credits || isNaN(credits) || Number(credits) <= 0) {
    return res.status(400).json({
      success: false,
      message: 'targetRecruiterId and a positive credit amount are required.'
    });
  }

  const recruiter = db.recruiters.find(r => r.id === targetRecruiterId);
  if (!recruiter) {
    return res.status(404).json({
      success: false,
      message: 'Target Recruiter account not found.'
    });
  }

  const creditAmount = Number(credits);

  if (db.creditAccount.balance < creditAmount) {
    return res.status(400).json({
      success: false,
      message: `Insufficient Organization Pool balance (${db.creditAccount.balance} available). Top up organization pool balance first.`
    });
  }

  const balanceBefore = db.creditAccount.balance;

  // Correct accounting logic:
  // 1. Recruiter allocated credits INCREASE by creditAmount
  // 2. Organization pool available balance DECREASES by creditAmount
  // 3. Organization total allocated to recruiters INCREASES by creditAmount
  recruiter.allocatedCredits += creditAmount;
  db.creditAccount.totalAllocated += creditAmount;
  db.creditAccount.balance -= creditAmount;

  const newTx: CreditTransaction = {
    id: `tx_${Date.now()}`,
    organizationId: 'org_abc_tech',
    recruiterId: recruiter.id,
    recruiterName: recruiter.name,
    action: 'TOP_UP',
    credits: creditAmount,
    balanceBefore: balanceBefore,
    balanceAfter: db.creditAccount.balance,
    referenceType: 'SYSTEM',
    timestamp: new Date().toISOString()
  };

  db.transactions.unshift(newTx);

  res.json({
    success: true,
    message: `Successfully allocated ${creditAmount} candidate search credits to ${recruiter.name}.`,
    data: {
      recruiter: {
        id: recruiter.id,
        name: recruiter.name,
        allocatedCredits: recruiter.allocatedCredits,
        totalCreditsUsed: recruiter.totalCreditsUsed,
        remainingBalance: recruiter.allocatedCredits - recruiter.totalCreditsUsed
      },
      organizationAccount: db.creditAccount,
      transaction: newTx
    }
  });
};

export const consumeCredits = (req: Request, res: Response) => {
  const { recruiterId, actionType, referenceId } = req.body;

  const recruiter = db.recruiters.find(r => r.id === (recruiterId || 'rec_1'));
  if (!recruiter) {
    return res.status(404).json({ success: false, message: 'Recruiter not found.' });
  }

  const available = recruiter.allocatedCredits - recruiter.totalCreditsUsed;
  if (available < 1) {
    return res.status(402).json({
      success: false,
      message: 'Insufficient recruiter credit balance. Contact Organization Super Admin to top up credits.'
    });
  }

  const balanceBefore = db.creditAccount.balance;
  recruiter.totalCreditsUsed += 1;
  db.creditAccount.totalConsumed += 1;

  if (actionType === 'RESUME_DOWNLOAD') {
    recruiter.resumeDownloadsCount += 1;
  } else {
    recruiter.profileViewsCount += 1;
  }

  const newTx: CreditTransaction = {
    id: `tx_${Date.now()}`,
    organizationId: 'org_abc_tech',
    recruiterId: recruiter.id,
    recruiterName: recruiter.name,
    action: actionType === 'RESUME_DOWNLOAD' ? 'RESUME_DOWNLOAD' : 'PROFILE_VIEW',
    credits: -1,
    balanceBefore: balanceBefore,
    balanceAfter: db.creditAccount.balance,
    referenceType: actionType === 'RESUME_DOWNLOAD' ? 'RESUME' : 'CANDIDATE',
    referenceId: referenceId || 'cand_101',
    timestamp: new Date().toISOString()
  };

  db.transactions.unshift(newTx);

  res.json({
    success: true,
    message: `1 credit consumed for ${actionType}.`,
    data: {
      recruiterId: recruiter.id,
      recruiterName: recruiter.name,
      allocatedCredits: recruiter.allocatedCredits,
      totalCreditsUsed: recruiter.totalCreditsUsed,
      remainingBalance: recruiter.allocatedCredits - recruiter.totalCreditsUsed,
      transaction: newTx
    }
  });
};
