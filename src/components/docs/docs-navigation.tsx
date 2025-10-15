import * as React from 'react'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import { Link, useRouterState } from '@tanstack/react-router'

export interface NavItem {
  title: string
  href?: string
  items?: NavItem[]
  disabled?: boolean
}

interface DocsNavigationProps {
  items?: NavItem[]
}

// Default navigation structure
const defaultNavItems: NavItem[] = [
  {
    title: 'Getting Started',
    items: [
      {
        title: 'Introduction',
        href: '/',
      },
      {
        title: 'Installation',
        href: '/installation',
      },
      {
        title: 'Quick Start',
        href: '/quick-start',
      },
    ],
  },
  {
    title: 'Components',
    items: [
      {
        title: 'Overview',
        href: '/components',
      },
      {
        title: 'Buttons',
        href: '/components/buttons',
      },
      {
        title: 'Forms',
        href: '/components/forms',
      },
      {
        title: 'Cards',
        href: '/components/cards',
      },
    ],
  },
  {
    title: 'API Reference',
    items: [
      {
        title: 'Configuration',
        href: '/api/configuration',
      },
      {
        title: 'Methods',
        href: '/api/methods',
      },
      {
        title: 'Events',
        href: '/api/events',
      },
    ],
  },
  {
    title: 'Advanced',
    items: [
      {
        title: 'Customization',
        href: '/advanced/customization',
      },
      {
        title: 'Theming',
        href: '/advanced/theming',
      },
      {
        title: 'Performance',
        href: '/advanced/performance',
      },
    ],
  },
]

export function DocsNavigation({
  items = defaultNavItems,
}: DocsNavigationProps) {
  return (
    <nav className="space-y-2">
      {items.map((item, index) => (
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
