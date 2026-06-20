/**
 * App.jsx
 * Root component — composes Header, Toolbar, panels, and Footer.
 * All business logic for formatting + theme lives here or in hooks/utils.
 */
import { useState, useCallback } from 'react'

import { useTheme }    from './hooks/useTheme'
import { parseJSON }   from './utils/jsonParser'

import Header      from './components/Header'
import Toolbar     from './components/Toolbar'
import InputPanel  from './components/InputPanel'
import OutputPanel from './components/OutputPanel'
import Footer      from './components/Footer'

export default function App() {
  const { theme, toggleTheme } = useTheme()

  const [input, setInput] = useState('')
  const [mode,  setMode]  = useState('beautify') // 'beautify' | 'minify'

  const indent = mode === 'beautify' ? 2 : 0
  const result = parseJSON(input, indent)

  const handleClear = useCallback(() => setInput(''), [])

  const hasInput = input.trim().length > 0
  const isValid  = result.valid === true
  const isError  = result.valid === false

  return (
    <div
      style={{
        display:    'flex',
        flexDirection: 'column',
        minHeight:  '100vh',
        background: 'var(--bg-base)',
      }}
    >
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <Toolbar
        mode={mode}
        onModeChange={setMode}
        onClear={handleClear}
        hasInput={hasInput}
      />

      {/* Two-panel body */}
      <main className="panels-main">
        <InputPanel
          value={input}
          onChange={setInput}
          isValid={isValid}
          isError={isError}
          error={result.error}
        />

        {/* Vertical divider — hidden on mobile via CSS */}
        <div className="divider panels-divider" />

        <OutputPanel
          formatted={result.formatted}
          isError={isError}
        />
      </main>

      <Footer />
    </div>
  )
}
