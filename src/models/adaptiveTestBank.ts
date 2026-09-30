import { AgeStage, Question, RiasecType, TestCategoryId, TestDefinition } from '../types';

export interface TestCategoryInfo {
  id: TestCategoryId;
  title: string;
  iconName: 'Sparkles' | 'Brain' | 'UserCheck' | 'Briefcase' | 'BookOpen' | 'Compass' | 'GraduationCap' | 'RefreshCw';
  description: string;
  whatYouWillDiscover: string;
  whatWeWillExplore: string[];
  approxTime: string;
  badge: string;
  colorGradient: string;
  borderColor: string;
  availableTests: TestDefinition[];
}

export const TEST_CATEGORIES_DATA: TestCategoryInfo[] = [
  // 1. Intereses
  {
    id: 'intereses',
    title: 'Intereses',
    iconName: 'Sparkles',
    description: 'Test relacionados con las actividades, pasiones y temas que llaman tu atención.',
    whatYouWillDiscover: 'Qué actividades, áreas del conocimiento y temas cotidianos despiertan tu motivación genuina y cómo se conectan con el mundo laboral.',
    whatWeWillExplore: [
      'Actividades y pasatiempos que disfrutas hacer con entusiasmo',
      'Temas de conversación, lecturas o contenidos que capturan tu atención',
      'Proyectos creativos, científicos o comunitarios que te motivan',
      'Campos de estudio donde tu curiosidad natural florece'
    ],
    approxTime: '6 - 10 minutos',
    badge: 'Pasiones e Intereses',
    colorGradient: 'from-pink-500 to-rose-600',
    borderColor: 'border-pink-200',
    availableTests: [
      {
        id: 'test-intereses-actividades',
        name: 'Test de Actividades y Pasiones Diarias',
        categoryId: 'intereses',
        categoryName: 'Intereses',
        shortDescription: 'Descubre qué tipo de tareas, pasatiempos y proyectos disfrutas hacer de forma natural.',
        whatItIsFor: 'Ayuda a identificar qué actividades te recargan de energía y qué tareas disfrutas realizar sin sentir fatiga, conectándolas con perfiles ocupacionales.',
        approxTime: '7 - 9 minutos',
        questionCount: 12,
        difficulty: 'Fácil y Guiado',
        iconName: 'Sparkles',
        badge: 'Popular'
      },
      {
        id: 'test-intereses-temas',
        name: 'Test de Curiosidad y Temas Vocacionales',
        categoryId: 'intereses',
        categoryName: 'Intereses',
        shortDescription: 'Explora qué temas científicos, artísticos, sociales o tecnológicos te llaman más la atención.',
        whatItIsFor: 'Sirve para reconocer las áreas del conocimiento humano donde tienes mayor interés investigativo y ganas de aprender.',
        approxTime: '6 - 8 minutos',
        questionCount: 10,
        difficulty: 'Fácil y Guiado',
        iconName: 'Compass',
        badge: 'Inspirador'
      }
    ]
  },

  // 2. Habilidades y aptitudes
  {
    id: 'habilidades',
    title: 'Habilidades y aptitudes',
    iconName: 'Brain',
    description: 'Test para identificar capacidades y áreas en las que puedes destacar.',
    whatYouWillDiscover: 'Tus talentos naturales, destrezas prácticas, capacidades analíticas y áreas donde demuestras mayor facilidad de aprendizaje.',
    whatWeWillExplore: [
      'Facilidad para el razonamiento lógico, numérico o espacial',
      'Destrezas manuales, operativas y de precisión',
      'Habilidades de comunicación, empatía y trabajo con personas',
      'Capacidad para resolver problemas prácticos bajo diferentes situaciones'
    ],
    approxTime: '8 - 12 minutos',
    badge: 'Talentos y Aptitudes',
    colorGradient: 'from-purple-500 to-indigo-600',
    borderColor: 'border-purple-200',
    availableTests: [
      {
        id: 'test-habilidades-destacadas',
        name: 'Test de Capacidades y Talentos Destacados',
        categoryId: 'habilidades',
        categoryName: 'Habilidades y aptitudes',
        shortDescription: 'Reconoce en qué áreas tienes mayor facilidad innata y qué habilidades puedes potenciar.',
        whatItIsFor: 'Identifica tus talentos clave para que puedas elegir programas académicos donde tus fortalezas te permitan destacar y disfrutar el proceso formativo.',
        approxTime: '8 - 10 minutos',
        questionCount: 12,
        difficulty: 'Intermedio Reflexivo',
        iconName: 'Brain',
        badge: 'Autoconocimiento'
      },
      {
        id: 'test-habilidades-resolucion',
        name: 'Test de Resolución Práctica y Razonamiento',
        categoryId: 'habilidades',
        categoryName: 'Habilidades y aptitudes',
        shortDescription: 'Evalúa tu enfoque ante desafíos: pensamiento lógico, creatividad o destreza operativa.',
        whatItIsFor: 'Sirve para conocer cómo resuelves retos y qué tipo de herramientas o metodologías se adaptan mejor a tu mente.',
        approxTime: '7 - 9 minutos',
        questionCount: 10,
        difficulty: 'Accesible',
        iconName: 'Zap',
        badge: 'Práctico'
      }
    ]
  },

  // 3. Personalidad
  {
    id: 'personalidad',
    title: 'Personalidad',
    iconName: 'UserCheck',
    description: 'Test orientados a conocer características personales relacionadas con diferentes ambientes académicos y laborales.',
    whatYouWillDiscover: 'Cómo tu forma de ser, tus valores, tu estilo de comunicación y tus preferencias ambientales se adaptan a distintos tipos de trabajo.',
    whatWeWillExplore: [
      'Ambientes estructurados versus entornos dinámicos y flexibles',
      'Trabajo en equipo, liderazgo versus autonomía e investigación individual',
      'Preferencia por actividades al aire libre, laboratorios o estudios de diseño',
      'Manejo del cambio, adaptabilidad y valores vocacionales'
    ],
    approxTime: '7 - 10 minutos',
    badge: 'Ambientes y Estilo',
    colorGradient: 'from-blue-600 to-cyan-600',
    borderColor: 'border-blue-200',
    availableTests: [
      {
        id: 'test-personalidad-ambientes',
        name: 'Test de Ambientes Académicos y Laborales',
        categoryId: 'personalidad',
        categoryName: 'Personalidad',
        shortDescription: 'Descubre en qué entornos (oficina, laboratorio, naturaleza o estudio creativo) te sientes más cómodo.',
        whatItIsFor: 'Permite proyectar el ambiente de trabajo en el que te sentirás más feliz y productivo en tu vida profesional cotidiana.',
        approxTime: '7 - 9 minutos',
        questionCount: 12,
        difficulty: 'Fácil y Guiado',
        iconName: 'UserCheck',
        badge: 'Ambientes'
      },
      {
        id: 'test-personalidad-estilo',
        name: 'Test de Estilo Personal y Dinámica Colaborativa',
        categoryId: 'personalidad',
        categoryName: 'Personalidad',
        shortDescription: 'Conoce tu estilo de relacionamiento, liderazgo y toma de decisiones.',
        whatItIsFor: 'Sirve para reconocer si tu estilo tiende hacia la mediación, la coordinación estratégica, el apoyo humanitario o el trabajo técnico.',
        approxTime: '6 - 8 minutos',
        questionCount: 10,
        difficulty: 'Fácil y Guiado',
        iconName: 'HeartHandshake',
        badge: 'Relaciones'
      }
    ]
  },

  // 4. Áreas profesionales
  {
    id: 'areas-profesionales',
    title: 'Áreas profesionales',
    iconName: 'Briefcase',
    description: 'Test para explorar qué áreas profesionales y sectores ocupacionales pueden resultar interesantes para ti.',
    whatYouWillDiscover: 'Los grandes sectores del mundo productivo: salud, tecnología, negocios, artes, ciencias sociales, educación, diseño y servicios.',
    whatWeWillExplore: [
      'Sectores de vanguardia: inteligencia artificial, ciberseguridad y biotecnología',
      'Campos de impacto social: derecho, psicología, educación y justicia',
      'Industrias creativas: moda, audiovisuales, diseño gráfico y gastronomía',
      'Negocios, finanzas, comercio exterior y liderazgo empresarial'
    ],
    approxTime: '8 - 12 minutos',
    badge: 'Sectores y Mercado',
    colorGradient: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-200',
    availableTests: [
      {
        id: 'test-areas-sectores',
        name: 'Test de Sectores y Ramas Profesionales',
        categoryId: 'areas-profesionales',
        categoryName: 'Áreas profesionales',
        shortDescription: 'Compara ramas como ciencias de la salud, ingeniería, artes, economía y humanidades.',
        whatItIsFor: 'Te orienta hacia las familias de carreras que más conectan con tus aspiraciones del mundo laboral moderno.',
        approxTime: '8 - 10 minutos',
        questionCount: 12,
        difficulty: 'Intermedio',
        iconName: 'Briefcase',
        badge: 'Panorama Amplio'
      },
      {
        id: 'test-areas-impacto',
        name: 'Test de Vocación por Impacto e Innovación',
        categoryId: 'areas-profesionales',
        categoryName: 'Áreas profesionales',
        shortDescription: 'Identifica la huella que te gustaría dejar en el mundo: bienestar, innovación tecnológica o expresión cultural.',
        whatItIsFor: 'Sirve para alinear tus valores con profesiones con un fuerte sentido de propósito e impacto real.',
        approxTime: '6 - 8 minutos',
        questionCount: 10,
        difficulty: 'Accesible',
        iconName: 'Compass',
        badge: 'Propósito'
      }
    ]
  },

  // 5. Preferencias académicas
  {
    id: 'preferencias-academicas',
    title: 'Preferencias académicas',
    iconName: 'BookOpen',
    description: 'Test relacionados con la forma en que prefieres aprender, investigar y estudiar.',
    whatYouWillDiscover: 'Tu estilo de estudio preferido: si aprendes mejor practicando, leyendo, debatiendo o resolviendo casos reales.',
    whatWeWillExplore: [
      'Preferencia por metodologías teóricas versus talleres prácticos y laboratorios',
      'Duración ideal de estudios: programas técnicos, tecnológicos o profesionales',
      'Modalidad de estudio: presencial, virtual o modelos duales híbridos',
      'Ritmo de estudio y forma de estructurar tus proyectos académicos'
    ],
    approxTime: '6 - 9 minutos',
    badge: 'Estilo de Estudio',
    colorGradient: 'from-teal-500 to-emerald-600',
    borderColor: 'border-teal-200',
    availableTests: [
      {
        id: 'test-preferencias-aprendizaje',
        name: 'Test de Estilos y Métodos de Aprendizaje',
        categoryId: 'preferencias-academicas',
        categoryName: 'Preferencias académicas',
        shortDescription: 'Descubre si tu aprendizaje es visual, auditivo, kinestésico o basado en proyectos aplicados.',
        whatItIsFor: 'Te permite entender cómo absorbes mejor el conocimiento y qué tipos de planes de estudio universitarios te resultarán más fluidos.',
        approxTime: '7 - 9 minutos',
        questionCount: 10,
        difficulty: 'Fácil y Guiado',
        iconName: 'BookOpen',
        badge: 'Aprendizaje'
      },
      {
        id: 'test-preferencias-modalidad',
        name: 'Test de Modalidad y Enfoque de Estudio',
        categoryId: 'preferencias-academicas',
        categoryName: 'Preferencias académicas',
        shortDescription: 'Evalúa tu inclinación entre programas técnicos de rápida inserción versus carreras profesionales extensas.',
        whatItIsFor: 'Ayuda a planificar tu ruta educativa según tu tiempo disponible, metas económicas y estilo de vida.',
        approxTime: '6 - 8 minutos',
        questionCount: 10,
        difficulty: 'Accesible',
        iconName: 'GraduationCap',
        badge: 'Estrategia'
      }
    ]
  },

  // 6. Orientación vocacional
  {
    id: 'orientacion-vocacional',
    title: 'Orientación vocacional',
    iconName: 'Compass',
    description: 'Test que combinan diferentes aspectos para generar una orientación vocacional más general e integral.',
    whatYouWillDiscover: 'Una síntesis completa de tus 6 dimensiones psicométricas RIASEC (Realista, Investigador, Artístico, Social, Emprendedor y Convencional).',
    whatWeWillExplore: [
      'Perfil holístico John Holland (RIASEC) científicamente calibrado',
      'Compatibilidad porcentual con más de 1.100 carreras y programas oficiales',
      'Explicaciones pedagógicas personalizadas según tu rango de edad',
      'Recomendaciones de universidades, semestres oficiales y opciones de becas'
    ],
    approxTime: '8 - 14 minutos',
    badge: 'Integral y Completo',
    colorGradient: 'from-purple-600 via-pink-600 to-indigo-600',
    borderColor: 'border-purple-300',
    availableTests: [
      {
        id: 'test-riasec-integral',
        name: 'Test Vocacional Integral RIASEC (John Holland)',
        categoryId: 'orientacion-vocacional',
        categoryName: 'Orientación vocacional',
        shortDescription: 'La evaluación vocacional más completa y validada científicamente en el mundo.',
        whatItIsFor: 'Mide de forma equilibrada tus 6 rasgos vocacionales para conectarte con un abanico diverso de carreras profesionales afines.',
        approxTime: '10 - 14 minutos (sin límite de tiempo)',
        questionCount: 18,
        difficulty: 'Completo y Estructurado',
        iconName: 'Compass',
        badge: 'Recomendado Oficial'
      },
      {
        id: 'test-vocacional-esencial',
        name: 'Test Vocacional Esencial Rápido',
        categoryId: 'orientacion-vocacional',
        categoryName: 'Orientación vocacional',
        shortDescription: 'Una versión ágil y directa para cuando tienes poco tiempo pero quieres un diagnóstico confiable.',
        whatItIsFor: 'Proporciona una primera brújula vocacional rápida basada en preguntas clave de alta correlación psicométrica.',
        approxTime: '5 - 7 minutos',
        questionCount: 12,
        difficulty: 'Rápido y Dinámico',
        iconName: 'Zap',
        badge: 'Express'
      }
    ]
  }
];

