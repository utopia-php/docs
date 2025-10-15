import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TocItem {
  id: string
  text: string
  level: number
}

interface DocsTocProps {
  items?: TocItem[]
}

export function DocsToc({ items }: DocsTocProps) {
  const [activeId, setActiveId] = React.useState<string>('')
  const [tocItems, setTocItems] = React.useState<TocItem[]>(items || [])

  React.useEffect(() => {
    // Auto-generate TOC from page headings if not provided
    if (!items) {
      const headings = document.querySelectorAll(
        '.docs-content h2, .docs-content h3, .docs-content h4',
      )
      const generatedItems: TocItem[] = Array.from(headings).map((heading) => {
        const id =
          heading.id ||
          heading.textContent?.toLowerCase().replace(/\s+/g, '-') ||
          ''
        if (!heading.id) {
          heading.id = id
        }
        return {
          id,
          text: heading.textContent || '',
          level: parseInt(heading.tagName.charAt(1)),
        }
      })
      setTocItems(generatedItems)
    }
  }, [items])

  React.useEffect(() => {
    // Scroll spy functionality
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 1,
      },
    )

    tocItems.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      tocItems.forEach((item) => {
        const element = document.getElementById(item.id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [tocItems])

  if (tocItems.length === 0) {
    return null
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
      setActiveId(id)
    }
  }

  return (
    <div className="space-y-2">
      <p className="font-medium text-sm mb-4">On This Page</p>
      <nav className="space-y-2">
        {tocItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            className={cn(
              'block text-sm transition-colors hover:text-foreground',
              item.level === 2 && 'pl-0',
              item.level === 3 && 'pl-4',
              item.level === 4 && 'pl-8',
              activeId === item.id
                ? 'font-medium text-foreground'
                : 'text-muted-foreground',
            )}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  )
}
