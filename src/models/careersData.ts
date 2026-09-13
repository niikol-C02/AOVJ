import { Career } from '../types';

/**
 * Catálogo amplio de carreras universitarias y programas profesionales.
 * Incluye perfil del aspirante, campo laboral, asignaturas clave, duración oficial y perfiles RIASEC.
 */
import { OFFICIAL_COLOMBIAN_PROGRAMS } from './careersCatalog';

export const ORIGINAL_CORE_CAREERS: Career[] = [
  // --- INGENIERÍAS Y TECNOLOGÍA ---
  {
    id: 'ing-software-ia',
    name: 'Ingeniería de Software e Inteligencia Artificial',
    area: 'Tecnología e Informática',
    categoryColor: 'indigo',
    duration: '5 años (10 semestres)',
    degreeType: 'Ingeniería',
    riasecPrimary: 'I',
    riasecSecondary: 'R',
    shortDescription: 'Diseña arquitecturas computacionales, entrena redes neuronales de Inteligencia Artificial y construye aplicaciones a escala global.',
    fullDescription: 'Combina fundamentos sólidos de ciencias de la computación con las tecnologías más demandadas del mercado: algoritmos de aprendizaje automático (Machine Learning), procesamiento de lenguaje natural, computación en la nube y desarrollo de sistemas distribuidos tolerantes a fallos.',
    necessarySkills: ['Lógica algorítmica y matemáticas discretas', 'Programación en Python, TypeScript y C++', 'Pensamiento abstracto y analítico', 'Resolución sistemática de problemas', 'Trabajo ágil en equipo'],
    workFields: [
      'Empresas tecnológicas globales (Google, Microsoft, Amazon, Mercado Libre)',
      'Laboratorios de investigación en IA generativa y visión por computador',
      'Startups de Fintech y banca digital',
      'Firmas de consultoría de transformación digital',
      'Emprendimiento de productos SaaS'
    ],
    averageSalaryRange: '$4,500,000 - $15,000,000 COP / mes',
    employabilityRate: '98%',
    dailyActivities: [
      'Modelar algoritmos de Machine Learning y optimizar inferencias',
      'Escribir y revisar código limpio en repositorios colaborativos',
      'Diseñar arquitecturas de microservicios y bases de datos escalables',
      'Auditar rendimiento y seguridad en infraestructura cloud'
    ],
    relatedSubjects: ['Estructuras de Datos y Algoritmos', 'Aprendizaje Automático (ML)', 'Sistemas Distribuidos y Cloud', 'Bases de Datos SQL/NoSQL', 'Arquitectura de Software'],
    suggestedUniversities: ['uni-unal', 'uni-andes', 'uni-eafit', 'uni-javeriana', 'uni-uis'],
    iconName: 'Code',
    isTrending: true
  },
  {
    id: 'ciencia-datos-analitica',
    name: 'Ciencia de Datos y Analítica Predictiva',
    area: 'Tecnología y Matemáticas Aplicadas',
    categoryColor: 'blue',
    duration: '4 a 5 años (8-10 semestres)',
    degreeType: 'Ingeniería',
    riasecPrimary: 'I',
    riasecSecondary: 'C',
    shortDescription: 'Descubre patrones ocultos en millones de datos para predecir comportamientos futuros y guiar decisiones estratégicas.',
    fullDescription: 'Los científicos de datos transforman terabytes de información en ventaja competitiva. Combinan estadística avanzada, programación científica y visualización de datos para proyectar tendencias económicas, optimizar tratamientos médicos y predecir la demanda industrial.',
    necessarySkills: ['Estadística inferencial y probabilidad', 'Manejo de SQL, Python y R', 'Modelado predictivo y Big Data', 'Visualización narrativa de datos', 'Curiosidad investigativa'],
    workFields: [
      'Bancos y entidades de evaluación de riesgo crediticio',
      'Compañías de telecomunicaciones y streaming',
      'Centros de epidemiología y salud pública',
      'Firmas de investigación de mercados y Big Data'
    ],
    averageSalaryRange: '$4,000,000 - $13,500,000 COP / mes',
    employabilityRate: '96%',
    dailyActivities: [
      'Limpiar, estructurar y transformar fuentes masivas de datos no estructurados',
      'Entrenar modelos estadísticos de regresión, series de tiempo y clasificación',
      'Construir tableros interactivos de Business Intelligence (BI)',
      'Presentar hallazgos analíticos a juntas directivas y clientes'
    ],
    relatedSubjects: ['Estadística Multivariada', 'Minería de Datos', 'Visualización de Información', 'Álgebra Lineal Computacional', 'Bases de Datos Distribuidas'],
    suggestedUniversities: ['uni-andes', 'uni-unal', 'uni-eafit', 'uni-rosario'],
    iconName: 'BarChart3',
    isTrending: true
  },
  {
    id: 'ciberseguridad-redes',
    name: 'Ciberseguridad y Protección de Redes',
    area: 'Tecnología e Informática',
    categoryColor: 'rose',
    duration: '4 a 5 años (8-10 semestres)',
    degreeType: 'Ingeniería',
    riasecPrimary: 'C',
    riasecSecondary: 'I',
    shortDescription: 'Defiende infraestructuras críticas, sistemas financieros y datos confidenciales contra ataques informáticos y malware.',
    fullDescription: 'Especialistas formados en hacking ético, criptografía moderna, análisis forense digital y diseño de políticas de ciberdefensa en entornos híbridos y en la nube.',
    necessarySkills: ['Hacking ético y pentesting', 'Criptografía y protocolos de red', 'Forense digital y auditoría', 'Atención meticulosa al detalle', 'Pensamiento defensivo'],
    workFields: [
      'Sector bancario y pasarelas de pago digitales',
      'Organismos de defensa y seguridad del Estado',
      'Firmas especializadas de ciberdefensa y auditoría TI',
      'Proveedores de computación en la nube (Cloud)'
    ],
    averageSalaryRange: '$4,800,000 - $14,000,000 COP / mes',
    employabilityRate: '99%',
    dailyActivities: [
      'Ejecutar simulaciones de penetración controlada para hallar brechas de seguridad',
      'Monitorear consolas de alerta de intrusiones y mitigar amenazas en tiempo real',
      'Diseñar arquitecturas de seguridad Zero Trust',
      'Elaborar protocolos de continuidad del negocio ante contingencias'
    ],
    relatedSubjects: ['Redes TCP/IP y Seguridad Perimetral', 'Criptografía Aplicada', 'Análisis Forense Digital', 'Hacking Ético', 'Seguridad en la Nube'],
    suggestedUniversities: ['uni-andes', 'uni-unal', 'uni-javeriana', 'uni-eafit'],
    iconName: 'ShieldCheck',
    isTrending: true
  },
  {
    id: 'ing-biomedica',
    name: 'Ingeniería Biomédica y Bioinformática',
    area: 'Ingeniería y Ciencias de la Salud',
    categoryColor: 'teal',
    duration: '5 años (10 semestres)',
    degreeType: 'Ingeniería',
    riasecPrimary: 'I',
    riasecSecondary: 'R',
    shortDescription: 'Diseña órganos artificiales, prótesis robóticas inteligentes y equipos médicos de diagnóstico de alta complejidad.',
    fullDescription: 'Crea el puente entre la ingeniería y la medicina. Aplica la biomecánica, la electrónica de precisión y el procesamiento de bioseñales para salvar vidas y mejorar la rehabilitación de pacientes con discapacidad.',
    necessarySkills: ['Fisiología y anatomía humana', 'Electrónica médica y sensores biomédicos', 'Diseño mecánico de prótesis', 'Procesamiento digital de señales e imágenes médicas'],
    workFields: [
      'Hospitales y clínicas de alta complejidad (dirección de tecnología médica)',
      'Multinacionales de dispositivos biomédicos (Siemens, Philips, Medtronic)',
      'Centros de rehabilitación biomecánica e investigación en tejidos'
    ],
    averageSalaryRange: '$3,500,000 - $9,500,000 COP / mes',
    employabilityRate: '92%',
    dailyActivities: [
      'Diseñar y calibrar prótesis mioeléctricas personalizadas',
      'Gestionar y mantener resonadores magnéticos y tomógrafos clínicos',
      'Desarrollar algoritmos para detección temprana de arritmias cardíacas',
      'Auditar estándares de bioseguridad en quirófanos'
    ],
    relatedSubjects: ['Biomecánica', 'Instrumentación Biomédica', 'Imágenes Diagnósticas', 'Biomateriales', 'Señales Fisiológicas'],
    suggestedUniversities: ['uni-eafit', 'uni-andes', 'uni-unal', 'uni-sabana'],
    iconName: 'Cpu'
  },
  {
    id: 'ing-meca-robotica',
    name: 'Ingeniería Mecatrónica y Robótica',
    area: 'Ingeniería y Automatización',
    categoryColor: 'amber',
    duration: '5 años (10 semestres)',
    degreeType: 'Ingeniería',
    riasecPrimary: 'R',
    riasecSecondary: 'I',
    shortDescription: 'Construye robots autónomos, sistemas cibernéticos e industrias automatizadas del futuro.',
    fullDescription: 'Integra en una sola disciplina la mecánica de precisión, la electrónica digital, los sistemas de control y la programación embebida para crear máquinas autónomas e inteligentes.',
    necessarySkills: ['Mecánica de sólidos y cinemática', 'Electrónica analógica y digital', 'Control automático y servomecanismos', 'Programación de microcontroladores'],
    workFields: [
      'Plantas automotrices y de manufactura avanzada',
      'Industria aeroespacial y de drones autónomos',
      'Empresas de automatización de almacenes y logística 4.0',
      'Integradoras de tecnología robótica'
    ],
    averageSalaryRange: '$3,800,000 - $11,000,000 COP / mes',
    employabilityRate: '93%',
    dailyActivities: [
      'Diseñar y simular brazos robóticos para ensamblaje de precisión',
      'Programar controladores lógicos programables (PLC) y actuadores',
      'Realizar mantenimiento preventivo y correctivo en celdas robotizadas',
      'Optimizar tiempos de ciclo en líneas de producción automatizada'
    ],
    relatedSubjects: ['Robótica Industrial', 'Control Automático', 'Microcontroladores y Sistemas Embebidos', 'Dinámica de Máquinas', 'Visión Artificial'],
    suggestedUniversities: ['uni-unal', 'uni-utp', 'uni-uis', 'uni-upb'],
    iconName: 'Wrench'
  },
  {
    id: 'ing-civil',
    name: 'Ingeniería Civil e Infraestructura',
    area: 'Ingeniería y Construcción',
    categoryColor: 'yellow',
    duration: '5 años (10 semestres)',
    degreeType: 'Ingeniería',
    riasecPrimary: 'R',
    riasecSecondary: 'C',
    shortDescription: 'Planifica, calcula y construye puentes, viaductos, rascacielos, túneles y redes de acueducto vitales para las ciudades.',
    fullDescription: 'Profesión responsable del desarrollo físico de las naciones. Aplica la geotecnia, el cálculo estructural sismorresistente, la hidráulica y la gerencia de obras de gran envergadura.',
    necessarySkills: ['Cálculo estructural y física estática', 'Interpretación topográfica y de suelos', 'Gestión de presupuestos de obra civil', 'Normas sismorresistentes (NSR-10)'],
    workFields: [
      'Empresas constructoras y consorcios de infraestructura vial',
      'Empresas de servicios públicos de agua potable y saneamiento',
      'Firmas de interventoría y consultoría geomecánica',
      'Ministerios de transporte y entidades de desarrollo urbano'
    ],
    averageSalaryRange: '$3,600,000 - $10,500,000 COP / mes',
    employabilityRate: '91%',
    dailyActivities: [
      'Calcular armaduras de acero y concreto para resistencia sísmica',
      'Supervisar en terreno la calidad del vaciado de concreto y pilotaje',
      'Revisar avances de cronograma y costos con contratistas',
      'Diseñar redes de drenaje y alcantarillado pluvial urbano'
    ],
    relatedSubjects: ['Análisis Estructural', 'Mecánica de Suelos y Cimentaciones', 'Hidráulica y Canales', 'Materiales de Construcción', 'Gerencia de Proyectos BIM'],
    suggestedUniversities: ['uni-unal', 'uni-andes', 'uni-javeriana', 'uni-uis', 'uni-uninorte'],
    iconName: 'Building'
  },
  {
    id: 'ing-industrial',
    name: 'Ingeniería Industrial y Gestión de Operaciones',
    area: 'Ingeniería y Negocios',
    categoryColor: 'purple',
    duration: '5 años (10 semestres)',
    degreeType: 'Ingeniería',
    riasecPrimary: 'E',
    riasecSecondary: 'C',
    shortDescription: 'Optimiza procesos productivos, cadenas de suministro globales y eleva la eficiencia y rentabilidad empresarial.',
    fullDescription: 'El ingeniero industrial es el estratega de la eficiencia. Analiza recursos humanos, financieros y tecnológicos para eliminar desperdicios, aumentar la calidad y liderar operaciones globales.',
    necessarySkills: ['Investigación de operaciones y logística', 'Control estadístico de la calidad', 'Gestión de proyectos (PMI / Scrum)', 'Liderazgo de equipos de planta'],
    workFields: [
      'Empresas de consumo masivo y manufactura industrial',
      'Operadores logísticos portuarios y aeroportuarios',
      'Entidades financieras y aseguradoras',
      'Consultoría en optimización de procesos y Six Sigma'
    ],
    averageSalaryRange: '$3,500,000 - $11,000,000 COP / mes',
    employabilityRate: '95%',
    dailyActivities: [
      'Diseñar diagramas de flujo para optimizar líneas de ensamble',
      'Auditar indicadores de rendimiento clave (KPIs) en plantas',
      'Gestionar la cadena de aprovisionamiento internacional',
      'Implementar metodologías Lean Manufacturing para reducir costos'
    ],
    relatedSubjects: ['Investigación de Operaciones', 'Logística y Cadena de Suministro', 'Gestión de Calidad Integral', 'Seguridad y Salud en el Trabajo', 'Costos y Presupuestos'],
    suggestedUniversities: ['uni-andes', 'uni-unal', 'uni-uninorte', 'uni-javeriana', 'uni-eafit'],
    iconName: 'Layers'
  },
  {
    id: 'ing-ambiental',
    name: 'Ingeniería Ambiental y Sostenibilidad',
    area: 'Ciencias de la Tierra y Medio Ambiente',
    categoryColor: 'emerald',
    duration: '5 años (10 semestres)',
    degreeType: 'Ingeniería',
    riasecPrimary: 'I',
    riasecSecondary: 'R',
    shortDescription: 'Protege fuentes hídricas, formula planes de transición energética y mitiga el impacto del cambio climático.',
    fullDescription: 'Diseña plantas de tratamiento de agua residual, sistemas de energía solar y eólica, planes de economía circular y estudios de impacto ambiental indispensables para el desarrollo sostenible.',
    necessarySkills: ['Química y microbiología ambiental', 'Legislación y normas ambientales', 'Muestreo de campo en suelo y agua', 'Diseño de plantas de tratamiento (PTAR)'],
    workFields: [
      'Corporaciones Autónomas Regionales (CAR) y Ministerio de Ambiente',
      'Compañías de energías renovables y biocombustibles',
      'Industrias minero-energéticas en planes de restauración ecológica',
      'Consultorías de huella de carbono y finanzas verdes'
    ],
    averageSalaryRange: '$3,200,000 - $8,500,000 COP / mes',
    employabilityRate: '89%',
    dailyActivities: [
      'Tomar y analizar muestras físico-químicas de fuentes hídricas',
      'Diseñar filtros y sistemas de control de emisiones atmosféricas',
      'Elaborar estudios de impacto ambiental para licencias gubernamentales',
      'Auditar planes de manejo de residuos hospitalarios e industriales'
    ],
    relatedSubjects: ['Tratamiento de Aguas Residuales', 'Evaluación de Impacto Ambiental', 'Energías Renovables', 'Ecología y Biodiversidad', 'Gestión de Residuos Sólidos'],
    suggestedUniversities: ['uni-unal', 'uni-univalle', 'uni-utp', 'uni-udea'],
    iconName: 'Leaf'
  },
  {
    id: 'ing-quimica',
    name: 'Ingeniería Química y de Procesos',
    area: 'Ingeniería y Ciencias Exactas',
    categoryColor: 'cyan',
    duration: '5 años (10 semestres)',
    degreeType: 'Ingeniería',
    riasecPrimary: 'I',
    riasecSecondary: 'R',
    shortDescription: 'Transforma materias primas a escala industrial para producir fármacos, alimentos, polímeros y biocombustibles.',
    fullDescription: 'Domina los fenómenos de transporte, termodinámica y reactores químicos para escalar fórmulas de laboratorio a gigantescas plantas de producción continua seguras y eficientes.',
    necessarySkills: ['Termodinámica y balances de materia y energía', 'Cinética química y diseño de reactores', 'Control de procesos industriales', 'Seguridad en manejo de sustancias químicas'],
    workFields: [
      'Industria farmacéutica y cosmética',
      'Plantas petroquímicas, plásticos y pinturas',
      'Industria de alimentos y bebidas procesadas',
      'Refinerías y plantas de biocombustibles'
    ],
    averageSalaryRange: '$3,800,000 - $11,500,000 COP / mes',
    employabilityRate: '92%',
    dailyActivities: [
      'Dimensionar torres de destilación e intercambiadores de calor',
      'Monitorear variables de presión y temperatura en reactores continuos',
      'Optimizar el rendimiento químico en la producción de plásticos biodegradables',
      'Supervisar protocolos de contención de riesgos químicos'
    ],
    relatedSubjects: ['Termodinámica Química', 'Transferencia de Calor y Masa', 'Operaciones Unitarias', 'Diseño de Reactores', 'Dinámica de Procesos'],
    suggestedUniversities: ['uni-unal', 'uni-udea', 'uni-uis', 'uni-cartagena'],
    iconName: 'FlaskConical'
  },

  // --- CIENCIAS DE LA SALUD ---
  {
    id: 'medicina-cirugia',
    name: 'Medicina y Cirugía',
    area: 'Ciencias de la Salud',
    categoryColor: 'rose',
    duration: '6 a 7 años (12-14 semestres)',
    degreeType: 'Medicina',
    riasecPrimary: 'I',
    riasecSecondary: 'S',
    shortDescription: 'Salva vidas, diagnostica enfermedades complejas y cuida la salud y recuperación integral de las personas.',
    fullDescription: 'Una de las profesiones de mayor vocación, rigor científico y compromiso humano. El médico generalista comprende la anatomía, fisiología, farmacología y semiología para tratar dolencias y orientar al paciente.',
    necessarySkills: ['Razonamiento diagnóstico clínico', 'Resiliencia emocional y empatía profunda', 'Destreza en procedimientos médicos y de urgencias', 'Compromiso ético inquebrantable'],
    workFields: [
      'Hospitales y clínicas de urgencias, hospitalización y consulta externa',
      'Centros de atención primaria y medicina comunitaria',
      'Especializaciones médico-quirúrgicas (Cirugía, Pediatría, Cardiología, etc.)',
      'Organizaciones humanitarias (Cruz Roja, Médicos Sin Fronteras)'
    ],
    averageSalaryRange: '$4,500,000 - $14,000,000 COP / mes (Mayor con especialidad)',
    employabilityRate: '99%',
    dailyActivities: [
      'Realizar anamnesis y exámenes físicos detallados a pacientes',
      'Interpretar exámenes paraclínicos, radiografías y análisis de sangre',
      'Prescribir tratamientos farmacológicos y cuidados preventivos',
      'Atender guardias de urgencias y estabilizar pacientes críticos'
    ],
    relatedSubjects: ['Anatomía Humana y Disección', 'Fisiología Médica', 'Farmacología Clínica', 'Semiología Médica', 'Patología y Cirugía General'],
    suggestedUniversities: ['uni-unal', 'uni-udea', 'uni-javeriana', 'uni-rosario', 'uni-uninorte', 'uni-univalle', 'uni-sabana'],
    iconName: 'HeartPulse',
    isTrending: true
  },
  {
    id: 'psicologia-salud',
    name: 'Psicología Clínica y del Comportamiento',
    area: 'Ciencias de la Salud y Humanidades',
    categoryColor: 'purple',
    duration: '5 años (10 semestres)',
    degreeType: 'Licenciatura',
    riasecPrimary: 'S',
    riasecSecondary: 'I',
    shortDescription: 'Comprende la mente humana, alivia el sufrimiento emocional y fomenta el bienestar psicológico y social.',
    fullDescription: 'Estudia los procesos cognitivos, afectivos y conductuales del ser humano. Capacita para brindar psicoterapia, diseñar intervenciones comunitarias, realizar evaluación neuropsicológica y potenciar el talento en organizaciones.',
    necessarySkills: ['Escucha activa y empatía libre de juicios', 'Manejo de pruebas psicométricas estandarizadas', 'Habilidades de intervención clínica y psicoterapia', 'Pensamiento analítico sobre la conducta'],
    workFields: [
      'Consulta clínica privada y centros de salud mental',
      'Departamentos de gestión humana y reclutamiento empresarial',
      'Instituciones educativas (psicología escolar y orientación)',
      'Organismos de justicia (psicología forense y peritaje)'
    ],
    averageSalaryRange: '$2,800,000 - $7,500,000 COP / mes',
    employabilityRate: '88%',
    dailyActivities: [
      'Conducir sesiones de evaluación psicológica y psicoterapia',
      'Aplicar e interpretar baterías psicométricas de personalidad y cognición',
      'Elaborar planes de intervención para el manejo de ansiedad y depresión',
      'Diseñar talleres de habilidades socioemocionales para colegios y empresas'
    ],
    relatedSubjects: ['Neurociencias del Comportamiento', 'Psicología Cognitiva', 'Psicopatología y Diagnóstico', 'Técnicas de Entrevista y Psicoterapia', 'Psicometría'],
    suggestedUniversities: ['uni-javeriana', 'uni-unal', 'uni-andes', 'uni-uninorte', 'uni-eafit'],
    iconName: 'Brain'
  },
  {
    id: 'odontologia',
    name: 'Odontología y Cirugía Oral',
    area: 'Ciencias de la Salud',
    categoryColor: 'sky',
    duration: '5 años (10 semestres)',
    degreeType: 'Medicina',
    riasecPrimary: 'R',
    riasecSecondary: 'S',
    shortDescription: 'Diagnostica, previene y rehabilita la salud oral, la estética dental y la armonía craneofacial.',
    fullDescription: 'Combina la ciencia médica con una extraordinaria destreza manual y sentido estético para restaurar piezas dentales, realizar endodoncias, cirugías periodontales y tratamientos de ortodoncia.',
    necessarySkills: ['Alta destreza y motricidad fina manual', 'Sentido estético visual y espacial', 'Trato empático para tranquilizar al paciente', 'Conocimientos de bioseguridad y radiología oral'],
    workFields: [
      'Clínicas odontológicas privadas y consultorios propios',
      'Servicios de salud oral en EPS e IPS hospitalarias',
      'Empresas de implantes dentales y biomateriales',
      'Centros de estética dental y ortodoncia especializada'
    ],
    averageSalaryRange: '$3,500,000 - $9,000,000 COP / mes',
    employabilityRate: '90%',
    dailyActivities: [
      'Realizar limpiezas profundas, obturaciones y restauraciones estéticas',
      'Tomar radiografías periapicales y panorámicas digitales',
      'Ejecutar extracciones dentales y pequeñas cirugías periodontales',
      'Diseñar planes de rehabilitación oral con prótesis o implantes'
    ],
    relatedSubjects: ['Anatomía de Cabeza y Cuello', 'Operatoria y Biomateriales Dentales', 'Periodoncia y Endodoncia', 'Cirugía Oral y Maxilofacial', 'Ortodoncia'],
    suggestedUniversities: ['uni-javeriana', 'uni-unal', 'uni-cartagena', 'uni-udea'],
    iconName: 'Smile'
  },
  {
    id: 'enfermeria-cuidados',
    name: 'Enfermería y Cuidados Críticos',
    area: 'Ciencias de la Salud',
    categoryColor: 'emerald',
    duration: '4 a 5 años (8-10 semestres)',
    degreeType: 'Licenciatura',
    riasecPrimary: 'S',
    riasecSecondary: 'R',
    shortDescription: 'Brinda el cuidado directo y continuo a los pacientes, administra tratamientos vitales y gestiona servicios de salud.',
    fullDescription: 'El profesional de enfermería es el pilar humano del sistema de salud. Monitorea pacientes en unidades de cuidados intensivos, lidera programas de promoción y prevención comunitaria y coordina salas de hospitalización.',
    necessarySkills: ['Vocación de servicio y cuidado compasivo', 'Técnica rigurosa en administración de medicamentos', 'Resiliencia física y mental en turnos críticos', 'Liderazgo en gestión de salas hospitalarias'],
    workFields: [
      'Unidades de Cuidados Intensivos (UCI) pediátricas y de adultos',
      'Servicios de urgencias y salas de cirugía',
      'Programas de salud pública y vacunación',
      'Atención domiciliaria de alta complejidad y cuidados paliativos'
    ],
    averageSalaryRange: '$3,000,000 - $7,000,000 COP / mes (Muy demandada en el exterior)',
    employabilityRate: '97%',
    dailyActivities: [
      'Canalizar accesos venosos y administrar medicación intravenosa',
      'Monitorear signos vitales y alarmas de ventilación mecánica en UCI',
      'Educar a pacientes y familias sobre el autocuidado de enfermedades crónicas',
      'Supervisar protocolos de curación de heridas complejas y esterilización'
    ],
    relatedSubjects: ['Cuidado de Enfermería al Adulto Crítico', 'Farmacología y Dosificación', 'Salud Materno Infantil', 'Epidemiología y Salud Pública', 'Gestión de Servicios de Salud'],
    suggestedUniversities: ['uni-unal', 'uni-udea', 'uni-javeriana', 'uni-sabana', 'uni-univalle'],
    iconName: 'Activity'
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
    shortDescription: 'Vela por la salud de mascotas, fauna silvestre protegida y garantiza la producción ganadera y agropecuaria sostenible.',
    fullDescription: 'Combina el diagnóstico médico y quirúrgico en animales con la zootecnia: nutrición, genética, reproducción y bienestar de especies productivas y de compañía.',
    necessarySkills: ['Amor y respeto por el bienestar animal', 'Destreza en exploración clínica y cirugía veterinaria', 'Capacidad para trabajar en terreno rural y clínico', 'Conocimientos de epidemiología zoonótica'],
    workFields: [
      'Clínicas y hospitales veterinarios de animales de compañía',
      'Zoológicos, acuarios y centros de rescate de fauna silvestre',
      'Fincas de producción ganadera, equina y avícola',
      'Entidades de inspección sanitaria y salud pública (ICA, INVIMA)'
    ],
    averageSalaryRange: '$2,800,000 - $7,500,000 COP / mes',
    employabilityRate: '88%',
    dailyActivities: [
      'Diagnosticar y medicar caninos, felinos o equinos enfermos',
      'Realizar cirugías de esterilización o intervenciones traumatológicas',
      'Diseñar dietas nutricionales para optimizar la salud de hatos ganaderos',
      'Controlar brotes de enfermedades zoonóticas transmisibles a humanos'
    ],
    relatedSubjects: ['Anatomía Comparada Veterinaria', 'Cirugía y Anestesiología Veterinaria', 'Nutrición y Zootecnia', 'Farmacología Veterinaria', 'Patología de Especies Silvestres'],
    suggestedUniversities: ['uni-unal', 'uni-caldas', 'uni-udea', 'uni-upb'],
    iconName: 'PawPrint'
  },
  {
    id: 'fisioterapia-rehabilitacion',
    name: 'Fisioterapia y Rehabilitación Física',
    area: 'Ciencias de la Salud y Deporte',
    categoryColor: 'green',
    duration: '4 a 5 años (8-10 semestres)',
    degreeType: 'Licenciatura',
    riasecPrimary: 'S',
    riasecSecondary: 'R',
    shortDescription: 'Restaura la movilidad, alivia el dolor muscular y rehabilita a deportistas y personas tras accidentes o cirugías.',
    fullDescription: 'Especialista en el movimiento corporal humano. Aplica técnicas manuales, electroterapia, hidroterapia y ejercicio terapéutico dosificado para devolver la independencia funcional.',
    necessarySkills: ['Conocimiento profundo del sistema musculoesquelético', 'Sensibilidad y fuerza en técnicas manuales', 'Paciencia y motivación para acompañar la recuperación', 'Criterio en biomecánica del ejercicio'],
    workFields: [
      'Clubes deportivos de alto rendimiento y gimnasios especializados',
      'Centros de rehabilitación ortopédica y neurológica',
      'Hospitales de trauma y unidades de cuidado intensivo',
      'Consulta privada y acondicionamiento ergonómico laboral'
    ],
    averageSalaryRange: '$2,700,000 - $6,800,000 COP / mes',
    employabilityRate: '91%',
    dailyActivities: [
      'Evaluar rangos de movilidad articular y fuerza muscular en pacientes',
      'Aplicar maniobras de terapia manual y punción seca',
      'Guiar rutinas de reeducación neuromuscular y marcha',
      'Rehabilitar lesiones deportivas como roturas de ligamentos y desgarros'
    ],
    relatedSubjects: ['Biomecánica y Kinesiología', 'Fisioterapia en Ortopedia y Traumatología', 'Neurorehabilitación', 'Fisioterapia Deportiva', 'Técnicas de Terapia Manual'],
    suggestedUniversities: ['uni-rosario', 'uni-javeriana', 'uni-uis', 'uni-sabana'],
    iconName: 'Heart'
  },

  // --- CIENCIAS SOCIALES, HUMANIDADES Y DERECHO ---
  {
    id: 'derecho-juridicas',
    name: 'Derecho y Ciencias Jurídicas',
    area: 'Ciencias Sociales y Humanidades',
    categoryColor: 'slate',
    duration: '5 años (10 semestres)',
    degreeType: 'Licenciatura',
    riasecPrimary: 'E',
    riasecSecondary: 'C',
    shortDescription: 'Defiende los derechos ciudadanos, imparte justicia, litiga en tribunales y asesora contratos y corporaciones.',
    fullDescription: 'Forma juristas con sólidos fundamentos en derecho constitucional, penal, civil, comercial y laboral. Capacita para litigar con elocuencia, redactar leyes y mediar en conflictos con ética.',
    necessarySkills: ['Argumentación jurídica y oratoria perspicaz', 'Comprensión de lectura crítica y análisis de jurisprudencia', 'Negociación y resolución pacífica de conflictos', 'Ética y compromiso con el Estado de Derecho'],
    workFields: [
      'Firmas de abogados de litigio y asesoría corporativa',
      'Rama Judicial (jueces, fiscales, magistrados de cortes)',
      'Departamentos jurídicos de multinacionales y bancos',
      'Ministerios, personerías, defensorías del pueblo y ONGs'
    ],
    averageSalaryRange: '$3,500,000 - $13,000,000 COP / mes',
    employabilityRate: '90%',
    dailyActivities: [
      'Sustentar alegatos orales en audiencias judiciales ante jueces',
      'Redactar demandas, tutelas, contratos comerciales y conceptos legales',
      'Asesorar a clientes en fusiones, adquisiciones y litigios tributarios',
      'Analizar sentencias de la Corte Constitucional y reformas legislativas'
    ],
    relatedSubjects: ['Derecho Constitucional', 'Derecho Penal y Procesal Penal', 'Obligaciones y Contratos Civiles', 'Derecho Comercial y Societario', 'Argumentación Jurídica'],
    suggestedUniversities: ['uni-rosario', 'uni-externado', 'uni-andes', 'uni-javeriana', 'uni-unal', 'uni-uninorte'],
    iconName: 'Scale',
    isTrending: true
  },
  {
    id: 'comunicacion-periodismo',
    name: 'Comunicación Social y Periodismo Digital',
    area: 'Humanidades y Medios de Comunicación',
    categoryColor: 'pink',
    duration: '4 a 5 años (8-10 semestres)',
    degreeType: 'Licenciatura',
    riasecPrimary: 'A',
    riasecSecondary: 'S',
    shortDescription: 'Investiga la verdad, cuenta historias de impacto social y lidera estrategias de medios digitales y comunicación corporativa.',
    fullDescription: 'Profesionales de la palabra, la imagen y el sonido. Abarca desde el periodismo de investigación y la crónica audiovisual hasta la gestión de comunicación en crisis y reputación de marcas.',
    necessarySkills: ['Excelente redacción narrativa y ortografía impecable', 'Curiosidad y rigor investigativo', 'Producción de contenidos transmedia y podcasts', 'Estrategia de comunicación digital en redes'],
    workFields: [
      'Medios de comunicación (periódicos digitales, canales de TV, radio)',
      'Direcciones de comunicaciones de entidades públicas y empresas',
      'Agencias de relaciones públicas (PR) y marketing de contenidos',
      'Producción de documentales independientes y proyectos periodísticos'
    ],
    averageSalaryRange: '$2,700,000 - $7,500,000 COP / mes',
    employabilityRate: '87%',
    dailyActivities: [
      'Entrevistar a protagonistas de noticias y contrastar fuentes verídicas',
      'Escribir crónicas, reportajes investigativos y notas periodísticas',
      'Grabar y editar cápsulas de video para canales informativos digitales',
      'Diseñar comunicados de prensa y gestionar la reputación de marcas'
    ],
    relatedSubjects: ['Periodismo de Investigación', 'Narrativas Digitales y Transmedia', 'Teorías de la Comunicación', 'Producción Radial y Podcast', 'Comunicación Estratégica Organizacional'],
    suggestedUniversities: ['uni-javeriana', 'uni-sabana', 'uni-externado', 'uni-uninorte', 'uni-udea'],
    iconName: 'Newspaper'
  },
  {
    id: 'relaciones-internacionales',
    name: 'Relaciones Internacionales y Diplomacia',
    area: 'Ciencias Políticas y Globales',
    categoryColor: 'indigo',
    duration: '4 a 5 años (8-10 semestres)',
    degreeType: 'Licenciatura',
    riasecPrimary: 'E',
    riasecSecondary: 'S',
    shortDescription: 'Analiza la geopolítica mundial, representa al país en el cuerpo diplomático y negocia tratados comerciales y de paz.',
    fullDescription: 'Prepara profesionales con visión global para comprender los tratados internacionales, la resolución de conflictos bélicos, la cooperación internacional al desarrollo y la diplomacia económica.',
    necessarySkills: ['Dominio de múltiples idiomas (inglés, francés, etc.)', 'Pensamiento geopolítico y estratégico', 'Protocolo diplomático y negociación multicultural', 'Análisis de política exterior y comercio'],
    workFields: [
      'Ministerio de Relaciones Exteriores (Cancillería y embajadas)',
      'Organismos multilaterales (ONU, OEA, Banco Mundial, BID)',
      'ONGs de derechos humanos y cooperación internacional',
      'Empresas multinacionales con operaciones en comercio exterior'
    ],
    averageSalaryRange: '$3,500,000 - $11,000,000 COP / mes',
    employabilityRate: '89%',
    dailyActivities: [
      'Redactar informes de coyuntura geopolítica y riesgo país',
      'Monitorear tratados de libre comercio y acuerdos arancelarios',
      'Representar instituciones en foros y asambleas internacionales',
      'Gestionar fondos de cooperación no reembolsable para comunidades'
    ],
    relatedSubjects: ['Geopolítica Mundial', 'Derecho Internacional Público', 'Teorías de las Relaciones Internacionales', 'Negociación y Resolución de Conflictos', 'Comercio Exterior'],
    suggestedUniversities: ['uni-rosario', 'uni-externado', 'uni-andes', 'uni-javeriana', 'uni-uninorte'],
    iconName: 'Globe'
  },
  {
    id: 'pedagogia-infantil',
    name: 'Licenciatura en Pedagogía y Educación Infantil',
    area: 'Educación y Ciencias Humanas',
    categoryColor: 'orange',
    duration: '4 a 5 años (8-10 semestres)',
    degreeType: 'Licenciatura',
    riasecPrimary: 'S',
    riasecSecondary: 'A',
    shortDescription: 'Forma la mente y el corazón de las nuevas generaciones mediante didácticas innovadoras y desarrollo infantil.',
    fullDescription: 'Una labor trascendental para el futuro social. El educador diseña ambientes de aprendizaje basados en el juego, la creatividad, la neuroeducación y la inclusión para potenciar el talento de los niños.',
    necessarySkills: ['Paciencia, ternura y vocación pedagógica auténtica', 'Diseño de materiales didácticos lúdicos', 'Conocimientos de neurodesarrollo infantil', 'Estrategias de educación inclusiva'],
    workFields: [
      'Colegios públicos y privados (educación inicial y básica primaria)',
      'Jardines infantiles y centros de estimulación temprana',
      'Entidades de protección de la niñez (ICBF, UNICEF)',
      'Creación de contenidos educativos digitales y editoriales escolares'
    ],
    averageSalaryRange: '$2,500,000 - $6,000,000 COP / mes',
    employabilityRate: '94%',
    dailyActivities: [
      'Planear experiencias de aprendizaje activo y proyectos pedagógicos',
      'Evaluar el desarrollo socioafectivo y motriz de los niños',
      'Crear recursos didácticos con materiales sensoriales y tecnologías educativas',
      'Asesorar a familias en pautas de crianza positiva y respetuosa'
    ],
    relatedSubjects: ['Didáctica de la Lectoescritura', 'Psicología del Desarrollo Infantil', 'Neuroeducación', 'Literatura Infantil y Juego', 'Políticas Públicas de Primera Infancia'],
    suggestedUniversities: ['uni-uptc', 'uni-udea', 'uni-javeriana', 'uni-sabana', 'uni-utp'],
    iconName: 'GraduationCap'
  },

  // --- ARTE, DISEÑO Y CREATIVIDAD ---
  {
    id: 'diseno-digital-ux-ui',
    name: 'Diseño Digital, UX/UI e Interacción',
    area: 'Arte, Diseño y Tecnología',
    categoryColor: 'pink',
    duration: '4 años (8 semestres)',
    degreeType: 'Licenciatura',
    riasecPrimary: 'A',
    riasecSecondary: 'I',
    shortDescription: 'Crea experiencias digitales intuitivas y visualmente cautivadoras para aplicaciones móviles y productos interactivos.',
    fullDescription: 'Combina el diseño gráfico, la psicología del usuario y la tecnología. Diseña interfaces elegantes, sistemas de diseño (Design Systems), mapas de empatía y prototipos que facilitan la vida de millones de personas en internet.',
    necessarySkills: ['Manejo de Figma y herramientas de prototipado', 'Investigación con usuarios (User Research)', 'Teoría del color, tipografía y composición visual', 'Pensamiento centrado en el usuario (Design Thinking)'],
    workFields: [
      'Empresas tecnológicas de producto digital (apps, SaaS, e-commerce)',
      'Agencias de diseño interactivo e innovación',
      'Equipos de diseño de banca y plataformas digitales',
      'Trabajo remoto para clientes internacionales en modalidad freelance'
    ],
    averageSalaryRange: '$3,800,000 - $12,000,000 COP / mes',
    employabilityRate: '95%',
    dailyActivities: [
      'Construir wireframes y prototipos interactivos en Figma',
      'Realizar pruebas de usabilidad con usuarios reales para detectar fricciones',
      'Diseñar y mantener bibliotecas de componentes y Design Systems',
      'Coordinar con ingenieros de software la implementación del diseño'
    ],
    relatedSubjects: ['Diseño de Interfaces (UI)', 'Arquitectura de Información', 'Investigación de Usuarios (UX)', 'Tipografía y Composición Digital', 'Prototipado Interactivo'],
    suggestedUniversities: ['uni-andes', 'uni-javeriana', 'uni-eafit', 'uni-caldas', 'uni-upb'],
    iconName: 'Palette',
    isTrending: true
  },
  {
    id: 'arquitectura-urbanismo',
    name: 'Arquitectura y Urbanismo Sostenible',
    area: 'Arte, Construcción y Hábitat',
    categoryColor: 'violet',
    duration: '5 años (10 semestres)',
    degreeType: 'Licenciatura',
    riasecPrimary: 'A',
    riasecSecondary: 'R',
    shortDescription: 'Diseña espacios habitables extraordinarios, edificios ecológicos y ciudades funcionales y armónicas.',
    fullDescription: 'Funde el arte y la técnica constructiva. El arquitecto proyecta viviendas, museos, plazas públicas y planes de ordenamiento territorial con criterios bioclimáticos y belleza estética.',
    necessarySkills: ['Percepción espacial tridimensional y estética', 'Manejo de software BIM (Revit, AutoCAD, Rhino)', 'Conocimientos de sostenibilidad y eficiencia energética', 'Sensibilidad por la historia urbana y el paisaje'],
    workFields: [
      'Estudios de arquitectura y diseño de interiores',
      'Empresas de desarrollo inmobiliario y construcción',
      'Oficinas de planeación urbana y conservación patrimonial',
      'Diseño de espacios comerciales y escenografía'
    ],
    averageSalaryRange: '$3,200,000 - $9,500,000 COP / mes',
    employabilityRate: '89%',
    dailyActivities: [
      'Modelar volumetrías y planos arquitectónicos en software 3D y BIM',
      'Elegir paletas de materiales sostenibles, iluminación y ventilación natural',
      'Coordinar con ingenieros estructurales las instalaciones de la edificación',
      'Supervisar en obra los acabados arquitectónicos y detalles estéticos'
    ],
    relatedSubjects: ['Taller de Proyectos Arquitectónicos', 'Modelado BIM y Renderizado', 'Historia de la Arquitectura', 'Arquitectura Bioclimática', 'Urbanismo y Territorio'],
    suggestedUniversities: ['uni-unal', 'uni-andes', 'uni-javeriana', 'uni-upb', 'uni-uninorte'],
    iconName: 'Building2'
  },
  {
    id: 'diseno-modas-textil',
    name: 'Diseño de Modas y Gestión Textil',
    area: 'Arte, Diseño y Moda',
    categoryColor: 'rose',
    duration: '4 a 5 años (8-10 semestres)',
    degreeType: 'Licenciatura',
    riasecPrimary: 'A',
    riasecSecondary: 'E',
    shortDescription: 'Crea colecciones de vestuario vanguardistas, moda sostenible y gestiona marcas textiles de proyección internacional.',
    fullDescription: 'Abarca desde la conceptualización de tendencias, patronaje y selección de fibras ecológicas hasta el marketing de moda, estilismo para pasarelas y dirección creativa de marcas.',
    necessarySkills: ['Creatividad estética y sensibilidad para texturas', 'Ilustración de moda y patronaje digital', 'Conocimientos de textiles y tinturas ecológicas', 'Visión comercial de la industria de la moda'],
    workFields: [
      'Marcas de moda y confección textil de autor o masiva',
      'Dirección de vestuario para cine, televisión y teatro',
      'Estilismo editorial de revistas de moda y pasarelas (Colombiamoda)',
      'Emprendimiento de marcas de ropa sostenible y accesorios'
    ],
    averageSalaryRange: '$2,800,000 - $8,000,000 COP / mes',
    employabilityRate: '86%',
    dailyActivities: [
      'Elaborar moodboards de inspiración y definir conceptos de colección',
      'Realizar bocetos técnicos e instrucciones de costura (fichas técnicas)',
      'Seleccionar tejidos, estampados y fornituras para muestrarios',
      'Coordinar sesiones de fotos y estilismo para campañas de lanzamiento'
    ],
    relatedSubjects: ['Patronaje y Confección Avanzada', 'Historia del Traje y la Moda', 'Ilustración y Diseño Digital de Moda', 'Textiles y Fibras', 'Marketing y Branding de Moda'],
    suggestedUniversities: ['uni-upb', 'uni-andes', 'uni-javeriana'],
    iconName: 'Scissors'
  },
  {
    id: 'cine-medios-audiovisuales',
    name: 'Cine, Medios Audiovisuales y Animación',
    area: 'Arte y Comunicación Audiovisual',
    categoryColor: 'red',
    duration: '4 a 5 años (8-10 semestres)',
    degreeType: 'Licenciatura',
    riasecPrimary: 'A',
    riasecSecondary: 'R',
    shortDescription: 'Dirige películas, series de televisión, animaciones 3D y cortometrajes que conmueven al público.',
    fullDescription: 'Prepara creadores audiovisuales para dominar el lenguaje cinematográfico: guion, dirección de actores, fotografía, sonido envolvente, montaje y animación digital por computador.',
    necessarySkills: ['Narrativa visual y escritura de guiones', 'Manejo de cámaras de cine, ópticas e iluminación', 'Edición y posproducción en software profesional (Premiere, DaVinci)', 'Liderazgo en rodajes y rodajes de alta presión'],
    workFields: [
      'Productoras cinematográficas y de series para streaming (Netflix, HBO)',
      'Canales de televisión y productoras de comerciales publicitarios',
      'Estudios de animación 3D y videojuegos',
      'Dirección de videoclips musicales y documentalismo social'
    ],
    averageSalaryRange: '$2,800,000 - $8,500,000 COP / mes',
    employabilityRate: '85%',
    dailyActivities: [
      'Escribir y pulir guiones literarios y técnicos',
      'Operar cámaras de alta resolución y calibrar esquemas de luces',
      'Dirigir actores y coordinar al equipo técnico durante el rodaje',
      'Realizar corrección de color y mezcla de pistas sonoras'
    ],
    relatedSubjects: ['Guion Cinematográfico', 'Dirección de Fotografía', 'Montaje y Edición Digital', 'Animación y Efectos Visuales (VFX)', 'Dirección de Arte'],
    suggestedUniversities: ['uni-unal', 'uni-javeriana', 'uni-rosario', 'uni-udea'],
    iconName: 'Video'
  },

  // --- CIENCIAS ECONÓMICAS, ADMINISTRATIVAS Y NEGOCIOS ---
  {
    id: 'administracion-empresas',
    name: 'Administración de Empresas y Emprendimiento',
    area: 'Ciencias Económicas y Administrativas',
    categoryColor: 'emerald',
    duration: '4 a 5 años (8-10 semestres)',
    degreeType: 'Licenciatura',
    riasecPrimary: 'E',
    riasecSecondary: 'C',
    shortDescription: 'Lidera organizaciones, formula estrategias comerciales innovadoras y crea empresas de alto crecimiento.',
    fullDescription: 'Proporciona una visión integral de todas las áreas de una organización: finanzas, talento humano, operaciones, mercadeo e innovación para dirigir empresas hacia el éxito y la sostenibilidad.',
    necessarySkills: ['Liderazgo transformacional y toma de decisiones', 'Visión estratégica de negocios e innovación', 'Análisis financiero y formulación de proyectos', 'Habilidad para negociar y crear alianzas'],
    workFields: [
      'Cargos directivos y gerenciales en empresas nacionales y multinacionales',
      'Creación de empresas propias y startups innovadoras',
      'Firmas de consultoría estratégica y gestión del cambio',
      'Organizaciones no gubernamentales e incubadoras de negocios'
    ],
    averageSalaryRange: '$3,500,000 - $12,000,000 COP / mes',
    employabilityRate: '93%',
    dailyActivities: [
      'Diseñar planes estratégicos corporativos y presupuestos anuales',
      'Evaluar la viabilidad financiera de nuevos lanzamientos de producto',
      'Coordinar y motivar a gerentes de mercadeo, finanzas y operaciones',
      'Negociar acuerdos con inversionistas, socios y proveedores clave'
    ],
    relatedSubjects: ['Gerencia Estratégica', 'Finanzas Corporativas', 'Mercadeo y Estrategia Comercial', 'Gestión del Talento Humano', 'Emprendimiento y Modelos de Negocio'],
    suggestedUniversities: ['uni-eafit', 'uni-andes', 'uni-javeriana', 'uni-unal', 'uni-rosario', 'uni-uninorte'],
    iconName: 'Briefcase',
    isTrending: true
  },
  {
    id: 'economia-finanzas',
    name: 'Economía y Finanzas Cuantitativas',
    area: 'Ciencias Económicas y Sociales',
    categoryColor: 'indigo',
    duration: '4 a 5 años (8-10 semestres)',
    degreeType: 'Licenciatura',
    riasecPrimary: 'I',
    riasecSecondary: 'C',
    shortDescription: 'Analiza los mercados bursátiles, la inflación, las tasas de interés y diseña políticas económicas que impulsan el desarrollo.',
    fullDescription: 'Estudia cómo las sociedades administran recursos escasos. Forma profesionales rigurosos en econometría, teoría monetaria, valoración de activos y diseño de políticas públicas para combatir la pobreza y generar empleo.',
    necessarySkills: ['Modelado econométrico y matemático riguroso', 'Comprensión macroeconómica y de mercados financieros', 'Pensamiento crítico y capacidad de síntesis analítica', 'Manejo de software econométrico (Stata, R, Python)'],
    workFields: [
      'Banco de la República de Colombia y bancos centrales',
      'Bancos de inversión, comisionistas de bolsa y fondos de pensiones',
      'Ministerio de Hacienda, DNP (Departamento Nacional de Planeación)',
      'Organismos internacionales (FMI, Banco Mundial, CEPAL)'
    ],
    averageSalaryRange: '$3,800,000 - $13,000,000 COP / mes',
    employabilityRate: '94%',
    dailyActivities: [
      'Estimar modelos econométricos para proyectar inflación y PIB',
      'Valorar portafolios de acciones, bonos del tesoro y derivados',
      'Evaluar el impacto socioeconómico de reformas tributarias y pensionales',
      'Elaborar informes de coyuntura económica para inversionistas'
    ],
    relatedSubjects: ['Microeconomía y Macroeconomía Avanzada', 'Econometría', 'Mercados de Capitales y Finanzas', 'Política Monetaria y Fiscal', 'Evaluación Económica de Proyectos'],
    suggestedUniversities: ['uni-andes', 'uni-rosario', 'uni-unal', 'uni-javeriana', 'uni-externado', 'uni-eafit'],
    iconName: 'TrendingUp'
  },
  {
    id: 'contaduria-auditoria',
    name: 'Contaduría Pública y Auditoría Forense',
    area: 'Ciencias Económicas y Administrativas',
    categoryColor: 'blue',
    duration: '4 a 5 años (8-10 semestres)',
    degreeType: 'Licenciatura',
    riasecPrimary: 'C',
    riasecSecondary: 'E',
    shortDescription: 'Garantiza la transparencia financiera, elabora balances bajo normas NIIF y previene fraudes corporativos.',
    fullDescription: 'Profesión garante de la fe pública económica. Domina las Normas Internacionales de Información Financiera (NIIF), la planeación tributaria, el control interno y la auditoría forense para blindar a las organizaciones contra desfalcos.',
    necessarySkills: ['Rigor y exactitud numérica impecable', 'Dominio de la legislación tributaria y normas contables NIIF', 'Integridad ética y confidencialidad absoluta', 'Habilidades de auditoría y control de riesgos'],
    workFields: [
      'Firmas multinacionales de auditoría ("Big Four": Deloitte, PwC, EY, KPMG)',
      'Direcciones de impuestos y contralorías corporativas',
      'Entidades de fiscalización estatal (DIAN, Contraloría General)',
      'Revisoría fiscal independiente y peritaje contable en litigios'
    ],
    averageSalaryRange: '$3,000,000 - $9,500,000 COP / mes',
    employabilityRate: '95%',
    dailyActivities: [
      'Consolidar estados financieros y balances generales bajo NIIF',
      'Liquidar declaraciones de renta, IVA y retenciones en la fuente',
      'Ejecutar pruebas de auditoría para verificar la veracidad de libros contables',
      'Rastrear anomalías financieras en investigaciones de auditoría forense'
    ],
    relatedSubjects: ['Contabilidad Financiera y NIIF', 'Régimen Tributario Colombiano', 'Auditoría y Revisoría Fiscal', 'Costos y Presupuestos', 'Auditoría Forense y Control Interno'],
    suggestedUniversities: ['uni-unal', 'uni-javeriana', 'uni-externado', 'uni-udea', 'uni-uptc'],
    iconName: 'FileSpreadsheet'
  },
  {
    id: 'marketing-digital',
    name: 'Marketing Digital y Estrategia Comercial',
    area: 'Ciencias Económicas y Comunicación',
    categoryColor: 'amber',
    duration: '4 años (8 semestres)',
    degreeType: 'Licenciatura',
    riasecPrimary: 'E',
    riasecSecondary: 'A',
    shortDescription: 'Conquista audiencias globales mediante analítica web, pauta digital, neuromarketing y posicionamiento de marcas.',
    fullDescription: 'Entiende qué mueve las decisiones de compra del consumidor contemporáneo. Diseña embudos de conversión, pauta en motores de búsqueda y redes sociales, marketing de influencers y estrategias omnicanal.',
    necessarySkills: ['Pensamiento creativo y visión comercial audaz', 'Analítica web y métricas de adquisición (CAC, LTV, ROAS)', 'Gestión de campañas de pauta digital (Google Ads, Meta Ads)', 'Estrategia de contenidos y storytelling persuasivo'],
    workFields: [
      'Agencias de marketing digital y growth marketing',
      'Empresas de e-commerce y startups de comercio digital',
      'Departamentos de marca de grandes empresas de retail y consumo',
      'Consultoría de monetización digital y marca personal'
    ],
    averageSalaryRange: '$3,200,000 - $9,000,000 COP / mes',
    employabilityRate: '93%',
    dailyActivities: [
      'Diseñar y optimizar campañas de pauta publicitaria en Google y redes sociales',
      'Analizar embudos de ventas en herramientas de analítica digital',
      'Planear estrategias de lanzamiento de productos con creadores de contenido',
      'Medir el retorno de inversión publicitaria y reasignar presupuestos'
    ],
    relatedSubjects: ['Comportamiento del Consumidor', 'Growth Marketing y Analítica Digital', 'Estrategia de Pauta Digital (SEM/Paid Social)', 'Branding y Storytelling', 'Comercio Electrónico'],
    suggestedUniversities: ['uni-eafit', 'uni-javeriana', 'uni-andes', 'uni-sabana'],
    iconName: 'Megaphone',
    isTrending: true
  },
  {
    id: 'negocios-internacionales',
    name: 'Negocios Internacionales y Logística Global',
    area: 'Ciencias Económicas y Comercio Exterior',
    categoryColor: 'indigo',
    duration: '4 a 5 años (8-10 semestres)',
    degreeType: 'Licenciatura',
    riasecPrimary: 'E',
    riasecSecondary: 'C',
    shortDescription: 'Gestiona importaciones y exportaciones, cadenas de transporte marítimo/aéreo y apertura de nuevos mercados globales.',
    fullDescription: 'Conecta a Colombia con el mundo. Domina los acuerdos aduaneros, la logística de contenedores, la negociación intercultural y las finanzas de divisas para internacionalizar productos y servicios.',
    necessarySkills: ['Negociación intercultural y dominio de idiomas', 'Normatividad aduanera, aranceles e Incoterms', 'Gestión de logística marítima, aérea y multimodal', 'Visión comercial para identificar mercados extranjeros'],
    workFields: [
      'Empresas exportadoras e importadoras de bienes y materias primas',
      'Sociedades portuarias, zonas francas y aeropuertos de carga',
      'Agencias de aduanas y agentes de carga internacional (freight forwarders)',
      'Entidades de promoción de exportaciones (ProColombia)'
    ],
    averageSalaryRange: '$3,400,000 - $10,500,000 COP / mes',
    employabilityRate: '91%',
    dailyActivities: [
      'Coordinar trámites de nacionalización y desaduanamiento de mercancías',
      'Cotizar fletes de contenedores con navieras y aerolíneas internacionales',
      'Negociar contratos de compraventa internacional bajo términos Incoterms',
      'Estudiar requerimientos sanitarios y técnicos para exportar a Europa o Asia'
    ],
    relatedSubjects: ['Comercio Exterior y Aduanas', 'Logística Internacional e Incoterms', 'Negociación Intercultural', 'Finanzas Internacionales y Divisas', 'Investigación de Mercados Externos'],
    suggestedUniversities: ['uni-eafit', 'uni-uninorte', 'uni-externado', 'uni-sabana', 'uni-rosario'],
    iconName: 'Ship'
  },
  {
    id: 'gastronomia-artes-culinarias',
    name: 'Gastronomía y Dirección de Artes Culinarias',
    area: 'Hospitalidad, Arte y Negocios',
    categoryColor: 'rose',
    duration: '4 años (8 semestres)',
    degreeType: 'Licenciatura',
    riasecPrimary: 'A',
    riasecSecondary: 'E',
    shortDescription: 'Crea experiencias sensoriales de alta cocina, rescata ingredientes ancestrales y dirige restaurantes de prestigio.',
    fullDescription: 'Mucho más que cocinar: combina la ciencia de los alimentos, la vanguardia gastronómica, el maridaje, la pastelería artística y la gerencia rentable de negocios de hospitalidad y restauración.',
    necessarySkills: ['Creatividad sensorial y pasión por el sabor', 'Destreza en técnicas culinarias de vanguardia y tradicionales', 'Liderazgo bajo presión en el pase de cocina', 'Control de costos de alimentos e higiene bromatológica'],
    workFields: [
      'Restaurantes de autor y alta gastronomía nacional e internacional',
      'Cadenas hoteleras de lujo y cruceros internacionales',
      'Emprendimiento de conceptos gastronómicos y catering de élite',
      'Investigación de nuevos productos alimenticios e ingredientes autóctonos'
    ],
    averageSalaryRange: '$2,800,000 - $8,500,000 COP / mes',
    employabilityRate: '87%',
    dailyActivities: [
      'Diseñar cartas de menú equilibradas y maridajes sensoriales',
      'Coordinar la brigada de cocina durante los servicios de almuerzo y cena',
      'Estandarizar recetas y costear mermas para rentabilidad del menú',
      'Supervisar normas sanitarias de almacenamiento y manipulación de alimentos'
    ],
    relatedSubjects: ['Técnicas Culinarias de Vanguardia', 'Pastelería y Panadería Artesanal', 'Enología y Maridaje de Bebidas', 'Cocinas Tradicionales y de Origen', 'Administración y Costos de Restaurantes'],
    suggestedUniversities: ['uni-sabana', 'uni-externado'],
    iconName: 'Utensils'
  },

  // --- CIENCIAS NATURALES Y EXACTAS ---
  {
    id: 'biologia-biotecnologia',
    name: 'Biología y Biotecnología Aplicada',
    area: 'Ciencias Naturales y Exactas',
    categoryColor: 'emerald',
    duration: '5 años (10 semestres)',
    degreeType: 'Licenciatura',
    riasecPrimary: 'I',
    riasecSecondary: 'R',
    shortDescription: 'Investiga la biodiversidad de los ecosistemas, microorganismos y desarrolla soluciones biotecnológicas en salud y agricultura.',
    fullDescription: 'Colombia es el segundo país más biodiverso del mundo. El biólogo explora la flora, fauna marina y terrestre, la genética y la bioinformática para conservar especies y crear productos biotecnológicos.',
    necessarySkills: ['Pasión por el trabajo de campo en selvas, páramos y mares', 'Manejo riguroso de microscopía y biología molecular', 'Capacidad de clasificación taxonómica y ecológica', 'Pensamiento científico y análisis genético'],
    workFields: [
      'Institutos de investigación de biodiversidad (Instituto Humboldt, INVEMAR, SINCHI)',
      'Industrias biotecnológicas de bioinsumos agrícolas y enzimas',
      'Jardines botánicos, herbarios y parques nacionales naturales',
      'Consultoría en evaluación ecológica y conservación de fauna'
    ],
    averageSalaryRange: '$3,000,000 - $8,000,000 COP / mes',
    employabilityRate: '87%',
    dailyActivities: [
      'Realizar inventarios biológicos y monitoreo de especies en ecosistemas',
      'Aislar y caracterizar cepas bacterianas con potencial biofertilizante',
      'Secuenciar ADN y analizar variantes genéticas de poblaciones protegidas',
      'Publicar artículos científicos con hallazgos de nuevas especies'
    ],
    relatedSubjects: ['Ecología y Conservación', 'Genética y Biología Molecular', 'Zoología y Botánica', 'Bioinformática y Filogenia', 'Microbiología Aplicada'],
    suggestedUniversities: ['uni-unal', 'uni-udea', 'uni-andes', 'uni-univalle'],
    iconName: 'Dna'
  },
  {
    id: 'criminalistica-ciencias-forenses',
    name: 'Criminalística y Ciencias Forenses',
    area: 'Ciencias Forenses y Seguridad',
    categoryColor: 'slate',
    duration: '4 a 5 años (8 a 10 semestres)',
    semestersCount: 9,
    semesterTuition: '$3,800,000 - $6,500,000 COP / semestre (Aplica Matrícula Cero en universidades públicas como Tecnológico de Antioquia)',
    citiesOffered: ['Medellín', 'Bogotá', 'Bucaramanga', 'Cali'],
    degreeType: 'Profesional Universitario',
    level: 'Profesional Universitario',
    modality: 'Presencial',
    riasecPrimary: 'I',
    riasecSecondary: 'R',
    shortDescription: 'Investiga el lugar de los hechos, recolecta y analiza evidencias físicas, balística y huellas para esclarecer presuntos delitos ante la justicia.',
    fullDescription: 'La Criminalística aplica las ciencias exactas, la física, química y biología para reconstruir los hechos delictivos y aportar pruebas científicas irrefutables ante los tribunales. Los profesionales dominan la lofoscopia (huellas dactilares), balística forense, documentología (falsedad documental y grafología), análisis de sustancias y cadena de custodia judicial.',
    necessarySkills: [
      'Atención minuciosa al detalle y observación científica',
      'Rigor en la custodia y tratamiento de evidencias',
      'Pensamiento lógico y reconstrucción analítica de escenas',
      'Destreza en microscopía, química y fotografía pericial',
      'Redacción técnica de informes periciales sustentables en juicio oral'
    ],
    workFields: [
      'Fiscalía General de la Nación (Cuerpo Técnico de Investigación - CTI)',
      'Instituto Nacional de Medicina Legal y Ciencias Forenses',
      'Policía Nacional de Colombia (DIJIN e Interpol / SIJIN)',
      'Defensoría del Pueblo y consultorías de defensa judicial',
      'Firmas privadas de peritaje judicial y auditoría forense',
      'Compañías de seguros e investigación de siniestros'
    ],
    averageSalaryRange: '$3,000,000 - $7,500,000 COP / mes',
    employabilityRate: '94%',
    dailyActivities: [
      'Inspeccionar técnicamente el lugar de los hechos y fijar evidencias fotográficamente',
      'Realizar cotejos balísticos y análisis dactilares en laboratorio forense',
      'Preservar la cadena de custodia de elementos materiales probatorios',
      'Comparecer como perito experto en audiencias del sistema penal oral acusatorio'
    ],
    relatedSubjects: [
      'Balística Forense e Identificación de Armas',
      'Lofoscopia y Dactiloscopia Comparativa',
      'Documentología Forense y Grafotecnia',
      'Fotografía y Topografía Judicial Forense',
      'Biología, Genética y Toxicología Forense',
      'Derecho Procesal Penal y Cadena de Custodia'
    ],
    suggestedUniversities: ['uni-tdea', 'uni-udemedellin', 'uni-unicolmayor', 'uni-umb', 'uni-uan'],
    iconName: 'Fingerprint',
    isTrending: true
  },
  {
    id: 'criminologia-politica-criminal',
    name: 'Criminología y Política Criminal',
    area: 'Ciencias Sociales y Jurídicas',
    categoryColor: 'purple',
    duration: '4 a 5 años (8 a 10 semestres)',
    semestersCount: 9,
    semesterTuition: '$3,600,000 - $6,800,000 COP / semestre (Consultar según institución pública o privada)',
    citiesOffered: ['Bogotá', 'Cali', 'Medellín', 'Manizales'],
    degreeType: 'Profesional Universitario',
    level: 'Profesional Universitario',
    modality: 'Presencial',
    riasecPrimary: 'I',
    riasecSecondary: 'S',
    shortDescription: 'Estudia las causas del delito, la conducta antisocial, la victimología y el diseño de políticas públicas de prevención y reinserción.',
    fullDescription: 'A diferencia de la criminalística (que analiza las evidencias físicas de cómo ocurrió un crimen), la Criminología es una ciencia social interdisciplinaria que estudia por qué ocurre la criminalidad, los factores psicológicos, sociológicos y económicos de la delincuencia, la atención y reparación integral a las víctimas (victimología), el sistema penitenciario y el diseño de políticas estatales de seguridad ciudadana y justicia restaurativa.',
    necessarySkills: [
      'Análisis sociopolítico y comprensión del comportamiento humano',
      'Pensamiento crítico e investigación estadística sobre el delito',
      'Sensibilidad ética y enfoque en derechos humanos y víctimas',
      'Capacidad para formular y evaluar políticas públicas de seguridad',
      'Mediación de conflictos y enfoque en justicia restaurativa'
    ],
    workFields: [
      'Ministerio de Justicia y del Derecho de Colombia',
      'Instituto Nacional Penitenciario y Carcelario (INPEC)',
      'Alcaldías y secretarías departamentales de seguridad y convivencia',
      'Organizaciones de defensa de derechos humanos y atención a víctimas',
      'Centros de resocialización de menores y programas de reinserción',
      'Departamentos de seguridad corporativa y prevención de fraudes',
      'Centros universitarios de investigación criminológica'
    ],
    averageSalaryRange: '$3,200,000 - $7,800,000 COP / mes',
    employabilityRate: '91%',
    dailyActivities: [
      'Analizar estadísticas de criminalidad y diseñar mapas de calor delictivo',
      'Elaborar perfiles victimológicos y programas de prevención social',
      'Diseñar y auditar programas de resocialización en centros penitenciarios',
      'Formular recomendaciones de política criminal para entidades gubernamentales'
    ],
    relatedSubjects: [
      'Sociología Criminal y Factores del Delito',
      'Psicología de la Conducta Antisocial y Perfilación Criminal',
      'Victimología y Modelos de Justicia Restaurativa',
      'Penología y Modelos de Gestión Penitenciaria',
      'Políticas Públicas de Seguridad Ciudadana y DDHH',
      'Estadística Aplicada al Análisis Criminológico'
    ],
    suggestedUniversities: ['uni-libre', 'uni-usc', 'uni-uan', 'uni-udea'],
    iconName: 'Scale',
    isTrending: true
  },
  {
    id: 'geologia-geociencias',
    name: 'Geología y Geociencias',
    area: 'Ciencias de la Tierra',
    categoryColor: 'amber',
    duration: '5 años (10 semestres)',
    degreeType: 'Ingeniería',
    riasecPrimary: 'R',
    riasecSecondary: 'I',
    shortDescription: 'Descifra la historia y estructura de la Tierra, explora minerales estratégicos y evalúa riesgos de sismos y volcanes.',
    fullDescription: 'Profesionales fascinados por los minerales, rocas y procesos tectónicos. Trabajan en la localización de fuentes de agua subterránea, litio para baterías, estabilidad de taludes y prevención de desastres naturales.',
    necessarySkills: ['Destreza en cartografía geológica de campo', 'Interpretación sísmica y de imágenes satelitales', 'Análisis petrográfico y mineralógico', 'Pasión por las expediciones en terrenos agrestes'],
    workFields: [
      'Servicio Geológico Colombiano (SGC) y monitoreo volcánico/sísmico',
      'Compañías de exploración mineral y recursos energéticos',
      'Consultorías de hidrogeología y captación de aguas subterráneas',
      'Gestión de riesgos por remoción en masa para infraestructuras'
    ],
    averageSalaryRange: '$3,800,000 - $11,500,000 COP / mes',
    employabilityRate: '90%',
    dailyActivities: [
      'Levantar mapas geológicos y columnas estratigráficas en terreno',
      'Identificar minerales en láminas delgadas bajo microscopio petrográfico',
      'Modelar reservorios subterráneos mediante datos sísmicos',
      'Evaluar zonas de amenaza volcánica o deslizamientos para alcaldías'
    ],
    relatedSubjects: ['Mineralogía y Petrología', 'Geología Estructural y Tectónica', 'Estratigrafía y Paleontología', 'Hidrogeología', 'Geofísica Aplicada'],
    suggestedUniversities: ['uni-unal', 'uni-uis', 'uni-caldas', 'uni-eafit'],
    iconName: 'Mountain'
  }
];


/**
 * Catálogo Unificado Completo:
 * Combina las 31 carreras fundacionales detalladas con más de 1.000 programas académicos oficiales SNIES de Colombia.
 */
export const COMPREHENSIVE_CAREERS_DATA: Career[] = [
  ...ORIGINAL_CORE_CAREERS,
  ...OFFICIAL_COLOMBIAN_PROGRAMS
];
