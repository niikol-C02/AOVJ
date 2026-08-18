import { Career, Question, RiasecDimension, RiasecType, Scholarship, University } from '../types';

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

export const VOCATIONAL_QUESTIONS: Question[] = [
  // Intereses (1-8)
  {
    id: 1,
    text: '¿Disfrutas desarmar aparatos electrónicos o reparar cosas para entender cómo funcionan?',
    category: 'R',
    area: 'intereses'
  },
  {
    id: 2,
    text: '¿Te apasiona investigar en internet o libros sobre misterios científicos, astronomía o avances tecnológicos?',
    category: 'I',
    area: 'intereses'
  },
  {
    id: 3,
    text: '¿Te gusta dibujar, componer música, editar videos, tomar fotografías o escribir historias originales?',
    category: 'A',
    area: 'intereses'
  },
  {
    id: 4,
    text: '¿Sientes satisfacción cuando explicas un tema difícil a un compañero y logras que lo comprenda?',
    category: 'S',
    area: 'intereses'
  },
  {
    id: 5,
    text: '¿Te atrae la idea de crear tu propia empresa, vender productos innovadores o liderar un equipo juvenil?',
    category: 'E',
    area: 'intereses'
  },
  {
    id: 6,
    text: '¿Te resulta placentero organizar tus apuntes con esquemas, listas ordenadas y gestionar presupuestos o calendarios?',
    category: 'C',
    area: 'intereses'
  },
  {
    id: 7,
    text: '¿Te gustaría trabajar en contacto directo con la naturaleza, cultivos ecológicos, animales o maquinaria de precisión?',
    category: 'R',
    area: 'intereses'
  },
  {
    id: 8,
    text: '¿Disfrutas resolver acertijos lógicos, rompecabezas matemáticos o plantear hipótesis sobre problemas de la sociedad?',
    category: 'I',
    area: 'intereses'
  },

  // Habilidades y Talentos (9-16)
  {
    id: 9,
    text: '¿Tienes facilidad para crear diseños visuales atractivos, combinar colores o dar identidad estética a proyectos?',
    category: 'A',
    area: 'habilidades'
  },
  {
    id: 10,
    text: '¿Tus amigos suelen buscarte para pedirte consejos porque eres bueno escuchando y entendiendo sus emociones?',
    category: 'S',
    area: 'habilidades'
  },
  {
    id: 11,
    text: '¿Se te facilita convencer a otros de tus ideas y motivar a grupos para lograr una meta común?',
    category: 'E',
    area: 'habilidades'
  },
  {
    id: 12,
    text: '¿Eres muy detallista encontrando errores en textos, cuentas numéricas o tablas de información?',
    category: 'C',
    area: 'habilidades'
  },
  {
    id: 13,
    text: '¿Tienes buena coordinación física y habilidad para construir maquetas, circuitos o manipular herramientas?',
    category: 'R',
    area: 'habilidades'
  },
  {
    id: 14,
    text: '¿Se te da bien interpretar gráficos estadísticos, estadísticas deportivas o fórmulas analíticas?',
    category: 'I',
    area: 'habilidades'
  },
  {
    id: 15,
    text: '¿Disfrutas improvisar soluciones creativas e innovadoras fuera de lo común cuando surge un imprevisto?',
    category: 'A',
    area: 'habilidades'
  },
  {
    id: 16,
    text: '¿Te gusta participar en actividades de voluntariado, apoyo a la comunidad o campañas solidarias?',
    category: 'S',
    area: 'habilidades'
  },

  // Personalidad y Estilo de Trabajo (17-24)
  {
    id: 17,
    text: '¿Prefieres tomar la iniciativa y proponer nuevas estrategias en vez de solo seguir órdenes de otros?',
    category: 'E',
    area: 'personalidad'
  },
  {
    id: 18,
    text: '¿Te sientes más cómodo siguiendo un horario estructurado, con reglas claras y pasos bien definidos?',
    category: 'C',
    area: 'personalidad'
  },
  {
    id: 19,
    text: '¿Prefieres un ambiente de trabajo dinámico donde puedas moverte y trabajar físicamente en vez de estar todo el día en una silla?',
    category: 'R',
    area: 'personalidad'
  },
  {
    id: 20,
    text: '¿Te gusta profundizar en un tema hasta dominar todos sus fundamentos teóricos antes de dar una opinión?',
    category: 'I',
    area: 'personalidad'
  },
  {
    id: 21,
    text: '¿Te aburren las rutinas estrictas y prefieres tener libertad de horarios para crear e innovar?',
    category: 'A',
    area: 'personalidad'
  },
  {
    id: 22,
    text: '¿Te importa profundamente que tu futuro trabajo tenga un propósito social que beneficie a las personas vulnerables?',
    category: 'S',
    area: 'personalidad'
  },
  {
    id: 23,
    text: '¿Te emociona negociar precios, identificar oportunidades de inversión y hablar en público con seguridad?',
    category: 'E',
    area: 'personalidad'
  },
  {
    id: 24,
    text: '¿Valoras la precisión, la seguridad documental y el cumplimiento de normas de calidad y leyes?',
    category: 'C',
    area: 'personalidad'
  },

  // Preferencias Profesionales (25-30)
  {
    id: 25,
    text: '¿Te interesaría programar robots, diseñar satélites, supervisar obras civiles o pilotar aeronaves?',
    category: 'R',
    area: 'preferencias'
  },
  {
    id: 26,
    text: '¿Te gustaría trabajar en laboratorios de biotecnología, desarrollo de vacunas o análisis de inteligencia artificial?',
    category: 'I',
    area: 'preferencias'
  },
  {
    id: 27,
    text: '¿Te imaginas trabajando en producción audiovisual, ilustración digital, arquitectura estética o publicidad creativa?',
    category: 'A',
    area: 'preferencias'
  },
  {
    id: 28,
    text: '¿Te llama la atención la psicología clínica, la medicina comunitaria, la educación o el trabajo social?',
    category: 'S',
    area: 'preferencias'
  },
  {
    id: 29,
    text: '¿Te imaginas como CEO de una startup, gerente de marketing global o director de expansión de marcas?',
    category: 'E',
    area: 'preferencias'
  },
  {
    id: 30,
    text: '¿Te gustaría especializarte en finanzas corporativas, auditoría contable, logística internacional o ciberseguridad?',
    category: 'C',
    area: 'preferencias'
  }
];

