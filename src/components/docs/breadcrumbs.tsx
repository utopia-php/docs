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
  const breadcrumbItems = items.length === 1 && items[0].current 
    ? items 
    : items.filter(item => !item.current)
  
  // Don't render if no items
  if (breadcrumbItems.length === 0) {
    return null
  }
  
  return (
    <nav className="flex items-center justify-between text-sm text-muted-foreground mb-6">
      <div className="flex items-center space-x-1">
        {breadcrumbItems.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && <span className="text-muted-foreground mr-1">/</span>}
            {item.href ? (
              <Link 
                to={item.href} 
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={item.current ? "text-foreground font-medium" : ""}>
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <EditPageButton />
        {showCopyPage && <CopyPageDropdown />}
      </div>
    </nav>
  )
}
