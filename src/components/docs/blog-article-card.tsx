import React from 'react'
import { Link } from '@tanstack/react-router'

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

interface BlogArticleCardProps {
  article: BlogArticle
  layout?: 'default' | 'featured'
}

export function BlogArticleCard({ article, layout = 'default' }: BlogArticleCardProps) {
  const isFeatured = layout === 'featured'
  
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: article.slug }}
      className="block group"
    >
      <article className={`border rounded-lg overflow-hidden bg-card hover:bg-accent/50 transition-colors ${isFeatured ? 'w-full' : ''}`}>
        {isFeatured ? (
          // Featured layout: image on the side
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-6 space-y-4">
              {article.featured && (
                <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full">
                  Featured
                </span>
              )}
              
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold group-hover:text-primary transition-colors mb-3">
                  {article.title}
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-muted-foreground pt-2">
                <span>By {article.author}</span>
                <span className="hidden sm:inline">•</span>
                <time dateTime={article.date}>
                  {new Date(article.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </time>
                <span className="hidden sm:inline">•</span>
                <span>{article.readTime}</span>
              </div>
            </div>
            
            <div className="lg:w-1/2 aspect-video overflow-hidden">
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <div className="text-muted-foreground text-sm">Image Placeholder</div>
              </div>
            </div>
          </div>
        ) : (
          // Default layout: image on top
          <>
            {article.image && (
              <div className="aspect-video overflow-hidden">
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <div className="text-muted-foreground text-sm">Image Placeholder</div>
                </div>
              </div>
            )}
            
            <div className="p-6 space-y-4">
              {article.featured && (
                <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full">
                  Featured
                </span>
              )}
              
              <div>
                <h2 className="text-xl font-semibold group-hover:text-primary transition-colors mb-2">
                  {article.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground pt-2">
                <span>By {article.author}</span>
                <span className="hidden sm:inline">•</span>
                <time dateTime={article.date}>
                  {new Date(article.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </time>
                <span className="hidden sm:inline">•</span>
                <span>{article.readTime}</span>
              </div>
            </div>
          </>
        )}
      </article>
    </Link>
  )
}
