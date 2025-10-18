import { createFileRoute } from '@tanstack/react-router'
import {
  DocsContent,
  Breadcrumbs,
  DocsCallout,
} from '@/components/docs'
import { Code, Bug, FileText, Github } from 'lucide-react'
import { DiscordIcon } from '@/components/ui/discord-icon'
import { DISCORD_LINK, GITHUB_LINK } from '@/lib/constants'

export const Route = createFileRoute('/_docs/contributing')({
  component: Contributing,
})

function Contributing() {
  return (
    <DocsContent>
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Docs', href: '/docs' },
          { label: 'Contributing', current: true }
        ]} 
      />
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Contributing</h1>
        <p className="text-sm text-muted-foreground">
          Help us build better micro-libraries for PHP microservice architectures. 
          Your contributions make a real difference in the open source community.
        </p>
      </div>

      {/* Quick Start */}
      <DocsCallout type="info" title="Quick start">
        <p className="text-sm">
          Fork your target repository, create a feature branch with <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">git checkout -b feature/amazing-feature</code>, 
          implement your changes with thorough testing, commit with clear messages, push to your fork, and open a Pull Request. 
          That's it-you're contributing to Utopia.php.
        </p>
      </DocsCallout>

      {/* Ways to Contribute */}
      <h2 id="ways-to-contribute">Ways to contribute</h2>
      <p>
        Every contribution matters, whether you're writing code, improving documentation, reporting issues, or helping fellow developers. 
        Here are the main areas where you can make an impact:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Code className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">Code contributions</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Enhance existing libraries with bug fixes, performance improvements, and new features. 
            Focus on code quality, maintainability, and comprehensive test coverage. 
            All changes should follow PSR-12 standards and include proper documentation.
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">Documentation</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Help others understand and adopt Utopia.php through clear documentation, 
            practical examples, and comprehensive guides. This includes API references, 
            tutorials, README improvements, and translations.
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Bug className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">Issue reporting</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Identify and report bugs, security vulnerabilities, and performance issues. 
            Provide clear reproduction steps, environment details, and suggested solutions. 
            Feature requests should include use cases and implementation ideas.
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <DiscordIcon size={16} className="text-primary" />
            <h3 className="font-semibold">Community support</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Help grow the community by answering questions, reviewing pull requests, 
            sharing knowledge through tutorials and blog posts, and mentoring newcomers. 
            Your expertise helps others succeed with Utopia.php.
          </p>
        </div>
      </div>

      {/* Development Setup */}
      <h2 id="development-setup">Development setup</h2>
      <p>
        Get started contributing with a simple setup process. You'll need PHP 8.1+, Composer, Git, and your preferred editor.
      </p>

      <h3 id="getting-started">Getting started</h3>
      <p>
        Fork your target repository on GitHub, then clone it locally with <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">git clone https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git</code>. 
        Add the upstream remote with <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">git remote add upstream https://github.com/utopia-php/REPOSITORY_NAME.git</code>, 
        install dependencies via <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">composer install</code>, and create your feature branch with 
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">git checkout -b feature/your-feature-name</code>.
      </p>

      {/* Coding Standards */}
      <h2 id="coding-standards">Coding standards</h2>
      <p>
        Maintain high code quality with PSR-12 compliance, comprehensive type hints, and meaningful naming conventions. 
        Write focused methods with single responsibilities, include detailed docblocks for public APIs, and ensure 
        comprehensive test coverage for all new functionality.
      </p>

      <p>
        Each Utopia.php library includes automated formatting and linting tools. Run <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">composer format</code> 
        to automatically fix code style issues, and <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">composer test</code> to validate that everything 
        complies with our standards. This ensures consistent code quality across all contributions.
      </p>

      {/* Naming Conventions */}
      <h2 id="naming-conventions">Naming conventions</h2>
      <p>
        Consistent naming is crucial for code readability and maintainability. Utopia.php follows domain-driven design principles 
        with a focus on clear, concise naming that reflects the business domain and context.
      </p>

      <h3 id="general-principles">General principles</h3>
      <p>
        Our naming conventions prioritize clarity, brevity, and context awareness. Names should be self-documenting and 
        immediately convey their purpose without requiring additional explanation.
      </p>

      <ul className="list-disc pl-6 space-y-2 my-4">
        <li><strong>Prefer short names:</strong> Use single words when possible, compound words when necessary</li>
        <li><strong>Single responsibility:</strong> Each name should represent one clear concept or action</li>
        <li><strong>Context-aware:</strong> Names should make sense within their domain and namespace</li>
        <li><strong>Avoid duplication:</strong> Don't repeat namespace or class context in method/property names</li>
        <li><strong>Use domain language:</strong> Reflect the business domain and real-world concepts</li>
      </ul>

      <h3 id="class-and-interface-naming">Classes and interfaces</h3>
      <p>
        Class names should be nouns representing domain concepts, using PascalCase. Interface names typically end with 
        "Interface" or use descriptive adjectives.
      </p>

      <div className="bg-muted rounded-lg p-4 my-4">
        <h4 className="font-semibold mb-2">Good examples:</h4>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><code className="relative rounded bg-background px-[0.3rem] py-[0.2rem] font-mono text-sm">User</code> - Clear, single word</li>
          <li><code className="relative rounded bg-background px-[0.3rem] py-[0.2rem] font-mono text-sm">HttpClient</code> - Compound when necessary</li>
          <li><code className="relative rounded bg-background px-[0.3rem] py-[0.2rem] font-mono text-sm">CacheInterface</code> - Interface with clear suffix</li>
          <li><code className="relative rounded bg-background px-[0.3rem] py-[0.2rem] font-mono text-sm">Database</code> - Domain concept</li>
        </ul>
      </div>

      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 my-4">
        <h4 className="font-semibold mb-2 text-destructive">Avoid:</h4>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><code className="relative rounded bg-background px-[0.3rem] py-[0.2rem] font-mono text-sm">UserManager</code> - "Manager" is vague</li>
          <li><code className="relative rounded bg-background px-[0.3rem] py-[0.2rem] font-mono text-sm">HttpClientService</code> - Redundant with namespace</li>
          <li><code className="relative rounded bg-background px-[0.3rem] py-[0.2rem] font-mono text-sm">DatabaseConnectionHandler</code> - Too verbose</li>
        </ul>
      </div>

      <h3 id="method-naming">Method naming</h3>
      <p>
        Methods should be verbs describing actions, using camelCase. Avoid repeating the class name or namespace context.
      </p>

      <div className="bg-muted rounded-lg p-4 my-4">
        <h4 className="font-semibold mb-2">Good examples:</h4>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><code className="relative rounded bg-background px-[0.3rem] py-[0.2rem] font-mono text-sm">find()</code> - Simple, clear action</li>
          <li><code className="relative rounded bg-background px-[0.3rem] py-[0.2rem] font-mono text-sm">create()</code> - Domain action</li>
          <li><code className="relative rounded bg-background px-[0.3rem] py-[0.2rem] font-mono text-sm">isValid()</code> - Boolean check</li>
          <li><code className="relative rounded bg-background px-[0.3rem] py-[0.2rem] font-mono text-sm">get()</code> - Simple retrieval</li>
        </ul>
      </div>

      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 my-4">
        <h4 className="font-semibold mb-2 text-destructive">Avoid:</h4>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><code className="relative rounded bg-background px-[0.3rem] py-[0.2rem] font-mono text-sm">findUser()</code> - Redundant with User class</li>
          <li><code className="relative rounded bg-background px-[0.3rem] py-[0.2rem] font-mono text-sm">createUserAccount()</code> - Too verbose</li>
          <li><code className="relative rounded bg-background px-[0.3rem] py-[0.2rem] font-mono text-sm">isUserValid()</code> - Redundant context</li>
        </ul>
      </div>

      <h3 id="property-and-variable-naming">Properties and variables</h3>
      <p>
        Use descriptive names that clearly indicate purpose and type. Prefer short, meaningful names over verbose ones.
      </p>

      <div className="bg-muted rounded-lg p-4 my-4">
        <h4 className="font-semibold mb-2">Good examples:</h4>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><code className="relative rounded bg-background px-[0.3rem] py-[0.2rem] font-mono text-sm">$id</code> - Clear identifier</li>
          <li><code className="relative rounded bg-background px-[0.3rem] py-[0.2rem] font-mono text-sm">$name</code> - Simple property</li>
          <li><code className="relative rounded bg-background px-[0.3rem] py-[0.2rem] font-mono text-sm">$isActive</code> - Boolean with prefix</li>
          <li><code className="relative rounded bg-background px-[0.3rem] py-[0.2rem] font-mono text-sm">$config</code> - Configuration object</li>
        </ul>
      </div>

      <h3 id="namespace-context">Namespace context</h3>
      <p>
        When working within a namespace, avoid repeating the namespace context in your names. The namespace already provides 
        the context, so be more specific about the actual purpose.
      </p>

      <div className="bg-muted rounded-lg p-4 my-4">
        <h4 className="font-semibold mb-2">Good examples:</h4>
        <div className="text-sm">
          <p className="mb-2">In <code className="relative rounded bg-background px-[0.3rem] py-[0.2rem] font-mono">Utopia\Database</code> namespace:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><code className="relative rounded bg-background px-[0.3rem] py-[0.2rem] font-mono text-sm">Query::select()</code> - Not DatabaseQuery</li>
            <li><code className="relative rounded bg-background px-[0.3rem] py-[0.2rem] font-mono text-sm">Connection::connect()</code> - Not DatabaseConnection</li>
            <li><code className="relative rounded bg-background px-[0.3rem] py-[0.2rem] font-mono text-sm">Adapter::execute()</code> - Not DatabaseAdapter</li>
          </ul>
        </div>
      </div>

      <h3 id="domain-driven-design">Domain-driven design</h3>
      <p>
        Names should reflect the business domain and use terminology that domain experts would understand. 
        This makes the code more maintainable and easier to understand for both developers and stakeholders.
      </p>

      <div className="bg-muted rounded-lg p-4 my-4">
        <h4 className="font-semibold mb-2">Domain examples:</h4>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><code className="relative rounded bg-background px-[0.3rem] py-[0.2rem] font-mono text-sm">Order</code> - E-commerce domain</li>
          <li><code className="relative rounded bg-background px-[0.3rem] py-[0.2rem] font-mono text-sm">Payment</code> - Financial domain</li>
          <li><code className="relative rounded bg-background px-[0.3rem] py-[0.2rem] font-mono text-sm">Session</code> - Authentication domain</li>
          <li><code className="relative rounded bg-background px-[0.3rem] py-[0.2rem] font-mono text-sm">Cache</code> - Performance domain</li>
        </ul>
      </div>

      <DocsCallout type="info" title="Naming checklist">
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>Is the name clear and self-documenting?</li>
          <li>Does it avoid repeating namespace or class context?</li>
          <li>Is it as short as possible while remaining clear?</li>
          <li>Does it use domain-appropriate terminology?</li>
          <li>Would a new developer understand it without explanation?</li>
        </ul>
      </DocsCallout>

      {/* Testing */}
      <h2 id="testing">Testing</h2>
      <p>
        All contributions require comprehensive testing. Write unit tests for new public methods, 
        integration tests for complex functionality, and edge case tests for error conditions. 
        Include performance tests for critical paths and aim for 90%+ coverage on new code.
      </p>

      <p>
        Run <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">composer test</code> to execute all tests, or <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">composer test-coverage</code> 
        for detailed coverage reports. Ensure your changes don't break existing functionality and maintain 
        or improve overall test coverage.
      </p>

      {/* Pull Request Process */}
      <h2 id="pull-request-process">Pull request process</h2>
      <p>
        Before submitting, ensure all tests pass with <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">composer test</code>, fix code style with 
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">composer format</code>, update documentation, add tests for new functionality, and update 
        CHANGELOG.md if applicable.
      </p>

      <p>
        Write clear, descriptive PR titles and detailed descriptions explaining what changed and why. 
        Reference related issues with "Fixes #123" or "Closes #123", include screenshots for UI changes, 
        and keep PRs focused on single features or bug fixes. Update documentation for any API changes.
      </p>

      <p>
        Automated checks must pass before review. At least one maintainer will review your code, 
        provide feedback, and merge once approved. Address all requested changes promptly.
      </p>

      {/* Issue Guidelines */}
      <h2 id="issue-guidelines">Issue guidelines</h2>
      <p>
        Help us resolve issues quickly with clear, detailed reports. For bugs, include a clear description, 
        reproduction steps, expected vs actual behavior, environment details (PHP version, OS), code samples, 
        and error messages or stack traces.
      </p>

      <p>
        For feature requests, provide a clear description, use case and motivation, proposed API or interface design, 
        alternatives considered, and additional context or examples. The more detail you provide, the faster we can 
        understand and address your needs.
      </p>

      {/* Community Guidelines */}
      <h2 id="community-guidelines">Community guidelines</h2>
      <p>
        We maintain a welcoming, inclusive environment where all contributors feel valued. Be respectful and inclusive 
        in all interactions, use welcoming language, and show patience with newcomers. Focus on constructive feedback 
        and collaboration while respecting different viewpoints and experiences.
      </p>

      <p>
        Communicate clearly and concisely in issues and PRs. Be patient with maintainers who are volunteers, 
        ask questions when unclear, and provide context when reporting issues. Join our <a href={DISCORD_LINK} className="text-primary hover:underline inline-flex items-center gap-1" target="_blank" rel="noopener noreferrer">
          <DiscordIcon size={12} />
          Discord community
        </a> 
        for real-time discussions and support. Remember that we're all working together to build something great.
      </p>

      {/* Recognition */}
      <h2 id="recognition">Recognition</h2>
      <p>
        We value all contributions and recognize contributors through release notes credits, GitHub contributor status, 
        community recognition in discussions, and networking opportunities with other PHP developers. 
        Contributing also provides excellent learning opportunities and skill development.
      </p>

      {/* Resources */}
      <h2 id="resources">Resources</h2>
      <p>
        Access our <a href="/" className="text-primary hover:underline">Library Documentation</a> for complete API references 
        and examples, check the <a href="/docs/changelog" className="text-primary hover:underline">Changelog</a> for latest updates, 
        browse the <a href={GITHUB_LINK} className="text-primary hover:underline inline-flex items-center gap-1" target="_blank" rel="noopener noreferrer">
          <Github className="h-3 w-3" />
          GitHub Organization
        </a>{' '}
        for all repositories and source code, and join our <a href={DISCORD_LINK} className="text-primary hover:underline inline-flex items-center gap-1" target="_blank" rel="noopener noreferrer">
          <DiscordIcon size={12} />
          Discord community
        </a>{' '}
        for real-time discussions and support.
      </p>

      <p>
        Key development libraries include the <a href="https://github.com/utopia-php/http" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">HTTP Library</a>{' '}
        for routing and PSR-7 compliance, <a href="https://github.com/utopia-php/database" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Database Library</a>{' '}
        for multi-database support, and <a href="https://github.com/utopia-php/cache" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Cache Library</a>{' '}
        for Redis and Memcached backends.
      </p>

      <p className="text-sm text-muted-foreground mt-8">
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
