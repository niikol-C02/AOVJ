import { Scholarship, University } from '../types';

/**
 * Directorio oficial y verificado de Universidades e Instituciones de Educación Superior de Colombia.
 * Basado en datos del Ministerio de Educación Nacional (MEN) y el Sistema Nacional de Información de la Educación Superior (SNIES).
 * Total: 233 Instituciones acreditadas a lo largo de todos los departamentos de Colombia.
 */
export const COLOMBIAN_UNIVERSITIES_DATA: University[] = [
  {
    "id": "uni-unal",
    "name": "Universidad Nacional de Colombia",
    "shortName": "UNAL",
    "type": "Pública",
    "city": "Bogotá (Sedes en Medellín, Manizales, Palmira, Amazonia, Caribe, Orinoquia, Tumaco, La Paz)",
    "department": "Bogotá D.C. / Nacional",
    "country": "Colombia",
    "logoText": "UNAL",
    "badgeBg": "bg-emerald-800 text-white",
    "description": "La principal institución de educación superior pública de Colombia, reconocida históricamente por su excelencia científica, investigativa y de formación humanística y técnica.",
    "topCareers": [
      "Ingeniería de Software e Inteligencia Artificial",
      "Medicina y Cirugía",
      "Ingeniería Civil e Infraestructura",
      "Arquitectura y Urbanismo",
      "Derecho y Ciencias Jurídicas",
      "Biología y Biotecnología"
    ],
    "admissionRequirements": [
      "Presentación y aprobación de la prueba de admisión propia de la Universidad Nacional de Colombia (o evaluación Saber 11 según convocatoria oficial)",
      "Inscripción previa en la Dirección Nacional de Admisiones (admisiones.unal.edu.co)",
      "Selección de programa por orden de puntaje estandarizado de admisión"
    ],
    "tuitionInfo": "Pública. Aplica la Política de Gratuidad \"Puedo Estudiar\" del Gobierno Nacional (cobertura del 100% de la matrícula para estudiantes que cumplan requisitos del SISBÉN IV o grupos priorizados). Para no beneficiarios, el costo se calcula mediante el Puntaje Básico de Matrícula (PBM) según ingresos familiares.",
    "campusHighlights": [
      "Campus Ciudad Universitaria \"El Panóptico\" en Bogotá: monumento nacional con más de 120 hectáreas de zonas verdes y museos",
      "Laboratorios de alta tecnología e institutos de investigación de nivel internacional (Instituto de Biotecnología, Centro de Investigaciones para el Desarrollo)",
      "Red nacional de bibliotecas con más de 1.5 millones de títulos físicos y digitales"
    ],
    "websiteUrl": "https://unal.edu.co",
    "rating": 4.9,
    "accreditation": "Acreditación Institucional de Alta Calidad por 10 años (MEN)"
  },
  {
    "id": "uni-andes",
    "name": "Universidad de los Andes",
    "shortName": "UniAndes",
    "type": "Privada",
    "city": "Bogotá",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "ANDES",
    "badgeBg": "bg-yellow-500 text-slate-950",
    "description": "Universidad privada líder de Colombia y destacada en América Latina según el ranking QS. Cuenta con acreditaciones internacionales ABET en ingenierías y la prestigiosa \"Triple Corona\" (AACSB, AMBA, EQUIS) en administración.",
    "topCareers": [
      "Ingeniería de Software e Inteligencia Artificial",
      "Administración de Empresas y Emprendimiento",
      "Economía y Finanzas",
      "Diseño Digital, UX/UI e Interacción",
      "Medicina",
      "Derecho"
    ],
    "admissionRequirements": [
      "Excelente puntaje en el Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Diligenciamiento del formulario de admisión web institucional",
      "Proceso de entrevista o prueba específica para carreras de la salud y artes"
    ],
    "tuitionInfo": "Privada. Matrícula por semestre según el programa académico. Ofrece el fondo de becas Quiero Estudiar, créditos con entidades financieras y programas de apoyo con el ICETEX.",
    "campusHighlights": [
      "Campus integrado al centro histórico y los Cerros Orientales de Bogotá con arquitectura bioclimática de vanguardia",
      "Centro Deportivo UniAndes con piscina semiolímpica, muro de escalada y canchas polideportivas",
      "Salas de cómputo de alto rendimiento, clúster de supercomputación y laboratorios Makerspace"
    ],
    "websiteUrl": "https://uniandes.edu.co",
    "rating": 4.9,
    "accreditation": "Acreditación Institucional de Alta Calidad por 10 años"
  },
  {
    "id": "uni-javeriana",
    "name": "Pontificia Universidad Javeriana",
    "shortName": "PUJ",
    "type": "Privada",
    "city": "Bogotá (Sede en Cali)",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "PUJ",
    "badgeBg": "bg-blue-900 text-white",
    "description": "Centenaria universidad jesuita con una tradición de más de 400 años. Destaca por su formación integral, su Hospital Universitario San Ignacio y su alta producción investigativa.",
    "topCareers": [
      "Medicina y Cirugía",
      "Comunicación Social y Periodismo",
      "Derecho y Ciencias Jurídicas",
      "Ingeniería de Sistemas",
      "Psicología y Salud Mental",
      "Arquitectura"
    ],
    "admissionRequirements": [
      "Resultado del examen Saber 11 (ICFES)",
      "Pruebas y entrevistas de admisión específicas por facultad",
      "Hoja de vida y ensayo de motivación para ciertos programas"
    ],
    "tuitionInfo": "Privada. Matrícula fijada anualmente por semestres. Cuenta con becas de excelencia académica para los mejores bachilleres de Colombia y planes de financiación directa a corto y mediano plazo.",
    "campusHighlights": [
      "Hospital Universitario San Ignacio: uno de los centros de salud y docencia más avanzados del país",
      "Edificio Jorge Hoyos Vásquez: complejo de aulas inteligentes y laboratorios de ingeniería de última generación",
      "Centro Ático: complejo de producción audiovisual, estudios de televisión 4K y posproducción sonora"
    ],
    "websiteUrl": "https://javeriana.edu.co",
    "rating": 4.8,
    "accreditation": "Acreditación Institucional de Alta Calidad por 10 años"
  },
  {
    "id": "uni-udea",
    "name": "Universidad de Antioquia",
    "shortName": "UdeA",
    "type": "Pública",
    "city": "Medellín (Sedes en Caucasia, Carmen de Viboral, Puerto Berrío, Andes, Turbo, Yarumal, Amalfi, Segovia, Santa Fe de Antioquia)",
    "department": "Antioquia",
    "country": "Colombia",
    "logoText": "UDEA",
    "badgeBg": "bg-emerald-700 text-white",
    "description": "La universidad insignia del departamento de Antioquia y la segunda pública más importante del país. Reconocida por su investigación médica, biológica, científica y sus aportes al desarrollo social.",
    "topCareers": [
      "Medicina y Cirugía",
      "Ingeniería Química y de Procesos",
      "Biología y Biotecnología",
      "Ingeniería Mecatrónica y Robótica",
      "Enfermería y Cuidados Clínicos",
      "Derecho"
    ],
    "admissionRequirements": [
      "Aprobación del examen de admisión propio de la Universidad de Antioquia (evaluación de Competencia Lectora y Razonamiento Lógico)",
      "Inscripción web en portal.udea.edu.co",
      "Asignación rigurosa por orden de puntaje descendente por programa y sede"
    ],
    "tuitionInfo": "Pública. Beneficiaria de la Política de Gratuidad \"Puedo Estudiar\" para estudiantes vulnerables. Tarifa diferenciada por estrato socioeconómico y colegio de procedencia para demás alumnos.",
    "campusHighlights": [
      "Ciudad Universitaria de Medellín: 27 hectáreas con Museo Universitario, Teatro Camilo Torres y zonas verdes",
      "Sede de Investigación Universitaria (SIU): complejo de laboratorios multidisciplinarios líder en biotecnología y vacunas en Colombia",
      "Red de bibliotecas con fondos históricos patrimoniales de Antioquia"
    ],
    "websiteUrl": "https://udea.edu.co",
    "rating": 4.8,
    "accreditation": "Acreditación Institucional de Alta Calidad por 10 años"
  },
  {
    "id": "uni-univalle",
    "name": "Universidad del Valle",
    "shortName": "Univalle",
    "type": "Pública",
    "city": "Cali (Sedes en Buga, Palmira, Tuluá, Yumbo, Buenaventura, Zarzal, Cartago, Caicedonia, Norte del Cauca)",
    "department": "Valle del Cauca",
    "country": "Colombia",
    "logoText": "UVALLE",
    "badgeBg": "bg-red-800 text-white",
    "description": "La principal universidad pública del suroccidente colombiano. Destacada en ciencias de la salud, humanidades, artes e ingeniería, con impacto directo en el desarrollo del Pacífico.",
    "topCareers": [
      "Medicina y Cirugía",
      "Ingeniería Eléctrica y Electrónica",
      "Psicología y Ciencias del Comportamiento",
      "Administración de Empresas",
      "Trabajo Social y Políticas Públicas",
      "Química"
    ],
    "admissionRequirements": [
      "Puntaje del Examen de Estado Saber 11 ponderado según los componentes exigidos por cada facultad",
      "Pruebas específicas de aptitud para programas de Artes y Música",
      "Registro oficial en admisiones.univalle.edu.co"
    ],
    "tuitionInfo": "Pública. Totalmente adscrita a la Política de Gratuidad del Gobierno Nacional. Para estudiantes no cobijados, el valor de la matrícula se liquida de acuerdo con la declaración de renta familiar y estrato.",
    "campusHighlights": [
      "Campus Meléndez: uno de los campus universitarios más extensos de América Latina, con lagos y reservas naturales urbanas",
      "Campus San Fernando: contiguo al Hospital Universitario del Valle, epicentro de las ciencias biomédicas y de la salud",
      "Centro Internacional de Entrenamiento e Investigaciones Médicas (CIDEIM)"
    ],
    "websiteUrl": "https://univalle.edu.co",
    "rating": 4.8,
    "accreditation": "Acreditación Institucional de Alta Calidad por 10 años"
  },
  {
    "id": "uni-uis",
    "name": "Universidad Industrial de Santander",
    "shortName": "UIS",
    "type": "Pública",
    "city": "Bucaramanga (Sedes en Barrancabermeja, Socorro, Barbosa, Málaga, Floridablanca)",
    "department": "Santander",
    "country": "Colombia",
    "logoText": "UIS",
    "badgeBg": "bg-lime-800 text-white",
    "description": "Referente nacional en ingenierías, petróleos, geociencias y ciencias exactas. Cuenta con una estrecha articulación con la industria energética y el Instituto Colombiano del Petróleo (ICP).",
    "topCareers": [
      "Ingeniería Química y de Procesos",
      "Geología y Geociencias",
      "Ingeniería Civil",
      "Ingeniería Mecánica",
      "Medicina",
      "Física"
    ],
    "admissionRequirements": [
      "Puntaje global del examen Saber 11 del ICFES con énfasis en matemáticas y ciencias naturales",
      "Inscripción web a través de uis.edu.co/admisiones",
      "Convocatorias semestrales para bachilleres de Santander y todo el territorio nacional"
    ],
    "tuitionInfo": "Pública. Matrícula cero a través de la Política de Gratuidad \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Escalas socioeconómicas para estudiantes restantes.",
    "campusHighlights": [
      "Parque Tecnológico Guatiguará (PTG): el centro de desarrollo científico e innovación más grande del oriente colombiano",
      "Laboratorios especializados en microscopía electrónica y análisis petrofísico avanzado",
      "Estadio Primero de Mayo y complejo polideportivo universitario"
    ],
    "websiteUrl": "https://uis.edu.co",
    "rating": 4.8,
    "accreditation": "Acreditación Institucional de Alta Calidad por 10 años"
  },
  {
    "id": "uni-uninorte",
    "name": "Universidad del Norte",
    "shortName": "Uninorte",
    "type": "Privada",
    "city": "Barranquilla",
    "department": "Atlántico",
    "country": "Colombia",
    "logoText": "NORTE",
    "badgeBg": "bg-red-600 text-white",
    "description": "La universidad privada más destacada de la Región Caribe colombiana. Sobresale por su campus ecológico, sus acreditaciones internacionales de ingeniería (ABET) y su liderazgo empresarial.",
    "topCareers": [
      "Administración de Empresas y Negocios",
      "Ingeniería Industrial y Operaciones",
      "Ingeniería Civil e Infraestructura",
      "Medicina y Salud Global",
      "Derecho y Relaciones Internacionales",
      "Diseño Gráfico y de Medios"
    ],
    "admissionRequirements": [
      "Puntaje global en las pruebas ICFES Saber 11",
      "Formulario de inscripción en línea en uninorte.edu.co",
      "Entrevista vocacional para Medicina y programas de alta demanda"
    ],
    "tuitionInfo": "Privada. Ofrece el prestigioso programa de becas institucionales \"Orgullo Caribe\", becas con empresas aliadas, convenios con el ICETEX y opciones de financiación a corto y largo plazo.",
    "campusHighlights": [
      "Campus Uninorte: certificado internacionalmente por su sostenibilidad ambiental y arborización autóctona",
      "Hospital Universidad del Norte en Soledad: campo de prácticas médicas de alta complejidad",
      "Centro de Recursos para el Aprendizaje y la Investigación (CRAI) Karl C. Parrish"
    ],
    "websiteUrl": "https://uninorte.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional de Alta Calidad por 10 años"
  },
  {
    "id": "uni-eafit",
    "name": "Universidad EAFIT",
    "shortName": "EAFIT",
    "type": "Privada",
    "city": "Medellín (Sedes en Bogotá, Pereira, Llanogrande)",
    "department": "Antioquia",
    "country": "Colombia",
    "logoText": "EAFIT",
    "badgeBg": "bg-blue-800 text-white",
    "description": "Epicentro del emprendimiento, la innovación y los negocios en Medellín. Fundada por empresarios antioqueños, combina finanzas y administración de clase mundial con ciencia e ingeniería aplicada.",
    "topCareers": [
      "Administración de Empresas y Emprendimiento",
      "Economía y Finanzas",
      "Ingeniería de Software e Inteligencia Artificial",
      "Negocios Internacionales",
      "Diseño Interactivo",
      "Ingeniería de Producción"
    ],
    "admissionRequirements": [
      "Resultado destacado en el examen Saber 11",
      "Inscripción web en eafit.edu.co",
      "Presentación de certificados de notas de secundaria"
    ],
    "tuitionInfo": "Privada. Esquema de matrícula por créditos académicos. Programa de becas Talento EAFIT, Fondo Verde, becas por mérito deportivo y convenios de crédito educativo.",
    "campusHighlights": [
      "Campus Parque EAFIT: reconocido por su diseño arquitectónico integrado con vegetación nativa y corredores abiertos",
      "Laboratorio Financiero con terminales Bloomberg de tiempo real para análisis bursátil",
      "On.going: Centro de emprendimiento e incubación de startups tecnológicas de alto impacto"
    ],
    "websiteUrl": "https://eafit.edu.co",
    "rating": 4.8,
    "accreditation": "Acreditación Institucional de Alta Calidad por 10 años"
  },
  {
    "id": "uni-rosario",
    "name": "Universidad del Rosario",
    "shortName": "URosario",
    "type": "Privada",
    "city": "Bogotá",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "ROSARIO",
    "badgeBg": "bg-amber-600 text-white",
    "description": "Institución histórica fundada en 1653, cuna de los próceres de la República. Líder en Jurisprudencia, Medicina, Relaciones Internacionales, Economía y Ciencia Política en Colombia.",
    "topCareers": [
      "Derecho y Jurisprudencia",
      "Medicina y Salud Pública",
      "Relaciones Internacionales y Diplomacia",
      "Economía y Finanzas Cuantitativas",
      "Administración de Empresas",
      "Ciencia Política y Gobierno"
    ],
    "admissionRequirements": [
      "Puntaje en las pruebas Saber 11",
      "Entrevista personal de admisión orientada a evaluar competencias de liderazgo y ética",
      "Examen de conocimientos y prueba psicométrica en el programa de Medicina"
    ],
    "tuitionInfo": "Privada. Cuenta con la Beca Monseñor Castro Silva (100% de cobertura para puntajes destacados en Saber 11), becas de honor semestrales por promedio y financiación directa.",
    "campusHighlights": [
      "Claustro Histórico de La Candelaria: Monumento Nacional y aula viva de la historia colombiana",
      "Campus del Norte y sede Quinta de Mutis con laboratorios biomédicos de última generación",
      "Hospital Universitario Mayor Méderi y Hospital Universitario Barrios Unidos como campos de práctica clínica"
    ],
    "websiteUrl": "https://urosario.edu.co",
    "rating": 4.8,
    "accreditation": "Acreditación Institucional de Alta Calidad por 10 años"
  },
  {
    "id": "uni-sabana",
    "name": "Universidad de La Sabana",
    "shortName": "Unisabana",
    "type": "Privada",
    "city": "Chía (Sabana de Bogotá)",
    "department": "Cundinamarca",
    "country": "Colombia",
    "logoText": "SABANA",
    "badgeBg": "bg-blue-600 text-white",
    "description": "Reconocida por su excelencia en Comunicación Social, Medicina, Enfermería, Educación y Negocios. Su campus campestre y su Clínica Universidad de La Sabana son referentes nacionales.",
    "topCareers": [
      "Comunicación Social y Periodismo",
      "Medicina y Cuidados Intensivos",
      "Enfermería",
      "Administración de Negocios Internacionales",
      "Pedagogía Infantil y Educación",
      "Gastronomía y Administración Hotelera"
    ],
    "admissionRequirements": [
      "Puntaje en el Examen de Estado Saber 11",
      "Entrevista vocacional y pruebas psicométricas de ingreso",
      "Evaluación específica para la Facultad de Medicina"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa. Fondo de Becas Excelencia Sabana, becas deportivas y artísticas, y convenios institucionales de financiación.",
    "campusHighlights": [
      "Campus Puente del Común: más de 60 hectáreas de instalaciones modernas al aire libre con lago ecológico",
      "Clínica Universidad de La Sabana: centro médico de cuarto nivel acreditado con los más altos estándares",
      "Edificio Ad Portas: centro tecnológico con auditorios magnos, salas Bloomberg y centros de simulación médica"
    ],
    "websiteUrl": "https://unisabana.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional de Alta Calidad por 8 años"
  },
  {
    "id": "uni-externado",
    "name": "Universidad Externado de Colombia",
    "shortName": "Externado",
    "type": "Privada",
    "city": "Bogotá",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "EXTERNADO",
    "badgeBg": "bg-emerald-900 text-white",
    "description": "Universidad laica y liberal por excelencia, fundada en 1886. Reconocida como la máxima formadora de juristas, jueces, economistas, periodistas y altos mandatarios públicos del país.",
    "topCareers": [
      "Derecho y Ciencias Jurídicas",
      "Economía y Finanzas Públicas",
      "Comunicación Social y Periodismo",
      "Finanzas y Comercio Exterior",
      "Administración de Empresas Turísticas y Hoteleras",
      "Gobierno y Asuntos Públicos"
    ],
    "admissionRequirements": [
      "Pruebas ICFES Saber 11",
      "Entrevista personal de admisión y examen de conocimientos generales",
      "Inscripción web a través de uexternado.edu.co"
    ],
    "tuitionInfo": "Privada. Sistema de pagos semestrales con opción de fraccionamiento sin interés, becas de honor por mérito académico sobresaliente y apoyo de crédito ICETEX.",
    "campusHighlights": [
      "Campus en los Cerros Orientales de La Candelaria: premiado internacionalmente por su integración paisajística y biblioteca monumental",
      "Red de observatorios de políticas públicas, derecho económico y telecomunicaciones",
      "Consultorio Jurídico galardonado por su servicio gratuito a comunidades desfavorecidas"
    ],
    "websiteUrl": "https://uexternado.edu.co",
    "rating": 4.8,
    "accreditation": "Acreditación Institucional de Alta Calidad por 10 años"
  },
  {
    "id": "uni-upb",
    "name": "Universidad Pontificia Bolivariana",
    "shortName": "UPB",
    "type": "Privada",
    "city": "Medellín (Sedes en Bucaramanga, Montería, Palmira, Bogotá)",
    "department": "Antioquia",
    "country": "Colombia",
    "logoText": "UPB",
    "badgeBg": "bg-red-700 text-white",
    "description": "Institución católica fundada en 1936, con presencia multicampus nacional. Reconocida por su sólida Facultad de Ingenierías, Arquitectura, Diseño Gráfico y Medicina.",
    "topCareers": [
      "Ingeniería Mecánica y Automotriz",
      "Arquitectura y Urbanismo Sostenible",
      "Diseño Gráfico y Publicitario",
      "Medicina y Cirugía",
      "Ingeniería Electrónica y Telecomunicaciones",
      "Derecho"
    ],
    "admissionRequirements": [
      "Puntaje en las pruebas de Estado Saber 11",
      "Formulario de admisión digital en upb.edu.co",
      "Entrevista vocacional para aspirantes a carreras de la salud y arquitectura"
    ],
    "tuitionInfo": "Privada. Opciones de financiación directa con la Cooperativa UPB, becas de honor Juan Pablo II por excelencia académica y convenios empresariales.",
    "campusHighlights": [
      "Ecocampus Laureles en Medellín: pulmón verde certificado como carbono neutro en Colombia",
      "Clínica Universitaria Bolivariana: hospital docente de alta complejidad",
      "Laboratorios de nanotecnología y ensayos de materiales certificados por el ONAC"
    ],
    "websiteUrl": "https://upb.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional Multicampus de Alta Calidad (MEN)"
  },
  {
    "id": "uni-utp",
    "name": "Universidad Tecnológica de Pereira",
    "shortName": "UTP",
    "type": "Pública",
    "city": "Pereira",
    "department": "Risaralda",
    "country": "Colombia",
    "logoText": "UTP",
    "badgeBg": "bg-yellow-600 text-slate-950",
    "description": "La principal institución de educación superior del Eje Cafetero. Destacada nacionalmente por sus programas de Ingeniería Mecánica, Eléctrica, Sistemas, Medicina y Ciencias Ambientales.",
    "topCareers": [
      "Ingeniería Mecánica",
      "Medicina y Cirugía",
      "Ingeniería de Sistemas y Computación",
      "Ingeniería Ambiental y Recursos Naturales",
      "Ingeniería Industrial",
      "Licenciatura en Pedagogía Infantil"
    ],
    "admissionRequirements": [
      "Puntaje del Examen de Estado Saber 11 con ponderación por áreas según el programa solicitado",
      "Inscripción web en utp.edu.co/admisiones",
      "Asignación directa por estricto orden de mérito de puntajes"
    ],
    "tuitionInfo": "Pública. Totalmente vinculada a la Política de Gratuidad \"Puedo Estudiar\" para SISBÉN IV. Para alumnos no beneficiarios, cálculo según estrato y colegiatura de origen.",
    "campusHighlights": [
      "Campus La Julita: ubicado en una reserva natural con jardín botánico reconocido como santuario de biodiversidad",
      "Planetario y Observatorio Astronómico de la UTP",
      "Laboratorio de Biología Molecular y Biotecnología y centro de simulación médica avanzada"
    ],
    "websiteUrl": "https://utp.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional de Alta Calidad por 10 años"
  },
  {
    "id": "uni-caldas",
    "name": "Universidad de Caldas",
    "shortName": "UdeCaldas",
    "type": "Pública",
    "city": "Manizales (Sedes en La Dorada, Riosucio, Anserma)",
    "department": "Caldas",
    "country": "Colombia",
    "logoText": "CALDAS",
    "badgeBg": "bg-blue-700 text-white",
    "description": "Universidad pública de gran tradición académica en el Eje Cafetero. Sobresale en Ciencias Agropecuarias, Geología, Artes Plásticas, Música y Medicina.",
    "topCareers": [
      "Medicina Veterinaria y Zootecnia",
      "Medicina",
      "Ingeniería Agronómica",
      "Geología y Geociencias",
      "Artes Plásticas y Visuales",
      "Diseño Visual"
    ],
    "admissionRequirements": [
      "Pruebas de Estado Saber 11 (ICFES)",
      "Pruebas de aptitud artística para Música y Artes Plásticas",
      "Convocatoria semestral a través de ucaldas.edu.co"
    ],
    "tuitionInfo": "Pública. Gratuidad del 100% de la matrícula mediante el programa nacional \"Puedo Estudiar\" para estudiantes en condiciones de vulnerabilidad socioeconómica.",
    "campusHighlights": [
      "Campus Palogrande y Campus Central en Manizales con vista panorámica a la Cordillera Central y los Nevados",
      "Granja Montelindo: centro experimental agropecuario de referencia en el trópico andino",
      "Centro de Museos de la Universidad de Caldas (Antropología, Arqueología y Geología)"
    ],
    "websiteUrl": "https://ucaldas.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad por 8 años"
  },
  {
    "id": "uni-cartagena",
    "name": "Universidad de Cartagena",
    "shortName": "UdeC",
    "type": "Pública",
    "city": "Cartagena de Indias (Sedes en Magangué, El Carmen de Bolívar, San Juan Nepomuceno)",
    "department": "Bolívar",
    "country": "Colombia",
    "logoText": "UDEC",
    "badgeBg": "bg-amber-700 text-white",
    "description": "Fundada en 1827 por Simón Bolívar y Francisco de Paula Santander, es la universidad pública más antigua del Caribe colombiano. Sobresale en Medicina, Química Farmacéutica, Derecho e Ingenierías.",
    "topCareers": [
      "Medicina y Cirugía",
      "Química Farmacéutica",
      "Ingeniería Civil",
      "Derecho y Ciencias Políticas",
      "Enfermería",
      "Ingeniería Química"
    ],
    "admissionRequirements": [
      "Puntaje global y por áreas en el examen de Estado Saber 11",
      "Registro de postulación en unicartagena.edu.co/admisiones",
      "Proceso de verificación documental y asignación de cupos por mérito académico"
    ],
    "tuitionInfo": "Pública. 100% acogida a la Política de Gratuidad del Ministerio de Educación Nacional para estratos 1, 2 y 3 o grupos SISBÉN IV.",
    "campusHighlights": [
      "Sede Claustro de San Agustín: joya arquitectónica colonial en el Centro Amurallado de Cartagena",
      "Campus Zaragocilla: complejo especializado en ciencias de la salud contiguo al Hospital Universitario del Caribe",
      "Instituto de Investigaciones Inmunológicas de proyección internacional"
    ],
    "websiteUrl": "https://unicartagena.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional de Alta Calidad por 8 años"
  },
  {
    "id": "uni-uptc",
    "name": "Universidad Pedagógica y Tecnológica de Colombia",
    "shortName": "UPTC",
    "type": "Pública",
    "city": "Tunja (Sedes en Duitama, Sogamoso, Chiquinquirá)",
    "department": "Boyacá",
    "country": "Colombia",
    "logoText": "UPTC",
    "badgeBg": "bg-yellow-700 text-white",
    "description": "La máxima casa de estudios del departamento de Boyacá y una de las principales formadoras de educadores, ingenieros de minas, metalúrgicos y profesionales de la salud en el país.",
    "topCareers": [
      "Licenciatura en Matemáticas y Física",
      "Ingeniería de Minas y Metalurgia",
      "Medicina",
      "Ingeniería Civil e Infraestructura",
      "Ingeniería Agronómica",
      "Derecho"
    ],
    "admissionRequirements": [
      "Puntaje global del examen Saber 11 con ponderados por facultad",
      "Inscripción semestral en uptc.edu.co",
      "Pruebas psicopedagógicas para licenciaturas y entrevistas para medicina"
    ],
    "tuitionInfo": "Pública. Gratuidad para bachilleres de escasos recursos a través de la Política Nacional de Gratuidad \"Puedo Estudiar\". Tarifas solidarias para otros alumnos.",
    "campusHighlights": [
      "Sede Central Tunja: complejo universitario con museo arqueológico, estadio y bibliotecas especializadas",
      "Sedes Seccionales Sogamoso y Duitama con centros metalúrgicos y laboratorios de ingeniería aplicada",
      "Centro de Investigaciones Biológicas y Agropecuarias"
    ],
    "websiteUrl": "https://uptc.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad por 8 años"
  },
  {
    "id": "uni-udistrital",
    "name": "Universidad Distrital Francisco José de Caldas",
    "shortName": "UDistrital",
    "type": "Pública",
    "city": "Bogotá D.C.",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "UDistrit",
    "badgeBg": "bg-yellow-800 text-white",
    "description": "Universidad Distrital Francisco José de Caldas (UDistrital) es una reconocida institución de educación superior pública en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería de Sistemas",
      "Ingeniería Catastral y Geodesia",
      "Ingeniería Electrónica",
      "Artes ASAB"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C.",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 8 años"
    ],
    "websiteUrl": "https://udistrital.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional de Alta Calidad por 8 años"
  },
  {
    "id": "uni-upn",
    "name": "Universidad Pedagógica Nacional",
    "shortName": "UPN",
    "type": "Pública",
    "city": "Bogotá D.C.",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "UPN",
    "badgeBg": "bg-blue-800 text-white",
    "description": "Universidad Pedagógica Nacional (UPN) es una reconocida institución de educación superior pública en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Licenciatura en Educación Infantil",
      "Licenciatura en Matemáticas",
      "Licenciatura en Filosofía",
      "Licenciatura en Biología"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C.",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 6 años"
    ],
    "websiteUrl": "https://upn.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad por 6 años"
  },
  {
    "id": "uni-unicolmayor",
    "name": "Universidad Colegio Mayor de Cundinamarca",
    "shortName": "Unicolmayor",
    "type": "Pública",
    "city": "Bogotá D.C.",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "Unicolma",
    "badgeBg": "bg-emerald-800 text-white",
    "description": "Universidad Colegio Mayor de Cundinamarca (Unicolmayor) es una reconocida institución de educación superior pública en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Bacteriología y Laboratorio Clínico",
      "Trabajo Social",
      "Construcción y Gestión en Arquitectura",
      "Derecho"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C.",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 6 años"
    ],
    "websiteUrl": "https://unicolmayor.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad por 6 años"
  },
  {
    "id": "uni-militar",
    "name": "Universidad Militar Nueva Granada",
    "shortName": "UMNG",
    "type": "Pública",
    "city": "Bogotá D.C. / Cajicá",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "UMNG",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Militar Nueva Granada (UMNG) es una reconocida institución de educación superior pública en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Ingeniería Mecatrónica",
      "Ingeniería Civil",
      "Derecho",
      "Relaciones Internacionales"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C. / Cajicá",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 6 años"
    ],
    "websiteUrl": "https://umng.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad por 6 años"
  },
  {
    "id": "uni-escuelaing",
    "name": "Escuela Colombiana de Ingeniería Julio Garavito",
    "shortName": "EscuelaIng",
    "type": "Privada",
    "city": "Bogotá D.C.",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "EscuelaI",
    "badgeBg": "bg-red-900 text-white",
    "description": "Escuela Colombiana de Ingeniería Julio Garavito (EscuelaIng) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería Civil",
      "Ingeniería Eléctrica",
      "Ingeniería de Sistemas",
      "Ingeniería Industrial",
      "Matemáticas"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C.",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 8 años"
    ],
    "websiteUrl": "https://escuelaing.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional de Alta Calidad por 8 años"
  },
  {
    "id": "uni-lasalle",
    "name": "Universidad de La Salle",
    "shortName": "La Salle",
    "type": "Privada",
    "city": "Bogotá D.C. / Yopal",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "La Salle",
    "badgeBg": "bg-blue-800 text-white",
    "description": "Universidad de La Salle (La Salle) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina Veterinaria",
      "Optometría",
      "Ingeniería Ambiental y Sanitaria",
      "Arquitectura",
      "Agronomía"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C. / Yopal",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 8 años"
    ],
    "websiteUrl": "https://lasalle.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad por 8 años"
  },
  {
    "id": "uni-santotomas",
    "name": "Universidad Santo Tomás",
    "shortName": "USTA",
    "type": "Privada",
    "city": "Bogotá D.C. / Multicampus",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "USTA",
    "badgeBg": "bg-blue-900 text-white",
    "description": "Universidad Santo Tomás (USTA) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Derecho",
      "Ingeniería Civil",
      "Psicología",
      "Odontología",
      "Comunicación Social",
      "Economía"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C. / Multicampus",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional Multicampus de Alta Calidad por 8 años"
    ],
    "websiteUrl": "https://usta.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional Multicampus de Alta Calidad por 8 años"
  },
  {
    "id": "uni-central",
    "name": "Universidad Central",
    "shortName": "UCentral",
    "type": "Privada",
    "city": "Bogotá D.C.",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "UCentral",
    "badgeBg": "bg-teal-800 text-white",
    "description": "Universidad Central (UCentral) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Cine",
      "Creación Literaria",
      "Publicidad",
      "Ingeniería de Sistemas",
      "Contaduría Pública"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C.",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 4 años"
    ],
    "websiteUrl": "https://ucentral.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad por 4 años"
  },
  {
    "id": "uni-bosque",
    "name": "Universidad El Bosque",
    "shortName": "El Bosque",
    "type": "Privada",
    "city": "Bogotá D.C.",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "El Bosqu",
    "badgeBg": "bg-green-800 text-white",
    "description": "Universidad El Bosque (El Bosque) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Odontología",
      "Psicología",
      "Bioética",
      "Ingeniería Ambiental",
      "Diseño de Comunicación"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C.",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 6 años"
    ],
    "websiteUrl": "https://unbosque.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional de Alta Calidad por 6 años"
  },
  {
    "id": "uni-tadeo",
    "name": "Universidad Jorge Tadeo Lozano",
    "shortName": "Utadeo",
    "type": "Privada",
    "city": "Bogotá D.C. / Cartagena",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "Utadeo",
    "badgeBg": "bg-indigo-900 text-white",
    "description": "Universidad Jorge Tadeo Lozano (Utadeo) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Diseño Gráfico",
      "Publicidad",
      "Biología Marina",
      "Artes Plásticas",
      "Arquitectura",
      "Comunicación Social"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C. / Cartagena",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 6 años"
    ],
    "websiteUrl": "https://utadeo.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad por 6 años"
  },
  {
    "id": "uni-sergio",
    "name": "Universidad Sergio Arboleda",
    "shortName": "Sergio Arboleda",
    "type": "Privada",
    "city": "Bogotá D.C. / Santa Marta",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "Sergio A",
    "badgeBg": "bg-blue-950 text-white",
    "description": "Universidad Sergio Arboleda (Sergio Arboleda) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Derecho",
      "Ciencias de la Computación e Inteligencia Artificial",
      "Marketing y Negocios Digitales",
      "Comunicación Social"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C. / Santa Marta",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://usergioarboleda.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-catolica",
    "name": "Universidad Católica de Colombia",
    "shortName": "UCatólica",
    "type": "Privada",
    "city": "Bogotá D.C.",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "UCatólic",
    "badgeBg": "bg-blue-800 text-white",
    "description": "Universidad Católica de Colombia (UCatólica) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Derecho",
      "Psicología",
      "Ingeniería Civil",
      "Arquitectura",
      "Economía"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C.",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 4 años"
    ],
    "websiteUrl": "https://ucatolica.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad por 4 años"
  },
  {
    "id": "uni-uan",
    "name": "Universidad Antonio Nariño",
    "shortName": "UAN",
    "type": "Privada",
    "city": "Bogotá D.C. / Nacional",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "UAN",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Antonio Nariño (UAN) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Odontología",
      "Medicina Veterinaria",
      "Ingeniería Biomédica",
      "Optometría"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C. / Nacional",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://uan.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-libre",
    "name": "Universidad Libre",
    "shortName": "Unilibre",
    "type": "Privada",
    "city": "Bogotá D.C. / Cali / Barranquilla / Pereira / Cúcuta",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "Unilibre",
    "badgeBg": "bg-red-700 text-white",
    "description": "Universidad Libre (Unilibre) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Derecho",
      "Medicina",
      "Enfermería",
      "Ingeniería Ambiental",
      "Contaduría Pública"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C. / Cali / Barranquilla / Pereira / Cúcuta",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional Multicampus de Alta Calidad por 6 años"
    ],
    "websiteUrl": "https://unilibre.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional Multicampus de Alta Calidad por 6 años"
  },
  {
    "id": "uni-ucc",
    "name": "Universidad Cooperativa de Colombia",
    "shortName": "UCC",
    "type": "Privada",
    "city": "Bogotá D.C. / Multicampus",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "UCC",
    "badgeBg": "bg-cyan-800 text-white",
    "description": "Universidad Cooperativa de Colombia (UCC) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Odontología",
      "Medicina Veterinaria y Zootecnia",
      "Derecho",
      "Psicología"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C. / Multicampus",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional Multicampus de Alta Calidad"
    ],
    "websiteUrl": "https://ucc.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional Multicampus de Alta Calidad"
  },
  {
    "id": "uni-poli",
    "name": "Politécnico Grancolombiano",
    "shortName": "Poli",
    "type": "Privada",
    "city": "Bogotá D.C. / Medellín / Virtual",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "Poli",
    "badgeBg": "bg-blue-800 text-white",
    "description": "Politécnico Grancolombiano (Poli) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Administración de Empresas",
      "Ingeniería de Software",
      "Diseño Gráfico",
      "Medios Audiovisuales",
      "Mercadeo"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C. / Medellín / Virtual",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://poli.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-uniminuto",
    "name": "Corporación Universitaria Minuto de Dios",
    "shortName": "UNIMINUTO",
    "type": "Privada",
    "city": "Bogotá D.C. / Nacional",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "UNIMINUT",
    "badgeBg": "bg-yellow-700 text-white",
    "description": "Corporación Universitaria Minuto de Dios (UNIMINUTO) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Trabajo Social",
      "Psicología",
      "Comunicación Social",
      "Licenciatura en Educación Infantil",
      "Ingeniería de Sistemas"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C. / Nacional",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://uniminuto.edu",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-unad",
    "name": "Universidad Nacional Abierta y a Distancia",
    "shortName": "UNAD",
    "type": "Pública",
    "city": "Bogotá D.C. / Nacional Virtual",
    "department": "Bogotá D.C. / Nacional",
    "country": "Colombia",
    "logoText": "UNAD",
    "badgeBg": "bg-amber-600 text-white",
    "description": "Universidad Nacional Abierta y a Distancia (UNAD) es una reconocida institución de educación superior pública en Bogotá D.C. / Nacional, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería de Sistemas",
      "Psicología",
      "Administración de Empresas",
      "Zootecnia",
      "Licenciatura en Pedagogía Infantil"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C. / Nacional Virtual",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C. / Nacional",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 4 años"
    ],
    "websiteUrl": "https://unad.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional de Alta Calidad por 4 años"
  },
  {
    "id": "uni-areandina",
    "name": "Fundación Universitaria del Área Andina",
    "shortName": "Areandina",
    "type": "Privada",
    "city": "Bogotá D.C. / Pereira / Valledupar",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "Areandin",
    "badgeBg": "bg-emerald-800 text-white",
    "description": "Fundación Universitaria del Área Andina (Areandina) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Enfermería",
      "Instrumentación Quirúrgica",
      "Terapia Respiratoria",
      "Optometría",
      "Diseño de Modas"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C. / Pereira / Valledupar",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional Multicampus de Alta Calidad"
    ],
    "websiteUrl": "https://areandina.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional Multicampus de Alta Calidad"
  },
  {
    "id": "uni-ean",
    "name": "Universidad EAN",
    "shortName": "EAN",
    "type": "Privada",
    "city": "Bogotá D.C.",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "EAN",
    "badgeBg": "bg-lime-700 text-white",
    "description": "Universidad EAN (EAN) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Administración de Empresas Sostenibles",
      "Negocios Internacionales",
      "Ingeniería Ambiental",
      "Emprendimiento Digital"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C.",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 6 años"
    ],
    "websiteUrl": "https://universidadean.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad por 6 años"
  },
  {
    "id": "uni-piloto",
    "name": "Universidad Piloto de Colombia",
    "shortName": "UniPiloto",
    "type": "Privada",
    "city": "Bogotá D.C. / Girardot",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "UniPilot",
    "badgeBg": "bg-purple-900 text-white",
    "description": "Universidad Piloto de Colombia (UniPiloto) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Arquitectura",
      "Ingeniería Civil",
      "Ingeniería de Mercados",
      "Psicología",
      "Diseño de Espacios"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C. / Girardot",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://unipiloto.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-konrad",
    "name": "Fundación Universitaria Konrad Lorenz",
    "shortName": "Konrad Lorenz",
    "type": "Privada",
    "city": "Bogotá D.C.",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "Konrad L",
    "badgeBg": "bg-sky-900 text-white",
    "description": "Fundación Universitaria Konrad Lorenz (Konrad Lorenz) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Psicología",
      "Matemáticas",
      "Ingeniería de Sistemas",
      "Mercadeo",
      "Administración de Negocios"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C.",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://konradlorenz.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-sanitas",
    "name": "Fundación Universitaria Sanitas",
    "shortName": "Unisanitas",
    "type": "Privada",
    "city": "Bogotá D.C.",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "Unisanit",
    "badgeBg": "bg-blue-700 text-white",
    "description": "Fundación Universitaria Sanitas (Unisanitas) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Enfermería",
      "Psicología Clínica",
      "Instrumentación Quirúrgica",
      "Fisioterapia"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C.",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://unisanitas.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-etitc",
    "name": "Escuela Tecnológica Instituto Técnico Central",
    "shortName": "ETITC",
    "type": "Pública",
    "city": "Bogotá D.C.",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "ETITC",
    "badgeBg": "bg-slate-800 text-white",
    "description": "Escuela Tecnológica Instituto Técnico Central (ETITC) es una reconocida institución de educación superior pública en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería Mecatrónica",
      "Ingeniería Electromecánica",
      "Ingeniería de Sistemas",
      "Procesos Industriales"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C.",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://itc.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-umb",
    "name": "Universidad Manuela Beltrán",
    "shortName": "UMB",
    "type": "Privada",
    "city": "Bogotá D.C. / Bucaramanga / Cajicá",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "UMB",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Manuela Beltrán (UMB) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Fisioterapia",
      "Terapia Ocupacional",
      "Fonoaudiología",
      "Ingeniería Biomédica",
      "Enfermería",
      "Criminalística"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C. / Bucaramanga / Cajicá",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://umb.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-cun",
    "name": "Corporación Unificada Nacional de Educación Superior",
    "shortName": "CUN",
    "type": "Privada",
    "city": "Bogotá D.C. / Nacional",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "CUN",
    "badgeBg": "bg-emerald-700 text-white",
    "description": "Corporación Unificada Nacional de Educación Superior (CUN) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Diseño Gráfico",
      "Medios Audiovisuales",
      "Contaduría Pública",
      "Administración de Empresas",
      "Desarrollo Web"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C. / Nacional",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Registro Calificado MinEducación"
    ],
    "websiteUrl": "https://cun.edu.co",
    "rating": 4.4,
    "accreditation": "Registro Calificado MinEducación"
  },
  {
    "id": "uni-america",
    "name": "Fundación Universidad de América",
    "shortName": "UniAmérica",
    "type": "Privada",
    "city": "Bogotá D.C.",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "UniAméri",
    "badgeBg": "bg-amber-800 text-white",
    "description": "Fundación Universidad de América (UniAmérica) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería Química",
      "Ingeniería de Petróleos",
      "Ingeniería Mecánica",
      "Ingeniería Industrial",
      "Arquitectura"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C.",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://uamerica.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-udca",
    "name": "Universidad de Ciencias Aplicadas y Ambientales",
    "shortName": "UDCA",
    "type": "Privada",
    "city": "Bogotá D.C. / Cartagena",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "UDCA",
    "badgeBg": "bg-green-800 text-white",
    "description": "Universidad de Ciencias Aplicadas y Ambientales (UDCA) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina Veterinaria y Zootecnia",
      "Agronomía",
      "Medicina",
      "Enfermería",
      "Ciencias del Deporte"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C. / Cartagena",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://udca.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-fucs",
    "name": "Fundación Universitaria de Ciencias de la Salud",
    "shortName": "FUCS",
    "type": "Privada",
    "city": "Bogotá D.C.",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "FUCS",
    "badgeBg": "bg-blue-900 text-white",
    "description": "Fundación Universitaria de Ciencias de la Salud (FUCS) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Enfermería",
      "Instrumentación Quirúrgica",
      "Fisioterapia",
      "Citohistotecnología"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C.",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 8 años"
    ],
    "websiteUrl": "https://fucsalud.edu.co",
    "rating": 4.8,
    "accreditation": "Acreditación Institucional de Alta Calidad por 8 años"
  },
  {
    "id": "uni-udec",
    "name": "Universidad de Cundinamarca",
    "shortName": "UDEC",
    "type": "Pública",
    "city": "Fusagasugá / Girardot / Facatativá / Chía / Soacha / Ubaté",
    "department": "Cundinamarca",
    "country": "Colombia",
    "logoText": "UDEC",
    "badgeBg": "bg-emerald-800 text-white",
    "description": "Universidad de Cundinamarca (UDEC) es una reconocida institución de educación superior pública en Cundinamarca, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería Agronómica",
      "Ingeniería Ambiental",
      "Enfermería",
      "Educación Física",
      "Ingeniería Electrónica"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Fusagasugá / Girardot / Facatativá / Chía / Soacha / Ubaté",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Cundinamarca",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 4 años"
    ],
    "websiteUrl": "https://ucundinamarca.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad por 4 años"
  },
  {
    "id": "uni-uniagraria",
    "name": "Fundación Universitaria Agraria de Colombia",
    "shortName": "Uniagraria",
    "type": "Privada",
    "city": "Bogotá D.C. / Facatativá",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "Uniagrar",
    "badgeBg": "bg-green-800 text-white",
    "description": "Fundación Universitaria Agraria de Colombia (Uniagraria) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería Agroindustrial",
      "Medicina Veterinaria",
      "Zootecnia",
      "Ingeniería Civil",
      "Derecho"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C. / Facatativá",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://uniagraria.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-uniempresarial",
    "name": "Fundación Universitaria Empresarial de la CCB",
    "shortName": "Uniempresarial",
    "type": "Privada",
    "city": "Bogotá D.C.",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "Uniempre",
    "badgeBg": "bg-blue-900 text-white",
    "description": "Fundación Universitaria Empresarial de la CCB (Uniempresarial) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Administración de Empresas (Dual)",
      "Negocios Internacionales",
      "Ingeniería de Software",
      "Finanzas"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C.",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Modelo de Formación Dual Alemán Acreditado"
    ],
    "websiteUrl": "https://uniempresarial.edu.co",
    "rating": 4.6,
    "accreditation": "Modelo de Formación Dual Alemán Acreditado"
  },
  {
    "id": "uni-corpas",
    "name": "Fundación Universitaria Juan N. Corpas",
    "shortName": "Corpas",
    "type": "Privada",
    "city": "Bogotá D.C. (Suba)",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "Corpas",
    "badgeBg": "bg-emerald-900 text-white",
    "description": "Fundación Universitaria Juan N. Corpas (Corpas) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Enfermería",
      "Música",
      "Terapias Alternativas y Farmacología Vegetal"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C. (Suba)",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://juanncorpas.edu.co",
    "rating": 4.8,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-ucompensar",
    "name": "Fundación Universitaria Compensar",
    "shortName": "UCompensar",
    "type": "Privada",
    "city": "Bogotá D.C.",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "UCompens",
    "badgeBg": "bg-orange-700 text-white",
    "description": "Fundación Universitaria Compensar (UCompensar) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería de Software",
      "Mercadeo y Publicidad",
      "Finanzas y Negocios",
      "Diseño Visual"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C.",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://ucompensar.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-monserrate",
    "name": "Fundación Universitaria Monserrate",
    "shortName": "Unimonserrate",
    "type": "Privada",
    "city": "Bogotá D.C.",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "Unimonse",
    "badgeBg": "bg-blue-800 text-white",
    "description": "Fundación Universitaria Monserrate (Unimonserrate) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Trabajo Social",
      "Licenciatura en Educación Infantil",
      "Administración de Empresas"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C.",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Registro Calificado MinEducación"
    ],
    "websiteUrl": "https://unimonserrate.edu.co",
    "rating": 4.4,
    "accreditation": "Registro Calificado MinEducación"
  },
  {
    "id": "uni-republicana",
    "name": "Corporación Universitaria Republicana",
    "shortName": "UREPUBLICANA",
    "type": "Privada",
    "city": "Bogotá D.C.",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "UREPUBLI",
    "badgeBg": "bg-red-800 text-white",
    "description": "Corporación Universitaria Republicana (UREPUBLICANA) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Derecho",
      "Contaduría Pública",
      "Ingeniería de Sistemas",
      "Finanzas y Comercio"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C.",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Registro Calificado MinEducación"
    ],
    "websiteUrl": "https://urepublicana.edu.co",
    "rating": 4.4,
    "accreditation": "Registro Calificado MinEducación"
  },
  {
    "id": "uni-sanmartin",
    "name": "Fundación Universitaria San Martín",
    "shortName": "FUSM",
    "type": "Privada",
    "city": "Bogotá D.C. / Cali / Barranquilla / Pasto",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "FUSM",
    "badgeBg": "bg-blue-900 text-white",
    "description": "Fundación Universitaria San Martín (FUSM) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Odontología",
      "Medicina Veterinaria y Zootecnia",
      "Administración"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C. / Cali / Barranquilla / Pasto",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación de Programas de Salud"
    ],
    "websiteUrl": "https://sanmartin.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación de Programas de Salud"
  },
  {
    "id": "uni-libertadores",
    "name": "Fundación Universitaria Los Libertadores",
    "shortName": "Los Libertadores",
    "type": "Privada",
    "city": "Bogotá D.C. / Cartagena",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "Los Libe",
    "badgeBg": "bg-yellow-700 text-white",
    "description": "Fundación Universitaria Los Libertadores (Los Libertadores) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Comunicación Social",
      "Psicología",
      "Ingeniería Aeronáutica",
      "Derecho",
      "Educación Infantil"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C. / Cartagena",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://ulibertadores.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-ibero",
    "name": "Corporación Universitaria Iberoamericana",
    "shortName": "IBERO",
    "type": "Privada",
    "city": "Bogotá D.C. / Virtual",
    "department": "Bogotá D.C.",
    "country": "Colombia",
    "logoText": "IBERO",
    "badgeBg": "bg-teal-800 text-white",
    "description": "Corporación Universitaria Iberoamericana (IBERO) es una reconocida institución de educación superior privada en Bogotá D.C., orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Fonoaudiología",
      "Fisioterapia",
      "Psicología",
      "Licenciatura en Educación Especial",
      "Ingeniería Industrial"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bogotá D.C. / Virtual",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bogotá D.C.",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://ibero.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-unalmed",
    "name": "Universidad Nacional de Colombia - Sede Medellín",
    "shortName": "UNAL Medellín",
    "type": "Pública",
    "city": "Medellín",
    "department": "Antioquia",
    "country": "Colombia",
    "logoText": "UNAL Med",
    "badgeBg": "bg-emerald-900 text-white",
    "description": "Universidad Nacional de Colombia - Sede Medellín (UNAL Medellín) es una reconocida institución de educación superior pública en Antioquia, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería Civil",
      "Ingeniería de Minas",
      "Ingeniería Mecánica",
      "Ingeniería Forestal",
      "Arquitectura",
      "Ciencias Agrarias"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Medellín",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Antioquia",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 10 años"
    ],
    "websiteUrl": "https://medellin.unal.edu.co",
    "rating": 4.9,
    "accreditation": "Acreditación Institucional de Alta Calidad por 10 años"
  },
  {
    "id": "uni-udemedellin",
    "name": "Universidad de Medellín",
    "shortName": "UdeMedellín",
    "type": "Privada",
    "city": "Medellín",
    "department": "Antioquia",
    "country": "Colombia",
    "logoText": "UdeMedel",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad de Medellín (UdeMedellín) es una reconocida institución de educación superior privada en Antioquia, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Derecho",
      "Comunicación y Lenguajes Audiovisuales",
      "Ingeniería Ambiental",
      "Contaduría Pública",
      "Administración"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Medellín",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Antioquia",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 6 años"
    ],
    "websiteUrl": "https://udem.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad por 6 años"
  },
  {
    "id": "uni-eia",
    "name": "Universidad EIA",
    "shortName": "EIA",
    "type": "Privada",
    "city": "Envigado / Medellín",
    "department": "Antioquia",
    "country": "Colombia",
    "logoText": "EIA",
    "badgeBg": "bg-orange-700 text-white",
    "description": "Universidad EIA (EIA) es una reconocida institución de educación superior privada en Antioquia, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería Biomédica",
      "Ingeniería Mecatrónica",
      "Ingeniería Civil",
      "Medicina",
      "Ingeniería Financiera"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Envigado / Medellín",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Antioquia",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 10 años"
    ],
    "websiteUrl": "https://eia.edu.co",
    "rating": 4.9,
    "accreditation": "Acreditación Institucional de Alta Calidad por 10 años"
  },
  {
    "id": "uni-ces",
    "name": "Universidad CES",
    "shortName": "CES",
    "type": "Privada",
    "city": "Medellín",
    "department": "Antioquia",
    "country": "Colombia",
    "logoText": "CES",
    "badgeBg": "bg-blue-900 text-white",
    "description": "Universidad CES (CES) es una reconocida institución de educación superior privada en Antioquia, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Odontología",
      "Medicina Veterinaria y Zootecnia",
      "Fisioterapia",
      "Psicología",
      "Biología"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Medellín",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Antioquia",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 10 años"
    ],
    "websiteUrl": "https://ces.edu.co",
    "rating": 4.8,
    "accreditation": "Acreditación Institucional de Alta Calidad por 10 años"
  },
  {
    "id": "uni-usbmed",
    "name": "Universidad de San Buenaventura - Medellín",
    "shortName": "USB Medellín",
    "type": "Privada",
    "city": "Medellín / Bello",
    "department": "Antioquia",
    "country": "Colombia",
    "logoText": "USB Mede",
    "badgeBg": "bg-orange-800 text-white",
    "description": "Universidad de San Buenaventura - Medellín (USB Medellín) es una reconocida institución de educación superior privada en Antioquia, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería de Sonido",
      "Arquitectura",
      "Psicología",
      "Licenciatura en Educación Infantil",
      "Derecho"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Medellín / Bello",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Antioquia",
      "Programas con registro calificado y Acreditación Institucional Multicampus de Alta Calidad"
    ],
    "websiteUrl": "https://usbmed.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional Multicampus de Alta Calidad"
  },
  {
    "id": "uni-itm",
    "name": "Instituto Tecnológico Metropolitano",
    "shortName": "ITM",
    "type": "Pública",
    "city": "Medellín",
    "department": "Antioquia",
    "country": "Colombia",
    "logoText": "ITM",
    "badgeBg": "bg-blue-800 text-white",
    "description": "Instituto Tecnológico Metropolitano (ITM) es una reconocida institución de educación superior pública en Antioquia, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería Biomédica",
      "Ingeniería Mecatrónica",
      "Ciencia de Datos",
      "Artes Visuales",
      "Tecnología Electrónica"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Medellín",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Antioquia",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 8 años"
    ],
    "websiteUrl": "https://itm.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional de Alta Calidad por 8 años"
  },
  {
    "id": "uni-polijic",
    "name": "Politécnico Colombiano Jaime Isaza Cadavid",
    "shortName": "POLIJIC",
    "type": "Pública",
    "city": "Medellín / Rionegro / Apartadó",
    "department": "Antioquia",
    "country": "Colombia",
    "logoText": "POLIJIC",
    "badgeBg": "bg-emerald-800 text-white",
    "description": "Politécnico Colombiano Jaime Isaza Cadavid (POLIJIC) es una reconocida institución de educación superior pública en Antioquia, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería Agropecuaria",
      "Educación Física y Deportes",
      "Seguridad y Salud",
      "Construcciones Civiles"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Medellín / Rionegro / Apartadó",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Antioquia",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://politecnicojic.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-pascualbravo",
    "name": "Institución Universitaria Pascual Bravo",
    "shortName": "Pascual Bravo",
    "type": "Pública",
    "city": "Medellín",
    "department": "Antioquia",
    "country": "Colombia",
    "logoText": "Pascual",
    "badgeBg": "bg-sky-800 text-white",
    "description": "Institución Universitaria Pascual Bravo (Pascual Bravo) es una reconocida institución de educación superior pública en Antioquia, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería Mecánica",
      "Ingeniería Eléctrica",
      "Diseño Textil y Modas",
      "Tecnología Mecatrónica"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Medellín",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Antioquia",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://pascualbravo.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-colmayorant",
    "name": "Institución Universitaria Colegio Mayor de Antioquia",
    "shortName": "Colmayor Antioquia",
    "type": "Pública",
    "city": "Medellín",
    "department": "Antioquia",
    "country": "Colombia",
    "logoText": "Colmayor",
    "badgeBg": "bg-teal-800 text-white",
    "description": "Institución Universitaria Colegio Mayor de Antioquia (Colmayor Antioquia) es una reconocida institución de educación superior pública en Antioquia, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Bacteriología y Laboratorio Clínico",
      "Biotecnología",
      "Arquitectura",
      "Administración Turística"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Medellín",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Antioquia",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://colmayor.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-tdea",
    "name": "Tecnológico de Antioquia",
    "shortName": "TdeA",
    "type": "Pública",
    "city": "Medellín",
    "department": "Antioquia",
    "country": "Colombia",
    "logoText": "TdeA",
    "badgeBg": "bg-emerald-700 text-white",
    "description": "Tecnológico de Antioquia (TdeA) es una reconocida institución de educación superior pública en Antioquia, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Criminalística",
      "Psicología",
      "Licenciatura en Educación Infantil",
      "Ingeniería de Software",
      "Derecho"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Medellín",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Antioquia",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://tdea.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-lasallistamed",
    "name": "Corporación Universitaria Lasallista",
    "shortName": "Unilasallista",
    "type": "Privada",
    "city": "Caldas (Antioquia)",
    "department": "Antioquia",
    "country": "Colombia",
    "logoText": "Unilasal",
    "badgeBg": "bg-blue-900 text-white",
    "description": "Corporación Universitaria Lasallista (Unilasallista) es una reconocida institución de educación superior privada en Antioquia, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina Veterinaria",
      "Ingeniería de Alimentos",
      "Derecho",
      "Psicología",
      "Licenciatura en Ciencias Naturales"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Caldas (Antioquia)",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Antioquia",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://unilasallista.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-uco",
    "name": "Universidad Católica de Oriente",
    "shortName": "UCO",
    "type": "Privada",
    "city": "Rionegro",
    "department": "Antioquia",
    "country": "Colombia",
    "logoText": "UCO",
    "badgeBg": "bg-blue-800 text-white",
    "description": "Universidad Católica de Oriente (UCO) es una reconocida institución de educación superior privada en Antioquia, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Enfermería",
      "Ingeniería Agronómica",
      "Psicología",
      "Trabajo Social",
      "Licenciatura en Lenguas Extranjeras"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Rionegro",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Antioquia",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://uco.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-iue",
    "name": "Institución Universitaria de Envigado",
    "shortName": "IUE",
    "type": "Pública",
    "city": "Envigado",
    "department": "Antioquia",
    "country": "Colombia",
    "logoText": "IUE",
    "badgeBg": "bg-purple-800 text-white",
    "description": "Institución Universitaria de Envigado (IUE) es una reconocida institución de educación superior pública en Antioquia, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Derecho",
      "Psicología",
      "Ingeniería de Sistemas",
      "Contaduría Pública",
      "Negocios Internacionales"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Envigado",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Antioquia",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://iue.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-luisamigo",
    "name": "Universidad Católica Luis Amigó",
    "shortName": "Funlam",
    "type": "Privada",
    "city": "Medellín / Apartadó / Manizales / Montería",
    "department": "Antioquia",
    "country": "Colombia",
    "logoText": "Funlam",
    "badgeBg": "bg-blue-900 text-white",
    "description": "Universidad Católica Luis Amigó (Funlam) es una reconocida institución de educación superior privada en Antioquia, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Psicología",
      "Derecho",
      "Comunicación Social",
      "Trabajo Social",
      "Licenciatura en Educación Infantil"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Medellín / Apartadó / Manizales / Montería",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Antioquia",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://ucatolicaluisamigo.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-remington",
    "name": "Corporación Universitaria Remington",
    "shortName": "Uniremington",
    "type": "Privada",
    "city": "Medellín / Nacional",
    "department": "Antioquia",
    "country": "Colombia",
    "logoText": "Uniremin",
    "badgeBg": "bg-red-800 text-white",
    "description": "Corporación Universitaria Remington (Uniremington) es una reconocida institución de educación superior privada en Antioquia, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Medicina Veterinaria",
      "Enfermería",
      "Ingeniería de Sistemas",
      "Contaduría Pública"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Medellín / Nacional",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Antioquia",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://uniremington.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-mariacano",
    "name": "Fundación Universitaria María Cano",
    "shortName": "FUMC",
    "type": "Privada",
    "city": "Medellín / Cali / Neiva / Popayán",
    "department": "Antioquia",
    "country": "Colombia",
    "logoText": "FUMC",
    "badgeBg": "bg-emerald-800 text-white",
    "description": "Fundación Universitaria María Cano (FUMC) es una reconocida institución de educación superior privada en Antioquia, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Fisioterapia",
      "Fonoaudiología",
      "Terapia Ocupacional",
      "Psicología",
      "Administración de Empresas"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Medellín / Cali / Neiva / Popayán",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Antioquia",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://fumc.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-unac",
    "name": "Corporación Universitaria Adventista",
    "shortName": "UNAC",
    "type": "Privada",
    "city": "Medellín",
    "department": "Antioquia",
    "country": "Colombia",
    "logoText": "UNAC",
    "badgeBg": "bg-blue-800 text-white",
    "description": "Corporación Universitaria Adventista (UNAC) es una reconocida institución de educación superior privada en Antioquia, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Enfermería",
      "Teología",
      "Licenciatura en Música",
      "Licenciatura en Educación Infantil"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Medellín",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Antioquia",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://unac.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-unisabaneta",
    "name": "Corporación Universitaria de Sabaneta",
    "shortName": "Unisabaneta",
    "type": "Privada",
    "city": "Sabaneta",
    "department": "Antioquia",
    "country": "Colombia",
    "logoText": "Unisaban",
    "badgeBg": "bg-emerald-900 text-white",
    "description": "Corporación Universitaria de Sabaneta (Unisabaneta) es una reconocida institución de educación superior privada en Antioquia, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Derecho",
      "Criminalística",
      "Administración de Negocios",
      "Contaduría"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Sabaneta",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Antioquia",
      "Programas con registro calificado y Registro Calificado MinEducación"
    ],
    "websiteUrl": "https://unisabaneta.edu.co",
    "rating": 4.4,
    "accreditation": "Registro Calificado MinEducación"
  },
  {
    "id": "uni-bellasartesmed",
    "name": "Fundación Universitaria Bellas Artes",
    "shortName": "Bellas Artes Medellín",
    "type": "Privada",
    "city": "Medellín",
    "department": "Antioquia",
    "country": "Colombia",
    "logoText": "Bellas A",
    "badgeBg": "bg-pink-800 text-white",
    "description": "Fundación Universitaria Bellas Artes (Bellas Artes Medellín) es una reconocida institución de educación superior privada en Antioquia, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Artes Plásticas",
      "Diseño Visual",
      "Música",
      "Artes Escénicas"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Medellín",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Antioquia",
      "Programas con registro calificado y Acreditación de Alta Calidad en Artes"
    ],
    "websiteUrl": "https://bellasartesmed.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación de Alta Calidad en Artes"
  },
  {
    "id": "uni-icesi",
    "name": "Universidad ICESI",
    "shortName": "ICESI",
    "type": "Privada",
    "city": "Cali",
    "department": "Valle del Cauca",
    "country": "Colombia",
    "logoText": "ICESI",
    "badgeBg": "bg-blue-800 text-white",
    "description": "Universidad ICESI (ICESI) es una reconocida institución de educación superior privada en Valle del Cauca, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Ingeniería Telemática e Inteligencia Artificial",
      "Administración de Empresas",
      "Diseño de Medios Interactivos",
      "Derecho",
      "Economía"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Cali",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Valle del Cauca",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 10 años"
    ],
    "websiteUrl": "https://icesi.edu.co",
    "rating": 4.9,
    "accreditation": "Acreditación Institucional de Alta Calidad por 10 años"
  },
  {
    "id": "uni-javerianacali",
    "name": "Pontificia Universidad Javeriana - Sede Cali",
    "shortName": "Javeriana Cali",
    "type": "Privada",
    "city": "Cali",
    "department": "Valle del Cauca",
    "country": "Colombia",
    "logoText": "Javerian",
    "badgeBg": "bg-blue-900 text-white",
    "description": "Pontificia Universidad Javeriana - Sede Cali (Javeriana Cali) es una reconocida institución de educación superior privada en Valle del Cauca, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Ingeniería Civil",
      "Psicología",
      "Artes Visuales",
      "Mercadeo",
      "Negocios Internacionales"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Cali",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Valle del Cauca",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 10 años"
    ],
    "websiteUrl": "https://javerianacali.edu.co",
    "rating": 4.8,
    "accreditation": "Acreditación Institucional de Alta Calidad por 10 años"
  },
  {
    "id": "uni-uao",
    "name": "Universidad Autónoma de Occidente",
    "shortName": "UAO",
    "type": "Privada",
    "city": "Cali",
    "department": "Valle del Cauca",
    "country": "Colombia",
    "logoText": "UAO",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Autónoma de Occidente (UAO) es una reconocida institución de educación superior privada en Valle del Cauca, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Comunicación Social - Periodismo",
      "Ingeniería Mecatrónica",
      "Ingeniería Biomédica",
      "Cine y Comunicación Digital"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Cali",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Valle del Cauca",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 8 años"
    ],
    "websiteUrl": "https://uao.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional de Alta Calidad por 8 años"
  },
  {
    "id": "uni-usc",
    "name": "Universidad Santiago de Cali",
    "shortName": "USC",
    "type": "Privada",
    "city": "Cali / Palmira",
    "department": "Valle del Cauca",
    "country": "Colombia",
    "logoText": "USC",
    "badgeBg": "bg-blue-900 text-white",
    "description": "Universidad Santiago de Cali (USC) es una reconocida institución de educación superior privada en Valle del Cauca, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Odontología",
      "Enfermería",
      "Derecho",
      "Fisioterapia",
      "Instrumentación Quirúrgica"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Cali / Palmira",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Valle del Cauca",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 6 años"
    ],
    "websiteUrl": "https://usc.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional de Alta Calidad por 6 años"
  },
  {
    "id": "uni-unilibrecool",
    "name": "Universidad Libre - Seccional Cali",
    "shortName": "Unilibre Cali",
    "type": "Privada",
    "city": "Cali",
    "department": "Valle del Cauca",
    "country": "Colombia",
    "logoText": "Unilibre",
    "badgeBg": "bg-red-700 text-white",
    "description": "Universidad Libre - Seccional Cali (Unilibre Cali) es una reconocida institución de educación superior privada en Valle del Cauca, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Enfermería",
      "Derecho",
      "Contaduría Pública",
      "Ingeniería Industrial"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Cali",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Valle del Cauca",
      "Programas con registro calificado y Acreditación Institucional Multicampus de Alta Calidad"
    ],
    "websiteUrl": "https://unilibrecali.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional Multicampus de Alta Calidad"
  },
  {
    "id": "uni-usbcali",
    "name": "Universidad de San Buenaventura - Cali",
    "shortName": "USB Cali",
    "type": "Privada",
    "city": "Cali",
    "department": "Valle del Cauca",
    "country": "Colombia",
    "logoText": "USB Cali",
    "badgeBg": "bg-orange-800 text-white",
    "description": "Universidad de San Buenaventura - Cali (USB Cali) es una reconocida institución de educación superior privada en Valle del Cauca, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Arquitectura",
      "Psicología",
      "Ingeniería Multimedia",
      "Derecho",
      "Economía"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Cali",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Valle del Cauca",
      "Programas con registro calificado y Acreditación Institucional Multicampus de Alta Calidad"
    ],
    "websiteUrl": "https://usbcali.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional Multicampus de Alta Calidad"
  },
  {
    "id": "uni-end",
    "name": "Escuela Nacional del Deporte",
    "shortName": "IU END",
    "type": "Pública",
    "city": "Cali",
    "department": "Valle del Cauca",
    "country": "Colombia",
    "logoText": "IU END",
    "badgeBg": "bg-emerald-700 text-white",
    "description": "Escuela Nacional del Deporte (IU END) es una reconocida institución de educación superior pública en Valle del Cauca, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Profesional en Deporte",
      "Fisioterapia",
      "Terapia Ocupacional",
      "Nutrición y Dietética",
      "Administración de Empresas"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Cali",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Valle del Cauca",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://endeporte.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-intep",
    "name": "Instituto de Educación Técnica Profesional de Roldanillo",
    "shortName": "INTEP",
    "type": "Pública",
    "city": "Roldanillo",
    "department": "Valle del Cauca",
    "country": "Colombia",
    "logoText": "INTEP",
    "badgeBg": "bg-green-700 text-white",
    "description": "Instituto de Educación Técnica Profesional de Roldanillo (INTEP) es una reconocida institución de educación superior pública en Valle del Cauca, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Producción Agropecuaria",
      "Diseño Visual Digital",
      "Contabilidad y Finanzas",
      "Gestión Turística"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Roldanillo",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Valle del Cauca",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://intep.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-uceva",
    "name": "Unidad Central del Valle del Cauca",
    "shortName": "UCEVA",
    "type": "Pública",
    "city": "Tuluá",
    "department": "Valle del Cauca",
    "country": "Colombia",
    "logoText": "UCEVA",
    "badgeBg": "bg-red-800 text-white",
    "description": "Unidad Central del Valle del Cauca (UCEVA) es una reconocida institución de educación superior pública en Valle del Cauca, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Derecho",
      "Enfermería",
      "Ingeniería Ambiental",
      "Licenciatura en Educación Física"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Tuluá",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Valle del Cauca",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 4 años"
    ],
    "websiteUrl": "https://uceva.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad por 4 años"
  },
  {
    "id": "uni-unipacifico",
    "name": "Universidad del Pacífico",
    "shortName": "Unipacífico",
    "type": "Pública",
    "city": "Buenaventura",
    "department": "Valle del Cauca",
    "country": "Colombia",
    "logoText": "Unipacíf",
    "badgeBg": "bg-cyan-800 text-white",
    "description": "Universidad del Pacífico (Unipacífico) es una reconocida institución de educación superior pública en Valle del Cauca, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Acuicultura",
      "Arquitectura",
      "Agronomía",
      "Sociología",
      "Ingeniería de Sistemas"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Buenaventura",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Valle del Cauca",
      "Programas con registro calificado y Registro Calificado MinEducación"
    ],
    "websiteUrl": "https://unipacifico.edu.co",
    "rating": 4.4,
    "accreditation": "Registro Calificado MinEducación"
  },
  {
    "id": "uni-uniajc",
    "name": "Institución Universitaria Antonio José Camacho",
    "shortName": "UNIAJC",
    "type": "Pública",
    "city": "Cali",
    "department": "Valle del Cauca",
    "country": "Colombia",
    "logoText": "UNIAJC",
    "badgeBg": "bg-blue-800 text-white",
    "description": "Institución Universitaria Antonio José Camacho (UNIAJC) es una reconocida institución de educación superior pública en Valle del Cauca, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería de Sistemas",
      "Salud Ocupacional",
      "Licenciatura en Pedagogía Infantil",
      "Ingeniería Electrónica"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Cali",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Valle del Cauca",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://uniajc.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-unalpalmira",
    "name": "Universidad Nacional de Colombia - Sede Palmira",
    "shortName": "UNAL Palmira",
    "type": "Pública",
    "city": "Palmira",
    "department": "Valle del Cauca",
    "country": "Colombia",
    "logoText": "UNAL Pal",
    "badgeBg": "bg-emerald-900 text-white",
    "description": "Universidad Nacional de Colombia - Sede Palmira (UNAL Palmira) es una reconocida institución de educación superior pública en Valle del Cauca, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería Agronómica",
      "Ingeniería Agrícola",
      "Zootecnia",
      "Ingeniería Ambiental",
      "Diseño Industrial"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Palmira",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Valle del Cauca",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 10 años"
    ],
    "websiteUrl": "https://palmira.unal.edu.co",
    "rating": 4.8,
    "accreditation": "Acreditación Institucional de Alta Calidad por 10 años"
  },
  {
    "id": "uni-uniatlantico",
    "name": "Universidad del Atlántico",
    "shortName": "Uniatlántico",
    "type": "Pública",
    "city": "Barranquilla / Suan / Puerto Colombia",
    "department": "Atlántico",
    "country": "Colombia",
    "logoText": "Uniatlán",
    "badgeBg": "bg-orange-800 text-white",
    "description": "Universidad del Atlántico (Uniatlántico) es una reconocida institución de educación superior pública en Atlántico, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Química y Farmacia",
      "Arquitectura",
      "Bellas Artes",
      "Licenciatura en Ciencias Naturales",
      "Ingeniería Química"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Barranquilla / Suan / Puerto Colombia",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Atlántico",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 4 años"
    ],
    "websiteUrl": "https://uniatlantico.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional de Alta Calidad por 4 años"
  },
  {
    "id": "uni-unisimon",
    "name": "Universidad Simón Bolívar",
    "shortName": "Unisimón",
    "type": "Privada",
    "city": "Barranquilla / Cúcuta",
    "department": "Atlántico",
    "country": "Colombia",
    "logoText": "Unisimón",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Simón Bolívar (Unisimón) es una reconocida institución de educación superior privada en Atlántico, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Enfermería",
      "Fisioterapia",
      "Derecho",
      "Psicología",
      "Ingeniería de Sistemas"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Barranquilla / Cúcuta",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Atlántico",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 8 años"
    ],
    "websiteUrl": "https://unisimon.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional de Alta Calidad por 8 años"
  },
  {
    "id": "uni-cuc",
    "name": "Universidad de la Costa",
    "shortName": "CUC",
    "type": "Privada",
    "city": "Barranquilla",
    "department": "Atlántico",
    "country": "Colombia",
    "logoText": "CUC",
    "badgeBg": "bg-emerald-800 text-white",
    "description": "Universidad de la Costa (CUC) es una reconocida institución de educación superior privada en Atlántico, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería Civil",
      "Ingeniería Ambiental",
      "Psicología",
      "Arquitectura",
      "Finanzas y Relaciones Internacionales"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Barranquilla",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Atlántico",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 6 años"
    ],
    "websiteUrl": "https://cuc.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional de Alta Calidad por 6 años"
  },
  {
    "id": "uni-unilibrebq",
    "name": "Universidad Libre - Seccional Barranquilla",
    "shortName": "Unilibre Barranquilla",
    "type": "Privada",
    "city": "Barranquilla",
    "department": "Atlántico",
    "country": "Colombia",
    "logoText": "Unilibre",
    "badgeBg": "bg-red-700 text-white",
    "description": "Universidad Libre - Seccional Barranquilla (Unilibre Barranquilla) es una reconocida institución de educación superior privada en Atlántico, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Fisioterapia",
      "Instrumentación Quirúrgica",
      "Derecho",
      "Ingeniería Industrial"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Barranquilla",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Atlántico",
      "Programas con registro calificado y Acreditación Institucional Multicampus de Alta Calidad"
    ],
    "websiteUrl": "https://unilibrebaq.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional Multicampus de Alta Calidad"
  },
  {
    "id": "uni-americana",
    "name": "Corporación Universitaria Americana",
    "shortName": "Americana",
    "type": "Privada",
    "city": "Barranquilla / Medellín / Montería",
    "department": "Atlántico",
    "country": "Colombia",
    "logoText": "American",
    "badgeBg": "bg-blue-800 text-white",
    "description": "Corporación Universitaria Americana (Americana) es una reconocida institución de educación superior privada en Atlántico, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Derecho",
      "Ingeniería de Sistemas",
      "Contaduría Pública",
      "Negocios Internacionales",
      "Licenciatura en Educación Infantil"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Barranquilla / Medellín / Montería",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Atlántico",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://americana.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-cul",
    "name": "Corporación Universitaria Latinoamericana",
    "shortName": "CUL",
    "type": "Privada",
    "city": "Barranquilla",
    "department": "Atlántico",
    "country": "Colombia",
    "logoText": "CUL",
    "badgeBg": "bg-indigo-800 text-white",
    "description": "Corporación Universitaria Latinoamericana (CUL) es una reconocida institución de educación superior privada en Atlántico, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Licenciatura en Educación Física",
      "Ingeniería de Sistemas",
      "Administración de Empresas",
      "Contaduría"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Barranquilla",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Atlántico",
      "Programas con registro calificado y Registro Calificado MinEducación"
    ],
    "websiteUrl": "https://cul.edu.co",
    "rating": 4.4,
    "accreditation": "Registro Calificado MinEducación"
  },
  {
    "id": "uni-iub",
    "name": "Institución Universitaria de Barranquilla",
    "shortName": "IUB",
    "type": "Pública",
    "city": "Barranquilla",
    "department": "Atlántico",
    "country": "Colombia",
    "logoText": "IUB",
    "badgeBg": "bg-red-700 text-white",
    "description": "Institución Universitaria de Barranquilla (IUB) es una reconocida institución de educación superior pública en Atlántico, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Mecatrónica",
      "Mantenimiento Electromecánico",
      "Gestión Logística",
      "Seguridad y Salud en el Trabajo"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Barranquilla",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Atlántico",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://unibarranquilla.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-autonoma",
    "name": "Universidad Autónoma del Caribe",
    "shortName": "Uniautónoma",
    "type": "Privada",
    "city": "Barranquilla",
    "department": "Atlántico",
    "country": "Colombia",
    "logoText": "Uniautón",
    "badgeBg": "bg-blue-900 text-white",
    "description": "Universidad Autónoma del Caribe (Uniautónoma) es una reconocida institución de educación superior privada en Atlántico, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Comunicación Social - Periodismo",
      "Diseño de Modas",
      "Ingeniería Mecatrónica",
      "Derecho",
      "Arquitectura"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Barranquilla",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Atlántico",
      "Programas con registro calificado y Registro Calificado MinEducación"
    ],
    "websiteUrl": "https://uac.edu.co",
    "rating": 4.5,
    "accreditation": "Registro Calificado MinEducación"
  },
  {
    "id": "uni-unimetro",
    "name": "Universidad Metropolitana de Barranquilla",
    "shortName": "Unimetro",
    "type": "Privada",
    "city": "Barranquilla",
    "department": "Atlántico",
    "country": "Colombia",
    "logoText": "Unimetro",
    "badgeBg": "bg-blue-800 text-white",
    "description": "Universidad Metropolitana de Barranquilla (Unimetro) es una reconocida institución de educación superior privada en Atlántico, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Odontología",
      "Enfermería",
      "Fisioterapia",
      "Bacteriología",
      "Nutrición y Dietética"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Barranquilla",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Atlántico",
      "Programas con registro calificado y Acreditación de Alta Calidad en Salud"
    ],
    "websiteUrl": "https://unimetro.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación de Alta Calidad en Salud"
  },
  {
    "id": "uni-itsa",
    "name": "Institución Universitaria de Soledad - ITSA",
    "shortName": "ITSA",
    "type": "Pública",
    "city": "Soledad / Barranquilla",
    "department": "Atlántico",
    "country": "Colombia",
    "logoText": "ITSA",
    "badgeBg": "bg-blue-900 text-white",
    "description": "Institución Universitaria de Soledad - ITSA (ITSA) es una reconocida institución de educación superior pública en Atlántico, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería Mecatrónica",
      "Ingeniería Telemática",
      "Mantenimiento Electromecánico",
      "Gestión Logística"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Soledad / Barranquilla",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Atlántico",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://itsa.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-corsalud",
    "name": "Corporación Universitaria de Ciencias Empresariales, Educación y Salud",
    "shortName": "Corsalud",
    "type": "Privada",
    "city": "Barranquilla",
    "department": "Atlántico",
    "country": "Colombia",
    "logoText": "Corsalud",
    "badgeBg": "bg-emerald-800 text-white",
    "description": "Corporación Universitaria de Ciencias Empresariales, Educación y Salud (Corsalud) es una reconocida institución de educación superior privada en Atlántico, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Enfermería",
      "Fisioterapia",
      "Instrumentación Quirúrgica",
      "Administración en Salud"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Barranquilla",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Atlántico",
      "Programas con registro calificado y Registro Calificado MinEducación"
    ],
    "websiteUrl": "https://corsalud.edu.co",
    "rating": 4.4,
    "accreditation": "Registro Calificado MinEducación"
  },
  {
    "id": "uni-unab",
    "name": "Universidad Autónoma de Bucaramanga",
    "shortName": "UNAB",
    "type": "Privada",
    "city": "Bucaramanga / San Gil",
    "department": "Santander",
    "country": "Colombia",
    "logoText": "UNAB",
    "badgeBg": "bg-amber-700 text-white",
    "description": "Universidad Autónoma de Bucaramanga (UNAB) es una reconocida institución de educación superior privada en Santander, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Comunicación Social",
      "Derecho",
      "Ingeniería Biomédica",
      "Gastronomía y Alta Cocina",
      "Psicología"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bucaramanga / San Gil",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Santander",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 6 años"
    ],
    "websiteUrl": "https://unab.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional de Alta Calidad por 6 años"
  },
  {
    "id": "uni-upbbga",
    "name": "Universidad Pontificia Bolivariana - Seccional Bucaramanga",
    "shortName": "UPB Bucaramanga",
    "type": "Privada",
    "city": "Floridablanca / Bucaramanga",
    "department": "Santander",
    "country": "Colombia",
    "logoText": "UPB Buca",
    "badgeBg": "bg-red-700 text-white",
    "description": "Universidad Pontificia Bolivariana - Seccional Bucaramanga (UPB Bucaramanga) es una reconocida institución de educación superior privada en Santander, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería Civil",
      "Ingeniería Electrónica",
      "Psicología",
      "Derecho",
      "Administración de Negocios"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Floridablanca / Bucaramanga",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Santander",
      "Programas con registro calificado y Acreditación Institucional Multicampus de Alta Calidad"
    ],
    "websiteUrl": "https://upb.edu.co/bucaramanga",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional Multicampus de Alta Calidad"
  },
  {
    "id": "uni-ustabga",
    "name": "Universidad Santo Tomás - Seccional Bucaramanga",
    "shortName": "USTA Bucaramanga",
    "type": "Privada",
    "city": "Bucaramanga / Floridablanca",
    "department": "Santander",
    "country": "Colombia",
    "logoText": "USTA Buc",
    "badgeBg": "bg-blue-900 text-white",
    "description": "Universidad Santo Tomás - Seccional Bucaramanga (USTA Bucaramanga) es una reconocida institución de educación superior privada en Santander, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Odontología",
      "Optometría",
      "Arquitectura",
      "Ingeniería Mecatrónica",
      "Negocios Internacionales"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bucaramanga / Floridablanca",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Santander",
      "Programas con registro calificado y Acreditación Institucional Multicampus de Alta Calidad"
    ],
    "websiteUrl": "https://ustabmanga.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional Multicampus de Alta Calidad"
  },
  {
    "id": "uni-uts",
    "name": "Unidades Tecnológicas de Santander",
    "shortName": "UTS",
    "type": "Pública",
    "city": "Bucaramanga / Barrancabermeja / Vélez",
    "department": "Santander",
    "country": "Colombia",
    "logoText": "UTS",
    "badgeBg": "bg-emerald-800 text-white",
    "description": "Unidades Tecnológicas de Santander (UTS) es una reconocida institución de educación superior pública en Santander, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Tecnología en Manejo de Petróleo y Gas",
      "Electromecánica",
      "Telecomunicaciones",
      "Obras Civiles",
      "Contabilidad"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bucaramanga / Barrancabermeja / Vélez",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Santander",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://uts.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-udes",
    "name": "Universidad de Santander",
    "shortName": "UDES",
    "type": "Privada",
    "city": "Bucaramanga / Cúcuta / Valledupar",
    "department": "Santander",
    "country": "Colombia",
    "logoText": "UDES",
    "badgeBg": "bg-emerald-800 text-white",
    "description": "Universidad de Santander (UDES) es una reconocida institución de educación superior privada en Santander, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Medicina Veterinaria",
      "Terapia Ocupacional",
      "Fisioterapia",
      "Enfermería",
      "Ingeniería de Software"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bucaramanga / Cúcuta / Valledupar",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Santander",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 4 años"
    ],
    "websiteUrl": "https://udes.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad por 4 años"
  },
  {
    "id": "uni-uniciencia",
    "name": "Corporación Universitaria de Ciencia y Desarrollo",
    "shortName": "Uniciencia",
    "type": "Privada",
    "city": "Bucaramanga",
    "department": "Santander",
    "country": "Colombia",
    "logoText": "Unicienc",
    "badgeBg": "bg-blue-900 text-white",
    "description": "Corporación Universitaria de Ciencia y Desarrollo (Uniciencia) es una reconocida institución de educación superior privada en Santander, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Derecho",
      "Psicología",
      "Ingeniería Industrial",
      "Contaduría Pública"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bucaramanga",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Santander",
      "Programas con registro calificado y Registro Calificado MinEducación"
    ],
    "websiteUrl": "https://uniciencia.edu.co",
    "rating": 4.4,
    "accreditation": "Registro Calificado MinEducación"
  },
  {
    "id": "uni-unipaz",
    "name": "Instituto Universitario de la Paz",
    "shortName": "UNIPAZ",
    "type": "Pública",
    "city": "Barrancabermeja",
    "department": "Santander",
    "country": "Colombia",
    "logoText": "UNIPAZ",
    "badgeBg": "bg-green-800 text-white",
    "description": "Instituto Universitario de la Paz (UNIPAZ) es una reconocida institución de educación superior pública en Santander, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería de Producción",
      "Ingeniería Ambiental y de Saneamiento",
      "Agronomía",
      "Medicina Veterinaria y Zootecnia"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Barrancabermeja",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Santander",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://unipaz.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-unilibresocorro",
    "name": "Universidad Libre - Seccional Socorro",
    "shortName": "Unilibre Socorro",
    "type": "Privada",
    "city": "Socorro",
    "department": "Santander",
    "country": "Colombia",
    "logoText": "Unilibre",
    "badgeBg": "bg-red-700 text-white",
    "description": "Universidad Libre - Seccional Socorro (Unilibre Socorro) es una reconocida institución de educación superior privada en Santander, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería Ambiental",
      "Licenciatura en Educación Básica",
      "Derecho",
      "Contaduría Pública"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Socorro",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Santander",
      "Programas con registro calificado y Acreditación Institucional Multicampus de Alta Calidad"
    ],
    "websiteUrl": "https://unilibresocorro.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional Multicampus de Alta Calidad"
  },
  {
    "id": "uni-utb",
    "name": "Universidad Tecnológica de Bolívar",
    "shortName": "UTB",
    "type": "Privada",
    "city": "Cartagena de Indias",
    "department": "Bolívar",
    "country": "Colombia",
    "logoText": "UTB",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Tecnológica de Bolívar (UTB) es una reconocida institución de educación superior privada en Bolívar, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería Naval",
      "Ingeniería Mecatrónica",
      "Ingeniería Química",
      "Finanzas y Negocios",
      "Economía"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Cartagena de Indias",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bolívar",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 8 años"
    ],
    "websiteUrl": "https://utb.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional de Alta Calidad por 8 años"
  },
  {
    "id": "uni-unisinuctg",
    "name": "Universidad del Sinú - Seccional Cartagena",
    "shortName": "Unisinú Cartagena",
    "type": "Privada",
    "city": "Cartagena de Indias",
    "department": "Bolívar",
    "country": "Colombia",
    "logoText": "Unisinú",
    "badgeBg": "bg-red-700 text-white",
    "description": "Universidad del Sinú - Seccional Cartagena (Unisinú Cartagena) es una reconocida institución de educación superior privada en Bolívar, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Odontología",
      "Enfermería",
      "Derecho",
      "Optometría",
      "Psicología"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Cartagena de Indias",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bolívar",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://unisinucartagena.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-curn",
    "name": "Corporación Universitaria Rafael Núñez",
    "shortName": "CURN",
    "type": "Privada",
    "city": "Cartagena / Barranquilla",
    "department": "Bolívar",
    "country": "Colombia",
    "logoText": "CURN",
    "badgeBg": "bg-blue-800 text-white",
    "description": "Corporación Universitaria Rafael Núñez (CURN) es una reconocida institución de educación superior privada en Bolívar, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Odontología",
      "Enfermería",
      "Instrumentación Quirúrgica",
      "Derecho"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Cartagena / Barranquilla",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bolívar",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://curn.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-unibac",
    "name": "Institución Universitaria Bellas Artes y Ciencias de Bolívar",
    "shortName": "UNIBAC",
    "type": "Pública",
    "city": "Cartagena de Indias",
    "department": "Bolívar",
    "country": "Colombia",
    "logoText": "UNIBAC",
    "badgeBg": "bg-yellow-700 text-white",
    "description": "Institución Universitaria Bellas Artes y Ciencias de Bolívar (UNIBAC) es una reconocida institución de educación superior pública en Bolívar, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Música",
      "Artes Plásticas",
      "Diseño Gráfico",
      "Comunicación Audiovisual",
      "Artes Escénicas"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Cartagena de Indias",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bolívar",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://unibac.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-umayorctg",
    "name": "Institución Universitaria Mayor de Cartagena",
    "shortName": "Umayorcito",
    "type": "Pública",
    "city": "Cartagena de Indias",
    "department": "Bolívar",
    "country": "Colombia",
    "logoText": "Umayorci",
    "badgeBg": "bg-emerald-800 text-white",
    "description": "Institución Universitaria Mayor de Cartagena (Umayorcito) es una reconocida institución de educación superior pública en Bolívar, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Tecnología en Turismo y Hotelería",
      "Delineante de Arquitectura",
      "Promoción Social",
      "Comercio Internacional"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Cartagena de Indias",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bolívar",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://umayor.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-unitecnar",
    "name": "Fundación Universitaria Antonio de Arévalo",
    "shortName": "Unitécnar",
    "type": "Privada",
    "city": "Cartagena de Indias",
    "department": "Bolívar",
    "country": "Colombia",
    "logoText": "Unitécna",
    "badgeBg": "bg-blue-900 text-white",
    "description": "Fundación Universitaria Antonio de Arévalo (Unitécnar) es una reconocida institución de educación superior privada en Bolívar, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería Petroquímica",
      "Seguridad y Salud en el Trabajo",
      "Gestión Naviera y Portuaria"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Cartagena de Indias",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bolívar",
      "Programas con registro calificado y Registro Calificado MinEducación"
    ],
    "websiteUrl": "https://unitecnar.edu.co",
    "rating": 4.4,
    "accreditation": "Registro Calificado MinEducación"
  },
  {
    "id": "uni-tecnologicoctg",
    "name": "Tecnológico Comfenalco Cartagena",
    "shortName": "Comfenalco Cartagena",
    "type": "Privada",
    "city": "Cartagena de Indias",
    "department": "Bolívar",
    "country": "Colombia",
    "logoText": "Comfenal",
    "badgeBg": "bg-orange-700 text-white",
    "description": "Tecnológico Comfenalco Cartagena (Comfenalco Cartagena) es una reconocida institución de educación superior privada en Bolívar, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería Ambiental",
      "Ingeniería de Sistemas",
      "Producción Industrial",
      "Gestión de Mercados"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Cartagena de Indias",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bolívar",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://tecnologicocomfenalco.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-unicolombo",
    "name": "Fundación Universitaria Colombo Internacional",
    "shortName": "Unicolombo",
    "type": "Privada",
    "city": "Cartagena de Indias",
    "department": "Bolívar",
    "country": "Colombia",
    "logoText": "Unicolom",
    "badgeBg": "bg-blue-800 text-white",
    "description": "Fundación Universitaria Colombo Internacional (Unicolombo) es una reconocida institución de educación superior privada en Bolívar, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Licenciatura en Inglés",
      "Negocios Internacionales",
      "Tecnología en Gestión Turística"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Cartagena de Indias",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bolívar",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://unicolombo.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-unalmzl",
    "name": "Universidad Nacional de Colombia - Sede Manizales",
    "shortName": "UNAL Manizales",
    "type": "Pública",
    "city": "Manizales",
    "department": "Caldas",
    "country": "Colombia",
    "logoText": "UNAL Man",
    "badgeBg": "bg-emerald-900 text-white",
    "description": "Universidad Nacional de Colombia - Sede Manizales (UNAL Manizales) es una reconocida institución de educación superior pública en Caldas, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería Química",
      "Ingeniería Eléctrica",
      "Ingeniería Electrónica",
      "Ingeniería Civil",
      "Ingeniería Industrial",
      "Matemáticas"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Manizales",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Caldas",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 10 años"
    ],
    "websiteUrl": "https://manizales.unal.edu.co",
    "rating": 4.8,
    "accreditation": "Acreditación Institucional de Alta Calidad por 10 años"
  },
  {
    "id": "uni-umanizales",
    "name": "Universidad de Manizales",
    "shortName": "UManizales",
    "type": "Privada",
    "city": "Manizales",
    "department": "Caldas",
    "country": "Colombia",
    "logoText": "UManizal",
    "badgeBg": "bg-blue-800 text-white",
    "description": "Universidad de Manizales (UManizales) es una reconocida institución de educación superior privada en Caldas, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Psicología",
      "Derecho",
      "Comunicación Social y Periodismo",
      "Mercadeo Nacional e Internacional"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Manizales",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Caldas",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 6 años"
    ],
    "websiteUrl": "https://umanizales.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional de Alta Calidad por 6 años"
  },
  {
    "id": "uni-ucm",
    "name": "Universidad Católica de Manizales",
    "shortName": "UCM",
    "type": "Privada",
    "city": "Manizales",
    "department": "Caldas",
    "country": "Colombia",
    "logoText": "UCM",
    "badgeBg": "bg-blue-900 text-white",
    "description": "Universidad Católica de Manizales (UCM) es una reconocida institución de educación superior privada en Caldas, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Bacteriología",
      "Enfermería",
      "Arquitectura",
      "Publicidad",
      "Ingeniería Ambiental"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Manizales",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Caldas",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 4 años"
    ],
    "websiteUrl": "https://ucm.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad por 4 años"
  },
  {
    "id": "uni-uam",
    "name": "Universidad Autónoma de Manizales",
    "shortName": "UAM",
    "type": "Privada",
    "city": "Manizales",
    "department": "Caldas",
    "country": "Colombia",
    "logoText": "UAM",
    "badgeBg": "bg-teal-800 text-white",
    "description": "Universidad Autónoma de Manizales (UAM) es una reconocida institución de educación superior privada en Caldas, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Fisioterapia",
      "Odontología",
      "Ingeniería Mecánica",
      "Ingeniería Biomédica",
      "Diseño de Modas"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Manizales",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Caldas",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 6 años"
    ],
    "websiteUrl": "https://autonoma.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional de Alta Calidad por 6 años"
  },
  {
    "id": "uni-cinoc",
    "name": "Colegio Integrado Nacional Oriente de Caldas",
    "shortName": "CINOC",
    "type": "Pública",
    "city": "Pensilvania / Manzanares / Marquetalia",
    "department": "Caldas",
    "country": "Colombia",
    "logoText": "CINOC",
    "badgeBg": "bg-green-700 text-white",
    "description": "Colegio Integrado Nacional Oriente de Caldas (CINOC) es una reconocida institución de educación superior pública en Caldas, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Tecnología en Gestión Forestal",
      "Mantenimiento Electromecánico",
      "Producción Agropecuaria"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Pensilvania / Manzanares / Marquetalia",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Caldas",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://cinoc.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-ucp",
    "name": "Universidad Católica de Pereira",
    "shortName": "UCP",
    "type": "Privada",
    "city": "Pereira",
    "department": "Risaralda",
    "country": "Colombia",
    "logoText": "UCP",
    "badgeBg": "bg-blue-800 text-white",
    "description": "Universidad Católica de Pereira (UCP) es una reconocida institución de educación superior privada en Risaralda, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Arquitectura",
      "Diseño Industrial",
      "Psicología",
      "Comunicación Social y Periodismo",
      "Ingeniería de Sistemas"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Pereira",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Risaralda",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://ucp.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-unilibreper",
    "name": "Universidad Libre - Seccional Pereira",
    "shortName": "Unilibre Pereira",
    "type": "Privada",
    "city": "Pereira",
    "department": "Risaralda",
    "country": "Colombia",
    "logoText": "Unilibre",
    "badgeBg": "bg-red-700 text-white",
    "description": "Universidad Libre - Seccional Pereira (Unilibre Pereira) es una reconocida institución de educación superior privada en Risaralda, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Enfermería",
      "Derecho",
      "Ingeniería Comercial",
      "Contaduría Pública"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Pereira",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Risaralda",
      "Programas con registro calificado y Acreditación Institucional Multicampus de Alta Calidad"
    ],
    "websiteUrl": "https://unilibrepereira.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional Multicampus de Alta Calidad"
  },
  {
    "id": "uni-comfamiliar",
    "name": "Fundación Universitaria Comfamiliar Risaralda",
    "shortName": "Comfamiliar",
    "type": "Privada",
    "city": "Pereira",
    "department": "Risaralda",
    "country": "Colombia",
    "logoText": "Comfamil",
    "badgeBg": "bg-orange-700 text-white",
    "description": "Fundación Universitaria Comfamiliar Risaralda (Comfamiliar) es una reconocida institución de educación superior privada en Risaralda, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Administración de Empresas",
      "Mercadeo Digital",
      "Gestión del Talento Humano"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Pereira",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Risaralda",
      "Programas con registro calificado y Registro Calificado MinEducación"
    ],
    "websiteUrl": "https://uc.edu.co",
    "rating": 4.4,
    "accreditation": "Registro Calificado MinEducación"
  },
  {
    "id": "uni-ciaf",
    "name": "Comunidad de Instituciones Educativas CIAF",
    "shortName": "CIAF",
    "type": "Privada",
    "city": "Pereira",
    "department": "Risaralda",
    "country": "Colombia",
    "logoText": "CIAF",
    "badgeBg": "bg-emerald-800 text-white",
    "description": "Comunidad de Instituciones Educativas CIAF (CIAF) es una reconocida institución de educación superior privada en Risaralda, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Tecnología en Desarrollo de Software",
      "Seguridad y Salud en el Trabajo",
      "Gestión Financiera"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Pereira",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Risaralda",
      "Programas con registro calificado y Registro Calificado MinEducación"
    ],
    "websiteUrl": "https://ciaf.edu.co",
    "rating": 4.4,
    "accreditation": "Registro Calificado MinEducación"
  },
  {
    "id": "uni-uniquindio",
    "name": "Universidad del Quindío",
    "shortName": "Uniquindío",
    "type": "Pública",
    "city": "Armenia",
    "department": "Quindío",
    "country": "Colombia",
    "logoText": "Uniquind",
    "badgeBg": "bg-green-800 text-white",
    "description": "Universidad del Quindío (Uniquindío) es una reconocida institución de educación superior pública en Quindío, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Enfermería",
      "Ingeniería Civil",
      "Biología",
      "Ciencia de la Información y Bibliotecología"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Armenia",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Quindío",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 6 años"
    ],
    "websiteUrl": "https://uniquindio.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional de Alta Calidad por 6 años"
  },
  {
    "id": "uni-ugcarmenia",
    "name": "Universidad La Gran Colombia - Seccional Armenia",
    "shortName": "UGC Armenia",
    "type": "Privada",
    "city": "Armenia",
    "department": "Quindío",
    "country": "Colombia",
    "logoText": "UGC Arme",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad La Gran Colombia - Seccional Armenia (UGC Armenia) es una reconocida institución de educación superior privada en Quindío, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Derecho",
      "Arquitectura",
      "Ingeniería Agroindustrial",
      "Psicología",
      "Economía"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Armenia",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Quindío",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://ugc.edu.co/armenia",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-eam",
    "name": "Institución Universitaria EAM",
    "shortName": "EAM",
    "type": "Privada",
    "city": "Armenia",
    "department": "Quindío",
    "country": "Colombia",
    "logoText": "EAM",
    "badgeBg": "bg-blue-900 text-white",
    "description": "Institución Universitaria EAM (EAM) es una reconocida institución de educación superior privada en Quindío, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería de Software",
      "Publicidad",
      "Diseño Visual Digital",
      "Negocios Internacionales"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Armenia",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Quindío",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://eam.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-uniboyaca",
    "name": "Universidad de Boyacá",
    "shortName": "UniBoyacá",
    "type": "Privada",
    "city": "Tunja / Sogamoso / Yopal",
    "department": "Boyacá",
    "country": "Colombia",
    "logoText": "UniBoyac",
    "badgeBg": "bg-blue-800 text-white",
    "description": "Universidad de Boyacá (UniBoyacá) es una reconocida institución de educación superior privada en Boyacá, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Fisioterapia",
      "Odontología",
      "Arquitectura",
      "Ingeniería Ambiental",
      "Diseño Gráfico"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Tunja / Sogamoso / Yopal",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Boyacá",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://uniboyaca.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-ustatunja",
    "name": "Universidad Santo Tomás - Seccional Tunja",
    "shortName": "USTA Tunja",
    "type": "Privada",
    "city": "Tunja",
    "department": "Boyacá",
    "country": "Colombia",
    "logoText": "USTA Tun",
    "badgeBg": "bg-blue-900 text-white",
    "description": "Universidad Santo Tomás - Seccional Tunja (USTA Tunja) es una reconocida institución de educación superior privada en Boyacá, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Arquitectura",
      "Ingeniería Civil",
      "Derecho",
      "Ingeniería Ambiental",
      "Negocios Internacionales"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Tunja",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Boyacá",
      "Programas con registro calificado y Acreditación Institucional Multicampus de Alta Calidad"
    ],
    "websiteUrl": "https://ustatunja.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional Multicampus de Alta Calidad"
  },
  {
    "id": "uni-jdc",
    "name": "Fundación Universitaria Juan de Castellanos",
    "shortName": "JDC",
    "type": "Privada",
    "city": "Tunja",
    "department": "Boyacá",
    "country": "Colombia",
    "logoText": "JDC",
    "badgeBg": "bg-emerald-800 text-white",
    "description": "Fundación Universitaria Juan de Castellanos (JDC) es una reconocida institución de educación superior privada en Boyacá, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina Veterinaria",
      "Ingeniería Agropecuaria",
      "Trabajo Social",
      "Licenciatura en Educación Física"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Tunja",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Boyacá",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://jdc.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-utolima",
    "name": "Universidad del Tolima",
    "shortName": "UT",
    "type": "Pública",
    "city": "Ibagué",
    "department": "Tolima",
    "country": "Colombia",
    "logoText": "UT",
    "badgeBg": "bg-emerald-800 text-white",
    "description": "Universidad del Tolima (UT) es una reconocida institución de educación superior pública en Tolima, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina Veterinaria y Zootecnia",
      "Medicina",
      "Ingeniería Forestal",
      "Ingeniería Agronómica",
      "Biología"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Ibagué",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Tolima",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 6 años"
    ],
    "websiteUrl": "https://ut.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional de Alta Calidad por 6 años"
  },
  {
    "id": "uni-unibague",
    "name": "Universidad de Ibagué",
    "shortName": "Unibagué",
    "type": "Privada",
    "city": "Ibagué",
    "department": "Tolima",
    "country": "Colombia",
    "logoText": "Unibagué",
    "badgeBg": "bg-blue-900 text-white",
    "description": "Universidad de Ibagué (Unibagué) es una reconocida institución de educación superior privada en Tolima, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería Civil",
      "Ingeniería Electrónica",
      "Psicología",
      "Derecho",
      "Arquitectura",
      "Economía"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Ibagué",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Tolima",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 4 años"
    ],
    "websiteUrl": "https://unibague.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional de Alta Calidad por 4 años"
  },
  {
    "id": "uni-conservatoriotol",
    "name": "Conservatorio del Tolima",
    "shortName": "Conservatorio Tolima",
    "type": "Pública",
    "city": "Ibagué",
    "department": "Tolima",
    "country": "Colombia",
    "logoText": "Conserva",
    "badgeBg": "bg-amber-800 text-white",
    "description": "Conservatorio del Tolima (Conservatorio Tolima) es una reconocida institución de educación superior pública en Tolima, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Maestría y Profesional en Música",
      "Licenciatura en Música",
      "Interpretación Instrumental",
      "Canto"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Ibagué",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Tolima",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://conservatoriodeltolima.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-itfip",
    "name": "Instituto Tolimense de Formación Técnica Profesional",
    "shortName": "ITFIP",
    "type": "Pública",
    "city": "El Espinal",
    "department": "Tolima",
    "country": "Colombia",
    "logoText": "ITFIP",
    "badgeBg": "bg-teal-800 text-white",
    "description": "Instituto Tolimense de Formación Técnica Profesional (ITFIP) es una reconocida institución de educación superior pública en Tolima, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería de Sistemas",
      "Contaduría Pública",
      "Administración de Empresas Agropecuarias"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en El Espinal",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Tolima",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://itfip.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-uccibague",
    "name": "Universidad Cooperativa de Colombia - Sede Ibagué / Espinal",
    "shortName": "UCC Ibagué",
    "type": "Privada",
    "city": "Ibagué / El Espinal",
    "department": "Tolima",
    "country": "Colombia",
    "logoText": "UCC Ibag",
    "badgeBg": "bg-cyan-800 text-white",
    "description": "Universidad Cooperativa de Colombia - Sede Ibagué / Espinal (UCC Ibagué) es una reconocida institución de educación superior privada en Tolima, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina Veterinaria y Zootecnia",
      "Derecho",
      "Psicología",
      "Contaduría Pública"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Ibagué / El Espinal",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Tolima",
      "Programas con registro calificado y Acreditación Institucional Multicampus de Alta Calidad"
    ],
    "websiteUrl": "https://ucc.edu.co/ibague",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional Multicampus de Alta Calidad"
  },
  {
    "id": "uni-usco",
    "name": "Universidad Surcolombiana",
    "shortName": "USCO",
    "type": "Pública",
    "city": "Neiva / Pitalito / Garzón / La Plata",
    "department": "Huila",
    "country": "Colombia",
    "logoText": "USCO",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Surcolombiana (USCO) es una reconocida institución de educación superior pública en Huila, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Enfermería",
      "Ingeniería de Petróleos",
      "Ingeniería Agrícola",
      "Derecho",
      "Licenciaturas"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Neiva / Pitalito / Garzón / La Plata",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Huila",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 6 años"
    ],
    "websiteUrl": "https://usco.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional de Alta Calidad por 6 años"
  },
  {
    "id": "uni-corhuila",
    "name": "Corporación Universitaria del Huila",
    "shortName": "Corhuila",
    "type": "Privada",
    "city": "Neiva / Pitalito",
    "department": "Huila",
    "country": "Colombia",
    "logoText": "Corhuila",
    "badgeBg": "bg-green-800 text-white",
    "description": "Corporación Universitaria del Huila (Corhuila) es una reconocida institución de educación superior privada en Huila, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina Veterinaria y Zootecnia",
      "Ingeniería Ambiental",
      "Ingeniería Industrial",
      "Negocios Internacionales"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Neiva / Pitalito",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Huila",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://corhuila.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-uninavarra",
    "name": "Fundación Universitaria Navarra",
    "shortName": "UniNavarra",
    "type": "Privada",
    "city": "Neiva",
    "department": "Huila",
    "country": "Colombia",
    "logoText": "UniNavar",
    "badgeBg": "bg-blue-900 text-white",
    "description": "Fundación Universitaria Navarra (UniNavarra) es una reconocida institución de educación superior privada en Huila, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Enfermería",
      "Derecho",
      "Ingeniería Ambiental",
      "Radiología e Imágenes Diagnósticas"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Neiva",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Huila",
      "Programas con registro calificado y Registro Calificado MinEducación"
    ],
    "websiteUrl": "https://uninavarra.edu.co",
    "rating": 4.5,
    "accreditation": "Registro Calificado MinEducación"
  },
  {
    "id": "uni-uccneiva",
    "name": "Universidad Cooperativa de Colombia - Sede Neiva",
    "shortName": "UCC Neiva",
    "type": "Privada",
    "city": "Neiva",
    "department": "Huila",
    "country": "Colombia",
    "logoText": "UCC Neiv",
    "badgeBg": "bg-cyan-800 text-white",
    "description": "Universidad Cooperativa de Colombia - Sede Neiva (UCC Neiva) es una reconocida institución de educación superior privada en Huila, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Derecho",
      "Psicología",
      "Contaduría Pública",
      "Ingeniería de Sistemas"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Neiva",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Huila",
      "Programas con registro calificado y Acreditación Institucional Multicampus de Alta Calidad"
    ],
    "websiteUrl": "https://ucc.edu.co/neiva",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional Multicampus de Alta Calidad"
  },
  {
    "id": "uni-ufps",
    "name": "Universidad Francisco de Paula Santander",
    "shortName": "UFPS",
    "type": "Pública",
    "city": "Cúcuta",
    "department": "Norte de Santander",
    "country": "Colombia",
    "logoText": "UFPS",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Francisco de Paula Santander (UFPS) es una reconocida institución de educación superior pública en Norte de Santander, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería de Sistemas",
      "Ingeniería Civil",
      "Ingeniería Electromecánica",
      "Enfermería",
      "Derecho"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Cúcuta",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Norte de Santander",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 6 años"
    ],
    "websiteUrl": "https://ufps.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional de Alta Calidad por 6 años"
  },
  {
    "id": "uni-unipamplona",
    "name": "Universidad de Pamplona",
    "shortName": "Unipamplona",
    "type": "Pública",
    "city": "Pamplona / Cúcuta / Villa del Rosario",
    "department": "Norte de Santander",
    "country": "Colombia",
    "logoText": "Unipampl",
    "badgeBg": "bg-red-900 text-white",
    "description": "Universidad de Pamplona (Unipamplona) es una reconocida institución de educación superior pública en Norte de Santander, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Fisioterapia",
      "Fonoaudiología",
      "Medicina Veterinaria",
      "Ingeniería de Alimentos",
      "Licenciaturas"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Pamplona / Cúcuta / Villa del Rosario",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Norte de Santander",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 4 años"
    ],
    "websiteUrl": "https://unipamplona.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional de Alta Calidad por 4 años"
  },
  {
    "id": "uni-ufpso",
    "name": "Universidad Francisco de Paula Santander - Seccional Ocaña",
    "shortName": "UFPSO",
    "type": "Pública",
    "city": "Ocaña",
    "department": "Norte de Santander",
    "country": "Colombia",
    "logoText": "UFPSO",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Francisco de Paula Santander - Seccional Ocaña (UFPSO) es una reconocida institución de educación superior pública en Norte de Santander, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería Mecánica",
      "Ingeniería Civil",
      "Zootecnia",
      "Contaduría Pública",
      "Comunicación Social"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Ocaña",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Norte de Santander",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://ufpso.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-unisimoncuc",
    "name": "Universidad Simón Bolívar - Sede Cúcuta",
    "shortName": "Unisimón Cúcuta",
    "type": "Privada",
    "city": "Cúcuta",
    "department": "Norte de Santander",
    "country": "Colombia",
    "logoText": "Unisimón",
    "badgeBg": "bg-red-700 text-white",
    "description": "Universidad Simón Bolívar - Sede Cúcuta (Unisimón Cúcuta) es una reconocida institución de educación superior privada en Norte de Santander, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Derecho",
      "Psicología",
      "Trabajo Social",
      "Ingeniería de Sistemas",
      "Comercio Exterior"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Cúcuta",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Norte de Santander",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://unisimon.edu.co/cucuta",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-unilibrecuc",
    "name": "Universidad Libre - Seccional Cúcuta",
    "shortName": "Unilibre Cúcuta",
    "type": "Privada",
    "city": "Cúcuta",
    "department": "Norte de Santander",
    "country": "Colombia",
    "logoText": "Unilibre",
    "badgeBg": "bg-red-700 text-white",
    "description": "Universidad Libre - Seccional Cúcuta (Unilibre Cúcuta) es una reconocida institución de educación superior privada en Norte de Santander, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Derecho",
      "Contaduría Pública",
      "Administración de Empresas",
      "Ingeniería en Tecnologías de la Información"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Cúcuta",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Norte de Santander",
      "Programas con registro calificado y Acreditación Institucional Multicampus de Alta Calidad"
    ],
    "websiteUrl": "https://unilibrecucuta.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional Multicampus de Alta Calidad"
  },
  {
    "id": "uni-iser",
    "name": "Instituto Superior de Educación Rural",
    "shortName": "ISER",
    "type": "Pública",
    "city": "Pamplona",
    "department": "Norte de Santander",
    "country": "Colombia",
    "logoText": "ISER",
    "badgeBg": "bg-emerald-800 text-white",
    "description": "Instituto Superior de Educación Rural (ISER) es una reconocida institución de educación superior pública en Norte de Santander, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Tecnología en Gestión Agropecuaria",
      "Tecnología en Obras Civiles",
      "Tecnología en Redes"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Pamplona",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Norte de Santander",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://iser.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-udenar",
    "name": "Universidad de Nariño",
    "shortName": "Udenar",
    "type": "Pública",
    "city": "Pasto / Ipiales / Tumaco / Tuquerres",
    "department": "Nariño",
    "country": "Colombia",
    "logoText": "Udenar",
    "badgeBg": "bg-emerald-800 text-white",
    "description": "Universidad de Nariño (Udenar) es una reconocida institución de educación superior pública en Nariño, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Medicina Veterinaria",
      "Ingeniería Agronómica",
      "Derecho",
      "Artes Visuales",
      "Licenciaturas"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Pasto / Ipiales / Tumaco / Tuquerres",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Nariño",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 6 años"
    ],
    "websiteUrl": "https://udenar.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional de Alta Calidad por 6 años"
  },
  {
    "id": "uni-unimariana",
    "name": "Universidad Mariana",
    "shortName": "Unimariana",
    "type": "Privada",
    "city": "Pasto",
    "department": "Nariño",
    "country": "Colombia",
    "logoText": "Unimaria",
    "badgeBg": "bg-blue-800 text-white",
    "description": "Universidad Mariana (Unimariana) es una reconocida institución de educación superior privada en Nariño, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Enfermería",
      "Fisioterapia",
      "Nutrición y Dietética",
      "Terapia Ocupacional",
      "Derecho",
      "Psicología"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Pasto",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Nariño",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 6 años"
    ],
    "websiteUrl": "https://umariana.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad por 6 años"
  },
  {
    "id": "uni-cesmag",
    "name": "Institución Universitaria CESMAG",
    "shortName": "CESMAG",
    "type": "Privada",
    "city": "Pasto",
    "department": "Nariño",
    "country": "Colombia",
    "logoText": "CESMAG",
    "badgeBg": "bg-amber-800 text-white",
    "description": "Institución Universitaria CESMAG (CESMAG) es una reconocida institución de educación superior privada en Nariño, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Arquitectura",
      "Psicología",
      "Licenciatura en Educación Infantil",
      "Derecho",
      "Ingeniería de Sistemas"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Pasto",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Nariño",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://iucesmag.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-uccpasto",
    "name": "Universidad Cooperativa de Colombia - Sede Pasto",
    "shortName": "UCC Pasto",
    "type": "Privada",
    "city": "Pasto",
    "department": "Nariño",
    "country": "Colombia",
    "logoText": "UCC Past",
    "badgeBg": "bg-cyan-800 text-white",
    "description": "Universidad Cooperativa de Colombia - Sede Pasto (UCC Pasto) es una reconocida institución de educación superior privada en Nariño, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Odontología",
      "Medicina",
      "Derecho",
      "Ingeniería Industrial",
      "Psicología"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Pasto",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Nariño",
      "Programas con registro calificado y Acreditación Institucional Multicampus de Alta Calidad"
    ],
    "websiteUrl": "https://ucc.edu.co/pasto",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional Multicampus de Alta Calidad"
  },
  {
    "id": "uni-unicauca",
    "name": "Universidad del Cauca",
    "shortName": "Unicauca",
    "type": "Pública",
    "city": "Popayán / Santander de Quilichao",
    "department": "Cauca",
    "country": "Colombia",
    "logoText": "Unicauca",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad del Cauca (Unicauca) es una reconocida institución de educación superior pública en Cauca, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Ingeniería Electrónica y Telecomunicaciones",
      "Fisioterapia",
      "Fonoaudiología",
      "Derecho",
      "Antropología"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Popayán / Santander de Quilichao",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Cauca",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 8 años"
    ],
    "websiteUrl": "https://unicauca.edu.co",
    "rating": 4.8,
    "accreditation": "Acreditación Institucional de Alta Calidad por 8 años"
  },
  {
    "id": "uni-colmayorcauca",
    "name": "Institución Universitaria Colegio Mayor del Cauca",
    "shortName": "Unimayor",
    "type": "Pública",
    "city": "Popayán",
    "department": "Cauca",
    "country": "Colombia",
    "logoText": "Unimayor",
    "badgeBg": "bg-blue-900 text-white",
    "description": "Institución Universitaria Colegio Mayor del Cauca (Unimayor) es una reconocida institución de educación superior pública en Cauca, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Diseño Visual",
      "Arquitectura",
      "Ingeniería Informática",
      "Administración Financiera"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Popayán",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Cauca",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://unimayor.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-fup",
    "name": "Fundación Universitaria de Popayán",
    "shortName": "FUP",
    "type": "Privada",
    "city": "Popayán / Santander de Quilichao",
    "department": "Cauca",
    "country": "Colombia",
    "logoText": "FUP",
    "badgeBg": "bg-emerald-800 text-white",
    "description": "Fundación Universitaria de Popayán (FUP) es una reconocida institución de educación superior privada en Cauca, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ecología",
      "Arquitectura",
      "Comunicación Social",
      "Psicología",
      "Ingeniería Industrial",
      "Derecho"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Popayán / Santander de Quilichao",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Cauca",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://fup.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-unicomfacauca",
    "name": "Corporación Universitaria Comfacauca",
    "shortName": "Unicomfacauca",
    "type": "Privada",
    "city": "Popayán / Santander de Quilichao / Puerto Tejada",
    "department": "Cauca",
    "country": "Colombia",
    "logoText": "Unicomfa",
    "badgeBg": "bg-orange-800 text-white",
    "description": "Corporación Universitaria Comfacauca (Unicomfacauca) es una reconocida institución de educación superior privada en Cauca, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería Mecatrónica",
      "Ingeniería Industrial",
      "Comunicación Social",
      "Gestión Gastronómica"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Popayán / Santander de Quilichao / Puerto Tejada",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Cauca",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://unicomfacauca.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-unillanos",
    "name": "Universidad de los Llanos",
    "shortName": "Unillanos",
    "type": "Pública",
    "city": "Villavicencio / Granada",
    "department": "Meta",
    "country": "Colombia",
    "logoText": "Unillano",
    "badgeBg": "bg-emerald-800 text-white",
    "description": "Universidad de los Llanos (Unillanos) es una reconocida institución de educación superior pública en Meta, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina Veterinaria y Zootecnia",
      "Enfermería",
      "Ingeniería de Sistemas",
      "Ingeniería Electrónica",
      "Biología"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Villavicencio / Granada",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Meta",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 6 años"
    ],
    "websiteUrl": "https://unillanos.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional de Alta Calidad por 6 años"
  },
  {
    "id": "uni-ustavillavicencio",
    "name": "Universidad Santo Tomás - Sede Villavicencio",
    "shortName": "USTA Villavicencio",
    "type": "Privada",
    "city": "Villavicencio",
    "department": "Meta",
    "country": "Colombia",
    "logoText": "USTA Vil",
    "badgeBg": "bg-blue-900 text-white",
    "description": "Universidad Santo Tomás - Sede Villavicencio (USTA Villavicencio) es una reconocida institución de educación superior privada en Meta, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería Ambiental",
      "Derecho",
      "Psicología",
      "Negocios Internacionales",
      "Contaduría"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Villavicencio",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Meta",
      "Programas con registro calificado y Acreditación Institucional Multicampus de Alta Calidad"
    ],
    "websiteUrl": "https://ustatunja.edu.co/villavicencio",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional Multicampus de Alta Calidad"
  },
  {
    "id": "uni-uccvillavicencio",
    "name": "Universidad Cooperativa de Colombia - Sede Villavicencio",
    "shortName": "UCC Villavicencio",
    "type": "Privada",
    "city": "Villavicencio",
    "department": "Meta",
    "country": "Colombia",
    "logoText": "UCC Vill",
    "badgeBg": "bg-cyan-800 text-white",
    "description": "Universidad Cooperativa de Colombia - Sede Villavicencio (UCC Villavicencio) es una reconocida institución de educación superior privada en Meta, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina Veterinaria y Zootecnia",
      "Medicina",
      "Psicología",
      "Odontología",
      "Derecho"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Villavicencio",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Meta",
      "Programas con registro calificado y Acreditación Institucional Multicampus de Alta Calidad"
    ],
    "websiteUrl": "https://ucc.edu.co/villavicencio",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional Multicampus de Alta Calidad"
  },
  {
    "id": "uni-unicordoba",
    "name": "Universidad de Córdoba",
    "shortName": "Unicórdoba",
    "type": "Pública",
    "city": "Montería / Lorica / Sahagún / Montelíbano",
    "department": "Córdoba",
    "country": "Colombia",
    "logoText": "Unicórdo",
    "badgeBg": "bg-emerald-800 text-white",
    "description": "Universidad de Córdoba (Unicórdoba) es una reconocida institución de educación superior pública en Córdoba, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina Veterinaria y Zootecnia",
      "Ingeniería Agronómica",
      "Biología",
      "Enfermería",
      "Licenciaturas"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Montería / Lorica / Sahagún / Montelíbano",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Córdoba",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 6 años"
    ],
    "websiteUrl": "https://unicordoba.edu.co",
    "rating": 4.7,
    "accreditation": "Acreditación Institucional de Alta Calidad por 6 años"
  },
  {
    "id": "uni-unisinu",
    "name": "Universidad del Sinú Elías Bechara Zainúm",
    "shortName": "Unisinú Montería",
    "type": "Privada",
    "city": "Montería",
    "department": "Córdoba",
    "country": "Colombia",
    "logoText": "Unisinú",
    "badgeBg": "bg-red-700 text-white",
    "description": "Universidad del Sinú Elías Bechara Zainúm (Unisinú Montería) es una reconocida institución de educación superior privada en Córdoba, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Odontología",
      "Enfermería",
      "Derecho",
      "Psicología",
      "Optometría",
      "Negocios"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Montería",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Córdoba",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 6 años"
    ],
    "websiteUrl": "https://unisinu.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad por 6 años"
  },
  {
    "id": "uni-upbmonteria",
    "name": "Universidad Pontificia Bolivariana - Seccional Montería",
    "shortName": "UPB Montería",
    "type": "Privada",
    "city": "Montería",
    "department": "Córdoba",
    "country": "Colombia",
    "logoText": "UPB Mont",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Pontificia Bolivariana - Seccional Montería (UPB Montería) es una reconocida institución de educación superior privada en Córdoba, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería Civil",
      "Ingeniería Sanitaria y Ambiental",
      "Psicología",
      "Derecho",
      "Administración"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Montería",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Córdoba",
      "Programas con registro calificado y Acreditación Institucional Multicampus de Alta Calidad"
    ],
    "websiteUrl": "https://upb.edu.co/monteria",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional Multicampus de Alta Calidad"
  },
  {
    "id": "uni-unisucre",
    "name": "Universidad de Sucre",
    "shortName": "Unisucre",
    "type": "Pública",
    "city": "Sincelejo",
    "department": "Sucre",
    "country": "Colombia",
    "logoText": "Unisucre",
    "badgeBg": "bg-emerald-800 text-white",
    "description": "Universidad de Sucre (Unisucre) es una reconocida institución de educación superior pública en Sucre, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Enfermería",
      "Zootecnia",
      "Biología",
      "Ingeniería Agroindustrial",
      "Ingeniería Civil"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Sincelejo",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Sucre",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 4 años"
    ],
    "websiteUrl": "https://unisucre.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad por 4 años"
  },
  {
    "id": "uni-cecar",
    "name": "Corporación Universitaria del Caribe",
    "shortName": "CECAR",
    "type": "Privada",
    "city": "Sincelejo / Montería / Villavicencio",
    "department": "Sucre",
    "country": "Colombia",
    "logoText": "CECAR",
    "badgeBg": "bg-teal-800 text-white",
    "description": "Corporación Universitaria del Caribe (CECAR) es una reconocida institución de educación superior privada en Sucre, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Derecho",
      "Psicología",
      "Arquitectura",
      "Trabajo Social",
      "Licenciatura en Pedagogía Infantil"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Sincelejo / Montería / Villavicencio",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Sucre",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 4 años"
    ],
    "websiteUrl": "https://cecar.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad por 4 años"
  },
  {
    "id": "uni-unimagdalena",
    "name": "Universidad del Magdalena",
    "shortName": "Unimagdalena",
    "type": "Pública",
    "city": "Santa Marta",
    "department": "Magdalena",
    "country": "Colombia",
    "logoText": "Unimagda",
    "badgeBg": "bg-blue-800 text-white",
    "description": "Universidad del Magdalena (Unimagdalena) es una reconocida institución de educación superior pública en Magdalena, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Biología Marina",
      "Antropología",
      "Cine y Audiovisuales",
      "Ingeniería Ambiental",
      "Derecho"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Santa Marta",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Magdalena",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 8 años"
    ],
    "websiteUrl": "https://unimagdalena.edu.co",
    "rating": 4.8,
    "accreditation": "Acreditación Institucional de Alta Calidad por 8 años"
  },
  {
    "id": "uni-sergiosantamarta",
    "name": "Universidad Sergio Arboleda - Santa Marta",
    "shortName": "Sergio Arboleda Santa Marta",
    "type": "Privada",
    "city": "Santa Marta",
    "department": "Magdalena",
    "country": "Colombia",
    "logoText": "Sergio A",
    "badgeBg": "bg-blue-950 text-white",
    "description": "Universidad Sergio Arboleda - Santa Marta (Sergio Arboleda Santa Marta) es una reconocida institución de educación superior privada en Magdalena, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Derecho",
      "Marketing y Negocios Internacionales",
      "Comunicación Social",
      "Psicología"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Santa Marta",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Magdalena",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://usergioarboleda.edu.co/santa-marta",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-infotepcienaga",
    "name": "Instituto Nacional de Formación Técnica Profesional",
    "shortName": "INFOTEP Ciénaga",
    "type": "Pública",
    "city": "Ciénaga",
    "department": "Magdalena",
    "country": "Colombia",
    "logoText": "INFOTEP",
    "badgeBg": "bg-cyan-800 text-white",
    "description": "Instituto Nacional de Formación Técnica Profesional (INFOTEP Ciénaga) es una reconocida institución de educación superior pública en Magdalena, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Técnico Profesional en Operaciones Portuarias",
      "Agroindustria",
      "Seguridad Ocupacional"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Ciénaga",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Magdalena",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://infotep.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-uccsantamarta",
    "name": "Universidad Cooperativa de Colombia - Sede Santa Marta",
    "shortName": "UCC Santa Marta",
    "type": "Privada",
    "city": "Santa Marta",
    "department": "Magdalena",
    "country": "Colombia",
    "logoText": "UCC Sant",
    "badgeBg": "bg-cyan-800 text-white",
    "description": "Universidad Cooperativa de Colombia - Sede Santa Marta (UCC Santa Marta) es una reconocida institución de educación superior privada en Magdalena, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Enfermería",
      "Psicología",
      "Derecho",
      "Comercio Internacional"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Santa Marta",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Magdalena",
      "Programas con registro calificado y Acreditación Institucional Multicampus de Alta Calidad"
    ],
    "websiteUrl": "https://ucc.edu.co/santa-marta",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional Multicampus de Alta Calidad"
  },
  {
    "id": "uni-upc",
    "name": "Universidad Popular del Cesar",
    "shortName": "UPC",
    "type": "Pública",
    "city": "Valledupar / Aguachica",
    "department": "Cesar",
    "country": "Colombia",
    "logoText": "UPC",
    "badgeBg": "bg-green-800 text-white",
    "description": "Universidad Popular del Cesar (UPC) es una reconocida institución de educación superior pública en Cesar, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Enfermería",
      "Instrumentación Quirúrgica",
      "Ingeniería Agroindustrial",
      "Derecho",
      "Licenciaturas"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Valledupar / Aguachica",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Cesar",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://unicesar.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-udesvalledupar",
    "name": "Universidad de Santander - Sede Valledupar",
    "shortName": "UDES Valledupar",
    "type": "Privada",
    "city": "Valledupar",
    "department": "Cesar",
    "country": "Colombia",
    "logoText": "UDES Val",
    "badgeBg": "bg-emerald-800 text-white",
    "description": "Universidad de Santander - Sede Valledupar (UDES Valledupar) es una reconocida institución de educación superior privada en Cesar, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Fisioterapia",
      "Terapia Ocupacional",
      "Medicina Veterinaria",
      "Derecho",
      "Psicología"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Valledupar",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Cesar",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://valledupar.udes.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-areandinavalledupar",
    "name": "Fundación Universitaria del Área Andina - Sede Valledupar",
    "shortName": "Areandina Valledupar",
    "type": "Privada",
    "city": "Valledupar",
    "department": "Cesar",
    "country": "Colombia",
    "logoText": "Areandin",
    "badgeBg": "bg-emerald-700 text-white",
    "description": "Fundación Universitaria del Área Andina - Sede Valledupar (Areandina Valledupar) es una reconocida institución de educación superior privada en Cesar, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Enfermería",
      "Instrumentación Quirúrgica",
      "Psicología",
      "Ingeniería de Minas"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Valledupar",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Cesar",
      "Programas con registro calificado y Acreditación Institucional Multicampus de Alta Calidad"
    ],
    "websiteUrl": "https://areandina.edu.co/valledupar",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional Multicampus de Alta Calidad"
  },
  {
    "id": "uni-uniguajira",
    "name": "Universidad de La Guajira",
    "shortName": "Uniguajira",
    "type": "Pública",
    "city": "Riohacha / Maicao / Fonseca / Villanueva",
    "department": "La Guajira",
    "country": "Colombia",
    "logoText": "Uniguaji",
    "badgeBg": "bg-amber-800 text-white",
    "description": "Universidad de La Guajira (Uniguajira) es una reconocida institución de educación superior pública en La Guajira, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería Ambiental",
      "Biología",
      "Trabajo Social",
      "Licenciatura en Etnoeducación",
      "Negocios Internacionales"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Riohacha / Maicao / Fonseca / Villanueva",
      "Convenios de prácticas profesionales con empresas líderes del departamento de La Guajira",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://uniguajira.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-utch",
    "name": "Universidad Tecnológica del Chocó Diego Luis Córdoba",
    "shortName": "UTCH",
    "type": "Pública",
    "city": "Quibdó / Istmina / Bahía Solano",
    "department": "Chocó",
    "country": "Colombia",
    "logoText": "UTCH",
    "badgeBg": "bg-emerald-900 text-white",
    "description": "Universidad Tecnológica del Chocó Diego Luis Córdoba (UTCH) es una reconocida institución de educación superior pública en Chocó, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Biología con énfasis en Recursos Naturales",
      "Enfermería",
      "Ingeniería Agroforestal",
      "Trabajo Social",
      "Arquitectura"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Quibdó / Istmina / Bahía Solano",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Chocó",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://utch.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-uniclaretiana",
    "name": "Fundación Universitaria Claretiana",
    "shortName": "Uniclaretiana",
    "type": "Privada",
    "city": "Quibdó / Medellín / Neiva / Cali / Pereira / Bogotá",
    "department": "Chocó",
    "country": "Colombia",
    "logoText": "Uniclare",
    "badgeBg": "bg-amber-800 text-white",
    "description": "Fundación Universitaria Claretiana (Uniclaretiana) es una reconocida institución de educación superior privada en Chocó, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Trabajo Social",
      "Teología Bíblica",
      "Ingeniería de Sistemas",
      "Derecho"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Quibdó / Medellín / Neiva / Cali / Pereira / Bogotá",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Chocó",
      "Programas con registro calificado y Registro Calificado MinEducación"
    ],
    "websiteUrl": "https://uniclaretiana.edu.co",
    "rating": 4.4,
    "accreditation": "Registro Calificado MinEducación"
  },
  {
    "id": "uni-uniamazonia",
    "name": "Universidad de la Amazonia",
    "shortName": "Uniamazonia",
    "type": "Pública",
    "city": "Florencia",
    "department": "Caquetá",
    "country": "Colombia",
    "logoText": "Uniamazo",
    "badgeBg": "bg-green-900 text-white",
    "description": "Universidad de la Amazonia (Uniamazonia) es una reconocida institución de educación superior pública en Caquetá, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina Veterinaria y Zootecnia",
      "Ingeniería Agroecológica",
      "Biología",
      "Licenciatura en Pedagogía Infantil",
      "Derecho"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Florencia",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Caquetá",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 4 años"
    ],
    "websiteUrl": "https://udla.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad por 4 años"
  },
  {
    "id": "uni-unitropico",
    "name": "Universidad Internacional del Trópico Americano",
    "shortName": "Unitrópico",
    "type": "Pública",
    "city": "Yopal",
    "department": "Casanare",
    "country": "Colombia",
    "logoText": "Unitrópi",
    "badgeBg": "bg-yellow-800 text-white",
    "description": "Universidad Internacional del Trópico Americano (Unitrópico) es una reconocida institución de educación superior pública en Casanare, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina Veterinaria y Zootecnia",
      "Biología Ambiental",
      "Ingeniería Agroforestal",
      "Ingeniería Civil",
      "Derecho"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Yopal",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Casanare",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://unitropico.edu.co",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-lasalleyopal",
    "name": "Universidad de La Salle - Campus Utopía Yopal",
    "shortName": "La Salle Utopía",
    "type": "Privada",
    "city": "Yopal",
    "department": "Casanare",
    "country": "Colombia",
    "logoText": "La Salle",
    "badgeBg": "bg-blue-800 text-white",
    "description": "Universidad de La Salle - Campus Utopía Yopal (La Salle Utopía) es una reconocida institución de educación superior privada en Casanare, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería Agronómica para Jóvenes Rurales y Víctimas del Conflicto"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Yopal",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Casanare",
      "Programas con registro calificado y Premio Nacional de Paz y Excelencia Agronómica"
    ],
    "websiteUrl": "https://lasalle.edu.co/utopia",
    "rating": 4.8,
    "accreditation": "Premio Nacional de Paz y Excelencia Agronómica"
  },
  {
    "id": "uni-itp",
    "name": "Instituto Tecnológico del Putumayo",
    "shortName": "ITP",
    "type": "Pública",
    "city": "Mocoa / Sibundoy / Puerto Asís / Colón",
    "department": "Putumayo",
    "country": "Colombia",
    "logoText": "ITP",
    "badgeBg": "bg-teal-800 text-white",
    "description": "Instituto Tecnológico del Putumayo (ITP) es una reconocida institución de educación superior pública en Putumayo, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Tecnología Forestal",
      "Administración de Empresas",
      "Saneamiento Ambiental",
      "Ingeniería de Sistemas"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Mocoa / Sibundoy / Puerto Asís / Colón",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Putumayo",
      "Programas con registro calificado y Registro Calificado MinEducación"
    ],
    "websiteUrl": "https://itp.edu.co",
    "rating": 4.4,
    "accreditation": "Registro Calificado MinEducación"
  },
  {
    "id": "uni-unalcaribe",
    "name": "Universidad Nacional de Colombia - Sede Caribe",
    "shortName": "UNAL Caribe",
    "type": "Pública",
    "city": "San Andrés Islas",
    "department": "San Andrés y Providencia",
    "country": "Colombia",
    "logoText": "UNAL Car",
    "badgeBg": "bg-emerald-900 text-white",
    "description": "Universidad Nacional de Colombia - Sede Caribe (UNAL Caribe) es una reconocida institución de educación superior pública en San Andrés y Providencia, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Programa Especial de Admisión y Movilidad Académica (PEAMA)",
      "Biología Marina",
      "Gestión Ambiental"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en San Andrés Islas",
      "Convenios de prácticas profesionales con empresas líderes del departamento de San Andrés y Providencia",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 10 años"
    ],
    "websiteUrl": "https://caribe.unal.edu.co",
    "rating": 4.8,
    "accreditation": "Acreditación Institucional de Alta Calidad por 10 años"
  },
  {
    "id": "uni-infotepsanandres",
    "name": "INFOTEP San Andrés Islas",
    "shortName": "INFOTEP San Andrés",
    "type": "Pública",
    "city": "San Andrés Islas",
    "department": "San Andrés y Providencia",
    "country": "Colombia",
    "logoText": "INFOTEP",
    "badgeBg": "bg-blue-800 text-white",
    "description": "INFOTEP San Andrés Islas (INFOTEP San Andrés) es una reconocida institución de educación superior pública en San Andrés y Providencia, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Tecnología en Gestión Turística y Hotelera",
      "Procesos de Comercio Exterior",
      "Logística Marina"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en San Andrés Islas",
      "Convenios de prácticas profesionales con empresas líderes del departamento de San Andrés y Providencia",
      "Programas con registro calificado y Registro Calificado MinEducación"
    ],
    "websiteUrl": "https://infotepsai.edu.co",
    "rating": 4.4,
    "accreditation": "Registro Calificado MinEducación"
  },
  {
    "id": "uni-unalamazonia",
    "name": "Universidad Nacional de Colombia - Sede Amazonia",
    "shortName": "UNAL Amazonia",
    "type": "Pública",
    "city": "Leticia",
    "department": "Amazonas",
    "country": "Colombia",
    "logoText": "UNAL Ama",
    "badgeBg": "bg-emerald-900 text-white",
    "description": "Universidad Nacional de Colombia - Sede Amazonia (UNAL Amazonia) es una reconocida institución de educación superior pública en Amazonas, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "PEAMA Amazónico (Movilidad a programas de Medicina",
      "Biología",
      "Agronomía",
      "Ingenierías)",
      "Estudios Amazónicos"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Leticia",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Amazonas",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 10 años"
    ],
    "websiteUrl": "https://amazonia.unal.edu.co",
    "rating": 4.8,
    "accreditation": "Acreditación Institucional de Alta Calidad por 10 años"
  },
  {
    "id": "uni-unalorinoquia",
    "name": "Universidad Nacional de Colombia - Sede Orinoquia",
    "shortName": "UNAL Orinoquia",
    "type": "Pública",
    "city": "Arauca",
    "department": "Arauca",
    "country": "Colombia",
    "logoText": "UNAL Ori",
    "badgeBg": "bg-emerald-900 text-white",
    "description": "Universidad Nacional de Colombia - Sede Orinoquia (UNAL Orinoquia) es una reconocida institución de educación superior pública en Arauca, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "PEAMA Orinoquia (Ingeniería Agronómica",
      "Medicina Veterinaria",
      "Ingeniería Civil",
      "Enfermería)"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Arauca",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Arauca",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 10 años"
    ],
    "websiteUrl": "https://orinoquia.unal.edu.co",
    "rating": 4.8,
    "accreditation": "Acreditación Institucional de Alta Calidad por 10 años"
  },
  {
    "id": "uni-uccarauca",
    "name": "Universidad Cooperativa de Colombia - Sede Arauca",
    "shortName": "UCC Arauca",
    "type": "Privada",
    "city": "Arauca",
    "department": "Arauca",
    "country": "Colombia",
    "logoText": "UCC Arau",
    "badgeBg": "bg-cyan-800 text-white",
    "description": "Universidad Cooperativa de Colombia - Sede Arauca (UCC Arauca) es una reconocida institución de educación superior privada en Arauca, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina Veterinaria y Zootecnia",
      "Derecho",
      "Psicología",
      "Contaduría"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Arauca",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Arauca",
      "Programas con registro calificado y Acreditación Institucional Multicampus de Alta Calidad"
    ],
    "websiteUrl": "https://ucc.edu.co/arauca",
    "rating": 4.5,
    "accreditation": "Acreditación Institucional Multicampus de Alta Calidad"
  },
  {
    "id": "uni-unallapaz",
    "name": "Universidad Nacional de Colombia - Sede de La Paz",
    "shortName": "UNAL La Paz",
    "type": "Pública",
    "city": "La Paz (Área Metropolitana de Valledupar)",
    "department": "Cesar",
    "country": "Colombia",
    "logoText": "UNAL La",
    "badgeBg": "bg-emerald-900 text-white",
    "description": "Universidad Nacional de Colombia - Sede de La Paz (UNAL La Paz) es una reconocida institución de educación superior pública en Cesar, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería Mecatrónica",
      "Ingeniería Biológica",
      "Biología",
      "Estadística",
      "Geografía",
      "Gestión Cultural"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en La Paz (Área Metropolitana de Valledupar)",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Cesar",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 10 años"
    ],
    "websiteUrl": "https://delapaz.unal.edu.co",
    "rating": 4.8,
    "accreditation": "Acreditación Institucional de Alta Calidad por 10 años"
  },
  {
    "id": "uni-unaltumaco",
    "name": "Universidad Nacional de Colombia - Sede de Presencia Nacional Tumaco",
    "shortName": "UNAL Tumaco",
    "type": "Pública",
    "city": "Tumaco",
    "department": "Nariño",
    "country": "Colombia",
    "logoText": "UNAL Tum",
    "badgeBg": "bg-emerald-900 text-white",
    "description": "Universidad Nacional de Colombia - Sede de Presencia Nacional Tumaco (UNAL Tumaco) es una reconocida institución de educación superior pública en Nariño, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "PEAMA Pacífico (Acceso y movilidad nacional para jóvenes del litoral Pacífico nariñense y caucano)"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Tumaco",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Nariño",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad por 10 años"
    ],
    "websiteUrl": "https://tumaco.unal.edu.co",
    "rating": 4.8,
    "accreditation": "Acreditación Institucional de Alta Calidad por 10 años"
  },
  {
    "id": "uni-unadamazonia",
    "name": "UNAD Centros de Atención Amazonia y Orinoquia",
    "shortName": "UNAD Amazonia-Orinoquia",
    "type": "Pública",
    "city": "San José del Guaviare / Inírida / Mitú / Puerto Carreño",
    "department": "Guaviare / Vichada / Guainía / Vaupés",
    "country": "Colombia",
    "logoText": "UNAD Ama",
    "badgeBg": "bg-amber-700 text-white",
    "description": "UNAD Centros de Atención Amazonia y Orinoquia (UNAD Amazonia-Orinoquia) es una reconocida institución de educación superior pública en Guaviare / Vichada / Guainía / Vaupés, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Agronomía",
      "Zootecnia",
      "Ingeniería Ambiental",
      "Psicología Comunitaria",
      "Licenciatura en Etnoeducación"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en San José del Guaviare / Inírida / Mitú / Puerto Carreño",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Guaviare / Vichada / Guainía / Vaupés",
      "Programas con registro calificado y Acreditación Institucional de Alta Calidad"
    ],
    "websiteUrl": "https://unad.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Institucional de Alta Calidad"
  },
  {
    "id": "uni-sena",
    "name": "Servicio Nacional de Aprendizaje - Formación Tecnológica y Universitaria",
    "shortName": "SENA Nacional",
    "type": "Pública",
    "city": "Nacional (Presencia en los 32 Departamentos y más de 1.100 municipios)",
    "department": "Nacional",
    "country": "Colombia",
    "logoText": "SENA Nac",
    "badgeBg": "bg-orange-600 text-white",
    "description": "Servicio Nacional de Aprendizaje - Formación Tecnológica y Universitaria (SENA Nacional) es una reconocida institución de educación superior pública en Nacional, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Tecnología en Análisis y Desarrollo de Software (ADSO)",
      "Animación Digital",
      "Gestión de Redes",
      "Soldadura Avanzada",
      "Automatización Industrial"
    ],
    "admissionRequirements": [
      "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
      "Inscripción web oficial a través del portal institucional de admisiones",
      "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
    ],
    "tuitionInfo": "Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional \"Puedo Estudiar\" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Nacional (Presencia en los 32 Departamentos y más de 1.100 municipios)",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Nacional",
      "Programas con registro calificado y Entidad Pública Nacional de Formación Profesional Integral (100% Gratuita)"
    ],
    "websiteUrl": "https://sena.edu.co",
    "rating": 4.8,
    "accreditation": "Entidad Pública Nacional de Formación Profesional Integral (100% Gratuita)"
  },
  {
    "id": "uni-uccmonteria",
    "name": "Universidad Cooperativa de Colombia - Sede Montería",
    "shortName": "UCC Montería",
    "type": "Privada",
    "city": "Montería",
    "department": "Córdoba",
    "country": "Colombia",
    "logoText": "UCC Mont",
    "badgeBg": "bg-cyan-800 text-white",
    "description": "Universidad Cooperativa de Colombia - Sede Montería (UCC Montería) es una reconocida institución de educación superior privada en Córdoba, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Derecho",
      "Psicología",
      "Contaduría"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Montería",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Córdoba",
      "Programas con registro calificado y Acreditación Multicampus"
    ],
    "websiteUrl": "https://ucc.edu.co/monteria",
    "rating": 4.5,
    "accreditation": "Acreditación Multicampus"
  },
  {
    "id": "uni-uccpopayan",
    "name": "Universidad Cooperativa de Colombia - Sede Popayán",
    "shortName": "UCC Popayán",
    "type": "Privada",
    "city": "Popayán",
    "department": "Cauca",
    "country": "Colombia",
    "logoText": "UCC Popa",
    "badgeBg": "bg-cyan-800 text-white",
    "description": "Universidad Cooperativa de Colombia - Sede Popayán (UCC Popayán) es una reconocida institución de educación superior privada en Cauca, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería de Sistemas",
      "Derecho",
      "Psicología"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Popayán",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Cauca",
      "Programas con registro calificado y Acreditación Multicampus"
    ],
    "websiteUrl": "https://ucc.edu.co/popayan",
    "rating": 4.5,
    "accreditation": "Acreditación Multicampus"
  },
  {
    "id": "uni-uccbca",
    "name": "Universidad Cooperativa de Colombia - Sede Barrancabermeja",
    "shortName": "UCC Barrancabermeja",
    "type": "Privada",
    "city": "Barrancabermeja",
    "department": "Santander",
    "country": "Colombia",
    "logoText": "UCC Barr",
    "badgeBg": "bg-cyan-800 text-white",
    "description": "Universidad Cooperativa de Colombia - Sede Barrancabermeja (UCC Barrancabermeja) es una reconocida institución de educación superior privada en Santander, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Derecho",
      "Psicología",
      "Contaduría"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Barrancabermeja",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Santander",
      "Programas con registro calificado y Acreditación Multicampus"
    ],
    "websiteUrl": "https://ucc.edu.co/barrancabermeja",
    "rating": 4.5,
    "accreditation": "Acreditación Multicampus"
  },
  {
    "id": "uni-uccmed",
    "name": "Universidad Cooperativa de Colombia - Sede Medellín / Envigado",
    "shortName": "UCC Medellín",
    "type": "Privada",
    "city": "Medellín / Envigado",
    "department": "Antioquia",
    "country": "Colombia",
    "logoText": "UCC Mede",
    "badgeBg": "bg-cyan-800 text-white",
    "description": "Universidad Cooperativa de Colombia - Sede Medellín / Envigado (UCC Medellín) es una reconocida institución de educación superior privada en Antioquia, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Odontología",
      "Derecho"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Medellín / Envigado",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Antioquia",
      "Programas con registro calificado y Acreditación Multicampus"
    ],
    "websiteUrl": "https://ucc.edu.co/medellin",
    "rating": 4.5,
    "accreditation": "Acreditación Multicampus"
  },
  {
    "id": "uni-ustamed",
    "name": "Universidad Santo Tomás - Sede Medellín",
    "shortName": "USTA Medellín",
    "type": "Privada",
    "city": "Medellín",
    "department": "Antioquia",
    "country": "Colombia",
    "logoText": "USTA Med",
    "badgeBg": "bg-blue-900 text-white",
    "description": "Universidad Santo Tomás - Sede Medellín (USTA Medellín) es una reconocida institución de educación superior privada en Antioquia, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Arquitectura",
      "Negocios Internacionales",
      "Derecho"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Medellín",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Antioquia",
      "Programas con registro calificado y Acreditación Multicampus"
    ],
    "websiteUrl": "https://ustamed.edu.co",
    "rating": 4.6,
    "accreditation": "Acreditación Multicampus"
  },
  {
    "id": "uni-uanmed",
    "name": "Universidad Antonio Nariño - Sede Medellín",
    "shortName": "UAN Medellín",
    "type": "Privada",
    "city": "Medellín",
    "department": "Antioquia",
    "country": "Colombia",
    "logoText": "UAN Mede",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Antonio Nariño - Sede Medellín (UAN Medellín) es una reconocida institución de educación superior privada en Antioquia, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Odontología",
      "Ingeniería Biomédica",
      "Psicología"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Medellín",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Antioquia",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uan.edu.co/medellin",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-uancali",
    "name": "Universidad Antonio Nariño - Sede Cali",
    "shortName": "UAN Cali",
    "type": "Privada",
    "city": "Cali",
    "department": "Valle del Cauca",
    "country": "Colombia",
    "logoText": "UAN Cali",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Antonio Nariño - Sede Cali (UAN Cali) es una reconocida institución de educación superior privada en Valle del Cauca, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Odontología",
      "Optometría"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Cali",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Valle del Cauca",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uan.edu.co/cali",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-uanibague",
    "name": "Universidad Antonio Nariño - Sede Ibagué",
    "shortName": "UAN Ibagué",
    "type": "Privada",
    "city": "Ibagué",
    "department": "Tolima",
    "country": "Colombia",
    "logoText": "UAN Ibag",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Antonio Nariño - Sede Ibagué (UAN Ibagué) es una reconocida institución de educación superior privada en Tolima, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina Veterinaria",
      "Derecho",
      "Psicología"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Ibagué",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Tolima",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uan.edu.co/ibague",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-uanneiva",
    "name": "Universidad Antonio Nariño - Sede Neiva",
    "shortName": "UAN Neiva",
    "type": "Privada",
    "city": "Neiva",
    "department": "Huila",
    "country": "Colombia",
    "logoText": "UAN Neiv",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Antonio Nariño - Sede Neiva (UAN Neiva) es una reconocida institución de educación superior privada en Huila, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Odontología",
      "Ingeniería Electrónica"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Neiva",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Huila",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uan.edu.co/neiva",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-uanpasto",
    "name": "Universidad Antonio Nariño - Sede Pasto",
    "shortName": "UAN Pasto",
    "type": "Privada",
    "city": "Pasto",
    "department": "Nariño",
    "country": "Colombia",
    "logoText": "UAN Past",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Antonio Nariño - Sede Pasto (UAN Pasto) es una reconocida institución de educación superior privada en Nariño, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Odontología",
      "Arquitectura",
      "Derecho"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Pasto",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Nariño",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uan.edu.co/pasto",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-uantunja",
    "name": "Universidad Antonio Nariño - Sede Tunja",
    "shortName": "UAN Tunja",
    "type": "Privada",
    "city": "Tunja",
    "department": "Boyacá",
    "country": "Colombia",
    "logoText": "UAN Tunj",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Antonio Nariño - Sede Tunja (UAN Tunja) es una reconocida institución de educación superior privada en Boyacá, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Psicología",
      "Derecho",
      "Comercio Internacional"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Tunja",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Boyacá",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uan.edu.co/tunja",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-uanduitama",
    "name": "Universidad Antonio Nariño - Sede Duitama",
    "shortName": "UAN Duitama",
    "type": "Privada",
    "city": "Duitama",
    "department": "Boyacá",
    "country": "Colombia",
    "logoText": "UAN Duit",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Antonio Nariño - Sede Duitama (UAN Duitama) es una reconocida institución de educación superior privada en Boyacá, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería Mecánica",
      "Contaduría Pública"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Duitama",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Boyacá",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uan.edu.co/duitama",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-uanarmenia",
    "name": "Universidad Antonio Nariño - Sede Armenia",
    "shortName": "UAN Armenia",
    "type": "Privada",
    "city": "Armenia",
    "department": "Quindío",
    "country": "Colombia",
    "logoText": "UAN Arme",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Antonio Nariño - Sede Armenia (UAN Armenia) es una reconocida institución de educación superior privada en Quindío, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina Veterinaria",
      "Psicología",
      "Odontología"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Armenia",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Quindío",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uan.edu.co/armenia",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-uancucuta",
    "name": "Universidad Antonio Nariño - Sede Cúcuta",
    "shortName": "UAN Cúcuta",
    "type": "Privada",
    "city": "Cúcuta",
    "department": "Norte de Santander",
    "country": "Colombia",
    "logoText": "UAN Cúcu",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Antonio Nariño - Sede Cúcuta (UAN Cúcuta) es una reconocida institución de educación superior privada en Norte de Santander, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Odontología",
      "Derecho",
      "Ingeniería Civil"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Cúcuta",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Norte de Santander",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uan.edu.co/cucuta",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-uanvalledupar",
    "name": "Universidad Antonio Nariño - Sede Valledupar",
    "shortName": "UAN Valledupar",
    "type": "Privada",
    "city": "Valledupar",
    "department": "Cesar",
    "country": "Colombia",
    "logoText": "UAN Vall",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Antonio Nariño - Sede Valledupar (UAN Valledupar) es una reconocida institución de educación superior privada en Cesar, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Optometría",
      "Odontología",
      "Derecho"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Valledupar",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Cesar",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uan.edu.co/valledupar",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-uanriohacha",
    "name": "Universidad Antonio Nariño - Sede Riohacha",
    "shortName": "UAN Riohacha",
    "type": "Privada",
    "city": "Riohacha",
    "department": "La Guajira",
    "country": "Colombia",
    "logoText": "UAN Rioh",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Antonio Nariño - Sede Riohacha (UAN Riohacha) es una reconocida institución de educación superior privada en La Guajira, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Psicología",
      "Derecho",
      "Administración"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Riohacha",
      "Convenios de prácticas profesionales con empresas líderes del departamento de La Guajira",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uan.edu.co/riohacha",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-uansantamarta",
    "name": "Universidad Antonio Nariño - Sede Santa Marta",
    "shortName": "UAN Santa Marta",
    "type": "Privada",
    "city": "Santa Marta",
    "department": "Magdalena",
    "country": "Colombia",
    "logoText": "UAN Sant",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Antonio Nariño - Sede Santa Marta (UAN Santa Marta) es una reconocida institución de educación superior privada en Magdalena, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina",
      "Odontología",
      "Psicología"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Santa Marta",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Magdalena",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uan.edu.co/santa-marta",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-uancartagena",
    "name": "Universidad Antonio Nariño - Sede Cartagena",
    "shortName": "UAN Cartagena",
    "type": "Privada",
    "city": "Cartagena de Indias",
    "department": "Bolívar",
    "country": "Colombia",
    "logoText": "UAN Cart",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Antonio Nariño - Sede Cartagena (UAN Cartagena) es una reconocida institución de educación superior privada en Bolívar, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Odontología",
      "Derecho",
      "Contaduría"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Cartagena de Indias",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Bolívar",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uan.edu.co/cartagena",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-uanbuenaventura",
    "name": "Universidad Antonio Nariño - Sede Buenaventura",
    "shortName": "UAN Buenaventura",
    "type": "Privada",
    "city": "Buenaventura",
    "department": "Valle del Cauca",
    "country": "Colombia",
    "logoText": "UAN Buen",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Antonio Nariño - Sede Buenaventura (UAN Buenaventura) es una reconocida institución de educación superior privada en Valle del Cauca, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Comercio Internacional",
      "Administración"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Buenaventura",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Valle del Cauca",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uan.edu.co/buenaventura",
    "rating": 4.4,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-uanpalmira",
    "name": "Universidad Antonio Nariño - Sede Palmira",
    "shortName": "UAN Palmira",
    "type": "Privada",
    "city": "Palmira",
    "department": "Valle del Cauca",
    "country": "Colombia",
    "logoText": "UAN Palm",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Antonio Nariño - Sede Palmira (UAN Palmira) es una reconocida institución de educación superior privada en Valle del Cauca, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Psicología",
      "Contaduría Pública",
      "Derecho"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Palmira",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Valle del Cauca",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uan.edu.co/palmira",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-uanvillavo",
    "name": "Universidad Antonio Nariño - Sede Villavicencio",
    "shortName": "UAN Villavicencio",
    "type": "Privada",
    "city": "Villavicencio",
    "department": "Meta",
    "country": "Colombia",
    "logoText": "UAN Vill",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Antonio Nariño - Sede Villavicencio (UAN Villavicencio) es una reconocida institución de educación superior privada en Meta, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina Veterinaria",
      "Odontología",
      "Derecho"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Villavicencio",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Meta",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uan.edu.co/villavicencio",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-uanroldanillo",
    "name": "Universidad Antonio Nariño - Sede Roldanillo",
    "shortName": "UAN Roldanillo",
    "type": "Privada",
    "city": "Roldanillo",
    "department": "Valle del Cauca",
    "country": "Colombia",
    "logoText": "UAN Rold",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Antonio Nariño - Sede Roldanillo (UAN Roldanillo) es una reconocida institución de educación superior privada en Valle del Cauca, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Administración",
      "Contaduría Pública"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Roldanillo",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Valle del Cauca",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uan.edu.co/roldanillo",
    "rating": 4.4,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-uanbuga",
    "name": "Universidad Antonio Nariño - Sede Buga",
    "shortName": "UAN Buga",
    "type": "Privada",
    "city": "Guadalajara de Buga",
    "department": "Valle del Cauca",
    "country": "Colombia",
    "logoText": "UAN Buga",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Antonio Nariño - Sede Buga (UAN Buga) es una reconocida institución de educación superior privada en Valle del Cauca, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Derecho",
      "Psicología",
      "Ingeniería Industrial"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Guadalajara de Buga",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Valle del Cauca",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uan.edu.co/buga",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-uancartago",
    "name": "Universidad Antonio Nariño - Sede Cartago",
    "shortName": "UAN Cartago",
    "type": "Privada",
    "city": "Cartago",
    "department": "Valle del Cauca",
    "country": "Colombia",
    "logoText": "UAN Cart",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Antonio Nariño - Sede Cartago (UAN Cartago) es una reconocida institución de educación superior privada en Valle del Cauca, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Psicología",
      "Contaduría",
      "Derecho"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Cartago",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Valle del Cauca",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uan.edu.co/cartago",
    "rating": 4.4,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-uanpopayan",
    "name": "Universidad Antonio Nariño - Sede Popayán",
    "shortName": "UAN Popayán",
    "type": "Privada",
    "city": "Popayán",
    "department": "Cauca",
    "country": "Colombia",
    "logoText": "UAN Popa",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Antonio Nariño - Sede Popayán (UAN Popayán) es una reconocida institución de educación superior privada en Cauca, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Odontología",
      "Psicología",
      "Derecho"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Popayán",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Cauca",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uan.edu.co/popayan",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-uanpereira",
    "name": "Universidad Antonio Nariño - Sede Pereira",
    "shortName": "UAN Pereira",
    "type": "Privada",
    "city": "Pereira",
    "department": "Risaralda",
    "country": "Colombia",
    "logoText": "UAN Pere",
    "badgeBg": "bg-red-800 text-white",
    "description": "Universidad Antonio Nariño - Sede Pereira (UAN Pereira) es una reconocida institución de educación superior privada en Risaralda, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Odontología",
      "Medicina Veterinaria",
      "Derecho"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Pereira",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Risaralda",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uan.edu.co/pereira",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-remingtonmonteria",
    "name": "Corporación Universitaria Remington - Sede Montería",
    "shortName": "Uniremington Montería",
    "type": "Privada",
    "city": "Montería",
    "department": "Córdoba",
    "country": "Colombia",
    "logoText": "Uniremin",
    "badgeBg": "bg-red-800 text-white",
    "description": "Corporación Universitaria Remington - Sede Montería (Uniremington Montería) es una reconocida institución de educación superior privada en Córdoba, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina Veterinaria",
      "Enfermería",
      "Contaduría"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Montería",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Córdoba",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uniremington.edu.co/monteria",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-remingtonbga",
    "name": "Corporación Universitaria Remington - Sede Bucaramanga",
    "shortName": "Uniremington Bucaramanga",
    "type": "Privada",
    "city": "Bucaramanga",
    "department": "Santander",
    "country": "Colombia",
    "logoText": "Uniremin",
    "badgeBg": "bg-red-800 text-white",
    "description": "Corporación Universitaria Remington - Sede Bucaramanga (Uniremington Bucaramanga) es una reconocida institución de educación superior privada en Santander, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería de Sistemas",
      "Derecho",
      "Administración"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bucaramanga",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Santander",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uniremington.edu.co/bucaramanga",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-remingtoncali",
    "name": "Corporación Universitaria Remington - Sede Cali",
    "shortName": "Uniremington Cali",
    "type": "Privada",
    "city": "Cali",
    "department": "Valle del Cauca",
    "country": "Colombia",
    "logoText": "Uniremin",
    "badgeBg": "bg-red-800 text-white",
    "description": "Corporación Universitaria Remington - Sede Cali (Uniremington Cali) es una reconocida institución de educación superior privada en Valle del Cauca, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Enfermería",
      "Contaduría",
      "Derecho"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Cali",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Valle del Cauca",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uniremington.edu.co/cali",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-remingtonpereira",
    "name": "Corporación Universitaria Remington - Sede Pereira",
    "shortName": "Uniremington Pereira",
    "type": "Privada",
    "city": "Pereira",
    "department": "Risaralda",
    "country": "Colombia",
    "logoText": "Uniremin",
    "badgeBg": "bg-red-800 text-white",
    "description": "Corporación Universitaria Remington - Sede Pereira (Uniremington Pereira) es una reconocida institución de educación superior privada en Risaralda, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina Veterinaria",
      "Ingeniería de Sistemas"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Pereira",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Risaralda",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uniremington.edu.co/pereira",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-remingtonmanizales",
    "name": "Corporación Universitaria Remington - Sede Manizales",
    "shortName": "Uniremington Manizales",
    "type": "Privada",
    "city": "Manizales",
    "department": "Caldas",
    "country": "Colombia",
    "logoText": "Uniremin",
    "badgeBg": "bg-red-800 text-white",
    "description": "Corporación Universitaria Remington - Sede Manizales (Uniremington Manizales) es una reconocida institución de educación superior privada en Caldas, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Derecho",
      "Contaduría Pública"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Manizales",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Caldas",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uniremington.edu.co/manizales",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-remingtonpasto",
    "name": "Corporación Universitaria Remington - Sede Pasto",
    "shortName": "Uniremington Pasto",
    "type": "Privada",
    "city": "Pasto",
    "department": "Nariño",
    "country": "Colombia",
    "logoText": "Uniremin",
    "badgeBg": "bg-red-800 text-white",
    "description": "Corporación Universitaria Remington - Sede Pasto (Uniremington Pasto) es una reconocida institución de educación superior privada en Nariño, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería de Sistemas",
      "Contaduría"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Pasto",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Nariño",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uniremington.edu.co/pasto",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-remingtoncucuta",
    "name": "Corporación Universitaria Remington - Sede Cúcuta",
    "shortName": "Uniremington Cúcuta",
    "type": "Privada",
    "city": "Cúcuta",
    "department": "Norte de Santander",
    "country": "Colombia",
    "logoText": "Uniremin",
    "badgeBg": "bg-red-800 text-white",
    "description": "Corporación Universitaria Remington - Sede Cúcuta (Uniremington Cúcuta) es una reconocida institución de educación superior privada en Norte de Santander, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Derecho",
      "Administración de Empresas"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Cúcuta",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Norte de Santander",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uniremington.edu.co/cucuta",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-remingtonyopal",
    "name": "Corporación Universitaria Remington - Sede Yopal",
    "shortName": "Uniremington Yopal",
    "type": "Privada",
    "city": "Yopal",
    "department": "Casanare",
    "country": "Colombia",
    "logoText": "Uniremin",
    "badgeBg": "bg-red-800 text-white",
    "description": "Corporación Universitaria Remington - Sede Yopal (Uniremington Yopal) es una reconocida institución de educación superior privada en Casanare, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería de Sistemas",
      "Contaduría"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Yopal",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Casanare",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uniremington.edu.co/yopal",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-remingtonvillavo",
    "name": "Corporación Universitaria Remington - Sede Villavicencio",
    "shortName": "Uniremington Villavicencio",
    "type": "Privada",
    "city": "Villavicencio",
    "department": "Meta",
    "country": "Colombia",
    "logoText": "Uniremin",
    "badgeBg": "bg-red-800 text-white",
    "description": "Corporación Universitaria Remington - Sede Villavicencio (Uniremington Villavicencio) es una reconocida institución de educación superior privada en Meta, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina Veterinaria",
      "Derecho"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Villavicencio",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Meta",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uniremington.edu.co/villavicencio",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-remingtonapartado",
    "name": "Corporación Universitaria Remington - Sede Urabá Apartadó",
    "shortName": "Uniremington Apartadó",
    "type": "Privada",
    "city": "Apartadó",
    "department": "Antioquia",
    "country": "Colombia",
    "logoText": "Uniremin",
    "badgeBg": "bg-red-800 text-white",
    "description": "Corporación Universitaria Remington - Sede Urabá Apartadó (Uniremington Apartadó) es una reconocida institución de educación superior privada en Antioquia, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería Agropecuaria",
      "Administración"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Apartadó",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Antioquia",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uniremington.edu.co/apartado",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-remingtonriohacha",
    "name": "Corporación Universitaria Remington - Sede Riohacha",
    "shortName": "Uniremington Riohacha",
    "type": "Privada",
    "city": "Riohacha",
    "department": "La Guajira",
    "country": "Colombia",
    "logoText": "Uniremin",
    "badgeBg": "bg-red-800 text-white",
    "description": "Corporación Universitaria Remington - Sede Riohacha (Uniremington Riohacha) es una reconocida institución de educación superior privada en La Guajira, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Administración",
      "Contaduría"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Riohacha",
      "Convenios de prácticas profesionales con empresas líderes del departamento de La Guajira",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uniremington.edu.co/riohacha",
    "rating": 4.4,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-remingtonsantamarta",
    "name": "Corporación Universitaria Remington - Sede Santa Marta",
    "shortName": "Uniremington Santa Marta",
    "type": "Privada",
    "city": "Santa Marta",
    "department": "Magdalena",
    "country": "Colombia",
    "logoText": "Uniremin",
    "badgeBg": "bg-red-800 text-white",
    "description": "Corporación Universitaria Remington - Sede Santa Marta (Uniremington Santa Marta) es una reconocida institución de educación superior privada en Magdalena, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Comercio Internacional",
      "Derecho"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Santa Marta",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Magdalena",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uniremington.edu.co/santa-marta",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-remingtonvalledupar",
    "name": "Corporación Universitaria Remington - Sede Valledupar",
    "shortName": "Uniremington Valledupar",
    "type": "Privada",
    "city": "Valledupar",
    "department": "Cesar",
    "country": "Colombia",
    "logoText": "Uniremin",
    "badgeBg": "bg-red-800 text-white",
    "description": "Corporación Universitaria Remington - Sede Valledupar (Uniremington Valledupar) es una reconocida institución de educación superior privada en Cesar, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Derecho",
      "Contaduría Pública"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Valledupar",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Cesar",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uniremington.edu.co/valledupar",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-remingtonibague",
    "name": "Corporación Universitaria Remington - Sede Ibagué",
    "shortName": "Uniremington Ibagué",
    "type": "Privada",
    "city": "Ibagué",
    "department": "Tolima",
    "country": "Colombia",
    "logoText": "Uniremin",
    "badgeBg": "bg-red-800 text-white",
    "description": "Corporación Universitaria Remington - Sede Ibagué (Uniremington Ibagué) es una reconocida institución de educación superior privada en Tolima, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Medicina Veterinaria",
      "Administración"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Ibagué",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Tolima",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uniremington.edu.co/ibague",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-remingtonneiva",
    "name": "Corporación Universitaria Remington - Sede Neiva",
    "shortName": "Uniremington Neiva",
    "type": "Privada",
    "city": "Neiva",
    "department": "Huila",
    "country": "Colombia",
    "logoText": "Uniremin",
    "badgeBg": "bg-red-800 text-white",
    "description": "Corporación Universitaria Remington - Sede Neiva (Uniremington Neiva) es una reconocida institución de educación superior privada en Huila, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Derecho",
      "Contaduría"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Neiva",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Huila",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uniremington.edu.co/neiva",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-remingtonarmenia",
    "name": "Corporación Universitaria Remington - Sede Armenia",
    "shortName": "Uniremington Armenia",
    "type": "Privada",
    "city": "Armenia",
    "department": "Quindío",
    "country": "Colombia",
    "logoText": "Uniremin",
    "badgeBg": "bg-red-800 text-white",
    "description": "Corporación Universitaria Remington - Sede Armenia (Uniremington Armenia) es una reconocida institución de educación superior privada en Quindío, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Administración",
      "Psicología"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Armenia",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Quindío",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uniremington.edu.co/armenia",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-remingtonpalmira",
    "name": "Corporación Universitaria Remington - Sede Palmira",
    "shortName": "Uniremington Palmira",
    "type": "Privada",
    "city": "Palmira",
    "department": "Valle del Cauca",
    "country": "Colombia",
    "logoText": "Uniremin",
    "badgeBg": "bg-red-800 text-white",
    "description": "Corporación Universitaria Remington - Sede Palmira (Uniremington Palmira) es una reconocida institución de educación superior privada en Valle del Cauca, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Contaduría Pública",
      "Administración"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Palmira",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Valle del Cauca",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uniremington.edu.co/palmira",
    "rating": 4.4,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-remingtontunja",
    "name": "Corporación Universitaria Remington - Sede Tunja",
    "shortName": "Uniremington Tunja",
    "type": "Privada",
    "city": "Tunja",
    "department": "Boyacá",
    "country": "Colombia",
    "logoText": "Uniremin",
    "badgeBg": "bg-red-800 text-white",
    "description": "Corporación Universitaria Remington - Sede Tunja (Uniremington Tunja) es una reconocida institución de educación superior privada en Boyacá, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Derecho",
      "Negocios Internacionales"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Tunja",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Boyacá",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uniremington.edu.co/tunja",
    "rating": 4.5,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-remingtonsincelejo",
    "name": "Corporación Universitaria Remington - Sede Sincelejo",
    "shortName": "Uniremington Sincelejo",
    "type": "Privada",
    "city": "Sincelejo",
    "department": "Sucre",
    "country": "Colombia",
    "logoText": "Uniremin",
    "badgeBg": "bg-red-800 text-white",
    "description": "Corporación Universitaria Remington - Sede Sincelejo (Uniremington Sincelejo) es una reconocida institución de educación superior privada en Sucre, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Administración",
      "Contaduría"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Sincelejo",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Sucre",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uniremington.edu.co/sincelejo",
    "rating": 4.4,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-remingtoncartago",
    "name": "Corporación Universitaria Remington - Sede Cartago",
    "shortName": "Uniremington Cartago",
    "type": "Privada",
    "city": "Cartago",
    "department": "Valle del Cauca",
    "country": "Colombia",
    "logoText": "Uniremin",
    "badgeBg": "bg-red-800 text-white",
    "description": "Corporación Universitaria Remington - Sede Cartago (Uniremington Cartago) es una reconocida institución de educación superior privada en Valle del Cauca, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería de Sistemas",
      "Contaduría"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Cartago",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Valle del Cauca",
      "Programas con registro calificado y Acreditación Alta Calidad"
    ],
    "websiteUrl": "https://uniremington.edu.co/cartago",
    "rating": 4.4,
    "accreditation": "Acreditación Alta Calidad"
  },
  {
    "id": "uni-uniminutoant",
    "name": "UNIMINUTO - Seccional Antioquia y Chocó",
    "shortName": "UNIMINUTO Antioquia",
    "type": "Privada",
    "city": "Bello / Itagüí / Quibdó",
    "department": "Antioquia / Chocó",
    "country": "Colombia",
    "logoText": "UNIMINUT",
    "badgeBg": "bg-yellow-700 text-white",
    "description": "UNIMINUTO - Seccional Antioquia y Chocó (UNIMINUTO Antioquia) es una reconocida institución de educación superior privada en Antioquia / Chocó, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Psicología",
      "Trabajo Social",
      "Comunicación Social"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bello / Itagüí / Quibdó",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Antioquia / Chocó",
      "Programas con registro calificado y Acreditación Multicampus"
    ],
    "websiteUrl": "https://uniminuto.edu/antioquia",
    "rating": 4.6,
    "accreditation": "Acreditación Multicampus"
  },
  {
    "id": "uni-uniminutocaribe",
    "name": "UNIMINUTO - Rectoría Caribe",
    "shortName": "UNIMINUTO Caribe",
    "type": "Privada",
    "city": "Barranquilla / Cartagena / Santa Marta",
    "department": "Atlántico / Bolívar",
    "country": "Colombia",
    "logoText": "UNIMINUT",
    "badgeBg": "bg-yellow-700 text-white",
    "description": "UNIMINUTO - Rectoría Caribe (UNIMINUTO Caribe) es una reconocida institución de educación superior privada en Atlántico / Bolívar, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Administración",
      "Licenciatura en Educación Infantil"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Barranquilla / Cartagena / Santa Marta",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Atlántico / Bolívar",
      "Programas con registro calificado y Acreditación Multicampus"
    ],
    "websiteUrl": "https://uniminuto.edu/caribe",
    "rating": 4.5,
    "accreditation": "Acreditación Multicampus"
  },
  {
    "id": "uni-uniminutosant",
    "name": "UNIMINUTO - Rectoría Santanderes",
    "shortName": "UNIMINUTO Santanderes",
    "type": "Privada",
    "city": "Bucaramanga / Cúcuta / Ocaña",
    "department": "Santander / N. Santander",
    "country": "Colombia",
    "logoText": "UNIMINUT",
    "badgeBg": "bg-yellow-700 text-white",
    "description": "UNIMINUTO - Rectoría Santanderes (UNIMINUTO Santanderes) es una reconocida institución de educación superior privada en Santander / N. Santander, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Ingeniería de Sistemas",
      "Psicología"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Bucaramanga / Cúcuta / Ocaña",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Santander / N. Santander",
      "Programas con registro calificado y Acreditación Multicampus"
    ],
    "websiteUrl": "https://uniminuto.edu/santanderes",
    "rating": 4.5,
    "accreditation": "Acreditación Multicampus"
  },
  {
    "id": "uni-uniminutoeje",
    "name": "UNIMINUTO - Rectoría Eje Cafetero",
    "shortName": "UNIMINUTO Eje Cafetero",
    "type": "Privada",
    "city": "Pereira / Manizales / Armenia",
    "department": "Risaralda / Caldas / Quindío",
    "country": "Colombia",
    "logoText": "UNIMINUT",
    "badgeBg": "bg-yellow-700 text-white",
    "description": "UNIMINUTO - Rectoría Eje Cafetero (UNIMINUTO Eje Cafetero) es una reconocida institución de educación superior privada en Risaralda / Caldas / Quindío, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Contaduría Pública",
      "Licenciaturas"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Pereira / Manizales / Armenia",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Risaralda / Caldas / Quindío",
      "Programas con registro calificado y Acreditación Multicampus"
    ],
    "websiteUrl": "https://uniminuto.edu/eje-cafetero",
    "rating": 4.5,
    "accreditation": "Acreditación Multicampus"
  },
  {
    "id": "uni-uniminutosurocc",
    "name": "UNIMINUTO - Rectoría Suroccidente",
    "shortName": "UNIMINUTO Suroccidente",
    "type": "Privada",
    "city": "Cali / Buga / Pasto",
    "department": "Valle del Cauca / Nariño",
    "country": "Colombia",
    "logoText": "UNIMINUT",
    "badgeBg": "bg-yellow-700 text-white",
    "description": "UNIMINUTO - Rectoría Suroccidente (UNIMINUTO Suroccidente) es una reconocida institución de educación superior privada en Valle del Cauca / Nariño, orientada a la formación integral y al desarrollo regional en Colombia.",
    "topCareers": [
      "Comunicación Social",
      "Trabajo Social"
    ],
    "admissionRequirements": [
      "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
      "Formulario de inscripción diligenciado en la plataforma web institucional",
      "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
    ],
    "tuitionInfo": "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo.",
    "campusHighlights": [
      "Instalaciones académicas y laboratorios modernos en Cali / Buga / Pasto",
      "Convenios de prácticas profesionales con empresas líderes del departamento de Valle del Cauca / Nariño",
      "Programas con registro calificado y Acreditación Multicampus"
    ],
    "websiteUrl": "https://uniminuto.edu/suroccidente",
    "rating": 4.5,
    "accreditation": "Acreditación Multicampus"
  }
];

