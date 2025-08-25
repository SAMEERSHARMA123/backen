import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HelpPopup = ({ 
  isOpen,
  onClose,
  className = ""
}) => {
  const [activeTab, setActiveTab] = useState('instructions');

  const helpTabs = [
    {
      id: 'instructions',
      label: 'Instructions',
      icon: 'BookOpen',
      content: {
        title: 'How to Take the Quiz',
        items: [
          'Read each question carefully before selecting an answer',
          'Click on your chosen option to select it',
          'You can change your answer before moving to the next question',
          'Use the timer to track your remaining time',
          'Click "Next" to proceed to the next question'
        ]
      }
    },
    {
      id: 'scoring',
      label: 'Scoring',
      icon: 'Trophy',
      content: {
        title: 'How Scoring Works',
        items: [
          'Each correct answer earns you 1 point',
          'No points are deducted for incorrect answers',
          'Your final score is calculated as a percentage',
          'Scores of 70% or higher are considered passing',
          'You can retake the quiz to improve your score'
        ]
      }
    },
    {
      id: 'tips',
      label: 'Tips',
      icon: 'Lightbulb',
      content: {
        title: 'Quiz Taking Tips',
        items: [
          'Read all options before selecting your answer',
          'Eliminate obviously wrong answers first',
          'Trust your first instinct if unsure',
          'Manage your time wisely across all questions',
          'Stay calm and focused throughout the quiz'
        ]
      }
    }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-300 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className={`relative glass-strong rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-elevation-3 ${className}`}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Icon name="HelpCircle" size={20} color="white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Quiz Help</h2>
                <p className="text-sm text-muted-foreground">
                  Everything you need to know
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
              className="hover-glow"
            />
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-border/50">
            {helpTabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-colors duration-150 ${
                  activeTab === tab?.id
                    ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-96">
            <AnimatePresence mode="wait">
              {helpTabs?.map((tab) => (
                activeTab === tab?.id && (
                  <motion.div
                    key={tab?.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-lg font-semibold mb-4">
                      {tab?.content?.title}
                    </h3>
                    <ul className="space-y-3">
                      {tab?.content?.items?.map((item, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start space-x-3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Icon name="Check" size={12} className="text-primary" />
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item}
                          </p>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-border/50 bg-muted/20">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Info" size={16} />
              <span>Need more help? Contact support</span>
            </div>
            <Button
              variant="default"
              onClick={onClose}
              iconName="ArrowRight"
              iconPosition="right"
            >
              Got it
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default HelpPopup;