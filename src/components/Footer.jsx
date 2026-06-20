/**
 * Footer.jsx
 * App footer with author name, email, and app label.
 */
import { useState } from 'react'

export default function Footer() {
  const [hover, setHover] = useState(false)

  return (
    <footer style={{
      borderTop:      '1px solid var(--border)',
      padding:        '14px 24px',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'space-between',
      flexShrink:     0,
      background:     'var(--bg-surface)',
      flexWrap:       'wrap',
      gap:            '8px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500' }}>
          Prashiv Goyal
        </span>
        <a
          href="mailto:prashivg04@gmail.com"
          style={{
            fontSize:    '12px',
            color:       hover ? 'var(--accent)' : 'var(--text-muted)',
            textDecoration: 'none',
            fontFamily:  "'JetBrains Mono', monospace",
            transition:  'color 0.15s',
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          prashivgoyal1504@gmail.com
        </a>
      </div>

      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
        JSON Formatter &amp; Validator
      </span>
    </footer>
  )
}
