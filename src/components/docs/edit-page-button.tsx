import * as React from 'react'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import { getGitHubEditUrl, getCurrentRoutePath } from '@/lib/github-utils'

interface EditPageButtonProps {
  className?: string
}

export function EditPageButton({ className }: EditPageButtonProps) {
  const handleEditPage = () => {
    const currentPath = getCurrentRoutePath()
    const editUrl = getGitHubEditUrl(currentPath)
    
    if (editUrl) {
      window.open(editUrl, '_blank', 'noopener,noreferrer')
    } else {
      // Fallback to the main repository if we can't determine the specific file
      window.open('https://github.com/utopia-php/docs', '_blank', 'noopener,noreferrer')
    }
  }

  // Don't render if we can't determine the edit URL
  const currentPath = getCurrentRoutePath()
  const editUrl = getGitHubEditUrl(currentPath)
  
  if (!editUrl) {
    return null
  }

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className={`h-8 px-3 text-xs shadow-none ${className}`}
      onClick={handleEditPage}
    >
      Edit page
      <ExternalLink className="h-3 w-3 ml-1" />
    </Button>
  )
}
