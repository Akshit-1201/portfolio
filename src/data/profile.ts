// Single source of truth for all site content, derived from
// Resume/Akshit_Resume_May.pdf. Edit here to update the site copy.

export const PROFILE = {
  name: 'Akshit Negi',
  firstName: 'Akshit',
  role: 'AI Engineer',
  // Hero tagline (replaces the old "3d creator" line)
  tagline:
    'AI engineer building agentic pipelines, LLM evaluation infrastructure, and RAG applications.',
  summary:
    'AI Engineer with production experience building agentic pipelines, LLM evaluation infrastructure, and RAG applications. I work end to end — prompt engineering, multi-model orchestration across GPT-4, Gemini and Claude, automated benchmarking, and ML classification — to ship reliable, scalable AI systems that deliver measurable impact.',
  location: 'Gurugram, India',
  avatar: '/avatar.png', // ← replace public/avatar.png with your photo
  resume: '/Akshit_Negi_Resume.pdf',
  email: 'akshitnegi.work@gmail.com',
  github: 'https://github.com/Akshit-1201',
  githubHandle: 'Akshit-1201',
  linkedin: 'https://linkedin.com/in/negi-akshit',
  linkedinHandle: 'negi-akshit',
} as const;

export const STATS = [
  { value: '15K+', label: 'Monthly LLM evaluations' },
  { value: '90%+', label: 'Faster eval pipelines' },
  { value: '60%', label: 'Lower operational cost' },
  { value: '5', label: 'AI projects shipped' },
] as const;

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Publication', href: '#publication' },
  { label: 'Contact', href: '#contact' },
] as const;

export type Experience = {
  role: string;
  company: string;
  meta: string;
  period: string;
  bullets: string[];
};

export const EXPERIENCE: Experience[] = [
  {
    role: 'Data Analyst (AI Automation)',
    company: 'Highspring India LLP',
    meta: 'Google xWF',
    period: 'Jan 2025 – Jun 2026',
    bullets: [
      'Architected an agentic AI pipeline using Gemini 2.5 Flash with Google Search Grounding for Wikipedia Content Gap Analysis, reducing research turnaround from days to minutes.',
      'Built a Python automation system orchestrating 500+ daily evaluation queries across 4 LLM platforms (GPT-4, Gemini, Claude, Perplexity), eliminating 100% of manual data collection.',
      'Improved LLM evaluation throughput by 90%+, cutting data collection time from 1–2 days to under 10 minutes and saving 10+ analyst hours/week.',
      'Developed AutoRater, an ML classification system scoring 1,000+ LLM responses daily with an 85% F1 score, improving inter-rater reliability by 40% across evaluation teams.',
      'Deployed the automation pipeline across 5+ QA workflows processing 15,000+ monthly evaluations, reducing operational costs by 60%.',
    ],
  },
];

export type SkillGroup = {
  title: string;
  skills: string[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'AI & LLM Systems',
    skills: [
      'LLM Evaluation',
      'Prompt Engineering',
      'RAG',
      'Agentic Pipelines',
      'Vector DBs (FAISS)',
      'Multi-model Orchestration',
      'LangGraph',
      'Hugging Face',
      'PyTorch',
    ],
  },
  {
    title: 'Backend & APIs',
    skills: ['Python', 'Flask', 'Express.js', 'REST APIs', 'GraphQL', 'WebSockets', 'Microservices'],
  },
  {
    title: 'Data & ML',
    skills: [
      'SQL',
      'Pandas',
      'Scikit-learn',
      'ML Classification',
      'Structured Output Parsing',
      'LLM-generated SQL',
    ],
  },
  {
    title: 'Cloud & DevOps',
    skills: ['Docker', 'AWS', 'Azure', 'GCP', 'Git', 'GitHub'],
  },
];

export type Project = {
  num: string;
  name: string;
  category: string;
  description: string;
  stack: string[];
  link: string;
  accent: string; // hex accent for the abstract art panel
  icon: 'workflow' | 'health' | 'shield' | 'mail' | 'battery';
};

