import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_api/hello')({
  component: HelloComponent,
})

function HelloComponent() {
  return <div>Hello, World!</div>
}
