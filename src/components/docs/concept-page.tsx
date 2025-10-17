import { Library, Concept, getLibrarySlug } from '@/lib/libraries'
import { CodeExample } from './code-example'
import { Breadcrumbs } from './breadcrumbs'
import { ExternalLink } from 'lucide-react'
import { Link } from '@tanstack/react-router'

interface ConceptPageProps {
  library: Library
  concept: Concept
}

export function ConceptPage({ library, concept }: ConceptPageProps) {
  return (
    <div className="space-y-1 mb-4">
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Libraries', href: '/#libraries' },
          { label: library.name, href: `/library/${getLibrarySlug(library.name)}` },
          { label: concept.title, current: true }
        ]} 
        showCopyPage={true}
      />
      
      <h1>{concept.title}</h1>
      <p className="text-sm text-muted-foreground">
        {concept.description}
      </p>

      {/* Concept Content */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: concept.content }} />
      </div>

      {/* Code Example */}
      {concept.codeExample && (
        <div>
          <h3 className="text-xl font-semibold">Example</h3>
          <CodeExample
            language={concept.codeExample.language}
            title={concept.codeExample.title}
            code={concept.codeExample.code}
          />
        </div>
      )}

      {/* Additional Information */}
      {concept.additionalInfo && (
        <div>
          <h3 className="text-xl font-semibold">Additional Information</h3>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: concept.additionalInfo }} />
          </div>
        </div>
      )}


    </div>
  )
}
