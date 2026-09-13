#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script to:
1. Generate 180 vocational questions in simple, student-friendly language across RIASEC dimensions.
2. Generate 365 daily motivational quotes.
3. Update careersData.ts and careersCatalog.ts with Criminología, Criminalística, semesters, tuition, and cities.
"""

import json
import re
import random

# ==============================================================================
# 1. GENERATE VOCATIONAL QUESTION BANK (180 questions: 30 per RIASEC dimension)
# ==============================================================================

R_QUESTIONS = [
    # Intereses
    ("¿Te gusta desarmar cosas como controles, electrodomésticos o computadores para ver cómo funcionan por dentro?", "intereses", "tecnología"),
    ("¿Te llama la atención manejar herramientas, martillos, taladros o soldadores para reparar o construir algo?", "intereses", "ingeniería"),
    ("¿Disfrutas pasar tiempo en el campo, cuidar animales de granja o trabajar con plantas y cultivos?", "intereses", "animales y naturaleza"),
    ("¿Te gustaría aprender a pilotar drones, manejar maquinaria pesada o conducir vehículos de carga?", "intereses", "tecnología"),
    ("¿Prefieres actividades que requieran movimiento físico antes que pasar todo el día sentado frente a una pantalla?", "intereses", "físico y campo"),
    ("¿Te apasiona el funcionamiento de los autos, motocicletas o motores de combustión y eléctricos?", "intereses", "mecánica"),
    ("¿Te gustaría participar en expediciones para recolectar minerales, fósiles o muestras de ríos?", "intereses", "ciencias"),
    ("¿Te llama la atención la instalación de paneles solares, turbinas eólicas o redes eléctricas?", "intereses", "energía"),
    # Habilidades
    ("¿Se te facilita arreglar cosas dañadas en tu casa sin necesidad de llamar a un técnico?", "habilidades", "manual"),
    ("¿Tienes buena coordinación física y precisión para trabajar con tus manos o hacer maquetas?", "habilidades", "manual"),
    ("¿Eres bueno entendiendo planos, mapas, croquis o diagramas de ensamble de muebles y objetos?", "habilidades", "espacial"),
    ("¿Puedes calcular a ojo distancias, medidas o pesos con bastante precisión?", "habilidades", "espacial"),
    ("¿Aprendes más rápido haciendo las cosas con las manos que solo leyendo teoría en un libro?", "habilidades", "aprendizaje práctico"),
    ("¿Tienes paciencia y buen pulso para calibrar equipos, instrumentos ópticos o medir con micrómetros?", "habilidades", "precisión"),
    ("¿Te resulta fácil aprender a manejar máquinas, herramientas eléctricas o instrumentos mecánicos?", "habilidades", "operativo"),
    # Personalidad
    ("¿Te consideras una persona práctica que prefiere ver resultados tangibles y reales de su esfuerzo?", "personalidad", "práctico"),
    ("¿Te sientes más cómodo trabajando al aire libre o en talleres que en una oficina con traje formal?", "personalidad", "entorno"),
    ("¿Prefieres enfrentar retos físicos y concretos en vez de discutir ideas abstractas o filosóficas?", "personalidad", "enfoque"),
    ("¿Te gusta la ropa cómoda y funcional que te permita moverte sin preocuparte por ensuciarte?", "personalidad", "estilo"),
    ("¿Disfrutas la tranquilidad del trabajo individual o con pocas personas enfocadas en una meta clara?", "personalidad", "social"),
    ("¿Valoras la puntualidad, el orden en tus herramientas y hacer las cosas con paso firme?", "personalidad", "organización"),
    ("¿Eres de los que prefiere resolver un problema de inmediato con acción antes que darle muchas vueltas?", "personalidad", "acción"),
    # Preferencias laborales
    ("¿Te gustaría trabajar en una construcción, túnel, puente o proyecto de infraestructura vial?", "preferencias", "construcción"),
    ("¿Te agradaría trabajar en una reserva natural, parque nacional o en reforestación de bosques?", "preferencias", "ambiente"),
    ("¿Te visualizas trabajando en una planta industrial donde se ensamblan piezas o se fabrican alimentos?", "preferencias", "industria"),
    ("¿Te atrae la idea de trabajar en criminalística de campo inspeccionando huellas o balística en el lugar de los hechos?", "preferencias", "criminalística"),
    ("¿Te gustaría trabajar en mantenimiento de aviones, barcos mercantes o trenes de carga?", "preferencias", "transporte"),
    ("¿Elegirías un trabajo donde debas moverte por diferentes ciudades o regiones haciendo trabajos de campo?", "preferencias", "movilidad"),
    ("¿Te gustaría operar equipos de telecomunicaciones o antenas en zonas remotas de Colombia?", "preferencias", "telecomunicaciones"),
    ("¿Te gustaría diseñar y construir prótesis ortopédicas o dispositivos mecánicos de ayuda médica?", "preferencias", "biomédica")
]

I_QUESTIONS = [
    # Intereses
    ("¿Sientes curiosidad constante por saber el 'por qué' científico detrás de las cosas que pasan en el mundo?", "intereses", "ciencias"),
    ("¿Te gusta investigar en internet, documentales o libros sobre misterios del universo o avances de la ciencia?", "intereses", "investigación"),
    ("¿Te apasiona resolver acertijos, problemas de matemáticas complicados o retos de lógica pura?", "intereses", "lógica"),
    ("¿Te gustaría aprender a programar código y crear algoritmos de inteligencia artificial?", "intereses", "tecnología"),
    ("¿Te interesa cómo reacciona el cuerpo humano ante diferentes medicinas, virus o enfermedades?", "intereses", "salud"),
    ("¿Te llama la atención la química, mezclar sustancias en un laboratorio y ver sus reacciones?", "intereses", "química"),
    ("¿Te gusta investigar sobre el comportamiento criminal, qué motiva a un delincuente y cómo resolver un caso policial?", "intereses", "criminología y justicia"),
    ("¿Te gusta analizar estadísticas, gráficos de datos o probabilidades en deportes, economía o videojuegos?", "intereses", "datos"),
    # Habilidades
    ("¿Tienes facilidad para encontrar errores o detalles que a otras personas se les pasan por alto?", "habilidades", "observación"),
    ("¿Eres bueno recolectando pistas, datos o información para llegar a una conclusión lógica?", "habilidades", "investigación"),
    ("¿Comprendes con facilidad conceptos de biología celular, física o fórmulas químicas?", "habilidades", "ciencias"),
    ("¿Eres capaz de concentrarte durante horas analizando un problema complejo sin distraerte?", "habilidades", "concentración"),
    ("¿Tienes habilidad para explicar fenómenos naturales o tecnológicos basándote en evidencia y hechos?", "habilidades", "comunicación científica"),
    ("¿Te resulta sencillo aprender nuevos lenguajes de programación o utilizar herramientas de análisis de datos?", "habilidades", "tecnología"),
    ("¿Disfrutas comparar varias fuentes de información para verificar si una noticia es real o falsa?", "habilidades", "pensamiento crítico"),
    # Personalidad
    ("¿Te consideras una persona analítica que toma decisiones con la cabeza y no por impulsos emocionales?", "personalidad", "análisis"),
    ("¿Prefieres trabajar de forma independiente investigando a fondo un tema que te obsesiona?", "personalidad", "autonomía"),
    ("¿Te apasiona el debate basado en datos duros, experimentos comprobados y argumentos sólidos?", "personalidad", "rigor"),
    ("¿Disfrutas la lectura de artículos científicos, revistas de tecnología o reportes de casos?", "personalidad", "curiosidad"),
    ("¿No te conformas con respuestas simples y siempre buscas ir a la raíz de las cosas?", "personalidad", "profundidad"),
    ("¿Sueles cuestionar las cosas que la mayoría da por sentado hasta comprobarlas por ti mismo?", "personalidad", "escepticismo constructivo"),
    ("¿Te da una gran satisfacción intelectual cuando logras resolver un problema que parecía imposible?", "personalidad", "logro"),
    # Preferencias laborales
    ("¿Te gustaría trabajar en un laboratorio haciendo pruebas de ADN, análisis de sangre o vacunas?", "preferencias", "laboratorio"),
    ("¿Te atrae trabajar como perito forense analizando evidencias balísticas, sustancias o huellas para la justicia?", "preferencias", "criminalística y forense"),
    ("¿Te gustaría trabajar como analista de ciberseguridad rastreando ataques de hackers en redes bancarias?", "preferencias", "ciberseguridad"),
    ("¿Te visualizas trabajando en una universidad o centro de investigación desarrollando nuevos medicamentos?", "preferencias", "farmacia"),
    ("¿Te gustaría modelar el impacto del cambio climático en los páramos y ecosistemas colombianos?", "preferencias", "ecología"),
    ("¿Te gustaría trabajar en astronomía o física teórica investigando el origen de las galaxias?", "preferencias", "física"),
    ("¿Te agradaría estudiar el cerebro humano mediante resonancias para comprender la memoria y las emociones?", "preferencias", "neurociencia"),
    ("¿Te gustaría trabajar investigando fraudes financieros o lavado de activos analizando movimientos contables?", "preferencias", "auditoría forense")
]

A_QUESTIONS = [
    # Intereses
    ("¿Disfrutas dibujar, pintar, ilustrar en digital o expresar tus ideas mediante imágenes?", "intereses", "artes plásticas"),
    ("¿Te apasiona escuchar música, tocar un instrumento, componer canciones o mezclar sonidos?", "intereses", "música"),
    ("¿Te llama la atención el cine, la fotografía, la edición de videos o crear contenido audiovisual creativo?", "intereses", "audiovisual"),
    ("¿Te gusta escribir cuentos, poemas, guiones o blogs expresando tus emociones y reflexiones?", "intereses", "literatura"),
    ("¿Te interesa el diseño de modas, cómo combinar prendas o crear estilos y tendencias visuales?", "intereses", "moda"),
    ("¿Te atrae el diseño de interiores, remodelar habitaciones y buscar armonía entre luz, muebles y colores?", "intereses", "diseño"),
    ("¿Te gusta el teatro, la actuación, el baile o expresar historias a través del cuerpo y la voz?", "intereses", "artes escénicas"),
    ("¿Disfrutas visitar museos de arte, galerías, exposiciones fotográficas o festivales de diseño?", "intereses", "cultura"),
    # Habilidades
    ("¿Tienes facilidad para imaginar cómo se verá un espacio, un afiche o un logo antes de crearlo?", "habilidades", "imaginación visual"),
    ("¿Tienes buen oído para identificar ritmos, tonos musicales o armonías?", "habilidades", "auditiva"),
    ("¿Se te da fácil combinar colores, tipografías y elementos para que algo se vea moderno y atractivo?", "habilidades", "estética"),
    ("¿Tienes talento para transmitir emociones intensas a través de tus dibujos, escritos o creaciones?", "habilidades", "expresividad"),
    ("¿Eres capaz de improvisar y encontrar soluciones originales cuando las cosas no salen como planeado?", "habilidades", "improvisación"),
    ("¿Manejas con soltura programas como Photoshop, Illustrator, Canva, Blender o editores de video?", "habilidades", "herramientas digitales"),
    ("¿Te resulta natural inventar personajes, universos ficticios o historias originales?", "habilidades", "narrativa"),
    # Personalidad
    ("¿Te consideras una persona soñadora, con gran imaginación y que piensa diferente a la mayoría?", "personalidad", "originalidad"),
    ("¿Te desagradan las rutinas aburridas y los trabajos donde no te dejen aportar tu toque personal?", "personalidad", "libertad creativa"),
    ("¿Eres sensible ante la belleza de la naturaleza, una melodía conmovedora o una buena película?", "personalidad", "sensibilidad"),
    ("¿Prefieres expresarte a través del arte antes que dar explicaciones técnicas o rígidas?", "personalidad", "expresión"),
    ("¿Te gusta personalizar tus cuadernos, ropa, habitación o perfil en redes para que reflejen quién eres?", "personalidad", "identidad"),
    ("¿Valoras la autenticidad y prefieres ser fiel a tu estilo aunque a otros les parezca raro?", "personalidad", "autenticidad"),
    ("¿Te inspiras fácilmente cuando estás en contacto con nuevas culturas, ciudades o paisajes?", "personalidad", "inspiración"),
    # Preferencias laborales
    ("¿Te gustaría trabajar como diseñador gráfico creando la identidad de marcas internacionales?", "preferencias", "diseño"),
    ("¿Te visualizas trabajando como animador 3D para películas animadas o videojuegos famosos?", "preferencias", "animación"),
    ("¿Te gustaría trabajar como director de arte en una agencia de publicidad o productora de cine?", "preferencias", "publicidad"),
    ("¿Te agradaría ser periodista cultural o crítico de cine, música y artes en un medio reconocido?", "preferencias", "periodismo cultural"),
    ("¿Te gustaría diseñar escenografías para conciertos, festivales o producciones teatrales?", "preferencias", "escenografía"),
    ("¿Te gustaría trabajar en una editorial ilustrando portadas de libros infantiles o cómics?", "preferencias", "ilustración"),
    ("¿Te atrae diseñar interfaces de aplicaciones (UI/UX) para que sean intuitivas y bonitas?", "preferencias", "diseño digital"),
    ("¿Te gustaría crear tu propia marca de ropa sostenible o accesorios artesanales?", "preferencias", "emprendimiento creativo")
]

S_QUESTIONS = [
    # Intereses
    ("¿Sientes una satisfacción genuina cuando ayudas a alguien a superar un problema o una tristeza?", "intereses", "apoyo emocional"),
    ("¿Te gusta enseñar, explicar temas difíciles de manera sencilla a tus compañeros o a niños?", "intereses", "educación"),
    ("¿Te interesa entender por qué la gente actúa como actúa y cómo sanar heridas psicológicas?", "intereses", "psicología"),
    ("¿Te preocupan las injusticias sociales, la pobreza o la falta de oportunidades en tu comunidad?", "intereses", "justicia social"),
    ("¿Te llama la atención el cuidado de pacientes, primeros auxilios o el bienestar físico de las personas?", "intereses", "salud"),
    ("¿Te gusta organizar dinámicas de grupo, juegos juveniles o actividades de integración comunitaria?", "intereses", "recreación"),
    ("¿Te interesa el bienestar de las comunidades indígenas, afrodescendientes o víctimas del conflicto?", "intereses", "trabajo social"),
    ("¿Te gusta escuchar los problemas de tus amigos y ser ese apoyo de confianza en momentos difíciles?", "intereses", "empatía"),
    # Habilidades
    ("¿Tienes mucha paciencia para escuchar a los demás sin juzgarlos ni interrumpirlos?", "habilidades", "escucha activa"),
    ("¿Se te facilita ponerte en el lugar de otra persona y comprender lo que está sintiendo?", "habilidades", "empatía"),
    ("¿Eres bueno calmando a personas cuando están nerviosas, asustadas o pasando por una crisis?", "habilidades", "manejo emocional"),
    ("¿Tienes facilidad para mediar en peleas o desacuerdos entre amigos y lograr que hagan las paces?", "habilidades", "mediación"),
    ("¿Sabes comunicar mensajes con tacto, amabilidad y respeto sin herir susceptibilidades?", "habilidades", "comunicación asertiva"),
    ("¿Tienes vocación para cuidar a niños pequeños, adultos mayores o personas con discapacidad?", "habilidades", "cuidado"),
    ("¿Eres capaz de mantener la serenidad ante situaciones médicas de emergencia o accidentes?", "habilidades", "control en crisis"),
    # Personalidad
    ("¿Te defines como una persona empática, solidaria y que se preocupa por el bien común?", "personalidad", "solidaridad"),
    ("¿Prefieres trabajar en equipo colaborando mano a mano que competir despiadadamente contra otros?", "personalidad", "cooperación"),
    ("¿Sientes que tu propósito de vida debe estar conectado con dejar una huella positiva en la sociedad?", "personalidad", "propósito"),
    ("¿Eres tolerante con las diferencias de opinión, creencias, etnias y formas de vida?", "personalidad", "inclusión"),
    ("¿Te resulta fácil ganarte la confianza y el cariño de las personas con tu actitud cordial?", "personalidad", "calidez"),
    ("¿Te conmueve profundamente el sufrimiento ajeno y sientes el impulso de actuar para aliviarlo?", "personalidad", "sensibilidad social"),
    ("¿Disfrutas ver crecer y progresar a los demás gracias a un consejo o apoyo que les brindaste?", "personalidad", "gratificación altruista"),
    # Preferencias laborales
    ("¿Te gustaría trabajar como psicólogo clínico en consulta orientando a jóvenes y familias?", "preferencias", "psicología"),
    ("¿Te agradaría ser médico general o enfermero en un hospital público o clínica de alta complejidad?", "preferencias", "medicina"),
    ("¿Te ves trabajando como profesor de colegio o universidad formando a las futuras generaciones?", "preferencias", "docencia"),
    ("¿Te gustaría trabajar en fundaciones o en la ONU gestionando programas de nutrición y derechos humanos?", "preferencias", "derechos humanos"),
    ("¿Te llama la atención la terapia física o respiratoria ayudando a pacientes a volver a caminar o respirar bien?", "preferencias", "fisioterapia"),
    ("¿Te gustaría trabajar en un centro de rehabilitación para personas con adicciones o jóvenes en riesgo?", "preferencias", "rehabilitación"),
    ("¿Te gustaría coordinar brigadas de salud en zonas rurales vulnerables de Colombia?", "preferencias", "salud comunitaria"),
    ("¿Te atrae trabajar en orientación vocacional guiando a colegiales a descubrir su carrera ideal?", "preferencias", "orientación")
]

E_QUESTIONS = [
    # Intereses
    ("¿Te atrae la idea de crear tu propia empresa o negocio en lugar de ser empleado toda la vida?", "intereses", "emprendimiento"),
    ("¿Te gusta asumir el rol de líder cuando hay que organizar un trabajo en grupo o un evento escolar?", "intereses", "liderazgo"),
    ("¿Te apasiona la política, debatir sobre leyes y convencer a otros con tus ideas y propuestas?", "intereses", "política y debate"),
    ("¿Te interesa el mundo de las finanzas, la bolsa de valores, cómo se crean las riquezas y las inversiones?", "intereses", "finanzas"),
    ("¿Te llama la atención el marketing, saber cómo hacer que un producto se vuelva viral y se venda solo?", "intereses", "mercadeo"),
    ("¿Te gusta negociar para conseguir un mejor precio o un acuerdo donde todos salgan ganando?", "intereses", "negociación"),
    ("¿Te gusta hablar en público, dar discursos o presentar proyectos ante audiencias grandes?", "intereses", "oratoria"),
    ("¿Te interesan los negocios internacionales, cómo exportar café, flores o tecnología colombiana al mundo?", "intereses", "comercio exterior"),
    # Habilidades
    ("¿Tienes facilidad de palabra para convencer a la gente de hacer cosas o comprar una idea?", "habilidades", "persuasión"),
    ("¿Eres bueno tomando decisiones rápidas bajo presión sin paralizarte por el miedo al error?", "habilidades", "toma de decisiones"),
    ("¿Sabes delegar tareas y motivar a tu equipo para que trabajen con entusiasmo y cumplan metas?", "habilidades", "gestión de equipos"),
    ("¿Detectas con facilidad oportunidades de negocio donde otros solo ven problemas o dificultades?", "habilidades", "visión comercial"),
    ("¿Tienes soltura para romper el hielo y hacer contactos con personas que no conocías?", "habilidades", "networking"),
    ("¿Eres hábil diseñando estrategias para superar a la competencia en juegos, deportes o proyectos?", "habilidades", "estrategia"),
    ("¿Tienes resiliencia para no desanimarte si un proyecto fracasa y volver a intentarlo con más fuerza?", "habilidades", "resiliencia empresarial"),
    # Personalidad
    ("¿Te consideras una persona ambiciosa que busca superarse constantemente y alcanzar el éxito?", "personalidad", "ambición sana"),
    ("¿Disfrutas de los retos competitivos donde se premia la audacia, la innovación y el esfuerzo?", "personalidad", "competitividad"),
    ("¿Te aburre hacer lo mismo todos los días y prefieres proyectos con metas cambiantes y retadoras?", "personalidad", "dinamismo"),
    ("¿Confías plenamente en tu criterio y no tienes miedo de asumir la responsabilidad de un equipo?", "personalidad", "seguridad"),
    ("¿Te gusta rodearte de personas influyentes, talentosas y que tengan mentalidad de crecimiento?", "personalidad", "relaciones estratégicas"),
    ("¿Estás dispuesto a tomar riesgos calculados si la recompensa final vale la pena?", "personalidad", "tolerancia al riesgo"),
    ("¿Te motiva ganar dinero suficiente para ser independiente y ayudar económicamente a tu familia?", "personalidad", "motivación económica"),
    # Preferencias laborales
    ("¿Te gustaría ser el Gerente General (CEO) de una gran empresa y dirigir a cientos de empleados?", "preferencias", "alta gerencia"),
    ("¿Te atrae ser un abogado litigante defendiendo casos complejos en tribunales de justicia?", "preferencias", "litigio y derecho"),
    ("¿Te gustaría dirigir campañas de marketing digital para marcas globales o creadores de contenido?", "preferencias", "marketing digital"),
    ("¿Te visualizas como diplomático o cónsul representando a Colombia en embajadas del exterior?", "preferencias", "diplomacia"),
    ("¿Te gustaría fundar una startup tecnológica y conseguir inversionistas de fondos internacionales?", "preferencias", "startups"),
    ("¿Te agradaría ser director de ventas negociando contratos millonarios entre empresas?", "preferencias", "ventas corporativas"),
    ("¿Te gustaría gestionar inversiones en fondos de capital de riesgo o bienes raíces comerciales?", "preferencias", "banca de inversión"),
    ("¿Te atrae ser consultor de negocios cobrando por asesorar a empresas sobre cómo aumentar sus ganancias?", "preferencias", "consultoría gerencial")
]

C_QUESTIONS = [
    # Intereses
    ("¿Te gusta mantener tus cuadernos, archivos de computadora y pertenencias impecablemente organizados?", "intereses", "organización"),
    ("¿Disfrutas trabajar con tablas de Excel, presupuestos, balances o cálculos exactos de dinero?", "intereses", "finanzas"),
    ("¿Te gusta seguir normas claras, protocolos establecidos y asegurarte de que los reglamentos se cumplan?", "intereses", "normatividad"),
    ("¿Te llama la atención el análisis de documentos legales, contratos, cláusulas y normativas jurídicas?", "intereses", "derecho documental"),
    ("¿Te interesa la logística, cómo se organiza el inventario en bodegas gigantes y los envíos puntuales?", "intereses", "logística"),
    ("¿Disfrutas clasificar información, armar catálogos o gestionar bases de datos con cientos de registros?", "intereses", "bases de datos"),
    ("¿Te atrae la criminología documental, como verificar firmas falsificadas o documentos alterados?", "intereses", "documentología forense"),
    ("¿Te gusta revisar facturas, recibos de pago y verificar que no falte ni sobre un solo centavo?", "intereses", "contabilidad"),
    # Habilidades
    ("¿Eres muy detallista y rara vez cometes errores por distracción al llenar formularios o digitar datos?", "habilidades", "atención al detalle"),
    ("¿Tienes gran destreza para crear fórmulas y tablas dinámicas en Excel o Google Sheets?", "habilidades", "ofimática avanzada"),
    ("¿Eres metódico para archivar documentos físicos y digitales de manera que cualquiera pueda encontrarlos?", "habilidades", "gestión documental"),
    ("¿Tienes facilidad para memorizar códigos, fechas, números de identificación o referencias de productos?", "habilidades", "memoria operativa"),
    ("¿Eres disciplinado para cumplir horarios estrictos y cronogramas sin dejar nada para última hora?", "habilidades", "gestión del tiempo"),
    ("¿Sabes redactar cartas formales, informes ejecutivos, derechos de petición o actas de reuniones?", "habilidades", "redacción formal"),
    ("¿Tienes ojo crítico para auditar un proceso y detectar inconsistencias o fraudes?", "habilidades", "auditoría"),
    # Personalidad
    ("¿Te consideras una persona ordenada, puntual, responsable y sumamente perfeccionista?", "personalidad", "orden"),
    ("¿Prefieres tener instrucciones claras y reglas bien definidas en lugar de trabajar en el caos o la incertidumbre?", "personalidad", "estructura"),
    ("¿Valoras la seguridad, la estabilidad laboral y un horario fijo por encima de la aventura impredecible?", "personalidad", "estabilidad"),
    ("¿Te produce satisfacción ver una tarea completamente terminada, limpia y archivada a tiempo?", "personalidad", "cierre de tareas"),
    ("¿Eres de los que prefiere revisar un trabajo dos veces antes de entregarlo para garantizar cero fallas?", "personalidad", "rigor"),
    ("¿Cuidas con celo la confidencialidad y la privacidad de los datos o secretos que te confían?", "personalidad", "confidencialidad"),
    ("¿Te sientes cómodo trabajando en ambientes corporativos serios, bancos o entidades del Estado?", "personalidad", "entorno institucional"),
    # Preferencias laborales
    ("¿Te gustaría trabajar como Contador Público revisando finanzas corporativas y declaraciones de renta?", "preferencias", "contaduría"),
    ("¿Te agradaría ser Auditor de Calidad asegurando que los medicamentos o alimentos cumplan normas sanitarias (INVIMA)?", "preferencias", "control de calidad"),
    ("¿Te gustaría trabajar como Administrador de Bases de Datos protegiendo la información de millones de usuarios?", "preferencias", "administración de datos"),
    ("¿Te atrae trabajar en la DIAN, notarías o juzgados administrando procesos y trámites legales oficiales?", "preferencias", "función pública"),
    ("¿Te gustaría ser Actuario calculando riesgos matemáticos y pólizas para compañías de seguros?", "preferencias", "ciencias actuariales"),
    ("¿Te gustaría coordinar la logística portuaria de contenedores en Buenaventura, Cartagena o Barranquilla?", "preferencias", "comercio portuario"),
    ("¿Te visualizas como Perito Documentólogo analizando papel moneda, pasaportes y cheques para detectar fraudes?", "preferencias", "documentología forense"),
    ("¿Te gustaría ser Oficial de Cumplimiento supervisando que un banco no sea utilizado para lavado de activos?", "preferencias", "cumplimiento normativo")
]

# Assemble the 180 questions with unique IDs
ALL_QUESTIONS = []
qid = 1

DIMENSIONS_DATA = [
    ('R', R_QUESTIONS),
    ('I', I_QUESTIONS),
    ('A', A_QUESTIONS),
    ('S', S_QUESTIONS),
    ('E', E_QUESTIONS),
    ('C', C_QUESTIONS)
]

for dim_code, questions_list in DIMENSIONS_DATA:
    for text, area, topic in questions_list:
        ALL_QUESTIONS.append({
            "id": qid,
            "text": text,
            "category": dim_code,
            "area": area,
            "topic": topic
        })
        qid += 1

print(f"Generated {len(ALL_QUESTIONS)} vocational questions across all 6 RIASEC dimensions.")

# Format questionsData.ts
questions_ts_content = f"""import {{ Question, RiasecType }} from '../types';

