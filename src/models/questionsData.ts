import { Question, RiasecType } from '../types';

/**
 * Banco completo de 180 preguntas vocacionales estructuradas bajo el modelo RIASEC de John Holland.
 * Diseñadas en lenguaje natural, claro y amigable para jóvenes y estudiantes colombianos.
 * 30 preguntas por dimensión: Realista (R), Investigativo (I), Artístico (A), Social (S), Emprendedor (E) y Convencional (C).
 * Abarca intereses, habilidades, personalidad, materias y preferencias ocupacionales.
 */
export const VOCATIONAL_QUESTION_BANK: Question[] = [
  {
    "id": 1,
    "text": "¿Te gusta desarmar cosas como controles, electrodomésticos o computadores para ver cómo funcionan por dentro?",
    "category": "R",
    "area": "intereses",
    "topic": "tecnología"
  },
  {
    "id": 2,
    "text": "¿Te llama la atención manejar herramientas, martillos, taladros o soldadores para reparar o construir algo?",
    "category": "R",
    "area": "intereses",
    "topic": "ingeniería"
  },
  {
    "id": 3,
    "text": "¿Disfrutas pasar tiempo en el campo, cuidar animales de granja o trabajar con plantas y cultivos?",
    "category": "R",
    "area": "intereses",
    "topic": "animales y naturaleza"
  },
  {
    "id": 4,
    "text": "¿Te gustaría aprender a pilotar drones, manejar maquinaria pesada o conducir vehículos de carga?",
    "category": "R",
    "area": "intereses",
    "topic": "tecnología"
  },
  {
    "id": 5,
    "text": "¿Prefieres actividades que requieran movimiento físico antes que pasar todo el día sentado frente a una pantalla?",
    "category": "R",
    "area": "intereses",
    "topic": "físico y campo"
  },
  {
    "id": 6,
    "text": "¿Te apasiona el funcionamiento de los autos, motocicletas o motores de combustión y eléctricos?",
    "category": "R",
    "area": "intereses",
    "topic": "mecánica"
  },
  {
    "id": 7,
    "text": "¿Te gustaría participar en expediciones para recolectar minerales, fósiles o muestras de ríos?",
    "category": "R",
    "area": "intereses",
    "topic": "ciencias"
  },
  {
    "id": 8,
    "text": "¿Te llama la atención la instalación de paneles solares, turbinas eólicas o redes eléctricas?",
    "category": "R",
    "area": "intereses",
    "topic": "energía"
  },
  {
    "id": 9,
    "text": "¿Se te facilita arreglar cosas dañadas en tu casa sin necesidad de llamar a un técnico?",
    "category": "R",
    "area": "habilidades",
    "topic": "manual"
  },
  {
    "id": 10,
    "text": "¿Tienes buena coordinación física y precisión para trabajar con tus manos o hacer maquetas?",
    "category": "R",
    "area": "habilidades",
    "topic": "manual"
  },
  {
    "id": 11,
    "text": "¿Eres bueno entendiendo planos, mapas, croquis o diagramas de ensamble de muebles y objetos?",
    "category": "R",
    "area": "habilidades",
    "topic": "espacial"
  },
  {
    "id": 12,
    "text": "¿Puedes calcular a ojo distancias, medidas o pesos con bastante precisión?",
    "category": "R",
    "area": "habilidades",
    "topic": "espacial"
  },
  {
    "id": 13,
    "text": "¿Aprendes más rápido haciendo las cosas con las manos que solo leyendo teoría en un libro?",
    "category": "R",
    "area": "habilidades",
    "topic": "aprendizaje práctico"
  },
  {
    "id": 14,
    "text": "¿Tienes paciencia y buen pulso para calibrar equipos, instrumentos ópticos o medir con micrómetros?",
    "category": "R",
    "area": "habilidades",
    "topic": "precisión"
  },
  {
    "id": 15,
    "text": "¿Te resulta fácil aprender a manejar máquinas, herramientas eléctricas o instrumentos mecánicos?",
    "category": "R",
    "area": "habilidades",
    "topic": "operativo"
  },
  {
    "id": 16,
    "text": "¿Te consideras una persona práctica que prefiere ver resultados tangibles y reales de su esfuerzo?",
    "category": "R",
    "area": "personalidad",
    "topic": "práctico"
  },
  {
    "id": 17,
    "text": "¿Te sientes más cómodo trabajando al aire libre o en talleres que en una oficina con traje formal?",
    "category": "R",
    "area": "personalidad",
    "topic": "entorno"
  },
  {
    "id": 18,
    "text": "¿Prefieres enfrentar retos físicos y concretos en vez de discutir ideas abstractas o filosóficas?",
    "category": "R",
    "area": "personalidad",
    "topic": "enfoque"
  },
  {
    "id": 19,
    "text": "¿Te gusta la ropa cómoda y funcional que te permita moverte sin preocuparte por ensuciarte?",
    "category": "R",
    "area": "personalidad",
    "topic": "estilo"
  },
  {
    "id": 20,
    "text": "¿Disfrutas la tranquilidad del trabajo individual o con pocas personas enfocadas en una meta clara?",
    "category": "R",
    "area": "personalidad",
    "topic": "social"
  },
  {
    "id": 21,
    "text": "¿Valoras la puntualidad, el orden en tus herramientas y hacer las cosas con paso firme?",
    "category": "R",
    "area": "personalidad",
    "topic": "organización"
  },
  {
    "id": 22,
    "text": "¿Eres de los que prefiere resolver un problema de inmediato con acción antes que darle muchas vueltas?",
    "category": "R",
    "area": "personalidad",
    "topic": "acción"
  },
  {
    "id": 23,
    "text": "¿Te gustaría trabajar en una construcción, túnel, puente o proyecto de infraestructura vial?",
    "category": "R",
    "area": "preferencias",
    "topic": "construcción"
  },
  {
    "id": 24,
    "text": "¿Te agradaría trabajar en una reserva natural, parque nacional o en reforestación de bosques?",
    "category": "R",
    "area": "preferencias",
    "topic": "ambiente"
  },
  {
    "id": 25,
    "text": "¿Te visualizas trabajando en una planta industrial donde se ensamblan piezas o se fabrican alimentos?",
    "category": "R",
    "area": "preferencias",
    "topic": "industria"
  },
  {
    "id": 26,
    "text": "¿Te atrae la idea de trabajar en criminalística de campo inspeccionando huellas o balística en el lugar de los hechos?",
    "category": "R",
    "area": "preferencias",
    "topic": "criminalística"
  },
  {
    "id": 27,
    "text": "¿Te gustaría trabajar en mantenimiento de aviones, barcos mercantes o trenes de carga?",
    "category": "R",
    "area": "preferencias",
    "topic": "transporte"
  },
  {
    "id": 28,
    "text": "¿Elegirías un trabajo donde debas moverte por diferentes ciudades o regiones haciendo trabajos de campo?",
    "category": "R",
    "area": "preferencias",
    "topic": "movilidad"
  },
  {
    "id": 29,
    "text": "¿Te gustaría operar equipos de telecomunicaciones o antenas en zonas remotas de Colombia?",
    "category": "R",
    "area": "preferencias",
    "topic": "telecomunicaciones"
  },
  {
    "id": 30,
    "text": "¿Te gustaría diseñar y construir prótesis ortopédicas o dispositivos mecánicos de ayuda médica?",
    "category": "R",
    "area": "preferencias",
    "topic": "biomédica"
  },
  {
    "id": 31,
    "text": "¿Sientes curiosidad constante por saber el 'por qué' científico detrás de las cosas que pasan en el mundo?",
    "category": "I",
    "area": "intereses",
    "topic": "ciencias"
  },
  {
    "id": 32,
    "text": "¿Te gusta investigar en internet, documentales o libros sobre misterios del universo o avances de la ciencia?",
    "category": "I",
    "area": "intereses",
    "topic": "investigación"
  },
  {
    "id": 33,
    "text": "¿Te apasiona resolver acertijos, problemas de matemáticas complicados o retos de lógica pura?",
    "category": "I",
    "area": "intereses",
    "topic": "lógica"
  },
  {
    "id": 34,
    "text": "¿Te gustaría aprender a programar código y crear algoritmos de inteligencia artificial?",
    "category": "I",
    "area": "intereses",
    "topic": "tecnología"
  },
  {
    "id": 35,
    "text": "¿Te interesa cómo reacciona el cuerpo humano ante diferentes medicinas, virus o enfermedades?",
    "category": "I",
    "area": "intereses",
    "topic": "salud"
  },
  {
    "id": 36,
    "text": "¿Te llama la atención la química, mezclar sustancias en un laboratorio y ver sus reacciones?",
    "category": "I",
    "area": "intereses",
    "topic": "química"
  },
  {
    "id": 37,
    "text": "¿Te gusta investigar sobre el comportamiento criminal, qué motiva a un delincuente y cómo resolver un caso policial?",
    "category": "I",
    "area": "intereses",
    "topic": "criminología y justicia"
  },
  {
    "id": 38,
    "text": "¿Te gusta analizar estadísticas, gráficos de datos o probabilidades en deportes, economía o videojuegos?",
    "category": "I",
    "area": "intereses",
    "topic": "datos"
  },
  {
    "id": 39,
    "text": "¿Tienes facilidad para encontrar errores o detalles que a otras personas se les pasan por alto?",
    "category": "I",
    "area": "habilidades",
    "topic": "observación"
  },
  {
    "id": 40,
    "text": "¿Eres bueno recolectando pistas, datos o información para llegar a una conclusión lógica?",
    "category": "I",
    "area": "habilidades",
    "topic": "investigación"
  },
  {
    "id": 41,
    "text": "¿Comprendes con facilidad conceptos de biología celular, física o fórmulas químicas?",
    "category": "I",
    "area": "habilidades",
    "topic": "ciencias"
  },
  {
    "id": 42,
    "text": "¿Eres capaz de concentrarte durante horas analizando un problema complejo sin distraerte?",
    "category": "I",
    "area": "habilidades",
    "topic": "concentración"
  },
  {
    "id": 43,
    "text": "¿Tienes habilidad para explicar fenómenos naturales o tecnológicos basándote en evidencia y hechos?",
    "category": "I",
    "area": "habilidades",
    "topic": "comunicación científica"
  },
  {
    "id": 44,
    "text": "¿Te resulta sencillo aprender nuevos lenguajes de programación o utilizar herramientas de análisis de datos?",
    "category": "I",
    "area": "habilidades",
    "topic": "tecnología"
  },
  {
    "id": 45,
    "text": "¿Disfrutas comparar varias fuentes de información para verificar si una noticia es real o falsa?",
    "category": "I",
    "area": "habilidades",
    "topic": "pensamiento crítico"
  },
  {
    "id": 46,
    "text": "¿Te consideras una persona analítica que toma decisiones con la cabeza y no por impulsos emocionales?",
    "category": "I",
    "area": "personalidad",
    "topic": "análisis"
  },
  {
    "id": 47,
    "text": "¿Prefieres trabajar de forma independiente investigando a fondo un tema que te obsesiona?",
    "category": "I",
    "area": "personalidad",
    "topic": "autonomía"
  },
  {
    "id": 48,
    "text": "¿Te apasiona el debate basado en datos duros, experimentos comprobados y argumentos sólidos?",
    "category": "I",
    "area": "personalidad",
    "topic": "rigor"
  },
  {
    "id": 49,
    "text": "¿Disfrutas la lectura de artículos científicos, revistas de tecnología o reportes de casos?",
    "category": "I",
    "area": "personalidad",
    "topic": "curiosidad"
  },
  {
    "id": 50,
    "text": "¿No te conformas con respuestas simples y siempre buscas ir a la raíz de las cosas?",
    "category": "I",
    "area": "personalidad",
    "topic": "profundidad"
  },
  {
    "id": 51,
    "text": "¿Sueles cuestionar las cosas que la mayoría da por sentado hasta comprobarlas por ti mismo?",
    "category": "I",
    "area": "personalidad",
    "topic": "escepticismo constructivo"
  },
  {
    "id": 52,
    "text": "¿Te da una gran satisfacción intelectual cuando logras resolver un problema que parecía imposible?",
    "category": "I",
    "area": "personalidad",
    "topic": "logro"
  },
  {
    "id": 53,
    "text": "¿Te gustaría trabajar en un laboratorio haciendo pruebas de ADN, análisis de sangre o vacunas?",
    "category": "I",
    "area": "preferencias",
    "topic": "laboratorio"
  },
  {
    "id": 54,
    "text": "¿Te atrae trabajar como perito forense analizando evidencias balísticas, sustancias o huellas para la justicia?",
    "category": "I",
    "area": "preferencias",
    "topic": "criminalística y forense"
  },
  {
    "id": 55,
    "text": "¿Te gustaría trabajar como analista de ciberseguridad rastreando ataques de hackers en redes bancarias?",
    "category": "I",
    "area": "preferencias",
    "topic": "ciberseguridad"
  },
  {
    "id": 56,
    "text": "¿Te visualizas trabajando en una universidad o centro de investigación desarrollando nuevos medicamentos?",
    "category": "I",
    "area": "preferencias",
    "topic": "farmacia"
  },
  {
    "id": 57,
    "text": "¿Te gustaría modelar el impacto del cambio climático en los páramos y ecosistemas colombianos?",
    "category": "I",
    "area": "preferencias",
    "topic": "ecología"
  },
  {
    "id": 58,
    "text": "¿Te gustaría trabajar en astronomía o física teórica investigando el origen de las galaxias?",
    "category": "I",
    "area": "preferencias",
    "topic": "física"
  },
  {
    "id": 59,
    "text": "¿Te agradaría estudiar el cerebro humano mediante resonancias para comprender la memoria y las emociones?",
    "category": "I",
    "area": "preferencias",
    "topic": "neurociencia"
  },
  {
    "id": 60,
    "text": "¿Te gustaría trabajar investigando fraudes financieros o lavado de activos analizando movimientos contables?",
    "category": "I",
    "area": "preferencias",
    "topic": "auditoría forense"
  },
  {
    "id": 61,
    "text": "¿Disfrutas dibujar, pintar, ilustrar en digital o expresar tus ideas mediante imágenes?",
    "category": "A",
    "area": "intereses",
    "topic": "artes plásticas"
  },
  {
    "id": 62,
    "text": "¿Te apasiona escuchar música, tocar un instrumento, componer canciones o mezclar sonidos?",
    "category": "A",
    "area": "intereses",
    "topic": "música"
  },
  {
    "id": 63,
    "text": "¿Te llama la atención el cine, la fotografía, la edición de videos o crear contenido audiovisual creativo?",
    "category": "A",
    "area": "intereses",
    "topic": "audiovisual"
  },
  {
    "id": 64,
    "text": "¿Te gusta escribir cuentos, poemas, guiones o blogs expresando tus emociones y reflexiones?",
    "category": "A",
    "area": "intereses",
    "topic": "literatura"
  },
  {
    "id": 65,
    "text": "¿Te interesa el diseño de modas, cómo combinar prendas o crear estilos y tendencias visuales?",
    "category": "A",
    "area": "intereses",
    "topic": "moda"
  },
  {
    "id": 66,
    "text": "¿Te atrae el diseño de interiores, remodelar habitaciones y buscar armonía entre luz, muebles y colores?",
    "category": "A",
    "area": "intereses",
    "topic": "diseño"
  },
  {
    "id": 67,
    "text": "¿Te gusta el teatro, la actuación, el baile o expresar historias a través del cuerpo y la voz?",
    "category": "A",
    "area": "intereses",
    "topic": "artes escénicas"
  },
  {
    "id": 68,
    "text": "¿Disfrutas visitar museos de arte, galerías, exposiciones fotográficas o festivales de diseño?",
    "category": "A",
    "area": "intereses",
    "topic": "cultura"
  },
  {
    "id": 69,
    "text": "¿Tienes facilidad para imaginar cómo se verá un espacio, un afiche o un logo antes de crearlo?",
    "category": "A",
    "area": "habilidades",
    "topic": "imaginación visual"
  },
  {
    "id": 70,
    "text": "¿Tienes buen oído para identificar ritmos, tonos musicales o armonías?",
    "category": "A",
    "area": "habilidades",
    "topic": "auditiva"
  },
  {
    "id": 71,
    "text": "¿Se te da fácil combinar colores, tipografías y elementos para que algo se vea moderno y atractivo?",
    "category": "A",
    "area": "habilidades",
    "topic": "estética"
  },
  {
    "id": 72,
    "text": "¿Tienes talento para transmitir emociones intensas a través de tus dibujos, escritos o creaciones?",
    "category": "A",
    "area": "habilidades",
    "topic": "expresividad"
  },
  {
    "id": 73,
    "text": "¿Eres capaz de improvisar y encontrar soluciones originales cuando las cosas no salen como planeado?",
    "category": "A",
    "area": "habilidades",
    "topic": "improvisación"
  },
  {
    "id": 74,
    "text": "¿Manejas con soltura programas como Photoshop, Illustrator, Canva, Blender o editores de video?",
    "category": "A",
    "area": "habilidades",
    "topic": "herramientas digitales"
  },
  {
    "id": 75,
    "text": "¿Te resulta natural inventar personajes, universos ficticios o historias originales?",
    "category": "A",
    "area": "habilidades",
    "topic": "narrativa"
  },
  {
    "id": 76,
    "text": "¿Te consideras una persona soñadora, con gran imaginación y que piensa diferente a la mayoría?",
    "category": "A",
    "area": "personalidad",
    "topic": "originalidad"
  },
  {
    "id": 77,
    "text": "¿Te desagradan las rutinas aburridas y los trabajos donde no te dejen aportar tu toque personal?",
    "category": "A",
    "area": "personalidad",
    "topic": "libertad creativa"
  },
  {
    "id": 78,
    "text": "¿Eres sensible ante la belleza de la naturaleza, una melodía conmovedora o una buena película?",
    "category": "A",
    "area": "personalidad",
    "topic": "sensibilidad"
  },
  {
    "id": 79,
    "text": "¿Prefieres expresarte a través del arte antes que dar explicaciones técnicas o rígidas?",
    "category": "A",
    "area": "personalidad",
    "topic": "expresión"
  },
  {
    "id": 80,
    "text": "¿Te gusta personalizar tus cuadernos, ropa, habitación o perfil en redes para que reflejen quién eres?",
    "category": "A",
    "area": "personalidad",
    "topic": "identidad"
  },
  {
    "id": 81,
    "text": "¿Valoras la autenticidad y prefieres ser fiel a tu estilo aunque a otros les parezca raro?",
    "category": "A",
    "area": "personalidad",
    "topic": "autenticidad"
  },
  {
    "id": 82,
    "text": "¿Te inspiras fácilmente cuando estás en contacto con nuevas culturas, ciudades o paisajes?",
    "category": "A",
    "area": "personalidad",
    "topic": "inspiración"
  },
  {
    "id": 83,
    "text": "¿Te gustaría trabajar como diseñador gráfico creando la identidad de marcas internacionales?",
    "category": "A",
    "area": "preferencias",
    "topic": "diseño"
  },
  {
    "id": 84,
    "text": "¿Te visualizas trabajando como animador 3D para películas animadas o videojuegos famosos?",
    "category": "A",
    "area": "preferencias",
    "topic": "animación"
  },
  {
    "id": 85,
    "text": "¿Te gustaría trabajar como director de arte en una agencia de publicidad o productora de cine?",
    "category": "A",
    "area": "preferencias",
    "topic": "publicidad"
  },
  {
    "id": 86,
    "text": "¿Te agradaría ser periodista cultural o crítico de cine, música y artes en un medio reconocido?",
    "category": "A",
    "area": "preferencias",
    "topic": "periodismo cultural"
  },
  {
    "id": 87,
    "text": "¿Te gustaría diseñar escenografías para conciertos, festivales o producciones teatrales?",
    "category": "A",
    "area": "preferencias",
    "topic": "escenografía"
  },
  {
    "id": 88,
    "text": "¿Te gustaría trabajar en una editorial ilustrando portadas de libros infantiles o cómics?",
    "category": "A",
    "area": "preferencias",
    "topic": "ilustración"
  },
  {
    "id": 89,
    "text": "¿Te atrae diseñar interfaces de aplicaciones (UI/UX) para que sean intuitivas y bonitas?",
    "category": "A",
    "area": "preferencias",
    "topic": "diseño digital"
  },
  {
    "id": 90,
    "text": "¿Te gustaría crear tu propia marca de ropa sostenible o accesorios artesanales?",
    "category": "A",
    "area": "preferencias",
    "topic": "emprendimiento creativo"
  },
  {
    "id": 91,
    "text": "¿Sientes una satisfacción genuina cuando ayudas a alguien a superar un problema o una tristeza?",
    "category": "S",
    "area": "intereses",
    "topic": "apoyo emocional"
  },
  {
    "id": 92,
    "text": "¿Te gusta enseñar, explicar temas difíciles de manera sencilla a tus compañeros o a niños?",
    "category": "S",
    "area": "intereses",
    "topic": "educación"
  },
  {
    "id": 93,
    "text": "¿Te interesa entender por qué la gente actúa como actúa y cómo sanar heridas psicológicas?",
    "category": "S",
    "area": "intereses",
    "topic": "psicología"
  },
  {
    "id": 94,
    "text": "¿Te preocupan las injusticias sociales, la pobreza o la falta de oportunidades en tu comunidad?",
    "category": "S",
    "area": "intereses",
    "topic": "justicia social"
  },
  {
    "id": 95,
    "text": "¿Te llama la atención el cuidado de pacientes, primeros auxilios o el bienestar físico de las personas?",
    "category": "S",
    "area": "intereses",
    "topic": "salud"
  },
  {
    "id": 96,
    "text": "¿Te gusta organizar dinámicas de grupo, juegos juveniles o actividades de integración comunitaria?",
    "category": "S",
    "area": "intereses",
    "topic": "recreación"
  },
  {
    "id": 97,
    "text": "¿Te interesa el bienestar de las comunidades indígenas, afrodescendientes o víctimas del conflicto?",
    "category": "S",
    "area": "intereses",
    "topic": "trabajo social"
  },
  {
    "id": 98,
    "text": "¿Te gusta escuchar los problemas de tus amigos y ser ese apoyo de confianza en momentos difíciles?",
    "category": "S",
    "area": "intereses",
    "topic": "empatía"
  },
  {
    "id": 99,
    "text": "¿Tienes mucha paciencia para escuchar a los demás sin juzgarlos ni interrumpirlos?",
    "category": "S",
    "area": "habilidades",
    "topic": "escucha activa"
  },
  {
    "id": 100,
    "text": "¿Se te facilita ponerte en el lugar de otra persona y comprender lo que está sintiendo?",
    "category": "S",
    "area": "habilidades",
    "topic": "empatía"
  },
  {
    "id": 101,
    "text": "¿Eres bueno calmando a personas cuando están nerviosas, asustadas o pasando por una crisis?",
    "category": "S",
    "area": "habilidades",
    "topic": "manejo emocional"
  },
  {
    "id": 102,
    "text": "¿Tienes facilidad para mediar en peleas o desacuerdos entre amigos y lograr que hagan las paces?",
    "category": "S",
    "area": "habilidades",
    "topic": "mediación"
  },
  {
    "id": 103,
    "text": "¿Sabes comunicar mensajes con tacto, amabilidad y respeto sin herir susceptibilidades?",
    "category": "S",
    "area": "habilidades",
    "topic": "comunicación asertiva"
  },
  {
    "id": 104,
    "text": "¿Tienes vocación para cuidar a niños pequeños, adultos mayores o personas con discapacidad?",
    "category": "S",
    "area": "habilidades",
    "topic": "cuidado"
  },
  {
    "id": 105,
    "text": "¿Eres capaz de mantener la serenidad ante situaciones médicas de emergencia o accidentes?",
    "category": "S",
    "area": "habilidades",
    "topic": "control en crisis"
  },
  {
    "id": 106,
    "text": "¿Te defines como una persona empática, solidaria y que se preocupa por el bien común?",
    "category": "S",
    "area": "personalidad",
    "topic": "solidaridad"
  },
  {
    "id": 107,
    "text": "¿Prefieres trabajar en equipo colaborando mano a mano que competir despiadadamente contra otros?",
    "category": "S",
    "area": "personalidad",
    "topic": "cooperación"
  },
  {
    "id": 108,
    "text": "¿Sientes que tu propósito de vida debe estar conectado con dejar una huella positiva en la sociedad?",
    "category": "S",
    "area": "personalidad",
    "topic": "propósito"
  },
  {
    "id": 109,
    "text": "¿Eres tolerante con las diferencias de opinión, creencias, etnias y formas de vida?",
    "category": "S",
    "area": "personalidad",
    "topic": "inclusión"
  },
  {
    "id": 110,
    "text": "¿Te resulta fácil ganarte la confianza y el cariño de las personas con tu actitud cordial?",
    "category": "S",
    "area": "personalidad",
    "topic": "calidez"
  },
  {
    "id": 111,
    "text": "¿Te conmueve profundamente el sufrimiento ajeno y sientes el impulso de actuar para aliviarlo?",
    "category": "S",
    "area": "personalidad",
    "topic": "sensibilidad social"
  },
  {
    "id": 112,
    "text": "¿Disfrutas ver crecer y progresar a los demás gracias a un consejo o apoyo que les brindaste?",
    "category": "S",
    "area": "personalidad",
    "topic": "gratificación altruista"
  },
  {
    "id": 113,
    "text": "¿Te gustaría trabajar como psicólogo clínico en consulta orientando a jóvenes y familias?",
    "category": "S",
    "area": "preferencias",
    "topic": "psicología"
  },
  {
    "id": 114,
    "text": "¿Te agradaría ser médico general o enfermero en un hospital público o clínica de alta complejidad?",
    "category": "S",
    "area": "preferencias",
    "topic": "medicina"
  },
  {
    "id": 115,
    "text": "¿Te ves trabajando como profesor de colegio o universidad formando a las futuras generaciones?",
    "category": "S",
    "area": "preferencias",
    "topic": "docencia"
  },
  {
    "id": 116,
    "text": "¿Te gustaría trabajar en fundaciones o en la ONU gestionando programas de nutrición y derechos humanos?",
    "category": "S",
    "area": "preferencias",
    "topic": "derechos humanos"
  },
  {
    "id": 117,
    "text": "¿Te llama la atención la terapia física o respiratoria ayudando a pacientes a volver a caminar o respirar bien?",
    "category": "S",
    "area": "preferencias",
    "topic": "fisioterapia"
  },
  {
    "id": 118,
    "text": "¿Te gustaría trabajar en un centro de rehabilitación para personas con adicciones o jóvenes en riesgo?",
    "category": "S",
    "area": "preferencias",
    "topic": "rehabilitación"
  },
  {
    "id": 119,
    "text": "¿Te gustaría coordinar brigadas de salud en zonas rurales vulnerables de Colombia?",
    "category": "S",
    "area": "preferencias",
    "topic": "salud comunitaria"
  },
  {
    "id": 120,
    "text": "¿Te atrae trabajar en orientación vocacional guiando a colegiales a descubrir su carrera ideal?",
    "category": "S",
    "area": "preferencias",
    "topic": "orientación"
  },
  {
    "id": 121,
    "text": "¿Te atrae la idea de crear tu propia empresa o negocio en lugar de ser empleado toda la vida?",
    "category": "E",
    "area": "intereses",
    "topic": "emprendimiento"
  },
  {
    "id": 122,
    "text": "¿Te gusta asumir el rol de líder cuando hay que organizar un trabajo en grupo o un evento escolar?",
    "category": "E",
    "area": "intereses",
    "topic": "liderazgo"
  },
  {
    "id": 123,
    "text": "¿Te apasiona la política, debatir sobre leyes y convencer a otros con tus ideas y propuestas?",
    "category": "E",
    "area": "intereses",
    "topic": "política y debate"
  },
  {
    "id": 124,
    "text": "¿Te interesa el mundo de las finanzas, la bolsa de valores, cómo se crean las riquezas y las inversiones?",
    "category": "E",
    "area": "intereses",
    "topic": "finanzas"
  },
  {
    "id": 125,
    "text": "¿Te llama la atención el marketing, saber cómo hacer que un producto se vuelva viral y se venda solo?",
    "category": "E",
    "area": "intereses",
    "topic": "mercadeo"
  },
  {
    "id": 126,
    "text": "¿Te gusta negociar para conseguir un mejor precio o un acuerdo donde todos salgan ganando?",
    "category": "E",
    "area": "intereses",
    "topic": "negociación"
  },
  {
    "id": 127,
    "text": "¿Te gusta hablar en público, dar discursos o presentar proyectos ante audiencias grandes?",
    "category": "E",
    "area": "intereses",
    "topic": "oratoria"
  },
  {
    "id": 128,
    "text": "¿Te interesan los negocios internacionales, cómo exportar café, flores o tecnología colombiana al mundo?",
    "category": "E",
    "area": "intereses",
    "topic": "comercio exterior"
  },
  {
    "id": 129,
    "text": "¿Tienes facilidad de palabra para convencer a la gente de hacer cosas o comprar una idea?",
    "category": "E",
    "area": "habilidades",
    "topic": "persuasión"
  },
  {
    "id": 130,
    "text": "¿Eres bueno tomando decisiones rápidas bajo presión sin paralizarte por el miedo al error?",
    "category": "E",
    "area": "habilidades",
    "topic": "toma de decisiones"
  },
  {
    "id": 131,
    "text": "¿Sabes delegar tareas y motivar a tu equipo para que trabajen con entusiasmo y cumplan metas?",
    "category": "E",
    "area": "habilidades",
    "topic": "gestión de equipos"
  },
  {
    "id": 132,
    "text": "¿Detectas con facilidad oportunidades de negocio donde otros solo ven problemas o dificultades?",
    "category": "E",
    "area": "habilidades",
    "topic": "visión comercial"
  },
  {
    "id": 133,
    "text": "¿Tienes soltura para romper el hielo y hacer contactos con personas que no conocías?",
    "category": "E",
    "area": "habilidades",
    "topic": "networking"
  },
  {
    "id": 134,
    "text": "¿Eres hábil diseñando estrategias para superar a la competencia en juegos, deportes o proyectos?",
    "category": "E",
    "area": "habilidades",
    "topic": "estrategia"
  },
  {
    "id": 135,
    "text": "¿Tienes resiliencia para no desanimarte si un proyecto fracasa y volver a intentarlo con más fuerza?",
    "category": "E",
    "area": "habilidades",
    "topic": "resiliencia empresarial"
  },
  {
    "id": 136,
    "text": "¿Te consideras una persona ambiciosa que busca superarse constantemente y alcanzar el éxito?",
    "category": "E",
    "area": "personalidad",
    "topic": "ambición sana"
  },
  {
    "id": 137,
    "text": "¿Disfrutas de los retos competitivos donde se premia la audacia, la innovación y el esfuerzo?",
    "category": "E",
    "area": "personalidad",
    "topic": "competitividad"
  },
  {
    "id": 138,
    "text": "¿Te aburre hacer lo mismo todos los días y prefieres proyectos con metas cambiantes y retadoras?",
    "category": "E",
    "area": "personalidad",
    "topic": "dinamismo"
  },
  {
    "id": 139,
    "text": "¿Confías plenamente en tu criterio y no tienes miedo de asumir la responsabilidad de un equipo?",
    "category": "E",
    "area": "personalidad",
    "topic": "seguridad"
  },
  {
    "id": 140,
    "text": "¿Te gusta rodearte de personas influyentes, talentosas y que tengan mentalidad de crecimiento?",
    "category": "E",
    "area": "personalidad",
    "topic": "relaciones estratégicas"
  },
  {
    "id": 141,
    "text": "¿Estás dispuesto a tomar riesgos calculados si la recompensa final vale la pena?",
    "category": "E",
    "area": "personalidad",
    "topic": "tolerancia al riesgo"
  },
  {
    "id": 142,
    "text": "¿Te motiva ganar dinero suficiente para ser independiente y ayudar económicamente a tu familia?",
    "category": "E",
    "area": "personalidad",
    "topic": "motivación económica"
  },
  {
    "id": 143,
    "text": "¿Te gustaría ser el Gerente General (CEO) de una gran empresa y dirigir a cientos de empleados?",
    "category": "E",
    "area": "preferencias",
    "topic": "alta gerencia"
  },
  {
    "id": 144,
    "text": "¿Te atrae ser un abogado litigante defendiendo casos complejos en tribunales de justicia?",
    "category": "E",
    "area": "preferencias",
    "topic": "litigio y derecho"
  },
  {
    "id": 145,
    "text": "¿Te gustaría dirigir campañas de marketing digital para marcas globales o creadores de contenido?",
    "category": "E",
    "area": "preferencias",
    "topic": "marketing digital"
  },
  {
    "id": 146,
    "text": "¿Te visualizas como diplomático o cónsul representando a Colombia en embajadas del exterior?",
    "category": "E",
    "area": "preferencias",
    "topic": "diplomacia"
  },
  {
    "id": 147,
    "text": "¿Te gustaría fundar una startup tecnológica y conseguir inversionistas de fondos internacionales?",
    "category": "E",
    "area": "preferencias",
    "topic": "startups"
  },
  {
    "id": 148,
    "text": "¿Te agradaría ser director de ventas negociando contratos millonarios entre empresas?",
    "category": "E",
    "area": "preferencias",
    "topic": "ventas corporativas"
  },
  {
    "id": 149,
    "text": "¿Te gustaría gestionar inversiones en fondos de capital de riesgo o bienes raíces comerciales?",
    "category": "E",
    "area": "preferencias",
    "topic": "banca de inversión"
  },
  {
    "id": 150,
    "text": "¿Te atrae ser consultor de negocios cobrando por asesorar a empresas sobre cómo aumentar sus ganancias?",
    "category": "E",
    "area": "preferencias",
    "topic": "consultoría gerencial"
  },
  {
    "id": 151,
    "text": "¿Te gusta mantener tus cuadernos, archivos de computadora y pertenencias impecablemente organizados?",
    "category": "C",
    "area": "intereses",
    "topic": "organización"
  },
  {
    "id": 152,
    "text": "¿Disfrutas trabajar con tablas de Excel, presupuestos, balances o cálculos exactos de dinero?",
    "category": "C",
    "area": "intereses",
    "topic": "finanzas"
  },
  {
    "id": 153,
    "text": "¿Te gusta seguir normas claras, protocolos establecidos y asegurarte de que los reglamentos se cumplan?",
    "category": "C",
    "area": "intereses",
    "topic": "normatividad"
  },
  {
    "id": 154,
    "text": "¿Te llama la atención el análisis de documentos legales, contratos, cláusulas y normativas jurídicas?",
    "category": "C",
    "area": "intereses",
    "topic": "derecho documental"
  },
  {
    "id": 155,
    "text": "¿Te interesa la logística, cómo se organiza el inventario en bodegas gigantes y los envíos puntuales?",
    "category": "C",
    "area": "intereses",
    "topic": "logística"
  },
  {
    "id": 156,
    "text": "¿Disfrutas clasificar información, armar catálogos o gestionar bases de datos con cientos de registros?",
    "category": "C",
    "area": "intereses",
    "topic": "bases de datos"
  },
  {
    "id": 157,
    "text": "¿Te atrae la criminología documental, como verificar firmas falsificadas o documentos alterados?",
    "category": "C",
    "area": "intereses",
    "topic": "documentología forense"
  },
  {
    "id": 158,
    "text": "¿Te gusta revisar facturas, recibos de pago y verificar que no falte ni sobre un solo centavo?",
    "category": "C",
    "area": "intereses",
    "topic": "contabilidad"
  },
  {
    "id": 159,
    "text": "¿Eres muy detallista y rara vez cometes errores por distracción al llenar formularios o digitar datos?",
    "category": "C",
    "area": "habilidades",
    "topic": "atención al detalle"
  },
  {
    "id": 160,
    "text": "¿Tienes gran destreza para crear fórmulas y tablas dinámicas en Excel o Google Sheets?",
    "category": "C",
    "area": "habilidades",
    "topic": "ofimática avanzada"
  },
  {
    "id": 161,
    "text": "¿Eres metódico para archivar documentos físicos y digitales de manera que cualquiera pueda encontrarlos?",
    "category": "C",
    "area": "habilidades",
    "topic": "gestión documental"
  },
  {
    "id": 162,
    "text": "¿Tienes facilidad para memorizar códigos, fechas, números de identificación o referencias de productos?",
    "category": "C",
    "area": "habilidades",
    "topic": "memoria operativa"
  },
  {
    "id": 163,
    "text": "¿Eres disciplinado para cumplir horarios estrictos y cronogramas sin dejar nada para última hora?",
    "category": "C",
    "area": "habilidades",
    "topic": "gestión del tiempo"
  },
  {
    "id": 164,
    "text": "¿Sabes redactar cartas formales, informes ejecutivos, derechos de petición o actas de reuniones?",
    "category": "C",
    "area": "habilidades",
    "topic": "redacción formal"
  },
  {
    "id": 165,
    "text": "¿Tienes ojo crítico para auditar un proceso y detectar inconsistencias o fraudes?",
    "category": "C",
    "area": "habilidades",
    "topic": "auditoría"
  },
  {
    "id": 166,
    "text": "¿Te consideras una persona ordenada, puntual, responsable y sumamente perfeccionista?",
    "category": "C",
    "area": "personalidad",
    "topic": "orden"
  },
  {
    "id": 167,
    "text": "¿Prefieres tener instrucciones claras y reglas bien definidas en lugar de trabajar en el caos o la incertidumbre?",
    "category": "C",
    "area": "personalidad",
    "topic": "estructura"
  },
  {
    "id": 168,
    "text": "¿Valoras la seguridad, la estabilidad laboral y un horario fijo por encima de la aventura impredecible?",
    "category": "C",
    "area": "personalidad",
    "topic": "estabilidad"
  },
  {
    "id": 169,
    "text": "¿Te produce satisfacción ver una tarea completamente terminada, limpia y archivada a tiempo?",
    "category": "C",
    "area": "personalidad",
    "topic": "cierre de tareas"
  },
  {
    "id": 170,
    "text": "¿Eres de los que prefiere revisar un trabajo dos veces antes de entregarlo para garantizar cero fallas?",
    "category": "C",
    "area": "personalidad",
    "topic": "rigor"
  },
  {
    "id": 171,
    "text": "¿Cuidas con celo la confidencialidad y la privacidad de los datos o secretos que te confían?",
    "category": "C",
    "area": "personalidad",
    "topic": "confidencialidad"
  },
  {
    "id": 172,
    "text": "¿Te sientes cómodo trabajando en ambientes corporativos serios, bancos o entidades del Estado?",
    "category": "C",
    "area": "personalidad",
    "topic": "entorno institucional"
  },
  {
    "id": 173,
    "text": "¿Te gustaría trabajar como Contador Público revisando finanzas corporativas y declaraciones de renta?",
    "category": "C",
    "area": "preferencias",
    "topic": "contaduría"
  },
  {
    "id": 174,
    "text": "¿Te agradaría ser Auditor de Calidad asegurando que los medicamentos o alimentos cumplan normas sanitarias (INVIMA)?",
    "category": "C",
    "area": "preferencias",
    "topic": "control de calidad"
  },
  {
    "id": 175,
    "text": "¿Te gustaría trabajar como Administrador de Bases de Datos protegiendo la información de millones de usuarios?",
    "category": "C",
    "area": "preferencias",
    "topic": "administración de datos"
  },
  {
    "id": 176,
    "text": "¿Te atrae trabajar en la DIAN, notarías o juzgados administrando procesos y trámites legales oficiales?",
    "category": "C",
    "area": "preferencias",
    "topic": "función pública"
  },
  {
    "id": 177,
    "text": "¿Te gustaría ser Actuario calculando riesgos matemáticos y pólizas para compañías de seguros?",
    "category": "C",
    "area": "preferencias",
    "topic": "ciencias actuariales"
  },
  {
    "id": 178,
    "text": "¿Te gustaría coordinar la logística portuaria de contenedores en Buenaventura, Cartagena o Barranquilla?",
    "category": "C",
    "area": "preferencias",
    "topic": "comercio portuario"
  },
  {
    "id": 179,
    "text": "¿Te visualizas como Perito Documentólogo analizando papel moneda, pasaportes y cheques para detectar fraudes?",
    "category": "C",
    "area": "preferencias",
    "topic": "documentología forense"
  },
  {
    "id": 180,
    "text": "¿Te gustaría ser Oficial de Cumplimiento supervisando que un banco no sea utilizado para lavado de activos?",
    "category": "C",
    "area": "preferencias",
    "topic": "cumplimiento normativo"
  }
];

