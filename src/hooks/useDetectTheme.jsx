import * as React from 'react'

const prefersColorScheme = '(prefers-color-scheme: dark)'
const matchMedia =
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia
    : () => ({
        matches: false,
        addEventListener: () => {},
        removeEventListener: () => {},
      })

export const useDetectTheme = () => {
  const [mode, setMode] = React.useState(matchMedia(prefersColorScheme).matches ? 'dark' : 'light')
  const modeMe = e => setMode(e.matches ? 'dark' : 'light')

  React.useEffect(() => {
    matchMedia(prefersColorScheme).addEventListener('change', modeMe)
    return matchMedia(prefersColorScheme).removeEventListener('change', modeMe)
  }, [])
  return mode
}
