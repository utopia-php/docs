The Response class in Utopia HTTP provides a comprehensive interface for building and sending HTTP responses including JSON, HTML, file downloads, and redirects. It follows PSR-7 standards while providing additional convenience methods for common response types.

The Response object is automatically injected into all route actions and hooks, giving you full control over the HTTP response. It includes methods for setting status codes, headers, and different response body types.

## JSON responses

The most common response type for APIs, with automatic content-type headers and status codes.

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Response;

// Simple JSON response (default 200 status)
Http::get('/users')
    ->inject('response')
    ->action(function(Response $response) {
        $users = ['users' => [
            ['id' => 1, 'name' => 'John Doe'],
            ['id' => 2, 'name' => 'Jane Smith']
        ]];

        $response->json($users);
    });

// JSON with custom status code
Http::post('/users')
    ->inject('response')
    ->action(function(Response $response) {
        $user = ['id' => 3, 'name' => 'Bob Johnson'];
        $response->json($user, 201); // Created
    });
```

## Status codes and error responses

Control HTTP status codes for different scenarios and error handling.

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Request;
use Utopia\Http\Response;

Http::post('/users')
    ->inject('request')
    ->inject('response')
    ->action(function(Request $request, Response $response) {
        $user = createUser($request->getPayload());

        if ($user) {
            $response->json($user, 201); // Created
        } else {
            $response->setStatusCode(400)->json(['error' => 'Invalid data']);
        }
    });

// Different error status codes
Http::get('/users/{id}')
    ->inject('response')
    ->action(function(string $id, Response $response) {
        $user = getUserById($id);

        if (!$user) {
            $response->setStatusCode(404)->json(['error' => 'User not found']);
            return;
        }

        $response->json($user);
    });
```

## Custom headers

Add custom headers for caching, CORS, and other HTTP features.

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Response;

Http::get('/api/data')
    ->inject('response')
    ->action(function(Response $response) {
        // Cache headers
        $response->addHeader('Cache-Control', 'public, max-age=3600');
        $response->addHeader('ETag', '"abc123"');

        // CORS headers
        $response->addHeader('Access-Control-Allow-Origin', '*');
        $response->addHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

        // Custom headers
        $response->addHeader('X-API-Version', '1.0');
        $response->addHeader('X-Rate-Limit', '1000');

        $response->json(['data' => 'cached data']);
    });
```

## HTML responses

Serve HTML content for web pages and documentation.

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Response;

Http::get('/about')
    ->inject('response')
    ->action(function(Response $response) {
        $html = '<!DOCTYPE html>
<html>
<head>
    <title>About Us</title>
</head>
<body>
    <h1>About Our API</h1>
    <p>Welcome to our Utopia HTTP API!</p>
</body>
</html>';

        $response->html($html);
    });
```

## File downloads

Serve files for download with proper content types and headers.

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Response;
use Utopia\Validator\Text;

Http::get('/download/{filename}')
    ->param('filename', '', new Text(255), 'File name')
    ->inject('response')
    ->action(function(string $filename, Response $response) {
        $filePath = '/uploads/' . $filename;

        if (file_exists($filePath)) {
            // Determine content type
            $contentType = mime_content_type($filePath);

            // Set download headers
            $response->addHeader('Content-Disposition', 'attachment; filename="' . $filename . '"');
            $response->addHeader('Content-Length', filesize($filePath));

            $response->file($filePath, $contentType);
        } else {
            $response->setStatusCode(404)->json(['error' => 'File not found']);
        }
    });
```

## Redirects

Handle URL redirects for SEO and user experience.

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Response;

// Permanent redirect (301)
Http::get('/old-page')
    ->inject('response')
    ->action(function(Response $response) {
        $response->redirect('/new-page', 301);
    });

// Temporary redirect (302)
Http::get('/login')
    ->inject('response')
    ->action(function(Response $response) {
        $response->redirect('/auth/login', 302);
    });
```

## Streaming responses

Stream large responses or real-time data to clients.

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Response;

Http::get('/stream')
    ->inject('response')
    ->action(function(Response $response) {
        // Set streaming headers
        $response->addHeader('Content-Type', 'text/plain');
        $response->addHeader('Transfer-Encoding', 'chunked');
        $response->addHeader('Cache-Control', 'no-cache');

        // Stream data in chunks
        for ($i = 0; $i < 10; $i++) {
            $response->write("Chunk $i\n");
            flush();
            sleep(1);
        }

        $response->end();
    });
```

## Complete example

Here's a complete example showing various response patterns:

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Request;
use Utopia\Http\Response;
use Utopia\Validator\Text;

// JSON API response
Http::get('/api/users')
    ->inject('response')
    ->action(function(Response $response) {
        $response->addHeader('Cache-Control', 'public, max-age=300');
        $response->json(['users' => []]);
    });

// Error response
Http::post('/api/users')
    ->inject('request')
    ->inject('response')
    ->action(function(Request $request, Response $response) {
        if (empty($request->getPayload())) {
            $response->setStatusCode(400)->json(['error' => 'Invalid data']);
            return;
        }

        $response->json(['message' => 'User created'], 201);
    });

// File download
Http::get('/download/{file}')
    ->param('file', '', new Text(255), 'File name')
    ->inject('response')
    ->action(function(string $file, Response $response) {
        $path = '/files/' . $file;
        if (file_exists($path)) {
            $response->file($path);
        } else {
            $response->setStatusCode(404)->json(['error' => 'Not found']);
        }
    });
```

## Additional Information

The Response class provides comprehensive control over HTTP responses with support for various content types, status codes, headers, and streaming. It automatically handles content encoding and provides convenient methods for common response patterns.
