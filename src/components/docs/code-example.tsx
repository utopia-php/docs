import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs'

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
  title = "Code Example", 
  description,
  filename
}: CodeExampleProps) {
  return (
    <div className="space-y-3">
      <div>
        <h4 className="text-lg font-semibold text-foreground">{title}</h4>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className="rounded-xl overflow-hidden border border-muted" style={{ backgroundColor: 'oklch(0.141 0.005 285.823)' }}>
        {filename && (
          <div 
            className="px-4 py-2 text-sm font-medium text-gray-300 border-b border-gray-600/30"
          >
            {filename}
          </div>
        )}
        <div className="overflow-x-auto" style={{ backgroundColor: 'oklch(0.141 0.005 285.823)' }}>
          <SyntaxHighlighter
            language={language}
            style={{
              ...monokai,
              'hljs': {
                ...monokai.hljs,
                background: 'transparent !important',
                backgroundColor: 'transparent !important',
              }
            }}
            customStyle={{
              margin: 0,
              borderRadius: 0,
              fontSize: '14px',
              lineHeight: '1.8',
              whiteSpace: 'pre',
              wordBreak: 'normal',
              overflowWrap: 'normal',
              backgroundColor: 'transparent !important',
              background: 'transparent !important',
              padding: '1rem',
              border: 'none',
              outline: 'none',
              minWidth: 'fit-content',
            }}
            showLineNumbers={true}
            wrapLines={false}
            wrapLongLines={false}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  )
}
