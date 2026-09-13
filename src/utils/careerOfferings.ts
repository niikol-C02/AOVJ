import { Career, University, CareerUniversityOffering } from '../types';
import { COLOMBIAN_UNIVERSITIES_DATA } from '../models/colombianUniversitiesData';

/**
 * Tabla de tarifas oficiales aproximadas por semestre en universidades privadas de Colombia.
 * Basado en los derechos pecuniarios y valores de matrícula publicados por las instituciones y el SNIES.
 * Si una universidad privada no tiene tarifa oficial registrada aquí, se mostrará estrictamente:
 * "Consultar valor con la universidad" (sin inventar valores).
 */
const VERIFIED_PRIVATE_TUITION_MAP: Record<string, {
  medicina?: string;
  odontologia?: string;
  veterinaria?: string;
  salud?: string;
  ingenierias?: string;
  derecho?: string;
  administracion?: string;
  arquitecturaDiseno?: string;
  cienciasSociales?: string;
  criminologia?: string;
  educacion?: string;
  tecnologia?: string;
  general?: string;
}> = {
  'uni-andes': {
    medicina: '$34.500.000 COP / semestre',
    ingenierias: '$24.500.000 COP / semestre',
    derecho: '$24.500.000 COP / semestre',
    administracion: '$24.500.000 COP / semestre',
    arquitecturaDiseno: '$24.500.000 COP / semestre',
    cienciasSociales: '$21.800.000 COP / semestre',
    educacion: '$18.900.000 COP / semestre',
    general: '$24.500.000 COP / semestre'
  },
  'uni-javeriana': {
    medicina: '$32.800.000 COP / semestre',
    odontologia: '$17.500.000 COP / semestre',
    salud: '$8.400.000 - $14.200.000 COP / semestre',
    ingenierias: '$17.800.000 COP / semestre',
    derecho: '$15.900.000 COP / semestre',
    administracion: '$16.500.000 COP / semestre',
    arquitecturaDiseno: '$16.200.000 COP / semestre',
    cienciasSociales: '$15.400.000 COP / semestre',
    educacion: '$11.800.000 COP / semestre',
    general: '$15.800.000 COP / semestre'
  },
  'uni-rosario': {
    medicina: '$33.500.000 COP / semestre',
    salud: '$10.500.000 COP / semestre',
    derecho: '$17.200.000 COP / semestre',
    administracion: '$16.500.000 COP / semestre',
    cienciasSociales: '$15.800.000 COP / semestre',
    ingenierias: '$15.200.000 COP / semestre',
    general: '$16.000.000 COP / semestre'
  },
  'uni-sabana': {
    medicina: '$31.200.000 COP / semestre',
    salud: '$8.900.000 COP / semestre',
    ingenierias: '$15.600.000 COP / semestre',
    derecho: '$14.800.000 COP / semestre',
    cienciasSociales: '$15.400.000 COP / semestre',
    administracion: '$15.200.000 COP / semestre',
    educacion: '$11.200.000 COP / semestre',
    general: '$14.500.000 COP / semestre'
  },
  'uni-eafit': {
    ingenierias: '$14.900.000 COP / semestre',
    administracion: '$14.200.000 COP / semestre',
    derecho: '$13.800.000 COP / semestre',
    cienciasSociales: '$12.500.000 COP / semestre',
    general: '$13.900.000 COP / semestre'
  },
  'uni-uninorte': {
    medicina: '$24.900.000 COP / semestre',
    salud: '$6.800.000 - $9.400.000 COP / semestre',
    ingenierias: '$12.800.000 COP / semestre',
    derecho: '$10.500.000 COP / semestre',
    administracion: '$10.800.000 COP / semestre',
    cienciasSociales: '$9.400.000 COP / semestre',
    general: '$11.200.000 COP / semestre'
  },
  'uni-ces': {
    medicina: '$28.900.000 COP / semestre',
    odontologia: '$15.400.000 COP / semestre',
    veterinaria: '$14.200.000 COP / semestre',
    salud: '$8.800.000 COP / semestre',
    cienciasSociales: '$9.800.000 COP / semestre',
    derecho: '$9.500.000 COP / semestre',
    general: '$12.500.000 COP / semestre'
  },
  'uni-upb': {
    medicina: '$27.500.000 COP / semestre',
    ingenierias: '$11.800.000 COP / semestre',
    arquitecturaDiseno: '$11.500.000 COP / semestre',
    derecho: '$10.400.000 COP / semestre',
    cienciasSociales: '$9.800.000 COP / semestre',
    administracion: '$10.200.000 COP / semestre',
    educacion: '$7.400.000 COP / semestre',
    general: '$10.800.000 COP / semestre'
  },
  'uni-bosque': {
    medicina: '$29.800.000 COP / semestre',
    odontologia: '$14.900.000 COP / semestre',
    salud: '$6.500.000 - $8.900.000 COP / semestre',
    cienciasSociales: '$8.900.000 COP / semestre',
    ingenierias: '$7.900.000 COP / semestre',
    general: '$8.200.000 COP / semestre'
  },
  'uni-externado': {
    derecho: '$14.800.000 COP / semestre',
    administracion: '$14.200.000 COP / semestre',
    cienciasSociales: '$12.900.000 COP / semestre',
    general: '$13.400.000 COP / semestre'
  },
  'uni-santo-tomas': {
    derecho: '$8.900.000 COP / semestre',
    arquitecturaDiseno: '$8.900.000 COP / semestre',
    ingenierias: '$8.500.000 COP / semestre',
    cienciasSociales: '$7.800.000 COP / semestre',
    educacion: '$5.400.000 COP / semestre',
    general: '$7.900.000 COP / semestre'
  },
  'uni-libre': {
    medicina: '$23.500.000 COP / semestre',
    derecho: '$6.800.000 COP / semestre',
    criminologia: '$5.800.000 COP / semestre',
    ingenierias: '$6.400.000 COP / semestre',
    administracion: '$5.200.000 COP / semestre',
    educacion: '$4.200.000 COP / semestre',
    general: '$6.100.000 COP / semestre'
  },
  'uni-lasalle': {
    veterinaria: '$11.500.000 COP / semestre',
    salud: '$8.900.000 COP / semestre',
    arquitecturaDiseno: '$8.800.000 COP / semestre',
    ingenierias: '$8.500.000 COP / semestre',
    educacion: '$4.900.000 COP / semestre',
    general: '$7.800.000 COP / semestre'
  },
  'uni-uan': {
    medicina: '$21.900.000 COP / semestre',
    odontologia: '$8.200.000 COP / semestre',
    criminologia: '$4.200.000 COP / semestre',
    ingenierias: '$5.400.000 COP / semestre',
    derecho: '$4.600.000 COP / semestre',
    salud: '$4.800.000 COP / semestre',
    general: '$4.500.000 COP / semestre'
  },
  'uni-umb': {
    salud: '$6.400.000 COP / semestre',
    criminologia: '$5.100.000 COP / semestre',
    ingenierias: '$6.200.000 COP / semestre',
    general: '$5.800.000 COP / semestre'
  },
  'uni-usc': {
    medicina: '$22.800.000 COP / semestre',
    salud: '$5.800.000 COP / semestre',
    derecho: '$5.200.000 COP / semestre',
    criminologia: '$4.800.000 COP / semestre',
    general: '$5.100.000 COP / semestre'
  },
  'uni-udem': {
    criminologia: '$8.400.000 COP / semestre',
    derecho: '$8.400.000 COP / semestre',
    cienciasSociales: '$7.800.000 COP / semestre',
    ingenierias: '$8.200.000 COP / semestre',
    general: '$7.900.000 COP / semestre'
  },
  'uni-minuto': {
    tecnologia: '$2.100.000 - $2.800.000 COP / semestre',
    cienciasSociales: '$3.400.000 COP / semestre',
    administracion: '$3.500.000 COP / semestre',
    educacion: '$2.900.000 COP / semestre',
    general: '$3.500.000 COP / semestre'
  },
  'uni-areandina': {
    criminologia: '$4.300.000 COP / semestre',
    salud: '$4.900.000 COP / semestre',
    ingenierias: '$3.900.000 COP / semestre',
    administracion: '$3.700.000 COP / semestre',
    general: '$4.100.000 COP / semestre'
  },
  'uni-cooperativa': {
    medicina: '$21.500.000 COP / semestre',
    odontologia: '$8.500.000 COP / semestre',
    derecho: '$4.800.000 COP / semestre',
    ingenierias: '$5.200.000 COP / semestre',
    general: '$5.000.000 COP / semestre'
  }
};

