import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import RegistrationForm from './components/RegistrationForm';
import SocialAuthButtons from './components/SocialAuthButtons';
import TrustSignals from './components/TrustSignals';

const UserRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRegistration = async (formData) => {
    setLoading(true);
    try {
      // Call backend registration API
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful:', data);
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        // Navigate to dashboard or show success message
        window.location.href = '/quiz-dashboard';
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider) => {
    setLoading(true);
    try {
      // Simulate social authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(`${provider} authentication successful`);
    } catch (error) {
      console.error(`${provider} authentication failed:`, error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Create Account - QuizMaster Pro</title>
        <meta name="description" content="Join QuizMaster Pro and start your learning journey. Create your account to access interactive quizzes, track progress, and earn certificates." />
        <meta name="keywords" content="quiz registration, create account, online learning, skill assessment, certification" />
        <meta property="og:title" content="Create Account - QuizMaster Pro" />
        <meta property="og:description" content="Join thousands of learners worldwide. Create your QuizMaster Pro account today." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          />
          
          {/* Floating Elements */}
          {[...Array(6)]?.map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative w-full max-w-md z-10">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center space-x-3 mb-6"
            >
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-elevation-2"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon name="Brain" size={24} color="white" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                QuizMaster Pro
              </span>
            </motion.div>

            {/* Welcome Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h1 className="text-2xl font-semibold text-foreground mb-2">
                Create Your Account
              </h1>
              <p className="text-muted-foreground">
                Join thousands of learners worldwide and start your journey
              </p>
            </motion.div>
          </motion.div>

          {/* Main Registration Container */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-strong rounded-2xl p-8 shadow-elevation-3 backdrop-blur-xl border border-white/20"
          >
            {/* Social Authentication */}
            <SocialAuthButtons 
              onSocialAuth={handleSocialAuth}
              loading={loading}
            />

            {/* Registration Form */}
            <div className="mt-6">
              <RegistrationForm 
                onSubmit={handleRegistration}
                loading={loading}
              />
            </div>
          </motion.div>

          {/* Trust Signals */}
          <TrustSignals />

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="mt-8 text-center"
          >
            <p className="text-xs text-muted-foreground">
              By creating an account, you agree to our{' '}
              <button className="text-primary hover:underline">
                Terms of Service
              </button>{' '}
              and{' '}
              <button className="text-primary hover:underline">
                Privacy Policy
              </button>
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              © {new Date()?.getFullYear()} QuizMaster Pro. All rights reserved.
            </p>
          </motion.div>
        </div>

        {/* Loading Overlay */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <div className="glass-strong rounded-xl p-6 flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span className="text-sm font-medium">Creating your account...</span>
            </div>
          </motion.div>
        )}
      </div>
      {/* Custom Styles for Animations */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default UserRegistration;