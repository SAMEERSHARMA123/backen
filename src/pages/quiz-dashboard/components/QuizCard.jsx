import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuizCard = ({ quiz, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-success bg-success/20';
      case 'medium': return 'text-warning bg-warning/20';
      case 'hard': return 'text-error bg-error/20';
      default: return 'text-muted-foreground bg-muted/20';
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Science': 'Atom',
      'Technology': 'Cpu',
      'History': 'Clock',
      'Geography': 'Globe',
      'Mathematics': 'Calculator',
      'Literature': 'BookOpen',
      'Sports': 'Trophy',
      'Entertainment': 'Film',
      'General Knowledge': 'Brain'
    };
    return icons?.[category] || 'HelpCircle';
  };

  const handleStartQuiz = () => {
    navigate('/quiz-gameplay', { state: { quizId: quiz?.id } });
  };

  const handleViewResults = () => {
    navigate('/quiz-results', { state: { quizId: quiz?.id } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02,
        rotateY: 2,
        rotateX: 2
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="glass-strong rounded-2xl p-6 hover-glow transition-all duration-300 cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name={getCategoryIcon(quiz?.category)} size={20} color="white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg leading-tight mb-1">
              {quiz?.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {quiz?.category}
            </p>
          </div>
        </div>
        
        {quiz?.isCompleted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-6 h-6 bg-success rounded-full flex items-center justify-center"
          >
            <Icon name="Check" size={14} color="white" />
          </motion.div>
        )}
      </div>
      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {quiz?.description}
      </p>
      {/* Stats Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} />
            <span>{quiz?.estimatedTime} min</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="HelpCircle" size={14} />
            <span>{quiz?.totalQuestions} questions</span>
          </div>
        </div>
        
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz?.difficulty)}`}>
          {quiz?.difficulty}
        </div>
      </div>
      {/* Progress Section */}
      {quiz?.isCompleted && quiz?.bestScore !== undefined && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Best Score</span>
            <span className="text-sm font-bold text-primary">
              {quiz?.bestScore}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${quiz?.bestScore}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
            />
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex space-x-2">
        {quiz?.isCompleted ? (
          <>
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={handleStartQuiz}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Retake
            </Button>
            <Button
              variant="default"
              size="sm"
              fullWidth
              onClick={handleViewResults}
              iconName="BarChart3"
              iconPosition="left"
            >
              Results
            </Button>
          </>
        ) : (
          <Button
            variant="default"
            size="sm"
            fullWidth
            onClick={handleStartQuiz}
            iconName="Play"
            iconPosition="left"
            className="group-hover:shadow-lg transition-shadow duration-300"
          >
            Start Quiz
          </Button>
        )}
      </div>
      {/* Hover Overlay Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.05 : 0 }}
        className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl pointer-events-none"
      />
    </motion.div>
  );
};

export default QuizCard;