/**
 * InputPanel.jsx
 * Left panel: JSON textarea + validation badge + inline error message.
 */

const PLACEHOLDER = `Paste or type JSON here…

{
  "name": "Digital Heroes",
  "active": true,
  "count": 42
}`

export default function InputPanel({ value, onChange, isValid, isError, error }) {
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
        <span className="panel-label">Input</span>
        {isError && (
          <span className="badge-error" role="status">
            <span className="badge-dot" /> Invalid JSON
          </span>
        )}
        {isValid && (
          <span className="badge-valid" role="status">
            <span className="badge-dot" /> Valid
          </span>
        )}
      </div>

      {/* Textarea */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <textarea
          id="json-input"
          className={isError ? 'has-error' : ''}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={PLACEHOLDER}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          style={{ height: '100%' }}
          aria-label="JSON input"
          aria-describedby={isError ? 'json-error' : undefined}
          aria-invalid={isError ? 'true' : 'false'}
        />
      </div>

      {/* Error message — appears below textarea */}
      {isError && error && (
        <div
          id="json-error"
          className="error-msg"
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}
    </section>
  )
}
