import { createFileRoute, notFound, Outlet, useLocation } from '@tanstack/react-router'
import { DocsContent, LibraryPage } from '@/components/docs'
import { findLibraryByName, getLibrarySlug } from '@/lib/libraries'

export const Route = createFileRoute('/_docs/library/$libraryName')({
  component: LibraryRoute,
  validateSearch: (search) => search,
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
  const location = useLocation()
  
  // Check if we're on a concept page
  const isConceptPage = location.pathname.includes('/concept/')
  
  return (
    <DocsContent>
      <LibraryPage 
        library={library} 
        showBreadcrumbs={true}
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: 'Docs', href: '/docs' },
          { label: 'Libraries', href: '/docs#libraries' },
          { label: library.name, current: !isConceptPage }
        ]}
      />
      <Outlet />
    </DocsContent>
  )
}