import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './Styles/ThemeContext';
import useAuth from './hooks/useAuth';
import Navigator from './navigator/navigator';
import AuthNavigator from './navigator/authNavigator';

export default function App() {
  const { user, checking } = useAuth();

  if (checking) return null;

  return (
    <ThemeProvider>
      <BrowserRouter>
        {user ? <Navigator /> : <AuthNavigator />}
      </BrowserRouter>
    </ThemeProvider>
  );
}
