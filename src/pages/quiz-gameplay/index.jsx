import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import QuizProgressHeader from '../../components/ui/QuizProgressHeader';
import QuizTimer from './components/QuizTimer';
import QuestionCard from './components/QuestionCard';
import AnswerOptions from './components/AnswerOptions';
import QuizNavigation from './components/QuizNavigation';
import HelpPopup from './components/HelpPopup';
import PauseModal from './components/PauseModal';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { quizAPI } from '../../utils/api';

const QuizGameplay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes
  const [isPaused, setIsPaused] = useState(false);
  const [showHelpPopup, setShowHelpPopup] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Quiz data structure
  const quizData = {
    id: "backend-quiz",
    title: "Quiz Master Pro Assessment",
    description: "Test your knowledge with random questions",
    category: "General Knowledge",
    difficulty: "mixed",
    timeLimit: 300,
    questions: questions
  };

  const currentQuestion = quizData?.questions?.[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizData?.questions?.length - 1;
  const selectedAnswer = selectedAnswers?.[currentQuestion?.id];

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const fetchedQuestions = await quizAPI.getRandomQuestions();
        setQuestions(fetchedQuestions);
        setError(null);
        
        // Start quiz after questions are loaded
        const timer = setTimeout(() => {
          setQuizStarted(true);
          setLoading(false);
        }, 500);
        
        return () => clearTimeout(timer);
      } catch (err) {
        setError('Failed to load questions. Please try again.');
        setLoading(false);
        console.error('Error fetching questions:', err);
      }
    };

    fetchQuestions();
  }, []);

  // Handle timer
  useEffect(() => {
    if (timeRemaining <= 0) {
      handleTimeUp();
    }
  }, [timeRemaining]);

  const handleTimeUp = () => {
    // Auto-submit quiz when time runs out
    handleSubmitQuiz();
  };

  const handleAnswerSelect = (answerIndex) => {
    if (showFeedback) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion?.id]: answerIndex
    }));

    // Show immediate feedback
    setTimeout(() => {
      setShowFeedback(true);
    }, 300);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData?.questions?.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowFeedback(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowFeedback(false);
    }
  };

  const handleSubmitQuiz = () => {
    // Calculate score
    let correctAnswers = 0;
    quizData?.questions?.forEach(question => {
      if (selectedAnswers?.[question?.id] === question?.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = correctAnswers;
    const percentage = Math.round((score / quizData?.questions?.length) * 100);

    // Navigate to results with quiz data
    navigate('/quiz-results', {
      state: {
        quizData,
        selectedAnswers,
        score,
        percentage,
        timeSpent: quizData?.timeLimit - timeRemaining,
        completedAt: new Date()?.toISOString()
      }
    });
  };

  const handlePause = () => {
    setIsPaused(true);
    setShowPauseModal(true);
  };

  const handleResume = () => {
    setIsPaused(false);
    setShowPauseModal(false);
  };

  const handleExit = () => {
    navigate('/quiz-dashboard');
  };

  // Loading state
  if (loading || !quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Brain" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">
            {loading ? 'Loading Questions...' : 'Loading Quiz...'}
          </h1>
          <p className="text-muted-foreground">
            {loading ? 'Fetching questions from server' : 'Preparing your assessment'}
          </p>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="AlertTriangle" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-red-600">Error Loading Quiz</h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-primary hover:bg-primary/90"
          >
            Try Again
          </Button>
        </motion.div>
      </div>
    );
  }

  // No questions loaded
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="AlertCircle" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">No Questions Available</h1>
          <p className="text-muted-foreground mb-4">
            No questions found in the database. Please contact administrator.
          </p>
          <Button 
            onClick={() => navigate('/quiz-dashboard')} 
            variant="outline"
          >
            Go Back
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <QuizProgressHeader
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={quizData?.questions?.length}
        timeRemaining={timeRemaining}
        quizTitle={quizData?.title}
        onExit={handleExit}
        isPaused={isPaused}
        onPause={handlePause}
        onResume={handleResume}
      />
      {/* Main Content */}
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Timer & Help */}
            <div className="lg:col-span-1 space-y-6">
              {/* Timer */}
              <motion.div
                className="glass rounded-2xl p-6 text-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-sm font-medium text-muted-foreground mb-4">
                  Time Remaining
                </h3>
                <QuizTimer
                  initialTime={quizData?.timeLimit}
                  timeRemaining={timeRemaining}
                  onTimeUp={handleTimeUp}
                  isPaused={isPaused}
                  className="mx-auto"
                />
              </motion.div>

              {/* Help Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setShowHelpPopup(true)}
                  iconName="HelpCircle"
                  iconPosition="left"
                  className="hover-glow"
                >
                  Need Help?
                </Button>
              </motion.div>

              {/* Quiz Info */}
              <motion.div
                className="glass rounded-2xl p-6 space-y-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center space-x-3">
                  <Icon name="BookOpen" size={16} className="text-primary" />
                  <span className="text-sm font-medium">Quiz Info</span>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span>{quizData?.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Difficulty:</span>
                    <span className="capitalize">{quizData?.difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Questions:</span>
                    <span>{quizData?.questions?.length}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-8">
              {/* Question Card */}
              <AnimatePresence mode="wait">
                <QuestionCard
                  key={currentQuestion?.id}
                  question={currentQuestion?.question}
                  questionNumber={currentQuestionIndex + 1}
                  totalQuestions={quizData?.questions?.length}
                  difficulty={currentQuestion?.difficulty}
                  category={currentQuestion?.category}
                />
              </AnimatePresence>

              {/* Answer Options */}
              <AnimatePresence mode="wait">
                <AnswerOptions
                  key={currentQuestion?.id}
                  options={currentQuestion?.options}
                  selectedAnswer={selectedAnswer}
                  correctAnswer={currentQuestion?.correctAnswer}
                  showFeedback={showFeedback}
                  onAnswerSelect={handleAnswerSelect}
                  disabled={isPaused}
                />
              </AnimatePresence>

              {/* Navigation */}
              <QuizNavigation
                currentQuestion={currentQuestionIndex + 1}
                totalQuestions={quizData?.questions?.length}
                selectedAnswer={selectedAnswer}
                showFeedback={showFeedback}
                onNext={handleNextQuestion}
                onPrevious={handlePreviousQuestion}
                onSubmit={handleSubmitQuiz}
                isLastQuestion={isLastQuestion}
                canGoBack={true}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Modals */}
      <HelpPopup
        isOpen={showHelpPopup}
        onClose={() => setShowHelpPopup(false)}
      />
      <PauseModal
        isOpen={showPauseModal}
        onResume={handleResume}
        onExit={handleExit}
        quizTitle={quizData?.title}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={quizData?.questions?.length}
        timeRemaining={timeRemaining}
      />
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default QuizGameplay;