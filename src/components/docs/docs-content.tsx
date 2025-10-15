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
        'prose prose-zinc dark:prose-invert max-w-none',
        // Headings
        '[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:mb-4 [&_h1]:mt-8 [&_h1]:scroll-mt-20',
        '[&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:scroll-mt-20 [&_h2]:border-b [&_h2]:pb-2',
        '[&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:scroll-mt-20',
        '[&_h4]:text-xl [&_h4]:font-semibold [&_h4]:mb-2 [&_h4]:mt-4 [&_h4]:scroll-mt-20',
        '[&_h5]:text-lg [&_h5]:font-semibold [&_h5]:mb-2 [&_h5]:mt-4 [&_h5]:scroll-mt-20',
        '[&_h6]:text-base [&_h6]:font-semibold [&_h6]:mb-2 [&_h6]:mt-4 [&_h6]:scroll-mt-20',
        // Paragraphs
        '[&_p]:leading-7 [&_p]:mb-4 [&_p]:text-base',
        // Links
        '[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:font-medium hover:[&_a]:text-primary/80',
        // Lists
        '[&_ul]:my-4 [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:space-y-2',
        '[&_ol]:my-4 [&_ol]:ml-6 [&_ol]:list-decimal [&_ol]:space-y-2',
        '[&_li]:leading-7',
        '[&_li>ul]:mt-2 [&_li>ol]:mt-2',
        // Code
        '[&_code]:relative [&_code]:rounded [&_code]:bg-muted [&_code]:px-[0.3rem] [&_code]:py-[0.2rem] [&_code]:font-mono [&_code]:text-sm [&_code]:font-semibold',
        '[&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:bg-muted/50 [&_pre]:p-4',
        '[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-sm [&_pre_code]:font-normal',
        // Blockquotes
        '[&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote]:text-muted-foreground',
        // Tables
        '[&_table]:w-full [&_table]:my-4 [&_table]:border-separate [&_table]:border-spacing-0 [&_table]:rounded-lg [&_table]:overflow-hidden [&_table]:bg-background',
        '[&_th]:border [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:bg-muted',
        '[&_td]:border [&_td]:px-4 [&_td]:py-2 [&_td]:bg-background',
        '[&_table_tr:first-child_th:first-child]:rounded-tl-lg',
        '[&_table_tr:first-child_th:last-child]:rounded-tr-lg',
        '[&_table_tr:last-child_td:first-child]:rounded-bl-lg',
        '[&_table_tr:last-child_td:last-child]:rounded-br-lg',
        // Horizontal rule
        '[&_hr]:my-8 [&_hr]:border-border',
        // Images
        '[&_img]:rounded-lg [&_img]:border [&_img]:my-4',
        className,
      )}
    >
      {children}
    </div>
  )
}
