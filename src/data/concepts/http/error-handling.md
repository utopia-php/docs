Error handling in Utopia HTTP provides comprehensive exception management with global and route-specific error handlers. The system ensures consistent error responses while providing detailed logging and debugging information.

The error handling system supports custom exception classes, global error handlers, and route-specific error handling. It automatically logs errors and provides appropriate HTTP status codes and error messages.

## Code Example

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

        // Determine error type and response
        if ($error instanceof \InvalidArgumentException) {
            $response->setStatusCode(400)->json([
                'error' => 'Bad Request',
                'message' => $error->getMessage()
            ]);
        } elseif ($error instanceof \RuntimeException) {
            $response->setStatusCode(500)->json([
                'error' => 'Internal Server Error',
                'message' => 'An unexpected error occurred'
            ]);
        } else {
            $response->setStatusCode(500)->json([
                'error' => 'Internal Server Error',
                'message' => 'An unexpected error occurred'
            ]);
        }
    });

// API-specific error handler
Http::error()
    ->groups(['api'])
    ->inject('error')
    ->inject('response')
    ->action(function(\Throwable $error, Response $response) {
        // API errors should be more detailed
        $response->setStatusCode(500)->json([
            'error' => 'API Error',
            'message' => $error->getMessage(),
            'code' => $error->getCode(),
            'timestamp' => date('c')
        ]);
    });

// Route with specific error handling
Http::get('/users/{id}')
    ->param('id', '', new Text(36), 'User ID')
    ->inject('request')
    ->inject('response')
    ->action(function(string $id, Request $request, Response $response) {
        try {
            $user = getUserById($id);

            if (!$user) {
                throw new \InvalidArgumentException('User not found');
            }

            $response->json($user);

        } catch (\InvalidArgumentException $e) {
            // Handle specific error for this route
            $response->setStatusCode(404)->json([
                'error' => 'Not Found',
                'message' => $e->getMessage()
            ]);
        } catch (\Exception $e) {
            // Re-throw to be handled by global error handler
            throw $e;
        }
    });

// Custom exception classes
class UserNotFoundException extends \Exception
{
    public function __construct(string $userId)
    {
        parent::__construct("User with ID {$userId} not found", 404);
    }
}

class ValidationException extends \Exception
{
    private array $errors;

    public function __construct(array $errors)
    {
        $this->errors = $errors;
        parent::__construct('Validation failed', 400);
    }

    public function getErrors(): array
    {
        return $this->errors;
    }
}

// Using custom exceptions
Http::get('/users/{id}')
    ->param('id', '', new Text(36), 'User ID')
    ->inject('response')
    ->action(function(string $id, Response $response) {
        $user = getUserById($id);

        if (!$user) {
            throw new UserNotFoundException($id);
        }

        $response->json($user);
    });
```

## Additional Information

The error handling system provides comprehensive exception management with support for custom exceptions, global and route-specific handlers, and consistent error responses. It automatically logs errors and provides appropriate HTTP status codes.
