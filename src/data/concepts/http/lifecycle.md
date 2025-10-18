The Utopia HTTP request lifecycle is a well-defined process that handles every incoming request through multiple stages. Understanding this flow is crucial for implementing features like logging, authentication, error handling, and performance monitoring.

The lifecycle consists of: server initialization, request parsing, route matching, parameter validation, hook execution, action execution, and response generation. Each stage provides opportunities for customization and monitoring.

## Server initialization

The first stage involves setting up the HTTP server with the appropriate adapter and dependency injection container.

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Adapter\Swoole\Server;
use Utopia\DI\Container;

// Create server adapter
$server = new Server('0.0.0.0', 8000);

// Set up dependency injection container
$container = new Container();

// Initialize HTTP application
$http = new Http($server, $container, 'America/New_York');
```

## Init hooks

Init hooks run before route processing and are perfect for logging, authentication, and request preprocessing.

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Request;

// Log all incoming requests
Http::init()
    ->inject('request')
    ->action(function(Request $request) {
        error_log('Request started: ' . $request->getMethod() . ' ' . $request->getURI());
        
        // Set request start time for performance monitoring
        $request->setAttribute('startTime', microtime(true));
    });
```

## Route definition and validation

Routes define your API endpoints with automatic parameter validation and type safety.

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Request;
use Utopia\Http\Response;
use Utopia\Validator\Text;

// Define route with parameter validation
Http::get('/users/{id}')
    ->param('id', '', new Text(36), 'User ID')
    ->inject('request')
    ->inject('response')
    ->action(function(string $id, Request $request, Response $response) {
        // Action execution - your business logic here
        $response->json(['user' => ['id' => $id]]);
    });
```

## Shutdown hooks

Shutdown hooks run after response generation and are ideal for cleanup, logging, and adding response headers.

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Request;
use Utopia\Http\Response;

// Log response details and add headers
Http::shutdown()
    ->inject('request')
    ->inject('response')
    ->action(function(Request $request, Response $response) {
        // Calculate request duration
        $startTime = $request->getAttribute('startTime');
        $duration = microtime(true) - $startTime;
        
        error_log('Response: ' . $response->getStatusCode() . ' (' . $duration . 's)');
        
        // Add CORS headers
        $response->addHeader('Access-Control-Allow-Origin', '*');
    });
```

## Error handling

Error hooks provide centralized exception handling with appropriate HTTP status codes.

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Request;
use Utopia\Http\Response;

// Global error handler
Http::error()
    ->inject('error')
    ->inject('request')
    ->inject('response')
    ->action(function(\Throwable $error, Request $request, Response $response) {
        // Log error details
        error_log('Error: ' . $error->getMessage() . ' in ' . $error->getFile() . ':' . $error->getLine());
        
        // Return appropriate error response
        $response->setStatusCode(500)->json(['error' => 'Internal Server Error']);
    });
```

## Complete example

Here's a complete example showing all lifecycle stages working together:

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Request;
use Utopia\Http\Response;
use Utopia\Http\Adapter\Swoole\Server;
use Utopia\DI\Container;
use Utopia\Validator\Text;

// 1. Server initialization
$server = new Server('0.0.0.0', 8000);
$container = new Container();
$http = new Http($server, $container, 'America/New_York');

// 2. Init hooks (before route processing)
Http::init()
    ->inject('request')
    ->action(function(Request $request) {
        error_log('Request started: ' . $request->getMethod() . ' ' . $request->getURI());
        $request->setAttribute('startTime', microtime(true));
    });

// 3. Route definition with validation
Http::get('/users/{id}')
    ->param('id', '', new Text(36), 'User ID')
    ->inject('request')
    ->inject('response')
    ->action(function(string $id, Request $request, Response $response) {
        // 4. Action execution
        $response->json(['user' => ['id' => $id]]);
    });

// 5. Shutdown hooks (after response)
Http::shutdown()
    ->inject('response')
    ->action(function(Response $response) {
        error_log('Response sent: ' . $response->getStatusCode());
    });

// 6. Error handling
Http::error()
    ->inject('error')
    ->inject('response')
    ->action(function(\Throwable $error, Response $response) {
        $response->setStatusCode(500)->json(['error' => 'Internal Server Error']);
    });

// 7. Start the server
$http->start();
```

## Additional Information

The lifecycle provides clear separation of concerns, allowing you to implement cross-cutting functionality at the appropriate stage. Init hooks run before route processing, shutdown hooks run after response generation, and error hooks handle exceptions throughout the process.
