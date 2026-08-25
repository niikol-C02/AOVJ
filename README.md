# 🎓 Plataforma de Orientación Vocacional Juvenil (VocAcción)

Plataforma web interactiva de **orientación vocacional y exploración académica** diseñada para estudiantes de secundaria, bachillerato y jóvenes que buscan descubrir su vocación profesional, explorar carreras universitarias, comparar instituciones de educación superior y postular a becas educativas.

---

## 🚀 1. Tecnologías y Stack del Proyecto

| Categoría | Tecnología / Herramienta | Versión | Descripción |
| :--- | :--- | :--- | :--- |
| **Lenguaje de Programación** | **TypeScript** | `^5.8.2` | Tipado estático estricto, interfaces compartidas y prevención de errores en tiempo de compilación. |
| **Framework Frontend** | **React** | `^19.0.1` | Biblioteca de interfaces declarativas basada en componentes funcionales y Hooks. |
| **Herramienta de Construcción (Build Tool)** | **Vite** | `^6.2.3` | Servidor de desarrollo ultra rápido y empaquetador de producción optimizado. |
| **Framework de Estilos (CSS)** | **Tailwind CSS v4** | `^4.1.14` | Utilidades CSS modernas integradas mediante `@tailwindcss/vite` con soporte de diseño responsivo y estética **Frosted Glass** (*vidrio esmerilado* con `backdrop-blur` y bordes translúcidos). |
| **Iconografía** | **Lucide React** | `^0.546.0` | Conjunto de iconos vectoriales consistentes y accesibles. |
| **Animaciones e Interactividad** | **Motion** & **Canvas Confetti** | `^12.23.24` / `^1.9.4` | Transiciones fluidas, modales animados y efectos de celebración en resultados. |
| **Visualización de Datos** | **Recharts** | `^3.10.1` | Gráficos de barras y radar para el desglose del perfil vocacional RIASEC. |
| **Base de Datos & Auth en la Nube** | **Firebase (Firestore & Auth)** | `^12.x` | Base de datos NoSQL en la nube Firestore con reglas de seguridad granulares y Firebase Authentication para gestión de usuarios e inicio de sesión. |

---

## 🏗️ 2. Arquitectura de Software

La aplicación está organizada bajo el patrón **Modelo-Vista-Controlador (MVC)** en el frontend con soporte para persistencia en la nube:

```text
├── .env.example                 # Plantilla de variables de entorno
├── firebase-applet-config.json  # Configuración del proyecto Firebase (ID, API key, Firestore Database ID)
├── firebase-blueprint.json      # Esquema formal de datos de colecciones Firestore
├── firestore.rules              # Reglas de seguridad declarativas de Firestore
├── index.html                   # Punto de entrada HTML con viewport y fuentes
├── metadata.json                # Metadatos y permisos del aplicativo
├── package.json                 # Dependencias y scripts de npm
├── tsconfig.json                # Configuración del compilador TypeScript
├── vite.config.ts               # Configuración de Vite y plugins (React + Tailwind)
└── src/
    ├── main.tsx                 # Entrada principal y renderizado de React
    ├── App.tsx                  # Componente raíz y sincronización con Firebase
    ├── index.css                # Importación global de Tailwind CSS
    ├── lib/
    │   └── firebase.ts          # Inicialización centralizada de Firebase App, Auth y Firestore
    ├── types/                   # Definición de tipos e interfaces TypeScript
    │   └── index.ts             # Tipos de Usuario, Carreras, Universidades, Becas y Tests
    ├── models/                  # Fuentes de datos y estructuras maestras
    │   └── data.ts              # Catálogo de Carreras, Universidades, Becas y Preguntas RIASEC
    ├── controllers/             # Lógica de negocio y persistencia
    │   ├── StorageController.ts # Métodos asíncronos para Firestore (CRUD de usuarios, tests y favoritos)
    │   └── TestEngine.ts        # Algoritmo de ponderación y emparejamiento RIASEC
    ├── views/                   # Vistas principales de la plataforma
    │   ├── HomeView.tsx         # Portal de bienvenida y accesos directos
    │   ├── TestView.tsx         # Cuestionario vocacional paso a paso
    │   ├── ResultsView.tsx      # Diagnóstico de personalidad y carreras afines
    │   ├── CareersView.tsx      # Directorio y buscador con filtros de carreras
    │   ├── UniversitiesView.tsx # Directorio de universidades públicas y privadas
    │   ├── ScholarshipsView.tsx # Directorio de becas y convocatorias
    │   └── ProfileView.tsx      # Perfil de estudiante sincronizado con Firestore
    └── components/              # Componentes UI reutilizables
        ├── Navbar.tsx           # Barra de navegación principal con efecto vidrio
        ├── MobileNav.tsx        # Barra de navegación móvil inferior
        ├── AuthModal.tsx        # Modal de Login, Registro y Recuperación con Firebase Auth
        ├── CareerDetailModal.tsx# Ficha técnica completa de carrera
        ├── CareerCompareModal.tsx# Comparador simultáneo de hasta 3 carreras
        ├── UniversityDetailModal.tsx # Ficha técnica de institución universitaria
        ├── ScholarshipDetailModal.tsx # Requisitos y postulación a becas
        └── Toast.tsx            # Notificaciones emergentes
```

