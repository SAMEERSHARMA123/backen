import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustBadges = [
    {
      icon: 'Shield',
      label: 'SSL Secured',
      description: '256-bit encryption'
    },
    {
      icon: 'Users',
      label: '50K+ Users',
      description: 'Trusted worldwide'
    },
    {
      icon: 'Award',
      label: 'Certified',
      description: 'ISO 27001 compliant'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Student',
      content: `QuizMaster Pro helped me ace my certification exams. The interactive format makes learning enjoyable!`,
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face'
    },
    {
      name: 'Michael Chen',
      role: 'Professional',
      content: `Great platform for skill assessment. The detailed analytics help track my progress effectively.`,
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="mt-8 space-y-6"
    >
      {/* Trust Badges */}
      <div className="flex justify-center items-center space-x-6">
        {trustBadges?.map((badge, index) => (
          <motion.div
            key={badge?.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
            className="flex flex-col items-center space-y-1 group"
          >
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center group-hover:bg-success/20 transition-colors duration-200">
              <Icon 
                name={badge?.icon} 
                size={16} 
                className="text-success"
              />
            </div>
            <div className="text-center">
              <p className="text-xs font-medium text-foreground">
                {badge?.label}
              </p>
              <p className="text-xs text-muted-foreground">
                {badge?.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      {/* User Testimonials */}
      <div className="space-y-4">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center text-sm font-medium text-muted-foreground"
        >
          Trusted by learners worldwide
        </motion.h3>

        <div className="grid gap-4 md:grid-cols-2">
          {testimonials?.map((testimonial, index) => (
            <motion.div
              key={testimonial?.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.3 + index * 0.2 }}
              className="glass rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-start space-x-3">
                <img
                  src={testimonial?.avatar}
                  alt={testimonial?.name}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {testimonial?.name}
                    </h4>
                    <div className="flex space-x-1">
                      {[...Array(testimonial?.rating)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={12}
                          className="text-warning fill-current"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {testimonial?.role}
                  </p>
                  <p className="text-xs text-foreground leading-relaxed">
                    {testimonial?.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Security Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        className="text-center"
      >
        <p className="text-xs text-muted-foreground">
          🔒 Your data is protected with enterprise-grade security
        </p>
      </motion.div>
    </motion.div>
  );
};

export default TrustSignals;