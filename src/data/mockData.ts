import type { Job, Company, Category, Testimonial, SalaryBand } from '../types/job';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'tech',
    name: 'Technology & Software',
    icon: 'Code2',
    count: 14280,
    growth: '+38% hiring',
    popularRoles: ['Frontend Engineer', 'Backend Dev', 'Fullstack TS', 'DevOps']
  },
  {
    id: 'ai-data',
    name: 'AI & Data Science',
    icon: 'Sparkles',
    count: 8940,
    growth: '+72% hiring',
    popularRoles: ['ML Engineer', 'LLM Architect', 'Data Scientist', 'AI Researcher']
  },
  {
    id: 'product',
    name: 'Product & Design',
    icon: 'Layout',
    count: 6520,
    growth: '+24% hiring',
    popularRoles: ['Product Manager', 'UI/UX Designer', 'Growth PM', 'Design System Lead']
  },
  {
    id: 'cloud-devops',
    name: 'Cloud & Infrastructure',
    icon: 'Cloud',
    count: 5310,
    growth: '+45% hiring',
    popularRoles: ['Cloud Architect', 'Kubernetes SRE', 'AWS Specialist', 'Security Eng']
  },
  {
    id: 'marketing',
    name: 'Marketing & Growth',
    icon: 'TrendingUp',
    count: 4890,
    growth: '+19% hiring',
    popularRoles: ['Growth Marketer', 'SEO Strategist', 'Content Lead', 'Performance Ads']
  },
  {
    id: 'sales-biz',
    name: 'Sales & Business Dev',
    icon: 'Briefcase',
    count: 7640,
    growth: '+31% hiring',
    popularRoles: ['Enterprise AE', 'SDR Team Lead', 'Key Account Mgr', 'Partnerships']
  },
  {
    id: 'finance-hr',
    name: 'Finance & HR Tech',
    icon: 'ShieldCheck',
    count: 3820,
    growth: '+15% hiring',
    popularRoles: ['Financial Analyst', 'People Partner', 'Talent Acquisition', 'Controller']
  },
  {
    id: 'remote-global',
    name: '100% Remote Global',
    icon: 'Globe',
    count: 9800,
    growth: '+58% hiring',
    popularRoles: ['Remote React Dev', 'Async Tech Writer', 'Global Recruiter', 'Support Lead']
  }
];

