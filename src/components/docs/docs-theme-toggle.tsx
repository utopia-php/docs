import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function DocsThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="flex items-center gap-1 text-sm text-muted-foreground border border-muted rounded-lg px-2 py-1 hover:bg-muted/50 transition-colors hover:text-foreground cursor-pointer">
        <Sun className="h-4 w-4" />
        <span className="font-medium">Light</span>
      </button>
    )
  }

  return (
    <button
      className="flex items-center gap-1 text-sm text-muted-foreground border border-muted rounded-lg px-2 py-1 hover:bg-muted/50 transition-colors hover:text-foreground cursor-pointer"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <>
          <Sun className="h-4 w-4" />
          <span className="font-medium">Light</span>
        </>
      ) : (
        <>
          <Moon className="h-4 w-4" />
          <span className="font-medium">Dark</span>
        </>
      )}
    </button>
  )
}
