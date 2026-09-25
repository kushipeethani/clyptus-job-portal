// authService.ts - Simulated auth service for Clyptus Job Portal
import type { AuthUser, LoginCredentials, CandidateRegisterData } from '../types/auth';

const STORAGE_KEY = 'clyptus_auth_user';

function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export const authService = {
  // Candidate login (mock)
  loginCandidate: async (creds: LoginCredentials): Promise<AuthUser> => {
    await new Promise(r => setTimeout(r, 800));
    if (!creds.email || !creds.password) throw new Error('Email and password are required.');
    const user: AuthUser = {
      id: 'cand-' + Date.now(),
      email: creds.email,
      name: creds.email.split('@')[0],
      role: 'candidate',
      token: generateToken(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  // Recruiter login (mock)
  loginRecruiter: async (creds: LoginCredentials): Promise<AuthUser> => {
    await new Promise(r => setTimeout(r, 800));
    if (!creds.email || !creds.password) throw new Error('Email and password are required.');
    const user: AuthUser = {
      id: 'rec-' + Date.now(),
      email: creds.email,
      name: creds.email.split('@')[0],
      role: 'recruiter',
      token: generateToken(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  // Candidate register (mock)
  registerCandidate: async (data: CandidateRegisterData): Promise<AuthUser> => {
    await new Promise(r => setTimeout(r, 1000));
    if (data.password !== data.confirmPassword) throw new Error('Passwords do not match.');
    const user: AuthUser = {
      id: 'cand-' + Date.now(),
      email: data.email,
      name: data.name,
      role: 'candidate',
      token: generateToken(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  // Logout
  logout: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  },

  // Get current user from storage
  getCurrentUser: (): AuthUser | null => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  },
};

