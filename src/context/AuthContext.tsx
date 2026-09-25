import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { AuthUser, LoginCredentials, CandidateRegisterData } from '../types/auth';
import { authService } from '../services/authService';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  loginCandidate: (creds: LoginCredentials) => Promise<void>;
  loginRecruiter: (creds: LoginCredentials) => Promise<void>;
  registerCandidate: (data: CandidateRegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = authService.getCurrentUser();
    if (stored) setUser(stored);
  }, []);

  const loginCandidate = async (creds: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const u = await authService.loginCandidate(creds);
      setUser(u);
    } catch (e: any) {
      setError(e.message || 'Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const loginRecruiter = async (creds: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const u = await authService.loginRecruiter(creds);
      setUser(u);
    } catch (e: any) {
      setError(e.message || 'Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const registerCandidate = async (data: CandidateRegisterData) => {
    setIsLoading(true);
    setError(null);
    try {
      const u = await authService.registerCandidate(data);
      setUser(u);
    } catch (e: any) {
      setError(e.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      error,
      loginCandidate,
      loginRecruiter,
      registerCandidate,
      logout,
      clearError,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

