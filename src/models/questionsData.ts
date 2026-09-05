import { Question, RiasecType } from '../types';

/**
 * Banco amplio de 60 preguntas vocacionales estructuradas bajo el modelo RIASEC de John Holland.
 * Distribuidas equitativamente: 10 preguntas por cada dimensión (R, I, A, S, E, C)
 * abarcando Intereses, Habilidades, Personalidad y Preferencias laborales.
 */
export const VOCATIONAL_QUESTION_BANK: Question[] = [
  // --- DIMENSIÓN R: REALISTA (Práctico, Mecánico, Manual, Concreto) [IDs 1-10] ---
  {
    id: 1,
    text: '¿Disfrutas desarmar aparatos electrónicos, herramientas o motores para entender cómo funcionan mecánicamente?',
    category: 'R',
    area: 'intereses'
  },
  {
    id: 2,
    text: '¿Te agrada realizar trabajos manuales de precisión como carpintería, soldadura, maquetas, circuitos o diseño físico?',
    category: 'R',
    area: 'habilidades'
  },
  {
    id: 3,
    text: '¿Prefieres pasar tu tiempo en entornos al aire libre, fincas ecológicas o talleres en vez de estar todo el día en una oficina?',
    category: 'R',
    area: 'personalidad'
  },
  {
    id: 4,
    text: '¿Te atrae supervisar obras civiles, estructuras arquitectónicas, túneles o redes de transmisión de energía?',
    category: 'R',
    area: 'preferencias'
  },
  {
    id: 5,
    text: '¿Tienes facilidad para orientarte espacialmente, interpretar planos técnicos o seguir esquemas de ensamble complejos?',
    category: 'R',
    area: 'habilidades'
  },
  {
    id: 6,
    text: '¿Te entusiasma la idea de operar drones, maquinaria pesada automatizada, impresoras 3D industriales o vehículos?',
    category: 'R',
    area: 'intereses'
  },
  {
    id: 7,
    text: '¿Prefieres resolver un problema práctico aplicando fuerza y técnica en lugar de discutir conceptos teóricos abstractos?',
    category: 'R',
    area: 'personalidad'
  },
  {
    id: 8,
    text: '¿Te gustaría participar en expediciones de campo para recolectar muestras de suelo, minerales, fuentes hídricas o flora?',
    category: 'R',
    area: 'preferencias'
  },
  {
    id: 9,
    text: '¿Disfrutas de actividades de mantenimiento, calibración de sensores o ensamble de componentes de computadores?',
    category: 'R',
    area: 'intereses'
  },
  {
    id: 10,
    text: '¿Te sientes motivado al ver el resultado tangible de un objeto que tú mismo construiste o reparaste desde cero?',
    category: 'R',
    area: 'personalidad'
  },

  // --- DIMENSIÓN I: INVESTIGADOR (Científico, Analítico, Lógico) [IDs 11-20] ---
  {
    id: 11,
    text: '¿Te apasiona investigar a fondo en artículos científicos o documentales el porqué detrás de los fenómenos de la naturaleza?',
    category: 'I',
    area: 'intereses'
  },
  {
    id: 12,
    text: '¿Tienes facilidad para identificar patrones lógicos, analizar fórmulas matemáticas o descifrar problemas algorítmicos?',
    category: 'I',
    area: 'habilidades'
  },
  {
    id: 13,
    text: '¿Prefieres fundamentar tus opiniones en datos empíricos y evidencia rigurosa antes que en simples intuiciones?',
    category: 'I',
    area: 'personalidad'
  },
  {
    id: 14,
    text: '¿Te atrae trabajar en laboratorios de biotecnología, genética molecular, física cuántica o neurociencias?',
    category: 'I',
    area: 'preferencias'
  },
  {
    id: 15,
    text: '¿Disfrutas formular hipótesis, diseñar experimentos controlados y verificar metódicamente los resultados obtenidos?',
    category: 'I',
    area: 'habilidades'
  },
  {
    id: 16,
    text: '¿Te fascina estudiar el funcionamiento del cerebro humano, las leyes del cosmos o la química de los medicamentos?',
    category: 'I',
    area: 'intereses'
  },
  {
    id: 17,
    text: '¿Te consideras una persona altamente reflexiva, crítica e intelectualmente inconforme ante respuestas superficiales?',
    category: 'I',
    area: 'personalidad'
  },
  {
    id: 18,
    text: '¿Te gustaría desarrollar modelos de Inteligencia Artificial para predecir epidemias o diagnosticar patologías raras?',
    category: 'I',
    area: 'preferencias'
  },
  {
    id: 19,
    text: '¿Disfrutas pasar horas concentrado leyendo textos académicos densos para llegar a la raíz de un problema conceptual?',
    category: 'I',
    area: 'intereses'
  },
  {
    id: 20,
    text: '¿Te motiva encontrar la solución analítica a acertijos complejos que la mayoría de personas abandonan rápidamente?',
    category: 'I',
    area: 'habilidades'
  },

  // --- DIMENSIÓN A: ARTÍSTICO (Creativo, Visual, Expresivo, Original) [IDs 21-30] ---
  {
    id: 21,
    text: '¿Disfrutas dibujar, ilustrar digitalmente, pintar, crear esculturas o componer piezas visuales originales?',
    category: 'A',
    area: 'intereses'
  },
  {
    id: 22,
    text: '¿Tienes facilidad para redactar ensayos poéticos, historias de ficción, guiones audiovisuales o blogs reflexivos?',
    category: 'A',
    area: 'habilidades'
  },
  {
    id: 23,
    text: '¿Te sientes sofocado por normas rígidas y prefieres entornos flexibles donde se premie la imaginación y la autenticidad?',
    category: 'A',
    area: 'personalidad'
  },
  {
    id: 24,
    text: '¿Te atrae trabajar en agencias de publicidad creativa, estudios de diseño UX/UI, salas de cine o diseño de moda?',
    category: 'A',
    area: 'preferencias'
  },
  {
    id: 25,
    text: '¿Posees un sentido estético agudo para percibir combinaciones de colores, armonías musicales o composición fotográfica?',
    category: 'A',
    area: 'habilidades'
  },
  {
    id: 26,
    text: '¿Te interesa aprender a editar videos con efectos cinematográficos, animaciones 3D o producir música digital?',
    category: 'A',
    area: 'intereses'
  },
  {
    id: 27,
    text: '¿Expresas habitualmente tus emociones e ideas mediante prendas de vestir, arte visual o creaciones personalizadas?',
    category: 'A',
    area: 'personalidad'
  },
  {
    id: 28,
    text: '¿Te gustaría dirigir producciones artísticas, diseñar la identidad visual de marcas o escenografías de teatro?',
    category: 'A',
    area: 'preferencias'
  },
  {
    id: 29,
    text: '¿Disfrutas improvisar soluciones fuera de lo común y proponer conceptos que rompan los moldes tradicionales?',
    category: 'A',
    area: 'habilidades'
  },
  {
    id: 30,
    text: '¿Valoras la belleza, la originalidad conceptual y la emoción por encima de la utilidad meramente económica?',
    category: 'A',
    area: 'personalidad'
  },

  // --- DIMENSIÓN S: SOCIAL (Empático, Solidario, Formador, Humano) [IDs 31-40] ---
  {
    id: 31,
    text: '¿Sientes satisfacción sincera cuando ayudas a una persona a superar una crisis emocional o un momento difícil?',
    category: 'S',
    area: 'intereses'
  },
  {
    id: 32,
    text: '¿Tienes facilidad para escuchar con empatía sin juzgar y facilitar que las personas se sientan comprendidas?',
    category: 'S',
    area: 'habilidades'
  },
  {
    id: 33,
    text: '¿Prefieres trabajar en colaboración con equipos humanos cálidos en vez de realizar labores solitarias frente a una pantalla?',
    category: 'S',
    area: 'personalidad'
  },
  {
    id: 34,
    text: '¿Te atrae trabajar en hospitales, centros de terapia psicológica, colegios, fundaciones o brigadas humanitarias?',
    category: 'S',
    area: 'preferencias'
  },
  {
    id: 35,
    text: '¿Disfrutas enseñar a niños o jóvenes, explicar materias complejas de forma didáctica y ver su progreso de aprendizaje?',
    category: 'S',
    area: 'habilidades'
  },
  {
    id: 36,
    text: '¿Te motiva participar activamente en programas de voluntariado, comedores comunitarios o defensa de los derechos humanos?',
    category: 'S',
    area: 'intereses'
  },
  {
    id: 37,
    text: '¿Te preocupa profundamente la equidad social, la salud mental y la inclusión de poblaciones vulnerables en tu país?',
    category: 'S',
    area: 'personalidad'
  },
  {
    id: 38,
    text: '¿Te gustaría orientar vocacionalmente a otros jóvenes o liderar programas de rehabilitación física y emocional?',
    category: 'S',
    area: 'preferencias'
  },
  {
    id: 39,
    text: '¿Posees paciencia para mediar en disputas entre personas y lograr acuerdos pacíficos basados en el respeto mutuo?',
    category: 'S',
    area: 'habilidades'
  },
  {
    id: 40,
    text: '¿Consideras que el éxito en tu vida profesional debe medirse por cuántas vidas lograste impactar positivamente?',
    category: 'S',
    area: 'personalidad'
  },

  // --- DIMENSIÓN E: EMPRENDEDOR (Líder, Persuasivo, Estratega, Visionario) [IDs 41-50] ---
  {
    id: 41,
    text: '¿Te emociona la idea de fundar tu propia empresa, crear una startup tecnológica o comercializar productos innovadores?',
    category: 'E',
    area: 'intereses'
  },
  {
    id: 42,
    text: '¿Tienes facilidad para hablar en público, convencer a un grupo sobre tus ideas y transmitir entusiasmo contagioso?',
    category: 'E',
    area: 'habilidades'
  },
  {
    id: 43,
    text: '¿Te consideras competitivo, enérgico, dispuesto a asumir riesgos calculados y tolerante ante la incertidumbre?',
    category: 'E',
    area: 'personalidad'
  },
  {
    id: 44,
    text: '¿Te atrae ocupar cargos gerenciales, dirigir equipos multidisciplinarios o negociar alianzas comerciales de alto nivel?',
    category: 'E',
    area: 'preferencias'
  },
  {
    id: 45,
    text: '¿Identificas con rapidez oportunidades de negocio y nichos de mercado donde otros solo ven problemas?',
    category: 'E',
    area: 'habilidades'
  },
  {
    id: 46,
    text: '¿Disfrutas vender productos, conseguir patrocinios para eventos o debatir estratégicamente en foros de liderazgo?',
    category: 'E',
    area: 'intereses'
  },
  {
    id: 47,
    text: '¿Prefieres asumir la responsabilidad de liderar un proyecto en vez de esperar pasivamente que otros te indiquen qué hacer?',
    category: 'E',
    area: 'personalidad'
  },
  {
    id: 48,
    text: '¿Te gustaría gestionar campañas de marketing masivo, finanzas de inversión o expansión internacional de marcas?',
    category: 'E',
    area: 'preferencias'
  },
  {
    id: 49,
    text: '¿Posees habilidad para motivar a personas desanimadas y guiarlas estratégicamente hacia metas ambiciosas?',
    category: 'E',
    area: 'habilidades'
  },
  {
    id: 50,
    text: '¿Te motiva el reconocimiento profesional, el estatus de liderazgo y la independencia financiera a través de tus proyectos?',
    category: 'E',
    area: 'personalidad'
  },

  // --- DIMENSIÓN C: CONVENCIONAL (Metódico, Organizado, Financiero, Preciso) [IDs 51-60] ---
  {
    id: 51,
    text: '¿Te resulta placentero clasificar información en hojas de cálculo, organizar bases de datos y elaborar presupuestos detallados?',
    category: 'C',
    area: 'intereses'
  },
  {
    id: 52,
    text: '¿Tienes facilidad para detectar de inmediato errores tipográficos, inconsistencias numéricas o fallas en contratos?',
    category: 'C',
    area: 'habilidades'
  },
  {
    id: 53,
    text: '¿Te sientes más tranquilo y productivo siguiendo cronogramas estructurados, procedimientos estandarizados y normas claras?',
    category: 'C',
    area: 'personalidad'
  },
  {
    id: 54,
    text: '¿Te atrae trabajar en firmas de auditoría contable, bancos, entidades de control fiscal, logística aduanera o aseguradoras?',
    category: 'C',
    area: 'preferencias'
  },
  {
    id: 55,
    text: '¿Posees disciplina para planificar agendas minuciosas, cumplir plazos de entrega sin fallar y archivar documentos con rigor?',
    category: 'C',
    area: 'habilidades'
  },
  {
    id: 56,
    text: '¿Disfrutas analizar balances contables, impuestos, estadísticas oficiales o registros de control de calidad?',
    category: 'C',
    area: 'intereses'
  },
  {
    id: 57,
    text: '¿Valoras la estabilidad laboral, la exactitud matemática y la lealtad a los protocolos por encima de la experimentación caótica?',
    category: 'C',
    area: 'personalidad'
  },
  {
    id: 58,
    text: '¿Te gustaría especializarte en ciberseguridad forense, gestión de cadenas de suministro globales o auditoría tributaria?',
    category: 'C',
    area: 'preferencias'
  },
  {
    id: 59,
    text: '¿Prefieres trabajar con reglamentos objetivos y métricas cuantificables antes que con criterios subjetivos o ambiguos?',
    category: 'C',
    area: 'habilidades'
  },
  {
    id: 60,
    text: '¿Te enorgullece que tus trabajos y proyectos destaquen por su pulcritud impecable, orden estructural y cero errores de forma?',
    category: 'C',
    area: 'personalidad'
  }
];

