const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    const user = new User({ name, email, password });
    await user.save();
    const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: config.jwtExpirationInterval });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Error signing up', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: config.jwtExpirationInterval });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

exports.googleLogin = async (req, res) => {
  try {
    const { googleId, name, email } = req.body;
    let user = await User.findOne({ googleId });
    if (!user) {
      user = new User({ googleId, name, email });
      await user.save();
    }
    const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: config.jwtExpirationInterval });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Error with Google login', error: error.message });
  }
};

exports.logout = async (req, res) => {
  // In a real-world scenario, you might want to invalidate the token on the server-side
  // For now, we'll just send a success message
  res.json({ message: 'Logged out successfully' });
};