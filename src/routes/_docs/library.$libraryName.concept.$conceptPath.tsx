import { createFileRoute } from '@tanstack/react-router'
import { ConceptPage } from '@/components/docs'
import { findLibraryByName, findConceptByPath } from '@/lib/libraries'

export const Route = createFileRoute('/_docs/library/$libraryName/concept/$conceptPath')({
  component: ConceptRoute,
})

function ConceptRoute() {
  const { libraryName, conceptPath } = Route.useParams()
  
  const library = findLibraryByName(libraryName)
  
  if (!library) {
    return <div>Library not found: {libraryName}</div>
  }
  
  const concept = findConceptByPath(library, conceptPath)
  
  if (!concept) {
    return <div>Concept not found: {conceptPath}</div>
  }
  
  return <ConceptPage library={library} concept={concept} />
}
