import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { GitHubIcon } from '@/components/ui/github-icon'
import {
  Star,
  BookOpen,
  Calendar,
  Tag,
  Code2,
  GitBranch,
  Shield,
} from 'lucide-react'
import { Library, formatVersion, formatLastUpdated } from '@/lib/libraries'

interface LibraryTocProps {
  library: Library
}

export function LibraryToc({ library }: LibraryTocProps) {
  return (
    <div className="space-y-6">
      {/* Library Info */}
      <div className="space-y-4">
        <div className="flex flex-col gap-3">
          <Button asChild className="w-full">
            <a
              href={library.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon size={16} className="mr-2" />
              View on GitHub
            </a>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <a
              href={library.documentation}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Get Started
            </a>
          </Button>
        </div>

        <div className="pt-4 border-t">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Version</span>
              </div>
              <span className="font-medium">
                {formatVersion(library.version)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Category</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {library.category}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Last Updated</span>
              </div>
              <span className="font-medium">
                {formatLastUpdated(library.lastUpdated)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">GitHub Stars</span>
              </div>
              <div className="flex items-center gap-1">
                <GitBranch className="h-3 w-3 text-muted-foreground" />
                <span className="font-medium">{library.stars}</span>
              </div>
            </div>
            {library.license && (
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">License</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {library.license}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
