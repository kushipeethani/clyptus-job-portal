import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PortalSelectLanding } from '../pages/PortalSelectLanding';
import { UnifiedLogin } from '../pages/auth/UnifiedLogin';
import { OrgSuperAdminRoutes } from './org-super-admin.routes';
import { OrgAdminRoutes } from './org-admin.routes';
import { RecruiterRoutes } from './recruiter.routes';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PortalSelectLanding />} />
      <Route path="/login" element={<UnifiedLogin />} />
      <Route path="/organization-super-admin/*" element={<OrgSuperAdminRoutes />} />
      <Route path="/admin/*" element={<OrgAdminRoutes />} />
      <Route path="/recruiter/*" element={<RecruiterRoutes />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
