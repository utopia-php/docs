import * as React from 'react'
import { Button } from '@/components/ui/button'
import { ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export function BackToTopButton() {
  const [isVisible, setIsVisible] = React.useState(false)
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
    
    const toggleVisibility = () => {
      // Show button when user scrolls down more than 300px (first fold)
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Listen for scroll events
    window.addEventListener('scroll', toggleVisibility)

    // Cleanup
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isMounted || !isVisible) {
    return null
  }

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      variant="outline"
      className={cn(
        'fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 h-10 w-10 md:h-12 md:w-12 rounded-full shadow-lg',
        'bg-background/90 backdrop-blur-sm border-border/50',
        'hover:bg-accent hover:text-accent-foreground hover:shadow-xl',
        'transition-all duration-200 ease-in-out',
        'hover:scale-105 active:scale-95',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'animate-in fade-in-0 slide-in-from-bottom-2'
      )}
      aria-label="Back to top"
    >
      <ChevronUp className="h-5 w-5" />
    </Button>
  )
}
