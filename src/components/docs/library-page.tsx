import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { GitHubIcon } from '@/components/ui/github-icon'
import { ExternalLink, Download, Calendar, Code, Star, Package, BookOpen, ArrowLeft } from 'lucide-react'
import { Library, getRelatedLibraries, formatVersion, formatLastUpdated } from '@/lib/libraries'
import { LibraryCard } from './library-card'

interface LibraryPageProps {
  library: Library
}

export function LibraryPage({ library }: LibraryPageProps) {
  const relatedLibraries = getRelatedLibraries(library, 3)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Button 
          variant="ghost" 
          className="mb-4 -ml-4"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{library.name}</h1>
            <p className="text-xl text-muted-foreground mb-4">{library.description}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground border rounded-lg px-3 py-2">
            <GitHubIcon size={16} />
            <span className="font-medium">{library.stars}</span>
            <Star className="h-4 w-4" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="secondary" className="text-sm">
            {formatVersion(library.version)}
          </Badge>
          <Badge variant="outline" className="text-sm">
            {library.category}
          </Badge>
          <Badge variant="outline" className="text-sm">
            <Calendar className="h-3 w-3 mr-1" />
            {formatLastUpdated(library.lastUpdated)}
          </Badge>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {library.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Dependencies */}
          <Card>
            <CardHeader>
              <CardTitle>Dependencies</CardTitle>
              <CardDescription>
                Required PHP extensions and minimum version
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {library.dependencies.map((dep, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {dep}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-3">
                <Button asChild className="w-full">
                  <a href={library.githubUrl} target="_blank" rel="noopener noreferrer">
                    <GitHubIcon size={16} className="mr-2" />
                    View on GitHub
                  </a>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <a href={library.documentation} target="_blank" rel="noopener noreferrer">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Documentation
                  </a>
                </Button>
              </div>
              
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Download className="h-4 w-4" />
                  <span className="font-medium">Installation</span>
                </div>
                <code className="text-sm bg-background px-3 py-2 rounded border block">
                  {library.installation}
                </code>
              </div>
            </CardContent>
          </Card>

          {/* Library Info */}
          <Card>
            <CardHeader>
              <CardTitle>Library Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Version</span>
                  <span className="font-medium">{formatVersion(library.version)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Category</span>
                  <Badge variant="secondary" className="text-xs">
                    {library.category}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span className="font-medium">{formatLastUpdated(library.lastUpdated)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">GitHub Stars</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    <span className="font-medium">{library.stars}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Libraries */}
          {relatedLibraries.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Related Libraries</CardTitle>
                <CardDescription>
                  Other libraries in the {library.category} category
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {relatedLibraries.map((relatedLib) => (
                  <LibraryCard 
                    key={relatedLib.name} 
                    library={relatedLib} 
                    hideTitle={false}
                  />
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
