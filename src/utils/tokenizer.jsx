/**
 * tokenizer.js
 * Custom JSON tokenizer — no external deps.
 * Returns syntax-highlighted React spans for the output panel.
 */

/**
 * Tokenise a formatted JSON string into typed tokens.
 * @param {string} json
 * @returns {{ type: 'ws'|'key'|'string'|'number'|'bool'|'bracket', value: string }[]}
 */
export function tokenize(json) {
  const tokens = []
  let i = 0

  const peek    = ()  => json[i]
  const consume = ()  => json[i++]

  while (i < json.length) {
    const ch = peek()

    // ── Whitespace (preserve newlines / indentation) ──────────
    if (/\s/.test(ch)) {
      let ws = ''
      while (i < json.length && /\s/.test(json[i])) ws += consume()
      tokens.push({ type: 'ws', value: ws })
      continue
    }

    // ── String (key or value) ─────────────────────────────────
    if (ch === '"') {
      let str = consume()                    // opening quote
      while (i < json.length) {
        const c = consume()
        str += c
        if (c === '\\') { str += consume(); continue } // escape
        if (c === '"') break                            // closing quote
      }
      // Peek ahead to decide key vs. string value
      let j = i
      while (j < json.length && /\s/.test(json[j])) j++
      tokens.push({ type: json[j] === ':' ? 'key' : 'string', value: str })
      continue
    }

    // ── Number ────────────────────────────────────────────────
    if (ch === '-' || /\d/.test(ch)) {
      let num = ''
      while (i < json.length && /[-+\d.eE]/.test(json[i])) num += consume()
      tokens.push({ type: 'number', value: num })
      continue
    }

    // ── Literals ──────────────────────────────────────────────
    if (json.startsWith('true',  i)) { tokens.push({ type: 'bool', value: 'true'  }); i += 4; continue }
    if (json.startsWith('false', i)) { tokens.push({ type: 'bool', value: 'false' }); i += 5; continue }
    if (json.startsWith('null',  i)) { tokens.push({ type: 'bool', value: 'null'  }); i += 4; continue }

    // ── Structural characters ─────────────────────────────────
    tokens.push({ type: 'bracket', value: consume() })
  }

  return tokens
}

/**
 * Convert a formatted JSON string into an array of React nodes
 * (plain strings for whitespace, <span> elements for tokens).
 * @param {string} json
 * @returns {(string|React.ReactElement)[]}
 */
export function buildHighlightedSpans(json) {
  return tokenize(json).map((tok, idx) => {
    if (tok.type === 'ws') return tok.value
    return <span key={idx} className={`tok-${tok.type}`}>{tok.value}</span>
  })
}
