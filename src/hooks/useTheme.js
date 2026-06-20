/**
 * useTheme.js
 * Manages dark / light theme.
 * - Reads system preference on first load
 * - Persists choice to localStorage
 * - Applies `data-theme` attribute to <html> so CSS variables cascade globally
 */
import { useState, useEffect } from 'react'

const STORAGE_KEY = 'json-formatter-theme'

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    /* private browsing — ignore */
  }

  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

/**
 * @returns {{ theme: 'dark'|'light', toggleTheme: () => void }}
 */
export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* private browsing — ignore */
    }
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

  return { theme, toggleTheme }
}
