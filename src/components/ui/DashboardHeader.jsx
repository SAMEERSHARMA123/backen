import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const DashboardHeader = ({ user, onThemeToggle, isDarkMode = false }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { label: 'Dashboard', path: '/quiz-dashboard', icon: 'LayoutDashboard' },
    { label: 'My Results', path: '/quiz-results', icon: 'Trophy' },
    { label: 'Browse Quizzes', path: '/quiz-dashboard', icon: 'Search' },
    { label: 'Leaderboard', path: '/quiz-dashboard', icon: 'Medal' },
  ];

  const userMenuItems = [
    { label: 'Profile Settings', icon: 'User', action: () => console.log('Profile') },
    { label: 'Preferences', icon: 'Settings', action: () => console.log('Preferences') },
    { label: 'Help & Support', icon: 'HelpCircle', action: () => console.log('Help') },
    { label: 'Sign Out', icon: 'LogOut', action: () => navigate('/user-login') },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef?.current && !userMenuRef?.current?.contains(event?.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <header className="sticky top-0 z-100 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Brain" size={20} color="white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                QuizMaster Pro
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Button
                key={item?.path}
                variant={isActivePath(item?.path) ? "default" : "ghost"}
                size="sm"
                onClick={() => navigate(item?.path)}
                iconName={item?.icon}
                iconPosition="left"
                iconSize={16}
                className="text-sm font-medium"
              >
                {item?.label}
              </Button>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={16} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
                <input
                  type="text"
                  placeholder="Search quizzes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-150"
                />
              </div>
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onThemeToggle}
              iconName={isDarkMode ? "Sun" : "Moon"}
              className="hover-glow"
            />

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              iconName="Bell"
              className="hover-glow relative"
            >
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></span>
            </Button>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 hover-glow"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <span className="hidden sm:block text-sm font-medium">
                  {user?.name || 'User'}
                </span>
                <Icon name="ChevronDown" size={16} />
              </Button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 glass-strong rounded-lg shadow-elevation-3 animate-scale-in">
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-border/50">
                      <p className="text-sm font-medium">{user?.name || 'User Name'}</p>
                      <p className="text-xs text-muted-foreground">{user?.email || 'user@example.com'}</p>
                    </div>
                    {userMenuItems?.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          item?.action();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-muted/50 transition-colors duration-150"
                      >
                        <Icon name={item?.icon} size={16} />
                        <span>{item?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              iconName="Menu"
              className="md:hidden"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 animate-slide-up">
            <div className="py-4 space-y-2">
              {/* Mobile Search */}
              <div className="px-2 pb-4">
                <form onSubmit={handleSearch} className="relative">
                  <Icon 
                    name="Search" 
                    size={16} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                  />
                  <input
                    type="text"
                    placeholder="Search quizzes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    className="w-full pl-10 pr-4 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </form>
              </div>

              {/* Mobile Navigation */}
              {navigationItems?.map((item) => (
                <Button
                  key={item?.path}
                  variant={isActivePath(item?.path) ? "default" : "ghost"}
                  fullWidth
                  onClick={() => {
                    navigate(item?.path);
                    setIsMobileMenuOpen(false);
                  }}
                  iconName={item?.icon}
                  iconPosition="left"
                  className="justify-start"
                >
                  {item?.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;