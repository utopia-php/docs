import React from 'react'
import { SiteHeader } from './site-header'
import { SiteFooter } from './site-footer'

interface BlogLayoutProps {
  children: React.ReactNode
  title?: string
}

export function BlogLayout({ children, title = 'Utopia.php' }: BlogLayoutProps) {
  return (
    <div className="min-h-screen">
      <SiteHeader title={title} />
      
      {/* Main Content */}
      <main className="mx-auto px-4" style={{ maxWidth: '1400px' }}>
        {children}
      </main>
      
      <SiteFooter />
    </div>
  )
}
