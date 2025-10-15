import { createFileRoute } from '@tanstack/react-router'
import {
  DocsLayout,
  DocsContent,
  DocsCallout,
  DocsCodeBlock,
  InlineCode,
} from '@/components/docs'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/_public/')({
  component: Index,
})

function Index() {
  return (
    <DocsLayout>
      <DocsContent>
        <div className="space-y-2 mb-8">
          <h1>Welcome to Documentation</h1>
          <p className="text-lg text-muted-foreground">
            A minimal, modern documentation website template built with React
            and TanStack Start
          </p>
          <div className="flex gap-2 mt-4">
            <Badge>v1.0.0</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="outline">React</Badge>
          </div>
        </div>

        <h2 id="introduction">Introduction</h2>
        <p>
          This documentation template provides a clean, minimal interface for
          technical documentation. It features a responsive layout with
          multi-level navigation, automatic table of contents generation, and
          beautiful code syntax highlighting.
        </p>

        <DocsCallout type="info" title="Getting Started">
          This is an informational callout. Use it to highlight important
          information or tips for your users.
        </DocsCallout>

        <h2 id="features">Features</h2>
        <p>
          The template comes with several built-in features designed to make
          documentation easy to write and pleasant to read:
        </p>

        <ul>
          <li>
            <strong>Multi-level Navigation</strong> - Collapsible sidebar
            navigation with support for nested items
          </li>
          <li>
            <strong>Table of Contents</strong> - Auto-generated "On This Page"
            navigation with scroll spy
          </li>
          <li>
            <strong>Code Highlighting</strong> - Beautiful code blocks with
            copy-to-clipboard functionality
          </li>
          <li>
            <strong>Responsive Design</strong> - Works seamlessly on desktop,
            tablet, and mobile devices
          </li>
          <li>
            <strong>Dark Mode Support</strong> - Built-in theme switching for
            light and dark modes
          </li>
          <li>
            <strong>Callout Components</strong> - Info, warning, danger, and
            success callouts
          </li>
        </ul>

        <h3 id="installation">Installation</h3>
        <p>
          To get started with this documentation template, you can install it
          using your preferred package manager:
        </p>

        <DocsCodeBlock language="bash" title="Terminal">
          {`npm install minimal-docs-template
# or
yarn add minimal-docs-template
# or
bun add minimal-docs-template`}
        </DocsCodeBlock>

        <h3 id="basic-usage">Basic Usage</h3>
        <p>
          Once installed, you can import and use the documentation components in
          your React application. Here's a simple example:
        </p>

        <DocsCodeBlock language="typescript" title="app.tsx" showLineNumbers>
          {`import { DocsLayout, DocsContent } from '@/components/docs'

function MyDocPage() {
    return (
        <DocsLayout title="My Documentation">
            <DocsContent>
                <h1>Getting Started</h1>
                <p>Welcome to my documentation!</p>
            </DocsContent>
        </DocsLayout>
    )
}`}
        </DocsCodeBlock>

        <DocsCallout type="success" title="Pro Tip">
          You can use the <InlineCode>DocsContent</InlineCode> component to
          automatically apply proper styling to your documentation content.
        </DocsCallout>

        <h2 id="components">Components</h2>
        <p>
          The template includes several reusable components that you can use
          throughout your documentation:
        </p>

        <h3 id="callouts">Callouts</h3>
        <p>
          Callouts are great for highlighting important information. There are
          four types available:
        </p>

        <DocsCallout type="info" title="Info Callout">
          This is an informational callout. Use it for general tips and
          information.
        </DocsCallout>

        <DocsCallout type="warning" title="Warning Callout">
          This is a warning callout. Use it to warn users about potential issues
          or deprecated features.
        </DocsCallout>

        <DocsCallout type="danger" title="Danger Callout">
          This is a danger callout. Use it for critical warnings or breaking
          changes.
        </DocsCallout>

        <DocsCallout type="success" title="Success Callout">
          This is a success callout. Use it to highlight positive outcomes or
          best practices.
        </DocsCallout>

        <h3 id="code-blocks">Code Blocks</h3>
        <p>
          Code blocks support multiple languages and include a copy-to-clipboard
          button that appears on hover:
        </p>

        <DocsCodeBlock language="javascript" title="example.js">
          {`function greet(name) {
    console.log(\`Hello, \${name}!\`)
}

greet('World')`}
        </DocsCodeBlock>

        <p>
          You can also use inline code like{' '}
          <InlineCode>const value = 42</InlineCode> within your paragraphs.
        </p>

        <h2 id="tables">Tables</h2>
        <p>Tables are automatically styled and responsive:</p>

        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <InlineCode>title</InlineCode>
              </td>
              <td>
                <InlineCode>string</InlineCode>
              </td>
              <td>
                <InlineCode>"Documentation"</InlineCode>
              </td>
              <td>The title displayed in the header</td>
            </tr>
            <tr>
              <td>
                <InlineCode>theme</InlineCode>
              </td>
              <td>
                <InlineCode>"light" | "dark"</InlineCode>
              </td>
              <td>
                <InlineCode>"light"</InlineCode>
              </td>
              <td>The color theme for the documentation</td>
            </tr>
            <tr>
              <td>
                <InlineCode>showToc</InlineCode>
              </td>
              <td>
                <InlineCode>boolean</InlineCode>
              </td>
              <td>
                <InlineCode>true</InlineCode>
              </td>
              <td>Whether to show the table of contents</td>
            </tr>
          </tbody>
        </table>

        <h2 id="advanced-features">Advanced Features</h2>
        <p>
          Beyond the basics, this template includes several advanced features
          for power users:
        </p>

        <h3 id="custom-navigation">Custom Navigation</h3>
        <p>
          You can customize the navigation structure by passing a custom
          navigation tree to the <InlineCode>DocsNavigation</InlineCode>{' '}
          component:
        </p>

        <DocsCodeBlock language="typescript" title="navigation.ts">
          {`export const navItems = [
    {
        title: 'Getting Started',
        items: [
            { title: 'Introduction', href: '/' },
            { title: 'Installation', href: '/installation' },
        ],
    },
    {
        title: 'Components',
        items: [
            { title: 'Overview', href: '/components' },
            { 
                title: 'UI Components',
                items: [
                    { title: 'Buttons', href: '/components/buttons' },
                    { title: 'Forms', href: '/components/forms' },
                ],
            },
        ],
    },
]`}
        </DocsCodeBlock>

        <h3 id="scroll-spy">Scroll Spy</h3>
        <p>
          The table of contents automatically highlights the current section as
          you scroll through the page. This is implemented using the
          Intersection Observer API for optimal performance.
        </p>

        <blockquote>
          "Good documentation is like a good joke. If you have to explain it,
          it's not that good."
          <br />
          <em>— Anonymous Developer</em>
        </blockquote>

        <h2 id="best-practices">Best Practices</h2>
        <p>Here are some best practices for writing effective documentation:</p>

        <ol>
          <li>
            <strong>Start with the basics</strong> - Begin with simple concepts
            before diving into advanced topics
          </li>
          <li>
            <strong>Use examples</strong> - Show, don't just tell. Code examples
            are invaluable
          </li>
          <li>
            <strong>Keep it concise</strong> - Respect your reader's time with
            clear, concise explanations
          </li>
          <li>
            <strong>Update regularly</strong> - Keep your documentation in sync
            with your code
          </li>
          <li>
            <strong>Test your examples</strong> - Make sure all code examples
            actually work
          </li>
        </ol>

        <DocsCallout type="warning" title="Important Note">
          Always test your documentation examples before publishing. Broken
          examples can frustrate users and damage trust.
        </DocsCallout>

        <h2 id="conclusion">Conclusion</h2>
        <p>
          This documentation template provides everything you need to create
          beautiful, functional documentation for your projects. The minimal
          design keeps the focus on your content while providing all the
          features users expect from modern documentation.
        </p>

        <p>
          For more information, check out the navigation menu on the left to
          explore additional topics and examples.
        </p>

        <hr />

        <p className="text-sm text-muted-foreground">
          Last updated:{' '}
          {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </DocsContent>
    </DocsLayout>
  )
}
