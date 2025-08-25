import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuizNavigation = ({ 
  currentQuestion,
  totalQuestions,
  selectedAnswer,
  showFeedback,
  onNext,
  onPrevious,
  onSubmit,
  canGoBack = true,
  isLastQuestion = false,
  className = ""
}) => {
  const isNextDisabled = selectedAnswer === null || selectedAnswer === undefined;
  const isPreviousDisabled = currentQuestion === 1 || !canGoBack;

  const handleNext = () => {
    if (!isNextDisabled) {
      onNext?.();
    }
  };

  const handlePrevious = () => {
    if (!isPreviousDisabled) {
      onPrevious?.();
    }
  };

  const handleSubmit = () => {
    onSubmit?.();
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Previous Button */}
      <div className="flex-1">
        {!isPreviousDisabled && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="outline"
              onClick={handlePrevious}
              iconName="ChevronLeft"
              iconPosition="left"
              className="hover-glow"
            >
              Previous
            </Button>
          </motion.div>
        )}
      </div>
      {/* Question Counter */}
      <div className="flex-shrink-0 mx-6">
        <motion.div
          className="flex items-center space-x-2 px-4 py-2 bg-muted/50 rounded-full"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Icon name="HelpCircle" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">
            {currentQuestion} of {totalQuestions}
          </span>
        </motion.div>
      </div>
      {/* Next/Submit Button */}
      <div className="flex-1 flex justify-end">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isLastQuestion ? (
            <Button
              variant="success"
              onClick={handleSubmit}
              disabled={isNextDisabled}
              iconName="CheckCircle"
              iconPosition="right"
              className="hover-glow"
            >
              Submit Quiz
            </Button>
          ) : (
            <Button
              variant="default"
              onClick={handleNext}
              disabled={isNextDisabled}
              iconName="ChevronRight"
              iconPosition="right"
              className="hover-glow"
            >
              {showFeedback ? 'Continue' : 'Next'}
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default QuizNavigation;