export const CAREERS_DATA: Career[] = [
  {
    id: 'ing-software-ia',
    name: 'Ingeniería de Software e Inteligencia Artificial',
    area: 'Tecnología e Informática',
    categoryColor: 'indigo',
    duration: '4 a 5 años (8-10 semestres)',
    degreeType: 'Ingeniería',
    riasecPrimary: 'I',
    riasecSecondary: 'R',
    shortDescription: 'Diseña, programa y optimiza aplicaciones inteligentes, algoritmos de aprendizaje automático y sistemas computacionales globales.',
    fullDescription: 'La carrera de Ingeniería de Software e IA forma profesionales capaces de liderar la transformación digital mediante el desarrollo de software escalable, arquitecturas en la nube, modelos predictivos y soluciones tecnológicas de vanguardia.',
    necessarySkills: ['Programación lógica', 'Resolución de problemas', 'Matemáticas discretas', 'Trabajo ágil en equipo', 'Inglés técnico'],
    workFields: ['Empresas Big Tech y Startups', 'Bancos y Fintech', 'Desarrollo de videojuegos', 'Consultoría de software internacional', 'Investigación en IA'],
    averageSalaryRange: '$1,500 - $4,500 USD / mes',
    employabilityRate: '96%',
    dailyActivities: [
      'Escribir y revisar código limpio en TypeScript, Python o Rust',
      'Diseñar arquitecturas de microservicios y bases de datos',
      'Entrenar e implementar modelos de Machine Learning',
      'Participar en reuniones de sincronización de producto'
    ],
    relatedSubjects: ['Estructuras de Datos', 'Algoritmos', 'Redes Neuronales', 'Bases de Datos SQL/NoSQL', 'Arquitectura de Software'],
    suggestedUniversities: ['uni-nacional', 'uni-andes', 'uni-tec-monterrey', 'uni-catolica-chile', 'uni-unam'],
    iconName: 'Code',
    isTrending: true
  },
  {
    id: 'medicina-general',
    name: 'Medicina y Cirugía',
    area: 'Ciencias de la Salud',
    categoryColor: 'rose',
    duration: '6 a 7 años (12-14 semestres)',
    degreeType: 'Medicina',
    riasecPrimary: 'I',
    riasecSecondary: 'S',
    shortDescription: 'Diagnostica, trata y previene enfermedades para salvar vidas y promover la salud integral comunitaria.',
    fullDescription: 'La medicina es una vocación de servicio fundamentada en la ciencia biomédica, la empatía clínica y la ética médica. Te prepara para diagnosticar patologías, brindar tratamientos de vanguardia y liderar intervenciones de salud pública.',
    necessarySkills: ['Empatía profunda', 'Resistencia al estrés', 'Pensamiento clínico', 'Destreza de precisión', 'Capacidad de memorización'],
    workFields: ['Hospitales y clínicas de alta complejidad', 'Centros de investigación médica', 'Organizaciones humanitarias (OMS/Cruz Roja)', 'Consulta privada', 'Telemedicina'],
    averageSalaryRange: '$1,800 - $5,000 USD / mes',
    employabilityRate: '98%',
    dailyActivities: [
      'Realizar consultas clínicas y exámenes físicos',
      'Interpretar análisis de laboratorio y resonancias magnéticas',
      'Prescribir tratamientos farmacológicos personalizados',
      'Participar en guardias hospitalarias y procedimientos quirúrgicos'
    ],
    relatedSubjects: ['Anatomía Humana', 'Fisiología', 'Farmacología', 'Inmunología', 'Patología Clínica'],
    suggestedUniversities: ['uni-unam', 'uni-javeriana', 'uni-buenos-aires', 'uni-chile', 'uni-nacional'],
    iconName: 'Stethoscope',
    isTrending: true
  },
  {
    id: 'psicologia-clinica',
    name: 'Psicología y Bienestar Humano',
    area: 'Ciencias Sociales y Salud',
    categoryColor: 'purple',
    duration: '4 a 5 años (8-10 semestres)',
    degreeType: 'Licenciatura',
    riasecPrimary: 'S',
    riasecSecondary: 'I',
    shortDescription: 'Comprende el comportamiento, los procesos mentales y acompaña el bienestar emocional y social de las personas.',
    fullDescription: 'Estudia las dimensiones cognitivas, emocionales y relacionales del ser humano. Capacita para evaluar, diagnosticar e intervenir en salud mental, desarrollo infantil, psicología educativa y organizacional.',
    necessarySkills: ['Escucha activa', 'Cero juicio y empatía', 'Análisis conductual', 'Comunicación asertiva', 'Manejo confidencial'],
    workFields: ['Clínicas de salud mental y consultorios', 'Colegios e instituciones educativas', 'Recursos humanos en corporaciones', 'Investigación neuropsicológica', 'ONGs de apoyo comunitario'],
    averageSalaryRange: '$1,000 - $2,800 USD / mes',
    employabilityRate: '88%',
    dailyActivities: [
      'Conducir sesiones terapéuticas individuales y familiares',
      'Aplicar pruebas psicométricas y de personalidad',
      'Diseñar programas de prevención del estrés y ansiedad',
      'Elaborar informes de diagnóstico y evolución'
    ],
    relatedSubjects: ['Neuroanatomía', 'Psicopatología', 'Terapia Cognitivo-Conductual', 'Psicología Social', 'Evaluación Psicométrica'],
    suggestedUniversities: ['uni-javeriana', 'uni-unam', 'uni-andes', 'uni-buenos-aires'],
    iconName: 'Brain'
  },
  {
    id: 'diseno-digital-ux-ui',
    name: 'Diseño Digital y Experiencia de Usuario (UX/UI)',
    area: 'Arte, Diseño y Medios',
    categoryColor: 'pink',
    duration: '4 años (8 semestres)',
    degreeType: 'Licenciatura',
    riasecPrimary: 'A',
    riasecSecondary: 'I',
    shortDescription: 'Crea productos digitales atractivos, aplicaciones móviles intuitivas e interfaces visuales de alto impacto.',
    fullDescription: 'Combina la creatividad estética con la psicología del usuario y la tecnología. Los diseñadores UX/UI investigan cómo interactúan las personas con pantallas y crean flujos visuales hermosos, accesibles y memorables.',
    necessarySkills: ['Creatividad visual', 'Manejo de Figma y suite Adobe', 'Empatía con el usuario', 'Pensamiento de diseño (Design Thinking)', 'Prototipado interactivo'],
    workFields: ['Agencias de producto digital globales', 'Compañías de software y videojuegos', 'Empresas de e-commerce', 'Freelance y nómada digital', 'Estudios de branding'],
    averageSalaryRange: '$1,400 - $3,800 USD / mes',
    employabilityRate: '93%',
    dailyActivities: [
      'Crear wireframes, prototipos animados y sistemas de diseño',
      'Realizar entrevistas con usuarios y tests de usabilidad',
      'Diseñar ilustraciones, íconos y paletas cromáticas',
      'Colaborar con desarrolladores para afinar detalles en vivo'
    ],
    relatedSubjects: ['Teoría del Color y Tipografía', 'Arquitectura de Información', 'Research de Usuario', 'Diseño de Interacción', 'Branding Digital'],
    suggestedUniversities: ['uni-tec-monterrey', 'uni-andes', 'uni-palermo', 'uni-catolica-peru'],
    iconName: 'Palette',
    isTrending: true
  },
  {
    id: 'ing-biomedica',
    name: 'Ingeniería Biomédica y Biotecnología',
    area: 'Ingenierías y Ciencias',
    categoryColor: 'teal',
    duration: '5 años (10 semestres)',
    degreeType: 'Ingeniería',
    riasecPrimary: 'I',
    riasecSecondary: 'R',
    shortDescription: 'Aplica la ingeniería a la medicina: prótesis biónicas, órganos artificiales, equipos médicos y nanotecnología.',
    fullDescription: 'Una de las carreras con mayor proyección del siglo XXI. Desarrolla tecnología sanitaria que salva vidas: desde sensores de monitoreo cardíaco hasta algoritmos de detección temprana de cáncer y prótesis robóticas.',
    necessarySkills: ['Biofísica y química', 'Diseño CAD en 3D', 'Programación de microcontroladores', 'Innovación biomédica', 'Resolución analítica'],
    workFields: ['Fabricantes de dispositivos médicos (Medtronic, Siemens)', 'Hospitales de alta tecnología', 'Centros de investigación genómica', 'Startups de BioTech'],
    averageSalaryRange: '$1,600 - $4,200 USD / mes',
    employabilityRate: '91%',
    dailyActivities: [
      'Prototipar sensores de señales bioeléctricas (ECG/EEG)',
      'Diseñar y calibrar equipamiento de soporte vital',
      'Validar protocolos de bioseguridad internacional',
      'Probar nuevos biomateriales para implantes'
    ],
    relatedSubjects: ['Biomecánica', 'Procesamiento de Señales Biológicas', 'Biomateriales', 'Electrónica Médica', 'Genética y Tejidos'],
    suggestedUniversities: ['uni-tec-monterrey', 'uni-andes', 'uni-unam', 'uni-chile'],
    iconName: 'HeartPulse'
  },
  {
    id: 'administracion-negocios',
    name: 'Administración de Empresas y Emprendimiento',
    area: 'Negocios y Gestión',
    categoryColor: 'amber',
    duration: '4 a 5 años (8-10 semestres)',
    degreeType: 'Licenciatura',
    riasecPrimary: 'E',
    riasecSecondary: 'C',
    shortDescription: 'Lidera organizaciones, formula estrategias comerciales rentables y gestiona el talento hacia el éxito financiero.',
    fullDescription: 'Proporciona una visión integral de cómo operan los negocios modernos. Aprenderás finanzas corporativas, marketing estratégico, operaciones sostenibles, liderazgo de equipos y cómo levantar capital de inversión para startups.',
    necessarySkills: ['Liderazgo estratégico', 'Comunicación ejecutiva', 'Análisis financiero', 'Negociación', 'Toma de riesgos calculados'],
    workFields: ['Multinacionales y corporaciones', 'Startups en aceleración', 'Banca y fondos de inversión', 'Consultoría de gestión', 'Creación de empresa propia'],
    averageSalaryRange: '$1,200 - $3,500 USD / mes',
    employabilityRate: '90%',
    dailyActivities: [
      'Elaborar planes de negocio y modelos de monetización',
      'Supervisar presupuestos y proyecciones de flujo de caja',
      'Liderar comités de dirección y toma de decisiones',
      'Negociar alianzas estratégicas con clientes y proveedores'
    ],
    relatedSubjects: ['Finanzas Corporativas', 'Marketing Estratégico', 'Gestión de Talento Humano', 'Modelos de Negocio', 'Economía Empresarial'],
    suggestedUniversities: ['uni-tec-monterrey', 'uni-andes', 'uni-catolica-chile', 'uni-pacifico'],
    iconName: 'Briefcase'
  },
  {
    id: 'arquitectura-urbanismo',
    name: 'Arquitectura y Urbanismo Sostenible',
    area: 'Arte y Construcción',
    categoryColor: 'orange',
    duration: '5 años (10 semestres)',
    degreeType: 'Licenciatura',
    riasecPrimary: 'A',
    riasecSecondary: 'R',
    shortDescription: 'Diseña espacios habitables, edificios bioclimáticos y ciudades inteligentes que transforman el entorno humano.',
    fullDescription: 'Une el arte de la composición espacial con la física estructural y la sostenibilidad ambiental. Los arquitectos conciben casas, rascacielos, parques urbanos y espacios públicos que mejoran la calidad de vida de las comunidades.',
    necessarySkills: ['Visión espacial 3D', 'Sensibilidad estética', 'Manejo de Revit/AutoCAD/Rhino', 'Criterio estructural', 'Sostenibilidad ambiental'],
    workFields: ['Estudios de arquitectura y urbanismo', 'Empresas constructoras e inmobiliarias', 'Diseño de interiores y escenografía', 'Gestión pública de obras y patrimonio', 'Consultoría bioclimática'],
    averageSalaryRange: '$1,300 - $3,600 USD / mes',
    employabilityRate: '87%',
    dailyActivities: [
      'Modelar volumetrías y renders hiperrealistas',
      'Elaborar planos ejecutivos e instalaciones técnicas',
      'Supervisar avances en obras de construcción',
      'Presentar propuestas de diseño a clientes e inversionistas'
    ],
    relatedSubjects: ['Taller de Proyectos Arquitectónicos', 'Estructuras y Materiales', 'Historia de la Arquitectura', 'Arquitectura Bioclimática', 'Urbanismo'],
    suggestedUniversities: ['uni-unam', 'uni-nacional', 'uni-catolica-chile', 'uni-buenos-aires'],
    iconName: 'Building2'
  },
  {
    id: 'derecho-justicia',
    name: 'Derecho, Leyes y Resolución de Conflictos',
    area: 'Ciencias Sociales y Humanidades',
    categoryColor: 'violet',
    duration: '5 años (10 semestres)',
    degreeType: 'Licenciatura',
    riasecPrimary: 'E',
    riasecSecondary: 'S',
    shortDescription: 'Defiende los derechos ciudadanos, promueve la justicia social y asesora en leyes corporativas y constitucionales.',
    fullDescription: 'La carrera de Derecho forja juristas con sólido pensamiento crítico, dominio de la oratoria argumentativa y conocimiento profundo del ordenamiento jurídico para defender causas justas y regular las relaciones humanas y comerciales.',
    necessarySkills: ['Oratoria y argumentación', 'Lectura crítica profunda', 'Ética y rectitud', 'Negociación de litigios', 'Investigación jurídica'],
    workFields: ['Bufetes de abogados nacionales e internacionales', 'Poder judicial y fiscalías', 'Departamentos legales de empresas', 'Diplomacia y organismos de DD.HH.', 'Asesoría legislativa'],
    averageSalaryRange: '$1,300 - $4,000 USD / mes',
    employabilityRate: '89%',
    dailyActivities: [
      'Redactar contratos mercantiles y demandas judiciales',
      'Comparecer en audiencias orales y juicios',
      'Asesorar a clientes sobre cumplimiento normativo',
      'Estudiar jurisprudencia y precedentes legales'
    ],
    relatedSubjects: ['Derecho Constitucional', 'Derecho Civil y Contratos', 'Derecho Penal', 'Derecho Corporativo', 'Argumentación Jurídica'],
    suggestedUniversities: ['uni-unam', 'uni-buenos-aires', 'uni-javeriana', 'uni-andes'],
    iconName: 'Scale'
  },
  {
    id: 'ciencia-datos-ia',
    name: 'Ciencia de Datos y Analítica Avanzada',
    area: 'Tecnología e Informática',
    categoryColor: 'cyan',
    duration: '4 a 5 años (8-10 semestres)',
    degreeType: 'Ingeniería',
    riasecPrimary: 'I',
    riasecSecondary: 'C',
    shortDescription: 'Descubre patrones ocultos en millones de datos para predecir tendencias y tomar decisiones estratégicas de alto impacto.',
    fullDescription: 'Una de las disciplinas más demandadas a nivel global. Combina estadística avanzada, programación en Python y Big Data para resolver desafíos en medicina, finanzas, deportes, clima y entretenimiento.',
    necessarySkills: ['Estadística inferencial', 'Programación en Python/R/SQL', 'Visualización de datos con D3/Tableau', 'Curiosidad analítica', 'Modelado predictivo'],
    workFields: ['Plataformas de streaming y comercio electrónico', 'Banca y fondos de cobertura (Hedge Funds)', 'Epidemiología y salud pública', 'Aeroespacial y automoción autónoma'],
    averageSalaryRange: '$1,600 - $4,800 USD / mes',
    employabilityRate: '97%',
    dailyActivities: [
      'Limpiar y estructurar grandes volúmenes de datos',
      'Crear tableros interactivos de métricas clave',
      'Construir modelos de predicción y clustering',
      'Traducir hallazgos matemáticos a decisiones de negocio'
    ],
    relatedSubjects: ['Probabilidad y Estadística', 'Minería de Datos', 'Machine Learning', 'Big Data Engineering', 'Visualización de Información'],
    suggestedUniversities: ['uni-tec-monterrey', 'uni-andes', 'uni-catolica-chile', 'uni-nacional'],
    iconName: 'LineChart',
    isTrending: true
  },
  {
    id: 'marketing-digital-creacion',
    name: 'Marketing Digital y Estrategia de Contenidos',
    area: 'Negocios y Comunicación',
    categoryColor: 'fuchsia',
    duration: '4 años (8 semestres)',
    degreeType: 'Licenciatura',
    riasecPrimary: 'E',
    riasecSecondary: 'A',
    shortDescription: 'Diseña campañas virales, posiciona marcas en redes sociales y conecta productos con millones de consumidores.',
    fullDescription: 'Explora la confluencia entre la creatividad publicitaria y la analítica digital. Aprenderás a crear estrategias de marca, optimizar pauta en Meta y Google, gestionar influencers y construir comunidades digitales leales.',
    necessarySkills: ['Creatividad comunicativa', 'Storytelling persuasivo', 'Manejo de Ads y Analytics', 'Adaptabilidad a tendencias', 'Pensamiento comercial'],
    workFields: ['Agencias de publicidad y marketing', 'Departamentos de marketing de marcas de consumo', 'Empresas de entretenimiento y medios', 'Emprendimiento propio', 'Consultoría de Growth'],
    averageSalaryRange: '$1,100 - $3,200 USD / mes',
    employabilityRate: '92%',
    dailyActivities: [
      'Planificar calendarios de contenido para TikTok, Instagram y YouTube',
      'Analizar métricas de conversión (ROI, CTR, CAC)',
      'Diseñar guiones para campañas audiovisuales',
      'Coordinar lanzamientos de productos con equipos creativos'
    ],
    relatedSubjects: ['Comportamiento del Consumidor', 'Growth Hacking', 'Publicidad Digital', 'Analítica Web', 'Storytelling y Copywriting'],
    suggestedUniversities: ['uni-palermo', 'uni-javeriana', 'uni-tec-monterrey', 'uni-pacifico'],
    iconName: 'Megaphone'
  },
  {
    id: 'ciencias-ambientales-eco',
    name: 'Ingeniería Ambiental y Sostenibilidad',
    area: 'Ciencias de la Tierra y Medio Ambiente',
    categoryColor: 'emerald',
    duration: '5 años (10 semestres)',
    degreeType: 'Ingeniería',
    riasecPrimary: 'I',
    riasecSecondary: 'R',
    shortDescription: 'Combate el cambio climático, desarrolla energías renovables y protege ecosistemas y fuentes hídricas.',
    fullDescription: 'Forma profesionales dedicados a proteger el planeta. Desarrolla proyectos de energía solar y eólica, tratamiento de aguas residuales, economía circular, evaluación de impacto ambiental y conservación de biodiversidad.',
    necessarySkills: ['Química y ecología', 'Pasión por la conservación', 'Trabajo de campo en terreno', 'Diseño de sistemas sostenibles', 'Legislación ambiental'],
    workFields: ['Empresas de energías renovables', 'Organismos de protección ambiental estatales', 'Consultorías de huella de carbono', 'Parques nacionales y ONGs ecologistas'],
    averageSalaryRange: '$1,200 - $3,400 USD / mes',
    employabilityRate: '89%',
    dailyActivities: [
      'Tomar y analizar muestras de agua, aire y suelo',
      'Diseñar plantas de reciclaje y tratamiento de residuos',
      'Auditar el impacto ecológico de proyectos industriales',
      'Capacitar comunidades en prácticas de desarrollo sostenible'
    ],
    relatedSubjects: ['Ecología General', 'Tratamiento de Aguas', 'Energías Renovables', 'Gestión de Residuos', 'Legislación y Evaluación de Impacto Ambiental'],
    suggestedUniversities: ['uni-nacional', 'uni-unam', 'uni-chile', 'uni-buenos-aires'],
    iconName: 'Leaf'
  },
  {
    id: 'ciberseguridad-redes',
    name: 'Ciberseguridad y Protección de Redes',
    area: 'Tecnología e Informática',
    categoryColor: 'red',
    duration: '4 a 5 años (8-10 semestres)',
    degreeType: 'Ingeniería',
    riasecPrimary: 'C',
    riasecSecondary: 'I',
    shortDescription: 'Defiende sistemas financieros, infraestructuras críticas y datos confidenciales contra ciberataques y hackers.',
    fullDescription: 'La ciberseguridad es una prioridad mundial crítica. Los especialistas en seguridad informática realizan pruebas de penetración (Hacking Ético), auditan códigos vulnerables, diseñan criptografía y responden a incidentes de seguridad en tiempo real.',
    necessarySkills: ['Hacking ético y pentesting', 'Criptografía y redes', 'Forense digital', 'Atención milimétrica al detalle', 'Pensamiento defensivo'],
    workFields: ['Bancos y plataformas de pago', 'Gobiernos y defensa nacional', 'Firmas especializadas de ciberdefensa', 'Empresas multinacionales', 'Auditoría de seguridad'],
    averageSalaryRange: '$1,700 - $5,200 USD / mes',
    employabilityRate: '99%',
    dailyActivities: [
      'Simular ataques cibernéticos controlados para hallar vulnerabilidades',
      'Monitorear consolas de alerta de intrusiones en tiempo real',
      'Configurar firewalls avanzados y túneles encriptados',
      'Elaborar planes de contingencia y respuesta a desastres digitales'
    ],
    relatedSubjects: ['Redes y Protocolos TCP/IP', 'Criptografía', 'Seguridad en la Nube', 'Análisis Forense Digital', 'Hacking Ético'],
    suggestedUniversities: ['uni-tec-monterrey', 'uni-andes', 'uni-nacional', 'uni-catolica-chile'],
    iconName: 'ShieldAlert',
    isTrending: true
  },
  {
    id: 'medicina-veterinaria',
    name: 'Medicina Veterinaria y Zootecnia',
    area: 'Ciencias de la Salud Animal',
    categoryColor: 'amber',
    duration: '5 años (10 semestres)',
    degreeType: 'Medicina',
    riasecPrimary: 'R',
    riasecSecondary: 'S',
    shortDescription: 'Cuida la salud de animales domésticos, especies exóticas y optimiza la producción pecuaria sostenible.',
    fullDescription: 'Una carrera noble que combina el amor por los animales con el rigor de la medicina quirúrgica y la biología. Te capacita para diagnosticar dolencias en mascotas, fauna silvestre o ganado, y garantizar la inocuidad alimentaria.',
    necessarySkills: ['Amor y respeto por los animales', 'Destreza médica y quirúrgica', 'Capacidad de observación', 'Resiliencia emocional', 'Manejo etológico'],
    workFields: ['Hospitales veterinarios y clínicas de mascotas', 'Zoológicos y centros de rescate de fauna', 'Fincas y centros de producción agropecuaria', 'Salud pública y control zoonótico'],
    averageSalaryRange: '$1,100 - $2,900 USD / mes',
    employabilityRate: '88%',
    dailyActivities: [
      'Realizar chequeos médicos y vacunar animales',
      'Ejecutar cirugías de emergencia o esterilizaciones',
      'Atender animales silvestres en procesos de rehabilitación',
      'Asesorar a tutores de mascotas sobre nutrición y conducta'
    ],
    relatedSubjects: ['Anatomía Veterinaria', 'Cirugía y Anestesia', 'Farmacología Animal', 'Nutrición y Zootecnia', 'Epidemiología Veterinaria'],
    suggestedUniversities: ['uni-nacional', 'uni-unam', 'uni-buenos-aires', 'uni-chile'],
    iconName: 'PawPrint'
  },
  {
    id: 'gastronomia-artes-culinarias',
    name: 'Gastronomía y Dirección de Artes Culinarias',
    area: 'Arte, Hospitalidad y Negocios',
    categoryColor: 'rose',
    duration: '4 años (8 semestres)',
    degreeType: 'Licenciatura',
    riasecPrimary: 'A',
    riasecSecondary: 'E',
    shortDescription: 'Crea experiencias sensoriales únicas a través del arte culinario, la alta cocina y la gestión de restaurantes.',
    fullDescription: 'Va mucho más allá de cocinar: abarca la química de los alimentos, la vanguardia culinaria, el maridaje, la pastelería de autor y la administración de restaurantes de prestigio internacional.',
    necessarySkills: ['Creatividad sensorial y del gusto', 'Gestión bajo presión y velocidad', 'Higiene y control bromatológico', 'Liderazgo en brigadas de cocina', 'Pasión por la innovación'],
    workFields: ['Restaurantes con estrellas Michelin y hoteles de lujo', 'Creación de conceptos gastronómicos propios', 'Crítica y periodismo culinario', 'Industria de desarrollo de alimentos'],
    averageSalaryRange: '$1,000 - $3,000 USD / mes',
    employabilityRate: '86%',
    dailyActivities: [
      'Diseñar cartas de autor y maridajes sensoriales',
      'Coordinar la brigada en el pase durante el servicio de cocina',
      'Experimentar con técnicas de cocina molecular y tradicional',
      'Costear recetas y asegurar estándares de calidad e inocuidad'
    ],
    relatedSubjects: ['Técnicas Culinarias Clásicas y Modernas', 'Pastelería y Chocolatería', 'Enología y Maridaje', 'Gestión de Alimentos y Bebidas', 'Seguridad Alimentaria'],
    suggestedUniversities: ['uni-le-cordon-bleu', 'uni-palermo', 'uni-javeriana'],
    iconName: 'Utensils'
  },
  {
    id: 'fisioterapia-kinesiologia',
    name: 'Fisioterapia y Kinesiología Deportiva',
    area: 'Ciencias de la Salud y Deporte',
    categoryColor: 'blue',
    duration: '4 a 5 años (8-10 semestres)',
    degreeType: 'Licenciatura',
    riasecPrimary: 'S',
    riasecSecondary: 'R',
    shortDescription: 'Rehabilita el movimiento corporal humano, trata lesiones deportivas y devuelve la autonomía a pacientes.',
    fullDescription: 'Estudia la biomecánica del movimiento para rehabilitar a personas tras accidentes, cirugías o atletas de alto rendimiento con lesiones articulares o musculares mediante terapia manual, electroterapia y ejercicio terapéutico.',
    necessarySkills: ['Destreza en terapia manual', 'Paciencia y motivación empática', 'Conocimiento biomecánico profundo', 'Escucha y trato humano', 'Condición física'],
    workFields: ['Clubes deportivos de élite y gimnasios', 'Centros de rehabilitación neurológica y física', 'Hospitales y salas de cuidados intensivos', 'Atención domiciliaria y consulta privada'],
    averageSalaryRange: '$1,000 - $2,700 USD / mes',
    employabilityRate: '90%',
    dailyActivities: [
      'Evaluar rangos de movilidad articular y fuerza muscular',
      'Aplicar masoterapia, punción seca o vendaje neuromuscular',
      'Dirigir rutinas de ejercicios de readaptación funcional',
      'Diseñar planes de prevención de lesiones en deportistas'
    ],
    relatedSubjects: ['Anatomía Palpatoria', 'Biomecánica del Movimiento', 'Fisioterapia Deportiva', 'Neurorehabilitación', 'Terapia Manual Ortopédica'],
    suggestedUniversities: ['uni-javeriana', 'uni-nacional', 'uni-chile', 'uni-buenos-aires'],
    iconName: 'Activity'
  },
  {
    id: 'periodismo-comunicacion-digital',
    name: 'Periodismo y Nuevas Narrativas Digitales',
    area: 'Comunicación y Medios',
    categoryColor: 'violet',
    duration: '4 a 5 años (8-10 semestres)',
    degreeType: 'Licenciatura',
    riasecPrimary: 'A',
    riasecSecondary: 'S',
    shortDescription: 'Investiga la verdad, cuenta historias conmovedoras y produce podcasts, documentales y periodismo de datos.',
    fullDescription: 'En la era de la infoxicación, los comunicadores modernos dominan el rigor de la verificación de datos (fact-checking), el periodismo de investigación, la producción de podcasts, el periodismo móvil (MoJo) y los documentales multiplataforma.',
    necessarySkills: ['Curiosidad incansable e investigación', 'Excelente redacción y oratoria', 'Manejo de cámaras y edición de audio/video', 'Ética y compromiso social', 'Pensamiento crítico'],
    workFields: ['Medios de comunicación digitales y prensa', 'Productoras de podcasts y documentales', 'Corresponsalías internacionales', 'Gabinete de prensa y comunicación institucional', 'Creación independiente de contenidos informativos'],
    averageSalaryRange: '$900 - $2,600 USD / mes',
    employabilityRate: '84%',
    dailyActivities: [
      'Entrevistar a protagonistas de noticias y fuentes clave',
      'Verificar fuentes y cruzar datos documentales',
      'Grabar y editar cápsulas informativas y crónicas en video',
      'Publicar reportajes de profundidad con infografías interactivas'
    ],
    relatedSubjects: ['Técnicas de Reporteo e Investigación', 'Periodismo de Datos', 'Producción de Podcasts y Radio', 'Fotoperiodismo', 'Ética y Legislación de Prensa'],
    suggestedUniversities: ['uni-javeriana', 'uni-unam', 'uni-buenos-aires', 'uni-andes'],
    iconName: 'Mic'
  }
];

