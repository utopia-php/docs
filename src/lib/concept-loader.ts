import { Concept } from './libraries'

export interface ContentBlock {
  type: 'text' | 'code'
  content: string
  language?: string
  title?: string
  description?: string
}

// Import all concept files statically
import httpLifecycleContent from '@/data/concepts/http/lifecycle.md?raw'
import httpRequestContent from '@/data/concepts/http/request.md?raw'
import httpResponseContent from '@/data/concepts/http/response.md?raw'
import httpRoutesContent from '@/data/concepts/http/routes.md?raw'
import httpValidatorsContent from '@/data/concepts/http/validators.md?raw'
import httpHooksContent from '@/data/concepts/http/hooks.md?raw'
import httpDependencyInjectionContent from '@/data/concepts/http/dependency-injection.md?raw'
import httpFilesContent from '@/data/concepts/http/files.md?raw'
import httpErrorHandlingContent from '@/data/concepts/http/error-handling.md?raw'
import httpRouterContent from '@/data/concepts/http/router.md?raw'
import httpAdaptersContent from '@/data/concepts/http/adapters.md?raw'
import databaseQueryBuilderContent from '@/data/concepts/database/query-builder.md?raw'
import databaseMigrationsContent from '@/data/concepts/database/migrations.md?raw'

// Map of content files to their imported content
const contentMap: Record<string, string> = {
  'http/lifecycle.md': httpLifecycleContent,
  'http/request.md': httpRequestContent,
  'http/response.md': httpResponseContent,
  'http/routes.md': httpRoutesContent,
  'http/validators.md': httpValidatorsContent,
  'http/hooks.md': httpHooksContent,
  'http/dependency-injection.md': httpDependencyInjectionContent,
  'http/files.md': httpFilesContent,
  'http/error-handling.md': httpErrorHandlingContent,
  'http/router.md': httpRouterContent,
  'http/adapters.md': httpAdaptersContent,
  'database/query-builder.md': databaseQueryBuilderContent,
  'database/migrations.md': databaseMigrationsContent,
}

/**
 * Load concept content from markdown file
 */
export function loadConceptContent(concept: Concept, libraryName: string): string {
  if (concept.content) {
    return concept.content
  }
  
  // Use the provided library name and concept path
  const conceptPath = concept.path
  
  // Map concept paths to actual file paths
  const filePath = getConceptFilePath(libraryName, conceptPath)
  
  if (!filePath) {
    console.warn(`⚠️ No file path found for concept "${concept.title}" (path: "${concept.path}")`)
    return `<p>Content not available - No file found for concept "${concept.title}" (path: "${concept.path}")</p>`
  }
  
  // Get content from static map
  const content = contentMap[filePath]
  
  if (!content) {
    console.warn(`⚠️ No content found for file path: ${filePath}`)
    console.log(`📁 Available content files:`, Object.keys(contentMap))
    return `<p>Content not available - No file found for concept "${concept.title}" (path: "${concept.path}")</p>`
  }
  
  console.log(`✅ Successfully loaded concept content from: ${filePath}`)
  return content
}

/**
 * Get the file path for a concept based on library and concept path
 */
function getConceptFilePath(libraryName: string, conceptPath: string): string | null {
  console.log(`🔍 Looking for concept file - Library: "${libraryName}", Concept Path: "${conceptPath}"`)
  
  // Convert library name to lowercase for directory mapping
  const libraryDir = libraryName.toLowerCase()
  
  const fullPath = `${libraryDir}/${conceptPath}.md`
  console.log(`📄 Generated file path: "${fullPath}"`)
  return fullPath
}

/**
 * Parse markdown content and extract sections
 */
