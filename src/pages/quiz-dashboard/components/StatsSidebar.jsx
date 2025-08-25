import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const StatsSidebar = ({ stats, isVisible = true }) => {
  const [animatedStats, setAnimatedStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    totalPoints: 0,
    currentStreak: 0
  });

  useEffect(() => {
    if (stats && isVisible) {
      const animateValue = (target, key, duration = 1500) => {
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

      animateValue(stats?.totalQuizzes || 0, 'totalQuizzes');
      animateValue(stats?.averageScore || 0, 'averageScore');
      animateValue(stats?.totalPoints || 0, 'totalPoints');
      animateValue(stats?.currentStreak || 0, 'currentStreak');
    }
  }, [stats, isVisible]);

  // Mock data for charts
  const performanceData = [
    { name: 'Excellent (90-100%)', value: 35, color: '#10B981' },
    { name: 'Good (70-89%)', value: 45, color: '#F59E0B' },
    { name: 'Average (50-69%)', value: 15, color: '#EF4444' },
    { name: 'Below Average (<50%)', value: 5, color: '#6B7280' }
  ];

  const weeklyActivity = [
    { day: 'Mon', quizzes: 3 },
    { day: 'Tue', quizzes: 2 },
    { day: 'Wed', quizzes: 5 },
    { day: 'Thu', quizzes: 1 },
    { day: 'Fri', quizzes: 4 },
    { day: 'Sat', quizzes: 2 },
    { day: 'Sun', quizzes: 3 }
  ];

  const categoryStats = [
    { category: 'Technology', completed: 12, icon: 'Cpu' },
    { category: 'Science', completed: 8, icon: 'Atom' },
    { category: 'History', completed: 6, icon: 'Clock' },
    { category: 'Mathematics', completed: 5, icon: 'Calculator' },
    { category: 'Literature', completed: 4, icon: 'BookOpen' }
  ];

  const achievements = [
    { 
      title: 'First Quiz', 
      description: 'Complete your first quiz', 
      earned: true, 
      icon: 'Play',
      earnedDate: '2 weeks ago'
    },
    { 
      title: 'Perfect Score', 
      description: 'Score 100% on any quiz', 
      earned: true, 
      icon: 'Target',
      earnedDate: '1 week ago'
    },
    { 
      title: 'Speed Demon', 
      description: 'Complete a quiz in under 5 minutes', 
      earned: false, 
      icon: 'Zap',
      progress: 75
    },
    { 
      title: 'Knowledge Seeker', 
      description: 'Complete 50 quizzes', 
      earned: false, 
      icon: 'BookOpen',
      progress: 40
    }
  ];

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="w-80 space-y-6"
    >
      {/* Overall Stats */}
      <div className="glass-strong rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <Icon name="BarChart3" size={20} />
          <span>Your Statistics</span>
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Quizzes</span>
            <span className="text-xl font-bold text-primary">
              {animatedStats?.totalQuizzes}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Average Score</span>
            <span className="text-xl font-bold text-success">
              {animatedStats?.averageScore}%
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Points</span>
            <span className="text-xl font-bold text-accent">
              {animatedStats?.totalPoints?.toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Current Streak</span>
            <div className="flex items-center space-x-1">
              <Icon name="Flame" size={16} className="text-warning" />
              <span className="text-xl font-bold text-warning">
                {animatedStats?.currentStreak}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Performance Chart */}
      <div className="glass-strong rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <Icon name="PieChart" size={20} />
          <span>Performance Breakdown</span>
        </h3>
        
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={performanceData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {performanceData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Percentage']}
                labelStyle={{ color: 'var(--color-foreground)' }}
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="space-y-2 mt-4">
          {performanceData?.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item?.color }}
              />
              <span className="text-muted-foreground flex-1">{item?.name}</span>
              <span className="font-medium">{item?.value}%</span>
            </div>
          ))}
        </div>
      </div>
      {/* Weekly Activity */}
      <div className="glass-strong rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <Icon name="Calendar" size={20} />
          <span>Weekly Activity</span>
        </h3>
        
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyActivity}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
              />
              <YAxis hide />
              <Tooltip 
                formatter={(value) => [`${value}`, 'Quizzes']}
                labelStyle={{ color: 'var(--color-foreground)' }}
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="quizzes" 
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Category Progress */}
      <div className="glass-strong rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <Icon name="Grid3x3" size={20} />
          <span>Category Progress</span>
        </h3>
        
        <div className="space-y-3">
          {categoryStats?.map((category, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <Icon name={category?.icon} size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{category?.category}</span>
                  <span className="text-xs text-muted-foreground">
                    {category?.completed} completed
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(category?.completed * 8, 100)}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="bg-primary h-1.5 rounded-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Achievements */}
      <div className="glass-strong rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <Icon name="Award" size={20} />
          <span>Achievements</span>
        </h3>
        
        <div className="space-y-3">
          {achievements?.map((achievement, index) => (
            <div 
              key={index} 
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                achievement?.earned 
                  ? 'bg-success/10 border border-success/20' :'bg-muted/20 border border-border/50'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                achievement?.earned 
                  ? 'bg-success text-white' :'bg-muted text-muted-foreground'
              }`}>
                <Icon name={achievement?.icon} size={16} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">{achievement?.title}</h4>
                <p className="text-xs text-muted-foreground">
                  {achievement?.description}
                </p>
                {achievement?.earned && achievement?.earnedDate && (
                  <p className="text-xs text-success mt-1">
                    Earned {achievement?.earnedDate}
                  </p>
                )}
                {!achievement?.earned && achievement?.progress && (
                  <div className="mt-2">
                    <div className="w-full bg-muted rounded-full h-1">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${achievement?.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="bg-primary h-1 rounded-full"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {achievement?.progress}% complete
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default StatsSidebar;