import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, FileText, ExternalLink } from 'lucide-react'

interface CopyPageDropdownProps {
  className?: string
}

export function CopyPageDropdown({ className }: CopyPageDropdownProps) {
  const handleViewAsMarkdown = () => {
    // Get current page content and convert to markdown
    const pageContent = document.querySelector('.docs-content')
    if (!pageContent) return
    
    // Extract title
    const title = document.querySelector('h1')?.textContent || document.title
    
    // Convert content to markdown-like format
    let markdown = `# ${title}\n\n`
    
    // Process headings
    const headings = pageContent.querySelectorAll('h1, h2, h3, h4, h5, h6')
    headings.forEach((heading, index) => {
      if (index === 0 && heading.tagName === 'H1') return // Skip first h1 as it's already in title
      const level = parseInt(heading.tagName.charAt(1))
      const text = heading.textContent?.trim()
      if (text) {
        markdown += `${'#'.repeat(level)} ${text}\n\n`
      }
    })
    
    // Process paragraphs
    const paragraphs = pageContent.querySelectorAll('p')
    paragraphs.forEach(p => {
      const text = p.textContent?.trim()
      if (text && !text.includes('Utopia.php') && text.length > 20) {
        markdown += `${text}\n\n`
      }
    })
    
    // Process code blocks
    const codeBlocks = pageContent.querySelectorAll('pre code')
    codeBlocks.forEach(code => {
      const text = code.textContent?.trim()
      if (text) {
        markdown += `\`\`\`\n${text}\n\`\`\`\n\n`
      }
    })
    
    // Create a blob and download it
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title.replace(/\s+/g, '-').toLowerCase()}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleOpenInClaude = () => {
    const currentUrl = window.location.href
    const claudeUrl = `https://claude.ai/chat?url=${encodeURIComponent(currentUrl)}`
    window.open(claudeUrl, '_blank', 'noopener,noreferrer')
  }

  const handleOpenInChatGPT = () => {
    const currentUrl = window.location.href
    const chatgptUrl = `https://chat.openai.com/?url=${encodeURIComponent(currentUrl)}`
    window.open(chatgptUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={`h-8 px-3 text-xs shadow-none ${className}`}
        >
          Copy page
          <ChevronDown className="h-3 w-3 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuItem onClick={handleViewAsMarkdown} className="cursor-pointer">
          <FileText className="h-4 w-4 mr-2" />
          <div className="flex flex-col">
            <span className="font-medium">View as Markdown</span>
            <span className="text-xs text-muted-foreground">Open this page in Markdown</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleOpenInClaude} className="cursor-pointer">
          <div className="h-4 w-4 mr-2 flex items-center justify-center">
            <img 
              src="https://cortext.appwrite.network/icons/claude-icon-light.svg" 
              alt="Claude" 
              className="h-4 w-4 dark:hidden"
            />
            <img 
              src="https://cortext.appwrite.network/icons/claude-icon-dark.svg" 
              alt="Claude" 
              className="h-4 w-4 hidden dark:block"
            />
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex items-center">
              <span className="font-medium">Open in Claude</span>
              <ExternalLink className="h-3 w-3 ml-auto" />
            </div>
            <span className="text-xs text-muted-foreground">Ask questions about this page</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleOpenInChatGPT} className="cursor-pointer">
          <div className="h-4 w-4 mr-2 flex items-center justify-center">
            <img 
              src="https://cortext.appwrite.network/icons/openai-icon-light.svg" 
              alt="OpenAI" 
              className="h-4 w-4 dark:hidden"
            />
            <img 
              src="https://cortext.appwrite.network/icons/openai-icon-dark.svg" 
              alt="OpenAI" 
              className="h-4 w-4 hidden dark:block"
            />
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex items-center">
              <span className="font-medium">Open in ChatGPT</span>
              <ExternalLink className="h-3 w-3 ml-auto" />
            </div>
            <span className="text-xs text-muted-foreground">Ask questions about this page</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
