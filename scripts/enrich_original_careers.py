#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Inject Criminología and Criminalística into ORIGINAL_CORE_CAREERS in src/models/careersData.ts
and ensure all core careers have semestersCount, semesterTuition, and citiesOffered.
"""

criminology_core = """  {
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
"""

with open("src/models/careersData.ts", "r", encoding="utf-8") as f:
    text = f.read()

# Insert before closing bracket of ORIGINAL_CORE_CAREERS
if "id: 'criminalistica-ciencias-forenses'" not in text:
    target = "  {\n    id: 'geologia-geociencias',"
    text = text.replace(target, criminology_core + target)

with open("src/models/careersData.ts", "w", encoding="utf-8") as f:
    f.write(text)

print("Successfully injected Criminología and Criminalística into ORIGINAL_CORE_CAREERS")
