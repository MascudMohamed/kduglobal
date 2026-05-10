<?php

declare(strict_types=1);

/**
 * Slim bootstrap for health + newsletter API (Railway + XAMPP).
 * Uses config/load.php (MYSQL* env vars or config/env.local.php).
 */

header('Content-Type: application/json; charset=utf-8');

$config = require dirname(__DIR__) . '/config/load.php';

/**
 * CORS: this API does not use cookies/credentials on fetch(), so `*` is safe and avoids
 * brittle Origin allow-list mismatches (Live Server ports, Vercel preview URLs, etc.).
 * Set CORS_STRICT=1 (and CORS_ORIGINS) to restrict origins again.
 */
$strict = filter_var(getenv('CORS_STRICT') ?: 'false', FILTER_VALIDATE_BOOLEAN);
if ($strict) {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowed = $config['CORS_ORIGINS'] ?? [];
    if ($origin !== '' && in_array($origin, $allowed, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
    }
} else {
    header('Access-Control-Allow-Origin: *');
}

header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

/**
 * @return array<string, mixed>
 */
function kdu_cfg(): array
{
    static $c;
    if ($c === null) {
        $c = require dirname(__DIR__) . '/config/load.php';
    }
    return $c;
}

function kdu_pdo(): ?PDO
{
    $c = kdu_cfg();
    if (($c['DB_HOST'] ?? '') === '' || ($c['DB_NAME'] ?? '') === '') {
        return null;
    }
    $dsn = sprintf(
        'mysql:host=%s;port=%d;dbname=%s;charset=%s',
        $c['DB_HOST'],
        (int) $c['DB_PORT'],
        $c['DB_NAME'],
        $c['DB_CHARSET'] ?? 'utf8mb4'
    );
    try {
        return new PDO($dsn, (string) $c['DB_USER'], (string) $c['DB_PASS'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    } catch (Throwable) {
        return null;
    }
}
