import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivity = ({ activities = [] }) => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const mockActivities = [
    {
      id: 1,
      type: 'quiz_completed',
      quizTitle: 'JavaScript Fundamentals',
      score: 85,
      totalQuestions: 20,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      category: 'Technology',
      difficulty: 'medium'
    },
    {
      id: 2,
      type: 'quiz_completed',
      quizTitle: 'World History Quiz',
      score: 92,
      totalQuestions: 15,
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      category: 'History',
      difficulty: 'hard'
    },
    {
      id: 3,
      type: 'achievement_earned',
      title: 'Quiz Master',
      description: 'Completed 10 quizzes',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      icon: 'Trophy'
    },
    {
      id: 4,
      type: 'quiz_completed',
      quizTitle: 'Basic Mathematics',
      score: 78,
      totalQuestions: 25,
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      category: 'Mathematics',
      difficulty: 'easy'
    },
    {
      id: 5,
      type: 'quiz_completed',
      quizTitle: 'Science Trivia',
      score: 88,
      totalQuestions: 18,
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      category: 'Science',
      difficulty: 'medium'
    }
  ];

  const displayActivities = activities?.length > 0 ? activities : mockActivities;
  const visibleActivities = showAll ? displayActivities : displayActivities?.slice(0, 3);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-success bg-success/20';
      case 'medium': return 'text-warning bg-warning/20';
      case 'hard': return 'text-error bg-error/20';
      default: return 'text-muted-foreground bg-muted/20';
    }
  };

  const handleViewQuizResults = (activity) => {
    navigate('/quiz-results', { 
      state: { 
        quizId: activity?.id,
        fromActivity: true 
      } 
    });
  };

  const renderActivityItem = (activity, index) => {
    if (activity?.type === 'quiz_completed') {
      return (
        <motion.div
          key={activity?.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="glass rounded-xl p-4 hover-glow transition-all duration-300 cursor-pointer group"
          onClick={() => handleViewQuizResults(activity)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <Icon name="BookOpen" size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium group-hover:text-primary transition-colors duration-300">
                  {activity?.quizTitle}
                </h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-muted-foreground">
                    {activity?.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(activity?.difficulty)}`}>
                    {activity?.difficulty}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`text-lg font-bold ${getScoreColor(activity?.score)}`}>
                {activity?.score}%
              </div>
              <div className="text-xs text-muted-foreground">
                {activity?.score}/{activity?.totalQuestions * (activity?.score/100)} correct
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {formatTimeAgo(activity?.timestamp)}
              </div>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="mt-3">
            <div className="w-full bg-muted rounded-full h-1.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${activity?.score}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className={`h-1.5 rounded-full ${
                  activity?.score >= 90 ? 'bg-success' :
                  activity?.score >= 70 ? 'bg-warning' : 'bg-error'
                }`}
              />
            </div>
          </div>
        </motion.div>
      );
    }

    if (activity?.type === 'achievement_earned') {
      return (
        <motion.div
          key={activity?.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="glass rounded-xl p-4 bg-success/5 border border-success/20 hover-glow transition-all duration-300"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
              <Icon name={activity?.icon} size={20} className="text-success" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-success">
                Achievement Unlocked!
              </h4>
              <p className="text-sm font-medium">{activity?.title}</p>
              <p className="text-xs text-muted-foreground">
                {activity?.description}
              </p>
            </div>
            <div className="text-xs text-muted-foreground">
              {formatTimeAgo(activity?.timestamp)}
            </div>
          </div>
        </motion.div>
      );
    }

    return null;
  };

  if (displayActivities?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-8 text-center"
      >
        <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Activity" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">No Recent Activity</h3>
        <p className="text-muted-foreground mb-4">
          Start taking quizzes to see your activity here
        </p>
        <Button
          variant="default"
          onClick={() => navigate('/quiz-dashboard')}
          iconName="Play"
          iconPosition="left"
        >
          Take Your First Quiz
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <Icon name="Activity" size={20} />
          <span>Recent Activity</span>
        </h2>
        
        {displayActivities?.length > 3 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            iconName={showAll ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showAll ? 'Show Less' : 'Show All'}
          </Button>
        )}
      </div>
      <div className="space-y-4">
        <AnimatePresence>
          {visibleActivities?.map((activity, index) => renderActivityItem(activity, index))}
        </AnimatePresence>
      </div>
      {!showAll && displayActivities?.length > 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-4"
        >
          <Button
            variant="outline"
            onClick={() => setShowAll(true)}
            iconName="Plus"
            iconPosition="left"
          >
            View {displayActivities?.length - 3} More Activities
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RecentActivity;