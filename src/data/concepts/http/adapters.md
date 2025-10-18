Adapters in Utopia HTTP provide different server implementations for various deployment environments. They handle the low-level HTTP server functionality while providing a unified interface for your application.

The adapter system supports multiple server implementations including Swoole (high performance), FPM (traditional PHP), and ReactPHP (event-driven). Each adapter is optimized for specific use cases and deployment scenarios.

## Code Example

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Adapter\Swoole\Server as SwooleServer;
use Utopia\Http\Adapter\FPM\Server as FPMServer;
use Utopia\Http\Adapter\ReactPHP\Server as ReactPHPServer;
use Utopia\DI\Container;

// Swoole adapter (High Performance)
// Best for: Production environments, high concurrency, microservices
$swooleServer = new SwooleServer('0.0.0.0', 8000, [
    'open_http2_protocol' => true,
    'open_websocket_protocol' => true,
    'worker_num' => 4,
    'max_request' => 10000
]);

$http = new Http($swooleServer, new Container(), 'America/New_York');
$http->start();

// FPM adapter (Traditional PHP)
// Best for: Shared hosting, traditional deployments, compatibility
$fpmServer = new FPMServer();
$http = new Http($fpmServer, new Container(), 'America/New_York');
$http->start();

// ReactPHP adapter (Event-driven)
// Best for: Event-driven applications, real-time features, custom protocols
$reactServer = new ReactPHPServer('0.0.0.0', 8000);
$http = new Http($reactServer, new Container(), 'America/New_York');
$http->start();

// Environment-based adapter selection
function createServer(): ServerInterface
{
    $environment = $_ENV['APP_ENV'] ?? 'development';

    switch ($environment) {
        case 'production':
            // Use Swoole for production
            return new SwooleServer('0.0.0.0', 8000, [
                'worker_num' => swoole_cpu_num() * 2,
                'max_request' => 10000,
                'open_http2_protocol' => true
            ]);

        case 'testing':
            // Use FPM for testing
            return new FPMServer();

        case 'development':
        default:
            // Use ReactPHP for development
            return new ReactPHPServer('127.0.0.1', 8000);
    }
}

// Create server based on environment
$server = createServer();
$http = new Http($server, new Container(), 'America/New_York');
$http->start();

// Custom adapter configuration
$swooleConfig = [
    'worker_num' => 8,              // Number of worker processes
    'max_request' => 10000,         // Max requests per worker
    'open_http2_protocol' => true,  // Enable HTTP/2
    'open_websocket_protocol' => true, // Enable WebSocket
    'heartbeat_check_interval' => 30,  // Heartbeat interval
    'heartbeat_idle_time' => 60,       // Heartbeat idle time
    'max_conn' => 10000,               // Max connections
    'buffer_output_size' => 32 * 1024 * 1024, // 32MB buffer
    'package_max_length' => 8 * 1024 * 1024   // 8MB max package
];

$customSwooleServer = new SwooleServer('0.0.0.0', 8000, $swooleConfig);
$http = new Http($customSwooleServer, new Container(), 'America/New_York');
$http->start();
```

## Additional Information

Adapters provide different server implementations optimized for various deployment scenarios. Swoole offers the best performance for production, FPM provides maximum compatibility, and ReactPHP enables event-driven architectures.
