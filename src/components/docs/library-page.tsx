import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Code, Tag, Star, Shield } from 'lucide-react'
import { GitHubIcon } from '@/components/ui/github-icon'
import { Library, getRelatedLibraries, formatVersion, formatLastUpdated } from '@/lib/libraries'
import { LibraryCard } from './library-card'
import { Breadcrumbs } from './breadcrumbs'
import { CodeExample } from './code-example'

interface LibraryPageProps {
  library: Library
}

export function LibraryPage({ library }: LibraryPageProps) {
  const relatedLibraries = getRelatedLibraries(library, 3)

  return (
    <div className="space-y-1 mb-4">
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/' }
        ]} 
      />
      
      <h1>Utopia {library.name}</h1>
      <p className="text-sm text-muted-foreground">
        {library.description}
      </p>
      
      {/* Metadata Tags */}
      <div className="flex flex-wrap gap-2 mt-2 mb-6">
        <Badge variant="outline" className="text-xs px-2 py-1">
          <Code className="h-3 w-3 mr-1" />
          {formatVersion(library.version)}
        </Badge>
        <Badge variant="outline" className="text-xs px-2 py-1">
          <Tag className="h-3 w-3 mr-1" />
          {library.category}
        </Badge>
        <Badge variant="outline" className="text-xs px-2 py-1">
          <Calendar className="h-3 w-3 mr-1" />
          {formatLastUpdated(library.lastUpdated)}
        </Badge>
        {library.license && (
          <Badge variant="outline" className="text-xs px-2 py-1">
            <Shield className="h-3 w-3 mr-1" />
            {library.license}
          </Badge>
        )}
        <Badge variant="outline" className="text-xs px-2 py-1">
          <Star className="h-3 w-3 mr-1" />
          {library.stars} stars
        </Badge>
      </div>
      
      {library.longDescription && (
        <div className="prose prose-zinc dark:prose-invert max-w-none mb-6">
          <p className="text-base leading-7 text-muted-foreground">
            {library.longDescription}
          </p>
        </div>
      )}

      <div className="flex gap-2 mb-6">
        <Button variant="secondary" asChild>
          <a href={library.githubUrl} target="_blank" rel="noopener noreferrer">
            <GitHubIcon size={16} className="mr-2" />
            View on GitHub
          </a>
        </Button>
      </div>

      <h2 id="features">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {library.features.map((feature, index) => (
          <div key={index} className="border border-muted rounded-lg px-4 py-3">
            <div className="mb-2">
              <h4 className="font-medium text-sm">{feature}</h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This feature provides essential functionality for {library.name.toLowerCase()} 
              with robust implementation and comprehensive documentation.
            </p>
          </div>
        ))}
      </div>

      <h2 id="get-started">Get Started</h2>
      <p>
        Install the library using Composer:
      </p>
      <div className="bg-muted rounded-lg p-4 mb-4">
        <code className="text-sm font-mono">
          composer require utopia-php/{library.name.toLowerCase().replace(/\s+/g, '-')}
        </code>
      </div>
      
      {library.name === 'DNS' ? (
        <>
          <h3>DNS Server Setup</h3>
          <p>
            Here's how to set up a basic DNS server:
          </p>
          <div className="bg-muted rounded-lg p-4 mb-4">
            <pre className="text-sm font-mono overflow-x-auto">
{`<?php

require_once __DIR__.'/init.php';

use Appwrite\\DNS\\Server;
use Appwrite\\DNS\\Adapter\\Swoole;
use Appwrite\\DNS\\Resolver\\Mock;

$server = new Swoole('0.0.0.0', 8000); // Swoole based UDP server running on port 8000
$resolver = new Mock(); // Mock resolver. Always returns 127.0.0.1 as the result

$dns = new Server($server, $resolver);

$dns->start();`}
            </pre>
          </div>
          
          <h3>DNS Client Usage</h3>
          <p>
            Query DNS records using the built-in client:
          </p>
          <div className="bg-muted rounded-lg p-4 mb-4">
            <pre className="text-sm font-mono overflow-x-auto">
{`<?php

require_once __DIR__ . '/vendor/autoload.php';

use Utopia\\DNS\\Client;

$client = new Client('8.8.8.8'); // Query against Google's public DNS

try {
    // Query for A records for example.com
    $records = $client->query('example.com', 'A');
    
    foreach ($records as $record) {
        echo 'Name: '   . $record->getName()   . "\\n";
        echo 'Type: '   . $record->getTypeName() . "\\n";
        echo 'TTL: '    . $record->getTTL()      . "\\n";
        echo 'Data: '   . $record->getRdata()    . "\\n\\n";
    }
} catch (Exception $e) {
    echo "DNS query failed: " . $e->getMessage();
}`}
            </pre>
          </div>
          
          <h3>Run the DNS Server</h3>
          <CodeExample
            language="bash"
            title="Run the DNS Server"
            code={`php dns-server.php`}
          />
          
          <h3>Test DNS Queries</h3>
          <CodeExample
            language="bash"
            title="Test DNS Queries"
            code={`dig @127.0.0.1 -p 8000 example.com A`}
          />
        </>
      ) : (
        <>
          <h3>Basic Usage</h3>
          <p>
            Here's a simple example to get you started:
          </p>
          <CodeExample
            language="php"
            title="server.php"
            code={`<?php

use Utopia\\Http\\Http;
use Utopia\\Http\\Request;
use Utopia\\Http\\Response;

// Define a simple route
Http::get('/hello')
    ->inject('request')
    ->inject('response')
    ->action(
        function(Request $request, Response $response) {
            $response->json(['message' => 'Hello World!']);
        }
    );

// Start the server
$http = new Http(
  new Server(),
  new Container(),
  'America/New_York'
);

$http->start();`}
          />
          
          <h3>Run the Server</h3>
          <CodeExample language="bash" title="Terminal">
            {`php -S localhost:8000 src/server.php`}
          </CodeExample>
          
          <h3>Test Your Endpoint</h3>
          <CodeExample language="bash" title="Terminal">
            {`curl http://localhost:8000/hello`}
          </CodeExample>
        </>
      )}
      
      <p className="text-sm text-muted-foreground">
        For more advanced examples, server adapters (FPM, Swoole), parameters, hooks, and dependency injection, 
        check out the <a href={library.documentation} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">complete documentation</a>.
      </p>

      <h2 id="concepts">Key Concepts</h2>
      <p>
        Understanding these core concepts will help you make the most of {library.name}:
      </p>

      {library.name === 'DNS' ? (
        <>
          <h3 id="dns-server">DNS Server</h3>
          <p>
            The DNS server handles incoming DNS queries and responds with appropriate DNS records. It uses adapters for network communication and resolvers for query processing.
          </p>
          <CodeExample language="php" title="dns-server.php" showLineNumbers>
            {`// Create a DNS server with Swoole adapter
$server = new Swoole('0.0.0.0', 8000);
$resolver = new Mock(); // Custom resolver
$dns = new Server($server, $resolver);

// Start listening for DNS queries
$dns->start();`}
          </CodeExample>
          <p className="text-sm text-muted-foreground">
            The server supports multiple adapters including Native PHP Socket and Swoole UDP Server for high-performance DNS resolution.
          </p>

          <h3 id="dns-client">DNS Client</h3>
          <p>
            The DNS client allows you to query DNS records from any DNS server. It supports all standard DNS record types and provides a simple API for lookups.
          </p>
          <CodeExample language="php" title="dns-client.php" showLineNumbers>
            {`// Query different record types
$client = new Client('8.8.8.8');

$aRecords = $client->query('example.com', 'A');      // IPv4 addresses
$mxRecords = $client->query('example.com', 'MX');    // Mail servers
$txtRecords = $client->query('example.com', 'TXT');  // Text records
$aaaaRecords = $client->query('example.com', 'AAAA'); // IPv6 addresses`}
          </CodeExample>
          <p className="text-sm text-muted-foreground">
            The client supports all standard DNS record types including A, NS, CNAME, SOA, MX, TXT, AAAA, SRV, and more.
          </p>

          <h3 id="adapters">Server Adapters</h3>
          <p>
            Adapters handle the low-level network communication for the DNS server. Choose the adapter that best fits your deployment environment.
          </p>
          <CodeExample language="php" title="adapters.php" showLineNumbers>
            {`// Native PHP Socket (PHP 8.0+)
use Appwrite\\DNS\\Adapter\\Native;
$server = new Native('0.0.0.0', 8000);

// Swoole UDP Server (High Performance)
use Appwrite\\DNS\\Adapter\\Swoole;
$server = new Swoole('0.0.0.0', 8000);

// Workerman (Coming Soon)
// ReactPHP (Coming Soon)`}
          </CodeExample>
          <p className="text-sm text-muted-foreground">
            Swoole provides the best performance for production environments, while Native PHP Socket is perfect for development and simple deployments.
          </p>

          <h3 id="resolvers">Custom Resolvers</h3>
          <p>
            Resolvers process DNS queries and return appropriate responses. You can create custom resolvers by extending the base Resolver class.
          </p>
          <CodeExample language="php" title="CustomResolver.php" showLineNumbers>
            {`// Custom resolver example
class CustomResolver extends Resolver
{
    public function resolve(Query $query): ?Response
    {
        // Custom DNS resolution logic
        if ($query->getName() === 'example.com') {
            return new Response([
                'name' => 'example.com',
                'type' => 'A',
                'ttl' => 300,
                'data' => '192.168.1.1'
            ]);
        }
        
        return null; // Delegate to parent or other resolver
    }
}`}
          </CodeExample>
          <p className="text-sm text-muted-foreground">
            Custom resolvers allow you to implement custom DNS logic, caching, load balancing, or integration with external systems.
          </p>

          <h3 id="benchmarking">Performance Benchmarking</h3>
          <p>
            The library includes a built-in benchmarking tool to measure DNS server performance under load with detailed metrics and analysis.
          </p>
          <CodeExample language="bash" title="Terminal">
            {`// Run benchmark with default settings
php tests/benchmark.php

// Custom benchmark configuration
php tests/benchmark.php --server=127.0.0.1 --port=5300 --iterations=1000 --concurrency=20`}
          </CodeExample>
          <p className="text-sm text-muted-foreground">
            Benchmarking provides detailed performance metrics including requests per second, response times, latency distribution, and error rates.
          </p>
        </>
      ) : (
        <>
          <h3 id="routes-actions">Routes & Actions</h3>
          <p>
            Routes define HTTP endpoints with specific methods and paths. Each route has an action function that handles the request and returns a response.
          </p>
          <CodeExample language="php" title="routes.php" showLineNumbers>
            {`// Define a GET route
Http::get('/users')
    ->inject('response')
    ->action(function(Response $response) {
        $response->json(['users' => []]);
    });

// Define a POST route with parameters
Http::post('/users')
    ->param('name', '', new Text(256), 'User name', false)
    ->inject('response')
    ->action(function(string $name, Response $response) {
        $response->json(['message' => 'User created: ' . $name]);
    });`}
          </CodeExample>
          <p className="text-sm text-muted-foreground">
            Routes support all HTTP methods (GET, POST, PUT, DELETE, PATCH, OPTIONS) and can be organized into groups for common behavior.
          </p>
        </>
      )}

      <h3 id="dependency-injection">Dependency Injection</h3>
      <p>
        Automatically inject dependencies like database connections, user sessions, or custom services into your route actions and hooks.
      </p>
      <CodeExample language="php" title="dependency-injection.php" showLineNumbers>
        {`// Define a dependency
$container = new Container();

$db = new Dependency();
$db->setName('db')
   ->setCallback(fn() => new PDO('sqlite:database.db'));

$container->add($db);

// Inject into route
Http::get('/users')
    ->inject('db')
    ->inject('response')
    ->action(function(PDO $db, Response $response) {
        $users = $db->query('SELECT * FROM users')->fetchAll();
        $response->json(['users' => $users]);
    });`}
      </CodeExample>
      <p className="text-sm text-muted-foreground">
        Dependencies are created fresh for each request, ensuring clean state and proper resource management.
      </p>

      <h3 id="parameters-validation">Parameters & Validation</h3>
      <p>
        Define and validate input parameters from URL paths, query strings, or request bodies with built-in validators for security and type safety.
      </p>
      <CodeExample language="php" title="validation.php" showLineNumbers>
        {`// URL parameter validation
Http::get('/users/{id}')
    ->param('id', '', new UID(), 'User ID', false)
    ->inject('response')
    ->action(function(string $id, Response $response) {
        $response->json(['user_id' => $id]);
    });

// Query parameter validation
Http::get('/search')
    ->param('q', '', new Text(100), 'Search query', true)
    ->param('limit', 10, new Range(1, 100), 'Results limit', true)
    ->inject('response')
    ->action(function(string $q, int $limit, Response $response) {
        $response->json(['query' => $q, 'limit' => $limit]);
    });`}
      </CodeExample>
      <p className="text-sm text-muted-foreground">
        Built-in validators include Text, UID, Email, URL, Numeric, Range, and more. Custom validators can be created by extending the Validator class.
      </p>

      <h3 id="hooks-middleware">Hooks & Middleware</h3>
      <p>
        Execute code before (init), after (shutdown), or on error for all routes or specific groups. Perfect for authentication, logging, and error handling.
      </p>
      <CodeExample language="php" title="hooks.php" showLineNumbers>
        {`// Init hook - runs before every request
Http::init()
    ->inject('request')
    ->action(function(Request $request) {
        // Log request
        error_log('Request: ' . $request->getMethod() . ' ' . $request->getURI());
    });

// Shutdown hook - runs after every request
Http::shutdown()
    ->inject('response')
    ->action(function(Response $response) {
        // Log response
        error_log('Response: ' . $response->getStatusCode());
    });

// Error hook - runs on exceptions
Http::error()
    ->inject('error')
    ->inject('response')
    ->action(function(\\Throwable $error, Response $response) {
        $response->setStatusCode(500)->json(['error' => 'Internal Server Error']);
    });`}
      </CodeExample>
      <p className="text-sm text-muted-foreground">
        Hooks can be assigned to specific groups and will only run for routes that belong to those groups.
      </p>

      <h3 id="server-adapters">Server Adapters</h3>
      <p>
        Run on different server environments including PHP's built-in server, FPM, or high-performance Swoole for production deployments.
      </p>
      <CodeExample language="php" title="server-adapters.php" showLineNumbers>
        {`// PHP Built-in Server
use Utopia\\Http\\Adapter\\FPM\\Server;
$http = new Http(new Server(), $container, 'America/New_York');

// Swoole Server (High Performance)
use Utopia\\Http\\Adapter\\Swoole\\Server;
$http = new Http(new Server('0.0.0.0', '80'), $container, 'America/New_York');

// Start the server
$http->start();`}
      </CodeExample>
      <p className="text-sm text-muted-foreground">
        Swoole provides significant performance improvements for production applications with features like HTTP/2 support and coroutines.
      </p>

      {relatedLibraries.length > 0 && (
        <>
          <h2 id="related-libraries">More Libraries</h2>
          <p>
            Other libraries in the {library.category} category:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {relatedLibraries.map((relatedLib) => (
              <LibraryCard 
                key={relatedLib.name} 
                library={relatedLib} 
                hideTitle={false}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
