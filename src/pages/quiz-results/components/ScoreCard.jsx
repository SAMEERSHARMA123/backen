import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ScoreCard = ({ score = 8, totalQuestions = 10, completionTime = 180, accuracy = 80 }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const percentage = Math.round((score / totalQuestions) * 100);
  const isPassing = percentage >= 70;
  const isExcellent = percentage >= 90;

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const increment = score / 30;
      const counter = setInterval(() => {
        current += increment;
        if (current >= score) {
          setAnimatedScore(score);
          clearInterval(counter);
          if (isExcellent) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
          }
        } else {
          setAnimatedScore(Math.floor(current));
        }
      }, 50);
    }, 500);

    return () => clearTimeout(timer);
  }, [score, isExcellent]);

  const getPerformanceMessage = () => {
    if (percentage >= 90) return { text: "Outstanding! 🎉", emoji: "🏆", color: "text-success" };
    if (percentage >= 80) return { text: "Excellent work! 👏", emoji: "⭐", color: "text-success" };
    if (percentage >= 70) return { text: "Good job! 👍", emoji: "✅", color: "text-primary" };
    if (percentage >= 60) return { text: "Not bad! 💪", emoji: "📈", color: "text-warning" };
    return { text: "Keep practicing! 📚", emoji: "💡", color: "text-error" };
  };

  const performance = getPerformanceMessage();

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className="relative">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(50)]?.map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full"
              initial={{
                x: Math.random() * 400,
                y: -10,
                rotate: 0,
                scale: 0
              }}
              animate={{
                y: 600,
                rotate: 360,
                scale: [0, 1, 0],
                x: Math.random() * 400 + Math.sin(i) * 100
              }}
              transition={{
                duration: 3,
                delay: Math.random() * 0.5,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass-strong rounded-2xl p-8 text-center shadow-elevation-3"
      >
        {/* Main Score Display */}
        <div className="mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring", bounce: 0.4 }}
            className="relative inline-block"
          >
            <div className="w-32 h-32 mx-auto mb-4 relative">
              {/* Background Circle */}
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted opacity-20"
                />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className={`${isPassing ? 'stroke-success' : 'stroke-warning'}`}
                  initial={{ strokeDasharray: "0 314" }}
                  animate={{ strokeDasharray: `${(percentage / 100) * 314} 314` }}
                  transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              
              {/* Score Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  {animatedScore}
                </motion.span>
                <span className="text-lg text-muted-foreground">/{totalQuestions}</span>
              </div>
            </div>
          </motion.div>

          {/* Percentage */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mb-4"
          >
            <span className={`text-3xl font-bold ${performance?.color}`}>
              {percentage}%
            </span>
            <p className="text-muted-foreground mt-1">Accuracy</p>
          </motion.div>

          {/* Performance Message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="mb-6"
          >
            <div className="text-2xl mb-2">{performance?.emoji}</div>
            <h3 className={`text-xl font-semibold ${performance?.color}`}>
              {performance?.text}
            </h3>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="grid grid-cols-3 gap-4 pt-6 border-t border-border/50"
        >
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-success/20 rounded-full mx-auto mb-2">
              <Icon name="Check" size={20} className="text-success" />
            </div>
            <div className="text-lg font-semibold text-success">{score}</div>
            <div className="text-xs text-muted-foreground">Correct</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-error/20 rounded-full mx-auto mb-2">
              <Icon name="X" size={20} className="text-error" />
            </div>
            <div className="text-lg font-semibold text-error">{totalQuestions - score}</div>
            <div className="text-xs text-muted-foreground">Incorrect</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-full mx-auto mb-2">
              <Icon name="Clock" size={20} className="text-primary" />
            </div>
            <div className="text-lg font-semibold">{formatTime(completionTime)}</div>
            <div className="text-xs text-muted-foreground">Time</div>
          </div>
        </motion.div>

        {/* Achievement Badge */}
        {isPassing && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 2, duration: 0.8, type: "spring" }}
            className="mt-6 inline-flex items-center space-x-2 bg-gradient-to-r from-success to-primary px-4 py-2 rounded-full text-white text-sm font-medium"
          >
            <Icon name="Award" size={16} />
            <span>Quiz Passed!</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ScoreCard;