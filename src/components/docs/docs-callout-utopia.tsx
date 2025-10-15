import * as React from 'react'
import { cn } from '@/lib/utils'
import { Info } from 'lucide-react'

interface DocsCalloutUtopiaProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function DocsCalloutUtopia({ 
  title, 
  children, 
  className 
}: DocsCalloutUtopiaProps) {
  return (
    <div
      className={cn(
        'my-6 flex gap-3 rounded-lg border p-4',
        'bg-[#6474ce]/3 dark:bg-[#6474ce]/5 text-[#2d1b69] dark:text-[#4a1a8a] border-[#6474ce]/20 dark:border-[#6474ce]/30',
        className,
      )}
    >
      <Info className="h-5 w-5 shrink-0 mt-0.5 text-[#6474ce]" />
      <div className="flex-1 space-y-2">
        {title && <div className="font-semibold">{title}</div>}
        <div className="text-sm leading-relaxed [&_p]:mb-0">{children}</div>
      </div>
    </div>
  )
}
