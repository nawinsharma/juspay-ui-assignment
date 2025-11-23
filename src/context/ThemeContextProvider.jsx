// src/context/ThemeContextProvider.js - Optimized for faster transitions
import React, { createContext, useState, useEffect, useContext } from 'react';

export const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeContextProvider');
  }
  return context;
};

const ThemeContextProvider = ({ children }) => {
  // Initialize theme from localStorage synchronously to prevent flash
  const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      // Fallback to system preference if no saved theme
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  };

  const [darkMode, setDarkMode] = useState(getInitialTheme);

  // Apply theme to document on mount and when it changes
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');

    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  const value = {
    darkMode,
    isDarkMode: darkMode, // backward compatibility
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