export const UNIVERSITIES_DATA: University[] = [
  {
    id: 'uni-nacional',
    name: 'Universidad Nacional',
    shortName: 'UNAL / UN',
    type: 'Pública',
    city: 'Bogotá, Medellín, Manizales',
    country: 'Colombia',
    logoText: 'UN',
    badgeBg: 'bg-emerald-600',
    description: 'La institución pública de educación superior más prestigiosa del país, reconocida por su excelencia investigativa, impacto social y accesibilidad de matrícula.',
    topCareers: ['Ingeniería de Software e IA', 'Medicina y Cirugía', 'Arquitectura y Urbanismo', 'Ingeniería Ambiental', 'Medicina Veterinaria'],
    admissionRequirements: [
      'Examen de admisión académico propio de alta exigencia',
      'Certificado de bachillerato completado',
      'Puntaje Saber 11 / Prueba de Estado',
      'Matrícula diferenciada según estrato socioeconómico'
    ],
    tuitionInfo: 'Pública subsidiada según nivel de ingresos (gratuidad para estratos 1, 2 y 3)',
    campusHighlights: [
      'Campus universitario con más de 120 hectáreas verdes y museos',
      'Más de 400 laboratorios de investigación científica',
      'Hospital Universitario y red de bibliotecas especializadas',
      'Programas de movilidad internacional en más de 30 países'
    ],
    websiteUrl: 'https://unal.edu.co',
    rating: 4.9
  },
  {
    id: 'uni-unam',
    name: 'Universidad Nacional Autónoma de México',
    shortName: 'UNAM',
    type: 'Pública',
    city: 'Ciudad de México',
    country: 'México',
    logoText: 'UNAM',
    badgeBg: 'bg-amber-600',
    description: 'Una de las universidades más grandes y reconocidas de Iberoamérica. Patrimonio Cultural de la Humanidad por su campus central y cuna de 3 Premios Nobel.',
    topCareers: ['Medicina y Cirugía', 'Derecho, Leyes y Justicia', 'Psicología', 'Arquitectura', 'Ciencias Ambientales'],
    admissionRequirements: [
      'Concurso de selección general (examen de 120 preguntas)',
      'Promedio mínimo de bachillerato de 7.0',
      'Documentación oficial apostillada en caso de extranjeros'
    ],
    tuitionInfo: 'Pública (cuota de recuperación simbólica voluntaria)',
    campusHighlights: [
      'Ciudad Universitaria con murales de Diego Rivera y David Alfaro Siqueiros',
      'Estadio Olímpico Universitario y Centro Cultural Universitario',
      'Red de institutos de investigación de nivel mundial'
    ],
    websiteUrl: 'https://www.unam.mx',
    rating: 4.9
  },
  {
    id: 'uni-andes',
    name: 'Universidad de los Andes',
    shortName: 'UniAndes',
    type: 'Privada',
    city: 'Bogotá',
    country: 'Colombia',
    logoText: 'ANDES',
    badgeBg: 'bg-yellow-500 text-black',
    description: 'Universidad privada líder en innovación, ingeniería, negocios y ciencias aplicadas, con acreditación internacional ABET y AACSB.',
    topCareers: ['Ingeniería de Software e IA', 'Diseño Digital UX/UI', 'Administración de Empresas', 'Ciencia de Datos', 'Ingeniería Biomédica'],
    admissionRequirements: [
      'Excelente puntaje en examen de Estado (Saber 11)',
      'Formulario de admisión en línea',
      'Opciones de becas de excelencia académica (Quiero Estudiar)'
    ],
    tuitionInfo: 'Privada (con amplias opciones de crédito condonable y becas de hasta el 100%)',
    campusHighlights: [
      'Laboratorios con supercómputo y robótica de última generación',
      'Centro de Emprendimiento e Innovación InnovAndes',
      'Convenios de doble titulación con universidades europeas y de EE.UU.'
    ],
    websiteUrl: 'https://uniandes.edu.co',
    rating: 4.8
  },
  {
    id: 'uni-tec-monterrey',
    name: 'Tecnológico de Monterrey (Tec de Monterrey)',
    shortName: 'ITESM / Tec',
    type: 'Privada',
    city: 'Monterrey, CDMX, Guadalajara',
    country: 'México',
    logoText: 'TEC',
    badgeBg: 'bg-blue-600',
    description: 'Referente mundial en emprendimiento, tecnología de punta y modelo educativo Tec21 basado en retos reales con empresas líderes.',
    topCareers: ['Ingeniería de Software e IA', 'Ciencia de Datos', 'Ciberseguridad', 'Administración de Empresas', 'Diseño Digital UX/UI'],
    admissionRequirements: [
      'Prueba de Aptitud Académica (PAA)',
      'Currículum vitae de liderazgo y actividades extracurriculares',
      'Ensayo de motivación personal y entrevista'
    ],
    tuitionInfo: 'Privada (Programa Líderes del Mañana: beca 100% para talento con impacto social)',
    campusHighlights: [
      'Distrito Tec: ecosistema urbano y tecnológico vanguardista',
      'Incubadora de empresas de base tecnológica más activa de Latam',
      'Instalaciones deportivas y culturales de nivel olímpico'
    ],
    websiteUrl: 'https://tec.mx',
    rating: 4.9
  },
  {
    id: 'uni-javeriana',
    name: 'Pontificia Universidad Javeriana',
    shortName: 'PUJ',
    type: 'Privada',
    city: 'Bogotá, Cali',
    country: 'Colombia',
    logoText: 'PUJ',
    badgeBg: 'bg-blue-900',
    description: 'Institución de tradición jesuita centenaria con altísima calidad en Medicina, Psicología, Comunicación Social, Periodismo y Humanidades.',
    topCareers: ['Medicina y Cirugía', 'Psicología y Bienestar', 'Periodismo Digital', 'Fisioterapia y Kinesiología', 'Derecho'],
    admissionRequirements: [
      'Puntaje en examen de Estado oficial',
      'Entrevista vocacional personalizada',
      'Prueba específica según el programa de salud'
    ],
    tuitionInfo: 'Privada (descuentos por promedio y créditos institucionales)',
    campusHighlights: [
      'Hospital Universitario San Ignacio integrado en el campus',
      'Estudios de televisión 4K y cabinas de grabación sonora profesional',
      'Edificio de laboratorios de ciencias biológicas de 7 pisos'
    ],
    websiteUrl: 'https://javeriana.edu.co',
    rating: 4.8
  },
  {
    id: 'uni-buenos-aires',
    name: 'Universidad de Buenos Aires',
    shortName: 'UBA',
    type: 'Pública',
    city: 'Buenos Aires',
    country: 'Argentina',
    logoText: 'UBA',
    badgeBg: 'bg-cyan-700',
    description: 'Una de las universidades públicas más prestigiosas del hemisferio sur, abierta, no arancelada y cuna de 5 premios Nobel latinoamericanos.',
    topCareers: ['Medicina y Cirugía', 'Psicología', 'Derecho', 'Arquitectura y Diseño', 'Medicina Veterinaria'],
    admissionRequirements: [
      'Ciclo Básico Común (CBC) de ingreso obligatorio',
      'Título de educación secundaria debidamente legalizado',
      'Sin cupos restrictivos ni examen eliminatorio inicial'
    ],
    tuitionInfo: 'Pública y 100% gratuita para carreras de pregrado',
    campusHighlights: [
      'Ciudad Universitaria frente al Río de la Plata',
      'Facultades emblemáticas con más de un siglo de historia',
      'Hospital de Clínicas José de San Martín'
    ],
    websiteUrl: 'https://uba.ar',
    rating: 4.8
  },
  {
    id: 'uni-catolica-chile',
    name: 'Pontificia Universidad Católica de Chile',
    shortName: 'UC Chile',
    type: 'Privada',
    city: 'Santiago',
    country: 'Chile',
    logoText: 'UC',
    badgeBg: 'bg-indigo-800',
    description: 'Clasificada recurrentemente como la universidad número 1 de América Latina según el ranking QS, líder en investigación y docencia.',
    topCareers: ['Ingeniería de Software e IA', 'Arquitectura', 'Ciencia de Datos', 'Administración de Empresas', 'Derecho'],
    admissionRequirements: [
      'Prueba de Acceso a la Educación Superior (PAES)',
      'Notas de Enseñanza Media (NEM) y Ranking de notas',
      'Postulación centralizada a través del DEMRE'
    ],
    tuitionInfo: 'Privada adscrita al beneficio de Gratuidad del Estado para los primeros deciles',
    campusHighlights: [
      'Campus San Joaquín: ciudadela científica y tecnológica',
      'Centro de Innovación UC Anacleto Angelini',
      'Red de centros de salud clínicos UC Christus'
    ],
    websiteUrl: 'https://uc.cl',
    rating: 4.9
  },
  {
    id: 'uni-palermo',
    name: 'Universidad de Palermo (UP)',
    shortName: 'UP',
    type: 'Privada',
    city: 'Buenos Aires',
    country: 'Argentina',
    logoText: 'UP',
    badgeBg: 'bg-pink-700',
    description: 'La universidad más premiada de América Latina en Diseño, Arte, Comunicación y Creatividad según el ranking internacional QS.',
    topCareers: ['Diseño Digital UX/UI', 'Marketing Digital', 'Gastronomía y Artes Culinarias', 'Periodismo Digital'],
    admissionRequirements: [
      'Título de nivel medio o secundario completo',
      'Entrevista de orientación vocacional',
      'Inscripción temprana con beneficios'
    ],
    tuitionInfo: 'Privada (becas al mérito creativo de hasta 50%)',
    campusHighlights: [
      'Laboratorios Mac de última generación para diseño y animación',
      'Encuentro Latinoamericano de Diseño anual',
      'Modalidades presenciales y online de alta flexibilidad'
    ],
    websiteUrl: 'https://palermo.edu',
    rating: 4.7
  }
];

