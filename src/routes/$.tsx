import { createFileRoute } from '@tanstack/react-router'
import { DocsLayout, DocsContent } from '@/components/docs'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/$')({
  component: NotFound,
})

function NotFound() {
  return (
    <DocsLayout>
      <DocsContent>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-2xl mx-auto">
          {/* 404 Number */}
          <div className="mb-6">
            <h1 className="text-6xl font-bold text-muted-foreground/30 mb-2">
              404
            </h1>
            <div className="w-16 h-px bg-border mx-auto mb-4"></div>
            <h2 className="text-2xl font-semibold mb-3">Page Not Found</h2>
            <p className="text-muted-foreground">
              Sorry, we couldn't find the page you're looking for. It might have
              been moved, deleted, or doesn't exist.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-8">
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
        </div>
      </DocsContent>
    </DocsLayout>
  )
}
