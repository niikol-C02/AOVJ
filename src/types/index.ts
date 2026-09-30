export type ViewType = 
  | 'home'
  | 'test'
  | 'categories'
  | 'results'
  | 'careers'
  | 'universities'
  | 'scholarships'
  | 'profile'
  | 'compare'
  | 'admin';

export type AuthMode = 'login' | 'register' | 'forgot-password';

export type AgeStage = '13-15' | '16-17' | '18-21' | '22+' | 'infancia' | 'adolescencia' | 'juventud' | 'adultez';

export function getAgeStage(age?: number): AgeStage {
  if (age === undefined || age === null || Number.isNaN(age)) return '16-17';
  if (age <= 15) return '13-15';
  if (age <= 17) return '16-17';
  if (age <= 21) return '18-21';
  return '22+';
}

export function getAgeStageLabel(age?: number): { title: string; subtitle: string; range: string } {
  const stage = getAgeStage(age);
  switch (stage) {
    case '13-15':
    case 'infancia':
      return {
        title: 'Exploración Vocacional Temprana',
        subtitle: 'Descubrimiento de curiosidades, talentos escolares y temas de interés',
        range: '13–15 años'
      };
    case '16-17':
    case 'adolescencia':
      return {
        title: 'Decisión Preuniversitaria y Bachillerato',
        subtitle: 'Orientación hacia carreras, preparación preuniversitaria y opciones de estudio',
        range: '16–17 años'
      };
    case '18-21':
    case 'juventud':
      return {
        title: 'Educación Superior y Primer Empleo',
        subtitle: 'Enfoque en programas universitarios, técnicos, tecnológicos y proyección laboral',
        range: '18–21 años'
      };
    case '22+':
    case 'adultez':
    default:
      return {
        title: 'Reorientación y Crecimiento Profesional',
        subtitle: 'Ampliación de competencias, nuevos campos laborales y educación continua',
        range: '22 años en adelante'
      };
  }
}

export interface AccessibilityPreferences {
  visualLargeText?: boolean;
  visualHighContrast?: boolean;
  visualAccessibleFont?: boolean;
  visualReducedSimultaneous?: boolean;
  visualScreenReader?: boolean;
  auditoryTextFallback?: boolean;
  motorLargeButtons?: boolean;
  motorKeyboardNav?: boolean;
  cognitiveClearLanguage?: boolean;
  cognitiveOneQuestionAtATime?: boolean;
  readingAssistance?: boolean;
  sensoryCalm?: boolean;
  timeUnlimited?: boolean;
  reducedMotion?: boolean;
  simpleInstructions?: boolean;
  repeatInstructions?: boolean;
}

export type TestCategoryId = 
  | 'intereses'
  | 'habilidades'
  | 'habilidades-aptitudes'
  | 'personalidad'
  | 'areas-profesionales'
  | 'preferencias-academicas'
  | 'orientacion-vocacional'
  | 'estudiantes'
  | 'exploracion'
  | 'perfil-profesional'
  | 'intereses-habilidades'
  | 'reorientacion';

export interface TestDefinition {
  id: string;
  name: string;
  categoryId: TestCategoryId;
  categoryName: string;
  shortDescription: string;
  whatItIsFor: string;
  approxTime: string;
  questionCount: number;
  difficulty?: string;
  iconName: string;
  badge: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role?: 'admin' | 'user';
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
  answeredQuestionIds?: number[];
  accessibilityPreferences?: AccessibilityPreferences;
}

export type AdviceCategory = 
  | 'Orientación vocacional'
  | 'Educación'
  | 'Elección de carrera'
  | 'Motivación'
  | 'Organización para estudiar'
  | 'Futuro profesional';

export interface DailyAdvice {
  id: string;
  dayIndex: number;
  category: AdviceCategory;
  title: string;
  quote: string;
  practicalTip: string;
  author: string;
  color: string;
  badgeBg: string;
  iconName: string;
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
  topic?: string;
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
  questionIdsAnswered?: number[];
  recommendedCareers: {
    careerId: string;
    matchPercentage: number;
    explanation?: string;
  }[];
}

export interface CareerUniversityOffering {
  universityId: string;
  universityName: string;
  universityShortName?: string;
  type: 'Pública' | 'Privada';
  semestersCount: number | string;
  duration?: string;
  semesterTuition: string; // e.g. "$32.800.000 COP / semestre", or "Gratuita (Política de Gratuidad "Puedo Estudiar" del Gobierno Nacional / PBM oficial)", or "Consultar valor con la universidad"
  city: string;
  modality: 'Presencial' | 'Virtual' | 'A distancia' | 'Dual / Híbrida' | string;
  websiteUrl?: string;
  accreditation?: string;
  admissionNote?: string;
}

export interface Career {
  id: string;
  name: string;
  area: string;
  categoryColor: string;
  duration: string; // e.g. "5 años (10 semestres)"
  semestersCount?: number | string;
  semesterTuition?: string;
  citiesOffered?: string[];
  universityTuitions?: {
    universityId: string;
    universityName?: string;
    tuition: string;
    city?: string;
    semestersCount?: number | string;
    duration?: string;
    modality?: string;
  }[];
  universityOfferings?: CareerUniversityOffering[];
  degreeType: 'Licenciatura' | 'Ingeniería' | 'Tecnología' | 'Medicina' | 'Especialidad' | 'Profesional Universitario' | 'Técnico Profesional' | 'Técnico' | 'Ciencias' | 'Administración' | 'Artes y Humanidades' | string;
  level?: 'Profesional Universitario' | 'Tecnológico' | 'Técnico Profesional' | 'Especialización' | 'Maestría' | string;
  modality?: 'Presencial' | 'Virtual' | 'A distancia' | 'Dual / Híbrida';
  sniesCode?: string;
  department?: string;
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
  department?: string;
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
  sniesCode?: string;
  accreditation?: string;
}

export interface Scholarship {
  id: string;
  title: string;
  organization: string;
  coverage: '100% Total' | 'Parcial 50-80%' | 'Manutención y Gastos' | 'Internacional';
  status?: 'Vigente' | 'Próxima convocatoria' | 'Cerrada';
  category?: 'Pública' | 'Privada' | 'Excelencia' | 'Deportiva / Cultural' | 'Vulnerable / Bajos Recursos' | 'Regional' | 'Internacional' | 'Crédito Condonable';
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
