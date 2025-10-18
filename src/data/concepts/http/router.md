The Router class in Utopia HTTP manages route registration, URL pattern matching, and request dispatching. It provides a programmatic way to define routes and handle complex routing scenarios.

The router supports route parameters, pattern matching, and automatic dependency injection. It can be used alongside the fluent HTTP API or as a standalone routing system for more complex applications.

## Code Example

```php
<?php

use Utopia\Http\Router;
use Utopia\Http\Route;
use Utopia\Http\Request;
use Utopia\Http\Response;
use Utopia\Validator\Text;

// Create router instance
$router = new Router();

// Register routes programmatically
$router->addRoute(new Route('GET', '/users', function(Request $request, Response $response) {
    $response->json(['users' => []]);
}));

// Add route with parameters
$userRoute = new Route('GET', '/users/{id}');
$userRoute->param('id', '', new Text(36), 'User ID');
$userRoute->action(function(string $id, Request $request, Response $response) {
    $response->json(['user' => ['id' => $id]]);
});
$router->addRoute($userRoute);

// Match request against routes
$request = new Request('GET', '/users/123', [], [], []);
$route = $router->match($request);

if ($route) {
    // Execute the matched route
    $response = new Response();
    $route->execute($request, $response);
} else {
    // Handle 404
    $response = new Response();
    $response->setStatusCode(404)->json(['error' => 'Not found']);
}
```

## Additional Information

The Router class provides programmatic route management with support for complex routing patterns and parameter validation. It can be used standalone or integrated with the fluent HTTP API for maximum flexibility.
