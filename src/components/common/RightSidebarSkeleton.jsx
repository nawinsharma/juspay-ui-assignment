import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeProvider';

const RightSidebarSkeleton = () => {
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <div 
      className="w-80 h-full flex flex-col space-y-4 p-4"
      style={{
        backgroundColor: darkMode ? '#1C1C1C' : '#ffffff',
        borderLeft: `1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : '#e0e0e0'}`,
        transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Header skeleton */}
      <div 
        className="h-6 w-32 rounded animate-pulse mb-4" 
        style={{ backgroundColor: darkMode ? '#282828' : '#e5e7eb' }}
      ></div>
      
      {/* Cards skeleton */}
      {[1, 2, 3].map((item) => (
        <div key={item} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div 
            className="h-4 w-24 rounded animate-pulse mb-2" 
            style={{ backgroundColor: darkMode ? '#282828' : '#e5e7eb' }}
          ></div>
          <div 
            className="h-16 w-full rounded animate-pulse" 
            style={{ backgroundColor: darkMode ? '#282828' : '#e5e7eb' }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default RightSidebarSkeleton;

