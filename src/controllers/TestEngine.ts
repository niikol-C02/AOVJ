import { CAREERS_DATA, RIASEC_DIMENSIONS } from '../models/data';
import { Career, Question, RiasecType, TestResult } from '../types';

export class TestEngine {
  /**
   * Calculates RIASEC profile and career recommendations based on answer map
   * @param answers Record<number, number> map of QuestionID -> rating (1 to 5)
   * @param questions List of questions used in the test
   */
  static calculateResults(answers: Record<number, number>, questions: Question[]): TestResult {
    // 1. Accumulate scores per category
    const categoryTotals: Record<RiasecType, number> = {
      R: 0,
      I: 0,
      A: 0,
      S: 0,
      E: 0,
      C: 0
    };

    const categoryMaxPossible: Record<RiasecType, number> = {
      R: 0,
      I: 0,
      A: 0,
      S: 0,
      E: 0,
      C: 0
    };

    questions.forEach(q => {
      const userRating = answers[q.id] || 3; // default neutral if missed
      categoryTotals[q.category] += userRating;
      categoryMaxPossible[q.category] += 5; // max 5 points per question
    });

    // 2. Convert to percentages (0 to 100)
    const scores: Record<RiasecType, number> = {
      R: Math.round((categoryTotals.R / (categoryMaxPossible.R || 1)) * 100),
      I: Math.round((categoryTotals.I / (categoryMaxPossible.I || 1)) * 100),
      A: Math.round((categoryTotals.A / (categoryMaxPossible.A || 1)) * 100),
      S: Math.round((categoryTotals.S / (categoryMaxPossible.S || 1)) * 100),
      E: Math.round((categoryTotals.E / (categoryMaxPossible.E || 1)) * 100),
      C: Math.round((categoryTotals.C / (categoryMaxPossible.C || 1)) * 100)
    };

    // 3. Find top 3 dominant types sorted by score descending
    const sortedTypes = (Object.keys(scores) as RiasecType[]).sort((a, b) => scores[b] - scores[a]);
    const dominantTypes = sortedTypes.slice(0, 3);
    const primary = dominantTypes[0];
    const secondary = dominantTypes[1];

    // 4. Determine Profile Title and Narrative Description
    const profileInfo = this.getProfileNarrative(primary, secondary);

    // 5. Match every career with a weighted algorithm
    const recommendedCareers = this.calculateCareerMatches(scores, CAREERS_DATA);

    // 6. Assemble key strengths
    const topStrengths = this.extractStrengths(dominantTypes);

    return {
      id: `test-res-${Date.now()}`,
      date: new Date().toISOString(),
      scores,
      dominantTypes,
      profileTitle: profileInfo.title,
      profileDescription: profileInfo.description,
      topStrengths,
      recommendedCareers
    };
  }

  private static calculateCareerMatches(
    scores: Record<RiasecType, number>,
    careers: Career[]
  ): { careerId: string; matchPercentage: number }[] {
    const matches = careers.map(career => {
      const primaryScore = scores[career.riasecPrimary] || 50;
      const secondaryScore = scores[career.riasecSecondary] || 50;

      // Primary dimension has 60% weight, secondary has 30%, overall balance has 10%
      const baseMatch = (primaryScore * 0.6) + (secondaryScore * 0.3) + 10;
      
      // Bound between 45% and 99%
      const clampedMatch = Math.min(99, Math.max(45, Math.round(baseMatch)));

      return {
        careerId: career.id,
        matchPercentage: clampedMatch
      };
    });

    // Sort highest match first
    return matches.sort((a, b) => b.matchPercentage - a.matchPercentage);
  }

  private static getProfileNarrative(primary: RiasecType, secondary: RiasecType): { title: string; description: string } {
    const titles: Record<string, string> = {
      'I-A': 'Investigador Creativo e Innovador',
      'I-R': 'Científico Práctico y Tecnólogo',
      'I-S': 'Biólogo Humano y Analista Social',
      'I-E': 'Estratega de Datos e Innovación',
      'I-C': 'Analista Cuantitativo y de Sistemas',
      'A-I': 'Diseñador Conceptual y Visionario',
      'A-S': 'Comunicador Artístico y Educador',
      'A-E': 'Director Creativo y Emprendedor de Medios',
      'A-R': 'Arquitecto y Diseñador de Espacios',
      'A-C': 'Diseñador Editorial y Metódico',
      'S-I': 'Terapeuta Clínico e Investigador Social',
      'S-A': 'Pedagogo Creativo y Promotor Cultural',
      'S-E': 'Líder Humanitario y Transformador',
      'S-R': 'Rehabilitador Físico y Terapeuta Activo',
      'S-C': 'Coordinador de Bienestar y Gestión Social',
      'E-S': 'Líder Social y Gestor de Talento',
      'E-A': 'Publicista y Estratega de Contenidos',
      'E-C': 'Ejecutivo Corporativo y Administrador',
      'E-I': 'Emprendedor Tecnológico y Estratega',
      'E-R': 'Director de Operaciones y Proyectos',
      'R-I': 'Ingeniero de Precisión y Desarrollo',
      'R-A': 'Constructor Estético y Artesano Digital',
      'R-S': 'Entrenador de Salud y Rescatista',
      'R-E': 'Gestor de Obras y Producción',
      'R-C': 'Especialista en Automatización y Logística',
      'C-I': 'Auditor Forense y Científico de Datos',
      'C-E': 'Financista Estratégico y Auditor',
      'C-R': 'Administrador Logístico y de Infraestructura',
      'C-S': 'Gestor de Recursos Humanos y Normativa',
      'C-A': 'Diseñador de Sistemas y Documentación'
    };

    const key = `${primary}-${secondary}`;
    const fallbackTitle = `${RIASEC_DIMENSIONS[primary].shortName} - ${RIASEC_DIMENSIONS[secondary].shortName}`;
    const title = titles[key] || fallbackTitle;

    const descriptions: Record<RiasecType, string> = {
      I: 'Destacas por tu pensamiento analítico, curiosidad insaciable y pasión por descifrar problemas complejos.',
      A: 'Brillas por tu originalidad, sensibilidad estética, imaginación libre y capacidad de autoexpresión visual y narrativa.',
      S: 'Tu mayor fuerza es la empatía, el deseo de ayudar, enseñar y generar transformaciones positivas en la vida de los demás.',
      E: 'Posees un espíritu dinámico, facilidad para liderar grupos, asumir riesgos calculados y negociar proyectos exitosos.',
      R: 'Eres una persona pragmática, con habilidad para construir, manipular tecnología, resolver retos físicos y tangibles.',
      C: 'Destacas por tu disciplina, organización milimétrica, amor por la exactitud y capacidad para diseñar procesos ordenados.'
    };

    const description = `${descriptions[primary]} Al combinarse con tu dimensión ${RIASEC_DIMENSIONS[secondary].shortName.toLowerCase()}, eres ideal para campos que requieran ${RIASEC_DIMENSIONS[primary].skills[0].toLowerCase()} y ${RIASEC_DIMENSIONS[secondary].skills[0].toLowerCase()}.`;

    return { title, description };
  }

  private static extractStrengths(dominantTypes: RiasecType[]): string[] {
    const strengths: string[] = [];
    dominantTypes.forEach(type => {
      const dim = RIASEC_DIMENSIONS[type];
      if (dim && dim.skills) {
        strengths.push(...dim.skills.slice(0, 2));
      }
    });
    return Array.from(new Set(strengths)).slice(0, 5);
  }
}
