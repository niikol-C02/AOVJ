import { Scholarship, University } from '../types';

/**
 * Directorio oficial y verificado de Universidades e Instituciones de Educación Superior de Colombia.
 * Basado en datos del Ministerio de Educación Nacional (MEN) y el Sistema Nacional de Información de la Educación Superior (SNIES).
 */
export const COLOMBIAN_UNIVERSITIES_DATA: University[] = [
  {
    id: 'uni-unal',
    name: 'Universidad Nacional de Colombia',
    shortName: 'UNAL',
    type: 'Pública',
    city: 'Bogotá (Sedes en Medellín, Manizales, Palmira)',
    country: 'Colombia',
    logoText: 'UNAL',
    badgeBg: 'bg-emerald-800 text-white',
    description: 'La principal institución de educación superior pública de Colombia, reconocida históricamente por su excelencia científica, investigativa y de formación humanística y técnica.',
    topCareers: [
      'Ingeniería de Software e Inteligencia Artificial',
      'Medicina y Cirugía',
      'Ingeniería Civil e Infraestructura',
      'Arquitectura y Urbanismo',
      'Derecho y Ciencias Jurídicas',
      'Biología y Biotecnología'
    ],
    admissionRequirements: [
      'Presentación y aprobación de la prueba de admisión propia de la Universidad Nacional de Colombia (o evaluación Saber 11 según convocatoria oficial)',
      'Inscripción previa en la Dirección Nacional de Admisiones (admisiones.unal.edu.co)',
      'Selección de programa por orden de puntaje estandarizado de admisión'
    ],
    tuitionInfo: 'Pública. Aplica la Política de Gratuidad "Puedo Estudiar" del Gobierno Nacional (cobertura del 100% de la matrícula para estudiantes que cumplan requisitos del SISBÉN IV o grupos priorizados). Para no beneficiarios, el costo se calcula mediante el Puntaje Básico de Matrícula (PBM) según ingresos familiares.',
    campusHighlights: [
      'Campus Ciudad Universitaria "El Panóptico" en Bogotá: monumento nacional con más de 120 hectáreas de zonas verdes y museos',
      'Laboratorios de alta tecnología e institutos de investigación de nivel internacional (Instituto de Biotecnología, Centro de Investigaciones para el Desarrollo)',
      'Red nacional de bibliotecas con más de 1.5 millones de títulos físicos y digitales'
    ],
    websiteUrl: 'https://unal.edu.co',
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
    badgeBg: 'bg-yellow-500 text-slate-950',
    description: 'Universidad privada líder de Colombia y destacada en América Latina según el ranking QS. Cuenta con acreditaciones internacionales ABET en ingenierías y la prestigiosa "Triple Corona" (AACSB, AMBA, EQUIS) en administración.',
    topCareers: [
      'Ingeniería de Software e Inteligencia Artificial',
      'Administración de Empresas y Emprendimiento',
      'Economía y Finanzas',
      'Diseño Digital, UX/UI e Interacción',
      'Medicina',
      'Derecho'
    ],
    admissionRequirements: [
      'Excelente puntaje en el Examen de Estado de la Educación Media Saber 11 (ICFES)',
      'Diligenciamiento del formulario de admisión web institucional',
      'Entrevista o pruebas complementarias específicas para Medicina y programas selectos'
    ],
    tuitionInfo: 'Privada. Cuenta con uno de los fondos de apoyo financiero más robustos del país: Programa "Quiero Estudiar" (becas condonables de hasta el 100% con subsidio de sostenimiento), Programa Pa\'lante Pacífico, Beca Lleras y créditos institucionales.',
    campusHighlights: [
      'Campus integrado en los Cerros Orientales de Bogotá con arquitectura bioclimática de vanguardia',
      'Centro de Computación de Alto Rendimiento (HPC) e instalaciones MakerSpace para prototipado 3D e IoT',
      'Convenios de doble titulación con universidades top de Estados Unidos, Francia, Alemania y Reino Unido'
    ],
    websiteUrl: 'https://uniandes.edu.co',
    rating: 4.9
  },
  {
    id: 'uni-javeriana',
    name: 'Pontificia Universidad Javeriana',
    shortName: 'PUJ',
    type: 'Privada',
    city: 'Bogotá y Cali (Valle del Cauca)',
    country: 'Colombia',
    logoText: 'PUJ',
    badgeBg: 'bg-blue-900 text-white',
    description: 'Institución de tradición jesuita centenaria con acreditación institucional de alta calidad multicampus. Reconocida por su formación integral humanística, medicina de primer nivel, psicología, comunicación y derecho.',
    topCareers: [
      'Medicina y Cirugía',
      'Psicología Clínica y Social',
      'Comunicación Social y Periodismo Digital',
      'Derecho y Ciencias Jurídicas',
      'Ingeniería Industrial y Operaciones',
      'Odontología'
    ],
    admissionRequirements: [
      'Puntaje en las pruebas Saber 11 del ICFES',
      'Entrevista personal vocacional (presencial o virtual según sede)',
      'Evaluación de competencias específicas y pruebas actitudinales para carreras de la salud y artes'
    ],
    tuitionInfo: 'Privada. Ofrece la Beca Excelencia Bachiller Javeriana (descuentos del 50% al 80% en matrícula para los mejores puntajes Saber 11 de colegios de Colombia), Fondo San Francisco Javier para sostenimiento y créditos blandos.',
    campusHighlights: [
      'Hospital Universitario San Ignacio integrado en el campus central de Bogotá para prácticas clínicas desde primeros semestres',
      'Centro Ático: complejo audiovisual y tecnológico de producción transmedia de referencia en Sudamérica',
      'Campus verde Javeriana Cali con jardines tropicales y laboratorios de ingeniería de clase mundial'
    ],
    websiteUrl: 'https://www.javeriana.edu.co',
    rating: 4.8
  },
  {
    id: 'uni-udea',
    name: 'Universidad de Antioquia',
    shortName: 'UdeA',
    type: 'Pública',
    city: 'Medellín (Sedes en Oriente, Urabá, Bajo Cauca, Suroeste)',
    country: 'Colombia',
    logoText: 'UDEA',
    badgeBg: 'bg-emerald-700 text-white',
    description: 'La universidad pública insignia del departamento de Antioquia, fundada en 1803. Referente continental en investigación biomédica, microbiología, ciencias exactas, artes y formación docente.',
    topCareers: [
      'Medicina y Cirugía',
      'Ingeniería Química y de Procesos',
      'Ingeniería de Sistemas',
      'Enfermería y Cuidados Críticos',
      'Licenciatura en Pedagogía Infantil',
      'Artes Plásticas y Visuales'
    ],
    admissionRequirements: [
      'Prueba de admisión propia de la Universidad de Antioquia (evalúa Competencia Lectora y Razonamiento Lógico)',
      'Inscripción oficial a través del portal universitario de admisiones',
      'Asignación rigurosa de cupos por orden de puntaje en la prueba institucional'
    ],
    tuitionInfo: 'Pública. Cobijada por la Política de Gratuidad del Gobierno Nacional "Puedo Estudiar". Adicionalmente, cuenta con el Fondo de Bienestar Universitario con apoyos alimentarios diarios, residencias estudiantiles y tiquete de transporte subsidiado.',
    campusHighlights: [
      'Ciudad Universitaria en Medellín: campus abierto con el Museo Universitario (MUUA), teatro al aire libre y zonas deportivas',
      'Sede de Investigación Universitaria (SIU): complejo científico de vanguardia donde confluyen más de 50 grupos de investigación de excelencia',
      'Parque Científico y Tecnológico Ruta N con alianzas directas para pasantías de innovación'
    ],
    websiteUrl: 'https://www.udea.edu.co',
    rating: 4.8
  },
  {
    id: 'uni-univalle',
    name: 'Universidad del Valle',
    shortName: 'Univalle',
    type: 'Pública',
    city: 'Cali (Sedes en Palmira, Buga, Tuluá, Buenaventura, Cartago)',
    country: 'Colombia',
    logoText: 'UVALLE',
    badgeBg: 'bg-red-800 text-white',
    description: 'La principal universidad pública del suroccidente colombiano. Destaca por su producción científica en ingeniería sanitaria, salud pública, ciencias de los alimentos, economía y humanidades.',
    topCareers: [
      'Ingeniería Sanitaria y Ambiental',
      'Medicina y Salud Pública',
      'Ingeniería Eléctrica y Electrónica',
      'Trabajo Social y Desarrollo Comunitario',
      'Economía y Finanzas',
      'Música y Producción Sonora'
    ],
    admissionRequirements: [
      'Puntaje oficial en las pruebas de Estado Saber 11 del ICFES con ponderaciones específicas por área de conocimiento según la carrera',
      'Registro en línea en el portal de Admisiones de Univalle',
      'Pruebas de aptitud específicas para la Escuela de Música y Artes Escénicas'
    ],
    tuitionInfo: 'Pública. Matrícula calculada por estrato y nivel socioeconómico con amplia cobertura de Política de Gratuidad "Puedo Estudiar". Becas al mejor promedio por programa en cada semestre.',
    campusHighlights: [
      'Campus Meléndez en Cali: uno de los campus universitarios más extensos y arbolados de Colombia, con lagos y fauna protegida',
      'Hospital Universitario del Valle (HUV) "Evaristo García" para rotaciones clínicas de pregrado y posgrado',
      'Centro de Excelencia en Tecnologías de la Información y Comunicación'
    ],
    websiteUrl: 'https://www.univalle.edu.co',
    rating: 4.8
  },
  {
    id: 'uni-uis',
    name: 'Universidad Industrial de Santander',
    shortName: 'UIS',
    type: 'Pública',
    city: 'Bucaramanga (Sedes en Barrancabermeja, Socorro, Barbosa, Málaga)',
    country: 'Colombia',
    logoText: 'UIS',
    badgeBg: 'bg-lime-700 text-white',
    description: 'Reconocida como la capital de la ingeniería en el nororiente colombiano. Líder indiscutible en Ingeniería de Petróleos, Geología, Química, Ingeniería Mecánica y Ciencias Físicas.',
    topCareers: [
      'Ingeniería Mecatrónica y Robótica',
      'Ingeniería Química',
      'Geología y Geociencias',
      'Ingeniería de Sistemas',
      'Medicina',
      'Fisioterapia y Rehabilitación'
    ],
    admissionRequirements: [
      'Puntaje obtenido en el Examen de Estado Saber 11 (ponderado según el programa)',
      'Inscripción en línea en el sistema de admisiones de la UIS',
      'Pruebas complementarias para programas de Licenciatura en Música'
    ],
    tuitionInfo: 'Pública. Cubierta por la Política de Gratuidad del Ministerio de Educación Nacional. Otorga la "Beca Cum Laude" de exención de matrícula y estímulos en dinero al mejor estudiante de cada carrera por semestre.',
    campusHighlights: [
      'Parque Tecnológico Guatiguará (PTG): centro de investigación y desarrollo con microscopía electrónica de barrido y nanotecnología',
      'Campus Central de Bucaramanga con estadio de fútbol reglamentario, polideportivo y biblioteca bicentenaria',
      'Fuerte enlace con el Instituto Colombiano del Petróleo (ICP - Ecopetrol)'
    ],
    websiteUrl: 'https://uis.edu.co',
    rating: 4.8
  },
  {
    id: 'uni-uninorte',
    name: 'Universidad del Norte',
    shortName: 'Uninorte',
    type: 'Privada',
    city: 'Barranquilla (Atlántico)',
    country: 'Colombia',
    logoText: 'UNINORTE',
    badgeBg: 'bg-red-700 text-white',
    description: 'La institución de educación superior privada líder en la Región Caribe colombiana. Sobresale por su campus sostenible con certificación ambiental, facultades de ingeniería acreditadas por ABET y su hospital universitario.',
    topCareers: [
      'Ingeniería Industrial y Operaciones',
      'Medicina y Cirugía',
      'Negocios Internacionales y Logística',
      'Derecho y Relaciones Internacionales',
      'Psicología',
      'Comunicación Social y Periodismo'
    ],
    admissionRequirements: [
      'Puntaje en las pruebas Saber 11 del ICFES',
      'Diligenciamiento de formulario de admisión en uninorte.edu.co',
      'Entrevista para postulantes al programa de Medicina y aspirantes a becas institucionales'
    ],
    tuitionInfo: 'Privada. Líder nacional en programa de becas en el Caribe: Programa de Becas Orgullo Caribe (más de 15 modalidades de becas con cobertura del 50% al 100% de la matrícula, donadas por empresas aliadas como Promigas, Gases del Caribe y Argos).',
    campusHighlights: [
      'Hospital Universidad del Norte (HUN) propio para práctica médica y enfermería',
      'Campus verde "El Carmen" con Museo Mapuka (Arqueología del Caribe) y biblioteca moderna con salas de innovación colaborativa',
      'Centro de Emprendimiento e Innovación y convenios de prácticas en clústeres portuarios y logísticos de Barranquilla'
    ],
    websiteUrl: 'https://www.uninorte.edu.co',
    rating: 4.8
  },
  {
    id: 'uni-eafit',
    name: 'Universidad EAFIT',
    shortName: 'EAFIT',
    type: 'Privada',
    city: 'Medellín (Antioquia)',
    country: 'Colombia',
    logoText: 'EAFIT',
    badgeBg: 'bg-blue-800 text-white',
    description: 'Universidad de gran dinamismo empresarial e investigativo en Antioquia. Famosa por formar a los directivos empresariales y líderes de innovación más destacados de Colombia, con acreditaciones internacionales.',
    topCareers: [
      'Administración de Empresas y Emprendimiento',
      'Ingeniería de Software e Inteligencia Artificial',
      'Economía y Finanzas Cuantitativas',
      'Ingeniería de Procesos',
      'Diseño Interactivo y de Medios',
      'Negocios Internacionales'
    ],
    admissionRequirements: [
      'Resultados del Examen de Estado Saber 11',
      'Formulario de inscripción web debidamente completado',
      'Entrevista para programas especiales y convocatorias de becas al mérito'
    ],
    tuitionInfo: 'Privada. Ofrece el Programa de Becas Talento EAFIT (coberturas del 50% al 100% para estudiantes con excelencia académica y limitaciones económicas), Fondo de Becas de Empleados y Egresados, y convenios Icetex.',
    campusHighlights: [
      'Campus Parque en Medellín: arquitectura abierta galardonada con amplios jardines y auditorios bioclimáticos',
      'On.going: Centro de Emprendimiento de Impacto donde nacen startups apoyadas por fondos de inversión de riesgo',
      'Laboratorios de Realidad Virtual, Fabricación Digital y Sala de Simulación Financiera Bloomberg'
    ],
    websiteUrl: 'https://www.eafit.edu.co',
    rating: 4.8
  },
  {
    id: 'uni-rosario',
    name: 'Universidad del Rosario',
    shortName: 'URosario',
    type: 'Privada',
    city: 'Bogotá',
    country: 'Colombia',
    logoText: 'ROSARIO',
    badgeBg: 'bg-amber-600 text-slate-950',
    description: 'Fundada en 1653, es una de las instituciones más tradicionales y respetadas de Colombia. Cuna de próceres y mandatarios, destaca con máximas calificaciones en Medicina, Jurisprudencia, Economía y Relaciones Internacionales.',
    topCareers: [
      'Derecho y Jurisprudencia',
      'Medicina y Cirugía',
      'Relaciones Internacionales y Diplomacia',
      'Economía y Finanzas',
      'Periodismo y Opinión Pública',
      'Fisioterapia'
    ],
    admissionRequirements: [
      'Puntaje en las pruebas Saber 11 del ICFES',
      'Prueba de aptitudes y entrevista vocacional institucional',
      'Evaluación específica para la Escuela de Medicina y Ciencias de la Salud'
    ],
    tuitionInfo: 'Privada. Otorga la prestigiosa Beca Monseñor Castro Silva (100% de cobertura para los mejores puntajes del país), Beca Sueño Ser Rosarista y facilidades de pago directo sin intermediarios.',
    campusHighlights: [
      'Claustro Histórico en el centro de Bogotá: patrimonio histórico de la Nación con el Aula Máxima',
      'Alianza de formación e investigación con la Corporación Hospitalaria Juan Ciudad (Hospital Universitario Mayor Méderi)',
      'Sede Quinta de Mutis con laboratorios avanzados de microbiología, bioquímica y anatomía humana con disección virtual'
    ],
    websiteUrl: 'https://urosario.edu.co',
    rating: 4.8
  },
  {
    id: 'uni-sabana',
    name: 'Universidad de La Sabana',
    shortName: 'Unisabana',
    type: 'Privada',
    city: 'Chía (Cundinamarca / Área Metropolitana de Bogotá)',
    country: 'Colombia',
    logoText: 'SABANA',
    badgeBg: 'bg-sky-900 text-white',
    description: 'Institución acreditada de alta calidad con un moderno campus campestre en Chía. Destacada nacionalmente en Comunicación Social, Medicina, Enfermería, Gastronomía, Educación e Ingeniería Informática.',
    topCareers: [
      'Comunicación Social y Periodismo Digital',
      'Medicina y Cirugía',
      'Gastronomía y Artes Culinarias',
      'Administración de Servicios y Negocios',
      'Derecho',
      'Ingeniería Biomédica'
    ],
    admissionRequirements: [
      'Puntaje del examen de Estado Saber 11',
      'Entrevista de admisión con el director del programa académico',
      'Prueba de suficiencia y aptitud para Medicina y carreras de Ciencias de la Salud'
    ],
    tuitionInfo: 'Privada. Programa de Becas Excelencia Sabana (descuentos del 30% al 80% en el valor de la matrícula por mérito académico deportivo o cultural), Becas Alumni y crédito educativo institucional directo.',
    campusHighlights: [
      'Clínica Universidad de La Sabana propia en el campus: centro de trauma de alta complejidad y rehabilitación neurológica',
      'MediaLab de Comunicación: estudios de televisión 4K, cabinas de doblaje sonoro y redacción periodística digital',
      'Talleres y cocinas profesionales de alta gastronomía equipadas con tecnología culinaria europea'
    ],
    websiteUrl: 'https://www.unisabana.edu.co',
    rating: 4.7
  },
  {
    id: 'uni-externado',
    name: 'Universidad Externado de Colombia',
    shortName: 'Externado',
    type: 'Privada',
    city: 'Bogotá',
    country: 'Colombia',
    logoText: 'EXTERNADO',
    badgeBg: 'bg-emerald-900 text-white',
    description: 'Histórica institución laica y pluralista fundada en 1886. Reconocida como referente de la formación jurídica, finanzas públicas, gobierno, administración hotelera y ciencias sociales en Colombia.',
    topCareers: [
      'Derecho y Ciencias Jurídicas',
      'Finanzas y Relaciones Internacionales',
      'Comunicación Social y Periodismo',
      'Administración de Empresas Turísticas y Hoteleras',
      'Economía',
      'Sociología y Trabajo Social'
    ],
    admissionRequirements: [
      'Puntaje Saber 11 del ICFES',
      'Entrevista personal con docentes de la facultad',
      'Ensayo de motivación o prueba de comprensión de lectura crítica'
    ],
    tuitionInfo: 'Privada. Otorga becas de honor por excelencia académica para los primeros puestos de cada semestre, descuentos por hermanos en la institución y convenios con Icetex.',
    campusHighlights: [
      'Campus en el barrio La Candelaria y faldas de los cerros orientales con jardines botánicos y vistas panorámicas de Bogotá',
      'Edificios H e I de vanguardia arquitectónica con salas de audiencias judiciales de simulación oral y biblioteca especializada en derecho público',
      'Vínculos permanentes con las Altas Cortes y ministerios de Colombia para pasantías de Estado'
    ],
    websiteUrl: 'https://www.uexternado.edu.co',
    rating: 4.7
  },
  {
    id: 'uni-upb',
    name: 'Universidad Pontificia Bolivariana',
    shortName: 'UPB',
    type: 'Privada',
    city: 'Medellín (Sedes en Bucaramanga, Montería, Palmira)',
    country: 'Colombia',
    logoText: 'UPB',
    badgeBg: 'bg-red-900 text-white',
    description: 'Institución acreditada con presencia multicampus. Reconocida por su tradición en Ingeniería Mecánica, Eléctrica, Diseño de Vestuario, Arquitectura, Medicina y Comunicación Social.',
    topCareers: [
      'Diseño de Modas y Gestión Textil',
      'Ingeniería Mecánica y Automatización',
      'Arquitectura y Urbanismo',
      'Medicina y Ciencias de la Salud',
      'Publicidad y Diseño Digital',
      'Ingeniería Aeronáutica'
    ],
    admissionRequirements: [
      'Puntaje del examen Saber 11',
      'Inscripción web y entrevista vocacional',
      'Examen específico de aptitud para Medicina y programas de la salud'
    ],
    tuitionInfo: 'Privada. Ofrece la Beca a la Excelencia Académica (descuento del 50% al 80% en la matrícula para egresados sobresalientes de colegios), becas deportivas para atletas representativos y financiación directa.',
    campusHighlights: [
      'Ecocampus Laureles en Medellín: certificación Carbono Neutro con ciclorrutas internas y biodiversidad',
      'Fábrica de Diseño y Textil con laboratorios de corte láser, patronaje digital e impresión sobre tela',
      'Clínica Universitaria Bolivariana para la formación médica con servicio maternoinfantil de alta complejidad'
    ],
    websiteUrl: 'https://www.upb.edu.co',
    rating: 4.7
  },
  {
    id: 'uni-utp',
    name: 'Universidad Tecnológica de Pereira',
    shortName: 'UTP',
    type: 'Pública',
    city: 'Pereira (Risaralda)',
    country: 'Colombia',
    logoText: 'UTP',
    badgeBg: 'bg-green-700 text-white',
    description: 'La institución de educación superior pública líder en el Eje Cafetero. Destaca fuertemente en Mecatrónica, Medicina, Ciencias Ambientales, Ingeniería Industrial y Tecnologías de la Información.',
    topCareers: [
      'Ingeniería Mecatrónica y Robótica',
      'Medicina y Cirugía',
      'Ingeniería Industrial',
      'Ciencias Ambientales y Sostenibilidad',
      'Ingeniería de Sistemas y Computación',
      'Licenciatura en Pedagogía Infantil'
    ],
    admissionRequirements: [
      'Resultados de las pruebas de Estado Saber 11 con ponderación por áreas',
      'Registro oficial en el portal de Admisiones y Registro Académico de la UTP',
      'Selección transparente por estricto orden de mérito de puntajes'
    ],
    tuitionInfo: 'Pública. Amplia cobertura de la Política de Gratuidad del Gobierno Nacional "Puedo Estudiar". Bonos alimentarios diarios para estudiantes de estratos 1 y 2, y monitorías académicas remuneradas.',
    campusHighlights: [
      'Jardín Botánico UTP: reserva ecológica natural de 13 hectáreas dentro del campus universitario',
      'Planetario y Observatorio Astronómico de Pereira',
      'Laboratorios especializados de robótica móvil, automatización industrial y simulación clínica médica'
    ],
    websiteUrl: 'https://www.utp.edu.co',
    rating: 4.7
  },
  {
    id: 'uni-caldas',
    name: 'Universidad de Caldas',
    shortName: 'UCaldas',
    type: 'Pública',
    city: 'Manizales (Caldas)',
    country: 'Colombia',
    logoText: 'UCALDAS',
    badgeBg: 'bg-yellow-700 text-white',
    description: 'Emblema educativo de la ciudad universitaria de Manizales. Posee una sólida tradición en Medicina Humana, Medicina Veterinaria, Agronomía, Geología, Artes Escénicas y Diseño Visual.',
    topCareers: [
      'Medicina y Cirugía',
      'Medicina Veterinaria y Zootecnia',
      'Diseño Visual y Multimedia',
      'Geología e Ingeniería Geológica',
      'Agronomía y Producción Agropecuaria',
      'Derecho'
    ],
    admissionRequirements: [
      'Puntaje de la prueba de Estado Saber 11',
      'Inscripción web en el portal institucional ucaldas.edu.co',
      'Pruebas de aptitud específicas para la Licenciatura en Música y Artes Plásticas'
    ],
    tuitionInfo: 'Pública. Matrícula subsidiada con Política de Gratuidad "Puedo Estudiar". Programa de residencias universitarias masculinas y femeninas para estudiantes foráneos y subsidios de alimentación en el campus Palogrande.',
    campusHighlights: [
      'Centro Cultural Universitario Rogelio Salmona: obra cumbre de la arquitectura cultural colombiana',
      'Granja Montelindo y Hospital Veterinario para prácticas agropecuarias y zootécnicas',
      'Festival Internacional de la Imagen: encuentro mundial anual de diseño digital, interactividad y arte sonoro'
    ],
    websiteUrl: 'https://www.ucaldas.edu.co',
    rating: 4.7
  },
  {
    id: 'uni-cartagena',
    name: 'Universidad de Cartagena',
    shortName: 'Unicartagena',
    type: 'Pública',
    city: 'Cartagena de Indias (Bolívar)',
    country: 'Colombia',
    logoText: 'UDC',
    badgeBg: 'bg-amber-800 text-white',
    description: 'Fundada en 1827 por Simón Bolívar y Francisco de Paula Santander, es la universidad pública más antigua del Caribe colombiano. Históricamente reconocida en Medicina, Odontología, Derecho e Ingeniería Química.',
    topCareers: [
      'Medicina y Cirugía',
      'Odontología y Salud Oral',
      'Ingeniería Química e Industrial',
      'Derecho y Ciencias Políticas',
      'Enfermería',
      'Administración de Empresas y Turismo'
    ],
    admissionRequirements: [
      'Puntaje oficial del examen Saber 11 del ICFES',
      'Formulario de inscripción en línea en unicartagena.edu.co',
      'Clasificación por ponderado según el programa académico seleccionado'
    ],
    tuitionInfo: 'Pública. Beneficiaria de la Política de Gratuidad del Gobierno de Colombia. Matrículas sociales según estratificación socioeconómica y becas de estímulo semestral a los mejores promedios.',
    campusHighlights: [
      'Sede Claustro San Agustín en el centro amurallado de Cartagena, donde reposan las cenizas del Nobel Gabriel García Márquez',
      'Campus Ciencias de la Salud en Zaragocilla con laboratorios de simulación y centro de investigaciones parasitológicas',
      'Convenios de pasantías con el puerto marítimo de Cartagena y el sector petroquímico de Mamonal'
    ],
    websiteUrl: 'https://www.unicartagena.edu.co',
    rating: 4.7
  },
  {
    id: 'uni-uptc',
    name: 'Universidad Pedagógica y Tecnológica de Colombia',
    shortName: 'UPTC',
    type: 'Pública',
    city: 'Tunja (Sedes en Duitama, Sogamoso, Chiquinquirá)',
    country: 'Colombia',
    logoText: 'UPTC',
    badgeBg: 'bg-orange-800 text-white',
    description: 'La gran universidad pública de Boyacá y del oriente andino. Reconocida por su liderazgo en formación de docentes de excelencia, Ingeniería Metalúrgica, Ingeniería Geológica, Agronomía y Medicina.',
    topCareers: [
      'Licenciatura en Pedagogía y Ciencias de la Educación',
      'Ingeniería Metalúrgica y de Materiales',
      'Medicina y Cirugía',
      'Ingeniería Electromecánica',
      'Agronomía y Agroecología',
      'Contaduría Pública'
    ],
    admissionRequirements: [
      'Puntaje de la prueba Saber 11 del ICFES',
      'Inscripción a través del portal institucional uptc.edu.co',
      'Asignación rigurosa por mérito de puntajes ponderados por carrera'
    ],
    tuitionInfo: 'Pública. Cobijada integralmente por la Política de Gratuidad "Puedo Estudiar". Comedor universitario con tarifas altamente subsidiadas y residencias estudiantiles en el campus central de Tunja.',
    campusHighlights: [
      'Sede Central en Tunja con extensos campos deportivos, concha acústica y museo arqueológico regional',
      'Sede Seccional Sogamoso: epicentro de la investigación siderúrgica, minero-metalúrgica y geológica de Colombia',
      'Granjas experimentales en Paipa y Tunja para cultivos andinos y producción lechera sostenible'
    ],
    websiteUrl: 'https://www.uptc.edu.co',
    rating: 4.6
  }
];

