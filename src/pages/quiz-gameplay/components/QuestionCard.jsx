import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const QuestionCard = ({ 
  question,
  questionNumber,
  totalQuestions,
  difficulty = 'medium',
  category = 'General',
  className = ""
}) => {
  const getDifficultyColor = () => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'hard': return 'text-error bg-error/10';
      default: return 'text-primary bg-primary/10';
    }
  };

  const getDifficultyIcon = () => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'TrendingUp';
      case 'medium': return 'Zap';
      case 'hard': return 'Flame';
      default: return 'HelpCircle';
    }
  };

  return (
    <motion.div
      className={`glass-strong rounded-2xl p-8 shadow-elevation-3 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Question Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {questionNumber}
            </span>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">
              Question {questionNumber} of {totalQuestions}
            </div>
            <div className="text-xs text-muted-foreground">
              {category}
            </div>
          </div>
        </div>

        {/* Difficulty Badge */}
        <motion.div
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium ${getDifficultyColor()}`}
          whileHover={{ scale: 1.05 }}
        >
          <Icon name={getDifficultyIcon()} size={12} />
          <span className="capitalize">{difficulty}</span>
        </motion.div>
      </div>
      {/* Question Text */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <h2 className="text-xl md:text-2xl font-semibold leading-relaxed text-foreground">
          {question}
        </h2>
      </motion.div>
      {/* Progress Indicator */}
      <div className="flex items-center space-x-3">
        <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
        <span className="text-sm font-medium text-muted-foreground min-w-fit">
          {Math.round((questionNumber / totalQuestions) * 100)}%
        </span>
      </div>
    </motion.div>
  );
};

export default QuestionCard;