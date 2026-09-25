export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  companyBg: string;
  rating: number;
  reviewCount: number;
  location: string;
  locationType: 'On-site' | 'Hybrid' | 'Remote';
  experience: string;
  salaryMin: number;
  salaryMax: number;
  salaryDisplay: string;
  category: string;
  jobType: 'Full Time' | 'Part Time' | 'Contract' | 'Internship';
  tags: string[];
  skills: string[];
  postedTime: string;
  isUrgent?: boolean;
  isHot?: boolean;
  isFeatured?: boolean;
  applicantsCount: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  perks: string[];
  department: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviewCount: number;
  openings: number;
  industry: string;
  location: string;
  description: string;
  tags: string[];
  benefits: string[];
  accentColor: string;
  bgGradient: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  growth: string;
  popularRoles: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  hike: string;
  content: string;
  rating: number;
  verified: boolean;
}

export interface SalaryBand {
  role: string;
  category: string;
  min: number;
  median: number;
  max: number;
  currency: string;
  sampleCount: number;
  trend: string;
  topSkills: string[];
}

export interface FilterState {
  keyword: string;
  location: string;
  experience: string;
  category: string;
  jobType: string;
  locationType: string;
  minSalary: number;
  sortBy: 'relevance' | 'date' | 'salary-high' | 'popular';
}
