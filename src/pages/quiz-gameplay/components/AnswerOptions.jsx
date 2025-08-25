import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const AnswerOptions = ({ 
  options = [],
  selectedAnswer,
  correctAnswer,
  showFeedback = false,
  onAnswerSelect,
  disabled = false,
  className = ""
}) => {
  const [hoveredOption, setHoveredOption] = useState(null);

  const getOptionStatus = (optionIndex) => {
    if (!showFeedback) {
      return selectedAnswer === optionIndex ? 'selected' : 'default';
    }
    
    if (optionIndex === correctAnswer) return 'correct';
    if (selectedAnswer === optionIndex && optionIndex !== correctAnswer) return 'incorrect';
    return 'disabled';
  };

  const getOptionStyles = (status) => {
    const baseStyles = "relative w-full p-4 md:p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer text-left";
    
    switch (status) {
      case 'selected':
        return `${baseStyles} border-primary bg-primary/10 text-primary shadow-lg transform scale-[1.02]`;
      case 'correct':
        return `${baseStyles} border-success bg-success/10 text-success shadow-lg`;
      case 'incorrect':
        return `${baseStyles} border-error bg-error/10 text-error shadow-lg`;
      case 'disabled':
        return `${baseStyles} border-border bg-muted/30 text-muted-foreground opacity-60`;
      default:
        return `${baseStyles} border-border bg-card hover:border-primary/50 hover:bg-primary/5 hover:shadow-md`;
    }
  };

  const getOptionIcon = (status) => {
    switch (status) {
      case 'correct':
        return <Icon name="CheckCircle" size={20} className="text-success" />;
      case 'incorrect':
        return <Icon name="XCircle" size={20} className="text-error" />;
      case 'selected':
        return <Icon name="Circle" size={20} className="text-primary fill-current" />;
      default:
        return <Icon name="Circle" size={20} className="text-muted-foreground" />;
    }
  };

  const handleOptionClick = (optionIndex) => {
    if (disabled || showFeedback) return;
    onAnswerSelect?.(optionIndex);
  };

  const optionLabels = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <div className={`space-y-4 ${className}`}>
      <AnimatePresence mode="wait">
        {options?.map((option, index) => {
          const status = getOptionStatus(index);
          const isHovered = hoveredOption === index && !showFeedback && !disabled;
          
          return (
            <motion.div
              key={index}
              className={getOptionStyles(status)}
              onClick={() => handleOptionClick(index)}
              onMouseEnter={() => setHoveredOption(index)}
              onMouseLeave={() => setHoveredOption(null)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                scale: isHovered ? 1.02 : 1,
                rotateY: isHovered ? 2 : 0
              }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              whileTap={!disabled && !showFeedback ? { scale: 0.98 } : {}}
            >
              <div className="flex items-center space-x-4">
                {/* Option Label */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-sm font-semibold">
                    {optionLabels?.[index]}
                  </span>
                </div>

                {/* Option Text */}
                <div className="flex-1">
                  <p className="text-base md:text-lg font-medium leading-relaxed">
                    {option}
                  </p>
                </div>

                {/* Status Icon */}
                <div className="flex-shrink-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    {getOptionIcon(status)}
                  </motion.div>
                </div>
              </div>
              {/* Hover Effect Overlay */}
              {isHovered && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
              {/* Selection Ripple Effect */}
              {selectedAnswer === index && !showFeedback && (
                <motion.div
                  className="absolute inset-0 bg-primary/20 rounded-xl"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
      {/* Feedback Message */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            className="mt-6 p-4 rounded-lg glass"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center space-x-3">
              {selectedAnswer === correctAnswer ? (
                <>
                  <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-success">Correct! 🎉</p>
                    <p className="text-sm text-muted-foreground">
                      Great job! You got it right.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-8 h-8 bg-error/20 rounded-full flex items-center justify-center">
                    <Icon name="XCircle" size={16} className="text-error" />
                  </div>
                  <div>
                    <p className="font-medium text-error">Incorrect</p>
                    <p className="text-sm text-muted-foreground">
                      The correct answer was {optionLabels?.[correctAnswer]}.
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnswerOptions;