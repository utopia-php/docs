import { createFileRoute } from '@tanstack/react-router'
import {
  DocsLayout,
  DocsContent,
  DocsCallout,
  DocsCodeBlock,
  Breadcrumbs,
} from '@/components/docs'

export const Route = createFileRoute('/_public/example-comps')({
  component: ExampleComps,
})

function ExampleComps() {
  return (
    <DocsLayout>
      <DocsContent>
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' }
          ]} 
        />
        
        <div className="space-y-1 mb-4">
          <h1>Example Components</h1>
          <p className="text-sm text-muted-foreground">
            Examples and demonstrations of Utopia.php components and usage patterns.
          </p>
        </div>

        <h2 id="installation">Installation</h2>
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

        <h2 id="basic-usage">Basic Usage</h2>
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
          You can use the <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">DocsContent</code> component to
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
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">const value = 42</code> within your paragraphs.
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
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">title</code>
              </td>
              <td>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">string</code>
              </td>
              <td>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">"Documentation"</code>
              </td>
              <td>The title displayed in the header</td>
            </tr>
            <tr>
              <td>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">theme</code>
              </td>
              <td>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">"light" | "dark"</code>
              </td>
              <td>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">"light"</code>
              </td>
              <td>The color theme for the documentation</td>
            </tr>
            <tr>
              <td>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">showToc</code>
              </td>
              <td>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">boolean</code>
              </td>
              <td>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">true</code>
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
          navigation tree to the <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">DocsNavigation</code>{' '}
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
          <em>- Anonymous Developer</em>
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

        <DocsCallout type="info" title="Quick Start">
          Install any library with Composer: <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">composer require utopia-php/http</code>. 
          Each library is self-contained and can be used independently or combined as needed.
        </DocsCallout>

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
