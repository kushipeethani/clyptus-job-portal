import { Request, Response } from 'express';
import { db } from '../store/database.mock';
import { AdminUser } from '../types/backend.types';

export const getAdmins = (req: Request, res: Response) => {
  res.json({
    success: true,
    data: db.admins,
    total: db.admins.length
  });
};

export const createAdmin = (req: Request, res: Response) => {
  const { name, email, permissions } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Name and email are required fields.'
    });
  }

  // Check if admin email already exists
  const existing = db.admins.find(a => a.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(409).json({
      success: false,
      message: 'An Organization Admin with this email already exists.'
    });
  }

  const newAdmin: AdminUser = {
    id: `adm_${Date.now()}`,
    organizationId: 'org_abc_tech',
    name,
    email,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`,
    status: 'ACTIVE',
    permissions: permissions && Array.isArray(permissions) ? permissions : ['RECRUITER_MANAGEMENT', 'REPORTS'],
    createdAt: new Date().toISOString().split('T')[0]
  };

  db.admins.push(newAdmin);

  res.status(201).json({
    success: true,
    message: 'New Organization Admin created successfully.',
    data: newAdmin,
    generatedCredentials: {
      email: newAdmin.email,
      temporaryPassword: `ClyptusAdmin#${Math.floor(1000 + Math.random() * 9000)}`
    }
  });
};

export const updateAdminPermissions = (req: Request, res: Response) => {
  const { id } = req.params;
  const { permissions } = req.body;

  const admin = db.admins.find(a => a.id === id);
  if (!admin) {
    return res.status(404).json({ success: false, message: 'Admin not found.' });
  }

  admin.permissions = permissions || admin.permissions;
  res.json({ success: true, message: 'Admin permissions updated.', data: admin });
};

export const deleteAdmin = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = db.admins.findIndex(a => a.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Admin not found.' });
  }

  const removed = db.admins.splice(index, 1)[0];
  res.json({ success: true, message: 'Admin account removed.', data: removed });
};
