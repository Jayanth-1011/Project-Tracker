import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Signup controller
export const signup = async (req, res) => {
  const { fullName, email, password, country } = req.body;

  // Validate the request data
  if (!fullName || !email || !password || !country) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      country,
    });

    // Save the user to the database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set the token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 3600000, // 1 hour
      sameSite: "strict",
    });

    // Send a response with a success message and the user data (optional)
    res.status(201).json({
      message: "User created successfully",
      user: { fullName: newUser.fullName, email: newUser.email, country: newUser.country },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

 
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
 
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({_id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", 
    });

    // Set JWT token in cookie
    res.cookie("token", token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // 1 hour expiration
      sameSite: "strict", // Helps prevent CSRF attacks
    });

    // Send response
    res.status(200).json({
      message: "Login successful.",
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
   
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict",
    });
  
    // Send response
    res.status(200).json({
      message: "Logout successful.",
    });
  };
  
  export const checkAuth = async (req, res) => {
    try {
      const token = req.cookies.token || req.headers["x-auth-token"];
      if (!token) return res.status(401).json({ error: "Not authenticated" });
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded._id); // Exclude password field
      if (!user) return res.status(404).json({ error: "User not found" });
  
      res.status(200).json({ user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  };
