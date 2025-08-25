const API_BASE_URL = 'http://localhost:5000';

// API service for quiz related operations
export const quizAPI = {
  // Fetch random questions from backend
  getRandomQuestions: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/questions/random`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const questions = await response.json();
      return questions;
    } catch (error) {
      console.error('Error fetching random questions:', error);
      throw error;
    }
  },

  // Register user
  registerUser: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      return { success: response.ok, data };
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },

  // Login user
  loginUser: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });
      
      const data = await response.json();
      return { success: response.ok, data };
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }
};

export default quizAPI;