import { Link } from '@tanstack/react-router'
import { CopyPageDropdown } from './copy-page-dropdown'
import { EditPageButton } from './edit-page-button'

interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  showCopyPage?: boolean
}

export function Breadcrumbs({ items, showCopyPage = true }: BreadcrumbsProps) {
  // If there's only one item and it's current, show it (for main page)
  // Otherwise, filter out current items to avoid repetition
  const breadcrumbItems =
    items.length === 1 && items[0].current
      ? items
      : items.filter((item) => !item.current)

  // Don't render if no items
  if (breadcrumbItems.length === 0) {
    return null
  }

  return (
    <nav className="flex items-center justify-end sm:justify-between gap-2 mb-6">
      <div className="hidden sm:flex flex-wrap items-center gap-x-1 gap-y-1 min-w-0 flex-1">
        {breadcrumbItems.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && <span className="text-muted-foreground mr-1 hidden sm:inline">/</span>}
            {item.href ? (
              <Link
                to={item.href}
                className="hover:text-foreground transition-colors text-xs sm:text-sm text-muted-foreground line-clamp-1"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={`${item.current ? 'text-foreground font-medium' : ''} text-xs sm:text-sm text-muted-foreground line-clamp-1`}
              >
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {showCopyPage && <EditPageButton />}
        {showCopyPage && <CopyPageDropdown />}
      </div>
    </nav>
  )
}
