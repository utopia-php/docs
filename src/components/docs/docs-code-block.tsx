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
        'not-prose my-6 overflow-hidden rounded-lg border bg-muted',
        className,
      )}
    >
      {title && (
        <div className="flex items-center justify-between border-b px-4 py-2.5">
          <span className="text-sm font-medium">{title}</span>
          <span className="text-xs text-muted-foreground uppercase">
            {language}
          </span>
        </div>
      )}
      <div className="relative group">
        <pre className="overflow-x-auto p-4 font-mono text-sm m-0 border-none">
          <code className="relative block border-none">
            {showLineNumbers ? (
              <div className="flex">
                <div className="mr-4 select-none text-muted-foreground">
                  {lines.map((_, i) => (
                    <div key={i} className="text-right leading-6">
                      {i + 1}
                    </div>
                  ))}
                </div>
                <div className="flex-1 leading-6">{children}</div>
              </div>
            ) : (
              <div className="leading-6">{children}</div>
            )}
          </code>
        </pre>
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 h-8 w-8 opacity-0 transition-opacity hover:opacity-100 group-hover:opacity-100"
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
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
