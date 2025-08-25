import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8"
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="inline-flex items-center space-x-3 mb-6"
      >
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-elevation-2 hover-glow"
        >
          <Icon name="Brain" size={24} color="white" />
        </motion.div>
        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          QuizMaster Pro
        </span>
      </motion.div>
      {/* Welcome Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome Back
        </h1>
        <p className="text-muted-foreground text-lg">
          Sign in to continue your learning journey
        </p>
      </motion.div>
      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="flex justify-center space-x-2 mt-4"
      >
        {[...Array(3)]?.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2
            }}
            className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full"
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default LoginHeader;