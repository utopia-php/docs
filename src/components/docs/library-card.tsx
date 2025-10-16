import { GitHubIcon } from '@/components/ui/github-icon'
import { Button } from '@/components/ui/button'
import { getLibrarySlug } from '@/lib/libraries'

interface Library {
  name: string
  stars: number
  description: string
  deprecated?: boolean
}

interface LibraryCardProps {
  library: Library
  hideTitle?: boolean
}

export function LibraryCard({ library, hideTitle = false }: LibraryCardProps) {
  // Don't render deprecated libraries
  if (library.deprecated) {
    return null
  }

  const librarySlug = getLibrarySlug(library.name)
  const libraryUrl = `/library/${librarySlug}`

  return (
    <div className="border border-muted rounded-lg px-4 py-3">
      <div className={`flex items-center ${hideTitle ? 'justify-end' : 'justify-between'} mb-0.5`}>
        {!hideTitle && <h4 className="font-medium text-[9px]">{library.name}</h4>}
        <div className="flex items-center gap-1 text-xs text-muted-foreground border border-muted rounded-lg px-2 py-1 hover:bg-muted/50 transition-colors">
          <GitHubIcon size={12} />
          <span className="font-medium">{library.stars}</span>
        </div>
      </div>
      <p className="text-[9px] text-muted-foreground leading-relaxed mb-3">{library.description}</p>
      <Button asChild variant="outline" size="sm">
        <a href={libraryUrl}>
          Learn More
        </a>
      </Button>
    </div>
  )
}
