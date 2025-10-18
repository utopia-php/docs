# Query builder

The query builder in Utopia Database provides a fluent, intuitive API for constructing SQL queries without writing raw SQL. This approach makes your code more readable, maintainable, and less prone to SQL injection attacks. The builder supports all major SQL operations including SELECT, INSERT, UPDATE, DELETE, and complex JOINs.

The query builder automatically handles parameter binding and escaping, ensuring your queries are secure against SQL injection. It also provides database-agnostic syntax, allowing you to write queries that work across MySQL, PostgreSQL, SQLite, and other PDO-compatible databases.

## Code Example

```php
<?php

use Utopia\Database\Database;
use Utopia\Database\Query;

// Create database connection
$db = new Database('mysql:host=localhost;dbname=app', 'username', 'password');

// Simple SELECT query
$users = $db->find(
    Query::select(['id', 'name', 'email'])
        ->from('users')
        ->where('active', '=', true)
        ->orderBy('name', 'ASC')
        ->limit(10)
);

// Complex JOIN query
$posts = $db->find(
    Query::select(['p.title', 'p.content', 'u.name as author'])
        ->from('posts', 'p')
        ->join('users', 'u', 'p.user_id = u.id')
        ->where('p.published', '=', true)
        ->where('p.created_at', '>', '2024-01-01')
        ->orderBy('p.created_at', 'DESC')
);

// INSERT with multiple records
$db->createMany('users', [
    ['name' => 'John Doe', 'email' => 'john@example.com'],
    ['name' => 'Jane Smith', 'email' => 'jane@example.com']
]);

// UPDATE with conditions
$db->update(
    Query::update('users')
        ->set(['last_login' => new \DateTime()])
        ->where('id', '=', $userId)
);

// DELETE with subquery
$db->delete(
    Query::delete('posts')
        ->where('user_id', 'IN', 
            Query::select(['id'])
                ->from('users')
                ->where('inactive_since', '<', '2023-01-01')
        )
);

// Raw SQL when needed
$result = $db->query(
    'SELECT COUNT(*) as total FROM users WHERE created_at > ?',
    [new \DateTime('2024-01-01')]
);
```

## Additional Information

The query builder supports all major SQL features including subqueries, aggregate functions, GROUP BY, HAVING clauses, and complex WHERE conditions. It automatically handles parameter binding and provides type safety for your database operations.
