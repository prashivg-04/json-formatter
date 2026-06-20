/**
 * Header.jsx
 * Top navigation bar: app title, theme toggle, CTA buttons.
 */
import { IconSun, IconMoon } from '../icons/Icons'

export default function Header({ theme, onToggleTheme }) {
  return (
    <header style={{
      borderBottom:   '1px solid var(--border)',
      background:     'var(--bg-surface)',
      padding:        '0 24px',
      height:         '64px',          /* taller — more breathing room */
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'space-between',
      flexShrink:     0,
      gap:            '12px',
    }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        <span style={{
          fontSize:      '13px',
          fontWeight:    '600',
          color:         'var(--text-primary)',
          letterSpacing: '-0.01em',
        }}>
          JSON Formatter
        </span>
        <span style={{
          fontSize:      '10px',
          fontWeight:    '500',
          color:         'var(--text-muted)',
          background:    'var(--bg-base)',
          border:        '1px solid var(--border)',
          borderRadius:  '3px',
          padding:       '1px 6px',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}>
          Validator
        </span>
      </div>

      {/* Right side actions */}
      <div style={{
        display:    'flex',
        alignItems: 'stretch',   /* stretch so all children share the same height */
        gap:        '8px',
        height:     '36px',      /* fixed container height — both buttons fill this */
      }}>
        {/* Theme toggle */}
        <button
          className="btn btn-ghost"
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{ alignSelf: 'center', padding: '5px 10px' }}
          id="theme-toggle"
        >
          {theme === 'dark' ? <IconSun /> : <IconMoon />}
          <span style={{ fontSize: '11px' }}>
            {theme === 'dark' ? 'Light' : 'Dark'}
          </span>
        </button>

        {/* Built by Prashiv Goyal — mailto CTA */}
        <a
          href="mailto:prashivgoyal1504@gmail.com"
          className="btn btn-by"
          style={{
            textDecoration: 'none',
            flexDirection:  'column',
            justifyContent: 'center',
            alignItems:     'flex-start',
            gap:            '2px',
            padding:        '0 14px',
          }}
          id="by-cta"
          title="Email Prashiv Goyal"
        >
          <span style={{ fontSize: '11px', fontWeight: '600', lineHeight: 1.2 }}>
            Built by Prashiv Goyal
          </span>
          <span style={{
            fontSize:   '10px',
            fontWeight: '400',
            fontFamily: "'JetBrains Mono', monospace",
            opacity:    0.72,
            lineHeight: 1.2,
          }}>
            prashivgoyal1504@gmail.com
          </span>
        </a>

        {/* Built for Digital Heroes — external CTA */}
        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-hero"
          style={{
            textDecoration: 'none',
            fontSize:       '11px',
            fontWeight:     '600',
            alignSelf:      'stretch',    /* match height of the two-line button */
            justifyContent: 'center',
          }}
          id="dh-cta"
        >
          Built for Digital Heroes
        </a>
      </div>
    </header>
  )
}

