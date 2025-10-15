import librariesData from '@/data/libraries.json'

export interface Library {
  name: string
  stars: number
  description: string
  githubUrl: string
  version: string
  lastUpdated: string
  documentation: string
  installation: string
  features: string[]
  dependencies: string[]
  category: string
  deprecated?: boolean
}

export interface LibrariesData {
  network: Library[]
  data: Library[]
  logs: Library[]
  services: Library[]
  other: Library[]
}

// Get all libraries as a flat array
export function getAllLibraries(): Library[] {
  const data = librariesData as LibrariesData
  return [
    ...data.network,
    ...data.data,
    ...data.logs,
    ...data.services,
    ...data.other,
  ]
}

// Find a library by name (case-insensitive)
export function findLibraryByName(name: string): Library | null {
  const libraries = getAllLibraries()
  return libraries.find(lib => 
    lib.name.toLowerCase() === name.toLowerCase()
  ) || null
}

// Get libraries by category
export function getLibrariesByCategory(category: string): Library[] {
  const data = librariesData as LibrariesData
  switch (category.toLowerCase()) {
    case 'network':
      return data.network
    case 'data':
      return data.data
    case 'logs':
      return data.logs
    case 'services':
      return data.services
    case 'other':
      return data.other
    default:
      return []
  }
}

// Get all categories
export function getCategories(): string[] {
  return ['network', 'data', 'logs', 'services', 'other']
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
    categories: categories.map(category => ({
      name: category,
      count: getLibrariesByCategory(category).length,
      stars: getLibrariesByCategory(category).reduce((sum, lib) => sum + lib.stars, 0)
    }))
  }
}

// Search libraries by name or description
export function searchLibraries(query: string): Library[] {
  const libraries = getAllLibraries()
  const lowercaseQuery = query.toLowerCase()
  
  return libraries.filter(lib => 
    lib.name.toLowerCase().includes(lowercaseQuery) ||
    lib.description.toLowerCase().includes(lowercaseQuery) ||
    lib.features.some(feature => feature.toLowerCase().includes(lowercaseQuery))
  )
}

// Get related libraries (same category, excluding current)
export function getRelatedLibraries(library: Library, limit: number = 3): Library[] {
  const categoryLibraries = getLibrariesByCategory(library.category)
  return categoryLibraries
    .filter(lib => lib.name !== library.name)
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
    day: 'numeric'
  })
}

// Get library URL slug
export function getLibrarySlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-')
}

// Get library URL from slug
export function getLibraryNameFromSlug(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}