---

## 🗄️ 3. Sistema de Base de Datos y Persistencia (Firebase Firestore)

La aplicación implementa una arquitectura cloud-first con **Firebase Firestore** y **Firebase Authentication**:

1. **Autenticación de Estudiantes (`Firebase Auth`)**:
   - Registro de nuevas cuentas con correo y contraseña cifrada.
   - Inicio de sesión persistente con detector reactivo `onAuthStateChanged`.
   - Restablecimiento seguro de contraseña mediante correo electrónico oficial.
2. **Colección de Perfiles (`/users/{userId}`)**:
   - Almacena nombre, correo, edad, nivel de estudios actual, ciudad, país y avatar personalizado.
3. **Colección de Favoritos (`/users/{userId}/data/favorites`)**:
   - Almacena listas de carreras, universidades y becas guardadas por el estudiante con sincronización en tiempo real.
4. **Subcolección de Tests Vocacionales (`/users/{userId}/tests/{testId}`)**:
   - Guarda el historial completo de tests RIASEC realizados (puntajes por dimensión, perfil arquetípico y carreras recomendadas con % de afinidad).
5. **Reglas de Seguridad (`firestore.rules`)**:
   - Acceso estrictamente restringido al propio usuario autenticado (`request.auth.uid == userId`), garantizando privacidad de datos personales y confidencialidad de los resultados vocacionales.

---

## ⚙️ 4. Requisitos Previos e Instalación

### Requisitos del Sistema
- **Node.js**: Versión `18.0.0` o superior (recomendado `v20.x` LTS o `v22.x`).
- **Gestor de Paquetes**: `npm`, `yarn`, `pnpm` o `bun`.

### Pasos de Instalación

1. **Clonar o descargar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_DIRECTORIO>
   ```

2. **Instalar dependencias del proyecto:**
   ```bash
   npm install
   ```

3. **Configurar el archivo de variables de entorno:**
   Copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

   *Contenido de `.env.example`:*
   ```env
   # Clave de API de Gemini (opcional para funciones asistidas por IA en servidor)
   GEMINI_API_KEY="TU_CLAVE_DE_GEMINI"

   # URL pública o base de la aplicación
   APP_URL="http://localhost:3000"
   ```

---

## 🚦 5. Guía de Ejecución y Scripts de NPM

| Comando | Acción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo local de Vite en el puerto `3000` con host `0.0.0.0`. |
| `npm run build` | Compila y optimiza la aplicación para producción generando los archivos estáticos en `/dist`. |
| `npm run preview` | Previsualiza localmente el build de producción generado en `/dist`. |
| `npm run lint` | Ejecuta la verificación estricta de tipos de TypeScript (`tsc --noEmit`). |
| `npm run clean` | Limpia los directorios generados y compilados (`dist`). |

Para iniciar en modo desarrollo:
```bash
npm run dev
```
Abre tu navegador en: [http://localhost:3000](http://localhost:3000).

---

## 🧩 6. Módulos y Funcionalidades Principales

### 🧠 A. Test Vocacional RIASEC (`TestEngine.ts`)
- **Metodología**: Basado en la teoría tipológica vocacional de John Holland (Realista, Investigador, Artístico, Social, Emprendedor, Convencional).
- **Cuestionario**: 24 afirmaciones balanceadas evaluadas con escala Likert (1 a 5).
- **Algoritmo de Matching**: Calcula la distancia euclidiana normalizada entre el vector de respuestas del usuario y los vectores arquetípicos de más de 15 carreras universitarias.

### 📚 B. Explorador de Carreras y Comparador Multivariable
- Filtros por área de conocimiento (Tecnología, Salud, Creatividad, Negocios, etc.).
- Búsqueda en tiempo real por título, habilidades y campo de aplicación.
- **Comparador interactivo**: Permite cotejar simultáneamente hasta 3 carreras evaluando salarios promedio, duración, tasa de empleabilidad, grado académico y habilidades requeridas.

### 🏛️ C. Directorio de Universidades
- Ficha de instituciones públicas y privadas con ubicación, enlaces oficiales, acreditaciones, requisitos de admisión y carreras ofrecidas.

### 🎁 D. Directorio de Becas y Ayudas Financieras
- Convocatorias vigentes con alertas de fecha límite, cobertura (100%, 80%, etc.), requisitos y enlace directo a postulación.

### 👤 E. Perfil de Estudiante y Favoritos
- Panel para actualizar información personal, revisar histórico de tests con gráficos interactivos y gestionar favoritos.

---

## 🌐 7. Configuración Global para Funcionamiento y Despliegue

1. **Puerto y Host**: El servidor de desarrollo está configurado para escuchar en `0.0.0.0:3000` (compatible con contenedores Docker, Cloud Run y entornos locales).
2. **Alias de Rutas**: `@/` está mapeado a la raíz del proyecto en `vite.config.ts`.
3. **Compatibilidad con iFrames**: Todas las ventanas modales y transiciones están optimizadas para ejecutarse en entornos embebidos o pestañas independientes.
4. **Exportación y Producción**: El comando `npm run build` genera una Single Page Application (SPA) compatible con cualquier servidor estático (Nginx, Vercel, Netlify, Cloud Run, Firebase Hosting).
