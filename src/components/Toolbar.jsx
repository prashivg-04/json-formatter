/**
 * Toolbar.jsx
 * Beautify / Minify mode toggle + Clear button strip.
 */
import { IconBraces, IconMinify, IconTrash } from '../icons/Icons'

export default function Toolbar({ mode, onModeChange, onClear, hasInput }) {
  return (
    <div style={{
      padding:       '10px 24px',
      borderBottom:  '1px solid var(--border)',
      display:       'flex',
      alignItems:    'center',
      gap:           '8px',
      flexShrink:    0,
      background:    'var(--bg-surface)',
    }}>
      <button
        className={`btn${mode === 'beautify' ? ' active' : ''}`}
        onClick={() => onModeChange('beautify')}
        title="Beautify JSON (2-space indent)"
        id="btn-beautify"
      >
        <IconBraces /> Beautify
      </button>

      <button
        className={`btn${mode === 'minify' ? ' active' : ''}`}
        onClick={() => onModeChange('minify')}
        title="Minify JSON (compact)"
        id="btn-minify"
      >
        <IconMinify /> Minify
      </button>

      <div style={{ flexGrow: 1 }} />

      <button
        className="btn btn-ghost"
        onClick={onClear}
        disabled={!hasInput}
        title="Clear input"
        id="btn-clear"
        style={{ opacity: hasInput ? 1 : 0.35, cursor: hasInput ? 'pointer' : 'default' }}
      >
        <IconTrash /> Clear
      </button>
    </div>
  )
}
