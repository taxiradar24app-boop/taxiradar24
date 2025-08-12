// ✅ respeta tu paleta actual y añade 'card' + 'mode' para estilos
export const lightTheme = {
  mode: 'light',
  colors: {
    background: '#420547ff',
    text: '#e0e0e0',
    primary: '#f4c10aff',
    secondary: '#cfbebeff',
    border: '#ccc',
    card: '#2a1930', // derivado del fondo claro para contraste
  },
  fonts: { main: 'System' },
  spacing: { sm: '8px', md: '16px', lg: '24px' },
  fontSizes: { sm: '16px', md: '20px', lg: '24px' },
  borderRadius: { sm: '6px', md: '12px', lg: '20px' },
  shadows: { light: '0px 4px 6px rgba(0,0,0,0.1)' },
  platform: typeof window !== 'undefined' ? 'web' : 'native',
};

export const darkTheme = {
  mode: 'dark',
  colors: {
    background: '#121212',
    text: '#f0f0f0',
    primary: '#f4d35e',
    secondary: '#1e1e1e',
    border: '#333',
    card: '#1b1b1b',
  },
  fonts: { main: 'System' },
  spacing: { sm: '8px', md: '16px', lg: '24px' },
  fontSizes: { sm: '16px', md: '20px', lg: '24px' },
  borderRadius: { sm: '6px', md: '12px', lg: '20px' },
  shadows: { dark: '0px 4px 6px rgba(0,0,0,0.6)' },
  platform: typeof window !== 'undefined' ? 'web' : 'native',
};
