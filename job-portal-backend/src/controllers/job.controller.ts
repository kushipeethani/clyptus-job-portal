import { Request, Response } from 'express';
import { db } from '../store/database.mock';
import { Job, Application, Offer } from '../types/backend.types';

export const getJobs = (req: Request, res: Response) => {
  res.json({
    success: true,
    data: db.jobs,
    total: db.jobs.length
  });
};

export const createJob = (req: Request, res: Response) => {
  const { title, department, location, experience, salary, workMode, jobType, description, skills } = req.body;

  if (!title || !department) {
    return res.status(400).json({ success: false, message: 'Title and department are required.' });
  }

  const newJob: Job = {
    id: `job_${Date.now()}`,
    organizationId: 'org_abc_tech',
    recruiterId: 'rec_1',
    recruiterName: 'Elena Rostova',
    title,
    department,
    location: location || 'Remote',
    experience: experience || '1–3 Years',
    salary: salary || 'Disclosed on application',
    workMode: workMode || 'REMOTE',
    jobType: jobType || 'FULL_TIME',
    status: 'PUBLISHED',
    description: description || 'Job description',
    responsibilities: ['Build core product modules', 'Collaborate with team'],
    requirements: ['Relevant experience', 'Strong communication'],
    skills: skills && Array.isArray(skills) ? skills : ['JavaScript', 'TypeScript'],
    openings: 2,
    deadline: '2026-11-30',
    createdAt: new Date().toISOString().split('T')[0],
    applicationsCount: 0,
    shortlistedCount: 0
  };

  db.jobs.unshift(newJob);
  res.status(201).json({ success: true, message: 'Job created successfully.', data: newJob });
};

export const getApplications = (req: Request, res: Response) => {
  res.json({
    success: true,
    data: db.applications,
    total: db.applications.length
  });
};

export const updateApplicationStage = (req: Request, res: Response) => {
  const { id } = req.params;
  const { stage } = req.body;

  const app = db.applications.find(a => a.id === id);
  if (!app) {
    return res.status(404).json({ success: false, message: 'Application not found.' });
  }

  app.status = stage;
  res.json({ success: true, message: `Application stage updated to ${stage}.`, data: app });
};

export const getOffers = (req: Request, res: Response) => {
  res.json({
    success: true,
    data: db.offers,
    total: db.offers.length
  });
};

export const createOffer = (req: Request, res: Response) => {
  const { candidateName, candidateEmail, role, annualCTC, joiningDate } = req.body;

  const newOffer: Offer = {
    id: `off_${Date.now()}`,
    organizationId: 'org_abc_tech',
    jobId: 'job_201',
    jobTitle: role || 'Senior Software Engineer',
    candidateId: `cand_${Date.now()}`,
    candidateName: candidateName || 'Candidate',
    candidateEmail: candidateEmail || 'candidate@devmail.com',
    role: role || 'Senior Software Engineer',
    annualCTC: annualCTC || '₹10,00,000 INR',
    joiningDate: joiningDate || '2026-11-15',
    status: 'SENT',
    createdBy: 'Elena Rostova',
    createdAt: new Date().toISOString().split('T')[0]
  };

  db.offers.unshift(newOffer);
  res.status(201).json({ success: true, message: 'Offer letter created and sent.', data: newOffer });
};
