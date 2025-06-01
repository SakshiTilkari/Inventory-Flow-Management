const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const bcrypt = require('bcryptjs'); // ← THIS IS THE FIX

exports.register = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password,
      role
    });

    const token = user.getSignedJwtToken();
    
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new Error('Please provide email and password'));
  }

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new Error('Invalid credentials'));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new Error('Invalid credentials'));
    }

    const token = user.getSignedJwtToken();
    
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
};