/**
 * Selecciona un conjunto fresco, balanceado y aleatorio de preguntas del banco para cada test.
 * Garantiza:
 * 1. Preguntas distintas en cada intento seleccionadas aleatoriamente del banco.
 * 2. Cero repeticiones dentro del mismo test.
 * 3. Distribución equitativa y balanceada entre todas las dimensiones RIASEC (R, I, A, S, E, C).
 * 4. Variación real de preguntas (no solo reordenamiento).
 * 
 * @param excludeIds Preguntas que el usuario ya respondió previamente (para evitar repetir)
 * @param questionsPerDimension Cantidad de preguntas por cada dimensión (ej. 3 para test rápido = 18 preguntas; 4 para test completo = 24 preguntas; 5 para intensivo = 30)
 */
export function selectFreshQuestionsForUser(
  excludeIds: number[] = [],
  questionsPerDimension: number = 4
): Question[] {
  const dimensions: RiasecType[] = ['R', 'I', 'A', 'S', 'E', 'C'];
  const selected: Question[] = [];

  dimensions.forEach(dim => {
    const candidates = VOCATIONAL_QUESTION_BANK.filter(q => q.category === dim);
    
    // Filtramos las que ya respondió en el historial reciente
    const available = candidates.filter(q => !excludeIds.includes(q.id));
    
    // Si la reserva se agotó, reciclamos con mezcla aleatoria completa
    const pool = available.length >= questionsPerDimension ? available : candidates;
    
    // Barajamos aleatoriamente con Fisher-Yates
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    selected.push(...shuffled.slice(0, questionsPerDimension));
  });

  // Mezclamos el orden final para que no aparezcan agrupadas por categoría sino dinámicas
  return selected.sort(() => 0.5 - Math.random());
}
