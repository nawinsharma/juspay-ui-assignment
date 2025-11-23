import React, { useContext, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Bell, Search, Notebook, SunMedium, Moon, History, Star, X, Check, Trash2, Menu, PanelLeftOpen, PanelRightOpen } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeProvider';
import { useToast } from '../../hooks/useToast';
import { useSearch } from '../../context/SearchContext';
const PortalTooltip = ({ anchorRef, visible, text }) => {
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (!visible || !anchorRef?.current) return;

    const update = () => {
      const anchorRect = anchorRef.current.getBoundingClientRect();
      const tooltipEl = tooltipRef.current;
      if (!tooltipEl) return;

      const margin = 8;
      const top = window.scrollY + anchorRect.bottom + margin;
      const left = window.scrollX + anchorRect.left + anchorRect.width / 2;
      setPos({ top, left });
    };

    requestAnimationFrame(update);
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [visible, anchorRef]);

  if (!visible) return null;

  const bg = '#000000';
  return createPortal(
    <div
      ref={tooltipRef}
      style={{
        position: 'absolute',
        top: pos.top,
        left: pos.left,
        transform: 'translateX(-50%)',
        zIndex: 3000,
        pointerEvents: 'none'
      }}
    >
      <div
        style={{
          display: 'inline-block',
          pointerEvents: 'auto',
          background: bg,
          color: '#ffffff',
          borderRadius: 8,
          padding: '6px 10px',
          fontSize: 12,
          fontWeight: 500,
          boxShadow: '0 6px 18px rgba(0,0,0,0.36)',
          border: '1px solid rgba(255,255,255,0.04)',
          whiteSpace: 'nowrap',
        }}
      >
        {text}
        <div
          style={{
            position: 'absolute',
            top: -8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderBottom: `8px solid ${bg}`,
            filter: 'drop-shadow(0 -1px 0 rgba(0,0,0,0.06))'
          }}
        />
      </div>
    </div>,
    document.body
  );
};

