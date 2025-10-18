import { createFileRoute } from '@tanstack/react-router'
import { ConceptPage } from '@/components/docs'
import { findLibraryByName, findConceptByPath } from '@/lib/libraries'
import { getConceptWithContent } from '@/lib/concept-loader'

export const Route = createFileRoute(
  '/_docs/library/$libraryName/concept/$conceptPath',
)({
  component: ConceptRoute,
  loader: ({ params }) => {
    const { libraryName, conceptPath } = params
    
    const library = findLibraryByName(libraryName)
    if (!library) {
      throw new Error(`Library not found: ${libraryName}`)
    }

    const concept = findConceptByPath(library, conceptPath)
    if (!concept) {
      throw new Error(`Concept not found: ${conceptPath}`)
    }

    // Load the concept with content
    const conceptWithContent = getConceptWithContent(concept, library.name)
    
    return {
      library,
      concept: conceptWithContent
    }
  }
})

function ConceptRoute() {
  const { library, concept } = Route.useLoaderData()

  return <ConceptPage library={library} concept={concept} />
}
