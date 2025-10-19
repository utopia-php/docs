import { createFileRoute } from '@tanstack/react-router'
import {
  DocsContent,
  DocsCallout,
  Breadcrumbs,
  CodeExample,
} from '@/components/docs'

export const Route = createFileRoute('/_docs/security')({
  component: Security,
})

function Security() {
  return (
    <DocsContent>
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Docs', href: '/docs' },
          { label: 'Security', current: true },
        ]}
      />

      <div className="space-y-1 mb-4">
        <h1>Security</h1>
        <p className="text-sm text-muted-foreground">
          Security practices and vulnerability reporting for Utopia PHP libraries
        </p>
      </div>

      <h2 id="overview">Overview</h2>
      <p>
        Security is a fundamental concern in software development, especially for
        libraries that form the foundation of countless applications. Utopia PHP
        takes security seriously, implementing multiple layers of protection and
        maintaining a responsible disclosure process for the community.
      </p>

      <p>
        As open-source libraries, Utopia's security approach focuses on secure
        coding practices, thorough testing, and community collaboration to
        identify and address potential vulnerabilities before they can impact
        production systems.
      </p>

      <h2 id="security-philosophy">Security philosophy</h2>
      <p>
        Our security philosophy is built on three core principles that guide how
        we develop, maintain, and secure Utopia libraries:
      </p>

      <ul>
        <li>
          <strong>Security by design</strong> - Security considerations are
          integrated into every aspect of library development from the ground up
        </li>
        <li>
          <strong>Transparency and collaboration</strong> - We work openly with
          the community to identify and resolve security issues
        </li>
        <li>
          <strong>Responsible disclosure</strong> - Vulnerabilities are handled
          through a coordinated process that protects users while allowing proper
          fixes
        </li>
      </ul>

      <h2 id="security-measures">Security measures</h2>

      <h3 id="secure-coding-practices">Secure coding practices</h3>
      <p>
        All Utopia libraries follow strict secure coding guidelines to prevent
        common vulnerabilities:
      </p>

      <ul>
        <li>
          <strong>Input validation</strong> - All user inputs are validated and
          sanitized before processing
        </li>
        <li>
          <strong>Output encoding</strong> - Data is properly encoded when
          output to prevent injection attacks
        </li>
        <li>
          <strong>Memory management</strong> - Careful memory handling to prevent
          buffer overflows and memory leaks
        </li>
        <li>
          <strong>Error handling</strong> - Secure error handling that doesn't
          expose sensitive information
        </li>
        <li>
          <strong>Cryptographic practices</strong> - Proper use of cryptographic
          functions and secure random number generation
        </li>
      </ul>

      <h3 id="code-review-process">Code review process</h3>
      <p>
        Every contribution to Utopia libraries undergoes thorough security
        review:
      </p>

      <ul>
        <li>
          <strong>Automated security scanning</strong> - Static analysis tools
          scan for common security patterns
        </li>
        <li>
          <strong>Manual review</strong> - Experienced developers review all
          code changes for security implications
        </li>
        <li>
          <strong>Dependency analysis</strong> - Third-party dependencies are
          checked for known vulnerabilities
        </li>
        <li>
          <strong>Testing requirements</strong> - Security-focused tests must
          pass before code is merged
        </li>
      </ul>

      <h3 id="continuous-monitoring">Continuous monitoring</h3>
      <p>
        We maintain ongoing security monitoring across all Utopia libraries:
      </p>

      <ul>
        <li>
          <strong>Dependency updates</strong> - Regular updates to address
          security patches in dependencies
        </li>
        <li>
          <strong>Vulnerability tracking</strong> - Monitoring security
          advisories and CVE databases
        </li>
        <li>
          <strong>Community reports</strong> - Active monitoring of community
          security reports and discussions
        </li>
        <li>
          <strong>Security testing</strong> - Automated security tests run on
          every build
        </li>
      </ul>

      <h2 id="vulnerability-reporting">Vulnerability reporting</h2>
      <p>
        We encourage security researchers and community members to report
        potential vulnerabilities in Utopia libraries. Responsible disclosure
        helps us address issues quickly while protecting users.
      </p>

      <h3 id="how-to-report">How to report vulnerabilities</h3>
      <p>
        If you discover a security vulnerability in any Utopia library, please
        report it through our coordinated disclosure process:
      </p>

      <ol>
        <li>
          <strong>Email security@appwrite.io</strong> - Send detailed information
          about the vulnerability
        </li>
        <li>
          <strong>Include details</strong> - Provide steps to reproduce, affected
          versions, and potential impact
        </li>
        <li>
          <strong>Wait for response</strong> - We'll acknowledge receipt within
          48 hours
        </li>
        <li>
          <strong>Follow responsible disclosure</strong> - Don't publicly
          disclose until we've had time to address the issue
        </li>
      </ol>

      <DocsCallout type="warning" title="Important">
        <p>
          Please do not report security vulnerabilities through public GitHub
          issues, discussions, or other public channels. This helps prevent
          exploitation before we can provide fixes.
        </p>
      </DocsCallout>

      <h3 id="what-to-include">What to include in your report</h3>
      <p>
        To help us address vulnerabilities quickly, please include:
      </p>

      <ul>
        <li>
          <strong>Description</strong> - Clear description of the vulnerability
        </li>
        <li>
          <strong>Affected libraries</strong> - Which Utopia library or libraries
          are affected
        </li>
        <li>
          <strong>Version information</strong> - Specific versions where the
          vulnerability exists
        </li>
        <li>
          <strong>Reproduction steps</strong> - Detailed steps to reproduce the
          issue
        </li>
        <li>
          <strong>Impact assessment</strong> - Potential impact and severity
          level
        </li>
        <li>
          <strong>Proof of concept</strong> - If possible, include a minimal
          proof of concept
        </li>
      </ul>

      <h2 id="security-best-practices">Security best practices for users</h2>
      <p>
        When using Utopia libraries in your applications, follow these security
        best practices:
      </p>

      <h3 id="keep-libraries-updated">Keep libraries updated</h3>
      <p>
        Always use the latest stable versions of Utopia libraries to benefit
        from security patches and improvements:
      </p>

      <CodeExample
        title="Updating Utopia libraries"
        description="How to keep your Utopia dependencies up to date"
        language="bash"
        filename="update-libraries.sh"
        code={`# Update all Utopia libraries to latest versions
composer update utopia/*

# Update specific library
composer update utopia/http

# Check for security vulnerabilities
composer audit`}
      />

      <h3 id="validate-inputs">Validate all inputs</h3>
      <p>
        Even though Utopia libraries include validation, always validate inputs
        at your application level:
      </p>

      <CodeExample
        title="Input validation example"
        description="Proper input validation when using Utopia libraries"
        language="php"
        filename="validation.php"
        code={`<?php

use Utopia\\Http\\Http;
use Utopia\\Http\\Request;
use Utopia\\Http\\Response;
use Utopia\\Validator\\Text;
use Utopia\\Validator\\Email;

Http::post('/users')
    ->param('name', '', new Text(100), 'User name')
    ->param('email', '', new Email(), 'User email')
    ->action(function(string $name, string $email, Request $request, Response $response) {
        // Additional application-level validation
        if (empty(trim($name))) {
            return $response->json(['error' => 'Name is required'], 400);
        }
        
        // Sanitize inputs before processing
        $name = htmlspecialchars(trim($name), ENT_QUOTES, 'UTF-8');
        $email = filter_var($email, FILTER_SANITIZE_EMAIL);
        
        // Process the validated and sanitized data
        // ...
    });`}
      />

      <h3 id="secure-configuration">Secure configuration</h3>
      <p>
        Configure Utopia libraries securely in production environments:
      </p>

      <CodeExample
        title="Secure configuration example"
        description="Security-focused configuration for Utopia libraries"
        language="php"
        filename="secure-config.php"
        code={`<?php

use Utopia\\Config\\Config;
use Utopia\\Logger\\Logger;
use Utopia\\Cache\\Cache;
use Utopia\\System\\System;

// Use environment variables for sensitive configuration
$config = new Config();
$config->set('DATABASE_URL', System::getEnv('DATABASE_URL'));
$config->set('CACHE_REDIS_URL', System::getEnv('CACHE_REDIS_URL'));
$config->set('LOG_LEVEL', System::getEnv('LOG_LEVEL') ?: 'info');

// Configure secure logging
$logger = new Logger();
$logger->setLevel($config->get('LOG_LEVEL'));

// Configure secure cache with proper TTL
$cache = new Cache();
$cache->setDefaultTTL(300); // 5 minutes default

// Disable debug mode in production
if (System::getEnv('APP_ENV') === 'production') {
    error_reporting(0);
    ini_set('display_errors', 0);
}`}
      />

      <h3 id="environment-variables">Environment variables</h3>
      <p>
        Properly managing environment variables is crucial for security. Use the{' '}
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          Utopia\\System\\System::getEnv()
        </code>{' '}
        method to access environment variables securely. Follow these guidelines when using Utopia libraries:
      </p>

      <ul>
        <li>
          <strong>Never commit secrets</strong> - Use <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">.env</code> files for local development and exclude them from version control
        </li>
        <li>
          <strong>Use strong, unique values</strong> - Generate cryptographically secure random values for API keys, tokens, and passwords
        </li>
        <li>
          <strong>Rotate regularly</strong> - Change sensitive environment variables periodically, especially in production
        </li>
        <li>
          <strong>Limit access</strong> - Only grant access to environment variables to team members who need them
        </li>
        <li>
          <strong>Use different values per environment</strong> - Never reuse production secrets in development or staging
        </li>
        <li>
          <strong>Validate on startup</strong> - Check that required environment variables are present and valid when your application starts
        </li>
      </ul>

      <CodeExample
        title="Environment variable validation"
        description="Proper validation of environment variables in Utopia applications"
        language="php"
        filename="env-validation.php"
        code={`<?php

use Utopia\\Config\\Config;
use Utopia\\System\\System;
use Utopia\\Http\\Http;
use Utopia\\Http\\Validator\\IP;
use Utopia\\Http\\Validator\\URL;
use Utopia\\Http\\Validator\\Text;
use Utopia\\Http\\Validator\\Numeric;

// Validate required environment variables on startup
$requiredEnvVars = [
    'APP_HOST',
    'APP_PORT',
    'APP_ENV',
    'APP_DEBUG',
    'DATABASE_URL',
    'CACHE_REDIS_URL',
    'JWT_SECRET'
];

$config = new Config();

foreach ($requiredEnvVars as $var) {
    $value = System::getEnv($var);
    
    if (empty($value)) {
        throw new Exception("Required environment variable {$var} is not set");
    }
    
    // Additional validation for specific variables using Utopia validators
    switch ($var) {
        case 'APP_HOST':
            $ipValidator = new IP();
            if (!$ipValidator->isValid($value)) {
                throw new Exception("Invalid APP_HOST format - must be a valid IP address");
            }
            break;
        case 'APP_PORT':
            $numericValidator = new Numeric();
            if (!$numericValidator->isValid($value) || $value < 1 || $value > 65535) {
                throw new Exception("APP_PORT must be a valid port number (1-65535)");
            }
            break;
        case 'APP_ENV':
            $textValidator = new Text(20);
            if (!$textValidator->isValid($value) || !in_array($value, ['development', 'staging', 'production'])) {
                throw new Exception("APP_ENV must be one of: development, staging, production");
            }
            break;
        case 'APP_DEBUG':
            $textValidator = new Text(10);
            if (!$textValidator->isValid($value) || !in_array($value, ['true', 'false', '1', '0'])) {
                throw new Exception("APP_DEBUG must be true/false or 1/0");
            }
            break;
        case 'DATABASE_URL':
            $urlValidator = new URL();
            if (!$urlValidator->isValid($value)) {
                throw new Exception("Invalid DATABASE_URL format");
            }
            break;
        case 'CACHE_REDIS_URL':
            $urlValidator = new URL();
            if (!$urlValidator->isValid($value)) {
                throw new Exception("Invalid CACHE_REDIS_URL format");
            }
            break;
        case 'JWT_SECRET':
            $textValidator = new Text(1000);
            if (!$textValidator->isValid($value) || strlen($value) < 32) {
                throw new Exception("JWT_SECRET must be at least 32 characters");
            }
            break;
    }
    
    $config->set($var, $value);
}

// Configure HTTP server with validated environment variables
$http = new Http();
$http->setHost($config->get('APP_HOST'));
$http->setPort((int) $config->get('APP_PORT'));

// Use validated configuration
$database = new Database($config->get('DATABASE_URL'));
$jwt = new JWT($config->get('JWT_SECRET'));`}
      />

      <h2 id="security-timeline">Security response timeline</h2>
      <p>
        We're committed to addressing security issues promptly and transparently:
      </p>

      <ul>
        <li>
          <strong>Initial response</strong> - Acknowledge receipt within 48 hours
        </li>
        <li>
          <strong>Assessment</strong> - Evaluate severity and impact within 5
          business days
        </li>
        <li>
          <strong>Fix development</strong> - Develop and test fixes within 30
          days for critical issues
        </li>
        <li>
          <strong>Release</strong> - Release fixes as soon as they're ready and
          tested
        </li>
        <li>
          <strong>Disclosure</strong> - Public disclosure after fixes are
          available
        </li>
      </ul>

      <h2 id="contact-information">Contact information</h2>
      <p>
        For all security-related matters including vulnerability reports, 
        questions, and collaboration opportunities, please contact us at{' '}
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          security<span className="hidden">@</span>@appwrite.io
        </code>
        .
      </p>

      <p>
        We appreciate your help in keeping Utopia libraries secure and
        protecting the applications that depend on them.
      </p>
    </DocsContent>
  )
}
