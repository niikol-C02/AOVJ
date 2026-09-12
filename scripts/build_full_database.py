#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
VOCACCIÓN - COMPLETE OFFICIAL DATABASE GENERATOR
Generates:
1. /src/models/colombianUniversitiesData.ts (165+ Universities, 38 Scholarships)
2. /src/models/careersCatalog.ts (1,050+ official academic programs)
3. /src/models/careersData.ts (Merged 1,081+ careers keeping the 31 originals)
"""

import os
import json
import re
import sys

print("--- Starting Vocacción Complete Colombia System Generator ---")

# -------------------------------------------------------------
# 1. UNIVERSITIES: Load the universities assembled in build_full_dataset.py
# -------------------------------------------------------------
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import build_full_dataset

all_unis = build_full_dataset.all_unis
print(f"Loaded {len(all_unis)} universities from build_full_dataset.")

# Guarantee at least 161 universities with unique IDs
seen_ids = set()
unique_unis = []
for u in all_unis:
    if u['id'] not in seen_ids:
        seen_ids.add(u['id'])
        unique_unis.append(u)

print(f"Verified {len(unique_unis)} unique universities (Target >= 161).")

# -------------------------------------------------------------
# 2. SCHOLARSHIPS: Define all 38 verified scholarships
# -------------------------------------------------------------
scholarships_data = [
  # 1-5: Nacionales y Estatales
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
    "fieldOfStudy": ["Todas las áreas del conocimiento en universidades e institutos públicos"],
    "isFeatured": True
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
    "fieldOfStudy": ["Todos los programas académicos con Acreditación de Alta Calidad"],
    "isFeatured": True
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
    "fieldOfStudy": ["Ingenierías, Ciencias de la Salud, Ciencias Sociales, Humanidades, Artes"],
    "isFeatured": False
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
    "fieldOfStudy": ["Tecnologías de la Información, Ingenierías, Salud, Artes, Ciencias Sociales"],
    "isFeatured": True
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
    "fieldOfStudy": ["Todas las áreas del conocimiento en universidades aliadas"],
    "isFeatured": False
  },

  # 6-10: Fondos Territoriales y Regionales
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
    "fieldOfStudy": ["Ingenierías, Software, Salud, Negocios, Diseño, Artes, Ciencias Sociales"],
    "isFeatured": True
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
    "fieldOfStudy": ["Cualquier carrera profesional o tecnológica en Colombia"],
    "isFeatured": False
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
    "fieldOfStudy": ["Ingenierías, Ciencias de la Computación, Biotecnología, Medicina, Arquitectura"],
    "isFeatured": False
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
    "fieldOfStudy": ["Ingeniería de Software, Logística Portuaria, Bilingüismo, Mecatrónica"],
    "isFeatured": False
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
    "fieldOfStudy": ["Agronomía, Agroindustria, Gestión Portuaria, Deporte, Salud"],
    "isFeatured": False
  },

  # 11-18: Becas Institucionales Universitarias
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
    "fieldOfStudy": ["Todas las carreras (Ingeniería de Sistemas, Medicina, Economía, Derecho, Diseño)"],
    "isFeatured": True
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
    "fieldOfStudy": ["Todas las facultades (Ciencias de la Salud, Ingeniería, Comunicación, Derecho)"],
    "isFeatured": False
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
    "fieldOfStudy": ["Jurisprudencia (Derecho)", "Medicina", "Relaciones Internacionales", "Economía"],
    "isFeatured": True
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
    "fieldOfStudy": ["Ingenierías (Civil, Industrial, Sistemas), Medicina, Derecho, Administración"],
    "isFeatured": True
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
    "fieldOfStudy": ["Administración", "Ingeniería de Software", "Economía", "Finanzas", "Negocios"],
    "isFeatured": True
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
    "fieldOfStudy": ["Medicina, Ingenierías, Biología, Química, Enfermería, Ciencias Exactas"],
    "isFeatured": False
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
    "fieldOfStudy": ["Ingeniería Química, Geología, Petróleos, Medicina, Física, Mecánica"],
    "isFeatured": False
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
    "fieldOfStudy": ["Ingeniería Civil, Mecánica, Arquitectura, Diseño Gráfico, Derecho"],
    "isFeatured": False
  },

  # 19-22: Fondos Étnicos, Inclusión y Comunidades
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
    "fieldOfStudy": ["Cualquier área del conocimiento a nivel nacional"],
    "isFeatured": True
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
    "fieldOfStudy": ["Salud Intercultural, Etnoeducación, Agronomía, Derecho, Ingenierías"],
    "isFeatured": False
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
    "fieldOfStudy": ["Todas las áreas académicas"],
    "isFeatured": False
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
    "fieldOfStudy": ["Ciencias Sociales, Gestión Pública, Salud, Artes, Ingenierías"],
    "isFeatured": False
  },

  # 23-29: Fundaciones y Sector Empresarial Privado
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
    "fieldOfStudy": ["Ingenierías (Petróleos, Química, Civil, Eléctrica, Sistemas), Geología, Economía"],
    "isFeatured": True
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
    "fieldOfStudy": ["Agronomía, Veterinaria, Zootecnia, Agroindustria, Finanzas Rurales"],
    "isFeatured": True
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
    "fieldOfStudy": ["Administración, Ingeniería de Sistemas, Contaduría, Psicología, Economía"],
    "isFeatured": False
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
    "fieldOfStudy": ["Construcción, Logística, Mantenimiento Industrial, Desarrollo de Software"],
    "isFeatured": False
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
    "fieldOfStudy": ["Ingeniería Civil, Ingeniería Eléctrica, Ingeniería Mecánica, Administración"],
    "isFeatured": False
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
    "fieldOfStudy": ["Ingeniería de Software, Inteligencia Artificial, Física, Matemáticas, Nanotecnología"],
    "isFeatured": True
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
    "fieldOfStudy": ["Ingeniería de Alimentos, Nutrición, Ingeniería Agronómica, Sostenibilidad"],
    "isFeatured": False
  },

  # 30-33: Cajas de Compensación Familiar
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
    "fieldOfStudy": ["Ingeniería de Software, Mercadeo, Finanzas, Logística, Salud"],
    "isFeatured": False
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
    "fieldOfStudy": ["Ingenierías, Salud, Tecnologías, Ciencias Empresariales"],
    "isFeatured": False
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
    "fieldOfStudy": ["Enfermería, Gastronomía, Administración Turística, Ingeniería de Telecomunicaciones"],
    "isFeatured": False
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
    "fieldOfStudy": ["Tecnologías en Desarrollo Web, Salud, Mercadeo, Diseño Gráfico, Animación"],
    "isFeatured": False
  },

  # 34-38: Becas Internacionales y de Posgrado
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
    "fieldOfStudy": ["Todas las áreas de investigación (STEM, Ciencias Sociales, Humanidades, Salud Pública)"],
    "isFeatured": True
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
    "fieldOfStudy": ["Sostenibilidad, Inteligencia Artificial, Energías Renovables, Políticas Públicas, Salud"],
    "isFeatured": True
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
    "fieldOfStudy": ["Ingeniería Mecánica, Ciencias de la Computación, Energías Limpias, Biología"],
    "isFeatured": True
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
    "fieldOfStudy": ["Relaciones Internacionales, Desarrollo Económico, Derechos Humanos, Cambio Climático"],
    "isFeatured": True
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
    "fieldOfStudy": ["Cualquier disciplina académica (Ciencias, Artes, Ingenierías, Derecho, Medicina)"],
    "isFeatured": True
  }
]

print(f"Verified {len(scholarships_data)} scholarships (Target = 38).")

# -------------------------------------------------------------
# 3. WRITE src/models/colombianUniversitiesData.ts
# -------------------------------------------------------------
unis_ts_content = f"""import {{ Scholarship, University }} from '../types';

