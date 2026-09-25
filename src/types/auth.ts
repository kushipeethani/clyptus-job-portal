// Auth Types for Clyptus Job Portal

export type UserRole = 'candidate' | 'recruiter';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface CandidateRegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}

export interface RecruiterRegisterData {
  name: string;
  email: string;
  password: string;
  companyName: string;
  designation?: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