export const SCHOLARSHIPS_DATA: Scholarship[] = [
  {
    id: 'beca-lideres-del-manana',
    title: 'Beca Líderes del Mañana (Tec de Monterrey)',
    organization: 'Tecnológico de Monterrey',
    coverage: '100% Total',
    badgeBg: 'bg-purple-600',
    description: 'Cubre el 100% de la colegiatura completa de la carrera para jóvenes brillantes con liderazgo comunitario y necesidad económica comprobable.',
    requirements: [
      'Tener un promedio general de bachillerato acumulado igual o mayor a 90/100',
      'Demostrar liderazgo en proyectos de impacto social en su comunidad',
      'Requerir apoyo financiero del 100% para cursar estudios universitarios',
      'Nacionalidad latinoamericana'
    ],
    benefits: [
      '100% de la colegiatura durante toda la carrera',
      'Seguro de gastos médicos mayores',
      'Apoyo para libros y materiales educativos',
      'Mentoría de alta dirección y networking con líderes de la industria'
    ],
    deadlineDate: '2026-11-15',
    targetAudience: 'Estudiantes del último año de bachillerato con vocación de liderazgo social',
    applicationLink: 'https://lideresdelmanana.tec.mx',
    fieldOfStudy: ['Todas las áreas', 'Ingenierías', 'Negocios', 'Ciencias de la Salud'],
    isFeatured: true
  },
  {
    id: 'beca-quiero-estudiar',
    title: 'Programa Quiero Estudiar (UniAndes)',
    organization: 'Universidad de los Andes',
    coverage: '100% Total',
    badgeBg: 'bg-pink-600',
    description: 'Otorga becas condonables que cubren hasta el 95% o 100% de la matrícula para los mejores bachilleres de escasos recursos económicos.',
    requirements: [
      'Tener entre 15 y 21 años de edad',
      'Haber obtenido un puntaje sobresaliente en el examen de Estado Saber 11',
      'Pertenecer a estratos socioeconómicos 1, 2 o 3',
      'Demostrar alto desempeño académico y compromiso ético'
    ],
    benefits: [
      'Hasta el 95% o 100% del valor de la matrícula semestral',
      'Subsidio de sostenimiento mensual para alimentación y transporte',
      'Acompañamiento psicológico y académico durante la carrera'
    ],
    deadlineDate: '2026-10-30',
    targetAudience: 'Jóvenes con excelencia académica y limitaciones económicas',
    applicationLink: 'https://apoyofinanciero.uniandes.edu.co',
    fieldOfStudy: ['Todas las carreras de pregrado'],
    isFeatured: true
  },
  {
    id: 'beca-talento-tech-global',
    title: 'Beca Mujeres & Jóvenes en Tecnología (Tech Talent)',
    organization: 'Fundación Global Tech Futures',
    coverage: 'Parcial 50-80%',
    badgeBg: 'bg-indigo-600',
    description: 'Financiamiento directo para jóvenes interesados en cursar carreras de Ingeniería de Software, Ciencia de Datos, Inteligencia Artificial y Ciberseguridad.',
    requirements: [
      'Interés comprobado en programación o STEM (proyectos, cursos previos o portafolio)',
      'Haber completado o estar por culminar la educación secundaria',
      'Aprobar la prueba de pensamiento lógico computacional en línea'
    ],
    benefits: [
      'Hasta el 80% de matrícula universitaria',
      'Laptop de alto rendimiento para desarrollo de software',
      'Acceso gratuito a certificaciones internacionales en Cloud y AI'
    ],
    deadlineDate: '2026-12-05',
    targetAudience: 'Estudiantes apasionados por la tecnología y la innovación digital',
    applicationLink: 'https://techtalentfutures.org/apply',
    fieldOfStudy: ['Tecnología e Informática', 'Ingenierías'],
    isFeatured: true
  },
  {
    id: 'beca-erasmus-plus-undergrad',
    title: 'Movilidad Internacional Erasmus+ Europa',
    organization: 'Comisión Europea',
    coverage: 'Internacional',
    badgeBg: 'bg-blue-600',
    description: 'Beca completa para realizar semestres de intercambio o programas universitarios completos en prestigiosas universidades de España, Francia, Alemania e Italia.',
    requirements: [
      'Haber completado al menos 2 semestres de universidad o bachillerato internacional',
      'Certificado de idioma (Inglés B2/C1 o lengua del país de destino)',
      'Carta de motivación y dos cartas de recomendación académica'
    ],
    benefits: [
      'Pasajes aéreos internacionales de ida y vuelta',
      'Estipendio mensual de 850 a 1,200 Euros para alojamiento y manutención',
      'Exención total de tasas académicas universitarias en Europa'
    ],
    deadlineDate: '2026-09-25',
    targetAudience: 'Estudiantes con excelencia académica y perfil global',
    applicationLink: 'https://erasmus-plus.ec.europa.eu',
    fieldOfStudy: ['Todas las áreas del conocimiento']
  },
  {
    id: 'beca-fundacion-carolina',
    title: 'Becas Fundación Carolina de Grado y Posgrado',
    organization: 'Fundación Carolina España',
    coverage: 'Internacional',
    badgeBg: 'bg-rose-600',
    description: 'Facilita la formación de jóvenes talentos de Iberoamérica en universidades españolas con programas de impacto social y sostenible.',
    requirements: [
      'Nacionalidad de un país de la Comunidad Iberoamericana de Naciones',
      'Excelente expediente académico acreditado',
      'No residir en España al momento de la postulación'
    ],
    benefits: [
      'Importe de matrícula bonificado al 100%',
      'Alojamiento en colegios mayores universitarios',
      'Seguro médico internacional integral'
    ],
    deadlineDate: '2026-11-20',
    targetAudience: 'Estudiantes destacados de Latinoamérica',
    applicationLink: 'https://fundacioncarolina.es',
    fieldOfStudy: ['Ciencias de la Salud', 'Medio Ambiente', 'Humanidades', 'Arte y Diseño']
  },
  {
    id: 'beca-excelencia-deportiva',
    title: 'Beca al Mérito Deportivo Universitario',
    organization: 'Asociación Universitaria de Deportes',
    coverage: 'Parcial 50-80%',
    badgeBg: 'bg-emerald-600',
    description: 'Apoya a jóvenes atletas de alto rendimiento para que puedan competir en torneos universitarios mientras cursan su carrera profesional.',
    requirements: [
      'Ser deportista federado o haber obtenido medallas departamentales/nacionales',
      'Mantener un promedio académico mínimo de 8.0/10 durante el bachillerato',
      'Superar las pruebas de aptitud física del equipo representativo universitario'
    ],
    benefits: [
      'Beca del 50% al 80% sobre la matrícula',
      'Horarios flexibles para entrenamientos y viajes a competencias',
      'Atención médica, fisioterapéutica y nutricional de deportista de élite'
    ],
    deadlineDate: '2026-10-15',
    targetAudience: 'Deportistas y atletas jóvenes',
    applicationLink: 'https://deporteuniversitario.org/becas',
    fieldOfStudy: ['Todas las carreras']
  }
];
