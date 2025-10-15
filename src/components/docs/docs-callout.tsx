import * as React from 'react'
import { cn } from '@/lib/utils'
import { AlertCircle, AlertTriangle, Info, CheckCircle } from 'lucide-react'

interface DocsCalloutProps {
  children: React.ReactNode
  type?: 'info' | 'warning' | 'danger' | 'success'
  title?: string
  className?: string
}

const calloutConfig = {
  info: {
    icon: Info,
    className:
      'bg-blue-50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-100 border-blue-200 dark:border-blue-900',
    iconClassName: 'text-blue-500',
  },
  warning: {
    icon: AlertTriangle,
    className:
      'bg-yellow-50 dark:bg-yellow-950/30 text-yellow-900 dark:text-yellow-100 border-yellow-200 dark:border-yellow-900',
    iconClassName: 'text-yellow-500',
  },
  danger: {
    icon: AlertCircle,
    className:
      'bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-100 border-red-200 dark:border-red-900',
    iconClassName: 'text-red-500',
  },
  success: {
    icon: CheckCircle,
    className:
      'bg-green-50 dark:bg-green-950/30 text-green-900 dark:text-green-100 border-green-200 dark:border-green-900',
    iconClassName: 'text-green-500',
  },
}

export function DocsCallout({
  children,
  type = 'info',
  title,
  className,
}: DocsCalloutProps) {
  const config = calloutConfig[type]
  const Icon = config.icon

  return (
    <div
      className={cn(
        'my-6 flex gap-3 rounded-lg border p-4',
        config.className,
        className,
      )}
    >
      <Icon className={cn('h-5 w-5 shrink-0 mt-0.5', config.iconClassName)} />
      <div className="flex-1 space-y-2">
        {title && <div className="font-semibold">{title}</div>}
        <div className="text-sm leading-relaxed [&_p]:mb-0">{children}</div>
      </div>
    </div>
  )
}
