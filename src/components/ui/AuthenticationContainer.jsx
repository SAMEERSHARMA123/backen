import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const AuthenticationContainer = ({ 
  mode = 'login', // 'login' or 'register'
  onModeChange,
  onSubmit,
  loading = false 
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'register') {
      if (!formData?.name) {
        newErrors.name = 'Name is required';
      }

      if (!formData?.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!formData?.acceptTerms) {
        newErrors.acceptTerms = 'Please accept the terms and conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      if (onSubmit) {
        onSubmit(formData);
      } else {
        // Default behavior - navigate to dashboard
        navigate('/quiz-dashboard');
      }
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Simulate social login
    navigate('/quiz-dashboard');
  };

  const socialProviders = [
    { name: 'Google', icon: 'Chrome', color: 'hover:bg-red-50 hover:border-red-200' },
    { name: 'Facebook', icon: 'Facebook', color: 'hover:bg-blue-50 hover:border-blue-200' },
    { name: 'Apple', icon: 'Apple', color: 'hover:bg-gray-50 hover:border-gray-200' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>
      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-elevation-2">
              <Icon name="Brain" size={24} color="white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              QuizMaster Pro
            </span>
          </div>
          <h1 className="text-2xl font-semibold mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-muted-foreground">
            {mode === 'login' ?'Sign in to continue your learning journey' :'Join thousands of learners worldwide'
            }
          </p>
        </div>

        {/* Main Form Container */}
        <div className="glass-strong rounded-2xl p-8 shadow-elevation-3 animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field (Register only) */}
            {mode === 'register' && (
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                value={formData?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                error={errors?.name}
                required
              />
            )}

            {/* Email Field */}
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              error={errors?.email}
              required
            />

            {/* Password Field */}
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData?.password}
              onChange={(e) => handleInputChange('password', e?.target?.value)}
              error={errors?.password}
              description={mode === 'register' ? 'Must be at least 6 characters' : ''}
              required
            />

            {/* Confirm Password (Register only) */}
            {mode === 'register' && (
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                value={formData?.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
                error={errors?.confirmPassword}
                required
              />
            )}

            {/* Terms Checkbox (Register only) */}
            {mode === 'register' && (
              <div className="space-y-2">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={formData?.acceptTerms}
                    onChange={(e) => handleInputChange('acceptTerms', e?.target?.checked)}
                    className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-muted-foreground">
                    I agree to the{' '}
                    <button type="button" className="text-primary hover:underline">
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button type="button" className="text-primary hover:underline">
                      Privacy Policy
                    </button>
                  </span>
                </label>
                {errors?.acceptTerms && (
                  <p className="text-sm text-error">{errors?.acceptTerms}</p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              loading={loading}
              className="h-12 text-base font-medium"
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>

            {/* Forgot Password (Login only) */}
            {mode === 'login' && (
              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                  onClick={() => console.log('Forgot password')}
                >
                  Forgot your password?
                </button>
              </div>
            )}
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-card text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-3 gap-3">
            {socialProviders?.map((provider) => (
              <Button
                key={provider?.name}
                variant="outline"
                onClick={() => handleSocialLogin(provider?.name)}
                className={`h-12 ${provider?.color} transition-colors duration-150`}
                iconName={provider?.icon}
              />
            ))}
          </div>

          {/* Mode Switch */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={() => onModeChange?.(mode === 'login' ? 'register' : 'login')}
                className="text-primary hover:underline font-medium"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationContainer;