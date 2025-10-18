Validators in Utopia HTTP provide a declarative approach to input validation that forces developers to perform proper validation to protect against a variety of injection attacks. The key is to get only the value you expect for each parameter.

The validation system uses a fluent API where each parameter is validated against a specific validator type, ensuring type safety and preventing common security vulnerabilities. This approach eliminates the need for manual validation and reduces the risk of security issues.

## Basic text validation

Validate text input with length constraints and format requirements.

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Request;
use Utopia\Http\Response;
use Utopia\Validator\Text;

Http::post('/users')
    ->param('name', '', new Text(100), 'User name (max 100 chars)')
    ->param('description', '', new Text(500), 'User description (max 500 chars)')
    ->inject('request')
    ->inject('response')
    ->action(function(string $name, string $description, Request $request, Response $response) {
        // Parameters are automatically validated and type-safe
        $user = createUser($name, $description);
        $response->json($user, 201);
    });
```

## Email and URL validation

Use built-in validators for common data types like emails and URLs.

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Request;
use Utopia\Http\Response;
use Utopia\Validator\Email;
use Utopia\Validator\URL;

Http::post('/contacts')
    ->param('email', '', new Email(), 'Valid email address')
    ->param('website', '', new URL(), 'Valid website URL')
    ->inject('request')
    ->inject('response')
    ->action(function(string $email, string $website, Request $request, Response $response) {
        $contact = createContact($email, $website);
        $response->json($contact, 201);
    });
```

## Numeric validation

Validate numbers with range constraints and type safety.

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Request;
use Utopia\Http\Response;
use Utopia\Validator\Integer;
use Utopia\Validator\Numeric;
use Utopia\Validator\Range;

Http::post('/products')
    ->param('price', 0, new Numeric(0, 999999.99), 'Product price')
    ->param('quantity', 1, new Integer(1, 1000), 'Quantity in stock')
    ->param('rating', 0, new Range(1, 5), 'Product rating (1-5)')
    ->inject('request')
    ->inject('response')
    ->action(function(float $price, int $quantity, int $rating, Request $request, Response $response) {
        $product = createProduct($price, $quantity, $rating);
        $response->json($product, 201);
    });
```

## Query parameter validation

Validate query parameters for search and filtering operations.

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Request;
use Utopia\Http\Response;
use Utopia\Validator\Text;
use Utopia\Validator\Integer;

Http::get('/search')
    ->param('query', '', new Text(255), 'Search query')
    ->param('page', 1, new Integer(1, 1000), 'Page number')
    ->param('limit', 10, new Integer(1, 100), 'Results per page')
    ->inject('request')
    ->inject('response')
    ->action(function(string $query, int $page, int $limit, Request $request, Response $response) {
        $results = searchProducts($query, $page, $limit);
        $response->json($results);
    });
```

## Custom validators

Create custom validators for specific business rules and validation requirements.

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Request;
use Utopia\Http\Response;
use Utopia\Validator\Text;

// Custom UUID validator
class UserIdValidator extends Text
{
    public function __construct()
    {
        parent::__construct(36, 36); // UUID length
    }

    public function isValid($value): bool
    {
        if (!parent::isValid($value)) {
            return false;
        }

        // Additional UUID format validation
        return preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i', $value);
    }
}

// Custom phone number validator
class PhoneValidator extends Text
{
    public function __construct()
    {
        parent::__construct(10, 15); // Phone number length
    }

    public function isValid($value): bool
    {
        if (!parent::isValid($value)) {
            return false;
        }

        // Validate phone number format
        return preg_match('/^\+?[1-9]\d{1,14}$/', $value);
    }
}

Http::post('/users')
    ->param('id', '', new UserIdValidator(), 'Valid UUID')
    ->param('phone', '', new PhoneValidator(), 'Valid phone number')
    ->inject('request')
    ->inject('response')
    ->action(function(string $id, string $phone, Request $request, Response $response) {
        $user = createUser($id, $phone);
        $response->json($user, 201);
    });
```

## Validation error handling

Handle validation errors gracefully with appropriate error responses.

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Request;
use Utopia\Http\Response;
use Utopia\Validator\Email;
use Utopia\Validator\Text;

Http::post('/users')
    ->param('name', '', new Text(100), 'User name')
    ->param('email', '', new Email(), 'Valid email address')
    ->inject('request')
    ->inject('response')
    ->action(function(string $name, string $email, Request $request, Response $response) {
        try {
            $user = createUser($name, $email);
            $response->json($user, 201);
        } catch (ValidationException $e) {
            $response->setStatusCode(400)->json([
                'error' => 'Validation failed',
                'details' => $e->getErrors()
            ]);
        }
    });
```

## Complete example

Here's a complete example showing various validation patterns:

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Request;
use Utopia\Http\Response;
use Utopia\Validator\Text;
use Utopia\Validator\Email;
use Utopia\Validator\Integer;
use Utopia\Validator\URL;
use Utopia\Validator\Numeric;

// User registration with comprehensive validation
Http::post('/register')
    ->param('name', '', new Text(100), 'Full name')
    ->param('email', '', new Email(), 'Email address')
    ->param('age', 0, new Integer(18, 120), 'Age (18-120)')
    ->param('website', '', new URL(), 'Personal website')
    ->param('salary', 0, new Numeric(0, 999999.99), 'Annual salary')
    ->inject('request')
    ->inject('response')
    ->action(function(string $name, string $email, int $age, string $website, float $salary, Request $request, Response $response) {
        // All parameters are validated and type-safe
        $user = createUser($name, $email, $age, $website, $salary);
        $response->json($user, 201);
    });

// Search endpoint with query validation
Http::get('/search')
    ->param('q', '', new Text(255), 'Search query')
    ->param('page', 1, new Integer(1, 1000), 'Page number')
    ->param('limit', 10, new Integer(1, 100), 'Results per page')
    ->inject('response')
    ->action(function(string $q, int $page, int $limit, Response $response) {
        $results = search($q, $page, $limit);
        $response->json($results);
    });
```

## Additional Information

The declarative validation approach ensures that all input is properly validated before reaching your application logic. This prevents SQL injection, XSS attacks, and other security vulnerabilities by ensuring only expected data types and formats are accepted.
