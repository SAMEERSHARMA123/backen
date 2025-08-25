import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialLogin = () => {
  const [loadingProvider, setLoadingProvider] = useState(null);
  const navigate = useNavigate();

  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      color: 'hover:bg-red-50 hover:border-red-200 hover:shadow-red-100/50',
      bgGradient: 'from-red-500 to-red-600'
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'hover:bg-blue-50 hover:border-blue-200 hover:shadow-blue-100/50',
      bgGradient: 'from-blue-500 to-blue-600'
    }
  ];

  const handleSocialLogin = async (provider) => {
    setLoadingProvider(provider?.name);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log(`Login with ${provider?.name}`);
      navigate('/quiz-dashboard');
    } catch (error) {
      console.error(`${provider?.name} login failed:`, error);
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Social Login Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders?.map((provider, index) => (
          <motion.div
            key={provider?.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="outline"
              fullWidth
              onClick={() => handleSocialLogin(provider)}
              loading={loadingProvider === provider?.name}
              disabled={loadingProvider && loadingProvider !== provider?.name}
              className={`h-12 ${provider?.color} transition-all duration-300 hover-glow border-2`}
            >
              <div className="flex items-center justify-center space-x-3">
                <div className={`w-5 h-5 bg-gradient-to-r ${provider?.bgGradient} rounded-full flex items-center justify-center`}>
                  <Icon name={provider?.icon} size={12} color="white" />
                </div>
                <span className="font-medium">
                  Continue with {provider?.name}
                </span>
              </div>
            </Button>
          </motion.div>
        ))}
      </div>
      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative my-6"
      >
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/50" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground font-medium">
            Or continue with email
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default SocialLogin;