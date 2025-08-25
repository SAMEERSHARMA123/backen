import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onRandomQuiz }) => {
  const [isRandomizing, setIsRandomizing] = useState(false);
  const navigate = useNavigate();

  const handleRandomQuiz = async () => {
    setIsRandomizing(true);
    
    // Simulate random quiz selection
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (onRandomQuiz) {
      onRandomQuiz();
    } else {
      navigate('/quiz-gameplay', { state: { randomQuiz: true } });
    }
    
    setIsRandomizing(false);
  };

  const handleViewCertificates = () => {
    navigate('/quiz-results', { state: { showCertificates: true } });
  };

  const quickActionItems = [
    {
      id: 'random',
      title: 'Start Random Quiz',
      description: 'Challenge yourself with a surprise quiz',
      icon: 'Shuffle',
      gradient: 'from-primary to-secondary',
      action: handleRandomQuiz,
      loading: isRandomizing
    },
    {
      id: 'certificates',
      title: 'View Certificates',
      description: 'See your earned achievements',
      icon: 'Award',
      gradient: 'from-accent to-warning',
      action: handleViewCertificates
    },
    {
      id: 'leaderboard',
      title: 'Leaderboard',
      description: 'Compare your scores with others',
      icon: 'Medal',
      gradient: 'from-success to-primary',
      action: () => console.log('Leaderboard clicked')
    },
    {
      id: 'create',
      title: 'Create Quiz',
      description: 'Build your own quiz questions',
      icon: 'Plus',
      gradient: 'from-secondary to-accent',
      action: () => console.log('Create quiz clicked')
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <Icon name="Zap" size={20} />
          <span>Quick Actions</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActionItems?.map((item, index) => (
          <motion.div
            key={item?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.05,
              rotateY: 5,
              rotateX: 5
            }}
            whileTap={{ scale: 0.95 }}
            className="group cursor-pointer"
            onClick={item?.action}
          >
            <div className="glass-strong rounded-xl p-6 h-full hover-glow transition-all duration-300 relative overflow-hidden">
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item?.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative z-10">
                <div className={`w-12 h-12 bg-gradient-to-br ${item?.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {item?.loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Icon name="Loader2" size={24} color="white" />
                    </motion.div>
                  ) : (
                    <Icon name={item?.icon} size={24} color="white" />
                  )}
                </div>
                
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                  {item?.title}
                </h3>
                
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {item?.description}
                </p>

                {/* Arrow Icon */}
                <motion.div
                  initial={{ x: 0, opacity: 0 }}
                  whileHover={{ x: 5, opacity: 1 }}
                  className="absolute top-4 right-4 text-muted-foreground group-hover:text-primary transition-colors duration-300"
                >
                  <Icon name="ArrowRight" size={16} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Featured Action */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-6"
      >
        <div className="glass rounded-xl p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Icon name="Target" size={24} color="white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Daily Challenge</h3>
                <p className="text-sm text-muted-foreground">
                  Complete today's special quiz for bonus points
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm font-medium text-accent">+50 Points</div>
                <div className="text-xs text-muted-foreground">Bonus Reward</div>
              </div>
              <Button
                variant="default"
                iconName="Play"
                iconPosition="left"
                className="hover-glow"
                onClick={() => navigate('/quiz-gameplay', { state: { dailyChallenge: true } })}
              >
                Start Challenge
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuickActions;