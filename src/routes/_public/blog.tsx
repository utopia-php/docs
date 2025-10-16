import { createFileRoute } from '@tanstack/react-router'
import {
  DocsLayout,
  DocsContent,
  Breadcrumbs,
} from '@/components/docs'

export const Route = createFileRoute('/_public/blog')({
  component: Blog,
})

function Blog() {
  return (
    <DocsLayout>
      <DocsContent>
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' }
          ]} 
        />
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Blog</h1>
          <p className="text-sm text-muted-foreground">
            Stay updated with the latest news, tutorials, and insights from the Utopia.php community.
          </p>
        </div>

        {/* Blog Content */}
        <div className="space-y-8">
          <div className="text-center py-12">
            <h2 className="text-lg font-medium text-muted-foreground mb-2">
              Coming Soon
            </h2>
            <p className="text-sm text-muted-foreground">
              We're working on bringing you great content. Check back soon!
            </p>
          </div>
        </div>
      </DocsContent>
    </DocsLayout>
  )
}
