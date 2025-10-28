import * as React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import vscDarkPlus from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus'
import { Button } from '@/components/ui/button'
import { Check, Copy } from 'lucide-react'

interface CodeExampleProps {
  code: string
  language: string
  title?: string
  description?: string
  filename?: string
}

// Map of language aliases for better support
const languageMap: Record<string, string> = {
  'js': 'javascript',
  'ts': 'typescript',
  'php': 'php',
  'bash': 'bash',
  'sh': 'bash',
  'shell': 'bash',
  'json': 'json',
  'html': 'markup',
  'xml': 'markup',
  'css': 'css',
  'sql': 'sql',
  'yaml': 'yaml',
  'yml': 'yaml',
}

export function CodeExample({
  code,
  language,
  filename,
  title,
  description,
}: CodeExampleProps) {
  const [copied, setCopied] = React.useState(false)

  // Normalize language and provide fallback
  const normalizedLanguage = languageMap[language.toLowerCase()] || language.toLowerCase() || 'text'

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = code
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-3" style={{ width: '100%', maxWidth: '100%' }}>
      {/* Title and description */}
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h4 className="text-sm font-semibold text-foreground">{title}</h4>
          )}
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      <div 
        className="rounded-xl border border-muted relative"
        style={{ 
          backgroundColor: 'oklch(0.141 0.005 285.823)',
          width: '100%',
          maxWidth: '100%',
          overflow: 'hidden'
        }}
      >
        {filename && (
          <div className="px-3 py-2 text-xs sm:text-sm font-medium text-gray-300 border-b border-gray-600/30 flex items-center justify-between">
            <span className="truncate">{filename}</span>
            <span className="text-xs text-gray-400 uppercase flex-shrink-0 ml-2">{language}</span>
          </div>
        )}
        <div 
          className="overflow-x-auto"
          style={{ 
            width: '100%',
            maxWidth: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr'
          }}
        >
          <div style={{ 
            width: '100%', 
            maxWidth: '100%',
            minWidth: 0
          }}>
            <SyntaxHighlighter
              language={normalizedLanguage}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                borderRadius: 0,
                fontSize: '11px',
                lineHeight: '1.5',
                whiteSpace: 'pre',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                backgroundColor: 'transparent !important',
                background: 'transparent !important',
                padding: '0.75rem',
                border: 'none',
                outline: 'none',
                width: '100% !important',
                maxWidth: '100% !important',
                minWidth: '0 !important',
                boxSizing: 'border-box !important',
                overflow: 'scroll !important',
              }}
              showLineNumbers={true}
              wrapLines={false}
              wrapLongLines={false}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </div>
        
        {/* Copy button */}
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-12 right-2 h-7 w-7 sm:h-8 sm:w-8 text-white hover:text-black touch-manipulation z-10"
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="h-3 w-3 sm:h-4 sm:w-4" />
          ) : (
            <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
          )}
          <span className="sr-only">Copy code</span>
        </Button>
      </div>
    </div>
  )
}
