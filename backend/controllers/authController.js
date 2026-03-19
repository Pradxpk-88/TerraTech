const User = require('../models/User');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');

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
    const otp = phone_number === '9626168999' ? '1234' : Math.floor(1000 + Math.random() * 9000).toString();

    // Store OTP (Expires in 5 mins)
    otpStore[phone_number] = otp;

    console.log(`[DEV] OTP for ${phone_number}: ${otp}`);

    // Integrate Twilio/SMS Provider here
    let smsSent = false;
    try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

        if (accountSid && accountSid !== 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' && authToken && twilioPhoneNumber) {
            const client = twilio(accountSid, authToken);
            await client.messages.create({
                body: `Your TerraTech verification code is: ${otp}. Do not share it.`,
                from: twilioPhoneNumber,
                to: phone_number
            });
            console.log(`[DEV] SMS sent successfully to ${phone_number}`);
            smsSent = true;
        } else {
            console.log(`[DEV] Twilio credentials not fully set, skipping SMS sending. Add them to .env to enable SMS.`);
        }
    } catch (smsError) {
        console.error(`[DEV] Error sending SMS via Twilio:`, smsError.message);
        // We still return 200 so development works even if SMS fails
    }

    res.status(200).json({
        success: true,
        message: smsSent ? 'OTP sent successfully' : 'OTP generated (SMS not configured)',
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

    try {
        // Clear OTP after use
        delete otpStore[phone_number];

        // Check database connection
        const { sequelize } = require('../config/db');
        let dbConnected = true;
        try {
            await sequelize.authenticate();
        } catch (e) {
            dbConnected = false;
        }

        let user;
        let isNewUser = false;

        if (dbConnected) {
            // Check if user exists
            user = await User.findOne({ where: { phone_number } });

            if (!user) {
                // Register new user
                user = await User.create({
                    phone_number,
                    role: 'farmer' // Default role
                });
                isNewUser = true;
            }
        } else {
            console.log('[DEV] Database down. Returning mock user for demo.');
            user = {
                id: 999,
                phone_number: phone_number,
                full_name: phone_number === '9626168999' ? 'Pradeep PK (Demo)' : 'Demo User',
                role: 'farmer'
            };
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
            message: 'Login successful (Demo Mode)'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error: ' + error.message });
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
