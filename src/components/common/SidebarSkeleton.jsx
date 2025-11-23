import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeProvider';

const SidebarSkeleton = () => {
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <div 
      className="w-64 h-full flex flex-col space-y-4 p-4"
      style={{
        backgroundColor: darkMode ? '#1C1C1C' : '#ffffff',
        borderRight: `1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : '#e0e0e0'}`,
        transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Logo skeleton */}
      <div className="flex items-center space-x-3 mb-6">
        <div 
          className="w-8 h-8 rounded animate-pulse" 
          style={{ backgroundColor: darkMode ? '#282828' : '#e5e7eb' }}
        ></div>
        <div 
          className="h-6 w-24 rounded animate-pulse" 
          style={{ backgroundColor: darkMode ? '#282828' : '#e5e7eb' }}
        ></div>
      </div>
      
      {/* Navigation skeleton */}
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="flex items-center space-x-3 p-2">
          <div 
            className="w-5 h-5 rounded animate-pulse" 
            style={{ backgroundColor: darkMode ? '#282828' : '#e5e7eb' }}
          ></div>
          <div 
            className="h-4 w-20 rounded animate-pulse" 
            style={{ backgroundColor: darkMode ? '#282828' : '#e5e7eb' }}
          ></div>
        </div>
      ))}
      
      {/* User section skeleton */}
      <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div 
            className="w-10 h-10 rounded-full animate-pulse" 
            style={{ backgroundColor: darkMode ? '#282828' : '#e5e7eb' }}
          ></div>
          <div className="flex flex-col space-y-1">
            <div 
              className="h-4 w-16 rounded animate-pulse" 
              style={{ backgroundColor: darkMode ? '#282828' : '#e5e7eb' }}
            ></div>
            <div 
              className="h-3 w-12 rounded animate-pulse" 
              style={{ backgroundColor: darkMode ? '#282828' : '#e5e7eb' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarSkeleton;

