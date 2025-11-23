import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeProvider';

const PageSkeleton = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className="p-6 space-y-6">
      {/* Header skeleton */}
      <div className="flex justify-between items-center">
        <div 
          className="h-8 w-48 rounded animate-pulse" 
          style={{ backgroundColor: darkMode ? '#282828' : '#e5e7eb' }}
        ></div>
        <div 
          className="h-10 w-32 rounded animate-pulse" 
          style={{ backgroundColor: darkMode ? '#282828' : '#e5e7eb' }}
        ></div>
      </div>
      
      {/* Stats cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div 
            key={item} 
            className="p-6 rounded-xl border border-gray-200 dark:border-gray-700"
            style={{
              backgroundColor: darkMode ? '#1C1C1C' : '#ffffff',
              transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div 
              className="h-4 w-20 rounded animate-pulse mb-2" 
              style={{ backgroundColor: darkMode ? '#282828' : '#e5e7eb' }}
            ></div>
            <div 
              className="h-8 w-16 rounded animate-pulse mb-1" 
              style={{ backgroundColor: darkMode ? '#282828' : '#e5e7eb' }}
            ></div>
            <div 
              className="h-3 w-12 rounded animate-pulse" 
              style={{ backgroundColor: darkMode ? '#282828' : '#e5e7eb' }}
            ></div>
          </div>
        ))}
      </div>
      
      {/* Main content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div 
            className="p-6 rounded-xl border border-gray-200 dark:border-gray-700"
            style={{
              backgroundColor: darkMode ? '#1C1C1C' : '#ffffff',
              transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div 
              className="h-6 w-32 rounded animate-pulse mb-4" 
              style={{ backgroundColor: darkMode ? '#282828' : '#e5e7eb' }}
            ></div>
            <div 
              className="h-64 w-full rounded animate-pulse" 
              style={{ backgroundColor: darkMode ? '#282828' : '#e5e7eb' }}
            ></div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div 
            className="p-6 rounded-xl border border-gray-200 dark:border-gray-700"
            style={{
              backgroundColor: darkMode ? '#1C1C1C' : '#ffffff',
              transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div 
              className="h-5 w-24 rounded animate-pulse mb-4" 
              style={{ backgroundColor: darkMode ? '#282828' : '#e5e7eb' }}
            ></div>
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center space-x-3">
                  <div 
                    className="w-8 h-8 rounded-full animate-pulse" 
                    style={{ backgroundColor: darkMode ? '#282828' : '#e5e7eb' }}
                  ></div>
                  <div className="flex-1">
                    <div 
                      className="h-4 w-full rounded animate-pulse mb-1" 
                      style={{ backgroundColor: darkMode ? '#282828' : '#e5e7eb' }}
                    ></div>
                    <div 
                      className="h-3 w-20 rounded animate-pulse" 
                      style={{ backgroundColor: darkMode ? '#282828' : '#e5e7eb' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;

