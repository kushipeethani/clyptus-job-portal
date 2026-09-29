import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { OrgSuperAdminLayout } from '../layouts/org-super-admin/OrgSuperAdminLayout';
import { OrgSuperAdminLogin } from '../pages/organization-super-admin/Login';
import { OrgSuperAdminDashboard } from '../pages/organization-super-admin/Dashboard';
import { AdminManagement } from '../pages/organization-super-admin/AdminManagement';
import { RecruiterManagement } from '../pages/organization-super-admin/RecruiterManagement';
import { RolesPermissions } from '../pages/organization-super-admin/RolesPermissions';
import { CreditReports } from '../pages/organization-super-admin/CreditReports';
import { OrgSuperAdminOffers } from '../pages/organization-super-admin/Offers';
import { OrgSuperAdminAuditLogs } from '../pages/organization-super-admin/AuditLogs';
import { OrgSuperAdminInterviews } from '../pages/organization-super-admin/Interviews';
import { Settings } from '../pages/organization/Settings';
import { Jobs } from '../pages/organization/Jobs';
import { CandidateSearch } from '../pages/organization/CandidateSearch';
import { RecruiterApplications } from '../pages/recruiter/Applications';

export const OrgSuperAdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="login" element={<OrgSuperAdminLogin />} />
      <Route element={<OrgSuperAdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<OrgSuperAdminDashboard />} />
        <Route path="admins" element={<AdminManagement />} />
        <Route path="recruiters" element={<RecruiterManagement />} />
        <Route path="roles" element={<RolesPermissions />} />
        <Route path="tokens" element={<CreditReports />} />
        <Route path="billing" element={<CreditReports />} />
        <Route path="offers" element={<OrgSuperAdminOffers />} />
        <Route path="audit" element={<OrgSuperAdminAuditLogs />} />
        <Route path="settings" element={<Settings />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="candidates" element={<CandidateSearch />} />
        <Route path="applications" element={<RecruiterApplications />} />
        <Route path="interviews" element={<OrgSuperAdminInterviews />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
};
