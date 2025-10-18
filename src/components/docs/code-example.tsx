import * as React from 'react'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import monokai from 'react-syntax-highlighter/dist/esm/styles/hljs/monokai'
import { Button } from '@/components/ui/button'
import { Check, Copy } from 'lucide-react'

interface CodeExampleProps {
  code: string
  language: string
  title?: string
  description?: string
  filename?: string
}

export function CodeExample({
  code,
  language,
  filename,
  title,
  description,
}: CodeExampleProps) {
  const [copied, setCopied] = React.useState(false)

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
        className="rounded-xl border border-muted relative group"
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
              language={language}
              style={{
                ...monokai,
                hljs: {
                  ...monokai.hljs,
                  background: 'transparent !important',
                  backgroundColor: 'transparent !important',
                },
              }}
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
          className="absolute top-12 right-2 h-7 w-7 sm:h-8 sm:w-8 opacity-0 transition-opacity hover:opacity-100 group-hover:opacity-100 text-white hover:text-white touch-manipulation z-10"
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
          ) : (
            <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
          )}
          <span className="sr-only">Copy code</span>
        </Button>
      </div>
    </div>
  )
}
