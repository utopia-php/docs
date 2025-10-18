import React from 'react'
import { SiteHeader } from './site-header'
import { SiteFooter } from './site-footer'
import { BackToTopButton } from './back-to-top-button'

interface BlogLayoutProps {
  children: React.ReactNode
  title?: string
}

export function BlogLayout({
  children,
  title = 'Utopia.php',
}: BlogLayoutProps) {
  return (
    <div className="min-h-screen blog-layout">
      <SiteHeader title={title} />

      {/* Main Content */}
      <main className="mx-auto px-4" style={{ maxWidth: '1400px' }}>
        {children}
      </main>

      <SiteFooter />
      <BackToTopButton />
    </div>
  )
}
