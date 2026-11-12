<?php
/**
 * VocAcción - Plataforma de Orientación Vocacional
 * Archivo: admin/dashboard.php
 * Panel de Administración Dinámico conectado 100% a MySQL mediante PHP y JavaScript Fetch
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/conexion.php';
require_once __DIR__ . '/../auth/check_admin.php';

// Garantizar que solo usuarios autenticados con rol === 'admin' accedan
requireAdminSession();

$adminNombre = $_SESSION['user_name'] ?? 'Administrador';
$adminEmail = $_SESSION['user_email'] ?? 'admin@vocaccion.edu';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Administración | VocAcción</title>
    <!-- Tailwind CSS CDN para renderizado moderno y fluido -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts Outfit & Plus Jakarta Sans -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #FAF7F2;
        }
        h1, h2, h3, h4, .font-heading {
            font-family: 'Outfit', sans-serif;
        }
    </style>
</head>
<body class="text-slate-800 antialiased min-h-screen flex flex-col">

    <!-- Orbes ambientales de fondo -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div class="absolute -top-32 -left-32 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl"></div>
        <div class="absolute top-1/3 -right-32 w-[480px] h-[480px] bg-purple-300/25 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-32 left-1/4 w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-3xl"></div>
    </div>

    <!-- Header / Barra de Navegación Superior -->
    <header class="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16 sm:h-20">
                <!-- Marca y Badge -->
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-600 p-0.5 shadow-md shadow-purple-500/20 flex items-center justify-center text-white font-black text-lg">
                        V
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="font-heading font-extrabold text-xl tracking-tight bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                VocAcción
                            </span>
                            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 uppercase tracking-wider border border-purple-200">
                                Panel Admin MySQL
                            </span>
                        </div>
                        <p class="text-[11px] text-slate-500 hidden sm:block">Control en Tiempo Real de Estudiantes y Tests</p>
                    </div>
                </div>

                <!-- Perfil y Cierre de Sesión -->
                <div class="flex items-center gap-3">
                    <div class="text-right hidden md:block">
                        <p class="text-xs font-bold text-slate-800 leading-tight"><?= htmlspecialchars($adminNombre, ENT_QUOTES, 'UTF-8') ?></p>
                        <p class="text-[10px] text-purple-600 font-semibold"><?= htmlspecialchars($adminEmail, ENT_QUOTES, 'UTF-8') ?></p>
                    </div>
                    <a href="../auth/logout.php" class="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors border border-rose-200 flex items-center gap-1.5 shadow-xs">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        <span>Cerrar Sesión</span>
                    </a>
                </div>
            </div>
        </div>
    </header>

    <!-- Contenido Principal -->
    <main class="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">

        <!-- Banner de Encabezado -->
        <div class="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950 to-indigo-950 text-white shadow-xl shadow-purple-950/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
                <span class="text-[11px] font-bold uppercase tracking-wider text-pink-300">Monitoreo 100% Datos Reales</span>
                <h1 class="text-2xl sm:text-3xl font-extrabold mt-1">Panel de Control de Orientación Vocacional</h1>
                <p class="text-xs sm:text-sm text-purple-200/80 mt-1 max-w-2xl">
                    Visualiza el progreso de cada alumno desde su registro, analiza el avance de preguntas en curso y consulta las carreras recomendadas según el modelo RIASEC.
                </p>
            </div>
            <button id="btn-refresh" onclick="recargarDashboard()" class="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-all backdrop-blur-md flex items-center gap-2 shadow-xs active:scale-95">
                <svg id="icon-refresh" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                <span>Actualizar Datos</span>
            </button>
        </div>

        <!-- 4 Tarjetas de Métricas Reales (KPIs) -->
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <!-- 1. Total Estudiantes -->
            <div class="p-5 rounded-3xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-xs flex items-center justify-between">
                <div>
                    <p class="text-xs font-bold uppercase tracking-wider text-slate-500">Usuarios Registrados</p>
                    <h3 id="stat-total-usuarios" class="text-3xl font-extrabold text-slate-900 mt-1 font-heading">--</h3>
                    <p class="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Cuentas activas en BD</span>
                    </p>
                </div>
                <div class="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xl shadow-xs">
                    👥
                </div>
            </div>

            <!-- 2. Tests Completados -->
            <div class="p-5 rounded-3xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-xs flex items-center justify-between">
                <div>
                    <p class="text-xs font-bold uppercase tracking-wider text-slate-500">Tests Completados</p>
                    <h3 id="stat-tests-completados" class="text-3xl font-extrabold text-emerald-700 mt-1 font-heading">--</h3>
                    <p class="text-[11px] text-slate-500 mt-1">Con resultado vocacional final</p>
                </div>
                <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl shadow-xs">
                    🎓
                </div>
            </div>

            <!-- 3. Tests en Curso -->
            <div class="p-5 rounded-3xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-xs flex items-center justify-between">
                <div>
                    <p class="text-xs font-bold uppercase tracking-wider text-slate-500">Tests en Curso</p>
                    <h3 id="stat-tests-en-curso" class="text-3xl font-extrabold text-indigo-700 mt-1 font-heading">--</h3>
                    <p id="stat-promedio-avance" class="text-[11px] text-indigo-600 font-semibold mt-1">Promedio: --% avance</p>
                </div>
                <div class="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xl shadow-xs">
                    ⏳
                </div>
            </div>

            <!-- 4. Registrados Hoy -->
            <div class="p-5 rounded-3xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-xs flex items-center justify-between">
                <div>
                    <p class="text-xs font-bold uppercase tracking-wider text-slate-500">Registrados Hoy</p>
                    <h3 id="stat-usuarios-hoy" class="text-3xl font-extrabold text-pink-600 mt-1 font-heading">--</h3>
                    <p class="text-[11px] text-pink-600 font-semibold mt-1">Nuevos ingresos hoy</p>
                </div>
                <div class="w-12 h-12 rounded-2xl bg-pink-100 text-pink-700 flex items-center justify-center font-bold text-xl shadow-xs">
                    ⚡
                </div>
            </div>
        </section>

        <!-- Barra de Búsqueda y Filtros Dinámicos -->
        <section class="p-4 sm:p-5 rounded-3xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-xs space-y-3">
            <div class="flex flex-col md:flex-row gap-3 items-center justify-between">
                <!-- Buscador por nombre o correo -->
                <div class="relative w-full md:w-96">
                    <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <input 
                        type="text" 
                        id="input-busqueda" 
                        placeholder="Buscar por nombre, correo o ciudad..." 
                        oninput="debounceBusqueda()"
                        class="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-slate-800 placeholder-slate-400"
                    >
                </div>

                <!-- Filtros desplegables -->
                <div class="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                    <!-- Filtro Estado Test -->
                    <select id="filtro-estado-test" onchange="cargarUsuarios()" class="text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-300">
                        <option value="todos">Todos los Estados del Test</option>
                        <option value="completado">Solo Tests Completados</option>
                        <option value="en_progreso">Solo Tests En Curso</option>
                        <option value="no_iniciado">Solo Sin Iniciar</option>
                    </select>

                    <!-- Filtro Rol -->
                    <select id="filtro-rol" onchange="cargarUsuarios()" class="text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-300">
                        <option value="todos">Todos los Roles</option>
                        <option value="user">Solo Estudiantes</option>
                        <option value="admin">Solo Administradores</option>
                    </select>
                </div>
            </div>
        </section>

        <!-- Tabla Dinámica de Usuarios Registrados y Avance -->
        <section class="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xs overflow-hidden">
            <div class="p-5 border-b border-slate-200/80 flex items-center justify-between">
                <div>
                    <h3 class="text-base sm:text-lg font-bold text-slate-900 font-heading">Estudiantes & Seguimiento del Test</h3>
                    <p class="text-xs text-slate-500">Datos obtenidos directamente de MySQL en tiempo real</p>
                </div>
                <span id="badge-total-tabla" class="px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-800 border border-purple-100">
                    Cargando...
                </span>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr class="border-b border-slate-200/80 bg-slate-50/70 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                            <th class="p-4">Estudiante</th>
                            <th class="p-4">Contacto & Ciudad</th>
                            <th class="p-4">Fecha Registro</th>
                            <th class="p-4">Estado del Test Vocacional</th>
                            <th class="p-4">Avance (%)</th>
                            <th class="p-4">Perfil / Resultado</th>
                            <th class="p-4 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="tabla-usuarios-cuerpo" class="divide-y divide-slate-100">
                        <tr>
                            <td colspan="7" class="p-8 text-center text-slate-400">
                                <div class="inline-flex items-center gap-2">
                                    <svg class="w-4 h-4 animate-spin text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                                    <span>Conectando con la base de datos MySQL...</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </main>

    <!-- Modal Detallado de Respuestas y Resultado Vocacional Individual -->
    <div id="modal-detalle-usuario" class="fixed inset-0 z-50 hidden flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-150">
        <div class="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-100 space-y-5">
            <!-- Modal Header -->
            <div class="flex items-center justify-between pb-4 border-b border-slate-100">
                <div class="flex items-center gap-3">
                    <div id="modal-user-avatar" class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-400 to-purple-600 text-white font-extrabold text-lg flex items-center justify-center shadow-xs">
                        ?
                    </div>
                    <div>
                        <h3 id="modal-user-nombre" class="font-heading font-extrabold text-lg text-slate-900">Cargando...</h3>
                        <p id="modal-user-sub" class="text-xs text-slate-500">Consultando detalle en MySQL...</p>
                    </div>
                </div>
                <button onclick="cerrarModalDetalle()" class="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>

            <!-- Modal Content (Inyectado dinámicamente) -->
            <div id="modal-contenido" class="space-y-5 text-xs">
                <!-- Se llena con JS -->
            </div>

            <!-- Modal Footer -->
            <div class="pt-3 border-t border-slate-100 flex justify-end">
                <button onclick="cerrarModalDetalle()" class="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors">
                    Cerrar Detalle
                </button>
            </div>
        </div>
    </div>

    <!-- Toast Notification Flotante -->
    <div id="toast-container" class="fixed bottom-5 right-5 z-50 flex flex-col gap-2"></div>

    <!-- Lógica JavaScript Dinámica (Fetch / AJAX) -->
    <script>
        let debounceTimer = null;

        document.addEventListener('DOMContentLoaded', () => {
            recargarDashboard();
        });

        function recargarDashboard() {
            const icon = document.getElementById('icon-refresh');
            if (icon) icon.classList.add('animate-spin');

            Promise.all([cargarMetricas(), cargarUsuarios()])
                .finally(() => {
                    setTimeout(() => {
                        if (icon) icon.classList.remove('animate-spin');
                    }, 500);
                });
        }

        function debounceBusqueda() {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                cargarUsuarios();
            }, 300);
        }

        // 1. Cargar Métricas Reales desde MySQL
        async function cargarMetricas() {
            try {
                const res = await fetch('../api/admin_metricas.php', {
                    headers: { 'Accept': 'application/json' }
                });
                const data = await res.json();

                if (data.success && data.metricas) {
                    const m = data.metricas;
                    document.getElementById('stat-total-usuarios').innerText = m.total_usuarios;
                    document.getElementById('stat-tests-completados').innerText = m.tests_completados;
                    document.getElementById('stat-tests-en-curso').innerText = m.tests_en_curso;
                    document.getElementById('stat-usuarios-hoy').innerText = m.usuarios_hoy;
                    document.getElementById('stat-promedio-avance').innerText = `Promedio: ${m.promedio_avance}% avance`;
                }
            } catch (err) {
                console.error('Error al cargar métricas:', err);
                mostrarToast('Error al conectar con MySQL para métricas.', 'error');
            }
        }

        // 2. Cargar Lista de Usuarios con Progreso del Test
        async function cargarUsuarios() {
            const search = document.getElementById('input-busqueda').value.trim();
            const estadoTest = document.getElementById('filtro-estado-test').value;
            const rol = document.getElementById('filtro-rol').value;

            const params = new URLSearchParams({
                search,
                estado_test: estadoTest,
                rol
            });

            const tbody = document.getElementById('tabla-usuarios-cuerpo');

            try {
                const res = await fetch(`../api/admin_usuarios.php?${params.toString()}`, {
                    headers: { 'Accept': 'application/json' }
                });
                const data = await res.json();

                if (data.success && Array.isArray(data.usuarios)) {
                    document.getElementById('badge-total-tabla').innerText = `${data.total} Estudiantes`;

                    if (data.usuarios.length === 0) {
                        tbody.innerHTML = `
                            <tr>
                                <td colspan="7" class="p-8 text-center text-slate-400">
                                    No se encontraron estudiantes que coincidan con la búsqueda.
                                </td>
                            </tr>
                        `;
                        return;
                    }

                    tbody.innerHTML = data.usuarios.map(u => {
                        const estadoTest = u.test.estado;
                        let badgeEstado = '';
                        if (estadoTest === 'completado') {
                            badgeEstado = '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">✓ Completado</span>';
                        } else if (estadoTest === 'en_progreso') {
                            badgeEstado = '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">⏳ En Progreso</span>';
                        } else {
                            badgeEstado = '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">Sin Iniciar</span>';
                        }

                        const pct = u.test.porcentaje_avance || 0;
                        const esActivo = u.estado_cuenta === 'activo';

                        return `
                            <tr class="hover:bg-purple-50/40 transition-colors">
                                <!-- Estudiante -->
                                <td class="p-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-9 h-9 rounded-2xl bg-gradient-to-tr from-pink-400 to-purple-600 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                                            ${u.nombre.charAt(0).toUpperCase()}
                                        </div>
                                        <div class="min-w-0">
                                            <p class="font-bold text-slate-900 leading-tight truncate">${escapeHtml(u.nombre)}</p>
                                            <p class="text-[10px] text-slate-400">${u.edad ? u.edad + ' años' : 'Edad sin definir'} • ${escapeHtml(u.nivel_educativo)}</p>
                                        </div>
                                    </div>
                                </td>

                                <!-- Contacto -->
                                <td class="p-4 font-mono text-[11px] text-slate-600">
                                    <p class="truncate max-w-[180px]">${escapeHtml(u.email)}</p>
                                    <p class="text-[10px] text-slate-400 font-sans">${escapeHtml(u.ciudad)}</p>
                                </td>

                                <!-- Fecha Registro -->
                                <td class="p-4 text-slate-600 text-[11px]">
                                    ${formatDate(u.created_at)}
                                </td>

                                <!-- Estado del Test -->
                                <td class="p-4">
                                    ${badgeEstado}
                                    <p class="text-[10px] text-slate-400 mt-0.5">${u.test.preguntas_respondidas} de ${u.test.preguntas_totales} preguntas</p>
                                </td>

                                <!-- Avance (%) con barra visual -->
                                <td class="p-4 w-36">
                                    <div class="flex items-center justify-between font-mono font-bold text-slate-700 text-[11px] mb-1">
                                        <span>${pct}%</span>
                                    </div>
                                    <div class="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                                        <div class="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-500" style="width: ${Math.max(pct, pct > 0 ? 5 : 0)}%"></div>
                                    </div>
                                </td>

                                <!-- Perfil Vocacional -->
                                <td class="p-4">
                                    ${u.test.perfil_holland ? `
                                        <span class="px-2 py-0.5 rounded-lg bg-pink-100 text-pink-800 font-extrabold font-mono text-[11px] border border-pink-200">
                                            ${u.test.perfil_holland}
                                        </span>
                                    ` : '<span class="text-slate-400 text-[11px]">Pendiente</span>'}
                                </td>

                                <!-- Acciones -->
                                <td class="p-4 text-right">
                                    <div class="inline-flex items-center gap-1.5">
                                        <!-- Botón Ver Respuestas y Resultado -->
                                        <button 
                                            onclick="abrirModalDetalle(${u.id})"
                                            class="px-2.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-[11px] transition-colors border border-purple-200 shadow-xs flex items-center gap-1"
                                            title="Ver preguntas respondidas y resultados"
                                        >
                                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                            <span>Detalle</span>
                                        </button>

                                        <!-- Botón Alternar Estado (Activar / Suspender) -->
                                        <button 
                                            onclick="ejecutarAccion(${u.id}, 'cambiar_estado')"
                                            class="px-2 py-1.5 rounded-xl text-[11px] font-bold transition-colors border ${esActivo ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'}"
                                            title="${esActivo ? 'Suspender acceso del estudiante' : 'Reactivar cuenta'}"
                                        >
                                            ${esActivo ? 'Suspender' : 'Activar'}
                                        </button>

                                        <!-- Botón Eliminar -->
                                        <button 
                                            onclick="confirmarEliminar(${u.id}, '${escapeHtml(u.nombre)}')"
                                            class="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors border border-rose-200"
                                            title="Eliminar usuario y test de la base de datos"
                                        >
                                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `;
                    }).join('');
                }
            } catch (err) {
                console.error('Error al cargar lista de usuarios:', err);
                tbody.innerHTML = `<tr><td colspan="7" class="p-6 text-center text-rose-500 font-bold">Error al conectar con api/admin_usuarios.php en el servidor.</td></tr>`;
            }
        }

        // 3. Abrir Modal de Detalle con Respuestas Específicas
        async function abrirModalDetalle(usuarioId) {
            const modal = document.getElementById('modal-detalle-usuario');
            const cont = document.getElementById('modal-contenido');
            modal.classList.remove('hidden');

            cont.innerHTML = `
                <div class="p-8 text-center text-purple-700 font-semibold flex items-center justify-center gap-2">
                    <svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                    <span>Cargando respuestas y resultados desde MySQL...</span>
                </div>
            `;

            try {
                const res = await fetch(`../api/admin_detalle_usuario.php?id=${usuarioId}`);
                const data = await res.json();

                if (!data.success) {
                    cont.innerHTML = `<p class="p-4 text-center text-rose-600 font-bold">${data.error || 'Error al obtener detalle.'}</p>`;
                    return;
                }

                const u = data.usuario;
                const p = data.progreso;
                const r = data.resultado_final;
                const preguntas = data.preguntas_respuestas || [];

                document.getElementById('modal-user-avatar').innerText = u.nombre.charAt(0).toUpperCase();
                document.getElementById('modal-user-nombre').innerText = u.nombre;
                document.getElementById('modal-user-sub').innerText = `${u.email} • ${u.ciudad} • ${u.edad ? u.edad + ' años' : 'Edad no indicada'}`;

                let htmlResultado = '';
                if (r) {
                    const carreras = r.carreras_sugeridas || [];
                    htmlResultado = `
                        <div class="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 space-y-3">
                            <div class="flex items-center justify-between">
                                <span class="text-xs font-bold uppercase tracking-wider text-purple-800">Resultado Vocacional Oficial</span>
                                <span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-purple-700 text-white font-mono">
                                    Perfil Holland: ${r.perfil_holland}
                                </span>
                            </div>

                            <!-- Puntajes RIASEC -->
                            <div class="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs pt-1">
                                ${['R', 'I', 'A', 'S', 'E', 'C'].map(dim => `
                                    <div class="p-2 rounded-xl bg-white border border-purple-100 shadow-xs">
                                        <p class="font-bold text-slate-500 text-[10px]">${dim}</p>
                                        <p class="font-extrabold text-purple-900 font-mono text-sm">${r.puntajes[dim] || 0}%</p>
                                    </div>
                                `).join('')}
                            </div>

                            <!-- Carreras Sugeridas -->
                            <div class="space-y-1.5 pt-2">
                                <p class="text-[11px] font-bold text-slate-700">Carreras Recomendadas según sus respuestas:</p>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    ${carreras.map(c => `
                                        <div class="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs">
                                            <div>
                                                <p class="font-bold text-slate-800">${escapeHtml(c.nombre)}</p>
                                                <p class="text-[10px] text-slate-400">${escapeHtml(c.area)}</p>
                                            </div>
                                            <span class="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 font-bold font-mono text-[10px]">
                                                ${c.afinidad}% afín
                                            </span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    htmlResultado = `
                        <div class="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
                            <span>⚠️ El estudiante aún no ha completado el 100% de las preguntas. Su perfil vocacional se calculará al finalizar.</span>
                        </div>
                    `;
                }

                // Generar tabla de preguntas respondidas
                let htmlPreguntas = `
                    <div class="space-y-2">
                        <div class="flex items-center justify-between">
                            <h4 class="font-bold text-sm text-slate-800">Desglose de Preguntas & Respuestas (${preguntas.length})</h4>
                            <span class="text-xs text-slate-500">Escala 1 (Nada afín) a 5 (Totalmente afín)</span>
                        </div>
                        <div class="max-h-64 overflow-y-auto rounded-2xl border border-slate-200 divide-y divide-slate-100">
                            ${preguntas.map((q, idx) => `
                                <div class="p-3 flex items-start justify-between gap-3 hover:bg-slate-50 text-xs">
                                    <div class="space-y-0.5">
                                        <div class="flex items-center gap-2">
                                            <span class="font-bold text-purple-700">#${idx + 1}</span>
                                            <span class="px-1.5 py-0.2 rounded-sm text-[9px] font-bold bg-slate-100 text-slate-700 font-mono">RIASEC: ${q.codigo_riasec}</span>
                                            <span class="text-[10px] text-slate-400 font-medium">${escapeHtml(q.etapa_titulo)}</span>
                                        </div>
                                        <p class="text-slate-800 font-medium leading-snug">${escapeHtml(q.texto_pregunta)}</p>
                                    </div>
                                    <div class="text-right shrink-0">
                                        ${q.respondida ? `
                                            <span class="inline-block px-2.5 py-1 rounded-xl text-xs font-bold font-mono bg-purple-100 text-purple-900 border border-purple-200">
                                                Respuesta: ${q.valor_respuesta} / 5
                                            </span>
                                            <p class="text-[10px] text-slate-400 mt-0.5">${q.etiqueta_respuesta}</p>
                                        ` : `
                                            <span class="inline-block px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-100 text-slate-400">
                                                Sin responder
                                            </span>
                                        `}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;

                cont.innerHTML = `
                    ${htmlResultado}
                    ${htmlPreguntas}
                `;
            } catch (err) {
                console.error('Error al abrir detalle:', err);
                cont.innerHTML = `<p class="p-4 text-center text-rose-600 font-bold">Error de conexión al cargar datos.</p>`;
            }
        }

        function cerrarModalDetalle() {
            document.getElementById('modal-detalle-usuario').classList.add('hidden');
        }

        // 4. Ejecutar Acciones Administrativas (Cambiar Estado / Rol / Eliminar)
        async function ejecutarAccion(usuarioId, accion) {
            try {
                const res = await fetch('../api/admin_acciones_usuario.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ usuario_id: usuarioId, accion })
                });
                const data = await res.json();

                if (data.success) {
                    mostrarToast(data.message, 'success');
                    recargarDashboard();
                } else {
                    mostrarToast(data.error || 'No se pudo realizar la acción.', 'error');
                }
            } catch (err) {
                mostrarToast('Error al conectar con el servidor.', 'error');
            }
        }

        function confirmarEliminar(usuarioId, nombre) {
            if (confirm(`¿Estás seguro de que deseas eliminar permanentemente a "${nombre}" y todo su progreso vocacional de la base de datos MySQL?`)) {
                ejecutarAccion(usuarioId, 'eliminar');
            }
        }

        // Helpers
        function escapeHtml(text) {
            if (!text) return '';
            return text.replace(/[&<>"']/g, m => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            }[m]));
        }

        function formatDate(dateStr) {
            if (!dateStr) return '--';
            try {
                const d = new Date(dateStr);
                return d.toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' });
            } catch (_) {
                return dateStr;
            }
        }

        function mostrarToast(mensaje, tipo = 'success') {
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            const bg = tipo === 'success' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white';
            toast.className = `px-4 py-3 rounded-2xl shadow-lg text-xs font-bold flex items-center gap-2 ${bg} animate-in slide-in-from-bottom-2 transition-all duration-300`;
            toast.innerHTML = `<span>${mensaje}</span>`;
            container.appendChild(toast);

            setTimeout(() => {
                toast.classList.add('opacity-0', 'translate-y-2');
                setTimeout(() => toast.remove(), 300);
            }, 3500);
        }
    </script>
</body>
</html>
