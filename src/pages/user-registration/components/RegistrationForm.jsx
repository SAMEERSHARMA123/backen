import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';

const RegistrationForm = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptMarketing: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordRequirements = [
        { test: (pwd) => pwd?.length >= 8, message: 'Password must be at least 8 characters' },
        { test: (pwd) => /[A-Z]/?.test(pwd), message: 'Password must contain an uppercase letter' },
        { test: (pwd) => /[a-z]/?.test(pwd), message: 'Password must contain a lowercase letter' },
        { test: (pwd) => /\d/?.test(pwd), message: 'Password must contain a number' },
        { test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/?.test(pwd), message: 'Password must contain a special character' }
      ];

      const failedRequirement = passwordRequirements?.find(req => !req?.test(formData?.password));
      if (failedRequirement) {
        newErrors.password = failedRequirement?.message;
      }
    }

    // Confirm Password validation
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms acceptance validation
    if (!formData?.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      // Shake animation for form errors
      const form = e?.target;
      form?.classList?.add('animate-shake');
      setTimeout(() => form?.classList?.remove('animate-shake'), 500);
      return;
    }

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        // Transform fullName to name for backend compatibility
        const transformedData = {
          name: formData.fullName,
          email: formData.email,
          password: formData.password
        };
        await onSubmit(transformedData);
      } else {
        // Simulate registration process
        await new Promise(resolve => setTimeout(resolve, 2000));
        navigate('/quiz-dashboard');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ submit: error.message || 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Full Name Field */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={(e) => handleInputChange('fullName', e?.target?.value)}
          error={errors?.fullName}
          required
          className="transition-all duration-200 focus:scale-[1.02]"
        />
      </motion.div>
      {/* Email Field */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          description="We'll use this for account verification and updates"
          required
          className="transition-all duration-200 focus:scale-[1.02]"
        />
      </motion.div>
      {/* Password Field */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
            className="transition-all duration-200 focus:scale-[1.02] pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            <motion.div
              animate={{ scale: showPassword ? 1.1 : 1 }}
              transition={{ duration: 0.1 }}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </motion.div>
          </button>
        </div>
        <PasswordStrengthIndicator password={formData?.password} />
      </motion.div>
      {/* Confirm Password Field */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={formData?.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
            error={errors?.confirmPassword}
            required
            className="transition-all duration-200 focus:scale-[1.02] pr-12"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            <motion.div
              animate={{ scale: showConfirmPassword ? 1.1 : 1 }}
              transition={{ duration: 0.1 }}
            >
              {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
            </motion.div>
          </button>
        </div>
      </motion.div>
      {/* Terms and Conditions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="space-y-4"
      >
        <Checkbox
          label={
            <span className="text-sm">
              I agree to the{' '}
              <button
                type="button"
                className="text-primary hover:underline font-medium"
                onClick={() => console.log('Terms clicked')}
              >
                Terms of Service
              </button>{' '}
              and{' '}
              <button
                type="button"
                className="text-primary hover:underline font-medium"
                onClick={() => console.log('Privacy clicked')}
              >
                Privacy Policy
              </button>
            </span>
          }
          checked={formData?.acceptTerms}
          onChange={(e) => handleInputChange('acceptTerms', e?.target?.checked)}
          error={errors?.acceptTerms}
          required
        />

        <Checkbox
          label="I'd like to receive updates about new quizzes and features"
          checked={formData?.acceptMarketing}
          onChange={(e) => handleInputChange('acceptMarketing', e?.target?.checked)}
          description="You can unsubscribe at any time"
        />
      </motion.div>
      {/* Submit Error */}
      {errors?.submit && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-3 bg-error/10 border border-error/20 rounded-lg"
        >
          <p className="text-sm text-error">{errors?.submit}</p>
        </motion.div>
      )}
      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <Button
          type="submit"
          fullWidth
          loading={isSubmitting || loading}
          disabled={!formData?.acceptTerms}
          className="h-12 text-base font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </Button>
      </motion.div>
      {/* Login Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.7 }}
        className="text-center"
      >
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/user-login')}
            className="text-primary hover:underline font-medium transition-colors duration-150"
          >
            Sign in here
          </button>
        </p>
      </motion.div>
    </motion.form>
  );
};

export default RegistrationForm;