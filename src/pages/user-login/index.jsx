import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import SocialLogin from './components/SocialLogin';
import LoginForm from './components/LoginForm';
import SignupPrompt from './components/SignupPrompt';

const UserLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();



  useEffect(() => {
    // Add custom shake animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
      }
      .animate-shake {
        animation: shake 0.6s ease-in-out;
      }
    `;
    document.head?.appendChild(style);

    return () => {
      document.head?.removeChild(style);
    };
  }, []);

  const handleLogin = async (formData) => {
    setLoading(true);
    setError('');

    try {
      // Call backend login API
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/quiz-dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please check if backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>
      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-20 w-4 h-4 bg-gradient-to-r from-primary to-secondary rounded-full opacity-60"
      />
      <motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-20 right-20 w-6 h-6 bg-gradient-to-r from-secondary to-accent rounded-full opacity-40"
      />
      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Login Header */}
        <LoginHeader />

        {/* Main Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="glass-strong rounded-2xl p-8 shadow-elevation-3 backdrop-blur-xl border border-white/20"
        >
          {/* Social Login */}
          <SocialLogin />

          {/* Login Form */}
          <LoginForm 
            onSubmit={handleLogin}
            loading={loading}
            error={error}
          />

          {/* Signup Prompt */}
          <SignupPrompt />
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center text-xs text-muted-foreground"
        >
          <p>
            Secure login powered by advanced encryption
          </p>
          <div className="flex items-center justify-center space-x-4 mt-2">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span>SSL Protected</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>GDPR Compliant</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UserLogin;