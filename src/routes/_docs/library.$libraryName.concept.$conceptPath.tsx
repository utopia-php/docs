import { createFileRoute, notFound } from '@tanstack/react-router'
import { ConceptPage } from '@/components/docs'
import { findLibraryByName, findConceptByPath } from '@/lib/libraries'

export const Route = createFileRoute('/_docs/library/$libraryName/concept/$conceptPath')({
  component: ConceptRoute,
  loader: ({ params }) => {
    const library = findLibraryByName(params.libraryName)
    if (!library) {
      throw notFound()
    }

    const concept = findConceptByPath(library, params.conceptPath)
    if (!concept) {
      throw notFound()
    }

    return { library, concept }
  },
})

function ConceptRoute() {
  const { library, concept } = Route.useLoaderData()
  
  return <ConceptPage library={library} concept={concept} />
}
