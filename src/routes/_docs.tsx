import { createFileRoute, Outlet } from '@tanstack/react-router'
import { DocsLayout } from '@/components/docs'
import { defaultNavItems } from '@/components/docs/docs-navigation'

export const Route = createFileRoute('/_docs')({
  path: '/docs',
  component: DocsLayoutWrapper,
})

function DocsLayoutWrapper() {
  return (
    <DocsLayout navItems={defaultNavItems}>
      <Outlet />
    </DocsLayout>
  )
}