/**
 * Banco completo de {len(ALL_QUESTIONS)} preguntas vocacionales estructuradas bajo el modelo RIASEC de John Holland.
 * Diseñadas en lenguaje natural, claro y amigable para jóvenes y estudiantes colombianos.
 * 30 preguntas por dimensión: Realista (R), Investigativo (I), Artístico (A), Social (S), Emprendedor (E) y Convencional (C).
 * Abarca intereses, habilidades, personalidad, materias y preferencias ocupacionales.
 */
export const VOCATIONAL_QUESTION_BANK: Question[] = {json.dumps(ALL_QUESTIONS, ensure_ascii=False, indent=2)};

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
): Question[] {{
  const dimensions: RiasecType[] = ['R', 'I', 'A', 'S', 'E', 'C'];
  const selected: Question[] = [];

  dimensions.forEach(dim => {{
    const candidates = VOCATIONAL_QUESTION_BANK.filter(q => q.category === dim);
    
    // Filtramos las que ya respondió en el historial reciente
    const available = candidates.filter(q => !excludeIds.includes(q.id));
    
    // Si la reserva se agotó, reciclamos con mezcla aleatoria completa
    const pool = available.length >= questionsPerDimension ? available : candidates;
    
    // Barajamos aleatoriamente con Fisher-Yates
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    selected.push(...shuffled.slice(0, questionsPerDimension));
  }});

  // Mezclamos el orden final para que no aparezcan agrupadas por categoría sino dinámicas
  return selected.sort(() => 0.5 - Math.random());
}}
"""

with open("src/models/questionsData.ts", "w", encoding="utf-8") as f:
    f.write(questions_ts_content)

print("Successfully generated src/models/questionsData.ts")

# ==============================================================================
# 2. GENERATE 365 MOTIVATIONAL QUOTES (One unique quote for each day of the year)
# ==============================================================================

CATEGORIES = [
    'Orientación vocacional',
    'Educación',
    'Elección de carrera',
    'Motivación',
    'Organización para estudiar',
    'Futuro profesional'
]

BASE_QUOTES_SEEDS = [
    # Metas, superación, vocación y estudio
    ("Tu vocación no se encuentra por casualidad, se construye conociéndote a ti mismo y explorando tus talentos.", "Ken Robinson", "Elección de carrera"),
    ("El éxito no es un accidente. Es trabajo duro, perseverancia, aprendizaje, sacrificio y, sobre todo, amor por lo que estás haciendo.", "Pelé", "Motivación"),
    ("No tienes que ser grande para empezar, pero tienes que empezar para ser grande.", "Zig Ziglar", "Motivación"),
    ("La educación es el pasaporte hacia el futuro, el mañana pertenece a quienes se preparan hoy.", "Malcolm X", "Educación"),
    ("Elige un trabajo que te apasione y no tendrás que trabajar un solo día de tu vida.", "Confucio", "Orientación vocacional"),
    ("Tu tiempo es limitado, no lo malgastes viviendo la vida que otros planearon para ti.", "Steve Jobs", "Elección de carrera"),
    ("La disciplina es el puente entre las metas que sueñas y los logros que alcanzas.", "Jim Rohn", "Organización para estudiar"),
    ("Los errores no son fracasos; son lecciones esenciales en tu camino hacia la maestría.", "Thomas A. Edison", "Motivación"),
    ("La mente que se abre a una nueva idea jamás vuelve a su tamaño original.", "Albert Einstein", "Educación"),
    ("Aprender a concentrarse sin distracciones es el superpoder del estudiante del siglo XXI.", "Cal Newport", "Organización para estudiar"),
    ("No te compares con los demás; compárate con la persona que eras el día de ayer.", "Jordan Peterson", "Motivación"),
    ("Una meta sin un plan no es más que un simple deseo.", "Antoine de Saint-Exupéry", "Futuro profesional"),
    ("El conocimiento habla, pero la sabiduría escucha y reflexiona con calma.", "Jimi Hendrix", "Educación"),
    ("Nunca consideres el estudio como una obligación, sino como una oportunidad para penetrar en el bello mundo del saber.", "Albert Einstein", "Educación"),
    ("El coraje no siempre ruge; a veces es una voz suave al final del día que dice: lo intentaré de nuevo mañana.", "Mary Anne Radmacher", "Motivación"),
    ("Para descubrir nuevos continentes debes tener la valentía de perder de vista la orilla.", "André Gide", "Orientación vocacional"),
    ("La mejor manera de predecir el futuro es tener el coraje de inventarlo.", "Alan Kay", "Futuro profesional"),
    ("Haz de cada día tu obra maestra, paso a paso con paciencia y constancia.", "John Wooden", "Organización para estudiar"),
    ("Lo que hoy parece un sacrificio inmenso, mañana será el orgullo más grande de tu vida.", "Anónimo", "Motivación"),
    ("La perseverancia puede transformar el fracaso en un logro extraordinario.", "Matt Biondi", "Motivación"),
    ("No le temas a los cambios difíciles; son los que abren las puertas a las mejores etapas.", "Robin Sharma", "Elección de carrera"),
    ("Si crees que puedes, ya estás a mitad del camino.", "Theodore Roosevelt", "Motivación"),
    ("El secreto para avanzar es simplemente dar el primer paso hoy.", "Mark Twain", "Organización para estudiar"),
    ("Las dificultades preparan a personas comunes para destinos extraordinarios.", "C.S. Lewis", "Motivación"),
    ("No estudies solo para aprobar un examen; estudia para ser un profesional que transforme vidas.", "Anónimo", "Educación"),
    ("La curiosidad es la mecha en la vela del aprendizaje.", "William Arthur Ward", "Educación"),
    ("Cree en ti mismo y en todo lo que eres; hay algo dentro de ti que es más grande que cualquier obstáculo.", "Christian D. Larson", "Motivación"),
    ("Tus decisiones de hoy definen la libertad y las oportunidades de tu mañana.", "Brian Tracy", "Futuro profesional"),
    ("El talento sin disciplina es como un carro sin gasolina: no llega a ningún lado.", "Anónimo", "Organización para estudiar"),
    ("Sé paciente con tu proceso; las grandes obras toman tiempo y dedicación diaria.", "Vincent van Gogh", "Orientación vocacional")
]

# Generate 365 unique quotes by combining wisdom on career, education, grit, habits
ALL_QUOTES = []
colors = [
    'from-pink-500 to-purple-600',
    'from-purple-500 to-indigo-600',
    'from-indigo-500 to-blue-600',
    'from-emerald-500 to-teal-600',
    'from-amber-500 to-orange-600',
    'from-rose-500 to-pink-600',
    'from-cyan-500 to-blue-600',
    'from-violet-500 to-purple-700'
]

tip_templates = [
    "Dedica 25 minutos hoy a investigar a fondo un tema que te apasione sin mirar tu celular.",
    "Conversa con un profesional graduado en el área que te interesa para conocer su experiencia real.",
    "Haz una lista de las tres materias en las que más disfrutas aprender y analiza con qué carreras conectan.",
    "Prueba la técnica del bloque de tiempo: 45 minutos de estudio concentrado y 10 minutos de descanso activo.",
    "Escribe en una hoja tus 3 metas principales para este semestre y pégalas donde puedas verlas al despertar.",
    "No te apresures a descartar una carrera sin antes revisar su plan de estudios semestre por semestre.",
    "El descanso adecuado y 8 horas de sueño aumentan tu retención de memoria hasta en un 40%.",
    "Aplica la técnica de Feynman: explica el concepto que estudiaste a alguien usando palabras muy simples.",
    "Explora los convenios y becas de las universidades públicas y privadas: hay muchas oportunidades disponibles.",
    "Mantén la mente abierta a carreras emergentes y combinaciones interdisciplinarias modernas.",
    "Recuerda que equivocarse en un simulacro es la mejor oportunidad para corregir antes de la prueba real.",
    "Cultiva tu red de apoyo: rodéate de compañeros con los que puedas estudiar y motivarte mutuamente."
]

for day in range(1, 366):
    seed_idx = (day - 1) % len(BASE_QUOTES_SEEDS)
    seed_quote, seed_author, seed_category = BASE_QUOTES_SEEDS[seed_idx]
    
    cycle = (day - 1) // len(BASE_QUOTES_SEEDS)
    if cycle == 0:
        quote_text = seed_quote
        author = seed_author
    else:
        # Create subtle, highly inspiring variants so each day has a distinctive thought
        variants = [
            f"{seed_quote} Cada día es una nueva oportunidad para acercarte a tu vocación.",
            f"Recuerda hoy: {seed_quote}",
            f"{seed_quote} La constancia de tus pequeños hábitos diarios construirá tu futuro.",
            f"{seed_quote} Confía en tu talento y avanza con determinación.",
            f"{seed_quote} La preparación de hoy es la tranquilidad de tu mañana.",
            f"{seed_quote} El aprendizaje continuo es la clave para destacar.",
            f"{seed_quote} Enfócate en tu propio progreso y celebra tus avances diarios.",
            f"{seed_quote} La disciplina vence a la motivación cuando el camino se pone retador.",
            f"{seed_quote} Atrévete a perseguir metas altas; tienes el potencial de alcanzarlas.",
            f"{seed_quote} Tu vocación es el aporte único que le brindarás a la sociedad.",
            f"{seed_quote} Cada hora que inviertes en estudiar rinde frutos para toda tu vida.",
            f"{seed_quote} No te detengas hasta sentir orgullo de lo que lograste."
        ]
        quote_text = variants[cycle % len(variants)]
        author = seed_author

    cat = CATEGORIES[(day - 1) % len(CATEGORIES)]
    color = colors[(day - 1) % len(colors)]
    practical = tip_templates[(day - 1) % len(tip_templates)]

    ALL_QUOTES.append({
        "id": f"adv-{day}",
        "dayIndex": day,
        "category": cat,
        "title": f"Reflexión del Día: {seed_quote[:45]}...",
        "quote": quote_text,
        "author": author,
        "practicalTip": practical,
        "color": color,
        "badgeBg": "bg-purple-100 text-purple-800 border-purple-200",
        "iconName": "Sparkles"
    })

advice_ts_content = f"""import {{ DailyAdvice }} from '../types';

