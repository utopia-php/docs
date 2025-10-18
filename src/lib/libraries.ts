import librariesData from '@/data/libraries.json'

export interface Concept {
  title: string
  path: string
  description: string
  content: string
  codeExample?: {
    language: string
    title: string
    code: string
    showLineNumbers?: boolean
  }
  additionalInfo?: string
}

export interface Library {
  name: string
  stars: number
  description: string
  longDescription?: string
  githubUrl: string
  version: string
  lastUpdated: string
  documentation: string
  installation: string
  features: string[]
  dependencies: string[]
  category: string
  license?: string
  deprecated?: boolean
  concepts?: Concept[]
}

export interface LibrariesData {
  servers: Library[]
  transport: Library[]
  data: Library[]
  security: Library[]
  observability: Library[]
  platform: Library[]
  utilities: Library[]
  integrations: Library[]
}

// Get all libraries as a flat array (excluding deprecated)
export function getAllLibraries(): Library[] {
  const data = librariesData as LibrariesData
  return [
    ...data.servers,
    ...data.transport,
    ...data.data,
    ...data.security,
    ...data.observability,
    ...data.platform,
    ...data.utilities,
    ...data.integrations,
  ].filter((lib) => !lib.deprecated)
}

// Find a library by name (case-insensitive) or by URL slug
export function findLibraryByName(name: string): Library | null {
  const libraries = getAllLibraries()
  return (
    libraries.find(
      (lib) =>
        lib.name.toLowerCase() === name.toLowerCase() ||
        getLibrarySlug(lib.name) === name.toLowerCase(),
    ) || null
  )
}

// Get libraries by category (excluding deprecated)
export function getLibrariesByCategory(category: string): Library[] {
  const data = librariesData as LibrariesData
  let libraries: Library[] = []

  switch (category.toLowerCase()) {
    case 'servers':
      libraries = data.servers
      break
    case 'transport':
      libraries = data.transport
      break
    case 'data':
      libraries = data.data
      break
    case 'security':
      libraries = data.security
      break
    case 'observability':
      libraries = data.observability
      break
    case 'platform':
      libraries = data.platform
      break
    case 'utilities':
      libraries = data.utilities
      break
    case 'integrations':
      libraries = data.integrations
      break
    default:
      return []
  }

  return libraries.filter((lib) => !lib.deprecated)
}

// Get all categories
export function getCategories(): string[] {
  return [
    'servers',
    'transport',
    'data',
    'security',
    'observability',
    'platform',
    'utilities',
    'integrations',
  ]
}

// Get library statistics
export function getLibraryStats() {
  const libraries = getAllLibraries()
  const totalStars = libraries.reduce((sum, lib) => sum + lib.stars, 0)
  const totalLibraries = libraries.length
  const categories = getCategories()

  return {
    totalLibraries,
    totalStars,
    categories: categories.map((category) => ({
      name: category,
      count: getLibrariesByCategory(category).length,
      stars: getLibrariesByCategory(category).reduce(
        (sum, lib) => sum + lib.stars,
        0,
      ),
    })),
  }
}

// Search libraries by name or description (excluding deprecated)
export function searchLibraries(query: string): Library[] {
  const libraries = getAllLibraries()
  const lowercaseQuery = query.toLowerCase()

  return libraries.filter(
    (lib) =>
      lib.name.toLowerCase().includes(lowercaseQuery) ||
      lib.description.toLowerCase().includes(lowercaseQuery) ||
      lib.features.some((feature) =>
        feature.toLowerCase().includes(lowercaseQuery),
      ),
  )
}

// Get related libraries (same category, excluding current)
export function getRelatedLibraries(
  library: Library,
  limit: number = 3,
): Library[] {
  const categoryLibraries = getLibrariesByCategory(library.category)
  return categoryLibraries
    .filter((lib) => lib.name !== library.name)
    .slice(0, limit)
}

// Format version for display
export function formatVersion(version: string): string {
  return `v${version}`
}

// Format last updated date
export function formatLastUpdated(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Get library URL slug
export function getLibrarySlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-')
}

// Get library URL from slug
export function getLibraryNameFromSlug(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

// Find a concept by path within a library
export function findConceptByPath(
  library: Library,
  conceptPath: string,
): Concept | null {
  if (!library.concepts) {
    return null
  }

  return (
    library.concepts.find((concept) => concept.path === conceptPath) || null
  )
}

// Get all concepts for a library
export function getLibraryConcepts(library: Library): Concept[] {
  return library.concepts || []
}

// Get concept URL slug
export function getConceptSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}
