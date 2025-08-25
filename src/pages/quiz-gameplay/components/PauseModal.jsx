import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PauseModal = ({ 
  isOpen,
  onResume,
  onExit,
  quizTitle = "Quiz",
  currentQuestion,
  totalQuestions,
  timeRemaining,
  className = ""
}) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds?.toString()?.padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-300 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal */}
        <motion.div
          className={`relative glass-strong rounded-2xl p-8 w-full max-w-md shadow-elevation-3 ${className}`}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-warning to-accent rounded-full flex items-center justify-center mx-auto mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Icon name="Pause" size={24} color="white" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-2">Quiz Paused</h2>
            <p className="text-muted-foreground">
              Take a moment to rest and resume when ready
            </p>
          </div>

          {/* Quiz Status */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="BookOpen" size={16} className="text-primary" />
                <span className="text-sm font-medium">Quiz</span>
              </div>
              <span className="text-sm text-muted-foreground truncate max-w-32">
                {quizTitle}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="HelpCircle" size={16} className="text-primary" />
                <span className="text-sm font-medium">Progress</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {currentQuestion} of {totalQuestions}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Clock" size={16} className="text-warning" />
                <span className="text-sm font-medium">Time Left</span>
              </div>
              <span className="text-sm font-mono font-medium text-warning">
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              variant="default"
              fullWidth
              onClick={onResume}
              iconName="Play"
              iconPosition="left"
              className="hover-glow"
            >
              Resume Quiz
            </Button>

            <Button
              variant="outline"
              fullWidth
              onClick={onExit}
              iconName="LogOut"
              iconPosition="left"
              className="text-error border-error hover:bg-error hover:text-error-foreground"
            >
              Exit Quiz
            </Button>
          </div>

          {/* Warning */}
          <div className="mt-6 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
              <p className="text-xs text-warning">
                The timer continues running while paused. Resume quickly to save time!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PauseModal;