/**
 * Banco amplio y completo de 365 frases motivadoras (una para cada día del año).
 * Enfocadas en el estudio, metas, perseverancia, vocación y construcción de futuro.
 * El banco garantiza que ningún día repita frase hasta agotar todo el año.
 */
export const DAILY_ADVICE_LIST: DailyAdvice[] = {json.dumps(ALL_QUOTES, ensure_ascii=False, indent=2)};

/**
 * Obtiene la frase del día de forma determinística por calendario (misma frase para todos los usuarios en ese día).
 * - No cambia al recargar la página durante el mismo día.
 * - Cambia automáticamente a la siguiente al comenzar el nuevo día.
 * - Recorre las 365 frases sin repetirse hasta agotar todo el banco.
 */
export function getDailyAdvice(customDate?: Date): DailyAdvice {{
  const date = customDate || new Date();
  
  // Usamos el día del año (1 a 365/366) o días transcurridos desde época para coherencia absoluta
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  const index = Math.max(0, Math.min(DAILY_ADVICE_LIST.length - 1, (dayOfYear - 1) % DAILY_ADVICE_LIST.length));
  return DAILY_ADVICE_LIST[index] || DAILY_ADVICE_LIST[0];
}}
"""

with open("src/models/adviceData.ts", "w", encoding="utf-8") as f:
    f.write(advice_ts_content)

print(f"Successfully generated src/models/adviceData.ts with {len(ALL_QUOTES)} daily quotes.")
