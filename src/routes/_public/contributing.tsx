import { createFileRoute } from '@tanstack/react-router'
import {
  DocsLayout,
  DocsContent,
  Breadcrumbs,
  DocsCallout,
  InlineCode,
} from '@/components/docs'
import { Code, Bug, FileText, MessageCircle, Github, MessageSquare } from 'lucide-react'

const DISCORD_LINK = 'https://discord.gg/kzU59Qr6QJ'

export const Route = createFileRoute('/_public/contributing')({
  component: Contributing,
})

function Contributing() {
  return (
    <DocsLayout>
      <DocsContent>
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Contributing', current: true }
          ]} 
        />
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Contributing to Utopia PHP</h1>
          <p className="text-sm text-muted-foreground">
            Help us build better micro-libraries for PHP microservice architectures. 
            Your contributions make a real difference in the open source community.
          </p>
        </div>

        {/* Quick Start */}
        <DocsCallout type="info" title="Quick Start">
          <p className="text-sm">
            Fork your target repository, create a feature branch with <InlineCode>git checkout -b feature/amazing-feature</InlineCode>, 
            implement your changes with thorough testing, commit with clear messages, push to your fork, and open a Pull Request. 
            That's it-you're contributing to Utopia PHP.
          </p>
        </DocsCallout>

        {/* Ways to Contribute */}
        <h2 id="ways-to-contribute">Ways to Contribute</h2>
        <p>
          Every contribution matters, whether you're writing code, improving documentation, reporting issues, or helping fellow developers. 
          Here are the main areas where you can make an impact:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Code className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Code Contributions</h3>
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
              Help others understand and adopt Utopia PHP through clear documentation, 
              practical examples, and comprehensive guides. This includes API references, 
              tutorials, README improvements, and translations.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Bug className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Issue Reporting</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Identify and report bugs, security vulnerabilities, and performance issues. 
              Provide clear reproduction steps, environment details, and suggested solutions. 
              Feature requests should include use cases and implementation ideas.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Community Support</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Help grow the community by answering questions, reviewing pull requests, 
              sharing knowledge through tutorials and blog posts, and mentoring newcomers. 
              Your expertise helps others succeed with Utopia PHP.
            </p>
          </div>
        </div>

        {/* Development Setup */}
        <h2 id="development-setup">Development Setup</h2>
        <p>
          Get started contributing with a simple setup process. You'll need PHP 8.1+, Composer, Git, and your preferred editor.
        </p>

        <h3 id="getting-started">Getting Started</h3>
        <p>
          Fork your target repository on GitHub, then clone it locally with <InlineCode>git clone https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git</InlineCode>. 
          Add the upstream remote with <InlineCode>git remote add upstream https://github.com/utopia-php/REPOSITORY_NAME.git</InlineCode>, 
          install dependencies via <InlineCode>composer install</InlineCode>, and create your feature branch with 
          <InlineCode>git checkout -b feature/your-feature-name</InlineCode>.
        </p>

        {/* Coding Standards */}
        <h2 id="coding-standards">Coding Standards</h2>
        <p>
          Maintain high code quality with PSR-12 compliance, comprehensive type hints, and meaningful naming conventions. 
          Write focused methods with single responsibilities, include detailed docblocks for public APIs, and ensure 
          comprehensive test coverage for all new functionality.
        </p>

        <p>
          Each Utopia PHP library includes automated formatting and linting tools. Run <InlineCode>composer format</InlineCode> 
          to automatically fix code style issues, and <InlineCode>composer test</InlineCode> to validate that everything 
          complies with our standards. This ensures consistent code quality across all contributions.
        </p>

        {/* Testing */}
        <h2 id="testing">Testing</h2>
        <p>
          All contributions require comprehensive testing. Write unit tests for new public methods, 
          integration tests for complex functionality, and edge case tests for error conditions. 
          Include performance tests for critical paths and aim for 90%+ coverage on new code.
        </p>

        <p>
          Run <InlineCode>composer test</InlineCode> to execute all tests, or <InlineCode>composer test-coverage</InlineCode> 
          for detailed coverage reports. Ensure your changes don't break existing functionality and maintain 
          or improve overall test coverage.
        </p>

        {/* Pull Request Process */}
        <h2 id="pull-request-process">Pull Request Process</h2>
        <p>
          Before submitting, ensure all tests pass with <InlineCode>composer test</InlineCode>, fix code style with 
          <InlineCode>composer format</InlineCode>, update documentation, add tests for new functionality, and update 
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
        <h2 id="issue-guidelines">Issue Guidelines</h2>
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
        <h2 id="community-guidelines">Community Guidelines</h2>
        <p>
          We maintain a welcoming, inclusive environment where all contributors feel valued. Be respectful and inclusive 
          in all interactions, use welcoming language, and show patience with newcomers. Focus on constructive feedback 
          and collaboration while respecting different viewpoints and experiences.
        </p>

        <p>
          Communicate clearly and concisely in issues and PRs. Be patient with maintainers who are volunteers, 
          ask questions when unclear, and provide context when reporting issues. Join our <a href={DISCORD_LINK} className="text-primary hover:underline inline-flex items-center gap-1" target="_blank" rel="noopener noreferrer">
            <MessageSquare className="h-3 w-3" />
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
          and examples, check the <a href="/changelog" className="text-primary hover:underline">Changelog</a> for latest updates, 
          browse the <a href="https://github.com/utopia-php" className="text-primary hover:underline inline-flex items-center gap-1" target="_blank" rel="noopener noreferrer">
            <Github className="h-3 w-3" />
            GitHub Organization
          </a> 
          for all repositories and source code, and join our <a href={DISCORD_LINK} className="text-primary hover:underline inline-flex items-center gap-1" target="_blank" rel="noopener noreferrer">
            <MessageSquare className="h-3 w-3" />
            Discord community
          </a> 
          for real-time discussions and support.
        </p>

        <p>
          Key development libraries include the <a href="https://github.com/utopia-php/http" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">HTTP Library</a> 
          for routing and PSR-7 compliance, <a href="https://github.com/utopia-php/database" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Database Library</a> 
          for multi-database support, and <a href="https://github.com/utopia-php/cache" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Cache Library</a> 
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
    </DocsLayout>
  )
}
