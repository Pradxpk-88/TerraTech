import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/layout/Header';
import './styles/index.css';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import AuthPage from './pages/AuthPage';
import RentalsPage from './pages/RentalsPage';
import StorePage from './pages/StorePage';
import ServicesPage from './pages/ServicesPage';
import CartPage from './pages/CartPage';

// Placeholder Pages - Will be moved to separate files later
const Home = () => (
    <div style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)',
        padding: '2rem'
    }}>
        <div className="container">
            <div style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                color: 'var(--color-primary)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.875rem',
                fontWeight: 600,
                marginBottom: '1.5rem'
            }}>
                🌱 The Future of Agriculture is Here
            </div>
            <h1 style={{ 
                fontSize: 'clamp(2.5rem, 8vw, 4rem)', 
                lineHeight: 1.1, 
                marginBottom: '1.5rem',
                fontWeight: 800,
                color: '#064e3b'
            }}>
                Revolutionizing <span className="text-gradient">Agriculture</span>
            </h1>
            <p style={{
                fontSize: 'clamp(1.1rem, 3vw, 1.25rem)',
                color: 'var(--color-text-secondary)',
                maxWidth: '700px',
                margin: '0 auto 3rem auto',
                lineHeight: 1.6
            }}>
                Join thousands of modern farmers using TerraTech to rent premium equipment, 
                buy quality supplies, and access climate-smart expert advice—all in one place.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/rentals" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.4)' }}>
                    Rent Equipment
                </Link>
                <Link to="/store" className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem', backgroundColor: 'white' }}>
                    Buy Supplies
                </Link>
            </div>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '2rem', 
                marginTop: '5rem',
                width: '100%',
                maxWidth: '900px'
            }}>
                {[
                    { label: '5000+', subtext: 'Active Farmers' },
                    { label: '200+', subtext: 'Expert Tools' },
                    { label: '24/7', subtext: 'Support' }
                ].map((stat, i) => (
                    <div key={i} style={{ padding: '1.5rem', borderRight: i < 2 ? '1px solid var(--color-border)' : 'none' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)' }}>{stat.label}</div>
                        <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{stat.subtext}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/rentals" element={<RentalsPage />} />
                <Route path="/store" element={<StorePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
