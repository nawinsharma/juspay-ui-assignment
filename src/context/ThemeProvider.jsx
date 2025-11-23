import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

export const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const ThemeProvider = ({ children }) => {
  const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      // Check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  };

  const [darkMode, setDarkMode] = useState(getInitialTheme);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Only update if user hasn't manually set a preference
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        setDarkMode(e.matches);
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } 
    // Fallback for older browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const theme = darkMode ? 'dark' : 'light';
    localStorage.setItem('theme', theme);

    const root = document.documentElement;
    
    // Toggle dark class for Tailwind dark mode (shadcn/ui compatible)
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Set custom theme variables for backward compatibility
    root.style.setProperty('--theme-bg', darkMode ? '#1C1C1C' : '#ffffff');
    root.style.setProperty('--theme-surface', darkMode ? '#282828' : '#ffffff');
    root.style.setProperty('--theme-card-bg', darkMode ? '#282828' : '#F7F9FB');
    root.style.setProperty('--theme-text', darkMode ? '#FFFFFF' : '#111827');
    root.style.setProperty('--theme-text-secondary', darkMode ? '#9ca3af' : '#6b7280');
    root.style.setProperty('--theme-border', darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.1)');
    root.style.setProperty('--theme-border-light', darkMode ? 'rgba(255,255,255,0.06)' : '#e0e0e0');
    root.style.setProperty('--theme-hover', darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)');
    root.style.setProperty('--theme-overlay', darkMode ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.5)');
    root.style.setProperty('--theme-shadow', darkMode ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)');
  }, [darkMode]);

  const toggleTheme = useCallback(() => {
    setDarkMode(prev => {
      const newTheme = !prev;
      // Mark that user has manually set preference
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  }, []);

  const setTheme = useCallback((theme) => {
    const isDark = theme === 'dark';
    setDarkMode(isDark);
    localStorage.setItem('theme', theme);
  }, []);

  const value = {
    darkMode,
    isDarkMode: darkMode,
    theme: darkMode ? 'dark' : 'light',
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
