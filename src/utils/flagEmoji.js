// src/utils/flagEmoji.js
export function flagEmoji(code) {
  if (!code || code.length !== 2) return "🏳️"; // bandera blanca si no hay código válido
  const points = [...code.toUpperCase()].map(
    c => 0x1f1e6 - 65 + c.charCodeAt(0)
  );
  return String.fromCodePoint(...points);
}
