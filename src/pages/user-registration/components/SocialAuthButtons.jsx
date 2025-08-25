import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialAuthButtons = ({ onSocialAuth, loading = false }) => {
  const [activeProvider, setActiveProvider] = useState(null);
  const navigate = useNavigate();

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'hover:bg-red-50 hover:border-red-200 hover:shadow-red-100/50',
      bgGradient: 'from-red-500 to-red-600'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'hover:bg-blue-50 hover:border-blue-200 hover:shadow-blue-100/50',
      bgGradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: 'Apple',
      color: 'hover:bg-gray-50 hover:border-gray-200 hover:shadow-gray-100/50',
      bgGradient: 'from-gray-800 to-gray-900'
    }
  ];

  const handleSocialAuth = async (provider) => {
    setActiveProvider(provider?.id);
    
    try {
      if (onSocialAuth) {
        await onSocialAuth(provider?.id);
      } else {
        // Simulate social auth process
        await new Promise(resolve => setTimeout(resolve, 1500));
        navigate('/quiz-dashboard');
      }
    } catch (error) {
      console.error(`${provider?.name} authentication failed:`, error);
    } finally {
      setActiveProvider(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Social Auth Header */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/50" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      {/* Social Buttons Grid */}
      <div className="grid grid-cols-3 gap-3">
        {socialProviders?.map((provider, index) => (
          <motion.div
            key={provider?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="outline"
              onClick={() => handleSocialAuth(provider)}
              disabled={loading || activeProvider !== null}
              loading={activeProvider === provider?.id}
              className={`h-12 w-full transition-all duration-200 ${provider?.color} hover:shadow-lg group relative overflow-hidden`}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${provider?.bgGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-200`} />
              
              {/* Icon */}
              <motion.div
                animate={{ 
                  rotate: activeProvider === provider?.id ? 360 : 0,
                  scale: activeProvider === provider?.id ? 0.8 : 1
                }}
                transition={{ duration: 0.5 }}
              >
                <Icon 
                  name={provider?.icon} 
                  size={20} 
                  className="relative z-10"
                />
              </motion.div>

              {/* Provider Name (Hidden on mobile) */}
              <span className="sr-only">{provider?.name}</span>
            </Button>
          </motion.div>
        ))}
      </div>
      {/* Social Auth Benefits */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <p className="text-xs text-muted-foreground">
          Quick signup with your existing account
        </p>
      </motion.div>
    </div>
  );
};

export default SocialAuthButtons;