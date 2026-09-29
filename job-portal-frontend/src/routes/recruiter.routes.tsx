import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RecruiterLayout } from '../layouts/recruiter/RecruiterLayout';
import { RecruiterLogin } from '../pages/recruiter/Login';
import { RecruiterDashboard } from '../pages/recruiter/Dashboard';
import { RecruiterCandidateSearch } from '../pages/recruiter/CandidateSearch';
import { RecruiterSavedCandidates } from '../pages/recruiter/SavedCandidates';
import { RecruiterApplications } from '../pages/recruiter/Applications';
import { RecruiterInterviews } from '../pages/recruiter/Interviews';
import { RecruiterMessages } from '../pages/recruiter/Messages';
import { RecruiterTasks } from '../pages/recruiter/Tasks';
import { RecruiterAITools } from '../pages/recruiter/AITools';
import { RecruiterAnalytics } from '../pages/recruiter/Analytics';
import { RecruiterNotifications } from '../pages/recruiter/Notifications';
import { RecruiterOffers } from '../pages/recruiter/Offers';
import { RecruiterAuditLogs } from '../pages/recruiter/AuditLogs';
import { CreditReports } from '../pages/organization-super-admin/CreditReports';
import { Settings } from '../pages/organization/Settings';
import { Jobs } from '../pages/organization/Jobs';

export const RecruiterRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="login" element={<RecruiterLogin />} />
      <Route element={<RecruiterLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<RecruiterDashboard />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="candidates" element={<RecruiterCandidateSearch />} />
        <Route path="saved-candidates" element={<RecruiterSavedCandidates />} />
        <Route path="applications" element={<RecruiterApplications />} />
        <Route path="ats" element={<RecruiterApplications />} />
        <Route path="interviews" element={<RecruiterInterviews />} />
        <Route path="offers" element={<RecruiterOffers />} />
        <Route path="messages" element={<RecruiterMessages />} />
        <Route path="tasks" element={<RecruiterTasks />} />
        <Route path="ai-tools" element={<RecruiterAITools />} />
        <Route path="tokens" element={<CreditReports />} />
        <Route path="analytics" element={<RecruiterAnalytics />} />
        <Route path="audit" element={<RecruiterAuditLogs />} />
        <Route path="notifications" element={<RecruiterNotifications />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
};