// Metadatos de los 4 rangos de edad solicitados por el usuario
export const AGE_STAGES_INFO: Record<AgeStage, {
  name: string;
  ageRange: string;
  focus: string;
  tone: string;
  description: string;
}> = {
  '13-15': {
    name: 'Exploración Vocacional Temprana',
    ageRange: '13 a 15 años',
    focus: 'Curiosidades, asignaturas escolares favoritas, talentos naturales y pasatiempos',
    tone: 'Cercano, motivador, accesible y libre de presiones',
    description: 'Preguntas con lenguaje sencillo y ejemplos cotidianos. Diseñado para descubrir gustos sin obligar a elegir una profesión definitiva.'
  },
  '16-17': {
    name: 'Decisión Preuniversitaria y Bachillerato',
    ageRange: '16 a 17 años',
    focus: 'Transición a la educación superior, áreas de carrera, pruebas ICFES y opciones formativas',
    tone: 'Orientador, dinámico, formativo y claro',
    description: 'Ayuda a vincular tus materias favoritas y aptitudes con planes de estudio universitarios, tecnológicos y carreras profesionales.'
  },
  '18-21': {
    name: 'Educación Superior y Primer Empleo',
    ageRange: '18 a 21 años',
    focus: 'Programas de pregrado, carreras técnicas/tecnológicas, empleabilidad y proyección práctica',
    tone: 'Práctico, analítico y profesional',
    description: 'Profundiza en competencias laborales, campos ocupacionales, retorno de inversión y ambientes reales de trabajo.'
  },
  '22+': {
    name: 'Reorientación y Crecimiento Profesional',
    ageRange: '22 años en adelante',
    focus: 'Habilidades transferibles, reconversión laboral, actualización profesional y nuevas metas de vida',
    tone: 'Estratégico, maduro y transformador',
    description: 'Enfocado en aprovechar tu experiencia previa, identificar nuevas pasiones y explorar programas con flexibilidad horaria.'
  },
  // Alias de compatibilidad
  infancia: {
    name: 'Exploración Vocacional Temprana',
    ageRange: '13 a 15 años',
    focus: 'Curiosidades, asignaturas escolares favoritas, talentos naturales y pasatiempos',
    tone: 'Cercano, motivador, accesible y libre de presiones',
    description: 'Preguntas con lenguaje sencillo y ejemplos cotidianos.'
  },
  adolescencia: {
    name: 'Decisión Preuniversitaria y Bachillerato',
    ageRange: '16 a 17 años',
    focus: 'Transición a la educación superior y opciones de carrera',
    tone: 'Orientador, dinámico y formativo',
    description: 'Ayuda a vincular tus intereses con opciones de estudio.'
  },
  juventud: {
    name: 'Educación Superior y Primer Empleo',
    ageRange: '18 a 21 años',
    focus: 'Programas de pregrado y empleabilidad',
    tone: 'Práctico y profesional',
    description: 'Profundiza en competencias y opciones laborales.'
  },
  adultez: {
    name: 'Reorientación y Crecimiento Profesional',
    ageRange: '22 años en adelante',
    focus: 'Habilidades transferibles y cambio de carrera',
    tone: 'Estratégico y maduro',
    description: 'Enfocado en reconversión y crecimiento profesional.'
  }
};

/**
 * Banco de preguntas adaptadas por etapa de edad y categoría de test
 */
