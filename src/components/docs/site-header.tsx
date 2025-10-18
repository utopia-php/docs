import { DocsMobileNav } from './docs-mobile-nav'
import { DocsThemeToggle } from './docs-theme-toggle'
import { GitHubIcon } from '@/components/ui/github-icon'
import { DiscordIcon } from '@/components/ui/discord-icon'
import { Button } from '@/components/ui/button'
import { EmailSubscriptionPopover } from '@/components/email-subscription-popover'
import type { NavItem } from './docs-navigation'
import librariesData from '@/data/libraries.json'
import { DISCORD_LINK, GITHUB_LINK } from '@/lib/constants'

interface SiteHeaderProps {
  title?: string
  navItems?: NavItem[]
}

// Calculate total stars from all libraries
function getTotalStars(): number {
  const allLibraries = Object.values(librariesData).flat()
  return allLibraries.reduce((total, library) => total + library.stars, 0)
}

export function SiteHeader({ title = 'Utopia.php', navItems }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-4">
      <div className="relative flex h-14 mx-auto items-center justify-between px-4" style={{ maxWidth: '1400px' }}>
        <div className="flex items-center gap-2">
          {navItems && <DocsMobileNav items={navItems} />}
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
        
        {/* Center Navigation Links - Absolutely positioned */}
        <nav className="hidden md:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2">
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
              href="/docs/changelog" 
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
        </nav>
        
        <div className="flex items-center gap-4">
          <a 
            href={DISCORD_LINK} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-muted-foreground border border-muted rounded-lg px-2 py-1 hover:bg-muted/50 transition-colors hover:text-foreground"
          >
            <DiscordIcon size={14} />
            <span className="font-medium">Discord</span>
          </a>
          <a 
            href={GITHUB_LINK} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-muted-foreground border border-muted rounded-lg px-2 py-1 hover:bg-muted/50 transition-colors hover:text-foreground"
          >
            <GitHubIcon size={14} />
            <span className="font-medium">{getTotalStars().toLocaleString()}</span>
          </a>
          <DocsThemeToggle />
          <EmailSubscriptionPopover>
            <Button size="sm" className="hidden sm:inline-flex">
              Get updates
            </Button>
          </EmailSubscriptionPopover>
        </div>
      </div>
    </header>
  )
}