/**
 * Convocatorias de becas y apoyos financieros reales en Colombia y convalidación internacional.
 * Basado en fuentes verificadas: Ministerio de Educación Nacional, ICETEX y fondos universitarios oficiales.
 */
export const COLOMBIAN_SCHOLARSHIPS_DATA: Scholarship[] = [
  {
    id: 'beca-gratuidad-puedo-estudiar',
    title: 'Política de Gratuidad "Puedo Estudiar" (Gobierno de Colombia)',
    organization: 'Ministerio de Educación Nacional de Colombia',
    coverage: '100% Total',
    badgeBg: 'bg-emerald-600',
    description: 'Cubre el 100% del valor de la matrícula ordinaria neta de programas de pregrado (técnico, tecnológico o universitario) en las 67 Instituciones de Educación Superior públicas de Colombia.',
    requirements: [
      'Tener nacionalidad colombiana',
      'Estar matriculado en un programa de pregrado en una institución pública vinculada',
      'No poseer título profesional universitario previo',
      'Estar clasificado en los grupos A, B o C del SISBÉN IV (en cualquier subgrupo), o pertenecer a comunidades indígenas, víctimas del conflicto, población afrocolombiana, palenquera o raizal'
    ],
    benefits: [
      '100% del valor de la matrícula académica durante la duración oficial del programa',
      'Permanencia del beneficio si el estudiante mantiene su condición regular académica',
      'Articulación con programas de sostenimiento como Renta Joven (Prosperidad Social) para alimentación y transporte'
    ],
    deadlineDate: '2026-12-15',
    targetAudience: 'Bachilleres y jóvenes colombianos que aspiran a ingresar a universidades públicas',
    applicationLink: 'https://www.mineducacion.gov.co/portal/Educacion-superior/Politica-de-Gratuidad/',
    fieldOfStudy: ['Todas las carreras de pregrado en las 67 universidades públicas'],
    isFeatured: true
  },
  {
    id: 'beca-quiero-estudiar-uniandes',
    title: 'Programa Beca "Quiero Estudiar" (UniAndes)',
    organization: 'Universidad de los Andes',
    coverage: '100% Total',
    badgeBg: 'bg-yellow-500',
    description: 'Otorga becas condonables que cubren hasta el 95% o 100% de la matrícula para los mejores bachilleres de escasos recursos económicos que deseen formarse en la Universidad de los Andes.',
    requirements: [
      'Tener entre 15 y 21 años de edad al momento de postularse',
      'Haber obtenido un puntaje sobresaliente en el examen de Estado Saber 11 (generalmente superior a 340-350 puntos)',
      'Pertenecer a estratos socioeconómicos 1, 2 o 3 con capacidad económica familiar limitada comprobable',
      'Superar el proceso de admisión general de la Universidad de los Andes'
    ],
    benefits: [
      'Hasta el 100% del valor de la matrícula semestral durante toda la carrera',
      'Subsidio de sostenimiento mensual para alimentación, transporte y materiales',
      'Acompañamiento psicológico, tutorías académicas y red de mentores egresados'
    ],
    deadlineDate: '2026-10-31',
    targetAudience: 'Jóvenes de excelencia académica en Saber 11 con limitaciones financieras',
    applicationLink: 'https://apoyofinanciero.uniandes.edu.co/quiero-estudiar',
    fieldOfStudy: ['Todas las carreras de pregrado (Ingenierías, Medicina, Administración, etc.)'],
    isFeatured: true
  },
  {
    id: 'beca-orgullo-caribe-uninorte',
    title: 'Programa de Becas Institucionales "Orgullo Caribe" (Uninorte)',
    organization: 'Universidad del Norte (Barranquilla)',
    coverage: '100% Total',
    badgeBg: 'bg-red-600',
    description: 'Convocatoria con más de 15 modalidades de beca financiada por la Universidad del Norte y empresas donantes del sector privado para bachilleres talentosos de los departamentos del Caribe colombiano.',
    requirements: [
      'Haber nacido o culminado el bachillerato en departamentos de la Región Caribe (Atlántico, Bolívar, Cesar, Córdoba, Magdalena, Sucre, Guajira o San Andrés)',
      'Puntaje destacado en las pruebas Saber 11 (habitualmente superior a 330 puntos)',
      'Estratos socioeconómicos 1, 2 o 3',
      'Ingresar por primera vez a primer semestre en la Universidad del Norte'
    ],
    benefits: [
      'Del 50% al 100% del valor de la matrícula semestral por el tiempo reglamentario de la carrera',
      'En modalidades completas: auxilio de libros semestral, transporte y alimentación',
      'Curso de inducción y nivelación académica gratuita previo al inicio de clases'
    ],
    deadlineDate: '2026-11-20',
    targetAudience: 'Estudiantes sobresalientes de la Costa Caribe colombiana',
    applicationLink: 'https://www.uninorte.edu.co/web/becas/inicio',
    fieldOfStudy: ['Ingenierías', 'Negocios', 'Medicina', 'Derecho', 'Humanidades', 'Diseño'],
    isFeatured: true
  },
  {
    id: 'beca-talento-eafit',
    title: 'Programa de Becas "Talento EAFIT"',
    organization: 'Universidad EAFIT (Medellín)',
    coverage: 'Parcial 50-80%',
    badgeBg: 'bg-blue-600',
    description: 'Apoyo económico para bachilleres de alto rendimiento académico y liderazgo comprobado que aspiren a cursar programas de pregrado en la Universidad EAFIT.',
    requirements: [
      'Haber obtenido un puntaje global sobresaliente en el Examen de Estado Saber 11',
      'Promedio de calificaciones igual o superior a 4.0/5.0 en los grados 10° y 11° de bachillerato',
      'Pertenecer a estratos socioeconómicos 1, 2, 3 o 4 con necesidad económica demostrada mediante estudio socioeconómico',
      'Demostrar compromiso con actividades de impacto comunitario, cultural o deportivo'
    ],
    benefits: [
      'Descuento o cubrimiento del 50% al 100% en la matrícula académica',
      'Acceso prioritario a monitores y tutores en materias de alta complejidad',
      'Inclusión en los semilleros de investigación y grupos de innovación empresarial'
    ],
    deadlineDate: '2026-11-15',
    targetAudience: 'Jóvenes de Antioquia y Colombia con vocación de liderazgo y excelencia',
    applicationLink: 'https://www.eafit.edu.co/becas',
    fieldOfStudy: ['Administración', 'Ingeniería de Software', 'Economía', 'Finanzas', 'Negocios'],
    isFeatured: true
  },
  {
    id: 'beca-excelencia-javeriana',
    title: 'Beca a la Excelencia Académica Bachiller (PUJ)',
    organization: 'Pontificia Universidad Javeriana',
    coverage: 'Parcial 50-80%',
    badgeBg: 'bg-blue-900',
    description: 'Reconoce el mérito académico de los mejores bachilleres de colegios de Colombia otorgando exenciones del 80% del valor de la matrícula en programas de pregrado.',
    requirements: [
      'Haber obtenido uno de los mejores puntajes en las pruebas Saber 11 a nivel departamental o nacional',
      'Ser postulado formalmente por el rector del colegio de origen o presentar postulación individual acreditada',
      'Haber sido admitido en la Pontificia Universidad Javeriana en el período correspondiente'
    ],
    benefits: [
      'Exención del 80% sobre el valor total de la matrícula durante toda la carrera (renovable por promedio ponderado superior a 4.2)',
      'Prioridad en asignación de cupos de movilidad e intercambio internacional',
      'Reconocimiento de distinción académica en el acta de grado'
    ],
    deadlineDate: '2026-11-10',
    targetAudience: 'Mejores bachilleres de Colombia con vocación de servicio integral',
    applicationLink: 'https://www.javeriana.edu.co/apoyo-financiero/becas',
    fieldOfStudy: ['Todas las facultades (Ciencias de la Salud, Ingeniería, Comunicación, Derecho)']
  },
  {
    id: 'beca-icetex-comunidades-negras',
    title: 'Fondo Especial para Comunidades Negras (ICETEX)',
    organization: 'ICETEX & Ministerio del Interior de Colombia',
    coverage: '100% Total',
    badgeBg: 'bg-purple-700',
    description: 'Crédito educativo 100% condonable para estudiantes afrocolombianos, raizales y palenqueros de escasos recursos y destacado desempeño académico para realizar estudios de pregrado o posgrado.',
    requirements: [
      'Ser colombiano perteneciente a la comunidad negra, afrocolombiana, raizal o palenquera',
      'No contar con recursos económicos suficientes para costear la educación superior',
      'Estar admitido o cursando un programa en una Institución de Educación Superior reconocida por el MEN',
      'Elaborar y ejecutar un proyecto de desarrollo social y comunitario avalado por un consejo comunitario'
    ],
    benefits: [
      'Hasta 3 Salarios Mínimos Mensuales Legales Vigentes (SMMLV) por semestre para matrícula y/o gastos de sostenimiento',
      '100% de condonación de la deuda al culminar satisfactoriamente los estudios y certificar la ejecución del proyecto comunitario'
    ],
    deadlineDate: '2026-12-01',
    targetAudience: 'Estudiantes afrocolombianos, raizales y palenqueros',
    applicationLink: 'https://web.icetex.gov.co/es/fondos/comunidades-negras',
    fieldOfStudy: ['Cualquier área del conocimiento a nivel nacional']
  },
  {
    id: 'beca-rosario-castro-silva',
    title: 'Beca Monseñor Castro Silva (Universidad del Rosario)',
    organization: 'Universidad del Rosario',
    coverage: '100% Total',
    badgeBg: 'bg-amber-600',
    description: 'La máxima distinción económica y honorífica de la Universidad del Rosario, concedida a bachilleres con puntajes extraordinarios en el examen de Estado Saber 11.',
    requirements: [
      'Haber obtenido un puntaje global superior a 360 puntos en el examen Saber 11 del ICFES',
      'Graduarse de bachillerato en el año inmediatamente anterior o vigente de la postulación',
      'Superar el examen de conocimientos específicos y la entrevista de liderazgo'
    ],
    benefits: [
      'Cubrimiento del 100% del valor de la matrícula durante los semestres del plan de estudios',
      'Afiliación a programas de liderazgo juvenil internacional Rosarista',
      'Mentoría directa con decanos y profesores eméritos'
    ],
    deadlineDate: '2026-10-25',
    targetAudience: 'Estudiantes élite en las pruebas de Estado en Colombia',
    applicationLink: 'https://urosario.edu.co/apoyo-financiero/becas',
    fieldOfStudy: ['Jurisprudencia (Derecho)', 'Medicina', 'Relaciones Internacionales', 'Economía']
  }
];
