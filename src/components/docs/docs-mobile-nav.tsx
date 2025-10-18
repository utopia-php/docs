import * as React from 'react'
import { Menu, Home, BookOpen, FileText, Rss } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { DocsNavigation } from './docs-navigation'
import { GitHubIcon } from '@/components/ui/github-icon'
import { DiscordIcon } from '@/components/ui/discord-icon'
import { EmailSubscriptionPopover } from '@/components/email-subscription-popover'
import { DISCORD_LINK, GITHUB_LINK } from '@/lib/constants'
import librariesData from '@/data/libraries.json'
import type { NavItem } from './docs-navigation'

// Calculate total stars from all libraries
function getTotalStars(): number {
  const allLibraries = Object.values(librariesData).flat()
  return allLibraries.reduce((total, library) => total + library.stars, 0)
}

interface DocsMobileNavProps {
  items?: NavItem[]
}

export function DocsMobileNav({ items }: DocsMobileNavProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] sm:w-[400px] overflow-y-auto px-6"
      >
        <SheetHeader>
          <SheetTitle className="sr-only">Navigation</SheetTitle>
        </SheetHeader>
        
        {/* Main Navigation Links */}
        <div className="mt-6 space-y-2">
          <a
            href="/"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent text-muted-foreground hover:text-foreground"
          >
            <Home className="h-4 w-4" />
            Home
          </a>
          <a
            href="/#libraries"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent text-muted-foreground hover:text-foreground"
          >
            <BookOpen className="h-4 w-4" />
            Libraries
          </a>
          <a
            href="/docs/changelog"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent text-muted-foreground hover:text-foreground"
          >
            <FileText className="h-4 w-4" />
            Changelog
          </a>
          <a
            href="/blog"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent text-muted-foreground hover:text-foreground"
          >
            <Rss className="h-4 w-4" />
            Blog
          </a>
        </div>

        {/* External Links */}
        <div className="mt-6 space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Community</h3>
          <a
            href={DISCORD_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent text-muted-foreground hover:text-foreground"
          >
            <DiscordIcon size={16} />
            Discord
          </a>
          <a
            href={GITHUB_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent text-muted-foreground hover:text-foreground"
          >
            <GitHubIcon size={16} />
            GitHub ({getTotalStars().toLocaleString()} stars)
          </a>
        </div>

        {/* Email Subscription */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Stay Updated</h3>
          <EmailSubscriptionPopover>
            <Button size="sm" className="w-full">
              Get updates
            </Button>
          </EmailSubscriptionPopover>
        </div>

        {/* Docs Navigation */}
        {items && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Documentation</h3>
            <DocsNavigation items={items} />
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
