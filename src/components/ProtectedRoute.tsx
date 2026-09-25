import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Frontend only: bypass auth checks and render the dashboard layout directly
  return <>{children}</>;
}
