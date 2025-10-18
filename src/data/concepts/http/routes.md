Routes in Utopia HTTP define the endpoints of your application and how they should be handled. Each route specifies an HTTP method, URL pattern, parameter validation, and an action function that processes the request.

The routing system provides a fluent API for defining routes with built-in parameter validation, dependency injection, and middleware support. This declarative approach ensures type safety and prevents common security vulnerabilities.

## Code Example

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Request;
use Utopia\Http\Response;
use Utopia\Validator\Text;
use Utopia\Validator\Email;
use Utopia\Validator\Integer;

// Simple GET route
Http::get('/users')
    ->inject('request')
    ->inject('response')
    ->action(
        function(Request $request, Response $response) {
            $response->json(['users' => []]);
        }
    );

// POST route with validated parameters
Http::post('/users')
    ->param('name', '', new Text(100), 'User name')
    ->param('email', '', new Email(), 'User email')
    ->param('age', 0, new Integer(18, 120), 'User age')
    ->inject('request')
    ->inject('response')
    ->action(
        function(string $name, string $email, int $age, Request $request, Response $response) {
            // Parameters are already validated and typed
            $user = createUser($name, $email, $age);
            $response->json($user, 201);
        }
    );

// Route with URL parameters
Http::get('/users/{id}')
    ->param('id', '', new Text(36), 'User ID')
    ->inject('request')
    ->inject('response')
    ->action(
        function(string $id, Request $request, Response $response) {
            $user = getUserById($id);
            if (!$user) {
                $response->setStatusCode(404)->json(['error' => 'User not found']);
                return;
            }
            $response->json($user);
        }
    );

// Route groups for organization
Http::get('/api/v1/users')
    ->groups(['api', 'v1'])
    ->inject('response')
    ->action(function(Response $response) {
        $response->json(['version' => 'v1', 'users' => []]);
    });
```

## Additional Information

Routes provide a declarative way to define API endpoints with automatic parameter validation and type safety. The fluent API makes it easy to create complex routing patterns while maintaining clean, readable code.
