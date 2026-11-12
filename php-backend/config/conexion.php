<?php
/**
 * VocAcción - Plataforma de Orientación Vocacional
 * Archivo: config/conexion.php
 * Conexión Segura a Base de Datos MySQL mediante PDO
 */

declare(strict_types=1);

class Database
{
    private static ?PDO $instance = null;

    public static function getConnection(): PDO
    {
        if (self::$instance === null) {
            // Configuración de credenciales (preferir variables de entorno si existen)
            $host = getenv('DB_HOST') ?: '127.0.0.1';
            $port = getenv('DB_PORT') ?: '3306';
            $dbName = getenv('DB_NAME') ?: 'vocaccion_db';
            $user = getenv('DB_USER') ?: 'root';
            $pass = getenv('DB_PASS') ?: '';
            $charset = 'utf8mb4';

            $dsn = "mysql:host={$host};port={$port};dbname={$dbName};charset={$charset}";

            $options = [
                // Lanzar excepciones para cualquier error SQL (facilita captura y transacciones)
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                // Devolver arrays asociativos por defecto
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                // Deshabilitar emulación de consultas preparadas para máxima protección contra SQL Injection
                PDO::ATTR_EMULATE_PREPARES => false,
                // Conexiones persistentes según requerimiento de carga (opcional)
                PDO::ATTR_PERSISTENT => false,
                // Asegurar codificación utf8mb4 a nivel de conexión
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8mb4' COLLATE 'utf8mb4_unicode_ci'"
            ];

            try {
                self::$instance = new PDO($dsn, $user, $pass, $options);
            } catch (PDOException $e) {
                // Registrar error en log del servidor sin exponer credenciales al cliente
                error_log('[VocAcción DB Connection Error] ' . $e->getMessage());
                
                // Si la petición espera JSON, responder apropiadamente
                if (
                    (!empty($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false) ||
                    (!empty($_SERVER['CONTENT_TYPE']) && strpos($_SERVER['CONTENT_TYPE'], 'application/json') !== false)
                ) {
                    http_response_code(500);
                    header('Content-Type: application/json; charset=utf-8');
                    echo json_encode([
                        'success' => false,
                        'error' => 'Error de conexión con el servidor de base de datos MySQL.'
                    ]);
                    exit;
                }

                die('Error al conectar con la base de datos de VocAcción. Verifica que el servicio MySQL esté activo.');
            }
        }

        return self::$instance;
    }
}

// Función helper global para facilitar uso directo
function getDbConnection(): PDO
{
    return Database::getConnection();
}
