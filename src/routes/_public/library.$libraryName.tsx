import { createFileRoute, notFound } from '@tanstack/react-router'
import { DocsLayout, DocsContent, LibraryPage } from '@/components/docs'
import { findLibraryByName } from '@/lib/libraries'

export const Route = createFileRoute('/_public/library/$libraryName')({
  component: LibraryRoute,
  loader: ({ params }) => {
    const library = findLibraryByName(params.libraryName)
    if (!library) {
      throw notFound()
    }
    return { library }
  },
})

function LibraryRoute() {
  const { library } = Route.useLoaderData()
  
  // Create custom nav items for the library navigation
  const libraryNavItems = [
    {
      title: 'Overview',
      href: `/library/${library.name.toLowerCase().replace(/\s+/g, '-')}`,
    },
    {
      title: 'Features',
      href: `/library/${library.name.toLowerCase().replace(/\s+/g, '-')}#features`,
    },
    {
      title: 'Get Started',
      href: `/library/${library.name.toLowerCase().replace(/\s+/g, '-')}#get-started`,
    },
    {
      title: 'Concepts',
      items: [
        {
          title: 'Routes & Actions',
          href: `/library/${library.name.toLowerCase().replace(/\s+/g, '-')}#routes-actions`,
        },
        {
          title: 'Dependency Injection',
          href: `/library/${library.name.toLowerCase().replace(/\s+/g, '-')}#dependency-injection`,
        },
        {
          title: 'Parameters & Validation',
          href: `/library/${library.name.toLowerCase().replace(/\s+/g, '-')}#parameters-validation`,
        },
        {
          title: 'Hooks & Middleware',
          href: `/library/${library.name.toLowerCase().replace(/\s+/g, '-')}#hooks-middleware`,
        },
        {
          title: 'Server Adapters',
          href: `/library/${library.name.toLowerCase().replace(/\s+/g, '-')}#server-adapters`,
        },
        {
          title: 'Labels',
          href: `/library/${library.name.toLowerCase().replace(/\s+/g, '-')}#labels`,
        },
        {
          title: 'Lifecycle',
          href: `/library/${library.name.toLowerCase().replace(/\s+/g, '-')}#lifecycle`,
        },
      ],
    },
    {
      title: 'API Reference',
      href: library.documentation,
      external: true,
    },
  ]
  
  return (
    <DocsLayout
      navItems={libraryNavItems}
    >
      <DocsContent>
        <LibraryPage library={library} />
      </DocsContent>
    </DocsLayout>
  )
}
