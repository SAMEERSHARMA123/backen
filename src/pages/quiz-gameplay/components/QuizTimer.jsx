import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const QuizTimer = ({ 
  initialTime = 300, // 5 minutes in seconds
  onTimeUp,
  isPaused = false,
  className = ""
}) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isWarning, setIsWarning] = useState(false);
  const [isCritical, setIsCritical] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, onTimeUp]);

  useEffect(() => {
    const percentage = (timeRemaining / initialTime) * 100;
    setIsWarning(percentage <= 30 && percentage > 10);
    setIsCritical(percentage <= 10);
  }, [timeRemaining, initialTime]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds?.toString()?.padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (isCritical) return 'text-error';
    if (isWarning) return 'text-warning';
    return 'text-success';
  };

  const getStrokeColor = () => {
    if (isCritical) return 'stroke-error';
    if (isWarning) return 'stroke-warning';
    return 'stroke-success';
  };

  const percentage = (timeRemaining / initialTime) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="relative w-24 h-24"
        animate={isCritical ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5, repeat: isCritical ? Infinity : 0 }}
      >
        <svg className="w-24 h-24 progress-ring" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-muted opacity-20"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`progress-ring-circle ${getStrokeColor()}`}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon 
            name="Clock" 
            size={16} 
            className={`mb-1 ${getTimerColor()}`} 
          />
          <span className={`text-sm font-mono font-bold ${getTimerColor()}`}>
            {formatTime(timeRemaining)}
          </span>
        </div>
      </motion.div>
      {isPaused && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Icon name="Pause" size={20} className="text-white" />
        </motion.div>
      )}
    </div>
  );
};

export default QuizTimer;