import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/layout/Header';
import './styles/index.css';

import { AuthProvider } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import RentalsPage from './pages/RentalsPage';
import StorePage from './pages/StorePage';
import ServicesPage from './pages/ServicesPage';

// Placeholder Pages - Will be moved to separate files later
const Home = () => (
  <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
    <h1 style={{ marginBottom: '1rem' }}>
      Revolutionizing <span className="text-gradient">Agriculture</span>
    </h1>
    <p style={{
      fontSize: '1.25rem',
      color: 'var(--color-text-secondary)',
      maxWidth: '600px',
      margin: '0 auto 2rem auto'
    }}>
      The comprehensive platform for modern farmers. Rent equipment, buy supplies, and access expert advice all in one place.
    </p>
    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
      <Link to="/rentals" className="btn btn-primary">Rent Equipment</Link>
      <Link to="/store" className="btn btn-outline">Buy Supplies</Link>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
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
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