export const INITIAL_COMPANIES: Company[] = [
  {
    id: 'clyptus-technologies',
    name: 'Clyptus Technologies',
    logo: '⚡',
    rating: 4.8,
    reviewCount: 342,
    openings: 28,
    industry: 'Enterprise Software & Cloud AI',
    location: 'Bengaluru / San Francisco / Remote',
    description: 'Clyptus powers next-generation digital engineering, enterprise cloud transformations, and AI-driven automation systems globally.',
    tags: ['Unicorn Backed', 'Fast Growing', 'Great Work-Life Balance', 'Tech Pioneer'],
    benefits: ['Stock Options (ESOPs)', 'Annual Learning Allowance', 'Comprehensive Health Cover', 'Flexible Hybrid/Remote'],
    accentColor: '#FF6600',
    bgGradient: 'linear-gradient(135deg, #FFF5EB 0%, #FFE6CC 100%)'
  },
  {
    id: 'nexa-cloud',
    name: 'NexaCloud Systems',
    logo: '☁️',
    rating: 4.6,
    reviewCount: 512,
    openings: 34,
    industry: 'Cloud Infrastructure & SRE',
    location: 'Hyderabad, India',
    description: 'High-scale multi-cloud orchestration and developer tooling for global tech organizations.',
    tags: ['MNC', 'Top Workplace 2025', 'Generous Perks'],
    benefits: ['Wellness Stipend', '401k / PF Match', 'Parental Leave', 'Home Office Budget'],
    accentColor: '#0284C7',
    bgGradient: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)'
  },
  {
    id: 'quantum-ai-labs',
    name: 'QuantumAI Labs',
    logo: '🧠',
    rating: 4.9,
    reviewCount: 189,
    openings: 19,
    industry: 'Generative AI & LLM Systems',
    location: 'Bengaluru / Remote',
    description: 'Building fine-tuned vertical frontier AI models and agentic workflows for global enterprises.',
    tags: ['AI Deeptech', 'High Salary', 'Cutting Edge R&D'],
    benefits: ['AI Compute Budget', 'Top Tier Compensation', 'Zero Bureaucracy', 'Bi-annual Offsites'],
    accentColor: '#7C3AED',
    bgGradient: 'linear-gradient(135deg, #FAF5FF 0%, #EDE9FE 100%)'
  },
  {
    id: 'finscale-pay',
    name: 'FinScale Global',
    logo: '💳',
    rating: 4.5,
    reviewCount: 890,
    openings: 42,
    industry: 'Fintech & Banking APIs',
    location: 'Mumbai & Gurgaon',
    description: 'Processing over $30B annually with resilient low-latency transaction switching engines.',
    tags: ['Fintech Leader', 'Series D', 'Rapid Career Growth'],
    benefits: ['Performance Bonus', 'Medical Insurance + Parents', 'Relocation Allowance'],
    accentColor: '#059669',
    bgGradient: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)'
  },
  {
    id: 'hyperstack-design',
    name: 'HyperStack Studio',
    logo: '🎨',
    rating: 4.7,
    reviewCount: 124,
    openings: 15,
    industry: 'Product Design & Creative Engineering',
    location: 'Pune / Remote',
    description: 'Award-winning product strategy, human-centered UI/UX design systems, and mobile apps.',
    tags: ['Creative Agency', 'Remote-First', 'Flexible Hours'],
    benefits: ['Latest MacBook Pro M3', 'Unlimited PTO', 'Annual Creative Retreat'],
    accentColor: '#EA580C',
    bgGradient: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)'
  },
  {
    id: 'vanguard-security',
    name: 'Vanguard CyberSec',
    logo: '🛡️',
    rating: 4.6,
    reviewCount: 267,
    openings: 21,
    industry: 'Zero-Trust Cybersecurity',
    location: 'Chennai & Bengaluru',
    description: 'Protecting critical infrastructure and cloud-native applications with automated threat hunting.',
    tags: ['Security Leader', 'High Retention', 'Global Projects'],
    benefits: ['Security Cert Reimbursements', 'Quarterly Incentives', 'Fitness Membership'],
    accentColor: '#DC2626',
    bgGradient: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)'
  }
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Full Stack Engineer (React, TypeScript & Node)',
    company: 'Clyptus Technologies',
    companyLogo: '⚡',
    companyBg: '#FFF0E5',
    rating: 4.8,
    reviewCount: 342,
    location: 'Bengaluru (Hybrid)',
    locationType: 'Hybrid',
    experience: '4-7 Yrs',
    salaryMin: 2200000,
    salaryMax: 3600000,
    salaryDisplay: '₹22 - ₹36 LPA + ESOPs',
    category: 'tech',
    jobType: 'Full Time',
    tags: ['React 19', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'AWS'],
    skills: ['React', 'TypeScript', 'Node.js', 'Tailwind/CSS', 'GraphQL', 'Docker'],
    postedTime: '2 hours ago',
    isUrgent: true,
    isFeatured: true,
    applicantsCount: 43,
    description: 'We are seeking a Senior Full Stack Engineer to lead core feature development at Clyptus. You will design scalable client-side architectures, build high-throughput microservices, and collaborate closely with our product and design teams to deliver silky-smooth user experiences.',
    responsibilities: [
      'Architect and build highly interactive, high-performance web applications using React, TypeScript, and modern state architectures.',
      'Develop robust backend APIs and streaming web services using Node.js and distributed microservices.',
      'Optimize web performance, Core Web Vitals, and maintain 99.99% reliability across critical client portals.',
      'Mentor junior and mid-level engineers, review PRs, and establish best practices in code quality and testing.'
    ],
    requirements: [
      '4+ years of hands-on experience in full stack software development.',
      'Deep mastery of modern JavaScript/TypeScript, React ecosystems, and component lifecycle.',
      'Solid experience with relational databases (PostgreSQL/MySQL) and caching layers (Redis).',
      'Strong grasp of system design, RESTful/GraphQL APIs, CI/CD pipelines, and AWS.'
    ],
    perks: [
      'Lucrative ESOP grant with favorable vesting schedules',
      'Flexible hybrid working model (2 days office / 3 days remote)',
      '100% employer-sponsored health insurance for family + parents',
      'Annual ₹1,20,000 learning and conference stipend'
    ],
    department: 'Core Product Engineering'
  },
  {
    id: 'job-2',
    title: 'Staff Machine Learning Engineer (Agentic AI & LLMs)',
    company: 'QuantumAI Labs',
    companyLogo: '🧠',
    companyBg: '#F3E8FF',
    rating: 4.9,
    reviewCount: 189,
    location: 'Bengaluru / Remote',
    locationType: 'Remote',
    experience: '5-9 Yrs',
    salaryMin: 3800000,
    salaryMax: 6500000,
    salaryDisplay: '₹38 - ₹65 LPA',
    category: 'ai-data',
    jobType: 'Full Time',
    tags: ['Generative AI', 'PyTorch', 'LLaMA', 'RAG Pipelines', 'LangChain', 'Python'],
    skills: ['Python', 'PyTorch', 'Transformers', 'Vector DBs', 'FastAPI', 'MLOps'],
    postedTime: '1 day ago',
    isHot: true,
    isFeatured: true,
    applicantsCount: 89,
    description: 'Join QuantumAI Labs as a Staff ML Engineer to build autonomous agentic platforms and domain-adapted LLM reasoning engines for Fortune 500 workflows.',
    responsibilities: [
      'Design, train, and fine-tune large open-weights foundation models on specialized datasets.',
      'Implement low-latency retrieval-augmented generation (RAG) pipelines and multi-agent coordination frameworks.',
      'Optimize model inference speed using TensorRT-LLM, vLLM, and ONNX Runtime on multi-GPU clusters.'
    ],
    requirements: [
      'Proven track record with production ML/LLM deployments.',
      'Strong fundamentals in NLP, attention mechanisms, LoRA/QLoRA fine-tuning, and evaluation frameworks.',
      'Proficiency with Python, PyTorch, CUDA acceleration, and cloud GPU infra (NVIDIA H100s/A100s).'
    ],
    perks: [
      'Access to dedicated GPU compute clusters',
      'Top 1% market compensation & equity grant',
      'Work with ex-DeepMind and Stanford researchers'
    ],
    department: 'Artificial Intelligence Research'
  },
  {
    id: 'job-3',
    title: 'Lead Product Designer (Design Systems & B2B SaaS)',
    company: 'HyperStack Studio',
    companyLogo: '🎨',
    companyBg: '#FFF7ED',
    rating: 4.7,
    reviewCount: 124,
    location: 'Pune / Mumbai (Hybrid)',
    locationType: 'Hybrid',
    experience: '5-8 Yrs',
    salaryMin: 2400000,
    salaryMax: 3800000,
    salaryDisplay: '₹24 - ₹38 LPA',
    category: 'product',
    jobType: 'Full Time',
    tags: ['Figma', 'Design Systems', 'Micro-interactions', 'UX Research', 'Prototyping'],
    skills: ['Figma', 'Design Systems', 'User Research', 'Framer', 'UI Architecture'],
    postedTime: '3 hours ago',
    isUrgent: true,
    applicantsCount: 62,
    description: 'Lead the design vision and create world-class, intuitive user experiences for enterprise cloud dashboards and high-speed workflow platforms.',
    responsibilities: [
      'Own end-to-end UX/UI design across web and mobile products.',
      'Evolve and maintain an enterprise design system in Figma with cross-functional parity in React.',
      'Conduct user interviews, usability testing, and translate complex business requirements into elegant interfaces.'
    ],
    requirements: [
      'Strong portfolio showcasing shipped B2B SaaS or enterprise web applications.',
      'Deep understanding of typography, spacing hierarchies, interaction design, and accessibility (WCAG).',
      'Ability to prototype dynamic interactions using Figma, Principle, or Framer.'
    ],
    perks: [
      'Brand new Apple ecosystem setup (M3 Max)',
      'Design book allowance & masterclass subscriptions',
      'Remote flexibility with bi-monthly team dinners'
    ],
    department: 'Product Design'
  },
  {
    id: 'job-4',
    title: 'Lead DevOps & Cloud Platform Architect',
    company: 'NexaCloud Systems',
    companyLogo: '☁️',
    companyBg: '#E0F2FE',
    rating: 4.6,
    reviewCount: 512,
    location: 'Hyderabad, India',
    locationType: 'On-site',
    experience: '6-10 Yrs',
    salaryMin: 3000000,
    salaryMax: 4800000,
    salaryDisplay: '₹30 - ₹48 LPA',
    category: 'cloud-devops',
    jobType: 'Full Time',
    tags: ['Kubernetes', 'Terraform', 'AWS', 'GCP', 'ArgoCD', 'Prometheus'],
    skills: ['Kubernetes', 'Terraform', 'CI/CD', 'AWS', 'Linux Internals', 'Golang'],
    postedTime: '5 hours ago',
    isFeatured: true,
    applicantsCount: 31,
    description: 'Architect resilient multi-region cloud infrastructures and developer self-service platforms serving millions of concurrent requests daily.',
    responsibilities: [
      'Design and manage automated Kubernetes clusters using GitOps (ArgoCD) and Infrastructure-as-Code (Terraform).',
      'Implement enterprise-grade observability, distributed tracing, and automated incident response runbooks.',
      'Enforce zero-trust cloud security, secrets management (HashiCorp Vault), and SOC2 compliance standards.'
    ],
    requirements: [
      '6+ years of specialized experience in cloud engineering and site reliability.',
      'Deep knowledge of Kubernetes networking, service mesh (Istio), and Linux systems tuning.',
      'Proficiency in scripting (Python / Bash / Go).'
    ],
    perks: [
      'Quarterly performance bonuses',
      'Full family healthcare with OPD coverage',
      'Annual wellness & sports reimbursement'
    ],
    department: 'Cloud & Infrastructure'
  },
  {
    id: 'job-5',
    title: 'Senior Growth & Product Marketing Manager',
    company: 'FinScale Global',
    companyLogo: '💳',
    companyBg: '#D1FAE5',
    rating: 4.5,
    reviewCount: 890,
    location: 'Gurgaon / Delhi NCR',
    locationType: 'Hybrid',
    experience: '4-7 Yrs',
    salaryMin: 2000000,
    salaryMax: 3200000,
    salaryDisplay: '₹20 - ₹32 LPA',
    category: 'marketing',
    jobType: 'Full Time',
    tags: ['Product Marketing', 'Growth Loops', 'B2B GTM', 'Funnel Optimization', 'Analytics'],
    skills: ['GTM Strategy', 'Mixpanel', 'SEO/SEM', 'Content Strategy', 'Product Messaging'],
    postedTime: '1 day ago',
    applicantsCount: 77,
    description: 'Drive user acquisition, retention loops, and product go-to-market strategies for our rapidly scaling fintech infrastructure products.',
    responsibilities: [
      'Define positioning, competitive differentiators, and launch strategies for core payment APIs.',
      'Partner with product teams to build viral onboarding loops and in-app activation mechanisms.',
      'Analyze conversion funnels, CAC/LTV dynamics, and run rapid A/B experiments.'
    ],
    requirements: [
      'Proven experience scaling B2B SaaS or fintech product lines.',
      'Strong storytelling, analytical thinking, and quantitative data skills.',
      'Experience with tools like Amplitude, Mixpanel, Hubspot, and Google Analytics 4.'
    ],
    perks: [
      'High growth fintech fast-track career path',
      'Generous quarterly performance incentives',
      'Company-provided cab transportation'
    ],
    department: 'Growth & Marketing'
  },
  {
    id: 'job-6',
    title: 'Frontend Specialist (React 19 & Next.js Performance)',
    company: 'Clyptus Technologies',
    companyLogo: '⚡',
    companyBg: '#FFF0E5',
    rating: 4.8,
    reviewCount: 342,
    location: 'Remote / India',
    locationType: 'Remote',
    experience: '2-5 Yrs',
    salaryMin: 1800000,
    salaryMax: 2800000,
    salaryDisplay: '₹18 - ₹28 LPA',
    category: 'tech',
    jobType: 'Full Time',
    tags: ['React 19', 'Next.js', 'Tailwind', 'Web Vitals', 'State Management'],
    skills: ['React', 'TypeScript', 'CSS3', 'Next.js', 'Zustand', 'Jest'],
    postedTime: 'Just now',
    isUrgent: true,
    isHot: true,
    applicantsCount: 19,
    description: 'Build hyper-responsive web experiences with buttery 60fps animations, optimized bundle sizes, and cutting-edge React Server Components at Clyptus.',
    responsibilities: [
      'Develop pixel-perfect, accessible UI components with robust state handling and zero visual glitches.',
      'Audit and optimize Web Vitals (LCP, INP, CLS) for sub-second page loads across mobile and desktop.',
      'Collaborate with backend engineers to integrate REST/WebSocket streams for real-time dashboards.'
    ],
    requirements: [
      '2+ years building web applications with modern React & TypeScript.',
      'Expertise in CSS architecture, responsive flex/grid layouts, and animation libraries.',
      'Passionate about craftsmanship, micro-interactions, and developer experience.'
    ],
    perks: [
      '100% remote working flexibility forever',
      'Custom ergonomic work-from-home desk setup allowance',
      'Annual company worldwide retreat'
    ],
    department: 'Frontend Engineering'
  },
  {
    id: 'job-7',
    title: 'Principal Security & Pen-Testing Engineer',
    company: 'Vanguard CyberSec',
    companyLogo: '🛡️',
    companyBg: '#FEE2E2',
    rating: 4.6,
    reviewCount: 267,
    location: 'Chennai (Hybrid)',
    locationType: 'Hybrid',
    experience: '5-9 Yrs',
    salaryMin: 2800000,
    salaryMax: 4500000,
    salaryDisplay: '₹28 - ₹45 LPA',
    category: 'tech',
    jobType: 'Full Time',
    tags: ['AppSec', 'Penetration Testing', 'OWASP Top 10', 'SOC2', 'Threat Modeling'],
    skills: ['Burp Suite', 'Python', 'Cloud Security', 'Vulnerability Assessment', 'Cryptography'],
    postedTime: '2 days ago',
    applicantsCount: 28,
    description: 'Perform advanced red teaming, vulnerability assessments, and secure code audits to safeguard enterprise clients.',
    responsibilities: [
      'Execute white-box and black-box penetration tests across API endpoints and cloud infra.',
      'Build automated security scanners within CI/CD pipelines to catch vulnerabilities pre-production.',
      'Lead incident response drills and train development teams on secure coding guidelines.'
    ],
    requirements: [
      'Relevant certifications (OSCP, CEH, CISSP or equivalent).',
      'Deep knowledge of web security mechanisms (CORS, CSP, OAuth2, JWT).',
      'Solid experience in automated vulnerability scanning and remediation.'
    ],
    perks: [
      'Sponsored certifications & conference tickets (BlackHat, DefCon)',
      'Flexible working arrangements',
      'Comprehensive insurance coverage'
    ],
    department: 'Security Engineering'
  },
  {
    id: 'job-8',
    title: 'Associate Product Manager (APM - Freshers / Early Career)',
    company: 'Clyptus Technologies',
    companyLogo: '⚡',
    companyBg: '#FFF0E5',
    rating: 4.8,
    reviewCount: 342,
    location: 'Bengaluru / Hyderabad',
    locationType: 'On-site',
    experience: '0-2 Yrs',
    salaryMin: 1200000,
    salaryMax: 1800000,
    salaryDisplay: '₹12 - ₹18 LPA',
    category: 'product',
    jobType: 'Full Time',
    tags: ['Entry Level', 'Product Strategy', 'Wireframing', 'SQL', 'Data Analytics'],
    skills: ['Product Thinking', 'SQL', 'Figma', 'Jira', 'User Research'],
    postedTime: '4 hours ago',
    isHot: true,
    applicantsCount: 145,
    description: 'Kickstart your product management journey with Clyptus! You will work alongside seasoned product directors to launch features used by millions.',
    responsibilities: [
      'Gather user feedback, write clear PRDs (Product Requirement Documents), and manage sprint backlogs.',
      'Perform quantitative data queries (SQL) to track feature adoption and drop-off rates.',
      'Coordinate with engineering, design, and marketing teams for seamless sprint deliveries.'
    ],
    requirements: [
      'Bachelor’s degree in Engineering, Computer Science, or Business from a recognized institute.',
      'Strong problem-solving instincts, exceptional communication, and high empathy for users.',
      'Basic knowledge of SQL, data analysis, and product management frameworks.'
    ],
    perks: [
      'Structured 1-on-1 mentorship from VP of Product',
      'Fast-track promotion cycle every 12 months',
      'Subsidized gourmet lunches and coffee bar'
    ],
    department: 'Product Management'
  }
];

