import * as React from 'react'
import { DocsNavigation } from './docs-navigation'
import { DocsToc } from './docs-toc'
import { SiteHeader } from './site-header'
import { SiteFooter } from './site-footer'
import type { NavItem } from './docs-navigation'

interface DocsLayoutProps {
  children: React.ReactNode
  title?: string
  navItems?: NavItem[]
  rightSidebar?: React.ReactNode
}

export function DocsLayout({
  children,
  title = 'Utopia.php',
  navItems,
  rightSidebar,
}: DocsLayoutProps) {
  return (
    <div className="min-h-screen">
      <SiteHeader title={title} navItems={navItems} />

      {/* Main Layout */}
      <div className="flex w-full items-start px-4 md:px-6 lg:px-8">
        <div className="flex w-full mx-auto" style={{ maxWidth: '1400px' }}>
          {/* Left Sidebar - Navigation */}
          <aside className="fixed top-[calc(3.5rem+1rem)] z-30 -ml-1 hidden h-[calc(100vh-4.5rem)] w-56 max-w-56 shrink-0 md:block overflow-y-auto">
            <div className="py-3 pr-3 lg:py-4 max-w-full">
              <DocsNavigation items={navItems} />
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 flex justify-center md:ml-56">
            <div className="w-full max-w-4xl py-3 lg:py-4">
              <main>
                <div className="max-w-3xl mx-auto">
                  {children}
                </div>
              </main>
            </div>
          </div>

          {/* Right Sidebar - Table of Contents or Custom Content */}
          <aside className="hidden xl:block w-48 max-w-48 shrink-0">
            <div className="sticky top-16 py-3 pl-3 max-w-full">
              {rightSidebar || <DocsToc maxLevel={3} />}
            </div>
          </aside>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