export const ADAPTIVE_QUESTIONS_BY_STAGE: Record<string, Record<string, Question[]>> = {
  // -------------------------------------------------------------
  // 1. RANGO 13–15 AÑOS (Exploración Temprana)
  // -------------------------------------------------------------
  '13-15': {
    intereses: [
      { id: 101, text: '¿Te gusta construir cosas con tus manos, desarmar aparatos o armar modelos y maquetas?', category: 'R', area: 'intereses', topic: 'construcción manual' },
      { id: 102, text: '¿Te gusta investigar en internet por qué ocurren los fenómenos naturales, el clima o el espacio?', category: 'I', area: 'intereses', topic: 'curiosidad científica' },
      { id: 103, text: '¿Disfrutas dibujar, tomar fotografías, editar videos para redes o inventar historias?', category: 'A', area: 'intereses', topic: 'creatividad visual' },
      { id: 104, text: '¿Te agrada ayudar a tus compañeros de colegio cuando no entienden una tarea o escuchar a tus amigos?', category: 'S', area: 'intereses', topic: 'solidaridad' },
      { id: 105, text: '¿Te entusiasma organizar actividades con tus amigos, proponer ideas y ser el líder del grupo?', category: 'E', area: 'intereses', topic: 'liderazgo juvenil' },
      { id: 106, text: '¿Prefieres tener tus cuadernos, apuntes y cosas personales organizadas de forma limpia y ordenada?', category: 'C', area: 'intereses', topic: 'orden y método' },
      { id: 107, text: '¿Te divierte aprender a programar bloques, crear mundos en videojuegos o manejar tecnología?', category: 'R', area: 'intereses', topic: 'tecnología práctica' },
      { id: 108, text: '¿Te llama la atención leer sobre experimentos biológicos, animales o cómo funciona el cuerpo humano?', category: 'I', area: 'intereses', topic: 'ciencias de la vida' },
      { id: 109, text: '¿Disfrutas tocar un instrumento musical, cantar o crear listas de música con estilos variados?', category: 'A', area: 'intereses', topic: 'música y ritmo' },
      { id: 110, text: '¿Te interesa participar en campañas para cuidar el medio ambiente o los animales de tu comunidad?', category: 'S', area: 'intereses', topic: 'impacto comunitario' },
      { id: 111, text: '¿Te gusta idear pequeños emprendimientos, como vender manualidades o cosas que creas tú mismo?', category: 'E', area: 'intereses', topic: 'iniciativa emprendedora' },
      { id: 112, text: '¿Disfrutas clasificar información, armar calendarios o coleccionar cosas con un criterio específico?', category: 'C', area: 'intereses', topic: 'clasificación y detalle' }
    ],
    habilidades: [
      { id: 121, text: '¿Se te facilita arreglar cosas rotas o aprender a manejar herramientas manuales rápidamente?', category: 'R', area: 'habilidades', topic: 'destreza manual' },
      { id: 122, text: '¿Tienes facilidad para entender acertijos lógicos, rompecabezas numéricos y operaciones matemáticas?', category: 'I', area: 'habilidades', topic: 'lógica' },
      { id: 123, text: '¿Tienes facilidad para combinar colores, crear diseños visualmente atractivos o escribir con estilo propio?', category: 'A', area: 'habilidades', topic: 'expresión artística' },
      { id: 124, text: '¿Se te da bien explicarle temas a otras personas con paciencia y claridad?', category: 'S', area: 'habilidades', topic: 'enseñanza' },
      { id: 125, text: '¿Tienes habilidad para convencer a los demás de apoyar tus ideas o resolver diferencias hablando?', category: 'E', area: 'habilidades', topic: 'persuasión' },
      { id: 126, text: '¿Eres muy atento a los detalles pequeños que otros suelen pasar por alto?', category: 'C', area: 'habilidades', topic: 'atención al detalle' },
      { id: 127, text: '¿Aprendes mejor haciendo las cosas en la práctica que leyendo solo teoría?', category: 'R', area: 'habilidades', topic: 'aprendizaje práctico' },
      { id: 128, text: '¿Te gusta buscar información a fondo hasta encontrar la respuesta exacta a una duda?', category: 'I', area: 'habilidades', topic: 'investigación profunda' },
      { id: 129, text: '¿Tienes buena memoria visual para recordar rostros, lugares y esquemas gráficos?', category: 'A', area: 'habilidades', topic: 'memoria visual' },
      { id: 130, text: '¿Notas con rapidez cuando un amigo o familiar se siente triste o preocupado?', category: 'S', area: 'habilidades', topic: 'empatía activa' },
      { id: 131, text: '¿Se te ocurren ideas rápidas para resolver imprevistos cuando algo sale mal?', category: 'E', area: 'habilidades', topic: 'iniciativa' },
      { id: 132, text: '¿Llevas un control claro de tus tareas y entregas tus trabajos a tiempo?', category: 'C', area: 'habilidades', topic: 'responsabilidad' }
    ],
    personalidad: [
      { id: 141, text: '¿Prefieres pasar tu tiempo en espacios al aire libre o en talleres antes que estar todo el día sentado?', category: 'R', area: 'personalidad', topic: 'ambientes dinámicos' },
      { id: 142, text: '¿Eres una persona curiosa a la que le gusta hacer preguntas constantes sobre cómo funciona todo?', category: 'I', area: 'personalidad', topic: 'mente inquisitiva' },
      { id: 143, text: '¿Valoras la originalidad y prefieres hacer las cosas a tu manera antes que seguir reglas rígidas?', category: 'A', area: 'personalidad', topic: 'independencia creativa' },
      { id: 144, text: '¿Te consideras una persona afectuosa, empática y comprensiva con los sentimientos ajenos?', category: 'S', area: 'personalidad', topic: 'calidez humana' },
      { id: 145, text: '¿Te gusta asumir retos, competir de forma sana y motivar a tu equipo hacia la meta?', category: 'E', area: 'personalidad', topic: 'competitividad constructiva' },
      { id: 146, text: '¿Prefieres tener rutinas claras y saber con anticipación qué debes hacer cada día?', category: 'C', area: 'personalidad', topic: 'estructura y previsibilidad' },
      { id: 147, text: '¿Disfrutas ver resultados rápidos y tangibles de lo que haces con tus manos?', category: 'R', area: 'personalidad', topic: 'resultados concretos' },
      { id: 148, text: '¿Te gusta pensar con calma antes de tomar una decisión en lugar de actuar por impulso?', category: 'I', area: 'personalidad', topic: 'reflexión analítica' },
      { id: 149, text: '¿Te sientes inspirado por la belleza de las artes, la moda, la música o el cine?', category: 'A', area: 'personalidad', topic: 'sensibilidad estética' },
      { id: 150, text: '¿Prefieres trabajar colaborando en equipo antes que trabajar totalmente aislado?', category: 'S', area: 'personalidad', topic: 'colaboración' },
      { id: 151, text: '¿Te sientes seguro dando tu opinión frente a tu salón de clase o grupo de amigos?', category: 'E', area: 'personalidad', topic: 'confianza personal' },
      { id: 152, text: '¿Valoras la puntualidad, la precisión y la exactitud en tus compromisos?', category: 'C', area: 'personalidad', topic: 'meticulosidad' }
    ],
    'areas-profesionales': [
      { id: 161, text: '¿Te gustaría trabajar con maquinaria, robots, vehículos, construcción o tecnología tangible?', category: 'R', area: 'intereses', topic: 'área técnica' },
      { id: 162, text: '¿Te atraen profesiones en laboratorios científicos, medicina, astronomía o biotecnología?', category: 'I', area: 'intereses', topic: 'área científica' },
      { id: 163, text: '¿Te atraen profesiones del mundo del diseño, animación, publicidad, moda o arquitectura?', category: 'A', area: 'intereses', topic: 'área creativa' },
      { id: 164, text: '¿Te gustaría dedicarte a profesiones de ayuda, como salud, psicología, enfermería o pedagogía?', category: 'S', area: 'intereses', topic: 'área de bienestar' },
      { id: 165, text: '¿Te atrae el mundo de los negocios, el mercadeo, las finanzas o dirigir una empresa propia?', category: 'E', area: 'intereses', topic: 'área empresarial' },
      { id: 166, text: '¿Te gustaría trabajar administrando sistemas de información, contabilidad, leyes o logística?', category: 'C', area: 'intereses', topic: 'área administrativa' },
      { id: 167, text: '¿Te despierta interés conocer cómo se crean las aplicaciones de celular y los videojuegos?', category: 'I', area: 'intereses', topic: 'tecnología' },
      { id: 168, text: '¿Te gustaría crear ropa, accesorios o espacios decorados con estilo único?', category: 'A', area: 'intereses', topic: 'diseño y estilo' },
      { id: 169, text: '¿Te motiva la idea de defender los derechos de las personas o resolver problemas sociales?', category: 'S', area: 'intereses', topic: 'justicia social' },
      { id: 170, text: '¿Te gustaría planificar presupuestos, ahorrar e invertir en proyectos rentables?', category: 'C', area: 'intereses', topic: 'finanzas' },
      { id: 171, text: '¿Te llama la atención el sector de la gastronomía, la hotelería o el turismo?', category: 'R', area: 'intereses', topic: 'servicios y turismo' },
      { id: 172, text: '¿Te entusiasma liderar campañas de impacto positivo en redes sociales o medios de comunicación?', category: 'E', area: 'intereses', topic: 'comunicación' }
    ],
    'preferencias-academicas': [
      { id: 181, text: '¿Aprendes mejor cuando haces prácticas de laboratorio o talleres que cuando solo lees textos?', category: 'R', area: 'preferencias', topic: 'práctica' },
      { id: 182, text: '¿Te gusta profundizar leyendo varios libros o artículos hasta resolver una duda a fondo?', category: 'I', area: 'preferencias', topic: 'estudio teórico' },
      { id: 183, text: '¿Prefieres proyectos escolares libres donde puedas usar tu imaginación y diseño?', category: 'A', area: 'preferencias', topic: 'creatividad escolar' },
      { id: 184, text: '¿Te rinde más estudiar en grupo dialogando y explicándose mutuamente?', category: 'S', area: 'preferencias', topic: 'estudio colaborativo' },
      { id: 185, text: '¿Te motivan los retos académicos que incluyen exposiciones orales o debates en clase?', category: 'E', area: 'preferencias', topic: 'oratoria' },
      { id: 186, text: '¿Prefieres seguir una guía clara paso a paso con rúbricas detalladas para saber exactamente qué hacer?', category: 'C', area: 'preferencias', topic: 'guías estructuradas' },
      { id: 187, text: '¿Te gustaría estudiar programas con alta carga práctica y salidas pedagógicas?', category: 'R', area: 'preferencias', topic: 'trabajo de campo' },
      { id: 188, text: '¿Disfrutas resolver problemas que requieren concentrarse en silencio durante un buen rato?', category: 'I', area: 'preferencias', topic: 'concentración' },
      { id: 189, text: '¿Prefieres presentar tus trabajos mediante videos, maquetas o infografías ilustradas?', category: 'A', area: 'preferencias', topic: 'formatos visuales' },
      { id: 190, text: '¿Te ayuda hacer esquemas, listas de verificación y resúmenes para preparar tus exámenes?', category: 'C', area: 'preferencias', topic: 'esquemas' }
    ],
    'orientacion-vocacional': [
      { id: 191, text: '¿Disfrutas armar o desarmar objetos, reparar cosas o trabajar con herramientas?', category: 'R', area: 'intereses', topic: 'práctica' },
      { id: 192, text: '¿Te apasiona descubrir cómo funcionan las leyes científicas de la naturaleza o la computación?', category: 'I', area: 'intereses', topic: 'ciencia' },
      { id: 193, text: '¿Expresas tus ideas con facilidad a través de dibujos, historias, música o creaciones artísticas?', category: 'A', area: 'habilidades', topic: 'creatividad' },
      { id: 194, text: '¿Te sientes feliz apoyando a otras personas, enseñándoles o escuchando lo que sienten?', category: 'S', area: 'habilidades', topic: 'empatía' },
      { id: 195, text: '¿Te gusta convencer a otros, proponer iniciativas y organizar eventos escolares?', category: 'E', area: 'habilidades', topic: 'iniciativa' },
      { id: 196, text: '¿Eres metódico, cuidas el orden de tus cosas y te gustan las reglas claras?', category: 'C', area: 'personalidad', topic: 'orden' },
      { id: 197, text: '¿Te gustaría tener una profesión donde pases buena parte del tiempo en movimiento o al aire libre?', category: 'R', area: 'preferencias', topic: 'movimiento' },
      { id: 198, text: '¿Te gusta analizar causas y consecuencias antes de creer en una información que viste en internet?', category: 'I', area: 'habilidades', topic: 'pensamiento crítico' },
      { id: 199, text: '¿Te llama la atención el mundo del diseño, la moda, el cine o la producción de contenidos?', category: 'A', area: 'intereses', topic: 'medios creativos' },
      { id: 200, text: '¿Te motiva la idea de trabajar en hospitales, centros de salud o colegios para cuidar el bienestar ajeno?', category: 'S', area: 'intereses', topic: 'salud y cuidado' },
      { id: 201, text: '¿Sueñas con crear tu propia marca, producto o negocio en el futuro?', category: 'E', area: 'intereses', topic: 'negocios' },
      { id: 202, text: '¿Se te facilita organizar datos numéricos, tablas o presupuestos de gastos?', category: 'C', area: 'habilidades', topic: 'control' },
      { id: 203, text: '¿Te gustaría que tu trabajo tuviera herramientas mecánicas, electrónicas o de precisión física?', category: 'R', area: 'intereses', topic: 'herramientas' },
      { id: 204, text: '¿Te atrae la investigación científica en biología, química, física o astronomía?', category: 'I', area: 'intereses', topic: 'investigación' },
      { id: 205, text: '¿Dedicas tiempo voluntario a dibujar, escribir poesía, tocar música o practicar teatro?', category: 'A', area: 'intereses', topic: 'arte' },
      { id: 206, text: '¿Te indigna la injusticia y te gustaría colaborar en causas sociales para mejorar tu entorno?', category: 'S', area: 'intereses', topic: 'comunidad' },
      { id: 207, text: '¿Te gusta negociar acuerdos donde todas las partes salgan ganando?', category: 'E', area: 'habilidades', topic: 'negociación' },
      { id: 208, text: '¿Revisas con cuidado tus tareas para corregir faltas de ortografía o errores de cálculo?', category: 'C', area: 'habilidades', topic: 'revisión' }
    ]
  },

  // -------------------------------------------------------------
  // 2. RANGO 16–17 AÑOS (Decisión Preuniversitaria / Bachillerato)
  // -------------------------------------------------------------
  '16-17': {
    intereses: [
      { id: 211, text: '¿Te interesan los sistemas mecánicos, electrónicos, robótica, redes informáticas o diseño estructural?', category: 'R', area: 'intereses', topic: 'ingeniería y técnica' },
      { id: 212, text: '¿Te apasiona comprender el funcionamiento celular, la genética, la neurociencia o las matemáticas avanzadas?', category: 'I', area: 'intereses', topic: 'ciencias puras' },
      { id: 213, text: '¿Te atrae la creación estética en diseño de modas, arquitectura, artes visuales, fotografía o cine?', category: 'A', area: 'intereses', topic: 'diseño y artes' },
      { id: 214, text: '¿Te motiva la salud comunitaria, la psicología, la rehabilitación física o el trabajo humanitario?', category: 'S', area: 'intereses', topic: 'ciencias de la salud' },
      { id: 215, text: '¿Te llaman la atención las finanzas, el comercio internacional, el marketing digital y la gestión de proyectos?', category: 'E', area: 'intereses', topic: 'negocios internacionales' },
      { id: 216, text: '¿Te atrae el análisis de datos, la contabilidad tributaria, la ciberseguridad o el cumplimiento de normativas legales?', category: 'C', area: 'intereses', topic: 'gestión y datos' },
      { id: 217, text: '¿Te llama la atención el sector agropecuario, ambiental, la ingeniería forestal o las energías limpias?', category: 'R', area: 'intereses', topic: 'sostenibilidad y campo' },
      { id: 218, text: '¿Disfrutas formular hipótesis, contrastar fuentes académicas y validar teorías con datos reales?', category: 'I', area: 'intereses', topic: 'método científico' },
      { id: 219, text: '¿Te gustaría conceptualizar campañas publicitarias, marcas o proyectos de animación 3D?', category: 'A', area: 'intereses', topic: 'narrativa y animación' },
      { id: 220, text: '¿Te interesan los derechos humanos, la resolución de conflictos comunitarios y el derecho constitucional?', category: 'S', area: 'intereses', topic: 'justicia y sociedad' },
      { id: 221, text: '¿Te ves liderando negociaciones de alto nivel, motivando equipos multidisciplinarios y creando valor económico?', category: 'E', area: 'intereses', topic: 'liderazgo corporativo' },
      { id: 222, text: '¿Valoras la optimización de procesos, la logística de cadenas de suministro y el control de calidad?', category: 'C', area: 'intereses', topic: 'optimización' }
    ],
    habilidades: [
      { id: 231, text: '¿Posees facilidad para interpretar planos, diagramas técnicos y operar software o maquinaria especializada?', category: 'R', area: 'habilidades', topic: 'destreza técnica' },
      { id: 232, text: '¿Tienes destreza para el pensamiento abstracto, modelado matemático y análisis cuantitativo de problemas?', category: 'I', area: 'habilidades', topic: 'razonamiento matemático' },
      { id: 233, text: '¿Destacas por tu pensamiento lateral, diseño compositivo y capacidad para generar propuestas visuales novedosas?', category: 'A', area: 'habilidades', topic: 'innovación creativa' },
      { id: 234, text: '¿Posees empatía activa, capacidad de escucha reflexiva y comunicación pedagógica asertiva?', category: 'S', area: 'habilidades', topic: 'comunicación interpersonal' },
      { id: 235, text: '¿Demuestras elocuencia verbal, habilidad negociadora y visión estratégica para tomar decisiones oportunas?', category: 'E', area: 'habilidades', topic: 'estrategia' },
      { id: 236, text: '¿Tienes alta precisión en el registro de información, auditoría de documentos y seguimiento meticuloso de protocolos?', category: 'C', area: 'habilidades', topic: 'rigor metodológico' },
      { id: 237, text: '¿Solucionas con soltura fallas técnicas en equipos, software o infraestructura mediante ensayo estructurado?', category: 'R', area: 'habilidades', topic: 'solución técnica' },
      { id: 238, text: '¿Sueles identificar patrones y correlaciones estadísticas en conjuntos complejos de datos?', category: 'I', area: 'habilidades', topic: 'analítica' },
      { id: 239, text: '¿Dominas herramientas de edición gráfica, ilustración digital o producción audiovisual?', category: 'A', area: 'habilidades', topic: 'herramientas digitales' },
      { id: 240, text: '¿Sabes desescalar situaciones tensas entre personas y propiciar consensos equilibrados?', category: 'S', area: 'habilidades', topic: 'mediación' },
      { id: 241, text: '¿Inspiras confianza en otros cuando expones proyectos o presentas soluciones a un jurado?', category: 'E', area: 'habilidades', topic: 'oratoria persuasiva' },
      { id: 242, text: '¿Eres metódico para estructurar cronogramas de estudio y cumplir metas sin dispersarte?', category: 'C', area: 'habilidades', topic: 'autodisciplina' }
    ],
    personalidad: [
      { id: 251, text: '¿Prefieres roles profesionales con trabajo práctico en campo, obras o talleres frente a labores sedentarias?', category: 'R', area: 'personalidad', topic: 'entornos prácticos' },
      { id: 252, text: '¿Te caracteriza el escepticismo constructivo y la necesidad de verificar datos con evidencias empíricas?', category: 'I', area: 'personalidad', topic: 'rigor crítico' },
      { id: 253, text: '¿Te defines como una persona no convencional, que busca romper moldes a través de la expresión artística?', category: 'A', area: 'personalidad', topic: 'originalidad' },
      { id: 254, text: '¿Sientes un compromiso vocacional por transformar la calidad de vida de poblaciones vulnerables?', category: 'S', area: 'personalidad', topic: 'sensibilidad social' },
      { id: 255, text: '¿Tienes tolerancia al riesgo calculado, gusto por la persuasión y pasión por los retos de alto impacto?', category: 'E', area: 'personalidad', topic: 'audacia' },
      { id: 256, text: '¿Encuentras satisfacción en la exactitud, el orden sistemático y la estabilidad operativa?', category: 'C', area: 'personalidad', topic: 'orden' },
      { id: 257, text: '¿Te adaptas con facilidad a entornos cambiantes cuando se trata de ejecutar soluciones sobre la marcha?', category: 'R', area: 'personalidad', topic: 'resiliencia práctica' },
      { id: 258, text: '¿Disfrutas de periodos prolongados de estudio e investigación individual y profunda?', category: 'I', area: 'personalidad', topic: 'autonomía investigativa' },
      { id: 259, text: '¿Te interesa que tu entorno laboral cuente con una estética cuidada, inspiradora y estimulante?', category: 'A', area: 'personalidad', topic: 'estética' },
      { id: 260, text: '¿Prefieres organizaciones con cultura colaborativa y horizontal frente a ambientes estrictamente jerárquicos?', category: 'S', area: 'personalidad', topic: 'horizontalidad' },
      { id: 261, text: '¿Te motiva la meritocracia, el crecimiento profesional acelerado y el reconocimiento a tus logros?', category: 'E', area: 'personalidad', topic: 'orientación al logro' },
      { id: 262, text: '¿Prefieres trabajar sobre lineamientos normativos claros antes que en la total ambigüedad?', category: 'C', area: 'personalidad', topic: 'normativa' }
    ],
    'areas-profesionales': [
      { id: 271, text: '¿Te visualizas en ingeniería civil, ambiental, de sistemas, mecatrónica, industrial o química?', category: 'R', area: 'intereses', topic: 'ingenierías' },
      { id: 272, text: '¿Te proyectas en medicina, odontología, bacteriología, nutrición, enfermería o fisioterapia?', category: 'I', area: 'intereses', topic: 'salud y bio' },
      { id: 273, text: '¿Te atrae el diseño de modas, arquitectura, artes visuales, producción audiovisual o publicidad?', category: 'A', area: 'intereses', topic: 'industrias creativas' },
      { id: 274, text: '¿Te visualizas en derecho, criminología, sociología, psicología, trabajo social o licenciaturas?', category: 'S', area: 'intereses', topic: 'ciencias sociales' },
      { id: 275, text: '¿Te visualizas en administración de empresas, finanzas, economía, comercio internacional o mercadeo?', category: 'E', area: 'intereses', topic: 'economía y negocios' },
      { id: 276, text: '¿Te visualizas en contaduría pública, estadística, ciencia de datos, ciberseguridad o archivística?', category: 'C', area: 'intereses', topic: 'datos y control' },
      { id: 277, text: '¿Te llama la atención el sector de la gastronomía profesional, hotelería y turismo ecológico?', category: 'R', area: 'intereses', topic: 'gastronomía y turismo' },
      { id: 278, text: '¿Te atrae la investigación científica pura en física teórica, química analítica, biología o astronomía?', category: 'I', area: 'intereses', topic: 'ciencias exactas' },
      { id: 279, text: '¿Te interesa el campo del diseño de interiores, paisajismo o diseño de experiencia digital (UX/UI)?', category: 'A', area: 'intereses', topic: 'diseño digital' },
      { id: 280, text: '¿Te proyectas en la docencia universitaria, la pedagogía infantil o la formulación de políticas públicas educativas?', category: 'S', area: 'intereses', topic: 'educación' },
      { id: 281, text: '¿Te atrae la gestión empresarial de startups tecnológicas con inversión internacional?', category: 'E', area: 'intereses', topic: 'startups' },
      { id: 282, text: '¿Te llama la atención la auditoría forense financiera y la verificación de calidad en multinacionales?', category: 'C', area: 'intereses', topic: 'auditoría' }
    ],
    'preferencias-academicas': [
      { id: 291, text: '¿Valoras que tu carrera incluya laboratorios semanales, prácticas hospitalarias o talleres de fabricación?', category: 'R', area: 'preferencias', topic: 'prácticas formativas' },
      { id: 292, text: '¿Prefieres semilleros de investigación, lectura de papers científicos y redacción de artículos?', category: 'I', area: 'preferencias', topic: 'investigación académica' },
      { id: 293, text: '¿Prefieres asignaturas basadas en portafolios, presentaciones creativas y proyectos conceptuales?', category: 'A', area: 'preferencias', topic: 'portafolios' },
      { id: 294, text: '¿Te motivan los estudios de caso humano, debates éticos y trabajo comunitario de campo?', category: 'S', area: 'preferencias', topic: 'casos humanos' },
      { id: 295, text: '¿Prefieres simulaciones de negocios, presentaciones ejecutivas y defensas de modelos comerciales?', category: 'E', area: 'preferencias', topic: 'simulaciones ejecutivas' },
      { id: 296, text: '¿Prefieres programas con programas académicos rigurosos, claros en evaluación y con alta estructura metodológica?', category: 'C', area: 'preferencias', topic: 'rigor curricular' },
      { id: 297, text: '¿Considerarías iniciar con una tecnología o ciclo técnico que te permita ingresar pronto al mercado laboral y luego homologar a profesional?', category: 'R', area: 'preferencias', topic: 'ciclos propedéuticos' },
      { id: 298, text: '¿Te interesa explorar la posibilidad de intercambios académicos internacionales o doble titulación?', category: 'I', area: 'preferencias', topic: 'internacionalización' },
      { id: 299, text: '¿Prefieres una universidad con campus verde y talleres especializados o plataformas virtuales flexibles?', category: 'A', area: 'preferencias', topic: 'infraestructura' },
      { id: 300, text: '¿Valoras que el plan de estudios incluya certificaciones internacionales adicionales?', category: 'C', area: 'preferencias', topic: 'certificaciones' }
    ],
    'orientacion-vocacional': [
      { id: 301, text: '¿Disfrutas resolver problemas prácticos con máquinas, circuitos, construcción o herramientas mecánicas?', category: 'R', area: 'intereses', topic: 'tecnología práctica' },
      { id: 302, text: '¿Te apasiona investigar el porqué de las cosas, recopilar datos y resolver problemas científicos complejos?', category: 'I', area: 'intereses', topic: 'investigación' },
      { id: 303, text: '¿Te sientes motivado por el diseño, la composición estética, la expresión gráfica o la producción audiovisual?', category: 'A', area: 'habilidades', topic: 'creatividad' },
      { id: 304, text: '¿Tienes vocación de servicio para enseñar, escuchar, brindar terapia o cuidar la salud de personas?', category: 'S', area: 'habilidades', topic: 'servicio humano' },
      { id: 305, text: '¿Te entusiasma liderar equipos, negociar acuerdos, tomar riesgos calculados y crear negocios?', category: 'E', area: 'habilidades', topic: 'emprendimiento' },
      { id: 306, text: '¿Tienes facilidad para organizar bases de datos, llevar contabilidades precisas y auditar detalles?', category: 'C', area: 'habilidades', topic: 'análisis cuantitativo' },
      { id: 307, text: '¿Prefieres labores con resultados físicos y tangibles frente a roles netamente teóricos?', category: 'R', area: 'personalidad', topic: 'tangibilidad' },
      { id: 308, text: '¿Te gusta examinar evidencias antes de aceptar una conclusión como válida?', category: 'I', area: 'personalidad', topic: 'pensamiento analítico' },
      { id: 309, text: '¿Valoras la libertad de criterio y la posibilidad de expresar tu sello personal en lo que creas?', category: 'A', area: 'personalidad', topic: 'autenticidad' },
      { id: 310, text: '¿Consideras fundamental que tu trabajo contribuya al bienestar colectivo y a la justicia social?', category: 'S', area: 'personalidad', topic: 'impacto colectivo' },
      { id: 311, text: '¿Te visualizas asumiendo la dirección de proyectos y guiando a otros hacia el cumplimiento de metas?', category: 'E', area: 'personalidad', topic: 'visión de liderazgo' },
      { id: 312, text: '¿Eres sistemático para seguir normativas, políticas y estándares de calidad?', category: 'C', area: 'personalidad', topic: 'cumplimiento' },
      { id: 313, text: '¿Te llaman la atención las ingenierías que optimizan procesos productivos o infraestructuras físicas?', category: 'R', area: 'intereses', topic: 'procesos' },
      { id: 314, text: '¿Te atrae el avance de la inteligencia artificial, la ciencia de datos o el modelado biológico?', category: 'I', area: 'intereses', topic: 'vanguardia científica' },
      { id: 315, text: '¿Te entusiasma la idea de crear piezas visuales, prendas de moda o arquitectura con identidad?', category: 'A', area: 'intereses', topic: 'diseño' },
      { id: 316, text: '¿Te interesa comprender el comportamiento de la mente humana, las relaciones sociales y la cultura?', category: 'S', area: 'intereses', topic: 'humanidades' },
      { id: 317, text: '¿Te interesa cómo funcionan los mercados, el comercio electrónico y la inversión de capital?', category: 'E', area: 'intereses', topic: 'mercados' },
      { id: 318, text: '¿Prefieres sistemas administrativos claros con responsabilidades bien delimitadas?', category: 'C', area: 'intereses', topic: 'estructura' }
    ]
  },

  // -------------------------------------------------------------
  // 3. RANGO 18–21 AÑOS (Educación Superior / Jóvenes Adultos)
  // -------------------------------------------------------------
  '18-21': {
    intereses: [
      { id: 401, text: '¿Te interesa especializarte en desarrollo de software, robótica industrial, telecomunicaciones o energías renovables?', category: 'R', area: 'intereses', topic: 'tecnología aplicada' },
      { id: 402, text: '¿Te motiva la investigación aplicada en biotecnología, epidemiología, farmacología o ciencia de datos?', category: 'I', area: 'intereses', topic: 'investigación aplicada' },
      { id: 403, text: '¿Te atrae la dirección creativa en diseño UI/UX, animación digital, producción cinematográfica o arquitectura bioclimática?', category: 'A', area: 'intereses', topic: 'dirección de arte' },
      { id: 404, text: '¿Te orientas hacia la psicología clínica, fonoaudiología, terapia ocupacional, docencia o derecho social?', category: 'S', area: 'intereses', topic: 'salud y bienestar' },
      { id: 405, text: '¿Te atrae la dirección de operaciones, formulación de modelos de negocio sostenibles o finanzas corporativas?', category: 'E', area: 'intereses', topic: 'gestión estratégica' },
      { id: 406, text: '¿Te interesa la analítica predictiva, la auditoría forense, la consultoría tributaria o la seguridad de la información?', category: 'C', area: 'intereses', topic: 'control e información' },
      { id: 407, text: '¿Valoras carreras con proyección en manufactura avanzada, agronomía de precisión o logística portuaria?', category: 'R', area: 'intereses', topic: 'logística y producción' },
      { id: 408, text: '¿Te apasiona modelar algoritmos para predecir comportamientos de mercado o patologías en salud?', category: 'I', area: 'intereses', topic: 'modelado predictivo' },
      { id: 409, text: '¿Te interesa liderar marcas en redes con narrativa transmedia, diseño de experiencias o fotografía editorial?', category: 'A', area: 'intereses', topic: 'narrativa transmedia' },
      { id: 410, text: '¿Te llama la atención la intervención comunitaria, el trabajo social y los programas de restitución de derechos?', category: 'S', area: 'intereses', topic: 'intervención social' },
      { id: 411, text: '¿Te visualizas gestionando rondas de inversión, alianzas de comercio exterior o gerencia comercial?', category: 'E', area: 'intereses', topic: 'inversiones' },
      { id: 412, text: '¿Prefieres áreas con estricto apego a normas contables internacionales (NIIF), compliance legal y control interno?', category: 'C', area: 'intereses', topic: 'compliance' }
    ],
    habilidades: [
      { id: 421, text: '¿Demuestras habilidad técnica para ensamblar prototipos, manejar instrumentación o código de desarrollo?', category: 'R', area: 'habilidades', topic: 'competencia técnica' },
      { id: 422, text: '¿Cuentas con rigor analítico para evaluar literatura científica, contrastar hipótesis y sintetizar diagnósticos?', category: 'I', area: 'habilidades', topic: 'síntesis científica' },
      { id: 423, text: '¿Tienes destreza para transformar conceptos abstractos en piezas visuales funcionales y de alto impacto estético?', category: 'A', area: 'habilidades', topic: 'diseño funcional' },
      { id: 424, text: '¿Muestras madurez emocional para acompañar procesos de dolor, rehabilitación o aprendizaje en personas?', category: 'S', area: 'habilidades', topic: 'inteligencia emocional' },
      { id: 425, text: '¿Tienes facilidad para liderar comités, delegar tareas y alcanzar metas bajo presión de tiempo?', category: 'E', area: 'habilidades', topic: 'gestión de equipos' },
      { id: 426, text: '¿Eres impecable en la gestión documental, conciliaciones financieras y aseguramiento de calidad?', category: 'C', area: 'habilidades', topic: 'aseguramiento de calidad' },
      { id: 427, text: '¿Posees rapidez para diagnosticar fallas de funcionamiento en procesos operativos?', category: 'R', area: 'habilidades', topic: 'diagnóstico operativo' },
      { id: 428, text: '¿Manejas con soltura herramientas estadísticas, hojas de cálculo complejas o lenguajes como Python/R?', category: 'I', area: 'habilidades', topic: 'herramientas de análisis' },
      { id: 429, text: '¿Tienes sensibilidad para identificar tendencias de consumo visual, estilos y modas emergentes?', category: 'A', area: 'habilidades', topic: 'tendencias' },
      { id: 430, text: '¿Sabes construir redes de apoyo y conectar personas con intereses comunes para el bienestar mutuo?', category: 'S', area: 'habilidades', topic: 'networking social' },
      { id: 431, text: '¿Tienes facilidad para persuadir a clientes o inversionistas sobre la viabilidad de un proyecto?', category: 'E', area: 'habilidades', topic: 'ventas y negociación' },
      { id: 432, text: '¿Te destacas por tu organización en la planificación presupuestal y control de gastos?', category: 'C', area: 'habilidades', topic: 'presupuestos' }
    ],
    personalidad: [
      { id: 441, text: '¿Prefieres jornadas dinámicas con trabajo en terreno, plantas industriales o laboratorios frente a oficinas estáticas?', category: 'R', area: 'personalidad', topic: 'campo' },
      { id: 442, text: '¿Te motiva resolver preguntas que aún no tienen respuesta comprobada en tu campo de estudio?', category: 'I', area: 'personalidad', topic: 'innovación' },
      { id: 443, text: '¿Valoras que tu empleo te permita libertad de horario y espacio para la experimentación artística?', category: 'A', area: 'personalidad', topic: 'autonomía' },
      { id: 444, text: '¿Tu mayor satisfacción profesional proviene de generar alivio, bienestar o progreso en la vida de otros?', category: 'S', area: 'personalidad', topic: 'propósito humanitario' },
      { id: 445, text: '¿Te atraen entornos competitivos de alto desempeño donde las recompensas están atadas a resultados medibles?', category: 'E', area: 'personalidad', topic: 'alto desempeño' },
      { id: 446, text: '¿Valoras la certidumbre laboral, la claridad en los procedimientos y la estabilidad de una organización sólida?', category: 'C', area: 'personalidad', topic: 'estabilidad' },
      { id: 447, text: '¿Tienes facilidad para trabajar bajo condiciones de exigencia física o técnica moderada sin desanimarte?', category: 'R', area: 'personalidad', topic: 'resistencia' },
      { id: 448, text: '¿Disfrutas dedicar horas a la lectura minuciosa de estudios especializados para fundamentar tus ideas?', category: 'I', area: 'personalidad', topic: 'rigor' },
      { id: 449, text: '¿Te frustra la monotonía visual y buscas constantemente renovar tus propuestas creativas?', category: 'A', area: 'personalidad', topic: 'renovación' },
      { id: 450, text: '¿Priorizas un ambiente de trabajo con calidez humana antes que uno puramente transaccional?', category: 'S', area: 'personalidad', topic: 'cultura humana' },
      { id: 451, text: '¿Te consideras una persona proactiva que toma la iniciativa antes de que le indiquen qué hacer?', category: 'E', area: 'personalidad', topic: 'proactividad' },
      { id: 452, text: '¿Te resulta gratificante verificar que cada dato en un reporte coincida con exactitud al 100%?', category: 'C', area: 'personalidad', topic: 'precisión' }
    ],
    'areas-profesionales': [
      { id: 461, text: '¿Te orientas hacia carreras de ingeniería, ciencias aplicadas o tecnologías industriales avanzadas?', category: 'R', area: 'intereses', topic: 'ingeniería aplicada' },
      { id: 462, text: '¿Te ves en profesiones de la salud: medicina, enfermería, nutrición, bacteriología, odontología o psicología?', category: 'I', area: 'intereses', topic: 'salud integral' },
      { id: 463, text: '¿Te proyectas en industrias creativas: diseño gráfico, modas, comunicación social, artes visuales o audiovisuales?', category: 'A', area: 'intereses', topic: 'creatividad y medios' },
      { id: 464, text: '¿Te orientas a ciencias sociales y humanidades: derecho, criminología, trabajo social o educación?', category: 'S', area: 'intereses', topic: 'ciencias sociales' },
      { id: 465, text: '¿Te ves en el ecosistema empresarial: administración, comercio internacional, finanzas o marketing?', category: 'E', area: 'intereses', topic: 'negocios globales' },
      { id: 466, text: '¿Te proyectas en áreas estructuradas: contaduría pública, logística, economía o ciencia de datos?', category: 'C', area: 'intereses', topic: 'gestión y datos' },
      { id: 467, text: '¿Te llama la atención el sector de la gastronomía, artes culinarias y administración turística?', category: 'R', area: 'intereses', topic: 'gastronomía y hospitalidad' },
      { id: 468, text: '¿Te interesa la investigación pericial, criminalística, análisis forense o toxicología?', category: 'I', area: 'intereses', topic: 'ciencias forenses' },
      { id: 469, text: '¿Te atrae el sector de la cosmetología, estética integral, bienestar personal e imagen?', category: 'A', area: 'intereses', topic: 'estética y bienestar' },
      { id: 470, text: '¿Te proyectas en licenciaturas en lenguas extranjeras, educación infantil o gestión pedagógica?', category: 'S', area: 'intereses', topic: 'pedagogía' },
      { id: 471, text: '¿Te entusiasma la creación y aceleración de nuevos emprendimientos con impacto regional?', category: 'E', area: 'intereses', topic: 'innovación empresarial' },
      { id: 472, text: '¿Te llama la atención la ciberseguridad, administración de redes seguras y auditoría TI?', category: 'C', area: 'intereses', topic: 'seguridad TI' }
    ],
    'preferencias-academicas': [
      { id: 481, text: '¿Prefieres formación con convenios de práctica empresarial rápida o modelos de educación dual?', category: 'R', area: 'preferencias', topic: 'inserción laboral rápida' },
      { id: 482, text: '¿Te interesa cursar pregrados que tengan opción de homologación directa con posgrados o maestrías?', category: 'I', area: 'preferencias', topic: 'proyección de posgrado' },
      { id: 483, text: '¿Valoras universidades con talleres especializados, laboratorios de prototipado o salas de edición avanzadas?', category: 'A', area: 'preferencias', topic: 'laboratorios especializados' },
      { id: 484, text: '¿Buscas programas con rotaciones de campo en instituciones hospitalarias, colegios o comunidades?', category: 'S', area: 'preferencias', topic: 'rotaciones clínicas' },
      { id: 485, text: '¿Prefieres instituciones que ofrezcan ferias de empleo, incubadoras de empresas y convenios con multinacionales?', category: 'E', area: 'preferencias', topic: 'incubadoras' },
      { id: 486, text: '¿Valoras que la institución cuente con Acreditación de Alta Calidad oficial y convenios de homologación?', category: 'C', area: 'preferencias', topic: 'acreditación' },
      { id: 487, text: '¿Consideras programas técnicos o tecnológicos como una excelente opción para ingresar rápido al mercado?', category: 'R', area: 'preferencias', topic: 'tecnologías' },
      { id: 488, text: '¿Te motiva la modalidad virtual o híbrida que te permita trabajar mientras realizas tus estudios?', category: 'I', area: 'preferencias', topic: 'flexibilidad virtual' },
      { id: 489, text: '¿Te interesa que la carrera incluya un segundo idioma certificado para poder aspirar a salarios globales?', category: 'A', area: 'preferencias', topic: 'bilingüismo' },
      { id: 490, text: '¿Valoras opciones de becas por excelencia académica o financiamiento condonable del Estado?', category: 'C', area: 'preferencias', topic: 'becas y crédito' }
    ],
    'orientacion-vocacional': [
      { id: 491, text: '¿Tienes destreza para operar tecnologías prácticas, software especializado, máquinas o procesos productivos?', category: 'R', area: 'habilidades', topic: 'operación' },
      { id: 492, text: '¿Disfrutas analizar problemas complejos, diagnosticar causas y estructurar investigaciones científicas?', category: 'I', area: 'habilidades', topic: 'diagnóstico' },
      { id: 493, text: '¿Te destacas por tu creatividad visual, pensamiento de diseño y conceptualización artística?', category: 'A', area: 'habilidades', topic: 'conceptualización' },
      { id: 494, text: '¿Tu vocación se orienta hacia el acompañamiento, la salud, la docencia o la intervención comunitaria?', category: 'S', area: 'habilidades', topic: 'acompañamiento' },
      { id: 495, text: '¿Tienes iniciativa para liderar proyectos comerciales, negociar metas y asumir riesgos estratégicos?', category: 'E', area: 'habilidades', topic: 'negocios' },
      { id: 496, text: '¿Te caracterizas por el orden sistemático, la precisión con números y la atención rigurosa a normas?', category: 'C', area: 'habilidades', topic: 'rigor normativo' },
      { id: 497, text: '¿Prefieres un trabajo con actividad tangible y física antes que estar estático frente a un monitor?', category: 'R', area: 'personalidad', topic: 'dinamismo' },
      { id: 498, text: '¿Te gusta consultar literatura especializada para tomar decisiones fundamentadas en evidencia?', category: 'I', area: 'personalidad', topic: 'evidencia' },
      { id: 499, text: '¿Prefieres roles con margen de innovación estética frente a trabajos con respuestas prefabricadas?', category: 'A', area: 'personalidad', topic: 'innovación' },
      { id: 500, text: '¿Sientes satisfacción cuando tu labor impacta positivamente la calidad de vida de otras personas?', category: 'S', area: 'personalidad', topic: 'impacto humano' },
      { id: 501, text: '¿Te motiva alcanzar posiciones de liderazgo y gestionar recursos financieros o humanos?', category: 'E', area: 'personalidad', topic: 'gestión' },
      { id: 502, text: '¿Encuentras tranquilidad en la predictibilidad, los estándares claros y la organización de datos?', category: 'C', area: 'personalidad', topic: 'organización' },
      { id: 503, text: '¿Te interesan programas del área de ingeniería civil, sistemas, industrial, ambiental o química?', category: 'R', area: 'intereses', topic: 'ingenierías' },
      { id: 504, text: '¿Te atraen áreas de ciencias biomédicas, medicina, ciencia de datos o investigación forense?', category: 'I', area: 'intereses', topic: 'ciencias' },
      { id: 505, text: '¿Te atraen áreas de diseño de modas, arquitectura, artes visuales, publicidad o producción digital?', category: 'A', area: 'intereses', topic: 'creación visual' },
      { id: 506, text: '¿Te interesan campos de derecho, psicología, trabajo social, enfermería o pedagogía?', category: 'S', area: 'intereses', topic: 'bienestar' },
      { id: 507, text: '¿Te atraen campos de administración, comercio internacional, finanzas o marketing digital?', category: 'E', area: 'intereses', topic: 'comercio' },
      { id: 508, text: '¿Te interesan áreas de contaduría pública, logística, auditoría tributaria o seguridad de redes?', category: 'C', area: 'intereses', topic: 'auditoría' }
    ]
  },

  // -------------------------------------------------------------
  // 4. RANGO 22 AÑOS EN ADELANTE (Adultos / Reorientación Profesional)
  // -------------------------------------------------------------
  '22+': {
    intereses: [
      { id: 601, text: '¿Te interesa reconvertir tu perfil profesional hacia la tecnología, automatización, gestión ambiental o ingeniería aplicada?', category: 'R', area: 'intereses', topic: 'reorientación tecnológica' },
      { id: 602, text: '¿Deseas profundizar en campos de analítica avanzada, investigación aplicada, bioinformática o epidemiología?', category: 'I', area: 'intereses', topic: 'especialización' },
      { id: 603, text: '¿Te motiva emprender en diseño, producción audiovisual, arquitectura sostenible o industrias creativas independientes?', category: 'A', area: 'intereses', topic: 'emprendimiento creativo' },
      { id: 604, text: '¿Buscas una profesión con mayor significado humano: psicología, trabajo social, docencia universitaria o derecho?', category: 'S', area: 'intereses', topic: 'vocación humana' },
      { id: 605, text: '¿Te motiva la alta dirección de empresas, consultoría estratégica, comercio internacional o creación de startups?', category: 'E', area: 'intereses', topic: 'alta gerencia' },
      { id: 606, text: '¿Te atrae la optimización corporativa: auditoría financiera, compliance legal, ciencia de datos o gerencia logística?', category: 'C', area: 'intereses', topic: 'optimización corporativa' },
      { id: 607, text: '¿Valoras carreras con aplicabilidad práctica inmediata que potencien tu experiencia laboral previa?', category: 'R', area: 'intereses', topic: 'habilidades transferibles' },
      { id: 608, text: '¿Te atrae formular soluciones a problemas organizacionales o sociales complejos fundamentados en datos?', category: 'I', area: 'intereses', topic: 'soluciones basadas en datos' },
      { id: 609, text: '¿Deseas darle un giro a tu carrera hacia la creatividad digital, la comunicación estratégica o el diseño de experiencias?', category: 'A', area: 'intereses', topic: 'giro creativo' },
      { id: 610, text: '¿Te motiva la docencia en educación superior, la formación de talento o la formulación de políticas públicas?', category: 'S', area: 'intereses', topic: 'formación de talento' },
      { id: 611, text: '¿Te interesa el liderazgo corporativo, la gestión del cambio o la internacionalización de negocios?', category: 'E', area: 'intereses', topic: 'internacionalización' },
      { id: 612, text: '¿Prefieres consolidar tus competencias en finanzas avanzadas, tributación, estándares internacionales o Big Data?', category: 'C', area: 'intereses', topic: 'finanzas avanzadas' }
    ],
    habilidades: [
      { id: 621, text: '¿Has desarrollado destrezas prácticas para gestionar operaciones técnicas, obras o herramientas tecnológicas complejas?', category: 'R', area: 'habilidades', topic: 'gestión operativa' },
      { id: 622, text: '¿Posees pensamiento crítico maduro para evaluar riesgos, diagnosticar problemáticas complejas y tomar decisiones fundamentadas?', category: 'I', area: 'habilidades', topic: 'pensamiento crítico maduro' },
      { id: 623, text: '¿Cuentas con capacidad para innovar en procesos, productos o mensajes estéticos con un enfoque diferencial?', category: 'A', area: 'habilidades', topic: 'innovación' },
      { id: 624, text: '¿Has fortalecido tu empatía, escucha activa y liderazgo pedagógico para guiar a otros con madurez?', category: 'S', area: 'habilidades', topic: 'liderazgo empático' },
      { id: 625, text: '¿Tienes experiencia negociando, gestionando presupuestos, resolviendo conflictos y alcanzando acuerdos de alto nivel?', category: 'E', area: 'habilidades', topic: 'negociación avanzada' },
      { id: 626, text: '¿Te destacas por tu disciplina para administrar proyectos estructurados, cronogramas y estándares de calidad?', category: 'C', area: 'habilidades', topic: 'gestión de proyectos' },
      { id: 627, text: '¿Te adaptas con rapidez a nuevas herramientas tecnológicas de trabajo sin importar tu área original?', category: 'R', area: 'habilidades', topic: 'adaptabilidad tecnológica' },
      { id: 628, text: '¿Sabes interpretar reportes analíticos complejos y transformarlos en planes de acción estratégicos?', category: 'I', area: 'habilidades', topic: 'decisiones estratégicas' },
      { id: 629, text: '¿Sabes comunicar ideas con un lenguaje persuasivo, claro y visualmente atractivo en entornos profesionales?', category: 'A', area: 'habilidades', topic: 'comunicación profesional' },
      { id: 630, text: '¿Te buscan con frecuencia colegas o personas de tu entorno para pedirte consejo y orientación?', category: 'S', area: 'habilidades', topic: 'mentoría' },
      { id: 631, text: '¿Tienes visión de negocio para detectar oportunidades comerciales donde otros solo ven problemas?', category: 'E', area: 'habilidades', topic: 'visión de negocio' },
      { id: 632, text: '¿Eres riguroso en el cumplimiento de plazos, presupuestos y compromisos asumidos?', category: 'C', area: 'habilidades', topic: 'responsabilidad ejecutiva' }
    ],
    personalidad: [
      { id: 641, text: '¿Buscas una trayectoria con resultados tangibles y medibles que te generen satisfacción práctica diaria?', category: 'R', area: 'personalidad', topic: 'satisfacción tangible' },
      { id: 642, text: '¿Valoras el aprendizaje continuo a lo largo de toda la vida y la actualización constante de conocimientos?', category: 'I', area: 'personalidad', topic: 'aprendizaje continuo' },
      { id: 643, text: '¿Consideras que ha llegado el momento de darle espacio a tu vocación creativa postergada en el pasado?', category: 'A', area: 'personalidad', topic: 'vocación postergada' },
      { id: 644, text: '¿Tu principal prioridad vocacional hoy es generar un impacto social duradero en tu comunidad o región?', category: 'S', area: 'personalidad', topic: 'impacto social' },
      { id: 645, text: '¿Te motiva la autonomía laboral, emprender o ser tu propio jefe antes que depender de un empleo tradicional?', category: 'E', area: 'personalidad', topic: 'autonomía laboral' },
      { id: 646, text: '¿Valoras la estabilidad económica, la predictibilidad financiera y el balance saludable entre vida y trabajo?', category: 'C', area: 'personalidad', topic: 'balance de vida' },
      { id: 647, text: '¿Prefieres roles donde tu experiencia práctica en el terreno sea valorada por encima de títulos puramente teóricos?', category: 'R', area: 'personalidad', topic: 'valor práctico' },
      { id: 648, text: '¿Te atrae profundizar con rigor en un tema hasta convertirte en un referente especializado en tu materia?', category: 'I', area: 'personalidad', topic: 'especialización profunda' },
      { id: 649, text: '¿Te apasiona diseñar soluciones originales que mejoren la experiencia de las personas en su vida cotidiana?', category: 'A', area: 'personalidad', topic: 'soluciones originales' },
      { id: 650, text: '¿Prefieres ambientes laborales colaborativos donde prime la empatía y la salud mental de las personas?', category: 'S', area: 'personalidad', topic: 'bienestar laboral' },
      { id: 651, text: '¿Te entusiasma asumir la responsabilidad de liderar proyectos retadores con visión de futuro?', category: 'E', area: 'personalidad', topic: 'liderazgo de futuro' },
      { id: 652, text: '¿Encuentras satisfacción en la optimización meticulosa de sistemas para que todo funcione sin errores?', category: 'C', area: 'personalidad', topic: 'cero errores' }
    ],
    'areas-profesionales': [
      { id: 661, text: '¿Te visualizas en ingeniería de software, ciberseguridad, ingeniería civil, industrial o mecatrónica?', category: 'R', area: 'intereses', topic: 'ingenierías clave' },
      { id: 662, text: '¿Te proyectas en ciencias de la salud, medicina, psicología, epidemiología o investigación biomédica?', category: 'I', area: 'intereses', topic: 'salud y ciencias' },
      { id: 663, text: '¿Te atraen áreas de diseño digital UX/UI, diseño de modas, arquitectura, artes visuales o publicidad?', category: 'A', area: 'intereses', topic: 'diseño y artes' },
      { id: 664, text: '¿Te proyectas en derecho, criminología, trabajo social, sociología o pedagogía universitaria?', category: 'S', area: 'intereses', topic: 'ciencias sociales' },
      { id: 665, text: '¿Te visualizas en administración de empresas, finanzas corporativas, comercio exterior o marketing digital?', category: 'E', area: 'intereses', topic: 'gestión y comercio' },
      { id: 666, text: '¿Te proyectas en contaduría pública, ciencia de datos, estadística, logística o auditoría de procesos?', category: 'C', area: 'intereses', topic: 'control y datos' },
      { id: 667, text: '¿Te interesa el sector de la gastronomía, artes culinarias, turismo sostenible o administración de eventos?', category: 'R', area: 'intereses', topic: 'gastronomía y eventos' },
      { id: 668, text: '¿Te atrae la investigación judicial, criminalística, peritaje forense o seguridad corporativa?', category: 'I', area: 'intereses', topic: 'peritaje forense' },
      { id: 669, text: '¿Te llama la atención el sector de la cosmetología, estética integral, cuidado de la piel y bienestar holístico?', category: 'A', area: 'intereses', topic: 'estética y bienestar' },
      { id: 670, text: '¿Te proyectas en educación, consultoría pedagógica o desarrollo de programas comunitarios?', category: 'S', area: 'intereses', topic: 'educación comunitaria' },
      { id: 671, text: '¿Te interesa crear tu propia empresa o consultoría independiente para brindar servicios especializados?', category: 'E', area: 'intereses', topic: 'consultoría' },
      { id: 672, text: '¿Te visualizas como especialista en análisis de datos, optimización de costos y cumplimiento normativo?', category: 'C', area: 'intereses', topic: 'optimización financiera' }
    ],
    'preferencias-academicas': [
      { id: 681, text: '¿Buscas programas con flexibilidad horaria (nocturnos, fines de semana o virtuales) para compatibilizar trabajo y estudio?', category: 'R', area: 'preferencias', topic: 'flexibilidad horaria' },
      { id: 682, text: '¿Prefieres programas con acreditación de alta calidad que te permitan convalidar tu título en el exterior?', category: 'I', area: 'preferencias', topic: 'convalidación internacional' },
      { id: 683, text: '¿Valoras que los docentes sean profesionales en ejercicio con experiencia real en el mercado laboral?', category: 'A', area: 'preferencias', topic: 'docentes expertos' },
      { id: 684, text: '¿Te interesan metodologías de estudio basadas en análisis de casos reales de empresas o comunidades?', category: 'S', area: 'preferencias', topic: 'casos de estudio' },
      { id: 685, text: '¿Valoras la posibilidad de hacer networking con otros profesionales experimentados durante tu formación?', category: 'E', area: 'preferencias', topic: 'networking profesional' },
      { id: 686, text: '¿Buscas programas con un retorno de inversión rápido en términos de incremento salarial o ascenso?', category: 'C', area: 'preferencias', topic: 'retorno de inversión' },
      { id: 687, text: '¿Te resultan atractivos los programas técnicos o tecnológicos como puente rápido hacia una reconversión laboral?', category: 'R', area: 'preferencias', topic: 'tecnologías puente' },
      { id: 688, text: '¿Consideras programas de posgrado (especializaciones o maestrías) para dar el siguiente salto en tu carrera?', category: 'I', area: 'preferencias', topic: 'posgrados' },
      { id: 689, text: '¿Prefieres una evaluación basada en proyectos aplicados de negocio o portafolios frente a exámenes tradicionales de memoria?', category: 'A', area: 'preferencias', topic: 'evaluación por proyectos' },
      { id: 690, text: '¿Valoras opciones de financiación flexible o convenios empresariales para costear tu matrícula?', category: 'C', area: 'preferencias', topic: 'financiación' }
    ],
    'orientacion-vocacional': [
      { id: 691, text: '¿Cuentas con destrezas prácticas para solucionar problemas operativos, tecnológicos o de ingeniería?', category: 'R', area: 'habilidades', topic: 'habilidad técnica' },
      { id: 692, text: '¿Tienes una inclinación investigativa para analizar causas de raíz y formular diagnósticos científicos?', category: 'I', area: 'habilidades', topic: 'investigación' },
      { id: 693, text: '¿Buscas desarrollar tu creatividad en diseño, producción audiovisual, arquitectura o innovación conceptual?', category: 'A', area: 'habilidades', topic: 'innovación' },
      { id: 694, text: '¿Tu vocación se orienta hacia el servicio, la salud, la docencia o la transformación comunitaria?', category: 'S', area: 'habilidades', topic: 'vocación humana' },
      { id: 695, text: '¿Tienes capacidad para negociar, liderar equipos y asumir la dirección estratégica de proyectos?', category: 'E', area: 'habilidades', topic: 'liderazgo' },
      { id: 696, text: '¿Te destacas por el orden sistemático, el rigor metodológico y la optimización de procesos de datos?', category: 'C', area: 'habilidades', topic: 'orden y datos' },
      { id: 697, text: '¿Valoras un trabajo con aplicación práctica y resultados concretos frente a la pura especulación?', category: 'R', area: 'personalidad', topic: 'practicidad' },
      { id: 698, text: '¿Prefieres tomar decisiones con base en evidencia estadística y científica antes que por corazonadas?', category: 'I', area: 'personalidad', topic: 'decisiones basadas en datos' },
      { id: 699, text: '¿Consideras indispensable que tu profesión te permita expresarte de forma auténtica e innovadora?', category: 'A', area: 'personalidad', topic: 'autenticidad' },
      { id: 700, text: '¿Tu mayor meta profesional es dejar una huella positiva en el bienestar de la sociedad?', category: 'S', area: 'personalidad', topic: 'huella social' },
      { id: 701, text: '¿Te motiva la autonomía financiera, el crecimiento patrimonial y la dirección de negocios?', category: 'E', area: 'personalidad', topic: 'visión empresarial' },
      { id: 702, text: '¿Prefieres sistemas estables con reglas claras, cumplimiento normativo y estabilidad operativa?', category: 'C', area: 'personalidad', topic: 'estabilidad' },
      { id: 703, text: '¿Te interesa explorar carreras en ingenierías de software, civil, industrial, ambiental o mecatrónica?', category: 'R', area: 'intereses', topic: 'ingenierías' },
      { id: 704, text: '¿Te atrae el mundo de la medicina, odontología, psicología clínica, ciencia de datos o peritaje forense?', category: 'I', area: 'intereses', topic: 'ciencias y salud' },
      { id: 705, text: '¿Te llaman la atención las industrias creativas: diseño de modas, arquitectura, artes visuales o publicidad?', category: 'A', area: 'intereses', topic: 'artes' },
      { id: 706, text: '¿Te interesan campos de derecho, criminología, trabajo social, pedagogía o salud comunitaria?', category: 'S', area: 'intereses', topic: 'ciencias sociales' },
      { id: 707, text: '¿Te proyectas en administración de empresas, finanzas corporativas, marketing o comercio internacional?', category: 'E', area: 'intereses', topic: 'administración' },
      { id: 708, text: '¿Te interesan campos de contaduría pública, auditoría, logística internacional o seguridad informática?', category: 'C', area: 'intereses', topic: 'auditoría' }
    ]
  }
};

