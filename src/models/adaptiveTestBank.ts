import { AgeStage, Question, RiasecType, TestCategoryId } from '../types';

export interface TestCategoryInfo {
  id: TestCategoryId;
  title: string;
  iconName: 'GraduationCap' | 'Compass' | 'Briefcase' | 'Brain' | 'RefreshCw';
  description: string;
  whatYouWillDiscover: string;
  whatWeWillExplore: string[];
  approxTime: string;
  badge: string;
  colorGradient: string;
  borderColor: string;
}

export const TEST_CATEGORIES_DATA: TestCategoryInfo[] = [
  {
    id: 'estudiantes',
    title: 'Estudiantes',
    iconName: 'GraduationCap',
    description: 'Explora tus intereses, habilidades y áreas de conocimiento para descubrir nuevas posibilidades para tu futuro.',
    whatYouWillDiscover: 'Cómo tus intereses académicos, tus asignaturas favoritas y tus talentos naturales se conectan con múltiples posibilidades de estudio y desarrollo profesional para tu futuro.',
    whatWeWillExplore: [
      'Intereses académicos y asignaturas escolares o formativas afines',
      'Habilidades prácticas, creativas y de razonamiento',
      'Actividades que más disfrutas en tu tiempo libre y de estudio',
      'Campos de estudio y áreas profesionales afines a tus gustos'
    ],
    approxTime: '8 - 12 minutos (sin límite de tiempo)',
    badge: 'Formación y Colegio',
    colorGradient: 'from-purple-500 to-indigo-600',
    borderColor: 'border-purple-200'
  },
  {
    id: 'exploracion',
    title: 'Exploración vocacional',
    iconName: 'Compass',
    description: 'Descubre qué actividades, temas y áreas despiertan tu interés y explora diferentes caminos profesionales.',
    whatYouWillDiscover: 'Una experiencia abierta y flexible especialmente pensada si aún estás descubriendo tus opciones, para identificar qué temas, problemas y ambientes despiertan tu curiosidad.',
    whatWeWillExplore: [
      'Temas, fenómenos y actividades que despiertan tu curiosidad',
      'Ambientes de trabajo y espacios donde te sientes más a gusto',
      'Formas en las que disfrutas aprender e investigar',
      'Tipos de problemas y retos que disfrutas resolver en el día a día'
    ],
    approxTime: '7 - 10 minutos (puedes pausar cuando desees)',
    badge: 'Descubrimiento Abierto',
    colorGradient: 'from-pink-500 to-purple-600',
    borderColor: 'border-pink-200'
  },
  {
    id: 'perfil-profesional',
    title: 'Perfil profesional',
    iconName: 'Briefcase',
    description: 'Conoce tus principales intereses, habilidades y preferencias para construir una visión más completa de tu perfil.',
    whatYouWillDiscover: 'Una visión integral de tu personalidad vocacional uniendo tus aptitudes, motivaciones, estilo de trabajo y valores para proyectar opciones profesionales sólidas.',
    whatWeWillExplore: [
      'Combinación de intereses vocacionales dominantes',
      'Habilidades y destrezas demostradas en la práctica',
      'Motivaciones, valores laborales y estilo de colaboración',
      'Áreas y sectores laborales afines a tu arquetipo'
    ],
    approxTime: '10 - 15 minutos (a tu propio ritmo)',
    badge: 'Visión Integral',
    colorGradient: 'from-blue-600 to-cyan-600',
    borderColor: 'border-blue-200'
  },
  {
    id: 'intereses-habilidades',
    title: 'Intereses y habilidades',
    iconName: 'Brain',
    description: 'Identifica lo que disfrutas hacer y reconoce las habilidades que puedes desarrollar y fortalecer.',
    whatYouWillDiscover: 'Diferenciaremos claramente qué es lo que más te apasiona (tus intereses) y en qué actividades demuestras facilidad o potencial (tus habilidades), mostrando cómo se complementan.',
    whatWeWillExplore: [
      'Mis intereses: qué situaciones, temáticas y proyectos llaman tu atención',
      'Mis habilidades: en qué demuestras facilidad, destreza o potencial de desarrollo',
      'Conexión entre lo que disfrutas hacer y tus fortalezas naturales',
      'Rutas académicas y ocupaciones para potenciar tus capacidades'
    ],
    approxTime: '8 - 12 minutos (organizado en dos fases claras)',
    badge: 'Intereses vs. Habilidades',
    colorGradient: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-200'
  },
  {
    id: 'reorientacion',
    title: 'Reorientación profesional',
    iconName: 'RefreshCw',
    description: 'Explora nuevas posibilidades académicas y profesionales a partir de tus experiencias, intereses y objetivos actuales.',
    whatYouWillDiscover: 'Nuevos caminos y posibilidades para enriquecer tu trayectoria, cambiar de carrera o emprender una nueva formación a partir de lo que has vivido y tus metas actuales.',
    whatWeWillExplore: [
      'Nuevos intereses y objetivos de vida surgidos en tu camino',
      'Habilidades transferibles adquiridas en experiencias previas',
      'Aprendizajes de tu trayectoria académica o laboral',
      'Áreas de reconversión, especialización o nuevos campos profesionales'
    ],
    approxTime: '10 - 14 minutos (exploración abierta sin respuestas fijas)',
    badge: 'Nuevos Horizontes',
    colorGradient: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-200'
  }
];

