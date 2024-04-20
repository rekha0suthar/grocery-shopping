const express = require("express");
const User = require("../models/User");

// Register
const register = async (req, res) => {
  const { email, password, user_type } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // check if the registering user is admin and there is no adin persent
    if (user_type === "admin") {
      const adminCount = await User.countDocuments({ user_type: "admin" });
      if (adminCount > 0) {
        res.status(400).json({ message: "Admin already exists" });
      } else {
        // Create new user
        user = new User({ email, password, user_type });
        await user.save();
      }
    } else {
      // Create new user
      user = new User({ email, password, user_type });
      await user.save();
    }

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate Password
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user_type: user.user_type });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { register, login };