export const SALARY_BENCHMARKS: SalaryBand[] = [
  {
    role: 'Full Stack Engineer',
    category: 'tech',
    min: 1200000,
    median: 2600000,
    max: 4500000,
    currency: '₹',
    sampleCount: 3840,
    trend: '+18% YoY',
    topSkills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker']
  },
  {
    role: 'AI / ML Engineer',
    category: 'ai-data',
    min: 1600000,
    median: 3400000,
    max: 6800000,
    currency: '₹',
    sampleCount: 2190,
    trend: '+42% YoY',
    topSkills: ['PyTorch', 'LLMs', 'Python', 'Vector DB', 'RAG']
  },
  {
    role: 'DevOps & Cloud SRE',
    category: 'cloud-devops',
    min: 1400000,
    median: 2900000,
    max: 5000000,
    currency: '₹',
    sampleCount: 1950,
    trend: '+22% YoY',
    topSkills: ['Kubernetes', 'AWS', 'Terraform', 'CI/CD', 'Docker']
  },
  {
    role: 'Product Manager',
    category: 'product',
    min: 1500000,
    median: 3000000,
    max: 5500000,
    currency: '₹',
    sampleCount: 1420,
    trend: '+15% YoY',
    topSkills: ['GTM Strategy', 'User Analytics', 'SQL', 'Roadmapping', 'Agile']
  },
  {
    role: 'UI/UX Product Designer',
    category: 'product',
    min: 1000000,
    median: 2200000,
    max: 4000000,
    currency: '₹',
    sampleCount: 1180,
    trend: '+20% YoY',
    topSkills: ['Figma', 'Design Systems', 'Micro-interactions', 'WCAG', 'Prototyping']
  },
  {
    role: 'Data Scientist',
    category: 'ai-data',
    min: 1300000,
    median: 2700000,
    max: 4800000,
    currency: '₹',
    sampleCount: 1640,
    trend: '+25% YoY',
    topSkills: ['Python', 'SQL', 'Pandas', 'Tableau', 'Machine Learning']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Aarav Sharma',
    role: 'Senior React Architect',
    company: 'Placed at Clyptus Technologies',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    hike: '90% Salary Hike',
    content: 'Clyptus Careers matched my niche TypeScript & Next.js skills directly with high-growth teams. I received 3 interview requests within 48 hours of updating my profile and landed a dream offer with full remote flexibility!',
    rating: 5,
    verified: true
  },
  {
    id: 't-2',
    name: 'Pooja Deshmukh',
    role: 'Lead ML Engineer',
    company: 'Placed at QuantumAI Labs',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    hike: '110% Salary Hike',
    content: 'The AI Resume Score analyzer gave me actionable insights to tailor my profile for LLM roles. The 1-click apply feature saved me dozens of hours compared to traditional job boards like Indeed or Naukri.',
    rating: 5,
    verified: true
  },
  {
    id: 't-3',
    name: 'Rohit Mukherjee',
    role: 'Engineering Director',
    company: 'Hiring at NexaCloud',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    hike: 'Hired 14 SREs in 30 Days',
    content: 'As an engineering hiring manager, the candidate quality on Clyptus is unmatched. The verified skill assessments and transparent salary expectation filters reduced our time-to-hire by over 60%.',
    rating: 5,
    verified: true
  }
];