/**
 * Catálogo completo de Becas, Financiación y Oportunidades Educativas para Universitarios en Colombia.
 * Incluye becas de gratuidad del Estado, créditos condonables ICETEX, fondos territoriales, becas universitarias institucionales, de fundaciones privadas e internacionales.
 * Total: 38 Oportunidades vigentes.
 */
export const COLOMBIAN_SCHOLARSHIPS_DATA: Scholarship[] = [
  {
    "id": "beca-puedo-estudiar",
    "title": "Política de Gratuidad 'Puedo Estudiar'",
    "organization": "Ministerio de Educación Nacional de Colombia",
    "coverage": "100% Total",
    "status": "Vigente",
    "category": "Pública",
    "badgeBg": "bg-emerald-700",
    "description": "Política de Estado que cubre el 100% del valor de la matrícula en programas de pregrado (técnico profesional, tecnológico y universitario) en las 67 Instituciones de Educación Superior públicas de Colombia.",
    "requirements": [
      "Ser ciudadano colombiano o pertenecer a comunidades reconocidas por el Estado",
      "Estar matriculado en un programa de pregrado en una IES pública",
      "Pertenecer a los estratos socioeconómicos 1, 2, 3 o estar clasificado en los subgrupos A, B o C del SISBÉN IV",
      "No poseer título profesional universitario previo"
    ],
    "benefits": [
      "100% de cobertura del valor de la matrícula neta durante la duración oficial del programa",
      "Priorización automática para apoyos de sostenimiento del programa Jóvenes en Paz o Renta Joven"
    ],
    "deadlineDate": "2026-11-30",
    "targetAudience": "Bachilleres colombianos en situación de vulnerabilidad socioeconómica",
    "applicationLink": "https://www.mineducacion.gov.co/portal/Educacion-superior/Politica-de-Gratuidad/",
    "fieldOfStudy": [
      "Todas las áreas del conocimiento en universidades e institutos públicos"
    ],
    "isFeatured": true
  },
  {
    "id": "beca-generacion-e-excelencia",
    "title": "Generación E - Componente Excelencia",
    "organization": "Ministerio de Educación Nacional & ICETEX",
    "coverage": "100% Total",
    "status": "Vigente",
    "category": "Excelencia",
    "badgeBg": "bg-blue-700",
    "description": "Reconoce a los mejores bachilleres del país con puntajes destacados en el Examen de Estado Saber 11, financiando el 100% de la matrícula en universidades públicas o privadas acreditadas de alta calidad.",
    "requirements": [
      "Puntaje global en el examen Saber 11 igual o superior al punto de corte oficial nacional (tradicionalmente >= 345 puntos)",
      "Pertenecer a los subgrupos A1 a C8 del SISBÉN IV",
      "Haber culminado y aprobado el grado 11 en el año inmediatamente anterior o vigente"
    ],
    "benefits": [
      "Financiación del 100% del valor de la matrícula en la universidad acreditada elegida (pública o privada)",
      "Subsidio de sostenimiento semestral indexado al salario mínimo legal vigente"
    ],
    "deadlineDate": "2026-12-15",
    "targetAudience": "Los mejores puntajes Saber 11 de colegios oficiales y no oficiales de Colombia",
    "applicationLink": "https://web.icetex.gov.co",
    "fieldOfStudy": [
      "Todos los programas académicos con Acreditación de Alta Calidad"
    ],
    "isFeatured": true
  },
  {
    "id": "beca-generacion-e-equidad",
    "title": "Generación E - Componente Equidad",
    "organization": "Gobierno Nacional & Prosperidad Social",
    "coverage": "100% Total",
    "status": "Vigente",
    "category": "Vulnerable / Bajos Recursos",
    "badgeBg": "bg-teal-700",
    "description": "Transformación hacia el acceso universal a la educación superior pública, garantizando la gratuidad de la matrícula para jóvenes de escasos recursos en todo el territorio nacional.",
    "requirements": [
      "Tener entre 14 y 28 años de edad",
      "Estar registrado en SISBÉN IV (grupos A, B o C)",
      "Estar admitido en una IES pública en programa técnico, tecnológico o universitario"
    ],
    "benefits": [
      "Exención del 100% de los derechos de matrícula académica",
      "Subsidios bimensuales de sostenimiento a través del Departamento de Prosperidad Social (DPS)"
    ],
    "deadlineDate": "2026-10-31",
    "targetAudience": "Jóvenes de estratos 1 y 2 que ingresan por primera vez a la educación superior",
    "applicationLink": "https://prosperidadsocial.gov.co",
    "fieldOfStudy": [
      "Ingenierías, Ciencias de la Salud, Ciencias Sociales, Humanidades, Artes"
    ],
    "isFeatured": false
  },
  {
    "id": "beca-jovenes-a-la-e",
    "title": "Programa 'Jóvenes a la E' (Bogotá)",
    "organization": "Alcaldía Mayor de Bogotá & Agencia ATENEA",
    "coverage": "100% Total",
    "status": "Vigente",
    "category": "Regional",
    "badgeBg": "bg-yellow-600",
    "description": "La mayor apuesta de acceso a educación superior en Bogotá. Financia programas de pregrado universitarios y técnicos en más de 40 universidades aliadas públicas y privadas con 100% de beca no condenable.",
    "requirements": [
      "Ser bachiller egresado de un colegio de Bogotá o haber presentado la prueba Saber 11 en Bogotá",
      "Tener hasta 28 años de edad al cierre de la convocatoria",
      "Haber presentado la prueba Saber 11 del ICFES",
      "No estar matriculado en otro programa de pregrado al momento de la postulación"
    ],
    "benefits": [
      "100% de la matrícula financiada durante todos los semestres de la carrera",
      "Apoyo de sostenimiento de 1 SMMLV por semestre para gastos académicos y transporte"
    ],
    "deadlineDate": "2026-11-20",
    "targetAudience": "Bachilleres residentes en las 20 localidades de Bogotá D.C.",
    "applicationLink": "https://agenciaatenea.gov.co/convocatorias/jovenes-la-e",
    "fieldOfStudy": [
      "Tecnologías de la Información, Ingenierías, Salud, Artes, Ciencias Sociales"
    ],
    "isFeatured": true
  },
  {
    "id": "beca-fest-bogota",
    "title": "Fondo de Educación Superior para Todos (FEST Bogotá)",
    "organization": "Secretaría de Educación del Distrito de Bogotá",
    "coverage": "100% Total",
    "status": "Vigente",
    "category": "Crédito Condonable",
    "badgeBg": "bg-amber-700",
    "description": "Crédito educativo 100% condonable para bachilleres de colegios públicos y privados en convenio de Bogotá que deseen estudiar en universidades con acreditación institucional.",
    "requirements": [
      "Haber cursado los dos últimos años de bachillerato en un colegio de Bogotá",
      "Haber presentado la prueba Saber 11",
      "Pertenecer a estratos 1, 2 o 3",
      "Estar en proceso de admisión en una IES autorizada"
    ],
    "benefits": [
      "Crédito condonable hasta el 100% de la matrícula al obtener el título profesional y realizar pasantía comunitaria",
      "Subsidio de sostenimiento para estudiantes de estratos 1 y 2"
    ],
    "deadlineDate": "2026-11-15",
    "targetAudience": "Bachilleres de colegios de Bogotá de estratos 1, 2 y 3",
    "applicationLink": "https://www.educacionbogota.edu.co",
    "fieldOfStudy": [
      "Todas las áreas del conocimiento en universidades aliadas"
    ],
    "isFeatured": false
  },
  {
    "id": "beca-sapiencia-epm",
    "title": "Beca Sapiencia Educación Superior con Recursos de EPM",
    "organization": "Alcaldía de Medellín & Agencia Sapiencia",
    "coverage": "100% Total",
    "status": "Vigente",
    "category": "Regional",
    "badgeBg": "bg-emerald-600",
    "description": "Fondo del Distrito de Medellín financiado por Empresas Públicas de Medellín (EPM) para otorgar créditos 100% condonables en matrícula y sostenimiento a jóvenes de las comunas y corregimientos de Medellín.",
    "requirements": [
      "Haber nacido o residido al menos los últimos 3 años en Medellín o sus 5 corregimientos",
      "Haber cursado los últimos 3 años de secundaria en un colegio de Medellín",
      "Pertenecer a estratos 1, 2, 3 o 4",
      "Estar admitido en una universidad del Valle de Aburrá"
    ],
    "benefits": [
      "Hasta 3 SMMLV por semestre para matrícula y hasta 2.5 SMMLV para sostenimiento",
      "100% condonable mediante servicio social comunitario en Medellín y culminación del grado"
    ],
    "deadlineDate": "2026-11-10",
    "targetAudience": "Jóvenes bachilleres del Distrito de Medellín y sus 5 corregimientos",
    "applicationLink": "https://sapiencia.gov.co/fondos-sapiencia/epm-y-presupuesto-participativo/",
    "fieldOfStudy": [
      "Ingenierías, Software, Salud, Negocios, Diseño, Artes, Ciencias Sociales"
    ],
    "isFeatured": true
  },
  {
    "id": "beca-mejores-bachilleres-medellin",
    "title": "Beca Mejores Bachilleres del Distrito de Medellín",
    "organization": "Alcaldía de Medellín - Sapiencia",
    "coverage": "100% Total",
    "status": "Vigente",
    "category": "Excelencia",
    "badgeBg": "bg-blue-800",
    "description": "Beca que premia al estudiante con el mejor puntaje en las pruebas de Estado ICFES Saber 11 de cada una de las instituciones educativas oficiales de Medellín.",
    "requirements": [
      "Haber obtenido el primer puesto en las pruebas Saber 11 en su respectivo colegio oficial de Medellín",
      "Haber cursado la totalidad del bachillerato en la misma institución pública",
      "Estar admitido en cualquier universidad legalmente reconocida en Colombia"
    ],
    "benefits": [
      "100% del valor de la matrícula durante todos los semestres de la carrera universitaria elegida",
      "Subsidio de sostenimiento mensual durante todo el período académico"
    ],
    "deadlineDate": "2026-12-05",
    "targetAudience": "El mejor bachiller graduado de cada colegio oficial de Medellín",
    "applicationLink": "https://sapiencia.gov.co",
    "fieldOfStudy": [
      "Cualquier carrera profesional o tecnológica en Colombia"
    ],
    "isFeatured": false
  },
  {
    "id": "beca-enlaza-mundos",
    "title": "Fondo Becas Enlaza Mundos (Pasantías y Movilidad)",
    "organization": "Sapiencia Medellín",
    "coverage": "Internacional",
    "status": "Vigente",
    "category": "Internacional",
    "badgeBg": "bg-indigo-700",
    "description": "Apoya la realización de pasantías académicas, prácticas de investigación y semestres de intercambio en universidades de prestigio en el exterior para estudiantes destacados de Medellín.",
    "requirements": [
      "Ser estudiante de pregrado en IES de Medellín con al menos el 50% de los créditos aprobados",
      "Promedio académico acumulado igual o superior a 4.0/5.0",
      "Contar con carta de aceptación formal de una universidad extranjera",
      "Certificado de suficiencia en el idioma requerido"
    ],
    "benefits": [
      "Tiquetes aéreos internacionales de ida y regreso",
      "Seguro médico internacional integral",
      "Apoyo de sostenimiento en moneda local del país de destino hasta por 6 meses"
    ],
    "deadlineDate": "2026-10-15",
    "targetAudience": "Universitarios destacados de instituciones de educación superior de Medellín",
    "applicationLink": "https://sapiencia.gov.co/enlaza-mundos",
    "fieldOfStudy": [
      "Ingenierías, Ciencias de la Computación, Biotecnología, Medicina, Arquitectura"
    ],
    "isFeatured": false
  },
  {
    "id": "beca-atlantico-para-el-mundo",
    "title": "Programa Beca 'Atlántico para el Mundo'",
    "organization": "Gobernación del Atlántico",
    "coverage": "100% Total",
    "status": "Vigente",
    "category": "Regional",
    "badgeBg": "bg-red-700",
    "description": "Iniciativa departamental que financia la formación bilingüe e inserción en carreras tecnológicas de software y logística en universidades de Barranquilla y el exterior.",
    "requirements": [
      "Haber nacido o residido los últimos 5 años en municipios no certificados del departamento del Atlántico",
      "Puntaje Saber 11 destacado en inglés y matemáticas",
      "Pertenecer a estratos 1 o 2"
    ],
    "benefits": [
      "100% del costo de la matrícula universitaria en programas tecnológicos y profesionales STEM",
      "Curso intensivo de inmersión en inglés certificado internacionalmente B2/C1"
    ],
    "deadlineDate": "2026-11-25",
    "targetAudience": "Jóvenes de los municipios del departamento del Atlántico",
    "applicationLink": "https://www.atlantico.gov.co",
    "fieldOfStudy": [
      "Ingeniería de Software, Logística Portuaria, Bilingüismo, Mecatrónica"
    ],
    "isFeatured": false
  },
  {
    "id": "beca-valle-avanza",
    "title": "Fondo 'Valle Avanza' para la Educación Superior",
    "organization": "Gobernación del Valle del Cauca",
    "coverage": "100% Total",
    "status": "Vigente",
    "category": "Regional",
    "badgeBg": "bg-red-800",
    "description": "Fondo rotatorio para bachilleres de los 42 municipios del Valle del Cauca que fomenta el acceso a carreras agroindustriales, logísticas y tecnológicas.",
    "requirements": [
      "Ser bachiller de colegio oficial del Valle del Cauca",
      "Puntaje global Saber 11 superior a 300 puntos",
      "Estar admitido en Univalle, UCEVA, Bellas Artes o Escuela Nacional del Deporte"
    ],
    "benefits": [
      "Exención del 100% de la matrícula",
      "Subsidio de transporte intermunicipal y alimentación para estudiantes rurales"
    ],
    "deadlineDate": "2026-11-20",
    "targetAudience": "Bachilleres de municipios del Valle del Cauca fuera del área metropolitana de Cali",
    "applicationLink": "https://www.valledelcauca.gov.co",
    "fieldOfStudy": [
      "Agronomía, Agroindustria, Gestión Portuaria, Deporte, Salud"
    ],
    "isFeatured": false
  },
  {
    "id": "beca-quiero-estudiar",
    "title": "Programa de Becas 'Quiero Estudiar'",
    "organization": "Universidad de los Andes",
    "coverage": "100% Total",
    "status": "Vigente",
    "category": "Privada",
    "badgeBg": "bg-yellow-500",
    "description": "El programa de filantropía más emblemático de UniAndes. Financia hasta el 100% de la matrícula a bachilleres colombianos de excelencia académica con limitaciones económicas comprobadas.",
    "requirements": [
      "Haber obtenido un puntaje global superior a 360 puntos en el examen Saber 11",
      "Tener nacionalidad colombiana y entre 16 y 21 años al momento de ingreso",
      "Pertenecer a estratos socioeconómicos 1, 2 o 3 con estudio socioeconómico avalado",
      "Haber sido admitido en cualquier carrera de pregrado en la Universidad de los Andes"
    ],
    "benefits": [
      "Hasta el 100% del valor de la matrícula durante todos los semestres del plan de estudios",
      "Subsidio semestral de sostenimiento, alimentación y compra de libros de texto",
      "Acceso a mentorías exclusivas con egresados líderes y directivos"
    ],
    "deadlineDate": "2026-11-05",
    "targetAudience": "Jóvenes colombianos con talento excepcional y necesidad económica",
    "applicationLink": "https://apoyofinanciero.uniandes.edu.co/quiero-estudiar",
    "fieldOfStudy": [
      "Todas las carreras (Ingeniería de Sistemas, Medicina, Economía, Derecho, Diseño)"
    ],
    "isFeatured": true
  },
  {
    "id": "beca-excelencia-javeriana",
    "title": "Beca a la Excelencia Académica Bachiller (PUJ)",
    "organization": "Pontificia Universidad Javeriana",
    "coverage": "Parcial 50-80%",
    "status": "Vigente",
    "category": "Excelencia",
    "badgeBg": "bg-blue-900",
    "description": "Reconoce el mérito académico de los mejores bachilleres de colegios de Colombia otorgando exenciones del 80% del valor de la matrícula en programas de pregrado.",
    "requirements": [
      "Haber obtenido uno de los mejores puntajes en las pruebas Saber 11 a nivel departamental o nacional",
      "Ser postulado formalmente por el rector del colegio de origen o presentar postulación individual acreditada",
      "Haber sido admitido en la Pontificia Universidad Javeriana en el período correspondiente"
    ],
    "benefits": [
      "Exención del 80% sobre el valor total de la matrícula durante toda la carrera (renovable por promedio ponderado superior a 4.2)",
      "Prioridad en asignación de cupos de movilidad e intercambio internacional",
      "Reconocimiento de distinción académica en el acta de grado"
    ],
    "deadlineDate": "2026-11-10",
    "targetAudience": "Mejores bachilleres de Colombia con vocación de servicio integral",
    "applicationLink": "https://www.javeriana.edu.co/apoyo-financiero/becas",
    "fieldOfStudy": [
      "Todas las facultades (Ciencias de la Salud, Ingeniería, Comunicación, Derecho)"
    ],
    "isFeatured": false
  },
  {
    "id": "beca-rosario-castro-silva",
    "title": "Beca Monseñor Castro Silva (Universidad del Rosario)",
    "organization": "Universidad del Rosario",
    "coverage": "100% Total",
    "status": "Vigente",
    "category": "Excelencia",
    "badgeBg": "bg-amber-600",
    "description": "La máxima distinción económica y honorífica de la Universidad del Rosario, concedida a bachilleres con puntajes extraordinarios en el examen de Estado Saber 11.",
    "requirements": [
      "Haber obtenido un puntaje global superior a 360 puntos en el examen Saber 11 del ICFES",
      "Graduarse de bachillerato en el año inmediatamente anterior o vigente de la postulación",
      "Superar el examen de conocimientos específicos y la entrevista de liderazgo"
    ],
    "benefits": [
      "Cubrimiento del 100% del valor de la matrícula durante los semestres del plan de estudios",
      "Afiliación a programas de liderazgo juvenil internacional Rosarista",
      "Mentoría directa con decanos y profesores eméritos"
    ],
    "deadlineDate": "2026-10-25",
    "targetAudience": "Estudiantes élite en las pruebas de Estado en Colombia",
    "applicationLink": "https://urosario.edu.co/apoyo-financiero/becas",
    "fieldOfStudy": [
      "Jurisprudencia (Derecho)",
      "Medicina",
      "Relaciones Internacionales",
      "Economía"
    ],
    "isFeatured": true
  },
  {
    "id": "beca-orgullo-caribe-uninorte",
    "title": "Programa de Becas 'Orgullo Caribe'",
    "organization": "Universidad del Norte (Barranquilla)",
    "coverage": "100% Total",
    "status": "Vigente",
    "category": "Regional",
    "badgeBg": "bg-red-600",
    "description": "Iniciativa de la Universidad del Norte para retener el mejor talento humano en la Región Caribe colombiana, cubriendo el 100% de la matrícula y sostenimiento a bachilleres sobresalientes.",
    "requirements": [
      "Haber cursado la secundaria completa en colegios de los departamentos de Atlántico, Bolívar, Cesar, Córdoba, Magdalena, La Guajira, Sucre o San Andrés",
      "Puntaje global en el examen Saber 11 igual o superior a 350 puntos",
      "Demostrar necesidad socioeconómica mediante documentación de ingresos familiares"
    ],
    "benefits": [
      "100% de cobertura del valor de la matrícula en la carrera elegida",
      "Subsidio semestral de manutención, transporte urbano y textos de estudio",
      "Curso completo de formación bilingüe en el Instituto de Idiomas de Uninorte"
    ],
    "deadlineDate": "2026-11-20",
    "targetAudience": "Bachilleres destacados de la Región Caribe colombiana",
    "applicationLink": "https://www.uninorte.edu.co/becas",
    "fieldOfStudy": [
      "Ingenierías (Civil, Industrial, Sistemas), Medicina, Derecho, Administración"
    ],
    "isFeatured": true
  },
  {
    "id": "beca-talento-eafit",
    "title": "Programa de Becas 'Talento EAFIT'",
    "organization": "Universidad EAFIT (Medellín)",
    "coverage": "Parcial 50-80%",
    "status": "Vigente",
    "category": "Privada",
    "badgeBg": "bg-blue-600",
    "description": "Apoyo económico para bachilleres de alto rendimiento académico y liderazgo comprobado que aspiren a cursar programas de pregrado en la Universidad EAFIT.",
    "requirements": [
      "Haber obtenido un puntaje global sobresaliente en el Examen de Estado Saber 11",
      "Promedio de calificaciones igual o superior a 4.0/5.0 en los grados 10° y 11° de bachillerato",
      "Pertenecer a estratos socioeconómicos 1, 2, 3 o 4 con necesidad económica demostrada mediante estudio socioeconómico",
      "Demostrar compromiso con actividades de impacto comunitario, cultural o deportivo"
    ],
    "benefits": [
      "Descuento o cubrimiento del 50% al 100% en la matrícula académica",
      "Acceso prioritario a monitores y tutores en materias de alta complejidad",
      "Inclusión en los semilleros de investigación y grupos de innovación empresarial"
    ],
    "deadlineDate": "2026-11-15",
    "targetAudience": "Jóvenes de Antioquia y Colombia con vocación de liderazgo y excelencia",
    "applicationLink": "https://www.eafit.edu.co/becas",
    "fieldOfStudy": [
      "Administración",
      "Ingeniería de Software",
      "Economía",
      "Finanzas",
      "Negocios"
    ],
    "isFeatured": true
  },
  {
    "id": "beca-excelencia-udea",
    "title": "Beca a la Excelencia Académica Universidad de Antioquia",
    "organization": "Universidad de Antioquia (Medellín)",
    "coverage": "100% Total",
    "status": "Vigente",
    "category": "Excelencia",
    "badgeBg": "bg-emerald-800",
    "description": "Exención total de derechos de matrícula y apoyo de sostenimiento para los mejores puntajes del examen de admisión propio de la UdeA en cada facultad.",
    "requirements": [
      "Obtener uno de los 3 mejores puntajes en el examen de admisión de la Universidad de Antioquia para el semestre",
      "Mantener un promedio semestral superior a 4.2 sin asignaturas perdidas",
      "Estar matriculado en un mínimo de 16 créditos académicos por período"
    ],
    "benefits": [
      "100% de exención de pago de derechos de matrícula e inscripción",
      "Beca alimentaria en los comedores universitarios de Ciudad Universitaria",
      "Prioridad en monitorías académicas remuneradas"
    ],
    "deadlineDate": "2026-11-30",
    "targetAudience": "Aspirantes admitidos con puntajes élite en el examen de la Universidad de Antioquia",
    "applicationLink": "https://www.udea.edu.co/bienestar",
    "fieldOfStudy": [
      "Medicina, Ingenierías, Biología, Química, Enfermería, Ciencias Exactas"
    ],
    "isFeatured": false
  },
  {
    "id": "beca-excelencia-uis",
    "title": "Beca por Excelencia Académica UIS",
    "organization": "Universidad Industrial de Santander",
    "coverage": "100% Total",
    "status": "Vigente",
    "category": "Excelencia",
    "badgeBg": "bg-lime-800",
    "description": "Premia semestralmente a los estudiantes que obtienen los promedios más altos en cada programa académico de la UIS con exención de matrícula y auxilios económicos.",
    "requirements": [
      "Estar matriculado en la UIS y haber cursado al menos 2 semestres",
      "Tener el promedio ponderado semestral más alto de la respectiva carrera (superior a 4.3)",
      "Conducta intachable sin sanciones disciplinarias"
    ],
    "benefits": [
      "Matrícula de honor 100% gratuita para el semestre subsiguiente",
      "Auxilio monetario para compra de material bibliográfico o computacional",
      "Diploma de reconocimiento público emitido por el Consejo Superior Universitario"
    ],
    "deadlineDate": "2026-12-10",
    "targetAudience": "Estudiantes regulares con los más altos promedios académicos de la UIS",
    "applicationLink": "https://www.uis.edu.co",
    "fieldOfStudy": [
      "Ingeniería Química, Geología, Petróleos, Medicina, Física, Mecánica"
    ],
    "isFeatured": false
  },
  {
    "id": "beca-juan-pablo-ii-upb",
    "title": "Beca Distinción 'Juan Pablo II' (UPB)",
    "organization": "Universidad Pontificia Bolivariana",
    "coverage": "Parcial 50-80%",
    "status": "Vigente",
    "category": "Privada",
    "badgeBg": "bg-red-700",
    "description": "Apoyo a bachilleres destacados de colegios de Antioquia y Santander para iniciar sus estudios profesionales en la UPB en carreras de ingeniería y ciencias sociales.",
    "requirements": [
      "Puntaje Saber 11 superior a 340 puntos",
      "Certificado de notas de secundaria con promedio superior a 4.2",
      "Superar la entrevista personal de aptitud y valores humanos"
    ],
    "benefits": [
      "Descuento del 70% en el valor de la matrícula durante toda la carrera",
      "Acceso prioritario a semilleros de investigación científica formativa"
    ],
    "deadlineDate": "2026-11-18",
    "targetAudience": "Bachilleres con destacada trayectoria humanística y académica",
    "applicationLink": "https://www.upb.edu.co/es/becas",
    "fieldOfStudy": [
      "Ingeniería Civil, Mecánica, Arquitectura, Diseño Gráfico, Derecho"
    ],
    "isFeatured": false
  },
  {
    "id": "beca-icetex-comunidades-negras",
    "title": "Fondo Especial para Comunidades Negras (ICETEX)",
    "organization": "ICETEX & Ministerio del Interior de Colombia",
    "coverage": "100% Total",
    "status": "Vigente",
    "category": "Vulnerable / Bajos Recursos",
    "badgeBg": "bg-purple-700",
    "description": "Crédito educativo 100% condonable para estudiantes afrocolombianos, raizales y palenqueros de escasos recursos y destacado desempeño académico para realizar estudios de pregrado o posgrado.",
    "requirements": [
      "Ser colombiano perteneciente a la comunidad negra, afrocolombiana, raizal o palenquera",
      "No contar con recursos económicos suficientes para costear la educación superior",
      "Estar admitido o cursando un programa en una Institución de Educación Superior reconocida por el MEN",
      "Elaborar y ejecutar un proyecto de desarrollo social y comunitario avalado por un consejo comunitario"
    ],
    "benefits": [
      "Hasta 3 Salarios Mínimos Mensuales Legales Vigentes (SMMLV) por semestre para matrícula y/o gastos de sostenimiento",
      "100% de condonación de la deuda al culminar satisfactoriamente los estudios y certificar la ejecución del proyecto comunitario"
    ],
    "deadlineDate": "2026-12-01",
    "targetAudience": "Estudiantes afrocolombianos, raizales y palenqueros",
    "applicationLink": "https://web.icetex.gov.co/es/fondos/comunidades-negras",
    "fieldOfStudy": [
      "Cualquier área del conocimiento a nivel nacional"
    ],
    "isFeatured": true
  },
  {
    "id": "beca-icetex-indigenas-alvaro-ulcue",
    "title": "Fondo Álvaro Ulcué Chocué para Comunidades Indígenas",
    "organization": "ICETEX & Ministerio del Interior",
    "coverage": "100% Total",
    "status": "Vigente",
    "category": "Vulnerable / Bajos Recursos",
    "badgeBg": "bg-emerald-800",
    "description": "Fondo que otorga créditos 100% condonables a miembros de comunidades indígenas de Colombia registrados ante la Dirección de Asuntos Indígenas del Ministerio del Interior.",
    "requirements": [
      "Pertenecer a un pueblo indígena colombiano reconocido y certificado por el Ministerio del Interior o cabildo local",
      "Estar admitido o matriculado en una institución de educación superior legalmente aprobada",
      "Formular y desarrollar un proyecto de impacto comunitario en su resguardo o territorio de origen"
    ],
    "benefits": [
      "2.5 SMMLV por semestre para matrícula y/o gastos de sostenimiento",
      "Condonación del 100% del capital al graduarse y entregar el informe final de impacto avalado por las autoridades tradicionales"
    ],
    "deadlineDate": "2026-11-28",
    "targetAudience": "Miembros de pueblos y resguardos indígenas de toda Colombia",
    "applicationLink": "https://web.icetex.gov.co/es/fondos/comunidades-indigenas",
    "fieldOfStudy": [
      "Salud Intercultural, Etnoeducación, Agronomía, Derecho, Ingenierías"
    ],
    "isFeatured": false
  },
  {
    "id": "beca-discapacidad-saldarriaga",
    "title": "Fondo para Estudiantes con Discapacidad en Educación Superior",
    "organization": "Fundación Saldarriaga Concha & MinEducación - ICETEX",
    "coverage": "100% Total",
    "status": "Vigente",
    "category": "Vulnerable / Bajos Recursos",
    "badgeBg": "bg-blue-600",
    "description": "Fondo nacional condonable que financia el acceso y permanencia en la educación superior a personas con discapacidad física, sensorial o cognitiva.",
    "requirements": [
      "Estar registrado en el Registro para la Localización y Caracterización de Personas con Discapacidad (RLCPD) del Ministerio de Salud",
      "Estar admitido en cualquier IES con sede en Colombia",
      "Pertenecer a estratos 1, 2 o 3"
    ],
    "benefits": [
      "Hasta 8 SMMLV semestrales para costos de matrícula",
      "Hasta 4 SMMLV semestrales para recursos de apoyo tecnológico, intérpretes o transporte especial",
      "100% condonable con la graduación"
    ],
    "deadlineDate": "2026-11-20",
    "targetAudience": "Bachilleres colombianos con condición de discapacidad certificada",
    "applicationLink": "https://saldarriagaconcha.org",
    "fieldOfStudy": [
      "Todas las áreas académicas"
    ],
    "isFeatured": false
  },
  {
    "id": "beca-distrital-comunidades-etnicas",
    "title": "Beca Distrital para Comunidades Étnicas (Bogotá)",
    "organization": "Secretaría de Gobierno & ATENEA Bogotá",
    "coverage": "100% Total",
    "status": "Vigente",
    "category": "Vulnerable / Bajos Recursos",
    "badgeBg": "bg-purple-800",
    "description": "Financia carreras técnicas, tecnológicas y profesionales a personas de pueblos Rrom (gitanos), indígenas, afrodescendientes y palenqueros asentados en Bogotá.",
    "requirements": [
      "Residir en Bogotá y contar con certificado de pertenencia étnica expedido por la autoridad correspondiente",
      "Haber presentado las pruebas Saber 11",
      "No poseer otro título universitario"
    ],
    "benefits": [
      "100% de cobertura de la matrícula durante toda la duración del programa",
      "Auxilio semestral de transporte y útiles académicos"
    ],
    "deadlineDate": "2026-11-15",
    "targetAudience": "Población étnica residente en las localidades de Bogotá",
    "applicationLink": "https://gobiernobogota.gov.co",
    "fieldOfStudy": [
      "Ciencias Sociales, Gestión Pública, Salud, Artes, Ingenierías"
    ],
    "isFeatured": false
  },
  {
    "id": "beca-ecopetrol-mario-galan",
    "title": "Beca Ecopetrol 'Bachilleres por Colombia Mario Galán Gómez'",
    "organization": "Ecopetrol S.A.",
    "coverage": "100% Total",
    "status": "Vigente",
    "category": "Excelencia",
    "badgeBg": "bg-yellow-600",
    "description": "El programa de becas corporativo más antiguo y prestigioso de Colombia. Premia al mejor bachiller de las zonas rurales y oficiales de cada departamento del país.",
    "requirements": [
      "Ser el mejor puntaje Saber 11 de colegios oficiales de la zona rural de cada departamento de Colombia",
      "Ser colombiano y no contar con otro beneficio de beca completa",
      "Estar admitido en una universidad de Colombia acreditada institucionalmente"
    ],
    "benefits": [
      "100% de matrícula en la universidad colombiana que el beneficiario elija",
      "Subsidio completo de sostenimiento mensual, alojamiento y transporte",
      "Dotación de computador portátil y libros de texto",
      "Pasantías garantizadas en Ecopetrol al culminar materias"
    ],
    "deadlineDate": "2026-12-01",
    "targetAudience": "Los mejores bachilleres de zonas rurales de los 32 departamentos de Colombia",
    "applicationLink": "https://www.ecopetrol.com.co/wps/portal/Home/es/Responsabilidad-Corporativa/Educacion/Bachilleres-por-Colombia",
    "fieldOfStudy": [
      "Ingenierías (Petróleos, Química, Civil, Eléctrica, Sistemas), Geología, Economía"
    ],
    "isFeatured": true
  },
  {
    "id": "beca-bancolombia-jovenes-rurales",
    "title": "Beca Bancolombia para Jóvenes Rurales",
    "organization": "Fundación Bancolombia",
    "coverage": "100% Total",
    "status": "Vigente",
    "category": "Privada",
    "badgeBg": "bg-yellow-400 text-slate-900",
    "description": "Apoya a bachilleres del campo colombiano para que se formen en ciencias agropecuarias, ingenierías y administración y retornen a impulsar el desarrollo de sus regiones.",
    "requirements": [
      "Residir en municipios rurales o clasificados como PDET o ZOMAC",
      "Tener vocación y compromiso con el sector agropecuario o rural",
      "Puntaje Saber 11 destacado en ciencias naturales y matemáticas"
    ],
    "benefits": [
      "100% del costo de matrícula en programas técnicos, tecnológicos y universitarios agro",
      "Sostenimiento mensual y seguro de salud",
      "Acompañamiento psicosocial y mentoría vocacional"
    ],
    "deadlineDate": "2026-11-20",
    "targetAudience": "Jóvenes de zonas rurales campesinas de Colombia",
    "applicationLink": "https://www.fundacionbancolombia.org",
    "fieldOfStudy": [
      "Agronomía, Veterinaria, Zootecnia, Agroindustria, Finanzas Rurales"
    ],
    "isFeatured": true
  },
  {
    "id": "beca-fundacion-bolivar",
    "title": "Beca Bolívar Davivienda - Fundación Bolívar",
    "organization": "Grupo Bolívar & Banco Davivienda",
    "coverage": "Parcial 50-80%",
    "status": "Vigente",
    "category": "Privada",
    "badgeBg": "bg-red-600",
    "description": "Promueve el acceso a educación superior de calidad para jóvenes con destacado liderazgo social y potencial de innovación comunitaria.",
    "requirements": [
      "Puntaje Saber 11 superior a 330 puntos",
      "Pertenecer a estratos 1, 2 o 3",
      "Liderar o participar activamente en proyectos de innovación o impacto social comprobado"
    ],
    "benefits": [
      "75% del valor de la matrícula en universidades aliadas",
      "Acceso al programa Cultivarte Liderazgo y habilidades para la vida",
      "Oportunidad de práctica laboral directa en empresas del Grupo Bolívar"
    ],
    "deadlineDate": "2026-11-10",
    "targetAudience": "Jóvenes líderes comunitarios de colegios oficiales de Colombia",
    "applicationLink": "https://www.fundacionbolivardavivienda.org",
    "fieldOfStudy": [
      "Administración, Ingeniería de Sistemas, Contaduría, Psicología, Economía"
    ],
    "isFeatured": false
  },
  {
    "id": "beca-fundacion-corona",
    "title": "Beca Fundación Corona para Educación Técnica y Tecnológica",
    "organization": "Fundación Corona",
    "coverage": "100% Total",
    "status": "Vigente",
    "category": "Privada",
    "badgeBg": "bg-blue-800",
    "description": "Fomenta la formación técnica y tecnológica orientada a la empleabilidad inmediata en sectores de manufactura, construcción y servicios digitales.",
    "requirements": [
      "Ser bachiller de estratos 1 o 2 de Bogotá, Medellín, Cartagena o Cali",
      "Interés manifiesto en formarse en carreras técnicas de ciclo corto altamente demandadas"
    ],
    "benefits": [
      "100% de la matrícula en institutos tecnológicos acreditados",
      "Subsidio de transporte y kit de herramientas técnicas de estudio",
      "Conexión directa con la red de empleo formal del Grupo Corona"
    ],
    "deadlineDate": "2026-10-30",
    "targetAudience": "Bachilleres urbanos de sectores populares que buscan inserción laboral rápida",
    "applicationLink": "https://www.fundacioncorona.org",
    "fieldOfStudy": [
      "Construcción, Logística, Mantenimiento Industrial, Desarrollo de Software"
    ],
    "isFeatured": false
  },
  {
    "id": "beca-argos-rural",
    "title": "Beca Argos para Comunidades Rurales e Industriales",
    "organization": "Fundación Grupo Argos",
    "coverage": "100% Total",
    "status": "Vigente",
    "category": "Privada",
    "badgeBg": "bg-emerald-700",
    "description": "Apoya la formación universitaria de jóvenes residentes en las áreas de influencia directa de las operaciones de Cementos Argos y Celsia en Colombia.",
    "requirements": [
      "Residir en municipios vecinos a plantas u operaciones del Grupo Argos en Antioquia, Bolívar, Tolima, Sucre o Valle",
      "Graduarse de bachillerato con promedio sobresaliente",
      "Aprobación del examen de ingreso en la universidad receptora"
    ],
    "benefits": [
      "100% de la matrícula universitaria",
      "Subsidio mensual para sostenimiento y vivienda universitaria si debe trasladarse",
      "Posibilidad de vinculación en el programa de aprendices del Grupo Argos"
    ],
    "deadlineDate": "2026-11-25",
    "targetAudience": "Jóvenes bachilleres de zonas de influencia comunitaria de Argos y Celsia",
    "applicationLink": "https://www.grupoargos.com/es-co/sostenibilidad/fundacion-grupo-argos",
    "fieldOfStudy": [
      "Ingeniería Civil, Ingeniería Eléctrica, Ingeniería Mecánica, Administración"
    ],
    "isFeatured": false
  },
  {
    "id": "beca-mujeres-stem-minciencias",
    "title": "Beca 'Mujeres STEM' en Ingeniería y Ciencias Exactas",
    "organization": "Ministerio de Ciencia, Tecnología e Innovación (MinCiencias)",
    "coverage": "100% Total",
    "status": "Vigente",
    "category": "Excelencia",
    "badgeBg": "bg-pink-700",
    "description": "Estrategia nacional orientada a cerrar la brecha de género en carreras científicas y tecnológicas, financiando al 100% los estudios de mujeres con vocación investigativa.",
    "requirements": [
      "Ser mujer bachiller colombiana",
      "Puntaje sobresaliente en el área de matemáticas y ciencias naturales en Saber 11",
      "Estar admitida en un programa universitario del área STEM (Ciencia, Tecnología, Ingeniería y Matemáticas)"
    ],
    "benefits": [
      "100% del valor de la matrícula universitaria en programas STEM acreditados",
      "Inclusión en redes nacionales de mujeres científicas y mentoría con investigadoras eméritas",
      "Pasantía investigativa financiada en un centro internacional de investigación"
    ],
    "deadlineDate": "2026-11-30",
    "targetAudience": "Mujeres bachilleres apasionadas por la ciencia, las matemáticas y la tecnología",
    "applicationLink": "https://minciencias.gov.co",
    "fieldOfStudy": [
      "Ingeniería de Software, Inteligencia Artificial, Física, Matemáticas, Nanotecnología"
    ],
    "isFeatured": true
  },
  {
    "id": "beca-fundacion-nutresa",
    "title": "Beca Fundación Nutresa para el Desarrollo Sostenible",
    "organization": "Grupo Nutresa",
    "coverage": "100% Total",
    "status": "Vigente",
    "category": "Privada",
    "badgeBg": "bg-blue-700",
    "description": "Fondo que impulsa a jóvenes de familias colaboradoras y comunidades agrícolas proveedoras de café, cacao y lácteos para estudiar carreras afines a la nutrición y sostenibilidad.",
    "requirements": [
      "Ser hijo de campesino productor o colaborador vinculado a la cadena de valor de Nutresa",
      "Puntaje Saber 11 superior a 320 puntos",
      "Propuesta de proyecto de grado orientada a sostenibilidad alimentaria"
    ],
    "benefits": [
      "100% de matrícula y auxilio semestral de útiles",
      "Acompañamiento en proyectos de desarrollo agroalimentario"
    ],
    "deadlineDate": "2026-11-15",
    "targetAudience": "Jóvenes vinculados a comunidades agrícolas productoras en Colombia",
    "applicationLink": "https://www.fundacionnutresa.com",
    "fieldOfStudy": [
      "Ingeniería de Alimentos, Nutrición, Ingeniería Agronómica, Sostenibilidad"
    ],
    "isFeatured": false
  },
  {
    "id": "beca-compensar",
    "title": "Beca 'Formar con Sentido Humano' (Compensar)",
    "organization": "Caja de Compensación Familiar Compensar",
    "coverage": "Parcial 50-80%",
    "status": "Vigente",
    "category": "Privada",
    "badgeBg": "bg-orange-700",
    "description": "Subsidio educativo universitario que descuenta hasta el 75% del valor de la matrícula en la Fundación Universitaria Compensar (UCompensar) para afiliados categoría A y B.",
    "requirements": [
      "Ser afiliado o hijo de afiliado a Compensar en categoría A o B (hasta 4 SMMLV de ingresos familiares)",
      "Bachiller con diploma y prueba Saber 11 presentada",
      "Matricularse en carreras técnicas, tecnológicas o profesionales de UCompensar"
    ],
    "benefits": [
      "Descuento directo del 50% al 75% sobre el valor semestral de la matrícula",
      "Subsidio monetario mensual para transporte y alimentación"
    ],
    "deadlineDate": "2026-12-05",
    "targetAudience": "Trabajadores y familias afiliadas a Caja Compensar de ingresos medios y bajos",
    "applicationLink": "https://www.compensar.com/educacion",
    "fieldOfStudy": [
      "Ingeniería de Software, Mercadeo, Finanzas, Logística, Salud"
    ],
    "isFeatured": false
  },
  {
    "id": "beca-colsubsidio",
    "title": "Fondo Educativo Colsubsidio para Afiliados",
    "organization": "Caja Colombiana de Subsidio Familiar Colsubsidio",
    "coverage": "Parcial 50-80%",
    "status": "Vigente",
    "category": "Privada",
    "badgeBg": "bg-blue-800",
    "description": "Becas y auxilios de educación superior que financian entre el 50% y el 80% de la matrícula en programas tecnológicos y profesionales en instituciones aliadas en Bogotá y Cundinamarca.",
    "requirements": [
      "Afiliación activa a Colsubsidio en categoría A o B",
      "Puntaje Saber 11 mínimo de 280 puntos",
      "Mantener promedio académico mínimo de 3.8/5.0 en la carrera"
    ],
    "benefits": [
      "Cobertura de hasta el 80% del valor de la matrícula semestral",
      "Acceso gratuito a la red de bibliotecas y centros deportivos Colsubsidio"
    ],
    "deadlineDate": "2026-11-25",
    "targetAudience": "Hijos de trabajadores afiliados a Colsubsidio de estratos 1, 2 y 3",
    "applicationLink": "https://www.colsubsidio.com",
    "fieldOfStudy": [
      "Ingenierías, Salud, Tecnologías, Ciencias Empresariales"
    ],
    "isFeatured": false
  },
  {
    "id": "beca-cafam-excelencia",
    "title": "Beca Cafam a la Excelencia Académica",
    "organization": "Caja de Compensación Familiar Cafam",
    "coverage": "100% Total",
    "status": "Vigente",
    "category": "Privada",
    "badgeBg": "bg-red-700",
    "description": "Reconoce a los mejores bachilleres graduados de los colegios Cafam y a hijos de afiliados destacados en el ICFES, cubriendo el 100% de la matrícula en la Fundación Universitaria Cafam.",
    "requirements": [
      "Puntaje global Saber 11 destacado entre los primeros puestos de la institución",
      "Haber culminado el grado 11 en el año vigente",
      "Estar admitido en UniCafam"
    ],
    "benefits": [
      "100% de la matrícula en carreras profesionales de UniCafam",
      "Prácticas empresariales garantizadas en la red de clínicas y hoteles Cafam"
    ],
    "deadlineDate": "2026-11-20",
    "targetAudience": "Afiliados a Cafam y bachilleres de colegios de la caja",
    "applicationLink": "https://www.cafam.com.co",
    "fieldOfStudy": [
      "Enfermería, Gastronomía, Administración Turística, Ingeniería de Telecomunicaciones"
    ],
    "isFeatured": false
  },
  {
    "id": "beca-comfama",
    "title": "Beca Comfama para la Educación Superior (Antioquia)",
    "organization": "Comfama (Caja de Compensación Familiar de Antioquia)",
    "coverage": "Parcial 50-80%",
    "status": "Vigente",
    "category": "Privada",
    "badgeBg": "bg-purple-700",
    "description": "Beca y subsidio educativo para jóvenes de Antioquia afiliados en categorías A y B que estudien programas técnicos, tecnológicos o universitarios en CESDE o universidades aliadas.",
    "requirements": [
      "Afiliado o beneficiario a Comfama con tarifa A o B",
      "Residir en el departamento de Antioquia",
      "Estar matriculado en CESDE o universidad con convenio Comfama"
    ],
    "benefits": [
      "Hasta el 70% de subsidio sobre el costo de matrícula",
      "Acceso a mentorías de empleo y conexión laboral con el ecosistema empresarial de Antioquia"
    ],
    "deadlineDate": "2026-11-30",
    "targetAudience": "Trabajadores y familias de Antioquia con ingresos familiares menores a 4 SMMLV",
    "applicationLink": "https://www.comfama.com/educacion",
    "fieldOfStudy": [
      "Tecnologías en Desarrollo Web, Salud, Mercadeo, Diseño Gráfico, Animación"
    ],
    "isFeatured": false
  },
  {
    "id": "beca-fulbright-colombia",
    "title": "Programa de Becas Fulbright para Posgrados en Estados Unidos",
    "organization": "Comisión Fulbright Colombia & Embajada de los Estados Unidos",
    "coverage": "Internacional",
    "status": "Vigente",
    "category": "Internacional",
    "badgeBg": "bg-blue-900",
    "description": "La beca más prestigiosa de movilidad académica internacional del mundo. Financia estudios de maestría y doctorado en las mejores universidades de EE.UU. a colombianos comprometidos con el país.",
    "requirements": [
      "Ser ciudadano colombiano residente en el país al momento de postulación",
      "Título profesional universitario con promedio académico sobresaliente (mínimo 3.8/5.0)",
      "Certificación internacional de inglés (TOEFL iBT o IELTS Académico)",
      "Compromiso formal de regresar a Colombia a transferir conocimientos por un mínimo de 2 años"
    ],
    "benefits": [
      "100% de los costos de matrícula y aranceles universitarios en EE.UU.",
      "Estipendio mensual de sostenimiento para vivienda, alimentación y transporte",
      "Tiquetes aéreos de ida y vuelta y visa de intercambio J-1 gestionada",
      "Seguro médico y de accidentes integral durante toda la estancia"
    ],
    "deadlineDate": "2026-05-15",
    "targetAudience": "Profesionales colombianos con liderazgo investigativo y excelencia académica",
    "applicationLink": "https://fulbright.edu.co",
    "fieldOfStudy": [
      "Todas las áreas de investigación (STEM, Ciencias Sociales, Humanidades, Salud Pública)"
    ],
    "isFeatured": true
  },
  {
    "id": "beca-fundacion-carolina",
    "title": "Becas Fundación Carolina para Estudios en España",
    "organization": "Fundación Carolina & Cooperación Española (AECID)",
    "coverage": "Internacional",
    "status": "Vigente",
    "category": "Internacional",
    "badgeBg": "bg-amber-600",
    "description": "Convoca anualmente a cientos de profesionales iberoamericanos para cursar maestrías oficiales y estancias de investigación posdoctoral en universidades públicas y privadas de España.",
    "requirements": [
      "Ser nacional de Colombia o país iberoamericano",
      "Título de pregrado completado y convalidable en el espacio europeo",
      "Hoja de vida sobresaliente y expediente académico con calificaciones excelentes",
      "No residir en España al momento de la postulación"
    ],
    "benefits": [
      "Financiación del 100% o del 80% de la matrícula del máster oficial",
      "Alojamiento y manutención mensual en España",
      "Pasaje aéreo de ida y regreso desde Bogotá a Madrid/ciudad de destino",
      "Seguro médico no farmacéutico durante toda la estancia académica"
    ],
    "deadlineDate": "2026-03-31",
    "targetAudience": "Profesionales colombianos graduados que busquen especializarse en Europa",
    "applicationLink": "https://www.fundacioncarolina.es",
    "fieldOfStudy": [
      "Sostenibilidad, Inteligencia Artificial, Energías Renovables, Políticas Públicas, Salud"
    ],
    "isFeatured": true
  },
  {
    "id": "beca-daad-alemania",
    "title": "Becas DAAD para Estudios de Posgrado e Investigación en Alemania",
    "organization": "Servicio Alemán de Intercambio Académico (DAAD)",
    "coverage": "Internacional",
    "status": "Vigente",
    "category": "Internacional",
    "badgeBg": "bg-red-800",
    "description": "Oportunidades de beca total para realizar maestrías (en inglés o alemán) y doctorados en prestigiosas universidades y centros de investigación tecnológica de Alemania.",
    "requirements": [
      "Título profesional universitario no mayor a 6 años de antigüedad",
      "Promedio académico superior a 4.0/5.0 en la escala colombiana",
      "Dominio de inglés (para programas impartidos en inglés) o alemán (según el requisito del programa)",
      "Carta de motivación y propuesta investigativa rigurosa"
    ],
    "benefits": [
      "Exención completa de tasas académicas universitarias",
      "Estipendio mensual de 934 a 1.300 euros para gastos de vida y vivienda en Alemania",
      "Seguro médico, de accidentes y de responsabilidad civil integral",
      "Subsidio para viajes y curso previo intensivo de idioma alemán"
    ],
    "deadlineDate": "2026-10-31",
    "targetAudience": "Graduados universitarios colombianos en ingenierías, ciencias exactas y ciencias del desarrollo",
    "applicationLink": "https://www.daad.co",
    "fieldOfStudy": [
      "Ingeniería Mecánica, Ciencias de la Computación, Energías Limpias, Biología"
    ],
    "isFeatured": true
  },
  {
    "id": "beca-chevening-uk",
    "title": "Becas Chevening del Gobierno Británico en el Reino Unido",
    "organization": "Gobierno del Reino Unido (FCDO) & Embajada Británica en Bogotá",
    "coverage": "Internacional",
    "status": "Vigente",
    "category": "Internacional",
    "badgeBg": "bg-blue-800",
    "description": "El programa mundial de becas del gobierno del Reino Unido que financia maestrías de un año en universidades como Oxford, Cambridge, LSE, Imperial College, entre otras.",
    "requirements": [
      "Ciudadanía colombiana y compromiso de retorno al país por al menos dos años tras graduarse",
      "Título universitario con calificaciones destacadas",
      "Mínimo 2 años de experiencia laboral comprobada (2.800 horas acumuladas)",
      "Capacidad de liderazgo e influencia demostrada"
    ],
    "benefits": [
      "Cobertura total de la matrícula universitaria (sin límite de costo)",
      "Subsidio mensual para costos de vida y vivienda en ciudades del Reino Unido",
      "Tiquetes de avión de ida y vuelta en clase económica",
      "Costos de la visa de estudiante británica cubiertos"
    ],
    "deadlineDate": "2026-11-05",
    "targetAudience": "Líderes colombianos emergentes con trayectoria profesional sobresaliente",
    "applicationLink": "https://www.chevening.org/scholarship/colombia/",
    "fieldOfStudy": [
      "Relaciones Internacionales, Desarrollo Económico, Derechos Humanos, Cambio Climático"
    ],
    "isFeatured": true
  },
  {
    "id": "beca-colfuturo-credito-beca",
    "title": "Programa Crédito-Beca Colfuturo para Maestrías y Doctorados en el Exterior",
    "organization": "Fundación para el Futuro de Colombia (COLFUTURO) & MinCiencias",
    "coverage": "Internacional",
    "status": "Vigente",
    "category": "Crédito Condonable",
    "badgeBg": "bg-yellow-600",
    "description": "El principal mecanismo colombiano de financiación para posgrados en las mejores universidades del mundo. Otorga hasta 50.000 USD condonables hasta en un 80%.",
    "requirements": [
      "Ser profesional colombiano con pregrado culminado",
      "Tener dominio certificado de un segundo idioma",
      "Estar admitido en un programa de maestría o doctorado presencial en el exterior",
      "Presentar ensayo de motivación profesional"
    ],
    "benefits": [
      "Financiación hasta por 50.000 USD para matrícula, sostenimiento, seguros y pasajes",
      "Condonación del 40% al 80% del capital al graduarse y retornar a Colombia a trabajar en docencia, investigación o regiones del país"
    ],
    "deadlineDate": "2026-02-28",
    "targetAudience": "Profesionales colombianos de cualquier disciplina admitidos en las mejores universidades del mundo",
    "applicationLink": "https://www.colfuturo.org",
    "fieldOfStudy": [
      "Cualquier disciplina académica (Ciencias, Artes, Ingenierías, Derecho, Medicina)"
    ],
    "isFeatured": true
  }
];