/**
 * Algoritmo inteligente de selección de preguntas:
 * - Evita repetir preguntas previamente respondidas por el usuario.
 * - Asegura una distribución rigurosa y equilibrada entre las 6 dimensiones RIASEC (R, I, A, S, E, C).
 * - Tamaño configurable por test (ej. 18 preguntas: 3 por dimensión; o 24 preguntas: 4 por dimensión).
 */
export function selectFreshQuestionsForUser(
  answeredQuestionIds: number[] = [],
  questionsPerDimension: number = 3
): Question[] {
  const categories: RiasecType[] = ['R', 'I', 'A', 'S', 'E', 'C'];
  const answeredSet = new Set(answeredQuestionIds);
  const selectedQuestions: Question[] = [];

  // Shuffle helper
  const shuffle = <T>(array: T[]): T[] => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  categories.forEach(category => {
    // All questions belonging to this category
    const categoryQuestions = VOCATIONAL_QUESTION_BANK.filter(q => q.category === category);
    
    // Questions NOT yet answered by this user
    const unAnsweredQuestions = categoryQuestions.filter(q => !answeredSet.has(q.id));

    let pickedForCategory: Question[] = [];

    if (unAnsweredQuestions.length >= questionsPerDimension) {
      // Pick randomly from the un-answered pool
      pickedForCategory = shuffle(unAnsweredQuestions).slice(0, questionsPerDimension);
    } else {
      // If the user has exhausted almost all questions, take the un-answered ones first,
      // and fill the remaining quota by picking least recently answered or shuffled from all
      const remainingQuota = questionsPerDimension - unAnsweredQuestions.length;
      const answeredPool = shuffle(categoryQuestions.filter(q => answeredSet.has(q.id)));
      pickedForCategory = [...unAnsweredQuestions, ...answeredPool.slice(0, remainingQuota)];
    }

    selectedQuestions.push(...pickedForCategory);
  });

  // Shuffle the final assembled questions across categories to provide a dynamic, natural experience
  return shuffle(selectedQuestions);
}
