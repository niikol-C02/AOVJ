<?php
/**
 * VocAcción - Plataforma de Orientación Vocacional
 * Archivo: auth/check_admin.php
 * Middleware de protección de acceso para Administradores
 */

declare(strict_types=1);

if (session_status() === PHP_SESSION_NONE) {
    // Configuración segura de cookies de sesión
    session_set_cookie_params([
        'lifetime' => 86400 * 3, // 3 días
        'path' => '/',
        'httponly' => true,
        'samesite' => 'Lax'
    ]);
    session_start();
}

function requireAdminSession(): void
{
    $isAdmin = isset($_SESSION['user_role']) && $_SESSION['user_role'] === 'admin';
    $isLogged = isset($_SESSION['user_id']) && !empty($_SESSION['user_id']);

    if (!$isLogged || !$isAdmin) {
        $isAjax = (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest')
            || (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false);

        if ($isAjax) {
            http_response_code(403);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode([
                'success' => false,
                'error' => 'Acceso denegado (HTTP 403): Tu cuenta no posee permisos de administrador para este recurso.'
            ]);
            exit;
        }

        // Redireccionar al login
        header('Location: login.php?error=acceso_denegado');
        exit;
    }
}
