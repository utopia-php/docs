import { createFileRoute } from '@tanstack/react-router'
import {
  DocsLayout,
  DocsContent,
  DocsCalloutUtopia,
  Breadcrumbs,
  CodeExample,
} from '@/components/docs'
import { Badge } from '@/components/ui/badge'
import { LibraryCard } from '@/components/docs/library-card'
import librariesData from '@/data/libraries.json'

export const Route = createFileRoute('/_public/')({
  component: Index,
})

function Index() {
  return (
    <DocsLayout>
      <DocsContent>
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: 'Home', current: true }
          ]} 
          showCopyPage={false}
        />
        
        <div className="space-y-1 mb-4">
          <h1>Utopia.php</h1>
          <p className="text-sm text-muted-foreground">
            Micro-libraries for PHP microservice architectures. 
            Lightweight, focused, and production-tested.
          </p>
          <div className="flex gap-1 mt-2">
            <Badge className="text-xs px-2 py-1 bg-primary text-primary-foreground">v1.0.0</Badge>
            <Badge variant="outline" className="text-xs px-2 py-1">PHP 8.1+</Badge>
            <Badge variant="outline" className="text-xs px-2 py-1">MIT License</Badge>
          </div>
        </div>

        <h2 id="introduction">Overview</h2>
        <p>
          Utopia.php is a collection of micro-libraries for building microservice architectures. 
          Each library handles a specific concern - HTTP routing, database abstraction, caching, 
          logging, and more. Libraries are independent, well-documented, and designed for 
          distributed systems. Simple APIs with minimal dependencies (only PHP extensions). 
          No framework dependencies or vendor lock-in.
        </p>
        <p>
          Built and maintained by the Appwrite team, Utopia.php serves as the foundation for 
          Appwrite's backend infrastructure. These battle-tested libraries power the 2nd largest 
          PHP product on GitHub (53k+ stars, 2nd only to Laravel), ensuring reliability and performance at scale.
        </p>

        <DocsCalloutUtopia title="Utopia.php & Laravel">
          <p className="mb-3">
            Utopia.php and Laravel serve different purposes in the PHP ecosystem. While Laravel is 
            an excellent full-stack framework for building web applications, Utopia.php provides 
            focused micro-libraries for specific needs in microservice architectures.
          </p>
          <p className="mb-3">
            <strong>Laravel</strong> excels at rapid web application development with its conventions, 
            ORM, and built-in features. <strong>Utopia.php</strong> shines when you need lightweight, 
            performant libraries for APIs, microservices, or specific backend tasks. The best part? 
            You can use Utopia.php libraries within Laravel applications or alongside them in 
            microservice architectures.
          </p>
          <p>
            <a href="/comparison" className="text-primary hover:underline font-medium">
              Learn more about when to use each approach →
            </a>
          </p>
        </DocsCalloutUtopia>

        <h2 id="features">Features</h2>
        <p>
          Utopia.php micro-libraries are designed with modern PHP development in mind, 
          offering a comprehensive set of features for building robust microservices:
        </p>

        <ul>
          <li>
            <strong>Minimal Dependencies</strong> - Only PHP extensions required, no external 
            Composer packages, reducing security risks and complexity
          </li>
          <li>
            <strong>Single Purpose Libraries</strong> - Each library focuses on one 
            specific domain, following clean architecture principles
          </li>
          <li>
            <strong>PHP 8.1+ Support</strong> - Built for modern PHP with type hints 
            and performance optimizations
          </li>
          <li>
            <strong>Independent Libraries</strong> - Use alone or combine without 
            framework lock-in
          </li>
          <li>
            <strong>Backed by Appwrite</strong> - Built and maintained by the team behind 
            the 2nd largest PHP project on GitHub
          </li>
          <li>
            <strong>Production Ready</strong> - Battle-tested in Appwrite's infrastructure (53k+ GitHub stars)
          </li>
          <li>
            <strong>Comprehensive Documentation</strong> - Well-documented APIs with 
            examples and best practices
          </li>
          <li>
            <strong>MIT License</strong> - Open source with permissive licensing
          </li>
        </ul>

        <h2 id="quick-example">Quick Example</h2>
        <p>
          Here's a simple example showing how to use Utopia.php libraries to build a 
          lightweight HTTP server with routing and validation:
        </p>

        <CodeExample
          title="Simple HTTP Server with Utopia.php"
          description="A minimal example using Utopia.php HTTP and Router libraries"
          language="php"
          filename="server.php"
          code={`<?php

use Utopia\\Http\\Http;
use Utopia\\Http\\Request;
use Utopia\\Http\\Response;
use Utopia\\Router\\Router;

// Create a new router instance
$router = new Router();

// Define routes
$router->get('/', function (Request $request, Response $response) {
    return $response->json([
        'message' => 'Hello from Utopia.php!',
        'version' => '1.0.0'
    ]);
});

$router->get('/users/{id}', function (Request $request, Response $response) {
    $userId = $request->getParam('id');
    
    return $response->json([
        'user' => [
            'id' => $userId,
            'name' => 'John Doe',
            'email' => 'john@example.com'
        ]
    ]);
});

$router->post('/users', function (Request $request, Response $response) {
    $data = $request->getPayload();
    
    // Validate input
    if (!isset($data['name']) || !isset($data['email'])) {
        return $response->json(['error' => 'Missing required fields'], 400);
    }
    
    return $response->json([
        'message' => 'User created successfully',
        'user' => $data
    ], 201);
});

// Start the HTTP server
$http = new Http();
$http->start($router);`}
        />

        <h2 id="libraries">Libraries</h2>
        <p>
          Micro-libraries organized by function. Each library is lightweight, focused, and 
          designed for microservice architectures. Use them independently or combine as needed.
        </p>

        <h3 id="network">Network</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {librariesData.network.map((library) => (
            <LibraryCard key={library.name} library={library} />
          ))}
        </div>

        <h3 id="data">Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {librariesData.data.map((library) => (
            <LibraryCard key={library.name} library={library} />
          ))}
        </div>

        <h3 id="logs">Logs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {librariesData.logs.map((library) => (
            <LibraryCard key={library.name} library={library} />
          ))}
        </div>

        <h3 id="services">Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {librariesData.services.map((library) => (
            <LibraryCard key={library.name} library={library} />
          ))}
        </div>

        <h3 id="other">Other</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {librariesData.other.map((library) => (
            <LibraryCard key={library.name} library={library} />
          ))}
        </div>

      </DocsContent>
    </DocsLayout>
  )
}
