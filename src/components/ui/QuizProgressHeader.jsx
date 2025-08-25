import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuizProgressHeader = ({ 
  currentQuestion = 1, 
  totalQuestions = 10, 
  timeRemaining = 300, 
  quizTitle = "Quiz Title",
  onExit,
  isPaused = false,
  onPause,
  onResume
}) => {
  const [showExitModal, setShowExitModal] = useState(false);
  const [displayTime, setDisplayTime] = useState(timeRemaining);
  const navigate = useNavigate();

  useEffect(() => {
    setDisplayTime(timeRemaining);
  }, [timeRemaining]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds?.toString()?.padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    const percentage = (displayTime / 300) * 100; // Assuming 5 minutes total
    if (percentage > 50) return 'text-success';
    if (percentage > 20) return 'text-warning';
    return 'text-error';
  };

  const getProgressColor = () => {
    const percentage = (displayTime / 300) * 100;
    if (percentage > 50) return 'stroke-success';
    if (percentage > 20) return 'stroke-warning';
    return 'stroke-error';
  };

  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  const circumference = 2 * Math.PI * 20;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  const handleExitConfirm = () => {
    if (onExit) {
      onExit();
    } else {
      navigate('/quiz-dashboard');
    }
  };

  const CircularProgress = ({ percentage, color }) => (
    <div className="relative w-12 h-12">
      <svg className="w-12 h-12 progress-ring" viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-muted opacity-20"
        />
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (percentage / 100) * circumference}
          className={`progress-ring-circle ${color}`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-mono font-medium">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-100 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Side - Quiz Info */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Brain" size={20} color="white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-sm font-semibold truncate max-w-48">
                    {quizTitle}
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Question {currentQuestion} of {totalQuestions}
                  </p>
                </div>
              </div>
            </div>

            {/* Center - Progress Indicator */}
            <div className="flex items-center space-x-6">
              {/* Question Progress */}
              <div className="flex items-center space-x-3">
                <CircularProgress 
                  percentage={progressPercentage} 
                  color="stroke-primary" 
                />
                <div className="hidden md:block">
                  <div className="text-sm font-medium">
                    {currentQuestion} / {totalQuestions}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Questions
                  </div>
                </div>
              </div>

              {/* Time Remaining */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <svg className="w-12 h-12 progress-ring" viewBox="0 0 50 50">
                    <circle
                      cx="25"
                      cy="25"
                      r="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-muted opacity-20"
                    />
                    <circle
                      cx="25"
                      cy="25"
                      r="20"
                      fill="none"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={circumference - ((displayTime / 300) * 100 / 100) * circumference}
                      className={`progress-ring-circle ${getProgressColor()}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon name="Clock" size={16} className={getTimeColor()} />
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className={`text-sm font-mono font-medium ${getTimeColor()}`}>
                    {formatTime(displayTime)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Remaining
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Actions */}
            <div className="flex items-center space-x-2">
              {/* Pause/Resume Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={isPaused ? onResume : onPause}
                iconName={isPaused ? "Play" : "Pause"}
                className="hover-glow"
              />

              {/* Help Button */}
              <Button
                variant="ghost"
                size="icon"
                iconName="HelpCircle"
                className="hover-glow"
              />

              {/* Exit Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowExitModal(true)}
                iconName="X"
                iconPosition="left"
                className="text-error border-error hover:bg-error hover:text-error-foreground"
              >
                <span className="hidden sm:inline">Exit</span>
              </Button>
            </div>
          </div>

          {/* Mobile Progress Bar */}
          <div className="sm:hidden pb-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Question {currentQuestion} of {totalQuestions}</span>
              <span className={`font-mono ${getTimeColor()}`}>
                {formatTime(displayTime)}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-300 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowExitModal(false)} />
          <div className="relative glass-strong rounded-xl p-6 w-full max-w-md animate-scale-in">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-warning" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Exit Quiz?</h3>
                <p className="text-sm text-muted-foreground">
                  Your progress will be lost
                </p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to exit this quiz? All your current progress and answers will be lost and cannot be recovered.
            </p>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                fullWidth
                onClick={() => setShowExitModal(false)}
              >
                Continue Quiz
              </Button>
              <Button
                variant="destructive"
                fullWidth
                onClick={handleExitConfirm}
                iconName="LogOut"
                iconPosition="left"
              >
                Exit Quiz
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizProgressHeader;