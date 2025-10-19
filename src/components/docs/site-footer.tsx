import { Link } from '@tanstack/react-router'
import { getAllLibraries, getCategories, getLibrarySlug } from '@/lib/libraries'
import { DISCORD_LINK, GITHUB_LINK } from '@/lib/constants'
import { GitHubIcon } from '@/components/ui/github-icon'
import { DiscordIcon } from '@/components/ui/discord-icon'

export function SiteFooter() {
  const libraries = getAllLibraries()
  const categories = getCategories()

  const sitemapSections = [
    {
      title: 'Documentation',
      links: [
        { title: 'Introduction', href: '/' },
        { title: 'Architecture', href: '/docs/architecture' },
        { title: 'Changelog', href: '/docs/changelog' },
        { title: 'Contributing', href: '/docs/contributing' },
        { title: 'vs Laravel', href: '/docs/comparison' },
      ],
    },
    {
      title: 'Libraries',
      links: categories.map((category) => ({
        title: category.charAt(0).toUpperCase() + category.slice(1),
        href: `/docs/libraries?category=${category}`,
      })),
    },
    {
      title: 'Examples',
      links: [
        { title: 'Example components', href: '/docs/example-comps' },
      ],
    },
    {
      title: 'Advanced',
      links: [
        { title: 'Security', href: '/docs/security' },
      ],
    },
  ]

  const popularLibraries = libraries
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 4)
    .map((library) => ({
      title: library.name,
      href: `/docs/library/${getLibrarySlug(library.name)}`,
    }))

  const communityLinks = [
    {
      title: 'GitHub',
      href: GITHUB_LINK,
      external: true,
      icon: <GitHubIcon size={14} />,
    },
    {
      title: 'Discord',
      href: DISCORD_LINK,
      external: true,
      icon: <DiscordIcon size={14} />,
    },
    {
      title: 'Blog',
      href: '/blog',
      external: false,
    },
  ]

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-8">
      {/* Sitemap Section */}
      <div className="px-4 md:px-6 lg:px-8 py-6" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {/* Main navigation sections */}
          {sitemapSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-xs mb-2 text-foreground">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Popular Libraries Column */}
          <div>
            <h3 className="font-semibold text-xs mb-2 text-foreground">
              Popular libraries
            </h3>
            <ul className="space-y-1">
              {popularLibraries.map((library, index) => (
                <li key={index}>
                  <Link
                    to={library.href}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {library.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Column */}
          <div>
            <h3 className="font-semibold text-xs mb-2 text-foreground">
              Community
            </h3>
            <ul className="space-y-1">
              {communityLinks.map((link, index) => (
                <li key={index}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.icon}
                      {link.title}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t px-4 md:px-6 lg:px-8 py-6">
        <div className="flex min-h-12 w-full items-center justify-center">
          <div
            className="flex w-full items-center justify-center"
            style={{ maxWidth: '1400px' }}
          >
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Utopia.php • Generated by{' '}
              <a
                href="https://imagine.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Imagine.dev
              </a>{' '}
              • Hosted on{' '}
              <a
                href="https://appwrite.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Appwrite Sites
              </a>
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center mt-2 gap-2">
          <span className="text-sm text-muted-foreground">Backed by</span>
          <a
            href="https://appwrite.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://appwrite.io/images/logos/appwrite.svg"
              alt="Appwrite"
              className="h-4 w-auto hidden dark:block"
            />
            <img
              src="https://appwrite.io/images/logos/appwrite-light.svg"
              alt="Appwrite"
              className="h-4 w-auto dark:hidden"
            />
          </a>
        </div>
      </div>
    </footer>
  )
}