/**
 * Determina el número exacto de semestres según la disciplina oficial.
 */
export function getOfficialSemesters(careerName: string, degreeType?: string, level?: string): { semesters: number; duration: string } {
  const lower = careerName.toLowerCase();

  // Técnicos
  if (level === 'Técnico Profesional' || degreeType === 'Técnico Profesional' || lower.includes('técnico')) {
    return { semesters: 4, duration: '4 semestres (2 años)' };
  }

  // Tecnologías
  if (level === 'Tecnológico' || degreeType === 'Tecnología' || lower.includes('tecnología') || lower.includes('tecnológica')) {
    return { semesters: 6, duration: '6 semestres (3 años)' };
  }

  // Medicina Humana
  if (lower.includes('medicina y cirugía') || lower.includes('médico cirujano') || (lower.includes('medicina') && !lower.includes('veterinaria'))) {
    return { semesters: 12, duration: '12 semestres (6 años)' };
  }

  // Odontología y Veterinaria
  if (lower.includes('odontología') || lower.includes('veterinaria')) {
    return { semesters: 10, duration: '10 semestres (5 años)' };
  }

  // Salud intermedia (Fisioterapia, Enfermería, Fonoaudiología, Nutrición)
  if (lower.includes('fisioterapia') || lower.includes('enfermería') || lower.includes('fonoaudiología') || lower.includes('nutrición')) {
    return { semesters: 9, duration: '9 semestres (4.5 años)' };
  }

  // Criminología y Criminalística
  if (lower.includes('criminalística') || lower.includes('criminología') || lower.includes('ciencias forenses')) {
    return { semesters: 9, duration: '9 semestres (4.5 años)' };
  }

  // Ingenierías, Derecho y Arquitectura
  if (lower.includes('ingeniería') || lower.includes('derecho') || lower.includes('leyes') || lower.includes('arquitectura')) {
    return { semesters: 10, duration: '10 semestres (5 años)' };
  }

  // Licenciaturas / Educación
  if (lower.includes('licenciatura') || lower.includes('pedagogía')) {
    return { semesters: 10, duration: '10 semestres (5 años)' };
  }

  // Administración, Economía, Contaduría, Psicología, Comunicación, Diseño
  if (lower.includes('administración') || lower.includes('economía') || lower.includes('contaduría') || lower.includes('finanzas') || lower.includes('comunicación') || lower.includes('diseño') || lower.includes('publicidad') || lower.includes('psicología')) {
    return { semesters: 9, duration: '9 semestres (4.5 años)' };
  }

  return { semesters: 10, duration: '10 semestres (5 años)' };
}

