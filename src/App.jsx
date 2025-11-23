import React, { useContext, useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import ThemeProvider, { ThemeContext } from './context/ThemeProvider';
import { ToastProvider } from './context/ToastContext';
import { SearchProvider } from './context/SearchContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import SidebarSkeleton from './components/common/SidebarSkeleton';
import RightSidebarSkeleton from './components/common/RightSidebarSkeleton';
import PageSkeleton from './components/common/PageSkeleton';
import useProgressiveLoading from './hooks/useProgressiveLoading';

// Lazy load components with error fallbacks
const Sidebar = lazy(() => 
  import('./components/layout/Sidebar').catch(() => ({
    default: () => <div className="w-64 h-full bg-gray-100 dark:bg-gray-900 animate-pulse" />
  }))
);

const RightSidebar = lazy(() => 
  import('./components/layout/RightSidebar').catch(() => ({
    default: () => <div className="w-80 h-full bg-gray-100 dark:bg-gray-900 animate-pulse" />
  }))
);

const DashboardPage = lazy(() => 
  import('./pages/DashboardPage').catch(() => ({
    default: () => (
      <div className="p-6">
        <div className="text-center">
          <h2>Error loading dashboard</h2>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      </div>
    )
  }))
);

const OrdersPage = lazy(() => 
  import('./pages/OrdersPage').catch(() => ({
    default: () => (
      <div className="p-6">
        <div className="text-center">
          <h2>Error loading orders</h2>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      </div>
    )
  }))
);

const PageNotFound = lazy(() => 
  import('./pages/PageNotFound').catch(() => ({
    default: () => (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold">Page Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>
      </div>
    )
  }))
);

const AppContent = () => {
  const { darkMode } = useContext(ThemeContext);
  const loadedComponents = useProgressiveLoading();

  // Responsive state
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const [leftSidebarVisible, setLeftSidebarVisible] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );
  const [rightSidebarVisible, setRightSidebarVisible] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1280 : true
  );

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);

      // Auto-show sidebars on larger screens
      if (width >= 1024 && width < 1280) {
        setLeftSidebarVisible(true);
      }
      if (width >= 1280) {
        setLeftSidebarVisible(true);
        setRightSidebarVisible(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preload components on user interaction
  useEffect(() => {
    const preloadTimer = setTimeout(() => {
      import('./components/layout/Sidebar');
      import('./components/layout/RightSidebar');
      import('./pages/DashboardPage');
      import('./pages/OrdersPage');
    }, 1000);

    return () => clearTimeout(preloadTimer);
  }, []);

  // Toggle functions
  const toggleLeftSidebar = () => setLeftSidebarVisible(prev => !prev);
  const toggleRightSidebar = () => setRightSidebarVisible(prev => !prev);

  // Close sidebars when clicking overlay on mobile
  const handleOverlayClick = () => {
    if (windowWidth < 1024) setLeftSidebarVisible(false);
    if (windowWidth < 1280) setRightSidebarVisible(false);
  };

  // App-level styles
  const appBg = darkMode ? '#1C1C1C' : '#ffffff';
  const textColor = darkMode ? '#FFFFFF' : '#111827';

  const fastTransitionStyle = {
    transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  };

  return (
    <div style={{ 
      background: appBg, 
      color: textColor, 
      minHeight: '100vh',
      ...fastTransitionStyle 
    }}>
      <div
        className="h-screen flex relative overflow-hidden"
        style={{
          background: appBg,
          color: textColor,
          transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Mobile/Tablet Overlay */}
        {((leftSidebarVisible && windowWidth < 1024) || (rightSidebarVisible && windowWidth < 1280)) && (
          <div
            onClick={handleOverlayClick}
            role="button"
            aria-label="Close overlays"
            tabIndex={0}
            className="fixed inset-0 z-30"
            style={{
              backgroundColor: 'rgba(0,0,0,0.6)',
              transition: 'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        )}

        {/* Left Sidebar with Progressive Loading */}
        <div
          className={`
            ${windowWidth < 1024 ? 'fixed' : 'relative'}
            inset-y-0 left-0 z-40
            transform 
            ${leftSidebarVisible ? 'translate-x-0' : '-translate-x-full'}
            ${windowWidth >= 1024 ? (leftSidebarVisible ? 'block' : 'hidden') : ''}
            flex-shrink-0
          `}
          style={{
            transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
            height: '100vh',
            overflowY: 'auto',
            overflowX: 'hidden'
          }}
        >
          <ErrorBoundary fallback={<SidebarSkeleton />}>
            {loadedComponents.sidebar ? (
              <Suspense fallback={<SidebarSkeleton />}>
                <Sidebar
                  isVisible={leftSidebarVisible}
                  isMobile={windowWidth < 1024}
                  onClose={() => setLeftSidebarVisible(false)}
                />
              </Suspense>
            ) : (
              <SidebarSkeleton />
            )}
          </ErrorBoundary>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0 h-full">
          {/* Header loads immediately */}
          <Header
            leftSidebarVisible={leftSidebarVisible}
            rightSidebarVisible={rightSidebarVisible}
            toggleLeftSidebar={toggleLeftSidebar}
            toggleRightSidebar={toggleRightSidebar}
            isMobile={windowWidth < 1024}
            isTablet={windowWidth < 1280}
          />

          <main 
            className="flex-1 overflow-x-hidden overflow-y-auto min-h-0"
            style={{
              ...fastTransitionStyle,
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none', /* IE and Edge */
            }}
          >
            <div 
              className="p-3 sm:p-4 lg:p-6" 
              style={{ 
                background: 'transparent',
                ...fastTransitionStyle 
              }}
            >
              <ErrorBoundary fallback={<PageSkeleton />}>
                {loadedComponents.mainContent ? (
                  <Suspense fallback={<PageSkeleton />}>
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <DashboardPage
                            isMobile={windowWidth < 768}
                            isTablet={windowWidth < 1024}
                          />
                        }
                      />
                      
                      <Route
                        path="/overview"
                        element={
                          <OrdersPage
                            isMobile={windowWidth < 768}
                            isTablet={windowWidth < 1024}
                          />
                        }
                      />
                      
                      <Route
                        path="/projects"
                        element={
                          <DashboardPage
                            isMobile={windowWidth < 768}
                            isTablet={windowWidth < 1024}
                          />
                        }
                      />

                      {/* Profile Routes */}
                      <Route path="/profile/overview" element={<PageNotFound />} />
                      <Route path="/profile/projects" element={<PageNotFound />} />
                      <Route path="/profile/campaigns" element={<PageNotFound />} />
                      <Route path="/profile/documents" element={<PageNotFound />} />
                      <Route path="/profile/followers" element={<PageNotFound />} />
                      
                      <Route path="/recently" element={<PageNotFound />} />
                      <Route path="*" element={<PageNotFound />} />
                    </Routes>
                  </Suspense>
                ) : (
                  <PageSkeleton />
                )}
              </ErrorBoundary>
            </div>
          </main>
        </div>

        {/* Right Sidebar with Progressive Loading */}
        <div
          className={`
            ${windowWidth >= 1280 ? 'relative' : ''}
            ${windowWidth >= 1280 ? (rightSidebarVisible ? 'block' : 'hidden') : 'block'}
            ${windowWidth < 1280 ? '' : 'flex-shrink-0'}
          `}
          style={windowWidth >= 1280 ? {
            height: '100vh',
            overflowY: 'auto',
            overflowX: 'hidden'
          } : {}}
        >
          <ErrorBoundary fallback={<RightSidebarSkeleton />}>
            {loadedComponents.rightSidebar ? (
              <Suspense fallback={<RightSidebarSkeleton />}>
                <RightSidebar
                  isVisible={rightSidebarVisible}
                  isMobile={windowWidth < 1024}
                  onClose={() => setRightSidebarVisible(false)}
                />
              </Suspense>
            ) : (
              <RightSidebarSkeleton />
            )}
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <SearchProvider>
      <ThemeProvider>
        <ToastProvider>
          <Router
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <AppContent />
          </Router>
        </ToastProvider>
      </ThemeProvider>
    </SearchProvider>
  );
};

export default App;
