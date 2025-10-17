import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs'

interface CodeExampleProps {
  code: string
  language: string
  title?: string
  description?: string
}

export function CodeExample({ 
  code, 
  language, 
  title = "Code Example", 
  description 
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
