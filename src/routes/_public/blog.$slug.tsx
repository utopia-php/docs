import { createFileRoute } from '@tanstack/react-router'
import { BlogLayout, BlogTableOfContents, Breadcrumbs } from '@/components/docs'

export const Route = createFileRoute('/_public/blog/$slug')({
  component: BlogArticle,
})

function BlogArticle() {
  const { slug } = Route.useParams()
  
  // Article data based on slug
  const getArticleData = (slug: string) => {
    const articles: Record<string, any> = {
      'introducing-utopia-php': {
        title: "Introducing Utopia.php: A Modern PHP Framework for the Future",
        author: "Utopia Team",
        date: "2024-01-15",
        readTime: "8 min read",
        content: `
          <p>We're excited to announce the official release of Utopia.php, a revolutionary PHP framework designed to bring modern development practices to the PHP ecosystem. Built from the ground up with performance, developer experience, and scalability in mind.</p>
          
          <h2 id="why-utopia-php">Why Utopia.php?</h2>
          <p>After years of working with existing PHP frameworks, we identified several pain points that were holding back the PHP community. Utopia.php addresses these challenges with innovative solutions and modern architectural patterns.</p>
          
          <h2 id="key-features">Key Features</h2>
          <p>Utopia.php comes packed with features designed to make PHP development more enjoyable and productive:</p>
          
          <h3 id="lightning-fast">Lightning Fast Performance</h3>
          <p>Built for performance with minimal overhead, Utopia.php delivers exceptional speed and efficiency.</p>
          
          <h3 id="type-safety">Type Safety</h3>
          <p>Full TypeScript-like experience with PHP 8+ features for better code quality and developer experience.</p>
          
          <h3 id="modern-architecture">Modern Architecture</h3>
          <p>Clean separation of concerns and SOLID principles make your code more maintainable and testable.</p>
          
          <h2 id="getting-started">Getting Started</h2>
          <p>Getting started with Utopia.php is straightforward. Our comprehensive documentation and examples make it easy to build your first application in minutes.</p>
          
          <h2 id="whats-next">What's Next?</h2>
          <p>This is just the beginning. We have an exciting roadmap ahead with new features, performance improvements, and community contributions.</p>
        `
      },
      'building-scalable-applications': {
        title: "Building Scalable PHP Applications with Utopia.php",
        author: "Utopia Team",
        date: "2024-01-20",
        readTime: "12 min read",
        content: `
          <p>In this comprehensive guide, we'll explore how to build scalable PHP applications using Utopia.php's powerful features and modern architectural patterns.</p>
          
          <h2 id="introduction">Introduction</h2>
          <p>Scalability is one of the most critical aspects of modern web applications. As your user base grows, your application needs to handle increased load while maintaining performance and reliability.</p>
          
          <h2 id="architecture-patterns">Architecture Patterns</h2>
          <p>Utopia.php provides several architectural patterns that make it easy to build scalable applications:</p>
          
          <h3 id="microservices">Microservices Architecture</h3>
          <p>Break your application into smaller, independent services that can be developed, deployed, and scaled independently.</p>
          
          <h3 id="event-driven">Event-Driven Architecture</h3>
          <p>Use events to decouple components and enable asynchronous processing for better performance.</p>
          
          <h2 id="performance-optimization">Performance Optimization</h2>
          <p>Several techniques can help optimize your Utopia.php application for better performance:</p>
          
          <h3 id="caching">Caching Strategies</h3>
          <p>Implement effective caching at multiple levels to reduce database queries and improve response times.</p>
          
          <h3 id="database-optimization">Database Optimization</h3>
          <p>Optimize your database queries and use connection pooling to handle concurrent requests efficiently.</p>
          
          <h2 id="monitoring">Monitoring and Observability</h2>
          <p>Implement comprehensive monitoring to track performance metrics and identify bottlenecks early.</p>
          
          <h2 id="conclusion">Conclusion</h2>
          <p>Building scalable applications with Utopia.php requires careful planning and the right architectural decisions. By following these patterns and best practices, you can create applications that grow with your business needs.</p>
        `
      },
      'performance-optimization-tips': {
        title: "Performance Optimization Tips for PHP Applications",
        author: "Utopia Team",
        date: "2024-01-25",
        readTime: "6 min read",
        content: `
          <p>Discover proven techniques to optimize your PHP applications for better performance and scalability.</p>
          
          <h2 id="opcache">Enable OPcache</h2>
          <p>OPcache is one of the most effective ways to improve PHP performance by caching compiled bytecode.</p>
          
          <h2 id="database-optimization">Database Optimization</h2>
          <p>Optimize your database queries and use proper indexing to reduce query execution time.</p>
          
          <h2 id="caching">Implement Caching</h2>
          <p>Use various caching strategies including application-level caching, database query caching, and CDN caching.</p>
          
          <h2 id="memory-management">Memory Management</h2>
          <p>Optimize memory usage by avoiding memory leaks and using efficient data structures.</p>
        `
      },
      'modern-php-development': {
        title: "Modern PHP Development Best Practices",
        author: "Utopia Team",
        date: "2024-01-30",
        readTime: "10 min read",
        content: `
          <p>Explore the latest best practices and patterns for modern PHP development with Utopia.php.</p>
          
          <h2 id="psr-standards">PSR Standards</h2>
          <p>Follow PSR standards for coding style, autoloading, and other common interfaces.</p>
          
          <h2 id="dependency-injection">Dependency Injection</h2>
          <p>Use dependency injection to create loosely coupled, testable code.</p>
          
          <h2 id="error-handling">Error Handling</h2>
          <p>Implement proper error handling and logging strategies for better debugging and monitoring.</p>
          
          <h2 id="testing">Testing</h2>
          <p>Write comprehensive tests including unit tests, integration tests, and end-to-end tests.</p>
        `
      },
      'testing-strategies': {
        title: "Comprehensive Testing Strategies for PHP Applications",
        author: "Utopia Team",
        date: "2024-02-05",
        readTime: "9 min read",
        content: `
          <p>Learn how to implement effective testing strategies for your PHP applications using Utopia.php's testing tools.</p>
          
          <h2 id="unit-testing">Unit Testing</h2>
          <p>Write isolated tests for individual functions and methods to ensure they work correctly.</p>
          
          <h2 id="integration-testing">Integration Testing</h2>
          <p>Test how different parts of your application work together.</p>
          
          <h2 id="end-to-end-testing">End-to-End Testing</h2>
          <p>Test complete user workflows to ensure the entire application works as expected.</p>
          
          <h2 id="test-automation">Test Automation</h2>
          <p>Set up automated testing pipelines to run tests on every code change.</p>
        `
      },
      'deployment-guide': {
        title: "Production Deployment Guide for Utopia.php Applications",
        author: "Utopia Team",
        date: "2024-02-10",
        readTime: "15 min read",
        content: `
          <p>A complete guide to deploying your Utopia.php applications to production with best practices and security considerations.</p>
          
          <h2 id="environment-setup">Environment Setup</h2>
          <p>Configure your production environment with proper PHP settings and extensions.</p>
          
          <h2 id="security-considerations">Security Considerations</h2>
          <p>Implement security best practices including HTTPS, input validation, and access controls.</p>
          
          <h2 id="monitoring">Monitoring and Logging</h2>
          <p>Set up comprehensive monitoring and logging to track application health and performance.</p>
          
          <h2 id="scaling">Scaling Strategies</h2>
          <p>Plan for horizontal and vertical scaling to handle increased load.</p>
          
          <h2 id="backup-recovery">Backup and Recovery</h2>
          <p>Implement robust backup and recovery procedures to protect your data.</p>
        `
      }
    }
    
    return articles[slug] || {
      title: "Article Not Found",
      author: "Utopia Team",
      date: "2024-01-01",
      readTime: "1 min read",
      content: `<p>The requested article could not be found.</p>`
    }
  }
  
  const article = getArticleData(slug)

  return (
    <BlogLayout>
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' }
          ]} 
          showCopyPage={false}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="prose prose-slate dark:prose-invert max-w-none">
              {/* Article Header */}
              <header className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span>By {article.author}</span>
                  <span>•</span>
                  <time dateTime={article.date}>{new Date(article.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</time>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </header>
              
              {/* Article Content */}
              <div 
                className="space-y-6"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
              
              {/* Article Footer */}
              <footer className="mt-12 pt-8 border-t">
                <div className="flex gap-4">
                  <a 
                    href="/blog" 
                    className="inline-flex items-center px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                  >
                    ← Back to Blog
                  </a>
                  <a 
                    href="https://github.com/utopia-php" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    View on GitHub
                  </a>
                </div>
              </footer>
            </article>
          </div>
          
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-1">
            <BlogTableOfContents />
          </div>
        </div>
      </div>
    </BlogLayout>
  )
}
