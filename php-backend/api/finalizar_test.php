<?php
/**
 * VocAcción - Plataforma de Orientación Vocacional
 * Archivo: api/finalizar_test.php
 * Procesa las respuestas, calcula el perfil RIASEC (Holland), sugiere carreras y almacena el resultado final
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/conexion.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

header('Content-Type: application/json; charset=utf-8');

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Sesión no iniciada.']);
    exit;
}

$usuarioId = (int)$_SESSION['user_id'];
$pdo = getDbConnection();

try {
    $pdo->beginTransaction();

    // 1. Obtener progreso
    $stmtProg = $pdo->prepare('SELECT id, preguntas_totales, preguntas_respondidas FROM usuario_test_progreso WHERE usuario_id = :uid LIMIT 1');
    $stmtProg->execute(['uid' => $usuarioId]);
    $progreso = $stmtProg->fetch();

    if (!$progreso) {
        throw new Exception('No se encontró progreso de test para este usuario.');
    }

    $testProgresoId = (int)$progreso['id'];

    // 2. Calcular puntajes por categoría RIASEC sumando respuestas
    $stmtScores = $pdo->prepare('
        SELECT 
            p.codigo_riasec, 
            SUM(ur.valor_respuesta) as suma,
            COUNT(ur.id) as cantidad_preguntas
        FROM usuario_respuestas ur
        INNER JOIN preguntas p ON ur.pregunta_id = p.id
        WHERE ur.test_progreso_id = :tpid
        GROUP BY p.codigo_riasec
    ');
    $stmtScores->execute(['tpid' => $testProgresoId]);
    $rows = $stmtScores->fetchAll();

    $scores = ['R' => 0.0, 'I' => 0.0, 'A' => 0.0, 'S' => 0.0, 'E' => 0.0, 'C' => 0.0];
    foreach ($rows as $r) {
        $codigo = $r['codigo_riasec'];
        $suma = (float)$r['suma'];
        $count = (int)$r['cantidad_preguntas'];
        // Escala normalizada de 0 a 100 (máximo teórico 5 * count)
        $maximo = max($count * 5, 1);
        $scores[$codigo] = round(($suma / $maximo) * 100, 2);
    }

    // 3. Determinar perfil dominante (las 3 letras con mayor puntaje)
    arsort($scores);
    $keys = array_keys($scores);
    $perfilHolland = ($keys[0] ?? 'I') . ($keys[1] ?? 'A') . ($keys[2] ?? 'S');

    // 4. Catálogo de mapeo de carreras sugeridas según perfil dominante
    $catalogoCarreras = [
        'I' => [
            ['id' => 'ing-software-ia', 'nombre' => 'Ingeniería de Software e Inteligencia Artificial', 'area' => 'Tecnología e Innovación', 'afinidad' => 96],
            ['id' => 'ciencia-datos-ia', 'nombre' => 'Ciencia de Datos y Big Data', 'area' => 'Tecnología e Innovación', 'afinidad' => 92],
            ['id' => 'ing-biomedica', 'nombre' => 'Ingeniería Biomédica', 'area' => 'Salud y Ciencias de la Vida', 'afinidad' => 88]
        ],
        'A' => [
            ['id' => 'diseno-digital-ux-ui', 'nombre' => 'Diseño Digital y Experiencia de Usuario (UX/UI)', 'area' => 'Artes y Creatividad', 'afinidad' => 95],
            ['id' => 'comunicacion-digital', 'nombre' => 'Comunicación y Producción Audiovisual', 'area' => 'Artes y Creatividad', 'afinidad' => 90],
            ['id' => 'arquitectura-urbanismo', 'nombre' => 'Arquitectura y Urbanismo Sostenible', 'area' => 'Diseño y Construcción', 'afinidad' => 87]
        ],
        'S' => [
            ['id' => 'psicologia-clinica', 'nombre' => 'Psicología y Bienestar Humano', 'area' => 'Salud y Sociedad', 'afinidad' => 94],
            ['id' => 'medicina', 'nombre' => 'Medicina General y Cirugía', 'area' => 'Salud y Ciencias de la Vida', 'afinidad' => 91],
            ['id' => 'pedagogia-innovacion', 'nombre' => 'Pedagogía e Innovación Educativa', 'area' => 'Educación y Desarrollo', 'afinidad' => 89]
        ],
        'E' => [
            ['id' => 'administracion-negocios', 'nombre' => 'Administración y Emprendimiento Global', 'area' => 'Negocios y Gestión', 'afinidad' => 94],
            ['id' => 'marketing-growth', 'nombre' => 'Marketing Estratégico y Growth', 'area' => 'Negocios y Gestión', 'afinidad' => 91],
            ['id' => 'derecho-corporativo', 'nombre' => 'Derecho y Arbitraje Internacional', 'area' => 'Jurídica y Políticas', 'afinidad' => 88]
        ],
        'R' => [
            ['id' => 'ing-mecatronica', 'nombre' => 'Ingeniería Mecatrónica y Robótica', 'area' => 'Ingeniería y Fabricación', 'afinidad' => 95],
            ['id' => 'ing-ambiental', 'nombre' => 'Ingeniería Ambiental y Recursos Renovables', 'area' => 'Ciencias de la Tierra', 'afinidad' => 90],
            ['id' => 'agronomia-tecnificada', 'nombre' => 'Agronomía y Biotecnología Vegetal', 'area' => 'Agro y Producción', 'afinidad' => 87]
        ],
        'C' => [
            ['id' => 'finanzas-contabilidad', 'nombre' => 'Contaduría Pública y Finanzas Corporativas', 'area' => 'Económicas y Administrativas', 'afinidad' => 95],
            ['id' => 'logistica-cadena-suministro', 'nombre' => 'Logística y Gestión de Operaciones', 'area' => 'Operaciones y Cadena de Valor', 'afinidad' => 91],
            ['id' => 'ciberseguridad-auditoria', 'nombre' => 'Auditoría de Sistemas y Seguridad Informática', 'area' => 'Tecnología y Normativa', 'afinidad' => 89]
        ]
    ];

    $primeraLetra = substr($perfilHolland, 0, 1);
    $segundaLetra = substr($perfilHolland, 1, 1);
    $carrerasSugeridas = array_merge(
        $catalogoCarreras[$primeraLetra] ?? [],
        array_slice($catalogoCarreras[$segundaLetra] ?? [], 0, 2)
    );

    $carrerasJson = json_encode($carrerasSugeridas, JSON_UNESCAPED_UNICODE);

    // 5. Guardar o actualizar resultado final en usuario_resultados
    $stmtRes = $pdo->prepare('
        INSERT INTO usuario_resultados (
            usuario_id, test_progreso_id, perfil_holland, 
            puntaje_r, puntaje_i, puntaje_a, puntaje_s, puntaje_e, puntaje_c, 
            carreras_sugeridas, fecha_resultado
        )
        VALUES (
            :uid, :tpid, :perfil,
            :pr, :pi, :pa, :ps, :pe, :pc,
            :carreras, NOW()
        )
        ON DUPLICATE KEY UPDATE
            perfil_holland = VALUES(perfil_holland),
            puntaje_r = VALUES(puntaje_r),
            puntaje_i = VALUES(puntaje_i),
            puntaje_a = VALUES(puntaje_a),
            puntaje_s = VALUES(puntaje_s),
            puntaje_e = VALUES(puntaje_e),
            puntaje_c = VALUES(puntaje_c),
            carreras_sugeridas = VALUES(carreras_sugeridas),
            fecha_resultado = NOW()
    ');

    $stmtRes->execute([
        'uid' => $usuarioId,
        'tpid' => $testProgresoId,
        'perfil' => $perfilHolland,
        'pr' => $scores['R'],
        'pi' => $scores['I'],
        'pa' => $scores['A'],
        'ps' => $scores['S'],
        'pe' => $scores['E'],
        'pc' => $scores['C'],
        'carreras' => $carrerasJson
    ]);

    // 6. Marcar progreso como 100% completado
    $stmtComplete = $pdo->prepare('
        UPDATE usuario_test_progreso
        SET 
            estado = "completado",
            porcentaje_avance = 100.00,
            completed_at = NOW(),
            updated_at = NOW()
        WHERE id = :tpid
    ');
    $stmtComplete->execute(['tpid' => $testProgresoId]);

    $pdo->commit();

    echo json_encode([
        'success' => true,
        'message' => '¡Test completado exitosamente! Tu perfil vocacional ha sido calculado y guardado en la base de datos.',
        'resultado' => [
            'perfil_holland' => $perfilHolland,
            'puntajes' => $scores,
            'carreras_sugeridas' => $carrerasSugeridas,
            'fecha' => date('Y-m-d H:i:s')
        ]
    ]);
} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    error_log('[VocAcción Finalizar Test Error] ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error al calcular y finalizar el test vocacional.']);
}
