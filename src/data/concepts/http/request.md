The Request class in Utopia HTTP provides a comprehensive interface for accessing HTTP request data including headers, query parameters, body content, and file uploads. It follows PSR-7 standards while providing additional convenience methods for common operations.

The Request object is automatically injected into all route actions and hooks, giving you access to all request information in a type-safe manner. It includes methods for accessing different types of request data and supports both simple and complex request structures.

## Basic request information

Access fundamental request data like HTTP method, URI, and path information.

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Request;
use Utopia\Http\Response;

Http::get('/users')
    ->inject('request')
    ->inject('response')
    ->action(function(Request $request, Response $response) {
        // HTTP method and URI
        $method = $request->getMethod(); // GET, POST, etc.
        $uri = $request->getURI(); // /users?page=1
        $path = $request->getPath(); // /users
        
        $response->json([
            'method' => $method,
            'path' => $path,
            'uri' => $uri
        ]);
    });
```

## Query parameters

Retrieve and validate query parameters with default values and type safety.

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Request;
use Utopia\Http\Response;

Http::get('/users')
    ->inject('request')
    ->inject('response')
    ->action(function(Request $request, Response $response) {
        // Query parameters with defaults
        $page = $request->getQuery('page', 1);
        $limit = $request->getQuery('limit', 10);
        $search = $request->getQuery('search', '');
        
        // Check if parameter exists
        if ($request->hasQuery('filter')) {
            $filter = $request->getQuery('filter');
        }
        
        $response->json([
            'page' => $page,
            'limit' => $limit,
            'search' => $search
        ]);
    });
```

## Request headers

Access HTTP headers for authentication, content type, and custom headers.

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Request;
use Utopia\Http\Response;

Http::get('/api/data')
    ->inject('request')
    ->inject('response')
    ->action(function(Request $request, Response $response) {
        // Common headers
        $userAgent = $request->getHeader('User-Agent', 'Unknown');
        $contentType = $request->getHeader('Content-Type');
        $authorization = $request->getHeader('Authorization');
        
        // Custom headers
        $apiKey = $request->getHeader('X-API-Key');
        $requestId = $request->getHeader('X-Request-ID');
        
        $response->json([
            'userAgent' => $userAgent,
            'hasAuth' => !empty($authorization),
            'apiKey' => $apiKey
        ]);
    });
```

## Request attributes

Access custom attributes set by hooks or middleware throughout the request lifecycle.

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Request;
use Utopia\Http\Response;

Http::get('/profile')
    ->inject('request')
    ->inject('response')
    ->action(function(Request $request, Response $response) {
        // Attributes set by hooks
        $userId = $request->getAttribute('userId');
        $startTime = $request->getAttribute('startTime');
        $userRole = $request->getAttribute('userRole');
        
        // Check if attribute exists
        if ($request->hasAttribute('userId')) {
            $response->json(['userId' => $userId]);
        } else {
            $response->setStatusCode(401)->json(['error' => 'Unauthorized']);
        }
    });
```

## POST request body

Handle POST requests with JSON payloads and form data.

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Request;
use Utopia\Http\Response;

Http::post('/users')
    ->inject('request')
    ->inject('response')
    ->action(function(Request $request, Response $response) {
        // Get raw body
        $body = $request->getBody();
        
        // Get parsed payload (JSON/array)
        $payload = $request->getPayload();
        
        // Access specific fields
        $name = $request->getPayload('name');
        $email = $request->getPayload('email');
        
        // Validate required fields
        if ($request->hasPayload('name') && $request->hasPayload('email')) {
            $user = createUser($name, $email);
            $response->json($user, 201);
        } else {
            $response->setStatusCode(400)->json(['error' => 'Missing required fields']);
        }
    });
```

## File uploads

Handle file uploads with validation and secure storage.

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Request;
use Utopia\Http\Response;

Http::post('/upload')
    ->inject('request')
    ->inject('response')
    ->action(function(Request $request, Response $response) {
        $files = $request->getFiles();
        
        if (empty($files)) {
            $response->setStatusCode(400)->json(['error' => 'No files uploaded']);
            return;
        }
        
        $uploadedFiles = [];
        
        foreach ($files as $file) {
            // Validate file
            if ($file->getSize() > 5 * 1024 * 1024) { // 5MB limit
                continue;
            }
            
            // Generate secure filename
            $filename = uniqid() . '_' . $file->getName();
            $uploadPath = '/uploads/' . $filename;
            
            if ($file->moveTo($uploadPath)) {
                $uploadedFiles[] = [
                    'originalName' => $file->getName(),
                    'filename' => $filename,
                    'size' => $file->getSize(),
                    'type' => $file->getType()
                ];
            }
        }
        
        $response->json(['files' => $uploadedFiles]);
    });
```

## Complete example

Here's a complete example showing various request handling patterns:

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Request;
use Utopia\Http\Response;

// GET request with query parameters and headers
Http::get('/users')
    ->inject('request')
    ->inject('response')
    ->action(function(Request $request, Response $response) {
        $page = $request->getQuery('page', 1);
        $limit = $request->getQuery('limit', 10);
        $userAgent = $request->getHeader('User-Agent', 'Unknown');
        
        $response->json([
            'method' => $request->getMethod(),
            'path' => $request->getPath(),
            'page' => $page,
            'limit' => $limit,
            'userAgent' => $userAgent
        ]);
    });

// POST request with JSON payload
Http::post('/users')
    ->inject('request')
    ->inject('response')
    ->action(function(Request $request, Response $response) {
        $name = $request->getPayload('name');
        $email = $request->getPayload('email');
        
        if ($request->hasPayload('name') && $request->hasPayload('email')) {
            $user = createUser($name, $email);
            $response->json($user, 201);
        } else {
            $response->setStatusCode(400)->json(['error' => 'Missing required fields']);
        }
    });

// File upload endpoint
Http::post('/upload')
    ->inject('request')
    ->inject('response')
    ->action(function(Request $request, Response $response) {
        $files = $request->getFiles();
        
        foreach ($files as $file) {
            $filename = uniqid() . '_' . $file->getName();
            $file->moveTo('/uploads/' . $filename);
        }
        
        $response->json(['message' => 'Files uploaded successfully']);
    });
```

## Additional Information

The Request class provides comprehensive access to all HTTP request data with type safety and convenience methods. It automatically handles content parsing and provides both raw and processed access to request data.