export const PROJECTS: Project[] = [
  {
    num: '01',
    name: 'AI Agents Orchestration Platform',
    category: 'Multi-Agent Systems',
    description:
      'A visual platform to build configurable AI agents and wire them into multi-agent workflows, executed on a real LangGraph runtime with tool-calling, RAG, a live WebSocket monitor (logs, inter-agent messages, token/cost), and an external Telegram channel — all running locally from a single command.',
    stack: ['LangGraph', 'FastAPI', 'Next.js', 'React Flow', 'Chroma (RAG)', 'Telegram'],
    link: 'https://github.com/Akshit-1201/AI-Agents-Orchestration-Platform',
    accent: '#818CF8',
    icon: 'workflow',
  },
  {
    num: '02',
    name: 'Agentic AI for Discharge Summaries',
    category: 'Healthcare · Agentic AI',
    description:
      'A from-scratch ReAct agent that reads messy, image-only patient PDFs and drafts structured discharge summaries for clinician review under a hard no-fabrication guarantee — every field is either cited verbatim against the source page or flagged MISSING / PENDING / CONFLICT.',
    stack: ['OpenAI', 'ReAct Agent', 'Vision OCR', 'FastAPI', 'React'],
    link: 'https://github.com/Akshit-1201/Agentic-AI-Discharge-Summary',
    accent: '#2DD4BF',
    icon: 'health',
  },
  {
    num: '03',
    name: 'Vulnerable-Bookshelf-AI',
    category: 'LLM Security Research',
    description:
      'A full-stack LLM security testing platform demonstrating 8+ attack vectors (prompt injection, jailbreaks, RAG poisoning), with FAISS semantic search over 500+ docs at 95% retrieval accuracy, containerized via Docker.',
    stack: ['Python', 'Flask', 'React', 'RAG', 'FAISS', 'Docker'],
    link: 'https://github.com/Akshit-1201/vulnerable-book-shelf-ai',
    accent: '#F43F5E',
    icon: 'shield',
  },
  {
    num: '04',
    name: 'AI-Driven Phishing Simulation Framework',
    category: 'Security Automation',
    description:
      'An LLM-powered multi-stage phishing simulation using intent classification and stateful conversational flows — 80% user engagement across 100+ automated campaigns for enterprise security awareness training.',
    stack: ['Python', 'LLMs', 'Zoho Mail API', 'Intent Classification'],
    link: 'https://github.com/Akshit-1201/Automatic-Email-Phishing',
    accent: '#F59E0B',
    icon: 'mail',
  },
  {
    num: '05',
    name: 'OPC UA → IEC 60870-5-104 BESS Gateway',
    category: 'Industrial Protocols',
    description:
      'A protocol translation gateway for Battery Energy Storage Systems; validated 500+ data points on Kalkitech SYNC 3000 hardware with 99.9% message delivery reliability in industrial deployment.',
    stack: ['Python', 'SCADA', 'Industrial Protocols'],
    link: 'https://github.com/Akshit-1201/bess-gateway-opc-iec104',
    accent: '#84CC16',
    icon: 'battery',
  },
];

export const PUBLICATION = {
  title: 'Deep Learning-Based Enhanced Object Detection for Humanoid Robots',
  venue: 'IEEE Conference Publication',
  publisher: 'IEEE Xplore',
  year: '2025',
  note: 'Proposed a deep learning object detection approach optimized for humanoid robot perception, achieving 90%+ accuracy in real-time environments.',
  doi: '10.1109/SETCOM64758.2025.10932364',
  url: 'https://doi.org/10.1109/SETCOM64758.2025.10932364',
};

export const EDUCATION = {
  degree: 'B.Tech in Information Technology',
  school: 'Vellore Institute of Technology',
  period: 'Oct 2020 – Aug 2024',
  detail: 'CGPA 8.13 · Specialization in AI, ML & Data Science',
};

// Tech-stack marquee. `slug` uses simple-icons (https://simpleicons.org);
// items without a slug render as a text chip.
export type TechItem = { label: string; slug?: string };

export const TECH_STACK: TechItem[] = [
  { label: 'Python', slug: 'python' },
  { label: 'LangGraph', slug: 'langchain' },
  { label: 'PyTorch', slug: 'pytorch' },
  { label: 'Hugging Face', slug: 'huggingface' },
  { label: 'Claude', slug: 'anthropic' },
  { label: 'Gemini', slug: 'googlegemini' },
  { label: 'GPT-4' },
  { label: 'Perplexity', slug: 'perplexity' },
  { label: 'RAG' },
  { label: 'FAISS' },
  { label: 'Flask', slug: 'flask' },
  { label: 'FastAPI', slug: 'fastapi' },
  { label: 'GraphQL', slug: 'graphql' },
  { label: 'React', slug: 'react' },
  { label: 'Node.js', slug: 'nodedotjs' },
  { label: 'Pandas', slug: 'pandas' },
  { label: 'scikit-learn', slug: 'scikitlearn' },
  { label: 'Docker', slug: 'docker' },
  { label: 'AWS' },
  { label: 'GCP', slug: 'googlecloud' },
  { label: 'Git', slug: 'git' },
  { label: 'GitHub', slug: 'github' },
];
