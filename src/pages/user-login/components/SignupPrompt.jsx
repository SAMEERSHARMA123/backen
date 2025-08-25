import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';


const SignupPrompt = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/user-registration');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-8 text-center"
    >
      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/30" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground">
            New to QuizMaster Pro?
          </span>
        </div>
      </div>
      {/* Signup Prompt */}
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Join thousands of learners worldwide and start your quiz journey today
        </p>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="outline"
            fullWidth
            onClick={handleSignupClick}
            className="h-12 border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300"
          >
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-semibold">
              Create New Account
            </span>
          </Button>
        </motion.div>

        {/* Features Preview */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border/30">
          {[
            { icon: 'Trophy', text: 'Track Progress' },
            { icon: 'Users', text: 'Join Community' },
            { icon: 'Award', text: 'Earn Certificates' }
          ]?.map((feature, index) => (
            <motion.div
              key={feature?.text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="text-center"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Icon name={feature?.icon} size={16} className="text-primary" />
              </div>
              <p className="text-xs text-muted-foreground font-medium">
                {feature?.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SignupPrompt;