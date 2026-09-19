import { CAREERS_DATA, RIASEC_DIMENSIONS, UNIVERSITIES_DATA } from '../models/data';
import { selectFreshQuestionsForUser } from '../models/questionsData';
import { Career, Question, RiasecType, TestResult } from '../types';

export interface UserPersonalizationContext {
  city?: string;
  educationLevel?: string;
}

export class TestEngine {
  /**
   * Selects fresh, non-repeating questions for the user from the comprehensive question bank.
   */
  static selectQuestionsForUser(answeredQuestionIds: number[] = [], questionsPerDimension: number = 3): Question[] {
    return selectFreshQuestionsForUser(answeredQuestionIds, questionsPerDimension);
  }

  /**
   * Calculates RIASEC profile and career recommendations based on answer map
   * @param answers Record<number, number> map of QuestionID -> rating (1 to 5)
   * @param questions List of questions used in the test
   * @param userContext Optional user profile context (city, education level) for personalized matching
   */
  static calculateResults(
    answers: Record<number, number>,
    questions: Question[],
    userContext?: UserPersonalizationContext
  ): TestResult {
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

    // 5. Match every career with a weighted algorithm + profile context
    const recommendedCareers = this.calculateCareerMatches(
      scores,
      CAREERS_DATA,
      userContext,
      { answers, questions }
    );

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
      questionIdsAnswered: questions.map(q => q.id),
      recommendedCareers
    };
  }

  public static calculateCareerMatches(
    scores: Record<RiasecType, number>,
    careers: Career[],
    userContext?: UserPersonalizationContext,
    userAnswers?: { answers: Record<number, number>; questions: Question[] }
  ): { careerId: string; matchPercentage: number; explanation?: string }[] {
    // Detect specific topic affinities from the user's high ratings (>= 4)
    const highInterestTopics = new Set<string>();
    if (userAnswers) {
      userAnswers.questions.forEach(q => {
        const rating = userAnswers.answers[q.id] || 3;
        if (rating >= 4 && q.topic) {
          highInterestTopics.add(q.topic.toLowerCase());
        }
      });
    }

    const hasCrimeInvestigativeInterest = 
      highInterestTopics.has('criminología y justicia') ||
      highInterestTopics.has('criminalística') ||
      highInterestTopics.has('criminalística y forense') ||
      highInterestTopics.has('investigación') ||
      highInterestTopics.has('documentología forense') ||
      highInterestTopics.has('justicia social') ||
      highInterestTopics.has('litigio y derecho');

    const hasBeautyEstheticsInterest =
      highInterestTopics.has('estética y belleza') ||
      highInterestTopics.has('barbería y estilismo') ||
      highInterestTopics.has('cuidado de la piel') ||
      highInterestTopics.has('cosmetología');

    const hasManualArtFashionInterest =
      highInterestTopics.has('arte manual y joyería') ||
      highInterestTopics.has('diseño de modas y confección') ||
      highInterestTopics.has('artes plásticas') ||
      highInterestTopics.has('artesanía');

    const hasAudiovisualMediaInterest =
      highInterestTopics.has('producción audiovisual y fotografía') ||
      highInterestTopics.has('animación') ||
      highInterestTopics.has('cine') ||
      highInterestTopics.has('fotografía');

    const hasInteriorDecorInterest =
      highInterestTopics.has('diseño de interiores y decoración') ||
      highInterestTopics.has('diseño floral') ||
      highInterestTopics.has('arquitectura');

    const hasPerformingArtsMusicInterest =
      highInterestTopics.has('artes escénicas y música') ||
      highInterestTopics.has('teatro') ||
      highInterestTopics.has('música');

    const matches = careers.map(career => {
      const primaryScore = scores[career.riasecPrimary] || 50;
      const secondaryScore = scores[career.riasecSecondary] || 50;

      // Primary dimension has 60% weight, secondary has 30%, overall balance has 10%
      let baseMatch = (primaryScore * 0.6) + (secondaryScore * 0.3) + 10;

      const careerIdLower = career.id.toLowerCase();
      const careerNameLower = career.name.toLowerCase();
      const careerAreaLower = career.area.toLowerCase();

      // Specific interest boost for Criminology, Criminalistics & Forensics
      const isCriminologyOrCriminalistics = 
        careerIdLower.includes('criminalistica') ||
        careerIdLower.includes('criminologia') ||
        careerNameLower.includes('criminalística') ||
        careerNameLower.includes('criminología') ||
        careerNameLower.includes('forense') ||
        careerNameLower.includes('investigación judicial');

      if (isCriminologyOrCriminalistics && hasCrimeInvestigativeInterest) {
        baseMatch += 8;
      }

      // Specific interest boost for Beauty & Aesthetics
      const isBeautyOrEsthetics =
        careerAreaLower.includes('belleza') ||
        careerAreaLower.includes('estética') ||
        careerIdLower.includes('cosmetologia') ||
        careerIdLower.includes('maquillaje') ||
        careerIdLower.includes('barberia') ||
        careerIdLower.includes('unas') ||
        careerIdLower.includes('peluqueria');

      if (isBeautyOrEsthetics && hasBeautyEstheticsInterest) {
        baseMatch += 8;
      }

      // Specific interest boost for Fashion & Garments
      const isFashionOrTextile =
        careerAreaLower.includes('moda') ||
        careerAreaLower.includes('confección') ||
        careerIdLower.includes('patronaje') ||
        careerIdLower.includes('joyeria') ||
        careerIdLower.includes('textil');

      if (isFashionOrTextile && hasManualArtFashionInterest) {
        baseMatch += 8;
      }

      // Specific interest boost for Audiovisual & Photography
      const isAudiovisual =
        careerAreaLower.includes('audiovisual') ||
        careerIdLower.includes('fotografia') ||
        careerIdLower.includes('cine') ||
        careerIdLower.includes('animacion') ||
        careerIdLower.includes('video');

      if (isAudiovisual && hasAudiovisualMediaInterest) {
        baseMatch += 8;
      }

      // Specific interest boost for Interior Design & Decoration
      const isDecorOrInterior =
        careerAreaLower.includes('decoración') ||
        careerAreaLower.includes('interior') ||
        careerIdLower.includes('floral');

      if (isDecorOrInterior && hasInteriorDecorInterest) {
        baseMatch += 8;
      }

      // Specific interest boost for Performing Arts & Music
      const isPerformingOrMusic =
        careerAreaLower.includes('expresión artística') ||
        careerAreaLower.includes('artes escénicas') ||
        careerIdLower.includes('teatro') ||
        careerIdLower.includes('danza') ||
        careerIdLower.includes('musica') ||
        careerIdLower.includes('canto');

      if (isPerformingOrMusic && hasPerformingArtsMusicInterest) {
        baseMatch += 8;
      }

      // Contextual personalization: City & Region availability
      if (userContext?.city) {
        const userCityNorm = userContext.city.toLowerCase().trim();
        const hasLocalUni = career.suggestedUniversities.some(uniId => {
          const uni = UNIVERSITIES_DATA.find(u => u.id === uniId);
          return uni && (
            uni.city.toLowerCase().includes(userCityNorm) ||
            userCityNorm.includes(uni.city.toLowerCase().split(' ')[0])
          );
        });

        if (hasLocalUni) {
          baseMatch += 2;
        }
      }

      // Bound between 48% and 99%
      const clampedMatch = Math.min(99, Math.max(48, Math.round(baseMatch)));

      // Generate orientative and inclusive explanation (never imperative)
      let explanation = '';
      if (isBeautyOrEsthetics) {
        explanation = `Podrías explorar áreas afines a ${career.name.toLowerCase()}, donde tu sensibilidad por el cuidado, la estética y la interacción con personas encontrarán un camino ideal de desarrollo.`;
      } else if (isFashionOrTextile) {
        explanation = `Podrías considerar explorar el universo de ${career.name.toLowerCase()}, aprovechando tu interés por la creatividad manual, los materiales y el diseño de indumentaria.`;
      } else if (isAudiovisual) {
        explanation = `Una excelente alternativa orientativa para ti podría ser ${career.name.toLowerCase()}, dada tu afinidad con la narración visual, la imagen y los medios contemporáneos.`;
      } else if (isDecorOrInterior) {
        explanation = `Podrías explorar opciones relacionadas con ${career.name.toLowerCase()}, donde tu sentido estético para armonizar entornos y transformar espacios cobrará vida.`;
      } else if (isPerformingOrMusic) {
        explanation = `Podrías explorar campos vinculados a ${career.name.toLowerCase()}, pues tus intereses reflejan pasión por la autoexpresión, la sensibilidad escénica y el arte sonoro.`;
      } else if (careerIdLower.includes('criminalistica') || careerNameLower.includes('criminalística')) {
        explanation = 'Podrías explorar la investigación forense y las ciencias periciales, acorde a tu curiosidad analítica y gusto por examinar evidencias.';
      } else if (careerIdLower.includes('criminologia') || careerNameLower.includes('criminología')) {
        explanation = 'Podrías explorar áreas relacionadas con la criminología y la conducta humana, impulsado por tu sensibilidad hacia la justicia social.';
      } else {
        const pDim = RIASEC_DIMENSIONS[career.riasecPrimary];
        const sDim = RIASEC_DIMENSIONS[career.riasecSecondary];
        explanation = `Podrías explorar este campo vocacional, respaldado por tu afinidad con los perfiles ${pDim?.name || career.riasecPrimary} (${primaryScore}%) y ${sDim?.name || career.riasecSecondary} (${secondaryScore}%).`;
      }

      return {
        careerId: career.id,
        matchPercentage: clampedMatch,
        explanation
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
    const fallbackTitle = `${RIASEC_DIMENSIONS[primary]?.shortName || primary} - ${RIASEC_DIMENSIONS[secondary]?.shortName || secondary}`;
    const title = titles[key] || fallbackTitle;

    const descriptions: Record<RiasecType, string> = {
      I: 'Destacas por tu pensamiento analítico, curiosidad insaciable y pasión por descifrar problemas complejos.',
      A: 'Brillas por tu originalidad, sensibilidad estética, imaginación libre y capacidad de autoexpresión visual y narrativa.',
      S: 'Tu mayor fuerza es la empatía, el deseo de ayudar, enseñar y generar transformaciones positivas en la vida de los demás.',
      E: 'Posees un espíritu dinámico, facilidad para liderar grupos, asumir riesgos calculados y negociar proyectos exitosos.',
      R: 'Eres una persona pragmática, con habilidad para construir, manipular tecnología, resolver retos físicos y tangibles.',
      C: 'Destacas por tu disciplina, organización milimétrica, amor por la exactitud y capacidad para diseñar procesos ordenados.'
    };

    const primaryDesc = descriptions[primary] || 'Posees un conjunto de destrezas balanceadas.';
    const secShort = RIASEC_DIMENSIONS[secondary]?.shortName.toLowerCase() || 'complementaria';
    const primSkill = RIASEC_DIMENSIONS[primary]?.skills[0]?.toLowerCase() || 'análisis';
    const secSkill = RIASEC_DIMENSIONS[secondary]?.skills[0]?.toLowerCase() || 'creatividad';

    const description = `${primaryDesc} Al combinarse con tu dimensión ${secShort}, eres ideal para campos que requieran ${primSkill} y ${secSkill}.`;

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
