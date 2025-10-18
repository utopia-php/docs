import { useEffect, useState } from 'react'

interface TableOfContentsProps {
  className?: string
}

interface Heading {
  id: string
  text: string
  level: number
}

export function BlogTableOfContents({ className = '' }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Extract headings from the page
    const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const headingList: Heading[] = Array.from(headingElements).map(
      (heading) => ({
        id:
          heading.id ||
          heading.textContent?.toLowerCase().replace(/\s+/g, '-') ||
          '',
        text: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1)),
      }),
    )

    setHeadings(headingList)

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -80% 0px' },
    )

    headingElements.forEach((heading) => {
      if (heading.id) {
        observer.observe(heading)
      }
    })

    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) {
    return null
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div
      className={`sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto ${className}`}
    >
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Table of Contents
        </h3>
        <nav className="space-y-1">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              className={`block w-full text-left text-sm transition-colors hover:text-foreground ${
                activeId === heading.id
                  ? 'text-foreground font-medium'
                  : 'text-muted-foreground'
              }`}
              style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
            >
              {heading.text}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
