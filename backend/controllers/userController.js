import User from '../models/Users.js';
import { validationResult } from 'express-validator';  
import jwt from 'jsonwebtoken';  
import bcrypt from 'bcryptjs';
import logger from '../config/logger.js';  
import useragent from 'express-useragent';
import crypto from 'crypto';
import transporter from '../config/mailer.js'




//register
export const registerUser = async (req, res) => {
    const ipAddress = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress; // Updated to handle forwarded IP

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.warn('Validation failed during user registration', { errors: errors.array(), ipAddress });
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            logger.warn('User already exists during registration', { email, ipAddress });
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({
            name,
            email,
            password,
            role: 'User',  
        });

        const savedUser = await user.save();

        logger.info('New user registered', { email, role: savedUser.role, ipAddress });

        res.status(201).json({
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            role: savedUser.role,
        });

    } catch (error) {
        logger.error('Error during user registration', { error: error.message, ipAddress });
        res.status(500).json({ message: error.message });
    }
};


// User Login
export const loginUser = async (req, res) => {
    const ipAddress = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress; // Capture IP address

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.warn('Validation failed during user login', { errors: errors.array(), ipAddress });
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            logger.warn('User not found during login attempt', { email, ipAddress });
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            logger.warn('Invalid credentials during login attempt', { email, ipAddress });
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { _id: user._id, name: user.name, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

    
        const agent = useragent.parse(req.headers['user-agent'] || 'unknown');

        const device = agent.device || 'Desktop'; 
        const os = agent.os || 'Unknown';  
        const browser = agent.browser || 'Unknown';  


        logger.info('User successfully logged in', { email, ipAddress, device, os, browser });

        res.json({ token });
    } catch (error) {
        logger.error('Error during user login', { error: error.message, ipAddress });
        res.status(500).json({ message: error.message });
    }
};


// Update User
export const updateUser = async (req, res) => {
    const ipAddress = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress; // Capture IP address

    const { name, email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.warn('Validation failed during user update', { errors: errors.array(), ipAddress });
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            logger.warn('User not found during update attempt', { userId: req.user._id, ipAddress });
            return res.status(404).json({ message: 'User not found' });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await user.save();

        logger.info('User updated successfully', { userId: updatedUser._id, ipAddress });

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    } catch (error) {
        logger.error('Error during user update', { error: error.message, ipAddress });
        res.status(500).json({ message: error.message });
    }
};

//forgotpass
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate a reset token and set expiry time
      const resetToken = crypto.randomBytes(20).toString('hex');
  
      user.passwordResetToken = resetToken;
      user.passwordResetExpires = Date.now() + 3600000; // 1 hour expiry
      await user.save();
  
      // Create the reset password link
      const resetLink = `http://localhost:5000/reset-password/${resetToken}`;
  
      // Mail options
      const mailOptions = {
        from: process.env.EMAIL_USER,  // Use the environment variable for the email
        to: email,
        subject: 'Password Reset',
        text: `Please click the following link to reset your password: ${resetLink}`,
      };
  
      // Send the email with the reset link
      await transporter.sendMail(mailOptions);
  
      // Return success response
      res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
      console.error(error);  // Log the error for debugging
      res.status(500).json({ message: 'Server error' });
    }
  };