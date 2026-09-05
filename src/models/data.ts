import { RiasecDimension, RiasecType } from '../types';
import { VOCATIONAL_QUESTION_BANK, selectFreshQuestionsForUser } from './questionsData';
import { COMPREHENSIVE_CAREERS_DATA } from './careersData';
import { COLOMBIAN_UNIVERSITIES_DATA, COLOMBIAN_SCHOLARSHIPS_DATA } from './colombianUniversitiesData';
import { DAILY_ADVICE_LIST, getDailyAdvice } from './adviceData';

export const RIASEC_DIMENSIONS: Record<RiasecType, RiasecDimension> = {
  R: {
    code: 'R',
    name: 'Realista (Práctico y Técnico)',
    shortName: 'Realista',
    description: 'Te gusta trabajar con objetos, máquinas, herramientas, plantas o animales. Prefieres actividades prácticas, al aire libre y con resultados tangibles.',
    color: 'emerald',
    icon: 'Wrench',
    skills: ['Destreza manual', 'Pensamiento espacial', 'Resolución práctica', 'Operación tecnológica', 'Fuerza y precisión']
  },
  I: {
    code: 'I',
    name: 'Investigador (Analítico y Científico)',
    shortName: 'Investigador',
    description: 'Te apasiona comprender el porqué de las cosas, analizar datos, resolver problemas complejos, investigar fenómenos y aplicar el método científico.',
    color: 'indigo',
    icon: 'Microscope',
    skills: ['Pensamiento crítico', 'Análisis lógico', 'Investigación científica', 'Curiosidad intelectual', 'Resolución matemática']
  },
  A: {
    code: 'A',
    name: 'Artístico (Creativo y Expresivo)',
    shortName: 'Artístico',
    description: 'Valoras la originalidad, la imaginación, el diseño, la música, la escritura y las formas libres de autoexpresión visual o conceptual.',
    color: 'pink',
    icon: 'Palette',
    skills: ['Creatividad e innovación', 'Diseño visual', 'Expresión emocional', 'Pensamiento lateral', 'Estética y narrativa']
  },
  S: {
    code: 'S',
    name: 'Social (Empático y Colaborativo)',
    shortName: 'Social',
    description: 'Disfrutas ayudar a los demás, enseñar, escuchar, orientar y generar un impacto positivo en la comunidad y el bienestar de las personas.',
    color: 'purple',
    icon: 'HeartHandshake',
    skills: ['Empatía activa', 'Comunicación asertiva', 'Trabajo en equipo', 'Orientación y pedagogía', 'Resolución de conflictos']
  },
  E: {
    code: 'E',
    name: 'Emprendedor (Líder y Estratega)',
    shortName: 'Emprendedor',
    description: 'Te motiva liderar proyectos, persuadir, negociar, asumir retos, crear negocios y alcanzar metas ambiciosas con energía y visión.',
    color: 'amber',
    icon: 'TrendingUp',
    skills: ['Liderazgo y toma de decisiones', 'Persuasión y negociación', 'Visión de negocio', 'Iniciativa y audacia', 'Gestión de proyectos']
  },
  C: {
    code: 'C',
    name: 'Convencional (Organizado y Metódico)',
    shortName: 'Convencional',
    description: 'Prefieres actividades estructuradas, trabajar con datos precisos, planificar sistemas ordenados, finanzas y garantizar la calidad y el detalle.',
    color: 'blue',
    icon: 'FileSpreadsheet',
    skills: ['Organización meticulosa', 'Atención al detalle', 'Gestión de datos', 'Planificación sistemática', 'Control y auditoría']
  }
};

// Re-exports with original identifiers for full backward compatibility
export const VOCATIONAL_QUESTIONS = VOCATIONAL_QUESTION_BANK;
export const CAREERS_DATA = COMPREHENSIVE_CAREERS_DATA;
export const UNIVERSITIES_DATA = COLOMBIAN_UNIVERSITIES_DATA;
export const SCHOLARSHIPS_DATA = COLOMBIAN_SCHOLARSHIPS_DATA;

// Additional exports
export { selectFreshQuestionsForUser, DAILY_ADVICE_LIST, getDailyAdvice };
