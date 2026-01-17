const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Mock OTP storage (In production use Redis)
const otpStore = {};

// @desc    Send OTP to mobile number
// @route   POST /api/auth/send-otp
// @access  Public
exports.sendOtp = async (req, res) => {
    const { phone_number } = req.body;

    if (!phone_number) {
        return res.status(400).json({ success: false, message: 'Phone number is required' });
    }

    // Generate 4 digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Store OTP (Expires in 5 mins)
    otpStore[phone_number] = otp;

    console.log(`[DEV] OTP for ${phone_number}: ${otp}`);

    // TODO: Integrate Twilio/SMS Provider here

    res.status(200).json({
        success: true,
        message: 'OTP sent successfully',
        dev_otp: otp // Removing in production
    });
};

// @desc    Verify OTP and Login/Register
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOtp = async (req, res) => {
    const { phone_number, otp } = req.body;

    if (!phone_number || !otp) {
        return res.status(400).json({ success: false, message: 'Phone number and OTP are required' });
    }

    // Verify OTP
    if (otpStore[phone_number] !== otp) {
        return res.status(401).json({ success: false, message: 'Invalid OTP' });
    }

    // Clear OTP after use
    delete otpStore[phone_number];

    try {
        // Check if user exists
        let user = await User.findOne({ where: { phone_number } });

        let isNewUser = false;
        if (!user) {
            // Register new user
            user = await User.create({
                phone_number,
                role: 'farmer' // Default role
            });
            isNewUser = true;
        }

        // Create Token
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '30d' }
        );

        res.status(200).json({
            success: true,
            token,
            user,
            isNewUser,
            message: 'Login successful'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
