import { createFileRoute } from '@tanstack/react-router'
import { BlogLayout, BlogArticleList, Breadcrumbs } from '@/components/docs'

export const Route = createFileRoute('/_public/blog')({
  component: Blog,
})

function Blog() {
  // Sample blog articles data
  const articles = [
    {
      slug: 'introducing-utopia-php',
      title: 'Introducing Utopia.php: A Modern PHP Framework for the Future',
      excerpt:
        "We're excited to announce the official release of Utopia.php, a revolutionary PHP framework designed to bring modern development practices to the PHP ecosystem.",
      author: 'Utopia Team',
      date: '2024-01-15',
      readTime: '8 min read',
      featured: true,
      image: 'placeholder',
    },
    {
      slug: 'building-scalable-applications',
      title: 'Building Scalable PHP Applications with Utopia.php',
      excerpt:
        "Learn how to build scalable PHP applications using Utopia.php's powerful features and modern architectural patterns.",
      author: 'Utopia Team',
      date: '2024-01-20',
      readTime: '12 min read',
      featured: false,
      image: 'placeholder',
    },
    {
      slug: 'performance-optimization-tips',
      title: 'Performance Optimization Tips for PHP Applications',
      excerpt:
        'Discover proven techniques to optimize your PHP applications for better performance and scalability.',
      author: 'Utopia Team',
      date: '2024-01-25',
      readTime: '6 min read',
      featured: false,
      image: 'placeholder',
    },
    {
      slug: 'modern-php-development',
      title: 'Modern PHP Development Best Practices',
      excerpt:
        'Explore the latest best practices and patterns for modern PHP development with Utopia.php.',
      author: 'Utopia Team',
      date: '2024-01-30',
      readTime: '10 min read',
      featured: false,
      image: 'placeholder',
    },
    {
      slug: 'testing-strategies',
      title: 'Comprehensive Testing Strategies for PHP Applications',
      excerpt:
        "Learn how to implement effective testing strategies for your PHP applications using Utopia.php's testing tools.",
      author: 'Utopia Team',
      date: '2024-02-05',
      readTime: '9 min read',
      featured: false,
      image: 'placeholder',
    },
    {
      slug: 'deployment-guide',
      title: 'Production Deployment Guide for Utopia.php Applications',
      excerpt:
        'A complete guide to deploying your Utopia.php applications to production with best practices and security considerations.',
      author: 'Utopia Team',
      date: '2024-02-10',
      readTime: '15 min read',
      featured: false,
      image: 'placeholder',
    },
  ]

  return (
    <BlogLayout>
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[{ label: 'Home', href: '/' }]}
          showCopyPage={false}
        />

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Stay updated with the latest news, tutorials, and insights from the
            Utopia.php community.
          </p>
        </div>

        {/* Article List */}
        <BlogArticleList articles={articles} />
      </div>
    </BlogLayout>
  )
}
