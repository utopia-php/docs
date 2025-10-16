/**
 * Utility functions for GitHub integration
 */

const GITHUB_REPO_URL = 'https://github.com/utopia-php/docs'
const GITHUB_BRANCH = 'main'

/**
 * Maps a route path to the corresponding GitHub file path
 */
export function getGitHubFilePath(routePath: string): string | null {
  // Remove leading slash and handle root path
  const cleanPath = routePath === '/' ? 'index' : routePath.replace(/^\//, '')
  
  // Map route paths to source file paths
  const routeToFileMap: Record<string, string> = {
    '': 'src/routes/_public/index.tsx',
    'contributing': 'src/routes/_public/contributing.tsx',
    'changelog': 'src/routes/_public/changelog.tsx',
    'blog': 'src/routes/_public/blog.tsx',
    'example-comps': 'src/routes/_public/example-comps.tsx',
    'sign-in': 'src/routes/_auth/sign-in.tsx',
    'sign-up': 'src/routes/_auth/sign-up.tsx',
    'sign-out': 'src/routes/_auth/sign-out.tsx',
    'example-protected-route': 'src/routes/_protected/example-protected-route.tsx',
  }
  
  // Handle library routes
  if (cleanPath.startsWith('library/')) {
    return `src/routes/_public/library.$libraryName.tsx`
  }
  
  // Return mapped file path or null if not found
  return routeToFileMap[cleanPath] || null
}

/**
 * Generates the GitHub edit URL for a given route
 */
export function getGitHubEditUrl(routePath: string): string | null {
  const filePath = getGitHubFilePath(routePath)
  if (!filePath) {
    return null
  }
  
  return `${GITHUB_REPO_URL}/edit/${GITHUB_BRANCH}/${filePath}`
}

/**
 * Gets the current route path from the browser location
 */
export function getCurrentRoutePath(): string {
  return window.location.pathname
}