export const FAQS = [
  {
    question: 'How is Clyptus Job Portal different from Naukri, Indeed, and Foundit?',
    answer: 'Clyptus combines modern AI-powered skill matching, transparent salary benchmark bands, 1-click instant applications, and verified company direct connections. Unlike traditional portals with spam and outdated listings, Clyptus guarantees 100% verified active openings with real-time recruiter response tracking.'
  },
  {
    question: 'Is Clyptus completely free for job seekers?',
    answer: 'Yes! Job seekers can search unlimited jobs, access our AI Resume Scorer, benchmark their market compensation with our Live Salary Estimator, and apply to thousands of top verified companies with zero hidden fees.'
  },
  {
    question: 'How does the AI Resume Match score work?',
    answer: 'Our proprietary ATS engine parses your uploaded resume against real employer job specifications, analyzing keyword density, structural impact, action verbs, and quantifiable achievements to give you a score out of 100 and precise improvement pointers.'
  },
  {
    question: 'How can recruiters and companies post jobs on Clyptus?',
    answer: 'Employers can click the "Post a Job" button in the top navigation or use our recruiter portal. It takes under 2 minutes to post a vacancy, and our intelligent algorithm immediately surfaces high-match candidates from our verified talent pool.'
  },
  {
    question: 'Are remote and international jobs supported?',
    answer: 'Absolutely! You can easily filter by 100% Remote, Hybrid, or On-site positions across major tech hubs in India (Bengaluru, Hyderabad, Pune, Mumbai, NCR) as well as global remote roles with competitive USD/EUR and INR packages.'
  }
];
