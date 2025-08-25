import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const PerformanceChart = ({ score = 8, totalQuestions = 10, categoryBreakdown = [] }) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  
  const correctAnswers = score;
  const incorrectAnswers = totalQuestions - score;
  
  const chartData = [
    { name: 'Correct', value: correctAnswers, color: '#10B981' },
    { name: 'Incorrect', value: incorrectAnswers, color: '#EF4444' }
  ];

  const defaultCategoryBreakdown = [
    { category: "General Knowledge", correct: 3, total: 4, percentage: 75 },
    { category: "Science", correct: 2, total: 3, percentage: 67 },
    { category: "History", correct: 3, total: 3, percentage: 100 }
  ];

  const categories = categoryBreakdown?.length > 0 ? categoryBreakdown : defaultCategoryBreakdown;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="glass-strong rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium">{data?.name}</p>
          <p className="text-sm text-muted-foreground">
            {data?.value} question{data?.value !== 1 ? 's' : ''}
          </p>
        </div>
      );
    }
    return null;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      "General Knowledge": "Brain",
      "Science": "Atom",
      "History": "Clock",
      "Mathematics": "Calculator",
      "Literature": "Book",
      "Geography": "Globe"
    };
    return icons?.[category] || "HelpCircle";
  };

  const getCategoryColor = (percentage) => {
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-warning";
    return "text-error";
  };

  return (
    <div className="space-y-6">
      {/* Overall Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-strong rounded-2xl p-6 shadow-elevation-2"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
            <Icon name="PieChart" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Performance Overview</h3>
            <p className="text-sm text-muted-foreground">Your answer distribution</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1000}
                >
                  {chartData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend and Stats */}
          <div className="space-y-4">
            {chartData?.map((item, index) => (
              <motion.div
                key={item?.name}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item?.color }}
                  />
                  <span className="font-medium">{item?.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{item?.value}</div>
                  <div className="text-xs text-muted-foreground">
                    {Math.round((item?.value / totalQuestions) * 100)}%
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      {/* Category Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="glass-strong rounded-2xl p-6 shadow-elevation-2"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
            <Icon name="BarChart3" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Category Performance</h3>
            <p className="text-sm text-muted-foreground">Breakdown by subject area</p>
          </div>
        </div>

        <div className="space-y-4">
          {categories?.map((category, index) => (
            <motion.div
              key={category?.category}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              className="p-4 bg-muted/30 rounded-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <Icon name={getCategoryIcon(category?.category)} size={16} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{category?.category}</h4>
                    <p className="text-sm text-muted-foreground">
                      {category?.correct}/{category?.total} correct
                    </p>
                  </div>
                </div>
                <div className={`text-lg font-bold ${getCategoryColor(category?.percentage)}`}>
                  {category?.percentage}%
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full ${
                    category?.percentage >= 80 ? 'bg-success' :
                    category?.percentage >= 60 ? 'bg-warning' : 'bg-error'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${category?.percentage}%` }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      {/* Performance Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="glass-strong rounded-2xl p-6 shadow-elevation-2"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
            <Icon name="TrendingUp" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Performance Insights</h3>
            <p className="text-sm text-muted-foreground">Areas for improvement</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={16} className="text-success" />
              <span className="font-medium text-success">Strengths</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Excellent performance in {categories?.find(c => c?.percentage >= 80)?.category || "multiple areas"}
            </p>
          </div>

          <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Target" size={16} className="text-warning" />
              <span className="font-medium text-warning">Focus Areas</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Consider reviewing {categories?.find(c => c?.percentage < 70)?.category || "fundamental concepts"}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PerformanceChart;