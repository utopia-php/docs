import * as React from 'react'
import { cn } from '@/lib/utils'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DocsCodeBlockProps {
  children: string
  language?: string
  title?: string
  showLineNumbers?: boolean
  className?: string
}

export function DocsCodeBlock({
  children,
  language = 'typescript',
  title,
  showLineNumbers = false,
  className,
}: DocsCodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = children.split('\n')

  return (
    <div
      className={cn(
        'not-prose my-6 rounded-lg border bg-muted',
        className,
      )}
      style={{ 
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden'
      }}
    >
      {title && (
        <div className="flex items-center justify-between border-b px-3 py-2 sm:px-4 sm:py-2.5">
          <span className="text-xs sm:text-sm font-medium truncate">{title}</span>
          <span className="text-xs text-muted-foreground uppercase flex-shrink-0 ml-2">
            {language}
          </span>
        </div>
      )}
      <div className="relative group" style={{ width: '100%', maxWidth: '100%' }}>
        <div 
          className="overflow-x-auto"
          style={{ 
            width: '100%', 
            maxWidth: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr'
          }}
        >
          <pre 
            className="p-3 sm:p-4 font-mono text-xs sm:text-sm m-0 border-none whitespace-pre"
            style={{ 
              width: '100%',
              maxWidth: '100%',
              minWidth: 0,
              boxSizing: 'border-box'
            }}
          >
            <code 
              className="relative block border-none"
              style={{ 
                width: '100%',
                maxWidth: '100%',
                boxSizing: 'border-box'
              }}
            >
              {showLineNumbers ? (
                <div className="flex" style={{ width: '100%', maxWidth: '100%' }}>
                  <div className="mr-3 sm:mr-4 select-none text-muted-foreground flex-shrink-0">
                    {lines.map((_, i) => (
                      <div key={i} className="text-right leading-5 sm:leading-6">
                        {i + 1}
                      </div>
                    ))}
                  </div>
                  <div 
                    className="flex-1 leading-5 sm:leading-6 min-w-0 break-words"
                    style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}
                  >
                    {children}
                  </div>
                </div>
              ) : (
                <div 
                  className="leading-5 sm:leading-6 break-words"
                  style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}
                >
                  {children}
                </div>
              )}
            </code>
          </pre>
        </div>
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

// Inline code component
interface InlineCodeProps {
  children: React.ReactNode
  className?: string
}

export function InlineCode({ children, className }: InlineCodeProps) {
  return (
    <code
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className,
      )}
    >
      {children}
    </code>
  )
}