function parseMarkdownContent(content: string): {
  content: string
  contentBlocks: ContentBlock[]
  codeExample?: {
    language: string
    title: string
    code: string
    showLineNumbers?: boolean
  }
  additionalInfo?: string
} {
  const lines = content.split('\n')
  let contentBlocks: ContentBlock[] = []
  let currentTextBlock: string[] = []
  let codeExample: any = null
  let additionalInfo: string[] = []
  let inCodeBlock = false
  let codeLanguage = ''
  let codeLines: string[] = []
  let foundCodeExample = false
  let foundAdditionalInfo = false
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Check for code block start
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true
        codeLanguage = line.replace('```', '').trim()
        codeLines = []
        
        // Save current text block if it exists
        if (currentTextBlock.length > 0) {
          contentBlocks.push({
            type: 'text',
            content: convertMarkdownToHtml(currentTextBlock.join('\n'))
          })
          currentTextBlock = []
        }
      } else {
        inCodeBlock = false
        
        // Create code block
        contentBlocks.push({
          type: 'code',
          content: codeLines.join('\n'),
          language: codeLanguage,
          title: 'Code Example',
          description: ''
        })
        
        // Only capture the first code block as the main code example
        if (!foundCodeExample) {
          codeExample = {
            language: codeLanguage,
            title: 'Code Example',
            code: codeLines.join('\n'),
            showLineNumbers: true
          }
          foundCodeExample = true
        }
      }
      continue
    }
    
    // Check for Additional Information section
    if (line.startsWith('## Additional Information')) {
      foundAdditionalInfo = true
      // Save current text block if it exists
      if (currentTextBlock.length > 0) {
        contentBlocks.push({
          type: 'text',
          content: convertMarkdownToHtml(currentTextBlock.join('\n'))
        })
        currentTextBlock = []
      }
      continue
    }
    
    if (inCodeBlock) {
      codeLines.push(line)
    } else if (foundAdditionalInfo) {
      additionalInfo.push(line)
    } else {
      // Add to current text block
      currentTextBlock.push(line)
    }
  }
  
  // Save final text block if it exists
  if (currentTextBlock.length > 0) {
    contentBlocks.push({
      type: 'text',
      content: convertMarkdownToHtml(currentTextBlock.join('\n'))
    })
  }
  
  const htmlAdditionalInfo = additionalInfo.length > 0 ? convertMarkdownToHtml(additionalInfo.join('\n')) : undefined
  
  return {
    content: '', // This will be replaced by contentBlocks
    contentBlocks,
    codeExample,
    additionalInfo: htmlAdditionalInfo
  }
}

/**
 * Enhanced markdown to HTML converter with proper code block styling
 */
function convertMarkdownToHtml(markdown: string): string {
  if (!markdown || markdown.trim() === '') {
    return ''
  }
  
  return markdown
    // Code blocks - handle them with proper styling for React components
    .replace(/```(\w+)?\n([\s\S]*?)```/g, (_, language, code) => {
      const lang = language || 'text'
      const cleanCode = code.trim()
      
      return `
        <div class="bg-muted rounded-lg p-4 my-6">
          <div class="flex items-center justify-between mb-2">
            <h4 class="text-sm font-medium text-muted-foreground">Code Example</h4>
            <span class="text-xs text-muted-foreground">${lang}</span>
          </div>
          <pre class="text-sm overflow-x-auto"><code class="language-${lang}">${cleanCode}</code></pre>
        </div>
      `
    })
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">$1</code>')
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-6 mb-3">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mt-8 mb-4">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-semibold mt-8 mb-4">$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    // Line breaks - convert single line breaks to <br> but preserve double line breaks for paragraphs
    .replace(/\n(?!\n)/g, '<br>')
    // Paragraphs - split on double line breaks
    .split(/\n\s*\n/)
    .map(paragraph => paragraph.trim())
    .filter(paragraph => paragraph.length > 0)
    .map(paragraph => {
      // Don't wrap headers or code blocks in paragraphs
      if (paragraph.startsWith('<h') || paragraph.startsWith('<div class="bg-muted')) {
        return paragraph
      }
      return `<p class="mb-4">${paragraph}</p>`
    })
    .join('')
}

/**
 * Get concept with loaded content
 */
export function getConceptWithContent(concept: Concept, libraryName: string): Concept {
  console.log(`🔄 Loading content for concept: "${concept.title}" (path: "${concept.path}") from library: "${libraryName}"`)
  
  const content = loadConceptContent(concept, libraryName)
  console.log(`📝 Content length: ${content.length} characters`)
  
  const parsed = parseMarkdownContent(content)
  console.log(`✅ Parsed content - HTML length: ${parsed.content.length} characters`)
  
  if (parsed.codeExample) {
    console.log(`💻 Found code example: ${parsed.codeExample.language}`)
  }
  
  if (parsed.additionalInfo) {
    console.log(`ℹ️ Found additional info: ${parsed.additionalInfo.length} characters`)
  }
  
  return {
    ...concept,
    content: parsed.content,
    contentBlocks: parsed.contentBlocks,
    codeExample: parsed.codeExample || concept.codeExample,
    additionalInfo: parsed.additionalInfo || concept.additionalInfo
  }
}

