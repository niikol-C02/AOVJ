-- ============================================================================
-- ESQUEMA DE BASE DE DATOS VOCACCIÓN (MySQL 8.0+ / MariaDB)
-- Motor: InnoDB | Codificación: utf8mb4_unicode_ci
-- Diseñado para trazabilidad en tiempo real de tests vocacionales y administración
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `vocaccion_db` 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE `vocaccion_db`;

-- Desactivar temporalmente revisión de claves foráneas para recreación limpia
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `usuario_resultados`;
DROP TABLE IF EXISTS `usuario_respuestas`;
DROP TABLE IF EXISTS `usuario_test_progreso`;
DROP TABLE IF EXISTS `preguntas`;
DROP TABLE IF EXISTS `etapas_test`;
DROP TABLE IF EXISTS `usuarios`;

SET FOREIGN_KEY_CHECKS = 1;

-- ----------------------------------------------------------------------------
-- 1. TABLA: usuarios
-- Almacena las cuentas registradas con roles y estados protegidos
-- ----------------------------------------------------------------------------
CREATE TABLE `usuarios` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(120) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `rol` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  `estado` ENUM('activo', 'suspendido') NOT NULL DEFAULT 'activo',
  `edad` TINYINT UNSIGNED NULL,
  `ciudad` VARCHAR(100) NULL,
  `nivel_educativo` VARCHAR(150) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_usuarios_email` (`email`),
  INDEX `idx_usuarios_rol` (`rol`),
  INDEX `idx_usuarios_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 2. TABLA: etapas_test
-- Define las etapas del test vocacional (ej: Intereses, Habilidades, Personalidad)
-- ----------------------------------------------------------------------------
CREATE TABLE `etapas_test` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `numero_etapa` TINYINT UNSIGNED NOT NULL UNIQUE,
  `titulo` VARCHAR(150) NOT NULL,
  `descripcion` TEXT NULL,
  `icono` VARCHAR(50) DEFAULT 'sparkles'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 3. TABLA: preguntas
-- Banco de preguntas psicométricas clasificadas según el modelo RIASEC de Holland
-- R = Realista, I = Investigador, A = Artístico, S = Social, E = Emprendedor, C = Convencional
-- ----------------------------------------------------------------------------
CREATE TABLE `preguntas` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `etapa_id` INT UNSIGNED NOT NULL,
  `codigo_riasec` ENUM('R', 'I', 'A', 'S', 'E', 'C') NOT NULL,
  `texto_pregunta` TEXT NOT NULL,
  `orden` SMALLINT UNSIGNED NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`etapa_id`) REFERENCES `etapas_test`(`id`) ON DELETE CASCADE,
  INDEX `idx_preguntas_etapa` (`etapa_id`),
  INDEX `idx_preguntas_riasec` (`codigo_riasec`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 4. TABLA: usuario_test_progreso
-- Seguimiento del estado de avance en tiempo real de cada estudiante
-- ----------------------------------------------------------------------------
CREATE TABLE `usuario_test_progreso` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `usuario_id` INT UNSIGNED NOT NULL,
  `estado` ENUM('no_iniciado', 'en_progreso', 'completado') NOT NULL DEFAULT 'no_iniciado',
  `porcentaje_avance` DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
  `etapa_actual` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  `preguntas_totales` INT UNSIGNED NOT NULL DEFAULT 0,
  `preguntas_respondidas` INT UNSIGNED NOT NULL DEFAULT 0,
  `started_at` DATETIME NULL,
  `completed_at` DATETIME NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_usuario_test` (`usuario_id`),
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE,
  INDEX `idx_progreso_estado` (`estado`),
  INDEX `idx_progreso_avance` (`porcentaje_avance`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 5. TABLA: usuario_respuestas
-- Registro individual y detallado de cada respuesta dada por el estudiante
-- ----------------------------------------------------------------------------
CREATE TABLE `usuario_respuestas` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `usuario_id` INT UNSIGNED NOT NULL,
  `test_progreso_id` INT UNSIGNED NOT NULL,
  `pregunta_id` INT UNSIGNED NOT NULL,
  `valor_respuesta` TINYINT UNSIGNED NOT NULL COMMENT 'Escala Likert 1 (Nada afín) a 5 (Totalmente afín)',
  `respondido_en` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_usuario_pregunta` (`test_progreso_id`, `pregunta_id`),
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`test_progreso_id`) REFERENCES `usuario_test_progreso`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`pregunta_id`) REFERENCES `preguntas`(`id`) ON DELETE CASCADE,
  INDEX `idx_respuestas_usuario` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 6. TABLA: usuario_resultados
