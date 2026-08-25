export type ViewType = 
  | 'home'
  | 'test'
  | 'results'
  | 'careers'
  | 'universities'
  | 'scholarships'
  | 'profile'
  | 'compare';

export type AuthMode = 'login' | 'register' | 'forgot-password';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  age?: number;
  educationLevel?: string;
  city?: string;
  country?: string;
  avatarColor?: string;
  createdAt: string;
  savedCareers: string[];
  savedUniversities: string[];
  savedScholarships: string[];
  testHistory: TestResult[];
}

export type RiasecType = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

export interface RiasecDimension {
  code: RiasecType;
  name: string;
  shortName: string;
  description: string;
  color: string;
  icon: string;
  skills: string[];
}

export interface Question {
  id: number;
  text: string;
  category: RiasecType;
  area: 'intereses' | 'habilidades' | 'personalidad' | 'preferencias';
  options?: {
    label: string;
    value: number;
  }[];
}

export interface TestResult {
  id: string;
  date: string;
  scores: Record<RiasecType, number>; // percentages 0 - 100
  dominantTypes: RiasecType[];
  profileTitle: string;
  profileDescription: string;
  topStrengths: string[];
  recommendedCareers: {
    careerId: string;
    matchPercentage: number;
  }[];
}

export interface Career {
  id: string;
  name: string;
  area: string;
  categoryColor: string;
  duration: string; // e.g. "5 años (10 semestres)"
  degreeType: 'Licenciatura' | 'Ingeniería' | 'Tecnología' | 'Medicina' | 'Especialidad';
  riasecPrimary: RiasecType;
  riasecSecondary: RiasecType;
  shortDescription: string;
  fullDescription: string;
  necessarySkills: string[];
  workFields: string[];
  averageSalaryRange: string;
  employabilityRate: string;
  dailyActivities: string[];
  relatedSubjects: string[];
  suggestedUniversities: string[];
  iconName: string;
  isTrending?: boolean;
}

export interface University {
  id: string;
  name: string;
  shortName: string;
  type: 'Pública' | 'Privada';
  city: string;
  country: string;
  logoText: string;
  badgeBg: string;
  description: string;
  topCareers: string[];
  admissionRequirements: string[];
  tuitionInfo: string;
  campusHighlights: string[];
  websiteUrl: string;
  rating: number;
}

export interface Scholarship {
  id: string;
  title: string;
  organization: string;
  coverage: '100% Total' | 'Parcial 50-80%' | 'Manutención y Gastos' | 'Internacional';
  badgeBg: string;
  description: string;
  requirements: string[];
  benefits: string[];
  deadlineDate: string; // YYYY-MM-DD
  targetAudience: string;
  applicationLink: string;
  fieldOfStudy: string[];
  isFeatured?: boolean;
}
