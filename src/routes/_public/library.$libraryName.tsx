import { createFileRoute, notFound, Outlet, useLocation } from '@tanstack/react-router'
import { DocsLayout, DocsContent, LibraryPage } from '@/components/docs'
import { findLibraryByName, getLibrarySlug } from '@/lib/libraries'

export const Route = createFileRoute('/_public/library/$libraryName')({
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
  
  // Check if we're on a child route (like concept page)
  const isChildRoute = location.pathname.includes('/concept/')
  
  // Generate navigation items dynamically from library config
  const generateNavItems = () => {
    const baseUrl = `/library/${getLibrarySlug(library.name)}`
    const items = []
    
    // Overview/Home link
    items.push({
      title: 'Overview',
      href: baseUrl,
    })
    
    // Features section (if library has features)
    if (library.features && library.features.length > 0) {
      items.push({
        title: 'Features',
        href: `${baseUrl}#features`,
      })
    }
    
    // Installation/Get Started section (if library has installation info)
    if (library.installation) {
      items.push({
        title: 'Installation',
        href: `${baseUrl}#installation`,
      })
    }
    
    // Dependencies section (if library has dependencies)
    if (library.dependencies && library.dependencies.length > 0) {
      items.push({
        title: 'Dependencies',
        href: `${baseUrl}#dependencies`,
      })
    }
    
    // Concepts section (if library has concepts)
    if (library.concepts && library.concepts.length > 0) {
      items.push({
        title: 'Concepts',
        items: library.concepts.map(concept => ({
          title: concept.title,
          href: `${baseUrl}/concept/${concept.path}`,
        })),
      })
    }
    
    // API Reference (if library has documentation)
    if (library.documentation) {
      items.push({
        title: 'API Reference',
        href: library.documentation,
        external: true,
      })
    }
    
    // GitHub link (if library has GitHub URL)
    if (library.githubUrl) {
      items.push({
        title: 'GitHub',
        href: library.githubUrl,
        external: true,
      })
    }
    
    return items
  }
  
  const libraryNavItems = generateNavItems()
  
  return (
    <DocsLayout
      navItems={libraryNavItems}
    >
      <DocsContent>
        {isChildRoute ? <Outlet /> : <LibraryPage library={library} />}
      </DocsContent>
    </DocsLayout>
  )
}
