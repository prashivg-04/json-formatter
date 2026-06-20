/**
 * OutputPanel.jsx
 * Right panel: syntax-highlighted JSON output + copy-to-clipboard button.
 */
import { useCallback, useRef, useEffect, useState } from 'react'
import { buildHighlightedSpans }                    from '../utils/tokenizer.jsx'
import { IconCopy, IconCheck }                       from '../icons/Icons'

export default function OutputPanel({ formatted, isError }) {
  const [copyState, setCopyState] = useState('idle') // 'idle' | 'copied'
  const timerRef = useRef(null)

  const handleCopy = useCallback(() => {
    if (!formatted) return
    navigator.clipboard.writeText(formatted).then(() => {
      setCopyState('copied')
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setCopyState('idle'), 1800)
    })
  }, [formatted])

  // Clean up timer on unmount
  useEffect(() => () => clearTimeout(timerRef.current), [])

  const hasOutput = Boolean(formatted)
  const highlighted = hasOutput ? buildHighlightedSpans(formatted) : null

  return (
    <section style={{
      flex:          1,
      display:       'flex',
      flexDirection: 'column',
      gap:           '10px',
      minWidth:      0,
      minHeight:     0,
    }}>
      {/* Panel header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '24px' }}>
        <span className="panel-label">Output</span>
        <button
          id="copy-btn"
          className={`btn btn-ghost${copyState === 'copied' ? ' copy-success' : ''}`}
          onClick={handleCopy}
          disabled={!hasOutput}
          title="Copy formatted JSON"
          aria-label="Copy formatted JSON to clipboard"
          style={{
            opacity: hasOutput ? 1 : 0.35,
            cursor:  hasOutput ? 'pointer' : 'default',
          }}
        >
          {copyState === 'copied'
            ? <><IconCheck /> Copied</>
            : <><IconCopy  /> Copy</>}
        </button>
      </div>

      {/* Output display */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <pre
          className="output-pre"
          aria-label="Formatted JSON output"
          aria-live="polite"
        >
          {highlighted || (
            <span style={{ color: 'var(--text-muted)', fontFamily: 'inherit' }}>
              {isError
                ? 'Fix the JSON error to see formatted output.'
                : 'Formatted output will appear here.'}
            </span>
          )}
        </pre>
      </div>
    </section>
  )
}
