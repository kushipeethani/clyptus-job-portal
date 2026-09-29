import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { OrgAdminLayout } from '../layouts/org-admin/OrgAdminLayout';
import { OrgAdminLogin } from '../pages/admin/Login';
import { OrgAdminDashboard } from '../pages/admin/Dashboard';
import { AdminRecruiterManagement } from '../pages/admin/RecruiterManagement';
import { Jobs } from '../pages/organization/Jobs';
import { CandidateSearch } from '../pages/organization/CandidateSearch';
import { CreditReports } from '../pages/organization-super-admin/CreditReports';
import { OrgAdminOffers } from '../pages/admin/Offers';
import { OrgAdminAuditLogs } from '../pages/admin/AuditLogs';
import { OrgSuperAdminInterviews } from '../pages/organization-super-admin/Interviews';
import { RecruiterApplications } from '../pages/recruiter/Applications';
import { Settings } from '../pages/organization/Settings';

export const OrgAdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="login" element={<OrgAdminLogin />} />
      <Route element={<OrgAdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<OrgAdminDashboard />} />
        <Route path="recruiters" element={<AdminRecruiterManagement />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="candidates" element={<CandidateSearch />} />
        <Route path="applications" element={<RecruiterApplications />} />
        <Route path="interviews" element={<OrgSuperAdminInterviews />} />
        <Route path="offers" element={<OrgAdminOffers />} />
        <Route path="tokens" element={<CreditReports />} />
        <Route path="audit" element={<OrgAdminAuditLogs />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
};
