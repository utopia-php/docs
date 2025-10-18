import { createFileRoute } from '@tanstack/react-router'
import {
  DocsContent,
  DocsCalloutUtopia,
  Breadcrumbs,
  CodeExample,
} from '@/components/docs'

export const Route = createFileRoute('/_docs/architecture')({
  component: Architecture,
})

function Architecture() {
  return (
    <DocsContent>
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Docs', href: '/docs' },
            { label: 'Architecture', current: true }
          ]} 
        />
        
        <div className="space-y-1 mb-4">
          <h1>Architecture</h1>
          <p className="text-sm text-muted-foreground">
            Utopia's approach to building maintainable, scalable microservice architectures
          </p>
        </div>

        <h2 id="overview">Overview</h2>
        <p>
          Utopia.php follows a micro-libraries architecture approach, where complex software systems 
          are broken down into smaller, focused libraries, each handling a specific responsibility. 
          This design philosophy is based on the principle that every complex problem is just a set 
          of smaller, manageable issues that are much simpler to solve when decoupled.
        </p>

        <p>
          Each Utopia library is designed to be independent, lightweight, and focused on a single 
          concern. This approach promotes code reuse, reduces dependencies, and makes it easier to 
          maintain and scale your applications over time.
        </p>

        <h2 id="what-is-micro-libraries">What are micro-libraries?</h2>
        <p>
          Micro-libraries are small, focused libraries that handle one specific responsibility. 
          In Utopia's architecture, each library is designed to be:
        </p>

        <ul>
          <li><strong>Independent</strong> - Can be used alone or combined with other libraries</li>
          <li><strong>Focused</strong> - Each library has a single, well-defined purpose</li>
          <li><strong>Lightweight</strong> - Minimal dependencies, only requiring PHP extensions</li>
          <li><strong>Composable</strong> - Libraries work together seamlessly when combined</li>
          <li><strong>Replaceable</strong> - Easy to swap out or modify without affecting other parts</li>
        </ul>

        <h2 id="architecture-benefits">Benefits of micro-libraries architecture</h2>
        
        <h3 id="improved-maintainability">Improved maintainability</h3>
        <p>
          Breaking down complex systems into smaller, focused components makes it much easier to 
          maintain and modify your code. Each library has a clear responsibility, making it easier 
          to understand, debug, and update.
        </p>

        <h3 id="increased-flexibility">Increased flexibility</h3>
        <p>
          The independent nature of micro-libraries allows for greater flexibility in modifying 
          or replacing specific components without affecting the rest of your system. You can 
          upgrade individual libraries or swap them out as your needs change.
        </p>

        <h3 id="enhanced-scalability">Enhanced scalability</h3>
        <p>
          The modular nature of micro-libraries makes it easier to scale your application by 
          adding or removing components as needed. You can also scale different parts of your 
          system independently.
        </p>

        <h3 id="better-code-reusability">Better code reusability</h3>
        <p>
          By breaking down functionality into focused libraries, code can be reused across 
          different parts of your system or even across different projects, promoting greater 
          code efficiency and reducing duplication.
        </p>

        <h2 id="utopia-architecture">Utopia's architecture in practice</h2>
        <p>
          Utopia.php implements this micro-libraries approach across its entire ecosystem. 
          Each library is designed to handle a specific domain:
        </p>

        <h3 id="network-category">Network</h3>
        <p>
          Libraries like <code>HTTP</code>, <code>WebSocket</code>, <code>DNS</code>, 
          <code>Fetch</code>, and <code>Domains</code> handle all network-related functionality. 
          Each focuses on a specific protocol or communication method, from HTTP routing and 
          real-time WebSocket connections to DNS resolution and domain validation.
        </p>

        <h3 id="data-category">Data</h3>
        <p>
          The data category includes libraries for <code>Database</code>, <code>Cache</code>, 
          <code>Storage</code>, <code>Queue</code>, <code>AB</code>, <code>Abuse</code>, 
          <code>Config</code>, <code>Image</code>, and <code>Locale</code>. Each provides 
          a clean abstraction for different data storage, processing, and management needs.
        </p>

        <h3 id="logs-category">Logs</h3>
        <p>
          Logging libraries like <code>Logger</code> and <code>Audit</code> provide 
          structured logging, audit trails, and system monitoring capabilities for 
          tracking application behavior and compliance requirements.
        </p>

        <h3 id="services-category">Services</h3>
        <p>
          Higher-level services like <code>Agents</code>, <code>Analytics</code>, 
          <code>Messaging</code>, <code>Orchestrations</code>, and <code>Pay</code> provide 
          business logic, AI capabilities, and integration with external services.
        </p>

        <h3 id="other-category">Other</h3>
        <p>
          Supporting libraries like <code>CLI</code>, <code>Platform</code>, 
          <code>Registry</code>, and <code>System</code> provide essential utilities 
          for command-line interfaces, dependency injection, and system management.
        </p>

        <h2 id="example-architecture">Example: building a microservice</h2>
        <p>
          Here's how you might combine Utopia libraries to build a complete microservice:
        </p>

        <CodeExample
          title="Complete Microservice with Utopia.php"
          description="A real-world example showing how multiple Utopia libraries work together"
          language="php"
          filename="microservice.php"
          code={`<?php

use Utopia\\Http\\Http;
use Utopia\\Http\\Request;
use Utopia\\Http\\Response;
use Utopia\\Database\\Database;
use Utopia\\Cache\\Cache;
use Utopia\\Logger\\Logger;
use Utopia\\Config\\Config;

// Initialize core services
$config = new Config();
$logger = new Logger();
$cache = new Cache();
$database = new Database($config->get('DATABASE_URL'));

// Set up HTTP server with dependency injection
$http = new Http();

// Register dependencies
$http->set('logger', $logger);
$http->set('cache', $cache);
$http->set('database', $database);

// Define API routes
$http->get('/users')
    ->inject('database')
    ->inject('cache')
    ->action(function(Database $db, Cache $cache, Request $request, Response $response) {
        // Check cache first
        $cacheKey = 'users:list';
        $users = $cache->get($cacheKey);
        
        if (!$users) {
            $users = $db->find('users');
            $cache->set($cacheKey, $users, 300); // 5 minutes
        }
        
        return $response->json(['users' => $users]);
    });

$http->post('/users')
    ->param('name', '', new Text(100), 'User name')
    ->param('email', '', new Email(), 'User email')
    ->inject('database')
    ->inject('logger')
    ->action(function(string $name, string $email, Database $db, Logger $logger, Request $request, Response $response) {
        $user = $db->create('users', [
            'name' => $name,
            'email' => $email,
            'created_at' => time()
        ]);
        
        $logger->info('User created', ['user_id' => $user['id']]);
        
        return $response->json($user, 201);
    });

// Start the server
$http->start();`}
        />

        <h2 id="microservices-integration">Microservices integration</h2>
        <p>
          The micro-libraries approach works particularly well with microservices architectures. 
          While microservices break down your system into smaller, independent services, 
          micro-libraries help structure the code within each service.
        </p>

        <p>
          Each microservice can use only the Utopia libraries it needs, keeping the service 
          lightweight and focused. For example:
        </p>

        <ul>
          <li><strong>API Gateway</strong> - Uses <code>HTTP</code>, <code>Abuse</code>, and <code>Domains</code></li>
          <li><strong>User Service</strong> - Uses <code>Database</code>, <code>Cache</code>, <code>Logger</code>, and <code>Audit</code></li>
          <li><strong>Notification Service</strong> - Uses <code>Messaging</code>, <code>Queue</code>, <code>WebSocket</code>, and <code>Fetch</code></li>
          <li><strong>Analytics Service</strong> - Uses <code>Analytics</code>, <code>Storage</code>, <code>Config</code>, and <code>AB</code></li>
          <li><strong>AI Service</strong> - Uses <code>Agents</code>, <code>Config</code>, and <code>Logger</code></li>
        </ul>

        <DocsCalloutUtopia title="Real-world Example">
          <p className="mb-3">
            This architecture is proven in production at scale. Appwrite, the 2nd largest PHP 
            project on GitHub (53k+ stars), is built entirely using Utopia.php micro-libraries.
          </p>
          <p>
            Each Appwrite service uses only the Utopia libraries it needs, creating a 
            maintainable, scalable, and performant backend infrastructure that handles 
            millions of requests daily.
          </p>
        </DocsCalloutUtopia>

        <h2 id="best-practices">Best practices</h2>
        
        <h3 id="choose-wisely">Choose libraries wisely</h3>
        <p>
          Only include the libraries you actually need. Each library adds minimal overhead, 
          but it's still important to keep your dependencies lean and focused.
        </p>

        <h3 id="compose-gradually">Compose gradually</h3>
        <p>
          Start with the core libraries you need (like <code>HTTP</code> and <code>Database</code>), 
          then add additional libraries as your requirements grow. This incremental approach 
          helps you understand each library's role in your system.
        </p>

        <h3 id="maintain-boundaries">Maintain clear boundaries</h3>
        <p>
          Keep your business logic separate from the library implementations. This makes it 
          easier to test, maintain, and potentially replace libraries in the future.
        </p>

        <h3 id="leverage-dependency-injection">Leverage dependency injection</h3>
        <p>
          Use Utopia's built-in dependency injection system to manage your services. This 
          makes your code more testable and maintainable.
        </p>

        <hr />

        <p>
          Utopia's micro-libraries architecture provides a powerful foundation for building 
          maintainable, scalable, and efficient PHP applications. By breaking down complex 
          systems into focused, independent libraries, you can create software that is easier 
          to understand, maintain, and scale.
        </p>

        <p>
          Whether you're building a simple API or a complex microservices architecture, 
          Utopia's approach gives you the flexibility to use only what you need while 
          maintaining the ability to grow and adapt as your requirements change.
        </p>

    </DocsContent>
  )
}