// Preguntas adaptadas por etapa de edad y categoría de test
export const ADAPTIVE_QUESTIONS_BY_STAGE: Record<AgeStage, Record<TestCategoryId, Question[]>> = {
  // 1. INFANCIA: Lenguaje sencillo, cercano, preguntas cortas, actividades cotidianas y lúdicas
  infancia: {
    estudiantes: [
      { id: 101, text: '¿Te gusta armar figuras con bloques, legos o inventar juguetes con cajas y plastilina?', category: 'R', area: 'intereses', topic: 'construcción y juego' },
      { id: 102, text: '¿Disfrutas ver libros o videos sobre dinosaurios, animales, estrellas o volcanes?', category: 'I', area: 'intereses', topic: 'naturaleza y curiosidad' },
      { id: 103, text: '¿Te divierte dibujar, colorear, pintar con témperas o inventar tus propios personajes?', category: 'A', area: 'intereses', topic: 'arte y creatividad' },
      { id: 104, text: '¿Te gusta ayudar a tus compañeros de clase cuando no entienden una tarea o prestar tus cosas?', category: 'S', area: 'habilidades', topic: 'solidaridad' },
      { id: 105, text: '¿Te gusta proponer juegos en el recreo, organizar a tus amigos y ser el líder del grupo?', category: 'E', area: 'habilidades', topic: 'liderazgo infantil' },
      { id: 106, text: '¿Prefieres tener tus cuadernos, colores y juguetes bien ordenados por tamaño o color?', category: 'C', area: 'habilidades', topic: 'orden y detalle' },
      { id: 107, text: '¿Se te hace fácil recordar canciones, ritmos de música o pasos de baile?', category: 'A', area: 'habilidades', topic: 'música y ritmo' },
      { id: 108, text: '¿Te gusta hacer experimentos sencillos, como mezclar colores o ver cómo crecen las plantas?', category: 'I', area: 'habilidades', topic: 'experimentos' },
      { id: 109, text: '¿Disfrutas arreglar juguetes dañados o averiguar qué tienen por dentro?', category: 'R', area: 'habilidades', topic: 'curiosidad manual' },
      { id: 110, text: '¿Te gusta escuchar historias de tus amigos y ayudarlos a sentirse felices cuando están tristes?', category: 'S', area: 'personalidad', topic: 'empatía' }
    ],
    exploracion: [
      { id: 111, text: '¿Te gusta pasar tiempo al aire libre explorando parques, plantas y animales?', category: 'R', area: 'intereses', topic: 'naturaleza' },
      { id: 112, text: '¿Te da curiosidad saber cómo vuelan los aviones o cómo funcionan los cohetes espaciales?', category: 'I', area: 'intereses', topic: 'ciencia' },
      { id: 113, text: '¿Te encanta inventar cuentos, historietas o hacer manualidades con papel y tijeras?', category: 'A', area: 'intereses', topic: 'cuentos y creatividad' },
      { id: 114, text: '¿Disfrutas jugar en equipo con otros niños y hacer nuevos amigos en cualquier lugar?', category: 'S', area: 'preferencias', topic: 'amistad y equipo' },
      { id: 115, text: '¿Te gusta hacer ventas simbólicas o juegos donde intercambias cosas con tus amigos?', category: 'E', area: 'preferencias', topic: 'juegos de rol' },
      { id: 116, text: '¿Te gusta seguir las reglas de los juegos de mesa y verificar que todos jueguen limpio?', category: 'C', area: 'preferencias', topic: 'reglas y justicia' },
      { id: 117, text: '¿Prefieres aprender cosas viendo imágenes y tocando objetos antes que solo escuchando?', category: 'R', area: 'habilidades', topic: 'aprendizaje táctil' },
      { id: 118, text: '¿Haces muchas preguntas cuando algo te llama la atención hasta entenderlo bien?', category: 'I', area: 'personalidad', topic: 'curiosidad' }
    ],
    'perfil-profesional': [
      { id: 121, text: '¿Te sientes feliz cuando creas algo con tus propias manos y se lo muestras a tu familia?', category: 'R', area: 'intereses', topic: 'creación' },
      { id: 122, text: '¿Te gusta resolver acertijos, laberintos o juegos de pistas difíciles?', category: 'I', area: 'habilidades', topic: 'lógica' },
      { id: 123, text: '¿Tienes una gran imaginación para inventar mundos fantásticos o disfraces divertidos?', category: 'A', area: 'personalidad', topic: 'imaginación' },
      { id: 124, text: '¿Te gusta enseñar a otros niños lo que tú ya sabes hacer bien?', category: 'S', area: 'habilidades', topic: 'enseñanza' },
      { id: 125, text: '¿Te anima hablar frente a tus compañeros de clase para presentar una tarea o poema?', category: 'E', area: 'habilidades', topic: 'expresión' },
      { id: 126, text: '¿Eres muy cuidadoso para no perder tus lápices y guardar todo en su lugar?', category: 'C', area: 'personalidad', topic: 'cuidado y orden' }
    ],
    'intereses-habilidades': [
      // Fase 1: Mis intereses
      { id: 131, text: '[Mis Intereses] ¿Qué tanto te gusta construir cosas, robots de cartón o figuras armables?', category: 'R', area: 'intereses', topic: 'mis intereses' },
      { id: 132, text: '[Mis Intereses] ¿Qué tanto te interesa investigar sobre planetas, fósiles o el océano?', category: 'I', area: 'intereses', topic: 'mis intereses' },
      { id: 133, text: '[Mis Intereses] ¿Qué tanto disfrutas pintar, cantar, actuar o crear dibujos animados?', category: 'A', area: 'intereses', topic: 'mis intereses' },
      { id: 134, text: '[Mis Intereses] ¿Qué tanto te llama la atención cuidar a personas o mascotas?', category: 'S', area: 'intereses', topic: 'mis intereses' },
      // Fase 2: Mis habilidades
      { id: 135, text: '[Mis Habilidades] ¿Se te facilita armar rompecabezas y maquetas con precisión?', category: 'R', area: 'habilidades', topic: 'mis habilidades' },
      { id: 136, text: '[Mis Habilidades] ¿Tienes facilidad para entender números, operaciones y acertijos?', category: 'I', area: 'habilidades', topic: 'mis habilidades' },
      { id: 137, text: '[Mis Habilidades] ¿Tienes facilidad para comunicarte y hacer sonreír a los demás?', category: 'S', area: 'habilidades', topic: 'mis habilidades' },
      { id: 138, text: '[Mis Habilidades] ¿Tienes facilidad para recordar fechas, listas y detalles importantes?', category: 'C', area: 'habilidades', topic: 'mis habilidades' }
    ],
    reorientacion: [
      { id: 141, text: '¿Te gustaría probar una nueva actividad extracurricular que nunca antes habías hecho?', category: 'E', area: 'intereses', topic: 'nuevas actividades' },
      { id: 142, text: '¿Si una tarea o juego no te gusta tanto, te emociona buscar otra forma más divertida de hacerlo?', category: 'A', area: 'personalidad', topic: 'creatividad' },
      { id: 143, text: '¿Te gustaría aprender a programar juegos en el computador o crear animaciones digitales?', category: 'I', area: 'intereses', topic: 'tecnología' },
      { id: 144, text: '¿Disfrutas descubrir talentos nuevos que antes no sabías que tenías?', category: 'S', area: 'habilidades', topic: 'autoconocimiento' }
    ]
  },

  // 2. ADOLESCENCIA: Exploración de materias, habilidades escolares, talentos y primeros campos vocacionales
  adolescencia: {
    estudiantes: [
      { id: 201, text: '¿Disfrutas materias prácticas como tecnología, robótica, diseño técnico o informática?', category: 'R', area: 'intereses', topic: 'tecnología escolar' },
      { id: 202, text: '¿Te atraen las ciencias exactas como física, química, matemáticas o biología experimental?', category: 'I', area: 'intereses', topic: 'ciencias' },
      { id: 203, text: '¿Te gusta expresarte a través del diseño visual, edición de video, escritura o música?', category: 'A', area: 'intereses', topic: 'arte y multimedia' },
      { id: 204, text: '¿Te interesa participar en voluntariados escolares, debates sociales o proyectos de apoyo comunitario?', category: 'S', area: 'intereses', topic: 'social y comunidad' },
      { id: 205, text: '¿Te motiva liderar proyectos grupales, organizar eventos del colegio o proponer ideas de emprendimiento?', category: 'E', area: 'habilidades', topic: 'liderazgo escolar' },
      { id: 206, text: '¿Te destacas por organizar tus horarios de estudio, apuntes estructurados y cumplir cronogramas?', category: 'C', area: 'habilidades', topic: 'planificación y método' },
      { id: 207, text: '¿Prefieres comprender cómo funcionan las máquinas y dispositivos antes que memorizar definiciones?', category: 'R', area: 'habilidades', topic: 'lógica práctica' },
      { id: 208, text: '¿Te apasiona investigar en internet artículos, documentales o datos para descubrir respuestas por tu cuenta?', category: 'I', area: 'habilidades', topic: 'investigación' },
      { id: 209, text: '¿Tienes facilidad para empatizar, escuchar activamente y aconsejar a tus amigos en situaciones difíciles?', category: 'S', area: 'habilidades', topic: 'inteligencia interpersonal' },
      { id: 210, text: '¿Te interesa aprender sobre economía, finanzas personales, gestión de recursos o administración?', category: 'E', area: 'intereses', topic: 'finanzas y gestión' },
      { id: 211, text: '¿Valoras la precisión en los cálculos numéricos, bases de datos o seguimiento metódico de pasos?', category: 'C', area: 'habilidades', topic: 'precisión' },
      { id: 212, text: '¿Te entusiasma imaginar soluciones innovadoras a problemas cotidianos mediante ideas originales?', category: 'A', area: 'habilidades', topic: 'innovación' }
    ],
    exploracion: [
      { id: 221, text: '¿Te gustaría trabajar en entornos de campo, laboratorios o talleres prácticos en lugar de estar siempre en una oficina?', category: 'R', area: 'preferencias', topic: 'ambientes prácticos' },
      { id: 222, text: '¿Disfrutas analizar causas y consecuencias de problemas científicos, sociales o tecnológicos?', category: 'I', area: 'intereses', topic: 'pensamiento crítico' },
      { id: 223, text: '¿Te atrae la libertad creativa para diseñar proyectos sin tener que seguir una fórmula fija?', category: 'A', area: 'preferencias', topic: 'creatividad libre' },
      { id: 224, text: '¿Te motiva ayudar a que otras personas mejoren su calidad de vida, salud o bienestar emocional?', category: 'S', area: 'intereses', topic: 'vocación de servicio' },
      { id: 225, text: '¿Te gustaría convencer a otros sobre una buena causa, liderar debates o emprender tu propia iniciativa?', category: 'E', area: 'habilidades', topic: 'persuasión y liderazgo' },
      { id: 226, text: '¿Te sientes seguro y cómodo cuando cuentas con pautas claras, instrucciones y métodos establecidos?', category: 'C', area: 'preferencias', topic: 'estructura' },
      { id: 227, text: '¿Aprendes mejor experimentando y aplicando lo aprendido que solo leyendo teoría?', category: 'R', area: 'habilidades', topic: 'aprendizaje vivencial' },
      { id: 228, text: '¿Sientes curiosidad por temas globales como cambio climático, inteligencia artificial o salud pública?', category: 'I', area: 'intereses', topic: 'curiosidad global' }
    ],
    'perfil-profesional': [
      { id: 231, text: '¿Te visualizas en una profesión técnica, de ingeniería, software o arquitectura aplicada?', category: 'R', area: 'intereses', topic: 'ingeniería y técnica' },
      { id: 232, text: '¿Te atrae la investigación científica, el desarrollo biomédico o el análisis de datos complejos?', category: 'I', area: 'intereses', topic: 'ciencias e investigación' },
      { id: 233, text: '¿Te interesa crear contenido audiovisual, diseño, literatura, artes escénicas o comunicación?', category: 'A', area: 'intereses', topic: 'comunicación y arte' },
      { id: 234, text: '¿Consideras vocaciones en educación, psicología, medicina, trabajo social o enfermería?', category: 'S', area: 'intereses', topic: 'salud y humanidades' },
      { id: 235, text: '¿Te visualizas dirigiendo proyectos comerciales, negocios internacionales, derecho o marketing?', category: 'E', area: 'intereses', topic: 'negocios y leyes' },
      { id: 236, text: '¿Te interesan campos como contaduría, finanzas, ciberseguridad, logística o administración pública?', category: 'C', area: 'intereses', topic: 'logística y datos' },
      { id: 237, text: '¿Cuáles de tus valores personales consideras más importantes: impacto social, autonomía o estabilidad?', category: 'S', area: 'personalidad', topic: 'valores' },
      { id: 238, text: '¿Prefieres trabajar de forma colaborativa en equipos multidisciplinarios?', category: 'E', area: 'preferencias', topic: 'estilo de trabajo' }
    ],
    'intereses-habilidades': [
      // Mis Intereses
      { id: 241, text: '[Mis Intereses] ¿Qué tanto te atrae reparar equipos, ensamblar circuitos o trabajar con materiales físicos?', category: 'R', area: 'intereses', topic: 'mis intereses' },
      { id: 242, text: '[Mis Intereses] ¿Qué tanto te interesa investigar fenómenos complejos, teorías o avances científicos?', category: 'I', area: 'intereses', topic: 'mis intereses' },
      { id: 243, text: '[Mis Intereses] ¿Qué tanto disfrutas componer, escribir, diseñar piezas gráficas o editar contenido?', category: 'A', area: 'intereses', topic: 'mis intereses' },
      { id: 244, text: '[Mis Intereses] ¿Qué tanto te motiva orientar a otros, enseñar o promover el bienestar social?', category: 'S', area: 'intereses', topic: 'mis intereses' },
      { id: 245, text: '[Mis Intereses] ¿Qué tanto te entusiasma emprender proyectos de impacto comercial o comunitario?', category: 'E', area: 'intereses', topic: 'mis intereses' },
      // Mis Habilidades
      { id: 246, text: '[Mis Habilidades] ¿Tienes facilidad para resolver problemas mecánicos, técnicos o espaciales?', category: 'R', area: 'habilidades', topic: 'mis habilidades' },
      { id: 247, text: '[Mis Habilidades] ¿Tienes facilidad para el razonamiento lógico, analítico y matemático?', category: 'I', area: 'habilidades', topic: 'mis habilidades' },
      { id: 248, text: '[Mis Habilidades] ¿Tienes facilidad para generar ideas originales, bocetos o narrativas atractivas?', category: 'A', area: 'habilidades', topic: 'mis habilidades' },
      { id: 249, text: '[Mis Habilidades] ¿Tienes facilidad para resolver desacuerdos y conectar con personas de diferentes puntos de vista?', category: 'S', area: 'habilidades', topic: 'mis habilidades' },
      { id: 250, text: '[Mis Habilidades] ¿Tienes facilidad para gestionar presupuestos, listas de tareas y procesos ordenados?', category: 'C', area: 'habilidades', topic: 'mis habilidades' }
    ],
    reorientacion: [
      { id: 261, text: '¿Has sentido interés por explorar carreras diferentes a las que inicialmente habías considerado?', category: 'I', area: 'intereses', topic: 'nuevas carreras' },
      { id: 262, text: '¿Te gustaría combinar dos áreas distintas (por ejemplo: arte con tecnología, o salud con negocios)?', category: 'A', area: 'intereses', topic: 'interdisciplinariedad' },
      { id: 263, text: '¿Sientes que tus materias favoritas en el colegio cambiaron con respecto a tus primeros años?', category: 'S', area: 'personalidad', topic: 'evolución de gustos' },
      { id: 264, text: '¿Te interesaría conocer programas tecnológicos cortos o carreras universitarias de alta demanda?', category: 'E', area: 'preferencias', topic: 'opciones de formación' }
    ]
  },

  // 3. JUVENTUD: Enfoque en educación superior, formación técnica/profesional, ambientes laborales y valores
  juventud: {
    estudiantes: [
      { id: 301, text: '¿Te interesa profundizar en diseño de software, infraestructura tecnológica, automatización o ingeniería?', category: 'R', area: 'intereses', topic: 'ingeniería y computación' },
      { id: 302, text: '¿Te atrae el análisis empírico, la metodología de investigación o el diagnóstico de sistemas complejos?', category: 'I', area: 'intereses', topic: 'investigación aplicada' },
      { id: 303, text: '¿Buscas carreras donde prime la innovación estética, la comunicación visual o la producción de medios?', category: 'A', area: 'intereses', topic: 'creatividad profesional' },
      { id: 304, text: '¿Te motiva la formación en áreas de salud, psicología aplicada, educación o políticas públicas?', category: 'S', area: 'intereses', topic: 'impacto humano' },
      { id: 305, text: '¿Te ves liderando proyectos de emprendimiento, gestión de operaciones o estrategia comercial?', category: 'E', area: 'habilidades', topic: 'dirección y gestión' },
      { id: 306, text: '¿Valoras la rigurosidad en gestión de calidad, finanzas, analítica corporativa o normatividad?', category: 'C', area: 'habilidades', topic: 'normativa y procesos' },
      { id: 307, text: '¿Prefieres roles profesionales con aplicación directa en campo, laboratorio o producción técnica?', category: 'R', area: 'preferencias', topic: 'campo y laboratorio' },
      { id: 308, text: '¿Te apasiona profundizar en artículos científicos, bases de conocimiento o modelado estadístico?', category: 'I', area: 'habilidades', topic: 'modelado analítico' },
      { id: 309, text: '¿Te interesa el desarrollo comunitario, la mediación de conflictos o el bienestar de poblaciones vulnerables?', category: 'S', area: 'habilidades', topic: 'servicio social' },
      { id: 310, text: '¿Tienes destreza para negociar acuerdos, articular equipos de trabajo y asumir riesgos calculados?', category: 'E', area: 'habilidades', topic: 'estrategia' }
    ],
    exploracion: [
      { id: 321, text: '¿Buscas un balance entre la flexibilidad horaria, el trabajo colaborativo y la autonomía profesional?', category: 'A', area: 'preferencias', topic: 'ambientes de trabajo' },
      { id: 322, text: '¿Prefieres resolver problemas con base en datos verificables antes que en intuición subjetiva?', category: 'I', area: 'habilidades', topic: 'toma de decisiones' },
      { id: 323, text: '¿Te interesa que tu futura profesión tenga un impacto directo y visible en la sostenibilidad o la sociedad?', category: 'S', area: 'personalidad', topic: 'propósito' },
      { id: 324, text: '¿Te entusiasma el ritmo dinámico de los negocios, startups o la toma de decisiones estratégicas?', category: 'E', area: 'intereses', topic: 'dinamismo comercial' },
      { id: 325, text: '¿Consideras fundamental la estabilidad institucional, procesos claros y previsibilidad en tu entorno?', category: 'C', area: 'preferencias', topic: 'estabilidad' },
      { id: 326, text: '¿Te interesa explorar opciones de educación tecnológica, programas duales o carreras profesionales?', category: 'R', area: 'intereses', topic: 'modalidades formativas' }
    ],
    'perfil-profesional': [
      { id: 331, text: '¿Cuáles son tus principales competencias técnicas o instrumentales consolidadas hasta hoy?', category: 'R', area: 'habilidades', topic: 'competencias técnicas' },
      { id: 332, text: '¿Te identificas con roles de diagnóstico, consultoría analítica o desarrollo de conocimiento?', category: 'I', area: 'intereses', topic: 'consultoría' },
      { id: 333, text: '¿Valoras entornos donde se premie el pensamiento disruptivo, el diseño y la originalidad?', category: 'A', area: 'preferencias', topic: 'cultura de innovación' },
      { id: 334, text: '¿Te interesa asumir responsabilidades en la formación, acompañamiento o cuidado integral de otros?', category: 'S', area: 'intereses', topic: 'cuidado y educación' },
      { id: 335, text: '¿Tienes aspiraciones de liderar organizaciones, crear empresa o dirigir áreas de gestión?', category: 'E', area: 'intereses', topic: 'alta dirección' },
      { id: 336, text: '¿Te destacas por la optimización de procesos, la documentación estructurada y la auditoría?', category: 'C', area: 'habilidades', topic: 'procesos y auditoría' }
    ],
    'intereses-habilidades': [
      { id: 341, text: '[Mis Intereses] ¿Qué áreas profesionales te despiertan entusiasmo e interés genuino de estudio?', category: 'I', area: 'intereses', topic: 'intereses vocacionales' },
      { id: 342, text: '[Mis Intereses] ¿Qué peso tienen en tus metas los proyectos sociales, comunitarios o de salud?', category: 'S', area: 'intereses', topic: 'intereses sociales' },
      { id: 343, text: '[Mis Intereses] ¿Te interesa la economía digital, el comercio electrónico o la dirección empresarial?', category: 'E', area: 'intereses', topic: 'intereses comerciales' },
      { id: 344, text: '[Mis Habilidades] ¿En qué destrezas demuestras mayor solidez: análisis lógico, diseño o trabajo en equipo?', category: 'I', area: 'habilidades', topic: 'fortalezas principales' },
      { id: 345, text: '[Mis Habilidades] ¿Qué habilidad sientes que podrías potenciar rápidamente con la formación adecuada?', category: 'R', area: 'habilidades', topic: 'potencial de desarrollo' },
      { id: 346, text: '[Mis Habilidades] ¿Tienes facilidad para la comunicación asertiva y la resolución constructiva de problemas?', category: 'S', area: 'habilidades', topic: 'habilidades blandas' }
    ],
    reorientacion: [
      { id: 351, text: '¿Estás considerando un cambio de programa de estudios o replantear el enfoque de tu carrera?', category: 'I', area: 'intereses', topic: 'cambio vocacional' },
      { id: 352, text: '¿Deseas convalidar o aprovechar asignaturas y conocimientos previos en una nueva disciplina?', category: 'C', area: 'habilidades', topic: 'transferencia de créditos' },
      { id: 353, text: '¿Buscas una carrera con mayores opciones de inserción laboral o con modalidad virtual/híbrida?', category: 'E', area: 'preferencias', topic: 'empleabilidad' },
      { id: 354, text: '¿Sientes que tu vocación real está orientada hacia un campo muy diferente a lo que elegiste antes?', category: 'A', area: 'personalidad', topic: 'redescubrimiento vocacional' }
    ]
  },

  // 4. ADULTEZ: Experiencia previa, habilidades transferibles, cambio de carrera, reconversión profesional
  adultez: {
    estudiantes: [
      { id: 401, text: '¿Deseas adquirir competencias en nuevas tecnologías, inteligencia artificial, automatización o análisis de datos?', category: 'I', area: 'intereses', topic: 'actualización tecnológica' },
      { id: 402, text: '¿Buscas formalizar tu experiencia práctica mediante un título profesional o tecnológico reconocido?', category: 'C', area: 'habilidades', topic: 'titulación y acreditación' },
      { id: 403, text: '¿Te interesa formarte en gestión directiva, finanzas estratégicas o liderazgo transformacional?', category: 'E', area: 'intereses', topic: 'liderazgo ejecutivo' },
      { id: 404, text: '¿Te motiva orientar tu siguiente etapa formativa hacia el impacto social, la docencia o la salud mental?', category: 'S', area: 'intereses', topic: 'impacto y docencia' },
      { id: 405, text: '¿Valoras programas con flexibilidad horaria, educación virtual o reconocimiento de saberes previos?', category: 'R', area: 'preferencias', topic: 'flexibilidad de estudio' },
      { id: 406, text: '¿Te interesa una segunda carrera que combine tu experiencia anterior con una nueva pasión vocacional?', category: 'A', area: 'personalidad', topic: 'segunda carrera' }
    ],
    exploracion: [
      { id: 411, text: '¿Buscas una transición laboral hacia sectores emergentes con mayor proyección de crecimiento?', category: 'E', area: 'intereses', topic: 'transición laboral' },
      { id: 412, text: '¿Qué peso tiene para ti la satisfacción personal y el equilibrio vida-trabajo sobre el estatus?', category: 'S', area: 'preferencias', topic: 'bienestar integral' },
      { id: 413, text: '¿Te atraen entornos donde puedas trabajar de manera remota, como consultor independiente o en proyectos?', category: 'A', area: 'preferencias', topic: 'trabajo independiente' },
      { id: 414, text: '¿Te gustaría resolver problemas de sostenibilidad ambiental, gestión pública o innovación social?', category: 'I', area: 'intereses', topic: 'retos contemporáneos' },
      { id: 415, text: '¿Prefieres roles con alta definición de funciones, gobernanza clara y seguridad jurídica?', category: 'C', area: 'preferencias', topic: 'gobernanza' }
    ],
    'perfil-profesional': [
      { id: 421, text: '¿Cuáles de tus habilidades desarrolladas a lo largo de tu trayectoria consideras más valiosas y transferibles?', category: 'C', area: 'habilidades', topic: 'habilidades transferibles' },
      { id: 422, text: '¿Te visualizas desempeñándote como consultor, mentor, investigador senior o asesor estratégico?', category: 'I', area: 'intereses', topic: 'mentoría y consultoría' },
      { id: 423, text: '¿Deseas emprender tu propio modelo de negocio o consolidar una empresa independiente?', category: 'E', area: 'intereses', topic: 'emprendimiento consolidado' },
      { id: 424, text: '¿Te atraen los procesos de mediación humana, gestión del talento o desarrollo organizacional?', category: 'S', area: 'habilidades', topic: 'talento humano' },
      { id: 425, text: '¿Buscas reorientarte hacia la producción artística, literaria, audiovisual o de diseño de experiencias?', category: 'A', area: 'intereses', topic: 'creatividad y experiencia' }
    ],
    'intereses-habilidades': [
      { id: 431, text: '[Mis Intereses Actuales] ¿Qué temas despiertan hoy tu pasión que quizá postergaste en el pasado?', category: 'A', area: 'intereses', topic: 'intereses actuales' },
      { id: 432, text: '[Mis Intereses Actuales] ¿Qué tipo de problemas te gustaría dedicarte a resolver en tu próxima década?', category: 'I', area: 'intereses', topic: 'propósito a largo plazo' },
      { id: 433, text: '[Mis Habilidades Desarrolladas] ¿Qué competencias de gestión, comunicación y resolución tienes ya afianzadas?', category: 'E', area: 'habilidades', topic: 'competencias consolidadas' },
      { id: 434, text: '[Mis Habilidades Desarrolladas] ¿Tienes facilidad para adaptarte a nuevas herramientas de trabajo y metodologías ágiles?', category: 'R', area: 'habilidades', topic: 'adaptabilidad' },
      { id: 435, text: '[Mis Habilidades Desarrolladas] ¿Te destacas por tu capacidad de escucha empática y liderazgo de equipos diversos?', category: 'S', area: 'habilidades', topic: 'liderazgo empático' }
    ],
    reorientacion: [
      { id: 441, text: '¿Estás buscando activamente una reconversión laboral hacia un sector completamente nuevo?', category: 'E', area: 'intereses', topic: 'reconversión laboral' },
      { id: 442, text: '¿Qué tan dispuesto estás a cursar una nueva carrera universitaria, tecnología o posgrado habilitante?', category: 'I', area: 'preferencias', topic: 'disposición al estudio' },
      { id: 443, text: '¿Cómo podrías articular tu bagaje laboral anterior con una nueva disciplina profesional?', category: 'C', area: 'habilidades', topic: 'sinergia de trayectoria' },
      { id: 444, text: '¿Buscas mayor libertad creativa o un trabajo con un sentido de vocación más profundo que el actual?', category: 'A', area: 'personalidad', topic: 'búsqueda de vocación' },
      { id: 445, text: '¿Te motiva la idea de formarte para asumir roles de enseñanza o consultoría especializada?', category: 'S', area: 'intereses', topic: 'docencia y consultoría' }
    ]
  }
};

