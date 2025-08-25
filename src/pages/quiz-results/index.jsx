import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardHeader from '../../components/ui/DashboardHeader';
import ResultsActionBar from '../../components/ui/ResultsActionBar';
import ScoreCard from './components/ScoreCard';
import PerformanceChart from './components/PerformanceChart';
import QuestionReview from './components/QuestionReview';
import SocialShare from './components/SocialShare';
import CertificateDownload from './components/CertificateDownload';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const QuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showCelebration, setShowCelebration] = useState(false);

  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  };

  // Get quiz results from navigation state (from quiz gameplay)
  const quizResults = location?.state || null;

  // If no results data, redirect to dashboard
  useEffect(() => {
    if (!quizResults) {
      navigate('/quiz-dashboard');
    }
  }, [quizResults, navigate]);

  // Don't render if no results
  if (!quizResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
        <div className="text-center">
          <Icon name="AlertCircle" size={48} className="text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Quiz Results Found</h2>
          <p className="text-muted-foreground mb-4">Please complete a quiz first to see results.</p>
          <Button onClick={() => navigate('/quiz-dashboard')}>Go to Dashboard</Button>
        </div>
      </div>
    );
  }

  const percentage = Math.round((quizResults?.score / quizResults?.quizData?.questions?.length) * 100);
  const isPassing = percentage >= 70;
  const isExcellent = percentage >= 90;

  useEffect(() => {
    // Show celebration for high scores
    if (isExcellent) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isExcellent]);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleRetakeQuiz = () => {
    navigate('/quiz-gameplay', { 
      state: { 
        quizId: quizResults?.quizId,
        retake: true 
      } 
    });
  };

  const handleShare = (platform) => {
    console.log(`Shared on ${platform}`);
  };

  const handleDownloadCertificate = () => {
    console.log('Certificate downloaded');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'review', label: 'Review', icon: 'FileText' },
    { id: 'share', label: 'Share', icon: 'Share2' },
    { id: 'certificate', label: 'Certificate', icon: 'Award' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Celebration Effect */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-200">
          {[...Array(100)]?.map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: ['#6366F1', '#8B5CF6', '#F59E0B', '#10B981']?.[i % 4],
                left: `${Math.random() * 100}%`,
                top: '-10px'
              }}
              initial={{ y: -10, opacity: 1, scale: 0 }}
              animate={{
                y: window.innerHeight + 10,
                opacity: 0,
                scale: [0, 1, 0],
                rotate: 360
              }}
              transition={{
                duration: 3,
                delay: Math.random() * 2,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}
      <DashboardHeader 
        user={user}
        onThemeToggle={handleThemeToggle}
        isDarkMode={isDarkMode}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <Icon name="Trophy" size={24} color="white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Quiz Complete!
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isExcellent 
              ? "Outstanding performance! You've mastered this topic." 
              : isPassing 
              ? "Great job! You've successfully completed the quiz."
              : "Good effort! Review the explanations and try again to improve your score."
            }
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Left Column - Score and Performance */}
            <motion.div variants={itemVariants} className="space-y-6">
              <ScoreCard
                score={quizResults?.score}
                totalQuestions={quizResults?.totalQuestions}
                completionTime={quizResults?.completionTime}
                accuracy={quizResults?.accuracy}
              />
              
              {isPassing && (
                <CertificateDownload
                  score={quizResults?.score}
                  totalQuestions={quizResults?.totalQuestions}
                  quizTitle={quizResults?.quizTitle}
                  userName={user?.name}
                  completionDate={new Date()}
                  onDownload={handleDownloadCertificate}
                />
              )}
            </motion.div>

            {/* Middle Column - Charts and Analytics */}
            <motion.div variants={itemVariants} className="space-y-6">
              <PerformanceChart
                score={quizResults?.score}
                totalQuestions={quizResults?.totalQuestions}
                categoryBreakdown={quizResults?.categoryBreakdown}
              />
            </motion.div>

            {/* Right Column - Share and Actions */}
            <motion.div variants={itemVariants} className="space-y-6">
              <SocialShare
                score={quizResults?.score}
                totalQuestions={quizResults?.totalQuestions}
                quizTitle={quizResults?.quizTitle}
                onShare={handleShare}
              />
            </motion.div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden">
            {/* Score Card */}
            <motion.div variants={itemVariants} className="mb-8">
              <ScoreCard
                score={quizResults?.score}
                totalQuestions={quizResults?.totalQuestions}
                completionTime={quizResults?.completionTime}
                accuracy={quizResults?.accuracy}
              />
            </motion.div>

            {/* Tab Navigation */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="glass-strong rounded-xl p-2">
                <div className="grid grid-cols-4 gap-1">
                  {tabs?.map((tab) => (
                    <Button
                      key={tab?.id}
                      variant={activeTab === tab?.id ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveTab(tab?.id)}
                      iconName={tab?.icon}
                      iconPosition="left"
                      iconSize={16}
                      className="text-xs"
                    >
                      <span className="hidden sm:inline">{tab?.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Tab Content */}
            <motion.div variants={itemVariants}>
              {activeTab === 'overview' && (
                <PerformanceChart
                  score={quizResults?.score}
                  totalQuestions={quizResults?.totalQuestions}
                  categoryBreakdown={quizResults?.categoryBreakdown}
                />
              )}

              {activeTab === 'review' && (
                <QuestionReview questions={quizResults?.questions} />
              )}

              {activeTab === 'share' && (
                <SocialShare
                  score={quizResults?.score}
                  totalQuestions={quizResults?.totalQuestions}
                  quizTitle={quizResults?.quizTitle}
                  onShare={handleShare}
                />
              )}

              {activeTab === 'certificate' && (
                <CertificateDownload
                  score={quizResults?.score}
                  totalQuestions={quizResults?.totalQuestions}
                  quizTitle={quizResults?.quizTitle}
                  userName={user?.name}
                  completionDate={new Date()}
                  onDownload={handleDownloadCertificate}
                />
              )}
            </motion.div>
          </div>

          {/* Question Review (Desktop Only) */}
          <motion.div variants={itemVariants} className="hidden lg:block">
            <QuestionReview questions={quizResults?.questions} />
          </motion.div>
        </motion.div>

        {/* Action Bar */}
        <ResultsActionBar
          score={quizResults?.score}
          totalQuestions={quizResults?.totalQuestions}
          quizTitle={quizResults?.quizTitle}
          quizId={quizResults?.quizId}
          canRetake={true}
          canShare={true}
          canDownloadCertificate={isPassing}
          onRetake={handleRetakeQuiz}
          onShare={handleShare}
          onDownloadCertificate={handleDownloadCertificate}
        />
      </main>
    </div>
  );
};

export default QuizResults;