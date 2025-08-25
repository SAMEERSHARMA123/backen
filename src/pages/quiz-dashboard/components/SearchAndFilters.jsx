import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchAndFilters = ({ onSearch, onFilterChange, totalQuizzes = 0 }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    category: 'all',
    difficulty: 'all',
    status: 'all'
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const categories = [
    { value: 'all', label: 'All Categories', icon: 'Grid3x3' },
    { value: 'Science', label: 'Science', icon: 'Atom' },
    { value: 'Technology', label: 'Technology', icon: 'Cpu' },
    { value: 'History', label: 'History', icon: 'Clock' },
    { value: 'Geography', label: 'Geography', icon: 'Globe' },
    { value: 'Mathematics', label: 'Mathematics', icon: 'Calculator' },
    { value: 'Literature', label: 'Literature', icon: 'BookOpen' },
    { value: 'Sports', label: 'Sports', icon: 'Trophy' },
    { value: 'Entertainment', label: 'Entertainment', icon: 'Film' }
  ];

  const difficulties = [
    { value: 'all', label: 'All Levels', color: 'text-muted-foreground' },
    { value: 'easy', label: 'Easy', color: 'text-success' },
    { value: 'medium', label: 'Medium', color: 'text-warning' },
    { value: 'hard', label: 'Hard', color: 'text-error' }
  ];

  const statuses = [
    { value: 'all', label: 'All Quizzes', icon: 'List' },
    { value: 'completed', label: 'Completed', icon: 'CheckCircle' },
    { value: 'not-completed', label: 'Not Started', icon: 'Circle' }
  ];

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      onSearch?.(searchQuery);
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery, onSearch]);

  useEffect(() => {
    onFilterChange?.(activeFilters);
  }, [activeFilters, onFilterChange]);

  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearAllFilters = () => {
    setActiveFilters({
      category: 'all',
      difficulty: 'all',
      status: 'all'
    });
    setSearchQuery('');
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters)?.filter(value => value !== 'all')?.length;
  };

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-6"
      >
        <div className={`relative transition-all duration-300 ${
          isFocused ? 'transform scale-[1.02]' : ''
        }`}>
          <Icon 
            name="Search" 
            size={20} 
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
              isFocused ? 'text-primary' : 'text-muted-foreground'
            }`}
          />
          <input
            type="text"
            placeholder="Search quizzes by title, category, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`w-full pl-12 pr-4 py-4 glass-strong rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
              isFocused ? 'shadow-elevation-2' : ''
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>
      </motion.div>
      {/* Filter Toggle and Results Count */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            iconName="Filter"
            iconPosition="left"
            className="relative"
          >
            Filters
            {getActiveFilterCount() > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                {getActiveFilterCount()}
              </span>
            )}
          </Button>
          
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear All
            </Button>
          )}
        </div>

        <div className="text-sm text-muted-foreground">
          {totalQuizzes} quiz{totalQuizzes !== 1 ? 'es' : ''} found
        </div>
      </div>
      {/* Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass rounded-xl p-6 mb-6 overflow-hidden"
          >
            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-3 flex items-center space-x-2">
                <Icon name="Grid3x3" size={16} />
                <span>Category</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories?.map((category) => (
                  <Button
                    key={category?.value}
                    variant={activeFilters?.category === category?.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange('category', category?.value)}
                    iconName={category?.icon}
                    iconPosition="left"
                    className="text-xs"
                  >
                    {category?.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-3 flex items-center space-x-2">
                <Icon name="BarChart3" size={16} />
                <span>Difficulty</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {difficulties?.map((difficulty) => (
                  <Button
                    key={difficulty?.value}
                    variant={activeFilters?.difficulty === difficulty?.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange('difficulty', difficulty?.value)}
                    className={`text-xs ${difficulty?.color}`}
                  >
                    {difficulty?.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center space-x-2">
                <Icon name="CheckSquare" size={16} />
                <span>Status</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {statuses?.map((status) => (
                  <Button
                    key={status?.value}
                    variant={activeFilters?.status === status?.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange('status', status?.value)}
                    iconName={status?.icon}
                    iconPosition="left"
                    className="text-xs"
                  >
                    {status?.label}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchAndFilters;