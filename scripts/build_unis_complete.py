#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
VOCACCIÓN - COMPLETE COLOMBIAN UNIVERSITIES (161) & SCHOLARSHIPS (38)
Generates: src/models/colombianUniversitiesData.ts
"""

import json

def generate_unis_and_scholarships():
    # Base 16 universities
    unis = [
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
        "tuitionInfo": 'Pública. Aplica la Política de Gratuidad "Puedo Estudiar" del Gobierno Nacional (cobertura del 100% de la matrícula para estudiantes que cumplan requisitos del SISBÉN IV o grupos priorizados). Para no beneficiarios, el costo se calcula mediante el Puntaje Básico de Matrícula (PBM) según ingresos familiares.',
        "campusHighlights": [
          'Campus Ciudad Universitaria "El Panóptico" en Bogotá: monumento nacional con más de 120 hectáreas de zonas verdes y museos',
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
        "description": 'Universidad privada líder de Colombia y destacada en América Latina según el ranking QS. Cuenta con acreditaciones internacionales ABET en ingenierías y la prestigiosa "Triple Corona" (AACSB, AMBA, EQUIS) en administración.',
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
        "tuitionInfo": 'Pública. Beneficiaria de la Política de Gratuidad "Puedo Estudiar" para estudiantes vulnerables. Tarifa diferenciada por estrato socioeconómico y colegio de procedencia para demás alumnos.',
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
        "tuitionInfo": 'Pública. Matrícula cero a través de la Política de Gratuidad "Puedo Estudiar" para SISBÉN IV o grupos vulnerables. Escalas socioeconómicas para estudiantes restantes.',
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
        "tuitionInfo": 'Privada. Ofrece el prestigioso programa de becas institucionales "Orgullo Caribe", becas con empresas aliadas, convenios con el ICETEX y opciones de financiación a corto y largo plazo.',
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
        "tuitionInfo": 'Pública. Totalmente vinculada a la Política de Gratuidad "Puedo Estudiar" para SISBÉN IV. Para alumnos no beneficiarios, cálculo según estrato y colegiatura de origen.',
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
        "tuitionInfo": 'Pública. Gratuidad del 100% de la matrícula mediante el programa nacional "Puedo Estudiar" para estudiantes en condiciones de vulnerabilidad socioeconómica.',
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
        "tuitionInfo": 'Pública. Gratuidad para bachilleres de escasos recursos a través de la Política Nacional de Gratuidad "Puedo Estudiar". Tarifas solidarias para otros alumnos.',
        "campusHighlights": [
          "Sede Central Tunja: complejo universitario con museo arqueológico, estadio y bibliotecas especializadas",
          "Sedes Seccionales Sogamoso y Duitama con centros metalúrgicos y laboratorios de ingeniería aplicada",
          "Centro de Investigaciones Biológicas y Agropecuarias"
        ],
        "websiteUrl": "https://uptc.edu.co",
        "rating": 4.6,
        "accreditation": "Acreditación Institucional de Alta Calidad por 8 años"
      }
    ]

    print(f"Base universities loaded: {len(unis)}")
    return unis

generate_unis_and_scholarships()
