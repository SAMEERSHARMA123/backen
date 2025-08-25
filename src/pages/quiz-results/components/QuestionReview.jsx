import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuestionReview = ({ questions = [] }) => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [filterType, setFilterType] = useState('all'); // 'all', 'correct', 'incorrect'

  const mockQuestions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      userAnswer: 2,
      correctAnswer: 2,
      explanation: "Paris is the capital and most populous city of France. It has been the capital since 508 AD.",
      category: "Geography",
      difficulty: "Easy"
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      userAnswer: 1,
      correctAnswer: 1,
      explanation: "Mars is called the Red Planet because of iron oxide (rust) on its surface, giving it a reddish appearance.",
      category: "Science",
      difficulty: "Easy"
    },
    {
      id: 3,
      question: "Who wrote the novel \'1984\'?",
      options: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "H.G. Wells"],
      userAnswer: 0,
      correctAnswer: 1,
      explanation: "George Orwell wrote '1984', a dystopian novel published in 1949 about totalitarian control.",
      category: "Literature",
      difficulty: "Medium"
    },
    {
      id: 4,
      question: "What is the chemical symbol for gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      userAnswer: 2,
      correctAnswer: 2,
      explanation: "Au comes from the Latin word \'aurum\' meaning gold. It\'s element 79 on the periodic table.",
      category: "Science",
      difficulty: "Medium"
    },
    {
      id: 5,
      question: "In which year did World War II end?",
      options: ["1944", "1945", "1946", "1947"],
      userAnswer: 1,
      correctAnswer: 1,
      explanation: "World War II ended in 1945 with the surrender of Japan on September 2, 1945.",
      category: "History",
      difficulty: "Easy"
    }
  ];

  const reviewQuestions = questions?.length > 0 ? questions : mockQuestions;

  const filteredQuestions = reviewQuestions?.filter(q => {
    if (filterType === 'correct') return q?.userAnswer === q?.correctAnswer;
    if (filterType === 'incorrect') return q?.userAnswer !== q?.correctAnswer;
    return true;
  });

  const toggleExpanded = (questionId) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-success bg-success/20';
      case 'medium': return 'text-warning bg-warning/20';
      case 'hard': return 'text-error bg-error/20';
      default: return 'text-primary bg-primary/20';
    }
  };

  const getAnswerStatus = (question) => {
    return question?.userAnswer === question?.correctAnswer;
  };

  const filterOptions = [
    { value: 'all', label: 'All Questions', icon: 'List' },
    { value: 'correct', label: 'Correct Only', icon: 'Check' },
    { value: 'incorrect', label: 'Incorrect Only', icon: 'X' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-strong rounded-2xl p-6 shadow-elevation-2"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
            <Icon name="FileText" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Question Review</h3>
            <p className="text-sm text-muted-foreground">
              Review your answers and explanations
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-2">
          {filterOptions?.map((option) => (
            <Button
              key={option?.value}
              variant={filterType === option?.value ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType(option?.value)}
              iconName={option?.icon}
              iconPosition="left"
              iconSize={16}
              className="text-xs"
            >
              <span className="hidden sm:inline">{option?.label}</span>
            </Button>
          ))}
        </div>
      </div>
      {/* Questions List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredQuestions?.map((question, index) => {
            const isCorrect = getAnswerStatus(question);
            const isExpanded = expandedQuestion === question?.id;

            return (
              <motion.div
                key={question?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`border rounded-lg overflow-hidden transition-all duration-200 ${
                  isCorrect 
                    ? 'border-success/30 bg-success/5' :'border-error/30 bg-error/5'
                }`}
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleExpanded(question?.id)}
                  className="w-full p-4 text-left hover:bg-muted/30 transition-colors duration-150"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isCorrect ? 'bg-success text-white' : 'bg-error text-white'
                        }`}>
                          <Icon name={isCorrect ? "Check" : "X"} size={16} />
                        </div>
                        <span className="text-sm font-medium text-muted-foreground">
                          Question {index + 1}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question?.difficulty)}`}>
                          {question?.difficulty}
                        </span>
                      </div>
                      <h4 className="font-medium text-foreground mb-2">
                        {question?.question}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Category: {question?.category}</span>
                        <span className={isCorrect ? 'text-success' : 'text-error'}>
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>
                    </div>
                    <Icon 
                      name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                      size={20} 
                      className="text-muted-foreground flex-shrink-0"
                    />
                  </div>
                </button>
                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-border/50"
                    >
                      <div className="p-4 space-y-4">
                        {/* Answer Options */}
                        <div className="space-y-2">
                          <h5 className="font-medium text-sm text-muted-foreground">Answer Options:</h5>
                          {question?.options?.map((option, optionIndex) => {
                            const isUserAnswer = question?.userAnswer === optionIndex;
                            const isCorrectAnswer = question?.correctAnswer === optionIndex;
                            
                            return (
                              <div
                                key={optionIndex}
                                className={`p-3 rounded-lg border text-sm ${
                                  isCorrectAnswer
                                    ? 'border-success bg-success/10 text-success'
                                    : isUserAnswer && !isCorrectAnswer
                                    ? 'border-error bg-error/10 text-error' :'border-border bg-muted/30'
                                }`}
                              >
                                <div className="flex items-center space-x-3">
                                  <span className="font-medium">
                                    {String.fromCharCode(65 + optionIndex)}.
                                  </span>
                                  <span>{option}</span>
                                  {isCorrectAnswer && (
                                    <Icon name="Check" size={16} className="text-success ml-auto" />
                                  )}
                                  {isUserAnswer && !isCorrectAnswer && (
                                    <Icon name="X" size={16} className="text-error ml-auto" />
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Explanation */}
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon name="Lightbulb" size={14} className="text-primary" />
                            </div>
                            <div>
                              <h5 className="font-medium text-sm mb-2">Explanation:</h5>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {question?.explanation}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      {/* Summary */}
      {filteredQuestions?.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Search" size={24} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">No questions match the selected filter.</p>
        </div>
      )}
      {filteredQuestions?.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border/50">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Showing {filteredQuestions?.length} of {reviewQuestions?.length} questions
            </span>
            <span>
              {filteredQuestions?.filter(q => q?.userAnswer === q?.correctAnswer)?.length} correct answers
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default QuestionReview;