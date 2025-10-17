import React from 'react'
import { BlogArticleCard } from './blog-article-card'

interface BlogArticle {
  slug: string
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  featured?: boolean
  image?: string
}

interface BlogArticleListProps {
  articles: BlogArticle[]
}

export function BlogArticleList({ articles }: BlogArticleListProps) {
  // Separate featured and regular articles
  const featuredArticles = articles.filter(article => article.featured)
  const regularArticles = articles.filter(article => !article.featured)

  return (
    <div className="space-y-12">
      {/* Main Featured Article */}
      {featuredArticles.length > 0 && (
        <section>
          <div className="w-full">
            {featuredArticles.slice(0, 1).map((article) => (
              <BlogArticleCard key={article.slug} article={article} layout="featured" />
            ))}
          </div>
        </section>
      )}

      {/* Regular Articles */}
      {regularArticles.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-6">All Articles</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regularArticles.map((article) => (
              <BlogArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {articles.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-lg font-medium text-muted-foreground mb-2">
            No articles yet
          </h2>
          <p className="text-sm text-muted-foreground">
            Check back soon for new content!
          </p>
        </div>
      )}
    </div>
  )
}