const Header = ({
  leftSidebarVisible,
  rightSidebarVisible,
  toggleLeftSidebar,
  toggleRightSidebar,
  isMobile = false,
  isTablet = false
}) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { showRefreshToast } = useToast();
  const { searchQuery, updateSearch, clearSearch } = useSearch();

  const [isFavorite, setIsFavorite] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New Order Received", message: "Order #1234 has been placed by John Doe", time: "2 minutes ago", read: false, type: "order" },
    { id: 2, title: "System Update", message: "Your dashboard has been updated to version 2.1", time: "1 hour ago", read: false, type: "system" },
    { id: 3, title: "Payment Completed", message: "Payment of $299.99 has been processed successfully", time: "3 hours ago", read: true, type: "payment" },
    { id: 4, title: "New User Registration", message: "Jane Smith has registered as a new user", time: "5 hours ago", read: true, type: "user" },
    { id: 5, title: "Server Maintenance", message: "Scheduled maintenance will occur tonight at 2 AM", time: "1 day ago", read: false, type: "maintenance" }
  ]);

  const notificationRef = useRef(null);
  const bellButtonRef = useRef(null);
  const searchInputRef = useRef(null);

  const leftToggleRef = useRef(null);
  const starButtonRef = useRef(null);
  const themeButtonRef = useRef(null);
  const refreshButtonRef = useRef(null);
  const rightToggleRef = useRef(null);

  const [hoverTooltip, setHoverTooltip] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        bellButtonRef.current &&
        !bellButtonRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (showMobileSearch && searchInputRef.current) searchInputRef.current.focus();
  }, [showMobileSearch]);

  // Check for refresh toast flag on component mount
  useEffect(() => {
    const shouldShowToast = localStorage.getItem('showRefreshToast');
    if (shouldShowToast === 'true') {
      localStorage.removeItem('showRefreshToast');
      showRefreshToast();
    }
  }, [showRefreshToast]);

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        const searchInput = document.querySelector('input[placeholder*="Search"]');
        if (searchInput) {
          searchInput.focus();
        }
      }
      if (e.key === 'Escape') {
        clearSearch();
        setSearchValue('');
        setShowMobileSearch(false); // Also close mobile search on escape
        const searchInput = document.querySelector('input[placeholder*="Search"]');
        if (searchInput) {
          searchInput.blur();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [clearSearch]);


  const handleFavoriteToggle = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
  };

  // Smart sidebar toggle logic - when one opens, close the other on smaller screens
  const handleLeftSidebarToggle = () => {
    // Close mobile search if open
    setShowMobileSearch(false);
    
    if (!leftSidebarVisible && rightSidebarVisible && (isMobile || isTablet)) {
      // If left sidebar is being opened and right is open, close right first
      toggleRightSidebar();
      setTimeout(() => toggleLeftSidebar(), 150); // Small delay for smoother animation
    } else {
      toggleLeftSidebar();
    }
  };

  const handleRightSidebarToggle = () => {
    // Close mobile search if open
    setShowMobileSearch(false);
    
    if (!rightSidebarVisible && leftSidebarVisible && (isMobile || isTablet)) {
      // If right sidebar is being opened and left is open, close left first
      toggleLeftSidebar();
      setTimeout(() => toggleRightSidebar(), 150); // Small delay for smoother animation
    } else {
      toggleRightSidebar();
    }
  };

  const toggleNotifications = () => setShowNotifications(v => !v);
  const markAsRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllAsRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const deleteNotification = (id) => setNotifications(prev => prev.filter(n => n.id !== id));
  const clearAllNotifications = () => setNotifications([]);
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order': return '🛒';
      case 'system': return '⚙️';
      case 'payment': return '💳';
      case 'user': return '👤';
      case 'maintenance': return '🔧';
      default: return '🔔';
    }
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(v => !v);
    if (showMobileSearch) {
      setSearchValue('');
      clearSearch();
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateSearch(searchValue);
    setShowMobileSearch(false);
  };

  const onEnter = (key) => () => setHoverTooltip(key);
  const onLeave = () => setHoverTooltip(null);

  // Get header height for mobile search positioning
  const headerHeight = isMobile ? '64px' : '72px';

  return (
    <>
      <header
        className="border-b px-3 sm:px-4 lg:px-6 py-3 sm:py-4 transition-colors duration-200 relative"
        style={{
          backgroundColor: isDarkMode ? '#1C1C1C' : undefined,
          borderColor: isDarkMode ? 'rgba(255,255,255,0.04)' : undefined,
          color: isDarkMode ? '#FFFFFF' : undefined,
          zIndex: 30 // Lower than overlays
        }}
      >
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
              {/* Left Sidebar Toggle - Always visible */}
              <button
                onClick={handleLeftSidebarToggle}
                ref={leftToggleRef}
                onMouseEnter={(e) => {
                  onEnter('left')();
                  if (isDarkMode) {
                    e.currentTarget.style.backgroundColor = '#282828';
                  }
                }}
                onMouseLeave={(e) => {
                  onLeave();
                  if (isDarkMode) {
                    e.currentTarget.style.backgroundColor = '';
                  }
                }}
                className={`p-2 rounded-lg transition-all duration-200 relative ${leftSidebarVisible ? (isDarkMode ? 'text-white hover:text-gray-200' : 'text-gray-700 hover:text-gray-800') : (isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700')}`}
              >
                {isMobile ? <Menu className="w-5 h-5" /> : <Notebook className="w-5 h-5" />}
              </button>

              {/* Favorite Button - Hide on mobile to save space */}
              {!isMobile && (
                <button
                  onClick={handleFavoriteToggle}
                  ref={starButtonRef}
                  onMouseEnter={(e) => {
                    onEnter('star')();
                    if (isDarkMode && !isFavorite) {
                      e.currentTarget.style.backgroundColor = '#282828';
                    }
                  }}
                  onMouseLeave={(e) => {
                    onLeave();
                    if (isDarkMode && !isFavorite) {
                      e.currentTarget.style.backgroundColor = '';
                    }
                  }}
                  className={`p-2 rounded-lg transition-all duration-200 relative ${isFavorite ? 'text-yellow-500 hover:text-yellow-400' : (isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100')}`}
                >
                  <Star className={`w-5 h-5 transition-all duration-200 ${isFavorite ? 'fill-yellow-500' : 'fill-none'}`} />
                </button>
              )}
            </div>

            {/* Breadcrumb Section - Responsive Design */}
            <div className="flex items-center space-x-1 sm:space-x-2 min-w-0 overflow-hidden">
              {/* Hide on mobile and small tablet, show on larger screens */}
              <div className="hidden lg:flex items-center space-x-2 min-w-0">
                <span 
                  className="text-sm truncate"
                  style={{ color: isDarkMode ? '#cfcfcf' : '#6b7280' }}
                >
                  Dashboards
                </span>
                <span 
                  className="text-sm flex-shrink-0"
                  style={{ color: isDarkMode ? '#9CA3AF' : '#9CA3AF' }}
                >
                  /
                </span>
                <span 
                  className="text-sm font-semibold truncate"
                  style={{ color: isDarkMode ? '#FFFFFF' : '#111827' }}
                >
                  Default
                </span>
              </div>

              {/* Show condensed version on tablet */}
              <div className="hidden md:flex lg:hidden items-center space-x-1 min-w-0">
                <span 
                  className="text-sm font-semibold truncate"
                  style={{ color: isDarkMode ? '#FFFFFF' : '#111827' }}
                >
                  Default
                </span>
              </div>

              {/* Show minimal version on mobile */}
              <div className="flex md:hidden items-center min-w-0">
                <span 
                  className="text-sm font-semibold truncate"
                  style={{ color: isDarkMode ? '#FFFFFF' : '#111827' }}
                >
                  Dashboard
                </span>
              </div>
            </div>
          </div>

          {/* Right Section - Compact layout for mobile */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3 flex-shrink-0">
            {/* Desktop Search - Hide on mobile and tablet to save space */}
            {!isMobile && !isTablet && (
              <div className="relative hidden xl:block">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => updateSearch(e.target.value)}
                  className={`pl-9 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors w-48 xl:w-64`}
                  style={{
                    backgroundColor: isDarkMode ? '#333333' : '#f4f4f4',
                    borderColor: isDarkMode ? 'rgba(255,255,255,0.04)' : undefined,
                    color: isDarkMode ? '#525252' : '#dedede'
                  }}
                />
                <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-0.5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  <span className="text-xs font-medium">⌘</span>
                  <span className="text-xs">/</span>
                </div>
              </div>
            )}

            {/* Mobile/Tablet Search Button */}
            {(isMobile || isTablet) && (
              <button 
                onClick={toggleMobileSearch}
                onMouseEnter={(e) => {
                  if (isDarkMode && !showMobileSearch) {
                    e.currentTarget.style.backgroundColor = '#282828';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isDarkMode && !showMobileSearch) {
                    e.currentTarget.style.backgroundColor = '';
                  }
                }}
                className={`p-2 rounded-lg transition-all duration-200 ${showMobileSearch ? (isDarkMode ? 'text-blue-400 bg-gray-700' : 'text-blue-600 bg-blue-50') : (isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100')}`}
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              ref={themeButtonRef}
              onMouseEnter={(e) => {
                onEnter('theme')();
                if (isDarkMode) {
                  e.currentTarget.style.backgroundColor = '#282828';
                }
              }}
              onMouseLeave={(e) => {
                onLeave();
                if (isDarkMode) {
                  e.currentTarget.style.backgroundColor = '';
                }
              }}
              className={`p-2 rounded-lg transition-all duration-200 relative ${isDarkMode ? 'text-yellow-400 hover:text-yellow-300' : 'text-gray-500 hover:text-blue-500 hover:bg-gray-100'}`}
            >
              {isDarkMode ? (
                <SunMedium className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Refresh Button - Hide on mobile to save space */}
            {!isMobile && (
              <button
                onMouseEnter={(e) => {
                  if (isDarkMode) {
                    e.currentTarget.style.backgroundColor = '#282828';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isDarkMode) {
                    e.currentTarget.style.backgroundColor = '';
                  }
                }}
                className={`p-2 rounded-lg transition-all duration-200 relative ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
              >
                <History className="w-5 h-5 refresh-icon transition-transform duration-300" style={{ transformOrigin: 'center' }} />
              </button>
            )}

            {/* Notifications */}
            <div className="relative">
              <button
                ref={bellButtonRef}
                onClick={toggleNotifications}
                onMouseEnter={(e) => {
                  onEnter('bell')();
                  if (isDarkMode && !showNotifications) {
                    e.currentTarget.style.backgroundColor = '#282828';
                  }
                }}
                onMouseLeave={(e) => {
                  onLeave();
                  if (isDarkMode && !showNotifications) {
                    e.currentTarget.style.backgroundColor = '';
                  }
                }}
                className={`p-2 rounded-lg transition-all duration-200 relative ${showNotifications ? (isDarkMode ? 'text-blue-400 bg-gray-700' : 'text-blue-600 bg-blue-50') : (isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100')}`}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-medium text-[10px] sm:text-xs">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div
                  ref={notificationRef}
                  className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-xl shadow-2xl border overflow-hidden`}
                  style={{
                    backgroundColor: isDarkMode ? '#1C1C1C' : '#ffffff',
                    borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                    zIndex: 60, // Higher than mobile overlays
                    boxShadow: isDarkMode 
                      ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)' 
                      : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    maxHeight: '28rem'
                  }}
                >
                  {/* Header */}
                  <div 
                    className={`px-5 py-4 border-b`} 
                    style={{ 
                      borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                      background: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        <h3 style={{ fontWeight: 700, fontSize: 16, color: isDarkMode ? '#fff' : '#111827' }}>
                          Notifications
                        </h3>
                        {unreadCount > 0 && (
                          <span 
                            className="px-2 py-0.5 rounded-full text-xs font-semibold"
                            style={{
                              backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
                              color: isDarkMode ? '#60a5fa' : '#2563eb'
                            }}
                          >
                            {unreadCount}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {unreadCount > 0 && (
                          <button 
                            onClick={markAllAsRead} 
                            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105"
                            style={{ 
                              backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                              color: isDarkMode ? '#60a5fa' : '#2563eb'
                            }}
                          >
                            Mark all read
                          </button>
                        )}
                        <button 
                          onClick={() => setShowNotifications(false)} 
                          className={`p-1.5 rounded-lg transition-all duration-200 hover:scale-110`}
                          style={{ 
                            color: isDarkMode ? '#9ca3af' : '#6b7280',
                            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
                          }}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Notifications List */}
                  <div 
                    className="overflow-y-auto scrollbar-hide"
                    style={{ maxHeight: '20rem' }}
                  >
                    {notifications.length === 0 ? (
                      <div className={`p-12 text-center`} style={{ color: isDarkMode ? '#9CA3AF' : '#6b7280' }}>
                        <div 
                          className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
                          }}
                        >
                          <Bell className="w-8 h-8 opacity-50" />
                        </div>
                        <p className="font-medium text-sm">No notifications</p>
                        <p className="text-xs mt-1 opacity-75">You're all caught up!</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`px-5 py-4 border-b transition-all duration-200 relative group hover:shadow-sm`}
                          style={{ 
                            borderColor: isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)',
                            backgroundColor: !notification.read 
                              ? (isDarkMode ? '#272727' : 'rgba(59, 130, 246, 0.03)')
                              : 'transparent'
                          }}
                        >
                          <div className="flex items-start space-x-3">
                            {/* Icon Container */}
                            <div 
                              className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                              style={{
                                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'
                              }}
                            >
                              {getNotificationIcon(notification.type)}
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <p style={{ fontWeight: 600, fontSize: 14, color: isDarkMode ? '#fff' : '#111827' }}>
                                      {notification.title}
                                    </p>
                                    {!notification.read && (
                                      <div 
                                        className="w-2 h-2 rounded-full flex-shrink-0"
                                        style={{ backgroundColor: isDarkMode ? '#60a5fa' : '#2563eb' }}
                                      />
                                    )}
                                  </div>
                                  <p 
                                    style={{ 
                                      color: isDarkMode ? '#cfcfcf' : '#6b7280', 
                                      fontSize: 13,
                                      lineHeight: '1.5',
                                      marginBottom: 4
                                    }}
                                  >
                                    {notification.message}
                                  </p>
                                  <p 
                                    style={{ 
                                      color: isDarkMode ? '#9CA3AF' : '#9CA3AF', 
                                      fontSize: 11,
                                      fontWeight: 500
                                    }}
                                  >
                                    {notification.time}
                                  </p>
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                  {!notification.read && (
                                    <button 
                                      onClick={() => markAsRead(notification.id)} 
                                      className={`p-2 rounded-lg transition-all duration-200 hover:scale-110`}
                                      title="Mark as read"
                                      style={{ 
                                        color: isDarkMode ? '#34d399' : '#10b981',
                                        backgroundColor: isDarkMode ? 'rgba(52, 211, 153, 0.1)' : 'rgba(16, 185, 129, 0.1)'
                                      }}
                                    >
                                      <Check className="w-4 h-4" />
                                    </button>
                                  )}
                                  <button 
                                    onClick={() => deleteNotification(notification.id)} 
                                    className={`p-2 rounded-lg transition-all duration-200 hover:scale-110`}
                                    title="Delete notification"
                                    style={{ 
                                      color: isDarkMode ? '#fb7185' : '#dc2626',
                                      backgroundColor: isDarkMode ? 'rgba(251, 113, 133, 0.1)' : 'rgba(220, 38, 38, 0.1)'
                                    }}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Footer */}
                  {notifications.length > 0 && (
                    <div 
                      className={`px-5 py-3 border-t`} 
                      style={{ 
                        borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                        background: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'
                      }}
                    >
                      <button 
                        onClick={clearAllNotifications} 
                        className={`w-full text-center text-sm py-2.5 rounded-lg font-medium transition-all duration-200 hover:scale-[1.02]`}
                        style={{ 
                          color: isDarkMode ? '#fb7185' : '#dc2626',
                          backgroundColor: isDarkMode ? 'rgba(251, 113, 133, 0.1)' : 'rgba(220, 38, 38, 0.1)'
                        }}
                      >
                        Clear all notifications
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Sidebar Toggle - Always visible */}
            <button
              onClick={handleRightSidebarToggle}
              ref={rightToggleRef}
              onMouseEnter={(e) => {
                onEnter('right')();
                if (isDarkMode) {
                  e.currentTarget.style.backgroundColor = '#282828';
                }
              }}
              onMouseLeave={(e) => {
                onLeave();
                if (isDarkMode) {
                  e.currentTarget.style.backgroundColor = '';
                }
              }}
              className={`p-2 rounded-lg transition-all duration-200 relative ${rightSidebarVisible ? (isDarkMode ? 'text-white hover:text-gray-200' : 'text-gray-700 hover:text-gray-800') : (isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700')}`}
            >
              <Notebook className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay - FIXED positioning */}
      {showMobileSearch && (isMobile || isTablet) && (
        <div 
          className="fixed inset-x-0 border-b p-4" 
          style={{ 
            backgroundColor: isDarkMode ? '#1C1C1C' : '#ffffff', 
            borderColor: isDarkMode ? 'rgba(255,255,255,0.04)' : undefined,
            top: headerHeight, // Position below header
            zIndex: 50 // Higher than header, lower than notifications
          }}
        >
          <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search cards..."
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  updateSearch(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{
                  backgroundColor: isDarkMode ? '#333333' : undefined,
                  borderColor: isDarkMode ? 'rgba(255,255,255,0.04)' : undefined,
                  color: isDarkMode ? '#525252' : undefined
                }}
              />
            </div>
            <button type="button" onClick={toggleMobileSearch} className={`p-3 rounded-lg transition-colors`} style={{ color: isDarkMode ? '#cfcfcf' : '#6b7280' }}>
              <X className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}

      {/* Tooltips - Hidden on mobile */}
      {!isMobile && (
        <>
          <PortalTooltip anchorRef={leftToggleRef} visible={hoverTooltip === 'left'} text={`${leftSidebarVisible ? 'Hide' : 'Show'} left sidebar`} isDarkMode={isDarkMode} />
          <PortalTooltip anchorRef={starButtonRef} visible={hoverTooltip === 'star'} text={isFavorite ? 'Remove from favorites' : 'Add to favorites'} isDarkMode={isDarkMode} />
          <PortalTooltip anchorRef={themeButtonRef} visible={hoverTooltip === 'theme'} text={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`} isDarkMode={isDarkMode} />
          <PortalTooltip anchorRef={refreshButtonRef} visible={hoverTooltip === 'refresh'} text="Refresh Page" isDarkMode={isDarkMode} />
          <PortalTooltip anchorRef={bellButtonRef} visible={hoverTooltip === 'bell'} text="Notifications" isDarkMode={isDarkMode} />
          <PortalTooltip anchorRef={rightToggleRef} visible={hoverTooltip === 'right'} text={`${rightSidebarVisible ? 'Hide' : 'Show'} right sidebar`} isDarkMode={isDarkMode} />
        </>
      )}
    </>
  );
};

export default Header;