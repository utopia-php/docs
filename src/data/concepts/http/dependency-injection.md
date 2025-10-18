Dependency injection in Utopia HTTP is handled through the Utopia DI container, which manages class dependencies and provides them to routes and hooks. This system promotes loose coupling and makes your code more testable and maintainable.

The DI system supports both singleton and transient dependencies, with automatic resolution of constructor parameters. Dependencies can be injected into routes, hooks, and other dependencies, creating a flexible and powerful system for managing application state.

## Code Example

```php
<?php

use Utopia\Http\Http;
use Utopia\DI\Container;
use Utopia\DI\Dependency;
use Utopia\Http\Request;
use Utopia\Http\Response;

// Create container
$container = new Container();

// Register singleton dependencies
$database = new Dependency();
$database->setName('database')
    ->setCallback(fn() => new Database('mysql:host=localhost;dbname=app'));
$container->set($database);

// Register transient dependencies
$logger = new Dependency();
$logger->setName('logger')
    ->setCallback(fn() => new Logger());
$container->set($logger);

// Register dependency with parameters
$userService = new Dependency();
$userService->setName('userService')
    ->inject('database')
    ->inject('logger')
    ->setCallback(fn(Database $db, Logger $logger) => new UserService($db, $logger));
$container->set($userService);

// Inject dependencies into routes
Http::get('/users')
    ->inject('userService')
    ->inject('request')
    ->inject('response')
    ->action(
        function(UserService $userService, Request $request, Response $response) {
            $users = $userService->getAllUsers();
            $response->json($users);
        }
    );

// Inject into hooks
Http::init()
    ->inject('logger')
    ->action(function(Logger $logger) {
        $logger->info('Application initialized');
    });
```

## Additional Information

The dependency injection system provides a clean way to manage application dependencies and promote loose coupling. It supports both singleton and transient dependencies with automatic parameter resolution, making your code more testable and maintainable.
