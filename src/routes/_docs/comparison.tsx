import { createFileRoute } from '@tanstack/react-router'
import {
  DocsContent,
  DocsCallout,
  DocsCalloutUtopia,
  Breadcrumbs,
} from '@/components/docs'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/_docs/comparison')({
  component: Comparison,
})

function Comparison() {
  return (
    <DocsContent>
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Docs', href: '/docs' },
          { label: 'Utopia.php & Laravel', current: true }
        ]} 
      />
      
      <div className="space-y-1 mb-4">
        <h1>Utopia.php & Laravel</h1>
        <p className="text-sm text-muted-foreground">
          Understanding how Utopia.php micro-libraries and Laravel framework complement each other. 
          Both are excellent tools for different needs in the PHP ecosystem.
        </p>
      </div>

      <h2 id="overview">Overview</h2>
      <p>
        Both Utopia.php and Laravel are excellent PHP solutions that serve different purposes 
        in the ecosystem. Rather than competing, they complement each other beautifully. 
        Understanding their strengths helps you choose the right tool for each part of your project.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div className="border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">U</span>
            </div>
            <h3 className="text-lg font-semibold">Utopia.php</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            A collection of micro-libraries designed for microservice architectures. 
            Each library solves a specific problem with minimal dependencies (only PHP extensions).
          </p>
          <div className="space-y-2">
            <Badge variant="outline" className="text-xs">Micro-libraries</Badge>
            <Badge variant="outline" className="text-xs">Minimal Dependencies</Badge>
            <Badge variant="outline" className="text-xs">Microservices</Badge>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <h3 className="text-lg font-semibold">Laravel</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            A full-stack web application framework with conventions, ORM, templating, 
            and built-in features for rapid development.
          </p>
          <div className="space-y-2">
            <Badge variant="outline" className="text-xs">Full Framework</Badge>
            <Badge variant="outline" className="text-xs">Conventions</Badge>
            <Badge variant="outline" className="text-xs">Rapid Development</Badge>
          </div>
        </div>
      </div>

      <h2 id="detailed-comparison">Detailed Comparison</h2>

      <h3 id="architecture">Architecture Philosophy</h3>
      <div className="space-y-4">
        <div className="border-l-4 border-primary pl-4">
          <h4 className="font-semibold text-primary">Utopia.php: Micro-libraries Approach</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Utopia.php follows the Unix philosophy of "do one thing and do it well." 
            Each library is focused on solving a specific problem with minimal dependencies 
            (only PHP extensions), allowing you to compose your own architecture.
          </p>
        </div>
        
        <div className="border-l-4 border-red-500 pl-4">
          <h4 className="font-semibold text-red-500">Laravel: Full-Stack Framework</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Laravel provides a complete ecosystem with conventions, built-in features, 
            and opinionated structure. It follows the "batteries included" philosophy, 
            offering everything needed to build web applications.
          </p>
        </div>
      </div>

      <h3 id="use-cases">Use Cases</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            When Utopia.php Excels
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <ArrowRight className="h-3 w-3 text-muted-foreground mt-1 flex-shrink-0" />
              Building microservices or distributed systems
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-3 w-3 text-muted-foreground mt-1 flex-shrink-0" />
              Need lightweight, performant solutions
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-3 w-3 text-muted-foreground mt-1 flex-shrink-0" />
              Want to avoid framework lock-in
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-3 w-3 text-muted-foreground mt-1 flex-shrink-0" />
              Building APIs or backend services
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-3 w-3 text-muted-foreground mt-1 flex-shrink-0" />
              Need to integrate with existing systems
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-3 w-3 text-muted-foreground mt-1 flex-shrink-0" />
              Performance is critical
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            When Laravel Excels
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <ArrowRight className="h-3 w-3 text-muted-foreground mt-1 flex-shrink-0" />
              Building traditional web applications
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-3 w-3 text-muted-foreground mt-1 flex-shrink-0" />
              Need rapid development and prototyping
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-3 w-3 text-muted-foreground mt-1 flex-shrink-0" />
              Want built-in authentication, ORM, and templating
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-3 w-3 text-muted-foreground mt-1 flex-shrink-0" />
              Building content management systems
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-3 w-3 text-muted-foreground mt-1 flex-shrink-0" />
              Need extensive third-party package ecosystem
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-3 w-3 text-muted-foreground mt-1 flex-shrink-0" />
              Team prefers convention over configuration
            </li>
          </ul>
        </div>
      </div>

      <h3 id="integration">Working Together</h3>
      <DocsCallout type="info" title="The Best of Both Worlds">
        <p className="mb-3">
          One of the greatest strengths is that Utopia.php and Laravel work beautifully together. 
          You can use Utopia.php libraries within Laravel applications or alongside Laravel 
          in microservice architectures.
        </p>
        <p className="mb-3">
          For example, you might use Laravel for your main web application and Utopia.php 
          libraries for specific microservices, background jobs, or API endpoints that 
          require maximum performance.
        </p>
        <p>
          This hybrid approach gives you Laravel's rapid development capabilities where you need them, 
          and Utopia.php's performance and flexibility where it matters most.
        </p>
      </DocsCallout>

      <h3 id="hybrid-approaches">Hybrid Approaches</h3>
      <div className="space-y-4">
        <div className="border-l-4 border-blue-500 pl-4">
          <h4 className="font-semibold text-blue-500">Laravel + Utopia.php Microservices</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Keep your main Laravel application for the web interface and user management, 
            while using Utopia.php libraries to build specific microservices for APIs, 
            data processing, or performance-critical tasks.
          </p>
        </div>
        
        <div className="border-l-4 border-green-500 pl-4">
          <h4 className="font-semibold text-green-500">Utopia.php within Laravel</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Use specific Utopia.php libraries within your Laravel application for 
            performance-critical components like caching, logging, or HTTP handling, 
            while keeping Laravel's rapid development features for everything else.
          </p>
        </div>
      </div>

      <h3 id="dependencies">Dependency Details</h3>
      <DocsCallout type="info" title="Understanding Utopia.php Dependencies">
        <p className="mb-3">
          While Utopia.php libraries have "minimal dependencies," this means they only require 
          PHP extensions (like <code>ext-json</code>, <code>ext-curl</code>, <code>ext-sockets</code>) 
          rather than external Composer packages. This approach:
        </p>
        <ul className="space-y-1 text-sm">
          <li>• Reduces security vulnerabilities from third-party packages</li>
          <li>• Eliminates dependency conflicts and version management issues</li>
          <li>• Ensures better performance with native PHP extensions</li>
          <li>• Maintains compatibility across different PHP environments</li>
        </ul>
      </DocsCallout>

      <DocsCalloutUtopia title="Ready to Get Started?">
        <p className="mb-3">
          If Utopia.php sounds like the right fit for your project, check out our 
          <a href="/" className="text-primary hover:underline">libraries</a> to see what's available.
        </p>
        <p>
          Or if you're building with Laravel, consider using specific Utopia.php libraries 
          for performance-critical components like caching, logging, or HTTP handling.
        </p>
      </DocsCalloutUtopia>

      <p className="text-sm text-muted-foreground">
        Last updated:{' '}
        {new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
    </DocsContent>
  )
}
