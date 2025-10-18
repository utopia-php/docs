# Migrations

Migrations in Utopia Database provide a version-controlled way to manage database schema changes. They allow you to evolve your database schema over time while maintaining consistency across different environments. Each migration represents a specific change to your database structure and can be applied or rolled back as needed.

The migration system tracks which migrations have been applied and ensures they run in the correct order. This makes it easy to deploy database changes across development, staging, and production environments with confidence.

## Code Example

```php
<?php

use Utopia\Database\Database;
use Utopia\Database\Migration;

// Create database connection
$db = new Database('mysql:host=localhost;dbname=app', 'username', 'password');

// Create a new migration
class CreateUsersTable extends Migration
{
    public function up(): void
    {
        $this->db->createTable('users', [
            'id' => 'INT AUTO_INCREMENT PRIMARY KEY',
            'name' => 'VARCHAR(255) NOT NULL',
            'email' => 'VARCHAR(255) UNIQUE NOT NULL',
            'password_hash' => 'VARCHAR(255) NOT NULL',
            'created_at' => 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
            'updated_at' => 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ]);

        // Add indexes
        $this->db->createIndex('users', 'email', 'UNIQUE');
        $this->db->createIndex('users', 'created_at', 'INDEX');
    }

    public function down(): void
    {
        $this->db->dropTable('users');
    }
}

// Create another migration
class AddUserRolesTable extends Migration
{
    public function up(): void
    {
        $this->db->createTable('user_roles', [
            'id' => 'INT AUTO_INCREMENT PRIMARY KEY',
            'user_id' => 'INT NOT NULL',
            'role' => 'VARCHAR(50) NOT NULL',
            'created_at' => 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
        ]);

        // Add foreign key constraint
        $this->db->addForeignKey('user_roles', 'user_id', 'users', 'id', 'CASCADE');

        // Add composite index
        $this->db->createIndex('user_roles', ['user_id', 'role'], 'UNIQUE');
    }

    public function down(): void
    {
        $this->db->dropTable('user_roles');
    }
}

// Run migrations
$migration = new Migration($db);
$migration->run();

// Rollback last migration
$migration->rollback();

// Check migration status
$status = $migration->status();
foreach ($status as $migrationName => $isApplied) {
    echo "$migrationName: " . ($isApplied ? 'Applied' : 'Pending') . "\n";
}
```

## Additional Information

Migrations are automatically tracked in a migrations table and can be run individually or in batches. The system ensures migrations run in the correct order and prevents duplicate execution. You can also create data migrations for seeding initial data or transforming existing data.
