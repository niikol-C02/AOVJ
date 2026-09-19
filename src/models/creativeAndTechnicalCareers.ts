import { Career } from '../types';

/**
 * Ofertas vocacionales en Artes, Estética, Moda, Audiovisual, Expresión Artística y Decoración.
 * Diseñadas bajo los mismos estándares y campos de las carreras tradicionales, reconociendo el talento
 * creativo, técnico y manual con alta proyección en la economía cultural y de servicios.
 */
export const CREATIVE_AND_TECHNICAL_CAREERS: Career[] = [
  // ==========================================
  // 1. ARTE Y CREATIVIDAD
  // ==========================================
  {
    id: 'arte-artes-plasticas',
    name: 'Artes Plásticas y Visuales',
    area: 'Arte y Creatividad',
    categoryColor: 'pink',
    duration: '4 a 5 años (8-10 semestres)',
    degreeType: 'Profesional Universitario',
    riasecPrimary: 'A',
    riasecSecondary: 'R',
    shortDescription: 'Explora lenguajes visuales tradicionales y contemporáneos, desarrollando obras pictóricas, escultóricas y conceptuales con sentido crítico.',
    fullDescription: 'Forma artistas capaces de investigar, conceptualizar y producir propuestas visuales en múltiples soportes. Desarrolla el pensamiento estético, la técnica manual y el diálogo con la historia del arte y el contexto social.',
    necessarySkills: ['Sensibilidad estética y composición', 'Dominio de técnicas pictóricas y escultóricas', 'Pensamiento crítico y conceptual', 'Creatividad e innovación formal'],
    workFields: [
      'Galerías de arte, museos y centros culturales',
      'Talleres independientes y colectivos artísticos',
      'Curaduría, museografía y gestión cultural',
      'Docencia artística e investigación estética'
    ],
    averageSalaryRange: '$2,200,000 - $6,500,000 COP / mes',
    employabilityRate: '86%',
    dailyActivities: [
      'Experimentar con pigmentos, texturas y materiales mixtos',
      'Desarrollar bocetos conceptuales y bitácoras de creación',
      'Montar exposiciones y participar en convocatorias culturales',
      'Analizar corrientes teóricas y discursos del arte contemporáneo'
    ],
    relatedSubjects: ['Taller de Pintura y Dibujo', 'Escultura y Nuevos Medios', 'Historia y Teoría del Arte', 'Curaduría y Museografía', 'Estética Contemporánea'],
    suggestedUniversities: ['uni-unal', 'uni-andes', 'uni-javeriana', 'uni-udea'],
    iconName: 'Palette',
    isTrending: true
  },
  {
    id: 'arte-pintura-artistica',
    name: 'Pintura y Técnicas Pictóricas',
    area: 'Arte y Creatividad',
    categoryColor: 'pink',
    duration: '3 a 4 años (6-8 semestres)',
    degreeType: 'Técnico Profesional / Profesional',
    riasecPrimary: 'A',
    riasecSecondary: 'R',
    shortDescription: 'Domina el óleo, acrílico, acuarela y muralismo, creando piezas visuales con riqueza cromática, técnica y expresividad personal.',
    fullDescription: 'Se enfoca en el estudio riguroso de la teoría del color, la anatomía artística, la química de pigmentos y la ejecución de obras bidimensionales tanto de caballete como de intervención mural en espacios públicos.',
    necessarySkills: ['Precisión cromática y manejo de luz', 'Destreza manual y coordinación visomotriz', 'Conocimiento de pigmentos y aglutinantes', 'Paciencia y atención al detalle'],
    workFields: [
      'Estudios de pintura y producción artística por encargo',
      'Muralismo urbano y arte público para instituciones',
      'Restauración de obras pictóricas y conservación de patrimonio',
      'Ilustración tradicional para editoriales y coleccionistas'
    ],
    averageSalaryRange: '$2,000,000 - $5,800,000 COP / mes',
    employabilityRate: '84%',
    dailyActivities: [
      'Preparar lienzos, tablas y mezclas cromáticas',
      'Aplicar veladuras, empastes y texturas en lienzo',
      'Elaborar murales a gran escala con técnicas de conservación',
      'Participar en subastas, ferias y exhibiciones privadas'
    ],
    relatedSubjects: ['Teoría y Óptica del Color', 'Técnicas de Pintura al Óleo y Acrílico', 'Muralismo y Arte Urbano', 'Restauración Pictórica', 'Composición Visual'],
    suggestedUniversities: ['uni-unal', 'uni-bellasartes-cali', 'uni-udea'],
    iconName: 'Palette'
  },
  {
    id: 'arte-dibujo-e-ilustracion',
    name: 'Dibujo e Ilustración Artística',
    area: 'Arte y Creatividad',
    categoryColor: 'purple',
    duration: '3 a 4 años (6-8 semestres)',
    degreeType: 'Tecnólogo / Profesional',
    riasecPrimary: 'A',
    riasecSecondary: 'R',
    shortDescription: 'Crea mundos visuales, personajes y narrativas gráficas a través de trazos tradicionales en grafito, tinta, carboncillo y pluma.',
    fullDescription: 'Especialidad dedicada a la representación visual mediante la línea, el claroscuro y la perspectiva. Capacita en dibujo anatómico, ilustración botánica, cómic, storyboard y diseño de personajes para libros y medios.',
    necessarySkills: ['Dominio del trazo, anatomía y perspectiva', 'Narrativa visual y secuencial', 'Manejo de tinta china, acuarela y grafito', 'Capacidad de síntesis gráfica'],
    workFields: [
      'Editoriales literarias e infantiles',
      'Estudios de cómic, novela gráfica y narrativa visual',
      'Estudios de animación y preproducción de concept art',
      'Prensa cultural y publicaciones independientes'
    ],
    averageSalaryRange: '$2,400,000 - $6,200,000 COP / mes',
    employabilityRate: '88%',
    dailyActivities: [
      'Bocetar personajes y composiciones a mano alzada',
      'Entintar y aplicar sombras y texturas detalladas',
      'Interpretar guiones y textos para traducirlos en imágenes',
      'Digitalizar y preparar ilustraciones para imprenta'
    ],
    relatedSubjects: ['Dibujo de Figura Humana y Anatomía', 'Perspectiva y Entornos', 'Tinta, Carboncillo y Grafito', 'Narrativa Gráfica y Cómic', 'Ilustración Editorial'],
    suggestedUniversities: ['uni-lci-bogota', 'uni-colegiatura', 'uni-javeriana'],
    iconName: 'PenTool'
  },
  {
    id: 'arte-escultura-tridimensional',
    name: 'Escultura y Arte Tridimensional',
    area: 'Arte y Creatividad',
    categoryColor: 'amber',
    duration: '4 años (8 semestres)',
    degreeType: 'Profesional Universitario',
    riasecPrimary: 'R',
    riasecSecondary: 'A',
    shortDescription: 'Modela arcilla, talla madera y piedra, y funde metales para dar vida a piezas tridimensionales, monumentos e instalaciones espaciales.',
    fullDescription: 'Combina destreza física y artesanal con conceptos espaciales avanzados. Prepara a los creadores para manipular resinas, yeso, cerámica, metales y materiales reciclados en obras de arte volumétrico.',
    necessarySkills: ['Visión espacial tridimensional', 'Manejo de herramientas de talla y modelado', 'Resistencia física y precisión manual', 'Sensibilidad táctil y materialidad'],
    workFields: [
      'Talleres de fundición artística y escultura monumental',
      'Escenografía para teatro, cine y parques temáticos',
      'Restauración de patrimonio escultórico y monumentos',
      'Producción de prototipos tridimensionales para diseño'
    ],
    averageSalaryRange: '$2,300,000 - $6,000,000 COP / mes',
    employabilityRate: '83%',
    dailyActivities: [
      'Modelar figuras en cera, arcilla y plastilina profesional',
      'Elaborar moldes de silicona y vaciados en resina o bronce',
      'Tallar bloques de madera noble o piedra volcánica',
      'Instalar piezas escultóricas en plazas y galerías'
    ],
    relatedSubjects: ['Modelado en Arcilla y Cera', 'Vaciado y Moldes Flexibles', 'Fundición de Metales', 'Talla en Madera y Piedra', 'Instalación y Espacio'],
    suggestedUniversities: ['uni-unal', 'uni-udea', 'uni-bellasartes-cali'],
    iconName: 'Hammer'
  },
  {
    id: 'arte-digital-e-ilustracion',
    name: 'Arte Digital y Concept Art',
    area: 'Arte y Creatividad',
    categoryColor: 'indigo',
    duration: '3 a 4 años (6-8 semestres)',
    degreeType: 'Tecnólogo / Profesional',
    riasecPrimary: 'A',
    riasecSecondary: 'I',
    shortDescription: 'Diseña personajes, ambientes fantásticos y escenas para videojuegos, películas y medios interactivos con tabletas digitales y software creativo.',
    fullDescription: 'Aplica los principios de la ilustración tradicional al ecosistema digital: pintura en tabletas gráficas, modelado de concepts en Photoshop, Procreate y Blender, y diseño de iluminación y atmósfera para producciones internacionales.',
    necessarySkills: ['Manejo de tabletas gráficas y software 2D/3D', 'Comprensión de luz, volumen y renderizado digital', 'Velocidad de bocetaje y diseño de mundos', 'Trabajo bajo directrices de arte en equipo'],
    workFields: [
      'Estudios de desarrollo de videojuegos (nacionales e internacionales)',
      'Casas productoras de cine de animación y efectos visuales (VFX)',
      'Agencias de publicidad y marketing digital',
      'Industria de cómics digitales y plataformas web'
    ],
    averageSalaryRange: '$2,800,000 - $8,500,000 COP / mes',
    employabilityRate: '92%',
    dailyActivities: [
      'Pintar concept art de entornos y personajes en tabletas digitales',
      'Definir paletas de iluminación y estética visual de producciones',
      'Iterar bocetos rápidos basados en el feedback de directores de arte',
      'Optimizar texturas e ilustraciones para motores gráficos'
    ],
    relatedSubjects: ['Pintura Digital Avanzada', 'Diseño de Personajes (Character Design)', 'Concept Art de Entornos', 'Composición y Color Digital', 'Introducción al 3D para Artistas'],
    suggestedUniversities: ['uni-lci-bogota', 'uni-eafit', 'uni-andes', 'uni-colegiatura'],
    iconName: 'Sparkles',
    isTrending: true
  },
  {
    id: 'arte-animacion-2d-3d',
    name: 'Animación 2D y 3D',
    area: 'Arte y Creatividad',
    categoryColor: 'purple',
    duration: '3 a 4 años (6-8 semestres)',
    degreeType: 'Tecnólogo / Profesional',
    riasecPrimary: 'A',
    riasecSecondary: 'R',
    shortDescription: 'Da movimiento, emoción y vida a personajes y objetos mediante los 12 principios clásicos de la animación y tecnología tridimensional.',
    fullDescription: 'Los animadores conjugan ritmo, física y actuación para contar historias cautivadoras. Aprenden animación cuadro a cuadro tradicional, rigging de esqueletos digitales, captura de movimiento y animación 3D para cine y televisión.',
    necessarySkills: ['Comprensión del movimiento y timing', 'Rigging y animación en software especializado', 'Storyboarding y lenguaje cinematográfico', 'Constancia y dedicación para el detalle'],
    workFields: [
      'Estudios de animación para series de televisión y películas',
      'Industria de videojuegos y cinemáticas',
      'Publicidad animada y motion design para marcas',
      'Canales de streaming y producción de contenido infantil'
    ],
    averageSalaryRange: '$2,600,000 - $7,800,000 COP / mes',
    employabilityRate: '91%',
    dailyActivities: [
      'Animar poses clave e intermedias de personajes',
      'Ajustar curvas de aceleración y desaceleración en graph editors',
      'Sincronizar movimientos labiales (lip-sync) con pistas de audio',
      'Renderizar tomas y coordinar con el equipo de postproducción'
    ],
    relatedSubjects: ['Principios Clásicos de Animación', 'Animación Cuadro a Cuadro', 'Modelado y Rigging 3D', 'Acting para Animadores', 'Motion Graphics'],
    suggestedUniversities: ['uni-lci-bogota', 'uni-unal', 'uni-taller-cinco', 'uni-javeriana'],
    iconName: 'Film',
    isTrending: true
  },
  {
    id: 'arte-grabado-y-estampacion',
    name: 'Grabado y Artes Gráficas Tradicionales',
    area: 'Arte y Creatividad',
    categoryColor: 'rose',
    duration: '3 años (6 semestres)',
    degreeType: 'Técnico Profesional / Tecnólogo',
    riasecPrimary: 'R',
    riasecSecondary: 'A',
    shortDescription: 'Crea tirajes artísticos y estampas mediante xilografía, serigrafía, aguafuerte, litografía y prensas tipográficas artesanales.',
    fullDescription: 'Rescata y proyecta técnicas de impresión artesanal con valor patrimonial. Enseña el tallado en madera y linóleo, el mordido en ácido sobre planchas de cobre y zinc, y la serigrafía textil y papel con tintas ecológicas.',
    necessarySkills: ['Talla precisa con gubias y buriles', 'Manejo seguro de ácidos y solventes', 'Calibración de prensas tórculo y serigráficas', 'Control de registro y calidad en tirajes'],
    workFields: [
      'Talleres independientes de grabado y serigrafía artística',
      'Imprentas artesanales de libros de artista y cartelería',
      'Marcas de indumentaria y estampación textil boutique',
      'Archivos gráficos, bibliotecas patrimoniales y museos'
    ],
    averageSalaryRange: '$1,900,000 - $4,800,000 COP / mes',
    employabilityRate: '82%',
    dailyActivities: [
      'Grabar matrices en linóleo, madera o placas metálicas',
      'Entintar rodillos y calibrar la presión en el tórculo',
      'Imprimir series numeradas sobre papeles de algodón',
      'Diseñar serigrafías artesanales para pósteres y telas'
    ],
    relatedSubjects: ['Xilografía y Linograbado', 'Calcografía y Aguafuerte', 'Serigrafía Artística', 'Litografía y Papelería Artesanal', 'Edición y Conservación de Estampas'],
    suggestedUniversities: ['uni-unal', 'uni-bellasartes-cali', 'uni-udea'],
    iconName: 'Layers'
  },

  // ==========================================
  // 2. BELLEZA Y ESTÉTICA
  // ==========================================
  {
    id: 'belleza-cosmetologia-estetica',
    name: 'Cosmetología y Estética Integral',
    area: 'Belleza y Estética',
    categoryColor: 'rose',
    duration: '2 a 3 años (4-6 semestres)',
    degreeType: 'Técnico Laboral / Tecnólogo',
    riasecPrimary: 'R',
    riasecSecondary: 'S',
    shortDescription: 'Aplica tratamientos faciales y corporales no invasivos, cuidado cutáneo, aparatología estética y masoterapia para realzar el bienestar y la belleza.',
    fullDescription: 'Profesional capacitado en la anatomía y fisiología de la piel, bioseguridad sanitaria, aparatología de última generación (radiofrecuencia, ultrasonido, cavitación), limpiezas faciales profundas y masajes reductores y relajantes.',
    necessarySkills: ['Conocimiento de la dermis y biotipos cutáneos', 'Destreza en masajes faciales y corporales', 'Manejo riguroso de protocolos de bioseguridad', 'Empatía y atención personalizada al cliente'],
    workFields: [
      'Centros de estética médica, spas y clínicas dermatológicas',
      'Hoteles resort, cruceros y centros de relajación turísticos',
      'Emprendimiento propio de cabina estética o spa',
      'Asesoría técnica para casas de cosmocéuticos internacionales'
    ],
    averageSalaryRange: '$2,000,000 - $5,500,000 COP / mes',
    employabilityRate: '94%',
    dailyActivities: [
      'Diagnosticar el tipo de piel y diseñar planes de tratamiento',
      'Realizar limpiezas faciales, exfoliaciones químicas suaves e hidratación',
      'Operar equipos de aparatología estética corporal y facial',
      'Brindar masajes terapéuticos, drenaje linfático y relajación'
    ],
    relatedSubjects: ['Anatomía y Fisiología de la Piel', 'Aparatología Estética Avanzada', 'Cosmetología y Química Cosmética', 'Drenaje Linfático y Masoterapia', 'Bioseguridad y Normativa Sanitaria'],
    suggestedUniversities: ['uni-sena', 'uni-academia-belleza', 'uni-ucompensar'],
    iconName: 'Sparkles',
    isTrending: true
  },
  {
    id: 'belleza-maquillaje-profesional',
    name: 'Maquillaje Profesional y Caracterización',
    area: 'Belleza y Estética',
    categoryColor: 'pink',
    duration: '1 a 2 años (2-4 semestres)',
    degreeType: 'Técnico Laboral / Certificación Profesional',
    riasecPrimary: 'A',
    riasecSecondary: 'R',
    shortDescription: 'Domina el arte del visagismo, colorimetría, maquillaje social, para novias, pasarela, editorial y efectos especiales (FX) para cine y televisión.',
    fullDescription: 'Forma artistas capaces de transformar rostros respetando o potenciando sus rasgos únicos. Capacita en teoría del color aplicada a la piel, técnicas de aerografía, maquillaje para fotografía de alta definición (HD) y prótesis de caracterización.',
    necessarySkills: ['Manejo maestro de brochas y difuminados', 'Colorimetría y corrección de tonalidades de piel', 'Velocidad y precisión en backstages', 'Creatividad y sentido del estilo'],
    workFields: [
      'Producciones de televisión, cine y comerciales',
      'Desfiles de moda, pasarelas y sesiones fotográficas editoriales',
      'Servicios nupciales y eventos sociales de alto nivel',
      'Creación de contenido de belleza en redes sociales y marcas cosméticas'
    ],
    averageSalaryRange: '$2,200,000 - $6,800,000 COP / mes',
    employabilityRate: '93%',
    dailyActivities: [
      'Analizar la morfología facial (visagismo) del cliente o modelo',
      'Preparar y proteger la piel con prebases y sueros específicos',
      'Aplicar bases, contornos, iluminadores y sombras artísticas',
      'Recrear efectos especiales como heridas, envejecimiento o criaturas fantásticas'
    ],
    relatedSubjects: ['Visagismo y Morfología del Rostro', 'Colorimetría para Todos los Tonos de Piel', 'Maquillaje Social, Novias y Fotografía HD', 'Maquillaje Editorial y Pasarela', 'Efectos Especiales (FX) y Caracterización'],
    suggestedUniversities: ['uni-lci-bogota', 'uni-sena', 'uni-academia-belleza'],
    iconName: 'Sparkles',
    isTrending: true
  },
  {
    id: 'belleza-peluqueria-y-estilismo',
    name: 'Peluquería Integral y Estilismo Capilar',
    area: 'Belleza y Estética',
    categoryColor: 'rose',
    duration: '1.5 a 2 años (3-4 semestres)',
    degreeType: 'Técnico Laboral',
    riasecPrimary: 'R',
    riasecSecondary: 'A',
    shortDescription: 'Crea cortes de cabello modernos, técnicas de colorimetría avanzada (balayage, decoloración), peinados de gala y tratamientos de salud capilar.',
    fullDescription: 'Profesionales del cabello que combinan química capilar, diseño geométrico de cortes y tendencias internacionales de peinado. Aprenden diagnóstico de la fibra capilar, alisados seguros, mechas y cuidado del cuero cabelludo.',
    necessarySkills: ['Destreza manual con tijeras, navajas y secadores', 'Formulación química de tintes y decolorantes', 'Visagismo capilar adaptado al rostro', 'Capacidad de escucha y asesoramiento'],
    workFields: [
      'Salones de belleza y peluquerías de prestigio',
      'Estudios de televisión, pasarelas y producciones fotográficas',
      'Marcas profesionales capilares como embajador o educador técnico',
      'Emprendimiento de salón o estudio boutique propio'
    ],
    averageSalaryRange: '$2,100,000 - $5,800,000 COP / mes',
    employabilityRate: '95%',
    dailyActivities: [
      'Evaluar la salud del cuero cabelludo y la hebra capilar',
      'Diseñar y ejecutar cortes geométricos, degrafilados o en capas',
      'Formular y aplicar tinturas, balayage, babylights y matices',
      'Realizar peinados para bodas, graduaciones y alfombras rojas'
    ],
    relatedSubjects: ['Tricología y Salud Capilar', 'Técnicas de Corte Femenino y Masculino', 'Colorimetría y Decoloración Segura', 'Peinados y Recogidos Artísticos', 'Tratamientos de Keratina y Reestructuración'],
    suggestedUniversities: ['uni-sena', 'uni-academia-belleza'],
    iconName: 'Scissors',
    isTrending: true
  },
  {
    id: 'belleza-barberia-profesional',
    name: 'Barbería Clásica y Moderna',
    area: 'Belleza y Estética',
    categoryColor: 'amber',
    duration: '1 a 1.5 años (2-3 semestres)',
    degreeType: 'Técnico Laboral',
    riasecPrimary: 'R',
    riasecSecondary: 'E',
    shortDescription: 'Especialista en cuidado masculino, cortes degradados (fades), afeitado tradicional a navaja, perfilado de barba y diseño capilar urbano.',
    fullDescription: 'La barbería moderna es un arte de alta precisión y un espacio cultural vibrante. Capacita en técnicas de tijera sobre peine, degradados con máquinas profesionales, rituales de toallas calientes, exfoliación facial masculina y diseños gráficos en cabello.',
    necessarySkills: ['Pulso firme y precisión milimétrica', 'Manejo experto de máquinas clipper, trimmer y navaja', 'Diseño de barbas según morfología mandibular', 'Carisma y fidelización de clientes'],
    workFields: [
      'Barberías boutique y barber shops tradicionales',
      'Salones masculinos y spas de caballeros',
      'Camerinos de artistas, futbolistas y producciones audiovisuales',
      'Emprendimiento de barbershop y venta de productos masculinos'
    ],
    averageSalaryRange: '$2,300,000 - $6,000,000 COP / mes',
    employabilityRate: '96%',
    dailyActivities: [
      'Realizar degradados limpios (low, mid, high fade) y taper fades',
      'Perfilar barbas con navaja barbera y ritual de toalla caliente',
      'Aplicar tratamientos para la caspa y caída del cabello masculino',
      'Asesorar a los clientes en productos de fijación y aceites de barba'
    ],
    relatedSubjects: ['Cortes Degradados y Técnicas Fade', 'Afeitado Clásico a Navaja y Barba', 'Hair Tattoo y Diseños Urbanos', 'Visagismo Masculino', 'Higiene, Bioseguridad y Esterilización'],
    suggestedUniversities: ['uni-sena', 'uni-academia-belleza'],
    iconName: 'Scissors',
    isTrending: true
  },
  {
    id: 'belleza-cuidado-piel-estetica-facial',
    name: 'Cuidado de la Piel y Terapia Dermatofuncional',
    area: 'Belleza y Estética',
    categoryColor: 'rose',
    duration: '2 años (4 semestres)',
    degreeType: 'Técnico Laboral / Asistente en Estética',
    riasecPrimary: 'I',
    riasecSecondary: 'S',
    shortDescription: 'Experto en rutinas de skincare, prevención del envejecimiento prematuro, control del acné y protocolos cosmecéuticos avanzados.',
    fullDescription: 'Profundiza en la formulación de ingredientes activos (retinol, ácido hialurónico, vitamina C, niacinamida), barrera cutánea, protección solar y tratamientos regenerativos. Trabaja en estrecha sinergia con dermatólogos.',
    necessarySkills: ['Análisis químico de productos cosméticos', 'Evaluación de fototipos y patologías leves de la piel', 'Paciencia y vocación de servicio al paciente', 'Ética profesional y derivación médica oportuna'],
    workFields: [
      'Clínicas dermatológicas y consultorios médicos estéticos',
      'Laboratorios y marcas líderes de dermocosmética',
      'Centros de revitalización cutánea y spas dermatológicos',
      'Consultoría personalizada de rutinas de cuidado de la piel'
    ],
    averageSalaryRange: '$2,200,000 - $5,600,000 COP / mes',
    employabilityRate: '93%',
    dailyActivities: [
      'Analizar la piel con lámpara de Wood y dermatoscopio estético',
      'Prescribir rutinas domiciliarias personalizadas de mañana y noche',
      'Realizar sesiones de microdermoabrasión y peelings enzimáticos',
      'Monitorear la evolución de pieles deshidratadas o con hiperpigmentación'
    ],
    relatedSubjects: ['Bioquímica de los Cosméticos y Principios Activos', 'Dermofarmacia y Skincare Avanzado', 'Tratamientos Antiedad y Fotoprotección', 'Terapia Celular y Renovación Cutánea', 'Acompañamiento en Procedimientos Médicos'],
    suggestedUniversities: ['uni-sena', 'uni-ucompensar'],
    iconName: 'HeartHandshake'
  },
  {
    id: 'belleza-diseno-de-unas',
    name: 'Diseño y Escultura de Uñas Profesional (Nail Art)',
    area: 'Belleza y Estética',
    categoryColor: 'pink',
    duration: '1 a 1.5 años (2-3 semestres)',
    degreeType: 'Técnico Laboral / Especialista',
    riasecPrimary: 'R',
    riasecSecondary: 'A',
    shortDescription: 'Crea estructuras acrílicas, poligel, soft gel, esmaltado semipermanente y micropintura artística en uñas con técnica y bioseguridad.',
    fullDescription: 'El sector de las uñas es una de las industrias de mayor crecimiento mundial. Capacita en anatomía de la placa ungueal, manicura rusa con torno, curvatura C, estructuras esculturales (stiletto, almendra, coffin) y mano alzada artística.',
    necessarySkills: ['Precisión milimétrica a pequeña escala', 'Manejo seguro del torno micromotor y fresas', 'Creatividad en decoraciones y pedrería', 'Higiene quirúrgica y desinfección'],
    workFields: [
      'Nail spas y salones especializados en uñas de alta gama',
      'Estudios de manicura rusa y diseño personalizado',
      'Educación técnica e impartición de masterclasses',
      'Emprendimiento independiente con alta rentabilidad y agenda propia'
    ],
    averageSalaryRange: '$2,000,000 - $5,200,000 COP / mes',
    employabilityRate: '97%',
    dailyActivities: [
      'Realizar manicura combinada rusa y limpieza de cutícula',
      'Esculpir extensiones de uñas en acrílico, poligel o tips de gel',
      'Diseñar micropintura a mano alzada, efectos marmoleados y 3D',
      'Esterilizar instrumental en autoclave bajo normas sanitarias'
    ],
    relatedSubjects: ['Anatomía de la Uña y Manicura Rusa', 'Escultura en Acrílico y Gel Avanzado', 'Micropintura y Nail Art a Mano Alzada', 'Química de Polímeros y Monómeros', 'Bioseguridad y Desinfección en Salones'],
    suggestedUniversities: ['uni-sena', 'uni-academia-belleza'],
    iconName: 'Sparkles',
    isTrending: true
  },
  {
    id: 'belleza-imagen-personal-protocolo',
    name: 'Imagen Personal, Estilo y Protocolo',
    area: 'Belleza y Estética',
    categoryColor: 'purple',
    duration: '2 a 3 años (4-6 semestres)',
    degreeType: 'Técnico Profesional / Tecnólogo',
    riasecPrimary: 'E',
    riasecSecondary: 'A',
    shortDescription: 'Transforma la presencia integral de personas y ejecutivos, coordinando vestuario, lenguaje no verbal, oratoria y etiqueta social.',
    fullDescription: 'Enseña a proyectar coherencia entre la identidad, las metas profesionales y la imagen externa. Integra colorimetría personal, comunicación no verbal, guardarropa cápsula, protocolo diplomático y coaching de autoconfianza.',
    necessarySkills: ['Análisis de siluetas corporales y paletas estacionales', 'Comunicación asertiva y oratoria', 'Empatía y confidencialidad', 'Visión estratégica de branding personal'],
    workFields: [
      'Consultoría privada para líderes corporativos y figuras públicas',
      'Agencias de relaciones públicas, modelos y representación de talentos',
      'Empresas en sus programas de capacitación de personal y etiqueta',
      'Estilismo para celebridades y conferencistas internacionales'
    ],
    averageSalaryRange: '$2,500,000 - $7,000,000 COP / mes',
    employabilityRate: '89%',
    dailyActivities: [
      'Efectuar pruebas de telas para determinar la paleta de color del cliente',
      'Auditar armarios y estructurar fondos de armario funcionales',
      'Entrenar postura, dicción y protocolo en eventos protocolares',
      'Acompañar rutas de compras inteligentes (personal shopper)'
    ],
    relatedSubjects: ['Colorimetría y Test de las 12 Estaciones', 'Antropometría y Tipologías Corporales', 'Protocolo Corporativo y Etiqueta Internacional', 'Comunicación No Verbal y Presencia Escénica', 'Personal Shopping y Gestión de Guardarropa'],
    suggestedUniversities: ['uni-lci-bogota', 'uni-colegiatura', 'uni-javeriana'],
    iconName: 'UserCheck'
  },

  // ==========================================
  // 3. MODA Y CONFECCIÓN
  // ==========================================
  {
    id: 'moda-diseno-de-modas',
    name: 'Diseño de Modas y Alta Costura',
    area: 'Moda y Confección',
    categoryColor: 'pink',
    duration: '4 a 5 años (8-10 semestres)',
    degreeType: 'Profesional Universitario',
    riasecPrimary: 'A',
    riasecSecondary: 'E',
    shortDescription: 'Conceptualiza colecciones de indumentaria vanguardistas, combinando visión estética, sostenibilidad textil y visión comercial en pasarelas.',
    fullDescription: 'Forma diseñadores capaces de crear marcas memorables y prendas con altos estándares de confección. Abarca investigación de macrotendencias globales, patronaje sobre maniquí (moulage), selección de tejidos y dirección de desfiles.',
    necessarySkills: ['Bocetaje e ilustración de moda analógica y digital', 'Patronaje anatómico y confección avanzada', 'Predicción de tendencias (Coolhunting)', 'Capacidad de gestión de marca y comercialización'],
    workFields: [
      'Casas de moda y marcas de autor nacionales e internacionales',
      'Industria textil y empresas de confección masiva (retail)',
      'Vestuario para producciones de cine, teatro y series',
      'Lanzamiento y dirección de marca de moda propia'
    ],
    averageSalaryRange: '$2,800,000 - $8,200,000 COP / mes',
    employabilityRate: '90%',
    dailyActivities: [
      'Crear moodboards de inspiración y paletas de color por temporada',
      'Ilustrar figurines con especificaciones técnicas para talleres',
      'Supervisar muestras y pruebas de calce sobre modelos',
      'Presentar colecciones en plataformas como Colombiamoda y BFW'
    ],
    relatedSubjects: ['Diseño y Colecciones de Moda', 'Patronaje y Confección de Alta Costura', 'Textiles, Fibras y Sostenibilidad', 'Ilustración y Figurín de Moda', 'Marketing de Moda y Coolhunting'],
    suggestedUniversities: ['uni-lci-bogota', 'uni-colegiatura', 'uni-taller-cinco', 'uni-andes'],
    iconName: 'Scissors',
    isTrending: true
  },
  {
    id: 'moda-diseno-y-confeccion-industrial',
    name: 'Diseño y Confección de Prendas de Vestir',
    area: 'Moda y Confección',
    categoryColor: 'purple',
    duration: '2 a 3 años (4-6 semestres)',
    degreeType: 'Técnico Profesional / Tecnólogo',
    riasecPrimary: 'R',
    riasecSecondary: 'A',
    shortDescription: 'Construye prendas con altos estándares de costura, ensamble en máquinas industriales y optimización de talleres de confección.',
    fullDescription: 'Se enfoca en la materialización perfecta de los diseños. Capacita en manejo de máquinas planas, fileteadoras, recubridoras, confección de sastrería, ropa deportiva y trajes de baño, asegurando acabados de calidad de exportación.',
    necessarySkills: ['Operación y ajuste de maquinaria de confección', 'Lectura de fichas técnicas de producción', 'Precisión en costuras rectas y curvas', 'Control de tiempos y optimización de procesos'],
    workFields: [
      'Empresas y talleres de confección y maquila industrial',
      'Marcas de ropa de autor en la etapa de confección de muestras',
      'Supervisión de líneas de producción textil',
      'Taller propio de modistería fina y sastrería a medida'
    ],
    averageSalaryRange: '$1,900,000 - $4,600,000 COP / mes',
    employabilityRate: '94%',
    dailyActivities: [
      'Interpretar fichas técnicas de diseño para ensamble de prendas',
      'Cortar piezas textiles optimizando el rendimiento de tela',
      'Coser y ensamblar cuellos, mangas, bolsillos y cremalleras',
      'Realizar control de calidad de costuras y planchado final'
    ],
    relatedSubjects: ['Manejo de Maquinaria Industrial de Confección', 'Ensamble de Prendas Exteriores e Interiores', 'Fichas Técnicas y Control de Calidad', 'Sastrería Clásica y Alta Modistería', 'Costos y Tiempos de Confección'],
    suggestedUniversities: ['uni-sena', 'uni-taller-cinco'],
    iconName: 'Scissors'
  },
  {
    id: 'moda-patronaje-y-escalado',
    name: 'Patronaje Industrial y Escalado Digital',
    area: 'Moda y Confección',
    categoryColor: 'indigo',
    duration: '2 a 3 años (4-6 semestres)',
    degreeType: 'Técnico Profesional / Tecnólogo',
    riasecPrimary: 'R',
    riasecSecondary: 'C',
    shortDescription: 'Transforma ideas de diseño en planos técnicos bidimensionales perfectos usando software CAD (Optitex, Audaces, Gerber).',
    fullDescription: 'El patronista es el puente matemático e ingenieril de la moda. Enseña a trazar moldes anatómicos, realizar transformaciones complejas, escalado proporcional de tallas (XS a XXL) y trazo computarizado para optimizar cortes.',
    necessarySkills: ['Geometría descriptiva y precisión métrica', 'Manejo de software CAD de patronaje textil', 'Comprensión de caída y elasticidad de telas', 'Resolución de problemas de calce anatómico'],
    workFields: [
      'Departamentos de patronaje de grandes marcas de confección',
      'Empresas exportadoras de confección de ropa deportiva e íntima',
      'Servicios de consultoría externa de patronaje y escalado',
      'Talleres de sastrería de alta gama'
    ],
    averageSalaryRange: '$2,400,000 - $6,000,000 COP / mes',
    employabilityRate: '95%',
    dailyActivities: [
      'Desarrollar moldes básicos y transformaciones en mesa y software CAD',
      'Escalar patrones a través de la curva completa de tallas',
      'Optimizar trazos digitales de corte para minimizar desperdicios',
      'Ajustar patrones tras pruebas de calce sobre maniquí físico'
    ],
    relatedSubjects: ['Patronaje Manual Femenino, Masculino e Infantil', 'Patronaje Digital en Optitex y Audaces', 'Escalado Industrial de Tallas', 'Draping / Moulage sobre Maniquí', 'Fichas Técnicas de Patronaje'],
    suggestedUniversities: ['uni-sena', 'uni-lci-bogota', 'uni-taller-cinco'],
    iconName: 'PenTool',
    isTrending: true
  },
  {
    id: 'moda-diseno-textil-estampacion',
    name: 'Diseño Textil y Desarrollo de Superficies',
    area: 'Moda y Confección',
    categoryColor: 'amber',
    duration: '3 a 4 años (6-8 semestres)',
    degreeType: 'Tecnólogo / Profesional',
    riasecPrimary: 'A',
    riasecSecondary: 'R',
    shortDescription: 'Crea estampados continuos (rapports), texturas, tejidos de punto y Jacquard, e investiga tinturas botánicas y fibras ecológicas.',
    fullDescription: 'Los diseñadores textiles crean el alma de la ropa y el hogar: las telas. Aprenden tejido en telar, estampación digital y serigráfica, biotextiles a base de celulosa y hongos, y teñido natural ancestral colombiano.',
    necessarySkills: ['Diseño de patrones repetitivos (rapport y estampación)', 'Conocimiento botánico y químico de tintes', 'Manejo de telares manuales e industriales', 'Sensibilidad para texturas y pesos de tela'],
    workFields: [
      'Empresas de fabricación e hilatura textil',
      'Marcas de indumentaria, trajes de baño y ropa deportiva',
      'Industria de textiles para el hogar y tapicería',
      'Estudios de diseño y biofabricación sostenible'
    ],
    averageSalaryRange: '$2,500,000 - $6,500,000 COP / mes',
    employabilityRate: '88%',
    dailyActivities: [
      'Diseñar estampados vectoriales con raport perfecto para telas',
      'Experimentar con tintes naturales de semillas, cortezas y flores',
      'Programar urdimbres y tramas en telares de tejido plano',
      'Evaluar resistencia a la luz, roce y lavado de nuevos tejidos'
    ],
    relatedSubjects: ['Diseño de Estampados y Patrones Textiles', 'Tejeduría en Telar y Tejido de Punto', 'Química Textil y Teñido Natural', 'Biotextiles y Materiales Sostenibles', 'Textiles Técnicos e Inteligentes'],
    suggestedUniversities: ['uni-colegiatura', 'uni-lci-bogota', 'uni-andes'],
    iconName: 'Layers'
  },
  {
    id: 'moda-diseno-joyeria-accesorios',
    name: 'Diseño de Joyería, Orfebrería y Accesorios',
    area: 'Moda y Confección',
    categoryColor: 'amber',
    duration: '3 a 4 años (6-8 semestres)',
    degreeType: 'Tecnólogo / Profesional',
    riasecPrimary: 'R',
    riasecSecondary: 'A',
    shortDescription: 'Funde metales nobles (oro, plata), engasta piedras preciosas, rescata la filigrana y diseña piezas contemporáneas y de marroquinería.',
    fullDescription: 'Combina el rico patrimonio orfebre colombiano (Mompox, Chocó) con modelado 3D (Rhinoceros Joyería) e impresión de cera para microfusión. Forma artesanos contemporáneos con visión de diseño exportable.',
    necessarySkills: ['Pulso fino para soldadura y calado de metales', 'Modelado 3D de piezas de joyería en CAD', 'Conocimiento gemológico y propiedades de metales', 'Sensibilidad para acabados pulidos y texturizados'],
    workFields: [
      'Talleres de joyería fina, orfebrería y filigrana',
      'Marcas de accesorios de moda y bisutería de diseño',
      'Empresas de marroquinería fina y herrajes exclusivos',
      'Taller y marca propia de joyería de autor'
    ],
    averageSalaryRange: '$2,300,000 - $7,500,000 COP / mes',
    employabilityRate: '89%',
    dailyActivities: [
      'Soldar piezas milimétricas de plata y oro al soplete',
      'Modelar anillos y pendientes en software 3D para impresión en cera',
      'Tallar y tejer hilos de plata en técnicas de filigrana',
      'Engastar esmeraldas colombianas y circonias con seguridad'
    ],
    relatedSubjects: ['Fundición, Laminado y Soldadura de Metales', 'Técnicas de Filigrana Tradicional y Moderna', 'Modelado 3D en RhinoGold / Matrix', 'Gemología y Engaste de Piedras', 'Diseño de Marroquinería y Accesorios'],
    suggestedUniversities: ['uni-sena', 'uni-lci-bogota', 'uni-taller-cinco'],
    iconName: 'Sparkles',
    isTrending: true
  },
  {
    id: 'moda-asesoria-imagen-personal-shopper',
    name: 'Asesoría de Imagen y Personal Shopper',
    area: 'Moda y Confección',
    categoryColor: 'purple',
    duration: '2 años (4 semestres)',
    degreeType: 'Técnico Profesional / Consultor',
    riasecPrimary: 'E',
    riasecSecondary: 'S',
    shortDescription: 'Guía a personas en la elección de vestuario, estilismo para eventos y compras estratégicas acordes con su presupuesto y estilo de vida.',
    fullDescription: 'Capacita en análisis de color personal, morfología corporal, decodificación de dress codes para eventos sociales y corporativos, y gestión de compras eficientes tanto en boutiques físicas como en comercio electrónico.',
    necessarySkills: ['Sensibilidad para el estilo y tendencias de moda', 'Capacidad empática y psicología del vestir', 'Organización de compras y presupuestos', 'Discreción y trato cordial'],
    workFields: [
      'Consultoría individual para profesionales, ejecutivos y novias',
      'Grandes tiendas por departamentos y boutiques de lujo',
      'Producción de estilismo para sesiones fotográficas',
      'Creación de blogs de moda, contenido digital y webinars'
    ],
    averageSalaryRange: '$2,200,000 - $6,500,000 COP / mes',
    employabilityRate: '91%',
    dailyActivities: [
      'Realizar diagnósticos de estilo y necesidades de vestuario',
      'Elaborar dossiers de combinaciones para viajes y semanas laborales',
      'Diseñar rutas de compras en tiendas seleccionadas',
      'Asesorar a clientes en la depuración y orden de armarios'
    ],
    relatedSubjects: ['Morfología y Siluetas Corporales', 'Colorimetría Aplicada al Vestuario', 'Historia de la Moda y Tendencias', 'Personal Shopping y Gestión de Tiendas', 'Psicología de la Imagen y Coaching'],
    suggestedUniversities: ['uni-lci-bogota', 'uni-colegiatura'],
    iconName: 'UserCheck'
  },

  // ==========================================
  // 4. DISEÑO Y PRODUCCIÓN AUDIOVISUAL
  // ==========================================
  {
    id: 'audiovisual-diseno-grafico',
    name: 'Diseño Gráfico y Comunicación Visual',
    area: 'Diseño y Producción Audiovisual',
    categoryColor: 'indigo',
    duration: '4 a 5 años (8-10 semestres)',
    degreeType: 'Profesional Universitario',
    riasecPrimary: 'A',
    riasecSecondary: 'E',
    shortDescription: 'Diseña identidades visuales memorables, tipografías, packaging y sistemas de comunicación para marcas impresas y digitales.',
    fullDescription: 'Los diseñadores gráficos son arquitectos de mensajes visuales. Desarrollan manuales de marca, empaques ecológicos, señalética urbana, piezas para redes sociales y piezas publicitarias con rigor conceptual y maestría técnica.',
    necessarySkills: ['Dominio de Illustrator, Photoshop e InDesign', 'Tipografía, grillas y jerarquía visual', 'Pensamiento conceptual y creatividad estratégica', 'Comunicación asertiva con clientes'],
    workFields: [
      'Estudios de branding y agencias de publicidad globales',
      'Departamentos de diseño interno en empresas de todos los sectores',
      'Industria editorial de libros, revistas y catálogos',
      'Trabajo independiente freelance para clientes mundiales'
    ],
    averageSalaryRange: '$2,700,000 - $7,200,000 COP / mes',
    employabilityRate: '92%',
    dailyActivities: [
      'Construir logotipos, paletas cromáticas y sistemas gráficos',
      'Diseñar piezas editoriales y empaques listos para imprenta',
      'Crear recursos visuales de alto impacto para campañas de marketing',
      'Presentar conceptos creativos y justificaciones de diseño a directivos'
    ],
    relatedSubjects: ['Tipografía y Lettering', 'Identidad Visual y Branding', 'Diseño Editorial y Diagramación', 'Packaging y Diseño de Envases', 'Sistemas de Impresión y Preprensa'],
    suggestedUniversities: ['uni-unal', 'uni-javeriana', 'uni-andes', 'uni-taller-cinco'],
    iconName: 'PenTool',
    isTrending: true
  },
  {
    id: 'audiovisual-fotografia-profesional',
    name: 'Fotografía Profesional y Retoque Digital',
    area: 'Diseño y Producción Audiovisual',
    categoryColor: 'purple',
    duration: '3 a 4 años (6-8 semestres)',
    degreeType: 'Tecnólogo / Profesional',
    riasecPrimary: 'A',
    riasecSecondary: 'R',
    shortDescription: 'Captura instantes con dominio absoluto de la luz, cámaras de formato medio, esquemas de estudio, fotoperiodismo y postproducción.',
    fullDescription: 'Profesionales de la luz que dominan la óptica fotográfica, flashes de estudio, dirección de modelos, fotografía publicitaria de producto, gastronomía, eventos y retoque minucioso en Lightroom y Capture One.',
    necessarySkills: ['Manejo manual de cámaras y modificadores de luz', 'Composición, encuadre y narrativa visual', 'Retoque de piel y color en Photoshop/Capture One', 'Dirección de modelos y empatía en set'],
    workFields: [
      'Estudios de fotografía de moda, producto y gastronomía',
      'Agencias de noticias, revistas y fotoperiodismo documental',
      'Fotografía para bodas, retratos familiares y eventos corporativos',
      'Producción de imágenes para e-commerce y catálogos comerciales'
    ],
    averageSalaryRange: '$2,400,000 - $6,800,000 COP / mes',
    employabilityRate: '89%',
    dailyActivities: [
      'Configurar esquemas de luces en estudio con softboxes y reflectores',
      'Dirigir poses y expresiones a modelos en sesiones fotográficas',
      'Calibrar perfiles de color y revelar negativos digitales RAW',
      'Retocar imperfecciones y armonizar tonos de piel meticulosamente'
    ],
    relatedSubjects: ['Óptica y Control Manual de Cámara', 'Iluminación de Estudio y Exterior', 'Fotografía de Producto y Gastronomía', 'Retoque Digital Avanzado en Photoshop', 'Fotoperiodismo y Ensayo Documental'],
    suggestedUniversities: ['uni-lci-bogota', 'uni-taller-cinco', 'uni-javeriana'],
    iconName: 'Camera',
    isTrending: true
  },
  {
    id: 'audiovisual-produccion-cine-video',
    name: 'Producción Audiovisual y Cine',
    area: 'Diseño y Producción Audiovisual',
    categoryColor: 'indigo',
    duration: '4 a 5 años (8-10 semestres)',
    degreeType: 'Profesional Universitario',
    riasecPrimary: 'A',
    riasecSecondary: 'E',
    shortDescription: 'Lidera la creación de películas, series, documentales y videoclips desde el guion hasta el rodaje y la distribución en festivales.',
    fullDescription: 'Integra todos los oficios del cine: dirección, producción ejecutiva, dirección de fotografía, sonido directo y dirección de arte. Capacita en gestión de presupuestos, convocatorias del FDC (Fondo para el Desarrollo Cinematográfico) y rodajes en locación.',
    necessarySkills: ['Narrativa y lenguaje cinematográfico', 'Liderazgo y coordinación de equipos numerosos en set', 'Manejo de cámaras cinematográficas e iluminación', 'Gestión de recursos y planes de rodaje'],
    workFields: [
      'Casas productoras de cine y series de televisión (Netflix, Amazon, Caracol)',
      'Agencias de publicidad y comerciales de alto presupuesto',
      'Producción de videoclips musicales y documentalismo social',
      'Festivales de cine y canales culturales'
    ],
    averageSalaryRange: '$3,000,000 - $9,000,000 COP / mes',
    employabilityRate: '90%',
    dailyActivities: [
      'Planificar planes de rodaje, presupuestos y contratos de actores',
      'Dirigir tomas y encuadres con el director de fotografía en set',
      'Supervisar el arte, utilería y vestuario de las escenas',
      'Revisar el montaje final y la mezcla de sonido envolvente'
    ],
    relatedSubjects: ['Guion y Dramaturgia Cinematográfica', 'Dirección de Fotografía e Iluminación', 'Producción Ejecutiva y Gestión de Fondos', 'Dirección de Actores para Cámara', 'Historia y Lenguaje Cinematográfico'],
    suggestedUniversities: ['uni-unal', 'uni-javeriana', 'uni-taller-cinco', 'uni-andes'],
    iconName: 'Film',
    isTrending: true
  },
  {
    id: 'audiovisual-edicion-y-postproduccion',
    name: 'Edición de Video, Postproducción y Efectos Visuales',
    area: 'Diseño y Producción Audiovisual',
    categoryColor: 'blue',
    duration: '3 a 4 años (6-8 semestres)',
    degreeType: 'Tecnólogo / Profesional',
    riasecPrimary: 'A',
    riasecSecondary: 'R',
    shortDescription: 'Ensambla narrativas cautivadoras, realiza corrección de color cinemática (color grading), diseño sonoro y efectos visuales (VFX).',
    fullDescription: 'El montajista define el ritmo y la emoción de la historia. Capacita en software estándar de la industria (DaVinci Resolve, Premiere Pro, After Effects, Nuke), composición de planos con croma, etalonaje y masterización para salas y streaming.',
    necessarySkills: ['Sentido del ritmo narrativo y continuidad visual', 'Manejo de curvas de color y etalonaje en DaVinci Resolve', 'Composición de efectos visuales y motion design', 'Criterio acústico para mezcla y edición de audio'],
    workFields: [
      'Estudios de postproducción de cine y televisión',
      'Canales de streaming y creadores de contenido de gran escala',
      'Agencias de publicidad digital y casas productoras de comerciales',
      'Trabajo remoto para productoras en EE. UU., España y Latinoamérica'
    ],
    averageSalaryRange: '$2,800,000 - $8,000,000 COP / mes',
    employabilityRate: '93%',
    dailyActivities: [
      'Seleccionar tomas y armar el corte de edición preliminar',
      'Calibrar sombras, tonos medios y tonos de piel con ruedas de color',
      'Integrar gráficos animados, transiciones y títulos dinámicos',
      'Sincronizar efectos de sonido (foley) y mezclar diálogos con música'
    ],
    relatedSubjects: ['Teoría del Montaje y Continuidad', 'Color Grading y Etalonaje en DaVinci', 'Motion Graphics y After Effects', 'Composición Digital y VFX', 'Diseño de Sonido y Foley para Video'],
    suggestedUniversities: ['uni-lci-bogota', 'uni-javeriana', 'uni-taller-cinco'],
    iconName: 'Video',
    isTrending: true
  },
  {
    id: 'audiovisual-creacion-de-contenido-digital',
    name: 'Creación de Contenido Digital y Nuevos Medios',
    area: 'Diseño y Producción Audiovisual',
    categoryColor: 'purple',
    duration: '2 a 3 años (4-6 semestres)',
    degreeType: 'Tecnólogo / Profesional',
    riasecPrimary: 'E',
    riasecSecondary: 'A',
    shortDescription: 'Produce videos cortos, podcasts, directos y formatos virales para YouTube, TikTok e Instagram, gestionando comunidades y monetización.',
    fullDescription: 'Forma estrategas de contenido con soltura frente a la cámara, dominio de producción ágil con smartphones y cámaras mirrorless, analítica de métricas de retención, storytelling vertical y colaboración con marcas comerciales.',
    necessarySkills: ['Storytelling rápido para formatos cortos verticales', 'Edición ágil de video con subtítulos y dinamismo', 'Comunicación carismática frente a cámara o micrófono', 'Interpretación de métricas de audiencia y algoritmos'],
    workFields: [
      'Marcas y empresas que buscan crecer en TikTok, Reels y YouTube',
      'Canales propios de creadores de contenido e influencers',
      'Agencias de influencer marketing y gestión de comunidades',
      'Medios de comunicación digitales y portales juveniles'
    ],
    averageSalaryRange: '$2,500,000 - $7,500,000 COP / mes',
    employabilityRate: '93%',
    dailyActivities: [
      'Investigar tendencias y redactar guiones de alto impacto en los primeros 3 segundos',
      'Grabar contenido con iluminación ring light y micrófonos lavalier inalámbricos',
      'Editar videos dinámicos con efectos de sonido, zooms y transiciones',
      'Analizar comentarios, shares y tasa de retención para optimizar publicaciones'
    ],
    relatedSubjects: ['Estrategias de Storytelling para Redes Sociales', 'Producción Ágil de Video Móvil', 'Producción y Distribución de Podcasts', 'Monetización Digital y Negociación con Marcas', 'Analítica de Algoritmos y Crecimiento Orgánico'],
    suggestedUniversities: ['uni-javeriana', 'uni-eafit', 'uni-ucompensar'],
    iconName: 'Smartphone',
    isTrending: true
  },

  // ==========================================
  // 5. EXPRESIÓN ARTÍSTICA
  // ==========================================
  {
    id: 'expresion-artes-escenicas-teatro',
    name: 'Teatro y Artes Escénicas',
    area: 'Expresión Artística',
    categoryColor: 'pink',
    duration: '4 a 5 años (8-10 semestres)',
    degreeType: 'Profesional Universitario',
    riasecPrimary: 'A',
    riasecSecondary: 'S',
    shortDescription: 'Domina la interpretación dramática, la presencia corporal, la técnica vocal y la dirección teatral para transformar al espectador.',
    fullDescription: 'Forma actores y directores con profunda comprensión del texto dramático, entrenamiento físico riguroso (Grotowski, Stanislavski, Meyerhold), proyección de la voz y capacidad de puesta en escena en salas y espacios abiertos.',
    necessarySkills: ['Memoria y concentración escénica', 'Expresión corporal y manejo del espacio', 'Modulación y potencia vocal', 'Trabajo empático en colectivo actoral'],
    workFields: [
      'Compañías de teatro profesional y salas independientes',
      'Festivales internacionales de teatro (FIAV, Festival Iberoamericano)',
      'Pedagogía teatral en colegios, universidades y comunidades',
      'Doblaje de voz, locución y narración de audiolibros'
    ],
    averageSalaryRange: '$2,000,000 - $5,500,000 COP / mes',
    employabilityRate: '85%',
    dailyActivities: [
      'Realizar rutinas de calentamiento físico y resonancia vocal',
      'Analizar subtextos y motivaciones de personajes dramáticos',
      'Ensayar escenas y coreografías bajo la guía del director',
      'Presentar funciones ante público en vivo'
    ],
    relatedSubjects: ['Técnicas de Actuación y Construcción de Personaje', 'Voz Escénica y Dicción', 'Entrenamiento Corporal y Danza para Actores', 'Dramaturgia e Historia del Teatro', 'Dirección y Puesta en Escena'],
    suggestedUniversities: ['uni-unal', 'uni-udea', 'uni-bellasartes-cali', 'uni-javeriana'],
    iconName: 'Sparkles'
  },
  {
    id: 'expresion-actuacion-cine-tv',
    name: 'Actuación para Cine, Televisión y Nuevos Medios',
    area: 'Expresión Artística',
    categoryColor: 'rose',
    duration: '3 a 4 años (6-8 semestres)',
    degreeType: 'Tecnólogo / Profesional',
    riasecPrimary: 'A',
    riasecSecondary: 'E',
    shortDescription: 'Especialista en la sutileza actoral frente a cámara, continuidad emocional en rodajes, castings profesionales y doblaje internacional.',
    fullDescription: 'Enseña la contención y naturalidad que exige la pantalla. Desarrolla competencias en audiciones self-tape, manejo de marcas en el suelo, continuidad de mirada en primeros planos y técnicas vocales para doblaje y neutralización de acentos.',
    necessarySkills: ['Naturalidad y expresividad gestual contenida', 'Capacidad de memorizar y adaptar líneas en set', 'Puntualidad y rigor profesional en jornadas de rodaje', 'Autogestión de castings y representación artística'],
    workFields: [
      'Telenovelas, series para plataformas de streaming (Netflix, HBO Max)',
      'Largometrajes y cortometrajes cinematográficos',
      'Comerciales publicitarios para marcas globales',
      'Estudios de doblaje de voz al español latinoamericano'
    ],
    averageSalaryRange: '$2,400,000 - $8,000,000 COP / mes',
    employabilityRate: '87%',
    dailyActivities: [
      'Preparar monólogos y audiciones self-tape en alta resolución',
      'Estudiar guiones y construir la psicología del personaje ante cámara',
      'Repetir tomas en set manteniendo la misma energía y movimientos',
      'Grabar líneas de doblaje sincronizadas con el movimiento labial de actores extranjeros'
    ],
    relatedSubjects: ['Actuación ante la Cámara y Planos Cinematográficos', 'Técnica Meisner y Realismo Psicológico', 'Doblaje, Locución y Acento Neutro', 'Preparación de Castings y Self-Tapes', 'Combate Escénico y Acción Segura'],
    suggestedUniversities: ['uni-javeriana', 'uni-taller-cinco', 'uni-lci-bogota'],
    iconName: 'Film',
    isTrending: true
  },
  {
    id: 'expresion-danza-coreografia',
    name: 'Danza Contemporánea y Composición Coreográfica',
    area: 'Expresión Artística',
    categoryColor: 'pink',
    duration: '4 años (8 semestres)',
    degreeType: 'Profesional Universitario',
    riasecPrimary: 'R',
    riasecSecondary: 'A',
    shortDescription: 'Comunica emociones e ideas a través del movimiento corporal, el ritmo, la improvisación, el ballet clásico y la danza urbana y tradicional.',
    fullDescription: 'Forma bailarines y coreógrafos con alto rigor atlético y sensibilidad poética. Abarca acondicionamiento físico, anatomía del bailarín, prevención de lesiones, ritmos folclóricos colombianos y montaje coreográfico para espectáculos.',
    necessarySkills: ['Flexibilidad, fuerza y coordinación rítmica', 'Memoria coreográfica y musicalidad', 'Creatividad para componer secuencias de movimiento', 'Disciplina física y cuidado corporal'],
    workFields: [
      'Compañías profesionales de danza contemporánea y ballet',
      'Ballets folclóricos y compañías de danza tradicional colombiana',
      'Espectáculos musicales, giras de conciertos y videoclips',
      'Academias de formación artística y escuelas de danza'
    ],
    averageSalaryRange: '$2,000,000 - $5,400,000 COP / mes',
    employabilityRate: '86%',
    dailyActivities: [
      'Completar barras de ballet y acondicionamiento somático diario',
      'Explorar pautas de improvisación y contact improvisation',
      'Montar coreografías coordinando luces, vestuario y música',
      'Presentarse en temporadas teatrales y giras nacionales e internacionales'
    ],
    relatedSubjects: ['Técnica de Danza Contemporánea (Graham, Cunningham, Release)', 'Ballet Clásico Aplicado', 'Danzas Tradicionales Colombianas y Ritmos Afro', 'Composición Coreográfica y Puesta en Escena', 'Anatomía, Kinesiología y Prevención de Lesiones'],
    suggestedUniversities: ['uni-unal', 'uni-udea', 'uni-bellasartes-cali'],
    iconName: 'Sparkles'
  },
  {
    id: 'expresion-musica-instrumentacion',
    name: 'Música Profesional e Interpretación Instrumental',
    area: 'Expresión Artística',
    categoryColor: 'purple',
    duration: '5 años (10 semestres)',
    degreeType: 'Profesional Universitario',
    riasecPrimary: 'A',
    riasecSecondary: 'R',
    shortDescription: 'Domina tu instrumento musical (guitarra, piano, violín, vientos, batería), solfeo, armonía avanzada e interpretación de repertorios clásicos y populares.',
    fullDescription: 'Los músicos profesionales desarrollan una técnica virtuosa y un oído armónico refinado. Aprenden lectura a primera vista, contrapunto, ensambles de cámara, orquesta sinfónica, jazz y música colombiana y latinoamericana.',
    necessarySkills: ['Oído musical absoluto o relativo y afinación', 'Destreza motriz fina con el instrumento de elección', 'Lectura ágil de partituras y teoría musical', 'Capacidad de ensamble y escucha con otros músicos'],
    workFields: [
      'Orquestas filarmónicas, sinfónicas y bandas sinfónicas',
      'Grupos de cámara, agrupaciones de jazz, pop y folclor',
      'Grabación de sesiones de estudio para discos y bandas sonoras',
      'Docencia musical en conservatorios y academias privadas'
    ],
    averageSalaryRange: '$2,500,000 - $6,800,000 COP / mes',
    employabilityRate: '88%',
    dailyActivities: [
      'Dedicar horas de práctica técnica individual y escalas en el instrumento',
      'Ensayar repertorios colectivos con directores de orquesta o grupo',
      'Analizar armonías complejas y transcribir solos de oído',
      'Participar en conciertos, recitales y grabaciones discográficas'
    ],
    relatedSubjects: ['Instrumento Principal (10 niveles)', 'Armonía Tonal y Contrapunto', 'Entrenamiento Auditivo y Solfeo', 'Música de Cámara y Orquesta', 'Historia de la Música Universal y Colombiana'],
    suggestedUniversities: ['uni-unal', 'uni-javeriana', 'uni-eafit', 'uni-andes'],
    iconName: 'Music'
  },
  {
    id: 'expresion-canto-tecnica-vocal',
    name: 'Canto Profesional y Formación Vocal',
    area: 'Expresión Artística',
    categoryColor: 'rose',
    duration: '4 a 5 años (8-10 semestres)',
    degreeType: 'Profesional Universitario',
    riasecPrimary: 'A',
    riasecSecondary: 'S',
    shortDescription: 'Desarrolla el máximo potencial de tu voz con respiración diafragmática, colocación, resonancia, canto lírico, jazz, teatro musical y géneros populares.',
    fullDescription: 'La voz humana es el instrumento más íntimo y expresivo. Capacita en fonética acústica, afinación perfecta, interpretación lírica y popular, presencia en escenario, microfonía y salud e higiene de las cuerdas vocales.',
    necessarySkills: ['Afinación precisa y oído armónico', 'Manejo de la respiración costo-diafragmática', 'Conexión emocional y expresiva con la letra', 'Cuidado riguroso de la salud laríngea'],
    workFields: [
      'Ópera, coros sinfónicos y producciones líricas',
      'Bandas de pop, rock, jazz y música tradicional colombiana',
      'Compañías de teatro musical y espectáculos en vivo',
      'Vocal coach y pedagogía de la técnica vocal'
    ],
    averageSalaryRange: '$2,300,000 - $7,000,000 COP / mes',
    employabilityRate: '87%',
    dailyActivities: [
      'Vocalizar con ejercicios de escalas, arpegios y respiración',
      'Aprender letras y repertorios en español, inglés, italiano y alemán',
      'Ensayar con pianistas acompañantes y bandas en vivo',
      'Presentar conciertos y cuidar el descanso vocal adecuado'
    ],
    relatedSubjects: ['Técnica Vocal y Fisiología de la Laringe', 'Dicción y Fonética en Varios Idiomas', 'Interpretación y Estilos Musicales', 'Entrenamiento Auditivo y Lectura Cantada', 'Presencia Escénica para Cantantes'],
    suggestedUniversities: ['uni-unal', 'uni-javeriana', 'uni-eafit', 'uni-bellasartes-cali'],
    iconName: 'Mic',
    isTrending: true
  },
  {
    id: 'expresion-produccion-musical-audio',
    name: 'Producción Musical y Tecnología del Audio',
    area: 'Expresión Artística',
    categoryColor: 'indigo',
    duration: '4 a 5 años (8-10 semestres)',
    degreeType: 'Profesional Universitario',
    riasecPrimary: 'A',
    riasecSecondary: 'R',
    shortDescription: 'Produce canciones en Pro Tools, Ableton y Logic, graba instrumentos con microfonía de precisión, mezcla pistas y masteriza éxitos mundiales.',
    fullDescription: 'El productor musical es el arquitecto sonoro de la música actual. Combina conocimientos acústicos, teoría musical, síntesis de sonido, compresión, ecualización y visión comercial para guiar a solistas y bandas a sonar impecables.',
    necessarySkills: ['Manejo de Digital Audio Workstations (DAWs)', 'Criterio auditivo para ecualización, dinámica y espacio sonoro', 'Técnicas de microfonía y acústica de recintos', 'Capacidad de conectar con artistas y extraer su mejor versión'],
    workFields: [
      'Estudios de grabación musical de alto nivel',
      'Sellos discográficos (Sony, Universal, Warner) y sellos independientes',
      'Composición y producción de bandas sonoras para videojuegos y cine',
      'Estudios de masterización y mezcla para streaming (Spotify, Apple Music)'
    ],
    averageSalaryRange: '$3,000,000 - $9,500,000 COP / mes',
    employabilityRate: '94%',
    dailyActivities: [
      'Microfonar baterías acústicas, voces y guitarras en estudio',
      'Producir beats, arpegios de sintetizadores y arreglos orquestales',
      'Mezclar múltiples canales ajustando niveles, paneos y efectos',
      'Masterizar canciones cumpliendo los estándares LUFS de plataformas'
    ],
    relatedSubjects: ['Grabación en Estudio y Microfonía', 'Mezcla y Masterización de Audio', 'Síntesis de Sonido y MIDI', 'Acústica y Electroacústica', 'Negocios de la Música y Derechos de Autor'],
    suggestedUniversities: ['uni-eafit', 'uni-javeriana', 'uni-andes', 'uni-lci-bogota'],
    iconName: 'Music',
    isTrending: true
  },

  // ==========================================
  // 6. DISEÑO Y DECORACIÓN
  // ==========================================
  {
    id: 'decoracion-diseno-de-interiores',
    name: 'Diseño de Interiores y Arquitectura Interior',
    area: 'Diseño y Decoración',
    categoryColor: 'amber',
    duration: '4 a 5 años (8-10 semestres)',
    degreeType: 'Profesional Universitario',
    riasecPrimary: 'A',
    riasecSecondary: 'R',
    shortDescription: 'Transforma espacios habitables, comerciales y corporativos mediante distribución espacial, iluminación, ergonomía, materiales y mobiliario.',
    fullDescription: 'Los diseñadores de interiores optimizan la vida cotidiana dentro de los muros. Conjugan psicología ambiental, planos arquitectónicos en AutoCAD y Revit, selección de cerámicas, maderas y textiles, y diseño de muebles a medida.',
    necessarySkills: ['Visión espacial y distribución arquitectónica', 'Manejo de software de renderizado (SketchUp, V-Ray, 3ds Max)', 'Conocimiento de materiales de construcción y acabados', 'Gestión de presupuestos y dirección de remodelaciones'],
    workFields: [
      'Estudios de arquitectura y diseño interior residencial y comercial',
      'Cadenas hoteleras, restaurantes y espacios de hospitalidad',
      'Empresas de diseño y comercialización de mobiliario',
      'Estudio independiente de remodelación y decoración integral'
    ],
    averageSalaryRange: '$2,800,000 - $8,000,000 COP / mes',
    employabilityRate: '91%',
    dailyActivities: [
      'Levantar medidas en obra y dibujar planos de distribución en CAD',
      'Elaborar renders 3D hiperrealistas de las propuestas espaciales',
      'Seleccionar muestras de pisos, cortinas, pinturas y luminarias con el cliente',
      'Coordinar con carpinteros, electricistas y pintores durante la reforma'
    ],
    relatedSubjects: ['Diseño Espacial y Ergonomía Interior', 'Modelado 3D y Renders Arquitectónicos', 'Iluminación y Luminotecnia', 'Materiales, Acabados y Texturas', 'Diseño y Fabricación de Mobiliario'],
    suggestedUniversities: ['uni-taller-cinco', 'uni-lci-bogota', 'uni-colegiatura', 'uni-javeriana'],
    iconName: 'Home',
    isTrending: true
  },
  {
    id: 'decoracion-decoracion-y-ambientacion',
    name: 'Decoración y Ambientación de Espacios',
    area: 'Diseño y Decoración',
    categoryColor: 'rose',
    duration: '2 a 3 años (4-6 semestres)',
    degreeType: 'Técnico Profesional / Tecnólogo',
    riasecPrimary: 'A',
    riasecSecondary: 'E',
    shortDescription: 'Armoniza ambientes con toques estéticos de color, cuadros, textiles, plantas y accesorios que transmiten calidez y sofisticación.',
    fullDescription: 'Se enfoca en la atmósfera emocional del espacio sin realizar obras civiles. Enseña a combinar paletas cromáticas, seleccionar tapetes, cojines y vajillas, aplicar técnicas de Home Staging para valorizar inmuebles en venta y ambientar celebraciones.',
    necessarySkills: ['Sensibilidad visual para el orden y la armonía', 'Dominio de estilos decorativos (nórdico, minimalista, industrial, bohemio)', 'Habilidad de compra y búsqueda de piezas únicas', 'Empatía para captar los gustos de los clientes'],
    workFields: [
      'Estudios de decoración y firmas de Home Staging inmobiliario',
      'Tiendas de decoración, hogar y diseño de autor',
      'Montaje de vitrinas comerciales y visual merchandising',
      'Asesoría independiente de ambientación para viviendas y apartamentos turísticos'
    ],
    averageSalaryRange: '$2,200,000 - $5,800,000 COP / mes',
    employabilityRate: '90%',
    dailyActivities: [
      'Crear tableros de inspiración con muestras de colores y telas',
      'Seleccionar objetos decorativos, alfombras, plantas y espejos',
      'Reorganizar el mobiliario existente para mejorar la fluidez y luz natural',
      'Montar la ambientación final cuidando aromas, iluminación y detalles'
    ],
    relatedSubjects: ['Estilos Decorativos y Tendencias del Hogar', 'Teoría del Color en Ambientes', 'Home Staging y Valorización de Espacios', 'Textiles, Cortinajes y Accesorios Decorativos', 'Visual Merchandising para Espacios Comerciales'],
    suggestedUniversities: ['uni-sena', 'uni-taller-cinco', 'uni-lci-bogota'],
    iconName: 'Sparkles',
    isTrending: true
  },
  {
    id: 'decoracion-diseno-de-espacios-comerciales',
    name: 'Diseño de Espacios Comerciales y Escenografía',
    area: 'Diseño y Decoración',
    categoryColor: 'indigo',
    duration: '3 a 4 años (6-8 semestres)',
    degreeType: 'Tecnólogo / Profesional',
    riasecPrimary: 'A',
    riasecSecondary: 'E',
    shortDescription: 'Diseña stands para ferias, vitrinas comerciales de alto impacto (escaparatismo), escenografías para televisión y pop-up stores.',
    fullDescription: 'Los espacios comerciales comunican valores de marca e invitan a la compra mediante experiencias inmersivas. Prepara en visual merchandising, diseño de stands desmontables, iluminación teatral y señalética para grandes superficies.',
    necessarySkills: ['Visión espacial aplicada al comportamiento del consumidor', 'Manejo de materiales de rápida instalación y estructuras ligeras', 'Creatividad conceptual para narrativas de marca', 'Capacidad de montaje contra reloj en ferias'],
    workFields: [
      'Centros de convenciones y ferias (Corferias, Plaza Mayor)',
      'Marcas de moda y retail con cadenas de tiendas físicas',
      'Estudios de televisión y productoras de eventos corporativos',
      'Agencias de marketing experiencial y BTL'
    ],
    averageSalaryRange: '$2,600,000 - $7,000,000 COP / mes',
    employabilityRate: '92%',
    dailyActivities: [
      'Diseñar la planimetría y render 3D de un stand ferial',
      'Montar vitrinas temáticas para temporadas de Navidad o Black Friday',
      'Supervisar la carpintería e iluminación de pop-up stores efímeras',
      'Evaluar el flujo de clientes y puntos calientes en la tienda'
    ],
    relatedSubjects: ['Escaparatismo y Visual Merchandising', 'Diseño de Stands y Arquitectura Efímera', 'Escenografía para Teatro y Televisión', 'Marketing Experiencial en el Punto de Venta', 'Iluminación Escénica y Comercial'],
    suggestedUniversities: ['uni-taller-cinco', 'uni-lci-bogota', 'uni-colegiatura'],
    iconName: 'Layers'
  },
  {
    id: 'decoracion-diseno-floral-botanico',
    name: 'Diseño Floral Profesional y Arte Botánico',
    area: 'Diseño y Decoración',
    categoryColor: 'emerald',
    duration: '1.5 a 2 años (3-4 semestres)',
    degreeType: 'Técnico Laboral / Especialista Floral',
    riasecPrimary: 'R',
    riasecSecondary: 'A',
    shortDescription: 'Crea arreglos florales artísticos, jardines verticales, arcos para bodas e intervenciones botánicas para eventos y hoteles de lujo.',
    fullDescription: 'Colombia es el segundo exportador mundial de flores. Esta carrera profesionaliza el arte floral: botánica aplicada, fisiología poscosecha de flores colombianas (rosas, hortensias, orquídeas, claveles), principios de diseño japonés (Ikebana) y diseño a gran escala.',
    necessarySkills: ['Sensibilidad para texturas y formas de la naturaleza', 'Conocimiento del cuidado y longevidad de las flores', 'Destreza manual para alambrado y ensamblajes orgánicos', 'Puntualidad en montajes de eventos en vivo'],
    workFields: [
      'Talleres de diseño floral boutique y florerías de autor',
      'Wedding planners y productoras de bodas y eventos de lujo',
      'Hoteles de alta gama y clubes sociales',
      'Emprendimiento de suscripciones florales y arte botánico preservado'
    ],
    averageSalaryRange: '$2,100,000 - $6,000,000 COP / mes',
    employabilityRate: '93%',
    dailyActivities: [
      'Seleccionar flores frescas de primera calidad y follajes exóticos',
      'Hidratar y acondicionar tallos para máxima durabilidad',
      'Armar centros de mesa, ramos de novia y muros florales gigantes',
      'Montar instalaciones botánicas suspendidas en eventos nupciales'
    ],
    relatedSubjects: ['Fisiología y Cuidado Poscosecha de la Flor', 'Teoría del Color y Composición Floral', 'Diseño Floral para Bodas y Grandes Eventos', 'Ikebana y Estilos Internacionales de Diseño Floral', 'Preservación Botánica y Jardines Verticales'],
    suggestedUniversities: ['uni-sena', 'uni-asodeco'],
    iconName: 'Sparkles',
    isTrending: true
  }
];
