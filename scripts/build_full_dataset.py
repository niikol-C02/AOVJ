#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
VOCACCIÓN FULL DATASET PIPELINE
Builds:
1. /src/models/colombianUniversitiesData.ts (161 universities, 38 scholarships)
2. /src/models/careersCatalog.ts (1,050+ official academic programs)
3. /src/models/careersData.ts (1,081+ total merged careers)
"""

import os
import json
import re

print("Generating 161 Universities and 38 Scholarships...")

# Helper to normalize slugs
def slugify(text):
    text = text.lower()
    for src, dst in [('á','a'), ('é','e'), ('í','i'), ('ó','o'), ('ú','u'), ('ñ','n'), ('ü','u')]:
        text = text.replace(src, dst)
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

# 16 Core Universities
base_unis = [
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

print(f"Base 16 loaded.")

# Compact definitions of 145 additional Colombian universities
raw_unis = [
  # Bogotá D.C. & Cundinamarca
  ("uni-udistrital", "Universidad Distrital Francisco José de Caldas", "UDistrital", "Pública", "Bogotá D.C.", "Bogotá D.C.", "https://udistrital.edu.co", "bg-yellow-800 text-white", 4.7, "Acreditación Institucional de Alta Calidad por 8 años", "Ingeniería de Sistemas, Ingeniería Catastral y Geodesia, Ingeniería Electrónica, Artes ASAB"),
  ("uni-upn", "Universidad Pedagógica Nacional", "UPN", "Pública", "Bogotá D.C.", "Bogotá D.C.", "https://upn.edu.co", "bg-blue-800 text-white", 4.6, "Acreditación Institucional de Alta Calidad por 6 años", "Licenciatura en Educación Infantil, Licenciatura en Matemáticas, Licenciatura en Filosofía, Licenciatura en Biología"),
  ("uni-unicolmayor", "Universidad Colegio Mayor de Cundinamarca", "Unicolmayor", "Pública", "Bogotá D.C.", "Bogotá D.C.", "https://unicolmayor.edu.co", "bg-emerald-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad por 6 años", "Bacteriología y Laboratorio Clínico, Trabajo Social, Construcción y Gestión en Arquitectura, Derecho"),
  ("uni-militar", "Universidad Militar Nueva Granada", "UMNG", "Pública", "Bogotá D.C. / Cajicá", "Bogotá D.C.", "https://umng.edu.co", "bg-red-800 text-white", 4.6, "Acreditación Institucional de Alta Calidad por 6 años", "Medicina, Ingeniería Mecatrónica, Ingeniería Civil, Derecho, Relaciones Internacionales"),
  ("uni-escuelaing", "Escuela Colombiana de Ingeniería Julio Garavito", "EscuelaIng", "Privada", "Bogotá D.C.", "Bogotá D.C.", "https://escuelaing.edu.co", "bg-red-900 text-white", 4.7, "Acreditación Institucional de Alta Calidad por 8 años", "Ingeniería Civil, Ingeniería Eléctrica, Ingeniería de Sistemas, Ingeniería Industrial, Matemáticas"),
  ("uni-lasalle", "Universidad de La Salle", "La Salle", "Privada", "Bogotá D.C. / Yopal", "Bogotá D.C.", "https://lasalle.edu.co", "bg-blue-800 text-white", 4.6, "Acreditación Institucional de Alta Calidad por 8 años", "Medicina Veterinaria, Optometría, Ingeniería Ambiental y Sanitaria, Arquitectura, Agronomía"),
  ("uni-santotomas", "Universidad Santo Tomás", "USTA", "Privada", "Bogotá D.C. / Multicampus", "Bogotá D.C.", "https://usta.edu.co", "bg-blue-900 text-white", 4.7, "Acreditación Institucional Multicampus de Alta Calidad por 8 años", "Derecho, Ingeniería Civil, Psicología, Odontología, Comunicación Social, Economía"),
  ("uni-central", "Universidad Central", "UCentral", "Privada", "Bogotá D.C.", "Bogotá D.C.", "https://ucentral.edu.co", "bg-teal-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad por 4 años", "Cine, Creación Literaria, Publicidad, Ingeniería de Sistemas, Contaduría Pública"),
  ("uni-bosque", "Universidad El Bosque", "El Bosque", "Privada", "Bogotá D.C.", "Bogotá D.C.", "https://unbosque.edu.co", "bg-green-800 text-white", 4.7, "Acreditación Institucional de Alta Calidad por 6 años", "Medicina, Odontología, Psicología, Bioética, Ingeniería Ambiental, Diseño de Comunicación"),
  ("uni-tadeo", "Universidad Jorge Tadeo Lozano", "Utadeo", "Privada", "Bogotá D.C. / Cartagena", "Bogotá D.C.", "https://utadeo.edu.co", "bg-indigo-900 text-white", 4.6, "Acreditación Institucional de Alta Calidad por 6 años", "Diseño Gráfico, Publicidad, Biología Marina, Artes Plásticas, Arquitectura, Comunicación Social"),
  ("uni-sergio", "Universidad Sergio Arboleda", "Sergio Arboleda", "Privada", "Bogotá D.C. / Santa Marta", "Bogotá D.C.", "https://usergioarboleda.edu.co", "bg-blue-950 text-white", 4.6, "Acreditación Institucional de Alta Calidad", "Derecho, Ciencias de la Computación e Inteligencia Artificial, Marketing y Negocios Digitales, Comunicación Social"),
  ("uni-catolica", "Universidad Católica de Colombia", "UCatólica", "Privada", "Bogotá D.C.", "Bogotá D.C.", "https://ucatolica.edu.co", "bg-blue-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad por 4 años", "Derecho, Psicología, Ingeniería Civil, Arquitectura, Economía"),
  ("uni-uan", "Universidad Antonio Nariño", "UAN", "Privada", "Bogotá D.C. / Nacional", "Bogotá D.C.", "https://uan.edu.co", "bg-red-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Medicina, Odontología, Medicina Veterinaria, Ingeniería Biomédica, Optometría"),
  ("uni-libre", "Universidad Libre", "Unilibre", "Privada", "Bogotá D.C. / Cali / Barranquilla / Pereira / Cúcuta", "Bogotá D.C.", "https://unilibre.edu.co", "bg-red-700 text-white", 4.6, "Acreditación Institucional Multicampus de Alta Calidad por 6 años", "Derecho, Medicina, Enfermería, Ingeniería Ambiental, Contaduría Pública"),
  ("uni-ucc", "Universidad Cooperativa de Colombia", "UCC", "Privada", "Bogotá D.C. / Multicampus", "Bogotá D.C.", "https://ucc.edu.co", "bg-cyan-800 text-white", 4.5, "Acreditación Institucional Multicampus de Alta Calidad", "Medicina, Odontología, Medicina Veterinaria y Zootecnia, Derecho, Psicología"),
  ("uni-poli", "Politécnico Grancolombiano", "Poli", "Privada", "Bogotá D.C. / Medellín / Virtual", "Bogotá D.C.", "https://poli.edu.co", "bg-blue-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Administración de Empresas, Ingeniería de Software, Diseño Gráfico, Medios Audiovisuales, Mercadeo"),
  ("uni-uniminuto", "Corporación Universitaria Minuto de Dios", "UNIMINUTO", "Privada", "Bogotá D.C. / Nacional", "Bogotá D.C.", "https://uniminuto.edu", "bg-yellow-700 text-white", 4.6, "Acreditación Institucional de Alta Calidad", "Trabajo Social, Psicología, Comunicación Social, Licenciatura en Educación Infantil, Ingeniería de Sistemas"),
  ("uni-unad", "Universidad Nacional Abierta y a Distancia", "UNAD", "Pública", "Bogotá D.C. / Nacional Virtual", "Bogotá D.C. / Nacional", "https://unad.edu.co", "bg-amber-600 text-white", 4.7, "Acreditación Institucional de Alta Calidad por 4 años", "Ingeniería de Sistemas, Psicología, Administración de Empresas, Zootecnia, Licenciatura en Pedagogía Infantil"),
  ("uni-areandina", "Fundación Universitaria del Área Andina", "Areandina", "Privada", "Bogotá D.C. / Pereira / Valledupar", "Bogotá D.C.", "https://areandina.edu.co", "bg-emerald-800 text-white", 4.5, "Acreditación Institucional Multicampus de Alta Calidad", "Enfermería, Instrumentación Quirúrgica, Terapia Respiratoria, Optometría, Diseño de Modas"),
  ("uni-ean", "Universidad EAN", "EAN", "Privada", "Bogotá D.C.", "Bogotá D.C.", "https://universidadean.edu.co", "bg-lime-700 text-white", 4.6, "Acreditación Institucional de Alta Calidad por 6 años", "Administración de Empresas Sostenibles, Negocios Internacionales, Ingeniería Ambiental, Emprendimiento Digital"),
  ("uni-piloto", "Universidad Piloto de Colombia", "UniPiloto", "Privada", "Bogotá D.C. / Girardot", "Bogotá D.C.", "https://unipiloto.edu.co", "bg-purple-900 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Arquitectura, Ingeniería Civil, Ingeniería de Mercados, Psicología, Diseño de Espacios"),
  ("uni-konrad", "Fundación Universitaria Konrad Lorenz", "Konrad Lorenz", "Privada", "Bogotá D.C.", "Bogotá D.C.", "https://konradlorenz.edu.co", "bg-sky-900 text-white", 4.6, "Acreditación Institucional de Alta Calidad", "Psicología, Matemáticas, Ingeniería de Sistemas, Mercadeo, Administración de Negocios"),
  ("uni-sanitas", "Fundación Universitaria Sanitas", "Unisanitas", "Privada", "Bogotá D.C.", "Bogotá D.C.", "https://unisanitas.edu.co", "bg-blue-700 text-white", 4.7, "Acreditación Institucional de Alta Calidad", "Medicina, Enfermería, Psicología Clínica, Instrumentación Quirúrgica, Fisioterapia"),
  ("uni-etitc", "Escuela Tecnológica Instituto Técnico Central", "ETITC", "Pública", "Bogotá D.C.", "Bogotá D.C.", "https://itc.edu.co", "bg-slate-800 text-white", 4.6, "Acreditación Institucional de Alta Calidad", "Ingeniería Mecatrónica, Ingeniería Electromecánica, Ingeniería de Sistemas, Procesos Industriales"),
  ("uni-umb", "Universidad Manuela Beltrán", "UMB", "Privada", "Bogotá D.C. / Bucaramanga / Cajicá", "Bogotá D.C.", "https://umb.edu.co", "bg-red-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Fisioterapia, Terapia Ocupacional, Fonoaudiología, Ingeniería Biomédica, Enfermería, Criminalística"),
  ("uni-cun", "Corporación Unificada Nacional de Educación Superior", "CUN", "Privada", "Bogotá D.C. / Nacional", "Bogotá D.C.", "https://cun.edu.co", "bg-emerald-700 text-white", 4.4, "Registro Calificado MinEducación", "Diseño Gráfico, Medios Audiovisuales, Contaduría Pública, Administración de Empresas, Desarrollo Web"),
  ("uni-america", "Fundación Universidad de América", "UniAmérica", "Privada", "Bogotá D.C.", "Bogotá D.C.", "https://uamerica.edu.co", "bg-amber-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Ingeniería Química, Ingeniería de Petróleos, Ingeniería Mecánica, Ingeniería Industrial, Arquitectura"),
  ("uni-udca", "Universidad de Ciencias Aplicadas y Ambientales", "UDCA", "Privada", "Bogotá D.C. / Cartagena", "Bogotá D.C.", "https://udca.edu.co", "bg-green-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Medicina Veterinaria y Zootecnia, Agronomía, Medicina, Enfermería, Ciencias del Deporte"),
  ("uni-fucs", "Fundación Universitaria de Ciencias de la Salud", "FUCS", "Privada", "Bogotá D.C.", "Bogotá D.C.", "https://fucsalud.edu.co", "bg-blue-900 text-white", 4.8, "Acreditación Institucional de Alta Calidad por 8 años", "Medicina, Enfermería, Instrumentación Quirúrgica, Fisioterapia, Citohistotecnología"),
  ("uni-udec", "Universidad de Cundinamarca", "UDEC", "Pública", "Fusagasugá / Girardot / Facatativá / Chía / Soacha / Ubaté", "Cundinamarca", "https://ucundinamarca.edu.co", "bg-emerald-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad por 4 años", "Ingeniería Agronómica, Ingeniería Ambiental, Enfermería, Educación Física, Ingeniería Electrónica"),
  ("uni-uniagraria", "Fundación Universitaria Agraria de Colombia", "Uniagraria", "Privada", "Bogotá D.C. / Facatativá", "Bogotá D.C.", "https://uniagraria.edu.co", "bg-green-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Ingeniería Agroindustrial, Medicina Veterinaria, Zootecnia, Ingeniería Civil, Derecho"),
  ("uni-uniempresarial", "Fundación Universitaria Empresarial de la CCB", "Uniempresarial", "Privada", "Bogotá D.C.", "Bogotá D.C.", "https://uniempresarial.edu.co", "bg-blue-900 text-white", 4.6, "Modelo de Formación Dual Alemán Acreditado", "Administración de Empresas (Dual), Negocios Internacionales, Ingeniería de Software, Finanzas"),
  ("uni-corpas", "Fundación Universitaria Juan N. Corpas", "Corpas", "Privada", "Bogotá D.C. (Suba)", "Bogotá D.C.", "https://juanncorpas.edu.co", "bg-emerald-900 text-white", 4.8, "Acreditación Institucional de Alta Calidad", "Medicina, Enfermería, Música, Terapias Alternativas y Farmacología Vegetal"),
  ("uni-ucompensar", "Fundación Universitaria Compensar", "UCompensar", "Privada", "Bogotá D.C.", "Bogotá D.C.", "https://ucompensar.edu.co", "bg-orange-700 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Ingeniería de Software, Mercadeo y Publicidad, Finanzas y Negocios, Diseño Visual"),
  ("uni-monserrate", "Fundación Universitaria Monserrate", "Unimonserrate", "Privada", "Bogotá D.C.", "Bogotá D.C.", "https://unimonserrate.edu.co", "bg-blue-800 text-white", 4.4, "Registro Calificado MinEducación", "Trabajo Social, Licenciatura en Educación Infantil, Administración de Empresas"),
  ("uni-republicana", "Corporación Universitaria Republicana", "UREPUBLICANA", "Privada", "Bogotá D.C.", "Bogotá D.C.", "https://urepublicana.edu.co", "bg-red-800 text-white", 4.4, "Registro Calificado MinEducación", "Derecho, Contaduría Pública, Ingeniería de Sistemas, Finanzas y Comercio"),
  ("uni-sanmartin", "Fundación Universitaria San Martín", "FUSM", "Privada", "Bogotá D.C. / Cali / Barranquilla / Pasto", "Bogotá D.C.", "https://sanmartin.edu.co", "bg-blue-900 text-white", 4.5, "Acreditación de Programas de Salud", "Medicina, Odontología, Medicina Veterinaria y Zootecnia, Administración"),
  ("uni-libertadores", "Fundación Universitaria Los Libertadores", "Los Libertadores", "Privada", "Bogotá D.C. / Cartagena", "Bogotá D.C.", "https://ulibertadores.edu.co", "bg-yellow-700 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Comunicación Social, Psicología, Ingeniería Aeronáutica, Derecho, Educación Infantil"),
  ("uni-ibero", "Corporación Universitaria Iberoamericana", "IBERO", "Privada", "Bogotá D.C. / Virtual", "Bogotá D.C.", "https://ibero.edu.co", "bg-teal-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Fonoaudiología, Fisioterapia, Psicología, Licenciatura en Educación Especial, Ingeniería Industrial"),

  # Antioquia
  ("uni-unalmed", "Universidad Nacional de Colombia - Sede Medellín", "UNAL Medellín", "Pública", "Medellín", "Antioquia", "https://medellin.unal.edu.co", "bg-emerald-900 text-white", 4.9, "Acreditación Institucional de Alta Calidad por 10 años", "Ingeniería Civil, Ingeniería de Minas, Ingeniería Mecánica, Ingeniería Forestal, Arquitectura, Ciencias Agrarias"),
  ("uni-udemedellin", "Universidad de Medellín", "UdeMedellín", "Privada", "Medellín", "Antioquia", "https://udem.edu.co", "bg-red-800 text-white", 4.6, "Acreditación Institucional de Alta Calidad por 6 años", "Derecho, Comunicación y Lenguajes Audiovisuales, Ingeniería Ambiental, Contaduría Pública, Administración"),
  ("uni-eia", "Universidad EIA", "EIA", "Privada", "Envigado / Medellín", "Antioquia", "https://eia.edu.co", "bg-orange-700 text-white", 4.9, "Acreditación Institucional de Alta Calidad por 10 años", "Ingeniería Biomédica, Ingeniería Mecatrónica, Ingeniería Civil, Medicina, Ingeniería Financiera"),
  ("uni-ces", "Universidad CES", "CES", "Privada", "Medellín", "Antioquia", "https://ces.edu.co", "bg-blue-900 text-white", 4.8, "Acreditación Institucional de Alta Calidad por 10 años", "Medicina, Odontología, Medicina Veterinaria y Zootecnia, Fisioterapia, Psicología, Biología"),
  ("uni-usbmed", "Universidad de San Buenaventura - Medellín", "USB Medellín", "Privada", "Medellín / Bello", "Antioquia", "https://usbmed.edu.co", "bg-orange-800 text-white", 4.6, "Acreditación Institucional Multicampus de Alta Calidad", "Ingeniería de Sonido, Arquitectura, Psicología, Licenciatura en Educación Infantil, Derecho"),
  ("uni-itm", "Instituto Tecnológico Metropolitano", "ITM", "Pública", "Medellín", "Antioquia", "https://itm.edu.co", "bg-blue-800 text-white", 4.7, "Acreditación Institucional de Alta Calidad por 8 años", "Ingeniería Biomédica, Ingeniería Mecatrónica, Ciencia de Datos, Artes Visuales, Tecnología Electrónica"),
  ("uni-polijic", "Politécnico Colombiano Jaime Isaza Cadavid", "POLIJIC", "Pública", "Medellín / Rionegro / Apartadó", "Antioquia", "https://politecnicojic.edu.co", "bg-emerald-800 text-white", 4.6, "Acreditación Institucional de Alta Calidad", "Ingeniería Agropecuaria, Educación Física y Deportes, Seguridad y Salud, Construcciones Civiles"),
  ("uni-pascualbravo", "Institución Universitaria Pascual Bravo", "Pascual Bravo", "Pública", "Medellín", "Antioquia", "https://pascualbravo.edu.co", "bg-sky-800 text-white", 4.6, "Acreditación Institucional de Alta Calidad", "Ingeniería Mecánica, Ingeniería Eléctrica, Diseño Textil y Modas, Tecnología Mecatrónica"),
  ("uni-colmayorant", "Institución Universitaria Colegio Mayor de Antioquia", "Colmayor Antioquia", "Pública", "Medellín", "Antioquia", "https://colmayor.edu.co", "bg-teal-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Bacteriología y Laboratorio Clínico, Biotecnología, Arquitectura, Administración Turística"),
  ("uni-tdea", "Tecnológico de Antioquia", "TdeA", "Pública", "Medellín", "Antioquia", "https://tdea.edu.co", "bg-emerald-700 text-white", 4.6, "Acreditación Institucional de Alta Calidad", "Criminalística, Psicología, Licenciatura en Educación Infantil, Ingeniería de Software, Derecho"),
  ("uni-lasallistamed", "Corporación Universitaria Lasallista", "Unilasallista", "Privada", "Caldas (Antioquia)", "Antioquia", "https://unilasallista.edu.co", "bg-blue-900 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Medicina Veterinaria, Ingeniería de Alimentos, Derecho, Psicología, Licenciatura en Ciencias Naturales"),
  ("uni-uco", "Universidad Católica de Oriente", "UCO", "Privada", "Rionegro", "Antioquia", "https://uco.edu.co", "bg-blue-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Enfermería, Ingeniería Agronómica, Psicología, Trabajo Social, Licenciatura en Lenguas Extranjeras"),
  ("uni-iue", "Institución Universitaria de Envigado", "IUE", "Pública", "Envigado", "Antioquia", "https://iue.edu.co", "bg-purple-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Derecho, Psicología, Ingeniería de Sistemas, Contaduría Pública, Negocios Internacionales"),
  ("uni-luisamigo", "Universidad Católica Luis Amigó", "Funlam", "Privada", "Medellín / Apartadó / Manizales / Montería", "Antioquia", "https://ucatolicaluisamigo.edu.co", "bg-blue-900 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Psicología, Derecho, Comunicación Social, Trabajo Social, Licenciatura en Educación Infantil"),
  ("uni-remington", "Corporación Universitaria Remington", "Uniremington", "Privada", "Medellín / Nacional", "Antioquia", "https://uniremington.edu.co", "bg-red-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Medicina, Medicina Veterinaria, Enfermería, Ingeniería de Sistemas, Contaduría Pública"),
  ("uni-mariacano", "Fundación Universitaria María Cano", "FUMC", "Privada", "Medellín / Cali / Neiva / Popayán", "Antioquia", "https://fumc.edu.co", "bg-emerald-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Fisioterapia, Fonoaudiología, Terapia Ocupacional, Psicología, Administración de Empresas"),
  ("uni-unac", "Corporación Universitaria Adventista", "UNAC", "Privada", "Medellín", "Antioquia", "https://unac.edu.co", "bg-blue-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Enfermería, Teología, Licenciatura en Música, Licenciatura en Educación Infantil"),
  ("uni-unisabaneta", "Corporación Universitaria de Sabaneta", "Unisabaneta", "Privada", "Sabaneta", "Antioquia", "https://unisabaneta.edu.co", "bg-emerald-900 text-white", 4.4, "Registro Calificado MinEducación", "Derecho, Criminalística, Administración de Negocios, Contaduría"),
  ("uni-bellasartesmed", "Fundación Universitaria Bellas Artes", "Bellas Artes Medellín", "Privada", "Medellín", "Antioquia", "https://bellasartesmed.edu.co", "bg-pink-800 text-white", 4.6, "Acreditación de Alta Calidad en Artes", "Artes Plásticas, Diseño Visual, Música, Artes Escénicas"),

  # Valle del Cauca
  ("uni-icesi", "Universidad ICESI", "ICESI", "Privada", "Cali", "Valle del Cauca", "https://icesi.edu.co", "bg-blue-800 text-white", 4.9, "Acreditación Institucional de Alta Calidad por 10 años", "Medicina, Ingeniería Telemática e Inteligencia Artificial, Administración de Empresas, Diseño de Medios Interactivos, Derecho, Economía"),
  ("uni-javerianacali", "Pontificia Universidad Javeriana - Sede Cali", "Javeriana Cali", "Privada", "Cali", "Valle del Cauca", "https://javerianacali.edu.co", "bg-blue-900 text-white", 4.8, "Acreditación Institucional de Alta Calidad por 10 años", "Medicina, Ingeniería Civil, Psicología, Artes Visuales, Mercadeo, Negocios Internacionales"),
  ("uni-uao", "Universidad Autónoma de Occidente", "UAO", "Privada", "Cali", "Valle del Cauca", "https://uao.edu.co", "bg-red-800 text-white", 4.7, "Acreditación Institucional de Alta Calidad por 8 años", "Comunicación Social - Periodismo, Ingeniería Mecatrónica, Ingeniería Biomédica, Cine y Comunicación Digital"),
  ("uni-usc", "Universidad Santiago de Cali", "USC", "Privada", "Cali / Palmira", "Valle del Cauca", "https://usc.edu.co", "bg-blue-900 text-white", 4.7, "Acreditación Institucional de Alta Calidad por 6 años", "Medicina, Odontología, Enfermería, Derecho, Fisioterapia, Instrumentación Quirúrgica"),
  ("uni-unilibrecool", "Universidad Libre - Seccional Cali", "Unilibre Cali", "Privada", "Cali", "Valle del Cauca", "https://unilibrecali.edu.co", "bg-red-700 text-white", 4.6, "Acreditación Institucional Multicampus de Alta Calidad", "Medicina, Enfermería, Derecho, Contaduría Pública, Ingeniería Industrial"),
  ("uni-usbcali", "Universidad de San Buenaventura - Cali", "USB Cali", "Privada", "Cali", "Valle del Cauca", "https://usbcali.edu.co", "bg-orange-800 text-white", 4.6, "Acreditación Institucional Multicampus de Alta Calidad", "Arquitectura, Psicología, Ingeniería Multimedia, Derecho, Economía"),
  ("uni-end", "Escuela Nacional del Deporte", "IU END", "Pública", "Cali", "Valle del Cauca", "https://endeporte.edu.co", "bg-emerald-700 text-white", 4.7, "Acreditación Institucional de Alta Calidad", "Profesional en Deporte, Fisioterapia, Terapia Ocupacional, Nutrición y Dietética, Administración de Empresas"),
  ("uni-intep", "Instituto de Educación Técnica Profesional de Roldanillo", "INTEP", "Pública", "Roldanillo", "Valle del Cauca", "https://intep.edu.co", "bg-green-700 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Producción Agropecuaria, Diseño Visual Digital, Contabilidad y Finanzas, Gestión Turística"),
  ("uni-uceva", "Unidad Central del Valle del Cauca", "UCEVA", "Pública", "Tuluá", "Valle del Cauca", "https://uceva.edu.co", "bg-red-800 text-white", 4.6, "Acreditación Institucional de Alta Calidad por 4 años", "Medicina, Derecho, Enfermería, Ingeniería Ambiental, Licenciatura en Educación Física"),
  ("uni-unipacifico", "Universidad del Pacífico", "Unipacífico", "Pública", "Buenaventura", "Valle del Cauca", "https://unipacifico.edu.co", "bg-cyan-800 text-white", 4.4, "Registro Calificado MinEducación", "Acuicultura, Arquitectura, Agronomía, Sociología, Ingeniería de Sistemas"),
  ("uni-uniajc", "Institución Universitaria Antonio José Camacho", "UNIAJC", "Pública", "Cali", "Valle del Cauca", "https://uniajc.edu.co", "bg-blue-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Ingeniería de Sistemas, Salud Ocupacional, Licenciatura en Pedagogía Infantil, Ingeniería Electrónica"),
  ("uni-unalpalmira", "Universidad Nacional de Colombia - Sede Palmira", "UNAL Palmira", "Pública", "Palmira", "Valle del Cauca", "https://palmira.unal.edu.co", "bg-emerald-900 text-white", 4.8, "Acreditación Institucional de Alta Calidad por 10 años", "Ingeniería Agronómica, Ingeniería Agrícola, Zootecnia, Ingeniería Ambiental, Diseño Industrial"),

  # Atlántico
  ("uni-uniatlantico", "Universidad del Atlántico", "Uniatlántico", "Pública", "Barranquilla / Suan / Puerto Colombia", "Atlántico", "https://uniatlantico.edu.co", "bg-orange-800 text-white", 4.7, "Acreditación Institucional de Alta Calidad por 4 años", "Química y Farmacia, Arquitectura, Bellas Artes, Licenciatura en Ciencias Naturales, Ingeniería Química"),
  ("uni-unisimon", "Universidad Simón Bolívar", "Unisimón", "Privada", "Barranquilla / Cúcuta", "Atlántico", "https://unisimon.edu.co", "bg-red-800 text-white", 4.7, "Acreditación Institucional de Alta Calidad por 8 años", "Medicina, Enfermería, Fisioterapia, Derecho, Psicología, Ingeniería de Sistemas"),
  ("uni-cuc", "Universidad de la Costa", "CUC", "Privada", "Barranquilla", "Atlántico", "https://cuc.edu.co", "bg-emerald-800 text-white", 4.7, "Acreditación Institucional de Alta Calidad por 6 años", "Ingeniería Civil, Ingeniería Ambiental, Psicología, Arquitectura, Finanzas y Relaciones Internacionales"),
  ("uni-unilibrebq", "Universidad Libre - Seccional Barranquilla", "Unilibre Barranquilla", "Privada", "Barranquilla", "Atlántico", "https://unilibrebaq.edu.co", "bg-red-700 text-white", 4.6, "Acreditación Institucional Multicampus de Alta Calidad", "Medicina, Fisioterapia, Instrumentación Quirúrgica, Derecho, Ingeniería Industrial"),
  ("uni-americana", "Corporación Universitaria Americana", "Americana", "Privada", "Barranquilla / Medellín / Montería", "Atlántico", "https://americana.edu.co", "bg-blue-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Derecho, Ingeniería de Sistemas, Contaduría Pública, Negocios Internacionales, Licenciatura en Educación Infantil"),
  ("uni-cul", "Corporación Universitaria Latinoamericana", "CUL", "Privada", "Barranquilla", "Atlántico", "https://cul.edu.co", "bg-indigo-800 text-white", 4.4, "Registro Calificado MinEducación", "Licenciatura en Educación Física, Ingeniería de Sistemas, Administración de Empresas, Contaduría"),
  ("uni-iub", "Institución Universitaria de Barranquilla", "IUB", "Pública", "Barranquilla", "Atlántico", "https://unibarranquilla.edu.co", "bg-red-700 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Mecatrónica, Mantenimiento Electromecánico, Gestión Logística, Seguridad y Salud en el Trabajo"),
  ("uni-autonoma", "Universidad Autónoma del Caribe", "Uniautónoma", "Privada", "Barranquilla", "Atlántico", "https://uac.edu.co", "bg-blue-900 text-white", 4.5, "Registro Calificado MinEducación", "Comunicación Social - Periodismo, Diseño de Modas, Ingeniería Mecatrónica, Derecho, Arquitectura"),
  ("uni-unimetro", "Universidad Metropolitana de Barranquilla", "Unimetro", "Privada", "Barranquilla", "Atlántico", "https://unimetro.edu.co", "bg-blue-800 text-white", 4.6, "Acreditación de Alta Calidad en Salud", "Medicina, Odontología, Enfermería, Fisioterapia, Bacteriología, Nutrición y Dietética"),
  ("uni-itsa", "Institución Universitaria de Soledad - ITSA", "ITSA", "Pública", "Soledad / Barranquilla", "Atlántico", "https://itsa.edu.co", "bg-blue-900 text-white", 4.6, "Acreditación Institucional de Alta Calidad", "Ingeniería Mecatrónica, Ingeniería Telemática, Mantenimiento Electromecánico, Gestión Logística"),
  ("uni-corsalud", "Corporación Universitaria de Ciencias Empresariales, Educación y Salud", "Corsalud", "Privada", "Barranquilla", "Atlántico", "https://corsalud.edu.co", "bg-emerald-800 text-white", 4.4, "Registro Calificado MinEducación", "Enfermería, Fisioterapia, Instrumentación Quirúrgica, Administración en Salud"),

  # Santander
  ("uni-unab", "Universidad Autónoma de Bucaramanga", "UNAB", "Privada", "Bucaramanga / San Gil", "Santander", "https://unab.edu.co", "bg-amber-700 text-white", 4.7, "Acreditación Institucional de Alta Calidad por 6 años", "Medicina, Comunicación Social, Derecho, Ingeniería Biomédica, Gastronomía y Alta Cocina, Psicología"),
  ("uni-upbbga", "Universidad Pontificia Bolivariana - Seccional Bucaramanga", "UPB Bucaramanga", "Privada", "Floridablanca / Bucaramanga", "Santander", "https://upb.edu.co/bucaramanga", "bg-red-700 text-white", 4.6, "Acreditación Institucional Multicampus de Alta Calidad", "Ingeniería Civil, Ingeniería Electrónica, Psicología, Derecho, Administración de Negocios"),
  ("uni-ustabga", "Universidad Santo Tomás - Seccional Bucaramanga", "USTA Bucaramanga", "Privada", "Bucaramanga / Floridablanca", "Santander", "https://ustabmanga.edu.co", "bg-blue-900 text-white", 4.6, "Acreditación Institucional Multicampus de Alta Calidad", "Odontología, Optometría, Arquitectura, Ingeniería Mecatrónica, Negocios Internacionales"),
  ("uni-uts", "Unidades Tecnológicas de Santander", "UTS", "Pública", "Bucaramanga / Barrancabermeja / Vélez", "Santander", "https://uts.edu.co", "bg-emerald-800 text-white", 4.6, "Acreditación Institucional de Alta Calidad", "Tecnología en Manejo de Petróleo y Gas, Electromecánica, Telecomunicaciones, Obras Civiles, Contabilidad"),
  ("uni-udes", "Universidad de Santander", "UDES", "Privada", "Bucaramanga / Cúcuta / Valledupar", "Santander", "https://udes.edu.co", "bg-emerald-800 text-white", 4.6, "Acreditación Institucional de Alta Calidad por 4 años", "Medicina, Medicina Veterinaria, Terapia Ocupacional, Fisioterapia, Enfermería, Ingeniería de Software"),
  ("uni-uniciencia", "Corporación Universitaria de Ciencia y Desarrollo", "Uniciencia", "Privada", "Bucaramanga", "Santander", "https://uniciencia.edu.co", "bg-blue-900 text-white", 4.4, "Registro Calificado MinEducación", "Derecho, Psicología, Ingeniería Industrial, Contaduría Pública"),
  ("uni-unipaz", "Instituto Universitario de la Paz", "UNIPAZ", "Pública", "Barrancabermeja", "Santander", "https://unipaz.edu.co", "bg-green-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Ingeniería de Producción, Ingeniería Ambiental y de Saneamiento, Agronomía, Medicina Veterinaria y Zootecnia"),
  ("uni-unilibresocorro", "Universidad Libre - Seccional Socorro", "Unilibre Socorro", "Privada", "Socorro", "Santander", "https://unilibresocorro.edu.co", "bg-red-700 text-white", 4.5, "Acreditación Institucional Multicampus de Alta Calidad", "Ingeniería Ambiental, Licenciatura en Educación Básica, Derecho, Contaduría Pública"),

  # Bolívar
  ("uni-utb", "Universidad Tecnológica de Bolívar", "UTB", "Privada", "Cartagena de Indias", "Bolívar", "https://utb.edu.co", "bg-red-800 text-white", 4.7, "Acreditación Institucional de Alta Calidad por 8 años", "Ingeniería Naval, Ingeniería Mecatrónica, Ingeniería Química, Finanzas y Negocios, Economía"),
  ("uni-unisinuctg", "Universidad del Sinú - Seccional Cartagena", "Unisinú Cartagena", "Privada", "Cartagena de Indias", "Bolívar", "https://unisinucartagena.edu.co", "bg-red-700 text-white", 4.6, "Acreditación Institucional de Alta Calidad", "Medicina, Odontología, Enfermería, Derecho, Optometría, Psicología"),
  ("uni-curn", "Corporación Universitaria Rafael Núñez", "CURN", "Privada", "Cartagena / Barranquilla", "Bolívar", "https://curn.edu.co", "bg-blue-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Medicina, Odontología, Enfermería, Instrumentación Quirúrgica, Derecho"),
  ("uni-unibac", "Institución Universitaria Bellas Artes y Ciencias de Bolívar", "UNIBAC", "Pública", "Cartagena de Indias", "Bolívar", "https://unibac.edu.co", "bg-yellow-700 text-white", 4.6, "Acreditación Institucional de Alta Calidad", "Música, Artes Plásticas, Diseño Gráfico, Comunicación Audiovisual, Artes Escénicas"),
  ("uni-umayorctg", "Institución Universitaria Mayor de Cartagena", "Umayorcito", "Pública", "Cartagena de Indias", "Bolívar", "https://umayor.edu.co", "bg-emerald-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Tecnología en Turismo y Hotelería, Delineante de Arquitectura, Promoción Social, Comercio Internacional"),
  ("uni-unitecnar", "Fundación Universitaria Antonio de Arévalo", "Unitécnar", "Privada", "Cartagena de Indias", "Bolívar", "https://unitecnar.edu.co", "bg-blue-900 text-white", 4.4, "Registro Calificado MinEducación", "Ingeniería Petroquímica, Seguridad y Salud en el Trabajo, Gestión Naviera y Portuaria"),
  ("uni-tecnologicoctg", "Tecnológico Comfenalco Cartagena", "Comfenalco Cartagena", "Privada", "Cartagena de Indias", "Bolívar", "https://tecnologicocomfenalco.edu.co", "bg-orange-700 text-white", 4.6, "Acreditación Institucional de Alta Calidad", "Ingeniería Ambiental, Ingeniería de Sistemas, Producción Industrial, Gestión de Mercados"),
  ("uni-unicolombo", "Fundación Universitaria Colombo Internacional", "Unicolombo", "Privada", "Cartagena de Indias", "Bolívar", "https://unicolombo.edu.co", "bg-blue-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Licenciatura en Inglés, Negocios Internacionales, Tecnología en Gestión Turística"),

  # Caldas
  ("uni-unalmzl", "Universidad Nacional de Colombia - Sede Manizales", "UNAL Manizales", "Pública", "Manizales", "Caldas", "https://manizales.unal.edu.co", "bg-emerald-900 text-white", 4.8, "Acreditación Institucional de Alta Calidad por 10 años", "Ingeniería Química, Ingeniería Eléctrica, Ingeniería Electrónica, Ingeniería Civil, Ingeniería Industrial, Matemáticas"),
  ("uni-umanizales", "Universidad de Manizales", "UManizales", "Privada", "Manizales", "Caldas", "https://umanizales.edu.co", "bg-blue-800 text-white", 4.7, "Acreditación Institucional de Alta Calidad por 6 años", "Medicina, Psicología, Derecho, Comunicación Social y Periodismo, Mercadeo Nacional e Internacional"),
  ("uni-ucm", "Universidad Católica de Manizales", "UCM", "Privada", "Manizales", "Caldas", "https://ucm.edu.co", "bg-blue-900 text-white", 4.6, "Acreditación Institucional de Alta Calidad por 4 años", "Bacteriología, Enfermería, Arquitectura, Publicidad, Ingeniería Ambiental"),
  ("uni-uam", "Universidad Autónoma de Manizales", "UAM", "Privada", "Manizales", "Caldas", "https://autonoma.edu.co", "bg-teal-800 text-white", 4.7, "Acreditación Institucional de Alta Calidad por 6 años", "Fisioterapia, Odontología, Ingeniería Mecánica, Ingeniería Biomédica, Diseño de Modas"),
  ("uni-cinoc", "Colegio Integrado Nacional Oriente de Caldas", "CINOC", "Pública", "Pensilvania / Manzanares / Marquetalia", "Caldas", "https://cinoc.edu.co", "bg-green-700 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Tecnología en Gestión Forestal, Mantenimiento Electromecánico, Producción Agropecuaria"),

  # Risaralda
  ("uni-ucp", "Universidad Católica de Pereira", "UCP", "Privada", "Pereira", "Risaralda", "https://ucp.edu.co", "bg-blue-800 text-white", 4.6, "Acreditación Institucional de Alta Calidad", "Arquitectura, Diseño Industrial, Psicología, Comunicación Social y Periodismo, Ingeniería de Sistemas"),
  ("uni-unilibreper", "Universidad Libre - Seccional Pereira", "Unilibre Pereira", "Privada", "Pereira", "Risaralda", "https://unilibrepereira.edu.co", "bg-red-700 text-white", 4.6, "Acreditación Institucional Multicampus de Alta Calidad", "Medicina, Enfermería, Derecho, Ingeniería Comercial, Contaduría Pública"),
  ("uni-comfamiliar", "Fundación Universitaria Comfamiliar Risaralda", "Comfamiliar", "Privada", "Pereira", "Risaralda", "https://uc.edu.co", "bg-orange-700 text-white", 4.4, "Registro Calificado MinEducación", "Administración de Empresas, Mercadeo Digital, Gestión del Talento Humano"),
  ("uni-ciaf", "Comunidad de Instituciones Educativas CIAF", "CIAF", "Privada", "Pereira", "Risaralda", "https://ciaf.edu.co", "bg-emerald-800 text-white", 4.4, "Registro Calificado MinEducación", "Tecnología en Desarrollo de Software, Seguridad y Salud en el Trabajo, Gestión Financiera"),

  # Quindío
  ("uni-uniquindio", "Universidad del Quindío", "Uniquindío", "Pública", "Armenia", "Quindío", "https://uniquindio.edu.co", "bg-green-800 text-white", 4.7, "Acreditación Institucional de Alta Calidad por 6 años", "Medicina, Enfermería, Ingeniería Civil, Biología, Ciencia de la Información y Bibliotecología"),
  ("uni-ugcarmenia", "Universidad La Gran Colombia - Seccional Armenia", "UGC Armenia", "Privada", "Armenia", "Quindío", "https://ugc.edu.co/armenia", "bg-red-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Derecho, Arquitectura, Ingeniería Agroindustrial, Psicología, Economía"),
  ("uni-eam", "Institución Universitaria EAM", "EAM", "Privada", "Armenia", "Quindío", "https://eam.edu.co", "bg-blue-900 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Ingeniería de Software, Publicidad, Diseño Visual Digital, Negocios Internacionales"),

  # Boyacá
  ("uni-uniboyaca", "Universidad de Boyacá", "UniBoyacá", "Privada", "Tunja / Sogamoso / Yopal", "Boyacá", "https://uniboyaca.edu.co", "bg-blue-800 text-white", 4.6, "Acreditación Institucional de Alta Calidad", "Medicina, Fisioterapia, Odontología, Arquitectura, Ingeniería Ambiental, Diseño Gráfico"),
  ("uni-ustatunja", "Universidad Santo Tomás - Seccional Tunja", "USTA Tunja", "Privada", "Tunja", "Boyacá", "https://ustatunja.edu.co", "bg-blue-900 text-white", 4.6, "Acreditación Institucional Multicampus de Alta Calidad", "Arquitectura, Ingeniería Civil, Derecho, Ingeniería Ambiental, Negocios Internacionales"),
  ("uni-jdc", "Fundación Universitaria Juan de Castellanos", "JDC", "Privada", "Tunja", "Boyacá", "https://jdc.edu.co", "bg-emerald-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Medicina Veterinaria, Ingeniería Agropecuaria, Trabajo Social, Licenciatura en Educación Física"),

  # Tolima
  ("uni-utolima", "Universidad del Tolima", "UT", "Pública", "Ibagué", "Tolima", "https://ut.edu.co", "bg-emerald-800 text-white", 4.7, "Acreditación Institucional de Alta Calidad por 6 años", "Medicina Veterinaria y Zootecnia, Medicina, Ingeniería Forestal, Ingeniería Agronómica, Biología"),
  ("uni-unibague", "Universidad de Ibagué", "Unibagué", "Privada", "Ibagué", "Tolima", "https://unibague.edu.co", "bg-blue-900 text-white", 4.7, "Acreditación Institucional de Alta Calidad por 4 años", "Ingeniería Civil, Ingeniería Electrónica, Psicología, Derecho, Arquitectura, Economía"),
  ("uni-conservatoriotol", "Conservatorio del Tolima", "Conservatorio Tolima", "Pública", "Ibagué", "Tolima", "https://conservatoriodeltolima.edu.co", "bg-amber-800 text-white", 4.7, "Acreditación Institucional de Alta Calidad", "Maestría y Profesional en Música, Licenciatura en Música, Interpretación Instrumental, Canto"),
  ("uni-itfip", "Instituto Tolimense de Formación Técnica Profesional", "ITFIP", "Pública", "El Espinal", "Tolima", "https://itfip.edu.co", "bg-teal-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Ingeniería de Sistemas, Contaduría Pública, Administración de Empresas Agropecuarias"),
  ("uni-uccibague", "Universidad Cooperativa de Colombia - Sede Ibagué / Espinal", "UCC Ibagué", "Privada", "Ibagué / El Espinal", "Tolima", "https://ucc.edu.co/ibague", "bg-cyan-800 text-white", 4.5, "Acreditación Institucional Multicampus de Alta Calidad", "Medicina Veterinaria y Zootecnia, Derecho, Psicología, Contaduría Pública"),

  # Huila
  ("uni-usco", "Universidad Surcolombiana", "USCO", "Pública", "Neiva / Pitalito / Garzón / La Plata", "Huila", "https://usco.edu.co", "bg-red-800 text-white", 4.7, "Acreditación Institucional de Alta Calidad por 6 años", "Medicina, Enfermería, Ingeniería de Petróleos, Ingeniería Agrícola, Derecho, Licenciaturas"),
  ("uni-corhuila", "Corporación Universitaria del Huila", "Corhuila", "Privada", "Neiva / Pitalito", "Huila", "https://corhuila.edu.co", "bg-green-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Medicina Veterinaria y Zootecnia, Ingeniería Ambiental, Ingeniería Industrial, Negocios Internacionales"),
  ("uni-uninavarra", "Fundación Universitaria Navarra", "UniNavarra", "Privada", "Neiva", "Huila", "https://uninavarra.edu.co", "bg-blue-900 text-white", 4.5, "Registro Calificado MinEducación", "Medicina, Enfermería, Derecho, Ingeniería Ambiental, Radiología e Imágenes Diagnósticas"),
  ("uni-uccneiva", "Universidad Cooperativa de Colombia - Sede Neiva", "UCC Neiva", "Privada", "Neiva", "Huila", "https://ucc.edu.co/neiva", "bg-cyan-800 text-white", 4.5, "Acreditación Institucional Multicampus de Alta Calidad", "Derecho, Psicología, Contaduría Pública, Ingeniería de Sistemas"),

  # Norte de Santander
  ("uni-ufps", "Universidad Francisco de Paula Santander", "UFPS", "Pública", "Cúcuta", "Norte de Santander", "https://ufps.edu.co", "bg-red-800 text-white", 4.7, "Acreditación Institucional de Alta Calidad por 6 años", "Ingeniería de Sistemas, Ingeniería Civil, Ingeniería Electromecánica, Enfermería, Derecho"),
  ("uni-unipamplona", "Universidad de Pamplona", "Unipamplona", "Pública", "Pamplona / Cúcuta / Villa del Rosario", "Norte de Santander", "https://unipamplona.edu.co", "bg-red-900 text-white", 4.7, "Acreditación Institucional de Alta Calidad por 4 años", "Medicina, Fisioterapia, Fonoaudiología, Medicina Veterinaria, Ingeniería de Alimentos, Licenciaturas"),
  ("uni-ufpso", "Universidad Francisco de Paula Santander - Seccional Ocaña", "UFPSO", "Pública", "Ocaña", "Norte de Santander", "https://ufpso.edu.co", "bg-red-800 text-white", 4.6, "Acreditación Institucional de Alta Calidad", "Ingeniería Mecánica, Ingeniería Civil, Zootecnia, Contaduría Pública, Comunicación Social"),
  ("uni-unisimoncuc", "Universidad Simón Bolívar - Sede Cúcuta", "Unisimón Cúcuta", "Privada", "Cúcuta", "Norte de Santander", "https://unisimon.edu.co/cucuta", "bg-red-700 text-white", 4.6, "Acreditación Institucional de Alta Calidad", "Derecho, Psicología, Trabajo Social, Ingeniería de Sistemas, Comercio Exterior"),
  ("uni-unilibrecuc", "Universidad Libre - Seccional Cúcuta", "Unilibre Cúcuta", "Privada", "Cúcuta", "Norte de Santander", "https://unilibrecucuta.edu.co", "bg-red-700 text-white", 4.6, "Acreditación Institucional Multicampus de Alta Calidad", "Derecho, Contaduría Pública, Administración de Empresas, Ingeniería en Tecnologías de la Información"),
  ("uni-iser", "Instituto Superior de Educación Rural", "ISER", "Pública", "Pamplona", "Norte de Santander", "https://iser.edu.co", "bg-emerald-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Tecnología en Gestión Agropecuaria, Tecnología en Obras Civiles, Tecnología en Redes"),

  # Nariño
  ("uni-udenar", "Universidad de Nariño", "Udenar", "Pública", "Pasto / Ipiales / Tumaco / Tuquerres", "Nariño", "https://udenar.edu.co", "bg-emerald-800 text-white", 4.7, "Acreditación Institucional de Alta Calidad por 6 años", "Medicina, Medicina Veterinaria, Ingeniería Agronómica, Derecho, Artes Visuales, Licenciaturas"),
  ("uni-unimariana", "Universidad Mariana", "Unimariana", "Privada", "Pasto", "Nariño", "https://umariana.edu.co", "bg-blue-800 text-white", 4.6, "Acreditación Institucional de Alta Calidad por 6 años", "Enfermería, Fisioterapia, Nutrición y Dietética, Terapia Ocupacional, Derecho, Psicología"),
  ("uni-cesmag", "Institución Universitaria CESMAG", "CESMAG", "Privada", "Pasto", "Nariño", "https://iucesmag.edu.co", "bg-amber-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Arquitectura, Psicología, Licenciatura en Educación Infantil, Derecho, Ingeniería de Sistemas"),
  ("uni-uccpasto", "Universidad Cooperativa de Colombia - Sede Pasto", "UCC Pasto", "Privada", "Pasto", "Nariño", "https://ucc.edu.co/pasto", "bg-cyan-800 text-white", 4.5, "Acreditación Institucional Multicampus de Alta Calidad", "Odontología, Medicina, Derecho, Ingeniería Industrial, Psicología"),

  # Cauca
  ("uni-unicauca", "Universidad del Cauca", "Unicauca", "Pública", "Popayán / Santander de Quilichao", "Cauca", "https://unicauca.edu.co", "bg-red-800 text-white", 4.8, "Acreditación Institucional de Alta Calidad por 8 años", "Medicina, Ingeniería Electrónica y Telecomunicaciones, Fisioterapia, Fonoaudiología, Derecho, Antropología"),
  ("uni-colmayorcauca", "Institución Universitaria Colegio Mayor del Cauca", "Unimayor", "Pública", "Popayán", "Cauca", "https://unimayor.edu.co", "bg-blue-900 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Diseño Visual, Arquitectura, Ingeniería Informática, Administración Financiera"),
  ("uni-fup", "Fundación Universitaria de Popayán", "FUP", "Privada", "Popayán / Santander de Quilichao", "Cauca", "https://fup.edu.co", "bg-emerald-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Ecología, Arquitectura, Comunicación Social, Psicología, Ingeniería Industrial, Derecho"),
  ("uni-unicomfacauca", "Corporación Universitaria Comfacauca", "Unicomfacauca", "Privada", "Popayán / Santander de Quilichao / Puerto Tejada", "Cauca", "https://unicomfacauca.edu.co", "bg-orange-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Ingeniería Mecatrónica, Ingeniería Industrial, Comunicación Social, Gestión Gastronómica"),

  # Meta & Orinoquia
  ("uni-unillanos", "Universidad de los Llanos", "Unillanos", "Pública", "Villavicencio / Granada", "Meta", "https://unillanos.edu.co", "bg-emerald-800 text-white", 4.7, "Acreditación Institucional de Alta Calidad por 6 años", "Medicina Veterinaria y Zootecnia, Enfermería, Ingeniería de Sistemas, Ingeniería Electrónica, Biología"),
  ("uni-ustavillavicencio", "Universidad Santo Tomás - Sede Villavicencio", "USTA Villavicencio", "Privada", "Villavicencio", "Meta", "https://ustatunja.edu.co/villavicencio", "bg-blue-900 text-white", 4.5, "Acreditación Institucional Multicampus de Alta Calidad", "Ingeniería Ambiental, Derecho, Psicología, Negocios Internacionales, Contaduría"),
  ("uni-uccvillavicencio", "Universidad Cooperativa de Colombia - Sede Villavicencio", "UCC Villavicencio", "Privada", "Villavicencio", "Meta", "https://ucc.edu.co/villavicencio", "bg-cyan-800 text-white", 4.5, "Acreditación Institucional Multicampus de Alta Calidad", "Medicina Veterinaria y Zootecnia, Medicina, Psicología, Odontología, Derecho"),

  # Córdoba
  ("uni-unicordoba", "Universidad de Córdoba", "Unicórdoba", "Pública", "Montería / Lorica / Sahagún / Montelíbano", "Córdoba", "https://unicordoba.edu.co", "bg-emerald-800 text-white", 4.7, "Acreditación Institucional de Alta Calidad por 6 años", "Medicina Veterinaria y Zootecnia, Ingeniería Agronómica, Biología, Enfermería, Licenciaturas"),
  ("uni-unisinu", "Universidad del Sinú Elías Bechara Zainúm", "Unisinú Montería", "Privada", "Montería", "Córdoba", "https://unisinu.edu.co", "bg-red-700 text-white", 4.6, "Acreditación Institucional de Alta Calidad por 6 años", "Medicina, Odontología, Enfermería, Derecho, Psicología, Optometría, Negocios"),
  ("uni-upbmonteria", "Universidad Pontificia Bolivariana - Seccional Montería", "UPB Montería", "Privada", "Montería", "Córdoba", "https://upb.edu.co/monteria", "bg-red-800 text-white", 4.6, "Acreditación Institucional Multicampus de Alta Calidad", "Ingeniería Civil, Ingeniería Sanitaria y Ambiental, Psicología, Derecho, Administración"),

  # Sucre
  ("uni-unisucre", "Universidad de Sucre", "Unisucre", "Pública", "Sincelejo", "Sucre", "https://unisucre.edu.co", "bg-emerald-800 text-white", 4.6, "Acreditación Institucional de Alta Calidad por 4 años", "Medicina, Enfermería, Zootecnia, Biología, Ingeniería Agroindustrial, Ingeniería Civil"),
  ("uni-cecar", "Corporación Universitaria del Caribe", "CECAR", "Privada", "Sincelejo / Montería / Villavicencio", "Sucre", "https://cecar.edu.co", "bg-teal-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad por 4 años", "Derecho, Psicología, Arquitectura, Trabajo Social, Licenciatura en Pedagogía Infantil"),

  # Magdalena
  ("uni-unimagdalena", "Universidad del Magdalena", "Unimagdalena", "Pública", "Santa Marta", "Magdalena", "https://unimagdalena.edu.co", "bg-blue-800 text-white", 4.8, "Acreditación Institucional de Alta Calidad por 8 años", "Medicina, Biología Marina, Antropología, Cine y Audiovisuales, Ingeniería Ambiental, Derecho"),
  ("uni-sergiosantamarta", "Universidad Sergio Arboleda - Santa Marta", "Sergio Arboleda Santa Marta", "Privada", "Santa Marta", "Magdalena", "https://usergioarboleda.edu.co/santa-marta", "bg-blue-950 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Derecho, Marketing y Negocios Internacionales, Comunicación Social, Psicología"),
  ("uni-infotepcienaga", "Instituto Nacional de Formación Técnica Profesional", "INFOTEP Ciénaga", "Pública", "Ciénaga", "Magdalena", "https://infotep.edu.co", "bg-cyan-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Técnico Profesional en Operaciones Portuarias, Agroindustria, Seguridad Ocupacional"),
  ("uni-uccsantamarta", "Universidad Cooperativa de Colombia - Sede Santa Marta", "UCC Santa Marta", "Privada", "Santa Marta", "Magdalena", "https://ucc.edu.co/santa-marta", "bg-cyan-800 text-white", 4.5, "Acreditación Institucional Multicampus de Alta Calidad", "Medicina, Enfermería, Psicología, Derecho, Comercio Internacional"),

  # Cesar
  ("uni-upc", "Universidad Popular del Cesar", "UPC", "Pública", "Valledupar / Aguachica", "Cesar", "https://unicesar.edu.co", "bg-green-800 text-white", 4.6, "Acreditación Institucional de Alta Calidad", "Enfermería, Instrumentación Quirúrgica, Ingeniería Agroindustrial, Derecho, Licenciaturas"),
  ("uni-udesvalledupar", "Universidad de Santander - Sede Valledupar", "UDES Valledupar", "Privada", "Valledupar", "Cesar", "https://valledupar.udes.edu.co", "bg-emerald-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Fisioterapia, Terapia Ocupacional, Medicina Veterinaria, Derecho, Psicología"),
  ("uni-areandinavalledupar", "Fundación Universitaria del Área Andina - Sede Valledupar", "Areandina Valledupar", "Privada", "Valledupar", "Cesar", "https://areandina.edu.co/valledupar", "bg-emerald-700 text-white", 4.5, "Acreditación Institucional Multicampus de Alta Calidad", "Medicina, Enfermería, Instrumentación Quirúrgica, Psicología, Ingeniería de Minas"),

  # La Guajira
  ("uni-uniguajira", "Universidad de La Guajira", "Uniguajira", "Pública", "Riohacha / Maicao / Fonseca / Villanueva", "La Guajira", "https://uniguajira.edu.co", "bg-amber-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Ingeniería Ambiental, Biología, Trabajo Social, Licenciatura en Etnoeducación, Negocios Internacionales"),

  # Chocó
  ("uni-utch", "Universidad Tecnológica del Chocó Diego Luis Córdoba", "UTCH", "Pública", "Quibdó / Istmina / Bahía Solano", "Chocó", "https://utch.edu.co", "bg-emerald-900 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Biología con énfasis en Recursos Naturales, Enfermería, Ingeniería Agroforestal, Trabajo Social, Arquitectura"),
  ("uni-uniclaretiana", "Fundación Universitaria Claretiana", "Uniclaretiana", "Privada", "Quibdó / Medellín / Neiva / Cali / Pereira / Bogotá", "Chocó", "https://uniclaretiana.edu.co", "bg-amber-800 text-white", 4.4, "Registro Calificado MinEducación", "Trabajo Social, Teología Bíblica, Ingeniería de Sistemas, Derecho"),

  # Caquetá
  ("uni-uniamazonia", "Universidad de la Amazonia", "Uniamazonia", "Pública", "Florencia", "Caquetá", "https://udla.edu.co", "bg-green-900 text-white", 4.6, "Acreditación Institucional de Alta Calidad por 4 años", "Medicina Veterinaria y Zootecnia, Ingeniería Agroecológica, Biología, Licenciatura en Pedagogía Infantil, Derecho"),

  # Casanare
  ("uni-unitropico", "Universidad Internacional del Trópico Americano", "Unitrópico", "Pública", "Yopal", "Casanare", "https://unitropico.edu.co", "bg-yellow-800 text-white", 4.5, "Acreditación Institucional de Alta Calidad", "Medicina Veterinaria y Zootecnia, Biología Ambiental, Ingeniería Agroforestal, Ingeniería Civil, Derecho"),
  ("uni-lasalleyopal", "Universidad de La Salle - Campus Utopía Yopal", "La Salle Utopía", "Privada", "Yopal", "Casanare", "https://lasalle.edu.co/utopia", "bg-blue-800 text-white", 4.8, "Premio Nacional de Paz y Excelencia Agronómica", "Ingeniería Agronómica para Jóvenes Rurales y Víctimas del Conflicto"),

  # Putumayo
  ("uni-itp", "Instituto Tecnológico del Putumayo", "ITP", "Pública", "Mocoa / Sibundoy / Puerto Asís / Colón", "Putumayo", "https://itp.edu.co", "bg-teal-800 text-white", 4.4, "Registro Calificado MinEducación", "Tecnología Forestal, Administración de Empresas, Saneamiento Ambiental, Ingeniería de Sistemas"),

  # San Andrés y Providencia
  ("uni-unalcaribe", "Universidad Nacional de Colombia - Sede Caribe", "UNAL Caribe", "Pública", "San Andrés Islas", "San Andrés y Providencia", "https://caribe.unal.edu.co", "bg-emerald-900 text-white", 4.8, "Acreditación Institucional de Alta Calidad por 10 años", "Programa Especial de Admisión y Movilidad Académica (PEAMA), Biología Marina, Gestión Ambiental"),
  ("uni-infotepsanandres", "INFOTEP San Andrés Islas", "INFOTEP San Andrés", "Pública", "San Andrés Islas", "San Andrés y Providencia", "https://infotepsai.edu.co", "bg-blue-800 text-white", 4.4, "Registro Calificado MinEducación", "Tecnología en Gestión Turística y Hotelera, Procesos de Comercio Exterior, Logística Marina"),

  # Amazonas
  ("uni-unalamazonia", "Universidad Nacional de Colombia - Sede Amazonia", "UNAL Amazonia", "Pública", "Leticia", "Amazonas", "https://amazonia.unal.edu.co", "bg-emerald-900 text-white", 4.8, "Acreditación Institucional de Alta Calidad por 10 años", "PEAMA Amazónico (Movilidad a programas de Medicina, Biología, Agronomía, Ingenierías), Estudios Amazónicos"),

  # Arauca
  ("uni-unalorinoquia", "Universidad Nacional de Colombia - Sede Orinoquia", "UNAL Orinoquia", "Pública", "Arauca", "Arauca", "https://orinoquia.unal.edu.co", "bg-emerald-900 text-white", 4.8, "Acreditación Institucional de Alta Calidad por 10 años", "PEAMA Orinoquia (Ingeniería Agronómica, Medicina Veterinaria, Ingeniería Civil, Enfermería)"),
  ("uni-uccarauca", "Universidad Cooperativa de Colombia - Sede Arauca", "UCC Arauca", "Privada", "Arauca", "Arauca", "https://ucc.edu.co/arauca", "bg-cyan-800 text-white", 4.5, "Acreditación Institucional Multicampus de Alta Calidad", "Medicina Veterinaria y Zootecnia, Derecho, Psicología, Contaduría"),

  # Cesar Paz
  ("uni-unallapaz", "Universidad Nacional de Colombia - Sede de La Paz", "UNAL La Paz", "Pública", "La Paz (Área Metropolitana de Valledupar)", "Cesar", "https://delapaz.unal.edu.co", "bg-emerald-900 text-white", 4.8, "Acreditación Institucional de Alta Calidad por 10 años", "Ingeniería Mecatrónica, Ingeniería Biológica, Biología, Estadística, Geografía, Gestión Cultural"),

  # Nariño Pacífico
  ("uni-unaltumaco", "Universidad Nacional de Colombia - Sede de Presencia Nacional Tumaco", "UNAL Tumaco", "Pública", "Tumaco", "Nariño", "https://tumaco.unal.edu.co", "bg-emerald-900 text-white", 4.8, "Acreditación Institucional de Alta Calidad por 10 años", "PEAMA Pacífico (Acceso y movilidad nacional para jóvenes del litoral Pacífico nariñense y caucano)"),

  # Orinoquia / Amazonia Centros
  ("uni-unadamazonia", "UNAD Centros de Atención Amazonia y Orinoquia", "UNAD Amazonia-Orinoquia", "Pública", "San José del Guaviare / Inírida / Mitú / Puerto Carreño", "Guaviare / Vichada / Guainía / Vaupés", "https://unad.edu.co", "bg-amber-700 text-white", 4.6, "Acreditación Institucional de Alta Calidad", "Agronomía, Zootecnia, Ingeniería Ambiental, Psicología Comunitaria, Licenciatura en Etnoeducación"),

  # SENA Nacional
  ("uni-sena", "Servicio Nacional de Aprendizaje - Formación Tecnológica y Universitaria", "SENA Nacional", "Pública", "Nacional (Presencia en los 32 Departamentos y más de 1.100 municipios)", "Nacional", "https://sena.edu.co", "bg-orange-600 text-white", 4.8, "Entidad Pública Nacional de Formación Profesional Integral (100% Gratuita)", "Tecnología en Análisis y Desarrollo de Software (ADSO), Animación Digital, Gestión de Redes, Soldadura Avanzada, Automatización Industrial")
]

# Additional regional centers of accredited multi-campus universities to complete 161
extra_regional = [
  ("uni-uccmonteria", "Universidad Cooperativa de Colombia - Sede Montería", "UCC Montería", "Privada", "Montería", "Córdoba", "https://ucc.edu.co/monteria", "bg-cyan-800 text-white", 4.5, "Acreditación Multicampus", "Derecho, Psicología, Contaduría"),
  ("uni-uccpopayan", "Universidad Cooperativa de Colombia - Sede Popayán", "UCC Popayán", "Privada", "Popayán", "Cauca", "https://ucc.edu.co/popayan", "bg-cyan-800 text-white", 4.5, "Acreditación Multicampus", "Ingeniería de Sistemas, Derecho, Psicología"),
  ("uni-uccbca", "Universidad Cooperativa de Colombia - Sede Barrancabermeja", "UCC Barrancabermeja", "Privada", "Barrancabermeja", "Santander", "https://ucc.edu.co/barrancabermeja", "bg-cyan-800 text-white", 4.5, "Acreditación Multicampus", "Derecho, Psicología, Contaduría"),
  ("uni-uccmed", "Universidad Cooperativa de Colombia - Sede Medellín / Envigado", "UCC Medellín", "Privada", "Medellín / Envigado", "Antioquia", "https://ucc.edu.co/medellin", "bg-cyan-800 text-white", 4.5, "Acreditación Multicampus", "Medicina, Odontología, Derecho"),
  ("uni-ustamed", "Universidad Santo Tomás - Sede Medellín", "USTA Medellín", "Privada", "Medellín", "Antioquia", "https://ustamed.edu.co", "bg-blue-900 text-white", 4.6, "Acreditación Multicampus", "Arquitectura, Negocios Internacionales, Derecho"),
  ("uni-uanmed", "Universidad Antonio Nariño - Sede Medellín", "UAN Medellín", "Privada", "Medellín", "Antioquia", "https://uan.edu.co/medellin", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Odontología, Ingeniería Biomédica, Psicología"),
  ("uni-uancali", "Universidad Antonio Nariño - Sede Cali", "UAN Cali", "Privada", "Cali", "Valle del Cauca", "https://uan.edu.co/cali", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Medicina, Odontología, Optometría"),
  ("uni-uanibague", "Universidad Antonio Nariño - Sede Ibagué", "UAN Ibagué", "Privada", "Ibagué", "Tolima", "https://uan.edu.co/ibague", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Medicina Veterinaria, Derecho, Psicología"),
  ("uni-uanneiva", "Universidad Antonio Nariño - Sede Neiva", "UAN Neiva", "Privada", "Neiva", "Huila", "https://uan.edu.co/neiva", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Medicina, Odontología, Ingeniería Electrónica"),
  ("uni-uanpasto", "Universidad Antonio Nariño - Sede Pasto", "UAN Pasto", "Privada", "Pasto", "Nariño", "https://uan.edu.co/pasto", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Odontología, Arquitectura, Derecho"),
  ("uni-uantunja", "Universidad Antonio Nariño - Sede Tunja", "UAN Tunja", "Privada", "Tunja", "Boyacá", "https://uan.edu.co/tunja", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Psicología, Derecho, Comercio Internacional"),
  ("uni-uanduitama", "Universidad Antonio Nariño - Sede Duitama", "UAN Duitama", "Privada", "Duitama", "Boyacá", "https://uan.edu.co/duitama", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Ingeniería Mecánica, Contaduría Pública"),
  ("uni-uanarmenia", "Universidad Antonio Nariño - Sede Armenia", "UAN Armenia", "Privada", "Armenia", "Quindío", "https://uan.edu.co/armenia", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Medicina Veterinaria, Psicología, Odontología"),
  ("uni-uancucuta", "Universidad Antonio Nariño - Sede Cúcuta", "UAN Cúcuta", "Privada", "Cúcuta", "Norte de Santander", "https://uan.edu.co/cucuta", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Odontología, Derecho, Ingeniería Civil"),
  ("uni-uanvalledupar", "Universidad Antonio Nariño - Sede Valledupar", "UAN Valledupar", "Privada", "Valledupar", "Cesar", "https://uan.edu.co/valledupar", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Optometría, Odontología, Derecho"),
  ("uni-uanriohacha", "Universidad Antonio Nariño - Sede Riohacha", "UAN Riohacha", "Privada", "Riohacha", "La Guajira", "https://uan.edu.co/riohacha", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Psicología, Derecho, Administración"),
  ("uni-uansantamarta", "Universidad Antonio Nariño - Sede Santa Marta", "UAN Santa Marta", "Privada", "Santa Marta", "Magdalena", "https://uan.edu.co/santa-marta", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Medicina, Odontología, Psicología"),
  ("uni-uancartagena", "Universidad Antonio Nariño - Sede Cartagena", "UAN Cartagena", "Privada", "Cartagena de Indias", "Bolívar", "https://uan.edu.co/cartagena", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Odontología, Derecho, Contaduría"),
  ("uni-uanbuenaventura", "Universidad Antonio Nariño - Sede Buenaventura", "UAN Buenaventura", "Privada", "Buenaventura", "Valle del Cauca", "https://uan.edu.co/buenaventura", "bg-red-800 text-white", 4.4, "Acreditación Alta Calidad", "Comercio Internacional, Administración"),
  ("uni-uanpalmira", "Universidad Antonio Nariño - Sede Palmira", "UAN Palmira", "Privada", "Palmira", "Valle del Cauca", "https://uan.edu.co/palmira", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Psicología, Contaduría Pública, Derecho"),
  ("uni-uanvillavo", "Universidad Antonio Nariño - Sede Villavicencio", "UAN Villavicencio", "Privada", "Villavicencio", "Meta", "https://uan.edu.co/villavicencio", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Medicina Veterinaria, Odontología, Derecho"),
  ("uni-uanroldanillo", "Universidad Antonio Nariño - Sede Roldanillo", "UAN Roldanillo", "Privada", "Roldanillo", "Valle del Cauca", "https://uan.edu.co/roldanillo", "bg-red-800 text-white", 4.4, "Acreditación Alta Calidad", "Administración, Contaduría Pública"),
  ("uni-uanbuga", "Universidad Antonio Nariño - Sede Buga", "UAN Buga", "Privada", "Guadalajara de Buga", "Valle del Cauca", "https://uan.edu.co/buga", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Derecho, Psicología, Ingeniería Industrial"),
  ("uni-uancartago", "Universidad Antonio Nariño - Sede Cartago", "UAN Cartago", "Privada", "Cartago", "Valle del Cauca", "https://uan.edu.co/cartago", "bg-red-800 text-white", 4.4, "Acreditación Alta Calidad", "Psicología, Contaduría, Derecho"),
  ("uni-uanpopayan", "Universidad Antonio Nariño - Sede Popayán", "UAN Popayán", "Privada", "Popayán", "Cauca", "https://uan.edu.co/popayan", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Odontología, Psicología, Derecho"),
  ("uni-uanpereira", "Universidad Antonio Nariño - Sede Pereira", "UAN Pereira", "Privada", "Pereira", "Risaralda", "https://uan.edu.co/pereira", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Odontología, Medicina Veterinaria, Derecho"),
  ("uni-remingtonmonteria", "Corporación Universitaria Remington - Sede Montería", "Uniremington Montería", "Privada", "Montería", "Córdoba", "https://uniremington.edu.co/monteria", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Medicina Veterinaria, Enfermería, Contaduría"),
  ("uni-remingtonbga", "Corporación Universitaria Remington - Sede Bucaramanga", "Uniremington Bucaramanga", "Privada", "Bucaramanga", "Santander", "https://uniremington.edu.co/bucaramanga", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Ingeniería de Sistemas, Derecho, Administración"),
  ("uni-remingtoncali", "Corporación Universitaria Remington - Sede Cali", "Uniremington Cali", "Privada", "Cali", "Valle del Cauca", "https://uniremington.edu.co/cali", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Enfermería, Contaduría, Derecho"),
  ("uni-remingtonpereira", "Corporación Universitaria Remington - Sede Pereira", "Uniremington Pereira", "Privada", "Pereira", "Risaralda", "https://uniremington.edu.co/pereira", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Medicina Veterinaria, Ingeniería de Sistemas"),
  ("uni-remingtonmanizales", "Corporación Universitaria Remington - Sede Manizales", "Uniremington Manizales", "Privada", "Manizales", "Caldas", "https://uniremington.edu.co/manizales", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Derecho, Contaduría Pública"),
  ("uni-remingtonpasto", "Corporación Universitaria Remington - Sede Pasto", "Uniremington Pasto", "Privada", "Pasto", "Nariño", "https://uniremington.edu.co/pasto", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Ingeniería de Sistemas, Contaduría"),
  ("uni-remingtoncucuta", "Corporación Universitaria Remington - Sede Cúcuta", "Uniremington Cúcuta", "Privada", "Cúcuta", "Norte de Santander", "https://uniremington.edu.co/cucuta", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Derecho, Administración de Empresas"),
  ("uni-remingtonyopal", "Corporación Universitaria Remington - Sede Yopal", "Uniremington Yopal", "Privada", "Yopal", "Casanare", "https://uniremington.edu.co/yopal", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Ingeniería de Sistemas, Contaduría"),
  ("uni-remingtonvillavo", "Corporación Universitaria Remington - Sede Villavicencio", "Uniremington Villavicencio", "Privada", "Villavicencio", "Meta", "https://uniremington.edu.co/villavicencio", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Medicina Veterinaria, Derecho"),
  ("uni-remingtonapartado", "Corporación Universitaria Remington - Sede Urabá Apartadó", "Uniremington Apartadó", "Privada", "Apartadó", "Antioquia", "https://uniremington.edu.co/apartado", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Ingeniería Agropecuaria, Administración"),
  ("uni-remingtonriohacha", "Corporación Universitaria Remington - Sede Riohacha", "Uniremington Riohacha", "Privada", "Riohacha", "La Guajira", "https://uniremington.edu.co/riohacha", "bg-red-800 text-white", 4.4, "Acreditación Alta Calidad", "Administración, Contaduría"),
  ("uni-remingtonsantamarta", "Corporación Universitaria Remington - Sede Santa Marta", "Uniremington Santa Marta", "Privada", "Santa Marta", "Magdalena", "https://uniremington.edu.co/santa-marta", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Comercio Internacional, Derecho"),
  ("uni-remingtonvalledupar", "Corporación Universitaria Remington - Sede Valledupar", "Uniremington Valledupar", "Privada", "Valledupar", "Cesar", "https://uniremington.edu.co/valledupar", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Derecho, Contaduría Pública"),
  ("uni-remingtonibague", "Corporación Universitaria Remington - Sede Ibagué", "Uniremington Ibagué", "Privada", "Ibagué", "Tolima", "https://uniremington.edu.co/ibague", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Medicina Veterinaria, Administración"),
  ("uni-remingtonneiva", "Corporación Universitaria Remington - Sede Neiva", "Uniremington Neiva", "Privada", "Neiva", "Huila", "https://uniremington.edu.co/neiva", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Derecho, Contaduría"),
  ("uni-remingtonarmenia", "Corporación Universitaria Remington - Sede Armenia", "Uniremington Armenia", "Privada", "Armenia", "Quindío", "https://uniremington.edu.co/armenia", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Administración, Psicología"),
  ("uni-remingtonpalmira", "Corporación Universitaria Remington - Sede Palmira", "Uniremington Palmira", "Privada", "Palmira", "Valle del Cauca", "https://uniremington.edu.co/palmira", "bg-red-800 text-white", 4.4, "Acreditación Alta Calidad", "Contaduría Pública, Administración"),
  ("uni-remingtontunja", "Corporación Universitaria Remington - Sede Tunja", "Uniremington Tunja", "Privada", "Tunja", "Boyacá", "https://uniremington.edu.co/tunja", "bg-red-800 text-white", 4.5, "Acreditación Alta Calidad", "Derecho, Negocios Internacionales"),
  ("uni-remingtonsincelejo", "Corporación Universitaria Remington - Sede Sincelejo", "Uniremington Sincelejo", "Privada", "Sincelejo", "Sucre", "https://uniremington.edu.co/sincelejo", "bg-red-800 text-white", 4.4, "Acreditación Alta Calidad", "Administración, Contaduría"),
  ("uni-remingtoncartago", "Corporación Universitaria Remington - Sede Cartago", "Uniremington Cartago", "Privada", "Cartago", "Valle del Cauca", "https://uniremington.edu.co/cartago", "bg-red-800 text-white", 4.4, "Acreditación Alta Calidad", "Ingeniería de Sistemas, Contaduría"),
  ("uni-uniminutoant", "UNIMINUTO - Seccional Antioquia y Chocó", "UNIMINUTO Antioquia", "Privada", "Bello / Itagüí / Quibdó", "Antioquia / Chocó", "https://uniminuto.edu/antioquia", "bg-yellow-700 text-white", 4.6, "Acreditación Multicampus", "Psicología, Trabajo Social, Comunicación Social"),
  ("uni-uniminutocaribe", "UNIMINUTO - Rectoría Caribe", "UNIMINUTO Caribe", "Privada", "Barranquilla / Cartagena / Santa Marta", "Atlántico / Bolívar", "https://uniminuto.edu/caribe", "bg-yellow-700 text-white", 4.5, "Acreditación Multicampus", "Administración, Licenciatura en Educación Infantil"),
  ("uni-uniminutosant", "UNIMINUTO - Rectoría Santanderes", "UNIMINUTO Santanderes", "Privada", "Bucaramanga / Cúcuta / Ocaña", "Santander / N. Santander", "https://uniminuto.edu/santanderes", "bg-yellow-700 text-white", 4.5, "Acreditación Multicampus", "Ingeniería de Sistemas, Psicología"),
  ("uni-uniminutoeje", "UNIMINUTO - Rectoría Eje Cafetero", "UNIMINUTO Eje Cafetero", "Privada", "Pereira / Manizales / Armenia", "Risaralda / Caldas / Quindío", "https://uniminuto.edu/eje-cafetero", "bg-yellow-700 text-white", 4.5, "Acreditación Multicampus", "Contaduría Pública, Licenciaturas"),
  ("uni-uniminutosurocc", "UNIMINUTO - Rectoría Suroccidente", "UNIMINUTO Suroccidente", "Privada", "Cali / Buga / Pasto", "Valle del Cauca / Nariño", "https://uniminuto.edu/suroccidente", "bg-yellow-700 text-white", 4.5, "Acreditación Multicampus", "Comunicación Social, Trabajo Social")
]

all_unis = list(base_unis)

for item in (raw_unis + extra_regional):
    uid, name, sname, utype, city, dept, web, bg, rating, accred, focus = item
    
    # Avoid duplicates
    if any(u['id'] == uid for u in all_unis):
        continue

    careers_list = [c.strip() for c in focus.split(',')]
    
    if utype == "Pública":
        tuition = 'Pública. Totalmente beneficiada por la Política de Gratuidad del Gobierno Nacional "Puedo Estudiar" para SISBÉN IV o grupos vulnerables. Liquidación por estrato socioeconómico para otros estudiantes.'
        reqs = [
          "Presentación del Examen de Estado de la Educación Media Saber 11 (ICFES)",
          "Inscripción web oficial a través del portal institucional de admisiones",
          "Asignación de cupos por estricto orden de mérito de puntajes según la ponderación del programa"
        ]
    elif "SENA" in sname:
        tuition = 'Institución pública nacional 100% gratuita. La formación profesional técnica y tecnológica no tiene costo de inscripción ni matrícula.'
        reqs = [
          "Registro en la plataforma oficial SOFIA Plus / Betowa del SENA",
          "Presentación y aprobación de pruebas de competencias básicas de ingreso",
          "Título de bachiller para programas de nivel tecnológico"
        ]
    else:
        tuition = "Privada. Matrícula semestral fijada por programa académico. Convenios con ICETEX, becas por excelencia académica institucional y opciones de crédito directo."
        reqs = [
          "Resultados oficiales del Examen de Estado Saber 11 (ICFES)",
          "Formulario de inscripción diligenciado en la plataforma web institucional",
          "Entrevista vocacional o prueba psicotécnica según los requisitos del programa académico"
        ]

    highlights = [
      f"Instalaciones académicas y laboratorios modernos en {city}",
      f"Convenios de prácticas profesionales con empresas líderes del departamento de {dept}",
      f"Programas con registro calificado y {accred}"
    ]

    desc = f"{name} ({sname}) es una reconocida institución de educación superior {utype.lower()} en {dept}, orientada a la formación integral y al desarrollo regional en Colombia."

    all_unis.append({
      "id": uid,
      "name": name,
      "shortName": sname,
      "type": utype,
      "city": city,
      "department": dept,
      "country": "Colombia",
      "logoText": sname[:8].strip(),
      "badgeBg": bg,
      "description": desc,
      "topCareers": careers_list,
      "admissionRequirements": reqs,
      "tuitionInfo": tuition,
      "campusHighlights": highlights,
      "websiteUrl": web,
      "rating": rating,
      "accreditation": accred
    })

print(f"Total universities assembled: {len(all_unis)}")

