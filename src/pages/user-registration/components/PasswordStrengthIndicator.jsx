import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const PasswordStrengthIndicator = ({ password = '' }) => {
  const requirements = [
    {
      id: 'length',
      label: 'At least 8 characters',
      test: (pwd) => pwd?.length >= 8
    },
    {
      id: 'uppercase',
      label: 'One uppercase letter',
      test: (pwd) => /[A-Z]/?.test(pwd)
    },
    {
      id: 'lowercase',
      label: 'One lowercase letter',
      test: (pwd) => /[a-z]/?.test(pwd)
    },
    {
      id: 'number',
      label: 'One number',
      test: (pwd) => /\d/?.test(pwd)
    },
    {
      id: 'special',
      label: 'One special character',
      test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/?.test(pwd)
    }
  ];

  const getStrengthLevel = () => {
    const passedCount = requirements?.filter(req => req?.test(password))?.length;
    if (passedCount === 0) return { level: 0, label: '', color: 'bg-muted' };
    if (passedCount <= 2) return { level: 1, label: 'Weak', color: 'bg-error' };
    if (passedCount <= 3) return { level: 2, label: 'Fair', color: 'bg-warning' };
    if (passedCount <= 4) return { level: 3, label: 'Good', color: 'bg-primary' };
    return { level: 4, label: 'Strong', color: 'bg-success' };
  };

  const strength = getStrengthLevel();

  if (!password) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-3 space-y-3"
    >
      {/* Strength Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Password Strength</span>
          {strength?.label && (
            <span className={`text-xs font-medium ${
              strength?.level === 1 ? 'text-error' :
              strength?.level === 2 ? 'text-warning' :
              strength?.level === 3 ? 'text-primary': 'text-success'
            }`}>
              {strength?.label}
            </span>
          )}
        </div>
        <div className="flex space-x-1">
          {[1, 2, 3, 4]?.map((level) => (
            <motion.div
              key={level}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                level <= strength?.level ? strength?.color : 'bg-muted'
              }`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: level <= strength?.level ? 1 : 0.3 }}
              transition={{ duration: 0.3, delay: level * 0.1 }}
            />
          ))}
        </div>
      </div>
      {/* Requirements List */}
      <div className="space-y-2">
        {requirements?.map((requirement) => {
          const isPassed = requirement?.test(password);
          return (
            <motion.div
              key={requirement?.id}
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors duration-200 ${
                  isPassed ? 'bg-success' : 'bg-muted'
                }`}
                animate={{ scale: isPassed ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Icon
                  name={isPassed ? "Check" : "X"}
                  size={10}
                  color={isPassed ? "white" : "var(--color-muted-foreground)"}
                />
              </motion.div>
              <span className={`text-xs transition-colors duration-200 ${
                isPassed ? 'text-success' : 'text-muted-foreground'
              }`}>
                {requirement?.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default PasswordStrengthIndicator;