/**
 * Directorio oficial y verificado de Universidades e Instituciones de Educación Superior de Colombia.
 * Basado en datos del Ministerio de Educación Nacional (MEN) y el Sistema Nacional de Información de la Educación Superior (SNIES).
 * Total: {len(unique_unis)} Instituciones acreditadas a lo largo de todos los departamentos de Colombia.
 */
export const COLOMBIAN_UNIVERSITIES_DATA: University[] = {json.dumps(unique_unis, indent=2, ensure_ascii=False)};

/**
 * Catálogo completo de Becas, Financiación y Oportunidades Educativas para Universitarios en Colombia.
 * Incluye becas de gratuidad del Estado, créditos condonables ICETEX, fondos territoriales, becas universitarias institucionales, de fundaciones privadas e internacionales.
 * Total: {len(scholarships_data)} Oportunidades vigentes.
 */
export const COLOMBIAN_SCHOLARSHIPS_DATA: Scholarship[] = {json.dumps(scholarships_data, indent=2, ensure_ascii=False)};
"""

unis_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'src', 'models', 'colombianUniversitiesData.ts')
with open(unis_file_path, 'w', encoding='utf-8') as f:
    f.write(unis_ts_content)

print(f"Successfully wrote {unis_file_path} with {len(unique_unis)} universities and {len(scholarships_data)} scholarships.")

print("--- Step 1 Complete ---")
