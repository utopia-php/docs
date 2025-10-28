// Stub for lowlight to prevent highlight.js errors
// This is used when we only need Prism syntax highlighter
export const lowlight = {
  highlight: () => ({ value: '', language: 'text' }),
  highlightAuto: () => ({ value: '', language: 'text' }),
  registerLanguage: () => {},
  registerAlias: () => {},
  listLanguages: () => [],
  check: () => false,
  highlightAll: () => {},
  highlightElement: () => {},
}

export default lowlight

