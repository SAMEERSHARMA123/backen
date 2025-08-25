import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import UserLogin from './pages/user-login';
import QuizGameplay from './pages/quiz-gameplay';
import QuizResults from './pages/quiz-results';
import QuizDashboard from './pages/quiz-dashboard';
import UserRegistration from './pages/user-registration';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<UserLogin />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/quiz-gameplay" element={<QuizGameplay />} />
        <Route path="/quiz-results" element={<QuizResults />} />
        <Route path="/quiz-dashboard" element={<QuizDashboard />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
