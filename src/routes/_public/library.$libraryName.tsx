import { createFileRoute, notFound } from '@tanstack/react-router'
import { DocsLayout, DocsContent } from '@/components/docs'
import { LibraryPage } from '@/components/docs/library-page'
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
  
  return (
    <DocsLayout>
      <DocsContent>
        <LibraryPage library={library} />
      </DocsContent>
    </DocsLayout>
  )
}
