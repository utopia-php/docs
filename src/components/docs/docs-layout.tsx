import * as React from 'react'
import { cn } from '@/lib/utils'
import { DocsNavigation } from './docs-navigation'
import { DocsToc } from './docs-toc'
import { DocsMobileNav } from './docs-mobile-nav'
import { DocsThemeToggle } from './docs-theme-toggle'
import type { NavItem } from './docs-navigation'

interface DocsLayoutProps {
  children: React.ReactNode
  title?: string
  navItems?: NavItem[]
}

export function DocsLayout({
  children,
  title = 'Utopia.php',
  navItems,
}: DocsLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <DocsMobileNav items={navItems} />
            <a className="flex items-center space-x-2" href="/">
              <span className="font-bold text-lg">{title}</span>
            </a>
          </div>
          <DocsThemeToggle />
        </div>
      </header>

      {/* Main Layout */}
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 max-w-screen-2xl px-4 md:px-6 lg:px-8">
        {/* Left Sidebar - Navigation */}
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block overflow-y-auto">
          <div className="py-6 pr-6 lg:py-8">
            <DocsNavigation items={navItems} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_200px]">
          <div className="mx-auto w-full min-w-0 max-w-3xl">{children}</div>

          {/* Right Sidebar - Table of Contents */}
          <div className="hidden text-sm xl:block">
            <div className="sticky top-16 -mt-10 pt-4">
              <DocsToc />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
