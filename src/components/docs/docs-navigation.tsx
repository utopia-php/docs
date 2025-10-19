import * as React from 'react'
import { cn } from '@/lib/utils'
import { ChevronRight, ArrowLeft } from 'lucide-react'
import { Link, useRouterState } from '@tanstack/react-router'
import {
  getAllLibraries,
  getCategories,
  getLibrarySlug,
  findLibraryByName,
  getLibraryConcepts,
} from '@/lib/libraries'

export interface NavItem {
  title: string
  href?: string
  items?: NavItem[]
  disabled?: boolean
  external?: boolean
}

interface DocsNavigationProps {
  items?: NavItem[]
}

// Generate library navigation dynamically
function generateLibraryNavItems(): NavItem[] {
  const categories = getCategories()
  const allLibraries = getAllLibraries()

  return categories.map((category) => {
    const categoryLibraries = allLibraries.filter(
      (lib) => lib.category === category,
    )

    return {
      title: category.charAt(0).toUpperCase() + category.slice(1),
      items: categoryLibraries.map((library) => ({
        title: library.name,
        href: `/docs/library/${getLibrarySlug(library.name)}`,
      })),
    }
  })
}

// Generate library-specific navigation items
function generateLibrarySpecificNavItems(libraryName: string): NavItem[] {
  const library = findLibraryByName(libraryName)
  if (!library) return defaultNavItems

  const concepts = getLibraryConcepts(library)

  const navItems: NavItem[] = [
    {
      title: 'Overview',
      href: `/docs/library/${getLibrarySlug(library.name)}`,
    },
  ]

  // Add concepts if they exist
  if (concepts.length > 0) {
    navItems.push({
      title: 'Concepts',
      items: concepts.map((concept) => ({
        title: concept.title,
        href: `/docs/library/${getLibrarySlug(library.name)}/concept/${concept.path}`,
      })),
    })
  }

  // Add external documentation link
  navItems.push({
    title: 'Full Documentation',
    href: library.documentation,
    external: true,
  })

  return navItems
}

// Default navigation structure
export const defaultNavItems: NavItem[] = [
  {
    title: 'Introduction',
    href: '/',
  },
  {
    title: 'Architecture',
    href: '/docs/architecture',
  },
  {
    title: 'Changelog',
    href: '/docs/changelog',
  },
  {
    title: 'Contributing',
    href: '/docs/contributing',
  },
  {
    title: 'vs Laravel',
    href: '/docs/comparison',
  },
  {
    title: 'Libraries',
    items: generateLibraryNavItems(),
  },
  {
    title: 'Examples',
    items: [
      {
        title: 'Example comps',
        href: '/docs/example-comps',
      },
    ],
  },
  {
    title: 'Advanced',
    items: [
      {
        title: 'Security',
        href: '/docs/security',
      },
    ],
  },
]

export function DocsNavigation({
  items = defaultNavItems,
}: DocsNavigationProps) {
  const router = useRouterState()
  const isLibraryPage = router.location.pathname.includes('/docs/library/')

  // Extract library name from URL for library pages
  const getLibraryName = () => {
    if (!isLibraryPage) return null
    const pathParts = router.location.pathname.split('/')
    // For concept pages, library name is the third-to-last part
    // For regular library pages, it's the last part
    const librarySlug = pathParts.includes('concept')
      ? pathParts[pathParts.length - 3] // /docs/library/http/concept/dependency-injection -> http
      : pathParts[pathParts.length - 1] // /docs/library/http -> http
    // Convert slug back to proper case (e.g., "dns" -> "DNS")
    return librarySlug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const libraryName = getLibraryName()

  // Use library-specific navigation if we're on a library page
  const navigationItems =
    isLibraryPage && libraryName
      ? generateLibrarySpecificNavItems(libraryName)
      : items

  return (
    <nav className="space-y-2">
      {/* Back button for library pages */}
      {isLibraryPage && (
        <div className="pb-4 border-b">
          <Link
            to="/"
            className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>
      )}

      {/* Library title for library pages */}
      {isLibraryPage && libraryName && (
        <div className="pb-2">
          <h3 className="px-2 py-1 text-sm font-semibold text-foreground">
            Utopia {libraryName}
          </h3>
        </div>
      )}

      {navigationItems.map((item, index) => (
        <NavSection key={index} item={item} />
      ))}
    </nav>
  )
}

function NavSection({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = React.useState(true)

  if (!item.items || item.items.length === 0) {
    return <NavLink item={item} />
  }

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm font-semibold hover:bg-accent transition-colors"
      >
        <span>{item.title}</span>
        <ChevronRight
          className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-90')}
        />
      </button>
      {isOpen && (
        <div className="ml-3 space-y-1 border-l pl-3">
          {item.items.map((subItem, index) => (
            <NavItem key={index} item={subItem} />
          ))}
        </div>
      )}
    </div>
  )
}

function NavItem({ item }: { item: NavItem }) {
  if (!item.items || item.items.length === 0) {
    return <NavLink item={item} />
  }

  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md px-2 py-1 text-sm hover:bg-accent transition-colors"
      >
        <span>{item.title}</span>
        <ChevronRight
          className={cn('h-3 w-3 transition-transform', isOpen && 'rotate-90')}
        />
      </button>
      {isOpen && (
        <div className="ml-3 space-y-1 border-l pl-3">
          {item.items.map((subItem, index) => (
            <NavLink key={index} item={subItem} />
          ))}
        </div>
      )}
    </div>
  )
}

function NavLink({ item }: { item: NavItem }) {
  const router = useRouterState()
  const pathname = router.location.pathname
  const isActive = item.href === pathname

  if (!item.href) {
    return (
      <div className="px-2 py-1 text-sm text-muted-foreground">
        {item.title}
      </div>
    )
  }

  if (item.disabled) {
    return (
      <div className="px-2 py-1 text-sm text-muted-foreground cursor-not-allowed opacity-60">
        {item.title}
      </div>
    )
  }

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'flex items-center justify-between rounded-md px-2 py-1 text-sm transition-colors hover:bg-accent',
          'text-muted-foreground hover:text-foreground',
        )}
      >
        <span>{item.title}</span>
        <ChevronRight className="h-3 w-3" />
      </a>
    )
  }

  return (
    <Link
      to={item.href}
      className={cn(
        'block rounded-md px-2 py-1 text-sm transition-colors hover:bg-accent',
        isActive
          ? 'bg-accent font-medium text-accent-foreground'
          : 'text-muted-foreground hover:text-foreground',
      )}
    >
      {item.title}
    </Link>
  )
}