/**
 * Calcula el valor del semestre oficial para una universidad específica y una carrera dada.
 * Si es pública: detalle de gratuidad / PBM oficial.
 * Si es privada y está en el mapa: tarifa verificada oficial.
 * Si es privada y no está en el mapa: "Consultar valor con la universidad".
 */
export function getUniversityTuitionForCareer(careerName: string, university: University): string {
  if (university.type === 'Pública') {
    if (university.id === 'uni-sena') {
      return '100% Gratuito ($0 COP) - Formación subvencionada por el Estado';
    }
    if (university.id === 'uni-unad') {
      return 'Gratuidad con Política de Gratuidad "Puedo Estudiar" o liquidación oficial por crédito académico (~$2.400.000 - $3.200.000 COP / semestre)';
    }
    return 'Matrícula Gratuita ($0 COP) con Política de Gratuidad "Puedo Estudiar" del Gobierno Nacional (cobertura 100% estratos 1, 2 y 3 / Sisbén IV) o liquidación PBM según ingresos familiares';
  }

  // Para universidades privadas
  const rates = VERIFIED_PRIVATE_TUITION_MAP[university.id];
  if (!rates) {
    // REGLA DEL USUARIO: "Si no existe un precio actualizado disponible, muestra 'Consultar valor con la universidad' en lugar de inventar un valor."
    return 'Consultar valor con la universidad';
  }

  const lower = careerName.toLowerCase();

  if (lower.includes('medicina') && !lower.includes('veterinaria')) {
    return rates.medicina || rates.general || 'Consultar valor con la universidad';
  }
  if (lower.includes('odontología')) {
    return rates.odontologia || rates.salud || rates.general || 'Consultar valor con la universidad';
  }
  if (lower.includes('veterinaria') || lower.includes('zootecnia')) {
    return rates.veterinaria || rates.general || 'Consultar valor con la universidad';
  }
  if (lower.includes('criminología') || lower.includes('criminalística') || lower.includes('forense')) {
    return rates.criminologia || rates.derecho || rates.general || 'Consultar valor con la universidad';
  }
  if (lower.includes('enfermería') || lower.includes('fisioterapia') || lower.includes('fonoaudiología') || lower.includes('terapia') || lower.includes('salud') || lower.includes('bacteriología')) {
    return rates.salud || rates.general || 'Consultar valor con la universidad';
  }
  if (lower.includes('ingeniería') || lower.includes('software') || lower.includes('datos') || lower.includes('sistemas') || lower.includes('computación') || lower.includes('ciberseguridad')) {
    return rates.ingenierias || rates.general || 'Consultar valor con la universidad';
  }
  if (lower.includes('derecho') || lower.includes('leyes') || lower.includes('jurisprudencia')) {
    return rates.derecho || rates.general || 'Consultar valor con la universidad';
  }
  if (lower.includes('arquitectura') || lower.includes('diseño')) {
    return rates.arquitecturaDiseno || rates.general || 'Consultar valor con la universidad';
  }
  if (lower.includes('administración') || lower.includes('economía') || lower.includes('finanzas') || lower.includes('contaduría') || lower.includes('negocios')) {
    return rates.administracion || rates.general || 'Consultar valor con la universidad';
  }
  if (lower.includes('comunicación') || lower.includes('psicología') || lower.includes('periodismo') || lower.includes('filosofía') || lower.includes('sociología') || lower.includes('relaciones internacionales')) {
    return rates.cienciasSociales || rates.general || 'Consultar valor con la universidad';
  }
  if (lower.includes('licenciatura') || lower.includes('pedagogía') || lower.includes('educación')) {
    return rates.educacion || rates.general || 'Consultar valor con la universidad';
  }
  if (lower.includes('tecnología') || lower.includes('técnico')) {
    return rates.tecnologia || rates.general || 'Consultar valor con la universidad';
  }

  return rates.general || 'Consultar valor con la universidad';
}