/**
 * Función principal para obtener preguntas adaptadas según categoría y rango de edad
 */
export function getAdaptiveQuestions(categoryId: TestCategoryId, ageStage: AgeStage, testId?: string): Question[] {
  // Normalizar edad a los 4 grupos principales
  let normalizedStage: string = '16-17';
  if (ageStage === '13-15' || ageStage === 'infancia') normalizedStage = '13-15';
  else if (ageStage === '16-17' || ageStage === 'adolescencia') normalizedStage = '16-17';
  else if (ageStage === '18-21' || ageStage === 'juventud') normalizedStage = '18-21';
  else if (ageStage === '22+' || ageStage === 'adultez') normalizedStage = '22+';

  // Normalizar categoría
  let targetCategory: string = categoryId;
  // Compatibilidad hacia atrás
  if (categoryId === 'estudiantes') targetCategory = 'orientacion-vocacional';
  if (categoryId === 'exploracion') targetCategory = 'intereses';
  if (categoryId === 'perfil-profesional') targetCategory = 'personalidad';
  if (categoryId === 'intereses-habilidades') targetCategory = 'habilidades';
  if (categoryId === 'reorientacion') targetCategory = 'areas-profesionales';

  const stageBank = ADAPTIVE_QUESTIONS_BY_STAGE[normalizedStage] || ADAPTIVE_QUESTIONS_BY_STAGE['16-17'];
  const questions = stageBank[targetCategory] || stageBank['orientacion-vocacional'] || [];

  // Si se solicita un test específico dentro de la categoría, podemos filtrar o tomar una porción
  if (testId && testId.includes('esencial')) {
    return questions.slice(0, 12);
  }
  if (testId && testId.includes('temas')) {
    return questions.slice(0, 10);
  }
  if (testId && testId.includes('resolucion')) {
    return questions.slice(0, 10);
  }
  if (testId && testId.includes('estilo')) {
    return questions.slice(0, 10);
  }
  if (testId && testId.includes('impacto')) {
    return questions.slice(0, 10);
  }
  if (testId && testId.includes('modalidad')) {
    return questions.slice(0, 10);
  }

  return questions;
}

