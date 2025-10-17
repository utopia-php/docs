import * as React from 'react'
import { DocsNavigation } from './docs-navigation'
import { DocsToc } from './docs-toc'
import { DocsMobileNav } from './docs-mobile-nav'
import { DocsThemeToggle } from './docs-theme-toggle'
import { GitHubIcon } from '@/components/ui/github-icon'
import { ExternalLink } from 'lucide-react'
import type { NavItem } from './docs-navigation'
import librariesData from '@/data/libraries.json'

interface DocsLayoutProps {
  children: React.ReactNode
  title?: string
  navItems?: NavItem[]
  rightSidebar?: React.ReactNode
}

// Calculate total stars from all libraries
function getTotalStars(): number {
  const allLibraries = Object.values(librariesData).flat()
  return allLibraries.reduce((total, library) => total + library.stars, 0)
}

export function DocsLayout({
  children,
  title = 'Utopia.php',
  navItems,
  rightSidebar,
}: DocsLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-4">
        <div className="flex h-14 mx-auto items-center justify-between px-4" style={{ maxWidth: '1400px' }}>
          <div className="flex items-center gap-2">
            <DocsMobileNav items={navItems} />
            <a className="flex items-center space-x-1" href="/">
              <img
                src="/logo-light.svg"
                alt={title}
                className="h-8 w-auto dark:hidden"
              />
              <img
                src="/logo-dark.svg"
                alt={title}
                className="h-8 w-auto hidden dark:block"
              />
            </a>
          </div>
          
          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <a 
              href="/" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </a>
            <a 
              href="/#libraries" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Libraries
            </a>
            <a 
              href="/changelog" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Changelog
            </a>
            <a 
              href="/blog" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </a>
            <a 
              href="https://github.com/utopia-php" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
              <ExternalLink size={10} className="opacity-60" />
            </a>
            <a 
              href="https://discord.gg/utopia-php" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Discord
              <ExternalLink size={10} className="opacity-60" />
            </a>
          </nav>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/utopia-php" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-muted-foreground border border-muted rounded-lg px-2 py-1 hover:bg-muted/50 transition-colors hover:text-foreground"
            >
              <GitHubIcon size={14} />
              <span className="font-medium">{getTotalStars().toLocaleString()}</span>
            </a>
            <DocsThemeToggle />
          </div>
        </div>
      </header>

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

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-8">
        <div className="flex h-12 w-full items-center justify-center px-4 md:px-6 lg:px-8">
          <div className="flex w-full items-center justify-center" style={{ maxWidth: '1400px' }}>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Utopia.php • Generated by{' '}
              <a 
                href="https://imagine.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Imagine.dev
              </a>
              {' '}• Hosted on{' '}
              <a 
                href="https://appwrite.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Appwrite Sites
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
