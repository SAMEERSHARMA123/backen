const User = require("../Schema/Schema");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate password strength (before hashing)
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // save user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // send response (including password)
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password, // ⚠ only for testing
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      res.status(500).json({ message: "Error registering user", error: error.message });
    }
  }
};

// 👉 Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });
    if (!foundUser) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        password: foundUser.password, // ⚠ only for testing
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

exports.getRandomQuestions = async (req, res) => {
  try {
    // Direct MongoDB collection access (assuming collection name is 'questions')
    const questions = await mongoose.connection.db.collection('questions').aggregate([
      { $sample: { size: 10 } }
    ]).toArray();
    
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error: error.message });
  }
};


                                                                        