-- Resultado vocacional definitivo con desglose RIASEC y carreras sugeridas
-- ----------------------------------------------------------------------------
CREATE TABLE `usuario_resultados` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `usuario_id` INT UNSIGNED NOT NULL,
  `test_progreso_id` INT UNSIGNED NOT NULL,
  `perfil_holland` VARCHAR(10) NOT NULL COMMENT 'Ej: RIA, SEC, IAS',
  `puntaje_r` DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
  `puntaje_i` DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
  `puntaje_a` DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
  `puntaje_s` DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
  `puntaje_e` DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
  `puntaje_c` DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
  `carreras_sugeridas` JSON NOT NULL COMMENT 'Array JSON con nombre, afinidad y área',
  `fecha_resultado` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_resultado_test` (`test_progreso_id`),
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`test_progreso_id`) REFERENCES `usuario_test_progreso`(`id`) ON DELETE CASCADE,
  INDEX `idx_resultado_usuario` (`usuario_id`),
  INDEX `idx_resultado_perfil` (`perfil_holland`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- DATOS INICIALES (SEMILLAS / SEEDS)
-- ============================================================================

-- 1. Usuario Administrador Maestro Inicial
-- Contraseña por defecto: Admin2026!*VocAccion
-- Hash generado con password_hash('Admin2026!*VocAccion', PASSWORD_BCRYPT)
INSERT INTO `usuarios` (`nombre`, `email`, `password_hash`, `rol`, `estado`, `edad`, `ciudad`, `nivel_educativo`)
VALUES (
  'Administradora VocAcción',
  'admin@vocaccion.edu',
  '$2y$12$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  'admin',
  'activo',
  24,
  'Bogotá',
  'Profesional / Administrador'
);

-- 2. Etapas del Test Vocacional
INSERT INTO `etapas_test` (`numero_etapa`, `titulo`, `descripcion`, `icono`) VALUES
(1, 'Intereses y Preferencias', 'Explora las actividades que despiertan tu curiosidad innata.', 'compass'),
(2, 'Habilidades y Destrezas', 'Evalúa las tareas en las que te sientes competente y seguro.', 'sparkles'),
(3, 'Estilos de Trabajo y Entorno', 'Identifica el ambiente laboral donde maximizas tu potencial.', 'briefcase');

-- 3. Banco de Preguntas RIASEC Muestra (12 preguntas representativas)
INSERT INTO `preguntas` (`etapa_id`, `codigo_riasec`, `texto_pregunta`, `orden`) VALUES
-- Etapa 1
(1, 'R', '¿Te entusiasma ensamblar circuitos, reparar dispositivos mecánicos o manipular herramientas físicas?', 1),
(1, 'I', '¿Disfrutas analizar problemas complejos, investigar teorías científicas o escribir código de software?', 2),
(1, 'A', '¿Te apasiona diseñar piezas gráficas, crear música, escribir historias o editar contenido audiovisual?', 3),
(1, 'S', '¿Te motiva orientar a compañeros, enseñar conceptos nuevos o realizar voluntariados comunitarios?', 4),
(1, 'E', '¿Tienes facilidad para convencer a otros sobre una idea, negociar y liderar equipos de trabajo?', 5),
(1, 'C', '¿Prefieres clasificar información de manera sistemática, organizar presupuestos o crear hojas de cálculo?', 6),
-- Etapa 2
(2, 'R', '¿Tienes destreza para construir maquetas, operar maquinaria o realizar mediciones técnicas precisas?', 7),
(2, 'I', '¿Se te facilita interpretar gráficos estadísticos, hipótesis lógicas y datos matemáticos?', 8),
(2, 'A', '¿Eres capaz de idear soluciones estéticas innovadoras sin seguir un formato rígido?', 9),
(2, 'S', '¿Logras escuchar activamente a personas en situaciones difíciles y generar empatía inmediata?', 10),
(2, 'E', '¿Tomas decisiones rápidas bajo presión y te gusta asumir riesgos calculados en proyectos?', 11),
(2, 'C', '¿Cuidas minuciosamente los detalles, la ortografía y el cumplimiento riguroso de normativas?', 12);
