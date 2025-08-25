import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../components/ui/DashboardHeader';
import WelcomeSection from './components/WelcomeSection';

import QuickActions from './components/QuickActions';
import QuizCard from './components/QuizCard';
import RecentActivity from './components/RecentActivity';
import StatsSidebar from './components/StatsSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { quizAPI } from '../../utils/api';

const QuizDashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 1280);
  const navigate = useNavigate();

  // Mock user data
  const user = {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  };

  // Mock user statistics
  const userStats = {
    totalQuizzes: 24,
    averageScore: 87,
    totalPoints: 2450,
    currentStreak: 7,
    completedToday: 2,
    weeklyGoal: 10,
    weeklyProgress: 6
  };

  // Remove dummy data - all quizzes come from API now

  // No more filtering - user directly starts quiz from API

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth >= 1280);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement?.classList?.toggle('dark');
  };

  const handleRandomQuiz = () => {
    // Direct navigation - quiz will fetch random questions from API
    navigate('/quiz-gameplay', { state: { randomQuiz: true } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <DashboardHeader
        user={user}
        onThemeToggle={handleThemeToggle}
        isDarkMode={isDarkMode}
      />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Main Content Area */}
          <div className="flex-1">
            {/* Welcome Section */}
            <WelcomeSection user={user} stats={userStats} />

            {/* Quick Actions */}
            <QuickActions onRandomQuiz={handleRandomQuiz} />

            {/* Start Quiz Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center space-x-2">
                  <Icon name="BookOpen" size={20} />
                  <span>Start Your Quiz</span>
                </h2>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSidebar(!showSidebar)}
                    iconName={showSidebar ? "PanelRightClose" : "PanelRightOpen"}
                    className="xl:hidden"
                  >
                    {showSidebar ? 'Hide Stats' : 'Show Stats'}
                  </Button>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl p-12 text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Brain" size={40} color="white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Ready to Test Your Knowledge?</h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Start a quiz with random questions from our database. Each quiz contains 10 questions 
                  from various categories and difficulty levels.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button
                    variant="default"
                    size="lg"
                    onClick={handleRandomQuiz}
                    iconName="Play"
                    iconPosition="left"
                    className="hover-glow"
                  >
                    Start Random Quiz
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => navigate('/quiz-results')}
                    iconName="BarChart"
                    iconPosition="left"
                  >
                    View Results
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <RecentActivity />
          </div>

          {/* Sidebar */}
          {showSidebar && (
            <StatsSidebar stats={userStats} isVisible={showSidebar} />
          )}
        </div>
      </div>
      {/* Mobile Bottom Navigation Spacer */}
      <div className="h-20 md:hidden" />
    </div>
  );
};

export default QuizDashboard;