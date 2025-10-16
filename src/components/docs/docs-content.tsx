import * as React from 'react'
import { cn } from '@/lib/utils'

interface DocsContentProps {
  children: React.ReactNode
  className?: string
}

export function DocsContent({ children, className }: DocsContentProps) {
  return (
    <div
      className={cn(
        'docs-content',
        // Prose styling for documentation content
        'prose prose-zinc dark:prose-invert',
        // Headings
        '[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:mb-6 [&_h1]:mt-6 [&_h1]:scroll-mt-16',
        '[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:mb-6 [&_h2]:mt-6 [&_h2]:scroll-mt-16',
        '[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:mb-4 [&_h3]:mt-4 [&_h3]:scroll-mt-16',
        '[&_h4]:text-lg [&_h4]:font-semibold [&_h4]:mb-4 [&_h4]:mt-3 [&_h4]:scroll-mt-16',
        '[&_h5]:text-base [&_h5]:font-semibold [&_h5]:mb-4 [&_h5]:mt-3 [&_h5]:scroll-mt-16',
        '[&_h6]:text-sm [&_h6]:font-semibold [&_h6]:mb-4 [&_h6]:mt-3 [&_h6]:scroll-mt-16',
        // Paragraphs
        '[&_p]:leading-8 [&_p]:mb-3 [&_p]:text-base',
        // Links
        '[&_a]:text-primary [&_a]:font-medium hover:[&_a]:text-primary/80',
        // Lists
        '[&_ul]:my-3 [&_ul]:ml-4 [&_ul]:list-disc [&_ul]:space-y-2',
        '[&_ol]:my-3 [&_ol]:ml-4 [&_ol]:list-decimal [&_ol]:space-y-2',
        '[&_li]:leading-7 [&_li]:text-base',
        '[&_li>ul]:mt-1 [&_li>ol]:mt-1',
        // Code
        '[&_code]:relative [&_code]:rounded [&_code]:bg-muted [&_code]:px-[0.3rem] [&_code]:py-[0.15rem] [&_code]:font-mono [&_code]:text-xs [&_code]:font-semibold',
        '[&_pre]:my-3 [&_pre]:overflow-x-auto [&_pre]:rounded [&_pre]:border [&_pre]:bg-muted/50 [&_pre]:p-3',
        '[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-xs [&_pre_code]:font-normal',
        // Blockquotes
        '[&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:my-3 [&_blockquote]:text-muted-foreground',
        // Tables
        '[&_table]:w-full [&_table]:my-3 [&_table]:border-separate [&_table]:border-spacing-0 [&_table]:rounded [&_table]:overflow-hidden [&_table]:bg-background',
        '[&_th]:border [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:bg-muted [&_th]:text-xs',
        '[&_td]:border [&_td]:px-3 [&_td]:py-2 [&_td]:bg-background [&_td]:text-xs',
        '[&_table_tr:first-child_th:first-child]:rounded-tl-lg',
        '[&_table_tr:first-child_th:last-child]:rounded-tr-lg',
        '[&_table_tr:last-child_td:first-child]:rounded-bl-lg',
        '[&_table_tr:last-child_td:last-child]:rounded-br-lg',
        // Horizontal rule
        '[&_hr]:my-4 [&_hr]:border-border',
        // Images
        '[&_img]:rounded [&_img]:border [&_img]:my-3',
        className,
      )}
    >
      {children}
    </div>
  )
}
