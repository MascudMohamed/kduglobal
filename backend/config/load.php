<?php

declare(strict_types=1);

/**
 * Configuration for local (env.local.php) and production (Railway env vars).
 */
return (static function (): array {
    $host = getenv('MYSQLHOST') ?: getenv('MYSQL_HOST') ?: getenv('DB_HOST') ?: '';
    $port = (int) (getenv('MYSQLPORT') ?: getenv('MYSQL_PORT') ?: getenv('DB_PORT') ?: '3306');
    $name = getenv('MYSQLDATABASE') ?: getenv('MYSQL_DATABASE') ?: getenv('DB_NAME') ?: '';
    $user = getenv('MYSQLUSER') ?: getenv('MYSQL_USER') ?: getenv('DB_USER') ?: '';
    $pass = getenv('MYSQLPASSWORD') ?: getenv('MYSQL_PASSWORD') ?: getenv('DB_PASS') ?: '';

    if ($host !== '' && $name !== '') {
        $corsRaw = getenv('CORS_ORIGINS') ?: '';
        $fromEnv = $corsRaw !== ''
            ? array_values(array_filter(array_map('trim', explode(',', $corsRaw))))
            : [];
        $devDefaults = [
            'http://localhost:8080',
            'http://127.0.0.1:8080',
            'http://localhost:5500',
            'http://127.0.0.1:5500',
            'http://localhost',
            'http://127.0.0.1',
        ];
        $cors = array_values(array_unique(array_merge($fromEnv, $devDefaults)));

        return [
            'APP_ENV' => getenv('APP_ENV') ?: 'production',
            'APP_DEBUG' => filter_var(getenv('APP_DEBUG') ?: 'false', FILTER_VALIDATE_BOOLEAN),
            'DB_HOST' => $host,
            'DB_PORT' => $port,
            'DB_NAME' => $name,
            'DB_USER' => $user,
            'DB_PASS' => $pass,
            'DB_CHARSET' => 'utf8mb4',
            'CORS_ORIGINS' => $cors,
        ];
    }

    $local = __DIR__ . '/env.local.php';
    if (is_readable($local)) {
        /** @var array $cfg */
        $cfg = require $local;
        return $cfg;
    }

    return [
        'APP_ENV' => 'development',
        'APP_DEBUG' => true,
        'DB_HOST' => '',
        'DB_PORT' => 3306,
        'DB_NAME' => '',
        'DB_USER' => '',
        'DB_PASS' => '',
        'DB_CHARSET' => 'utf8mb4',
        'CORS_ORIGINS' => [
            'http://localhost:8080',
            'http://127.0.0.1:8080',
            'http://localhost:5500',
            'http://127.0.0.1:5500',
            'http://localhost',
        ],
    ];
})();
