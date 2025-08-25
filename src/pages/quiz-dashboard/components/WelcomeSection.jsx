import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const WelcomeSection = ({ user, stats }) => {
  const [animatedStats, setAnimatedStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    totalPoints: 0
  });

  useEffect(() => {
    const animateCounter = (target, key, duration = 2000) => {
      const start = 0;
      const increment = target / (duration / 16);
      let current = start;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setAnimatedStats(prev => ({
          ...prev,
          [key]: Math.floor(current)
        }));
      }, 16);
    };

    if (stats) {
      animateCounter(stats?.totalQuizzes || 0, 'totalQuizzes', 1500);
      animateCounter(stats?.averageScore || 0, 'averageScore', 2000);
      animateCounter(stats?.totalPoints || 0, 'totalPoints', 2500);
    }
  }, [stats]);

  const achievements = [
    { 
      id: 1, 
      title: "Quiz Master", 
      description: "Complete 10 quizzes", 
      icon: "Trophy", 
      earned: stats?.totalQuizzes >= 10,
      progress: Math.min((stats?.totalQuizzes || 0) / 10 * 100, 100)
    },
    { 
      id: 2, 
      title: "High Scorer", 
      description: "Average 80% or higher", 
      icon: "Star", 
      earned: stats?.averageScore >= 80,
      progress: Math.min((stats?.averageScore || 0) / 80 * 100, 100)
    },
    { 
      id: 3, 
      title: "Streak Master", 
      description: "5 quizzes in a row", 
      icon: "Zap", 
      earned: stats?.currentStreak >= 5,
      progress: Math.min((stats?.currentStreak || 0) / 5 * 100, 100)
    }
  ];

  const getGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-strong rounded-2xl p-6 mb-8"
    >
      {/* Welcome Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">
            {getGreeting()}, {user?.name || 'Quiz Master'}! 👋
          </h1>
          <p className="text-muted-foreground">
            Ready to challenge your knowledge today?
          </p>
        </div>
        <div className="hidden md:block">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <Icon name="Brain" size={32} color="white" />
          </div>
        </div>
      </div>
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-background/50 rounded-xl p-4 border border-border/50"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Icon name="BookOpen" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">
                {animatedStats?.totalQuizzes}
              </p>
              <p className="text-sm text-muted-foreground">Quizzes Completed</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-background/50 rounded-xl p-4 border border-border/50"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
              <Icon name="Target" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-success">
                {animatedStats?.averageScore}%
              </p>
              <p className="text-sm text-muted-foreground">Average Score</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-background/50 rounded-xl p-4 border border-border/50"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
              <Icon name="Award" size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">
                {animatedStats?.totalPoints}
              </p>
              <p className="text-sm text-muted-foreground">Total Points</p>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Achievements */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <Icon name="Medal" size={20} />
          <span>Achievements</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements?.map((achievement) => (
            <motion.div
              key={achievement?.id}
              whileHover={{ scale: 1.02 }}
              className={`relative p-4 rounded-xl border transition-all duration-300 ${
                achievement?.earned
                  ? 'bg-success/10 border-success/30 shadow-glow'
                  : 'bg-background/30 border-border/50'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  achievement?.earned
                    ? 'bg-success text-white' :'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={achievement?.icon} size={16} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{achievement?.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {achievement?.description}
                  </p>
                </div>
                {achievement?.earned && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-success"
                  >
                    <Icon name="CheckCircle" size={16} />
                  </motion.div>
                )}
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-1.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${achievement?.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-1.5 rounded-full ${
                    achievement?.earned ? 'bg-success' : 'bg-primary'
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeSection;