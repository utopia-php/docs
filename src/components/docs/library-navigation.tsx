import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronRight, ArrowLeft, BookOpen, Code2, Zap, Settings, HelpCircle } from 'lucide-react'
import { Link, useRouterState } from '@tanstack/react-router'
import { Library, getLibrarySlug } from '@/lib/libraries'

interface LibraryNavigationProps {
  library: Library
}

export function LibraryNavigation({ library }: LibraryNavigationProps) {
  const router = useRouterState()
  const pathname = router.location.pathname

  // Generate navigation items specific to the library
  const libraryNavItems = [
    {
      title: 'Overview',
      href: `/docs/library/${getLibrarySlug(library.name)}`,
      icon: BookOpen,
    },
    {
      title: 'Features',
      href: `/docs/library/${getLibrarySlug(library.name)}#features`,
      icon: Zap,
    },
    {
      title: 'Get Started',
      href: `/docs/library/${getLibrarySlug(library.name)}#get-started`,
      icon: Code2,
    },
    {
      title: 'Key Concepts',
      href: `/docs/library/${getLibrarySlug(library.name)}#concepts`,
      icon: Settings,
    },
    {
      title: 'API Reference',
      href: library.documentation,
      icon: HelpCircle,
      external: true,
    },
  ]

  return (
    <div className="space-y-4">
      {/* Back Button */}
      <div className="pb-4 border-b">
        <Button 
          variant="ghost" 
          className="w-full justify-start -ml-2"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Libraries
        </Button>
      </div>

      {/* Library Info */}
      <div className="space-y-3">
        <div className="px-2">
          <h3 className="font-semibold text-sm text-foreground mb-1">{library.name}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {library.description}
          </p>
        </div>
        
        <div className="px-2 py-2 bg-muted/50 rounded-md">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Version</span>
            <span className="font-medium">{library.version}</span>
          </div>
          <div className="flex items-center justify-between text-xs mt-1">
            <span className="text-muted-foreground">Category</span>
            <span className="font-medium capitalize">{library.category}</span>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="space-y-1">
        {libraryNavItems.map((item, index) => {
          const Icon = item.icon
          const isActive = !item.external && item.href === pathname
          
          if (item.external) {
            return (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent',
                  'text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.title}</span>
                <ChevronRight className="h-3 w-3 ml-auto" />
              </a>
            )
          }

          return (
            <Link
              key={index}
              to={item.href}
              className={cn(
                'flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-accent font-medium text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          )
        })}
      </nav>

      {/* Quick Actions */}
      <div className="pt-4 border-t space-y-2">
        <div className="px-2">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Quick Actions
          </h4>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full justify-start"
          asChild
        >
          <a href={library.githubUrl} target="_blank" rel="noopener noreferrer">
            <Code2 className="h-4 w-4 mr-2" />
            View Source
          </a>
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full justify-start"
          asChild
        >
          <a href={library.documentation} target="_blank" rel="noopener noreferrer">
            <BookOpen className="h-4 w-4 mr-2" />
            Full Docs
          </a>
        </Button>
      </div>
    </div>
  )
}