/**
 * Obtener la información de una categoría por su ID
 */
export function getTestCategoryInfo(categoryId: TestCategoryId): TestCategoryInfo {
  // Manejo de compatibilidad con categorías anteriores
  let targetId = categoryId;
  if (categoryId === 'estudiantes') targetId = 'orientacion-vocacional';
  if (categoryId === 'exploracion') targetId = 'intereses';
  if (categoryId === 'perfil-profesional') targetId = 'personalidad';
  if (categoryId === 'intereses-habilidades') targetId = 'habilidades';
  if (categoryId === 'reorientacion') targetId = 'areas-profesionales';

  const found = TEST_CATEGORIES_DATA.find(c => c.id === targetId);
  return found || TEST_CATEGORIES_DATA[0];
}

/**
 * Obtener un test específico por su ID
 */
export function getTestDefinitionById(testId: string): { test: TestDefinition; category: TestCategoryInfo } | null {
  for (const cat of TEST_CATEGORIES_DATA) {
    const foundTest = cat.availableTests.find(t => t.id === testId);
    if (foundTest) {
      return { test: foundTest, category: cat };
    }
  }
  // Fallback al primer test de orientación vocacional
  const defaultCat = TEST_CATEGORIES_DATA.find(c => c.id === 'orientacion-vocacional') || TEST_CATEGORIES_DATA[0];
  return { test: defaultCat.availableTests[0], category: defaultCat };
}
