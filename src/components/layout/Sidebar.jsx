import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeProvider';
import {
  BarChart3, FolderOpen, User, CreditCard, Globe, FileText, MessageSquare, ChevronDown, ChevronRight, ShoppingBag, GraduationCap, Building, ChartPie, FolderClosed, BookOpen, ContactRound, Users, MessagesSquare, X, Megaphone, Users2
} from 'lucide-react';

const FavoriteItem = ({ item, darkMode }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getBackground = () => {
    if (item.isActive && darkMode) return '#333333';
    if (isHovered) return darkMode ? '#333333' : '#f3f4f6';
    return 'transparent';
  };

  return (
    <button 
      onClick={item.onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 10px',
        borderRadius: 8,
        background: getBackground(),
        color: darkMode ? '#ffffff' : '#374151',
        border: 'none',
        textAlign: 'left',
        position: 'relative'
      }}
    >
      {item.isActive && (
        <span style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 4, height: 20, borderRadius: '0 4px 4px 0', background: darkMode ? '#C6C7F8' : '#111827' }} />
      )}
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: darkMode ? '#9ca3af' : '#d1d5db' }} />
      <span style={{ color: darkMode ? '#ffffff' : undefined }}>{item.label}</span>
    </button>
  );
};

const SubMenuItem = ({ item, darkMode }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getBackground = () => {
    if (item.isActive && darkMode) return '#333333';
    if (isHovered) return darkMode ? '#333333' : '#f3f4f6';
    return 'transparent';
  };

  return (
    <button 
      onClick={item.onClick} 
      disabled={item.disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: 8,
        borderRadius: 8,
        textAlign: 'left',
        background: getBackground(),
        color: item.disabled ? (darkMode ? '#6b7280' : '#9ca3af') : (darkMode ? '#ffffff' : '#374151'),
        position: 'relative'
      }}
    >
      {item.isActive && (
        <span style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 4, height: 20, borderRadius: '0 4px 4px 0', background: darkMode ? '#C6C7F8' : '#111827' }} />
      )}
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'transparent' }} />
      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: item.disabled ? undefined : (darkMode ? '#ffffff' : undefined) }}>{item.label}</span>
    </button>
  );
};