/**
 * Obtiene las preguntas adecuadas para la categoría y la etapa de edad del usuario.
 */
export function getAdaptiveQuestions(
  categoryId: TestCategoryId,
  ageStage: AgeStage
): Question[] {
  const stageQuestions = ADAPTIVE_QUESTIONS_BY_STAGE[ageStage] || ADAPTIVE_QUESTIONS_BY_STAGE.adolescencia;
  const categoryQuestions = stageQuestions[categoryId] || stageQuestions.estudiantes;
  return categoryQuestions;
}

/**
 * Obtiene metadatos de la categoría
 */
export function getTestCategoryInfo(categoryId: TestCategoryId): TestCategoryInfo {
  const found = TEST_CATEGORIES_DATA.find(c => c.id === categoryId);
  return found || TEST_CATEGORIES_DATA[0];
}

/**
 * Metadatos descriptivos de las 4 etapas de edad
 */
export const AGE_STAGES_INFO: Record<AgeStage, {
  name: string;
  ageRange: string;
  focus: string;
  tone: string;
  description: string;
}> = {
  infancia: {
    name: 'Infancia y Descubrimiento',
    ageRange: 'Hasta 12 años',
    focus: 'Explorar gustos, talentos, curiosidades y lo que disfrutas hacer',
    tone: 'Sencillo, cercano, visual y amigable',
    description: 'Preguntas cortas, ejemplos de la vida cotidiana y actividades lúdicas para explorar intereses sin definir una profesión.'
  },
  adolescencia: {
    name: 'Adolescencia y Exploración Escolar',
    ageRange: '13 a 17 años',
    focus: 'Materias favoritas, habilidades, actividades preferidas y áreas vocacionales',
    tone: 'Dinámico, motivador y claro',
    description: 'Orientación para descubrir posibilidades de futuro, afianzar fortalezas escolares y explorar opciones formativas.'
  },
  juventud: {
    name: 'Juventud y Formación Superior',
    ageRange: '18 a 25 años',
    focus: 'Áreas profesionales, ambientes de trabajo, valores y opciones de carrera',
    tone: 'Formativo, reflexivo y profesional',
    description: 'Profundización en competencias, estilos laborales, opciones de educación técnica o universitaria y proyección de vida.'
  },
  adultez: {
    name: 'Adultez y Reorientación Profesional',
    ageRange: '26 años en adelante',
    focus: 'Perfil profesional, habilidades adquiridas, experiencia, nuevos objetivos y cambio de carrera',
    tone: 'Estratégico, maduro y analítico',
    description: 'Enfoque en habilidades transferibles, reconversión laboral, actualización y exploración de nuevas rutas formativas.'
  }
};
