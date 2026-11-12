# VocAcción - Arquitectura Backend PHP & MySQL

Arquitectura Full-Stack completa y desacoplada para la plataforma de test vocacional VocAcción, con gestión 100% en tiempo real sobre MySQL (sin datos estáticos ni simulados).

---

## 📁 Estructura del Módulo (`/php-backend/`)

```
php-backend/
├── schema.sql                     # Script DDL completo de MySQL 8.0+ / MariaDB con claves foráneas, índices y semillas
├── config/
│   └── conexion.php               # Singleton PDO con UTF-8 (utf8mb4), emulación de prepares deshabilitada y manejo de excepciones
├── auth/
│   ├── check_admin.php            # Middleware de validación de rol de administrador (session_start)
│   ├── registro.php               # Registro seguro con password_hash(PASSWORD_BCRYPT) e inicialización del test
│   ├── login.php                  # Autenticación con password_verify y protección contra Session Fixation
│   └── logout.php                 # Cierre y destrucción segura de sesiones
├── api/
│   ├── guardar_avance.php         # Guarda respuestas individuales en MySQL y actualiza el % de avance en tiempo real
│   ├── finalizar_test.php         # Algoritmo de cálculo RIASEC (Holland), mapeo de carreras y guardado final
│   ├── admin_metricas.php         # Consultas SQL de agregación para las tarjetas de KPIs
│   ├── admin_usuarios.php         # Listado de estudiantes con JOIN a progresos y filtros de búsqueda
│   ├── admin_detalle_usuario.php  # Detalle exhaustivo: respuestas dadas a cada pregunta y resultado vocacional
│   └── admin_acciones_usuario.php # Operaciones CRUD: cambiar estado (activo/suspendido), rol y eliminar en cascada
└── admin/
    └── dashboard.php              # Vista completa y responsiva del panel admin en HTML5, Tailwind CSS y JavaScript Fetch
```

---

## 🚀 Paso a Paso para la Puesta en Marcha

### 1. Importar la Base de Datos en MySQL
Ejecuta el script SQL en tu gestor de base de datos preferido (phpMyAdmin, MySQL Workbench, DBeaver o terminal):

```bash
mysql -u root -p < php-backend/schema.sql
```

Esto creará automáticamente la base de datos `vocaccion_db` con las 6 tablas normalizadas:
- `usuarios`: Cuentas con roles (`user`, `admin`), estado y datos demográficos.
- `etapas_test`: Fases del test psicométrico.
- `preguntas`: Banco de preguntas categorizadas por dimensiones RIASEC de Holland.
- `usuario_test_progreso`: Avance dinámico (`porcentaje_avance`, `estado`, `etapa_actual`).
- `usuario_respuestas`: Respuestas individuales por estudiante y pregunta (escala 1 a 5).
- `usuario_resultados`: Perfil final Holland, desglose de puntajes y carreras sugeridas en JSON.

### 2. Configuración de Conexión (`config/conexion.php`)
Puedes configurar las credenciales mediante variables de entorno en tu servidor o directamente en `config/conexion.php`:

```php
$host = getenv('DB_HOST') ?: '127.0.0.1';
$port = getenv('DB_PORT') ?: '3306';
$dbName = getenv('DB_NAME') ?: 'vocaccion_db';
$user = getenv('DB_USER') ?: 'root';
$pass = getenv('DB_PASS') ?: '';
```

### 3. Credenciales Iniciales de Administrador
El script SQL incluye una cuenta de administrador preconfigurada para acceso inmediato:
- **Correo:** `admin@vocaccion.edu`
- **Contraseña:** `Admin2026!*VocAccion`
- **Rol:** `admin`

---

## 🔒 Mecanismos de Seguridad Implementados
1. **Contraseñas Seguras:** Hasheadas exclusivamente con `password_hash($pass, PASSWORD_BCRYPT, ['cost' => 12])` y verificadas mediante `password_verify()`.
2. **Protección contra Inyecciones SQL:** Todas las consultas a MySQL utilizan Sentencias Preparadas (Prepared Statements) con `PDO::ATTR_EMULATE_PREPARES => false`.
3. **Control de Sesiones:** `session_regenerate_id(true)` tras el login para evitar fijación de sesiones, y verificación estricta de `$_SESSION['user_role'] === 'admin'` en cada endpoint.
4. **Integridad Referencial:** Claves foráneas con `ON DELETE CASCADE` para eliminar de forma consistente el progreso de un usuario si es dado de baja por el administrador.
