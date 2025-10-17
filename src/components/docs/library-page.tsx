import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Code, Tag, Star, Shield } from 'lucide-react'
import { GitHubIcon } from '@/components/ui/github-icon'
import { Library, getRelatedLibraries, formatVersion, formatLastUpdated } from '@/lib/libraries'
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
      <CodeExample
        language="bash"
        title="Install with Composer"
        code={`composer require utopia-php/${library.name.toLowerCase().replace(/\s+/g, '-')}`}
      />
      
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
    </div>
  )
}