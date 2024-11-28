import express from 'express';
import { registerUser } from '../controllers/userController.js';
import { loginUser } from '../controllers/userController.js';
import { updateUser } from '../controllers/userController.js';
import { forgotPassword } from '../controllers/userController.js';
import { check } from 'express-validator'; 
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST route for user registration
router.post(
    '/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        check('role', 'Role must be Admin, Moderator, or User').optional().isIn(['Admin', 'Moderator', 'User']), 
    ],
    registerUser
);

// POST route for user login
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
    ],
    loginUser
);

//update

router.put(
    '/update',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        
    ],
    protect, 
    updateUser 
);

// POST route for forgot password
router.post(
    '/forgot-password',
    [
        check('email', 'Please include a valid email').isEmail(),
    ],
    forgotPassword  // This is your forgot password controller
);

export default router;
