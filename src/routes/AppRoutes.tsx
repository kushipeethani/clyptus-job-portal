import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/Home/HomePage';
import { CandidateLogin } from '../pages/candidate/CandidateLogin';
import { CandidateRegister } from '../pages/candidate/CandidateRegister';
import { CandidateDashboard } from '../pages/candidate/CandidateDashboard';
import { RecruiterLogin } from '../pages/recruiter/RecruiterLogin';
import { RecruiterDashboard } from '../pages/recruiter/RecruiterDashboard';
import { ProtectedRoute } from '../components/ProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/candidate/login" element={<CandidateLogin />} />
      <Route path="/candidate/register" element={<CandidateRegister />} />
      <Route path="/recruiter/login" element={<RecruiterLogin />} />

      {/* Protected Candidate Routes */}
      <Route
        path="/candidate/dashboard"
        element={
          <ProtectedRoute requiredRole="candidate">
            <CandidateDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Recruiter Routes */}
      <Route
        path="/recruiter/dashboard"
        element={
          <ProtectedRoute requiredRole="recruiter">
            <RecruiterDashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch-all: redirect to home */}
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

