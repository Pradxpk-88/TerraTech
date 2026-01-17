import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Sprout, ArrowRight, Phone, Lock } from 'lucide-react';

const AuthPage = () => {
    const [step, setStep] = useState(1); // 1: Phone, 2: OTP
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const { sendOtp, login } = useAuth();
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await sendOtp(phoneNumber);
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send OTP');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(phoneNumber, otp);
            navigate('/'); // Redirect to home on success
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP');
        }
    };

    return (
        <div style={{
            minHeight: 'calc(100vh - 4rem)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'var(--color-bg-primary)'
        }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        padding: '1rem',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        color: 'var(--color-primary)',
                        marginBottom: '1rem'
                    }}>
                        <Sprout size={40} />
                    </div>
                    <h2>Welcome Back</h2>
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                        {step === 1 ? 'Enter your mobile number to continue' : 'Enter the code sent to your mobile'}
                    </p>
                </div>

                {error && (
                    <div style={{
                        padding: '0.75rem',
                        backgroundColor: '#FEF2F2',
                        color: '#DC2626',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: '1.5rem',
                        fontSize: '0.875rem'
                    }}>
                        {error}
                    </div>
                )}

                {step === 1 ? (
                    <form onSubmit={handleSendOtp}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Phone Number</label>
                            <div style={{ position: 'relative' }}>
                                <Phone size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="Enter 10-digit number"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 0.75rem 0.75rem 3rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--color-border)',
                                        fontSize: '1rem'
                                    }}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                            Send OTP <ArrowRight size={20} />
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>OTP Code</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter 4-digit code"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 0.75rem 0.75rem 3rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--color-border)',
                                        fontSize: '1rem'
                                    }}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                            Verify & Login <ArrowRight size={20} />
                        </button>
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            style={{
                                display: 'block',
                                width: '100%',
                                textAlign: 'center',
                                marginTop: '1rem',
                                color: 'var(--color-text-secondary)',
                                fontSize: '0.875rem'
                            }}
                        >
                            Change Phone Number
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AuthPage;
