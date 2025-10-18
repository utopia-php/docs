Hooks in Utopia HTTP allow you to inject custom logic at various points in the request lifecycle. They provide a way to implement cross-cutting concerns like logging, authentication, error handling, and performance monitoring.

The hook system supports three types of hooks: init hooks (before route processing), shutdown hooks (after response generation), and error hooks (for exception handling). Hooks can be applied globally or to specific route groups.

## Code Example

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Request;
use Utopia\Http\Response;

// Init hooks - run before route processing
Http::init()
    ->inject('request')
    ->action(function(Request $request) {
        // Log all incoming requests
        error_log('Request: ' . $request->getMethod() . ' ' . $request->getURI());
        
        // Set request start time for performance monitoring
        $request->setAttribute('startTime', microtime(true));
    });

// Init hook for API routes only
Http::init()
    ->groups(['api'])
    ->inject('request')
    ->inject('response')
    ->action(function(Request $request, Response $response) {
        // API key validation
        $apiKey = $request->getHeader('X-API-Key');
        if (!$apiKey || !validateApiKey($apiKey)) {
            $response->setStatusCode(401)->json(['error' => 'Invalid API key']);
            return;
        }
    });

// Shutdown hooks - run after response generation
Http::shutdown()
    ->inject('request')
    ->inject('response')
    ->action(function(Request $request, Response $response) {
        // Log response details
        $startTime = $request->getAttribute('startTime');
        $duration = microtime(true) - $startTime;
        error_log('Response: ' . $response->getStatusCode() . ' (' . $duration . 's)');
        
        // Add CORS headers
        $response->addHeader('Access-Control-Allow-Origin', '*');
        $response->addHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    });

// Error hooks - handle exceptions
Http::error()
    ->inject('error')
    ->inject('request')
    ->inject('response')
    ->action(function(\Throwable $error, Request $request, Response $response) {
        // Log error details
        error_log('Error: ' . $error->getMessage() . ' in ' . $error->getFile() . ':' . $error->getLine());
        
        // Return appropriate error response
        $response->setStatusCode(500);
        $response->json(['error' => 'Internal Server Error']);
    });
```

## Additional Information

Hooks provide a clean way to implement cross-cutting concerns without cluttering your route handlers. They support dependency injection and can be applied globally or to specific route groups, making them perfect for authentication, logging, and error handling.
