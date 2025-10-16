import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Code, Tag, Star, Shield } from 'lucide-react'
import { GitHubIcon } from '@/components/ui/github-icon'
import { Library, getRelatedLibraries, formatVersion, formatLastUpdated } from '@/lib/libraries'
import { LibraryCard } from './library-card'
import { Breadcrumbs } from './breadcrumbs'

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
      <div className="flex flex-wrap gap-1 mt-2 mb-6">
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
          <div key={index} className="border rounded-lg px-4 py-3">
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
      
      <h3>Basic Usage</h3>
      <p>
        Here's a simple example to get you started:
      </p>
      <div className="bg-muted rounded-lg p-4 mb-4">
        <pre className="text-sm font-mono overflow-x-auto">
{`<?php

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
$http = new Http(new Server(), new Container(), 'America/New_York');
$http->start();`}
        </pre>
      </div>
      
      <h3>Run the Server</h3>
      <div className="bg-muted rounded-lg p-4 mb-4">
        <code className="text-sm font-mono">
          php -S localhost:8000 src/server.php
        </code>
      </div>
      
      <h3>Test Your Endpoint</h3>
      <div className="bg-muted rounded-lg p-4 mb-4">
        <code className="text-sm font-mono">
          curl http://localhost:8000/hello
        </code>
      </div>
      
      <p className="text-sm text-muted-foreground">
        For more advanced examples, server adapters (FPM, Swoole), parameters, hooks, and dependency injection, 
        check out the <a href={library.documentation} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">complete documentation</a>.
      </p>

      <h2 id="concepts">Key Concepts</h2>
      <p>
        Understanding these core concepts will help you make the most of {library.name}:
      </p>

      <h3 id="routes-actions">Routes & Actions</h3>
      <p>
        Routes define HTTP endpoints with specific methods and paths. Each route has an action function that handles the request and returns a response.
      </p>
      <div className="bg-muted rounded-lg p-4 mb-4">
        <pre className="text-sm font-mono overflow-x-auto">
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
        </pre>
      </div>
      <p className="text-sm text-muted-foreground">
        Routes support all HTTP methods (GET, POST, PUT, DELETE, PATCH, OPTIONS) and can be organized into groups for common behavior.
      </p>

      <h3 id="dependency-injection">Dependency Injection</h3>
      <p>
        Automatically inject dependencies like database connections, user sessions, or custom services into your route actions and hooks.
      </p>
      <div className="bg-muted rounded-lg p-4 mb-4">
        <pre className="text-sm font-mono overflow-x-auto">
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
        </pre>
      </div>
      <p className="text-sm text-muted-foreground">
        Dependencies are created fresh for each request, ensuring clean state and proper resource management.
      </p>

      <h3 id="parameters-validation">Parameters & Validation</h3>
      <p>
        Define and validate input parameters from URL paths, query strings, or request bodies with built-in validators for security and type safety.
      </p>
      <div className="bg-muted rounded-lg p-4 mb-4">
        <pre className="text-sm font-mono overflow-x-auto">
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
        </pre>
      </div>
      <p className="text-sm text-muted-foreground">
        Built-in validators include Text, UID, Email, URL, Numeric, Range, and more. Custom validators can be created by extending the Validator class.
      </p>

      <h3 id="hooks-middleware">Hooks & Middleware</h3>
      <p>
        Execute code before (init), after (shutdown), or on error for all routes or specific groups. Perfect for authentication, logging, and error handling.
      </p>
      <div className="bg-muted rounded-lg p-4 mb-4">
        <pre className="text-sm font-mono overflow-x-auto">
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
        </pre>
      </div>
      <p className="text-sm text-muted-foreground">
        Hooks can be assigned to specific groups and will only run for routes that belong to those groups.
      </p>

      <h3 id="server-adapters">Server Adapters</h3>
      <p>
        Run on different server environments including PHP's built-in server, FPM, or high-performance Swoole for production deployments.
      </p>
      <div className="bg-muted rounded-lg p-4 mb-4">
        <pre className="text-sm font-mono overflow-x-auto">
{`// PHP Built-in Server
use Utopia\\Http\\Adapter\\FPM\\Server;
$http = new Http(new Server(), $container, 'America/New_York');

// Swoole Server (High Performance)
use Utopia\\Http\\Adapter\\Swoole\\Server;
$http = new Http(new Server('0.0.0.0', '80'), $container, 'America/New_York');

// Start the server
$http->start();`}
        </pre>
      </div>
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