const CollapsibleMenuItem = ({
  icon: Icon,
  label,
  subItems = [],
  isExpanded,
  onToggle,
  hasIcon = true,
  onClick,
  darkMode,
  isMobile,
  isActive
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (subItems.length > 0) {
      onToggle();
    } else if (onClick) {
      onClick();
    }
  };

  const getBackground = () => {
    if (isActive && darkMode) return '#333333';
    if (isHovered) return darkMode ? '#333333' : '#f3f4f6';
    return 'transparent';
  };

  return (
    <div>
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`w-full flex items-center space-x-3 px-2 py-2 rounded-lg transition-colors text-left relative`}
        aria-expanded={!!isExpanded}
        style={{ 
          background: getBackground()
        }}
      >
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          {isActive ? (
            <span aria-hidden style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 4, height: 20, borderRadius: '0 4px 4px 0', background: darkMode ? '#C6C7F8' : '#111827' }} />
          ) : null}

          {/* Arrow moved to the left side - hide when selected */}
          <div className="flex-shrink-0" style={{ width: isMobile ? 12 : 16 }}>
            {subItems.length > 0 && !isActive ? (
              isExpanded ? (
                <ChevronDown 
                  className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} 
                  style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}
                />
              ) : (
                <ChevronRight 
                  className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} 
                  style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}
                />
              )
            ) : null}
          </div>

          {hasIcon && Icon && (
            <Icon 
              className={`flex-shrink-0 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} 
              aria-hidden 
              style={{ color: darkMode ? '#ffffff' : undefined }}
            />
          )}

          <span className={`truncate ${isMobile ? 'text-sm' : 'text-base'}`} style={{ 
            color: darkMode ? '#ffffff' : '#374151'
          }}>
            {label}
          </span>
        </div>
      </button>

      {subItems.length > 0 && (
        <div style={{ overflow: 'hidden', transition: 'all 300ms ease', maxHeight: isExpanded ? 240 : 0, opacity: isExpanded ? 1 : 0 }}>
          <div style={{ marginLeft: isMobile ? 24 : 32 }}>
            {subItems.map(item => (
              <SubMenuItem
                key={item.id}
                item={item}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ isVisible, isMobile = false, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useContext(ThemeContext);

  const [expandedSections, setExpandedSections] = useState({
    userProfile: false,
    default: false,
    ecommerce: false,
    projects: false,
    onlineCourses: false,
    account: false,
    corporate: false,
    blog: false,
    social: false
  });

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile && onClose) onClose();
  };

  const isActive = (path) => location.pathname === path;

  // Updated toggle function to close other sections when one is opened
  const toggleSection = (name) => {
    setExpandedSections(prev => {
      const newState = {};
      // Close all sections first
      Object.keys(prev).forEach(key => {
        newState[key] = false;
      });
      // Then open the clicked one if it was closed
      newState[name] = !prev[name];
      return newState;
    });
  };

  // Updated User Profile sub-items with all 5 components
  const userProfileSubItems = [
    { id: 'overview', label: 'Overview', onClick: () => handleNavigation('/profile/overview'), isActive: isActive('/profile/overview'), disabled: false },
    { id: 'projects', label: 'Projects', onClick: () => handleNavigation('/profile/projects'), isActive: isActive('/profile/projects'), disabled: false },
    { id: 'campaigns', label: 'Campaigns', onClick: () => handleNavigation('/profile/campaigns'), isActive: isActive('/profile/campaigns'), disabled: false },
    { id: 'documents', label: 'Documents', onClick: () => handleNavigation('/profile/documents'), isActive: isActive('/profile/documents'), disabled: false },
    { id: 'followers', label: 'Followers', onClick: () => handleNavigation('/profile/followers'), isActive: isActive('/profile/followers'), disabled: false }
  ];

  // Added dropdown sub-items for dashboard sections
  const defaultSubItems = [
    { id: 'no-content', label: 'No content available', onClick: () => {}, isActive: false, disabled: true }
  ];

  const ecommerceSubItems = [
    { id: 'no-content', label: 'No content available', onClick: () => {}, isActive: false, disabled: true }
  ];

  const projectsSubItems = [
    { id: 'no-content', label: 'No content available', onClick: () => {}, isActive: false, disabled: true }
  ];

  const onlineCoursesSubItems = [
    { id: 'no-content', label: 'No content available', onClick: () => {}, isActive: false, disabled: true }
  ];

  const accountSubItems = [
    { id: 'no-content', label: 'No content available', onClick: () => {}, isActive: false, disabled: true }
  ];

  const corporateSubItems = [
    { id: 'no-content', label: 'No content available', onClick: () => {}, isActive: false, disabled: true }
  ];

  const blogSubItems = [
    { id: 'no-content', label: 'No content available', onClick: () => {}, isActive: false, disabled: true }
  ];

  const socialSubItems = [
    { id: 'no-content', label: 'No content available', onClick: () => {}, isActive: false, disabled: true }
  ];

  const favoritesList = [
    { id: 'overview', label: 'Overview', onClick: () => handleNavigation('/overview'), isActive: isActive('/overview') },
    { id: 'projects', label: 'Projects', onClick: () => handleNavigation('/projects'), isActive: isActive('/projects') }
  ];

  const containerStyle = {
    backgroundColor: darkMode ? '#1C1C1C' : '#ffffff',
    borderRight: `1px solid ${darkMode ? 'rgba(255,255,255,0.04)' : '#e5e7eb'}`,
    width: isVisible ? 256 : 0,
    transition: 'all 300ms ease',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative'
  };

  return (
    <aside style={containerStyle}>
      <div style={{ width: 256, display: isVisible ? 'block' : 'none', height: '100%', flexDirection: 'column' }}>
        <div style={{ padding: isMobile ? 16 : 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <img 
                src="/logo.png" 
                alt="ByeWind Logo" 
                style={{ 
                  width: isMobile ? 24 : 32, 
                  height: isMobile ? 24 : 32, 
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
              <span style={{ fontWeight: 400, color: darkMode ? '#fff' : '#111827' }}>ByeWind</span>
            </div>

            {isMobile && onClose && (
              <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: darkMode ? '#cfcfcf' : '#6b7280' }}>
                <X />
              </button>
            )}
          </div>
        </div>

        <nav style={{ padding: isMobile ? 16 : 24, display: 'flex', flexDirection: 'column', gap: 12, height: 'calc(100% - 96px)', overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className={isMobile ? 'text-sm' : 'text-base'} style={{ color: darkMode ? '#9ca3af' : '#374151' }}>Favorites</div>
            <button onClick={() => handleNavigation('/recently')} className={isMobile ? 'text-sm' : 'text-base'} style={{ 
              color: darkMode ? '#9ca3af' : '#374151', 
              background: 'transparent', 
              border: 'none', 
              cursor: 'pointer',
              fontWeight: 'normal'
            }}>
              Recently
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {favoritesList.map(item => (
              <FavoriteItem
                key={item.id}
                item={item}
                darkMode={darkMode}
              />
            ))}
          </div>

          <div className={isMobile ? 'text-sm' : 'text-base'} style={{ marginTop: 12, color: darkMode ? '#9ca3af' : '#374151' }}>Dashboards</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <CollapsibleMenuItem 
              label="Default" 
              icon={ChartPie} 
              subItems={defaultSubItems} 
              isExpanded={expandedSections.default} 
              onToggle={() => toggleSection('default')} 
              hasIcon 
              darkMode={darkMode} 
              isMobile={isMobile} 
              isActive={isActive('/')} 
            />
            <CollapsibleMenuItem 
              label="eCommerce" 
              icon={ShoppingBag} 
              subItems={ecommerceSubItems} 
              isExpanded={expandedSections.ecommerce} 
              onToggle={() => toggleSection('ecommerce')} 
              hasIcon 
              darkMode={darkMode} 
              isMobile={isMobile} 
              isActive={isActive('/orders')} 
            />
            <CollapsibleMenuItem 
              label="Projects" 
              icon={FolderClosed} 
              subItems={projectsSubItems} 
              isExpanded={expandedSections.projects} 
              onToggle={() => toggleSection('projects')} 
              hasIcon 
              darkMode={darkMode} 
              isMobile={isMobile} 
              isActive={false} 
            />
            <CollapsibleMenuItem 
              label="Online Courses" 
              icon={BookOpen} 
              subItems={onlineCoursesSubItems} 
              isExpanded={expandedSections.onlineCourses} 
              onToggle={() => toggleSection('onlineCourses')} 
              hasIcon 
              darkMode={darkMode} 
              isMobile={isMobile} 
              isActive={false} 
            />
          </div>

          <div className={isMobile ? 'text-sm' : 'text-base'} style={{ marginTop: 20, color: darkMode ? '#9ca3af' : '#374151' }}>Pages</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <CollapsibleMenuItem 
              icon={ContactRound} 
              label="User Profile" 
              subItems={userProfileSubItems} 
              isExpanded={expandedSections.userProfile} 
              onToggle={() => toggleSection('userProfile')} 
              darkMode={darkMode} 
              isMobile={isMobile} 
              isActive={false} 
            />
            <CollapsibleMenuItem 
              icon={CreditCard} 
              label="Account" 
              subItems={accountSubItems} 
              isExpanded={expandedSections.account} 
              onToggle={() => toggleSection('account')} 
              darkMode={darkMode} 
              isMobile={isMobile} 
              isActive={false} 
            />
            <CollapsibleMenuItem 
              icon={Users} 
              label="Corporate" 
              subItems={corporateSubItems} 
              isExpanded={expandedSections.corporate} 
              onToggle={() => toggleSection('corporate')} 
              darkMode={darkMode} 
              isMobile={isMobile} 
              isActive={false} 
            />
            <CollapsibleMenuItem 
              icon={FileText} 
              label="Blog" 
              subItems={blogSubItems} 
              isExpanded={expandedSections.blog} 
              onToggle={() => toggleSection('blog')} 
              darkMode={darkMode} 
              isMobile={isMobile} 
              isActive={false} 
            />
            <CollapsibleMenuItem 
              icon={MessagesSquare} 
              label="Social" 
              subItems={socialSubItems} 
              isExpanded={expandedSections.social} 
              onToggle={() => toggleSection('social')} 
              darkMode={darkMode} 
              isMobile={isMobile} 
              isActive={false} 
            />
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;