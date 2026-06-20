/**
 * jsonParser.js
 * Parses a raw JSON string and returns a structured result object.
 */

/**
 * @param {string} raw    - Raw user input
 * @param {number} indent - 0 = minify, 2 = beautify
 * @returns {{
 *   valid: boolean|null,
 *   formatted: string,
 *   error: string|null,
 *   errorLine: number|null,
 *   errorCol: number|null
 * }}
 */
export function parseJSON(raw, indent = 2) {
  if (!raw.trim()) return { valid: null, formatted: '', error: null, errorLine: null, errorCol: null }

  try {
    const parsed = JSON.parse(raw)
    return { valid: true, formatted: JSON.stringify(parsed, null, indent), error: null, errorLine: null, errorCol: null }
  } catch (e) {
    const msg = e.message

    // Chrome/V8:  "… at line X column Y (char Z)"
    const lineColMatch = msg.match(/line (\d+) column (\d+)/i)
    // Firefox/Safari: "… at position N"
    const posMatch = msg.match(/position (\d+)/i)

    let errorLine = null
    let errorCol  = null
    let friendlyMsg = msg

    if (lineColMatch) {
      errorLine   = parseInt(lineColMatch[1], 10)
      errorCol    = parseInt(lineColMatch[2], 10)
      friendlyMsg = `Line ${errorLine}, Col ${errorCol}: ${msg}`
    } else if (posMatch) {
      const pos   = parseInt(posMatch[1], 10)
      const lines = raw.slice(0, pos).split('\n')
      errorLine   = lines.length
      errorCol    = lines[lines.length - 1].length + 1
      friendlyMsg = `Line ${errorLine}, Col ${errorCol}: ${msg}`
    }

    return { valid: false, formatted: '', error: friendlyMsg, errorLine, errorCol }
  }
}
