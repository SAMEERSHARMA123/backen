const { registerUser, loginUser, getRandomQuestions } = require("../Controllers/Controller");

module.exports = (app) => {
  // Test route
  app.get("/", (req, res) => {
    res.json({ message: "Quiz Master Pro Backend API is running!" });
  });

  // Register user
  app.post("/register", registerUser);

  // Login user
  app.post("/login", loginUser);

   app.get("/questions/random", getRandomQuestions);
};
