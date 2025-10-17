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
      <div className="rounded-xl overflow-hidden overflow-x-auto border border-muted">
        {filename && (
          <div 
            className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 border-b border-gray-600/30"
            style={{ backgroundColor: 'oklch(0.141 0.005 285.823)' }}
          >
            {filename}
          </div>
        )}
        <SyntaxHighlighter
          language={language}
          style={monokai}
          customStyle={{
            margin: 0,
            borderRadius: 0,
            fontSize: '14px',
            lineHeight: '1.8',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            backgroundColor: 'oklch(0.141 0.005 285.823)',
            padding: '1rem',
            border: 'none',
            outline: 'none',
          }}
          showLineNumbers={true}
          wrapLines={true}
          wrapLongLines={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
