import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ServicesPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <h1 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Our Services & Contact</h1>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '3rem', maxWidth: '800px', fontSize: '1.1rem' }}>
                We provide a range of agricultural services to help you make the most of your farm. 
                Whether you need expert consultation, equipment maintenance, or have custom requests, our team is here to help.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
                {/* Contact Information */}
                <div>
                    <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem' }}>Get in Touch</h2>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div style={{ 
                                backgroundColor: 'rgba(76, 175, 80, 0.1)', 
                                padding: '1rem', 
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Phone size={28} color="var(--color-primary)" />
                            </div>
                            <div>
                                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>Call Us</h4>
                                <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '1.05rem' }}>+1 (555) 123-4567</p>
                                <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>Mon-Fri from 8am to 5pm</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div style={{ 
                                backgroundColor: 'rgba(76, 175, 80, 0.1)', 
                                padding: '1rem', 
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Mail size={28} color="var(--color-primary)" />
                            </div>
                            <div>
                                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>Email Us</h4>
                                <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '1.05rem' }}>support@terratech.com</p>
                                <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>We'll respond within 24 hours</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                            <div style={{ 
                                backgroundColor: 'rgba(76, 175, 80, 0.1)', 
                                padding: '1rem', 
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <MapPin size={28} color="var(--color-primary)" />
                            </div>
                            <div>
                                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>Headquarters</h4>
                                <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: '1.5' }}>
                                    123 Agriculture Way<br/>
                                    Farming Town, CA 90210<br/>
                                    United States
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div style={{ 
                    backgroundColor: 'var(--color-bg-secondary)', 
                    padding: '2.5rem', 
                    borderRadius: '12px',
                    border: '1px solid var(--color-border)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
                }}>
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem' }}>Send us a Message</h2>
                    {submitted && (
                        <div style={{ 
                            padding: '1rem', 
                            backgroundColor: 'rgba(76, 175, 80, 0.1)', 
                            color: '#4CAF50',
                            borderRadius: '8px',
                            marginBottom: '1.5rem',
                            border: '1px solid #4CAF50',
                            fontWeight: '500'
                        }}>
                            ✅ Thank you for reaching out! We will get back to you soon.
                        </div>
                    )}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Full Name</label>
                            <input 
                                type="text" 
                                required
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    borderRadius: '8px',
                                    border: '1px solid var(--color-border)',
                                    backgroundColor: 'var(--color-bg)',
                                    color: 'var(--color-text)',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email Address</label>
                            <input 
                                type="email" 
                                required
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    borderRadius: '8px',
                                    border: '1px solid var(--color-border)',
                                    backgroundColor: 'var(--color-bg)',
                                    color: 'var(--color-text)',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Subject</label>
                            <input 
                                type="text" 
                                required
                                placeholder="How can we help you?"
                                value={formData.subject}
                                onChange={e => setFormData({...formData, subject: e.target.value})}
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    borderRadius: '8px',
                                    border: '1px solid var(--color-border)',
                                    backgroundColor: 'var(--color-bg)',
                                    color: 'var(--color-text)',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Message</label>
                            <textarea 
                                rows="5"
                                required
                                placeholder="Type your message here..."
                                value={formData.message}
                                onChange={e => setFormData({...formData, message: e.target.value})}
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    borderRadius: '8px',
                                    border: '1px solid var(--color-border)',
                                    backgroundColor: 'var(--color-bg)',
                                    color: 'var(--color-text)',
                                    resize: 'vertical',
                                    fontSize: '1rem'
                                }}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', padding: '1rem', fontSize: '1.1rem', fontWeight: 'bold' }}>
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;
