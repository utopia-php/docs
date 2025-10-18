import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/$')({
  component: NotFound,
})

function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        {/* 404 Number */}
        <div className="mb-6">
          <h1 className="text-6xl font-bold text-muted-foreground/20 mb-3">
            404
          </h1>
          <div className="w-16 h-px bg-border mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold mb-3">Page Not Found</h2>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-12">
          <Button
            asChild
            className="bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 [&>a]:text-white dark:[&>a]:text-black [&>a]:no-underline"
          >
            <a href="/">Go Home</a>
          </Button>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>

        {/* Logo/Brand */}
        <div>
          <a href="/" className="inline-block">
            <img
              src="/logo-light.svg"
              alt="Utopia.php"
              className="h-8 w-auto dark:hidden"
            />
            <img
              src="/logo-dark.svg"
              alt="Utopia.php"
              className="h-8 w-auto hidden dark:block"
            />
          </a>
        </div>
      </div>
    </div>
  )
}
