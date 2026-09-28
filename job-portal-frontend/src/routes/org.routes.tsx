import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { OrgLayout } from '../layouts/organization/OrgLayout';
import { Dashboard } from '../pages/organization/Dashboard';
import { Jobs } from '../pages/organization/Jobs';
import { CandidateSearch } from '../pages/organization/CandidateSearch';
import { Members } from '../pages/organization/Members';
import { Billing } from '../pages/organization/Billing';
import { Settings } from '../pages/organization/Settings';
import { OrgRole } from '../types/organization.types';

export const OrgRoutes: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<OrgRole>('ORG_SUPER_ADMIN');

  return (
    <Routes>
      <Route element={<OrgLayout currentRole={currentRole} onRoleChange={setCurrentRole} />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="candidates" element={<CandidateSearch />} />
        <Route path="members" element={<Members />} />
        <Route path="billing" element={<Billing />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};
