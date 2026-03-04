// src/Styles/globalStyles.js
import { createGlobalStyle } from "styled-components";

/*  
===========================================================
🌐 GLOBAL STYLES — TaxiRadar24 (Versión PRO)
Limpio, optimizado, 100% Theme-driven
Incluye bloqueo anti-descarga de audio y soporte SEO
===========================================================
*/

const GlobalStyles = createGlobalStyle`

  /* =============================
     🎨 VARIABLES DINÁMICAS
  ============================== */
  :root {
    --body-bg: ${({ theme }) => theme.colors?.body || "#081325"};
    
  }

  /* =============================
     🔧 RESET + BASE HTML
  ============================== */
  html, body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;

    background-color: var(--body-bg);
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

body {
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* =============================
     🔍 SEO CLASSES
  ============================== */
  .seo-hidden {
    position: absolute;
    left: -9999px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  .seo-section {
    max-width: 900px;
    margin: 2rem auto;
    padding: 1rem;
    font-size: 1rem;
    line-height: 1.6;
    color: #f1f1f1;
  }

  .seo-section h2 {
    color: #f4d35e;
    margin-top: 2rem;
  }

  .seo-section h3 {
    color: #ffffff;
    margin-top: 1rem;
    font-size: 1.1rem;
  }

  /* =============================
     📌 FOOTER
  ============================== */
  footer {
    text-align: center;
    padding: 1rem;
    background-color: #0b1a3d;
    color: #f1f1f1;
    width: 100%;
  }

  /* ======================================================
     🔒 BLOQUEO DE DESCARGA DE AUDIOS — MODO PRO
     Compatible con Chrome, Edge, Firefox, Safari
  ====================================================== */

  /* Ocultar botón de descarga nativo */
  audio::-internal-media-controls-download-button {
    display: none !important;
  }

  audio::-webkit-media-controls-enclosure {
    overflow: hidden !important;
  }

  /* Evitar selección o copia */
  audio {
    -webkit-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
  }

  /* Bloquear menú contextual */
  audio {
    pointer-events: auto;
  }

  /* Firefox */
  html:not(.allow-audio-menu) audio {
    -moz-context-properties: none;
  }

`;

export const GlobalStyle = GlobalStyles;
export default GlobalStyles;