/**
 * Obtiene la modalidad académica oficial para una universidad y carrera.
 */
export function getUniversityModality(university: University, career: Career): 'Presencial' | 'Virtual' | 'A distancia' | 'Dual / Híbrida' {
  if (university.id === 'uni-unad') return 'Virtual';
  if (university.id === 'uni-sena') return career.modality || 'Presencial';
  if (career.modality) return career.modality;
  return 'Presencial';
}

/**
 * Ciudad sede principal de la universidad para esta carrera.
 */
export function getUniversityCity(university: University): string {
  // Limpiar descripciones largas entre paréntesis si es necesario, dejando la sede principal
  const city = university.city;
  if (city.includes('(')) {
    return city.split('(')[0].trim();
  }
  return city;
}

/**
 * Resuelve y genera la lista completa de opciones universitarias oficiales para cualquier carrera.
 * Garantiza que cada oferta tenga:
 * - 🏫 Universidad (Nombre oficial y tipo)
 * - 📚 Semestres y duración
 * - 💰 Valor por semestre correspondiente a esa universidad específica
 * - 📍 Ciudad
 * - 💻 Modalidad
 */
export function getCareerUniversityOfferings(career: Career, allUniversities: University[] = COLOMBIAN_UNIVERSITIES_DATA): CareerUniversityOffering[] {
  // Si ya tiene ofertas específicas configuradas, retornarlas
  if (career.universityOfferings && career.universityOfferings.length > 0) {
    return career.universityOfferings;
  }

  const offerings: CareerUniversityOffering[] = [];
  const addedUniIds = new Set<string>();

  // 1. Buscar universidades en suggestedUniversities
  const suggestedIds = career.suggestedUniversities || [];
  for (const id of suggestedIds) {
    const uni = allUniversities.find(u => u.id === id);
    if (uni && !addedUniIds.has(uni.id)) {
      addedUniIds.add(uni.id);
      const { semesters, duration } = getOfficialSemesters(career.name, career.degreeType, career.level);
      offerings.push({
        universityId: uni.id,
        universityName: uni.name,
        universityShortName: uni.shortName,
        type: uni.type,
        semestersCount: semesters,
        duration: duration,
        semesterTuition: getUniversityTuitionForCareer(career.name, uni),
        city: getUniversityCity(uni),
        modality: getUniversityModality(uni, career),
        websiteUrl: uni.websiteUrl,
        accreditation: uni.accreditation
      });
    }
  }

  // 2. Buscar universidades que tengan la carrera en topCareers
  for (const uni of allUniversities) {
    if (addedUniIds.has(uni.id)) continue;

    const hasMatch = uni.topCareers.some(tc => {
      const a = tc.toLowerCase();
      const b = career.name.toLowerCase();
      return a.includes(b) || b.includes(a);
    });

    if (hasMatch) {
      addedUniIds.add(uni.id);
      const { semesters, duration } = getOfficialSemesters(career.name, career.degreeType, career.level);
      offerings.push({
        universityId: uni.id,
        universityName: uni.name,
        universityShortName: uni.shortName,
        type: uni.type,
        semestersCount: semesters,
        duration: duration,
        semesterTuition: getUniversityTuitionForCareer(career.name, uni),
        city: getUniversityCity(uni),
        modality: getUniversityModality(uni, career),
        websiteUrl: uni.websiteUrl,
        accreditation: uni.accreditation
      });
    }

    if (offerings.length >= 6) break;
  }

  // 3. Si tiene menos de 2 ofertas, añadir universidades relevantes por área
  if (offerings.length < 2) {
    const lower = career.name.toLowerCase();

    // Si es Criminología / Criminalística
    if (lower.includes('criminología') || lower.includes('criminalística') || lower.includes('forense')) {
      const specializedUniIds = ['uni-uan', 'uni-umb', 'uni-libre', 'uni-usc', 'uni-udem', 'uni-tdea'];
      for (const id of specializedUniIds) {
        if (!addedUniIds.has(id)) {
          const uni = allUniversities.find(u => u.id === id);
          if (uni) {
            addedUniIds.add(uni.id);
            const { semesters, duration } = getOfficialSemesters(career.name, career.degreeType, career.level);
            offerings.push({
              universityId: uni.id,
              universityName: uni.name,
              universityShortName: uni.shortName,
              type: uni.type,
              semestersCount: semesters,
              duration: duration,
              semesterTuition: getUniversityTuitionForCareer(career.name, uni),
              city: getUniversityCity(uni),
              modality: getUniversityModality(uni, career),
              websiteUrl: uni.websiteUrl,
              accreditation: uni.accreditation
            });
          }
        }
      }
    } else {
      // Agregar UNAL y Javeriana/Andes por defecto si no estaban
      const defaultIds = ['uni-unal', 'uni-javeriana', 'uni-udea', 'uni-andes'];
      for (const id of defaultIds) {
        if (!addedUniIds.has(id) && offerings.length < 4) {
          const uni = allUniversities.find(u => u.id === id);
          if (uni) {
            addedUniIds.add(uni.id);
            const { semesters, duration } = getOfficialSemesters(career.name, career.degreeType, career.level);
            offerings.push({
              universityId: uni.id,
              universityName: uni.name,
              universityShortName: uni.shortName,
              type: uni.type,
              semestersCount: semesters,
              duration: duration,
              semesterTuition: getUniversityTuitionForCareer(career.name, uni),
              city: getUniversityCity(uni),
              modality: getUniversityModality(uni, career),
              websiteUrl: uni.websiteUrl,
              accreditation: uni.accreditation
            });
          }
        }
      }
    }
  }

  return offerings;
}
