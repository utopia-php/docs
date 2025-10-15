# Minimal Docs Website

A minimal, modern, and elegant documentation website template built with React, TanStack Start, and Tailwind CSS.

## Features

- ✨ **Minimal & Modern Design** - Clean, distraction-free interface focused on content
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Dark Mode Support** - Built-in theme switching
- 📚 **Multi-level Navigation** - Collapsible sidebar navigation with nested items
- 📑 **Auto-generated TOC** - "On This Page" navigation with scroll spy
- 💻 **Code Highlighting** - Beautiful code blocks with copy-to-clipboard
- 🎯 **Centered Layout** - Max-width content for optimal readability
- ⚡ **Fast & Performant** - Built with modern React and optimized for speed
- 🔍 **SEO Friendly** - Semantic HTML structure
- ♿ **Accessible** - WCAG compliant components

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Basic knowledge of React and TypeScript

### Installation

The documentation components are already set up in this project. To use them in your pages:

```tsx
import { DocsLayout, DocsContent } from '@/components/docs'

function MyDocPage() {
  return (
    <DocsLayout title="My Documentation">
      <DocsContent>
        <h1>Getting Started</h1>
        <p>Welcome to my documentation!</p>
      </DocsContent>
    </DocsLayout>
  )
}
```

## Components

### DocsLayout

The main layout component that provides the documentation structure.

**Props:**

- `title` (string, optional) - The site title displayed in the header. Default: "Documentation"
- `navItems` (NavItem[], optional) - Custom navigation structure
- `children` (ReactNode) - The page content

**Example:**

```tsx
<DocsLayout title="My Docs" navItems={customNavItems}>
  {/* Your content */}
</DocsLayout>
```

### DocsContent

A wrapper component that applies proper typography and styling to documentation content.

**Props:**

- `children` (ReactNode) - The documentation content
- `className` (string, optional) - Additional CSS classes

**Example:**

```tsx
<DocsContent>
  <h1>Page Title</h1>
  <p>Your content here...</p>
</DocsContent>
```

### DocsNavigation

Multi-level navigation component with collapsible sections.

**Props:**

- `items` (NavItem[], optional) - Navigation structure. Uses default navigation if not provided.

**NavItem Interface:**

```typescript
interface NavItem {
  title: string
  href?: string
  items?: NavItem[]
  disabled?: boolean
}
```

**Example:**

```tsx
const navItems = [
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
]

<DocsNavigation items={navItems} />
```

### DocsToc

Table of contents component with scroll spy functionality. Automatically generates TOC from h2, h3, and h4 headings.

**Props:**

- `items` (TocItem[], optional) - Manual TOC items. Auto-generates if not provided.

**Example:**

```tsx
<DocsToc />
```

### DocsCallout

Callout/alert component for highlighting important information.

**Props:**

- `type` ('info' | 'warning' | 'danger' | 'success') - Callout type. Default: 'info'
- `title` (string, optional) - Callout title
- `children` (ReactNode) - Callout content

**Example:**

```tsx
<DocsCallout type="warning" title="Important">
  This is a warning message.
</DocsCallout>
```

### DocsCodeBlock

Code block component with syntax highlighting and copy functionality.

**Props:**

- `children` (string) - The code content
- `language` (string, optional) - Programming language. Default: 'typescript'
- `title` (string, optional) - Code block title
- `showLineNumbers` (boolean, optional) - Show line numbers. Default: false

**Example:**

```tsx
<DocsCodeBlock language="javascript" title="example.js" showLineNumbers>
  {`function hello() {
    console.log('Hello, World!')
}`}
</DocsCodeBlock>
```

### InlineCode

Inline code component for code within text.

**Example:**

```tsx
<p>
  Use the <InlineCode>useState</InlineCode> hook for state management.
</p>
```

## Customization

### Navigation Structure

To customize the navigation, create a navigation configuration file:

```typescript
// src/config/navigation.ts
import type { NavItem } from '@/components/docs'

export const navItems: NavItem[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/' },
      { title: 'Installation', href: '/installation' },
    ],
  },
  // Add more sections...
]
```

Then pass it to the DocsLayout:

```tsx
import { navItems } from '@/config/navigation'
;<DocsLayout navItems={navItems}>{/* content */}</DocsLayout>
```

### Styling

The documentation components use Tailwind CSS for styling. You can customize the appearance by:

1. **Modifying Tailwind theme** - Edit `src/styles.css` to change colors, fonts, etc.
2. **Extending components** - Create wrapper components with custom styles
3. **Using className prop** - Most components accept a `className` prop for additional styling

### Adding New Pages

1. Create a new route file in `src/routes/_public/`
2. Use the DocsLayout and DocsContent components
3. Add the page to your navigation structure

Example:

```tsx
// src/routes/_public/installation.tsx
import { createFileRoute } from '@tanstack/react-router'
import { DocsLayout, DocsContent } from '@/components/docs'

export const Route = createFileRoute('/_public/installation')({
  component: Installation,
})

function Installation() {
  return (
    <DocsLayout title="Minimal Docs">
      <DocsContent>
        <h1>Installation</h1>
        <p>Follow these steps to install...</p>
      </DocsContent>
    </DocsLayout>
  )
}
```

## Best Practices

### Writing Documentation

1. **Use clear headings** - Structure your content with h2, h3, and h4 headings
2. **Add IDs to headings** - For better TOC generation: `<h2 id="section-name">Section Name</h2>`
3. **Include code examples** - Show, don't just tell
4. **Use callouts** - Highlight important information with DocsCallout components
5. **Keep paragraphs short** - Improve readability with concise paragraphs
6. **Add tables** - Use tables for structured data like API references

### Content Organization

1. **Start with overview** - Begin each section with a brief introduction
2. **Progress from simple to complex** - Build up knowledge gradually
3. **Group related topics** - Use navigation sections to organize content
4. **Cross-reference** - Link to related sections when appropriate
5. **Update regularly** - Keep documentation in sync with code changes

### Accessibility

1. **Use semantic HTML** - Proper heading hierarchy (h1 → h2 → h3)
2. **Add alt text** - Describe images for screen readers
3. **Ensure contrast** - Text should be readable in both light and dark modes
4. **Keyboard navigation** - All interactive elements should be keyboard accessible

## Project Structure

```
src/
├── components/
│   └── docs/
│       ├── docs-layout.tsx          # Main layout component
│       ├── docs-navigation.tsx      # Navigation sidebar
│       ├── docs-toc.tsx            # Table of contents
│       ├── docs-content.tsx        # Content wrapper with styling
│       ├── docs-callout.tsx        # Callout/alert component
│       ├── docs-code-block.tsx     # Code block component
│       ├── docs-mobile-nav.tsx     # Mobile navigation
│       └── index.ts                # Exports
├── routes/
│   └── _public/
│       └── index.tsx               # Home/overview page
└── styles.css                      # Global styles
```

## Technologies Used

- **React 19** - UI library
- **TanStack Start** - Full-stack React framework
- **TanStack Router** - Type-safe routing
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component library
- **TypeScript** - Type safety
- **Lucide React** - Icon library

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

To contribute to this documentation template:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions:

- Open an issue on GitHub
- Check existing documentation
- Review the example pages

---

Built with ❤️ using React and TanStack Start
